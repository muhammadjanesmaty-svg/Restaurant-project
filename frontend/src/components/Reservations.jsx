import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Armchair, CalendarDays, Check, Clock, Loader2, MessageCircle, Minus, Phone, Plus, Sun, Users, Waves } from "lucide-react";
import { useLang } from "@/i18n";
import { CONTACT, MUSIC_SCHEDULE } from "@/data/content";
import { Reveal, SectionHeader, EASE } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "17:00", "18:30", "20:00", "21:30", "23:00"];
const ZONE_ICONS = { terrace: Waves, lounge: Armchair, garden: Sun };

export default function Reservations() {
    const { isTr, t } = useLang();
    const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: 2, zone: "terrace", notes: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const today = new Date().toISOString().slice(0, 10);

    const validate = () => {
        const e = {};
        if (form.name.trim().length < 2) e.name = t.res.errName;
        if (form.phone.replace(/\D/g, "").length < 10) e.phone = t.res.errPhone;
        if (!form.date) e.date = t.res.errDate;
        if (!form.time) e.time = t.res.errTime;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const submit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const { data } = await axios.post(`${API}/reservations`, { ...form, guests: Number(form.guests) });
            setSuccess(data);
            toast.success(t.res.toastSuccess);
        } catch {
            toast.error(t.res.toastError);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setSuccess(null);
        setForm({ name: "", phone: "", date: "", time: "", guests: 2, zone: "terrace", notes: "" });
    };

    return (
        <section id="reservation" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-line" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <SectionHeader eyebrow={t.res.eyebrow} title={t.res.title} sub={t.res.sub} />

                        <Reveal className="mt-10">
                            <AnimatePresence mode="wait">
                                {success ? (
                                    <motion.div
                                        key="success"
                                        data-testid="reservation-success-panel"
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                        className="glass-panel rounded-2xl p-8 text-center sm:p-12"
                                    >
                                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy-deep shadow-[0_0_40px_rgba(212,175,55,0.45)]">
                                            <Check size={28} strokeWidth={2.5} />
                                        </span>
                                        <h3 className="mt-6 font-display text-3xl font-medium text-cream">{t.res.successTitle}</h3>
                                        <p className="mt-2 text-sm text-slate-400">{t.res.successSub}</p>
                                        <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-slate-500">{t.res.successCode}</p>
                                        <p data-testid="reservation-code" className="font-display text-4xl font-semibold tracking-[0.2em] text-gold">
                                            {`SEC-${success.id ? success.id.slice(-6).toUpperCase() : "000000"}`}
                                        </p>
                                        <div className="mx-auto mt-8 max-w-sm space-y-2.5 rounded-xl border border-gold/15 bg-navy/50 p-5 text-left text-sm">
                                            <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{t.res.summary}</p>
                                            <p className="text-slate-300">{success.name}</p>
                                            <p className="text-slate-400">
                                                {success.date} · {success.time} · {success.guests} {t.res.guests}
                                            </p>
                                            <p className="text-slate-400">{t.res.zoneLabels[success.zone]}</p>
                                        </div>
                                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                                            <a href={CONTACT.phoneHref} data-testid="reservation-call-btn" className="btn-gold rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]">
                                                <Phone size={14} /> {CONTACT.phoneDisplay}
                                            </a>
                                            <a
                                                href={CONTACT.whatsapp}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                data-testid="reservation-whatsapp-btn"
                                                className="btn-ghost rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                                            >
                                                <MessageCircle size={14} /> WhatsApp
                                            </a>
                                        </div>
                                        <button
                                            type="button"
                                            data-testid="reservation-new-btn"
                                            onClick={reset}
                                            className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 underline-offset-4 hover:text-gold hover:underline"
                                        >
                                            {t.res.newReservation}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        data-testid="reservation-form"
                                        onSubmit={submit}
                                        noValidate
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                        className="glass-panel rounded-2xl p-6 sm:p-10"
                                    >
                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label className="field-label" htmlFor="res-name">{t.res.name}</label>
                                                <input
                                                    id="res-name"
                                                    type="text"
                                                    data-testid="reservation-name-input"
                                                    className="field-input"
                                                    placeholder={t.res.namePh}
                                                    value={form.name}
                                                    onChange={(e) => set("name", e.target.value)}
                                                />
                                                {errors.name && <p data-testid="reservation-error-name" className="mt-2 text-xs text-red-400">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="field-label" htmlFor="res-phone">{t.res.phone}</label>
                                                <input
                                                    id="res-phone"
                                                    type="tel"
                                                    data-testid="reservation-phone-input"
                                                    className="field-input"
                                                    placeholder={t.res.phonePh}
                                                    value={form.phone}
                                                    onChange={(e) => set("phone", e.target.value)}
                                                />
                                                {errors.phone && <p data-testid="reservation-error-phone" className="mt-2 text-xs text-red-400">{errors.phone}</p>}
                                            </div>
                                            <div>
                                                <label className="field-label" htmlFor="res-date">{t.res.date}</label>
                                                <input
                                                    id="res-date"
                                                    type="date"
                                                    min={today}
                                                    data-testid="reservation-date-input"
                                                    className="field-input"
                                                    value={form.date}
                                                    onChange={(e) => set("date", e.target.value)}
                                                />
                                                {errors.date && <p data-testid="reservation-error-date" className="mt-2 text-xs text-red-400">{errors.date}</p>}
                                            </div>
                                            <div>
                                                <label className="field-label" htmlFor="res-time">{t.res.time}</label>
                                                <select
                                                    id="res-time"
                                                    data-testid="reservation-time-select"
                                                    className="field-input"
                                                    value={form.time}
                                                    onChange={(e) => set("time", e.target.value)}
                                                >
                                                    <option value="" disabled>—</option>
                                                    {SLOTS.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                {errors.time && <p data-testid="reservation-error-time" className="mt-2 text-xs text-red-400">{errors.time}</p>}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <p className="field-label">{t.res.zone}</p>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                {Object.keys(t.res.zoneLabels).map((z) => {
                                                    const Icon = ZONE_ICONS[z];
                                                    const active = form.zone === z;
                                                    return (
                                                        <button
                                                            key={z}
                                                            type="button"
                                                            data-testid={`reservation-zone-${z}`}
                                                            onClick={() => set("zone", z)}
                                                            className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                                                                active
                                                                    ? "border-gold bg-gold/10 text-gold shadow-[0_0_24px_rgba(212,175,55,0.15)]"
                                                                    : "border-slate-600/40 text-slate-400 hover:border-gold/50 hover:text-gold"
                                                            }`}
                                                        >
                                                            <Icon size={20} />
                                                            {t.res.zoneLabels[z]}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                            <div>
                                                <p className="field-label">{t.res.guests}</p>
                                                <div className="flex items-center gap-4 rounded-full border border-slate-600/40 px-4 py-2.5">
                                                    <button
                                                        type="button"
                                                        data-testid="reservation-guests-minus"
                                                        onClick={() => set("guests", Math.max(1, Number(form.guests) - 1))}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span data-testid="reservation-guests-value" className="flex min-w-12 items-center justify-center gap-2 font-display text-xl font-semibold text-cream">
                                                        <Users size={15} className="text-gold" /> {form.guests}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        data-testid="reservation-guests-plus"
                                                        onClick={() => set("guests", Math.min(20, Number(form.guests) + 1))}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1 sm:max-w-[55%]">
                                                <label className="field-label" htmlFor="res-notes">{t.res.notes}</label>
                                                <input
                                                    id="res-notes"
                                                    type="text"
                                                    data-testid="reservation-notes-input"
                                                    className="field-input"
                                                    placeholder={t.res.notesPh}
                                                    value={form.notes}
                                                    onChange={(e) => set("notes", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            data-testid="reservation-submit-btn"
                                            disabled={submitting}
                                            className="btn-gold mt-8 w-full rounded-full py-4 text-[12px] font-bold uppercase tracking-[0.22em] disabled:opacity-60"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" /> {t.res.submitting}
                                                </>
                                            ) : (
                                                <>
                                                    <CalendarDays size={16} /> {t.res.submit}
                                                </>
                                            )}
                                        </button>
                                        <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500">
                                            <Clock size={12} className="text-gold/70" /> {t.res.phoneHint} — {CONTACT.phoneDisplay}
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </Reveal>
                    </div>

                    <div id="music" className="lg:col-span-5 lg:pl-6">
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-10 bg-gold/60" />
                                <p className="eyebrow">{t.music.eyebrow}</p>
                            </div>
                            <h2 className="mt-5 font-display text-3xl font-medium text-cream sm:text-4xl">{t.music.title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.music.sub}</p>
                        </Reveal>

                        <div className="mt-8 space-y-4">
                            {MUSIC_SCHEDULE.map((ev, i) => (
                                <Reveal key={ev.id} delay={0.08 * i}>
                                    <div
                                        data-testid={`music-card-${ev.id}`}
                                        className="card-frame group relative overflow-hidden rounded-xl p-6"
                                    >
                                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full border border-gold/30 bg-navy-deep/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                                                {isTr ? ev.day_tr : ev.day_en}
                                            </span>
                                            <span className="font-display text-lg font-semibold text-gold">{ev.time}</span>
                                        </div>
                                        <h3 className="mt-4 font-display text-2xl font-medium text-cream">{ev.artist}</h3>
                                        <p className="mt-1 text-[13px] text-slate-400">{isTr ? ev.genre_tr : ev.genre_en}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                                <span className="h-1 w-1 rotate-45 bg-gold" />
                                                {isTr ? ev.tag_tr : ev.tag_en}
                                            </span>
                                            <button
                                                type="button"
                                                data-testid={`music-book-btn-${ev.id}`}
                                                onClick={() => {
                                                    const el = document.querySelector("#reservation");
                                                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }}
                                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
                                            >
                                                {t.music.book}
                                            </button>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.2}>
                            <p className="mt-6 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                {t.music.liveNote}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
