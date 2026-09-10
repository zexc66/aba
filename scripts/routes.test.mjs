import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  ALL_ROUTES,
  PRIVATE_ROUTES,
  publicRoutes,
  sitemapRoutes,
  SITEMAP_ROUTES,
} from "./routes.mjs";

describe("Route wiring verification", () => {
  test("scripts/routes.mjs contains /trust", () => {
    assert.ok(ALL_ROUTES.includes("/trust"), "ALL_ROUTES must include /trust");
    assert.ok(!PRIVATE_ROUTES.has("/trust"), "PRIVATE_ROUTES must not include /trust");
    assert.ok(publicRoutes(false).includes("/trust"), "publicRoutes(false) must include /trust");
    assert.ok(publicRoutes(true).includes("/trust"), "publicRoutes(true) must include /trust");
    assert.ok(SITEMAP_ROUTES.includes("/trust"), "SITEMAP_ROUTES must include /trust");
    assert.ok(sitemapRoutes(false).includes("/trust"), "sitemapRoutes(false) must include /trust");
    assert.ok(sitemapRoutes(true).includes("/trust"), "sitemapRoutes(true) must include /trust");
  });

  test("client/src/App.tsx wires /trust route to TrustCenter", async () => {
    const appTsx = await readFile(path.resolve("client/src/App.tsx"), "utf-8");
    assert.ok(
      appTsx.includes('import("./pages/TrustCenter")') || appTsx.includes('import("./pages/TrustCenter.js")') || appTsx.includes("TrustCenter"),
      "App.tsx must import TrustCenter"
    );
    assert.ok(
      appTsx.includes('path={"/trust"}') || appTsx.includes('path="/trust"'),
      "App.tsx must define /trust route"
    );
  });

  test("scripts/generate-sitemap.mjs references and generates /trust", async () => {
    const sitemapMjs = await readFile(path.resolve("scripts/generate-sitemap.mjs"), "utf-8");
    assert.ok(
      sitemapMjs.includes("routes.mjs"),
      "generate-sitemap.mjs must import from routes.mjs"
    );
    assert.ok(
      sitemapRoutes(false).includes("/trust"),
      "generate-sitemap.mjs route set must include /trust"
    );
  });

  test("scripts/prerender.mjs wires /trust for static prerendering", async () => {
    const prerenderMjs = await readFile(path.resolve("scripts/prerender.mjs"), "utf-8");
    assert.ok(
      prerenderMjs.includes("routes.mjs"),
      "prerender.mjs must import from routes.mjs"
    );
    assert.ok(
      publicRoutes(false).includes("/trust"),
      "prerender.mjs route set must include /trust"
    );
    assert.ok(
      prerenderMjs.includes("/trust") && prerenderMjs.includes("TrustCenter"),
      "prerender.mjs must wire /trust and TrustCenter for SSR"
    );
  });

  test("client/public/llms.txt only references verified routes and excludes private routes", async () => {
    const llmsTxt = await readFile(path.resolve("client/public/llms.txt"), "utf-8");
    assert.ok(llmsTxt.startsWith("# AIABASD"), "llms.txt must have expected header");

    // Exclude private routes
    for (const privateRoute of PRIVATE_ROUTES) {
      assert.ok(
        !llmsTxt.includes(privateRoute),
        `llms.txt must not reference private route ${privateRoute}`
      );
    }

    // Extract all paths referenced with https://aiabasd.org
    const urlMatches = [...llmsTxt.matchAll(/https:\/\/aiabasd\.org(\/[^)#\s]*)/g)];
    assert.ok(urlMatches.length > 0, "llms.txt must contain platform links");
    for (const match of urlMatches) {
      const cleanPath = match[1].replace(/\/$/, "") || "/";
      if (cleanPath === "/ar" || cleanPath === "/fr") continue; // Valid localized roots
      assert.ok(
        ALL_ROUTES.includes(cleanPath),
        `Path in llms.txt must be in ALL_ROUTES: ${cleanPath}`
      );
    }
  });
});
