import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useMemo, memo } from "react";
import { MapPin, CheckCircle2, Globe2, ShieldCheck, Activity, Maximize2, ZoomIn } from "lucide-react";
import WorldMapSVG from "./WorldMapSVG";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COPY } from "@/data";

import { COUNTRIES, type CountryNode } from "@/countries";

export { COUNTRIES };
export type { CountryNode };

const CORRIDOR_ARCS = [
    { from: "sa", to: "jo" },
    { from: "jo", to: "sy" },
    { from: "jo", to: "eg" },
    { from: "eg", to: "sd" },
    { from: "sd", to: "gh" },
    { from: "gh", to: "bf" },
    { from: "gh", to: "ci" },
    { from: "ci", to: "sl" },
    { from: "sl", to: "gm" },
    { from: "sd", to: "ao" }
];

const EN_LIST = COPY.en.countries.list;

const REGION_LABELS: Record<string, Record<"en" | "ar" | "fr", string>> = {
    "West Africa": { en: "West Africa", ar: "غرب إفريقيا", fr: "Afrique de l'Ouest" },
    "Central Africa": { en: "Central Africa", ar: "وسط إفريقيا", fr: "Afrique Centrale" },
    "North/East Africa": { en: "North/East Africa", ar: "شمال/شرق إفريقيا", fr: "Afrique du Nord/Est" },
    "North Africa": { en: "North Africa", ar: "شمال إفريقيا", fr: "Afrique du Nord" },
    "Middle East": { en: "Middle East", ar: "الشرق الأوسط", fr: "Moyen-Orient" },
};

function localizedName(id: string, lang: "en" | "ar" | "fr"): string {
    const idx = EN_LIST.findIndex((n) => n.toLowerCase() === id.toLowerCase());
    return idx >= 0 ? COPY[lang].countries.list[idx] : id;
}

