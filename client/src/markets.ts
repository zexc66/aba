import { COUNTRIES } from "./countries";
import { PROJECTS, SECTORS, type CountryKey, type Project, type SectorKey, type Locale3 } from "./projects";

/** English country names in the same order as COPY[locale].countries.list. */
export const MARKET_COUNTRY_ORDER = [
  "Ghana",
  "The Gambia",
  "Sierra Leone",
  "Burkina Faso",
  "Côte d'Ivoire",
  "Angola",
  "Jordan",
  "Egypt",
  "Syria",
  "Sudan",
  "Saudi Arabia",
] as const;

export const MARKET_SECTORS: SectorKey[] = [
  "housing",
  "energy",
  "infrastructure",
  "circular",
  "industry",
  "agriculture",
  "social",
  "multi",
];

const MARKET_ISOS = COUNTRIES.map((c) => c.iso);

const ISO_TO_COUNTRY_KEY: Partial<Record<string, CountryKey>> = {
  sd: "sd",
  sy: "sy",
  ci: "ci",
  gh: "gh",
  ao: "ao",
};

export interface MarketCombo {
  iso: string;
  sector: SectorKey;
}

export function marketPath(iso: string, sector: string): string {
  return `/opportunities/${iso}/${sector}`;
}

export function allMarketCombos(): MarketCombo[] {
  return MARKET_ISOS.flatMap((iso) => MARKET_SECTORS.map((sector) => ({ iso, sector })));
}

export function isValidMarketCombo(iso: string, sector: string): boolean {
  return MARKET_ISOS.includes(iso) && MARKET_SECTORS.includes(sector as SectorKey);
}

export function projectsForMarket(iso: string, sector: SectorKey): Project[] {
  const key = ISO_TO_COUNTRY_KEY[iso];
  if (!key) return [];
  return PROJECTS.filter((p) => p.country === key && p.sector === sector);
}

/** Resolves the localized corridor name from the caller's localized
 *  countries.list (kept as a parameter so this module stays JSX-free). */
export function localizedCountryName(list: string[], iso: string): string {
  const node = COUNTRIES.find((c) => c.iso === iso);
  if (!node) return iso;
  const index = MARKET_COUNTRY_ORDER.indexOf(node.id as (typeof MARKET_COUNTRY_ORDER)[number]);
  return list[index >= 0 ? index : 0];
}

export function sectorName(locale: Locale3, sector: SectorKey): string {
  return SECTORS[sector][locale];
}

/** Neutral sector framing — mirrors published program themes, no activity claims. */
export const MARKET_SECTOR_BLURBS: Record<SectorKey, Record<Locale3, string>> = {
  housing: {
    en: "Housing, new cities, and urban development programs delivered through public-private structures.",
    ar: "برامج الإسكان والمدن الجديدة والتطوير الحضري ضمن هياكل شراكة بين القطاعين العام والخاص.",
    fr: "Programmes de logement, de villes nouvelles et de développement urbain menés en partenariat public-privé.",
  },
  energy: {
    en: "Utility-scale solar, grid integration, storage, and clean-energy infrastructure.",
    ar: "محطات شمسية واسعة النطاق وتكامل الشبكات والتخزين وبنية الطاقة النظيفة.",
    fr: "Solaire à grande échelle, intégration au réseau, stockage et infrastructures d'énergie propre.",
  },
  infrastructure: {
    en: "Transport, logistics hubs, public infrastructure, and municipal services.",
    ar: "النقل ومحاور اللوجستيات والبنية التحتية العامة والخدمات البلدية.",
    fr: "Transport, hubs logistiques, infrastructures publiques et services municipaux.",
  },
  circular: {
    en: "Debris recycling, waste-to-value, and circular material recovery.",
    ar: "إعادة تدوير الأنقاض وتحويل النفايات إلى قيمة واسترداد دائري للمواد.",
    fr: "Recyclage des décombres, valorisation des déchets et récupération circulaire des matériaux.",
  },
  industry: {
    en: "Industrial zones, manufacturing localization, and technology transfer.",
    ar: "المناطق الصناعية وتوطين التصنيع ونقل التكنولوجيا.",
    fr: "Zones industrielles, localisation de la fabrication et transfert de technologie.",
  },
  agriculture: {
    en: "Modern agriculture, food processing, cold chains, and water management.",
    ar: "الزراعة الحديثة والتصنيع الغذائي وسلاسل التبريد وإدارة المياه.",
    fr: "Agriculture moderne, transformation alimentaire, chaînes du froid et gestion de l'eau.",
  },
  social: {
    en: "Schools, healthcare facilities, and social infrastructure rehabilitation.",
    ar: "المدارس والمنشآت الصحية وإعادة تأهيل البنية الاجتماعية.",
    fr: "Écoles, établissements de santé et réhabilitation des infrastructures sociales.",
  },
  multi: {
    en: "Multi-sector programs combining several development streams under one structure.",
    ar: "برامج متعددة القطاعات تجمع عدة مسارات تنموية تحت هيكل واحد.",
    fr: "Programmes multisectoriels combinant plusieurs volets sous une même structure.",
  },
};
