import type { Locale3 } from "../client/src/projects";
import { publicProjects } from "../server/publicData.js";

const LOCALES = new Set(["en", "ar", "fr"]);

export default async function handler(req: {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
}, res: {
  setHeader(name: string, value: string): unknown;
  status(code: number): { json(payload: unknown): void; end(): void };
}) {
  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const raw = req.query?.locale;
  const locale = typeof raw === "string" && LOCALES.has(raw) ? (raw as Locale3) : "en";
  const data = publicProjects(locale);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).json(data);
}
