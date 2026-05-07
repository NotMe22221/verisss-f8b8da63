## What's wrong right now

The page reads as "AI-generated luxury perfume site," not a moonshot tech product:

- Every line is Fraunces serif italic gold — one note, no hierarchy. Apple/Tesla never look like this.
- Hero is a sticky 220vh scroll-deconstruction of a cartoon ring. On mobile it dominates the fold with a tiny image and a giant blur. The "fragments flying out" gimmick adds nothing and obscures the headline.
- Color: gold + dark navy reads decorative, not engineered. Apple/Tesla use near-monochrome with one cool accent, lots of pure neutral.
- Sections all look identical: small gold "§ 0X" label → giant italic serif headline → italic muted paragraph. There is no rhythm, no contrast, no real product shot, no spec grid, no proof.
- Ring images are stylized stock-AI renders sitting on checker-feel backgrounds with hard radial masks. Not a product hero.
- "LiveConsole" floating HUD, animated grain, scroll aurora, mesh drift, marquee — too many decorative systems competing. Apple ships fewer, sharper effects.
- Mobile: hero text gets pushed by sticky frame, science rows stack into giant 5xl italics, device section stacks awkwardly.

## Direction (the bar)

Reference frame: apple.com/vision-pro, tesla.com/cybertruck, x.company (Google X), humane.com, friend.com, openai.com/index/o1.

Principles we will commit to:

1. **One typeface family** — Inter (or SF Pro fallback) at multiple weights. Drop Fraunces entirely. Serif italic gold goes away.
2. **Near-monochrome palette** — true black background `#000`, off-white `#fafafa` text, one cool accent `#7CC4FF` used sparingly, one warm signal red `#FF3B30` for the "intervention" beat only. No gold.
3. **Product-first hero** — full-bleed cinematic ring image, headline anchored bottom-left, no scroll-deconstruction theatrics. One subtle parallax on scroll.
4. **Sectional contrast** — alternate full-bleed dark hero blocks with tight white-on-black spec grids and a single light-mode "manifesto" section. Each section feels different.
5. **Typography as structure, not decoration** — display sizes 96–160px desktop, 48–72px mobile, tight tracking `-0.04em`, weight 500. Eyebrow labels in 11px uppercase Inter, not italic small-caps.
6. **One motion idiom** — slow IntersectionObserver reveals (12px lift + opacity, 700ms, custom cubic). Kill: marquee, blink, spin-slow, mesh-drift, aurora, grain, scroll-aurora.
7. **Real proof** — a compact metrics strip with actual numbers, a hardware spec table, a "how it works" 3-step horizontal scroll-snap on desktop / vertical on mobile.

## Page architecture (new)

```text
[Nav]            tight, monochrome, no telemetry chip
[Hero]           full-bleed product image, headline bottom-left, two CTAs
[Mission]        light-mode (paper) section — single sentence, 120px, dark text on off-white
[How it works]   3-step grid: Detect / Decide / Defend — number, title, 1 sentence, micro-icon
[Device]         split: cinematic ring product shot left, spec table right (real columns)
[Intervention]   the one red moment — fake call transcript styled as terminal, haptic pulse hint
[Numbers]        4-stat strip with countup, monochrome, no boxes
[Access]         minimal form, single column, clear focus states
[Footer]         3-column, all neutral, no gold accents
```

Every section uses the same 12-col grid, same vertical rhythm (160px desktop / 96px mobile section padding).

## Concrete changes

**Tokens (`src/styles.css`)**
- Replace palette: `--background: #000`, `--foreground: #fafafa`, `--muted: #8a8a8e`, `--accent: oklch(0.82 0.10 240)`, `--signal: oklch(0.65 0.22 25)`, `--paper: #f5f5f7`, `--paper-foreground: #1d1d1f`. Remove `--gold`.
- Replace fonts: `--font-display`, `--font-sans` → `Inter` (already loaded? — switch the Google Fonts link to Inter 400/500/600/700 + Inter Tight for display). Drop Fraunces and JetBrains Mono link.
- Delete: `.living-bg`, `.living-grid`, `.scroll-aurora`, `.living-grain`, `.scroll-progress`, `.bg-nebula`, `.marquee-track`, `.blink`, `.float-slow`, `.spin-slow`, `.vignette`, all `.hero-stage`/`.hero-pin`/`.ring-*`/`.frag-*`/`.hero-headline`, `.label-mono`, `.label-italic`.
- Add: `.eyebrow` (11px Inter 500 uppercase tracking 0.14em), `.display-xl` (clamp 56→160px, weight 500, tracking -0.04em, line-height 0.95), `.display-lg`, `.body-lg`, `.reveal` (12px lift, 700ms cubic-bezier(0.2,0.7,0.2,1)), `.section` (py 24/40), `.grid-12`.

**Routes (`src/routes/index.tsx`)**
- Delete: `HeroStage`, `useScrollDriver`, `useNow`, `useLiveSignal`, `LiveConsole`, `Constellation`, `Manifesto`, `Science`, `ScienceRow`, `Device`, `Statement`, `Metrics` in their current form.
- Build: `<Nav>`, `<Hero>` (full-bleed image + bottom-left headline), `<Mission>` (paper bg), `<HowItWorks>` (3-step), `<Device>` (split + spec table), `<Intervention>` (terminal-style call transcript, single red accent), `<Numbers>` (countup strip), `<EarlyAccess>` (kept, restyled), `<Footer>` (restyled).
- Keep working backend wiring: `useServerFn(submitEarlyAccess)`, `Toaster`, `useReveal`, `useInView`, `CountUp`.

**Imagery (`src/assets/`)**
- Generate ONE new hero image: `ring-hero-cinematic.jpg` — true product shot, matte titanium ring on pure black, 21:9, dramatic single rim light from upper-left, photographic not illustrated, 2400×1029. Replace `ring-hero.jpg` reference.
- Generate ONE device shot: `ring-device-studio.jpg` — same ring, three-quarter view, soft studio gradient `#0a0a0a → #000`, 4:5, micro-detail visible (sensor band).
- Delete unused: `ring-shell.png`, `ring-sensors.png`, `ring-haptic.png`, `ring-antenna.png`, `ring-aurora.jpg`, old `ring-hero.jpg`, old `ring-device.jpg`.

**Root (`src/routes/__root.tsx`)**
- Swap Google Fonts link to: `Inter:wght@400;500;600;700` + `Inter Tight:wght@500;600;700`.
- Update favicon SVG to a simple white-on-black "V" mark (no gold stroke).

## Motion budget

- One scroll-revealed section animation (12px lift + opacity, 700ms) used everywhere.
- Hero image: 1.05× → 1.0× scale on initial mount, 1200ms ease-out. No parallax on mobile.
- Numbers: countup on first viewport entry only.
- That's it. No background animations, no marquees, no live HUD.

## Mobile

- Hero image becomes 4:5 crop, headline stacks above CTAs at 48–56px.
- Section padding 96px vertical, 24px horizontal.
- Spec table becomes 2-col compact grid.
- Intervention transcript takes full width.

## Out of scope this pass

- No new backend, no auth changes, no new routes.
- No video assets (would need approval; CSS-only motion is enough).
- No dark/light toggle — page is dark with one inverted "paper" Mission section by design.

## Files touched

- `src/styles.css` — full rewrite of tokens + utilities
- `src/routes/__root.tsx` — fonts + favicon
- `src/routes/index.tsx` — full rewrite of page composition
- `src/assets/ring-hero-cinematic.jpg` — new (image generation)
- `src/assets/ring-device-studio.jpg` — new (image generation)
- delete 6 unused ring assets
