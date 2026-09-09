import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { type Content } from "@/data";
import { memo } from "react";
import { deployAssetPath } from "@/localePath";

interface PartnersProps {
    data: Content['partners'];
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

function PartnersComponent({ data }: PartnersProps) {
    const partnerClusters = [
        ALLIANCE_SYNDICATE.slice(0, 4),
        ALLIANCE_SYNDICATE.slice(4, 8),
        ALLIANCE_SYNDICATE.slice(8),
    ];

    return (
        <Section id="partners" className="relative py-20 bg-[#fdfcfb] border-b border-[#0b0b10]/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="06"
                    title={data.title}
                    note={data.note}
                />

                <div className="border-y border-[#0b0b10]/10 divide-y divide-[#0b0b10]/10">
                    {partnerClusters.map((cluster, clusterIndex) => (
                        <motion.div
                            key={clusterIndex}
                            initial={false}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: clusterIndex * 0.05 }}
                            className="grid grid-cols-1 lg:grid-cols-[7rem_1fr] gap-5 lg:gap-8 py-7"
                        >
                            <div className="t-data text-xs text-[#5a1f2e]" aria-hidden="true" dir="ltr">
                                {String(clusterIndex * 4 + 1).padStart(2, "0")}-{String(clusterIndex * 4 + cluster.length).padStart(2, "0")}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
                                {cluster.map((partner, i) => {
                                    const index = clusterIndex * 4 + i;
                                    return (
                                        <div
                                            key={partner.name}
                                            className="bg-[#fdfcfb] p-6 flex flex-col items-center justify-center text-center space-y-4 group relative min-h-[150px]"
                                        >
                                            <span
                                                className="t-data text-[10px] text-[#0b0b10]/35 absolute top-3 start-3 group-hover:text-[#5a1f2e] transition-colors"
                                                aria-hidden="true"
                                                dir="ltr"
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <div className="h-16 w-full flex items-center justify-center">
                                                <img
                                                    src={deployAssetPath(partner.logo)}
                                                    alt={partner.name}
                                                    className="max-h-14 max-w-[140px] w-auto object-contain grayscale group-hover:grayscale-0 transition-[color,background-color,border-color,transform] duration-500 opacity-70 group-hover:opacity-100"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            </div>
                                            <span className="t-meta text-[#0b0b10]/65 group-hover:text-[#5a1f2e] transition-colors leading-normal">
                                                {partner.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#0b0b10]/10 flex flex-col sm:flex-row items-center justify-between gap-4 t-meta text-[#0b0b10]/65">
                    <span>{data.vettedLabel}</span>
                    <span className="text-[#5a1f2e]">{data.networkLabel}</span>
                </div>

            </div>
        </Section>
    );
}

const Partners = memo(PartnersComponent);
export default Partners;
