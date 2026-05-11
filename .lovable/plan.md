# Moonshot Polish Plan

Goal: take the site from "well-crafted landing page" to "Google X / Apple keynote" feel — cinematic, confident, quietly extraordinary. No new sections, no new copy direction; pure design and motion elevation on top of the existing structure.

## 1. Cinematic Hero (the 3-second test)

- Replace the soft pastel hero with a **deep slate-on-bone duotone**: video stays, but treated with a stronger gradient curtain + a single warm gold rim-light gradient anchored to the headline.
- **Headline scale-up**: push H1 to clamp(3.5rem, 9vw, 9rem), tighter -0.05em tracking, line-height 0.95. Less marketing copy, more monument.
- **Cinematic curtain entrance**: black-bone curtain wipes off on load (350ms), then headline words mask-reveal in stagger, CTA magnetic settle. Logo and nav fade in last.
- **Live signal strip** under the headline (mono, 11px, gold dots): `HRV 62ms · VOICE Δ 0.04 · STATE calm` — slowly mutates every few seconds. Sells "this thing is alive" without a chart.
- Move the marquee + counter into a thin bottom rail of the hero (instead of stacked) so the hero breathes.

## 2. Signature Motion System

One language across the whole site, not per-section experiments:

- **Section ingress**: eyebrow → hairline draws left-to-right (600ms) → heading words mask-up stagger (40ms) → body fade+rise. Already partially there; tighten and apply uniformly.
- **Hairline rules** between every section, animated on scroll into view.
- **Parallax discipline**: only hero copy + section heroes get parallax. Remove any micro-parallax elsewhere (cleaner = more premium).
- **Magnetic primary CTA** everywhere it appears (already exists for hero — extend to early-access CTA + about CTAs).
- **Cursor**: keep custom cursor but reduce to a 6px dot + 28px ring that snaps to interactive elements (Linear-style).

## 3. The Device — make it the hero moment

- Convert DeviceSection to a **full-bleed dark stage**: ring image floats on slate with a soft gold rim-light, slow rotate (0.5deg sway), shadow that breathes.
- Specs become **giant numerals** (clamp(4rem, 8vw, 8rem)) with thin labels — "7 DAY · 4 g · 100 m" reads like a spec sheet on a museum plinth.
- A scroll-pinned moment: as the user scrolls, the ring stays centered while three captions cross-fade beside it (Sense → Listen → Interrupt). One pin, three beats.

## 4. Typography & Color Tightening

- Lift display tracking to **-0.045em** site-wide; bump display weight contrast (use 500 for heads, 400 for body — already mostly true).
- Add a **single accent gold** (`--accent #C9A46A`) used sparingly: live signal dots, the 1px hairline under section eyebrows, the CountUp digits, the ring rim-light. Currently underused.
- Replace any pure black/white with the slate/bone tokens — audit each component.
- Add **OpenType features**: `font-feature-settings: "ss01","cv11","tnum"` on numerals (already on body, extend to stat blocks).

## 5. Sectional Drama

- **Problem section**: stats become a vertical ticker that counts up on scroll, divider lines draw in. Headline gets a single-word emphasis ("after") in gold italic.
- **How It Works**: the 4-step grid becomes a **horizontal scroll-snap rail** on desktop (Apple-style), with a thin progress hairline that fills as the user scrolls through the steps.
- **Use Cases**: cards get a subtle 3D tilt on hover (max 4deg), image zoom 1.03 → 1.0 on scroll-in.
- **Prototype timeline**: render as a true horizontal timeline with a drawing line connecting milestones, dots that pulse when active.
- **Business Model / Manifesto / Early Access**: tighten only, no restructuring.

## 6. Footer & Closing

- Footer becomes a quiet **oversized wordmark** (`Veris` set at clamp(8rem, 22vw, 22rem), bone on slate, 8% opacity) with the small links above it. Apple/Linear footer energy.
- Add a final manifesto line above it: one sentence, large, centered, italic.

## 7. Performance & Polish

- Preload hero video poster + ring image; add `<link rel="preload" as="image">` for hero asset.
- Audit `loading="lazy" decoding="async"` on all non-hero images (already mostly done).
- Reduce-motion path: all of the above degrade to clean static layout.
- Lighthouse pass for CLS (reserve aspect-ratio on every image — most done).

## Files to touch

- `src/styles.css` — motion tokens, hairline animation, signal strip styles, footer wordmark, cursor refinement
- `src/routes/index.tsx` — hero recomposition, signal strip, footer wordmark, About/CTAs magnetic
- `src/components/landing/HeroAmbient.tsx` — curtain entrance + warm rim-light layer
- `src/components/landing/PrototypeSection.tsx` — true horizontal timeline with drawn line
- `src/components/landing/UseCasesSection.tsx` — 3D tilt + image zoom
- `src/components/landing/WhoItsForSection.tsx` — typography tighten only
- New: `src/components/landing/DeviceStage.tsx` — pinned ring stage replacing inline DeviceSection block
- New: `src/components/landing/LiveSignalStrip.tsx` — animated mono signal line for hero
- `src/lib/reveal.ts` — unify ingress sequence (eyebrow → hairline → head → body)

## Out of scope (intentionally)

- No new copy, no new sections, no new pages.
- No new images generated unless a specific shot is missing — reuse existing assets.
- No backend/data changes.

Once approved, I'll implement in this order: motion system + hero (biggest perceived lift) → device stage → timeline + use cases → footer + final pass.
