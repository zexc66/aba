import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { projectReadiness, type ReadinessFactorKey } from "../client/src/readiness.ts";

describe("projectReadiness", () => {
  const dummyText = { en: "English", ar: "Arabic", fr: "French" };

  test("fully-populated project scores 100 (15+15+15+15 + 4x5 + 4x5)", () => {
    const fullProject = {
      slug: "full-project",
      type: "project" as const,
      status: "under-development" as const,
      sector: "energy" as const,
      country: "sd" as const,
      title: dummyText,
      description: dummyText,
      location: dummyText,
      scale: dummyText,
      model: dummyText,
      objectives: [dummyText, dummyText, dummyText, dummyText],
      partnership: [dummyText, dummyText, dummyText, dummyText],
    };

    const readiness = projectReadiness(fullProject);

    assert.equal(readiness.score, 100);
    assert.equal(readiness.factors.length, 6);

    const expectedFactors: Record<ReadinessFactorKey, { points: number; max: number }> = {
      status: { points: 15, max: 15 },
      location: { points: 15, max: 15 },
      scale: { points: 15, max: 15 },
      model: { points: 15, max: 15 },
      objectives: { points: 20, max: 20 },
      partnership: { points: 20, max: 20 },
    };

    for (const factor of readiness.factors) {
      const expected = expectedFactors[factor.key];
      assert.ok(expected, `Unknown factor key: ${factor.key}`);
      assert.equal(factor.points, expected.points, `Points mismatch for factor ${factor.key}`);
      assert.equal(factor.max, expected.max, `Max mismatch for factor ${factor.key}`);
    }
  });

  test("objectives and partnership arrays cap at 4 items (5+ items still score 20)", () => {
    const fiveObjectivesProject = {
      slug: "capped-project",
      type: "project" as const,
      status: "under-development" as const,
      sector: "energy" as const,
      country: "sd" as const,
      title: dummyText,
      description: dummyText,
      location: dummyText,
      scale: dummyText,
      model: dummyText,
      objectives: [dummyText, dummyText, dummyText, dummyText, dummyText, dummyText],
      partnership: [dummyText, dummyText, dummyText, dummyText, dummyText],
    };

    const readiness = projectReadiness(fiveObjectivesProject);

    assert.equal(readiness.score, 100);

    const objectivesFactor = readiness.factors.find((f) => f.key === "objectives");
    assert.ok(objectivesFactor);
    assert.equal(objectivesFactor.points, 20);
    assert.equal(objectivesFactor.max, 20);

    const partnershipFactor = readiness.factors.find((f) => f.key === "partnership");
    assert.ok(partnershipFactor);
    assert.equal(partnershipFactor.points, 20);
    assert.equal(partnershipFactor.max, 20);
  });

  test("empty/missing fields score 0, factor maxes are 15/15/15/15/20/20", () => {
    const emptyProject = {
      slug: "empty-project",
      type: "project" as const,
      status: "" as const,
      sector: "energy" as const,
      country: "sd" as const,
      title: dummyText,
      description: dummyText,
      location: undefined,
      scale: undefined,
      model: undefined,
      objectives: [],
      partnership: [],
    };

    const readiness = projectReadiness(emptyProject);

    assert.equal(readiness.score, 0);

    const expectedMaxes: Record<ReadinessFactorKey, number> = {
      status: 15,
      location: 15,
      scale: 15,
      model: 15,
      objectives: 20,
      partnership: 20,
    };

    for (const factor of readiness.factors) {
      assert.equal(factor.points, 0, `Expected 0 points for empty factor ${factor.key}`);
      assert.equal(factor.max, expectedMaxes[factor.key], `Expected max ${expectedMaxes[factor.key]} for ${factor.key}`);
    }
  });

  test("partial field scoring computes correct factor points", () => {
    const partialProject = {
      slug: "partial-project",
      type: "project" as const,
      status: undefined,
      sector: "housing" as const,
      country: "sy" as const,
      title: dummyText,
      description: dummyText,
      location: dummyText, // 15
      scale: undefined,    // 0
      model: undefined,    // 0
      objectives: [dummyText, dummyText], // 2 * 5 = 10
      partnership: [dummyText],           // 1 * 5 = 5
    };

    const readiness = projectReadiness(partialProject);
    // 0 + 15 + 0 + 0 + 10 + 5 = 30
    assert.equal(readiness.score, 30);

    const objFactor = readiness.factors.find((f) => f.key === "objectives");
    assert.equal(objFactor?.points, 10);

    const partFactor = readiness.factors.find((f) => f.key === "partnership");
    assert.equal(partFactor?.points, 5);

    const locFactor = readiness.factors.find((f) => f.key === "location");
    assert.equal(locFactor?.points, 15);

    const statusFactor = readiness.factors.find((f) => f.key === "status");
    assert.equal(statusFactor?.points, 0);
  });
});
