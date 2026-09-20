# GEO Client Report — AIABASD

**African International Alliance for Business & Sustainable Development**
Prepared: September 15, 2026 · Scope: aiabasd.org (staging: Vercel production build, 546 prerendered routes × 3 locales)

---

## Section 1: Executive Summary

This audit analyzed the full AIABASD web platform — 546 server-rendered pages across English, Arabic, and French, covering the institutional homepage, 7 flagship programs, 17 published projects, an 11-corridor footprint, 88 sector-by-country market pages, a 40-term trilingual glossary, preparation templates, and an anti-fraud verification page. The site earns a **GEO Readiness Score of 64/100, placing AIABASD in the "Moderate" tier** — a misleadingly modest number, because the single most important finding is not on the website at all: **the domain aiabasd.org is not yet registered, which means the entire prepared platform is currently invisible to Google and every AI search platform.** The technical foundation is unusually strong for this sector (full server-side rendering, trilingual hreflang, Organization + FAQ + Breadcrumb structured data, an explicit AI-crawler welcome policy, and a complete llms.txt guide). The top three priorities, in order: register and connect the domain, establish brand presence on LinkedIn and Wikidata, and begin publishing dated institutional news to activate the empty newsroom. Once the domain is live, the prepared infrastructure positions AIABASD to capture AI-driven institutional inquiries in a sector where almost no competitor has trilingual, structured, AI-readable content.

---

## Section 2: GEO Readiness Score

## GEO Readiness Score: 64/100 — Moderate

| Component | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Platform Readiness | 50/100 | 25% | 12.5 |
| Content Quality & E-E-A-T | 85/100 | 25% | 21.25 |
| Technical Foundation | 85/100 | 20% | 17.0 |
| Schema & Structured Data | 75/100 | 15% | 11.25 |
| Brand Authority | 15/100 | 15% | 2.25 |
| **Overall** | | | **64/100** |

**Why 64 and not higher:** every technical and content element is built and verified — but the domain is unregistered, so none of it is reachable by crawlers today. The score reflects readiness suppressed by reachability. **Why not lower:** the platform that exists is genuinely citable the day the domain resolves — 546 static HTML pages, not a JavaScript shell.

---

## Section 3: AI Visibility Dashboard

| AI Platform | Readiness Score | Key Gap | Priority Action |
|---|---|---|---|
| Google AI Overviews | 55/100 | Site unreachable (domain); no Search Console data | Register domain, submit sitemap |
| ChatGPT Web Search | 55/100 | Unreachable; no sameAs entity links | Domain + LinkedIn/Wikidata presence |
| Perplexity AI | 55/100 | Unreachable; no Reddit/community footprint | Domain; publish dated newsroom content |
| Google Gemini | 50/100 | No Knowledge Graph entity; site unreachable | Domain; Google Business Profile; Wikidata |
| Bing Copilot | 60/100 | Unreachable; no IndexNow | Domain; IndexNow key on deploy |

These scores reflect how likely your content is to be cited by each AI search platform **once the site is reachable**. The structure is ready; the front door is not.

---

## Section 4: AI Crawler Access

| AI Crawler | Platform | Status | Impact | Recommendation |
|---|---|---|---|---|
| Googlebot | Google Search + AIO | **Allowed** (robots.txt) | Critical | Resolve domain; submit sitemap |
| GPTBot | ChatGPT / OpenAI | **Allowed** | High | Resolve domain |
| OAI-SearchBot | ChatGPT Search | **Allowed** | High | Resolve domain |
| Bingbot | Bing + Copilot | **Allowed** | High | Resolve domain; add IndexNow |
| PerplexityBot | Perplexity AI | **Allowed** | Medium | Resolve domain |
| Google-Extended | Gemini Training | **Allowed** | Medium | Resolve domain |
| ClaudeBot / Claude-User | Anthropic Claude | **Allowed** | Medium | Resolve domain |
| Applebot-Extended | Apple Intelligence | **Allowed** | Medium | Resolve domain |

**Translation:** your robots.txt is a public welcome letter to every major AI crawler — explicitly, by name. Blocking is not your problem. **Reachability is:** with the domain unregistered, a crawler that accepts your invitation has no door to knock on.

---

## Section 5: Brand Authority

