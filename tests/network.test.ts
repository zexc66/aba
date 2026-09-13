import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { COMPANIES, filterCompanies, introductionPath, type Company } from "../client/src/companies";
import { PROJECTS } from "../client/src/projects";
import { introductionSchema } from "../server/inquirySchema";
import { slugFromLead } from "../server/org";
import handler from "../api/inquiry";

const request = { type: "INTRODUCTION", email: "test@example.org", name: "Test", organization: "Institution", role: "Project lead", interest: "We can provide project preparation support.", timeline: "This quarter", locale: "en", consent: true, targetCompany: "tyms-contracting", targetProject: PROJECTS[0].slug, needId: "0" };

test("company catalog preserves unique identifiers and existing artwork", async () => {
  assert.equal(new Set(COMPANIES.map(c => c.slug)).size, COMPANIES.length);
  for (const company of COMPANIES) assert.ok(existsSync(`client/public${company.logo}`), company.logo);
  const { ALL_ROUTES } = await import("../scripts/routes.mjs");
  for (const company of COMPANIES) assert.ok(ALL_ROUTES.includes(`/companies/${company.slug}`));
});

test("capability search never infers coverage or services from a company name", () => {
  assert.equal(filterCompanies(COMPANIES, "tyms")[0].slug, "tyms-contracting");
  assert.equal(filterCompanies(COMPANIES, "", "industry", "ci").length, 0);
  const published: Company = { ...COMPANIES[0], sectors: ["energy"], countries: ["ci"], capabilities: [{ en: "Solar maintenance", ar: "صيانة الطاقة الشمسية", fr: "Maintenance solaire" }] };
  assert.equal(filterCompanies([published], "solaire", "energy", "ci", "fr").length, 1);
  assert.equal(filterCompanies([published], "solaire", "energy", "sy", "fr").length, 0);
});

test("introduction validation rejects unknown targets, mismatched needs and absent consent", () => {
  const valid = introductionSchema.parse({ ...request, stage: "approved", message: "fabricated snapshot" });
  assert.equal("stage" in valid, false);
  assert.ok(valid.message.includes("TYMS Contracting"));
  assert.ok(valid.message.includes(PROJECTS[0].partnership[0].en));
  assert.equal(valid.message.includes("fabricated snapshot"), false);
  for (const patch of [{ consent: false }, { organization: " " }, { targetCompany: "unknown" }, { targetProject: "missing" }, { needId: "999" }, { needId: "-1" }, { targetProject: "", needId: "0" }, { interest: "short" }]) {
    assert.equal(introductionSchema.safeParse({ ...request, ...patch }).success, false, JSON.stringify(patch));
  }
  assert.equal(introductionSchema.safeParse({ ...request, targetProject: "", targetCompany: "", needId: "" }).success, true);
});

test("deep links carry company, project and need independently", () => {
  const path = introductionPath("tyms-contracting", PROJECTS[0].slug, "0");
  const url = new URL(path, "https://example.org");
  assert.equal(url.searchParams.get("company"), "tyms-contracting");
  assert.equal(url.searchParams.get("need"), "0");
});

test("room slugs pass valid values through and generalize free text", () => {
  assert.equal(slugFromLead("hama-solar-200mw"), "hama-solar-200mw");
  assert.equal(slugFromLead("حماة — Solar 200 MW!"), "solar-200-mw");
  assert.equal(slugFromLead(""), "general");
  assert.equal(slugFromLead("///"), "general");
  assert.equal(slugFromLead("x".repeat(200)).length, 80);
});

test("serverless introduction delivers validated context and fails honestly when unconfigured", async () => {
  const before = { key: process.env.RESEND_API_KEY, email: process.env.LEAD_NOTIFY_EMAIL, hook: process.env.LEAD_WEBHOOK_URL };
  const originalFetch = globalThis.fetch;
  let code = 0;
  let payload: any;
  const res = { setHeader() {}, status(value: number) { code = value; return { json(body: unknown) { payload = body; }, end() {} }; } };
  try {
    delete process.env.RESEND_API_KEY; delete process.env.LEAD_NOTIFY_EMAIL; delete process.env.LEAD_WEBHOOK_URL;
    await handler({ method: "POST", body: request, headers: {} }, res);
    assert.equal(code, 503); assert.equal(payload.success, undefined);
    let sent: any;
    process.env.LEAD_WEBHOOK_URL = "https://example.org/test-hook";
    globalThis.fetch = async (_url, options) => { sent = JSON.parse(String(options?.body)); return new Response("{}", { status: 200 }); };
    await handler({ method: "POST", body: request, headers: {} }, res);
    assert.equal(code, 200); assert.equal(payload.success, true); assert.ok(payload.reference);
    assert.equal(sent.lead.targetCompany, request.targetCompany); assert.equal(sent.lead.needId, "0");
    assert.ok(sent.lead.message.includes(PROJECTS[0].partnership[0].en));
    sent = undefined;
    await handler({ method: "POST", body: { ...request, targetCompany: "unknown" }, headers: {} }, res);
    assert.equal(code, 400); assert.equal(sent, undefined);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries({ RESEND_API_KEY: before.key, LEAD_NOTIFY_EMAIL: before.email, LEAD_WEBHOOK_URL: before.hook })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
