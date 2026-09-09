import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { memo } from "react";
import { Link } from "wouter";

const PILLAR_SLUGS = ["esia-esms", "kyc-aml", "independent-oversight", "contracts"];
import { Shield, Scale, Eye, FileText } from "lucide-react";
import { type Content } from "@/data";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

interface GovernanceProps {
    data: Content['governance'];
}

const pillarIcons = [
    <Shield className="w-5 h-5" strokeWidth={1.5} />,
    <Scale className="w-5 h-5" strokeWidth={1.5} />,
    <Eye className="w-5 h-5" strokeWidth={1.5} />,
    <FileText className="w-5 h-5" strokeWidth={1.5} />,
];

function GovernanceComponent({ data }: GovernanceProps) {
    const { lang } = useLanguageContext();
    return (
        <Section id="governance" className="relative py-20 bg-[#fdfcfb]">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="04"
                    title={data.title}
                    note={data.text}
                />

                <div className="border-y border-[#0b0b10]/10 divide-y divide-[#0b0b10]/10">
                    {data.pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={false}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                        <Link href={localizedLinkPath(`/governance/${PILLAR_SLUGS[i]}`, lang)} className="group grid grid-cols-1 md:grid-cols-[4rem_1fr_9rem] gap-5 md:gap-8 items-start py-7 transition-[color,background-color,transform] hover:bg-[#5a1f2e]/[0.035] active:translate-y-px">
                        <span className="sr-only">{pillar.title}</span>
                            <div className="flex items-center gap-4 md:block">
                                <span className="flex h-11 w-11 items-center justify-center border border-[#5a1f2e]/20 bg-[#5a1f2e]/10 text-[#5a1f2e] group-hover:bg-[#5a1f2e] group-hover:text-[#fdfcfb] transition-colors">
                                    {pillarIcons[i % pillarIcons.length]}
                                </span>
                                <span className="t-meta text-[#0b0b10]/65 md:mt-3 inline-block">
                                    {data.pillarLabel} 0{i + 1}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-[#0b0b10] mb-3 group-hover:text-[#5a1f2e] transition-colors">
                                    {pillar.title}
                                </h3>

                                <p className="text-sm text-[#0b0b10]/65 leading-relaxed max-w-[78ch]">
                                    {pillar.desc}
                                </p>
                            </div>

                            <span className="t-meta text-[#5a1f2e] md:text-end md:pt-1 inline-block opacity-80 group-hover:opacity-100 transition-opacity">
                                {data.frameworkLabel}
                            </span>
                        </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

const Governance = memo(GovernanceComponent);
export default Governance;
