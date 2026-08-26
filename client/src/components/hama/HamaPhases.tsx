import { motion } from "framer-motion";

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
    return (
        <section className="relative py-120 px-8 lg:px-24 bg-[#0b0b10] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#fdfcfb 1px, transparent 1px), linear-gradient(90deg, #fdfcfb 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-72 items-start relative z-10">
                <div className="sticky top-120">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-4 h-4 rounded-full bg-[#5a1f2e] animate-ping" />
                            <span className="text-[10px] font-black tracking-[1.2em] text-[#5a1f2e] uppercase font-sans">PROTOCOL_EVOLUTION</span>
                        </div>
                        <h3 className="font-institutional text-[10vw] text-white tracking-tightest leading-[0.8] transform -translate-x-4 italic">
                            {t.title}
                        </h3>
                        <div className="pt-24 flex items-center gap-12 text-white/30 font-sans">
                            <span className="text-[9px] font-black tracking-[0.5em] border border-white/10 px-6 py-2">NODE_HAMA_7_ALPHA</span>
                            <div className="w-24 h-[1px] bg-white/10" />
                            <span className="text-[9px] font-black tracking-[0.5em]">{t.subtitle}</span>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-1px bg-white/5 border border-white/5 shadow-premium-3xl">
                    {t.list.map((phase, i) => (
                        <motion.div 
                            key={phase.phase}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.2 }}
                            className="group bg-[#0b0b10] p-32 hover:bg-white/[0.02] transition-colors relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-[4vw] font-institutional opacity-[0.03] italic text-white font-black group-hover:opacity-[0.08] transition-opacity">
                                0{phase.phase}
                            </div>
                            <div className="flex items-center gap-12 mb-16 relative z-10 font-sans">
                                <span className={`text-[9px] font-black tracking-widest px-8 py-2 border ${phase.status === 'Archived' || phase.status === 'مؤرشف' ? 'border-white/10 text-white/20' : 'border-[#5a1f2e] text-[#5a1f2e] animate-pulse'} uppercase`}>
                                    {phase.status}
                                </span>
                            </div>
                            <h4 className="text-6xl font-institutional italic text-white mb-12 relative z-10 leading-none group-hover:text-[#5a1f2e] transition-colors duration-700">{phase.title}</h4>
                            <p className="text-2xl text-white/40 leading-tight font-institutional italic max-w-lg group-hover:text-white/80 transition-[color,background-color,border-color,transform] duration-700">
                                {phase.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
