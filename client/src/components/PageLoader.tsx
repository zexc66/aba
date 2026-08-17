import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gradient } from "@/data";

interface PageLoaderProps {
    minDuration?: number;
}

export default function PageLoader({ minDuration = 1500 }: PageLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Accelerate towards the end
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
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
                >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                x: [0, -50, 0],
                                y: [0, 30, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="relative z-10 mb-8"
                    >
                        <motion.img
                            src="/logo.png"
                            alt="AIABASD"
                            className="h-24 w-auto rounded-2xl shadow-xl"
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        {/* Glow effect */}
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* Brand name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative z-10 text-center mb-8"
                    >
                        <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-700 bg-clip-text text-transparent">
                            AIABASD
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            African International Business Alliance
                        </div>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 200 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="relative z-10"
                    >
                        <div className="w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${gradient} rounded-full`}
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <div className="text-xs text-gray-400 text-center mt-3">
                            Loading experience...
                        </div>
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
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
