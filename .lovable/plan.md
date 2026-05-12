# Force animations on for everyone

The site currently respects the OS-level "Reduce motion" accessibility flag, which is why nothing animates on your machine. We'll strip those checks so every visitor sees the full motion language.

## Changes

1. **`src/lib/anime.ts`** — change `reducedMotion()` to always return `false`. This single switch propagates everywhere `reducedMotion()` is called.

2. **`src/lib/useLenis.ts`** — remove the `prefers-reduced-motion` early-return so smooth scrolling always initializes.

3. **`src/styles.css`** — remove the `@media (prefers-reduced-motion: reduce)` block (around line 280) that resets `.reveal-up`, `.reveal-eyebrow`, `.reveal-head` etc. to their final state. Also remove the same media query from `.page-fade-in`, `.haptic-shake`, `.gold-flash`, `.footer-wordmark`, hero mesh, device sway, and any other rule that disables itself for reduced-motion users.

4. **`src/components/landing/SplitText.tsx`** — drop the reducedMotion guard so headline words always animate.

5. **`src/routes/__root.tsx` (PageCurtain)** — remove its reduced-motion skip so the curtain wipe always plays.

6. **Any component-level `if (reducedMotion()) return;` early-returns** in `ScamCallDemo.tsx`, `LiveSignalStrip.tsx`, `CursorFollower.tsx`, `HeroAmbient.tsx`, `PrototypeSection.tsx`, `index.tsx` — strip them so animations run unconditionally.

## Notes

- This violates WCAG 2.3.3 (Animation from Interactions). If you ever publish to a wider audience, consider re-enabling the guard or providing an in-app toggle.
- After the change, refresh the preview to see hero curtain → headline rise → eyebrow slides → device sway → prototype rail draw → scam-call shake all firing.
