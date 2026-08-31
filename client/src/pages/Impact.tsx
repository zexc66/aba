import { Link } from "wouter";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Section } from "@/components/ui/section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { STATUSES, projectBySlug, type Locale3 } from "@/projects";

type Locale = Locale3;

interface Indicator {
  label: Record<Locale, string>;
  value: Record<Locale, string>;
  projectSlug: string;
}

const INDICATORS: Indicator[] = [
  {
    label: {
      en: "Solar generation capacity (planned)",
      ar: "قدرة توليد الطاقة الشمسية (مخططة)",
      fr: "Capacité solaire planifiée",
    },
    value: { en: "Up to 200 MW", ar: "حتى 200 ميجاواط", fr: "Jusqu'à 200 MW" },
    projectSlug: "hama-solar-200mw",
  },
  {
    label: {
      en: "Productive housing units (Sudan program)",
      ar: "وحدات الإسكان الإنتاجي (برنامج السودان)",
      fr: "Logements productifs (programme Soudan)",
    },
    value: { en: "Up to 1,000,000", ar: "حتى 1,000,000", fr: "Jusqu'à 1 000 000" },
    projectSlug: "sudan-productive-housing",
  },
  {
    label: {
      en: "Housing units (Hama opportunity)",
      ar: "وحدات سكنية (فرصة حماة)",
      fr: "Logements (opportunité Hama)",
    },
    value: { en: "≈ 5,000", ar: "≈ 5,000", fr: "≈ 5 000" },
    projectSlug: "hama-housing",
  },
  {
    label: {
      en: "Housing units (Dummar first phase)",
      ar: "وحدات سكنية (دمّر الشام — المرحلة الأولى)",
      fr: "Logements (Dummar — première phase)",
    },
    value: { en: "≈ 1,000", ar: "≈ 1,000", fr: "≈ 1 000" },
    projectSlug: "dummar-housing",
  },
  {
    label: {
      en: "Debris processing capacity",
      ar: "طاقة معالجة الأنقاض",
      fr: "Capacité de traitement des décombres",
    },
    value: { en: "200 tonnes / hour", ar: "200 طن / ساعة", fr: "200 tonnes / heure" },
    projectSlug: "hama-debris-recycling",
  },
  {
    label: {
      en: "Smart electricity meters (indicative)",
      ar: "عدادات الكهرباء الذكية (استرشادي)",
      fr: "Compteurs intelligents (indicatif)",
    },
    value: { en: "6.5 million", ar: "6.5 مليون", fr: "6,5 millions" },
    projectSlug: "smart-meters-syria",
  },
  {
    label: {
      en: "Schools targeted for rehabilitation",
      ar: "مدارس مستهدفة لإعادة التأهيل",
      fr: "Écoles ciblées pour réhabilitation",
    },
    value: { en: "50", ar: "50", fr: "50" },
    projectSlug: "schools-health-rehabilitation",
  },
  {
    label: {
      en: "Healthcare centers targeted",
      ar: "مراكز صحية مستهدفة",
      fr: "Centres de santé ciblés",
    },
    value: { en: "20", ar: "20", fr: "20" },
    projectSlug: "schools-health-rehabilitation",
  },
];

const UI: Record<Locale, {
  title: string;
  pageTitle: string;
  note: string;
  aggregatesTitle: string;
  indicatorLabel: string;
  valueLabel: string;
  projectLabel: string;
  measuredLabel: string;
  measuredPlaceholder: string;
  pipelineLabel: string;
  jobsLabel: string;
  corridorsLabel: string;
  disclaimerLabel: string;
  disclaimer: string;
}> = {
  en: {
    title: "Measurement Framework",
    pageTitle: "Measurement Framework | AIABASD",
    note: "How AIABASD reports progress: published indicators reference the indicative scope of portfolio projects. Measured output is added only after independent verification — we publish baselines, not projections.",
    aggregatesTitle: "Portfolio at a Glance",
    indicatorLabel: "Indicator",
    valueLabel: "Indicative Scope",
    projectLabel: "Project",
    measuredLabel: "Measured Output",
    measuredPlaceholder: "Published after verification",
    pipelineLabel: "Directed pipeline (USD)",
    jobsLabel: "Jobs enabled (target)",
    corridorsLabel: "Sovereign corridors",
    disclaimerLabel: "Important Notice",
    disclaimer: "Figures above are indicative scopes from published project profiles, not results or commitments. Measured outcomes will be published following independent verification at each implementation stage.",
  },
  ar: {
    title: "إطار القياس",
    pageTitle: "إطار القياس | AIABASD",
    note: "كيف يعلن التحالف عن التقدم: تشير المؤشرات المنشورة إلى النطاق الاسترشادي لمشاريع المحفظة. وتُضاف المخرجات المقاسة فقط بعد التحقق المستقل — ننشر خطوط الأساس لا التوقعات.",
    aggregatesTitle: "المحفظة في لمحة",
    indicatorLabel: "المؤشر",
    valueLabel: "النطاق الاسترشادي",
    projectLabel: "المشروع",
    measuredLabel: "المخرجات المقاسة",
    measuredPlaceholder: "تُنشر بعد التحقق",
    pipelineLabel: "خط المشاريع الموجه (دولار)",
    jobsLabel: "الوظائف المستهدفة",
    corridorsLabel: "الممرات السيادية",
    disclaimerLabel: "ملاحظة مهمة",
    disclaimer: "الأرقام أعلاه نطاقات استرشادية من ملفات المشاريع المنشورة، وليست نتائج أو التزامات. وستُنشر المخرجات المقاسة بعد التحقق المستقل في كل مرحلة تنفيذ.",
  },
  fr: {
    title: "Cadre de mesure",
    pageTitle: "Cadre de mesure | AIABASD",
    note: "Comment l'AIABASD rend compte des progrès : les indicateurs publiés renvoient au périmètre indicatif des projets du portefeuille. Les résultats mesurés sont ajoutés uniquement après vérification indépendante — nous publions des références, pas des projections.",
    aggregatesTitle: "Portefeuille en bref",
    indicatorLabel: "Indicateur",
    valueLabel: "Périmètre indicatif",
    projectLabel: "Projet",
    measuredLabel: "Résultats mesurés",
    measuredPlaceholder: "Publié après vérification",
    pipelineLabel: "Pipeline dirigé (USD)",
    jobsLabel: "Emplois visés",
    corridorsLabel: "Corridors souverains",
    disclaimerLabel: "Avis important",
    disclaimer: "Les chiffres ci-dessus sont des périmètres indicatifs issus des profils de projets publiés, et non des résultats ou engagements. Les résultats mesurés seront publiés après vérification indépendante à chaque étape de mise en œuvre.",
  },
};

