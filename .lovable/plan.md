## The problem with the current page

Right now the page is: **Hero → one stat → ring specs.** No problem narrative, no solution, no "how it works," no who-it's-for, no science/trust, no real CTA. It reads like a product spec sheet, not a moonshot.

A moonshot page has to do four things the current one doesn't:

1. **Name the enemy** clearly (the problem is bigger than "elder fraud")
2. **Show the mechanism** (how does a ring actually stop a scam?)
3. **Earn belief** (science, pilots, who's behind it)
4. **Close the loop** (a real CTA, not a dead `#early-access` anchor)

## New page structure

```text
Hero  →  PROBLEM  →  HOW IT WORKS  →  WHO IT'S FOR
      →  Device  →  SCIENCE & TRUST  →  MANIFESTO LINE  →  CTA + FOOTER
```

All new sections use the existing craft language: cream `#F4EFE6`, deep teal `#1B3A4B`, `rounded-2xl`, `-0.03em` tracking, `max-w-[88rem]`, no new dependencies, no new files.

---

### 1. PROBLEM section — replaces the thin "Meet Veris" block

Reframe "$3.4B" as a real argument, not a stat in a card.

- Eyebrow: `The Problem`
- Headline: **"Every fraud system in the world reacts after the money is gone."**
- Left column — short paragraph: *"Banks freeze the transfer after it clears. Apps flag the call after it ends. Family finds out after the regret. By then the damage is done — financially, and to the trust an older person has in their own judgment."*
- Right column — three large stat lines stacked:
  - `$3.4B` — lost annually to elder fraud (FTC, 2024)
  - `1 in 10` — adults 65+ targeted every year
  - `$35,000` — average loss per incident
- Sources line, 11px muted teal.

The current `InfoSection` (Meet Veris + 3 dark cards) is removed — its content is absorbed into the new sections so nothing duplicates.

### 2. HOW IT WORKS section — the section the page is most missing

The "moonshot" only lands if the mechanism is legible. A 4-beat flow on desktop, stacked on mobile. Each step: small numeral (01–04), verb headline, one sentence.

1. **Sense.** The ring continuously reads heart-rate variability, skin conductance, and micro-stress signatures.
2. **Listen.** On-device AI analyzes the conversation locally — for scripted scam patterns, urgency, impersonation cues, emotional coercion.
3. **Interrupt.** When manipulation is detected, a quiet haptic pulse breaks the spell. A single moment to think.
4. **Alert.** If pressure continues, a trusted family contact gets a discreet notification — never a recording, never a transcript.

Closing line, italic teal/70: *"Nothing leaves the ring unless it has to. No cameras. No surveillance. No loss of independence."*

### 3. WHO IT'S FOR section

Two-card split so both buyer and wearer see themselves. Cream cards with thin teal borders.

- **For families** — *"Peace of mind without putting a camera in your parents' home or asking them to hand over their phone."*
- **For older adults** — *"Protection that respects you. The ring stays on your finger. The decision stays yours."*

### 4. DEVICE section — keep as-is, but moved *below* the story

So the page reads story → product, not product → story.

### 5. SCIENCE & TRUST section

Three columns on cream — the credibility the marquee hints at but never cashes in.

- **Built on peer-reviewed signals** — short note on HRV + voice-stress literature.
- **Privacy by architecture** — *"On-device inference. No cloud transcripts. No audio ever leaves the ring."*
- **In pilot with** — short list (e.g. AARP Labs pilot, MIT Media Lab affiliates, advisory board). Honest framing — "in pilot with" / "advised by," not implied endorsement.

### 6. MANIFESTO LINE — full-bleed teal band

One sentence, large, cream on `#1B3A4B`, no buttons. The emotional hinge before the CTA.

> *"Fraud is no longer a financial problem. It's a cognitive one. We built Veris for the second before the decision — because that's the only second that matters."*

### 7. CTA + FOOTER

The page currently has `<a href="#early-access">` pointing nowhere. Wire the real block.

- Closing headline: **"Be early. Be the reason it doesn't happen to them."**
- Email capture wired to the existing `src/lib/early-access.functions.ts` server function. Single input + "Request access" button. Inline success state, `sonner` toast on error.
- Slim footer: logo · "Veris is in private beta — by invitation, with care." · © 2026 · placeholder text links (Mission, Manifesto, Privacy, Contact) matching the navbar.

---

## Technical notes

- All sections live in `src/routes/index.tsx`, same single-file pattern as today.
- Reuse tokens: `bg-[#F4EFE6]`, `text-[#1B3A4B]`, `rounded-2xl`, `max-w-[88rem] mx-auto`, `px-6 py-24`, `-0.03em` tracking.
- Email form: import existing server function from `src/lib/early-access.functions.ts`, submit via async handler. Already in the codebase — no new backend work.
- Mobile (the user's current 384px viewport): every section is `grid-cols-1` at base, splits to `md:grid-cols-2` / `lg:grid-cols-4` only at breakpoints. The 4-step "How It Works" stacks vertically on mobile so nothing clips.
- Update `<head>` meta to the new positioning ("Every fraud tool reacts. Veris intervenes.") and refresh the description.
- Remove `InfoSection` from the render tree. New order: `Hero → Problem → HowItWorks → Audience → Device → Science → Manifesto → CTA → Footer`.
- Quietly fix the runtime error currently showing in preview (failed dynamic import of the TanStack client entry) as part of the same pass.

## Out of scope

- Custom illustrations or new imagery — type + layout only.
- Real Privacy / Manifesto pages — footer links stay placeholder.
- Wiring navbar links to anchors (follow-up if you want it).
