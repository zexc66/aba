# AIABASD Website

Institutional website for the **African International Alliance for Business & Sustainable Development** — trilingual (EN/AR/FR) React SPA with an Express API for inquiries and the site assistant.

## Stack

- **Frontend:** React 18, Vite 7, Tailwind CSS 4, wouter (routing), framer-motion, react-helmet-async (SEO), cmdk (⌘K search), sonner (toasts), PWA via vite-plugin-pwa
- **Backend:** Express 5, Zod (validation), file-based lead persistence
- **CMS:** Contentful (optional — static fallback in `client/src/data.tsx`)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
cp .env.example .env      # optional: add Contentful keys to enable CMS content
pnpm dev                  # Vite dev server on :8080 (proxies /api to :5000)
pnpm dev:server           # API server on :5000 (run in a second terminal)
```

For a production build:

```bash
pnpm build     # vite build → dist/public, esbuild → dist/index.js
pnpm start     # NODE_ENV=production node dist/index.js (serves site + API on :5000)
```

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Vite dev server (:8080) |
| `pnpm build` | Production build (client + server) |
| `pnpm start` | Run production server |
| `pnpm check` | TypeScript check (`tsc --noEmit`) |
| `pnpm check:i18n` | Locale parity check — EN/AR/FR key shapes and program slugs must match |
| `pnpm format` | Prettier |

## Docker

```bash
docker build -t aiabasd .
docker run -p 5000:5000 -v aiabasd-data:/app/data aiabasd
```

The image keeps application code and static assets in `/app/dist`. Mount the
writable `/app/data` volume so inquiries and analytics survive container
restarts; never mount over `/app/dist`. The runtime defaults to
`/app/data/inquiries.json` and `/app/data/analytics.json`. Override with
`DATA_DIR`, `DB_PATH`, or `ANALYTICS_PATH` when the deployment needs another
writable location. Confidential `data-room/` material is excluded from the
Docker build context.

## Environment

See `.env.example`. Without Contentful variables the site uses the static trilingual copy in `client/src/data.tsx`; with them, the `siteSettings` entry overrides site copy per locale and `newsArticle` entries populate the Newsroom.

## Contentful schema

**`siteSettings`** (single entry)
- `contentData` — JSON field matching the `Content` shape in `client/src/data.tsx`, per locale (en-US, ar-SA, fr-FR)

**`newsArticle`** (one entry per article)
- `title` (required, Text) · `excerpt` (Text) · `date` (Date) · `category` (Text) · `image` (Asset) · `readTime` (Text) · `author` (Text)

## Leads (`/api/inquiry`)

All contact-form, newsletter, and investor-access submissions are validated with Zod, rate-limited (10/min per IP), and logged without PII (lead ID and type only). The response returns a short `reference` ID that the UI surfaces to the user.

**Self-hosted (Express / Docker):** leads append atomically to
`DATA_DIR/inquiries.json` (Docker default: `/app/data/inquiries.json`; local
default: `./data/inquiries.json`). Writes are serialized and corrupt stores are
preserved as `*.corrupt-*`. Set `INQUIRY_RETENTION_DAYS` to a positive integer
to remove records older than that many days during reads and writes; it is
unset by default, so no inquiry is deleted automatically. Optional notification
channels: Resend email (`RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL`) and/or a
Slack-compatible JSON webhook (`LEAD_WEBHOOK_URL`) — see `server/notify.ts`.
Without that setting, operators must apply their approved retention schedule.
Check the file regularly.

**Vercel (serverless `api/inquiry.ts`):** there is no durable disk, so leads are emailed via Resend (and optionally the webhook) and the endpoint fails honestly (503) when no channel is configured — it never fakes success. Set these environment variables in the Vercel project:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API token for lead delivery |
| `LEAD_NOTIFY_EMAIL` | Inbox that receives every lead |
| `LEAD_FROM_EMAIL` | Optional verified sender (defaults to `onboarding@resend.dev`) |
| `LEAD_WEBHOOK_URL` | Optional JSON webhook (posted on every lead) |
| `INQUIRY_RETENTION_DAYS` | Optional positive integer for opt-in plaintext inquiry cleanup on read/write; unset means no automatic deletion |

## Investor data room (`/investor-portal`)

Authenticated document vault for verified institutions. Access is **director-issued, never self-serve**: an invited investor authenticates with institutional email + access key and receives an HMAC-signed 8-hour session token; the vault lists and serves files from `data-room/` (see `data-room/README.md`). Without `VAULT_ACCESS_KEYS` / `VAULT_SESSION_SECRET` the auth endpoint fails honestly with 503. On Vercel, `VAULT_STORAGE_MODE=filesystem` and an explicit mounted `VAULT_DATA_ROOM_DIR` are also required; an unavailable or ephemeral filesystem returns 503 instead of authenticating into an empty vault.

| Variable | Purpose |
|---|---|
| `VAULT_ACCESS_KEYS` | `"email:KEY"` pairs, comma-separated |
| `VAULT_SESSION_SECRET` | Random 32+ char HMAC secret |
| `VAULT_STORAGE_MODE` | Set to `filesystem` on Vercel only when a mounted data-room path is actually available |
| `VAULT_DATA_ROOM_DIR` | Explicit mounted data-room path required for Vercel vault access |
| `VAULT_STORAGE_SENTINEL` | Required on Vercel; mounted file name whose contents must be `AIABASD_VAULT_READY` |

The Express and Vercel handlers both support the vault endpoints. Vercel
deployments can only serve documents that are present in the deployment
filesystem; durable private document storage still belongs in an object-storage
service (with signed URLs or a server-side proxy) before sensitive files are
added to a repository or deployment artifact. `data-room/README.md` is never
listed or served, and hidden files are excluded.

| Endpoint | Notes |
|---|---|
| `POST /api/vault/auth` | `{ email, key }` → `{ token }` (constant-time compare, 10 attempts / 15 min) |
| `GET /api/vault/documents` | Bearer token → document index |
| `GET /api/vault/documents/:name` | Bearer token → file download (path-traversal safe) |

## First-party analytics & consent

`GlobalLayout` sends an anonymous pageview beacon (`path` only — no IP, UA, identifiers, or query strings) to `POST /api/track` on route change, and platform pages send allow-listed interaction events, **only after the visitor accepts the consent banner** (choice persisted in `localStorage`). Self-hosted: daily buckets persist to `DATA_DIR/analytics.json` (Docker default: `/app/data/analytics.json`, 90-day retention). Inspect via the Operations Console or:

Self-hosted analytics normalize paths and cap each daily bucket at 1,000 unique
counters; new paths beyond the cap are ignored with a successful response.

```bash
curl -H "x-admin-token: $ADMIN_TOKEN" http://localhost:5000/api/admin/stats
```

Serverless has no durable analytics storage. Vercel returns an honest `204`
with `X-Analytics-Storage: none` unless `ANALYTICS_WEBHOOK_URL` is configured;
when configured, the sanitized event is forwarded with a 90-day retention hint
and the receiver must enforce retention.

| Variable | Purpose |
|---|---|
| `ANALYTICS_WEBHOOK_URL` | Optional serverless analytics receiver; no Vercel-side persistence is claimed |

### Rate limiting deployment note

The chat, inquiry, and vault handlers include a local in-memory limiter as
defense-in-depth only. Serverless instances do not share that memory, so it is
not durable or a substitute for edge enforcement. Configure Vercel WAF,
Firewall, or Edge rate-limit rules for these paths before production traffic:

```text
/api/chat
/api/inquiry
/api/vault/auth
```

Keep the local limiter enabled as a per-instance backstop; this application
does not claim durable rate-limit protection without an external provider.

The serverless chat and inquiry endpoints are same-origin by default. A single
additional browser origin may be opted in with `PUBLIC_APP_ORIGIN`; wildcard
CORS is intentionally disabled.

## Operations console (`/admin`)

Token-gated internal page (session-only token in `sessionStorage`; requests authenticated with the `ADMIN_TOKEN` env): total leads, pageview summary, and the full lead list (newest first) with all structured-intake fields. Not linked from public navigation, trilingual parity not required (operator tooling).

## Lead auto-response & RSS

When Resend is configured, every inquiry gets an **auto-acknowledgment email** in the visitor's locale (reference ID + two-business-day expectation, no promises), and `NEWSLETTER` submissions get a **welcome email** instead. `GET /rss.xml` serves the newsroom feed from Contentful when server env is configured — an honest empty channel otherwise.

## Grounded assistant

Public `/api/chat` currently uses only the deterministic, localized
`server/services/chatService.ts` responses and always reports `source: rules`.
This is intentional: free-form Gemini prose is not exposed publicly until the
assistant returns structured fact IDs and citations that can be validated.

`server/services/aiChat.ts` is retained as deferred work. Its owner-approved
facts base, system prompt, and conservative validator are not a substitute for
structured factual entailment and are not used by either the Express or Vercel
public chat handler.

## API

| Endpoint | Method | Notes |
|---|---|---|
| `/api/inquiry` | POST | `{ type, email, consent: true, name?, organization?, partyType?, role?, interest?, targetProject?, targetService?, sector?, region?, ticket?, timeline?, sectors?, countries?, capabilities?, capitalBand?, locale?, message? }` → `{ success, reference }`; consent is required for all contact, newsletter, partner-match, and investor-access submissions |
| `/api/chat` | POST | `{ message, locale? }` → `{ response, source: "rules" }` — deterministic localized responses only; Gemini is deferred |
| `/api/track` | POST | `{ consent: true, path, event? }` — anonymous pageview or allow-listed event, consent-gated; Vercel uses no storage unless a webhook is configured |
| `/api/admin/stats` | GET | `x-admin-token` header → pageview buckets |
| `/api/admin/leads` | GET | `x-admin-token` header → all leads, newest first |
| `/api/vault/*` | — | See [Investor data room](#investor-data-room-investor-portal) |
| `/rss.xml` | GET | Newsroom feed (Contentful when server env configured; honest empty channel otherwise) |
| `/api/*` (other) | GET | 404 JSON — never the SPA shell |

## Structure

```
client/src
  pages/          Home, Services, Intelligence, Match, Gallery, HamaProject, InvestorLogin, Vault, Privacy, Terms, NotFound
  components/
    home/         Home page sections (Hero, About, Programs, …, Contact, Footer)
    hama/         Hama project page modules
    layout/       GlobalLayout (page transitions + analytics beacon)
    ui/           Shared primitives
  contexts/       LanguageContext (locale + CMS fetch + RTL), ThemeContext
  services/       cms.ts (Contentful client with static fallback)
  data.tsx        Static trilingual copy + Content interface (source of truth for CMS shape)
  platform.ts     Typed trilingual service, intelligence, and matching catalogs
server
  index.ts        Express app: validation, rate limits, security headers, static serving
  services/       chatService.ts (rule-based assistant)
  storage.ts      Atomic JSON lead store
  notify.ts       Optional lead notifications (Resend + webhook)
  analytics.ts    First-party pageview store (daily buckets, 90-day retention)
  vault-core.ts   Framework-neutral vault auth and document safety primitives
  vault.ts        Investor data room: auth, session tokens, document serving
api/              Vercel handlers for chat, inquiry, tracking, and vault access
data-room/        Confidential vault documents (gitignored — see README.md inside)
```

## Conventions

- All user-visible copy lives in `client/src/data.tsx` (or Contentful) — not hardcoded in components — in all three locales.
- Arabic rendering uses the `font-arabic` utility (Noto Kufi Arabic); the document direction flips automatically for `ar`.
- Only verified, owned photography is published; no stock imagery posing as organizational activity.
- Site URL is centralized in `client/src/components/SEO.tsx` (`SITE_URL`) — update it and `client/public/{robots.txt,sitemap.xml}` when the production domain is final.

## Legal pages

`/privacy` and `/terms` contain working drafts — have counsel review them before launch (UK/EU GDPR references included).

## Known follow-ups (from PROJECT_INTELLIGENCE_REPORT.md)

Email lead routing, admin inbox, CI pipeline, analytics + consent banner, program detail pages, Lighthouse budgets, and a grounded (RAG) assistant to replace the rule-based chatbot.
