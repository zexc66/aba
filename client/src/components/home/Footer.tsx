import { Mail, ArrowUp } from "lucide-react";
import { useState, memo } from "react";
import { useLocation } from "wouter";
import { deployAssetPath, localizedPath } from "@/localePath";
import { LOCALIZED_COPY } from "@/localizedCopy";

interface FooterProps {
    data: {
        rights: string;
        privacy: string;
        terms: string;
        navTitle: string;
        engagementTitle: string;
        updatesTitle: string;
        backToTopLabel: string;
        links: {
            about: string;
            countries: string;
            governance: string;
            partners: string;
            newsroom: string;
            contact: string;
            services: string;
            intelligence: string;
            match: string;
        };
    };
    newsroom: {
        newsletterTitle: string;
        newsletterPlaceholder: string;
        newsletterCta: string;
        newsletterSuccess: string;
        newsletterError: string;
    };
    lang: string;
}

const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:contact@aiabasd.org" },
];

function FooterComponent({ data, newsroom, lang }: FooterProps) {
    const consentCopy = LOCALIZED_COPY[lang as "en" | "ar" | "fr"].consent;
    const [location] = useLocation();
    const isHomeRoute = location.split(/[?#]/, 1)[0] === "/";
    const footerPath = (path: string) => path.startsWith("#") ? (isHomeRoute ? path : `${localizedPath("/", lang)}${path}`) : localizedPath(path, lang);
    const navigation = [
        {
            title: data.navTitle,
            links: [
                { label: data.links.about, href: "#about" },
                { label: data.links.countries, href: "#countries" },
                { label: data.links.governance, href: "#governance" }
            ]
        },
        {
            title: data.engagementTitle,
            links: [
                { label: data.links.partners, href: "#partners" },
                { label: data.links.newsroom, href: "#news" },
                { label: data.links.contact, href: "#contact" }
                ,{ label: data.links.services, href: "/services" }
                ,{ label: data.links.intelligence, href: "/intelligence" }
                ,{ label: data.links.match, href: "/match" }
            ]
        }
    ];
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [consent, setConsent] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || submitting) return;
        setSubmitting(true);
        setStatus("idle");
        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ type: "NEWSLETTER", email, locale: lang, consent: true })
            });
            if (response.ok) {
                setStatus("success");
                setEmail("");
                setConsent(false);
                // Restore the button label after a beat; the error state
                // persists until the visitor edits the address instead.
                setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Newsletter error:", error);
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <footer className="relative bg-[#0b0b10] text-[#fdfcfb] pt-20 pb-12 overflow-hidden border-t border-[#f2a007]/25">
            <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#fdfcfb]/10">

                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={deployAssetPath("/logo.png")}
                                alt="AIABASD"
                                width={56}
                                height={56}
                                loading="lazy"
                                className="h-14 w-14 object-contain"
                            />
                            <div className="border-s border-white/15 ps-3.5 ms-0.5">
                                <span className="font-extrabold text-xl text-[#fdfcfb] block leading-none">AIABASD</span>
                                <span className="text-[11px] font-semibold text-[#f2a007] block max-w-[280px] leading-snug mt-1">
                                    {lang === "ar"
                                        ? "التحالف الدولي الأفريقي للأعمال والتنمية المستدامة"
                                        : lang === "fr"
                                        ? "Alliance Internationale Africaine pour les Affaires et le Développement Durable"
                                        : "African International Alliance for Business & Sustainable Development"}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-[#fdfcfb]/70 leading-relaxed max-w-sm">
                            {lang === "en"
                                ? "Architecting Sustainable Futures Across the Global South."
                                : lang === "ar"
                                    ? "صياغة مستقبل مستدام في الجنوب العالمي."
                                    : "Bâtir un Avenir Durable à Travers le Sud Global."
                            }
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-[#fdfcfb]/5 border border-[#fdfcfb]/10 flex items-center justify-center text-[#fdfcfb]/70 hover:bg-[#5a1f2e] hover:text-[#fdfcfb] hover:border-[#5a1f2e] active:scale-95 transition-[color,background-color,border-color,transform]"
                                >
                                    <social.icon size={18} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
                        {navigation.map((group, i) => (
                            <div key={i} className="space-y-4">
                                <p className="t-meta text-[#f2a007] pb-2 border-b border-[#fdfcfb]/10">
                                    {group.title}
                                </p>
                                <ul className="space-y-2.5">
                                    {group.links.map((link, j) => (
                                        <li key={j}>
                                            <a
                                                href={footerPath(link.href)}
                                                className="text-sm text-[#fdfcfb]/70 hover:text-[#fdfcfb] active:translate-y-px inline-block transition-[color,transform]"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="space-y-4">
                            <p className="t-meta text-[#f2a007] pb-2 border-b border-[#fdfcfb]/10">
                                {newsroom.newsletterTitle}
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                 <input
                                    type="email"
                                    required
                                    aria-label={newsroom.newsletterTitle}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setStatus((s) => (s === "error" ? "idle" : s));
                                    }}
                                    placeholder={newsroom.newsletterPlaceholder}
                                    className="w-full bg-[#fdfcfb]/5 border border-[#fdfcfb]/10 px-3 py-2 text-xs text-[#fdfcfb] placeholder:text-[#fdfcfb]/65 outline-none focus:border-[#f2a007] transition-colors"
                                 />
                                 <label htmlFor="newsletter-consent" className="flex items-start gap-2 text-[11px] text-[#fdfcfb]/60 leading-relaxed">
                                     <input
                                         id="newsletter-consent"
                                         type="checkbox"
                                         required
                                         checked={consent}
                                         onChange={(e) => setConsent(e.target.checked)}
                                         className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#f2a007]"
                                     />
                                     <span>
                                         <span className="font-semibold text-[#fdfcfb]/80">{consentCopy.newsletterLabel}: </span>
                                         {consentCopy.newsletterText} {" "}
                                         <a href={localizedPath("/privacy", lang)} className="text-[#f2a007] underline underline-offset-2 hover:text-[#fdfcfb] active:translate-y-px inline-block transition-[color,transform]">
                                             {consentCopy.privacyLinkLabel}
                                         </a>
                                     </span>
                                 </label>
                                 <button
                                    type="submit"
                                    disabled={submitting || status === "success"}
                                    className="w-full bg-[#5a1f2e] hover:bg-[#5a1f2e]/90 text-[#fdfcfb] font-semibold text-xs py-2 transition-[color,background-color,transform] active:translate-y-px disabled:opacity-50"
                                >
                                    {status === "success"
                                        ? newsroom.newsletterSuccess
                                        : newsroom.newsletterCta}
                                </button>
                                {status === "error" && (
                                    <p role="alert" className="text-[11px] text-[#f2a007]">
                                        {newsroom.newsletterError}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fdfcfb]/50">
                    <div>
                        © {new Date().getFullYear()} AIABASD. {data.rights}
                    </div>

                    <div className="flex items-center gap-6 font-medium">
                        <a href={localizedPath("/privacy", lang)} className="hover:text-[#fdfcfb] active:translate-y-px inline-block transition-[color,transform]">{data.privacy}</a>
                        <a href={localizedPath("/terms", lang)} className="hover:text-[#fdfcfb] active:translate-y-px inline-block transition-[color,transform]">{data.terms}</a>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            aria-label={data.backToTopLabel}
                            className="flex items-center gap-1.5 text-[#fdfcfb]/70 hover:text-[#fdfcfb] active:scale-95 transition-[color,transform] cursor-pointer"
                        >
                            <ArrowUp size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

const Footer = memo(FooterComponent);
export default Footer;
