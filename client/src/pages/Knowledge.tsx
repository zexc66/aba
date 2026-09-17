import { Link } from "wouter";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { localizedLinkPath } from "@/localePath";
import NetworkLayout, { networkButton, networkLink } from "@/components/NetworkLayout";
import { PREPARATION_COPY } from "@/preparation";
import { TEMPLATES_COPY } from "@/templates";
import { GLOSSARY_COPY } from "@/glossary";

export const KNOWLEDGE_COPY = {
  en: { title: "Project cooperation guide", intro: "Understand the cooperation models described by AIABASD and prepare the questions to discuss with a project sponsor.", sources: "Related institutional guidance", notice: "Delivery models are proposed structures. Ownership, risk allocation, financing and approvals depend on the applicable law and the final project agreements." },
  ar: { title: "دليل التعاون في المشاريع", intro: "تعرّف على نماذج التعاون التي يوضحها التحالف وجهّز الأسئلة لمناقشتها مع الجهة الراعية للمشروع.", sources: "إرشادات مؤسسية ذات صلة", notice: "نماذج التنفيذ هياكل مقترحة. تعتمد الملكية وتوزيع المخاطر والتمويل والموافقات على القانون المطبق واتفاقيات المشروع النهائية." },
  fr: { title: "Guide de coopération de projet", intro: "Comprenez les modèles de coopération décrits par l’AIABASD et préparez vos questions pour le porteur de projet.", sources: "Orientations institutionnelles associées", notice: "Les modèles de réalisation sont des structures proposées. Propriété, risques, financement et autorisations dépendent du droit applicable et des accords définitifs." },
};

export default function Knowledge() {
  const { lang, content } = useLanguageContext();
  const t = KNOWLEDGE_COPY[lang];
  const source = content.governments;
  return <NetworkLayout eyebrow={t.title} title={t.title} description={t.intro} path="/knowledge">
    <article className="max-w-4xl">
      <h2 className="text-2xl font-semibold">{source.modelsTitle}</h2>
      <dl className="mt-6 divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
        {source.models.map(model => <div className="py-6" key={model.name}><dt className="text-lg font-semibold">{model.name}</dt><dd className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#0b0b10]/70">{model.desc}</dd></div>)}
      </dl>
      <p className="my-8 text-sm leading-relaxed text-[#0b0b10]/70">{t.notice}</p>
      <h2 className="text-2xl font-semibold">{PREPARATION_COPY[lang].questions}</h2>
      <ol className="mt-6 list-decimal space-y-4 ps-6">{Object.values(PREPARATION_COPY[lang].items).map(item => <li key={item}>{item}</li>)}</ol>
      <Link asChild href={localizedLinkPath("/preparation", lang)}><a className={`${networkButton} my-8`}>{PREPARATION_COPY[lang].title}</a></Link>
      <div className="mb-8 grid gap-px border border-[#0b0b10]/10 bg-[#0b0b10]/10 sm:grid-cols-3">
        <Link asChild href={localizedLinkPath("/templates", lang)}><a className="flex min-h-16 items-center bg-white p-4 text-sm font-medium transition-colors hover:bg-[#5a1f2e]/[0.04]">{TEMPLATES_COPY[lang].title}</a></Link>
        <Link asChild href={localizedLinkPath("/glossary", lang)}><a className="flex min-h-16 items-center bg-white p-4 text-sm font-medium transition-colors hover:bg-[#5a1f2e]/[0.04]">{GLOSSARY_COPY[lang].title}</a></Link>
        <Link asChild href={localizedLinkPath("/governments", lang)}><a className="flex min-h-16 items-center bg-white p-4 text-sm font-medium transition-colors hover:bg-[#5a1f2e]/[0.04]">{source.metaTitle}</a></Link>
      </div>
      <div><Link asChild href={localizedLinkPath("/templates", lang)}><a className={networkLink}>{TEMPLATES_COPY[lang].title}</a></Link></div>
      <div className="mb-8"><Link asChild href={localizedLinkPath("/glossary", lang)}><a className={networkLink}>{GLOSSARY_COPY[lang].title}</a></Link></div>
      <h2 className="text-xl font-semibold">{t.sources}</h2>
      <ul className="mt-4 space-y-2">
        <li><Link asChild href={localizedLinkPath("/governments", lang)}><a className={networkLink}>{source.metaTitle}</a></Link></li>
        {content.governance.pillars.map((pillar, index) => <li key={pillar.title}><Link asChild href={localizedLinkPath(`/governance/${["esia-esms", "kyc-aml", "independent-oversight", "contracts"][index]}`, lang)}><a className={networkLink}>{pillar.title}</a></Link></li>)}
      </ul>
    </article>
  </NetworkLayout>;
}
