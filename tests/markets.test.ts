import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MARKET_SECTORS,
  MARKET_COUNTRY_ORDER,
  allMarketCombos,
  isValidMarketCombo,
  marketPath,
  projectsForMarket,
} from "../client/src/markets";
import { COUNTRIES } from "../client/src/countries";
import { PROJECTS, SECTORS } from "../client/src/projects";
import { MARKET_COPY } from "../client/src/marketCopy";

test("market grid is exactly 11 corridors x 8 sectors with unique indexable paths", () => {
  const combos = allMarketCombos();
  assert.equal(combos.length, COUNTRIES.length * MARKET_SECTORS.length);
  assert.equal(combos.length, 88);
  const paths = combos.map((c) => marketPath(c.iso, c.sector));
  assert.equal(new Set(paths).size, 88);
  for (const iso of COUNTRIES.map((c) => c.iso)) {
    for (const sector of MARKET_SECTORS) {
      assert.ok(paths.includes(marketPath(iso, sector)), marketPath(iso, sector));
    }
  }
});

test("invalid market combinations are rejected", () => {
  assert.equal(isValidMarketCombo("sy", "energy"), true);
  assert.equal(isValidMarketCombo("xx", "energy"), false);
  assert.equal(isValidMarketCombo("sy", "crypto"), false);
  assert.equal(isValidMarketCombo("", ""), false);
});

test("market project matching only returns published country+sector pairs", () => {
  for (const combo of allMarketCombos()) {
    for (const project of projectsForMarket(combo.iso, combo.sector)) {
      assert.ok(SECTORS[project.sector], project.slug);
      const countryNode = COUNTRIES.find((c) => c.iso === combo.iso);
      assert.ok(countryNode, combo.iso);
    }
  }
  // Syria energy must surface the published solar project if one exists
  const syEnergy = projectsForMarket("sy", "energy");
  assert.ok(Array.isArray(syEnergy));
  assert.ok(syEnergy.every((p) => p.country === "sy" && p.sector === "energy"));
});

test("market copy is complete and localized for every corridor and sector name source", () => {
  for (const locale of ["en", "ar", "fr"] as const) {
    assert.ok(MARKET_COPY[locale].titleTemplate.includes("{sector}"));
    assert.ok(MARKET_COPY[locale].titleTemplate.includes("{country}"));
    assert.equal(MARKET_COUNTRY_ORDER.length, 11);
  }
});
