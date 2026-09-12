import { z } from "zod";

export const LEAD_STAGES = ["new", "qualified", "introduced", "assessment", "active-development", "paused", "closed"] as const;
export const workflowSchema = z.object({
  stage: z.enum(LEAD_STAGES),
  assignee: z.string().trim().max(120),
  nextAction: z.string().trim().max(1000),
  revision: z.number().int().min(0),
}).strict();
export type WorkflowUpdate = z.infer<typeof workflowSchema>;
export type WorkflowEvent = { at: string; stage: string; assignee: string; nextAction: string; revision: number };
