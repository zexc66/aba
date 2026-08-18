import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, memo } from "react";
import { MapPin, CheckCircle2, Globe2, ShieldCheck, ArrowUpRight, Activity, Maximize2, ZoomIn } from "lucide-react";
import WorldMapSVG from "./WorldMapSVG";

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

function NodalMapComponent({ activeCountry }: { activeCountry: string | null }) {
    const [hoveredIso, setHoveredIso] = useState<string | null>(null);
    const [selectedIso, setSelectedIso] = useState<string | null>("gh"); // Default focus on Ghana hub
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
        <div className="w-full h-full relative bg-[#fdfcfb] overflow-hidden select-none p-6 flex flex-col justify-between min-h-[620px] rounded-3xl border border-black/10 shadow-lg">
            
            <div className="relative z-30 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5a1f2e] text-white flex items-center justify-center shadow-md">
                        <Globe2 size={20} className="text-[#f2a007]" />
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-[#5a1f2e]">
                            Sovereign Infrastructure Map
                        </div>
                        <div className="text-sm font-bold text-[#0b0b10]">
                            11 Sovereign Member Corridors
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsGlobalView(!isGlobalView)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-black/10 hover:border-[#5a1f2e]/40 shadow-sm transition-all text-[#0b0b10]"
                    >
                        {isGlobalView ? (
                            <>
                                <ZoomIn size={14} className="text-[#5a1f2e]" />
                                <span>Regional Focus</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 size={14} className="text-[#5a1f2e]" />
                                <span>Global Map</span>
                            </>
                        )}
                    </button>

                    <div className="hidden md:flex items-center gap-1.5 text-xs text-[#5a1f2e] font-semibold bg-[#5a1f2e]/5 px-3 py-1.5 rounded-xl border border-[#5a1f2e]/10">
                        <ShieldCheck size={14} className="text-[#f2a007]" />
                        <span>Institutional Verification Active</span>
                    </div>
                </div>
            </div>

            <div className="relative z-30 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth border-b border-black/5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#5a1f2e] shrink-0 mr-1">
                    Territory:
                </span>
                {COUNTRIES.map((c) => {
                    const isSelected = currentIso === c.iso;
                    return (
                        <button
                            key={c.iso}
                            onClick={() => setSelectedIso(c.iso)}
                            onMouseEnter={() => setHoveredIso(c.iso)}
                            onMouseLeave={() => setHoveredIso(null)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 border ${
                                isSelected
                                    ? "bg-[#5a1f2e] text-white border-[#5a1f2e] shadow-md scale-105"
                                    : "bg-white text-[#0b0b10]/80 border-black/10 hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e]"
                            }`}
                        >
                            {c.id}
                        </button>
                    );
                })}
            </div>

            <div className="relative w-full h-[460px] my-2 flex items-center justify-center">
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
                                            stroke={isHighlighted ? "#5a1f2e" : "#5a1f2e"}
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
                                                    {c.id}
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
                            className="absolute bottom-4 right-4 z-30 max-w-sm"
                        >
                            <div className="bg-[#0b0b10] border border-white/15 p-5 rounded-2xl text-white shadow-2xl backdrop-blur-md">
                                <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-white/10">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin size={16} className="text-[#f2a007]" />
                                        <div>
                                            <div className="font-bold text-sm text-white flex items-center gap-2">
                                                {currentCountry.id}
                                                <span className="text-xs font-normal text-white/50">({currentCountry.capitalAr})</span>
                                            </div>
                                            <div className="text-[11px] text-white/60">{currentCountry.region}</div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                        currentCountry.status === "active"
                                            ? "bg-[#5a1f2e] text-white border border-[#f2a007]/30"
                                            : "bg-white/10 text-white/70"
                                    }`}>
                                        {currentCountry.status === "active" ? "Active Region" : "Pipeline"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                        <div className="text-white/50 text-[10px]">Capital City</div>
                                        <div className="font-semibold text-white mt-0.5">{currentCountry.capital}</div>
                                    </div>
                                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                                        <div className="text-white/50 text-[10px]">Verified Programs</div>
                                        <div className="font-semibold text-[#f2a007] mt-0.5 flex items-center gap-1">
                                            <Activity size={12} />
                                            <span>{currentCountry.projects} Projects</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 text-[11px] text-white/60 flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-emerald-400">
                                        <CheckCircle2 size={12} />
                                        Institutional Presence
                                    </span>
                                    <span className="text-[#f2a007] font-medium flex items-center gap-0.5 cursor-pointer hover:underline">
                                        View Specs <ArrowUpRight size={12} />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative z-30 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs text-black/50">
                <div>Hover or select a sovereign territory to inspect regional corridor operations.</div>
                <div className="font-semibold text-[#5a1f2e]">African International Business Alliance and Sustainable Development</div>
            </div>
        </div>
    );
}

const NodalMap = memo(NodalMapComponent);
export default NodalMap;
