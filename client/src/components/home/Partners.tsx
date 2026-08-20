import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { type Content } from "@/data";
import { memo } from "react";

interface PartnersProps {
    data: Content['partners'];
    hud: Content['hud'];
    lang: string;
}

const ALLIANCE_SYNDICATE = [
    { name: "Trilogy", logo: "/partners/trilogy.png" },
    { name: "Creation Design Group", logo: "/partners/cdg.png" },
    { name: "Kaolin International Company", logo: "/partners/kaolin.png" },
    { name: "Mauritanian Metallogistic Service Company", logo: "/partners/mauritanian.png" },
    { name: "Adfat Group of Companies Ltd.", logo: "/partners/adfat.jpg" },
    { name: "Saudi Mauritanian Industrial Company", logo: "/partners/saudi_industrial.jpg" },
    { name: "The Global Agriculture Company", logo: "/partners/global_agriculture.jpg" },
    { name: "Saudi Mauritanian Trading Company", logo: "/partners/saudi_trading.jpg" },
    { name: "Saudi Mauritanian Investment Company", logo: "/partners/sm_investment.jpg" },
    { name: "Adfat Gold Trading", logo: "/partners/adfat_gold.png" },
    { name: "NABT", logo: "/partners/nabt.jpg" },
    { name: "Chemexa", logo: "/partners/chemexa.jpg" },
];

function PartnersComponent({ data, hud }: PartnersProps) {
    return (
        <Section id="partners" className="relative py-24 bg-[#fdfcfb] border-t border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="06"
                    title={data.title}
                    note={data.note}
                    meta={hud.strategicConsortium}
                />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
                    {ALLIANCE_SYNDICATE.map((partner, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                            className="bg-[#fdfcfb] p-8 flex flex-col items-center justify-center text-center space-y-4 group"
                        >
                            <div className="h-16 w-full flex items-center justify-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-14 max-w-[140px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <span className="t-meta text-black/55 group-hover:text-[#5a1f2e] transition-colors leading-normal">
                                {partner.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 t-meta text-black/50">
                    <span>{data.vettedLabel}</span>
                    <span className="text-[#5a1f2e]">{data.networkLabel}</span>
                </div>

            </div>
        </Section>
    );
}

const Partners = memo(PartnersComponent);
export default Partners;
