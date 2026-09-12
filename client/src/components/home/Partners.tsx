import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { type Content } from "@/data";
import { memo } from "react";
import { deployAssetPath, localizedLinkPath } from "@/localePath";
import { Link } from "wouter";
import { COMPANIES } from "@/companies";
import { NETWORK_COPY } from "@/networkCopy";
import type { Locale3 } from "@/projects";

interface PartnersProps {
    data: Content['partners'];
    lang: string;
}

function PartnersComponent({ data, lang }: PartnersProps) {
    const copy = NETWORK_COPY[lang as Locale3];
    const partnerClusters = Array.from({ length: Math.ceil(COMPANIES.length / 4) }, (_, i) => COMPANIES.slice(i * 4, i * 4 + 4));

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
                                        <Link asChild href={localizedLinkPath(`/companies/${partner.slug}`, lang)} key={partner.slug}><a
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
                                        </a></Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#0b0b10]/10 flex flex-col sm:flex-row items-center justify-between gap-4 t-meta text-[#0b0b10]/65">
                    <span>{copy.listing}</span>
                    <Link asChild href={localizedLinkPath("/companies", lang)}><a className="inline-flex min-h-11 items-center text-[#5a1f2e] underline underline-offset-4">{copy.directory}</a></Link>
                </div>

            </div>
        </Section>
    );
}

const Partners = memo(PartnersComponent);
export default Partners;
