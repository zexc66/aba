/** Build-time prerenderer: renders each public route to static HTML so
 *  crawlers that don't execute JS (Bing, AI bots, social scrapers) get the
 *  full content — in all three locales (EN at the root, /ar/, /fr/).
 *  Runs after `vite build` + server bundle. */

import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const OUT_DIR = path.resolve("dist/public");
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
  "/impact",
  "/sectors/housing",
  "/sectors/energy",
  "/sectors/infrastructure",
  "/sectors/circular",
  "/sectors/industry",
  "/sectors/agriculture",
  "/sectors/social",
  "/sectors/multi",
  "/projects",
  "/projects/sudan-productive-housing",
  "/projects/sudan-reconstruction-vision",
  "/projects/hama-solar-200mw",
  "/projects/hama-debris-recycling",
  "/projects/smart-meters-syria",
  "/projects/dummar-housing",
  "/projects/hama-housing",
  "/projects/schools-health-rehabilitation",
  "/projects/hasiya-industrial-zone",
  "/projects/hama-agriculture-water",
  "/projects/cci-investment-portfolio",
  "/projects/ghana-cooperation-program",
  "/projects/angola-vision",
  "/projects/china-arab-africa-platform",
  "/projects/china-saudi-africa-gateway",
  "/projects/cross-border-trade-platform",
  "/projects/advanced-technology-cooperation",
];

const LOCALES = [
  { code: "en", prefix: "", ogLocale: "en_US", lang: "en", dir: "ltr" },
  { code: "ar", prefix: "ar", ogLocale: "ar_SA", lang: "ar", dir: "rtl" },
  { code: "fr", prefix: "fr", ogLocale: "fr_FR", lang: "fr", dir: "ltr" },
];

// 1. Bundle the SSR entry.
await build({
  entryPoints: ["scripts/prerender-entry.tsx"],
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  outfile: "node_modules/.prerender.mjs",
  logLevel: "silent",
  define: {
    "process.env.NODE_ENV": '"production"',
    // Vite env is a build-time concept; at prerender time there is none, so
    // cms.configured is false and pages bake the static trilingual copy.
    "import.meta.env": "{}",
  },
  // Bundled CJS deps (react-dom/server) require node builtins dynamically.
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

// 2. Render all routes (streaming SSR resolves React.lazy natively).
const { renderRoute, routeMeta, SITE_URL } = await import(
  "file://" + path.resolve("node_modules/.prerender.mjs")
);

const template = await readFile(path.join(OUT_DIR, "index.html"), "utf-8");

// Helmet head tags are stripped from prerendered files (the helmet registry
// leaks across SSR calls); the runner injects its own deterministic tags per
// locale. The JSON-LD script and RSS link are kept.
const STRIP_HEAD = [
  /<title[^>]*>[\s\S]*?<\/title>/g,
  /<meta[^>]*data-rh="true"[^>]*>/g,
  /<link[^>]*data-rh="true"[^>]*>/g,
  /<meta\s+name="description"[\s\S]*?\/>/,
  /<link\s+rel="canonical"[^>]*\/>/,
  /<meta\s+(?:name|property)="(og:type|og:site_name|og:url|og:title|og:description|og:image|og:image:width|og:image:height|twitter:card|twitter:title|twitter:description|twitter:image)"[^>]*\/>/g,
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const publicPathFor = (route, prefix) =>
  `${prefix ? "/" + prefix : ""}${route === "/" ? "/" : route}`;

let written = 0;
const total = ROUTES.length * LOCALES.length;

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    try {
      const { html } = await renderRoute(route, locale.code);
      const { title, description } = routeMeta(route, locale.code);
      const publicPath = publicPathFor(route, locale.prefix);
      const url = `${SITE_URL}${publicPath === "/" ? "/" : publicPath}`;

      // hreflang alternates across the three locales
      const alternates = LOCALES.map(
        (l) =>
          `<link rel="alternate" hreflang="${l.code}" href="${SITE_URL}${publicPathFor(route, l.prefix) === "/" ? "/" : publicPathFor(route, l.prefix)}"/>`
      ).join("") +
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${route === "/" ? "/" : route}"/>`;

      let page = template;
      for (const re of STRIP_HEAD) page = page.replace(re, "");

      // Locale-aware html element (strip any existing lang/dir first)
      page = page.replace(/<html([^>]*)>/, "<html>").replace(
        "<html>",
        `<html lang="${locale.lang}"${locale.dir === "rtl" ? ' dir="rtl"' : ""}>`
      );

      const head =
        `<title>${esc(title)}</title>` +
        `<meta name="description" content="${esc(description)}"/>` +
        alternates +
        `<meta property="og:type" content="website"/>` +
        `<meta property="og:locale" content="${locale.ogLocale}"/>` +
        `<meta property="og:url" content="${url}"/>` +
        `<meta property="og:title" content="${esc(title)}"/>` +
        `<meta property="og:description" content="${esc(description)}"/>` +
        `<meta property="og:image" content="${SITE_URL}/og-image.jpg"/>` +
        `<meta name="twitter:card" content="summary_large_image"/>` +
        `<meta name="twitter:title" content="${esc(title)}"/>` +
        `<meta name="twitter:description" content="${esc(description)}"/>` +
        `<meta name="twitter:image" content="${SITE_URL}/og-image.jpg"/>` +
        `<link rel="canonical" href="${url}"/>`;

      page = page.replace("</head>", `${head}</head>`);
      page = page.replace(
        /<div id="root"><\/div>/,
        () => `<div id="root">${html}</div>`
      );

      const relFile =
        locale.prefix === "" ? (route === "/" ? "index.html" : path.join(route.replace(/^\//, ""), "index.html")) : path.join(locale.prefix, route.replace(/^\//, ""), "index.html");
      const target = path.join(OUT_DIR, relFile);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, page);
      written++;
    } catch (error) {
      console.error(
        `[prerender:${locale.code}${route}]`,
        error instanceof Error ? error.stack : error
      );
    }
  }
}

console.log(`prerender: ${written}/${total} routes rendered`);
