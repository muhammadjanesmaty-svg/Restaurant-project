from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional, List, Annotated

from pydantic import BaseModel, Field, BeforeValidator, ConfigDict, field_validator
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="SECAFE SEKAPARK API")
api_router = APIRouter(prefix="/api")


def _coerce_oid(v):
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str) and ObjectId.is_valid(v):
        return v
    raise ValueError("Invalid ObjectId")


PyObjectId = Annotated[str, BeforeValidator(_coerce_oid)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        d = self.model_dump(by_alias=True)
        d.pop("_id", None)
        return d

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


ZONES = {"terrace", "lounge", "garden"}


class ReservationCreate(BaseModel):
    name: str
    phone: str
    date: str
    time: str
    guests: int
    zone: str
    notes: Optional[str] = None

    @field_validator("name")
    @classmethod
    def _validate_name(cls, v):
        v = v.strip()
        if not 2 <= len(v) <= 80:
            raise ValueError("Name must be 2-80 characters")
        return v

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v):
        digits = re.sub(r"\D", "", v)
        if not 10 <= len(digits) <= 15:
            raise ValueError("Phone must contain 10-15 digits")
        return v.strip()

    @field_validator("date")
    @classmethod
    def _validate_date(cls, v):
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", v):
            raise ValueError("Date must be YYYY-MM-DD")
        return v

    @field_validator("time")
    @classmethod
    def _validate_time(cls, v):
        if not re.match(r"^\d{2}:\d{2}$", v):
            raise ValueError("Time must be HH:MM")
        return v

    @field_validator("guests")
    @classmethod
    def _validate_guests(cls, v):
        if not 1 <= v <= 20:
            raise ValueError("Guests must be between 1 and 20")
        return v

    @field_validator("zone")
    @classmethod
    def _validate_zone(cls, v):
        if v not in ZONES:
            raise ValueError("Invalid zone")
        return v


class Reservation(BaseDocument):
    name: str
    phone: str
    date: str
    time: str
    guests: int
    zone: str
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "SECAFE SEKAPARK API is running", "status": "ok"}


@api_router.post("/reservations", response_model=Reservation, response_model_by_alias=False)
async def create_reservation(payload: ReservationCreate):
    try:
        reservation = Reservation(**payload.model_dump())
        result = await db.reservations.insert_one(reservation.to_mongo())
        reservation.id = str(result.inserted_id)
        return reservation
    except Exception as e:
        logging.error(f"Reservation create failed: {e}")
        raise HTTPException(status_code=500, detail="Rezervasyon kaydedilemedi")


@api_router.get("/reservations", response_model=List[Reservation], response_model_by_alias=False)
async def list_reservations():
    docs = await db.reservations.find().sort("created_at", -1).to_list(200)
    return [Reservation.from_mongo(d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
