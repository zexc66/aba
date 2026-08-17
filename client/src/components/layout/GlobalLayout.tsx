import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalLayoutProps {
    children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
    return (
        <div className="relative min-h-screen bg-[#fdfcfb] selection:bg-[#5a1f2e] selection:text-white overflow-x-hidden">
            {/* PAGE TRANSITION FRAME */}
            <AnimatePresence mode="wait">
                <motion.main
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
