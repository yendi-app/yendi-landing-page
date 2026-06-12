# Yendi Landing Page

**Yendi** (from Spanish _"Yendo"_ — going) is a social event-planning app: create a plan, share one link, and watch RSVPs and logistics sort themselves out. This repository is its "coming soon" landing page — built to introduce the product and demonstrate the core flow before launch.

## Purpose

The landing page serves two functions:

1. **Product introduction** — convey the Yendi value proposition to first-time visitors (plans that create themselves, zero-friction sharing, live RSVPs).
2. **Interactive demo** — show, don't tell. Visitors see phone-UI mockups of the actual app, walking step by step through creating and sharing a plan.

It's not a traditional marketing page with copy blocks and CTA buttons. It's a **visual product experience** — a scroll-driven walkthrough of the app itself, ending in an email-capture CTA.

## What's Built

- **Hero** ([Hero.astro](src/components/Hero.astro)) — opening section with a floating "feature chip" conveyor over a blurred blob background.
- **How To Steps** ([HowToSteps.astro](src/components/HowToSteps.astro)) — a 4-step walkthrough of the plan-creation flow, each step pairing a phone-frame UI mockup with a short explanation:
  1. **Entra** — sign in via email code or Google/Facebook/WhatsApp SSO
  2. **Crea** — name a plan, pick a date/place, choose a cover style
  3. **Comparte** — get a shareable link, invite friends from your list
  4. **Confirmaciones** — see RSVPs and who's bringing what, live
- **Finale** ([Finale.astro](src/components/Finale.astro)) — full-screen closing CTA with an email-capture form.

## Design Philosophy

### Palette & Typography

- **Background:** deep charcoal/near-black (`#0a0706`), text in warm ivory (`#f4eae1`).
- **Accent ("champagne"):** `--lux` family of custom properties in [global.css](src/styles/global.css) (`--lux`, `--lux-bright`, `--lux-dim`, `--lux-faint`, `--hair`, `--ink-soft`) — used for highlights, icons, gradients, and hairline borders. Avoid introducing new one-off accent colors; extend this palette instead.
- **Headlines / brand:** Clash Display, with **Cormorant italic** for emphasized words (`<em>`) — the "luxury serif accent" against an otherwise modern sans-serif.
- **Body & mockup UI:** General Sans / Hanken Grotesk.

### Desktop vs. Mobile

**Desktop (> 860px):**
- Each step lays out copy + a metallic phone-frame mockup side by side, alternating sides per step.
- `scroll-snap-type: y proximity` on `html` gently eases scrolling toward each step/hero without forcing it.

**Mobile (≤ 860px):**
- No phone-in-phone: the mockup screen becomes a full-bleed card filling the top ~65% of the viewport, with the caption below it.
- `scroll-snap-type: y mandatory` + `scroll-snap-stop: always` makes each step its own full-viewport panel (one swipe = one step).

## Critical Design Decisions

1. **No phone bezel on mobile.** A bezeled phone mockup on small screens reads as "phone in phone." On mobile the raw screen content fills the top of the panel; the bezel/metal frame is desktop-only.
2. **Mandatory snap paging on mobile.** Without it, users land mid-transition between steps. One swipe now completes one step.
3. **Shared step shell.** `.step` / `.step-k` layout rules live in [steps.css](src/styles/steps.css) and are imported by both `HowToSteps` and `Finale`, so the section rhythm stays consistent without duplicating CSS.
4. **Champagne over neon.** The original mockups used candy-bright greens/pinks for avatars, badges, and buttons; these were all remapped to the muted champagne/jewel palette to feel like product polish rather than an ad.
5. **Assisted, not forced, scroll on desktop.** Proximity snap keeps things smooth without trapping the user mid-scroll.

## Tech Stack

