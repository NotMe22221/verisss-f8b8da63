## What's actually broken

The reveals don't work because everything currently uses `gsap.from()` without `gsap.set()` to hide elements first. So text is already painted by the browser, then GSAP "animates from" a hidden state but the user's eye has already locked onto the visible text — it looks static. On a 525px-tall viewport, most sections are also already in view at scroll-start, so triggers fire instantly with no perceived motion.

Goal of this pass: **every block of text on the homepage clearly slides/fades into place as you scroll to it**, plus dense ambient motion so the page never feels still.

---

## 1. Fix the reveal system (the core fix)

Build one shared reveal utility in `src/lib/gsap.ts`:

- `revealText(scope)` — splits headlines into words/lines, hides them with `gsap.set({ y: '110%', opacity: 0 })` inside an `overflow-hidden` mask, then `ScrollTrigger`-staggers them in (mask-reveal effect, like Apple/Linear).
- `revealUp(scope)` — for paragraphs, cards, stats: hide first with `gsap.set`, then animate `y: 60, opacity: 0 → 0, 1` with stagger.
- `revealEyebrow(scope)` — small caps labels slide in from left.
- All triggers use `start: "top 85%"`, longer durations (1.0–1.4s), `ease: "expo.out"` so motion is *visible*, not a flicker.
- Refresh on `document.fonts.ready` and on resize.

Apply via a single `useGSAP(() => revealAll(scopeRef), { scope: scopeRef })` call in each route. Replace the current per-page ad-hoc GSAP code.

## 2. Hero — constantly alive

- **Animated gradient mesh** behind the video (CSS `background-size: 400% 400%` + slow keyframe shift) layered with the video.
- **Cursor spotlight**: a soft radial gradient that follows the mouse across the hero (GSAP `quickTo` for buttery lag).
- **Parallax layers**: eyebrow, headline, copy, CTA each translate at different rates on mouse-move (subtle, ±8/14/20px).
- **Headline mask reveal on load** — words rise from below a clip mask, staggered.
- **Floating noise/grain overlay** SVG, slow drift.
- **Marquee speed reacts to scroll velocity** (kept, polished).
- **Animated counter** under the CTA: "12,847 calls intercepted" ticks live.

## 3. Section-by-section ambient motion

Every section gets:
- Mask-reveal headline (words rise behind `overflow-hidden`).
- Eyebrow slides in from left + a thin animated underline that draws itself.
- Paragraphs split by line, fade up with stagger.
- Cards: enter with a slight 3D tilt (`rotateX: 8 → 0`, `y: 60 → 0`), then on hover get magnetic + tilt-on-cursor.

Section-specific:
- **Problem**: stat numbers count up from 0 when in view (`$0 → $3.4B`).
- **How It Works**: pinned 4-card sequence; as you scroll, the active card lights up and a horizontal progress line draws across the four steps.
- **Audience**: two cards do a horizontal "shutter" reveal (clip-path slide).
- **Device**: ring image gets continuous slow rotation + scale-on-scroll (scrub), plus a draggable rotate (mouse-X spins it). Feature cards stagger in with rotateY flip.
- **Science**: three columns reveal in sequence with a vertical line that draws between them.
- **Manifesto**: huge text reveals line-by-line with mask, background slow-pans.
- **Early access form**: input has a focused glow that pulses; submit button has a magnetic + ripple effect on click.
- **Footer**: links get hover underline-draw (already partially there, polish it).

## 4. Global ambient layer

- **Custom cursor**: small dot + lagging ring (hidden on touch). Grows on hoverable elements, morphs to "play" / "drag" labels over the demo and ring image.
- **Page-load curtain**: a deep-teal panel slides up off the page on first paint, revealing the hero. ~700ms.
- **Section transition lines**: thin line draws across the viewport between sections as you scroll past.
- **Smooth scroll** via Lenis (lightweight, integrates with ScrollTrigger via `ScrollTrigger.update`).
- Respect `prefers-reduced-motion`: skip cursor, curtain, parallax; keep simple fades.

## 5. About page

Same reveal system applied. Adds a vertical timeline that draws as you scroll its section.

---

## Technical details

- **New deps**: `lenis` (smooth scroll). GSAP, ScrollTrigger, `@gsap/react` already installed.
- **New files**:
  - `src/lib/reveal.ts` — `revealText`, `revealUp`, `revealEyebrow`, `revealAll(scope)`.
  - `src/lib/useLenis.ts` — initializes Lenis once at root, syncs with ScrollTrigger.
  - `src/components/landing/CursorFollower.tsx` — custom cursor.
  - `src/components/landing/PageCurtain.tsx` — load curtain.
  - `src/components/landing/HeroAmbient.tsx` — gradient mesh + spotlight + grain layered behind video.
  - `src/components/landing/CountUp.tsx` — scroll-triggered numeric counter.
  - `src/components/landing/TiltCard.tsx` — wrapper for 3D cursor-tilt.
- **Edited**:
  - `src/routes/__root.tsx` — mount Lenis + CursorFollower + PageCurtain.
  - `src/routes/index.tsx` — replace ad-hoc GSAP with `revealAll`, add HeroAmbient, count-ups, pinned How-It-Works, draggable ring.
  - `src/routes/about.tsx` — apply `revealAll`, add timeline draw.
  - `src/styles.css` — `@keyframes` for gradient mesh, grain, mask classes (`.mask-line`), reduced-motion guards.
  - `src/components/landing/ScamCallDemo.tsx` — auto-play on scroll into view, polish transitions.

## Verification

After implementing, I'll screenshot the preview at 881×525, scroll through programmatically, and confirm headlines mask-reveal as they enter, counters tick, cursor follower works, and no hydration warnings appear.
