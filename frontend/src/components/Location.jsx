import { Clock, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { useLang } from "@/i18n";
import { CONTACT } from "@/data/content";
import { Reveal, SectionHeader } from "./Reveal";

export default function LocationSection() {
    const { t } = useLang();

    const rows = [
        { icon: MapPin, label: t.loc.addressLabel, value: CONTACT.address, testid: "location-address" },
        { icon: Phone, label: t.loc.phoneLabel, value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, testid: "location-phone" },
        { icon: Navigation, label: t.loc.plusCodeLabel, value: CONTACT.plusCode, testid: "location-plus-code" },
        { icon: Clock, label: t.loc.hoursLabel, value: t.loc.hoursVal, testid: "location-hours" },
    ];

    return (
        <section id="location" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-line" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <SectionHeader eyebrow={t.loc.eyebrow} title={t.loc.title} sub={t.loc.sub} />

                        <Reveal className="mt-10">
                            <div className="space-y-6">
                                {rows.map((row) => (
                                    <div key={row.testid} className="flex items-start gap-4" data-testid={row.testid}>
                                        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-navy/60 text-gold">
                                            <row.icon size={17} />
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">{row.label}</p>
                                            {row.href ? (
                                                <a href={row.href} className="mt-1 block text-[15px] font-medium text-cream transition-colors hover:text-gold" data-testid="location-phone-link">
                                                    {row.value}
                                                </a>
                                            ) : (
                                                <p className="mt-1 text-[15px] font-medium leading-relaxed text-cream">{row.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="mt-9 flex flex-wrap gap-2.5">
                                {t.loc.amenities.map((a) => (
                                    <span
                                        key={a}
                                        className="rounded-full border border-gold/20 bg-navy/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300"
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.15}>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href={CONTACT.directions}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="location-directions-btn"
                                    className="btn-gold rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em]"
                                >
                                    <Navigation size={15} /> {t.loc.directions}
                                </a>
                                <a
                                    href={CONTACT.phoneHref}
                                    data-testid="location-call-btn"
                                    className="btn-ghost rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em]"
                                >
                                    <Phone size={15} /> {t.loc.call}
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.1}>
                        <div className="relative overflow-hidden rounded-2xl border border-gold/20 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                            <iframe
                                title="SECAFE SEKAPARK Map"
                                src={CONTACT.mapEmbed}
                                data-testid="location-map"
                                loading="lazy"
                                className="map-dark h-[420px] w-full border-0 sm:h-[540px]"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-gold/30 bg-navy-deep/85 px-5 py-2.5 backdrop-blur-md">
                                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">SECAFE SEKAPARK</p>
                                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Sekapark Sahili — Gulf of İzmit</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
