import { useEffect, Component } from "react";
import Lenis from "lenis";
import { Toaster, toast } from "sonner";
import { LangProvider } from "@/i18n";
import { lenisRef } from "@/lib/lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experiences from "@/components/Experiences";
import MenuSection from "@/components/Menu";
import Reservations from "@/components/Reservations";
import LocationSection from "@/components/Location";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import "@/App.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-navy-deep p-8 text-center text-slate-300">
                    <div>
                        <p className="font-display text-3xl text-gold">SECAFE SEKAPARK</p>
                        <p className="mt-3 text-sm">Bir şeyler ters gitti. Sayfayı yenilemeyi deneyin.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;
        let raf;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <ErrorBoundary>
            <LangProvider>
                <div className="relative min-h-screen bg-navy-deep text-slate-100 antialiased">
                    <div className="grain-overlay" />
                    <Navbar />
                    <main>
                        <Hero />
                        <Marquee />
                        <Experiences />
                        <MenuSection />
                        <Reservations />
                        <LocationSection />
                        <Testimonials />
                    </main>
                    <Footer />
                    <Toaster theme="dark" position="top-center" richColors closeButton />
                </div>
            </LangProvider>
        </ErrorBoundary>
    );
}
