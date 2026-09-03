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
    hud: Content['hud'];
}

const pillarIcons = [
    <Shield className="w-5 h-5" strokeWidth={1.5} />,
    <Scale className="w-5 h-5" strokeWidth={1.5} />,
    <Eye className="w-5 h-5" strokeWidth={1.5} />,
    <FileText className="w-5 h-5" strokeWidth={1.5} />,
];

function GovernanceComponent({ data, hud }: GovernanceProps) {
    const { lang } = useLanguageContext();
    return (
        <Section id="governance" className="relative py-16 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="04"
                    title={data.title}
                    note={data.text}
                    meta={hud.institutionalIntegrity}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
                    {data.pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={false}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                        <Link href={localizedLinkPath(`/governance/${PILLAR_SLUGS[i]}`, lang)} className="block bg-[#fdfcfb] p-6 lg:p-8 h-full group">
                        <span className="sr-only">{pillar.title}</span>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[#5a1f2e]">
                                    {pillarIcons[i % pillarIcons.length]}
                                </span>
                                <span className="t-meta text-black/55">
                                    {data.pillarLabel} 0{i + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-[#0b0b10] mb-3">
                                {pillar.title}
                            </h3>

                            <p className="text-sm text-black/65 leading-relaxed">
                                {pillar.desc}
                            </p>
                            <span className="t-meta text-[#5a1f2e] mt-6 pt-4 border-t border-black/10 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
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
