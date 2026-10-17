export const lenisRef = { current: null };

export function scrollToId(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -72, duration: 1.5 });
    } else {
        el.scrollIntoView({ behavior: "smooth" });
    }
}
