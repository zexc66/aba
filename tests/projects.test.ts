import test, { describe } from "node:test";
import assert from "node:assert/strict";
import {
  PROJECTS,
  PROJECTS_UI,
  projectBySlug,
  initiativeProjects,
} from "../client/src/projects.ts";

describe("projects", () => {
  describe("projectBySlug", () => {
    test("known slug returns the corresponding project", () => {
      const knownSlug = "sudan-productive-housing";
      const project = projectBySlug(knownSlug);

      assert.ok(project, `Expected project with slug "${knownSlug}" to be found`);
      assert.equal(project?.slug, knownSlug);
      assert.equal(project?.title.en, "Sudan Productive Housing Program");
      assert.equal(project?.type, "partnership");
      assert.equal(project?.status, "seeking-partners");
      assert.equal(project?.country, "sd");
    });

    test("another known slug returns the corresponding project", () => {
      const knownSlug = "hama-solar-200mw";
      const project = projectBySlug(knownSlug);

      assert.ok(project);
      assert.equal(project?.slug, knownSlug);
      assert.equal(project?.sector, "energy");
      assert.equal(project?.country, "sy");
    });

    test("unknown slug returns undefined", () => {
      assert.equal(projectBySlug("non-existent-slug"), undefined);
      assert.equal(projectBySlug(""), undefined);
      assert.equal(projectBySlug("sudan-housing-fake"), undefined);
    });

    test("every project in PROJECTS can be looked up by its own slug", () => {
      assert.ok(PROJECTS.length > 0);
      for (const project of PROJECTS) {
        const found = projectBySlug(project.slug);
        assert.equal(found, project, `Failed lookup for slug "${project.slug}"`);
      }
    });
  });

  describe("initiativeProjects", () => {
    test("every result has type 'initiative'", () => {
      const initiatives = initiativeProjects();

      assert.ok(initiatives.length > 0, "Expected at least one initiative project");
      for (const initiative of initiatives) {
        assert.equal(
          initiative.type,
          "initiative",
          `Expected project "${initiative.slug}" to have type "initiative", got "${initiative.type}"`,
        );
      }
    });

    test("matches manual filter of PROJECTS for type === 'initiative'", () => {
      const initiatives = initiativeProjects();
      const manuallyFiltered = PROJECTS.filter((p) => p.type === "initiative");

      assert.equal(initiatives.length, manuallyFiltered.length);
      assert.deepEqual(initiatives, manuallyFiltered);
    });

    test("does not include projects of other types", () => {
      const initiatives = initiativeProjects();
      const nonInitiativeSlugs = PROJECTS.filter((p) => p.type !== "initiative").map((p) => p.slug);

      assert.ok(nonInitiativeSlugs.length > 0);
      for (const initiative of initiatives) {
        assert.equal(
          nonInitiativeSlugs.includes(initiative.slug),
          false,
          `Initiative list should not include non-initiative "${initiative.slug}"`,
        );
      }
    });
  });

  describe("PROJECTS_UI parity assertion", () => {
    test("PROJECTS_UI.en, PROJECTS_UI.ar, and PROJECTS_UI.fr have identical key sets", () => {
      const enKeys = Object.keys(PROJECTS_UI.en).sort();
      const arKeys = Object.keys(PROJECTS_UI.ar).sort();
      const frKeys = Object.keys(PROJECTS_UI.fr).sort();

      assert.ok(enKeys.length > 0, "Expected non-empty key set in PROJECTS_UI.en");
      assert.deepEqual(
        arKeys,
        enKeys,
        "PROJECTS_UI.ar keys do not match PROJECTS_UI.en keys",
      );
      assert.deepEqual(
        frKeys,
        enKeys,
        "PROJECTS_UI.fr keys do not match PROJECTS_UI.en keys",
      );
    });

    test("all localized UI entries have defined, non-empty values", () => {
      const locales = ["en", "ar", "fr"] as const;
      const keys = Object.keys(PROJECTS_UI.en) as (keyof (typeof PROJECTS_UI)["en"])[];

      for (const locale of locales) {
        const dict = PROJECTS_UI[locale];
        for (const key of keys) {
          const value = dict[key];
          assert.notEqual(
            value,
            undefined,
            `Key "${String(key)}" is undefined in PROJECTS_UI.${locale}`,
          );
          if (typeof value === "string") {
            assert.ok(
              value.length > 0,
              `Key "${String(key)}" is empty in PROJECTS_UI.${locale}`,
            );
          } else if (Array.isArray(value)) {
            assert.ok(
              value.length > 0,
              `Key "${String(key)}" is an empty array in PROJECTS_UI.${locale}`,
            );
          }
        }
      }
    });

    test("array properties in PROJECTS_UI have identical item counts across locales", () => {
      assert.equal(
        PROJECTS_UI.ar.techAreas.length,
        PROJECTS_UI.en.techAreas.length,
        "techAreas length mismatch between ar and en",
      );
      assert.equal(
        PROJECTS_UI.fr.techAreas.length,
        PROJECTS_UI.en.techAreas.length,
        "techAreas length mismatch between fr and en",
      );
    });
  });
});
