import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { trackPageview } from "@/services/analytics";

interface GlobalLayoutProps {
    children: ReactNode;
}

/** First-party, anonymous pageview beacon — path only, no identifiers.
 *  Fires only after explicit consent (GDPR). Fire-and-forget: analytics
 *  failure never affects the visitor. */
export default function GlobalLayout({ children }: GlobalLayoutProps) {
    const [location] = useLocation();

    useEffect(() => {
        trackPageview(location);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-white overflow-x-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    id="main-content"
                    role="main"
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
