## The bug

The four ring-fragment PNGs (`ring-shell`, `ring-sensors`, `ring-haptic`, `ring-antenna`) were generated with a **checkerboard pattern baked into the pixels** instead of real alpha transparency. So everywhere we render them — the hero scroll-deconstruction and the Science section rows — users see a Photoshop-style grey checker square framing the component. It looks broken, not designed.

## Fix

### 1. Regenerate the four fragment assets cleanly
Re-run image generation for `ring-shell.png`, `ring-sensors.png`, `ring-haptic.png`, `ring-antenna.png` with an **explicit solid dark-navy background** matching the page (`#05070d`-ish), not "transparent." This kills the checker and lets the components sit naturally on the page surface. Each render is the isolated component, dramatic gold rim light, same palette as `ring-hero.jpg`.

We drop the pretense of transparency — these never needed to be cut-outs because every place we use them is on the same dark background anyway. A radial vignette inside the image fades the edges into the page so there's no visible square boundary.

### 2. Render fragments without a hard frame
In `src/routes/index.tsx`, the `<img>` tags for fragments get wrapped so the natural edge of the render dissolves:
- `mask-image: radial-gradient(circle, black 55%, transparent 78%)` on the fragment images
- Removes the perception of a square boundary even before the new renders land
- This same mask gets applied to the four hero fragments, so the hero deconstruction also stops showing square outlines

### 3. Soften the Science layout
Right now each Science row dedicates a giant tile to one fragment, which is what made the checker so visually loud. Adjustments:
- Shrink the fragment column from `md:w-72` to `md:w-56`, push it further right
- Add a faint gold radial glow *behind* the image (not on it) so the component reads as "lit from below" rather than "pasted onto a square"
- Remove the drop-shadow filter that was emphasizing the square edge

### 4. Files touched
- `src/assets/ring-shell.png`, `ring-sensors.png`, `ring-haptic.png`, `ring-antenna.png` — regenerated
- `src/styles.css` — add `.ring-fragment` mask + glow utility
- `src/routes/index.tsx` — apply mask wrapper in `ScienceRow` and the hero fragment block, drop the heavy drop-shadow

## Result

No more checkerboards. Each ring component reads as a glowing object floating in the same dark space as the rest of the page, with edges that dissolve into the background instead of sitting in a grey square.
