import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { COMPANIES, filterCompanies } from "@/companies";
import { NETWORK_COPY } from "@/networkCopy";
import { COUNTRIES, SECTORS } from "@/projects";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { deployAssetPath, localizedLinkPath } from "@/localePath";
import NetworkLayout, { networkField, networkLink } from "@/components/NetworkLayout";

export default function Companies() {
  const { lang } = useLanguageContext();
  const t = NETWORK_COPY[lang];
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const matches = filterCompanies(COMPANIES, query, sector, country, lang);
  return <NetworkLayout eyebrow={t.directory} title={t.directory} description={t.intro} path="/companies">
    <div className="grid gap-5 border-b border-[#0b0b10]/10 pb-7 md:grid-cols-[2fr_1fr_1fr]">
      <label className="min-w-0 space-y-2 text-sm font-medium">{t.search}<input type="search" value={query} onChange={e => setQuery(e.target.value)} className={networkField} /></label>
      <label className="min-w-0 space-y-2 text-sm font-medium">{t.sector}<select value={sector} onChange={e => setSector(e.target.value)} className={networkField}><option value="">{t.all}</option>{Object.entries(SECTORS).map(([key, value]) => <option key={key} value={key}>{value[lang]}</option>)}</select></label>
      <label className="min-w-0 space-y-2 text-sm font-medium">{t.country}<select value={country} onChange={e => setCountry(e.target.value)} className={networkField}><option value="">{t.all}</option>{Object.entries(COUNTRIES).map(([key, value]) => <option key={key} value={key}>{value[lang]}</option>)}</select></label>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      <p role="status" className="text-sm text-[#0b0b10]/70">{matches.length} {t.results}</p>
      {(query || sector || country) && <button type="button" className={networkLink} onClick={() => { setQuery(""); setSector(""); setCountry(""); }}>{t.reset}</button>}
    </div>
    <ul className="divide-y divide-[#0b0b10]/10 border-y border-[#0b0b10]/10">
      {matches.map(company => <li key={company.slug} className="min-w-0">
        <Link asChild href={localizedLinkPath(`/companies/${company.slug}`, lang)}>
          <a className="group relative grid min-w-0 gap-5 py-7 transition-colors hover:bg-[#5a1f2e]/[0.035] sm:grid-cols-[7rem_1fr] lg:grid-cols-[7rem_1fr_auto] lg:items-center">
            <span aria-hidden="true" className="absolute top-0 start-0 h-px w-0 bg-[#f2a007] transition-all duration-500 group-hover:w-full" />
            <img src={deployAssetPath(company.logo)} alt="" loading="lazy" decoding="async" className="h-20 w-28 border border-[#0b0b10]/10 bg-white object-contain p-1.5" />
            <div className="min-w-0">
              <h2 className="break-words text-xl font-semibold group-hover:text-[#5a1f2e] transition-colors">{company.name}</h2>
              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-[#0b0b10]/70">{company.overview?.[lang] ?? t.listing}</p>
            </div>
            <span className={networkLink}>{t.profile}<ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" /></span>
          </a>
        </Link>
      </li>)}
    </ul>
    {matches.length === 0 && <p className="py-12 text-base">{t.empty}</p>}
    <p className="mt-8 max-w-[75ch] text-sm leading-relaxed text-[#0b0b10]/70">{t.listingNote}</p>
  </NetworkLayout>;
}
