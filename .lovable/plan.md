## Goal

Keep the new Halo-style fintech layout (navbar, hero with video, info cards, backers marquee, use cases, etc.) but swap all the placeholder Halo copy back to the original **Veris** wearable / Moonshot Cognitive Defense content, and re-add the Early Access form that writes to the existing `early_access_signups` table.

## Sections (in order)

1. **Navbar** — `Veris` wordmark + LogoIcon. Links: Mission · The Device · Science · Press · Manifesto. Right CTA pill: "Secure Your Spot" → `#early-access`.

2. **Hero** (full-screen video card, kept as-is structurally)
   - Eyebrow: `MOONSHOT IDEA 03 · PRIVATE BETA · COGNITIVE DEFENSE`
   - Headline: `Protection before the damage.`
   - Subheadline: `Veris is the first wearable intelligence system designed to detect coercion, manipulation, and scam pressure in real time — before financial loss occurs.`
   - CTA: `Join the beta` (pill + arrow circle)
   - Marquee brands swapped to credibility logos: MIT Media Lab, DARPA, Stanford HAI, FINCEN, AARP Labs, Apple Health, Verily.

3. **Info / Problem section** ("Meet Veris.")
   - Left: eyebrow `The Problem`, h2 `Meet Veris.`, CTA `See the device`.
   - Right paragraph: `$3.4B is lost annually to elder fraud, romance scams, and coercive financial pressure. Veris stops the damage before it happens.`
   - 3 dark cards (drop the image card to stay on-brand): "Detects coercion in real time", "Private by design", "Built for the moment" — copy aligned with Veris.

4. **The Device** (new, replaces generic Halo info)
   - Eyebrow + h2 `The Device`.
   - Left: existing `ring-device-studio.jpg` in a rounded dark card.
   - Right grid: 4 feature tiles (Titanium Shell, On-device AI, Haptic Engine, Skin Contact Sensors) + 3 stat tiles (7-DAY Battery, 4g Weight, 100m Water resistance).

5. **Backed By** marquee — relabel to "Funded by premier partners and forward-thinking leaders." with VC logos: Founders Fund, Andreessen, USV, Khosla, Lux Capital, DCVC, 8VC, Founders Forum.

6. **Who it protects** (replaces Halo "Use modes")
   - Left: eyebrow `Veris in the Field`, h2 `Who it protects`, supporting copy on aging parents / isolated adults / high-risk individuals.
   - Right: video card with overlay h3 `Families`, copy about the 127 families / 9 states pilot, "Join the pilot" link.

7. **Early Access** (new dark rounded panel, `#early-access`)
   - Eyebrow `Private Beta`, h2 `Secure your spot.`
   - Form fields: Name, Email, Team / Family.
   - Submit pill `Secure spot` → calls existing `submitEarlyAccess` server fn; toast on success / duplicate / error.
   - Footer line: `Cohort 03 · 127 families · 9 states · on-device AI · private by design`.

## Technical

- Single file edit: `src/routes/index.tsx` — replace Halo copy with Veris copy, add `DeviceSection` and `EarlyAccessSection`, keep all layout/animation/marquee CSS unchanged.
- Reuse existing `submitEarlyAccess` from `src/lib/early-access.functions.ts` and `Toaster` from `@/components/ui/sonner`.
- Reuse existing asset `src/assets/ring-device-studio.jpg` for the device shot.
- Keep `bg-[#F5F5F5]`, dark cards `#2B2644`, TT Norms Pro font setup, and both marquee keyframes from the current build.
- No DB migration needed (table already exists).

## Out of scope

- No new images generated.
- No design-token / `styles.css` changes.
- No new routes.
