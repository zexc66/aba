import { ArrowRight, Calendar, Clock, Lock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { memo } from "react";

interface NewsroomProps {
    data: {
        title: string;
        note: string;
        empty: string;
    };
    lang: string;
}

const NEWS_MANDATES = [
    {
        date: "DEC 01, 2024",
        category: "Partnership",
        title: "Strategic Alliance with Global African Credit Institutions",
        excerpt: "AIABASD announces structural financing alliance to anchor regional sustainability mandates across sub-Saharan corridors.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        readTime: "4 min read",
        author: "Chief Executive Officer"
    },
    {
        date: "NOV 15, 2024",
        category: "Infrastructure",
        title: "Renewable Energy Activation in West Africa",
        excerpt: "Operational launch of 50MW solar infrastructure designed to anchor regional community resilience.",
        image: "https://images.unsplash.com/photo-1466611653911-95282fc3656d?q=80&w=1200&auto=format&fit=crop",
        readTime: "6 min read",
        author: "Infrastructure Lead"
    },
    {
        date: "OCT 28, 2024",
        category: "Achievement",
        title: "Sovereign Sustainability Excellence Award",
        excerpt: "Recognized by global stakeholders for exceptional commitment to institutional development goals.",
        image: "https://images.unsplash.com/photo-1579389083046-e3df9c3b06b9?q=80&w=1200&auto=format&fit=crop",
        readTime: "3 min read",
        author: "Governance Board"
    }
];

function NewsroomComponent({ data }: NewsroomProps) {
    return (
        <Section id="news" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-0.5 w-8 bg-[#5a1f2e]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#5a1f2e]">
                                Press & Insights
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0b0b10]">
                            {data.title}
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <p className="text-base text-black/70 italic leading-relaxed">
                            "{data.note}"
                        </p>
                    </div>
                </div>

                {/* News Articles Grid */}
                <div className="grid lg:grid-cols-12 gap-8">
                    
                    {/* Featured Article */}
                    <div className="lg:col-span-8 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all duration-300">
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                            <img 
                                src={NEWS_MANDATES[0].image} 
                                alt={NEWS_MANDATES[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                        <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs font-semibold text-[#5a1f2e]">
                                    <span>{NEWS_MANDATES[0].category}</span>
                                    <span>•</span>
                                    <span className="text-black/40">{NEWS_MANDATES[0].date}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                    {NEWS_MANDATES[0].title}
                                </h3>
                                <p className="text-sm text-black/70 leading-relaxed">
                                    {NEWS_MANDATES[0].excerpt}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-black/5 text-xs text-black/60 font-medium">
                                <span>{NEWS_MANDATES[0].author}</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} /> {NEWS_MANDATES[0].readTime}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Subscription Card */}
                    <div className="lg:col-span-4 bg-[#0b0b10] text-white p-8 rounded-xl shadow-lg border border-white/10 flex flex-col justify-between space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#f2a007] mb-6">
                                <span>Institutional Updates</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Subscribe to Institutional Disclosures
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Receive executive updates, development reports, and partnership announcements directly.
                            </p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="your.email@institution.org" 
                                    className="w-full bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 rounded-lg outline-none focus:border-[#f2a007] transition-colors"
                                />
                            </div>
                            <button type="submit" className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-white font-semibold text-xs py-3.5 rounded-lg uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2">
                                <span>Subscribe</span>
                                <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Secondary News Cards */}
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {NEWS_MANDATES.slice(1).map((news, i) => (
                        <div 
                            key={i}
                            className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 items-center"
                        >
                            <div className="w-full md:w-36 h-36 rounded-lg overflow-hidden shrink-0">
                                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#5a1f2e]">
                                    <span>{news.category}</span>
                                    <span>•</span>
                                    <span className="text-black/40">{news.date}</span>
                                </div>
                                <h4 className="text-lg font-bold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors leading-snug">
                                    {news.title}
                                </h4>
                                <p className="text-xs text-black/70 leading-relaxed line-clamp-2">
                                    {news.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </Section>
    );
}

const Newsroom = memo(NewsroomComponent);
export default Newsroom;
