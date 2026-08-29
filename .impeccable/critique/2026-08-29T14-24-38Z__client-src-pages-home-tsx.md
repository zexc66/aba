---
target: home re-run after motion pass and elevation
total_score: 28
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
timestamp: 2026-08-29T14-24-38Z
slug: client-src-pages-home-tsx
---
Method: dual-agent (A: ses_fb2301938ffeLN1J7DTLfLzGxs · B: ses_fb2300265ffen4q4vT3Aqc5CQd). Target: client/src/pages/Home.tsx · http://localhost:8080/ · Mode: Persuade. Baseline: 24/32 (2026-08-28T19-29-40Z snapshot).

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Arc draw-in activates corridors visibly; sending/sent/reference states; scroll progress |
| 2 | Match System / Real World | 3 | "ACTIVE REGION" labels a country; "09 hubs" vs "11 corridors" invites conflation |
| 3 | User Control & Freedom | 3 | Pause/resume, zoom toggle, consent decline — appropriate for Persuade |
| 4 | Consistency & Standards | 3 | Map chrome sharpened, Footer RTL fixed; residue radius drift + semantic pill colors |
| 5 | Error Prevention | 3 | aria-wired email validation, audience-change resets |
| 6 | Recognition Rather than Recall | 4 | Persistent header + working scroll-spy, index system, regional rollup |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 4 | Disciplined; residue: "550M"+"(USD M)" double unit, duplicated consortium label |
| 9 | Error Recovery | 4 | Dead-end replaced by success panel + resend; contact error still 8s auto-dismiss |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **28/32** | Strong (87.5%) |

# Verdict on Prior Issues

- **[P0] Mobile overflow — RESOLVED (verified at DOM level)**: true-viewport audit at 390px: scrollWidth=390, zero overflow, hamburger 44×44 visible. Screenshot clipping confirmed as headless min-width artifact.
- **[P1] Map card occlusion — RESOLVED (LTR)**: bottom-start dock; Saudi/Egypt/Jordan/Sudan visible; mobile card in-flow. NEW caveat: in RTL the mirrored dock covers the Middle East cluster (P3).
- **[P1] Testimonials — PARTIAL (owner-accepted)**: communique dossier presentation genuinely elevated; quote content owner-approved so retained.
- **[P2] Programs i18n + overload — i18n RESOLVED** (countLabel/pipelineCta/FRAMEWORK/PROFILE/dates all through COPY); grid remains 7 choices.
- **[P2] Contact dead end — RESOLVED**: success panel + reference + "send another".

Also closed from minors: hero photo contributes visibly, metric IDs removed, team grid 3-col, dead ternary, tooltip width adapts (longest AR name fits), Footer RTL logical props, Team slugs de-indexed.

# Design Specificity

Authored end-to-end. The corridor map (arc draw-in along the route chain, honest statuses, adaptive tooltip, docked dossier) is the identity carrier and is now legible on every viewport. The register/dossier genre shift (Partners as a 12-entity register, Testimonials as records with TR-88xx IDs) matches a DFI-officer audience. Truthfulness is structural: honest empty newsroom, engagement calendar empty state, booking card that only renders when configured. Generic residue is narrow: the endorsement quotes themselves (owner-kept), and English scaffolding leaking into AR/FR aria-labels.

Deterministic scan: detector CLEAN — 0 findings across 12 files. Browser evidence: static capture verified render; injection honestly skipped (no automation API). True-viewport DOM audit (CDP) at 375/390/1440 + AR/RTL pass verified overflow resolution.

# Strengths

1. Mobile experience finished, not patched — chip rail, in-flow card, reachable hamburger, consent banner, DOM-verified.
2. Truthfulness as a system — one status vocabulary across map/pills/pins plus honest empty states.
3. The register/dossier genre — Partners and Testimonials read as records, not marketing widgets.

# Priority Issues

1. **[P2] Testimonials title grammatically broken** — "Voice of our Institutional." drops `title.partner` (Testimonials.tsx:66). Fixed immediately after this critique.
2. **[P2] Trust-coherence gap** — anonymous quotes in dossier costume above an honest empty newsroom; owner-accepted, but the improved staging makes unverifiable content more conspicuous.
3. **[P3] RTL map-card occlusion** — `start` dock mirrors onto the Middle East cluster in Arabic; consider node-aware positioning.
4. **[P3] Contact error 8s auto-dismiss** — tie dismissal to next interaction instead.
5. **[P3] Bilingual/a11y leaks** — English aria-labels in testimonial controls; "INVESTOR ACCESS" untranslated; "General inquiries" truncates at 390px.

# Persona Red Flags

- **Jordan:** 40-word hero subtitle breath; "ACTIVE REGION" category confusion; "Voice of our Institutional" read as a typo (now fixed).
- **Riley:** 8s error self-destruct; tap-twice null-selection leaves a stuck hovered card; Countries↔EN_LIST index coupling is the last fragile data path; Team slug rename fallback yields dead /team/ link.
- **Casey:** mobile is clean now; residual cost is page length (~21 screens) and truncated email-channel label.

# Minor Observations

"550M"+"M"+"(USD M)" triple unit · "STRATEGIC CONSORTIUM" twice in one viewport · "AIABASD" twice inside the map module · consent banner aria-label is a full sentence · AR mapCorridors line worth a native-reader proof · newsletter error 5s auto-clear.

# Questions to Consider

- If a DFI officer asks for the source of TR-8821, what do you show them?
- Should map-card position be a function of the selected node rather than layout direction?
- Would a ministry reader reading only hero + Programs know what to do first, given "Explore Programs" outranks "Partner with us"?
