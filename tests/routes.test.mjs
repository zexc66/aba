import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  ALL_ROUTES,
  PRIVATE_ROUTES,
  publicRoutes,
  sitemapRoutes,
  SITEMAP_ROUTES,
} from "../scripts/routes.mjs";

describe("routes", () => {
  describe("constants integrity", () => {
    test("ALL_ROUTES is a non-empty array of valid route paths", () => {
      assert.ok(Array.isArray(ALL_ROUTES));
      assert.ok(ALL_ROUTES.length > 0);
      for (const route of ALL_ROUTES) {
        assert.equal(typeof route, "string");
        assert.ok(route.startsWith("/"), `Route must start with /: ${route}`);
      }
      const uniqueRoutes = new Set(ALL_ROUTES);
      assert.equal(uniqueRoutes.size, ALL_ROUTES.length, "ALL_ROUTES must not contain duplicates");
    });

    test("PRIVATE_ROUTES is a non-empty Set of routes contained in ALL_ROUTES", () => {
      assert.ok(PRIVATE_ROUTES instanceof Set);
      assert.ok(PRIVATE_ROUTES.size > 0);
      for (const privateRoute of PRIVATE_ROUTES) {
        assert.ok(
          ALL_ROUTES.includes(privateRoute),
          `PRIVATE_ROUTE "${privateRoute}" must be present in ALL_ROUTES`,
        );
      }
      assert.ok(PRIVATE_ROUTES.has("/admin"));
      assert.ok(PRIVATE_ROUTES.has("/investor-portal"));
      assert.ok(PRIVATE_ROUTES.has("/investor-portal/vault"));
    });

    test("ALL_ROUTES contains /404", () => {
      assert.ok(ALL_ROUTES.includes("/404"));
    });
  });

  describe("publicRoutes", () => {
    test("publicRoutes(false) includes private + /404 routes", () => {
      const routes = publicRoutes(false);

      assert.deepEqual(routes, ALL_ROUTES);
      assert.ok(routes.includes("/404"), "publicRoutes(false) must include /404");

      for (const privateRoute of PRIVATE_ROUTES) {
        assert.ok(
          routes.includes(privateRoute),
          `publicRoutes(false) must include private route: ${privateRoute}`,
        );
      }
    });

    test("publicRoutes(true) excludes exactly the private set and retains /404", () => {
      const routes = publicRoutes(true);

      assert.ok(routes.includes("/404"), "publicRoutes(true) must retain /404");

      for (const privateRoute of PRIVATE_ROUTES) {
        assert.equal(
          routes.includes(privateRoute),
          false,
          `publicRoutes(true) must exclude private route: ${privateRoute}`,
        );
      }

      // Length difference must exactly equal the number of private routes
      assert.equal(routes.length, ALL_ROUTES.length - PRIVATE_ROUTES.size);

      // The set of excluded routes is exactly PRIVATE_ROUTES
      const excluded = ALL_ROUTES.filter((r) => !routes.includes(r));
      assert.deepEqual(new Set(excluded), PRIVATE_ROUTES);
    });
  });

  describe("sitemapRoutes", () => {
    test("sitemapRoutes never includes /404 nor private routes for either flag value", () => {
      for (const isVercel of [false, true]) {
        const routes = sitemapRoutes(isVercel);

        assert.equal(
          routes.includes("/404"),
          false,
          `sitemapRoutes(${isVercel}) must not include /404`,
        );

        for (const privateRoute of PRIVATE_ROUTES) {
          assert.equal(
            routes.includes(privateRoute),
            false,
            `sitemapRoutes(${isVercel}) must not include private route: ${privateRoute}`,
          );
        }

        // Every sitemap route must be a subset of ALL_ROUTES
        for (const route of routes) {
          assert.ok(
            ALL_ROUTES.includes(route),
            `sitemapRoutes contains unknown route: ${route}`,
          );
        }
      }
    });

    test("sitemapRoutes matches SITEMAP_ROUTES constant", () => {
      assert.deepEqual(sitemapRoutes(false), SITEMAP_ROUTES);
      assert.deepEqual(sitemapRoutes(true), SITEMAP_ROUTES);
    });
  });
});
