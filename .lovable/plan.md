# Motion & Animation Polish Plan

The site already has good ingredients (anime.js v4, SplitText, reveal-on-scroll, magnetic CTA, custom cursor, parallax). What it lacks is a **single coherent motion language** — right now every section uses slightly different timings/eases/distances. This pass tightens it into one signature, then adds a few standout moments.

## 1. Unify the motion grammar

Codify these tokens in `src/lib/anime.ts` and use them everywhere:

- **Eases**: `outExpo` (default), `outQuart` (small UI), `outBack(1.4)` (CTAs only), `inOutSine` (loops only)
- **Durations**: 700ms (small), 1100ms (default), 1500ms (display heads)
- **Stagger**: 45ms words, 90ms cards, 140ms hero
- **Travel**: 56px ups, 24px small, 115% mask-rise

Then update `revealAll` and the hero intro to source from these tokens — no more hand-tuned numbers per section.

## 2. Section ingress — one choreography, every section

For every section in view, play in this order (45ms gaps between):
1. Hairline rule draws left → right (600ms)
2. Eyebrow slides in with the gold tick
3. Heading words mask-rise (stagger 45ms)
4. Body fade+rise
5. Children stagger in last

Today eyebrow + head + body are independent observers firing in arbitrary order. Group them per-section so the choreography reads as one beat, not three.

## 3. Standout moments (the "wow")

These are the few places worth bespoke motion; everywhere else stays uniform.

- **Hero curtain → headline**: replace the current 2.5s plain timeline with a clipped-mask reveal: bone curtain wipes off (350ms), headline words mask-rise with overshoot, the underline tick + live signal strip fade in last. Sub-3s total.
- **Live signal strip**: slow 1.8s mutation today. Add a 200ms gold flash on the dot when "state" flips to alert — currently silent.
- **Device section pin**: as user scrolls past the ring, lock the ring centered for ~80vh while three captions cross-fade beside it (Sense → Listen → Interrupt). One scroll-pinned moment, the way Apple Watch pages do it. (Adds GSAP ScrollTrigger or a lightweight IO-based pin — I'll use a manual `position: sticky` + IO crossfade to avoid a new dep.)
- **Prototype timeline**: the gold rail currently draws on page load. Change to scroll-triggered draw (left → right as section enters), dots pop in sync with the rail head as it passes them.
- **Problem stats**: count up on scroll with `outExpo` digit reveal + a thin gold underline that draws under each value as it lands.
- **ScamCallDemo ring**: when intervention fires, add a single haptic shake (3px, 6 cycles, 240ms) on the ring AND a quick gold ring-flash, then settle. Today it just scales — feels soft.
- **CTA card entrance**: keep the scale-in but add a subtle "settle" — overshoot 1.02 → 1.0 with `outBack(1.4)`.

## 4. Continuous ambient motion (subtle, never distracting)

- Hero mesh: already there, slow it from 18s to 28s and reduce opacity 0.55 → 0.4.
- Device ring breath: keep the 4s float, add a 0.5° rotational sway on the same loop.
- Footer wordmark: very slow horizontal drift (60s loop, ±1%), gives the page a "still alive" feeling at the bottom.

## 5. Pointer-driven feel

- **Custom cursor**: tighten the lag (480ms → 320ms ring), bump scale on interactive from 2.4 to 1.8 (less cartoon, more Linear).
- **Magnetic**: extend to the early-access submit button and the About-page CTA (already exists in hero).
- **Use case cards**: tilt is already there — clamp to ±4° max (currently 6°), slow to 700ms ease — feels more premium.
- **Parallax**: tighten hero parallax depth (currently uses -28/-22 px multipliers, push to -18/-14) so it's perceptible but not wobbly.

## 6. Page transitions (Veris ↔ About)

Add a 350ms cross-fade + 8px slide between routes. Today route changes are instant — adding a soft transition makes the site feel like one continuous artifact.

## 7. Reduced-motion path

Audit: every new effect must have a clean static fallback. Curtain → instant; signal strip → static values; device pin → no pin; timeline rail → drawn instantly; cursor → native. The `reducedMotion()` check exists; just need to thread it through the new pieces.

## 8. Performance discipline

- Add `will-change` only during animation (set in JS, clear on complete).
- Use `transform` + `opacity` only — no top/left/width animations.
- IntersectionObserver `rootMargin: "0px 0px -15% 0px"` so reveals fire right when they enter the viewport, not too early.
- Pause hero mesh + device glow when tab is hidden (`document.visibilitychange`).

## Files to touch

- `src/lib/anime.ts` — add motion tokens (eases, durations, stagger, travel)
- `src/lib/reveal.ts` — group ingress per section, fire as one choreography
- `src/routes/index.tsx` — hero curtain rewrite, problem stats CountUp + underline, About-CTA magnetic, page transition wrapper
- `src/routes/__root.tsx` — page transition wrapper
- `src/components/landing/HeroAmbient.tsx` — slower mesh, lower opacity
- `src/components/landing/LiveSignalStrip.tsx` — gold flash on alert
- `src/components/landing/PrototypeSection.tsx` — scroll-triggered rail draw
- `src/components/landing/ScamCallDemo.tsx` — haptic shake + gold flash on intervention
- `src/components/landing/CursorFollower.tsx` — tighter lag + smaller hover scale
- `src/components/landing/MagneticButton.tsx` — already good, no change
- New: `src/components/landing/DevicePin.tsx` — sticky ring + crossfade captions
- `src/styles.css` — sticky pin styles, footer drift, gold flash keyframes

## Implementation order

1. Motion tokens + unified ingress (foundation — biggest perceived consistency lift)
2. Hero curtain rewrite + signal strip flash
3. Device pin moment (the standout)
4. Timeline scroll-draw + problem stats count
5. ScamCallDemo polish + cursor tightening
6. Page transitions + reduced-motion audit

## Out of scope

- No new sections, copy, or images.
- No GSAP/Framer Motion install — staying on anime.js v4 + IO.
- No Lenis/scroll-hijacking changes (already wired).
