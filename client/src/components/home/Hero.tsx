import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface HeroProps {
    data: {
        eyebrow: string;
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
    stats: {
        label: string;
        value: string;
        id?: string;
    }[];
}

export default function Hero({ data, stats }: HeroProps) {
    const { lang } = useLanguageContext();

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fdfcfb] py-24 px-6 md:px-12 lg:px-24 border-b border-black/5">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-[#fdfcfb]/85 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                    alt="Corporate Workspace"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className={`relative w-full max-w-[1500px] mx-auto z-30 ${lang === 'ar' ? 'font-arabic' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-8 flex flex-col items-start text-left">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                {data.eyebrow}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0b0b10] mb-8 leading-tight"
                        >
                            {data.title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-lg md:text-xl text-black/70 mb-10 leading-relaxed max-w-3xl"
                        >
                            {data.subtitle}
                        </motion.p>
                        
                        {/* Call to Actions */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="flex flex-wrap gap-8 items-center"
                        >
                            <a 
                                href="#programs" 
                                className="group flex items-center gap-3 bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md"
                            >
                                <span>{data.ctaPrimary}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </a>
                            
                            <a 
                                href="#contact" 
                                className="flex items-center gap-2 text-sm font-semibold text-[#0b0b10] hover:text-[#5a1f2e] transition-colors border border-black/10 px-6 py-3.5 rounded-lg bg-white shadow-sm"
                            >
                                <span>{data.ctaSecondary}</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats Display */}
                    <div className="lg:col-span-4 grid gap-8 lg:text-right">
                        {stats.slice(0, 3).map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 + (i * 0.15) }}
                                className="border-l-2 lg:border-l-0 lg:border-r-2 border-[#5a1f2e]/20 pl-4 lg:pl-0 lg:pr-4 py-1"
                            >
                                <div className="text-xs font-semibold uppercase tracking-wider text-black/45 mb-1">
                                    {s.label}
                                </div>
                                <div className="text-3xl font-bold text-[#0b0b10] leading-none">
                                    {s.value}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
