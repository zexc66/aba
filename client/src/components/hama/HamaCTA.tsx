import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface HamaCTAProps {
    t: {
        title: string;
        subtitle: string;
        button: string;
    };
}

export default function HamaCTA({ t }: HamaCTAProps) {
    return (
        <section id="engagement" className="relative py-[40vh] px-8 lg:px-24 overflow-hidden bg-white text-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none italic text-black font-institutional text-[100vw] leading-none flex items-center justify-center font-black">
                A
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex flex-col items-center gap-12 mb-32">
                        <div className="w-1 h-48 bg-black/10 flex flex-col items-center">
                            <motion.div 
                                animate={{ height: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-full bg-[#5a1f2e]" 
                            />
                        </div>
                        <span className="text-[12px] font-black tracking-[1.5em] text-[#5a1f2e] uppercase font-sans">UNIFIED_RESPONSE</span>
                    </div>
                    
                    <h2 className="font-institutional text-8xl md:text-[18vw] tracking-tightest leading-[0.6] mb-48 italic text-black font-black uppercase text-center w-full">
                        {t.title}
                    </h2>
                    
                    <p className="text-4xl font-institutional italic text-black/40 mb-72 max-w-4xl mx-auto leading-tight">
                        "{t.subtitle}"
                    </p>
                    
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative inline-flex flex-col items-center"
                        onClick={() => window.location.href = '#contact'}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#5a1f2e] rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                            <div className="w-56 h-56 rounded-full bg-black flex items-center justify-center shadow-premium-3xl group-hover:bg-[#5a1f2e] transition-[color,background-color,border-color,transform] duration-1000 relative z-10 overflow-hidden">
                                 <motion.div 
                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                                    animate={{ scale: [1, 1.5], opacity: [0, 0.1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                 />
                                 <ArrowUpRight className="w-20 h-20 text-white group-hover:rotate-45 transition-transform duration-1000" />
                            </div>
                        </div>
                        <span className="text-[16px] font-black tracking-[1.5em] uppercase mt-24 group-hover:text-[#5a1f2e] transition-colors font-sans">
                            {t.button}
                        </span>
                        <div className="mt-8 flex items-center gap-4 text-[9px] opacity-10 font-black tracking-widest font-sans">
                            <span>SOVEREIGN_AUTH_v9.2</span>
                            <div className="w-8 h-[1px] bg-black" />
                            <span>SECURE_LINK_ENCRYPTED</span>
                        </div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
