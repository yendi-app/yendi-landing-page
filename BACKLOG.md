# Backlog

Potential enhancements that are out of scope for the current build but worth
revisiting later. Each item notes why it was deferred and where to pick it up.

## Scroll-entrance animations + controller script

The "How to" steps and Finale currently render fully visible/static — no
scroll-driven reveal, no looping in-screen micro-animations, no progress rail.
The original design (`rawfiles/yendi-v7.js` + matching CSS in
`rawfiles/yendi-v7.css`, `yendi-how.css`, `yendi-lux.css`, `yendi-flow.css`)
includes:

- A small controller script that adds an `html.js` class, runs a
  `requestAnimationFrame` loop to mark each `.step`/`.how-intro` as `.vis`
  once it scrolls into view, tracks the "active" step, and periodically
  re-triggers `.vis` (guarded by a `.settled` class) to loop the in-screen
  micro-animations.
- Entrance CSS: `.copy`/`.device`/`.fin` fade + slide in on `.vis`.
- In-screen micro-animations gated on `.step.vis`: avatar pop-ins
  (`avPop`, staggered per avatar), toast slide-up, `.ropt.on` / `.finv.ok` /
  `.sw.on` / `.bk.done` pops, `.cbtn` glow pulse (`gnewGlow`), a one-time
  champagne sheen sweep across `.scr::after` (`luxSheen`), and a subtle
  `.phone` float loop (`phoneFloat`).
- Desktop keyboard paging (arrow keys / page up/down step between sections).
- Mobile progress rail (`.vrail .rd` dots, shown via `body.in-steps`).

**Status:** static version looks good without this — pure polish, deferred
until there's appetite for the extra script + CSS complexity.

## Remaining BlobBackground / compositing follow-ups

The big-ticket items were fixed in the iOS stability pass (per-blob radial
gradients instead of a 120px group blur, no layer rotation, chips lose
`backdrop-filter` on mobile). Possible follow-ups if flicker or jank is
still observed on low-end devices:

- `.grain` is a `position: fixed` layer with `mix-blend-mode: screen` over
  animated content — drop the blend mode (or the layer) on mobile.
- Chips still use `backdrop-filter` on desktop.
- The `--cc-angle` conic-gradient sweep on the email field repaints with a
  `drop-shadow` filter every frame; could be paused while off-screen.

**Status:** no measured problem since the stability pass — profile before
acting.

## Deduplicate the email capture form

The capture form markup, styles, and submit handler exist twice (Hero and
Finale), with the Apps Script URL hardcoded in both. Extract a shared
`Capture.astro` component (or at least hoist the URL to one place) before
the next change to either form.
