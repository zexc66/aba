import { ChevronRight, MapPin } from "lucide-react";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import NodalMap from "./NodalMap";
import { useState, memo } from "react";

interface CountriesProps {
    data: {
        title: string;
        note: string;
        list: string[];
    };
}

function CountriesComponent({ data }: CountriesProps) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    return (
        <Section id="countries" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                Geographic Coverage
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
                            <span>{data.list.length} Active Regional Corridors</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-stretch">
                    
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-4 pb-2 border-b border-black/5">
                            Member Countries & Corridors
                        </h3>
                        
                        <div className="space-y-1">
                            {data.list.map((country, i) => {
                                const isActive = activeIdx === i;
                                return (
                                    <div
                                        key={i}
                                        onMouseEnter={() => setActiveIdx(i)}
                                        onMouseLeave={() => setActiveIdx(null)}
                                        className={`group flex items-center justify-between p-3.5 rounded-lg transition-all duration-300 cursor-pointer ${
                                            isActive 
                                                ? "bg-white shadow-md border-l-4 border-l-[#5a1f2e]" 
                                                : "hover:bg-black/5"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-black/40 font-semibold w-6">
                                                {(i + 1).toString().padStart(2, '0')}
                                            </span>
                                            <h4 className={`text-base font-semibold transition-colors ${
                                                isActive ? "text-[#5a1f2e]" : "text-[#0b0b10]"
                                            }`}>
                                                {country}
                                            </h4>
                                        </div>
                                        
                                        <div className={`flex items-center gap-1.5 text-xs font-medium transition-opacity ${
                                            isActive ? "opacity-100 text-[#5a1f2e]" : "opacity-0 group-hover:opacity-100 text-black/40"
                                        }`}>
                                            <MapPin size={14} />
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative min-h-[500px] bg-white rounded-xl shadow-md border border-black/5 overflow-hidden flex items-center justify-center">
                        <NodalMap activeCountry={activeIdx !== null ? data.list[activeIdx] : null} />
                    </div>

                </div>
            </div>
        </Section>
    );
}

const Countries = memo(CountriesComponent);
export default Countries;
