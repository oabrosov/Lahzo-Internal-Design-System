# Changelog

All notable changes to this template are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project uses
[Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-06-16

### Added

- Initial React + TypeScript template (Vite + Tailwind CSS v4 + daisyUI v5).
- Lahzo theme with **Light** (`lahzo-light`, default) and **Dark** (`lahzo-dark`), plus
  `ThemeProvider`, `useTheme`, and `ThemeToggle`.
- `Icon` wrapper over `@phosphor-icons/react` and the `LahzoWordmark` brand mark.
- **Button** component (the exemplar): variants `primary · secondary · ghost · success · error`,
  with the row hierarchy (1 primary + ≤2 secondary, rest ghost), icon-only = ghost + square,
  and labels pinned to the `text-button` style at every size. Plus stories, MDX, and tests.
- **Breadcrumbs** component: `items` API, last item = current page, fixed `/` separator,
  long-trail collapse (first · … · last), and optional all-or-nothing leading icons.
- `cn()` class-merge utility and the `cva`-based variant pattern.
- `reference/tokens.json` as the **single source** for scales, token/type names, and banned
  classes — consumed by the linter and a live Storybook **Foundations → Tokens** page.
- Component generator (`npm run new:component`) and a registry consistency check
  (`check:registry`) wired into `npm run check` + CI.
- Storybook 8 with the a11y addon and a Light/Dark theme toolbar.
- Vitest + React Testing Library, ESLint (incl. jsx-a11y), and a design-token linter.
- CI workflow and a Storybook → GitHub Pages deploy workflow.
- Documentation: getting started, theming, tokens, icons, guidelines, playbooks, and the
  component-spec template.

### Changed

- Rebuilt from the previous HTML/CSS design system into a React component library.
- **Folder-per-component** layout (`Name/Name.tsx` + `.stories.tsx` + `.mdx` + `.test.tsx` +
  `index.ts`); per-component usage docs live in Storybook MDX, so `docs/guidelines/` holds
  cross-cutting foundations only.

### Removed

- The Claude skill, Figma-sync, and GitHub-Pages HTML-showcase workflow; the Bash build
  and Python HTML validator; the Phosphor icon webfont (replaced by SVG components).
