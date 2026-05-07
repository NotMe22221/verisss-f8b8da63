## Goal

Recolor the landing page so the palette is built from two brand colors:

- **#F4EFE6** (warm cream) — page surface, light text on dark
- **#1B3A4B** (deep teal) — primary brand color: dark cards, primary buttons, dark text on light

This is a pure recolor of `src/routes/index.tsx`. No layout, copy, or component changes.

## Color mapping

Today the page uses `#F5F5F5` as background, `#2B2644` (dark slate) as card color, and pure `black` / `white` for type and buttons. New mapping:

| Current | New | Where it's used |
|---|---|---|
| `bg-[#F5F5F5]` | `bg-[#F4EFE6]` | page + every section background |
| `bg-[#2B2644]` | `bg-[#1B3A4B]` | dark info cards, device card, feature/stat tiles |
| `bg-black` | `bg-[#1B3A4B]` | primary pill CTAs ("Join the beta", "See the device") |
| `hover:bg-gray-800` | `hover:bg-[#14303f]` | hover state for primary pills (slightly darker teal) |
| `text-black` | `text-[#1B3A4B]` | all dark headings/body on cream |
| `text-black/70`, `text-black/60`, `text-black/50` | `text-[#1B3A4B]/70`, `/60`, `/50` | muted body / eyebrows / marquee logos |
| `hover:text-black` (nav links) | `hover:text-[#1B3A4B]` | navbar link hover |
| `text-gray-700` (nav links) | `text-[#1B3A4B]/70` | navbar links default |
| `text-white`, `text-white/60`, `/70`, `/40` | `text-[#F4EFE6]`, `/70`, `/60`, `/40` | type inside dark teal cards |
| `bg-white` (icon circle inside black pill) | `bg-[#F4EFE6]` | arrow circle inside primary pill |
| `text-black` (arrow inside white circle) | `text-[#1B3A4B]` | arrow glyph color |
| `bg-white/80 backdrop-blur` (Use Cases arrow circle on video) | keep `bg-[#F4EFE6]/80 backdrop-blur` | small arrow circle over video card |

The `<HeroSection>` keeps the background video; only the eyebrow / headline / sub / CTA colors change to the cream-on-video + teal pill scheme above. The hero brand marquee text (`text-black/60`) becomes `text-[#1B3A4B]/60`.

The `BackedBySection` marquee logos go from `text-black/50` to `text-[#1B3A4B]/50`.

The page wrapper `bg-[#F5F5F5]` becomes `bg-[#F4EFE6]`.

## Out of scope

- No changes to `src/styles.css` (the CSS variables there already use these two colors and are not consumed by this page's hard-coded classes).
- No copy, structure, font, animation, or asset changes.
- No new components.

## Files

- `src/routes/index.tsx` — single-file find-and-replace of the color tokens listed above.