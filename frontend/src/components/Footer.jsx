import { Facebook, Globe, Instagram, Phone } from "lucide-react";
import { useLang } from "@/i18n";
import { CONTACT } from "@/data/content";
import { Mark } from "./Logo";
import { scrollToId } from "@/lib/lenis";

export default function Footer() {
    const { t, isTr } = useLang();
    const year = new Date().getFullYear();

    const links = [
        { id: "#experience", label: t.nav.experience },
        { id: "#menu", label: t.nav.menu },
        { id: "#music", label: t.nav.music },
        { id: "#reservation", label: t.nav.reserve },
        { id: "#location", label: t.nav.location },
    ];

    return (
        <footer className="relative border-t border-gold/15 bg-navy-deep pb-10 pt-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-col items-center text-center">
                    <Mark size={52} />
                    <p className="mt-6 bg-gradient-to-b from-cream via-gold to-gold-dim bg-clip-text font-display text-[clamp(2.2rem,7.5vw,5.5rem)] font-semibold leading-none tracking-[0.04em] text-transparent">
                        SECAFE SEKAPARK
                    </p>
                    <p className="mt-4 max-w-md text-sm italic text-slate-400">{t.footer.tagline}</p>
                </div>

                <div className="mt-16 grid gap-12 border-t border-gold/10 pt-12 text-center sm:grid-cols-3 sm:text-left">
                    <div data-testid="footer-contact">
                        <p className="eyebrow">{t.footer.contactTitle}</p>
                        <p className="mt-4 text-sm leading-relaxed text-slate-400">{CONTACT.address}</p>
                        <a
                            href={CONTACT.phoneHref}
                            data-testid="footer-call-link"
                            className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-semibold text-gold transition-colors hover:text-gold-light"
                        >
                            <Phone size={17} /> {CONTACT.phoneDisplay}
                        </a>
                    </div>

                    <div data-testid="footer-hours">
                        <p className="eyebrow">{t.footer.hoursTitle}</p>
                        <p className="mt-4 text-sm text-slate-400">{t.footer.hoursVal}</p>
                        <p className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            {isTr ? "Şu anda açık" : "Open now"}
                        </p>
                    </div>

                    <div data-testid="footer-links">
                        <p className="eyebrow">{t.footer.linksTitle}</p>
                        <ul className="mt-4 space-y-2.5">
                            {links.map((l) => (
                                <li key={l.id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToId(l.id)}
                                        className="text-sm text-slate-400 transition-colors hover:text-gold"
                                    >
                                        {l.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-gold/10 pt-8 sm:flex-row">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        © {year} SECAFE SEKAPARK · {t.footer.rights}
                    </p>
                    <div className="flex items-center gap-3">
                        {[
                            { icon: Instagram, label: "Instagram", testid: "footer-social-instagram" },
                            { icon: Facebook, label: "Facebook", testid: "footer-social-facebook" },
                            { icon: Globe, label: "Google Maps", testid: "footer-social-maps" },
                        ].map(({ icon: Icon, label, testid }) => (
                            <a
                                key={label}
                                href={label === "Google Maps" ? CONTACT.directions : CONTACT.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                data-testid={testid}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-navy-deep"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{t.footer.credit}</p>
                </div>
            </div>
        </footer>
    );
}
