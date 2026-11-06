# We The Folks: Rich Media Ads Recruitment Task

Two animated rich media ads built with plain HTML, CSS, JavaScript and GSAP.

- **Variant A: Game Ad "Gut Run"** (`variant-a-game/`): mobile tap-to-jump mini game, 360x640.
- **Variant B: Fireplace Ad** (`variant-b-fireplace/`): top banner (1032x250) and two skyscrapers (320x975).

The reasoning behind the main choices is in [DECISIONS.md](./DECISIONS.md).

## Live

- Game: https://dominikperlak.github.io/wethefolks-recruitment-tasks/variant-a-game/
- Fireplace: https://dominikperlak.github.io/wethefolks-recruitment-tasks/variant-b-fireplace/preview.html

## Recording

Short screen recordings without sound (the game itself has music and effects): [game](./media/game.mp4) and [fireplace](./media/fireplace.mp4).

## Run it locally

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

| URL                                          | What                                  |
| -------------------------------------------- | ------------------------------------- |
| `/variant-a-game/`                           | Game (use the phone view in DevTools) |
| `/variant-b-fireplace/preview.html`          | All three fireplace parts together    |
| `/variant-b-fireplace/{top,left,right}.html` | Each fireplace part on its own        |
| add `?debug=1`                               | Game hitboxes / design overlay at 50% |

## Weight

| Ad        | Before compression | Shipped |
| --------- | ------------------ | ------- |
| Game      | 2.01 MB            | 1.13 MB |
| Fireplace | 2.19 MB            | 2.19 MB |

## Known issues and shortcuts

- **Some fireplace assets do not match the design.** Used as they are, nothing redrawn:
  - `top/bg.jpg` and `right/bg.jpg` are not cut from `bg-big.jpg` and their seams do not line up. I used `bg-big.jpg`, so the product on the right is about 20% bigger than in `layout.png`.
  - `box.png`, `cta.png` and the skyscraper `hl.png` files have a black background instead of transparency, handled in CSS.
  - `top/hl.png` says "STARK BEI …" while `layout.png` says "NATÜRLICH STARK BEI …".
- The fireplace `?debug=1` overlay only works with `pnpm dev`, the design file is kept out of the build.
- A fireplace part outside the preview waits up to 1 s for the start message, then starts on its own.
- The game pauses on `visibilitychange`, which does not fire on Cmd+Tab while the tab stays visible.

## What I would do next

- Ask about the asset mismatches and swap in corrected files.
- Test on more real devices and inside real ad server containers.
- Pause the game when the ad scrolls out of view (`IntersectionObserver`).
- Add Playwright visual regression tests against the design files.

## How I used AI

I worked with Claude Code, but I drove the project. I designed the setup and structure myself (Vite, ESLint, Prettier, CI, conventions, branch and PR workflow), set the plan, made the key decisions, tested every step manually in the browser and reviewed each change before committing it. Claude Code wrote most of the code under that review and helped with measuring assets and checking animations in headless Chrome. One thing I had to fix: its first audio setup used `HTMLAudioElement`, which sometimes stayed silent on mobile, so I switched it to Web Audio.
