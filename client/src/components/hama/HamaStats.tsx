import { motion } from "framer-motion";
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
    return (
        <section className="relative py-80 px-8 lg:px-24 bg-white border-y border-black/[0.08]">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1px bg-black/[0.08] shadow-premium-2xl">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={stat.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.2 }}
                        className="bg-white p-24 group relative overflow-hidden h-[400px] flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#5a1f2e]/[0.02] rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-[#5a1f2e]/[0.05] transition-colors" />
                        
                        <div className="flex items-start justify-between relative z-10 font-sans">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black tracking-[1em] uppercase text-black/10 group-hover:text-[#5a1f2e] transition-colors">{stat.id}</span>
                                <div className="w-12 h-[1px] bg-black/5 group-hover:bg-[#5a1f2e]/30 transition-colors" />
                            </div>
                            <div className="w-16 h-16 rounded-sm border border-black/[0.05] flex items-center justify-center text-black/10 group-hover:text-black group-hover:border-black/10 transition-all bg-white shadow-premium">
                                <stat.icon size={28} strokeWidth={0.5} />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="font-institutional text-[10rem] mb-4 leading-none tracking-tightest italic group-hover:skew-x-[-12deg] transition-transform duration-1000 transform-gpu text-black/90 group-hover:text-black">
                                <AnimatedCounter value={stat.number} />
                                <span className="text-4xl not-italic ml-4 text-[#5a1f2e] font-black">{stat.suffix}</span>
                            </div>
                            <h3 className="text-[14px] font-black tracking-[0.8em] uppercase text-black/30 group-hover:text-black transition-all pl-2 font-sans">{stat.label}</h3>
                        </div>
                        
                        <div className="absolute bottom-12 left-12 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                            <stat.icon className="w-48 h-48 opacity-[0.02]" strokeWidth={0.1} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
