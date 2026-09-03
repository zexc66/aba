# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Institutional counterparties evaluating AIABASD, deliberately balanced with no single dominant path (owner decision): investors and DFIs (sovereign funds, private capital), government and municipal partners, EPC and operating partners, NGOs/development agencies, and press. They arrive to judge institutional credibility and — if convinced — start a qualified conversation via the contact form, investor access request, or newsletter. The site is trilingual (EN/AR/FR) with full RTL for Arabic; all audiences must get parity.

## Product Purpose

The public website of the African International Alliance for Business & Sustainable Development (AIABASD), a multi-country alliance structuring bankable PPP/BOT infrastructure programs (energy, logistics, agriculture, digital, cities, circular recovery) across Africa and the Arab world. Its job: establish institutional credibility and convert evaluation into qualified inquiries. Success = qualified conversations started (inquiries with reference IDs, investor access requests, subscriptions).

## Positioning

An alliance orchestrator that couples deal origination with governance rigor — ESIA/ESMS, KYC/AML, independent engineer/auditor, transparent success-fee structures — rather than a fund or an EPC. True trilingual institutional presence (EN/AR/FR incl. Arabic typography and RTL) is rare in this sector and signals on-the-ground capability.

## Operating Context

- Two deployment paths from one codebase: self-hosted Express/Docker (leads persisted to the configured writable `DATA_DIR`, Docker default `/app/data`) and Vercel serverless (leads delivered via Resend email; fails honestly when unconfigured).
- Content operations: all copy lives in `client/src/data.tsx` per locale; Contentful (`siteSettings`, `newsArticle`) overrides copy when configured; CI enforces EN/AR/FR key parity.
- Language is a persisted user choice (localStorage), toggled in the header (and the Hama HUD).

## Capabilities and Constraints

- Confirmed functionality: home (11 sections), 7 program detail pages (`/programs/:slug`), Hama flagship page, gallery, investor access-request page, privacy/terms, rule-based chatbot, ⌘K search, PWA.
- Investor portal is access-request only — no authenticated data room exists yet; UI must not imply otherwise.
- Chatbot is rule-based and must not make financial-return claims or promises of performance.
- Honest-content policy (binding, this codebase enforces it): no fabricated news, no stock photography posing as organizational activity, truthful per-program statuses (Active / In development / Pipeline).
- Published figures and program statuses (+$550M pipeline, country coverage, team) are owner-confirmed as approved for release.

## Brand Commitments

- Name and identity: AIABASD; logo at `client/public/logo.png`.
- Palette: burgundy `#5a1f2e` and gold `#f2a007` (from the logo).
- The "institutional HUD / sovereign terminal" aesthetic — protocol labels, monolithic editorial typography, restrained tech detailing — is a **binding brand direction** (owner decision): refinement happens within it, not against it.
- Arabic set in Noto Kufi Arabic (`font-arabic`); Plus Jakarta Sans display / Inter body / Space Grotesk mono.

## Evidence on Hand

- Real assets: five team photographs (`client/public/team/`), twelve partner logos (`client/public/partners/`), Hama project logo, one genuine event photograph (`client/public/gallery/events/event-group.jpg`), og-image and icon set.
- Absences future work must not fabricate: newsroom articles (empty until real announcements exist — CMS-wired), program photography beyond the event photo, verified testimonials beyond the three currently published, any authenticated investor documents.

## Product Principles

1. **Credibility is the product** — every surface must read as institutional truth; honesty beats impressiveness wherever they conflict.
2. **Trilingual parity is table stakes** — EN/AR/FR (with RTL) ship together or not at all; CI enforces it.
3. **Convert evaluation into conversation** — each page ends in a credible path to inquiry, never a dead end.
4. **Governance as visible artifact** — ESIA/ESMS, KYC/AML, and oversight are shown, not merely claimed.
5. **One codebase, two honest deployment paths** — never fake success in either.
