import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import NodalMap from "./NodalMap";
import { deployAssetPath } from "@/localePath";

interface HeroProps {
    data: {
        eyebrow: string;
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section className="relative bg-[#0b0b10] pt-24 lg:pt-28 pb-12 px-6 md:px-12 lg:px-24 border-b border-[#f2a007]/25 overflow-hidden">
            {/* Background: real event photograph, burgundy-scrimmed */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                <img
                    src={deployAssetPath("/gallery/events/event-group.jpg")}
                    alt=""
                    className="w-full h-full object-cover opacity-60"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b10]/75 via-[#0b0b10]/55 to-[#0b0b10]" />
                <div className="absolute inset-0 bg-[#5a1f2e]/25 mix-blend-multiply" />
            </div>

            <div className="relative z-10 w-full max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    <div className="lg:col-span-5 flex flex-col items-start text-start">
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="t-meta text-[#f2a007]">
                                {data.eyebrow}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-[#fdfcfb] mb-5 leading-[1.05]"
                        >
                            {data.title}
                        </motion.h1>

                        <motion.p
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="text-base md:text-lg text-[#fdfcfb]/75 mb-8 leading-relaxed max-w-2xl"
                        >
                            {data.subtitle}
                        </motion.p>

                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-4 items-center"
                        >
                            <a
                                href="#programs"
                                className="group inline-flex min-h-[46px] items-center gap-3 whitespace-nowrap bg-[#5a1f2e] hover:bg-[#f2a007] hover:text-[#0b0b10] text-[#fdfcfb] px-6 py-3 font-semibold text-sm transition-[color,background-color,transform] active:translate-y-px"
                            >
                                <span>{data.ctaPrimary}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={1.5} />
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#fdfcfb] transition-[color,border-color,background-color,transform] border border-[#fdfcfb]/45 bg-[#0b0b10]/35 hover:bg-[#fdfcfb]/10 hover:border-[#fdfcfb] px-5 py-3 active:translate-y-px"
                            >
                                <span>{data.ctaSecondary}</span>
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7 relative min-h-[280px] lg:min-h-[480px] border border-white/15 overflow-hidden"
                    >
                        <NodalMap activeCountry={null} compact />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
