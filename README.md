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
docker run -p 5000:5000 -v aiabasd-leads:/app/dist aiabasd
```

Mount a volume over `/app/dist` so `inquiries.json` (leads) survives container restarts.

## Environment

See `.env.example`. Without Contentful variables the site uses the static trilingual copy in `client/src/data.tsx`; with them, the `siteSettings` entry overrides site copy per locale and `newsArticle` entries populate the Newsroom.

## Contentful schema

**`siteSettings`** (single entry)
- `contentData` — JSON field matching the `Content` shape in `client/src/data.tsx`, per locale (en-US, ar-SA, fr-FR)

**`newsArticle`** (one entry per article)
- `title` (required, Text) · `excerpt` (Text) · `date` (Date) · `category` (Text) · `image` (Asset) · `readTime` (Text) · `author` (Text)

## Leads (`/api/inquiry`)

All contact-form, newsletter, and investor-access submissions are validated with Zod, rate-limited (10/min per IP), and logged without PII (lead ID and type only). The response returns a short `reference` ID that the UI surfaces to the user.

**Self-hosted (Express / Docker):** leads append atomically to `dist/inquiries.json` (serialized writes; corrupt stores are preserved as `*.corrupt-*`). Check the file regularly or wire a notification hook.

**Vercel (serverless `api/inquiry.ts`):** there is no durable disk, so leads are emailed via Resend and the endpoint fails honestly (503) when no channel is configured — it never fakes success. Set these environment variables in the Vercel project:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API token for lead delivery |
| `LEAD_NOTIFY_EMAIL` | Inbox that receives every lead |
| `LEAD_FROM_EMAIL` | Optional verified sender (defaults to `onboarding@resend.dev`) |

Without these, the deployed contact form shows its error state and directs visitors to `contact@aiabasd.org`.

## API

| Endpoint | Method | Notes |
|---|---|---|
| `/api/inquiry` | POST | `{ type, email, name?, organization?, message? }` → `{ success, reference }` |
| `/api/chat` | POST | `{ message }` → `{ response }` (rule-based assistant, 30/min rate limit) |
| `/api/*` (other) | GET | 404 JSON — never the SPA shell |

## Structure

```
client/src
  pages/          Home, Gallery, HamaProject, InvestorLogin, Privacy, Terms, NotFound
  components/
    home/         Home page sections (Hero, About, Programs, …, Contact, Footer)
    hama/         Hama project page modules
    layout/       GlobalLayout (page transitions)
    ui/           Shared primitives
  contexts/       LanguageContext (locale + CMS fetch + RTL), ThemeContext
  services/       cms.ts (Contentful client with static fallback)
  data.tsx        Static trilingual copy + Content interface (source of truth for CMS shape)
server
  index.ts        Express app: validation, rate limits, security headers, static serving
  services/       chatService.ts (rule-based assistant)
  storage.ts      Atomic JSON lead store
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
