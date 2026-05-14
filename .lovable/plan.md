
# Rebuild site to match Figma mockup

Restructure the landing page into the exact section order, layout, and visual language shown in your two screenshots. Cream background `#F4EFE6`, deep navy `#1B3A4B` text, warm gold accent — keep current palette, replace the layout.

## New page structure (top → bottom)

1. **Pill nav bar** — single rounded pill at top: `VERIS` wordmark left, then icon+label links: 🏠 HOME · 👥 ABOUT · ▶ MANIFESTO · 🔧 PROTOTYPE. Cream background with subtle gold gradient, navy text.

2. **Hero — VERIS** — two-column on desktop, stacked on mobile. Left: large hero ring product render with soft warm radial glow behind it. Right: huge `VERIS` wordmark (heavy serif/sans, navy) + 3-line lede paragraph.

3. **Problem** — two-column. Left: line-art illustration of a worried face (single-stroke style). Right: `PROBLEM` headline + 3-line paragraph.

4. **Data** — centered headline `DATA`, three large circular stat medallions in a row (currently grey placeholders → fill with real numbers like "1 in 6", "$48B", "19 min"), then a centered 3-line caption beneath.

5. **Feature block (XXXXXX → real heading)** — reversed two-column: text left, ring render right. Multi-paragraph body.

6. **The Architecture** — centered headline `THE ARCHITECTURE` with `*Out of scale` subnote. Exploded-view diagram of ring components with "Piece X" callouts above and below each part, connected by thin lines.

7. **Second feature block** — two-column: hand-wearing-ring photo left, headline + body right.

8. **The Team** — centered headline `THE TEAM`. Row of 5 portrait cards (rounded rectangles, circular avatar on top, then Name / Who? / Social-contact stacked below).

9. **Footer wordmark block** — large rounded cream card containing huge gold `VERIS` wordmark, ring render below, and `©2026, Veris. All rights reserved.` micro-text.

## Visual specs

- Background everywhere: `#F4EFE6` cream
- Primary text: `#1B3A4B` deep navy
- Accent: warm gold/bronze (`#C9A96A` range) for the footer wordmark and ring highlights
- Typography: keep current heavy sans for headings, all caps for section titles (`PROBLEM`, `DATA`, `THE ARCHITECTURE`, `THE TEAM`)
- Generous vertical rhythm: ~120px between sections on desktop, ~80px on mobile
- Rounded `2xl` corners on all cards/medallions
- Soft warm radial glows behind ring renders (already have hero-mesh utility)

## Assets needed

Reuse existing where possible, generate the missing ones:
- Hero ring render — reuse current ring asset
- Worried-face line drawing — generate (single-stroke ink illustration, navy on cream, transparent bg)
- Exploded ring architecture diagram — generate (6 components with callout lines, navy labels)
- Hand wearing ring photo — generate (clean studio shot, hand with ring, cream bg)
- 5 team avatar placeholders — generate neutral circular silhouettes or use initials

## Animations

Keep all the motion work from the previous turn (curtain wipe, headline word-rise, eyebrow slides, fade-up reveals, prototype rail draw, hero device sway). Re-attach the reveal classes (`reveal-head`, `reveal-eyebrow`, `reveal-up`, `reveal-image`) to the new sections so everything still animates on scroll.

## Files to change

- `src/routes/index.tsx` — rewrite section order to match mockup
- `src/components/landing/Frame.tsx` (nav) — convert to single pill with icon+label links
- New: `src/components/landing/HeroVeris.tsx`, `ProblemSection.tsx`, `DataSection.tsx`, `ArchitectureSection.tsx`, `HandSection.tsx`, `TeamSection.tsx`, `FooterWordmark.tsx`
- Remove from page: `StorySection`, `UseCasesSection`, `ScamCallDemo`, `LiveSignalStrip`, `BusinessModelSection`, `WhoItsForSection`, `PrototypeSection` (keep files in repo, just unmount — easy to restore)
- `src/styles.css` — add `.section-title` (centered uppercase), `.stat-medallion`, `.team-card`, `.footer-wordmark-xl` tokens
- Generate 4 new images into `src/assets/`

## Open questions before I build

1. **Real copy** — the mockup uses `bla bla bla` placeholder. Should I write fresh copy for VERIS / Problem / Data / each feature block / hand section, or do you want to send the real text?
2. **Data section numbers** — what 3 stats go in the medallions? (default suggestion: "1 in 6 seniors targeted yearly", "$48B lost to phone scams", "<20 min average wire time")
3. **Team** — 5 placeholder cards with "Name / Role / @handle", or do you have real names + photos to drop in?
4. **Sections to drop entirely** — confirm I can remove Story, Use Cases, Scam-call demo, Business model, Who-it's-for, Prototype rail from the homepage (they aren't in the mockup). I'll keep the source files so we can restore them later.
