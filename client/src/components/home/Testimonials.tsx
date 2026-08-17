import { useState, useEffect, memo } from "react";
import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { type Content } from "@/data";

interface TestimonialsProps {
    data: Content['testimonials'];
    hud: Content['hud'];
    lang: string;
}

function TestimonialsComponent({ data }: TestimonialsProps) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % data.list.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [autoPlay, data.list.length]);

    const next = () => {
        setAutoPlay(false);
        setCurrent((prev) => (prev + 1) % data.list.length);
    };

    const prev = () => {
        setAutoPlay(false);
        setCurrent((prev) => (prev - 1 + data.list.length) % data.list.length);
    };

    const t = data.list[current];

    return (
        <Section id="testimonials" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Header Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                Endorsements & Leadership
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10] leading-tight">
                            {data.title.main}{" "}
                            <span className="text-[#5a1f2e]">{data.title.highlighted}</span>
                        </h2>

                        <p className="text-sm text-black/60 leading-relaxed max-w-md">
                            Direct perspectives from sovereign partners, institutional investors, and regional development directors.
                        </p>

                        {/* Controls */}
                        <div className="flex items-center gap-4 pt-4">
                            <button 
                                onClick={prev}
                                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-all shadow-sm"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={next}
                                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black/70 hover:bg-[#5a1f2e] hover:text-white hover:border-[#5a1f2e] transition-all shadow-sm"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <span className="text-xs font-semibold text-black/40 ml-2">
                                {(current + 1).toString().padStart(2, '0')} / {data.list.length.toString().padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    {/* Quote Card */}
                    <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-black/5 shadow-md relative overflow-hidden min-h-[320px] flex flex-col justify-between">
                        <Quote className="w-12 h-12 text-[#5a1f2e]/10 absolute top-6 right-6" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6 relative z-10"
                            >
                                <blockquote className="text-xl md:text-2xl font-medium text-[#0b0b10] leading-relaxed italic">
                                    "{t.quote}"
                                </blockquote>

                                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-base font-bold text-[#0b0b10]">
                                            {t.author}
                                        </h4>
                                        <p className="text-xs font-semibold text-[#5a1f2e] uppercase tracking-wide mt-0.5">
                                            {t.position}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Indicators */}
                        <div className="flex gap-2 pt-6">
                            {data.list.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrent(i);
                                        setAutoPlay(false);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === current ? 'w-8 bg-[#5a1f2e]' : 'w-2 bg-black/10'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    );
}

const Testimonials = memo(TestimonialsComponent);
export default Testimonials;
