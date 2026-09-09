/** Static Vercel lead-delivery readiness check. It never contacts providers and
 * never prints environment values. Use --allow-empty or --mock for CI/local
 * verification where delivery credentials are intentionally absent. */

const args = new Set(process.argv.slice(2));
const mockMode = args.has("--mock");
const allowEmpty = mockMode || args.has("--allow-empty");
const errors = [];
const warnings = [];

const value = (name) => (typeof process.env[name] === "string" ? process.env[name].trim() : "");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const addError = (message) => errors.push(message);
const addWarning = (message) => warnings.push(message);

const resendKey = value("RESEND_API_KEY");
const notifyEmail = value("LEAD_NOTIFY_EMAIL");
const fromEmail = value("LEAD_FROM_EMAIL");
const webhookUrl = value("LEAD_WEBHOOK_URL");
const resendConfigured = Boolean(resendKey && notifyEmail);
const webhookConfigured = Boolean(webhookUrl);

if (process.env.VERCEL !== "1") {
  addWarning("VERCEL is not set to 1; this check is being run outside a Vercel build context.");
}

if (!resendConfigured && !webhookConfigured) {
  if (allowEmpty) {
    addWarning("No lead provider is configured; empty/mock verification was explicitly allowed.");
  } else {
    addError("Configure Resend (RESEND_API_KEY + LEAD_NOTIFY_EMAIL) or LEAD_WEBHOOK_URL.");
  }
}

if (!mockMode) {
  if (resendKey && !resendKey.startsWith("re_")) {
    addError("RESEND_API_KEY has an unexpected basic format.");
  }
  if (resendKey && resendKey.length < 8) {
    addError("RESEND_API_KEY is too short.");
  }
  if (Boolean(resendKey) !== Boolean(notifyEmail)) {
    addWarning("Resend configuration is incomplete; it will not count as a delivery provider.");
  }
  if (notifyEmail && !emailPattern.test(notifyEmail)) {
    addError("LEAD_NOTIFY_EMAIL has an invalid basic email format.");
  }
  if (fromEmail && !emailPattern.test(fromEmail)) {
    addError("LEAD_FROM_EMAIL has an invalid basic email format.");
  }
  if (webhookUrl) {
    try {
      const parsed = new URL(webhookUrl);
      if (parsed.protocol !== "https:") addError("LEAD_WEBHOOK_URL must use HTTPS because inquiry data is sent to it.");
    } catch {
      addError("LEAD_WEBHOOK_URL is not a valid URL.");
    }
  }
}

console.log("Vercel lead-delivery readiness");
for (const message of warnings) console.log(`WARNING: ${message}`);
for (const message of errors) console.log(`ERROR: ${message}`);
console.log(`Result: ${errors.length ? "BLOCKED" : "READY"} (${errors.length} error(s), ${warnings.length} warning(s))`);
process.exitCode = errors.length ? 1 : 0;
