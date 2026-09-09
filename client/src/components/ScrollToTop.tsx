import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const markerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const marker = markerRef.current;
        if (!marker) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(!entry.isIntersecting),
            { threshold: 0 }
        );

        observer.observe(marker);
        return () => observer.disconnect();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: shouldReduceMotion ? "auto" : "smooth"
        });
    };

    return (
        <>
            <div ref={markerRef} className="pointer-events-none absolute top-[500px] h-px w-px" aria-hidden="true" />
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92, y: shouldReduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92, y: shouldReduceMotion ? 0 : 12 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                        onClick={scrollToTop}
                        className="group fixed bottom-6 start-6 z-[50] flex h-12 w-12 items-center justify-center border border-[#f2a007]/35 bg-[#5a1f2e] text-[#fdfcfb] shadow-[0_14px_36px_rgba(90,31,46,0.22)] transition-[background-color,border-color,transform,box-shadow] duration-200 hover:border-[#f2a007] hover:bg-[#0b0b10] hover:shadow-[0_16px_42px_rgba(11,11,16,0.24)] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2a007] motion-reduce:transition-none"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none" strokeWidth={1.75} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
