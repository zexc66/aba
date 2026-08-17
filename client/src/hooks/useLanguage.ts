import { useState, useEffect } from "react";

export type Locale = "en" | "ar" | "fr";

export function useLanguage(defaultLang: Locale = "en") {
    const [lang, setLang] = useState<Locale>(defaultLang);
    const isRTL = lang === "ar";

    useEffect(() => {
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        return () => {
            document.documentElement.dir = "ltr";
        };
    }, [isRTL]);

    const toggleLang = () => {
        setLang((prev) => (prev === "en" ? "ar" : prev === "ar" ? "fr" : "en"));
    };

    return { lang, setLang, isRTL, toggleLang };
}
