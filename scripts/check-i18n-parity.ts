import { COPY } from "../client/src/data";
import { INTELLIGENCE_RECORDS, PLATFORM_COPY, SERVICE_PACKAGES } from "../client/src/platform";
import { LOCALIZED_COPY } from "../client/src/localizedCopy";

type Shape = { [k: string]: Shape | "leaf" | "list" };

function shape(v: unknown): Shape | "leaf" | "list" {
  if (Array.isArray(v)) return "list";
  if (typeof v === "object" && v !== null) {
    const out: Shape = {};
    for (const k of Object.keys(v as object)) {
      out[k] = shape((v as Record<string, unknown>)[k]);
    }
    return out;
  }
  return "leaf";
}

function diffPaths(a: Shape | "leaf" | "list", b: Shape | "leaf" | "list", path: string, problems: string[]) {
  if (a === "list" || b === "list") return; // array contents are content, not structure
  if (a === "leaf" || b === "leaf") {
    if (a !== b) problems.push(`${path}: kind mismatch (${a} vs ${b})`);
    return;
  }
  const keys = [...Object.keys(a), ...Object.keys(b)].filter((k, i, arr) => arr.indexOf(k) === i);
  for (const k of keys) {
    if (!(k in a)) problems.push(`${path}.${k}: missing in EN, present elsewhere`);
    else if (!(k in b)) problems.push(`${path}.${k}: missing in target`);
    else diffPaths(a[k], b[k], `${path}.${k}`, problems);
  }
}

const problems: string[] = [];
diffPaths(shape(COPY.en), shape(COPY.ar), "ar", problems);
diffPaths(shape(COPY.en), shape(COPY.fr), "fr", problems);
diffPaths(shape(PLATFORM_COPY.en), shape(PLATFORM_COPY.ar), "platform.ar", problems);
diffPaths(shape(PLATFORM_COPY.en), shape(PLATFORM_COPY.fr), "platform.fr", problems);

const serviceIds = SERVICE_PACKAGES.map((item) => item.id);
if (serviceIds.length !== 5 || new Set(serviceIds).size !== serviceIds.length) {
  problems.push(`service catalog must contain five unique records: ${serviceIds.join(", ")}`);
}
for (const locale of ["en", "ar", "fr"] as const) {
  for (const service of SERVICE_PACKAGES) {
    for (const field of ["name", "scope", "deliverable", "bestFor", "limitation", "basis"] as const) {
      if (!PLATFORM_COPY[locale] || !service[field][locale]?.trim()) problems.push(`${locale}.services.${service.id}.${field}: empty localized value`);
    }
  }
}
const intelligenceIds = INTELLIGENCE_RECORDS.map((record) => record.id);
if (new Set(intelligenceIds).size !== intelligenceIds.length) problems.push("intelligence record IDs must be unique");
for (const key of ["timelines", "capitalBands"] as const) {
  const values = (locale: "en" | "ar" | "fr") => PLATFORM_COPY[locale].match.options[key].map((item) => item.value);
  if (JSON.stringify(values("en")) !== JSON.stringify(values("ar")) || JSON.stringify(values("en")) !== JSON.stringify(values("fr"))) {
    problems.push(`platform.match.${key}: stable option values differ by locale`);
  }
}

const slugs = (l: "en" | "ar" | "fr") => COPY[l].programs.list.map((p) => p.slug);
if (JSON.stringify(slugs("en")) !== JSON.stringify(slugs("ar")) || JSON.stringify(slugs("en")) !== JSON.stringify(slugs("fr"))) {
  problems.push(`slug mismatch: en=${slugs("en")} ar=${slugs("ar")} fr=${slugs("fr")}`);
}

for (const l of ["en", "ar", "fr"] as const) {
  for (const p of COPY[l].programs.list) {
    if (!p.detail?.overview?.trim() || p.detail.highlights?.length < 3 || !p.status?.trim()) {
      problems.push(`${l}.programs.${p.slug}: incomplete detail`);
    }
  }
}

const localizedCopyShape = shape(LOCALIZED_COPY.en);
for (const l of ["ar", "fr"] as const) {
  diffPaths(localizedCopyShape, shape(LOCALIZED_COPY[l]), `localized.${l}`, problems);
}
for (const l of ["en", "ar", "fr"] as const) {
  const localized = LOCALIZED_COPY[l];
  for (const [name, value] of Object.entries(localized)) {
    if (name === "privacy" || name === "terms") {
      const legal = value as typeof localized.privacy;
      if (legal.sections.some((section) => !section.title.trim() || section.body.some((paragraph) => !paragraph.trim()))) {
        problems.push(`localized.${l}.${name}: empty legal copy`);
      }
    } else if (Object.values(value as Record<string, unknown>).some((item) => typeof item === "string" && !item.trim())) {
      problems.push(`localized.${l}.${name}: empty localized copy`);
    }
  }
}

if (problems.length) {
  console.error("PARITY FAILURES:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`Parity OK — ${COPY.en.programs.list.length} programs × 3 locales, slugs aligned: ${slugs("en").join(", ")}`);
