import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { memo } from "react";
import { Shield, Scale, Eye, FileText, ArrowRight } from "lucide-react";
import { type Content } from "@/data";

interface GovernanceProps {
    data: Content['governance'];
    hud: Content['hud'];
}

const pillarIcons = [
    <Shield className="w-6 h-6" strokeWidth={1.5} />,
    <Scale className="w-6 h-6" strokeWidth={1.5} />,
    <Eye className="w-6 h-6" strokeWidth={1.5} />,
    <FileText className="w-6 h-6" strokeWidth={1.5} />,
];

function GovernanceComponent({ data, hud }: GovernanceProps) {
    return (
        <Section id="governance" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                    <div className="flex justify-center items-center gap-3">
                        <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                            {hud.institutionalIntegrity}
                        </span>
                        <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10]">
                        {data.title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-black/70 leading-relaxed italic">
                        "{data.text}"
                    </p>
                </div>

                {/* Governance Pillars Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {data.pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white p-8 rounded-xl border border-black/5 hover:border-[#5a1f2e]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-lg bg-[#5a1f2e]/10 text-[#5a1f2e] flex items-center justify-center">
                                        {pillarIcons[i % pillarIcons.length]}
                                    </div>
                                    <span className="text-xs font-semibold text-black/40 uppercase tracking-wider">
                                        Pillar 0{i + 1}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-[#0b0b10] mb-3">
                                    {pillar.title}
                                </h3>
                                
                                <p className="text-sm text-black/70 leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-black/5 flex items-center text-xs font-semibold text-[#5a1f2e] group cursor-pointer">
                                <span>{hud.exploreProtocol}</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action Footer */}
                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#5a1f2e] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#5a1f2e]/90 transition-colors shadow-sm">
                        <span>{hud.accessCharter}</span>
                    </button>
                </div>

            </div>
        </Section>
    );
}

const Governance = memo(GovernanceComponent);
export default Governance;
