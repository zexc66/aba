import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { memo } from "react";
import { COUNTRIES } from "./NodalMap";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COPY } from "@/data";

const EN_LIST = COPY.en.countries.list;

const REGION_KEY: Record<string, string> = {
    "West Africa": "westAfrica",
    "Central Africa": "centralAfrica",
    "North/East Africa": "northEastAfrica",
    "North Africa": "northAfrica",
    "Middle East": "middleEast",
};

interface CountriesProps {
    data: {
        title: string;
        note: string;
        list: string[];
        indexTitle: string;
        corridorsLabel: string;
        activeLabel: string;
        pipelineLabel: string;
        projectsLabel: string;
        regions: Record<string, string>;
    };
}

function CountriesComponent({ data }: CountriesProps) {
    const { lang } = useLanguageContext();

    const nodes = data.list.map((name, i) => {
        const enName = EN_LIST[i];
        const node = COUNTRIES.find((c) => c.id.toLowerCase() === enName.toLowerCase());
        return { name, node, index: i };
    });

    const regionOf = (label: string | undefined): string => {
        if (!label) return "";
        const localized = data.regions[REGION_KEY[label]];
        return localized ?? label;
    };

    return (
        <Section id="countries" className="relative py-24 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="03"
                    title={data.title}
                    note={data.note}
                    meta={`${data.list.length} ${data.corridorsLabel}`}
                />

                <div>
                    <h3 className="t-meta text-black/55 mb-0 pb-3 border-b-2 border-[#0b0b10]">
                        {data.indexTitle}
                    </h3>

                    <ul className="divide-y divide-black/10 border-b border-black/10 list-none p-0 m-0">
                        {nodes.map(({ name, node, index }) => {
                            const status = node?.status ?? "active";
                            return (
                                <motion.li
                                    key={name}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                                >
                                <Link href={`/corridors/${node?.iso ?? ""}`}>
                                <a className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_minmax(10rem,1fr)_1fr_auto_auto] items-center gap-x-4 md:gap-x-8 py-4 group"
                                >
                                    <span className="t-data text-xs text-black/50 font-medium" dir="ltr" aria-hidden="true">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>

                                    <h4 className="text-base font-semibold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                        {name}
                                    </h4>

                                    <p className="hidden md:block text-xs text-black/55">
                                        {regionOf(node?.region)}
                                    </p>

                                    <span className="hidden md:block t-data text-xs text-[#5a1f2e]" dir="ltr">
                                        <bdi>{node?.projects ?? "—"}</bdi> {data.projectsLabel}
                                    </span>

                                    <span className={`inline-flex items-center gap-1.5 t-meta px-2 py-1 border ${status === "active"
                                        ? "text-emerald-800 bg-emerald-50 border-emerald-300"
                                        : "text-black/60 bg-black/[0.03] border-black/15"}`}>
                                        <span className={`w-1.5 h-1.5 ${status === "active" ? "bg-emerald-600" : "bg-black/40"}`} />
                                        {status === "active" ? data.activeLabel : data.pipelineLabel}
                                    </span>
                                </a>
                                </Link>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </Section>
    );
}

const Countries = memo(CountriesComponent);
export default Countries;
