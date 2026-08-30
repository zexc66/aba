/** Build-time prerenderer: renders each public route to static HTML so
 *  crawlers that don't execute JS (Bing, AI bots, social scrapers) get the
 *  full trilingual content. Runs after `vite build` + server bundle.
 *
 *  Language note: pages prerender in English (the persisted-language default);
 *  AR/FR continue to work client-side exactly as today. */

import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { createRequire } from "module";
import { pathToFileURL } from "url";

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
];

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
const { renderRoute, routeMeta, SITE_URL } = await import("file://" + path.resolve("node_modules/.prerender.mjs"));

const template = await readFile(path.join(OUT_DIR, "index.html"), "utf-8");

// Helmet head tags are stripped from prerendered files (the helmet registry
// leaks across SSR calls); the runner injects its own deterministic tags:
// title, description, canonical, og:*, twitter:* per route. The JSON-LD
// script and RSS link injected by helmet/render are kept.
const STATIC_HEAD_DEFAULTS = [
  /<title[^>]*>[\s\S]*?<\/title>/g,
  /<meta\s+(?:name|property)="(description|og:type|og:site_name|og:url|og:title|og:description|og:image|og:image:width|og:image:height|twitter:card|twitter:title|twitter:description|twitter:image)"[^>]*\/>/g,
];
const HELMET_EMITTED = [
  /<title[^>]*>[\s\S]*?<\/title>/g,
  /<meta[^>]*data-rh="true"[^>]*>/g,
  /<link[^>]*data-rh="true"[^>]*canonical[^>]*>/g,
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let written = 0;
for (const route of ROUTES) {
  try {
    const { html } = await renderRoute(route);
    const { title, description } = routeMeta(route);
    const url = `${SITE_URL}${route === "/" ? "/" : route}`;

    let page = template;
    for (const re of HELMET_EMITTED) page = page.replace(re, "");
    for (const re of STATIC_HEAD_DEFAULTS) page = page.replace(re, "");

    const head =
      `<title>${esc(title)}</title>` +
      `<meta name="description" content="${esc(description)}"/>` +
      `<meta property="og:type" content="website"/>` +
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

    const file = route === "/" ? "index.html" : path.join(route.replace(/^\//, ""), "index.html");
    const target = path.join(OUT_DIR, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, page);
    written++;
  } catch (error) {
    console.error(`[prerender:${route}]`, error instanceof Error ? error.stack : error);
  }
}

console.log(`prerender: ${written}/${ROUTES.length} routes rendered`);
