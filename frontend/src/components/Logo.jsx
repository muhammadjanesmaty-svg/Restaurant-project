export const Mark = ({ size = 38, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <circle cx="32" cy="20" r="7.5" fill="#D4AF37" />
        <path
            d="M10 38c7-5.5 14.5-5.5 22 0s15 5.5 22 0"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
        />
        <path
            d="M17 48c5-4 10-4 15 0s10 4 15 0"
            stroke="#D4AF37"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.5"
        />
    </svg>
);

export default function Logo({ light = false, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            data-testid="logo-home-btn"
            className="group flex items-center gap-3 text-left"
            aria-label="SECAFE SEKAPARK"
        >
            <span className="transition-transform duration-500 group-hover:rotate-[15deg]">
                <Mark size={40} />
            </span>
            <span className="flex flex-col leading-none">
                <span className={`font-display text-[1.35rem] font-semibold tracking-[0.12em] ${light ? "text-cream" : "text-cream"}`}>
                    SECAFE
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.42em] text-gold">
                    SEKAPARK
                </span>
            </span>
        </button>
    );
}