function NodalMapComponent({ activeCountry, compact = false }: { activeCountry: string | null; compact?: boolean }) {
    const { lang } = useLanguageContext();
    const t = COPY[lang].countries;
    const reduceMotion = useReducedMotion();

    const [hoveredIso, setHoveredIso] = useState<string | null>(null);
    const [selectedIso, setSelectedIso] = useState<string | null>("gh");
    const [isGlobalView, setIsGlobalView] = useState<boolean>(false);

    const activePropIso = useMemo(() => {
        if (!activeCountry) return null;
        const found = COUNTRIES.find(c => c.id.toLowerCase() === activeCountry.toLowerCase());
        return found ? found.iso : null;
    }, [activeCountry]);

    const currentIso = selectedIso || hoveredIso || activePropIso;
    const currentCountry = COUNTRIES.find(c => c.iso === currentIso);

    const viewBox = isGlobalView ? "30.767 241.591 784.077 458.627" : "340 395 210 180";

    const arcs = useMemo(() => {
        return CORRIDOR_ARCS.map(arc => {
            const p1 = COUNTRIES.find(c => c.iso === arc.from);
            const p2 = COUNTRIES.find(c => c.iso === arc.to);
            if (!p1 || !p2) return null;

            const midX = (p1.cx + p2.cx) / 2;
            const midY = (p1.cy + p2.cy) / 2 - 12;
            return {
                id: `${arc.from}-${arc.to}`,
                path: `M ${p1.cx} ${p1.cy} Q ${midX} ${midY} ${p2.cx} ${p2.cy}`,
                fromIso: arc.from,
                toIso: arc.to
            };
        }).filter(Boolean);
    }, []);

    return (
        <div className={`w-full relative bg-[#fdfcfb] overflow-hidden select-none p-4 md:p-6 flex flex-col justify-between ${compact ? "h-full min-h-[320px]" : "h-full min-h-[560px]"} border border-[#0b0b10]/10`}>
            
            <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#0b0b10]/8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5a1f2e] text-[#fdfcfb] flex items-center justify-center">
                        <Globe2 size={20} className="text-[#f2a007]" aria-hidden="true" />
                    </div>
                    <div>
                        <div className="t-meta text-[#5a1f2e]">
                            {t.mapTitle}
                        </div>
                        <div className="t-data text-sm font-semibold text-[#0b0b10] tabular-nums">
                            {t.mapCorridors.replace("{n}", String(COUNTRIES.length))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsGlobalView(!isGlobalView)}
                        aria-pressed={isGlobalView}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-[#fdfcfb] border border-[#0b0b10]/10 hover:border-[#5a1f2e]/40 shadow-[0_1px_3px_rgba(11,11,16,0.05)] transition-[color,background-color,border-color,transform] text-[#0b0b10] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2"
                    >
                        {isGlobalView ? (
                            <>
                                <ZoomIn size={14} className="text-[#5a1f2e]" aria-hidden="true" />
                                <span>{t.regionalViewLabel}</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 size={14} className="text-[#5a1f2e]" aria-hidden="true" />
                                <span>{t.globalViewLabel}</span>
                            </>
                        )}
                    </button>

                    <div className="hidden md:flex items-center gap-1.5 text-xs text-[#5a1f2e] font-semibold bg-[#5a1f2e]/5 px-3 py-2 border border-[#5a1f2e]/10">
                        <ShieldCheck size={14} className="text-[#f2a007]" aria-hidden="true" />
                        <span>AIABASD</span>
                    </div>
                </div>
            </div>

            <div className="relative z-30 py-3 border-b border-[#0b0b10]/8">
                <span className="t-meta text-[#5a1f2e] block md:inline md:shrink-0 md:me-1 mb-2 md:mb-0">
                    {t.territoryLabel}
                </span>
                {/* Mobile: one scroll-snapped row with full-width bleed; md+: wrap */}
                <div className="flex md:flex-wrap items-center gap-1.5 overflow-x-auto md:overflow-x-visible md:overflow-y-visible -mx-4 px-4 md:mx-0 md:px-0 snap-x md:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {COUNTRIES.map((c) => {
                        const isSelected = currentIso === c.iso;
                        return (
                            <button
                                key={c.iso}
                                type="button"
                                onClick={() => setSelectedIso(c.iso)}
                                onMouseEnter={() => setHoveredIso(c.iso)}
                                onMouseLeave={() => setHoveredIso(null)}
                                aria-pressed={isSelected}
                                className={`px-3.5 min-h-[44px] text-xs font-semibold transition-[color,background-color,border-color,transform] shrink-0 snap-start inline-flex items-center border active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-1 ${
                                    isSelected
                                        ? "bg-[#5a1f2e] text-[#fdfcfb] border-[#5a1f2e] shadow-[0_2px_8px_rgba(90,31,46,0.25)]"
                                        : "bg-[#fdfcfb] text-[#0b0b10]/90 border-[#0b0b10]/10 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"
                                }`}
                            >
                                {localizedName(c.id, lang)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={`relative w-full ${compact ? "flex-1 min-h-[300px]" : "flex-1 min-h-[380px]"} my-2 flex flex-col`}>
                <div className={`relative w-full flex-1 ${compact ? "min-h-[240px]" : "min-h-[300px]"} flex items-center justify-center`}>
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <WorldMapSVG 
                        viewBox={viewBox}
                        className="w-full h-full drop-shadow-sm transition-[color,background-color,border-color,transform] duration-500" 
                        activeIsoCode={currentIso}
                        hoveredIsoCode={hoveredIso}
                        onCountryHover={(iso) => setHoveredIso(iso)}
                        onCountryClick={(iso) => {
                            const match = COUNTRIES.find(c => c.iso === iso);
                            if (match) setSelectedIso(prev => prev === iso ? null : iso);
                        }}
                    >
                        <g className="pointer-events-none" aria-hidden="true">
                            {arcs.map((arc, i) => {
                                if (!arc) return null;
                                const isHighlighted = currentIso === arc.fromIso || currentIso === arc.toIso;

                                return (
                                    <g key={arc.id}>
                                        {/* Authored entrance: corridors draw themselves in,
                                            staggered along the route chain. Solid strokes so
                                            pathLength animates cleanly. */}
                                        <motion.path
                                            d={arc.path}
                                            fill="none"
                                            stroke="#5a1f2e"
                                            strokeWidth={isHighlighted ? "1.5" : "0.75"}
                                            strokeLinecap="round"
                                            opacity={isHighlighted ? 0.95 : 0.25}
                                            initial={false}
                                            animate={{ pathLength: 1, opacity: isHighlighted ? 0.95 : 0.25 }}
                                            transition={{
                                                pathLength: { duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
                                                opacity: { duration: 0.3, delay: 0.4 + i * 0.12 },
                                            }}
                                        />
                                        {isHighlighted && !reduceMotion && (
                                            <circle r="2.2" fill="#f2a007" aria-hidden="true">
                                                <animateMotion path={arc.path} dur="2.5s" repeatCount="indefinite" />
                                            </circle>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        <g aria-label={t.territoryLabel}>
                            {COUNTRIES.map((c) => {
                                const isActive = currentIso === c.iso;
                                const countryName = localizedName(c.id, lang);
                                return (
                                    <g
                                        key={c.iso}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${countryName} (${c.projects})`}
                                        aria-pressed={isActive}
                                        onClick={() => setSelectedIso(prev => prev === c.iso ? null : c.iso)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setSelectedIso(prev => prev === c.iso ? null : c.iso);
                                            }
                                        }}
                                        onMouseEnter={() => setHoveredIso(c.iso)}
                                        onMouseLeave={() => setHoveredIso(null)}
                                        className="cursor-pointer focus-visible:outline-none"
                                    >
                                        {isActive && (
                                            <circle
                                                cx={c.cx}
                                                cy={c.cy}
                                                r={reduceMotion ? "7" : "4"}
                                                fill="#5a1f2e"
                                                fillOpacity="0.25"
                                                aria-hidden="true"
                                            >
                                                {!reduceMotion && (
                                                    <>
                                                        <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                                                        <animate attributeName="fill-opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
                                                    </>
                                                )}
                                            </circle>
                                        )}

                                        {/* Outer focus-visible/active gold ring */}
                                        <circle
                                            cx={c.cx}
                                            cy={c.cy}
                                            r={isActive ? "6" : "4"}
                                            fill="none"
                                            stroke="#f2a007"
                                            strokeWidth={isActive ? "1.2" : "0"}
                                            strokeOpacity={isActive ? "0.9" : "0"}
                                            aria-hidden="true"
                                        />

                                        {/* Pin body */}
                                        <circle
                                            cx={c.cx}
                                            cy={c.cy}
                                            r={isActive ? "4.5" : "3"}
                                            fill={isActive ? "#5a1f2e" : "#0b0b10"}
                                            fillOpacity={isActive || c.status === "active" ? 1 : 0.45}
                                            stroke="#fdfcfb"
                                            strokeWidth="1"
                                            className="transition-[color,background-color,border-color,transform] duration-300 active:scale-90"
                                        />

                                        {/* Center core */}
                                        <circle
                                            cx={c.cx}
                                            cy={c.cy}
                                            r="1.2"
                                            fill={isActive ? "#f2a007" : "#fdfcfb"}
                                            aria-hidden="true"
                                        />

                                        {isActive && (() => {
                                            const label = localizedName(c.id, lang);
                                            // Width adapts to the name (Arabic/French run long)
                                            const tw = Math.min(130, Math.max(60, label.length * 3.8 + 12));
                                            return (
                                                <g transform={`translate(${c.cx}, ${c.cy - 9})`} aria-hidden="true">
                                                    <rect
                                                        x={-tw / 2}
                                                        y="-11"
                                                        width={tw}
                                                        height="12"
                                                        fill="#0b0b10"
                                                        stroke="#f2a007"
                                                        strokeWidth="0.5"
                                                    />
                                                    <text
                                                        x="0"
                                                        y="-3"
                                                        textAnchor="middle"
                                                        fill="#fdfcfb"
                                                        fontSize="6"
                                                        fontWeight="bold"
                                                        fontFamily="sans-serif"
                                                    >
                                                        {label}
                                                    </text>
                                                </g>
                                            );
                                        })()}
                                    </g>
                                );
                            })}
                        </g>
                    </WorldMapSVG>
                </div>
            </div>

                {/* Detail card: in flow below the map on mobile (no map overlay),
                    docked bottom-start from md up so the densest proof nodes
                    (Saudi Arabia, Egypt) stay visible in the default view */}
                <AnimatePresence>
                    {currentCountry && (
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.96 }}
                            className="static md:absolute md:bottom-4 ltr:md:left-4 rtl:md:right-4 z-30 w-full md:w-auto md:max-w-sm mt-3 md:mt-0"
                        >
                            <div className="bg-[#0b0b10]/95 border border-white/20 p-5 text-[#fdfcfb] shadow-[0_24px_48px_-12px_rgba(90,31,46,0.35)]">
                                <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin size={16} className="text-[#f2a007] shrink-0" aria-hidden="true" />
                                        <div>
                                            <div className="font-bold text-sm text-[#fdfcfb] flex items-center gap-2">
                                                {localizedName(currentCountry.id, lang)}
                                                {lang === "ar" && <span className="text-xs font-normal text-[#fdfcfb]/50">({currentCountry.capital})</span>}
                                            </div>
                                            <div className="text-[11px] text-[#fdfcfb]/60">{REGION_LABELS[currentCountry.region]?.[lang] ?? currentCountry.region}</div>
                                        </div>
                                    </div>
                                    <span className={`t-meta px-2.5 py-1.5 border ${
                                        currentCountry.status === "active"
                                            ? "bg-[#5a1f2e] text-[#fdfcfb] border border-[#f2a007]/30"
                                            : "bg-white/10 text-[#fdfcfb]/70"
                                    }`}>
                                        {currentCountry.status === "active" ? t.activeRegionLabel : t.pipelineLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-white/5 p-2.5 border border-white/5">
                                        <div className="t-meta text-[#fdfcfb]/55">{t.capitalLabel}</div>
                                        <div className="font-semibold text-[#fdfcfb] mt-0.5" dir="ltr">
                                            <bdi>{lang === "ar" ? currentCountry.capitalAr : currentCountry.capital}</bdi>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-2.5 border border-white/5">
                                        <div className="t-meta text-[#fdfcfb]/55">{t.projectsLabel}</div>
                                        <div className="font-semibold text-[#f2a007] mt-0.5 flex items-center gap-1">
                                            <Activity size={12} aria-hidden="true" />
                                            <span className="t-data tabular-nums"><bdi>{currentCountry.projects}</bdi></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 t-meta text-[#fdfcfb]/55 flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-[#f2a007]" aria-hidden="true" />
                                    <span>{t.presenceLabel}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative z-30 pt-3 border-t border-[#0b0b10]/8 flex flex-wrap items-center justify-between gap-2 t-meta text-[#0b0b10]/50">
                <div>{t.mapHint}</div>
            </div>
        </div>
    );
}

const NodalMap = memo(NodalMapComponent);
export default NodalMap;
