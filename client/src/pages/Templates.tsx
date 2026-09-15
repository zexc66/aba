import { Link } from "wouter";
import { Download } from "lucide-react";
import NetworkLayout, { networkButton, networkLink } from "@/components/NetworkLayout";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { TEMPLATES, TEMPLATES_COPY } from "@/templates";
import { localizedLinkPath } from "@/localePath";

const LOCALES: { code: "en" | "ar" | "fr"; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
];

export default function Templates() {
  const { lang } = useLanguageContext();
  const t = TEMPLATES_COPY[lang];

  function download(templateId: string, locale: "en" | "ar" | "fr") {
    const template = TEMPLATES.find((tpl) => tpl.id === templateId);
    if (!template) return;
    const blob = new Blob([template.build(locale)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.filename}-${locale}.md`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <NetworkLayout title={t.title} description={t.intro} path="/templates">
      <div className="grid gap-px border border-[#0b0b10]/10 bg-[#0b0b10]/10 md:grid-cols-2">
        {TEMPLATES.map((template) => (
          <section key={template.id} className="bg-white p-7">
            <h2 className="text-xl font-semibold">{template.title[lang]}</h2>
            <p className="mt-3 min-h-[5rem] text-sm leading-relaxed text-[#0b0b10]/70">{template.desc[lang]}</p>
            <p className="t-meta mt-4 text-[10px] text-[#0b0b10]/50">{t.downloadHint}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => download(template.id, l.code)}
                  className="inline-flex min-h-11 items-center gap-2 border border-[#0b0b10]/15 bg-[#fdfcfb] px-4 py-2 text-sm font-medium transition-colors hover:border-[#5a1f2e]/40 hover:text-[#5a1f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5a1f2e]"
                >
                  <Download size={14} aria-hidden="true" />
                  {t.download} · {l.label}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-6 max-w-[75ch] text-sm leading-relaxed text-[#0b0b10]/70">{t.privacy}</p>

      <h2 className="mt-12 text-xl font-semibold">{t.more}</h2>
      <p className="mt-2 text-sm text-[#0b0b10]/70">{t.moreIntro}</p>
      <ul className="mt-4 space-y-2">
        <li><Link asChild href={localizedLinkPath("/preparation", lang)}><a className={networkLink}>{t.preparation}</a></Link></li>
        <li><Link asChild href={localizedLinkPath("/knowledge", lang)}><a className={networkLink}>Knowledge</a></Link></li>
        <li><Link asChild href={localizedLinkPath("/glossary", lang)}><a className={networkLink}>Glossary</a></Link></li>
      </ul>
    </NetworkLayout>
  );
}
