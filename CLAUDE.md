# CLAUDE.md — Lahzo Internal Design System (React template)

Context for AI agents working in this repo. Read this first.

## What this is

A **copy-and-own React component-library template** for internal tools:
React 18 + TypeScript + Vite + Tailwind CSS v4 + daisyUI v5, with the Lahzo theme
(Light + Dark). Developers click "Use this template" and build on the components in
`src/components/ui/`. **Clean code is the product.**

> There is **no** Claude skill, **no** Figma sync, and **no** "three-destination
> propagation" in this project. Do not reintroduce them. The source of truth is this repo.

## Layout

- `src/theme/lahzo.css` — tokens (both themes), the 11 `text-*` utilities, overrides. The single styling source.
- `src/theme/` — `ThemeProvider`, `useTheme`, `ThemeToggle`.
- `src/lib/cn.ts` — `cn()` (clsx + tailwind-merge).
- `src/components/ui/` — components, **one folder each** (`Name/Name.tsx` + `.stories.tsx` + `.mdx` + `.test.tsx` + `index.ts`), plus the top-level `index.ts` barrel.
- `src/examples/`, `src/App.tsx` — the example screen.
- `docs/` — guidelines, theming, tokens, icons, the component-spec template, playbooks.
- `reference/tokens.json` — **single source** for scales, token/type names, and banned classes (read by the linter + the Storybook Foundations page).
- `reference/components.json` — component registry (tier, daisyUI base, build status).
- `.storybook/`, `.github/workflows/`, `scripts/` (`lint-classes.mjs`, `check-registry.mjs`, `new-component.mjs`) — tooling.

## How to add a component (from a filled spec)

Run `npm run new:component -- <Name> [daisyuiBase] [tier]` to scaffold the `<Name>/` folder +
wire the barrel + `components.json`, then flesh it out following the pattern in `Button/Button.tsx`:
- `forwardRef`; props extend the native element; variants via `cva`; classes via `cn()`.
- daisyUI base class + theme tokens **only** — no raw hex, no off-scale spacing.
- Phosphor icons through the `<Icon>` wrapper.
- Complete the stories (`Playground` + per-variant), the `.mdx` doc, and the smoke test.
See `CONTRIBUTING.md` for the full workflow and `docs/component-spec.template.md` for the input.

## Non-negotiables

- Theme tokens only; the scales live in `reference/tokens.json` (spacing 4–96, control heights 24/32/40/48, icons 16/20/24/32).
- One `text-*` style per text node; **sentence-case**; underline only on `.btn-link`.
- Both themes must work from the same code; every interactive element is accessible (icon-only → `aria-label`).
- **Keep the repo minimal.** Don't add new files (especially docs), libraries, or entities without explicit approval. Prefer editing existing files; per-component usage docs live in the component's `.mdx`, not new markdown.

## Quality gate

Before calling a change done: `npm run check` (typecheck + lint + lint:classes +
check:registry + test) must pass, and Storybook must be clean in both themes (a11y addon).
A clean run is the floor, not the ceiling — also eyeball the rendered component.
