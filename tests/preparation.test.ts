import { test } from "node:test";
import assert from "node:assert/strict";
import { PREPARATION_COPY, parsePreparationStore, preparationNote } from "../client/src/preparation";
import { PROJECTS } from "../client/src/projects";
import { workflowSchema } from "../server/workflow";

test("preparation drafts reject wrong versions, unknown projects and statuses", () => {
  assert.deepEqual(parsePreparationStore({ version: 2, projects: {} }), {});
  const store = parsePreparationStore({ version: 1, projects: {
    invalid: { checks: { mandate: "available" } },
    [PROJECTS[0].slug]: { checks: { mandate: "approved", demand: "available", arbitrary: "available" }, notes: "a".repeat(5000) },
  } });
  assert.equal(Object.keys(store).length, 1);
  assert.deepEqual(store[PROJECTS[0].slug].checks, { demand: "available" });
  assert.equal(store[PROJECTS[0].slug].notes.length, 2000);
});

test("preparation export separates public facts from user input in all locales", () => {
  for (const locale of ["en", "ar", "fr"] as const) {
    const note = preparationNote(PROJECTS[0], { checks: { mandate: "available" }, notes: "user working note" }, locale);
    assert.ok(note.includes(PROJECTS[0].title[locale]));
    assert.ok(note.includes(PREPARATION_COPY[locale].disclaimer));
    assert.ok(note.includes("user working note"));
    assert.ok(note.includes(PREPARATION_COPY[locale].available));
  }
});

test("workflow updates require a revision and permit only workflow fields", () => {
  const valid = { stage: "qualified", assignee: "Owner", nextAction: "Arrange discussion", revision: 0 };
  assert.equal(workflowSchema.safeParse(valid).success, true);
  for (const patch of [{ stage: "funded" }, { revision: -1 }, { revision: undefined }, { email: "changed@example.org" }]) assert.equal(workflowSchema.safeParse({ ...valid, ...patch }).success, false);
});
