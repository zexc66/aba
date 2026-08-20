import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { memo, type ReactNode } from "react";
import { Target } from "lucide-react";

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
        <Section id="about" className="relative py-24 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-24">

                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    <div className="lg:col-span-7 space-y-16">
                        <SectionHeader
                            index="01"
                            title={data.title}
                            note={data.text}
                            meta={data.metricsTitle}
                        />

                        <ul className="divide-y divide-black/10 border-y border-black/10">
                            {data.bullets.map((b, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className="flex items-center gap-5 py-6 first:pt-0"
                                >
                                    <span className="text-[#5a1f2e] shrink-0">{b.icon}</span>
                                    <p className="text-base font-medium text-[#0b0b10] leading-snug">
                                        {b.text}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <div className="grid grid-cols-2 border border-black/10">
                            {data.metrics.map((stat, i) => (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                    className={`p-6 space-y-1.5 ${i % 2 === 0 ? "border-e border-black/10" : ""} ${i < 2 ? "border-b border-black/10" : ""}`}
                                >
                                    <div className="t-data text-3xl md:text-4xl font-semibold text-[#0b0b10]" dir="ltr">
                                        <bdi>{stat.value}{stat.suffix ?? ""}</bdi>
                                    </div>
                                    <div className="t-meta text-[#5a1f2e]">
                                        {stat.label}
                                    </div>
                                    <p className="text-xs text-black/55 leading-normal">
                                        {stat.desc}
                                    </p>
                                    <span className="t-meta text-black/35 block pt-1" aria-hidden="true">
                                        {stat.id}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0b0b10] text-white p-8 border border-black"
                        >
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                                <h3 className="t-meta text-[#f2a007]">
                                    {data.blueprintTitle}
                                </h3>
                                <Target className="w-4 h-4 text-[#f2a007]" strokeWidth={1.5} />
                            </div>

                            <ul className="space-y-0">
                                {data.blueprint.map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 text-sm text-white/80">
                                        <span className="t-data text-[10px] text-[#f2a007] shrink-0" aria-hidden="true">
                                            {item.id}
                                        </span>
                                        <span>{item.t}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {data.ourStoryTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <SectionHeader
                            index="01.1"
                            title={data.ourStoryTitle}
                            note={data.ourStorySubtitle}
                        />
                        <div className="grid lg:grid-cols-12 gap-12">
                            <p className="lg:col-span-5 text-base text-black/70 leading-relaxed border-s-2 border-[#5a1f2e] ps-6">
                                {data.ourStoryText}
                            </p>
                            <ol className="lg:col-span-7 divide-y divide-black/10 border-y border-black/10">
                                {data.ourStoryMilestones?.map((m, i) => (
                                    <li key={i} className="grid grid-cols-[6rem_1fr] gap-6 py-6">
                                        <span className="t-meta text-[#5a1f2e] pt-1">{m.year}</span>
                                        <div>
                                            <h4 className="text-base font-semibold text-[#0b0b10]">{m.title}</h4>
                                            <p className="text-sm text-black/60 leading-relaxed mt-1">{m.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>
                )}

            </div>
        </Section>
    );
}

const About = memo(AboutComponent);
export default About;
