import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { Link } from "wouter";
import { memo } from "react";
import { MapPin } from "lucide-react";
import { COUNTRIES } from "@/countries";
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

    // Regional rollup: the map in the hero is the geographic source; this block
    // aggregates corridors by region instead of repeating the same flat list.
    const regions: { regionKey: string; members: typeof nodes; projects: number }[] = [];
    for (const entry of nodes) {
        const region = entry.node?.region;
        if (!region) continue;
        let bucket = regions.find((r) => r.regionKey === region);
        if (!bucket) {
            bucket = { regionKey: region, members: [], projects: 0 };
            regions.push(bucket);
        }
        bucket.members.push(entry);
        bucket.projects += entry.node?.projects ?? 0;
    }

    return (
        <Section id="countries" className="relative py-16 bg-[#fdfcfb] border-b border-black/10">
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
                        {regions.map(({ regionKey, members, projects }, i) => (
                            <li
                                key={regionKey}
                                className="grid grid-cols-1 md:grid-cols-[14rem_1fr_auto] items-start md:items-center gap-x-8 gap-y-4 py-6"
                            >
                                <div>
                                    <h4 className="text-base font-semibold text-[#0b0b10] leading-snug">
                                        {data.regions[REGION_KEY[regionKey]] ?? regionKey}
                                    </h4>
                                    <p className="t-data text-xs text-[#5a1f2e] mt-1.5" dir="ltr">
                                        <bdi>{projects}</bdi> {data.projectsLabel}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {members.map(({ name, node }) => (
                                        <Link key={name} href={`/corridors/${node?.iso ?? ""}`}>
                                            <a className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 text-xs font-semibold border border-black/10 bg-white text-[#0b0b10]/90 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e] transition-colors">
                                                <MapPin size={12} className={`shrink-0 ${node?.status === "active" ? "text-emerald-600" : "text-black/35"}`} aria-hidden="true" />
                                                {name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>

                                <span className="t-meta text-black/50 hidden md:block" aria-hidden="true">
                                    {String(i + 1).padStart(2, "0")}/{String(regions.length).padStart(2, "0")}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}

const Countries = memo(CountriesComponent);
export default Countries;
