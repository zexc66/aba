import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ProgramStatusTone = "active" | "dev" | "pipeline";

export function programStatusTone(status: string): ProgramStatusTone {
  const s = status.toLowerCase();
  if (s.includes("active") || s.includes("نشط") || s.includes("actif")) return "active";
  if (s.includes("development") || s.includes("تطوير") || s.includes("développement")) return "dev";
  return "pipeline";
}
