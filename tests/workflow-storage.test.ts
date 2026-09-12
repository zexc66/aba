import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

test("retention reads preserve concurrent inquiries and workflow updates detect stale revisions", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "aiabasd-workflow-test-"));
  const file = path.join(directory, "inquiries.json");
  process.env.DB_PATH = file;
  process.env.INQUIRY_RETENTION_DAYS = "30";
  try {
    await writeFile(file, JSON.stringify([{ id: "00000000", type: "GENERAL", email: "expired@example.org", timestamp: "2000-01-01T00:00:00Z" }]));
    const { saveInquiry, listInquiries, updateInquiry } = await import("../server/storage");
    const pending = Array.from({ length: 10 }, (_, i) => saveInquiry({ type: "INTRODUCTION", email: `test${i}@example.org`, targetCompany: "tyms-contracting" }));
    await Promise.all([listInquiries(), ...pending, listInquiries()]);
    const leads = await listInquiries();
    assert.equal(leads.length, 10);
    assert.equal(leads.some(l => l.id === "00000000"), false);
    const patch = { stage: "qualified" as const, assignee: "Coordinator", nextAction: "Request supporting documents", revision: 0 };
    const results = await Promise.all([updateInquiry(leads[0].id, patch), updateInquiry(leads[0].id, patch)]);
    assert.equal(results.filter(r => r.status === "updated").length, 1);
    assert.equal(results.filter(r => r.status === "conflict").length, 1);
    const stored = JSON.parse(await readFile(file, "utf8"));
    assert.equal(stored.length, 10);
    const updated = stored.find((lead: { id: string }) => lead.id === leads[0].id);
    assert.equal(updated.email, leads[0].email);
    assert.equal(updated.revision, 1);
    assert.equal(updated.workflowHistory.length, 1);
    assert.equal((await updateInquiry("ffffffff", patch)).status, "missing");
  } finally { delete process.env.DB_PATH; delete process.env.INQUIRY_RETENTION_DAYS; await rm(directory, { recursive: true, force: true }); }
});
