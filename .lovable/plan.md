## Goal
Rebuild the hero around the chosen positioning: **manifesto headline + human subhead.** No layout overhaul — just copy, eyebrow, and a small contrast/hierarchy fix so the new line lands.

## Copy changes (`src/routes/index.tsx`, hero block ~lines 90–100)

**Eyebrow**
- From: `Private Beta · Cognitive Defense`
- To: `Private Beta · The Cognitive Defense Layer`

**Headline (H1)**
- From: `Protection before / the damage.`
- To: `Every fraud tool reacts. / Veris intervenes.`
- Keep current size and tracking. Add a subtle weight contrast: "Veris intervenes." rendered in the same teal but with `font-medium` continuing — no color swap (keeps it premium, not loud).

**Subhead**
- From the current single sentence.
- To a two-beat line that carries the warmth Direction 2 had:
  > Biosignals, voice, and on-device AI — fused in a ring — to interrupt manipulation the second it happens. So your parents get a moment to think, before the transfer, before the regret.
- Keep at `text-base md:text-lg`, full teal, `font-medium`. Cap width at `max-w-lg` so the rhythm of the triplet doesn't break awkwardly on desktop.

**CTA**
- Keep "Join the beta" — it fits the manifesto register. No change.

## Small supporting tweaks
- Tighten the H1 line-height very slightly (`leading-[1.02]`) so the two lines feel like one statement, not two sentences.
- Reduce mb between H1 and subhead from `mb-4` to `mb-5` to give the longer subhead breathing room.
- Mobile (384px): the longer subhead will push the CTA down. Reduce the hero's mobile top padding from `pt-24` to `pt-20` so nothing clips. No change to desktop.

## Out of scope (deliberately)
- Video treatment, contrast token system, and proof block — those were the other items in my earlier critique. You picked headlines-only first; I'll propose those next once this lands.
- No new components, no new files, no dependency changes.

## Files touched
- `src/routes/index.tsx` (hero section only, ~10 lines)