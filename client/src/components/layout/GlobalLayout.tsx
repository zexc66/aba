import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { trackPageview } from "@/services/analytics";

interface GlobalLayoutProps {
    children: ReactNode;
}

/** First-party, anonymous pageview beacon — path only, no identifiers.
 *  Fires only after explicit consent (GDPR). Fire-and-forget: analytics
 *  failure never affects the visitor. */
export default function GlobalLayout({ children }: GlobalLayoutProps) {
    const [location] = useLocation();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        trackPageview(location);
    }, [location]);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-[#fdfcfb]">
            <AnimatePresence mode="wait">
                <motion.main
                    id="main-content"
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
        </div>
    );
}
