import { motion } from "framer-motion";
import { useLang } from "@/i18n";
import { BENTO } from "@/data/content";
import { Reveal, SectionHeader, EASE } from "./Reveal";
import { scrollToId } from "@/lib/lenis";

function BentoCard({ item, className = "", target = "#menu", delay = 0 }) {
    const { isTr } = useLang();
    return (
        <Reveal className={className} delay={delay}>
            <motion.button
                type="button"
                data-testid={`exp-card-${item.key}`}
                onClick={() => scrollToId(target)}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="card-frame spotlight group relative block h-full min-h-[300px] w-full overflow-hidden text-left md:min-h-0"
            >
                <motion.img
                    src={item.img}
                    alt={isTr ? item.title_tr : item.title_en}
                    variants={{ rest: { scale: 1.02 }, hover: { scale: 1.09 } }}
                    transition={{ duration: 1.2, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end p-6 sm:p-8 md:min-h-0">
                    <div className="flex items-center gap-3">
                        <span className="font-display text-sm tracking-[0.35em] text-gold">{item.num}</span>
                        <span className="h-px w-8 bg-gold/50" />
                        <span className="rounded-full border border-gold/30 bg-navy-deep/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                            {isTr ? item.tag_tr : item.tag_en}
                        </span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-medium text-cream sm:text-[1.7rem]">
                        {isTr ? item.title_tr : item.title_en}
                    </h3>
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-slate-300/90">
                        {isTr ? item.desc_tr : item.desc_en}
                    </p>
                </div>
            </motion.button>
        </Reveal>
    );
}

export default function Experiences() {
    const { t } = useLang();
    const [coffee, sea, breakfast, waffle, music] = BENTO;

    return (
        <section id="experience" className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <SectionHeader eyebrow={t.exp.eyebrow} title={t.exp.title} sub={t.exp.sub} />

                <div className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12 md:grid-rows-[440px_340px]">
                    <BentoCard item={coffee} className="md:col-span-8" target="#menu" />
                    <BentoCard item={sea} className="arch-frame md:col-span-4 md:row-span-2 [&>div]:h-full" target="#location" delay={0.1} />
                    <BentoCard item={breakfast} className="md:col-span-4" target="#menu" delay={0.05} />
                    <BentoCard item={waffle} className="md:col-span-4" target="#menu" delay={0.1} />
                    <BentoCard item={music} className="md:col-span-4" target="#music" delay={0.15} />
                </div>
            </div>
        </section>
    );
}
