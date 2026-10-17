import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import { useLang } from "@/i18n";
import { MENU_CATEGORIES } from "@/data/content";
import { Reveal, SectionHeader, EASE } from "./Reveal";

export default function MenuSection() {
    const { isTr, t } = useLang();
    const [cat, setCat] = useState(MENU_CATEGORIES[0].id);
    const [query, setQuery] = useState("");

    const active = MENU_CATEGORIES.find((c) => c.id === cat);
    const items = useMemo(() => {
        const q = query.trim().toLowerCase();
        return active.items.filter((item) =>
            !q ||
            [item.name_tr, item.name_en, item.desc_tr, item.desc_en]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [active, query]);

    return (
        <section id="menu" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-line" />
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <SectionHeader eyebrow={t.menu.eyebrow} title={t.menu.title} sub={t.menu.sub} />

                <Reveal className="mt-12">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2.5">
                            {MENU_CATEGORIES.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    data-testid={`menu-tab-${c.id}`}
                                    onClick={() => setCat(c.id)}
                                    className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                                        cat === c.id
                                            ? "bg-gold text-navy-deep shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)]"
                                            : "border border-gold/25 text-slate-300 hover:border-gold/70 hover:text-gold"
                                    }`}
                                >
                                    {isTr ? c.label_tr : c.label_en}
                                </button>
                            ))}
                        </div>

                        <div className="relative lg:w-80">
                            <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                data-testid="menu-search-input"
                                placeholder={t.menu.searchPlaceholder}
                                className="field-input pl-11"
                            />
                        </div>
                    </div>
                </Reveal>

                <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    <span data-testid="menu-count">
                        {items.length} {t.menu.itemsCount}
                    </span>
                    <span className="h-px flex-1 mx-6 bg-gold/10" />
                    <span className="text-gold/70">SECAFE</span>
                </div>

                {items.length === 0 ? (
                    <Reveal className="mt-10">
                        <div
                            data-testid="menu-empty-state"
                            className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-gold/30 bg-navy/40 px-8 py-20 text-center"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold">
                                <SearchX size={22} />
                            </span>
                            <p className="font-display text-2xl text-cream">{t.menu.noResults}</p>
                            <p className="max-w-sm text-sm text-slate-400">{t.menu.noResultsHint}</p>
                        </div>
                    </Reveal>
                ) : (
                    <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {items.map((item, i) => (
                                <motion.article
                                    layout
                                    key={item.id}
                                    data-testid={`menu-item-${item.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                                    className="card-frame group overflow-hidden rounded-xl"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={item.img}
                                            alt={isTr ? item.name_tr : item.name_en}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.08]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/20" />
                                        <span className="absolute left-4 top-4 rounded-full bg-navy-deep/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                                            {isTr ? item.badge_tr : item.badge_en}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="font-display text-[1.35rem] font-medium leading-snug text-cream">
                                                {isTr ? item.name_tr : item.name_en}
                                            </h3>
                                            <p
                                                data-testid={`menu-item-price-${item.id}`}
                                                className="whitespace-nowrap font-display text-2xl font-semibold text-gold"
                                            >
                                                {item.price}
                                            </p>
                                        </div>
                                        <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
                                            {isTr ? item.desc_tr : item.desc_en}
                                        </p>
                                        <div className="mt-5 flex items-center justify-between">
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                                {isTr ? item.tag_tr : item.tag_en}
                                            </span>
                                            <span className="h-px w-14 bg-gold/25 transition-all duration-500 group-hover:w-20 group-hover:bg-gold/70" />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
