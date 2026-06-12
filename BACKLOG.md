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

## Finale email capture handler

The "Avísame" form in `src/components/Finale.astro` (`#form2`/`#email2`/
`#hint2`) currently does nothing on submit — it's markup only.

Plan: wire it to a free form-backend service (e.g.
[Web3Forms](https://web3forms.com/) or [Formspree](https://formspree.io/)) so
submissions actually reach an inbox. Keep the existing client-side email
validation/hint behavior from `rawfiles/yendi-v7.js` as a nice UX touch on
top of the real submission.

**Status:** this is the page's actual call-to-action, so worth doing before
launch — just deferred while deciding on the form-backend provider.

## Desktop performance pass for BlobBackground

`src/components/BlobBackground.astro` blurs the whole blob layer
(`filter: blur(120px)`), and `Hero.astro` runs an infinite "conveyor" of
floating feature chips with `backdrop-filter` per chip. On lower-end desktop
hardware this combination (large blur radius/area + many blurred chips) could
get expensive.

Potential follow-ups if perf becomes an issue:
- Reduce blob blur radius/size or pre-render the blurred wash as a static
  background image.
- Drop or simplify `backdrop-filter` on `.chip`.
- Throttle or reduce the number of conveyor chips, especially off-viewport.

**Status:** no measured problem yet — "port 1:1, then revisit" was the
original framing. Worth a profiling pass before launch.
