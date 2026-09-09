import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { deployAssetPath } from "@/localePath";

interface PageLoaderProps {
    minDuration?: number;
}

export default function PageLoader({ minDuration = 0 }: PageLoaderProps) {
    const shouldReduceMotion = useReducedMotion();
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                const increment = prev < 80 ? 3 : 1;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, minDuration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [minDuration]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden border-[#0b0b10]/10 bg-[#fdfcfb] text-[#0b0b10]"
                    role="status"
                    aria-label="AIABASD loading"
                    aria-live="polite"
                >
                    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                        <div className="absolute inset-x-0 top-1/3 h-px bg-[#5a1f2e]/10" />
                        <div className="absolute inset-x-0 bottom-1/3 h-px bg-[#f2a007]/20" />
                        <div className="absolute inset-y-0 start-1/4 w-px bg-[#0b0b10]/5" />
                        <div className="absolute inset-y-0 end-1/4 w-px bg-[#0b0b10]/5" />
                        <div className="absolute inset-10 border border-[#0b0b10]/5" />
                    </div>

                    <motion.div
                        initial={{ scale: shouldReduceMotion ? 1 : 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.1, duration: shouldReduceMotion ? 0 : 0.25 }}
                        className="relative z-10 mb-8"
                    >
                        <motion.img
                            src={deployAssetPath("/logo.png")}
                            alt="AIABASD"
                            className="h-24 w-auto"
                            animate={shouldReduceMotion ? undefined : { y: [0, -4, 0] }}
                            transition={shouldReduceMotion ? undefined : {
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute -inset-3 -z-10 border border-[#5a1f2e]/20 shadow-[0_18px_45px_rgba(90,31,46,0.12)]"
                            animate={shouldReduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
                            transition={shouldReduceMotion ? undefined : {
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: shouldReduceMotion ? 0 : 0.25 }}
                        className="relative z-10 text-center mb-8"
                    >
                        <div className="text-2xl font-bold text-[#0b0b10] text-balance">
                            AIABASD
                        </div>
                        <div className="mt-1 text-sm text-[#0b0b10]/55 text-pretty">
                            African International Business Alliance
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scaleX: shouldReduceMotion ? 1 : 0.96 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: shouldReduceMotion ? 0 : 0.25, duration: shouldReduceMotion ? 0 : 0.25 }}
                        className="relative z-10 origin-center"
                    >
                        <div className="h-1.5 w-[200px] origin-start overflow-hidden bg-[#0b0b10]/10">
                            <motion.div
                                className="h-full origin-start bg-[#5a1f2e]"
                                style={{ scaleX: progress / 100 }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.1 }}
                            />
                        </div>
                        <div className="mt-3 text-center text-xs tabular-nums text-[#0b0b10]/45">
                            Loading experience...
                        </div>
                    </motion.div>

                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-2 w-2 rounded-full bg-[#f2a007]/55"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                            }}
                            animate={shouldReduceMotion ? undefined : {
                                y: [0, -20, 0],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={shouldReduceMotion ? undefined : {
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
