import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLang } from "@/i18n";
import { REVIEWS } from "@/data/content";
import { Reveal, SectionHeader, EASE } from "./Reveal";

export default function Testimonials() {
    const { isTr, t } = useLang();
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);

    const go = (next) => {
        setDir(next > index ? 1 : -1);
        setIndex((next + REVIEWS.length) % REVIEWS.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setDir(1);
            setIndex((v) => (v + 1) % REVIEWS.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const review = REVIEWS[index];

    return (
        <section id="reviews" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-line" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <SectionHeader center eyebrow={t.rev.eyebrow} title={t.rev.title} />

                <Reveal className="mt-12 text-center">
                    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-navy/50 px-10 py-7">
                        <span data-testid="reviews-score" className="font-display text-6xl font-semibold text-gold">4.9</span>
                        <span className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={16} className="fill-gold text-gold" />
                            ))}
                        </span>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                            {t.rev.ratingLabel} · <span data-testid="reviews-count">{t.rev.ratingCount}</span>
                        </p>
                    </div>
                </Reveal>

                <Reveal className="relative mx-auto mt-10 max-w-3xl">
                    <div className="relative min-h-[300px] sm:min-h-[260px]">
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.figure
                                key={review.id}
                                custom={dir}
                                data-testid="testimonial-card"
                                initial={{ opacity: 0, x: dir * 70 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: dir * -70 }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="glass-panel absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8 text-center sm:p-12"
                            >
                                <span className="font-display text-6xl leading-none text-gold/50">“</span>
                                <blockquote className="mt-2 font-display text-lg italic leading-relaxed text-cream sm:text-[1.35rem]">
                                    {isTr ? review.comment_tr : review.comment_en}
                                </blockquote>
                                <figcaption className="mt-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{review.name}</p>
                                    <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                                        <BadgeCheck size={13} className="text-emerald-400" />
                                        {review.source} · {isTr ? review.date_tr : review.date_en}
                                    </p>
                                </figcaption>
                            </motion.figure>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-6">
                        <button
                            type="button"
                            data-testid="testimonial-prev-btn"
                            aria-label="Previous review"
                            onClick={() => go(index - 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-navy-deep"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex gap-2.5">
                            {REVIEWS.map((r, i) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    data-testid={`testimonial-dot-${i}`}
                                    aria-label={`Review ${i + 1}`}
                                    onClick={() => go(i)}
                                    className={`h-1.5 rounded-full transition-all duration-400 ${i === index ? "w-9 bg-gold" : "w-2.5 bg-slate-600 hover:bg-gold/60"}`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            data-testid="testimonial-next-btn"
                            aria-label="Next review"
                            onClick={() => go(index + 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-navy-deep"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
