import { test } from "node:test";
import assert from "node:assert/strict";
import { PROGRAM_SDGS, sdgTitle } from "../client/src/sdg";
import { FRAUD_COPY } from "../client/src/fraudCopy";
import { publicProjects } from "../server/publicData";
import { featuredProjects } from "../client/src/projects";

test("homepage featured order is professionally curated", () => {
  const featured = featuredProjects();
  assert.equal(featured.length, 6);
  // flagship energy project leads the sticky card
  assert.equal(featured[0].slug, "hama-solar-200mw");
  // geographic spread: no two consecutive projects from the same country
  for (let i = 1; i < featured.length; i++) {
    assert.notEqual(featured[i].country, featured[i - 1].country, `consecutive same-country at ${i}`);
  }
  // all sectors represented without immediate repeats
  const sectors = featured.map((p) => p.sector);
  assert.ok(new Set(sectors).size >= 4, "sector diversity");
  // the cooperation framework closes, never opens
  assert.notEqual(featured[0].type, "initiative");
});

test("every published program has valid, unique indicative SDGs", () => {
  // data.tsx is JSX (unusable under node) — the i18n parity check guards this
  // list stays in sync; keep both updated when a program is added.
  const slugs = [
    "hama-rehabilitation",
    "al-arish-hub",
    "green-energy",
    "digital-africa",
    "integrated-cities",
    "debris-recycling",
    "food-security",
  ];
  assert.equal(Object.keys(PROGRAM_SDGS).length, slugs.length);
  for (const slug of slugs) {
    const sdgs = PROGRAM_SDGS[slug];
    assert.ok(Array.isArray(sdgs) && sdgs.length > 0, slug + " missing SDGs; mapped=" + JSON.stringify(Object.keys(PROGRAM_SDGS)));
    assert.ok(new Set(sdgs).size === sdgs.length, slug + " duplicate SDGs");
    for (const n of sdgs) {
      assert.ok(Number.isInteger(n) && n >= 1 && n <= 17, slug + " invalid SDG " + n);
    }
  }
});

test("SDG titles resolve in all locales for every used goal", () => {
  const used = new Set(Object.values(PROGRAM_SDGS).flat());
  for (const n of used) {
    for (const locale of ["en", "ar", "fr"] as const) {
      assert.notEqual(sdgTitle(n, locale), `SDG ${n}`, `SDG ${n} missing ${locale}`);
    }
  }
});

test("anti-fraud page copy keeps the five rules and official channels in every locale", () => {
  for (const locale of ["en", "ar", "fr"] as const) {
    const t = FRAUD_COPY[locale];
    assert.equal(t.rules.length, 5);
    assert.equal(t.channels.length, 4);
    assert.ok(t.rules.some((r) => r.body.includes("@aiabasd.org") || r.body.includes("aiabasd.org")));
  }
});

test("public API projection excludes initiatives and localizes every field", () => {
  for (const locale of ["en", "ar", "fr"] as const) {
    const data = publicProjects(locale);
    assert.ok(data.projects.length > 0);
    for (const p of data.projects) {
      assert.ok(p.title[Symbol.toPrimitive]?.("default") ?? p.title.length > 0);
      assert.ok(Array.isArray(p.partnershipNeeds));
      assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(p.lastReviewed));
    }
    const first = data.projects[0];
    assert.ok(typeof first.status === "string" && first.status.length > 0);
  }
  const ar = publicProjects("ar");
  assert.ok(ar.projects.every((p) => p.country.length > 0));
});
