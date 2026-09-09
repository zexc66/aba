import { motion, MotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HamaHeroProps {
    t: {
        eyebrow: string;
        title: string;
        subtitle: string;
        description: string;
        ctaPrimary: string;
    };
    isRTL: boolean;
    opacityTransform: MotionValue<number>;
    scaleTransform: MotionValue<number>;
    heroLetterY: MotionValue<number>;
}

export default function HamaHero({ t, isRTL, opacityTransform, scaleTransform, heroLetterY }: HamaHeroProps) {
    const reduceMotion = useReducedMotion();
    const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 };
    const revealTransition = { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const };

    return (
        <section className="relative min-h-[120vh] flex flex-col justify-center px-6 sm:px-8 lg:px-24 pt-36 pb-40 lg:pt-28 lg:pb-48 overflow-x-clip">
            <motion.div
                style={{ opacity: opacityTransform, scale: scaleTransform }}
                className="relative z-10 grid lg:grid-cols-12 gap-20 xl:gap-28 items-end"
            >
                <motion.div
                    initial={revealInitial}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={revealTransition}
                    className="lg:col-span-9 overflow-x-clip"
                >
                    <motion.div
                        initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        className="inline-flex max-w-full items-center gap-6 border border-black/[0.08] bg-black/[0.035] p-1.5 mb-28 md:mb-32 shadow-premium-2xl font-sans"
                    >
                        <div className="flex items-center gap-5 bg-[#fdfcfb] border border-black/[0.06] px-7 py-3 shadow-[inset_0_1px_1px_rgba(253,252,251,0.9)]">
                            <div className="relative h-2.5 w-2.5 bg-[#5a1f2e]">
                                <span className="absolute inset-0 bg-[#5a1f2e] motion-safe:animate-ping" />
                            </div>
                            <span className="t-meta text-[10px] font-black tracking-[0.7em] text-[#5a1f2e]">
                                {t.eyebrow}
                            </span>
                        </div>
                    </motion.div>

                    <h1 className="max-w-5xl text-[clamp(4.25rem,14vw,15.5rem)] font-institutional leading-[0.78] tracking-tightest mb-24 italic transform-gpu perspective-2000 break-words">
                        {t.title.split(" ").map((word: string, i: number) => (
                            <motion.span
                                key={i}
                                initial={reduceMotion ? { opacity: 1, y: 0, rotateX: 0, skewY: 0 } : { opacity: 0, y: 120, rotateX: 50, skewY: 8 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
                                transition={{ duration: 0.95, delay: reduceMotion ? 0 : 0.16 + i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                                className={`block ${i % 2 === 1 ? (isRTL ? "mr-8 md:mr-44 xl:mr-64" : "ml-8 md:ml-44 xl:ml-64") : ""} ${word.toLowerCase() === "hama" ? "text-[#5a1f2e] font-black" : "text-[#0b0b10]/90"}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                </motion.div>

                <div className="lg:col-span-3 space-y-20 lg:space-y-24 pb-16 lg:pb-32">
                    <motion.div
                        initial={revealInitial}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.28 }}
                        className="bg-black/[0.035] border border-black/[0.08] p-1.5 shadow-premium-2xl"
                    >
                        <div className="bg-[#fdfcfb] border border-black/[0.06] p-8 lg:p-10 shadow-[inset_0_1px_1px_rgba(253,252,251,0.9)]">
                            <div className="h-14 w-1 bg-[#5a1f2e] mb-10" />
                            <h2 className="text-4xl lg:text-5xl font-institutional italic text-[#0b0b10] leading-none mb-12 transform-gpu">
                                {t.subtitle}
                            </h2>
                            <p className="text-xl lg:text-2xl text-black/60 leading-tight font-institutional italic tracking-tight">
                                "{t.description}"
                            </p>
                        </div>
                    </motion.div>

                    <div className="pt-12">
                        <motion.button
                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex min-h-16 max-w-full items-center gap-10 border border-[#5a1f2e]/50 bg-[#0b0b10] px-8 py-5 text-[#fdfcfb] shadow-premium-2xl overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-4 active:scale-[0.98]"
                            onClick={() => {
                                const el = document.getElementById("engagement");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            <motion.div className="absolute inset-0 bg-[#5a1f2e] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                            <div className="relative z-10 flex flex-col text-start font-sans min-w-0">
                                <span className="t-meta text-[12px] font-black tracking-[0.45em] text-[#f2a007] group-hover:text-[#fdfcfb] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] break-words">
                                    {t.ctaPrimary}
                                </span>
                                <span className="text-[8px] opacity-20 tracking-widest uppercase mt-2 group-hover:opacity-40 font-mono">
                                    SOVEREIGN_ACCESS_v7
                                </span>
                            </div>
                            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-[#fdfcfb]/15 bg-[#fdfcfb]/5 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
                                <ArrowUpRight className="w-6 h-6 text-[#fdfcfb] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-45" strokeWidth={1.75} />
                            </span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ y: heroLetterY }}
                className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none -z-10"
            >
                <div className="font-institutional text-[100vw] leading-none tracking-tightest italic text-[#0b0b10] font-black">H</div>
            </motion.div>

            <div className="absolute bottom-24 right-24 hidden xl:grid grid-cols-1 gap-6 opacity-10 pointer-events-none text-right font-sans">
                <div className="flex flex-col items-end">
                    <span className="t-meta text-[9px] font-black tracking-[1em] text-[#5a1f2e] border-b border-[#5a1f2e]/20 mb-2">
                        GEOSPATIAL_DATALINK
                    </span>
                    <div className="flex gap-8 t-data tabular-nums" dir="ltr">
                        <span className="text-[8px] font-black uppercase">LAT: 35.1318° N</span>
                        <span className="text-[8px] font-black uppercase">LONG: 36.7578° E</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
