import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { memo } from "react";
import { Shield, Scale, Eye, FileText } from "lucide-react";
import { type Content } from "@/data";

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
    return (
        <Section id="governance" className="relative py-24 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="04"
                    title={data.title}
                    note={data.text}
                    meta={hud.institutionalIntegrity}
                />

                <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
                    {data.pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-[#fdfcfb] p-8 lg:p-10"
                        >
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
                        </motion.div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

const Governance = memo(GovernanceComponent);
export default Governance;
