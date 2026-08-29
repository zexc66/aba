import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_PATH = path.join(__dirname, "analytics.json");
const RETENTION_DAYS = 90;

/** shape: { "YYYY-MM-DD": { "/path": count } } */
type Store = Record<string, Record<string, number>>;

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => {});
  return run;
}

async function readStore(): Promise<Store> {
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(STORE_PATH, "utf-8"));
    return parsed && typeof parsed === "object" ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

async function writeStore(store: Store): Promise<void> {
  const tmpPath = `${STORE_PATH}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(store));
  await fs.rename(tmpPath, STORE_PATH);
}

export function recordPageview(pathname: string): Promise<void> {
  return enqueue(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const store = await readStore();
    const day = store[today] ?? {};
    day[pathname] = (day[pathname] ?? 0) + 1;
    store[today] = day;

    // Retention: drop days older than the window
    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    for (const key of Object.keys(store)) {
      if (key < cutoff) delete store[key];
    }

    await writeStore(store);
  });
}

export function readAnalytics(): Promise<Store> {
  return readStore();
}
