import { motion, useReducedMotion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { LucideIcon } from "lucide-react";

interface HamaStatsProps {
    stats: {
        value: string;
        number: number;
        label: string;
        icon: LucideIcon;
        id: string;
        suffix?: string;
    }[];
}

export default function HamaStats({ stats }: HamaStatsProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 };

    return (
        <section className="relative py-72 md:py-80 px-6 sm:px-8 lg:px-24 bg-[#fdfcfb] border-y border-[#0b0b10]/10 overflow-x-clip">
            <motion.div
                initial={initial}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                className="bg-[#0b0b10]/[0.04] border border-[#0b0b10]/10 p-1.5 shadow-premium-2xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10 shadow-[inset_0_1px_1px_rgba(253,252,251,0.9)]">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.id}
                            initial={initial}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.65, delay: reduceMotion ? 0 : i * 0.08, ease: [0.32, 0.72, 0, 1] }}
                            className="group relative min-h-[360px] md:min-h-[400px] bg-[#fdfcfb] p-8 sm:p-12 xl:p-16 flex flex-col justify-between overflow-hidden transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.995]"
                        >
                            <div className="absolute inset-x-8 top-0 h-px bg-[#5a1f2e]/20 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100" />
                            <div className="absolute top-0 end-0 h-32 w-32 bg-[#5a1f2e]/[0.035] opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.08]" />

                            <div className="flex items-start justify-between gap-8 relative z-10 font-sans">
                                <div className="flex flex-col gap-3 min-w-0">
                                    <span className="t-data text-[10px] font-black tracking-[0.45em] uppercase text-[#0b0b10]/55 group-hover:text-[#5a1f2e] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] tabular-nums" dir="ltr">
                                        {stat.id}
                                    </span>
                                    <div className="w-12 h-px bg-[#0b0b10]/10 group-hover:bg-[#5a1f2e]/40 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                                </div>
                                <div className="w-14 h-14 sm:w-16 sm:h-16 border border-[#0b0b10]/10 flex items-center justify-center text-[#0b0b10]/50 group-hover:text-[#5a1f2e] group-hover:border-[#5a1f2e]/35 transition-[color,border-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] bg-[#fdfcfb] shadow-[0_18px_40px_-24px_rgba(90,31,46,0.45)] group-hover:scale-[1.02]">
                                    <stat.icon size={28} strokeWidth={1.75} />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="font-institutional text-[clamp(5rem,10vw,10rem)] mb-5 leading-none tracking-tightest italic transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] transform-gpu text-[#0b0b10]/90 group-hover:text-[#0b0b10] group-hover:skew-x-[-6deg] tabular-nums" dir="ltr">
                                    <AnimatedCounter value={stat.number} />
                                    <span className="text-[clamp(1.75rem,3vw,2.75rem)] not-italic ml-4 text-[#5a1f2e] font-black">
                                        {stat.suffix}
                                    </span>
                                </div>
                                <h3 className="t-meta text-[12px] sm:text-[13px] font-black tracking-[0.42em] uppercase text-[#0b0b10]/60 group-hover:text-[#0b0b10] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] max-w-[16rem]">
                                    {stat.label}
                                </h3>
                            </div>

                            <div className="absolute bottom-10 start-10 opacity-[0.045] group-hover:opacity-[0.08] transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                <stat.icon className="w-44 h-44" strokeWidth={1.5} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