- **[Astro](https://astro.build)** (static output) — each major section is a self-contained `.astro` component with its own scoped `<style>` block.
- **Plain CSS** — no Tailwind/CSS-in-JS. Shared tokens live in `global.css`; cross-cutting layout (the step shell) lives in `steps.css`; everything else is scoped per-component.
- **Fonts** — Clash Display & General Sans via Fontshare, Hanken Grotesk & Cormorant via Google Fonts (loaded in [index.astro](src/pages/index.astro)).
- No JS framework and (currently) no client-side script — see [BACKLOG.md](./BACKLOG.md) for the planned scroll-driven controller.

## Project Structure

```text
/
├── public/                      # favicon, static assets
├── rawfiles/                    # original AI-generated HTML/CSS reference mockups
├── src/
│   ├── components/
│   │   ├── BlobBackground.astro # blurred animated background layer
│   │   ├── Hero.astro           # opening section + feature-chip conveyor
│   │   ├── HowToSteps.astro     # 4-step plan-creation walkthrough
│   │   └── Finale.astro         # closing CTA + email capture
│   ├── pages/
│   │   └── index.astro          # assembles the page, loads fonts/global styles
│   └── styles/
│       ├── global.css           # palette custom properties, resets, base html/body
│       └── steps.css            # shared .step/.step-k shell (HowToSteps + Finale)
└── package.json
```

`rawfiles/` holds the original single-file HTML/CSS/JS mockups this page was built from — useful as a reference for anything not yet ported (see [BACKLOG.md](./BACKLOG.md)).

## Getting Started

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Authentication Flow Notes

The "Entra" step reflects specific product decisions for onboarding (vs. apps like Partiful):

- **OTP via email**, not SMS.
- **SSO options:** Google, Facebook, and a WhatsApp-based shortcut.
- **Profile picture is optional** — skippable.
- **No birthday field** during onboarding.
- Kept to a single screen with minimal friction.

## Accessibility & Performance Notes

- **Reduced motion:** animated elements (e.g. the input caret blink in "Entra") are gated behind `@media (prefers-reduced-motion: no-preference)`.
- **Safe areas:** mobile layout respects notches/home indicators via `env(safe-area-inset-top/bottom)`.
- **Still to do:** scroll-triggered reveal animations, an `IntersectionObserver`-based controller, and a profiling pass on the Hero's blurred background + chip conveyor — tracked in [BACKLOG.md](./BACKLOG.md).

## Development Notes

- **Adding/editing a step:** each `<section class="step">` in `HowToSteps.astro` pairs a `.copy` block (heading, paragraph, `.ticks` list) with a `.device > .phone > .scr` mockup. Styles for a given screen's mockup live in that component's `<style>` block, grouped under a `/* ============ screen · <name> ============ */` comment.
- **Shared vs. scoped styles:** if a rule applies only within one component, keep it in that component's scoped `<style>`. Only promote a rule to `steps.css` or `global.css` if it's genuinely shared across components (e.g. the `.step` shell, palette custom properties).
- **Palette changes:** update the `--lux*`/`--hair`/`--ink-soft` custom properties in `global.css` rather than hardcoding new colors.
- Run `npm run build` after CSS/markup changes to confirm the static build still succeeds.

## Commit Conventions

This repository follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/). Commit messages should be structured as:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Common types:**

| Type       | Use for                                                |
| :--------- | :------------------------------------------------------ |
| `feat`     | A new feature                                            |
| `fix`      | A bug fix                                                |
| `docs`     | Documentation-only changes                               |
| `style`    | Formatting/styling changes that don't affect behavior    |
| `refactor` | Code changes that neither fix a bug nor add a feature    |
| `perf`     | Performance improvements                                 |
| `test`     | Adding or correcting tests                               |
| `build`    | Changes to build tooling or dependencies                 |
| `ci`       | Changes to CI configuration                              |
| `chore`    | Other changes that don't modify src or test files        |

**Scope** (optional) is a noun in parentheses describing the affected area, e.g. `feat(hero): add typewriter animation`.

**Breaking changes** are marked with a `!` before the colon (e.g. `feat!: ...`) and/or a `BREAKING CHANGE:` footer describing the change.

**Examples:**

```
feat(hero): add palette-driven blob recoloring
fix(finale): correct email validation regex
docs: add commit convention guidelines
refactor(blob-background): extract conveyor logic into shared module
feat!: drop support for legacy chip markup

BREAKING CHANGE: `.vtxt` chips now require explicit styling
```

## Backlog

Deferred enhancements and known follow-ups (scroll-entrance animations, the Finale email handler, a performance pass on the background) are tracked in [BACKLOG.md](./BACKLOG.md).

## Browser Support

Targets evergreen browsers: Chrome/Edge 90+, Safari 14+, Firefox 88+, iOS Safari 14+, Android Chrome 90+. Relies on `scroll-snap`, `backdrop-filter`, and CSS custom properties — older browsers will lose snap paging and some visual effects but content remains readable.
