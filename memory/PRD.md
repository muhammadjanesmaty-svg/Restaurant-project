# SECAFE SEKAPARK — PRD

## Original Problem Statement
Create a sleek, modern, luxury website for "SECAFE SEKAPARK", a premium waterfront café & lounge in İzmit, Kocaeli, Turkey. Brand: deep navy (#0F172A), gold (#D4AF37), charcoal/cream/white; serif display + clean sans. Sections: hero (carousel, reserve/explore CTAs, 24/7 live-music badge), experience showcase, interactive searchable menu with 4 tab filters, location with Google Maps + contact (0530 642 11 85, Plus Code 8HQ9+XG İzmit), VIP reservation widget (indoor/sea-view terrace) + live music schedule, 5-star review carousel. Mobile-first, micro-interactions, TR/EN multilingual.

## Architecture
- **Frontend**: React 19 (CRA/craco) + Tailwind + framer-motion 11 + lenis smooth scroll. Single-page scroll site, anchor navigation, no router.
- **Backend**: FastAPI (port 8001, /api prefix) + MongoDB (motor). Endpoints: GET /api/ (health), POST /api/reservations (validated), GET /api/reservations.
- **Design system**: /app/design_guidelines.json — navy #070D18/#0F172A base, gold #D4AF37, Cormorant Garamond display + Montserrat body, glass panels, grain overlay, gold spotlights, arched frames.
- **Logo/favicon**: original SVG mark (gold sun over twin wave lines) — public/favicon.svg + components/Logo.jsx.

## Implemented (2026-10-17)
1. Hero: 4-slide ken-burns crossfade carousel (6.5s auto-advance), masked line-by-line headline reveal, parallax on scroll, live-status badge, 3 CTAs (reserve / explore / tel), info strip, slide dots.
2. Editorial marquee: slow gold brass ribbon, pauses on hover.
3. Experiences: 5-card asymmetric bento (coffee wide, arched sea-view tall, breakfast, waffle+kumpir, live music) with spotlight treatment, scroll reveals.
4. Interactive menu: 4 category tabs, live search, 12 items with photography, prices, badges; animated grid; empty state.
5. Reservations: validated form (name/phone/date/time/guests 1–20/zone terrace|lounge|garden/notes) → POST /api/reservations (MongoDB) → success panel with booking code (SEC-XXXXXX), summary, call & WhatsApp CTAs, sonner toast.
6. Live music schedule: 3 weekly event cards with booking CTA.
7. Location: dark-styled Google Maps embed, address, tel link, Plus Code, 24/7 highlight, amenity chips, directions button.
8. Testimonials: auto-advancing review carousel, 4.9 rating card, prev/next + dots.
9. Footer: oversized gradient brand type, contact/hours/links/socials.
10. TR (default) / EN instant language switch, persisted in localStorage.

## User Personas
- Local & visiting guests booking sea-view tables (TR-first, mobile).
- Tourists/English speakers browsing menu & directions (EN toggle).
- Staff reviewing incoming reservation requests (GET /api/reservations).

## Verification Done
- curl: health, POST create, 422 validation, GET list (id serialization fixed).
- Screenshots desktop 1440 + mobile 390: hero, menu, reservations, success panel with code, EN toggle.

## Placeholder / MOCKED content (clearly editable later)
- Menu items & prices, artist names & music schedule, review texts, "4.9 (1,240+ reviews)" score — all curated placeholders per approved plan.
- Valet/parking claims in info strip are sample copy.
- No admin panel yet; reservations live in MongoDB `reservations` collection.

## Backlog
- P1: Admin/staff view for reservations; WhatsApp auto-confirm; real photo shoot imagery.
- P2: Real live-music event feed, Instagram feed, online ordering, dark/light theme switch.
