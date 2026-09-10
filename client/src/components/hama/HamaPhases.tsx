import { motion, useReducedMotion } from "framer-motion";

interface HamaPhasesProps {
    t: {
        title: string;
        subtitle: string;
        list: {
            phase: string;
            title: string;
            desc: string;
            status: string;
        }[];
    };
}

export default function HamaPhases({ t }: HamaPhasesProps) {
    const reduceMotion = useReducedMotion();
    const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 52 };

    return (
        <section className="relative py-112 md:py-120 px-6 sm:px-8 lg:px-24 bg-[#0b0b10] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: "linear-gradient(#fdfcfb 1px, transparent 1px), linear-gradient(90deg, #fdfcfb 1px, transparent 1px)",
                        backgroundSize: "96px 96px",
                    }}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 xl:gap-56 items-start relative z-10">
                <div className="lg:sticky lg:top-28">
                    <motion.div
                        initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.74, ease: [0.32, 0.72, 0, 1] }}
                        className="space-y-12 overflow-x-clip"
                    >
                        <div className="inline-flex max-w-full items-center gap-5 bg-white/[0.05] border border-white/10 p-1.5 shadow-premium-2xl">
                            <div className="flex items-center gap-4 bg-[#0b0b10] border border-white/10 px-5 py-3 shadow-[inset_0_1px_1px_rgba(253,252,251,0.06)]">
                                <div className="relative w-3 h-3 bg-[#f2a007]">
                                    <span className="absolute inset-0 bg-[#f2a007] motion-safe:animate-ping" />
                                </div>
                                <span className="t-meta text-[10px] font-black tracking-[0.7em] text-[#f2a007] font-sans">
                                    PROTOCOL_EVOLUTION
                                </span>
                            </div>
                        </div>
                        <h3 className="font-institutional text-[clamp(4rem,10vw,11rem)] text-[#fdfcfb] tracking-tightest leading-[0.82] italic break-words">
                            {t.title}
                        </h3>
                        <div className="pt-16 md:pt-24 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 text-[#fdfcfb]/60 font-sans">
                            <span className="t-data text-[9px] font-black tracking-[0.38em] border border-white/10 px-5 py-2 tabular-nums" dir="ltr">
                                NODE_HAMA_7_ALPHA
                            </span>
                            <div className="hidden sm:block w-24 h-px bg-white/10" />
                            <span className="t-meta text-[9px] font-black tracking-[0.34em]">
                                {t.subtitle}
                            </span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={revealInitial}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.16 }}
                    transition={{ duration: 0.74, ease: [0.32, 0.72, 0, 1] }}
                    className="bg-white/[0.055] border border-white/10 p-1.5 shadow-premium-2xl"
                >
                    <div className="grid grid-cols-1 grid-flow-dense gap-px bg-white/10 border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(253,252,251,0.06)]">
                        {t.list.map((phase, i) => {
                            const isArchived = i === 0;

                            return (
                                <motion.div
                                    key={phase.phase}
                                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.32 }}
                                    transition={{ duration: 0.68, delay: reduceMotion ? 0 : i * 0.09, ease: [0.32, 0.72, 0, 1] }}
                                    className="group bg-[#0b0b10] p-10 sm:p-16 xl:p-24 hover:bg-[#11111a] transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] relative overflow-hidden active:scale-[0.995]"
                                >
                                    <div className="absolute top-0 end-0 p-8 text-[clamp(4rem,8vw,8rem)] font-institutional opacity-[0.035] italic text-[#fdfcfb] font-black group-hover:opacity-[0.08] transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] tabular-nums" dir="ltr">
                                        0{phase.phase}
                                    </div>
                                    <div className="flex items-center gap-12 mb-16 relative z-10 font-sans">
                                        <span className={`t-meta text-[9px] font-black tracking-[0.36em] px-6 py-2 border transition-[color,border-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isArchived ? "border-white/15 text-[#fdfcfb]/60" : "border-[#f2a007]/60 text-[#f2a007] motion-safe:animate-pulse"}`}>
                                            {phase.status}
                                        </span>
                                    </div>
                                    <h4 className="text-4xl sm:text-5xl xl:text-6xl font-institutional italic text-[#fdfcfb] mb-12 relative z-10 leading-none group-hover:text-[#f2a007] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] break-words">
                                        {phase.title}
                                    </h4>
                                    <p className="text-xl sm:text-2xl text-[#fdfcfb]/65 leading-tight font-institutional italic max-w-lg group-hover:text-[#fdfcfb]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                        {phase.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
