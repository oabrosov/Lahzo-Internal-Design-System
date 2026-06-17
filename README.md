# Lahzo Internal Design System

A **copy-and-own** React + TypeScript starter for internal tools, built on
**Tailwind CSS v4** + **daisyUI v5** with the Lahzo theme (Light + Dark). Click
**“Use this template”**, install, and you have a working app shell plus an editable
component library — no design-system internals to learn, no package to depend on.

The components live as clean source in `src/components/ui/`. You own them: read them,
edit them, delete what you don't need.

## Quickstart

```bash
npm install
npm run dev          # example app  → http://localhost:5173
npm run storybook    # component explorer → http://localhost:6006
```

## What's inside

| Path | What it is |
|------|------------|
| `src/components/ui/` | The component library — owned, editable source |
| `src/theme/` | Light/Dark theme: `lahzo.css`, `ThemeProvider`, `useTheme`, `ThemeToggle` |
| `src/lib/cn.ts` | `cn()` — Tailwind-aware class merge |
| `src/examples/` | An example screen (replace with your own) |
| `docs/` | Guidelines, theming, tokens, icons, and the component-spec template |
| `reference/components.json` | Machine-readable token + component index |

Plus: Storybook (a11y checks + Light/Dark toolbar), Vitest smoke tests, ESLint +
a design-token linter, and CI + Storybook-to-Pages workflows.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS v4 · daisyUI v5 ·
[`@phosphor-icons/react`](https://github.com/phosphor-icons/react) ·
[`class-variance-authority`](https://cva.style) · Storybook 8 · Vitest

## Scripts

| Script | Does |
|--------|------|
| `npm run dev` | Run the example app (Vite) |
| `npm run storybook` | Run the component explorer |
| `npm run build` | Type-check + production build |
| `npm run build-storybook` | Build the static Storybook |
| `npm run test` | Run Vitest |
| `npm run lint` | ESLint (incl. jsx-a11y) |
| `npm run lint:classes` | Design-token linter |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | typecheck + lint + lint:classes + test |
| `npm run format` | Prettier write |

## Documentation

- [Getting started](docs/getting-started.md)
- [Theming](docs/theming.md) · [Tokens](docs/tokens.md) · [Icons](docs/icons.md)
- [Guidelines](docs/guidelines/) — typography, spacing & sizing, color & a11y
- [Playbooks](docs/playbooks/) — product screen, form, data table, list + detail
- [Add a component](CONTRIBUTING.md) + [spec template](docs/component-spec.template.md)

## License

See [LICENSE](LICENSE). Bundled assets keep their own licenses (Phosphor — MIT;
Instrument Sans & IBM Plex Mono — SIL OFL).
