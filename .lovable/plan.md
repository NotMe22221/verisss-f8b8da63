## Goal

Re-skin the Veris landing page to feel like an X Development (Google moonshot) project brief: bold, scientific, ambitious, with a research-lab tone instead of a consumer wellness product page.

## Visual direction

Move away from the soft warm-ivory wellness palette toward a cinematic "lab notebook in deep space" feel.

- **Palette shift** in `src/styles.css`:
  - Background: deep near-black navy (`oklch(0.14 0.02 250)`) with a subtle off-white (`oklch(0.96 0.005 80)`) "paper" surface for one or two contrasting sections
  - Foreground: near-white on dark sections, deep navy on light
  - Accent: keep champagne gold (`#C9A46A`) as the single signal color for CTAs, stat numbers, and key phrases — used sparingly
  - Add `--grid-line` token (~5% white) for blueprint overlays
- **Typography**: serif display (Fraunces) for headlines, mono uppercase eyebrows with wide tracking, light-weight body — already have Cormorant-style direction in plan.md, lean into it harder
- **Motifs**: hairline corner brackets (existing `Frame.tsx`), faint dot/line grid overlays on hero and device sections, mono "MOONSHOT 03 / VERIS / CLASSIFICATION: PRIVATE BETA" status strips, small arrow glyphs

## Page structure (rewritten)

```text
┌─ Status bar ──────────────────────────────────────────────┐
│ MOONSHOT 03  •  VERIS  •  PRIVATE BETA  •  EST. 2026     │
├─ Nav ────────────────────────────────────────────────────┤
│ Veris       Mission  Science  Device  Access     [CTA]   │
└──────────────────────────────────────────────────────────┘

Hero — "Mission brief" layout
  Eyebrow: MOONSHOT IDEA 03 — COGNITIVE DEFENSE SYSTEM
  Headline: Protection before the damage.
  Sub: first wearable intelligence system…
  CTAs: [Join Early Access] [See How It Works]
  Right: floating ring on nebula glow + corner brackets
  Footer strip: STATUS / PARTICIPANTS / DURATION / LOCATION

Manifesto — "The problem"
  Large serif statement, lab-report body column, pull quotes

How it works — Detect / Analyze / Intervene / Protect
  Numbered 01–04 cards with corner brackets, mono labels

The Device — blueprint panel
  Ring on grid background, spec callouts with leader lines feel
  Spec strip: 7d battery · 4g · IP rating · on-device AI

Statement — "human-aware security"
  Centered serif, generous whitespace

Metrics — $3.4B / 76% / 0 / 1st
  Gold numerals, mono captions, hairline dividers

Early Access — bordered panel with corner brackets
  Form fields, gold "Join Early Access" + ghost "Request Research Access"

Footer — Veris © 2026 • Cognitive defense infrastructure
```

## Files to change

- `src/styles.css` — swap palette to deep navy + ivory + champagne gold; add `--grid-line`, font stack tokens
- `src/routes/index.tsx` — restructure all sections to mission-brief layout, mono eyebrows, serif headlines, gold accents, corner-bracket framing
- `src/components/landing/Frame.tsx` — already exists (`CornerFrame`); reuse on hero, device, and early-access panels; extend with optional `GridOverlay` subcomponent for blueprint backgrounds
- `index.html` (or root head) — add Fraunces + JetBrains Mono via Google Fonts link tags (not CSS @import, which previously broke the build)

## Tone of copy

Keep the user's exact copy verbatim, but present it with lab-report formatting: numbered sections (01 DETECT, 02 ANALYZE…), classification-style status strips, and pull quotes for the strongest lines ("Because the body reacts before the mind understands.", "The future of security is human-aware.").

## Out of scope

- No new routes, no auth changes, no schema changes
- Keep existing server function `submitEarlyAccess` and form behavior unchanged
- Keep existing ring images; only restyle their containers
