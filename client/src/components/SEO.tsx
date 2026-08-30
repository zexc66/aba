import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    lang?: string;
}

export const SITE_URL = "https://aiabasd.org";

const ORG_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "African International Alliance for Business & Sustainable Development",
    alternateName: "AIABASD",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-512.png`,
    email: "contact@aiabasd.org",
    description:
        "Multi-country alliance orchestrating bankable PPP/BOT infrastructure and development programs across Africa and the Arab world, aligned with SDG 2030 and AU Agenda 2063.",
    areaServed: ["Africa", "Middle East"],
};

export default function SEO({
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url,
    lang = "en"
}: SEOProps) {
    // Locale path prefix (/ar, /fr) for prerendered locale URLs
    let prefix = "";
    try {
        const m = window.location.pathname.match(/^\/(ar|fr)(?=\/|$)/);
        if (m) prefix = `/${m[1]}`;
    } catch {
    }
    const fullUrl = url ? `${SITE_URL}${prefix}${url}` : `${SITE_URL}${prefix}/`;
    const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    return (
        <Helmet>
            <html lang={lang} />
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

            <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
        </Helmet>
    );
}
