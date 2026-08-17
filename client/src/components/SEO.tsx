import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    lang?: string;
}

export default function SEO({
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url,
    lang = "en"
}: SEOProps) {
    const siteUrl = "https://aiabasd.org"; // Replace with actual domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <html lang={lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:locale" content={lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : "en_US"} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Canonical */}
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
}
