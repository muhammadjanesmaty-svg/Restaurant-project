import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "@/i18n";
import { scrollToId } from "@/lib/lenis";
import { CONTACT } from "@/data/content";
import { EASE } from "./Reveal";

export default function Navbar() {
    const { lang, setLang, t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { id: "#experience", label: t.nav.experience },
        { id: "#menu", label: t.nav.menu },
        { id: "#music", label: t.nav.music },
        { id: "#location", label: t.nav.location },
    ];

    const go = (e, id) => {
        e.preventDefault();
        setOpen(false);
        setTimeout(() => scrollToId(id), open ? 250 : 0);
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    scrolled ? "glass-panel border-b border-gold/15 py-3" : "bg-transparent py-5"
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
                    <Logo onClick={(e) => go(e, "#top")} />

                    <nav className="hidden items-center gap-8 lg:flex">
                        {links.map((l) => (
                            <a
                                key={l.id}
                                href={l.id}
                                data-testid={`nav-link-${l.id.replace("#", "")}`}
                                onClick={(e) => go(e, l.id)}
                                className="group relative text-[12px] font-medium uppercase tracking-[0.2em] text-slate-300 transition-colors hover:text-gold"
                            >
                                {l.label}
                                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-400 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div
                            data-testid="nav-open-status"
                            className="hidden items-center gap-2 rounded-full border border-gold/25 bg-navy/60 px-3 py-1.5 md:flex"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                                {t.nav.status}
                            </span>
                        </div>

                        <div className="flex overflow-hidden rounded-full border border-gold/30" data-testid="language-toggle-btn">
                            {["tr", "en"].map((l) => (
                                <button
                                    key={l}
                                    type="button"
                                    data-testid={`lang-btn-${l}`}
                                    onClick={() => setLang(l)}
                                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                                        lang === l ? "bg-gold text-navy-deep" : "text-slate-300 hover:text-gold"
                                    }`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            data-testid="nav-reserve-btn"
                            onClick={(e) => go(e, "#reservation")}
                            className="btn-gold hidden rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] sm:inline-flex"
                        >
                            {t.nav.reserve}
                        </button>

                        <button
                            type="button"
                            data-testid="nav-mobile-toggle-btn"
                            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                            onClick={() => setOpen((v) => !v)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold lg:hidden"
                        >
                            {open ? <X size={18} /> : <MenuIcon size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-40 flex flex-col justify-center bg-navy-deep/97 px-8 backdrop-blur-2xl lg:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {[...links, { id: "#reservation", label: t.nav.reserve }].map((l, i) => (
                                <motion.a
                                    key={l.id}
                                    href={l.id}
                                    data-testid={`nav-mobile-link-${l.id.replace("#", "")}`}
                                    onClick={(e) => go(e, l.id)}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                                    className="border-b border-gold/10 py-4 font-display text-4xl font-medium text-cream transition-colors hover:text-gold"
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                        </nav>
                        <motion.a
                            href={CONTACT.phoneHref}
                            data-testid="nav-mobile-call-btn"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                            className="btn-gold mt-10 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em]"
                        >
                            <Phone size={16} /> {CONTACT.phoneDisplay}
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
