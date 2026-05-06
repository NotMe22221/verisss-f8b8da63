## Veris — Moonshot Hackathon Mission Control

A single-page, dark cinematic landing page for the Veris smart ring, modeled exactly on the reference mockup. Champagne-gold accents on deep navy, serif display headlines, mono/uppercase micro-labels, subtle grid and corner-bracket framing throughout.

### Page sections (top to bottom)

1. **Top nav** — Veris wordmark + V-mark, links (Features, Business, Contacts), Log In, gold "Secure a Spot" CTA.
2. **Hero — Mission Control**
   - "MISSION CONTROL" eyebrow, large serif headline "Moonshot Hackathon Mission Control"
   - Stat row: Status: Orbital · Participants: 127 Teams · Duration: 48 Hrs
   - Two buttons: gold "Champagne Gold" / outlined "Ghost Style"
   - Atmospheric nebula background with the floating ring product shot on the right
   - Carousel selector strip below (Mission Control active, 3 dimmed slots, prev/next arrows)
3. **Problem section** — "Protection before the damage." with supporting paragraph + two CTAs on the left; 2x2 stat grid on the right ($3.4B lost annually · 127 participants · 25M patients · 480+ duration), each card with corner arrow.
4. **The Device** — large product image inside a faint blueprint grid panel; right side is a grid of feature cards (Titanium Shell, On-device AI, Haptic Engine, Skin Contact Sensors, Sensor Array x2) plus a stat row (7-Day battery · 4g weight · 100m water resistance).
5. **Early Access** — bordered panel with corner brackets. Form fields: Name, Email, Team/Organization, gold "Secure Your Spot" submit. Footer microtext line below.

### Form behavior

- Lovable Cloud enabled; submissions saved to an `early_access_signups` table (name, email, team, created_at).
- RLS: public INSERT allowed; SELECT restricted (no public read).
- Server-side Zod validation (email format, length caps), success toast, duplicate-email handled gracefully.

### Visual system

- Background: deep navy (~oklch 0.18 0.06 265) with subtle nebula radial glow in hero
- Accent: champagne gold (~#D9C29A) for primary CTAs and stat numbers
- Typography: serif display (e.g. Cormorant/Fraunces) for headlines, geometric mono uppercase for labels, clean sans for body
- Recurring motifs: hairline borders, corner bracket frames on cards, faint dot/line grid overlays, small arrow glyphs in card corners
- Ring product imagery generated as assets

### Technical notes

- Single route `src/routes/index.tsx` with section components in `src/components/landing/`
- Tailwind tokens added for navy/gold/border colors in `src/styles.css`
- Form submission via `createServerFn` using `supabaseAdmin` for insert-only
- Generate 2 ring product images (hero floating shot, device blueprint shot) via AI image generation
- Fully responsive: stat grids collapse to 1-col, hero ring moves below headline on mobile
