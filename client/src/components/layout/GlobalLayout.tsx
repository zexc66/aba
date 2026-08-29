import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalLayoutProps {
    children: ReactNode;
}

/** First-party, anonymous pageview beacon — path only, no identifiers.
 *  Fires only after explicit consent (GDPR). Fire-and-forget: analytics
 *  failure never affects the visitor. */
function hasConsent(): boolean {
    try {
        return localStorage.getItem("aiabasd-consent") === "granted";
    } catch {
        return false;
    }
}

function trackPageview(path: string): void {
    if (!hasConsent()) return;
    try {
        const payload = JSON.stringify({ path });
        if (typeof navigator.sendBeacon === "function") {
            navigator.sendBeacon(
                "/api/track",
                new Blob([payload], { type: "application/json" })
            );
        } else {
            void fetch("/api/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: payload,
                keepalive: true,
            });
        }
    } catch {
        // Analytics is best-effort by design.
    }
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
    const [location] = useLocation();

    useEffect(() => {
        trackPageview(location);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-white overflow-x-hidden">
            <AnimatePresence mode="wait">
                <motion.main
                    id="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
        </div>
    );
}