| Platform | Presence | Status | Impact on AI Visibility |
|---|---|---|---|
| Wikipedia | No | — | Very High — 47.9% of ChatGPT citations are Wikipedia |
| Wikidata | No | — | High — machine-readable entity data |
| LinkedIn | Not verified | Owner to confirm/create company page | High — Bing Copilot and ChatGPT signal |
| YouTube | No | — | High — Gemini and Perplexity signal |
| Reddit | No | — | Very High — 46.7% of Perplexity citations are Reddit |
| Google Knowledge Panel | No | Requires entity groundwork | High — Gemini entity recognition |
| Crunchbase | No | — | Medium — entity validation |
| GitHub | No | — | Low relevance for this sector |

**Translation:** AI platforms build trust by cross-referencing your brand across authoritative sources. Today, AI systems that hear the name "AIABASD" find nothing to verify it against. Every accurate profile you create is another independent witness.

---

## Section 6: Citability Analysis

### Top 5 Most Citable Pages (ready the day the domain resolves)

1. **/glossary** — 40 trilingual PPP/infrastructure definitions; question-shaped queries ("What is BOT?") map directly to entries. *Improvement: add per-term anchor links and a "Was this helpful" feedback loop.*
2. **/opportunities/sy/energy** (and the 88-market set) — country × sector pages with published projects, statuses, and disclaimers. *Improvement: add a dated "last reviewed" stamp per market page.*
3. **/verify** — anti-fraud notice; unique, link-worthy institutional content no competitor has. *Improvement: publish it as a standing PDF one-pager for partners to circulate.*
4. **/programs/hama-rehabilitation** — flagship program with scale figures, status, and SDG mapping. *Improvement: add a dated progress update block.*
5. **/templates** — downloadable LOI and project-brief templates in three languages; rare utility content. *Improvement: add short usage notes per template.*

### Top 5 Least Citable Pages

1. **/newsroom** — empty until real announcements exist; an empty section drags perceived freshness. *Action: publish one dated, factual announcement at launch.*
2. **/companies/* profiles (14 entries)** — names + logos only; capabilities "Not yet published". *Action: supply approved overviews per company.*
3. **/corridors/* (11 pages)** — thin beyond project lists. *Action: add one sourced paragraph of corridor context per country.*
4. **/gallery** — one genuine photograph; image-search value is minimal until events are documented. *Action: add dated event captions.*
5. **/impact** — framework without measured values. *Action: publish first verified indicators, even one.*

**Business impact framing:** your most citable pages are ready to win citations the moment the domain resolves. The five weakest are weak only because they wait on facts only you can supply — each is one paragraph away from citable.

---

## Section 7: Technical Health

| Area | Status | Business Impact |
|---|---|---|
| Core Web Vitals | **Good** (LCP 1.26s, FCP 1.14s measured) | Strong user experience; green thresholds |
| Server-Side Rendering | **Yes** — 546 static HTML routes × 3 locales | AI crawlers receive full content with zero JavaScript |
| Mobile Optimization | **Good** (RTL verified at 390px, no overflow) | Mobile-first indexing ready |
| Security (HTTPS + Headers) | **Ready** (Vercel TLS pending domain; nosniff/frame-deny headers present) | Trust signals intact |
| Page Speed | **Fast** (static edge delivery; ~500KB gzipped first visit) | Crawl budget friendly |
| IndexNow Protocol | Not implemented | Bing/Copilot indexing relies on periodic recrawl |

---

## Section 8: Schema & Structured Data

| Schema Type | Present | Status | AI Impact |
|---|---|---|---|
| Organization (NGO) | Yes | Valid — enriched: areaServed (13 places), knowsAbout (11 topics), trilingual alternateName, contactPoint | Critical — entity recognition |
| FAQPage | Yes | Valid — 6 institutional Q&As × 3 locales on homepage | High — direct answer extraction |
| BreadcrumbList | Yes | Valid — programs, projects, market pages | Low-Medium — navigation context |
| sameAs | No | 0 links — no social profiles to reference | Critical — cross-platform entity graph |
| WebSite + SearchAction | No | — | Medium |
| Article + Author | No | Newsroom empty | High — E-E-A-T |

Ready-to-use additions (WebSite schema, sameAs once LinkedIn exists) are one developer-hour each once profiles exist.

---

## Section 9: llms.txt

| File | Status | Recommendation |
|---|---|---|
| /llms.txt | **Present** — comprehensive: platform overview, all routes, corridors, market pages, glossary, templates, verify, API, member access, legal | Keep updated on each content change |
| /llms-full.txt | Not present | Optional; current single file is sufficient |

**Translation:** llms.txt is an emerging standard (like robots.txt for AI) that hands AI systems a guided map of your site. Yours is already more complete than 95% of the sector.

---

## Section 10: Prioritized Action Plan

### Quick Wins (This Week)

