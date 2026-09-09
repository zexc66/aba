import { ArrowLeft, ShieldOff } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";

const COPY = {
  en: {
    title: "This area is not available here",
    description: "The public Vercel deployment does not serve the private operations or investor area.",
    note: "Use the approved self-hosted operations environment for director-issued access and internal console functions.",
    home: "Return to public site",
  },
  ar: {
    title: "هذه المنطقة غير متاحة هنا",
    description: "لا يخدم نشر Vercel العام منطقة العمليات الخاصة أو منطقة المستثمرين.",
    note: "استخدم بيئة العمليات المستضافة ذاتياً والمعتمدة للوصول الصادر عن الإدارة ووظائف وحدة التحكم الداخلية.",
    home: "العودة إلى الموقع العام",
  },
  fr: {
    title: "Cette zone n'est pas disponible ici",
    description: "Le déploiement public Vercel ne sert pas l'espace privé des opérations ou des investisseurs.",
    note: "Utilisez l'environnement opérationnel auto-hébergé approuvé pour les accès délivrés par la direction et la console interne.",
    home: "Retour au site public",
  },
} as const;

export default function DeploymentUnavailable() {
  const { lang, isRTL } = useLanguageContext();
  const copy = COPY[lang];

  return (
    <main
      className={`min-h-screen bg-[#0b0b10] px-6 py-16 text-[#fdfcfb] md:px-12 flex items-center justify-center ${isRTL ? "font-arabic" : "font-sans"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <SEO title={`${copy.title} | AIABASD`} description={copy.description} lang={lang} url="/" />
      <div className="w-full max-w-xl border border-white/10 bg-[#121216] p-8 md:p-12 text-center flex flex-col items-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center border border-[#f2a007]/30 bg-[#5a1f2e]/25 text-[#f2a007]">
          <ShieldOff size={24} aria-hidden="true" />
        </div>
        <p className="t-meta mb-4 text-[#f2a007]">VERCEL_PUBLIC_BOUNDARY</p>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-white">{copy.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#fdfcfb]/75">{copy.description}</p>
        <p className="mt-3 max-w-lg text-xs leading-relaxed text-[#fdfcfb]/50 border-t border-white/10 pt-4">{copy.note}</p>
        <Link
          href={localizedLinkPath("/", lang)}
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 bg-transparent px-6 py-3 t-meta text-[11px] text-white transition-colors hover:border-[#f2a007] hover:text-[#f2a007] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f2a007] focus-visible:outline-offset-2"
        >
          <ArrowLeft size={14} className="rtl:-scale-x-100" aria-hidden="true" />
          {copy.home}
        </Link>
      </div>
    </main>
  );
}
