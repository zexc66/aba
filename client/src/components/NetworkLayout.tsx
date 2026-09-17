import { useEffect, type ReactNode } from "react";
import SEO from "./SEO";
import Header from "./home/Header";
import Footer from "./home/Footer";
import { useLanguageContext } from "@/contexts/LanguageContext";

export const networkField = "w-full min-h-11 border border-[#0b0b10]/10 bg-[#fdfcfb] px-4 py-3 text-sm text-[#0b0b10] caret-[#5a1f2e] placeholder:text-black/45 transition-[color,background-color,border-color] focus:border-[#5a1f2e] focus:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e]";
export const networkButton = "inline-flex min-h-11 items-center justify-center gap-2 bg-[#5a1f2e] px-5 py-3 text-sm font-semibold text-[#fdfcfb] transition-colors hover:bg-[#0b0b10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e] disabled:opacity-50";
export const networkLink = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#5a1f2e] underline underline-offset-4";

/** Operate mode: inherited Sovereign Terminal; compact title, task controls, ledger rows.
 * Company logos carry identity; absent evidence remains explicitly unpublished.
 * Success: filter a company, inspect its record, send a contextual introduction in any locale.
 */
export default function NetworkLayout({ title, description, path, children, noindex = false, eyebrow }: {
  title: string; description: string; path: string; children: ReactNode; noindex?: boolean; eyebrow?: string;
}) {
  const { lang, content, isRTL } = useLanguageContext();
  useEffect(() => { if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" }); }, [path]);
  return <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
    <SEO title={`${title} | AIABASD`} description={description} lang={lang} url={path} noindex={noindex} />
    <Header nav={content.nav} surface="light" />
    <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-32 md:px-12 lg:px-24">
      <header className="mb-10 border-b border-[#0b0b10]/10 pb-8">
        {eyebrow && <p className="t-meta mb-4 text-[#5a1f2e]">{eyebrow}</p>}
        <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-[#0b0b10]/70">{description}</p>
      </header>
      {children}
    </div>
    <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
  </div>;
}
