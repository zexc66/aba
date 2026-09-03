import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch {
  // Hosted runtimes inject environment variables directly.
}

const DATA_DIR = path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), "data"));
const DB_PATH = path.resolve(process.env.DB_PATH ?? path.join(DATA_DIR, "inquiries.json"));

export interface Inquiry {
  id: string;
  type: string;
  email: string;
  name?: string;
  organization?: string;
  sector?: string;
  region?: string;
  ticket?: string;
  timeline?: string;
  partyType?: string;
  sectors?: string;
  countries?: string;
  capabilities?: string;
  capitalBand?: string;
  targetProject?: string;
  targetService?: string;
  role?: string;
  interest?: string;
  consent?: boolean;
  stage?: string;
  priority?: string;
  locale?: string;
  message?: string;
  timestamp: string;
}

export type InquiryInput = Omit<Inquiry, "id" | "timestamp">;

// Serialize every read-modify-write cycle: concurrent requests queue instead of
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => {});
  return run;
}

async function readAll(): Promise<Inquiry[]> {
  let raw: string;
  try {
    raw = await fs.readFile(DB_PATH, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    // Preserve the corrupt store for manual recovery. Retention writes happen
    // outside this recovery block so a persistence failure cannot rename a
    // valid store as corrupt.
    try {
      await fs.rename(DB_PATH, `${DB_PATH}.corrupt-${Date.now()}`);
    } catch {
      // Keep the original parse error as the useful failure signal.
    }
    throw error;
  }

  if (!Array.isArray(parsed)) throw new Error("Inquiry store must contain an array.");
  const inquiries = parsed as Inquiry[];
  const retained = applyRetention(inquiries);
  if (retained.length !== inquiries.length) await writeAll(retained);
  return retained;
}

async function writeAll(inquiries: Inquiry[]): Promise<void> {
  // Atomic replace: a crash mid-write can never truncate the existing store.
  const tmpPath = `${DB_PATH}.${randomUUID()}.tmp`;
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(tmpPath, JSON.stringify(inquiries, null, 2));
  await fs.rename(tmpPath, DB_PATH);
}

function retentionDays(): number | null {
  const raw = process.env.INQUIRY_RETENTION_DAYS?.trim();
  if (!raw) return null;
  const days = Number(raw);
  return Number.isInteger(days) && days > 0 ? days : null;
}

/** Retention is opt-in; unset or invalid configuration never deletes records. */
function applyRetention(inquiries: Inquiry[]): Inquiry[] {
  const days = retentionDays();
  if (days === null) return inquiries;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return inquiries.filter((inquiry) => {
    const timestamp = Date.parse(inquiry.timestamp);
    return !Number.isFinite(timestamp) || timestamp >= cutoff;
  });
}

export function saveInquiry(inquiry: InquiryInput): Promise<Inquiry> {
  return enqueue(async () => {
    const inquiries = await readAll();
    const newInquiry: Inquiry = {
      ...inquiry,
      stage: inquiry.stage ?? "new",
      priority: inquiry.priority ?? "normal",
      id: randomUUID().slice(0, 8),
      timestamp: new Date().toISOString(),
    };
    inquiries.push(newInquiry);
    await writeAll(inquiries);
    return newInquiry;
  });
}

export function listInquiries(): Promise<Inquiry[]> {
  return readAll();
}
