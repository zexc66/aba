---
target: home page (client/src/pages/Home.tsx)
total_score: 22
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 4
timestamp: 2026-08-18T16-05-14Z
slug: client-src-pages-home-tsx
---
# Design Critique — AIABASD Home Surface

Method: dual-agent (A: CritiqueA · B: CritiqueB). Target: client/src/pages/Home.tsx · http://localhost:5000/ · Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Dead nav hover underline (group-hover without group); stale scrollspy; success note self-destructs in 8s |
| 2 | Match System / Real World | 2 | 14 vs 7 programs; 9+ vs 11 countries; Target Alpha 28% vs Target IRR 22–30% |
| 3 | User Control and Freedom | 2 | No Esc on mobile menu; 3-way language cycle; autoplay never resumes; submission auto-wipes |
| 4 | Consistency and Standards | 2 | Header org name differs from footer/SEO; langLabel semantics flip; EN strings leak into AR/FR |
| 5 | Error Prevention | 3 | Native validation + disabled-while-sending solid; no spam guard |
| 6 | Recognition Rather than Recall | 3 | Language control must be guessed; map data hover-only; unlabeled testimonial controls |
| 7 | Flexibility and Efficiency | 2 | No skip link; program cards have no keyboard path |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined palette; docked for 10x identical headers and 8 equal-weight CTAs |
| 9 | Error Recovery | 2 | Generic single-string errors; reference ID vanishes, no copy affordance |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **22/36** | Acceptable — four P1s block "good" |

## Design Specificity Verdict

LLM: Half-authored. Sovereign-terminal execution (status pills, protocol microcopy, country indices, scroll rail, NodalMap corridor graph) is product-true. Load-bearing surfaces are consultancy template: Unsplash hero under 85% wash, section-header pattern x10, stock-pattern testimonial/contact/partner blocks. HUD vocabulary decorative, not systematic. No audience-specific evaluation paths for the four confirmed audiences.

Deterministic scan: CLI 8 findings (4 purple ai-color-palette in PageLoader/ScrollToTop — off-brand; 1 gradient-text PageLoader; 2 side-tab; 1 bounce-easing). Browser: 45 anti-patterns home EN (43 AR, 5 program page): nested-cards 38, numbered-section-labels 11, overused-font 2, all-caps-body, line-length 2, tiny-text 1, purple chat button. Detector corroborates template-rhythm at pattern scale (38 nested cards + 11 identical kickers).

False positives dismissed: bounce-easing (typing indicator), side-tab Countries (active state), PageLoader set (transient screen — purple gradients still off-brand, fix opportunistically), pulsing-dot (the truthful status system — most brand-specific element on the page).

Overlays injected on 3 views (EN home, AR home, program page): 45/43/5 flagged in the [Human] tab.

## What's Working

1. Truthful status system as visual primitive — honesty rendered as UI.
2. Conversion loop closes with evidence — reference ID, distinct states, input preserved on failure.
3. NodalMap + HUD detailing where it counts — the un-copyable identity seed.

## Priority Issues

1. [P1] 11 ghost affordances at the highest-stakes moment (Explore Protocol x4, Access Institutional Charter, Leadership Profile x5, href="#" socials). Fix: wire or strip. → $impeccable harden
2. [P1] Trilingual parity breaks: h1–h6 base font-family overrides font-arabic (Noto Kufi never reaches headings, verified); Hero text-left under dir=rtl; hardcoded EN strings in AR/FR (Programs/Countries chrome, Partners strip, Testimonials eyebrow, Footer titles). → $impeccable harden
3. [P1] Keyboard/SR lockout: 7 program cards + featured + 11 country rows are div onClick, no focus styles, no skip link. → $impeccable audit then fix
4. [P1] Mobile menu clips bottom: last links at y~1380 vs 812 viewport, non-scrolling sheet, no Esc; tap targets under 44px. → $impeccable adapt
5. [P2] Truth drift + stock hero: contradictory figures; remote Unsplash hero violates no-stock policy. → $impeccable clarify

## Persona Red Flags

- Jordan (press/NGO first-timer): language button meaning guessed; dead governance controls; 14-vs-7 unverifiable; honest-empty newsroom reads unfinished.
- Riley (stress tester): filter chips = first 7 tags by order (PPP/Digital/Recycling unreachable); AR toggle breaks heading face + leaves EN fragments; reference ID auto-dismisses.
- Casey (mobile): Contact unreachable via clipped menu; 1.4 screens of hero; zero prefers-reduced-motion.
- Amara (DFI officer): number cross-checks fail; Portal lock icon implies nonexistent data room; governance section offers only dead controls; no investor-specific path.

## Minor Observations

Black/40 microcopy 2.84:1 and black/45 stat labels 3.33:1 fail AA at 12px · filter chips structurally broken (tags.slice(0,7)) · dead lang props (Contact/Partners) · FR copy bugs (publiés/publiées; "La voix de nos Institutionnel") · hero numerals lack bidi isolation in RTL · stale scrollspy between sections · chat button purple gradient off-palette · 38 nested-card structures.

## Questions to Consider

- What if the hero were the corridor map — the un-copyable asset?
- Would three audience evaluation spurs beat a 7th program card?
- What if every clickable thing led somewhere real — half as many clickable things?
