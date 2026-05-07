# Veris — Warm Redesign Plan

Shift the landing from "dark/mysterious cybersecurity" to "calm, premium, human protection." Same single page (`src/routes/index.tsx`), same stack — restructured sections, new palette, new imagery, softened copy.

## 1. Palette & global tokens (`src/styles.css`)

Move from dark slate base to warm, airy base. New tokens:

- `--background: #FBF8F2` (warm cream)
- `--foreground: #1F2A3A` (soft navy ink, not black)
- `--card: #FFFFFF` with `--card-foreground: #1F2A3A`
- `--muted: #EFE7D8` / `--muted-foreground: #6A6A66` (warm gray)
- `--accent: #C8A26A` (champagne gold) → for hairlines/icons only, never floods
- `--secondary: #2C4A63` (muted navy) — used sparingly for one accent block
- New: `--surface-warm: #F4EBDA`, `--surface-sun: #F9E9C9` (sunlight wash)

Body bg becomes cream. Remove the dark-slate default. Keep `paper` token but invert: now the rare *darker* panel is the inversion.

## 2. Hero (rebuild)

Replace the grayscale dark-tinted video with a **bright, warm, human hero**:

- Full-bleed image of an older woman at home in soft window light, wearing the ring naturally (hand resting on a coffee mug). Generated via Lovable AI image gen (Nano Banana Pro), saved to `src/assets/hero-grandmother.jpg`.
- Layered soft gradient: warm cream → translucent at the bottom for legibility. No dark mix-blend overlay.
- Eyebrow: `Quiet protection, worn naturally`
- H1 (large, navy ink, generous leading): **"Protection before the damage."**
- Subhead: "A calm, wearable layer of intelligence for the people who matter most — designed to protect independence, not replace it."
- Primary CTA: **Join Early Access** (filled navy pill)
- Secondary CTA: **See How It Works** (ghost, navy outline)
- Remove the brand marquee from the hero — moved lower as a quiet trust strip.

## 3. New section: "Worn naturally" (human moments)

Editorial 3-up image grid with short captions, no dark cards:

1. Grandmother answering a phone call at home — *"The body reacts before the mind understands."*
2. Older man at the front door speaking to a stranger — *"A gentle pause when something feels off."*
3. Daughter glancing at a reassuring notification — *"Family stays close, without watching."*

Soft rounded corners, generous whitespace, captions in warm gray. Images generated to `src/assets/scene-{1,2,3}.jpg`.

## 4. Rework "The Problem" → "Why Veris"

Drop the $3.4B fear stat as the lead. Replace with an emotional, calm two-column:

- Left: small eyebrow "Why Veris", H2 *"Designed to protect independence, not replace it."*, short paragraph about quiet intervention.
- Right: three stacked light cards (white on cream, hairline border, gold dot accent):
  - **Calm** — "A soft haptic, never an alarm."
  - **Private** — "Nothing leaves the ring. No cloud, no recording."
  - **Human** — "Built with families, for families."

No more dark navy card grid.

## 5. "The Ring" product section

Bright, editorial product moment:

- Large soft cream panel with the existing `ring-device-studio.png` floated on a champagne-gold gradient wash (light, sunlit feel, not dark).
- Right column: 4 minimal feature rows separated by hairlines (titanium, on-device AI, haptic, 7-day battery). Numbers live as small ticks, not bold dark cards.
- Tagline above: *"Lightweight. Non-medical. Quietly present."*

## 6. Family reassurance band

Single full-width warm panel (cream + soft sun gradient): an editorial photo of a multi-generational moment (daughter + mother) on the left, on the right one quote-style line: *"Quiet protection for the people who matter most."* Below: small CTA "Join Early Access".

## 7. Trust strip + footer

- Quiet brand row (the existing `heroBrands` list) rendered as a single static, low-contrast row — not a marquee in the hero. Label: "In conversation with".
- Minimal footer: logo, short manifesto line ("Human-aware technology."), nav links, copyright. All in warm gray on cream.

## 8. Navbar

Keep current structure but:
- Transparent over the bright hero (navy ink already works on cream).
- Update links to: Mission · The Ring · Science · Families · Press
- Add a small navy-pill "Join Early Access" CTA on the right (desktop).

## 9. Imagery generation

Generate four warm, editorial, photo-real images via Lovable AI (`google/gemini-3-pro-image-preview`) into `src/assets/`:
- `hero-grandmother.jpg` — older woman, warm window light, ring on finger, mug.
- `scene-phone.jpg` — older woman calmly on a landline, kitchen, warm light.
- `scene-door.jpg` — older man at front door, daylight, ring visible.
- `scene-family.jpg` — adult daughter glancing at phone with calm expression, mother in soft focus behind.

Style prompt baseline: "editorial photography, natural warm window light, shallow depth of field, soft skin tones, cream and champagne palette, dignified, calm, no tech UI overlays."

## 10. Copy direction (locked)

- Avoid: "fraud," "scam," "attack," "intervene" as a verb pattern.
- Lean on: independence, calm, protection, family, dignity, quiet, trust.
- Headlines stay short (≤7 words). Body lines stay ≤2 sentences.

## Out of scope
- Animations beyond existing `reveal` / soft fades.
- New routes or backend changes.
- Auth / early-access form rework (existing CTA anchor stays).

## Files touched
- `src/styles.css` — palette + a couple of warm utility classes.
- `src/routes/index.tsx` — full section rewrite (single file, same exports).
- `src/assets/` — 4 new generated images.

After implementation: visual QA at mobile (384px) and desktop widths; verify cream bg, navy ink contrast (WCAG AA on body copy), and that no dark slate panels remain except possibly one tasteful accent.
