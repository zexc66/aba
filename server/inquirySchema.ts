import { z } from "zod";
import { companyBySlug } from "../client/src/companies";
import { projectBySlug } from "../client/src/projects";

const SAFE_LABEL = /^[^<>{};$`\\]*$/;

const label = z.string().trim().max(60).regex(SAFE_LABEL).optional();
const longLabel = z.string().trim().max(500).regex(SAFE_LABEL).optional();

export const inquirySchema = z.object({
  type: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_-]{2,40}$/)
    .default("GENERAL"),
  email: z.email().max(254),
  name: z.string().trim().max(120).optional(),
  organization: z.string().trim().max(160).optional(),
  sector: label,
  region: label,
  ticket: label,
  timeline: label,
  partyType: label,
  sectors: longLabel,
  countries: longLabel,
  capabilities: longLabel,
  capitalBand: label,
  targetProject: z.string().trim().max(160).optional(),
  targetCompany: z.string().trim().max(80).optional(),
  needId: z.string().trim().max(8).optional(),
  targetService: label,
  role: label,
  interest: z.string().trim().max(500).optional(),
  consent: z.literal(true),
  locale: z.enum(["en", "ar", "fr"]).optional(),
  message: z.string().trim().max(4000).optional(),
});

export const introductionSchema = inquirySchema.extend({
  type: z.literal("INTRODUCTION"),
  organization: z.string().trim().min(1).max(160),
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  interest: z.string().trim().min(10).max(500),
  timeline: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  locale: z.enum(["en", "ar", "fr"]),
}).superRefine((data, ctx) => {
  if (data.targetCompany && !companyBySlug(data.targetCompany)) {
    ctx.addIssue({ code: "custom", path: ["targetCompany"], message: "Unknown company" });
  }
  const project = projectBySlug(data.targetProject ?? "");
  if (data.targetProject && !project) {
    ctx.addIssue({ code: "custom", path: ["targetProject"], message: "Unknown project" });
  }
  if (data.needId && (!/^(0|[1-9]\d*)$/.test(data.needId) || !project?.partnership[Number(data.needId)])) {
    ctx.addIssue({ code: "custom", path: ["needId"], message: "Need must belong to the selected project" });
  }
}).transform(data => {
  const company = companyBySlug(data.targetCompany ?? "");
  const project = projectBySlug(data.targetProject ?? "");
  return { ...data, message: [
    `Company: ${company?.name ?? "AIABASD to identify"}`,
    `Project: ${project?.title[data.locale] ?? "General cooperation"}`,
    `Published need: ${data.needId ? project?.partnership[Number(data.needId)]?.[data.locale] ?? "Not specified" : "General discussion"}`,
    `Contribution: ${data.interest}`,
  ].join("\n") };
});

export const projectSubmissionSchema = inquirySchema.extend({
  type: z.literal("PROJECT_SUBMISSION"),
  organization: z.string().trim().min(1).max(160),
  partyType: z.enum([
    "government",
    "investor",
    "operator",
    "epc",
    "ngo",
    "technology",
  ]),
  sector: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  region: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  targetProject: z.string().trim().min(1).max(160),
  targetService: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  interest: z.string().trim().min(1).max(500),
  timeline: z.string().trim().min(1).max(60).regex(SAFE_LABEL),
  message: z.string().trim().min(1).max(4000),
});
