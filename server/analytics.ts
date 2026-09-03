import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

try {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
} catch {
  // Hosted runtimes inject environment variables directly.
}

const DATA_DIR = path.resolve(process.env.DATA_DIR ?? path.join(process.cwd(), "data"));
const STORE_PATH = path.resolve(process.env.ANALYTICS_PATH ?? path.join(DATA_DIR, "analytics.json"));
const RETENTION_DAYS = 90;
const MAX_COUNTERS_PER_DAY = 1000;

/** shape: { "YYYY-MM-DD": { "/path": count } } */
type Store = Record<string, Record<string, number>>;

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => {});
  return run;
}

async function readStore(): Promise<Store> {
  let raw: string;
  try {
    raw = await fs.readFile(STORE_PATH, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
    validateStore(parsed);
  } catch (error) {
    // Keep malformed data available for manual recovery. Never replace it
    // with an empty store merely because parsing or validation failed.
    try {
      await fs.rename(STORE_PATH, `${STORE_PATH}.corrupt-${Date.now()}`);
    } catch {
      // Preserve the original failure if the recovery rename is unavailable.
    }
    throw error;
  }

  return pruneStore(parsed as Store);
}

function validateStore(value: unknown): asserts value is Store {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Analytics store must be an object.");
  }
  for (const [day, entries] of Object.entries(value)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !entries || typeof entries !== "object" || Array.isArray(entries)) {
      throw new Error("Analytics store has an invalid bucket.");
    }
    for (const [key, count] of Object.entries(entries)) {
      if (!key || typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
        throw new Error("Analytics store has an invalid counter.");
      }
    }
  }
}

function cutoffDay(): string {
  return new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function pruneStore(store: Store): Store {
  const pruned: Store = {};
  const cutoff = cutoffDay();
  for (const [day, entries] of Object.entries(store)) {
    if (day < cutoff) continue;
    pruned[day] = Object.fromEntries(Object.entries(entries).slice(0, MAX_COUNTERS_PER_DAY));
  }
  return pruned;
}

function normalizePathname(value: string): string | null {
  const raw = value.trim().split(/[?#]/, 1)[0];
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.length > 200) return null;
  const normalized = raw.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return /^\/[A-Za-z0-9\-._~!$&'()*+,;=:@%/?]*$/.test(normalized) ? normalized : null;
}

function incrementCounter(store: Store, key: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const day = store[today] ?? {};
  const exists = Object.prototype.hasOwnProperty.call(day, key);
  if (!exists && Object.keys(day).length >= MAX_COUNTERS_PER_DAY) return false;
  day[key] = (day[key] ?? 0) + 1;
  store[today] = day;
  return true;
}

async function writeStore(store: Store): Promise<void> {
  const tmpPath = `${STORE_PATH}.${randomUUID()}.tmp`;
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(tmpPath, JSON.stringify(pruneStore(store)));
    await fs.rename(tmpPath, STORE_PATH);
  } catch (error) {
    await fs.rm(tmpPath, { force: true }).catch(() => {});
    throw error;
  }
}

export function recordPageview(pathname: string): Promise<void> {
  return enqueue(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const store = await readStore();
    const normalized = normalizePathname(pathname);
    if (!normalized || !incrementCounter(store, normalized)) return;

    await writeStore(store);
  });
}

export function recordEvent(event: string, pathname: string): Promise<void> {
  return enqueue(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const store = await readStore();
    const normalized = normalizePathname(pathname);
    if (!normalized || !/^[A-Za-z0-9_.-]{1,80}$/.test(event)) return;
    const key = `event:${event}|${normalized}`;
    if (!incrementCounter(store, key)) return;
    await writeStore(store);
  });
}

export function readAnalytics(): Promise<Store> {
  return readStore();
}
