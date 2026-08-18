import { useEffect, useState, memo } from "react";
import { Calendar, Clock, Newspaper } from "lucide-react";
import { Section } from "@/components/ui/section";
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
    lang: string;
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

function NewsroomComponent({ data, lang }: NewsroomProps) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);

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
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const [featured, ...rest] = articles;

    return (
        <Section id="news" className="relative py-24 bg-[#fdfcfb] border-b border-black/5">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-black/5">
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

                    <div className="max-w-md">
                        <p className="text-base text-black/70 italic leading-relaxed">
                            "{data.note}"
                        </p>
                    </div>
                </div>

                {articles.length === 0 ? (
                    <div className="bg-white rounded-xl border border-black/5 shadow-sm px-8 py-16 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-[#5a1f2e]/5 text-[#5a1f2e] border border-[#5a1f2e]/20 flex items-center justify-center mb-6">
                            <Newspaper size={24} />
                        </div>
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
                                    transition={{ duration: 0.5 }}
                                    className="lg:col-span-12 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all duration-300"
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
                                                        <span className="text-black/40 flex items-center gap-1">
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
                                        className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 items-center"
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
                                                        <span className="text-black/40 flex items-center gap-1">
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

            </div>
        </Section>
    );
}

const Newsroom = memo(NewsroomComponent);
export default Newsroom;
