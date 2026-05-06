## Goal

Push the Veris landing visual design from "stylish lab brief" to "cinematic moonshot": add motion, telemetry overlays, and ambient atmosphere so the page feels alive — like a live mission console, not a static moodboard.

## What changes

### 1. Atmosphere & motion (`src/styles.css`)

Add reusable utility classes and keyframes:

- `.scan-line` — a thin gold horizontal line sweeping vertically, 6s loop (overlay on hero & device panels)
- `.pulse-ring` — concentric rings expanding outward from the ring image, 4s loop, staggered with delays
- `.float-slow` — slow vertical float (6s) for the hero ring image
- `.marquee-track` — infinite horizontal scroll for a telemetry ticker
- `.blink` — blinking cursor for the live status dot
- `.vignette` — radial darkening at section edges for cinematic depth
- `.noise` — subtle SVG fractal noise overlay (4–5% opacity) for grain
- `.bg-nebula-deep` — richer nebula with cyan + violet + gold blooms

### 2. New components

- `TelemetryTicker` — full-width bar between StatusBar and Nav (or below hero) scrolling lab-style telemetry: `↗ HRV +0.4σ · ◐ EDA stable · ⚠ urgency-spike pattern detected · ◉ on-device · …`
- `LiveConsole` — small fixed bottom-left panel showing 3–4 simulated readouts (HRV, EDA, RISK, MODE) that update every 2s via `useEffect` setInterval — gives the page a "console is running" feel
- `Constellation` — a faint dot-and-line SVG network in the Statement section background, suggesting a global mesh

### 3. Hero upgrades

- Wrap ring image in a stack of 3 `pulse-ring` divs with staggered animation delays
- Add `float-slow` to the ring `<img>`
- Overlay `scan-line` on the ring frame
- Add 4 small "data callouts" anchored to the corners of the ring with leader-line dots (e.g. `01 · HRV` top-left, `02 · EDA` top-right, `03 · TEMP` bottom-left, `04 · IMU` bottom-right)
- Replace the static `◐ Live Telemetry` text with an animated `blink` dot + monospaced timestamp that updates every second
- Add `noise` overlay to the hero section

### 4. Manifesto / Science / Device polish

- Add `.rise` (fade-up on first paint) to section headings
- Add hover micro-interactions to the 4 How-It-Works cards: corner brackets glow gold, number scales subtly, arrow translates
- Device blueprint panel: animate the `scan-line` over the ring; add SVG leader lines from the spec table to points on the ring
- Add tiny "FIG. 0X" measurement ticks (mono text + hairline) along the device frame edges

### 5. Statement / Metrics

- Statement section: layer a faint animated `Constellation` SVG (slow rotate / parallax via CSS transform animation, no JS)
- Metrics: animate the gold numerals with a count-up on first viewport entry (IntersectionObserver in a `useCountUp` hook)

### 6. Early Access

- Add a faint scan-line behind the form panel
- Submit button: gold→ink hover with arrow that slides on hover
- Replace "Submissions reviewed weekly" footnote with monospace `> awaiting transmission_` with blinking cursor

### 7. Footer

- Add a thin telemetry strip above the footer line: `BUILD 2026.05.06 · NODE veris-01 · SIGNAL ◉◉◉○`

## Files touched

- `src/styles.css` — keyframes + utility classes (scan-line, pulse-ring, float-slow, marquee, blink, vignette, noise, constellation helpers)
- `src/routes/index.tsx` — wire new effects into existing sections; add `TelemetryTicker`, `LiveConsole`, `Constellation`, `useCountUp`, and a tiny `useNow()` clock hook (all client-only, all in this one file)
- `src/components/landing/Frame.tsx` — extend `CornerFrame` with optional `glow` prop that animates the corner brackets gold on hover

## Out of scope

- No new routes, no copy changes, no schema or auth changes
- No external animation libraries — pure CSS keyframes + tiny React hooks (count-up, clock)
- No JS scroll libraries — IntersectionObserver only, used minimally

## Tone

Restrained, never gimmicky. Every motion has a reason: scan = sensing, pulse = heartbeat, ticker = live data, noise = film grain. If a viewer pauses for 5 seconds, something subtle should always be moving.
