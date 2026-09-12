import type { CountryKey, Locale3, SectorKey } from "./projects";

export interface Company {
  slug: string;
  name: string;
  logo: string;
  /** Only add capability/country fields after company approval; names are not evidence. */
  sectors: SectorKey[];
  countries: CountryKey[];
  capabilities: Record<Locale3, string>[];
  overview?: Record<Locale3, string>;
  website?: string;
  reviews: { subject: "identity" | "registration" | "references"; date: string; source: string }[];
}

const listed = (slug: string, name: string, logo: string): Company => ({
  slug, name, logo, sectors: [], countries: [], capabilities: [], reviews: [],
});

/** Owner-supplied company names and logo assets. Listing does not imply due diligence. */
export const COMPANIES: Company[] = [
  listed("trilogy", "Trilogy", "/partners/trilogy.png"),
  listed("creation-design-group", "Creation Design Group", "/partners/cdg.png"),
  listed("kaolin", "Kaolin International Company", "/partners/kaolin.png"),
  listed("mauritanian-metallogistic", "Mauritanian Metallogistic Service Company", "/partners/mauritanian.png"),
  listed("adfat", "Adfat Group of Companies Ltd.", "/partners/adfat.jpg"),
  listed("saudi-mauritanian-industrial", "Saudi Mauritanian Industrial Company", "/partners/saudi_industrial.jpg"),
  listed("global-agriculture", "The Global Agriculture Company", "/partners/global_agriculture.jpg"),
  listed("saudi-mauritanian-trading", "Saudi Mauritanian Trading Company", "/partners/saudi_trading.jpg"),
  listed("saudi-mauritanian-investment", "Saudi Mauritanian Investment Company", "/partners/sm_investment.jpg"),
  listed("adfat-gold", "Adfat Gold Trading", "/partners/adfat_gold.png"),
  listed("nabt", "NABT", "/partners/nabt.jpg"),
  listed("chemexa", "Chemexa", "/partners/chemexa.jpg"),
  listed("tyms-contracting", "TYMS Contracting", "/partners/tyms-contracting.jpg"),
];

export const companyBySlug = (slug: string) => COMPANIES.find(company => company.slug === slug);

export function filterCompanies(companies: Company[], query: string, sector = "", country = "", locale: Locale3 = "en") {
  const words = query.normalize("NFKC").toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return companies.filter(company => {
    const haystack = [company.name, company.overview?.[locale] ?? "", ...company.capabilities.map(c => c[locale])]
      .join(" ").normalize("NFKC").toLocaleLowerCase();
    return words.every(word => haystack.includes(word))
      && (!sector || company.sectors.some(value => value === sector))
      && (!country || company.countries.some(value => value === country));
  });
}

export function introductionPath(company = "", project = "", need = "") {
  const query = new URLSearchParams();
  if (company) query.set("company", company);
  if (project) query.set("project", project);
  if (need) query.set("need", need);
  return `/introductions${query.size ? `?${query}` : ""}`;
}
