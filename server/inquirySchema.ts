import { z } from "zod";

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
  targetService: label,
  role: label,
  interest: z.string().trim().max(500).optional(),
  consent: z.literal(true),
  locale: z.enum(["en", "ar", "fr"]).optional(),
  message: z.string().trim().max(4000).optional(),
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
