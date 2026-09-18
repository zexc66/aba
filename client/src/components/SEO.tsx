import { Helmet } from "react-helmet-async";
import { DEPLOY_BASE_PATH, deployAssetPath } from "@/localePath";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    lang?: string;
    noindex?: boolean;
    /** Page-specific JSON-LD node(s) rendered alongside the Organization schema. */
    schema?: Record<string, unknown> | Record<string, unknown>[];
}

export const SITE_URL = "https://aiabasd.org";

const LOCALE_PREFIXES: Record<string, string> = { en: "", ar: "/ar", fr: "/fr" };

const ORG_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "African International Alliance for Business & Sustainable Development",
    alternateName: ["AIABASD", "التحالف الدولي الأفريقي للأعمال والتنمية المستدامة", "Alliance Internationale Africaine pour les Affaires et le Développement Durable"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo-512.png`,
    email: "gs@aibasd.org",
    description:
        "International platform for economic, investment, and development cooperation — building strategic partnerships between Africa, the Arab world, and international markets, and converting opportunities into bankable, executable projects (PPP/BOT/EPC+F) with technology transfer and industrial localization.",
    slogan: "Connecting Opportunities. Building Partnerships. Delivering Sustainable Development.",
    areaServed: [
        { "@type": "Place", name: "Africa" },
        { "@type": "Place", name: "Middle East" },
        { "@type": "Place", name: "Ghana" },
        { "@type": "Place", name: "Sierra Leone" },
        { "@type": "Place", name: "The Gambia" },
        { "@type": "Place", name: "Côte d'Ivoire" },
        { "@type": "Place", name: "Burkina Faso" },
        { "@type": "Place", name: "Angola" },
        { "@type": "Place", name: "Sudan" },
        { "@type": "Place", name: "Egypt" },
        { "@type": "Place", name: "Jordan" },
        { "@type": "Place", name: "Syria" },
        { "@type": "Place", name: "Saudi Arabia" },
    ],
    knowsAbout: [
        "Public-private partnership (PPP)",
        "Build-operate-transfer (BOT)",
        "EPC+F project financing",
        "Renewable energy",
        "Infrastructure development",
        "Technology transfer",
        "Industrial localization",
        "International trade",
        "Food security",
        "Circular economy",
        "Digital infrastructure",
    ],
    contactPoint: [
        {
            "@type": "ContactPoint",
            contactType: "general inquiries",
            email: "gs@aibasd.org",
            availableLanguage: ["English", "Arabic", "French"],
        },
    ],
};

function localePathPrefix(): string {
    try {
        const pathname = DEPLOY_BASE_PATH && (window.location.pathname === DEPLOY_BASE_PATH || window.location.pathname.startsWith(`${DEPLOY_BASE_PATH}/`))
            ? window.location.pathname.slice(DEPLOY_BASE_PATH.length) || "/"
            : window.location.pathname;
        const m = pathname.match(/^\/(ar|fr)(?=\/|$)/);
        return m ? `/${m[1]}` : "";
    } catch {
        return "";
    }
}

export default function SEO({
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url,
    lang = "en",
    schema,
    noindex = false
}: SEOProps) {
    // Locale path prefix (/ar, /fr) for prerendered locale URLs
    const prefix = localePathPrefix();
    const fullUrl = url ? `${SITE_URL}${prefix}${url}` : `${SITE_URL}${prefix}/`;
    const fullImage = image.startsWith("http") ? image : `${SITE_URL}${deployAssetPath(image)}`;

    // hreflang alternates across the three locales — must mirror the
    // prerenderer's head injection (scripts/prerender.mjs) exactly.
    const slash = (p: string) => (p === "" ? "/" : p);
    const hreflangFor = (code: string) => {
        const locPrefix = LOCALE_PREFIXES[code] ?? "";
        const locPath = slash(`${locPrefix}${url ?? "/"}`);
        return `${SITE_URL}${locPath}`;
    };

    const pageSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    return (
        <Helmet>
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex, follow" />}
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:locale" content={lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : "en_US"} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            <link rel="canonical" href={fullUrl} />
            <link rel="alternate" hrefLang="en" href={hreflangFor("en")} />
            <link rel="alternate" hrefLang="ar" href={hreflangFor("ar")} />
            <link rel="alternate" hrefLang="fr" href={hreflangFor("fr")} />
            <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${url ?? "/"}`} />

            <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
            {pageSchemas.map((node, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(node)}</script>
            ))}
        </Helmet>
    );
}
