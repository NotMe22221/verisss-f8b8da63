# Switch motion engine to anime.js + bring the cursor back

## Why
The current GSAP setup keeps crashing on missing targets, which silently kills every animation on the page. You also can't see the custom cursor anymore — it's mounted but the native cursor is hidden globally, so when the follower fails to render you're left with nothing. Moving to **anime.js v4** (smaller, simpler API, no plugin/license friction) plus a hardened cursor layer will get the Awwwards-style motion back and keep it stable.

## What I'll do

### 1. Install anime.js, retire GSAP usage
- `bun add animejs` and remove the `gsap` / `@gsap/react` runtime dependency.
- Delete `src/lib/gsap.ts`, replace with `src/lib/anime.ts` exporting a configured `animate`, `stagger`, `createScope`, plus a tiny IntersectionObserver-based `onInView` helper (anime.js has no built-in ScrollTrigger).

### 2. Rewrite the reveal system
- Rewrite `src/lib/reveal.ts` using anime.js + IntersectionObserver:
  - `.reveal-eyebrow` → fade + slide from left
  - `.reveal-head` (with `<SplitText>` words) → words rise from a mask with stagger
  - `.reveal-up` → fade-rise
  - `.reveal-stagger` → children stagger in
- Pre-hide every target with inline styles before observing so there's no flash of unstyled content.
- Respect `prefers-reduced-motion` (snap to final state, skip observers).

### 3. Port the homepage and about page
- `src/routes/index.tsx`: rebuild the hero intro timeline (eyebrow → headline words → copy → CTA → counter → marquee) using anime.js timelines. Replace the `pointermove` quickTo parallax with an anime.js `animate(..., { x, y, ease: 'outExpo', duration: 600 })` driven by a throttled pointer handler. Keep the same DOM structure and class hooks.
- `src/routes/about.tsx`: same treatment for the hero intro.
- `src/components/landing/CountUp.tsx`: rewrite with anime.js animating a number proxy on `inView`.
- `src/components/landing/HeroAmbient.tsx`: rewrite the spotlight follower with anime.js `animate` + pointer handler.
- `src/components/landing/PageCurtain.tsx` and `MagneticButton.tsx`: port to anime.js.

### 4. Fix the cursor
Root cause: `src/styles.css` sets `cursor: none` globally, and `CursorFollower` uses `mix-blend-mode: difference` against a light background, which on cream/white sections renders the dot nearly invisible. Also the early-return `if (matchMedia('(hover: none)'))` can wrongly hide it on some laptops with touchscreens.
- Only hide the native cursor on devices that actually get the custom cursor (use a `body.has-custom-cursor` class toggled by the component, scoped via CSS).
- Replace `mix-blend-mode: difference` with a high-contrast solid fill (deep ink dot + ink ring) plus a soft drop-shadow so it reads on every section.
- Bump z-index to `2147483647`, remove `mixBlendMode`, ensure `pointer-events: none`, and set initial position off-screen so it doesn't flash at 0,0.
- Detect "real" pointer with `matchMedia('(pointer: fine)')` instead of `(hover: none)`.
- Drive position with anime.js (`animate(el, { x, y, duration: 120, ease: 'outExpo' })`) keyed off pointermove; ring uses a longer duration for the lag.
- Add a hover-grow on `a, button, [data-cursor='hover']` via class toggle.

### 5. Cleanup
- Remove `useLenis` usage if it depended on GSAP (Lenis itself is fine; just unwire ScrollTrigger sync).
- Delete `.lovable/plan.md` cruft from prior attempts is not needed.
- Quick visual QA in the preview after the swap.

## Files touched
- add: `src/lib/anime.ts`
- rewrite: `src/lib/reveal.ts`, `src/components/landing/CountUp.tsx`, `src/components/landing/CursorFollower.tsx`, `src/components/landing/HeroAmbient.tsx`, `src/components/landing/PageCurtain.tsx`, `src/components/landing/MagneticButton.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/styles.css` (cursor rules)
- delete: `src/lib/gsap.ts`
- package.json: add `animejs`, remove `gsap` + `@gsap/react`

## Out of scope
- No content/copy changes, no layout changes, no new sections — only the motion engine swap and cursor fix.
