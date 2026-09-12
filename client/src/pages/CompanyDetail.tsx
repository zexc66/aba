import { Link, useParams } from "wouter";
import { companyBySlug, introductionPath } from "@/companies";
import { NETWORK_COPY } from "@/networkCopy";
import { COUNTRIES } from "@/projects";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { deployAssetPath, localizedLinkPath } from "@/localePath";
import NetworkLayout, { networkButton, networkLink } from "@/components/NetworkLayout";
import NotFound from "./NotFound";

export default function CompanyDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { lang } = useLanguageContext();
  const t = NETWORK_COPY[lang];
  const company = companyBySlug(slug);
  if (!company) return <NotFound />;
  return <NetworkLayout title={company.name} description={company.overview?.[lang] ?? t.listingNote} path={`/companies/${company.slug}`} noindex={!company.overview}>
    <Link asChild href={localizedLinkPath("/companies", lang)}><a className={`${networkLink} mb-8`}>{t.returnDirectory}</a></Link>
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.6fr)]">
      <section className="min-w-0" aria-label={t.overview}>
        <img src={deployAssetPath(company.logo)} alt={company.name} className="mb-10 h-52 w-full max-w-sm object-contain" />
        <dl className="divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
          <div className="py-5"><dt className="font-semibold">{t.capabilities}</dt><dd className="mt-2 text-[#0b0b10]/70">{company.capabilities.length ? company.capabilities.map(c => c[lang]).join(" · ") : t.missing}</dd></div>
          <div className="py-5"><dt className="font-semibold">{t.countries}</dt><dd className="mt-2 text-[#0b0b10]/70">{company.countries.length ? company.countries.map(c => COUNTRIES[c][lang]).join(" · ") : t.missing}</dd></div>
        </dl>
        {company.website && <a href={company.website} rel="noreferrer" target="_blank" className={networkLink}>{t.website}</a>}
      </section>
      <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-xl font-semibold">{t.documents}</h2>
        <dl className="mt-4 divide-y divide-[#0b0b10]/10">
          {(["identity", "registration", "references"] as const).map(subject => {
            const review = company.reviews.find(r => r.subject === subject);
            return <div key={subject} className="py-4"><dt className="text-sm font-semibold">{t[subject]}</dt><dd className="mt-1 text-sm text-[#0b0b10]/70">{review ? <><time dateTime={review.date}>{review.date}</time><a className={`${networkLink} ms-3`} href={review.source} rel="noreferrer" target="_blank">{t.source}</a></> : t.missing}</dd></div>;
          })}
        </dl>
        <p className="my-6 text-sm leading-relaxed text-[#0b0b10]/70">{t.reviewNote}</p>
        <Link asChild href={localizedLinkPath(introductionPath(company.slug), lang)}><a className={networkButton}>{t.request}</a></Link>
      </aside>
    </div>
  </NetworkLayout>;
}
