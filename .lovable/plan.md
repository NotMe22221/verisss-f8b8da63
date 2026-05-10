# Final QA Pass — Veris Landing

A targeted polish round to bring the site to a "Google X / factory-tour" level of finish. Focused on the things that actually break the spell on a high-end site: duplicated content, weak metadata, dead links, and inconsistent claims. No re-architecture.

## 1. Cut the duplicate "Who it's for" content
The page currently has **two** sections doing the same job:
- `AudienceSection` (For families / For older adults) in `index.tsx`
- `WhoItsForSection` (the new one with portrait imagery)

Keep `WhoItsForSection` (richer, photographic, more recent), remove `AudienceSection`. One clear "who it's for" beat, not two.

## 2. Fix the hero CTA over-claim
Hero shows: `12,847 calls intercepted in pilot`, while the CTA later says we are shipping the *first* cohort of 127 rings. These contradict each other and read as fake. Replace the counter with something honest for an early-stage product, e.g. `127 families in the first cohort` (matches CTA) or remove the counter entirely and keep the marquee.

## 3. Page metadata + social share
Currently the root sets `Lovable App` / `Lovable Generated Project` for og/twitter, and `index.tsx` only overrides `<title>` and `description`. On share, OG falls back to Lovable defaults.

In `src/routes/index.tsx` `head()`, add:
- `og:title`, `og:description`, `og:type=website`, `og:url`
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`
- `og:image` + `twitter:image` pointing to a hero asset (e.g. `/ring-device-studio.png` exported as a public URL — use the imported asset URL via Vite)

Also strip the generic Lovable defaults from `__root.tsx` `head()` so route-level meta isn't competing with stale fallbacks (keep only charset, viewport, fonts, favicon, stylesheet).

## 4. Footer dead links
All 4 footer links (`Mission`, `Manifesto`, `Privacy`, `Contact`) point to `#`. At minimum:
- `Manifesto` → `#manifesto` (already exists)
- `Mission` → `/about`
- `Privacy` → keep `#` but mark as `aria-disabled` + muted, or remove
- `Contact` → `#early-access`

## 5. Small consistency fixes
- Nav `Pricing` link works (`#pricing` exists in BusinessModelSection) — verify it scrolls correctly with Lenis (it should, no change needed unless broken).
- Marquee includes `MIT Media Lab`, `DARPA`, `Stanford HAI`, `FINCEN`, `AARP Labs`, `Apple Health`, `Verily`. ScienceSection then claims "AARP Labs early-access cohort" and "MIT Media Lab affiliated researchers." If these are aspirational, soften the marquee label (e.g. eyebrow above it: "Inspired by research from" instead of implying partnerships) — avoids a credibility hit.
- Footer copyright says `© 2026` — fine for the project's stated date.

## 6. Quick polish (low-risk)
- Add `loading="lazy"` and `decoding="async"` to the non-hero `<img>` tags in StorySection / UseCases / WhoItsFor / Prototype / Device for faster first paint.
- Ensure every section heading is an `<h2>` and the hero is the only `<h1>` (spot-check during edit).

## Out of scope
- No new sections, no copy rewrites beyond the items above, no design-token changes, no animation rework (animations were already polished in prior turns).

## Files touched
- `src/routes/index.tsx` — remove `AudienceSection`, fix hero counter, expand `head()` meta, fix footer links
- `src/routes/__root.tsx` — strip generic OG/Twitter fallbacks
- `src/components/landing/StorySection.tsx`, `UseCasesSection.tsx`, `WhoItsForSection.tsx`, `PrototypeSection.tsx` — add `loading="lazy"` / `decoding="async"` to images
- (optional) marquee eyebrow line in `index.tsx`

After edits I'll re-verify in the preview at desktop + the current 881px viewport.
