# AGENTS.md — AIABASD website

Trilingual (EN/AR/FR + RTL) institutional site. React 18 + Vite + wouter (not Next). Express self-hosted path + Vercel serverless path from ONE codebase. Product truth: `PRODUCT.md` (honest-content policy is binding). Design system: `DESIGN.md` (burgundy `#5a1f2e`, gold `#f2a007` signal-only, paper `#fdfcfb`, ink `#0b0b10` — square geometry, no gradients/rounded corners/backdrop-blur). Roadmap: `PLATFORM_ROADMAP.md`.

## Commands

```bash
pnpm check        # tsc --noEmit (no lint script exists)
pnpm check:i18n   # deep EN/AR/FR key parity — CI-enforced, run before every commit
pnpm test         # node:test via tsx over tests/*
npx tsx --test tests/markets.test.ts   # single suite
pnpm build        # ORDER MATTERS: sitemap gen → vite build → esbuild server → prerender (537 routes)
pnpm dev          # vite on :8080, proxies /api → localhost:5000 (run pnpm dev:server for API)
vercel --prod --yes   # manual deploy; git push also auto-deploys
```

Vercel env vars exist for `SUPABASE_*` **and** `VITE_SUPABASE_*` — Vite bakes only the `VITE_*` pair into the client bundle at build time; the unprefixed pair feeds server/api code. Missing `VITE_*` at build = client renders "unconfigured" states even though server routes work.

## Architecture facts that bite

**Two deployment paths, one codebase** (never fake success in either):
- Self-hosted: `server/index.ts` (Express), JSON-file persistence in `DATA_DIR`, admin auth via `ADMIN_TOKEN` header.
- Vercel: `api/*.ts` serverless functions, leads delivered via Resend/webhook — **returns 503 honestly when unconfigured**, never silently drops.
- Private routes (`/admin`, `/investor-portal`, `/investor-portal/vault`) render `DeploymentUnavailable` on Vercel (`isVercelDeployment` from `import.meta.env.VERCEL`). Any new private surface must join that gating list.

**Prerender pipeline** (`scripts/prerender.mjs` + `prerender-entry.tsx`) renders every public route to static HTML ×3 locales:
- `prerender-entry.tsx` has its OWN provider stack mirroring `App.tsx` — a new context provider used by any page must be added there too, or SSR throws (`useX requires Provider`).
- Helmet head tags are stripped; deterministic head is re-injected. JSON-LD scripts from Helmet are extracted via the helmetContext and appended — body-level `<script type="application/ld+json">` must use `dangerouslySetInnerHTML` or React escapes it into invalid JSON.
- Server components read `.env` via `process.loadEnvFile` in `server/storage.ts` — locally, SUPABASE_* are live even when you think they're unset (tests assert against real Supabase if keys exist).

**Adding a route — all four places or it breaks:**
1. `client/src/App.tsx` (lazy + Route)
2. `scripts/routes.mjs` → `ALL_ROUTES` (prerender + Express static fallback + tests validate llms.txt paths against this)
3. `scripts/prerender-entry.tsx` (direct import + Route + `routeMeta` case)
4. `SITEMAP_ROUTES` filter in `routes.mjs` if the surface is private/noindex

**i18n:** EN is bare (`/projects`), AR/FR prefixed (`/ar/projects`). Copy lives per-locale in `client/src/data.tsx` + `platform.ts` + `localizedCopy.ts` + `submissionCopy.ts` + `networkCopy.ts` + `roomsCopy.ts` + `marketCopy.ts` + `preparation.ts`. A new string exists 3× or `check:i18n` fails. `Contentful` overrides copy at runtime when configured; validation in `services/cms.ts` falls back to static per-section.
- `<Link>` requires `asChild` and `localizedLinkPath()` (emits `~` escape); plain `<a>` anchors use `localizedPath()`.
- Language switch remounts the whole Router (wouter base change) — page-local state dies unless hoisted above it (see `IntroductionDraftContext`).
- Latin-only strings inside AR pages need `dir="ltr"`; don't fight the global Arabic tracking resets in `index.css`.

## Supabase (member access)

- Auth = magic link (OTP); schema in `supabase/migrations/`, applied with `supabase db push` (works with `SUPABASE_ACCESS_TOKEN` env via platform proxy — **no DB password needed**; `authorized` CLI also queries via `supabase db query --linked`).
- RLS on every table; org-membership scoped. Invite acceptance is a security-definer RPC (`accept_my_invite`) that matches session email to invite email in-database — do not reintroduce a client-trusted path.
- Client init: `client/src/lib/supabase.ts` returns `null` when `VITE_*` are absent — every consuming page must render an honest unconfigured state.
- `server/org.ts` / `server/orgRoutes.ts` hold service-key logic (never reaches the client). `storage.ts` serializes ALL read-modify-write through a queue — retention-on-read must stay inside it (concurrency regression test exists). Lead workflow uses optimistic concurrency (`revision`, 409 on stale).

## Content honesty (binding, PRODUCT.md)

Company directory (`client/src/companies.ts`) carries **names + logos only** unless the owner supplies approved facts. Unknown fields render "Not yet published"; basic profiles are `noindex` and excluded from the sitemap (`SITEMAP_ROUTES`) until substantive. No fabricated news, testimonials, capabilities, dates, or figures. Published figures (+$550M pipeline, 11 corridors) are owner-approved.

## Testing quirks

- `tests/*` run under tsx with default JSX transform — **do not import `data.tsx` (JSX) from shared modules** that tests or the SSR entry load (`markets.ts` is JSX-free on purpose; pass localized lists as parameters).
- Full-flow checks that need a browser live outside the repo (Playwright + `vite preview` on :4183). API integration tests spawn `node dist/index.js` — run `pnpm build` first.
- Sitemap.xml is a build artifact; it will always show as modified after a build.

## Gotchas

- `routes.test.mjs` asserts every llms.txt URL exists in `ALL_ROUTES` — update both together.
- `data.tsx` icons are ReactNode — CMS JSON cannot replace them (merge layer keeps static values).
- CRLF warnings on commit are normal (repo has mixed endings); `.env` and `.impeccable/review/` are gitignored.
- Express catch-all serves prerendered `index.html` dirs; client-only deep links (e.g. `/rooms/:id`) need an explicit SPA-shell fallback in `server/index.ts` and a `rewrites` entry in `vercel.json`.
