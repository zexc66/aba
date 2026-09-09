import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HamaCTAProps {
    t: {
        title: string;
        subtitle: string;
        button: string;
    };
}

export default function HamaCTA({ t }: HamaCTAProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section id="engagement" className="relative py-[34vh] md:py-[40vh] px-6 sm:px-8 lg:px-24 overflow-hidden bg-[#fdfcfb] text-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none italic text-[#0b0b10] font-institutional text-[100vw] leading-none flex items-center justify-center font-black">
                A
            </div>

            <div className="max-w-6xl mx-auto relative z-10 overflow-x-clip">
                <motion.div
                    initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 54, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.78, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div className="flex flex-col items-center gap-12 mb-28 md:mb-32">
                        <div className="w-1 h-44 md:h-48 bg-black/10 flex flex-col items-center overflow-hidden">
                            <motion.div
                                initial={{ y: reduceMotion ? "0%" : "-100%" }}
                                animate={{ y: reduceMotion ? "0%" : "100%" }}
                                transition={{ duration: 3.2, repeat: reduceMotion ? 0 : Infinity, ease: [0.32, 0.72, 0, 1] }}
                                className="w-full h-full bg-[#5a1f2e]"
                            />
                        </div>
                        <span className="t-meta text-[12px] font-black tracking-[0.75em] text-[#5a1f2e] font-sans">
                            UNIFIED_RESPONSE
                        </span>
                    </div>

                    <h2 className="font-institutional text-[clamp(4.5rem,15vw,15rem)] tracking-tightest leading-[0.72] mb-32 md:mb-44 italic text-[#0b0b10] font-black uppercase text-center w-full max-w-5xl mx-auto break-words">
                        {t.title}
                    </h2>

                    <p className="text-3xl md:text-4xl font-institutional italic text-black/45 mb-48 md:mb-64 max-w-4xl mx-auto leading-tight">
                        "{t.subtitle}"
                    </p>

                    <motion.button
                        type="button"
                        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative inline-flex max-w-full flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-4 active:scale-[0.98] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        onClick={() => window.location.href = "#contact"}
                    >
                        <span className="relative bg-black/[0.04] border border-black/[0.08] p-1.5 shadow-premium-2xl">
                            <span className="absolute inset-0 bg-[#5a1f2e] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                            <span className="relative z-10 flex w-52 h-52 sm:w-56 sm:h-56 bg-[#0b0b10] border border-[#5a1f2e]/45 items-center justify-center shadow-[inset_0_1px_1px_rgba(253,252,251,0.08)] group-hover:bg-[#5a1f2e] transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden">
                                <motion.span
                                    className="absolute inset-0 bg-[#fdfcfb]"
                                    animate={reduceMotion ? { opacity: 0 } : { scale: [1, 1.24, 1], opacity: [0, 0.09, 0] }}
                                    transition={{ duration: 2.4, repeat: reduceMotion ? 0 : Infinity, ease: [0.32, 0.72, 0, 1] }}
                                />
                                <ArrowUpRight className="relative z-10 w-20 h-20 text-[#fdfcfb] group-hover:rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" strokeWidth={1.75} />
                            </span>
                        </span>
                        <span className="t-meta text-[14px] sm:text-[16px] font-black tracking-[0.75em] mt-20 md:mt-24 group-hover:text-[#5a1f2e] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-sans break-words">
                            {t.button}
                        </span>
                        <span className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[9px] opacity-20 font-black tracking-widest font-sans text-[#0b0b10]">
                            <span className="t-data tabular-nums" dir="ltr">SOVEREIGN_AUTH_v9.2</span>
                            <span className="w-8 h-px bg-black/40" />
                            <span className="t-meta">SECURE_LINK_ENCRYPTED</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
