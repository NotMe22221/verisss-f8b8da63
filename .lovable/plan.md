## Goal

Make the homepage feel cinematic and story-driven, with real imagery, more motion, and a clear "this is for humans, not AI" stance.

## What's New

### 1. New imagery (premium, brand-consistent — cream + deep teal)

Generated with the image tool and saved to `src/assets/`:

1. `story-grandparent.jpg` — close, warm portrait of an older person on the phone, ring visible on hand, soft window light.
2. `ring-design-macro.jpg` — extreme macro of the titanium ring, sensors visible, studio lighting.
3. `ring-prototype-bench.jpg` — engineering prototype on a workbench: PCB, calipers, sketches.
4. `usecase-kitchen-call.jpg` — older woman at kitchen table, suspicious phone call, ring on finger.
5. `usecase-family-relief.jpg` — adult child checking phone, soft relief on face, alert visible.
6. `who-its-for-portrait.jpg` — multigenerational portrait, hands holding hands, ring centered.

### 2. New sections on `/` (in narrative order)

```text
Hero
Problem
StorySection            ← NEW (grandparent portrait + narrative)
HowItWorks
ScamCallDemo
UseCasesSection         ← NEW (3 image cards: kitchen call, family relief, the second of doubt)
PrototypeSection        ← NEW (image + caption strip: design → prototype → product)
DeviceSection           (existing — gets new ring-design macro)
BusinessModelSection    ← NEW (pricing tiers + cost story)
WhoItsForSection        ← NEW page-style block: "For grandparents and the people who love them. Not for AI. Not for surveillance. Not for data brokers."
ScienceSection
ManifestoBand
CTA
Footer
```

`WhoItsForSection` directly addresses "but NOT to AI": a bold "Who Veris is for / Who it isn't for" two-column with explicit anti-AI / anti-surveillance / anti-data-broker copy.

### 3. Business model + cost

Three tier cards (Solo, Family, Caregiver Network) with monthly price, ring price, and what's included. Plain language, no upsells. Anchored as `#pricing`.

### 4. New animations (anime.js, all respecting `prefers-reduced-motion`)

- **Image reveal masks** — every new hero image animates in with a clip-path wipe + slow scale (Ken Burns) on enter.
- **Section pin-style stagger** — story paragraphs stagger word-by-word using `SplitText` + `stagger` on inView.
- **Use-case cards 3D tilt on cursor** — pointer parallax inside each card.
- **Prototype timeline** — horizontal step dots draw in as you scroll (SVG stroke animation).
- **Pricing cards** — float-in stagger + magnetic CTA per card.
- **Marquee tilt** — slight perspective tilt on scroll velocity.
- **Sticky number counters** in business model (price counts up).
- **Section divider strokes** — animated hairlines between sections drawing left-to-right on enter.

Nav gets two new links: `Story` and `Pricing`.

## Files

- Create: `src/components/landing/StorySection.tsx`, `UseCasesSection.tsx`, `PrototypeSection.tsx`, `BusinessModelSection.tsx`, `WhoItsForSection.tsx`, `RevealImage.tsx` (mask-reveal + Ken Burns wrapper).
- Generate: 6 images in `src/assets/` (premium quality for the portraits, fast for product macros).
- Edit: `src/routes/index.tsx` (add sections, nav links, new animation hooks), `src/lib/reveal.ts` (add `.reveal-image` mask handler).
- No backend, no schema, no new deps.

## Out of scope

- No new routes (everything stays on `/`).
- No copy about AI features — Veris stays positioned as on-device protection for humans.
