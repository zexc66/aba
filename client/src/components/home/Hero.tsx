import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NodalMap from "./NodalMap";
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
    const { content } = useLanguageContext();

    return (
        <section className="relative bg-[#0b0b10] pt-28 lg:pt-32 pb-14 px-6 md:px-12 lg:px-24 border-b border-black overflow-hidden">
            {/* Background: real event photograph, burgundy-scrimmed */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <img
                    src="/gallery/events/event-group.jpg"
                    alt=""
                    className="w-full h-full object-cover opacity-40"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b10]/70 via-[#0b0b10]/50 to-[#0b0b10]" />
                <div className="absolute inset-0 bg-[#5a1f2e]/20 mix-blend-multiply" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-5 flex flex-col items-start text-start">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="t-meta text-[#f2a007]">
                                {data.eyebrow}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.05]"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="text-base md:text-lg text-white/70 mb-8 leading-relaxed max-w-2xl"
                        >
                            {data.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-5 items-center"
                        >
                            <a
                                href="#programs"
                                className="group flex items-center gap-3 bg-[#5a1f2e] hover:bg-[#f2a007] hover:text-[#0b0b10] text-white px-6 py-3 font-semibold text-sm transition-colors no-press"
                            >
                                <span>{data.ctaPrimary}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />
                            </a>

                            <a
                                href="#contact"
                                className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors border border-white/25 hover:border-white px-5 py-3 no-press"
                            >
                                <span>{data.ctaSecondary}</span>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7 relative h-[42vh] min-h-[320px] lg:h-auto lg:min-h-[560px] border border-white/15 overflow-hidden"
                    >
                        <NodalMap activeCountry={null} compact />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24 }}
                    className="mt-12 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6"
                >
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="border-s-2 border-[#f2a007]/30 ps-3 py-0.5"
                        >
                            <div className="t-meta text-white/50 mb-1.5">
                                {s.label}
                            </div>
                            <div className="t-data text-2xl md:text-3xl font-semibold text-white leading-none" dir="ltr">
                                <bdi>{s.value}</bdi>
                            </div>
                        </div>
                    ))}
                    <p className="t-meta text-white/35 pt-1">{content.corridor.verifiedLabel}</p>
                </motion.div>
            </div>
        </section>
    );
}
