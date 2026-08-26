import { useEffect, useState, memo } from "react";
import { Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { cms, type Locale } from "@/services/cms";

interface NewsroomProps {
    data: {
        title: string;
        note: string;
        empty: string;
        eyebrow: string;
        newsletterTitle: string;
        newsletterText: string;
        newsletterPlaceholder: string;
        newsletterCta: string;
        newsletterSuccess: string;
        newsletterError: string;
    };
    engagements: {
        title: string;
        empty: string;
        dateLabel: string;
        typeLabel: string;
        locationLabel: string;
    };
    lang: string;
}

interface EngagementEntry {
    title: string;
    date: string;
    type: string;
    location: string;
}

function toEngagement(entry: unknown): EngagementEntry | null {
    if (typeof entry !== "object" || entry === null) return null;
    const f = (entry as { fields?: Record<string, unknown> }).fields ?? {};
    const title = typeof f.title === "string" ? f.title.trim() : "";
    if (!title) return null;
    const sys = (entry as { sys?: { updatedAt?: string } }).sys;
    return {
        title,
        date: typeof f.date === "string" ? f.date : (sys?.updatedAt ?? "").slice(0, 10),
        type: typeof f.type === "string" ? f.type : "",
        location: typeof f.location === "string" ? f.location : "",
    };
}

interface NewsArticle {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    image?: string;
    readTime?: string;
    author?: string;
}

function toArticle(entry: unknown): NewsArticle | null {
    if (typeof entry !== "object" || entry === null) return null;
    const { fields, sys } = entry as {
        fields?: Record<string, unknown>;
        sys?: { updatedAt?: string };
    };
    const f = fields ?? {};
    const title = typeof f.title === "string" ? f.title.trim() : "";
    if (!title) return null;

    const assetUrl = (v: unknown): string | undefined => {
        if (typeof v !== "object" || v === null) return undefined;
        const file = (v as { fields?: { file?: { url?: unknown } } }).fields?.file;
        return typeof file?.url === "string" ? `https:${file.url}` : undefined;
    };

    const excerpt =
        typeof f.excerpt === "string" ? f.excerpt : typeof f.summary === "string" ? f.summary : "";
    const date =
        typeof f.date === "string" ? f.date : typeof sys?.updatedAt === "string" ? sys.updatedAt.slice(0, 10) : "";
    const category = typeof f.category === "string" ? f.category : "";
    const readTime = typeof f.readTime === "string" ? f.readTime : undefined;
    const author = typeof f.author === "string" ? f.author : undefined;

    return { title, excerpt, date, category, image: assetUrl(f.image), readTime, author };
}

function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}

