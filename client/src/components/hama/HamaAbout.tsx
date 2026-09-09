import { motion, useReducedMotion } from "framer-motion";

interface HamaAboutProps {
    t: {
        subtitle: string;
        text: string;
        highlights: {
            title: string;
            desc: string;
        }[];
    };
    isRTL: boolean;
}

export default function HamaAbout({ t, isRTL }: HamaAboutProps) {
    const reduceMotion = useReducedMotion();
    const revealInitial = reduceMotion ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 52, x: 0 };
    const revealTransition = { duration: 0.72, ease: [0.32, 0.72, 0, 1] as const };

    return (
        <section className="relative py-112 md:py-120 px-6 sm:px-8 lg:px-24 overflow-x-clip">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 xl:gap-56 items-center">
                <motion.div
                    initial={revealInitial}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={revealTransition}
                    className="lg:col-span-5 relative group"
                >
                    <div className="bg-black/[0.04] border border-black/[0.08] p-1.5 shadow-premium-2xl">
                        <motion.div
                            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.78, ease: [0.32, 0.72, 0, 1] }}
                            className="relative aspect-[3/4] overflow-hidden bg-[#0b0b10] border border-black/[0.08] shadow-[inset_0_1px_1px_rgba(253,252,251,0.08)]"
                        >
                            <motion.img
                                src="/projects/hama-logo.jpg"
                                alt="Mission Landscape"
                                initial={reduceMotion ? { scale: 1 } : { scale: 1.08 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1] }}
                                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-[#5a1f2e]/12 mix-blend-multiply pointer-events-none" />
                            <div className="absolute inset-6 border border-[#fdfcfb]/10 pointer-events-none" />

                            <div className="absolute bottom-6 inset-x-6 border border-[#fdfcfb]/15 bg-[#0b0b10]/88 p-1.5 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100 font-sans">
                                <div className="flex justify-between items-center gap-6 border border-[#fdfcfb]/10 bg-[#fdfcfb]/[0.03] px-5 py-4 shadow-[inset_0_1px_1px_rgba(253,252,251,0.06)]">
                                    <span className="t-data text-[9px] font-black tracking-[0.5em] text-[#fdfcfb]/85 tabular-nums" dir="ltr">
                                        RECOVERY_VISUAL_0xAF
                                    </span>
                                    <div className="w-10 h-10 border border-[#fdfcfb]/20 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#f2a007]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={reduceMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.96, x: isRTL ? 34 : -34 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.16, ease: [0.32, 0.72, 0, 1] }}
                        className={`relative mt-6 lg:mt-0 lg:absolute lg:bottom-[-10%] ${isRTL ? "lg:right-[-18%]" : "lg:left-[-18%]"} w-full max-w-sm bg-black/[0.04] p-1.5 text-[#0b0b10] shadow-premium-2xl z-10 border border-black/[0.08]`}
                    >
                        <div className="bg-[#fdfcfb] p-8 sm:p-12 lg:p-16 border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(253,252,251,0.9)]">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-2 h-16 bg-[#5a1f2e]" />
                                <div className="flex flex-col min-w-0">
                                    <span className="t-meta text-[10px] font-black tracking-[0.42em] text-[#5a1f2e] font-sans">MANDATE_CORE</span>
                                    <h3 className="font-institutional text-4xl sm:text-5xl italic tracking-tightest leading-none break-words">
                                        {t.subtitle}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-xl sm:text-2xl text-black/55 leading-tight font-institutional italic">
                                "{t.text}"
                            </p>
                            <div className="mt-16 t-data text-[8px] font-black tracking-[0.6em] opacity-20 font-sans tabular-nums" dir="ltr">
                                0x-PROTO-CORE-HAMA
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="lg:col-span-1 hidden lg:block h-[600px] w-px bg-black/[0.04] mx-auto overflow-hidden relative">
                    <motion.div
                        initial={{ y: reduceMotion ? "0%" : "-100%" }}
                        animate={{ y: reduceMotion ? "0%" : "100%" }}
                        transition={{ duration: 4.5, repeat: reduceMotion ? 0 : Infinity, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-[#5a1f2e] to-transparent"
                    />
                </div>

                <div className="lg:col-span-6 lg:pl-12 xl:pl-24">
                    <div className="grid grid-cols-1 grid-flow-dense gap-px bg-black/[0.08] border border-black/[0.07] shadow-premium-2xl">
                        {t.highlights.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.32 }}
                                transition={{ duration: 0.68, delay: reduceMotion ? 0 : i * 0.09, ease: [0.32, 0.72, 0, 1] }}
                                className="relative group cursor-default bg-[#fdfcfb] p-8 sm:p-12 lg:p-16 overflow-hidden transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.995]"
                            >
                                <div className={`absolute ${isRTL ? "right-6" : "left-6"} top-2 text-[clamp(5rem,14vw,12rem)] font-institutional opacity-[0.025] select-none italic text-[#0b0b10] font-black pointer-events-none group-hover:opacity-[0.045] transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`}>
                                    {(i + 1).toString().padStart(2, "0")}
                                </div>
                                <div className="relative z-10 flex flex-col gap-7">
                                    <div className="flex items-center gap-8 font-sans">
                                        <div className="w-12 h-px bg-[#5a1f2e]" />
                                        <span className="t-data text-[9px] font-black tracking-[0.45em] text-[#5a1f2e] tabular-nums" dir="ltr">
                                            HIGHLIGHT_PROTOCOL_{i + 1}
                                        </span>
                                    </div>
                                    <h4 className="text-4xl sm:text-5xl xl:text-6xl font-institutional italic text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] leading-none break-words">
                                        {item.title}
                                    </h4>
                                    <p className="text-xl sm:text-2xl text-black/45 leading-tight font-institutional italic max-w-xl group-hover:text-black/75 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
