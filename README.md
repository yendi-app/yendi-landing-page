# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 Commit Conventions

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

## 📋 Backlog

Deferred enhancements and known follow-ups are tracked in [BACKLOG.md](./BACKLOG.md).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
