## Direction

Right now the page reads as a static editorial brief: serif headlines, mono micro-labels, body sans — three voices fighting. No motion in the background. The ring sits still in the hero and never appears again with intent. That's the gap between "design-y landing" and Apple/Humane/Google moonshot.

Three moves fix it:

1. **One typographic voice.** Drop the body sans + mono mix on display surfaces. Every headline, body line, and stat uses the **same display family (Fraunces)** at varying weights/sizes/italics. Mono survives only as tiny telemetry chrome (timestamps, fig. numbers). No more 3-font collage.
2. **The page is alive.** Animated gradient mesh background that drifts slowly behind every section. Subtle film grain on top. Sections fade-cross into each other instead of hard borders. A persistent gold "aurora" follows the scroll position.
3. **The ring is the protagonist.** It doesn't sit in one image — it **deconstructs as you scroll**. Hero shows the whole ring. As the user scrolls, the ring fractures into 4 orbiting components (shell, sensor array, haptic core, antenna ring) that drift to the sides of the viewport, each becoming the visual anchor for one section. By the Statement section, the parts reassemble.

## What gets built

### 1. Generated visual assets (Lovable AI / nano-banana-pro)

Generate 6 new hero-quality renders, all in the same dark-navy/gold palette as `ring-hero.jpg`, all 1024×1024 PNG with transparent or matching backgrounds:

- `ring-shell.png` — outer titanium band, isolated, floating, dramatic rim light
- `ring-sensors.png` — interior sensor array exposed, glowing copper/gold contacts
- `ring-haptic.png` — haptic core module, exploded view
- `ring-antenna.png` — inner antenna ring, wireframe-like
- `ring-macro-1.png` — extreme macro of brushed titanium surface
- `ring-aurora.png` — abstract gold/navy aurora cloud (used as scroll-following background layer)

Saved to `src/assets/`. Each is referenced as the visual anchor for one scroll moment.

### 2. Hero "deconstruction" sequence (the centerpiece)

A pinned scroll-driven sequence built with **pure CSS transforms + scroll progress** (no Framer Motion — keeps bundle lean, fits TanStack SSR). Mechanism: a single `position: sticky` container ~250vh tall holding the ring. A scroll listener (rAF-throttled) writes a `--progress` CSS variable from 0 → 1 onto the container. CSS uses `--progress` to:

- Rotate the whole ring assembly slowly (0 → 90deg)
- Translate each fragment outward along its own vector (`translate(calc(var(--progress)*-40vw), …)` etc.)
- Fade the original `ring-hero.jpg` opacity 1 → 0 while the 4 fragments fade 0 → 1
- Scale each fragment 0.6 → 1.4 as it leaves
- Drift the gold aurora behind it from center → top-right

By the time the user has scrolled past the hero, the four fragments are parked at the four corners of the viewport. Each downstream section (Manifesto, Science, Device, Statement) gets a faint, blurred fragment as its background watermark — the ring is "with you" the whole way down. In the Statement section, the same scroll variable runs in reverse and the fragments fly back together to reform the ring as a closing image.

### 3. Motion background system

- **Animated mesh gradient**: a fixed full-viewport canvas behind everything, two large radial gold + teal blobs that drift sinusoidally (CSS keyframes on `background-position` of stacked radial-gradients, 40s loop). Already partially exists as `.bg-nebula` — extend it to `position: fixed; inset: 0; z-index: -1` and animate.
- **Grain layer**: existing `.noise` lifted to a fixed top layer at 4% opacity.
- **Section transitions**: replace every `border-y` between sections with a 200px gradient fade (current section bg → next section bg). Page becomes one continuous surface.
- **Scroll-linked aurora**: a soft gold blob that translates with `window.scrollY` so it always sits ~40% down the viewport, giving every section a warm focal point.

### 4. Typography unification

- Body copy switches from Inter to **Fraunces** at 300 weight, generous leading. Inter is removed from the loaded fonts (smaller bundle, one voice).
- Hierarchy comes from size + weight + italic, not from family swap:
  - Display XL: Fraunces 200, 5-7rem, tight tracking, italic accent words in gold
  - Display L: Fraunces 300, 3-4rem
  - Body: Fraunces 300, 1.05rem, 1.7 leading
  - Caption / chrome: JetBrains Mono 400, 10px, used **only** for: timestamps in console, FIG. numbers, build strip, telemetry ticker
- Section labels (`§ 01 / Mission`) move from mono to Fraunces small-caps italic — same family, different register.
- All `font-mono` on headlines, CTAs, and labels gets removed. The "Join Early Access" button text becomes Fraunces italic instead of mono caps.

### 5. Section restructure

- **Hero** keeps the headline but drops the corner callouts and stat row — those move into Manifesto. Hero becomes pure: ring + headline + one CTA.
- **Manifesto** absorbs the 127/9 stats inline as a single sentence: *"127 families. 9 states. One quiet system."* in display italic.
- **HowItWorks** loses the 4 boxed cards. Becomes 4 full-width rows, each with: huge italic verb (Detect / Analyze / Intervene / Protect), one-line description, and one of the ring fragments parked next to it.
- **Device** drops the spec table grid box. Specs become a single line of numerals separated by gold dots: *"7 days · 4g · titanium · on-device · resistant · local-only"*.
- **Statement** is where the ring reassembles — full-bleed, headline overlaid.
- **Metrics** stays but the 4-up grid becomes a horizontal scroll-snap track of large numerals.
- **EarlyAccess** form becomes single-column, inputs without boxes (just hairline underlines, current `LabInput` is already close).

### 6. Polish layer

- Cursor: subtle gold dot follower on desktop only (12px circle, mix-blend-difference).
- Scroll progress: 1px gold bar fixed at top, width = scroll %.
- All button hovers get a slow gold underline draw instead of opacity flicker.

## Honest scope notes

- **No real video file.** Embedded MP4s on a hero are a known performance + LCP killer and don't fit the SSR/edge runtime. The "motion background" and "ring deconstruction" deliver the same *feeling* using CSS transforms on generated PNGs — it will read as a film without being one. If a true video is required later, it should be a separate request and likely a Remotion render delivered as a poster + `<video>` swap.
- **No Framer Motion / GSAP.** A single rAF scroll listener writing a CSS variable handles everything. Keeps the bundle small and SSR-clean.
- **Image generation will run during implementation** via `imagegen--edit_image` against the existing `ring-hero.jpg` so all six new renders match the ring's exact lighting, finish, and color.

## Files touched

- `src/styles.css` — animated mesh gradient, fade-section utility, scroll-progress variables, font stack reduced to Fraunces + JetBrains Mono only.
- `src/routes/index.tsx` — Hero rebuilt as sticky scroll-deconstruction container, all sections re-typeset, fragment watermarks wired into Manifesto/Science/Device/Statement, Metrics → snap track, Footer trimmed.
- `src/routes/__root.tsx` — drop Inter from font preconnect/link, keep Fraunces + JetBrains Mono.
- `src/assets/` — six new generated PNGs.

## Result

A page that feels like one continuous moving surface, with the ring as a character that comes apart and reforms as you read its story — written in a single typographic voice. That is the difference between "good landing page" and "Google X reveal."
