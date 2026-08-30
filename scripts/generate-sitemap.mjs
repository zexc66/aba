/** One-off: regenerate client/public/sitemap.xml with EN/AR/FR variants and
 *  hreflang alternates, mirroring the prerenderer's route list. */

import { writeFile } from "fs/promises";

const SITE_URL = "https://aiabasd.org";
const ROUTES = [
  "/",
  "/pipeline",
  "/visions",
  "/gallery",
  "/hama-project",
  "/programs/hama-rehabilitation",
  "/programs/al-arish-hub",
  "/programs/green-energy",
  "/programs/digital-africa",
  "/programs/integrated-cities",
  "/programs/debris-recycling",
  "/programs/food-security",
  "/corridors/gm",
  "/corridors/sl",
  "/corridors/ci",
  "/corridors/bf",
  "/corridors/gh",
  "/corridors/ao",
  "/corridors/sd",
  "/corridors/eg",
  "/corridors/jo",
  "/corridors/sy",
  "/corridors/sa",
  "/team/mohammed-abdel-moneim",
  "/team/faris-safi",
  "/team/ziad-shneikat",
  "/governance/esia-esms",
  "/governance/kyc-aml",
  "/governance/independent-oversight",
  "/governance/contracts",
  "/privacy",
  "/terms",
  "/investor-portal",
];
const LOCALES = [
  { code: "en", prefix: "", priority: (r) => (r === "/" ? "1.0" : r.startsWith("/programs") ? "0.7" : "0.6") },
  { code: "ar", prefix: "ar", priority: (r) => (r === "/" ? "0.9" : r.startsWith("/programs") ? "0.6" : "0.5") },
  { code: "fr", prefix: "fr", priority: (r) => (r === "/" ? "0.9" : r.startsWith("/programs") ? "0.6" : "0.5") },
];

const esc = (s) => s.replace(/&/g, "&amp;");
const pathFor = (route, prefix) =>
  ((prefix ? prefix + "/" : "") + (route === "/" ? "" : route.replace(/^\//, ""))).replace(/\/+$/, "");

const entries = ROUTES.map((route) => {
  const alts = LOCALES.map(
    (l) =>
      `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE_URL}/${pathFor(route, l.prefix)}"/>`
  ).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route === "/" ? "/" : route}"/>`;

  return LOCALES.map((l) => {
    const p = pathFor(route, l.prefix);
    return `  <url>
    <loc>${SITE_URL}${p ? "/" + p : "/"}</loc>
${alts}
    <priority>${l.priority(route)}</priority>
  </url>`;
  }).join("\n");
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>`;

await writeFile("client/public/sitemap.xml", xml);
console.log("sitemap written:", ROUTES.length * LOCALES.length, "urls");
