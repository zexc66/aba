type CORSRequest = {
  headers: Record<string, string | string[] | undefined>;
};

type CORSResponse = {
  setHeader(name: string, value: string): unknown;
  status(code: number): { json(payload: unknown): void };
};

/** Prefer the platform-provided address; use the nearest proxy address rather
 * than a client-controlled first X-Forwarded-For value. This still remains
 * best-effort because serverless memory is not shared between instances. */
export function requestClientIp(req: CORSRequest): string {
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) return realIp.trim();
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    const values = forwarded.split(",").map((value) => value.trim()).filter(Boolean);
    return values.at(-1) ?? "unknown";
  }
  return "unknown";
}

/** Cross-origin access is opt-in for one explicitly configured origin. */
export function allowConfiguredOrigin(req: CORSRequest, res: CORSResponse): boolean {
  const value = req.headers.origin;
  const origin = typeof value === "string" ? value : "";
  if (!origin) return true;

  const configuredOrigin = process.env.PUBLIC_APP_ORIGIN?.trim();
  // A wildcard is intentionally not a valid opt-in. It may not broaden a
  // serverless endpoint beyond same-origin requests.
  const allowed = configuredOrigin === "*" ? "" : configuredOrigin ?? "https://aiabasd.org";
  const hostValue = req.headers.host;
  const host = typeof hostValue === "string" ? hostValue : "";
  const sameOrigin = host !== "" && (origin === `https://${host}` || origin === `http://${host}`);
  if (!sameOrigin && (!allowed || origin !== allowed)) {
    res.status(403).json({ error: "Cross-origin requests are not allowed." });
    return false;
  }

  res.setHeader("Access-Control-Allow-Origin", sameOrigin ? origin : allowed);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
  return true;
}