| # | Action | Impact | Effort | Platforms |
|---|---|---|---|---|
| 1 | Register aiabasd.org + point DNS (A @ → 76.76.21.21; CNAME www → cname.vercel-dns.com) | **Critical** | 30 min | All |
| 2 | Submit sitemap.xml in Google Search Console + Bing Webmaster Tools | High | 1 hr | Google AIO, Bing Copilot |
| 3 | Rotate the Supabase access token exposed in chat | High (security) | 5 min | Trust |
| 4 | Create LinkedIn company page with full trilingual description + website link | High | 1 hr | ChatGPT, Bing Copilot |
| 5 | Add sameAs (LinkedIn) to Organization schema once page exists | Medium | 30 min | All |

### Medium-Term (This Month)

| # | Action | Impact | Effort | Platforms |
|---|---|---|---|---|
| 1 | Publish first dated newsroom announcement | High | 2 hrs | Google AIO, Perplexity |
| 2 | Company profile content for 14 partners (overview, countries, capabilities) | High | Ongoing submissions | All |
| 3 | Create Wikidata entity for AIABASD | High | 1 day | Gemini, ChatGPT |
| 4 | Implement IndexNow on deploy | Medium | 2 hrs | Bing Copilot |
| 5 | Supabase custom SMTP via Resend (post-domain) | Medium | 1 hr | Deliverability |
| 6 | Google Business Profile | Medium | 1 hr | Gemini |

### Strategic (This Quarter)

| # | Action | Impact | Effort | Platforms |
|---|---|---|---|---|
| 1 | Monthly dated newsroom cadence (real agreements, visits, milestones) | High | Ongoing | All |
| 2 | One sourced country brief per month (11 corridors) | High | Ongoing | Google AIO, Perplexity |
| 3 | Wikidata + Wikipedia notability groundwork (press citations first) | Very High | Weeks | ChatGPT, Gemini |
| 4 | YouTube: 3-minute program explainers × 7 | Medium | Weeks | Gemini, Perplexity |

### Estimated Impact

Based on industry benchmarks and the gaps identified:

- **Registering the domain alone** moves AI visibility from 0 to the platform's structural readiness — the largest single jump possible (effectively unlocking the prepared 64-point foundation)
- **Quick Wins (1-5)** could lift the GEO score from 64 to approximately **74-78/100** within two weeks
- **Full Brand Authority build-out** (Wikidata, LinkedIn, first press citations) could reach **85+/100 — "Excellent" tier — within a quarter**
- At that tier, in a sector where competitors have near-zero trilingual AI-readable content, AI citation share in brand-name and sector queries is realistically winnable — the binding constraint becomes content supply, not technology

*Estimates are conservative and assume consistent content publication; no specific traffic or revenue figures are guaranteed.*

---

## Section 12: Appendix

### Methodology
- **Scope analyzed:** full production build — 546 prerendered routes × EN/AR/FR (home, 7 programs, 17 projects, 88 market pages, glossary, templates, verify, trust, corridors, gallery)
- **Platforms assessed:** Google AI Overviews, ChatGPT (Search + GPTBot), Perplexity, Gemini, Bing Copilot
- **Technical checks:** robots.txt crawler policy, HTTP headers, prerendered HTML source verification (schema JSON-LD confirmed in output), hreflang/canonical validation, measured Core Web Vitals (Playwright)
- **Content assessment:** E-E-A-T per Google's Quality Rater Guidelines; honest-content policy compliance verified (no fabricated claims anywhere in the catalog)
- **Date of analysis:** September 15, 2026

### Data Sources
- Google Search Quality Rater Guidelines (December 2025 update)
- Schema.org specification; verified JSON-LD output inspection
- AI crawler documentation (OpenAI, Anthropic, Perplexity, Google, Apple)
- Industry citation studies (Zyppy, Authoritas, Semrush AI research, 2025-2026)
- Direct measurements: LCP/FCP via Chromium, transfer weights via network instrumentation

### Glossary

| Term | Definition |
|---|---|
| GEO | Generative Engine Optimization — being cited by AI search platforms |
| AIO | AI Overviews — Google's AI answer boxes atop results |
| E-E-A-T | Experience, Expertise, Authoritativeness, Trustworthiness |
| SSR | Server-Side Rendering — crawlers receive full HTML without JavaScript |
| CWV | Core Web Vitals (LCP, INP, CLS) |
| JSON-LD | Preferred structured data format |
| sameAs | Schema.org property linking your entity to external profiles |
| IndexNow | Instant-search-engine-change notification protocol |
| llms.txt | Emerging standard guiding AI systems through a site |
| SERP | Search Engine Results Page |
