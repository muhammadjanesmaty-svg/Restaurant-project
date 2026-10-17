import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { useLang } from "@/i18n";
import { HERO_SLIDES, CONTACT } from "@/data/content";
import { scrollToId } from "@/lib/lenis";
import { EASE } from "./Reveal";

export default function Hero() {
    const { isTr, t } = useLang();
    const [index, setIndex] = useState(0);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
    const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

    useEffect(() => {
        const timer = setInterval(() => setIndex((v) => (v + 1) % HERO_SLIDES.length), 6500);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[index];

    return (
        <section ref={ref} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
            <motion.div style={{ y: bgY }} className="absolute inset-0 -bottom-24">
                <AnimatePresence>
                    <motion.div
                        key={slide.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <motion.img
                            src={slide.img}
                            alt={isTr ? slide.title_tr : slide.title_en}
                            initial={{ scale: 1.14 }}
                            animate={{ scale: 1.03 }}
                            transition={{ duration: 7.5, ease: "easeOut" }}
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-navy-deep/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/80 via-navy-deep/25 to-transparent" />

            <motion.div
                style={{ opacity: fade }}
                className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-16 pt-36 sm:px-8 lg:justify-center lg:pb-0"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
                    className="mb-7 inline-flex items-center gap-3 self-start rounded-full border border-gold/30 bg-navy-deep/55 px-4 py-2 backdrop-blur-md"
                    data-testid="hero-status-badge"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream sm:text-[11px]">
                        {t.hero.badge}
                    </span>
                </motion.div>

                <p className="eyebrow mb-5 flex items-center gap-3">
                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
                    {t.hero.eyebrow}
                </p>

                <h1 className="font-display text-[clamp(2.7rem,7vw,6.2rem)] font-medium leading-[1.04] tracking-tight text-white">
                    {t.hero.lines.map((line, i) => (
                        <span key={i} className="mask-line">
                            <motion.span
                                className="block"
                                initial={{ y: "112%" }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3 + i * 0.14, duration: 1.1, ease: EASE }}
                            >
                                {i === t.hero.lines.length - 1 ? (
                                    <span className="italic text-gold">{line}</span>
                                ) : (
                                    line
                                )}
                            </motion.span>
                        </span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
                    className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base"
                >
                    {t.hero.sub}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
                    className="mt-9 flex flex-wrap items-center gap-4"
                >
                    <button
                        type="button"
                        data-testid="hero-reserve-btn"
                        onClick={() => scrollToId("#reservation")}
                        className="btn-gold rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em]"
                    >
                        {t.hero.ctaPrimary}
                    </button>
                    <button
                        type="button"
                        data-testid="hero-explore-btn"
                        onClick={() => scrollToId("#menu")}
                        className="btn-ghost rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em]"
                    >
                        {t.hero.ctaSecondary}
                    </button>
                    <a
                        href={CONTACT.phoneHref}
                        data-testid="hero-call-btn"
                        className="group flex items-center gap-2.5 px-2 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-gold"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                            <Phone size={14} />
                        </span>
                        {CONTACT.phoneDisplay}
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8"
            >
                <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-gold/15 pt-6 md:flex-row md:items-end">
                    <ul className="flex flex-wrap gap-x-7 gap-y-2" data-testid="hero-info-strip">
                        {t.hero.infoStrip.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-[11px]">
                                <span className="inline-block h-1 w-1 rotate-45 bg-gold" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-5">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={slide.key + (isTr ? "tr" : "en")}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.5 }}
                                className="hidden max-w-[220px] text-right text-[11px] leading-relaxed text-slate-400 sm:block"
                            >
                                <span className="font-semibold text-gold">{isTr ? slide.title_tr : slide.title_en}</span>
                                <br />
                                {isTr ? slide.sub_tr : slide.sub_en}
                            </motion.p>
                        </AnimatePresence>
                        <div className="flex items-center gap-2.5">
                            {HERO_SLIDES.map((s, i) => (
                                <button
                                    key={s.key}
                                    type="button"
                                    data-testid={`hero-dot-${i}`}
                                    aria-label={`Slide ${i + 1}`}
                                    onClick={() => setIndex(i)}
                                    className={`h-1 rounded-full transition-all duration-500 ${
                                        i === index ? "w-10 bg-gold" : "w-4 bg-slate-600 hover:bg-gold/60"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none mt-6 flex justify-center lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2">
                    <motion.span
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        className="text-gold/70"
                    >
                        <ChevronDown size={20} />
                    </motion.span>
                </div>
            </motion.div>
        </section>
    );
}
