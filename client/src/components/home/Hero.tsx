import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NodalMap from "./NodalMap";

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
    return (
        <section className="relative bg-[#fdfcfb] pt-32 lg:pt-40 pb-16 px-6 md:px-12 lg:px-24 border-b border-black/5 overflow-hidden">
            <div className="relative w-full max-w-[1500px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-5 flex flex-col items-start text-start">
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

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-[#0b0b10] mb-8 leading-tight"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-lg md:text-xl text-black/70 mb-10 leading-relaxed max-w-2xl"
                        >
                            {data.subtitle}
                        </motion.p>

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
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                            </a>

                            <a
                                href="#contact"
                                className="flex items-center gap-2 text-sm font-semibold text-[#0b0b10] hover:text-[#5a1f2e] transition-colors border border-black/10 px-6 py-3.5 rounded-lg bg-white shadow-sm"
                            >
                                <span>{data.ctaSecondary}</span>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        className="lg:col-span-7 relative h-[42vh] min-h-[320px] lg:h-auto lg:min-h-[560px] bg-white rounded-2xl shadow-md border border-black/5 overflow-hidden"
                        transition={{ duration: 1.1, delay: 0.2 }}
                    >
                        <NodalMap activeCountry={null} compact />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-14 pt-8 border-t border-black/5 grid grid-cols-1 sm:grid-cols-3 gap-8"
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="border-s-2 border-[#5a1f2e]/20 ps-4 py-1"
                        >
                            <div className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-1">
                                {s.label}
                            </div>
                            <div className="text-3xl font-bold text-[#0b0b10] leading-none" dir="ltr">
                                <bdi>{s.value}</bdi>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
