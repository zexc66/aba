import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  DEPLOY_BASE_PATH,
  deployAssetPath,
  localizedPath,
  localizedLinkPath,
} from "../client/src/localePath.ts";

describe("localePath", () => {
  describe("DEPLOY_BASE_PATH & deployAssetPath", () => {
    test("default base is empty string when import.meta.env is undefined under Node", () => {
      assert.equal(DEPLOY_BASE_PATH, "");
    });

    test("deployAssetPath(/logo.png) -> /logo.png when no base path", () => {
      assert.equal(deployAssetPath("/logo.png"), "/logo.png");
      assert.equal(deployAssetPath("/assets/hero.jpg"), "/assets/hero.jpg");
      assert.equal(deployAssetPath("relative/image.png"), "relative/image.png");
    });
  });

  describe("localizedPath", () => {
    test('"/" + ar -> "/ar/" and "/" + fr -> "/fr/"', () => {
      assert.equal(localizedPath("/", "ar"), "/ar/");
      assert.equal(localizedPath("/", "fr"), "/fr/");
      assert.equal(localizedPath("/", "en"), "/");
    });

    test('"/projects" + fr -> "/fr/projects" and "/projects" + ar -> "/ar/projects"', () => {
      assert.equal(localizedPath("/projects", "fr"), "/fr/projects");
      assert.equal(localizedPath("/projects", "ar"), "/ar/projects");
      assert.equal(localizedPath("/projects", "en"), "/projects");
      assert.equal(localizedPath("/pipeline", "ar"), "/ar/pipeline");
    });

    test("already-prefixed path remains unchanged", () => {
      assert.equal(localizedPath("/ar", "ar"), "/ar");
      assert.equal(localizedPath("/ar/", "ar"), "/ar/");
      assert.equal(localizedPath("/ar/projects", "ar"), "/ar/projects");
      assert.equal(localizedPath("/fr", "fr"), "/fr");
      assert.equal(localizedPath("/fr/", "fr"), "/fr/");
      assert.equal(localizedPath("/fr/projects", "fr"), "/fr/projects");
    });

    test("non-route paths (external '//', hashes, non-slash) pass through unchanged", () => {
      // Protocol-relative external URLs
      assert.equal(localizedPath("//example.com", "ar"), "//example.com");
      assert.equal(
        localizedPath("//cdn.example.com/lib.js", "fr"),
        "//cdn.example.com/lib.js"
      );

      // Hash links (homepage section navigation)
      assert.equal(localizedPath("#about", "ar"), "#about");
      assert.equal(localizedPath("#contact", "fr"), "#contact");
      assert.equal(localizedPath("#programs", "en"), "#programs");

      // Non-slash paths (relative, external absolute URLs, protocols)
      assert.equal(localizedPath("projects", "ar"), "projects");
      assert.equal(
        localizedPath("https://aiabasd.org", "ar"),
        "https://aiabasd.org"
      );
      assert.equal(
        localizedPath("mailto:info@aiabasd.org", "fr"),
        "mailto:info@aiabasd.org"
      );
      assert.equal(localizedPath("tel:+1234567890", "ar"), "tel:+1234567890");
    });
  });

  describe("localizedLinkPath", () => {
    test("prepends ~ escape to absolute routes for wouter Router", () => {
      assert.equal(localizedLinkPath("/projects", "fr"), "~/fr/projects");
      assert.equal(localizedLinkPath("/projects", "ar"), "~/ar/projects");
      assert.equal(localizedLinkPath("/projects", "en"), "~/projects");
      assert.equal(localizedLinkPath("/", "ar"), "~/ar/");
      assert.equal(localizedLinkPath("/", "fr"), "~/fr/");
      assert.equal(localizedLinkPath("/", "en"), "~/");
      assert.equal(localizedLinkPath("/ar/projects", "ar"), "~/ar/projects");
    });

    test("hash links and non-slash paths pass through without ~", () => {
      assert.equal(localizedLinkPath("#about", "ar"), "#about");
      assert.equal(localizedLinkPath("#contact", "fr"), "#contact");
      assert.equal(
        localizedLinkPath("https://example.com", "ar"),
        "https://example.com"
      );
      assert.equal(
        localizedLinkPath("mailto:info@aiabasd.org", "ar"),
        "mailto:info@aiabasd.org"
      );
      assert.equal(localizedLinkPath("relative-path", "fr"), "relative-path");
    });

    test("protocol-relative URLs pass through without ~", () => {
      assert.equal(localizedLinkPath("//example.com", "ar"), "//example.com");
      assert.equal(
        localizedLinkPath("//cdn.example.com/lib.js", "fr"),
        "//cdn.example.com/lib.js"
      );
    });
  });
});
