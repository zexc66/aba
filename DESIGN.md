# Design System: AIABASD — Sovereign Terminal

**Project:** AIABASD public website (African International Alliance for Business & Sustainable Development)
**Status:** Reverse-engineered from the committed codebase. This document describes what the code *does*, not an aspiration.
**Binding source of truth:** [`client/src/index.css`](client/src/index.css), [`PRODUCT.md`](PRODUCT.md), and the components cited inline below.
**Audience:** design agents and engineers making changes. Match this system exactly; refinement happens *within* it, not against it (PRODUCT.md, "Brand Commitments").

---

## Configuration — The dials as actually committed

| Dial | Level | Justification from code |
|------|-------|-------------------------|
| **Creativity** | `6` | Editorial confidence without expressive chaos. Numbered section headers (`SectionHeader` `index="02"`), protocol strings (`PROTOCOL_ID: HMA-RESTORE-077` in [`HamaHUD.tsx:20`](client/src/components/hama/HamaHUD.tsx)), hairline rules — but headings stay in one family at one weight range, no inline-image typography, no type experiments. |
| **Density** | `7` | Cockpit-dense. Ledger rows over cards ([`Programs.tsx:99-152`](client/src/components/home/Programs.tsx)), 1px-gap data grids (`gap-px bg-black/10 border border-black/10`, 12+ instances), a sticky-column compare table ([`Projects.tsx:280-330`](client/src/pages/Projects.tsx)), fact strips, readiness meters. Sections run `py-16`/`py-20` — tight for a marketing site, deliberately. |
| **Variance** | `5` | Subtle offsets, not artsy chaos. Repeated container/grid rhythm across 32 files; variance is delivered by **color banding** and **asymmetric column splits** (`lg:grid-cols-12` at 5/7 and 8/4), not by reinventing each section. The Hama flagship page is the one authored exception (full-bleed HUD frame, oversized type). |
| **Motion Intent** | `4` | Restrained. framer-motion only, `whileInView` + `viewport={{ once: true }}`, 0.16–0.7s durations, `useReducedMotion` honored at the component level *and* globally in CSS ([`index.css:252-261`](client/src/index.css)). No perpetual loops except three: the loader logo float, `animate-pulse` on active status dots, and the chatbot typing dots. |

> Institutional credibility is the product (PRODUCT.md, Principle 1). Every dial above is set by that constraint: dense enough to read as an operator's instrument, quiet enough to read as a fiduciary's document.

---

## 1. Visual Theme & Atmosphere

**Sovereign terminal / institutional HUD.** The site should read like a governed instrument that happens to be public — a deal-room console, not a brochure. Three moves create it:

1. **Square geometry, hairline structure.** Radii are effectively zero. `--radius-sm: 0.125rem`, `--radius-lg: 0.1875rem` ([`index.css:7-10`](client/src/index.css)) — small enough to be invisible — and components hard-code no radius at all. Structure is carried by 1px hairlines at 5–15% opacity and by 1px *gaps* in grids (background bleeding through as the rule).
2. **Protocol language as ornament.** Uppercase, tracked, monospaced metadata replaces decorative graphics: `PROJECT_PORTFOLIO`, `OPPORTUNITY_PORTFOLIO`, `AUTHORIZED_ACCESS`, `CRYPTO_VERIFIED`, `SYS_NODE: 0x82_HAMA`, `REVIEW / DIRECTORIAL`. Numbers are zero-padded (`String(i + 1).padStart(2, "0")`).
3. **Paper, not screen.** A fixed fractal-noise grain overlay sits above everything at `opacity: 0.028`, `z-index: 90`, `pointer-events: none` ([`index.css:300-308`](client/src/index.css)). It is the single global texture and must never be duplicated per-section.

Atmosphere in one line: **warm off-white paper, burgundy authority, gold as the only signal light, and a grain of dust over the glass.**

---

## 2. Color Palette & Roles

### Brand core (from the logo — binding, PRODUCT.md)

| Token | Hex | Role | Usage count in `client/src` |
|-------|-----|------|------|
| `--brand-burgundy` | `#5a1f2e` | Primary. Authority, all primary CTAs, active states, focus ring, section index numerals, link underlines, selection tint, scrollbar thumb. | **1022** |
| `--brand-gold` | `#f2a007` | Accent/signal only. Progress fills, hover-reveal rules, dark-surface focus + CTA, "in development" status, HUD emphasis. | **236** |
| `paper` | `#fdfcfb` | Light canvas + all text on dark surfaces. Warm off-white — never `#ffffff` for a page canvas. | **394** |
| `ink` | `#0b0b10` | Near-black. Body text on light, and the dark-band surface. Never `#000000`. | **359** |

### Surface steps

