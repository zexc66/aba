import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { COPY } from "@/data";
import { cms } from "@/services/cms";

// ── Types ────────────────────────────────────────────────────────────────────
export type Locale = "en" | "ar" | "fr";

interface LanguageContextValue {
    lang: Locale;
    isRTL: boolean;
    toggleLang: () => void;
    setLang: (lang: Locale) => void;
    content: typeof COPY["en"];
    langLabel: string;
    isFetchingCMS: boolean;
}

// ── Context ───────────────────────────────────────────────────────────────────
const LanguageContext = createContext<LanguageContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Locale>("en");
    const [content, setContent] = useState<typeof COPY["en"]>(COPY["en"]);
    const [isFetchingCMS, setIsFetchingCMS] = useState(true);

    const isRTL = lang === "ar";

    // Sync document direction whenever language changes
    useEffect(() => {
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    }, [isRTL, lang]);

    // Fetch CMS content whenever language changes
    useEffect(() => {
        let mounted = true;
        const fetchContent = async () => {
            setIsFetchingCMS(true);
            const data = await cms.getWebsiteContent(lang);
            if (mounted) {
                setContent(data);
                setIsFetchingCMS(false);
            }
        };
        fetchContent();
        return () => { mounted = false; };
    }, [lang]);

    const setLang = useCallback((next: Locale) => {
        setLangState(next);
    }, []);

    const toggleLang = useCallback(() => {
        setLangState((prev) => (prev === "en" ? "ar" : prev === "ar" ? "fr" : "en"));
    }, []);

    // Derive the lang button label from the content
    const langLabel = useMemo(() => content.langLabel, [content.langLabel]);

    const value: LanguageContextValue = useMemo(
        () => ({ lang, isRTL, toggleLang, setLang, content, langLabel, isFetchingCMS }),
        [lang, isRTL, toggleLang, setLang, content, langLabel, isFetchingCMS]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// ── Consumer hook ─────────────────────────────────────────────────────────────
export function useLanguageContext(): LanguageContextValue {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguageContext must be used inside <LanguageProvider>");
    }
    return ctx;
}
