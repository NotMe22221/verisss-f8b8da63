## Goal

Neutralize the purple cast in the hero video so it reads in the cream + teal palette instead of lavender.

## Approach

In `src/routes/index.tsx` `HeroSection` (lines 84–86), keep the same video but desaturate it and tint it toward the brand teal/cream:

1. Add a CSS filter to the `<video>`: `grayscale(1) contrast(1.05) brightness(1.02)` — kills the purple completely, keeps the motion and detail.
2. Add two absolutely-positioned overlay divs immediately after the `<video>` (before the existing `relative z-10` content div), so existing copy stays on top:
   - Cream wash: `linear-gradient(180deg, rgba(244,239,230,0.55), rgba(244,239,230,0.35) 50%, rgba(244,239,230,0.65))` — warms the now-grayscale footage toward the page background and improves text contrast at top/bottom.
   - Teal soft-light layer: solid `#1B3A4B` at `opacity: 0.5` with `mix-blend-mode: soft-light` — tints the midtones toward brand teal without darkening too much.

Both overlays get `pointer-events-none` and sit between the video and the content layer (which already has `relative z-10`, so it stays above).

No changes to the headline, eyebrow, CTA, or marquee. No changes elsewhere.

## File

- `src/routes/index.tsx` — edit hero video block only.