| Value | Role |
|-------|------|
| `#fdfcfb` | Light canvas (`--background`). Default section band. |
| `#ffffff` | Card fill on the light canvas *only* (`bg-white` on `ProjectCard`, filter cells, form fields on focus). One step brighter than the canvas — this is the only legitimate use of pure white. |
| `#F9F8F6` | Scrolled header chrome + mobile sheet ([`Header.tsx:189,326`](client/src/components/home/Header.tsx)). Slightly cooler than paper so the fixed bar separates from content. |
| `#f4f2ee` | `--muted` / `--accent`, light scrollbar track. |
| `#0b0b10` | Dark band surface (Hero, Team, compare table, investor portal, admin). |
| `#11111a` | **Dark surface step +1** — panel/cell fill inside a dark band. 21 uses: portal stat cells, admin cards, select menus on dark. This is how you get elevation on dark without a shadow. |
| `#121216` / `#101116` | Vestigial (`--card` in `.dark`, dark scrollbar track). Do not introduce new uses; use `#11111a`. |

### Hairlines and alpha ladders

- **On light:** `border-black/5` (whisper) → `border-black/10` (**default**) → `border-black/15` (input, emphasis) → `border-[#5a1f2e]/40` (hover/active). `--border` is `rgba(11,11,16,0.08)`.
- **On dark:** `border-white/10` (**default**) → `border-white/15` (input, panel) → `border-white/20-45` (button outline on imagery).
- **Text on light:** `text-[#0b0b10]` (primary) → `/70` (secondary body) → `/65` (card body) → `/60` (metadata) → `/45–/40` (disabled, timestamps).
- **Text on dark:** `text-[#fdfcfb]` → `/75` (body) → `/60` (metadata) → `/45` (placeholder) → `/40` (labels in stat cells).
- **Tint fills:** `bg-[#5a1f2e]/[0.06]` and `bg-[#f2a007]/[0.12]` for status; `bg-white/[0.06]` for form fields on dark; `bg-[#5a1f2e]/[0.035]` for ledger-row hover.

### Status tone language

Two parallel systems exist. **The brand-tinted system is canonical:**

```
// ProjectCard.tsx — canonical
"under-development" | "cooperation-framework"  → text-[#5a1f2e] bg-[#5a1f2e]/[0.06] border-[#5a1f2e]/20
"seeking-partners"  | "investment-opportunity" → text-[#6b4a00] bg-[#f2a007]/[0.12] border-[#f2a007]/30
"technical-assessment" | "seeking-financing"
  | "procurement-opportunity" | "strategic-vision" → text-black/60 bg-black/[0.03] border-black/15

// Programs.tsx — canonical, three-tone
active   → text-[#5a1f2e] bg-[#5a1f2e]/10  border-[#5a1f2e]/25   dot bg-[#5a1f2e] animate-pulse
dev      → text-[#0b0b10] bg-[#f2a007]/25  border-[#f2a007]/55   dot bg-[#f2a007]
pipeline → text-[#0b0b10]/60 bg-[#0b0b10]/5 border-[#0b0b10]/10  dot bg-[#0b0b10]/40
```

`#6b4a00` is the **gold-on-light text darkening** — gold at 4.5:1 is unreadable, so gold-tinted chips take this burnt-amber ink. Use it, never `#f2a007` as body text on paper.

**Tailwind semantic tones (`emerald` / `amber` / `red`) are permitted only for transient system feedback**, and only in these forms found in code: submission success (`border-emerald-200 bg-emerald-50 text-emerald-900`, [`SubmitProject.tsx:304`](client/src/pages/SubmitProject.tsx)), form error (`border-red-200 bg-red-50 text-red-800`, [`SubmitProject.tsx:755`](client/src/pages/SubmitProject.tsx)), chatbot liveness dot (`bg-emerald-400`), toast variants. They are **banned for content-derived status** (program/project state) — see §8 and the variance note in §10.

### The max-accent rule, as practiced

**Gold is a signal, not a color.** Per viewport, gold appears at most as: one hover-reveal rule (`h-[2px] w-0 → w-full`), one data fill (readiness bar), and one metadata mark. Gold as a *fill* is reserved for exactly one element per screen — the flagship CTA on dark ([`Programs.tsx:91`](client/src/components/home/Programs.tsx)) or the header investor button on transparent chrome. Burgundy carries every other emphasis. If two gold fills are visible simultaneously, one is wrong.

---

## 3. Typography Rules

### The real stack ([`index.css:31-35`](client/src/index.css), loaded in [`client/index.html:39-42`](client/index.html))

| Role | Family | Class / var | Weights loaded |
|------|--------|-------------|----------------|
| Display (all `h1`–`h6`) | **Plus Jakarta Sans** | `--font-display` | 400–800 |
| Body / UI | **Inter** | `--font-sans`, `--font-institutional` | 300–900 |
| Technical / data | **IBM Plex Mono** | `--font-mono` | 400–600 |
| Arabic (all headings when `lang="ar"` or `dir="rtl"`) | **Noto Kufi Arabic** | `--font-arabic` | 400–800 |

Single Google Fonts request with `preconnect` to `fonts.googleapis.com` + `fonts.gstatic.com` (crossorigin) and `display=swap`; both origins are `CacheFirst`-cached for one year by the PWA workbox config ([`vite.config.ts:49-76`](vite.config.ts)).

