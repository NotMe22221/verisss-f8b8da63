## Goal
Make the homepage and About page feel unmistakably animated at first glance, with a premium "moonshot lab" motion language rather than subtle reveal effects.

## What I’ll change
1. **Replace the weak hero motion with a true motion system**
   - Stop relying on the current background video as the main source of movement, since it appears effectively static in preview.
   - Build a hero scene with obvious, always-on layered motion: drifting device elements, parallax depth, orbital/glide paths, and a stronger entrance sequence for headline, copy, CTA, and trust strip.
   - Add a visual energy layer so the page feels alive even before scrolling.

2. **Create a distinct “X factory” motion language across the homepage**
   - Upgrade section transitions from generic fade-ups to larger, deliberate choreography.
   - Introduce section-specific motion patterns: pinned narrative beats, staggered card sweeps, directional reveals, and responsive parallax that reacts to scroll.
   - Make the device section and science section feel like product-demo moments, not static content blocks.

3. **Turn the scam-call demo into a real showpiece**
   - Add a guided auto-sequence with stronger visual escalation, clearer intervention moment, and more dramatic alert transition.
   - Add ambient motion even while idle so the module never looks dormant.
   - Make the state changes read instantly as “something intelligent is happening.”

4. **Refactor animation architecture for reliability**
   - Scope GSAP timelines to section refs instead of broad selector-only wiring.
   - Separate mount animations, idle loops, and scroll-triggered timelines so they don’t fight each other.
   - Remove dependence on external hero media for perceived motion and make the animated state deterministic in preview.

5. **Polish for perception, not just implementation**
   - Tune scale, distance, easing, overlap, and timing so motion is clearly visible from normal viewing distance.
   - Keep reduced-motion support intact.
   - Validate in preview that the first screen reads animated immediately and that scrolling keeps revealing new motion moments.

## Technical details
- Likely files: `src/routes/index.tsx`, `src/routes/about.tsx`, `src/components/landing/ScamCallDemo.tsx`, `src/styles.css`, and possibly one new reusable hero/scene component.
- GSAP + ScrollTrigger stay as the motion engine.
- I’ll likely replace the external hero video with DOM/image-driven motion or a self-contained visual scene so the hero is reliable and controllable.
- No backend changes.

## Diagnosis from the current build
- The page is not blank or broken; it is reading as static because the current motion is mostly subtle text reveals plus a hero video that barely advances in preview.
- The result is “technically animated” but not perceptibly animated, especially above the fold.
- The fix should focus on stronger, always-on, controllable motion rather than adding more small fades.