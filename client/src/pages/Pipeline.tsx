import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";
import { COUNTRIES } from "@/countries";
import { programStatusTone } from "@/lib/utils";
import { PROGRAM_META, SECTORS, SDG_NAMES, stageIndex, type SectorKey } from "@/intelligence";


export default function Pipeline() {
    const { lang, content } = useLanguageContext();
    const shouldReduceMotion = useReducedMotion();
    const t = content.pipeline;
    const corridorLabels = content.countries.list;

    const [sector, setSector] = useState<SectorKey | "all">("all");
    const [corridor, setCorridor] = useState<string | "all">("all");
    const [stage, setStage] = useState<number | "all">("all");

    const EN_ORDER = ["Ghana", "The Gambia", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordan", "Egypt", "Syria", "Sudan", "Saudi Arabia"];

  const corridorName = (iso: string): string => {
    const node = COUNTRIES.find((c) => c.iso === iso);
    if (!node) return iso;
    const idx = EN_ORDER.indexOf(node.id);
    return idx >= 0 ? corridorLabels[idx] : node.id;
  };

    const programs = useMemo(() => {
        return content.programs.list
            .map((p) => {
                const meta = PROGRAM_META[p.slug];
                const tone = programStatusTone(p.status);
                const stageIdx = stageIndex(tone);
                return { ...p, meta, tone, stageIdx };
            })
            .filter((p) => p.meta)
            .filter((p) => (sector === "all" ? true : p.meta.sector === sector))
            .filter((p) => {
                if (corridor === "all") return true;
                if (corridor === "regional") return p.meta.corridors === "regional";
                return p.meta.corridors !== "regional" && p.meta.corridors.includes(corridor);
            })
            .filter((p) => (stage === "all" ? true : p.stageIdx === stage));
    }, [content.programs.list, sector, corridor, stage]);

    const sdgPrograms = content.programs.list.filter((p) => PROGRAM_META[p.slug]);
    const sdgNumbers = sdgPrograms.flatMap((p) => PROGRAM_META[p.slug].sdgs).filter((n, i, arr) => arr.indexOf(n) === i).sort((a, b) => a - b);

    return (
        <div className={`min-h-[100dvh] bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}>
            <SEO title={`${t.title} | AIABASD`} description={t.note} lang={lang} url="/pipeline" />
            <Header nav={content.nav} />

            <div className="pt-28 pb-24">
                <Section className="py-12 border-b border-[#0b0b10]/10 bg-white">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        <SectionHeader index="01" title={t.title} note={t.note} meta={t.eyebrow} titleAs="h1" />
                    </div>
                </Section>

                <Section className="py-12">
                    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0b0b10]/10 border border-[#0b0b10]/10 mb-10">
                            <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                                <span className="t-meta text-[10px] text-[#0b0b10]/60">{t.filterSector}</span>
                                <select
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value as SectorKey | "all")}
                                    className="w-full min-h-11 bg-transparent text-sm font-semibold text-[#0b0b10] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 transition-[color,border-color] duration-150"
                                >
                                    <option value="all">{t.filterAll}</option>
                                    {(Object.keys(SECTORS) as SectorKey[]).map((k) => (
                                        <option key={k} value={k}>{SECTORS[k][lang]}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                                <span className="t-meta text-[10px] text-[#0b0b10]/60">{t.filterCountry}</span>
                                <select
                                    value={corridor}
                                    onChange={(e) => setCorridor(e.target.value)}
                                    className="w-full min-h-11 bg-transparent text-sm font-semibold text-[#0b0b10] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 transition-[color,border-color] duration-150"
                                >
                                    <option value="all">{t.filterAll}</option>
                                    {COUNTRIES.map((c) => (
                                        <option key={c.iso} value={c.iso}>{corridorName(c.iso)}</option>
                                    ))}
                                    <option value="regional">{t.multiRegion}</option>
                                </select>
                            </label>
                            <label className="bg-[#fdfcfb] p-4 flex flex-col gap-2">
                                <span className="t-meta text-[10px] text-[#0b0b10]/60">{t.filterStatus}</span>
                                <select
                                    value={stage === "all" ? "all" : String(stage)}
                                    onChange={(e) => setStage(e.target.value === "all" ? "all" : Number(e.target.value))}
                                    className="w-full min-h-11 bg-transparent text-sm font-semibold text-[#0b0b10] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2 transition-[color,border-color] duration-150"
                                >
                                    <option value="all">{t.filterAll}</option>
                                    {t.stages.map((label: string, i: number) => (
                                        <option key={i} value={i}>{label}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        {/* Explorer table */}
                        <div>
                            <div className="t-meta text-[11px] text-[#0b0b10]/65 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_8rem_8rem_7rem] gap-x-6 pb-3 border-b-2 border-[#0b0b10]">
                                <span>{content.programs.title}</span>
                                <span className="hidden md:block">{t.filterSector}</span>
                                <span className="hidden md:block">{t.filterCountry}</span>
                                <span className="text-end">{t.stageTitle}</span>
                            </div>
                            <ul className="divide-y divide-[#0b0b10]/10 border-b border-[#0b0b10]/10">
                                {programs.length === 0 && (
                                    <li className="py-10 text-center t-meta text-[#0b0b10]/60" dir="ltr">
                                        <bdi>— 0 —</bdi>
                                    </li>
                                )}
                                {programs.map((p, i) => (
                                    <motion.li
                                        key={p.slug}
                                        initial={false}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : Math.min(i * 0.04, 0.2) }}
                                    >
                                        <Link asChild href={localizedLinkPath(p.link ?? `/programs/${p.slug}`, lang)}>
                                            <a className="relative grid grid-cols-[1fr_auto] md:grid-cols-[1fr_8rem_8rem_7rem] gap-x-6 items-center py-4 px-3 -mx-3 group hover:bg-[#5a1f2e]/[0.035] active:translate-y-px transition-[color,background-color,transform] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2">
                                                <span
                                                    className="absolute bottom-0 start-0 h-px w-0 bg-[#f2a007] transition-[width] duration-500 group-hover:w-full pointer-events-none"
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0">
                                                    <h2 className="text-sm md:text-base font-semibold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                                        {p.name}
                                                    </h2>
                                                    <p className="t-meta text-[#0b0b10]/60 mt-1" dir="ltr">
                                                        <bdi>{p.tags.join(" · ")}</bdi>
                                                    </p>
                                                </div>
                                                <span className="hidden md:block t-meta text-[11px] text-[#0b0b10]/65">
                                                    {SECTORS[p.meta.sector][lang]}
                                                </span>
                                                <span className="hidden md:block t-meta text-[11px] text-[#0b0b10]/65">
                                                    {p.meta.corridors === "regional"
                                                        ? t.multiRegion
                                                        : p.meta.corridors.map(corridorName).join(" · ")}
                                                </span>
                                                <span className="flex md:justify-end" aria-label={t.stages[p.stageIdx]}>
                                                    {[0, 1, 2].map((s) => (
                                                        <span
                                                            key={s}
                                                            className={`w-4 h-4 border ${s <= p.stageIdx
                                                                ? "bg-[#5a1f2e] border-[#5a1f2e]"
                                                                : "bg-transparent border-[#0b0b10]/20"} ${s < 2 ? "me-1" : ""}`}
                                                            title={t.stages[s]}
                                                        />
                                                    ))}
                                                </span>
                                            </a>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* SDG matrix */}
                        <div className="mt-20">
                            <SectionHeader index="02" title={t.sdgTitle} note={t.sdgNote} />
                            <div className="md:hidden space-y-px bg-[#0b0b10]/10 border border-[#0b0b10]/10">
                            {sdgNumbers.map((n) => (
                                <div key={n} className="bg-[#fdfcfb] p-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="t-data tabular-nums text-[#5a1f2e]" dir="ltr">
                                            <bdi>{String(n).padStart(2, "0")}</bdi>
                                        </span>
                                        <span className="text-sm font-semibold text-[#0b0b10]">{SDG_NAMES[n]?.[lang] ?? `SDG ${n}`}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {sdgPrograms.map((p2, pi) => (
                                            PROGRAM_META[p2.slug].sdgs.includes(n) ? (
                                                <span key={p2.slug} className="t-data tabular-nums text-[10px] bg-[#f2a007] border border-[#5a1f2e]/30 text-[#0b0b10] px-2 py-1" title={p2.name} dir="ltr">
                                                    <bdi>{String(pi + 1).padStart(2, "0")}</bdi>
                                                </span>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden md:block overflow-x-auto scrollbar-sov-light">
                                <table className="w-full border-collapse text-start">
                                    <thead>
                                        <tr className="border-b-2 border-[#0b0b10]">
                                            <th scope="col" className="t-meta text-[#0b0b10]/65 text-start py-3 pe-4 min-w-[16rem]">
                                                <span dir="ltr">SDG</span>
                                            </th>
                                            {sdgPrograms.map((p, pi) => (
                                                <th key={p.slug} title={p.name} className="t-data tabular-nums text-[#0b0b10]/60 py-3 px-2 min-w-[4rem] text-center align-bottom" dir="ltr">
                                                    <bdi>{String(pi + 1).padStart(2, "0")}</bdi>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sdgNumbers.map((n) => (
                                            <tr key={n} className="border-b border-[#0b0b10]/10 hover:bg-[#5a1f2e]/[0.02] transition-colors">
                                                <th scope="row" className="py-3 pe-4 text-sm font-normal text-[#0b0b10] text-start">
                                                    <span className="t-data tabular-nums text-[#5a1f2e] me-2" dir="ltr">
                                                        <bdi>{String(n).padStart(2, "0")}</bdi>
                                                    </span>
                                                    {SDG_NAMES[n]?.[lang] ?? `SDG ${n}`}
                                                </th>
                                                {sdgPrograms.map((p) => (
                                                    <td key={p.slug} className="py-3 px-2 text-center">
                                                        {PROGRAM_META[p.slug].sdgs.includes(n) ? (
                                                            <span className="inline-block w-3 h-3 bg-[#f2a007] border border-[#5a1f2e]/30" aria-label={p.name} />
                                                        ) : (
                                                            <span className="inline-block w-3 h-3 border border-[#0b0b10]/10" aria-hidden="true" />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
            <ScrollToTop />
        </div>
    );
}
