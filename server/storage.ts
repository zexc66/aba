import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "inquiries.json");

export interface Inquiry {
  id: string;
  type: string;
  email: string;
  name?: string;
  organization?: string;
  message?: string;
  timestamp: string;
}

export type InquiryInput = Omit<Inquiry, "id" | "timestamp">;

// Serialize every read-modify-write cycle: concurrent requests queue instead of
// racing on the file (last-write-wins previously dropped leads).
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
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    // Preserve the corrupt store for manual recovery instead of silently
    // overwriting it with an empty array (which previously wiped all leads).
    await fs.rename(DB_PATH, `${DB_PATH}.corrupt-${Date.now()}`);
    return [];
  }
}

async function writeAll(inquiries: Inquiry[]): Promise<void> {
  // Atomic replace: a crash mid-write can never truncate the existing store.
  const tmpPath = `${DB_PATH}.${randomUUID()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(inquiries, null, 2));
  await fs.rename(tmpPath, DB_PATH);
}

export function saveInquiry(inquiry: InquiryInput): Promise<Inquiry> {
  return enqueue(async () => {
    const inquiries = await readAll();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: randomUUID().slice(0, 8),
      timestamp: new Date().toISOString(),
    };
    inquiries.push(newInquiry);
    await writeAll(inquiries);
    return newInquiry;
  });
}
