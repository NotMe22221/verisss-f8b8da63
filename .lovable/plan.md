## Goal
Make the homepage feel animated again by fixing the runtime error that is aborting the motion setup, then restoring visible load/scroll reveals across the home and About pages.

## What I’ll change

### 1. Stop the animation system from crashing
Harden the page-specific GSAP setup so it only animates real elements:
- Guard every `gsap.set`, `gsap.to`, timeline target, and `quickTo` target in `src/routes/index.tsx`.
- Guard the About page intro targets in `src/routes/about.tsx` the same way.
- Make sure selector-based animations like the CTA card and any optional decorative hooks can’t throw if the element is missing.

This is the core fix, because the current `Cannot read properties of undefined (reading 'opacity')` error is likely killing the entire motion initialization before the reveals can run.

### 2. Restore visible hero motion on first paint
Retune the homepage hero so the animation is obvious at the current viewport height:
- Keep the mount intro for eyebrow, headline, copy, CTA, counter, and marquee.
- Ensure those hero elements are hidden and revealed only when they actually exist.
- Keep the cursor parallax and marquee velocity behavior, but only attach them when their targets are present.

### 3. Make scroll reveals actually read as motion
Adjust the shared reveal system in `src/lib/reveal.ts` so text/cards don’t feel static:
- Keep `gsap.set`-first behavior for reveal markers.
- Retune trigger starts/durations if needed so sections entering the 881×525 viewport don’t all complete too early.
- Preserve reduced-motion behavior.

### 4. Verify the animated surfaces still mount cleanly
Check the supporting motion components for safe initialization:
- `HeroAmbient.tsx`
- `CursorFollower.tsx`
- `PageCurtain.tsx`
- `CountUp.tsx`

If any of them are contributing to the early abort, I’ll make their setup defensive without changing the intended design.

## Files involved
- `src/routes/index.tsx`
- `src/routes/about.tsx`
- `src/lib/reveal.ts`
- Possibly one or more of:
  - `src/components/landing/HeroAmbient.tsx`
  - `src/components/landing/CursorFollower.tsx`
  - `src/components/landing/PageCurtain.tsx`
  - `src/components/landing/CountUp.tsx`

## Technical details
- Root error found: `Uncaught TypeError: Cannot read properties of undefined (reading 'opacity')`
- Shared reveal utility already has some empty-target guards.
- The homepage and About page still contain several unguarded `gsap.set(...)` and intro timeline targets outside that shared utility.
- If GSAP hits an undefined target during init, the rest of the animation setup for the page won’t run, which matches the “there is no animations” symptom.

## Result
After this pass, the page should:
- load without the GSAP runtime error
- show visible hero entrance motion
- reveal headlines/text/cards while scrolling instead of reading as static
- keep the dense motion layer without breaking the site