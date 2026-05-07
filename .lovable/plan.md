## Goal

Remove the "Funded by premier partners…" backers marquee section from the landing page.

## Changes (single file: `src/routes/index.tsx`)

1. Delete the `backers` array (lines 223–233) and the `BackedBySection` component (lines 235–260) — the entire `/* ---------- BACKED BY ---------- */` block.
2. Remove the `<BackedBySection />` render in `VerisLanding` (line 274).

No other changes. No copy, layout, or color edits elsewhere.