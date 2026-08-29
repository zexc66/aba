---
target: home page re-run after P1 fixes
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-28T19-29-40Z
slug: client-src-pages-home-tsx
---
Method: dual-agent (A: ses_fb630388dffeRyGWEnI1P4ztrQ · B: ses_fb6301af3ffe5VkhIt25Ldl7KV). Target: client/src/pages/Home.tsx · http://localhost:8080/ · Mode: Persuade. Baseline: 23/36 (2026-08-19T15-02-24Z snapshot).

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good: scroll progress, form sending/sent, map selection feedback, testimonial counter+pause. Map affordance hinted only by small caption. |
| 2 | Match System / Real World | 3 | PPP/BOT language fits audience; HUD IDs (`HUB_SEC`, `VAL_FIN`) are noise to a ministry reader; "ACTIVE REGION" labels a country card (NodalMap.tsx:316). |
| 3 | User Control and Freedom | 3 | Testimonial pause/resume, map zoom toggle, language menu — fine for Persuade. |
| 4 | Consistency and Standards | 3 | Map module `rounded-xl` chrome vs sharp editorial squares; Footer physical `border-l` vs logical `ps-` (RTL); emerald accents vs burgundy/gold. |
| 5 | Error Prevention | 3 | Inline email validation on blur, required fields, audience-change resets; contact error auto-dismisses at 8s (Contact.tsx:127). |
| 6 | Recognition Rather than Recall | 4 | Persistent header + scroll-spy, visible territory chips, index system wayfinding. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface (Ctrl+K search exists as bonus). |
| 8 | Aesthetic and Minimalist Design | 3 | Strong discipline; noise from metric IDs, "550M"+"(USD M)" double unit, invisible hero photo. |
| 9 | Error Recovery | 3 | Contact error with fallback email; post-success button locks to "Inquiry Submitted" — second inquiry needs reload. |
| 10 | Help and Documentation | n/a | Persuade surface. |
| **Total** | | **24/32** | Good (75%) |

# Design Specificity

Genuinely authored: NodalMap corridor map (animated arcs, honest statuses, zoom toggle, RTL/reduced-motion) is the identity carrier; index/protocol system consistent across 9 sections; truthful statuses end-to-end. Generic: Testimonials module (anonymous "CEO, Global Trading Corp") category-interchangeable at the trust-critical moment; hero photo scrimmed into invisibility; Programs cards common pattern.

Deterministic scan: detector CLEAN — 0 findings across 14 target files, exit 0; robustness re-check with `--no-config --no-inline-ignores --no-design-system --no-advisory` still clean; detector integrity verified via synthetic bad file in temp dir (flagged 5 findings, exit 2, probe deleted). Detector limitation noted: camelCase JSX inline-style keys not matched.

Browser evidence: static headless Edge screenshots (1440, 390, 375, full-page) render correctly. Overlay injection skipped: no mutable browser API exposed in this harness.

# Overall Impression

The page now reads as one authored system with its redundancy stripped: the map carries presence, the index carries wayfinding, and each number has one home. The biggest opportunity is trust-coherence at the conversion moment: an honest empty newsroom sits beside the page's most fabricated-feeling content (anonymous testimonials), and a mobile overflow bug is locking phones out of navigation.

# What's Working

1. NodalMap as proof-of-presence — data-honest, accessible (44px chips, aria-pressed, reduced-motion, RTL), and now usable at 375px with scroll-snapped chips and an in-flow detail card.
2. The index/protocol typographic system — one idea, 9 sections, excellent scannability and wayfinding.
3. Truthful statuses end-to-end — map → programs → countries → pipeline all carry the same Active/Development/Pipeline language; honest empty states.

# Priority Issues

1. **[P0] Mobile horizontal overflow clips hero text and hides the hamburger (pending device verification).** At 375/390px captures: body text clips mid-word, EN language button clipped, hamburger (Header.tsx:279) not visible — navigation unreachable on phones. Detector/browser-injection could not measure `scrollWidth` (no automation API); static CSS shows no min-width culprit. Fix: verify on a real device or DevTools; audit header row shrink behavior and font-fallback metrics; fix the overflowing element. Suggested command: `$impeccable adapt`
2. **[P1] Desktop map detail card occludes the strongest proof nodes.** Card docks `md:bottom-4 md:end-4` (NodalMap.tsx:297), covering Saudi Arabia (16 programs) and Egypt (14) in default view. Fix: dock bottom-start or position away from the selected node. Suggested command: `$impeccable layout`
3. **[P1] Testimonials contradict the honest-content policy at maximum scrutiny.** Generic anonymous quotes (data.tsx:713–732) sit right after Governance/Team where a DFI officer scrutinizes credibility — beside an honest empty newsroom, the tonal mismatch reads as one truthful voice and one fabricated one. Fix: replace with verifiable dated endorsements or give it the "AWAITING FIRST ENTRY" treatment until real ones exist. Owner content decision. Suggested command: `$impeccable clarify` (with owner input)
4. **[P2] Programs choice overload + hardcoded English leaks.** 8 simultaneous choices (flagship + 6 cards + pipeline link); `"PIPELINE // EXPLORER →"` (Programs.tsx:42), `` `${list.length} PROGRAMS` `` (line 36), `"FRAMEWORK //"` / `"PROFILE //"` leak into AR/FR; engagement dates formatted `en-GB` in all locales (Newsroom.tsx:93). Fix: route through COPY; trim grid to 3 + "view all". Suggested command: `$impeccable harden`
5. **[P2] Contact post-submit dead end.** Button permanently reads "Inquiry Submitted"; a second inquiry needs a reload. Fix: reset to idle with a success panel + reference. Suggested command: `$impeccable polish`

# Persona Red Flags

- **Jordan (first-timer):** hero subtitle crams PPP/BOT + SDG 2030 + Agenda 2063 into one breath with no plain "what we do"; HUD IDs meaningless; "ACTIVE REGION" on a country card confuses; "Partner with us" (the conversion CTA) styled subordinate to "Explore Programs" which leads to 6 more choices.
- **Riley (stress tester):** contact error self-destructs after 8s; chip `onMouseEnter` fires on touch (sticky selection, NodalMap.tsx:155); testimonial dots `role="tab"` without `tablist`; scroll-spy never activates "Visions"; Team/Governance slugs index-coupled to CMS order — one reorder silently mislinks profiles.
- **Casey (mobile):** the P0 overflow (clipped text, no menu button); 8-line hero subtitle before any content; positives: 44px chip targets, scroll-snapped row, in-flow map card land well.

# Minor Observations

- Hero photo at opacity-40 + double scrim is imperceptible — cost without contribution (Hero.tsx:24).
- Metrics double unit: "550" + suffix "M" + label "(USD M)".
- Team grid `lg:grid-cols-4` with 3 members leaves an empty ruled cell.
- Dead ternary `{data.note ? "PROFILE //" : "PROFILE //"}` (Team.tsx:65).
- Footer org divider physical `border-l/pl/ml` sits wrong in RTL.
- Map tooltip rect fixed width 60 — long Arabic/French names overflow the pill.

# Questions to Consider

- If the corridor map is proof of presence, why does its own detail card hide the two corridors that prove it best (Saudi 16, Egypt 14)?
- The site answers credibility with both an honest empty newsroom and three anonymous testimonials — which do you keep?
- On a surface whose job is inquiry, why does "Partner with us" trail "Explore Programs"?