function NewsroomComponent({ data, engagements: ui, lang }: NewsroomProps) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [engagements, setEngagements] = useState<EngagementEntry[]>([]);

    useEffect(() => {
        let cancelled = false;
        if (!cms.configured) {
            setArticles([]);
            return;
        }
        cms
            .getCollection("newsArticle", lang as Locale)
            .then((items) => {
                if (cancelled) return;
                setArticles(
                    (items as unknown[])
                        .map(toArticle)
                        .filter((a): a is NewsArticle => a !== null)
                        .sort((a, b) => (a.date < b.date ? 1 : -1))
                );
            })
            .catch(() => {
                if (!cancelled) setArticles([]);
            });
        cms
            .getCollection("engagement", lang as Locale)
            .then((items) => {
                if (cancelled) return;
                setEngagements(
                    (items as unknown[])
                        .map(toEngagement)
                        .filter((e): e is EngagementEntry => e !== null)
                        .sort((a, b) => (a.date < b.date ? 1 : -1))
                );
            })
            .catch(() => {
                if (!cancelled) setEngagements([]);
            });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const [featured, ...rest] = articles;

    return (
        <Section id="news" className="relative py-24 bg-[#fdfcfb] border-b border-black/10">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <SectionHeader
                    index="08"
                    title={data.title}
                    note={data.note}
                    meta={data.eyebrow}
                />

                {articles.length === 0 ? (
                    <div className="border border-black/10 bg-white/50 px-8 py-16 flex flex-col items-center text-center">
                        <span className="t-meta text-[#5a1f2e] border border-[#5a1f2e]/25 px-3 py-1.5 mb-6">AWAITING FIRST ENTRY</span>
                        <p className="max-w-xl text-sm text-black/60 leading-relaxed">
                            {data.empty}
                        </p>
                    </div>
                ) : (
                    <>
                        {featured && (
                            <div className="grid lg:grid-cols-12 gap-8">
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="lg:col-span-12 bg-white border border-black/10 overflow-hidden flex flex-col md:flex-row group transition-colors duration-300 hover:border-[#5a1f2e]/40"
                                >
                                    {featured.image && (
                                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
                                            <img loading="lazy" decoding="async"
                                                src={featured.image}
                                                alt={featured.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className={`${featured.image ? "md:w-1/2" : "md:w-full"} p-8 flex flex-col justify-between space-y-6`}>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-xs font-semibold text-[#5a1f2e]">
                                                {featured.category && <span>{featured.category}</span>}
                                                {featured.date && (
                                                    <>
                                                        {featured.category && <span>•</span>}
                                                        <span className="text-black/55 flex items-center gap-1">
                                                            <Calendar size={12} /> {formatDate(featured.date)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#0b0b10] leading-snug">
                                                {featured.title}
                                            </h3>
                                            {featured.excerpt && (
                                                <p className="text-sm text-black/70 leading-relaxed">
                                                    {featured.excerpt}
                                                </p>
                                            )}
                                        </div>

                                        {(featured.author || featured.readTime) && (
                                            <div className="flex items-center justify-between pt-4 border-t border-black/5 text-xs text-black/60 font-medium">
                                                <span>{featured.author}</span>
                                                {featured.readTime && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} /> {featured.readTime}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            </div>
                        )}

                        {rest.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                {rest.map((news, i) => (
                                    <motion.article
                                        key={`${news.title}-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="bg-white p-6 border border-black/10 transition-colors duration-300 hover:border-[#5a1f2e]/40 group flex flex-col md:flex-row gap-6 items-center"
                                    >
                                        {news.image && (
                                            <div className="w-full md:w-36 h-36 rounded-lg overflow-hidden shrink-0">
                                                <img loading="lazy" decoding="async" src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-[#5a1f2e]">
                                                {news.category && <span>{news.category}</span>}
                                                {news.date && (
                                                    <>
                                                        {news.category && <span>•</span>}
                                                        <span className="text-black/55 flex items-center gap-1">
                                                            <Calendar size={12} /> {formatDate(news.date)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <h4 className="text-lg font-bold text-[#0b0b10] leading-snug">
                                                {news.title}
                                            </h4>
                                            {news.excerpt && (
                                                <p className="text-xs text-black/70 leading-relaxed line-clamp-2">
                                                    {news.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="mt-16">
                    <h3 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-0">
                        {ui.title}
                    </h3>
                    {engagements.length === 0 ? (
                        <p className="text-sm text-black/55 leading-relaxed pt-5 max-w-[65ch]">
                            {ui.empty}
                        </p>
                    ) : (
                        <ul className="divide-y divide-black/10 border-b border-black/10">
                            {engagements.map((e, i) => (
                                <li key={i} className="grid md:grid-cols-[8rem_7rem_1fr_8rem] gap-x-6 items-baseline py-4">
                                    <span className="t-data text-xs text-[#5a1f2e]" dir="ltr">
                                        <bdi>{formatDate(e.date)}</bdi>
                                    </span>
                                    <span className="t-meta text-black/55">{e.type}</span>
                                    <h4 className="text-sm font-semibold text-[#0b0b10] leading-snug">{e.title}</h4>
                                    <span className="t-meta text-black/55 md:text-end">{e.location}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </Section>
    );
}

const Newsroom = memo(NewsroomComponent);
export default Newsroom;
