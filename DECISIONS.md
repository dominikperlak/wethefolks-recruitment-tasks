# Decisions

## General

- **Vite with `base: "./"`** so every ad works from any folder, `modulePreload` off so no polyfill is shipped.
- **Each ad is self-contained**, small helpers are copied instead of shared, because they ship as separate creatives.
- **Positions are measured, not eyeballed**: Python scripts read edges, colors and alpha from the design files, headless Chrome screenshots verify the result.
- **2x assets rendered at 50%.** Full-canvas layers sit at 0,0, small assets get measured positions.
- **Only `transform` and `opacity` are animated.** Moving sprites use `transform` too, because Chrome rounded half-pixel `left`/`top`.
- **Click tag helper is `landingPage.js`**, because an ad blocker blocked a file called `clickTag.js`.

## Game

- **DOM, not canvas.** The design is a stack of image layers: DOM keeps them sharp, GSAP animates them directly, collision uses alpha masks read from the images.
- **Scaling:** `min(width / 360, height / 610)`. Extra height on tall phones grows the navy headline band, so nothing is cut or stretched.
- **`bg.jpg` is one flat color**, so it is a CSS background instead of an image.
- **Hand-made level.** Every obstacle appears once, the first ones match the start screen, a small Python simulation proved the level can be passed.
- **Gentle start:** 1.5 s "get ready" hover, then the speed ramps to ~120 px/s (~18 s run).
- **Fair collision:** a circle around the poo against each obstacle's alpha mask, not the image rectangle. Leaving the playfield fails only once the poo is fully behind the clouds. `?debug=1` draws the hitboxes.
- **Web Audio** instead of `HTMLAudioElement`, which raced with the mobile unlock. The context is created on `pointerup`, when Chrome grants user activation.
- **Replay** stops all sounds and resets the state, so nothing doubles. **`visibilitychange`** pauses the loop, sound and GSAP together.

## Fireplace

- **Continuous background from `bg-big.jpg`.** Its width is exactly 320 + 4 + 1032 + 4 + 320 px, so each part shows its own slice (top at x=324, right at x=1360). The pre-cut `bg.jpg` files were not used: only the left one is a crop of `bg-big.jpg` and their seams do not line up.
- **Shared zoom origin** at the center of the whole fireplace, so seams stay aligned during the zoom.
- **`layout.png` colors are shifted to Display P3**, so comparisons with the design are done on renders converted to P3.
- **PNGs with a black background instead of alpha**, fixed in CSS without touching the files: copy with `mix-blend-mode: screen`, text panel with `clip-path` and `opacity: 0.9` (fitted to the design), CTA with a measured `border-radius`.
- **Headline line by line:** the same image three times, each clipped to one line, so together they give the original.
- **Sync with `postMessage`:** each part tells the preview it is ready, the preview starts all three at once. Without a preview a part starts by itself after 1 s.
- **Idle animation ends at rest after exactly 30 s** by choosing the repeat counts, no hard stop mid-movement.
- **Reduced motion** jumps the timeline to its end, so the final state always matches the animation.
- **Debug overlay** references `layout.png` only at runtime, so it is not bundled.

## Compression

Both ads were already under 3 MB. I compressed them to load faster, only where the loss is invisible.

- **Sound effects 320 → 128 kbps** with LAME, length and start offset unchanged. Music left alone: already 64 kbps, and re-encoding could add a gap to the loop.
- **Game images to a 256-color palette**, only when PSNR ≥ 45 dB, at least 10% smaller and the collision mask is identical (561 → 178 KB).
- **Left untouched:** the moss photo `bg-big.jpg` and the top headline, which would visibly lose quality.
- **Removed unused files:** the game `bg.jpg` and the pre-cut fireplace backgrounds.
