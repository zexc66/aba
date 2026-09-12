import { z } from "zod";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const PLATFORM_ORG_SLUG = "aiabasd";
const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function serviceClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key
    ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;
}

export async function verifyAccessToken(
  jwt: string | undefined | null
): Promise<{ id: string; email: string } | null> {
  if (!jwt || !process.env.SUPABASE_URL) return null;
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${jwt}` },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    const user = (await response.json()) as { id?: string; email?: string };
    return user.id && user.email ? { id: user.id, email: user.email } : null;
  } catch {
    return null;
  }
}

export type AcceptOutcome =
  | { status: 200; body: { success: true } }
  | { status: 400; body: { error: "invalid" } }
  | { status: 401; body: { error: "unauthorized" } }
  | { status: 404; body: { error: "invalid" } }
  | { status: 409; body: { error: "already" } }
  | { status: 412; body: { error: "mismatch"; email: string } }
  | { status: 500 | 503; body: { error: string } };

/** Verifies the visitor's session, then consumes a pending invitation and
 *  activates their membership. The invitation email must match the session
 *  email exactly; a mismatch never consumes the invitation. */
export async function acceptInvite(token: string, jwt: string | undefined | null): Promise<AcceptOutcome> {
  if (!TOKEN_RE.test(token)) return { status: 400, body: { error: "invalid" } };
  const user = await verifyAccessToken(jwt);
  if (!user) return { status: 401, body: { error: "unauthorized" } };
  const client = serviceClient();
  if (!client) return { status: 503, body: { error: "unconfigured" } };

  const invite = (
    await client
      .from("org_invites")
      .select("id,org_id,email,role,accepted_at")
      .eq("token", token)
      .maybeSingle()
  ).data as { id: string; org_id: string; email: string; role: string; accepted_at: string | null } | null;
  if (!invite) return { status: 404, body: { error: "invalid" } };
  if (invite.accepted_at) return { status: 409, body: { error: "already" } };
  if (invite.email.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
    return { status: 412, body: { error: "mismatch", email: invite.email } };
  }

  const updated = await client.from("org_invites").update({ accepted_at: new Date().toISOString() }).eq("id", invite.id);
  if (updated.error) return { status: 500, body: { error: "error" } };
  const membership = await client
    .from("memberships")
    .upsert(
      { org_id: invite.org_id, user_id: user.id, role: invite.role, status: "active" },
      { onConflict: "org_id,user_id" }
    );
  if (membership.error) return { status: 500, body: { error: "error" } };
  return { status: 200, body: { success: true } };
}

export const inviteSchema = z.object({
  email: z.string().trim().email().max(254),
  role: z.enum(["coordinator", "member"]).default("member"),
});
