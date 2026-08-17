import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { memo, type ReactNode } from "react";
import { Target, Globe2, Compass, Award } from "lucide-react";

interface AboutProps {
    data: {
        title: string;
        text: string;
        bullets: {
            icon: ReactNode;
            text: string;
        }[];
        metricsTitle: string;
        metrics: { label: string; value: string; desc: string; id: string; suffix?: string }[];
        blueprintTitle: string;
        blueprint: { t: string; id: string }[];
        ourStoryTitle?: string;
        ourStorySubtitle?: string;
        ourStoryText?: string;
        ourStoryMilestones?: { year: string; title: string; desc: string }[];
    };
}

function AboutComponent({ data }: AboutProps) {
    return (
        <Section id="about" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-24">
                
                {/* Main Institutional Overview Grid */}
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Column: Narrative & Pillars */}
                    <div className="lg:col-span-7 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Eyebrow / Section Title */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                    {data.metricsTitle}
                                </span>
                            </div>

                            {/* Section Heading */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10] mb-6 leading-tight">
                                {data.title}
                            </h2>

                            {/* Narrative Paragraph */}
                            <p className="text-lg md:text-xl text-black/70 leading-relaxed border-l-2 border-[#5a1f2e] pl-6 py-1">
                                {data.text}
                            </p>
                        </motion.div>

                        {/* Core Pillars Grid */}
                        <div className="grid sm:grid-cols-2 gap-8 pt-6">
                            {data.bullets.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="p-6 bg-white rounded-lg border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#5a1f2e]/10 text-[#5a1f2e] flex items-center justify-center">
                                        {b.icon}
                                    </div>
                                    <p className="text-base font-semibold text-[#0b0b10] leading-snug">
                                        {b.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Metrics & Execution Blueprint */}
                    <div className="lg:col-span-5 space-y-12">
                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-xl border border-black/5 shadow-sm">
                            {data.metrics.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="space-y-1"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-[#0b0b10]">
                                        {stat.value}{stat.suffix}
                                    </div>
                                    <div className="text-xs font-semibold text-[#5a1f2e] uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                    <p className="text-xs text-black/60 leading-normal">
                                        {stat.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Execution Blueprint Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0b0b10] text-white p-8 rounded-xl shadow-lg border border-white/10"
                        >
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f2a007]">
                                    {data.blueprintTitle}
                                </h3>
                                <Target className="w-5 h-5 text-[#f2a007]" />
                            </div>
                            
                            <ul className="space-y-4">
                                {data.blueprint.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f2a007]" />
                                        <span>{item.t}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Flagship "Our Story" Showcase Block */}
                {data.ourStoryTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-black/10 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-[#5a1f2e]/5 rounded-full blur-3xl pointer-events-none" />

                        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
                            {/* Left Story Overview */}
                            <div className="lg:col-span-6 space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#5a1f2e] text-white flex items-center justify-center shadow-md">
                                        <Compass size={20} className="text-[#f2a007]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#5a1f2e] block">
                                            Institutional Origin
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#0b0b10]">
                                            {data.ourStoryTitle}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-base font-semibold text-[#5a1f2e] leading-snug">
                                    {data.ourStorySubtitle}
                                </p>

                                <p className="text-sm md:text-base text-black/70 leading-relaxed">
                                    {data.ourStoryText}
                                </p>

                                <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-[#0b0b10]">
                                    <div className="flex items-center gap-2 bg-[#fdfcfb] px-4 py-2 rounded-lg border border-black/5">
                                        <Globe2 size={16} className="text-[#5a1f2e]" />
                                        <span>AU Agenda 2063 Aligned</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#fdfcfb] px-4 py-2 rounded-lg border border-black/5">
                                        <Award size={16} className="text-[#f2a007]" />
                                        <span>UN SDG 2030 Partner</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Story Milestones Timeline */}
                            <div className="lg:col-span-6 space-y-4">
                                {data.ourStoryMilestones?.map((m, idx) => (
                                    <div 
                                        key={idx}
                                        className="p-6 bg-[#fdfcfb] rounded-2xl border border-black/5 hover:border-[#5a1f2e]/30 transition-all duration-300 shadow-sm flex items-start gap-5"
                                    >
                                        <div className="px-3 py-1.5 rounded-xl bg-[#5a1f2e] text-white text-xs font-bold shrink-0">
                                            {m.year}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-[#0b0b10] mb-1">
                                                {m.title}
                                            </h4>
                                            <p className="text-xs text-black/70 leading-relaxed">
                                                {m.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </Section>
    );
}

const About = memo(AboutComponent);
export default About;
