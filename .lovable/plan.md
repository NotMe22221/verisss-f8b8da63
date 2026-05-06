## Design critique (what a senior product designer would flag)

Looking at the current page through a Figma-design-review lens, the visual system is strong — typography, gold accent, lab grid, mono micro-text — but it's drowning in content. The page reads like a manifesto pasted into a beautiful frame. Specific issues:

1. **Density problem.** The Manifesto section alone has 13 paragraphs + 2 pull-quotes + a list. On mobile (current 384px viewport) this becomes a wall. Apple, Humane, Whoop, Oura, Rabbit — none of their landing pages exceed ~6 sentences per scroll section.
2. **Repetition.** "Cognitive defense system" appears 6+ times. "Before financial loss / before damage / before money is lost" appears 4×. "On-device AI" 4×. The brand starts to feel like it's convincing itself.
3. **No rest.** Every section is full-bleed text + grid + nebula + scan-line + ticker + live console. Without silence, none of the motion reads as special. A moonshot page needs 1–2 "held breath" moments.
4. **Hierarchy collisions.** Display 5xl → 3xl pull-quote → display 2xl → mono list → display 2xl, all stacked. The eye has no anchor.
5. **Hero overload.** 4 corner callouts + pulse rings + scan line + UTC clock + 4 hero stats + ticker directly above + status bar above that. The ring — the actual hero — has to fight for attention.
6. **Hydration bug.** `useNow()` renders `new Date()` on the server and a different time on the client → repeated hydration errors in Hero footer + LiveConsole. Needs a mount guard.
7. **Mobile rhythm.** Section padding is `py-20 md:py-32` everywhere — at 384px the page is one long scroll with identical cadence. Pro pages vary cadence (short → long → short).

## The fix — editorial first, then composition

### A. Cut copy by ~60% (no new ideas, just discipline)

**Hero**
- Eyebrow shortens to: `MOONSHOT 03 — COGNITIVE DEFENSE`
- Subhead trims to one sentence: *"A wearable intelligence system that detects coercion and scam pressure in real time — before loss occurs."*
- Trust line removed (data already lives in HeroStats)
- Hero stats: drop "Status / Mode" → keep only `127 FAMILIES` and `9 STATES` as 2-up

**Manifesto** — collapses from 13 paragraphs to 4 movements with breathing room:
1. Opening statement (kept): *"Today's attacks no longer target systems. They target human cognition."*
2. One paragraph on why older adults are exposed (merged from two)
3. Pull-quote: *"Every existing fraud system reacts too late."*
4. Closing statement: *"Veris was built to change that."* — full stop, link forward.

The detailed mechanism (HRV/EDA, language fusion, no-screens list, haptic interruption) **moves into the How-It-Works cards** where it actually belongs. One idea per card body, not 4 sentences.

**How It Works** — keep 4 cards but cut each `desc` to **one sentence, max 12 words**.

**Device** — keep image + spec table. Cut the two prose paragraphs to a single line: *"No cloud. No recordings. Audio processed locally and discarded."* The spec table does the talking.

**Statement** — kept (this is the cinematic breath). Trim the 3-sentence body to one line.

**Metrics** — kept as-is (already tight).

**Early Access** — drop the subhead entirely; the heading + form is enough.

### B. Composition refinements

- **Vary section cadence**: Manifesto + Statement get extra vertical space (`py-40`), Device + Metrics get tighter (`py-20`). Creates a breathing rhythm instead of constant drone.
- **Hero**: remove 2 of the 4 ring callouts (keep `01 · HRV` top-left + `04 · IMU` bottom-right only — diagonal balance, less noise). Remove UTC clock from hero (it's already in LiveConsole). Drop ticker on mobile (`hidden md:block`).
- **Manifesto layout**: switch from 280px sticky aside to a single centered column with a small left rail (`§ 01`). The current 2-col layout wastes the left third on mobile and forces narrow text on desktop.
- **Pull-quote** demoted from `text-3xl` to `text-2xl` italic — currently competes with the H2.
- **How-It-Works**: gap-px grid on a 384px viewport renders as 4 stacked full-width slabs with no internal padding feeling. Add `md:grid-cols-2 lg:grid-cols-4` (already there) but increase mobile inner padding to `p-6` and reduce title from `text-2xl` to `text-xl` on mobile.
- **Status bar + Telemetry ticker**: merge into a single thin bar on mobile (currently two separate stripes eat 60px before the user sees anything). On desktop keep both.
- **Footer build strip**: hide on mobile.

### C. Fix the hydration error (quietly)

`useNow()` returns `new Date()` during SSR and a different time on hydration. Two call sites: Hero footer UTC + LiveConsole UTC row. Fix by initializing state to `null` and only setting after mount:

```ts
function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}
```

Render guards: `{now && now.toISOString().slice(11, 19)}`.

### D. Tone of voice pass

Replace these phrases (each used multiple times) with single canonical wording:
- "Cognitive defense system / infrastructure" → use **once** in eyebrow, **once** in footer. Nowhere else.
- "Before financial loss / before damage / before the mind understands" → keep only the headline use ("Protection before the damage.") and one closing pull-quote.
- "On-device AI" → mentioned once in Device specs, once in HowItWorks. Removed from Hero trust line and Manifesto.

## Files touched

- `src/routes/index.tsx` — copy cuts in Hero / Manifesto / HowItWorks / Device / Statement / EarlyAccess; hydration fix in `useNow`; layout adjustments (Manifesto column, Hero callouts, mobile rhythm); merge StatusBar + Ticker on mobile.

## Out of scope

- No new sections, no new images, no schema changes
- No removal of motion system (scan-line, pulse-ring, constellation, count-up all stay)
- No new dependencies

## Result

The page goes from ~1,400 words to ~550 words. Same story, told with the confidence of a brand that doesn't need to over-explain. Each section becomes a single, memorable beat. Motion still alive. Moonshot intact — but now restrained, which is what makes a moonshot brand feel real instead of performative.
