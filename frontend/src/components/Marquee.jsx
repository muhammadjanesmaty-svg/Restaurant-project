import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee() {
    return (
        <div className="relative overflow-hidden border-y border-gold/20 bg-navy/70 py-5 marquee-mask" data-testid="marquee-track">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((copy) => (
                    <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                        {MARQUEE_ITEMS.map((item) => (
                            <span
                                key={`${copy}-${item}`}
                                className="flex items-center gap-6 whitespace-nowrap pr-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/85 sm:gap-10 sm:pr-10 sm:text-xs"
                            >
                                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" />
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
