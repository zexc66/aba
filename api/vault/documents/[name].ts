import { bearerToken, readDocument, verifyToken, vaultStorageAvailable } from "../../../server/vault-core.js";

interface ServerlessRequest { method?: string; headers: Record<string, string | string[] | undefined>; query?: Record<string, string | string[] | undefined>; }
interface ServerlessResponse { setHeader(name: string, value: string): unknown; status(code: number): ServerlessResponse; json(payload: unknown): void; send(body: unknown): void; }

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "private, no-store");
  if (req.method !== "GET") { res.status(405).json({ error: "Method not allowed" }); return; }
  if (!(await vaultStorageAvailable())) { res.status(503).json({ error: "Vault storage is not configured on this deployment. Please email contact@aiabasd.org." }); return; }
  if (!verifyToken(bearerToken(req.headers.authorization))) { res.status(401).json({ error: "Session expired. Please authenticate again." }); return; }
  const value = req.query?.name;
  const name = typeof value === "string" ? value : "";
  const document = await readDocument(name);
  if (!document) { res.status(404).json({ error: "Document not found." }); return; }
  res.setHeader("Content-Disposition", `attachment; filename="${document.name}"`);
  res.setHeader("Content-Length", String(document.size));
  res.setHeader("Content-Type", "application/octet-stream");
  res.status(200).send(document.body);
}
