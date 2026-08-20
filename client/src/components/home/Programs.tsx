import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, CheckCircle2 } from "lucide-react";
import { memo } from "react";
import { programStatusTone } from "@/lib/utils";
import type { Content } from "@/data";

interface ProgramsProps {
    data: Content["programs"];
}

const STATUS_PILL: Record<string, string> = {
    active: "text-emerald-700 bg-emerald-50 border-emerald-200",
    dev: "text-amber-700 bg-amber-50 border-amber-200",
    pipeline: "text-black/60 bg-black/5 border-black/10",
};
const STATUS_DOT: Record<string, string> = {
    active: "bg-emerald-500 animate-pulse",
    dev: "bg-amber-500",
    pipeline: "bg-black/40",
};

function ProgramsComponent({ data }: ProgramsProps) {
    const featuredProgram = data.list.find((p) => p.link === "/hama-project") || data.list[0];

    return (
        <Section id="programs" className="relative py-28 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="02"
                    title={data.title}
                    note={data.sectionNote}
                    meta={`${data.list.length} PROGRAMS`}
                />

                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    href={featuredProgram.link ?? `/programs/${featuredProgram.slug}`}
                    className="mb-14 block bg-[#0b0b10] p-8 lg:p-12 text-white relative overflow-hidden border border-black group"
                >

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="t-meta bg-[#5a1f2e] text-white border border-[#f2a007]/40 px-3 py-1.5">
                                    {data.flagshipLabel}
                                </span>
                                <span className="t-meta text-white/60 flex items-center gap-1.5">
                                    <CheckCircle2 size={13} className="text-emerald-400" />
                                    {featuredProgram.status}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#f2a007] transition-colors leading-tight">
                                {featuredProgram.name}
                            </h3>

                            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
                                {featuredProgram.desc}
                            </p>

                            <p className="t-meta text-white/50 pt-2" dir="ltr">
                                {featuredProgram.tags.join(" \u00b7 ")}
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-6">
                            {featuredProgram.logo && (
                                <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-white/10 p-1 shadow-lg">
                                    <img loading="lazy" decoding="async" src={featuredProgram.logo} alt="Project Logo" className="w-full h-full object-cover rounded-lg" />
                                </div>
                            )}

                            <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0b10] bg-[#f2a007] hover:bg-white px-6 py-3 transition-colors group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                <span>{data.exploreLabel}</span>
                                <ArrowUpRight size={18} />
                            </span>
                        </div>
                    </div>
                </motion.a>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.list.filter((program) => program !== featuredProgram).map((program, i) => {
                        const tone = programStatusTone(program.status);
                        return (
                            <motion.a
                                key={`${program.slug}-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                                href={program.link ?? `/programs/${program.slug}`}
                                className="group block bg-white border border-black/10 p-8 flex flex-col justify-between hover:border-[#5a1f2e]/50 transition-colors duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a1f2e] to-[#f2a007] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div>
                                    <div className="flex items-center justify-between mb-6 gap-2">
                                        <div className="w-12 h-12 bg-[#5a1f2e]/10 text-[#5a1f2e] flex items-center justify-center group-hover:bg-[#5a1f2e] group-hover:text-white transition-colors duration-300 shrink-0 border border-[#5a1f2e]/15">
                                            {program.icon || <Globe className="w-6 h-6" />}
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border ${STATUS_PILL[tone]}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[tone]}`} />
                                            {program.status}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors mb-3 leading-snug">
                                        {program.name}
                                    </h3>
                                    <p className="text-sm text-black/70 leading-relaxed mb-6">
                                        {program.desc}
                                    </p>
                                </div>

                                <div className="pt-5 border-t border-black/5 flex items-center justify-between">
                                    <p className="t-meta text-black/55 leading-relaxed" dir="ltr">
                                        {program.tags.join(" \u00b7 ")}
                                    </p>

                                    <div className="w-9 h-9 bg-black/5 group-hover:bg-[#5a1f2e] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                                        <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

const Programs = memo(ProgramsComponent);
export default Programs;
