import { COPY } from "../client/src/data";

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
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (!(k in a)) problems.push(`${path}.${k}: missing in EN, present elsewhere`);
    else if (!(k in b)) problems.push(`${path}.${k}: missing in target`);
    else diffPaths(a[k], b[k], `${path}.${k}`, problems);
  }
}

const problems: string[] = [];
diffPaths(shape(COPY.en), shape(COPY.ar), "ar", problems);
diffPaths(shape(COPY.en), shape(COPY.fr), "fr", problems);

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

if (problems.length) {
  console.error("PARITY FAILURES:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`Parity OK — ${COPY.en.programs.list.length} programs × 3 locales, slugs aligned: ${slugs("en").join(", ")}`);
