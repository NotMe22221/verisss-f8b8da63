## Goal

Transform the homepage and About page from a static layout into a motion-led, cinematic experience — without losing the cream / deep-teal craft language. Every section should reward scrolling.

## Tech

- Add `gsap` + its `ScrollTrigger` plugin (single dependency, registered once in a small `src/lib/gsap.ts` helper).
- Keep `framer-motion` only if needed for small UI hover states; otherwise GSAP handles everything.
- Respect `prefers-reduced-motion` — degrade gracefully to static layout.
- All animation registered inside `useGSAP` / `useEffect` per route, cleanly disposed on unmount.

## Homepage motion pass

```text
HERO         scroll-driven type reveal, ring orbits in, marquee speeds with scroll velocity
PROBLEM      stat counters tick up on enter, copy fades line-by-line
HOW IT WORKS pinned section, 4 steps advance as you scroll (cinematic chapter)
WHO IT'S FOR cards lift + cross-fade on view
DEVICE       ring rotates 360° as you scroll past it, spec callouts draw lines in
SCIENCE      3 columns stagger in, subtle parallax on labels
MANIFESTO    full-bleed teal band, single sentence types in word-by-word, pinned briefly
CTA          form scales in, button has magnetic hover, success state morphs
```

Micro-interactions everywhere:
- Magnetic primary buttons (cursor-follow within ~40px).
- Nav links: animated underline + active dot that slides between sections via ScrollTrigger.
- Section eyebrows fade + slide in on enter.
- Smooth scroll behavior tuned (no heavy library — native `scroll-behavior: smooth` + ScrollTrigger is enough).

## Interactive product demo (the centerpiece)

A new **"See it work"** module between How It Works and Device:
- A fake inbound scam call UI on the left (avatar, "Unknown caller", live transcript typing out a classic impersonation script).
- The ring on the right with a soft pulse.
- As the scripted call escalates, the ring's haptic indicator pulses, a "manipulation detected" badge appears, and a family-alert toast slides in.
- User can replay the scenario with a button. Pure front-end timeline (GSAP), no backend.

## About page motion pass

- Hero headline: split-text reveal, word-by-word.
- Founder story: long-form copy fades in paragraph-by-paragraph with subtle y-offset.
- Values (3 principles): horizontal pinned scroll on desktop, stacked fade on mobile.
- Team: cards tilt slightly toward cursor, photos grayscale → color on hover.
- CTA band mirrors homepage CTA animation for consistency.

## Mobile (current 384px viewport)

- All pinned/horizontal scroll sections collapse to vertical stacked reveals on `<md`.
- Reduce parallax magnitude, drop magnetic cursor effects (touch).
- Keep counters, fades, and the interactive demo — they work fine on mobile.

## Files touched

- `package.json` — add `gsap`.
- `src/lib/gsap.ts` (new) — register ScrollTrigger once, export configured `gsap`.
- `src/lib/useReducedMotion.ts` (new) — small hook.
- `src/components/landing/ScamCallDemo.tsx` (new) — the interactive demo.
- `src/components/landing/MagneticButton.tsx` (new) — reusable.
- `src/components/landing/SplitText.tsx` (new) — small word/char splitter.
- `src/routes/index.tsx` — wire animations per section, add demo, refactor sections into local components if the file gets long.
- `src/routes/about.tsx` — wire animations.
- `src/styles.css` — add a few motion utility classes + `prefers-reduced-motion` overrides.

## Out of scope

- No new copy or new sections beyond the scam-call demo.
- No backend changes — early-access form keeps its existing server function.
- No new imagery — motion does the heavy lifting.
- No heavy smooth-scroll library (Lenis) unless needed after first pass.

## Risk / cost

- Adds ~70KB gzip (`gsap` + ScrollTrigger). Acceptable for a marketing site.
- Pinned sections need careful testing on the 384px viewport; mobile fallbacks handled above.
