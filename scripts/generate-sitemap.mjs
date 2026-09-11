/** One-off: regenerate client/public/sitemap.xml with EN/AR/FR variants and
 *  hreflang alternates, mirroring the prerenderer's route list. */

import { writeFile } from "fs/promises";
import { sitemapRoutes } from "./routes.mjs";

const SITE_URL = "https://aiabasd.org";
const IS_VERCEL = process.env.VERCEL === "1";
const ROUTES = sitemapRoutes(IS_VERCEL);
const LOCALES = [
  { code: "en", prefix: "", priority: (r) => (r === "/" ? "1.0" : r.startsWith("/programs") || r.startsWith("/projects") ? "0.7" : "0.6") },
  { code: "ar", prefix: "ar", priority: (r) => (r === "/" ? "0.9" : r.startsWith("/programs") || r.startsWith("/projects") ? "0.6" : "0.5") },
  { code: "fr", prefix: "fr", priority: (r) => (r === "/" ? "0.9" : r.startsWith("/programs") || r.startsWith("/projects") ? "0.6" : "0.5") },
];

const esc = (s) => s.replace(/&/g, "&amp;");
// Freshness signal for search engines: the build date reflects when content
// last changed (the sitemap itself is regenerated on every build).
const LASTMOD = new Date().toISOString().slice(0, 10);
const pathFor = (route, prefix) => {
  if (route === "/") return prefix ? `${prefix}/` : "";
  return `${prefix ? prefix + "/" : ""}${route.replace(/^\//, "")}`;
};

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
    <lastmod>${LASTMOD}</lastmod>
    <priority>${l.priority(route)}</priority>
  </url>`;
  }).join("\n");
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>`;

await writeFile("client/public/sitemap.xml", xml);
console.log("sitemap written:", ROUTES.length * LOCALES.length, "urls", IS_VERCEL ? "(public Vercel boundary)" : "");
