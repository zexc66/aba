import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { Section } from "@/components/ui/section";
import ScrollToTop from "@/components/ScrollToTop";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS, PROJECTS_UI, type CountryKey, type Locale3 } from "@/projects";
import { COUNTRIES, type CountryNode } from "@/countries";
import { PROGRAM_META } from "@/intelligence";

const EN_LIST_INDEX: Record<string, number> = {};
const EN_ORDER = ["Ghana", "The Gambia", "Sierra Leone", "Burkina Faso", "Côte d'Ivoire", "Angola", "Jordan", "Egypt", "Syria", "Sudan", "Saudi Arabia"];
EN_ORDER.forEach((name, i) => { EN_LIST_INDEX[name] = i; });

const REGION_LABELS: Record<string, Record<"en" | "ar" | "fr", string>> = {
    "West Africa": { en: "West Africa", ar: "غرب إفريقيا", fr: "Afrique de l'Ouest" },
    "Central Africa": { en: "Central Africa", ar: "وسط إفريقيا", fr: "Afrique Centrale" },
    "North/East Africa": { en: "North/East Africa", ar: "شمال/شرق إفريقيا", fr: "Afrique du Nord/Est" },
    "North Africa": { en: "North Africa", ar: "شمال إفريقيا", fr: "Afrique du Nord" },
    "Middle East": { en: "Middle East", ar: "الشرق الأوسط", fr: "Moyen-Orient" },
};

export default function Corridor() {
  const { iso } = useParams<{ iso: string }>();
  const { lang, isRTL, content } = useLanguageContext();
  const t = content.corridor;

  const node: CountryNode | undefined = COUNTRIES.find((c) => c.iso === iso);
  const localizedName = node ? content.countries.list[EN_LIST_INDEX[node.id] ?? 0] : iso;

  if (!node) {
    return (
      <div className="min-h-screen bg-[#fdfcfb]">
        <Header nav={content.nav} />
        <main className="pt-40 pb-24 text-center">
          <p className="t-meta text-[#5a1f2e] mb-4">CORRIDOR_NOT_FOUND</p>
          <Link href="/pipeline"><a className="text-sm font-semibold text-[#0b0b10] hover:text-[#5a1f2e] underline">{t.backLabel}</a></Link>
        </main>
      </div>
    );
  }

  const anchored = content.programs.list.filter((p) => {
    const meta = PROGRAM_META[p.slug];
    return meta && meta.corridors !== "regional" && meta.corridors.includes(node.iso);
  });
  const regional = content.programs.list.filter((p) => PROGRAM_META[p.slug]?.corridors === "regional");

  const locale3 = lang as Locale3;
  const projectUI = PROJECTS_UI[locale3];
  const countryKey = node.iso as CountryKey;
  const countryProjects = PROJECTS.filter((p) => p.country === countryKey);

  return (
    <div className={`min-h-screen bg-[#fdfcfb] text-[#0b0b10] ${isRTL ? "font-arabic" : ""}`}>
      <SEO
        title={`${localizedName} | AIABASD Corridors`}
        description={t.programsTitle + " — " + localizedName}
        lang={lang}
        url={`/corridors/${node.iso}`}
      />
      <Header nav={content.nav} />

      <main className="pt-28 pb-24">
        <Section className="py-12 border-b border-black/10 bg-white">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24">
            <Link href="/#countries">
              <a className="inline-flex items-center gap-2 t-meta text-[#5a1f2e] hover:text-[#0b0b10] transition-colors mb-6 py-2">
                <ArrowLeft size={14} className={isRTL ? "rotate-180" : ""} />
                <span>{t.backLabel}</span>
              </a>
            </Link>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-4 flex-wrap">
                <MapPin size={28} strokeWidth={1.5} className="text-[#5a1f2e]" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0b0b10]">{localizedName}</h1>
                <span className={`t-meta px-2.5 py-1.5 border ${node.status === "active"
                  ? "text-emerald-800 bg-emerald-50 border-emerald-300"
                  : "text-black/60 bg-black/[0.03] border-black/15"}`}>
                  {node.status === "active" ? content.countries.activeLabel : content.countries.pipelineLabel}
                </span>
              </div>

              <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
                <div className="bg-white p-5">
                  <dt className="t-meta text-black/55 mb-1.5">{t.regionLabel}</dt>
                  <dd className="text-sm font-semibold text-[#0b0b10]">{REGION_LABELS[node.region]?.[lang] ?? node.region}</dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-meta text-black/55 mb-1.5">{t.capitalLabel}</dt>
                  <dd className="t-data text-sm font-semibold text-[#0b0b10]" dir="ltr">
                    <bdi>{lang === "ar" ? node.capitalAr : node.capital}</bdi>
                  </dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-meta text-black/55 mb-1.5">{content.pipeline.programsLabel}</dt>
                  <dd className="t-data text-sm font-semibold text-[#0b0b10]"><bdi>{node.projects}</bdi></dd>
                </div>
                <div className="bg-white p-5">
                  <dt className="t-meta text-black/55 mb-1.5">{t.statusLabel}</dt>
                  <dd className="t-meta text-[#5a1f2e]">{t.verifiedLabel}</dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </Section>

        <Section className="py-16">
          <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24 space-y-16">
            {countryProjects.length > 0 && (
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 flex-1">
                    {projectUI.headerTitle}
                  </h2>
                  <Link href="/projects">
                    <a className="t-meta text-[10px] text-[#5a1f2e] border-b border-[#5a1f2e]/40 hover:border-[#5a1f2e] pb-0.5 transition-colors whitespace-nowrap">
                      {projectUI.viewAll}
                    </a>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {countryProjects.map((p, i) => (
                    <ProjectCard key={p.slug} project={p} locale={locale3} index={i} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="t-meta text-[#5a1f2e] border-b-2 border-[#0b0b10] pb-3 mb-0">{t.programsTitle}</h2>
              <ul className="divide-y divide-black/10 border-b border-black/10">
                {anchored.map((p) => (
                  <li key={p.slug}>
                    <Link href={p.link ?? `/programs/${p.slug}`}>
                      <a className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center py-5 group">
                        <div>
                          <h3 className="text-base font-semibold text-[#0b0b10] group-hover:text-[#5a1f2e] transition-colors">{p.name}</h3>
                          <p className="t-meta text-black/45 mt-1.5" dir="ltr">{p.tags.join(" · ")}</p>
                        </div>
                        <span className="t-meta text-black/55">{p.status}</span>
                      </a>
                    </Link>
                  </li>
                ))}
                {anchored.length === 0 && (
                  <li className="py-8 text-sm text-black/55">{t.regionalNote}</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="t-meta text-black/55 border-b border-black/10 pb-3 mb-0">{content.pipeline.multiRegion} · {content.pipeline.programsLabel}</h2>
              <p className="text-sm text-black/60 leading-relaxed max-w-[65ch] pt-5">{t.regionalNote}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {regional.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/programs/${p.slug}`}>
                      <a className="t-meta inline-block border border-black/15 px-3 py-2 hover:border-[#5a1f2e]/50 hover:text-[#5a1f2e] transition-colors">
                        {p.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>

      <Footer data={content.footer} newsroom={content.newsroom} lang={lang} />
      <ScrollToTop />
    </div>
  );
}