> **Contradiction:** PRODUCT.md line 40 says "Space Grotesk mono." The code has never used Space Grotesk; the mono is IBM Plex Mono. Treat the code as authoritative and correct PRODUCT.md, not the CSS.

### Global base ([`index.css:104-134`](client/src/index.css))

```
body   → Inter, line-height 1.6, letter-spacing -0.01em, antialiased, optimizeLegibility
h1-h6  → Plus Jakarta Sans, letter-spacing -0.02em, line-height 1.1
ar h1-h6 → Noto Kufi Arabic, letter-spacing 0
```

### The two technical classes — use these, don't re-roll them

```css
.t-meta { font-family: IBM Plex Mono; font-size: 11px; line-height: 1.35;
          letter-spacing: 0.08em; text-transform: uppercase; }
.t-data { font-family: IBM Plex Mono; font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em; }
.hud-label { text-[10px] font-semibold uppercase tracking-wider opacity-60; }
.hud-value { text-xs font-mono opacity-80; }
```

`t-meta` is the workhorse — **383 uses across 46 files**. It is the label, the eyebrow, the button text, the table header, the status chip, the breadcrumb. It is frequently pinned down to `text-[10px]` when it sits inside a chip or a card (`t-meta text-[10px]`); 11px is the default, 10px is the dense variant. `t-data` handles every numeral that can change: indices, percentages, timestamps, coordinates, table cells.

### Scale ladder observed

| Level | Classes | Where |
|-------|---------|-------|
| Page/section title | `text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight` | `SectionHeader` — the single source for section titles |
| Hero H1 | `text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05]` | [`Hero.tsx:50`](client/src/components/home/Hero.tsx) |
| Flagship card H3 | `text-2xl md:text-3xl font-bold leading-tight` | Programs featured block |
| Ledger row H3 | `text-xl font-bold leading-snug` | Programs list |
| Card H3 | `text-lg font-bold leading-snug` | ProjectCard |
| Body | `text-sm` (dense) / `text-base md:text-lg` (hero, section note) `leading-relaxed` | everywhere |
| Metadata | `t-meta` 11px, or `text-[10px]` in chips | everywhere |
| HUD micro | `text-[6px]`–`text-[8px]` with `tracking-[0.5em]`–`tracking-[2em]` at `opacity-20` | Hama HUD only |

### Hard rules

- **Tabular numerals for anything that changes.** `t-data` or `tabular-nums` — 42 sites. Any number in a table, meter, timestamp, or counter must not jitter.
- **Measure capped at 65ch.** `max-w-[65ch]` on section notes ([`SectionHeader.tsx:52`](client/src/components/ui/SectionHeader.tsx)); `max-w-2xl`/`max-w-3xl` on hero and flagship prose.
- **`text-wrap: balance` on `h1,h2,h3`; `text-wrap: pretty` on `p`** — global, [`index.css:287-293`](client/src/index.css). Never re-declare per component; `text-balance`/`text-pretty` utilities are used only on elements that aren't `h1-h3`/`p` (e.g. loader lockup).
- **Latin tracking is stripped in Arabic.** `html[lang="ar"]` forces `letter-spacing: 0 !important` on `.tracking-*` and `.hud-label`, and `.t-meta` loses `text-transform` as well ([`index.css:263-298`](client/src/index.css)). Never fight this with inline styles — a prior attempt to scope an RTL letter-spacing override in `HamaProject.tsx` was reverted.
- **Latin-only strings get `dir="ltr"`** even inside an RTL page: tag lists, indices, timestamps, table column heads.

---

## 4. Component Stylings

### Buttons

Square. Uppercase tracked `t-meta` for institutional actions; `font-semibold text-sm` for prose-adjacent CTAs. Three tiers:

```
Primary (light):  bg-[#5a1f2e] text-[#fdfcfb] hover:bg-[#0b0b10]  px-5/6 py-3  min-h-11
Primary (dark):   bg-[#f2a007] text-[#0b0b10] hover:bg-[#fdfcfb]  px-6 py-3
Secondary:        border border-black/15 bg-white text-[#5a1f2e] hover:border-[#5a1f2e]
Secondary (dark): border border-[#fdfcfb]/45 bg-[#0b0b10]/35 hover:bg-[#fdfcfb]/10 hover:border-[#fdfcfb]
Tertiary:         t-meta text-[#5a1f2e] border-b border-[#5a1f2e]/30 hover:border-[#5a1f2e] pb-0.5
```

