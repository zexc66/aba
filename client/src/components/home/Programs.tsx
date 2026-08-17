import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, ShieldCheck, Heart, Building2, Leaf, Globe2, Layers, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useMemo, memo } from "react";

interface ProgramItem {
    icon: React.ReactNode;
    name: string;
    desc: string;
    tags: string[];
    logo?: string;
    link?: string;
    id?: string;
    impactMetric?: string;
    model?: string;
}

interface ProgramsProps {
    data: {
        title: string;
        list: ProgramItem[];
    };
}

function ProgramsComponent({ data }: ProgramsProps) {
    const [, setLocation] = useLocation();
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const allTags = data.list.flatMap(p => p.tags);
        return ["All", ...Array.from(new Set(allTags))].slice(0, 7);
    }, [data.list]);

    const filteredPrograms = useMemo(() => {
        if (activeCategory === "All") return data.list;
        return data.list.filter(p => p.tags.includes(activeCategory));
    }, [data.list, activeCategory]);

    // Separate featured program if available (e.g. Hama Project)
    const featuredProgram = useMemo(() => {
        return data.list.find(p => p.link === "/hama-project") || data.list[0];
    }, [data.list]);

    return (
        <Section id="programs" className="relative py-28 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-0.5 w-10 bg-[#5a1f2e]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#5a1f2e]">
                                Sovereign & Institutional Initiatives
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0b0b10]">
                            {data.title}
                        </h2>
                        <p className="mt-3 text-base text-black/60 max-w-2xl">
                            Bankable public-private partnership models (PPP/BOT/EPC+F) designed for long-term regional resilience and economic development.
                        </p>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                                        isActive
                                            ? "bg-[#5a1f2e] text-white shadow-md shadow-[#5a1f2e]/20"
                                            : "bg-white text-black/70 hover:bg-black/5 border border-black/10"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Program Banner (Flagship Showcase) */}
                {featuredProgram && activeCategory === "All" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-14 bg-[#0b0b10] rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
                        onClick={() => featuredProgram.link && setLocation(featuredProgram.link)}
                    >
                        {/* Subtle background glow */}
                        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#5a1f2e]/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-[#f2a007]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#5a1f2e] text-white rounded-full border border-[#f2a007]/30">
                                        Flagship Initiative
                                    </span>
                                    <span className="text-xs text-white/60 flex items-center gap-1">
                                        <CheckCircle2 size={13} className="text-emerald-400" />
                                        Verified Active Relief & Recovery
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#f2a007] transition-colors leading-tight">
                                    {featuredProgram.name}
                                </h3>

                                <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
                                    {featuredProgram.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {featuredProgram.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-md border border-white/10">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-6">
                                {featuredProgram.logo && (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 bg-white/10 p-1 shadow-lg">
                                        <img src={featuredProgram.logo} alt="Project Logo" className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                )}

                                <button className="inline-flex items-center gap-2 text-sm font-bold text-[#0b0b10] bg-[#f2a007] hover:bg-white px-6 py-3 rounded-xl transition-all shadow-lg group-hover:translate-x-1">
                                    <span>Explore Project Blueprint</span>
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPrograms.map((program, i) => (
                            <motion.div
                                key={`${program.name}-${i}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="group bg-white rounded-2xl border border-black/10 p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#5a1f2e]/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
                                onClick={() => program.link && setLocation(program.link)}
                            >
                                {/* Top Accent Bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a1f2e] to-[#f2a007] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div>
                                    {/* Icon & Status */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#5a1f2e]/10 text-[#5a1f2e] flex items-center justify-center group-hover:bg-[#5a1f2e] group-hover:text-white transition-all duration-300 shadow-sm">
                                            {program.icon || <Globe className="w-6 h-6" />}
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Active Operational
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors mb-3 leading-snug">
                                        {program.name}
                                    </h3>
                                    <p className="text-sm text-black/70 leading-relaxed mb-6">
                                        {program.desc}
                                    </p>
                                </div>

                                {/* Tags & Action Link */}
                                <div className="pt-5 border-t border-black/5 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1.5">
                                        {program.tags.map((tag, j) => (
                                            <span
                                                key={j}
                                                className="text-[11px] font-medium text-black/60 bg-black/5 px-2.5 py-1 rounded-md"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="w-9 h-9 rounded-full bg-black/5 group-hover:bg-[#5a1f2e] group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
}

const Programs = memo(ProgramsComponent);
export default Programs;
