## Goal

Make the 7 homepage images feel like real documentary / editorial photography instead of obviously AI-generated stock.

## What looks "AI" right now

Common tells in the current set: too-perfect skin, plastic catchlights, symmetrical faces, over-smooth hands (extra fingers risk), uniform soft golden light, shallow depth-of-field on everything, generic "stock-warm" color grade, jewelry that looks rendered (too clean, perfect bevels).

## Approach

Regenerate each image with prompts engineered to fight those tells:

- Shoot-style language: "shot on Leica Q3, 35mm, available light, ISO 800, mild grain", "Kodak Portra 400 scan", "Fujifilm Pro 400H, slight halation", "documentary photo, unposed".
- Real imperfection: "natural skin texture, visible pores, fine wrinkles, no retouching, asymmetric face, candid expression, eyes not looking at camera".
- Real environments: cluttered kitchen counter (mail, mug, reading glasses), worn wood, fingerprints on the phone screen, soft window light with one direction, no rim-light halo.
- Hands: "hands clearly five fingers, natural knuckles, age spots, veins visible, ring sits naturally with slight tilt".
- Product shots (ring, prototype): "studio product photography, single softbox, real titanium with micro-scratches, dust specks visible, shallow but not extreme DoF, no glow".
- Color: pull away from amber/teal duotone — "neutral white balance, slight cyan in shadows, muted not saturated".
- Composition: "off-center, rule-of-thirds broken, foreground occlusion, slight motion blur on hand".

Use `imagegen--edit_image` where possible to keep composition but re-render in a more photographic style; fall back to `generate_image` (premium tier) for portraits where realism matters most.

## Images to redo

```text
story-grandparent.jpg       portrait, Portra 400 look, window light, real wrinkles
ring-design-macro.jpg       macro product, real titanium, micro-scratches, dust
ring-prototype-bench.jpg    messy engineer bench, solder marks, coffee ring
usecase-kitchen-call.jpg    candid, cluttered kitchen, phone screen reflection
usecase-family-relief.jpg   adult child on couch, phone in hand, unposed
usecase-second-doubt.jpg    older woman mid-thought, unflattering honest light
who-its-for-portrait.jpg    two hands, real age difference, ring slightly tilted
```

Quality tier: `premium` for the 4 portraits, `standard` for the 3 product/scene shots. All saved over the existing paths so no code changes are needed.

## Out of scope

No layout, copy, or animation changes. Just swap the image files.
