## Goal
Make the homepage and About page feel clearly animated and interactive in the first screen and throughout scroll, without changing the site’s copy or structure.

## What I’ll change
1. **Strengthen the hero motion on `/`**
   - Replace the current barely-noticeable load behavior with a deliberate intro sequence for the eyebrow, headline, paragraph, CTA, and marquee.
   - Add layered motion to the hero media so the page feels alive immediately, not only after scrolling.

2. **Upgrade section reveals across Home + About**
   - Replace the current soft fade-up pattern with more visible staggered motion for headings, cards, stats, and content blocks.
   - Make reveals feel intentional and premium, while still staying smooth and not gimmicky.

3. **Improve the interactive modules**
   - Make the scam-call demo and key feature blocks feel more dynamic using clearer entrance timing, subtle hover/idle motion, and stronger state transitions.
   - Keep reduced-motion support intact.

4. **Harden the GSAP setup**
   - Move the animation wiring to the more reliable React-native GSAP pattern (`useGSAP` with scoped refs) instead of broad selector-driven setup.
   - Ensure above-the-fold elements animate on mount and scroll sections animate on entry consistently.

5. **Verify in preview**
   - Recheck the homepage and About page in the live preview to confirm the motion is actually visible and the site no longer reads as static.

## Technical notes
- Files likely involved: `src/routes/index.tsx`, `src/routes/about.tsx`, `src/components/landing/ScamCallDemo.tsx`, and `src/styles.css`.
- No backend changes.
- No new content sections.
- No dependency changes needed because GSAP and `@gsap/react` are already installed.