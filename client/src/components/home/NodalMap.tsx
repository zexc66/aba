import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, memo } from "react";
import { MapPin, CheckCircle2, Globe2, ShieldCheck, Activity, Maximize2, ZoomIn } from "lucide-react";
import WorldMapSVG from "./WorldMapSVG";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { COPY } from "@/data";

export interface CountryNode {
    id: string;
    iso: string;
    cx: number;
    cy: number;
    status: "active" | "pipeline";
    region: string;
    projects: number;
    capital: string;
    capitalAr: string;
}

export const COUNTRIES: CountryNode[] = [
    { id: "The Gambia", iso: "gm", cx: 366.72, cy: 497.01, status: "active", region: "West Africa", projects: 4, capital: "Banjul", capitalAr: "بانجول" },
    { id: "Sierra Leone", iso: "sl", cx: 372.80, cy: 509.79, status: "active", region: "West Africa", projects: 6, capital: "Freetown", capitalAr: "فريتاون" },
    { id: "Côte d'Ivoire", iso: "ci", cx: 388.48, cy: 521.56, status: "active", region: "West Africa", projects: 8, capital: "Yamoussoukro", capitalAr: "ياموسوكرو" },
    { id: "Burkina Faso", iso: "bf", cx: 404.49, cy: 493.50, status: "active", region: "West Africa", projects: 5, capital: "Ouagadougou", capitalAr: "واغادوغو" },
    { id: "Ghana", iso: "gh", cx: 399.09, cy: 513.18, status: "active", region: "West Africa", projects: 12, capital: "Accra", capitalAr: "أكرا" },
    { id: "Angola", iso: "ao", cx: 437.37, cy: 547.46, status: "pipeline", region: "Central Africa", projects: 3, capital: "Luanda", capitalAr: "لواندا" },
    { id: "Sudan", iso: "sd", cx: 466.14, cy: 505.04, status: "active", region: "North/East Africa", projects: 7, capital: "Khartoum", capitalAr: "الخرطوم" },
    { id: "Egypt", iso: "eg", cx: 466.16, cy: 449.22, status: "active", region: "North Africa", projects: 14, capital: "Cairo", capitalAr: "القاهرة" },
    { id: "Jordan", iso: "jo", cx: 484.50, cy: 433.00, status: "active", region: "Middle East", projects: 9, capital: "Amman", capitalAr: "عمان" },
    { id: "Syria", iso: "sy", cx: 487.55, cy: 422.18, status: "active", region: "Middle East", projects: 4, capital: "Damascus", capitalAr: "دمشق" },
    { id: "Saudi Arabia", iso: "sa", cx: 519.81, cy: 458.02, status: "active", region: "Middle East", projects: 16, capital: "Riyadh", capitalAr: "الرياض" }
];

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
        <div className={`w-full relative bg-[#fdfcfb] overflow-hidden select-none p-4 md:p-6 flex flex-col justify-between ${compact ? "h-full min-h-[320px]" : "h-full min-h-[560px]"} border border-black/10`}>
            
            <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5a1f2e] text-white flex items-center justify-center">
                        <Globe2 size={20} className="text-[#f2a007]" />
                    </div>
                    <div>
                        <div className="t-meta text-[#5a1f2e]">
                            {t.mapTitle}
                        </div>
                        <div className="t-data text-sm font-semibold text-[#0b0b10]">
                            {t.mapCorridors.replace("{n}", String(COUNTRIES.length))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsGlobalView(!isGlobalView)}
                        aria-pressed={isGlobalView}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-black/10 hover:border-[#5a1f2e]/40 shadow-sm transition-all text-[#0b0b10]"
                    >
                        {isGlobalView ? (
                            <>
                                <ZoomIn size={14} className="text-[#5a1f2e]" />
                                <span>{t.regionalViewLabel}</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 size={14} className="text-[#5a1f2e]" />
                                <span>{t.globalViewLabel}</span>
                            </>
                        )}
                    </button>

                    <div className="hidden md:flex items-center gap-1.5 text-xs text-[#5a1f2e] font-semibold bg-[#5a1f2e]/5 px-3 py-2 rounded-xl border border-[#5a1f2e]/10">
                        <ShieldCheck size={14} className="text-[#f2a007]" />
                        <span>AIABASD</span>
                    </div>
                </div>
            </div>

            <div className="relative z-30 py-3 flex flex-wrap items-center gap-1.5 border-b border-black/5">
                <span className="t-meta text-[#5a1f2e] shrink-0 me-1">
                    {t.territoryLabel}
                </span>
                {COUNTRIES.map((c) => {
                    const isSelected = currentIso === c.iso;
                    return (
                        <button
                            key={c.iso}
                            onClick={() => setSelectedIso(c.iso)}
                            onMouseEnter={() => setHoveredIso(c.iso)}
                            onMouseLeave={() => setHoveredIso(null)}
                            aria-pressed={isSelected}
                            className={`px-3 py-2 text-xs font-semibold transition-colors shrink-0 border ${
                                isSelected
                                    ? "bg-[#5a1f2e] text-white border-[#5a1f2e] shadow-md scale-105"
                                    : "bg-white text-[#0b0b10]/80 border-black/10 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"
                            }`}
                        >
                            {localizedName(c.id, lang)}
                        </button>
                    );
                })}
            </div>

            <div className={`relative w-full ${compact ? "flex-1 min-h-[240px]" : "flex-1 min-h-[300px]"} my-2 flex items-center justify-center`}>
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <WorldMapSVG 
                        viewBox={viewBox}
                        className="w-full h-full drop-shadow-sm transition-all duration-500" 
                        activeIsoCode={currentIso}
                        hoveredIsoCode={hoveredIso}
                        onCountryHover={(iso) => setHoveredIso(iso)}
                        onCountryClick={(iso) => {
                            const match = COUNTRIES.find(c => c.iso === iso);
                            if (match) setSelectedIso(prev => prev === iso ? null : iso);
                        }}
                    >
                        <g className="pointer-events-none">
                            {arcs.map(arc => {
                                if (!arc) return null;
                                const isHighlighted = currentIso === arc.fromIso || currentIso === arc.toIso;

                                return (
                                    <g key={arc.id}>
                                        <path
                                            d={arc.path}
                                            fill="none"
                                            stroke="#5a1f2e"
                                            strokeWidth={isHighlighted ? "1.5" : "0.8"}
                                            strokeDasharray={isHighlighted ? "none" : "2 2"}
                                            opacity={isHighlighted ? 0.95 : 0.3}
                                        />
                                        {isHighlighted && (
                                            <circle r="2.2" fill="#f2a007">
                                                <animateMotion path={arc.path} dur="2.5s" repeatCount="indefinite" />
                                            </circle>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        <g>
                            {COUNTRIES.map((c) => {
                                const isActive = currentIso === c.iso;
                                return (
                                    <g
                                        key={c.iso}
                                        onClick={() => setSelectedIso(prev => prev === c.iso ? null : c.iso)}
                                        onMouseEnter={() => setHoveredIso(c.iso)}
                                        onMouseLeave={() => setHoveredIso(null)}
                                        className="cursor-pointer"
                                    >
                                        {isActive && (
                                            <circle
                                                cx={c.cx}
                                                cy={c.cy}
                                                r="7"
                                                fill="#5a1f2e"
                                                fillOpacity="0.25"
                                            >
                                                <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                                                <animate attributeName="fill-opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
                                            </circle>
                                        )}

                                        <circle
                                            cx={c.cx}
                                            cy={c.cy}
                                            r={isActive ? "4.5" : "3"}
                                            fill={isActive ? "#5a1f2e" : c.status === "active" ? "#0b0b10" : "#6b7280"}
                                            stroke="#ffffff"
                                            strokeWidth="1"
                                            className="transition-all duration-300"
                                        />

                                        <circle
                                            cx={c.cx}
                                            cy={c.cy}
                                            r="1.2"
                                            fill={isActive ? "#f2a007" : "#ffffff"}
                                        />

                                        {isActive && (
                                            <g transform={`translate(${c.cx}, ${c.cy - 9})`}>
                                                <rect
                                                    x="-30"
                                                    y="-11"
                                                    width="60"
                                                    height="12"
                                                    rx="3"
                                                    fill="#0b0b10"
                                                    stroke="#f2a007"
                                                    strokeWidth="0.5"
                                                />
                                                <text
                                                    x="0"
                                                    y="-3"
                                                    textAnchor="middle"
                                                    fill="#ffffff"
                                                    fontSize="6"
                                                    fontWeight="bold"
                                                    fontFamily="sans-serif"
                                                >
                                                    {localizedName(c.id, lang)}
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </WorldMapSVG>
                </div>

                <AnimatePresence>
                    {currentCountry && (
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.96 }}
                            className="absolute bottom-4 end-4 z-30 max-w-sm"
                        >
                            <div className="bg-[#0b0b10]/95 border border-white/20 p-5 text-white shadow-2xl">
                                <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin size={16} className="text-[#f2a007] shrink-0" />
                                        <div>
                                            <div className="font-bold text-sm text-white flex items-center gap-2">
                                                {localizedName(currentCountry.id, lang)}
                                                {lang === "ar" && <span className="text-xs font-normal text-white/50">({currentCountry.capital})</span>}
                                            </div>
                                            <div className="text-[11px] text-white/60">{REGION_LABELS[currentCountry.region]?.[lang] ?? currentCountry.region}</div>
                                        </div>
                                    </div>
                                    <span className={`t-meta px-2.5 py-1.5 border ${
                                        currentCountry.status === "active"
                                            ? "bg-[#5a1f2e] text-white border border-[#f2a007]/30"
                                            : "bg-white/10 text-white/70"
                                    }`}>
                                        {currentCountry.status === "active" ? t.activeRegionLabel : t.pipelineLabel}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                        <div className="t-meta text-white/45">{t.capitalLabel}</div>
                                        <div className="font-semibold text-white mt-0.5" dir="ltr">
                                            <bdi>{lang === "ar" ? currentCountry.capitalAr : currentCountry.capital}</bdi>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                        <div className="t-meta text-white/45">{t.projectsLabel}</div>
                                        <div className="font-semibold text-[#f2a007] mt-0.5 flex items-center gap-1">
                                            <Activity size={12} />
                                            <span><bdi>{currentCountry.projects}</bdi></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 t-meta text-white/55 flex items-center gap-1.5">
                                    <CheckCircle2 size={12} className="text-emerald-400" />
                                    <span>{t.presenceLabel}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative z-30 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 t-meta text-black/50">
                <div>{t.mapHint}</div>
                <div className="font-semibold text-[#5a1f2e]">AIABASD</div>
            </div>
        </div>
    );
}

const NodalMap = memo(NodalMapComponent);
export default NodalMap;
