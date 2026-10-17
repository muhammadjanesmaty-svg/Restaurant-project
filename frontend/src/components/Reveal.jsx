import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 40, className = "" }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export function SectionHeader({ eyebrow, title, sub, center = false }) {
    return (
        <Reveal className={center ? "text-center" : ""}>
            <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
                <span className="h-px w-10 bg-gold/60" />
                <p className="eyebrow">{eyebrow}</p>
                {center && <span className="h-px w-10 bg-gold/60" />}
            </div>
            <h2 className="mt-5 font-display text-3xl font-medium leading-[1.12] text-cream sm:text-4xl lg:text-5xl">
                {title}
            </h2>
            {sub && <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">{sub}</p>}
        </Reveal>
    );
}
