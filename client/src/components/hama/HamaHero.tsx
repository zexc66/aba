import { motion, useTransform, MotionValue } from "framer-motion";
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
    return (
        <section className="relative min-h-[120vh] flex flex-col justify-center px-8 lg:px-24 pt-32 lg:pt-0">
            <motion.div 
                style={{ opacity: opacityTransform, scale: scaleTransform }}
                className="relative z-10 grid lg:grid-cols-12 gap-24 items-end"
            >
                <div className="lg:col-span-9">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-6 px-10 py-4 bg-white border border-black/[0.08] rounded-sm mb-32 shadow-premium font-sans"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#5a1f2e] animate-ping" />
                        <span className="text-[10px] font-black tracking-[1em] text-[#5a1f2e] uppercase">
                            {t.eyebrow}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-9xl md:text-[18vw] font-institutional leading-[0.7] tracking-tightest mb-24 italic transform-gpu perspective-2000">
                        {t.title.split(' ').map((word: string, i: number) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 150, rotateX: 60, skewY: 10 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
                                transition={{ duration: 1.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`block ${i % 2 === 1 ? (isRTL ? 'mr-12 md:mr-80' : 'ml-12 md:ml-80') : ''} ${word.toLowerCase() === 'hama' ? 'text-[#5a1f2e] font-black' : 'text-black opacity-90'}`}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                </div>

                <div className="lg:col-span-3 space-y-24 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="bg-white/50 backdrop-blur-md p-10 border-l-4 border-[#5a1f2e] shadow-premium"
                    >
                        <h2 className="text-4xl lg:text-5xl font-institutional italic text-[#0b0b10] leading-none mb-12 transform-gpu">
                            {t.subtitle}
                        </h2>
                        <p className="text-xl lg:text-2xl text-black/60 leading-tight font-institutional italic tracking-tight">
                            "{t.description}"
                        </p>
                    </motion.div>
                    
                    <div className="pt-12">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            className="group relative flex items-center gap-16 px-12 py-6 bg-[#0b0b10] rounded-sm text-white shadow-premium-2xl overflow-hidden"
                            onClick={() => {
                                const el = document.getElementById('engagement');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <motion.div 
                                className="absolute inset-0 bg-[#5a1f2e] translate-y-full group-hover:translate-y-0 transition-transform duration-700" 
                            />
                            <div className="relative z-10 flex flex-col text-left font-sans">
                                <span className="text-[12px] font-black tracking-[0.8em] uppercase text-[#5a1f2e] group-hover:text-white transition-colors">{t.ctaPrimary}</span>
                                <span className="text-[8px] opacity-20 tracking-widest uppercase mt-2 group-hover:opacity-40 font-mono">SOVEREIGN_ACCESS_v7</span>
                            </div>
                            <ArrowUpRight className="relative z-10 w-8 h-8 group-hover:rotate-45 transition-transform duration-700 text-white" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                style={{ y: heroLetterY }}
                className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none -z-10"
            >
                <div className="font-institutional text-[100vw] leading-none tracking-tightest italic text-black font-black">H</div>
            </motion.div>
            
            <div className="absolute bottom-24 right-24 hidden xl:grid grid-cols-1 gap-6 opacity-10 pointer-events-none text-right font-sans">
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black tracking-[1.5em] text-[#5a1f2e] border-b border-[#5a1f2e]/20 mb-2">GEOSPATIAL_DATALINK</span>
                    <div className="flex gap-8">
                        <span className="text-[8px] font-black uppercase">LAT: 35.1318° N</span>
                        <span className="text-[8px] font-black uppercase">LONG: 36.7578° E</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