- **Tactile press is global, not per-button.** [`index.css:329-337`](client/src/index.css) gives every `a[href]` and enabled `button` `transform: scale(0.98)` on `:active` over `160ms cubic-bezier(0.23,1,0.32,1)`. Opt out with `.no-press` when the element has its own press treatment (header chrome, chatbot FAB). Components that want a vertical press instead use `active:translate-y-px`; card-internal controls use `active:scale-95` / `active:scale-[0.98]`.
- **Focus is doubled on purpose.** Global `:focus-visible { outline: 2px solid #5a1f2e; outline-offset: 2px; border-radius: 2px }` plus an explicit per-component recipe: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2` on light, `outline-[#f2a007]` on dark. **On any dark surface the focus ring is gold** — burgundy on `#0b0b10` is invisible.
- **Icons:** lucide-react only, `strokeWidth={1.5}` (1.75 in the chatbot), sized 12–20px inline. Directional icons carry `rtl:-scale-x-100` (or `rtl:rotate-180` where the glyph is an arrow inside a rotating group).
- **Transitions name their properties**: `transition-[color,background-color,transform]`, not `transition-all`. `button-magnetic` (`transition-all duration-300`) is defined in CSS but unused — do not adopt it.

### Cards vs. ledger rows

**Use a card when the item is a scannable object** (projects, team, partners). **Use a ledger row when the item is a list entry with parallel fields** (programs, pipeline, governance). Cards under ~6 items; rows above.

```
Card:   bg-white border border-black/10 p-7 flex flex-col
        hover:border-[#5a1f2e]/40 transition-colors duration-300
        + absolute top-0 start-0 h-[2px] w-0 bg-[#f2a007] group-hover:w-full duration-500
Ledger: border-y border-[#0b0b10]/10 divide-y divide-[#0b0b10]/10  (container)
        row: grid lg:grid-cols-[4.5rem_minmax(0,1.1fr)_minmax(18rem,0.9fr)_auto] py-7
             hover:bg-[#5a1f2e]/[0.035] active:translate-y-px
             + absolute h-px w-0 bg-[#f2a007] group-hover:w-full
```

The **gold wipe rule** (`w-0 → group-hover:w-full`) is the shared hover signature for both. It is always `aria-hidden`, always gold, always horizontal.

**Shadows are tinted, never neutral-grey drop shadows:**

```css
.shadow-premium      { 0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.03) }
.shadow-premium-lg   { 0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -1px rgba(0,0,0,.02) }
.shadow-premium-2xl  { 0 24px 48px -12px rgba(90,31,46,.14), 0 8px 16px -8px rgba(11,11,16,.08) }
```

The `-2xl` step is **burgundy-tinted** — that is the whole point of the family. Ad-hoc shadows follow the same law: `shadow-[0_18px_60px_rgba(90,31,46,0.18)]` (language menu), `shadow-[0_24px_70px_rgba(90,31,46,0.20)]` (chatbot panel), `shadow-[0_4px_12px_rgba(90,31,46,0.3)]` (portal submit). Never `shadow-lg`/`shadow-xl` from Tailwind defaults. On dark surfaces, elevation is `#11111a` + a hairline, not a shadow.

### Forms

Label above, monospaced. Field square with hairline. Error below, `role="alert"`.

```
Light field ([SubmitProject.tsx:169] `fieldClass`):
  w-full min-h-11 border border-black/10 bg-[#fdfcfb] px-4 py-3 text-sm text-[#0b0b10]
  caret-[#5a1f2e] placeholder:text-black/45
  focus:border-[#5a1f2e] focus:bg-white
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5a1f2e] focus-visible:outline-offset-2

Dark field (InvestorLogin):
  w-full bg-white/[0.06] border border-white/15 px-4 py-3 text-sm text-[#fdfcfb]
  placeholder:text-[#fdfcfb]/45 outline-none
  focus:border-[#f2a007] focus-visible:ring-1 focus-visible:ring-[#f2a007]
  (selects fill bg-[#11111a] so the native option list matches)

Label: block t-meta text-[10px] text-black/70   (dark: text-[#fdfcfb]/70)
Stack gap: space-y-1.5 (dark) / space-y-2 (light); field groups space-y-5..7
Required: visible " *" in the label + required + aria-required="true"
Error:   mt-7 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800  role="alert"
Success: border border-emerald-200 bg-emerald-50 p-8 text-emerald-900  role="status" aria-live="polite"
Checkbox: accent-[#f2a007] on dark; consent row separated by border-t border-white/10 pt-4
```

Caret color is themed globally: `#5a1f2e` on light, `#f2a007` on dark surfaces ([`index.css:499-512`](client/src/index.css)). No floating labels. No placeholder-as-label.

**Multi-step forms** use a top step-rail of `border-t-2` buttons — current `border-[#5a1f2e] font-bold`, completed `border-[#f2a007]`, locked `border-black/10 text-black/40 cursor-not-allowed` with `disabled` — and `aria-current="step"` ([`SubmitProject.tsx:330-348`](client/src/pages/SubmitProject.tsx)).

### Loader

Not a spinner and not a skeleton — a **HUD calibration frame** ([`PageLoader.tsx`](client/src/components/PageLoader.tsx)):

- Full-bleed `bg-[#fdfcfb]`, `z-[100]`, `role="status" aria-live="polite"`.
- Four hairlines at third/quarter positions (`inset-x-0 top-1/3 h-px bg-[#5a1f2e]/10`, `bottom-1/3 h-px bg-[#f2a007]/20`, `inset-y-0 start-1/4` / `end-1/4 w-px bg-[#0b0b10]/5`) plus an `inset-10 border border-[#0b0b10]/5` frame — this is the signature.
- Logo with a 2.4s ±4px float and a pulsing burgundy aureole (`border-[#5a1f2e]/20` + `shadow-[0_18px_45px_rgba(90,31,46,0.12)]`).
- Determinate bar: `h-1.5 w-[200px] bg-[#0b0b10]/10` with `bg-[#5a1f2e]` fill driven by `style={{ scaleX: progress/100 }}` and `origin-start` (RTL-safe).
- Inline busy states elsewhere use `<Loader2 className="animate-spin" />` — acceptable *inside a button*, never as a page loader.

### Tables and data grids

Two devices, both square:

1. **1px-gap grid** — `grid ... gap-px bg-black/10 border border-black/10` with each cell `bg-[#fdfcfb]` (dark: `gap-px bg-white/10 border border-white/10`, cells `bg-[#11111a]`). The gap *is* the rule; no per-cell borders. 12+ instances (filters, stat strips, partners, team, impact, services).
2. **Compare table** — `overflow-x-auto border border-white/10 scrollbar-sov-dark` wrapping `<table className="min-w-[760px] w-full border-collapse text-start text-sm">`, with the row-label column **sticky at the inline start**: `sticky start-0 z-10 w-44 min-w-44 bg-[#0b0b10] p-4 text-start align-top text-[10px] uppercase tracking-wider text-white/60 border-e border-white/10 break-words`. Data columns `min-w-[200px] max-w-[320px] border-s border-white/10`; a "candidate" column is distinguished by `border-dashed border-white/15 bg-white/[0.02]`.

Horizontal scrollers on dark use `.scrollbar-sov-dark` (6px, gold thumb on `#0b0b10`); on light, `.scrollbar-sov-light` (6px, `rgba(90,31,46,0.3)` thumb). Global scrollbar is 10px with a burgundy thumb on `#f4f2ee`, gold on hover.

### Status pills

Square chip + optional square dot. Never rounded, never a badge with a shadow.

```
<span class="inline-flex items-center gap-1.5 t-meta px-2.5 py-1.5 border {TONE}">
  <span class="w-1.5 h-1.5 {DOT}" />   ← square, 6px; animate-pulse motion-reduce:animate-none when live
  {label}
</span>
```

The one place a pill is also a control — the status legend on `/projects` — wraps `StatusBadge` in a `min-h-11` button with `aria-pressed` and `opacity-40` for the unselected state.

### Meters

`h-1.5 bg-black/[0.06]` track + `bg-[#f2a007]` fill via inline `width: {n}%`, wrapped in `role="progressbar"` with `aria-valuenow/min/max` and an `aria-label`. The label row is `t-meta` left, `t-data` right.

---

## 5. Layout Principles

- **Container:** `mx-auto max-w-[1500px] px-6 md:px-12 lg:px-24` — **68 occurrences across 32 files**. This is the rhythm; do not introduce a second container width. (Exception: the fixed header runs `max-w-[1700px] px-8 lg:px-12` so the chrome outruns the content; the legacy `.container` component class in `index.css` caps at 1280px and is not used by any page.)
- **Section banding is the primary compositional device.** Sections are full-bleed color blocks separated by `border-b border-black/10`. Home order: dark Hero (`#0b0b10`) → a long light run (About, Programs, Featured Projects, Countries, Governance, Newsroom, Testimonials, Partners — all `bg-[#fdfcfb]`) → **dark Team** (`bg-[#0b0b10] text-[#fdfcfb]`, no bottom border) → light Contact. Dark bands are earned: they mark the human/institutional anchor points and the private surfaces (investor portal, admin, compare table, opportunity map). Two adjacent dark bands are a smell.
- **Section headers are centralized.** [`SectionHeader`](client/src/components/ui/SectionHeader.tsx) is the only way to open a section: a `grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3.5rem_1fr_auto]` with a `t-meta t-data` index (`"01"`, `"02.1"`, `"P"`), the title, a 65ch note, a `h-px w-16 lg:w-40` rule that draws in, and an uppercase `meta` slug. It closes with `mt-8 h-px w-full`. Pass `dark` to flip the ladder (`bg-white/15` rule, `text-[#f2a007]` index).
- **Asymmetry over symmetry.** 12-column grids split 5/7 (Hero: copy left, live map right), 8/4 (flagship card), and `xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]` (featured projects). Equal thirds are used only for genuine peer data (`grid-cols-3` stat strips).
- **`grid-flow-dense`** is used on the Hama stat/phase grids so odd-count cells backfill rather than leaving holes. Reach for it whenever a `gap-px` grid can end ragged; alternatively drive the column count from the item count (the `FACT_COLS` lookup pattern in `ProjectDetail.tsx`).
- **`min-w-0` guards are mandatory.** `.flex { min-height: 0; min-width: 0 }` is set globally ([`index.css:163-166`](client/src/index.css)) because long Arabic and French strings blow out flex children. Add `min-w-0` + `break-words` on any flex/grid child holding localized text, and `whitespace-nowrap` only on short button labels.
- **Sticky rails:** `sticky top-28` (matching `scroll-mt-24`/`scroll-mt-28` on sections) for detail-page asides, the submission readiness panel, and the match summary.
- **Z-index layers, no spam:** `z-0/z-10` in-section, `z-40` mobile sheet, `z-50` header + menus, `z-[60]` chatbot, `z-90` grain overlay, `z-[100]` loader + Hama HUD frame.

---

## 6. Motion & Interaction

- **framer-motion is the only animation library.** No GSAP, no Lottie, no CSS keyframe libraries beyond `tw-animate-css` and the single local `shimmer` keyframe.
- **Reduced motion is honored twice.** Globally, `prefers-reduced-motion: reduce` clamps all animation/transition to `0.01ms` and kills smooth scroll ([`index.css:252-261`](client/src/index.css)). Per-component, `useReducedMotion()` gates every non-trivial transition (`shouldReduceMotion ? { duration: 0 } : {...}`) and every `repeat: Infinity` loop is skipped entirely. Both layers are required — the CSS clamp does not stop a JS-driven infinite loop from burning frames.
- **Canonical easings** ([`client/src/lib/motion.ts`](client/src/lib/motion.ts)):
  ```ts
  EASE_INSTITUTIONAL = [0.16, 1, 0.3, 1]     // also --ease-institutional in CSS
  EASE_PRESS         = [0.23, 1, 0.32, 1]    // matches the global :active transform
  SPRING_DRAWER      = { type: "spring", duration: 0.5, bounce: 0.2 }
  REVEAL             = { initial:{opacity:0,y:16}, whileInView:{opacity:1,y:0},
                         viewport:{once:true}, transition:{duration:0.4, ease:EASE_INSTITUTIONAL} }
  ```
  Also seen: `[0.32, 0.72, 0, 1]` for sheet/drawer slides.
- **Durations in the committed range:** `0.16s` (menu open) · `0.2s` (chatbot, icon swap) · `0.3s` (color/hover, loader fade) · `0.35s` (mobile sheet) · `0.4–0.45s` (reveals) · `0.5s` (gold wipe) · `0.55–0.6s` (hero/title) · `0.7s` (hero map) · `0.9s` (header rule draw). Hama's authored page stretches to `0.7–1.0s`. Anything above 1s outside Hama is wrong.
- **Reveal pattern:** `initial={false}` + `whileInView` + `viewport={{ once: true }}`, stagger capped — `delay: Math.min((index % 3) * 0.05, 0.15)`. Above-the-fold elements use `initial={false}` so prerendered HTML never flashes empty.
- **One authored moment per page.** The home page spends it on the Hero's map reveal; `/hama-project` spends it on the HUD frame and parallax (flattened under reduced motion); the loader spends it on the calibration frame. Everything else is a 300ms color change.
- **No scroll listeners.** Zero `addEventListener("scroll")` / `window.scrollY` / `onScroll` in the codebase. Scroll state comes from framer's `useScroll` + `useMotionValueEvent` (header, at a 40px threshold) and section activity from `IntersectionObserver` with `rootMargin: "-28% 0px -58% 0px"` and a ratio-sorted visible map ([`Header.tsx:83-101`](client/src/components/home/Header.tsx)).
- **Transform and opacity only.** Progress bars animate `scaleX` with `origin-start`/`origin-left`, not `width` — except the readiness meter, which sets a static `width` once (not animated). Hover translations are disabled wholesale on coarse pointers via a `@media not ((hover: hover) and (pointer: fine))` block that neutralizes `hover:translate*`/`hover:scale*`/`group-hover:*` transforms.
- **The three permitted perpetual loops:** loader logo float + aureole pulse, `animate-pulse` on an *active* status dot, chatbot typing dots. All carry `motion-reduce:animate-none`.

---

## 7. Responsive & RTL

- **Breakpoint spine:** `sm 640` · `md 768` · `lg 1024` · `xl 1280`. Multi-column grids are declared `grid-cols-1` first and opened at `md`/`lg`. Desktop nav appears at `lg`; the investor CTA at `xl`.
- **Single-column collapse is absolute.** Every `lg:grid-cols-12`, ledger row, and `gap-px` grid stacks at mobile; `items-start lg:items-center` keeps stacked rows top-aligned.
- **Touch targets ≥ 44px:** `min-h-11` / `h-11 w-11` / `min-h-12` — 40 sites. Every icon-only control (save, compare, close, step) is `h-11 w-11`. Header icon buttons use `p-3` around a 16–20px glyph.
- **Full-height uses `min-h-[100dvh]`**, never `h-screen`.
- **Logical properties throughout:** `ps-*/pe-*`, `ms-*/me-*`, `start-*/end-*`, `border-s/border-e`, `text-start`, `origin-start`, `inset-inline`. Physical `left/right` appears only where the direction is computed in JS (`isRTL ? "left-0" : "right-0"` on the language menu, plus its `transformOrigin`).
- **Directional icons flip:** `rtl:-scale-x-100` is the default; `rtl:rotate-180` where an arrow also translates on hover (`rtl:group-hover:-translate-x-1`).
- **Arabic-specific guards:** headings swap to Noto Kufi with `letter-spacing: 0`; all `.tracking-*` and `.hud-label` tracking is force-zeroed; `.t-meta` drops its uppercase transform. Latin-only content (tags, indices, times, table heads) is wrapped in `dir="ltr"`. Long-string overflow is handled with `min-w-0` + `break-words`, never truncation.
- **No horizontal page scroll.** Where a wide artifact is unavoidable (compare table, opportunity map, country chip rail), it lives in its own `overflow-x-auto` region with `min-w-[…]` inside and a themed thin scrollbar; the chip rail additionally hides its scrollbar and uses `snap-x`.
- **Language is a persisted choice** (localStorage), switched in the header menu (EN / العربية / FR) and in the Hama HUD, with `Escape` + arrow-key handling and focus return.

---

## 8. Anti-Patterns (Banned)

1. **No decorative gradients.** Only 5 gradients exist in the entire client, all functional: the hero photo scrim (`from-[#0b0b10]/75 via-[#0b0b10]/55 to-[#0b0b10]`), two grid-line background patterns (`linear-gradient(...) 1px, transparent 1px`), and a data-derived one. A gradient that exists to look nice is banned.
2. **No rounded corners.** Radii are ~0 by token. Exceptions in code: status/typing **dots** (`rounded-full` at 6–8px) and the `w-20 h-20` HUD reentry disc. `rounded-lg`, `rounded-2xl`, pill shapes: banned.
3. **No pure `#000000` / `#ffffff` as canvas or text.** Ink is `#0b0b10`, paper is `#fdfcfb`. `bg-white` is permitted **only** as a card fill one step above the light canvas; `text-white`/`bg-black/x` alpha utilities are fine because they resolve as tints on a tinted ground.
4. **No neutral drop shadows.** `shadow-md`/`shadow-lg`/`shadow-xl` and any `rgba(0,0,0,…)` beyond the two whisper steps are banned. Elevation is `shadow-premium*` (burgundy-tinted), a hairline, or a surface step.
5. **No emoji, anywhere** — UI, alt text, copy, commit messages.
6. **No unicode-glyph icons** (`→`, `✓`, `★`) as UI iconography. lucide-react only. The one tolerated literal is a middot separator `·` in tag lists and a `→` inside a translated CTA string.
7. **No stock or placeholder imagery — honest-content policy (binding, PRODUCT.md).** `picsum.photos`, Unsplash, and generic stock are banned and absent from `client/`. Only real assets ship: five team photographs, twelve partner logos, one genuine event photograph, the Hama logo, the icon set. Where a real image does not exist, use a **geometric anchor** instead — see `SECTOR_ICONS` in [`ProjectCard.tsx:34`](client/src/components/projects/ProjectCard.tsx) ("Per-sector geometric anchors (no stock imagery)"). Never fabricate news, testimonials, or program photography.
8. **No purple/violet "AI" gradients**, no neon glows, no glassmorphism blur stacks. `.glass*` classes exist in CSS but are plain white/`#121216` fills with a hairline — deliberately de-glassed. The only `backdrop-blur` is on the scrolled header.
9. **No pill buttons**, no full-round CTAs, no gradient-filled buttons.
10. **No unmotivated animation.** No parallax without a reason, no perpetual loops beyond the three named in §6, no entrance animation on content that was server-prerendered above the fold.
11. **No window scroll listeners** (`addEventListener("scroll")`, `window.scrollY`, `onScroll`). Use `useScroll`/`useMotionValueEvent` or `IntersectionObserver`.
12. **No `transition-all`.** Name the properties.
13. **No `emerald`/`amber`/`red` for content status.** Those tones are reserved for transient system feedback (form error/success, toast, liveness dot). Program and project status use the brand-tinted tables in §2.
14. **No new container widths, no new font families, no new hex values.** If a value isn't in §2 or §3, it doesn't exist.
15. **No claims the product can't back.** The investor portal is access-request only — UI must not imply an authenticated data room. The chatbot is rule-based and must never state financial returns.

---

## 9. Trilingual & Deployment Notes

- **EN / AR / FR parity is enforced in CI.** [`scripts/check-i18n-parity.ts`](scripts/check-i18n-parity.ts) runs in `.github/workflows/ci.yml`; every copy key must exist in all three locales. Copy lives in `client/src/data.tsx` (plus `localizedCopy.ts`, `submissionCopy.ts`, `mapCopy.ts`, `projects.ts`), optionally overridden by Contentful. **A design change that adds a string adds it three times or it does not ship.**
- **Locale path namespaces:** EN is bare (`/projects`), AR and FR are prefixed (`/ar/projects`, `/fr/projects`) via `localizedPath()`. Hash links pass through unchanged so homepage section nav stays local (never `/ar#about`). Wouter's nested `Router` prepends its base, so `Link` targets must use `localizedLinkPath()`, which emits the `~` escape (`~/ar/projects`) to prevent `/ar/ar/...`. Protocol-relative (`//`) and non-absolute paths are returned untouched.
- **`Link` requires `asChild`.** wouter v3 renders its own `<a>` otherwise; every internal link in this codebase is `<Link asChild href={localizedLinkPath(...)}><a className=…>…</a></Link>` so styling and nested-anchor validity hold.
- **Base-path assets:** all `/public` references go through `deployAssetPath()`, which prefixes `import.meta.env.BASE_URL` (set from `VITE_BASE`) for sub-path builds (GitHub Pages). Never hard-code `/logo.png` in a `src`.
- **Vercel public boundary:** `isVercelDeployment` (from `define: { "import.meta.env.VERCEL": … }`) gates private UI. `VERCEL_UNSUPPORTED_ROUTES = ["/admin", "/investor-portal", "/investor-portal/vault"]` — the header's investor CTA is conditionally rendered off on Vercel, and those routes fall to `DeploymentUnavailable`. **Any new private surface must be added to that list and hidden the same way**; leads on Vercel go out via Resend and fail honestly when unconfigured.
- **Print is a real surface.** Opportunity briefs print to A4 via the `@media print` block ([`index.css:351-496`](client/src/index.css)): everything hidden except `.print-brief`, 16mm/14mm margins, a `2px solid #5a1f2e` header rule, gold uppercase reference slug, `#d8d4d0` table hairlines on `#f7f4f1` headers, a `#f2a007` readiness track, and a disclaimer block. New brief content must use the existing `.brief-*` classes or it will print blank.
- **PWA/prerender:** routes are prerendered (`scripts/prerender.mjs` + `routes.mjs`) — hence `initial={false}` on above-the-fold motion. Content imagery (`partners/`, `team/`, `gallery/`) is runtime-cached, not precached, to keep first load off ~3MB. Fonts are cached for a year.

---

## 10. Known contradictions in the committed system

These are real inconsistencies found while documenting. They are recorded, not silently normalized.

1. **PRODUCT.md says "Space Grotesk mono"; the code loads IBM Plex Mono.** Code wins; PRODUCT.md line 40 is stale.
2. **`--brand-accent: #b38b59` is defined and exposed as `--color-brand-accent` but used zero times in any component.** Either a third brand tone was abandoned or it is reserved. Do not start using it without a decision.
3. **`shadow-premium-3xl` is used in [`HamaCTA.tsx:52`](client/src/components/hama/HamaCTA.tsx) but never defined in `index.css`** — that element currently has no shadow. Either define the step or drop the class.
4. **A dark theme exists but is unreachable.** `.dark` tokens are fully specified and `ThemeProvider defaultTheme="light"` mounts with a working toggle, but no UI exposes it, and every component hard-codes hexes rather than consuming `--background`/`--foreground`. Dark surfaces are hand-built `bg-[#0b0b10]` bands, not theme output. Treat the `.dark` block and the shadcn token layer as vestigial.
5. **Two status color systems coexist.** `ProjectCard`/`Programs` use brand tints; [`ProgramDetail.tsx:16-22`](client/src/pages/ProgramDetail.tsx) and `Corridor.tsx:153` use `emerald`/`amber`. The brand-tinted system is canonical (§2); the emerald/amber usages on program status are drift and should converge.
6. **`sonner.tsx` imports `useTheme` from `next-themes`, not from the local `ThemeContext`** — a second, disconnected theme source.
7. **PageLoader's five floating `rounded-full` gold dots** are the only purely decorative animated ornament in the codebase and sit against the "no unmotivated animation" rule the rest of the system follows. Likewise `HamaCTA`'s `w-56 h-56 rounded-full bg-black` disc violates both the no-pure-black and no-round rules; `NotFound.tsx:59` carries a stray `rounded-sm`.
8. **Container width forks in two places:** the legacy `.container` component class caps at 1280px (unused by pages), and the header uses `max-w-[1700px]` against the site-wide `max-w-[1500px]`. The header divergence is intentional; the `.container` class is dead.
9. **`glass`, `glass-dark`, `glass-institutional`, `button-magnetic`, `vertical-text`, `animate-shimmer`, and `hud-value` are defined in `index.css` but effectively unused** in components (`hud-label` survives in `NotFound` and a scoped Hama override). Dead surface area — do not revive without cause.
10. **PageLoader's subtitle "African International Business Alliance" is hardcoded English** and does not localize, breaking the trilingual-parity rule on the very first frame.