const AGGREGATES: Record<Locale, { pipeline: string; jobs: string; corridors: string }> = {
  en: { pipeline: "+550M", jobs: "10,000+", corridors: "11" },
  ar: { pipeline: "+550M", jobs: "10,000+", corridors: "11" },
  fr: { pipeline: "+550M", jobs: "10 000+", corridors: "11" },
};

export default function Impact() {
  const { lang, content } = useLanguageContext();
  const locale = lang as Locale;
  const t = UI[locale];
  const agg = AGGREGATES[locale];

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${lang === "ar" ? "font-arabic" : ""}`}>
      <SEO title={t.pageTitle} description={t.note} lang={lang} url="/impact" />
      <Header nav={content.nav} />

      <main id="main-content" className="pt-24 pb-24">
        <Section className="relative py-12 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <SectionHeader
              index="M"
              title={t.title}
              note={t.note}
              meta="MEASUREMENT_FRAMEWORK"
              titleAs="h1"
            />
          </div>
        </Section>

        {/* Owner-approved aggregates */}
        <Section className="py-12">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-8">
              {t.aggregatesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/10 border border-black/10">
              <div className="bg-white p-8">
                <div className="t-data text-3xl font-semibold text-[#5a1f2e]" dir="ltr"><bdi>{agg.pipeline}</bdi></div>
                <div className="t-meta text-black/55 mt-2">{t.pipelineLabel}</div>
              </div>
              <div className="bg-white p-8">
                <div className="t-data text-3xl font-semibold text-[#5a1f2e]" dir="ltr"><bdi>{agg.jobs}</bdi></div>
                <div className="t-meta text-black/55 mt-2">{t.jobsLabel}</div>
              </div>
              <div className="bg-white p-8">
                <div className="t-data text-3xl font-semibold text-[#5a1f2e]" dir="ltr"><bdi>{agg.corridors}</bdi></div>
                <div className="t-meta text-black/55 mt-2">{t.corridorsLabel}</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Indicators */}
        <Section className="pb-14">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-0">
              {t.indicatorLabel}
            </h2>
            <ul className="divide-y divide-black/10 border-x border-b border-black/10">
              {INDICATORS.map((ind) => {
                const project = projectBySlug(ind.projectSlug);
                return (
                  <li
                    key={ind.label.en + ind.projectSlug}
                    className="grid md:grid-cols-[1fr_auto_auto] gap-x-8 gap-y-2 items-center py-5 px-1"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#0b0b10] leading-snug">
                        {ind.label[locale]}
                      </p>
                      {project && (
                        <Link href={`/projects/${project.slug}`}>
                          <a className="t-meta text-[10px] text-[#5a1f2e] hover:text-[#0b0b10] transition-colors mt-1 inline-block">
                            {project.title[locale]}
                          </a>
                        </Link>
                      )}
                    </div>
                    <div className="text-start md:text-end">
                      <div className="t-meta text-black/50 text-[10px] md:hidden mb-0.5">{t.valueLabel}</div>
                      <span className="t-data text-base font-semibold text-[#0b0b10]" dir="ltr">
                        <bdi>{ind.value[locale]}</bdi>
                      </span>
                    </div>
                    <div className="md:text-end">
                      <div className="t-meta text-black/50 text-[10px] md:hidden mb-0.5">{t.measuredLabel}</div>
                      <span className="t-meta text-[10px] text-black/45 border border-black/15 px-2 py-1 inline-block">
                        {t.measuredPlaceholder}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>

        {/* Honest-methods disclaimer */}
        <Section className="pt-4 pb-10">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <div role="note" className="border border-black/10 bg-white p-6 flex items-start gap-4">
              <div>
                <p className="t-meta text-[#5a1f2e] mb-2">{t.disclaimerLabel}</p>
                <p className="text-sm text-black/65 leading-relaxed">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
