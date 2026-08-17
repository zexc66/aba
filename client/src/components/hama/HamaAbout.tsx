import { motion } from "framer-motion";

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
    return (
        <section className="relative py-120 px-8 lg:px-24">
            <div className="grid lg:grid-cols-12 gap-64 items-center">
                <div className="lg:col-span-5 relative group">
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)' }}
                        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[3/4] overflow-hidden bg-[#0b0b10] shadow-premium-3xl"
                    >
                        <motion.img 
                            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                            alt="Mission Landscape"
                            initial={{ scale: 1.3, filter: 'grayscale(100%) contrast(150%)' }}
                            whileInView={{ scale: 1, filter: 'grayscale(100%) contrast(120%)' }}
                            transition={{ duration: 3 }}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#5a1f2e]/5 mix-blend-color" />
                        
                        {/* Metadata Overlay on Image */}
                        <div className="absolute bottom-8 left-8 right-8 p-10 bg-white/10 backdrop-blur-xl border border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 font-sans">
                            <span className="text-[9px] font-black tracking-[1em] text-white">RECOVERY_VISUAL_0xAF</span>
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-[#5a1f2e]" />
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: isRTL ? 40 : -40 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className={`absolute bottom-[-10%] ${isRTL ? 'right-[-20%]' : 'left-[-20%]'} w-full max-w-sm bg-white p-24 text-black shadow-premium-2xl z-10 border border-black/5`}
                    >
                        <div className="flex items-center gap-6 mb-12">
                            <div className="w-2 h-16 bg-[#5a1f2e]" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black tracking-[0.6em] text-[#5a1f2e] uppercase font-sans">MANDATE_CORE</span>
                                <h3 className="font-institutional text-5xl italic tracking-tightest leading-none">{t.subtitle}</h3>
                            </div>
                        </div>
                        <p className="text-2xl text-black/50 leading-tight font-institutional italic">"{t.text}"</p>
                        <div className="mt-16 text-[8px] font-black tracking-[0.8em] opacity-10 font-sans">0x-PROTO-CORE-HAMA</div>
                    </motion.div>
                </div>

                <div className="lg:col-span-1 hidden lg:block h-[600px] w-[1px] bg-black/[0.03] mx-auto overflow-hidden relative">
                     <motion.div 
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-transparent via-[#5a1f2e] to-transparent"
                     />
                </div>

                <div className="lg:col-span-6 space-y-72 lg:pl-24">
                    {t.highlights.map((item, i) => (
                        <motion.div 
                            key={item.title}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.3 }}
                            className="relative flex gap-24 group cursor-default"
                        >
                            <div className="absolute -left-32 top-[-20px] text-[22vw] font-institutional opacity-[0.02] select-none italic text-black font-black pointer-events-none group-hover:opacity-[0.04] transition-opacity">
                                {(i+1).toString().padStart(2, '0')}
                            </div>
                            <div className="flex-1 space-y-6 relative z-10">
                                <div className="flex items-center gap-8 font-sans">
                                    <div className="w-12 h-[1px] bg-[#5a1f2e]" />
                                    <span className="text-[9px] font-black tracking-[0.8em] text-[#5a1f2e] uppercase">HIGHLIGHT_PROTOCOL_{i+1}</span>
                                </div>
                                <h4 className="text-6xl font-institutional italic text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors duration-700">{item.title}</h4>
                                <p className="text-2xl text-black/40 leading-tight font-institutional italic max-w-lg group-hover:text-black transition-all">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
