import { Section } from "@/components/ui/section";
import { Link } from "wouter";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, CheckCircle2 } from "lucide-react";
import { memo } from "react";
import { programStatusTone } from "@/lib/utils";
import type { Content } from "@/data";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath, localizedPath } from "@/localePath";

interface ProgramsProps {
    data: Content["programs"];
}

const STATUS_PILL: Record<string, string> = {
    active: "text-[#5a1f2e] bg-[#5a1f2e]/10 border-[#5a1f2e]/25",
    dev: "text-[#0b0b10] bg-[#f2a007]/25 border-[#f2a007]/55",
    pipeline: "text-[#0b0b10]/60 bg-[#0b0b10]/5 border-[#0b0b10]/10",
};
const STATUS_DOT: Record<string, string> = {
    active: "bg-[#5a1f2e] animate-pulse motion-reduce:animate-none",
    dev: "bg-[#f2a007]",
    pipeline: "bg-[#0b0b10]/40",
};

function ProgramsComponent({ data }: ProgramsProps) {
    const { lang } = useLanguageContext();
    const featuredProgram = data.list.find((p) => p.link === "/hama-project") || data.list[0];

    return (
        <Section id="programs" className="relative py-20 bg-[#fdfcfb] border-b border-[#0b0b10]/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="02"
                    title={data.title}
                    note={data.sectionNote}
                    meta={`${data.list.length} ${data.countLabel}`}
                />

                <div className="-mt-8 mb-10 flex justify-end">
                    <Link asChild href={localizedLinkPath("/pipeline", lang)}>
                        <a className="inline-flex items-center t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] py-3 transition-[color,border-color,transform] active:translate-y-px">
                            {`${data.pipelineCta} →`}
                        </a>
                    </Link>
                </div>

                <motion.a
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    href={localizedPath(featuredProgram.link ?? `/programs/${featuredProgram.slug}`, lang)}
                    className="mb-14 block bg-[#0b0b10] p-6 lg:p-10 text-[#fdfcfb] relative overflow-hidden border border-[#0b0b10] group transition-transform active:translate-y-px"
                >

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="t-meta bg-[#5a1f2e] text-[#fdfcfb] border border-[#f2a007]/40 px-3 py-1.5">
                                    {data.flagshipLabel}
                                </span>
                                <span className="t-meta text-[#fdfcfb]/65 flex items-center gap-1.5">
                                    <CheckCircle2 size={13} className="text-[#f2a007]" strokeWidth={1.5} />
                                    {featuredProgram.status}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#fdfcfb] group-hover:text-[#f2a007] transition-colors leading-tight">
                                {featuredProgram.name}
                            </h3>

                            <p className="text-sm md:text-base text-[#fdfcfb]/75 leading-relaxed max-w-3xl">
                                {featuredProgram.desc}
                            </p>

                            <p className="t-meta text-[#fdfcfb]/55 pt-2" dir="ltr">
                                {featuredProgram.tags.join(" \u00b7 ")}
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-6">
                            {featuredProgram.logo && (
                                <div className="w-20 h-20 overflow-hidden border border-[#fdfcfb]/20 bg-[#fdfcfb]/10 p-1 shadow-[0_18px_40px_rgba(90,31,46,0.28)]">
                                    <img loading="lazy" decoding="async" src={featuredProgram.logo} alt={`${featuredProgram.name} logo`} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-[#0b0b10] bg-[#f2a007] hover:bg-[#fdfcfb] px-6 py-3 transition-[color,background-color,transform] group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                                <span>{data.exploreLabel}</span>
                                <ArrowUpRight size={18} className="rtl:-scale-x-100" strokeWidth={1.5} />
                            </span>
                        </div>
                    </div>
                </motion.a>

                <div className="border-y border-[#0b0b10]/10 divide-y divide-[#0b0b10]/10">
                    {data.list.filter((program) => program !== featuredProgram).map((program, i) => {
                        const tone = programStatusTone(program.status);
                        return (
                            <motion.a
                                key={`${program.slug}-${i}`}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                                href={localizedPath(program.link ?? `/programs/${program.slug}`, lang)}
                                className="group grid grid-cols-1 lg:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(18rem,0.9fr)_auto] gap-5 lg:gap-8 items-start lg:items-center py-7 transition-[color,background-color,transform] duration-300 hover:bg-[#5a1f2e]/[0.035] active:translate-y-px relative"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute top-0 start-0 h-px w-0 bg-[#5a1f2e] group-hover:w-full transition-all duration-500"
                                />

                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-12 h-12 bg-[#5a1f2e]/10 text-[#5a1f2e] flex items-center justify-center group-hover:bg-[#5a1f2e] group-hover:text-[#fdfcfb] transition-colors duration-300 shrink-0 border border-[#5a1f2e]/15">
                                        {program.icon || <Globe className="w-6 h-6" strokeWidth={1.5} />}
                                    </div>
                                    <span className="t-data text-xs text-[#0b0b10]/40" aria-hidden="true" dir="ltr">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors mb-3 leading-snug">
                                        {program.name}
                                    </h3>
                                    <p className="text-sm text-[#0b0b10]/70 leading-relaxed">
                                        {program.desc}
                                    </p>
                                </div>

                                <p className="t-meta text-[#0b0b10]/65 leading-relaxed" dir="ltr">
                                    {program.tags.join(" \u00b7 ")}
                                </p>

                                <div className="flex items-center gap-4 justify-between lg:justify-end">
                                    <span className={`inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border ${STATUS_PILL[tone]}`}>
                                        <span className={`w-1.5 h-1.5 ${STATUS_DOT[tone]}`} />
                                        {program.status}
                                    </span>

                                    <div className="w-9 h-9 bg-[#0b0b10]/5 group-hover:bg-[#5a1f2e] group-hover:text-[#fdfcfb] flex items-center justify-center transition-colors shrink-0">
                                        <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* At-a-glance comparison across all programs */}
                <details className="group mt-10 border border-[#0b0b10]/10 bg-white">
                    <summary className="t-meta inline-flex min-h-14 w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[#5a1f2e] transition-colors hover:bg-[#5a1f2e]/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e] [&::-webkit-details-marker]:hidden">
                        <span>{data.countLabel} — AT_A_GLANCE</span>
                        <span className="t-data text-[10px] text-[#0b0b10]/40" dir="ltr">[07]</span>
                    </summary>
                    <div className="overflow-x-auto border-t border-[#0b0b10]/10 scrollbar-sov-light" role="region" aria-label={data.countLabel} tabIndex={0}>
                        <table className="w-full min-w-[720px] border-collapse text-start text-sm">
                            <thead>
                                <tr className="border-b border-[#0b0b10]/10 bg-[#fdfcfb]">
                                    <th scope="col" className="t-meta p-4 text-start text-[10px] text-[#0b0b10]/60">{data.compareProgramLabel}</th>
                                    <th scope="col" className="t-meta p-4 text-start text-[10px] text-[#0b0b10]/60">{data.compareFocusLabel}</th>
                                    <th scope="col" className="t-meta p-4 text-start text-[10px] text-[#0b0b10]/60">{data.compareStatusLabel}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.list.map((program) => (
                                    <tr key={program.slug} className="border-b border-[#0b0b10]/10 last:border-0">
                                        <td className="p-4 font-semibold text-[#0b0b10] min-w-0 break-words">{program.name}</td>
                                        <td className="p-4 text-[#0b0b10]/70 min-w-0 break-words">{program.tags.join(" \u00b7 ")}</td>
                                        <td className="p-4"><span className="t-meta whitespace-nowrap">{program.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </Section>
    );
}

const Programs = memo(ProgramsComponent);
export default Programs;
