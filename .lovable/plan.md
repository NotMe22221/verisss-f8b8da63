## What's actually wrong

Looked at the live preview: the navbar and hero video render, but everything with a `.reveal-up`, `.reveal-eyebrow`, or `.reveal-head` class is invisible (opacity 0). No JS errors in the console. That means the GSAP "reveal" animations aren't firing on the client even though the CSS that hides those elements *is* applied.

The current setup is fragile:

```text
src/styles.css        →  .reveal-up { opacity: 0 }   (hides content by default)
src/routes/index.tsx  →  useEffect → gsap.to(...)     (supposed to reveal it)
```

If anything delays or breaks that effect — slow hydration, ScrollTrigger initializing before layout settles, a reduced-motion edge case, an SSR/CSR mismatch — the page is left blank. That's exactly what's happening now.

## Fix

Flip the model: **content is visible by default; JS opts it into being hidden, then animates it in.** If JS ever fails or is slow, the user still sees the page.

1. **`src/styles.css`** — remove the rules that hide content:
   - delete `.reveal-up { opacity: 0; transform: translateY(28px) }`
   - delete `.reveal-eyebrow { opacity: 0; … }`
   - delete `.reveal-head .anim-word { transform: translateY(110%); opacity: 0 }`
   - keep the `prefers-reduced-motion` block (now a no-op, harmless).

2. **`src/routes/index.tsx` and `src/routes/about.tsx`** — replace `useEffect` with `useLayoutEffect` (or `useGSAP` from `@gsap/react`, already installed) so we paint the hidden state *before* the browser shows the page:
   - inside the effect, **first** call `gsap.set(targets, { opacity: 0, y: 28 })` for `.reveal-up`/`.reveal-eyebrow` and `gsap.set(words, { yPercent: 110, opacity: 0 })` for headline words — this is the new "hide before reveal" step that used to live in CSS.
   - **then** create the ScrollTrigger `gsap.to(...)` tweens (existing logic).
   - call `ScrollTrigger.refresh()` after `document.fonts.ready` so triggers measure correctly once the custom font finishes loading (the missing `tt-norms-pro-regular.woff2` 404 is shifting layout).
   - keep the `prefers-reduced-motion` early-return (no `gsap.set`, content just shows).

3. **Hero/above-the-fold reveals** — change those specific tweens from ScrollTrigger to a plain `gsap.from`/timeline that runs on mount. ScrollTriggers with `start: "top 85%"` on elements already in the viewport on first load are the most likely thing that's silently failing; a plain timeline removes that whole class of bug for the hero.

4. **Sanity checks while in there**:
   - confirm `ScamCallDemo` and `Magnetic` don't throw during hydration (quick read, no expected changes).
   - keep `ctx.revert()` cleanup so HMR doesn't stack triggers.

5. **Verify in the browser** — after the change, screenshot the homepage and About page, scroll, and confirm the hero headline, eyebrow, paragraph, CTA, and each section's reveal actually animate. If they still don't, add a one-line `console.log` inside the effect and re-check logs — but with step 1 in place, the page is at minimum readable.

## Out of scope

- No new sections, copy, or imagery.
- No dependency changes (`gsap` + `@gsap/react` already installed).
- The 404 on `tt-norms-pro-regular.woff2` is unrelated to motion and stays for a separate pass.
