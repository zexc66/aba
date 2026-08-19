import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { memo } from "react";
import { COUNTRIES } from "./NodalMap";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COPY } from "@/data";

const EN_LIST = COPY.en.countries.list;

interface CountriesProps {
    data: {
        title: string;
        note: string;
        list: string[];
        eyebrow: string;
        indexTitle: string;
        corridorsLabel: string;
        activeLabel: string;
        pipelineLabel: string;
        projectsLabel: string;
        regions: {
            westAfrica: string;
            centralAfrica: string;
            northEastAfrica: string;
            northEastAfrica2?: string;
            northAfrica: string;
            middleEast: string;
        };
    };
}

const REGION_KEY: Record<string, string> = {
    "West Africa": "westAfrica",
    "Central Africa": "centralAfrica",
    "North/East Africa": "northEastAfrica",
    "North Africa": "northAfrica",
    "Middle East": "middleEast",
};

function CountriesComponent({ data }: CountriesProps) {
    const { lang } = useLanguageContext();

    const nodes = data.list.map((name, i) => {
        const enName = EN_LIST[i];
        const node = COUNTRIES.find((c) => c.id.toLowerCase() === enName.toLowerCase());
        return { name, node, index: i };
    });

    return (
        <Section id="countries" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                {data.eyebrow}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10]">
                            {data.title}
                        </h2>
                    </div>

                    <div className="flex flex-col items-start gap-3 max-w-md">
                        <p className="text-base text-black/70 leading-relaxed italic">
                            "{data.note}"
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5a1f2e]/10 text-[#5a1f2e] text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#5a1f2e]" />
                            <span>{data.list.length} {data.corridorsLabel}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-black/55 mb-6 pb-2 border-b border-black/5">
                        {data.indexTitle}
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 list-none p-0 m-0">
                        {nodes.map(({ name, node, index }) => {
                            const status = node?.status ?? "active";
                            return (
                                <motion.li
                                    key={name}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                                    className="bg-white rounded-xl border border-black/5 p-5 flex items-start justify-between gap-3"
                                >
                                    <div className="flex items-start gap-4 min-w-0">
                                        <span className="text-xs font-mono text-black/55 font-semibold w-6 shrink-0 pt-0.5" dir="ltr">
                                            {(index + 1).toString().padStart(2, "0")}
                                        </span>
                                        <div className="min-w-0">
                                            <h4 className="text-base font-semibold text-[#0b0b10] leading-snug">
                                                {name}
                                            </h4>
                                            <p className="text-xs text-black/55 mt-1">
                                                {(data.regions as Record<string, string>)[REGION_KEY[node?.region ?? ""] ?? node?.region ?? ""] ?? node?.region} · <bdi>{node?.projects ?? "—"}</bdi> {data.projectsLabel}
                                            </p>
                                        </div>
                                    </div>

                                    <span className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                                        status === "active"
                                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                            : "text-black/60 bg-black/5 border-black/10"
                                    }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : "bg-black/40"}`} />
                                        {status === "active" ? data.activeLabel : data.pipelineLabel}
                                    </span>
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
