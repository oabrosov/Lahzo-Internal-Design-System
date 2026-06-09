# CLAUDE.md — Lahzo Internal Design System

Context and working rules for this repository. Read this first.

## What this is

An **internal design system** for Lahzo's internal web tools (dashboards, CRMs, admin/
settings screens, review tools, data tables, forms). It is maintained by a **UX/UI
designer** — so prefer plain-language explanations, do the technical steps yourself,
and never assume terminal fluency.

**Stack:** HTML + Tailwind CSS v4 + daisyUI v5, styled with the **Lahzo** theme.
Desktop-first. **Two themes — Lahzo Light (the default) and Lahzo Dark**, switched via `data-theme`.

## Non-negotiables (full detail in `GUIDELINES.md`)

- Lahzo Light (default) + Lahzo Dark themes, switched via `data-theme`. **Theme tokens only, never raw hex** — so the same markup renders in both themes. Square corners, 1.5px borders, muted earthy palette.
- Every element = **a daisyUI component + Lahzo theme classes + a defined `text-*` utility**. No hand-rolled controls, no bespoke CSS unless the system genuinely lacks the pattern.
- **11 type styles** (`text-display-lg/display/h1/h2/h3/body-lg/body/button/caption/label` + `btn-link`). No custom sizes/weights.
- **Sentence-case everywhere.** Underline reserved for `btn-link` only.
- **Spacing scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96. Control heights 24/32/40(default)/48.
- **Icons:** Phosphor regular only (`<i class="ph ph-{name}">`), 20px default. No emoji, no other icon sets.
- **Buttons:** primary = single main action; secondary = every other labeled action; neutral = high-emphasis dark; ghost = icon-only utilities; success/error = edge cases only; outline = opt-in (neutral/success/error only).
- Accessibility: every text/background pair meets WCAG AA; muted text = `base-content` at 0.8 opacity only.

## Repository layout

```
src/styles.css          ← SOURCE OF TRUTH: Lahzo theme + 11 text utilities + component overrides
src/phosphor.css        ← Phosphor icon-font glyph map
GUIDELINES.md           ← authoritative ruleset (components, tokens, scales, a11y, logos)
reference/components.json   ← machine-readable component / token / scale index
reference/playbooks.md      ← recipes: product screen, form, data table, list+detail
scripts/build.sh        ← compiles docs/styles.css scoped to the showcase markup
scripts/validate.py     ← compliance validator (the quality gate)
assets/*.svg            ← Lahzo logos (wordmark 78x16 for headers, mark for footers)
fonts/                  ← Beirut Display + Phosphor web fonts
docs/                   ← published GitHub Pages site (the component showcase)
  index.html            ← the showcase (Foundations + Components)
  styles.css            ← COMPILED output (committed); regenerate with build.sh
  fonts/ , assets/      ← copies so the site is self-contained
package.json            ← npm scripts (below)
```

## Commands

```bash
npm install        # one-time: Tailwind v4 + daisyUI v5 toolchain (node 18+/22 ok)
npm run build      # compile docs/styles.css for the current docs/*.html markup
npm run validate   # run scripts/validate.py over docs/ — MUST be 0 errors
npm run check      # build + validate
npm run serve      # preview docs/ at http://localhost:8080
```

## Build mechanics (important gotchas)

- Tailwind only emits classes it can **see**. `build.sh` adds `@source` pointing at `docs/**/*.html`, so `docs/styles.css` is scoped to that markup — it is **not** a universal drop-in.
- Any class toggled by JS at runtime must also appear **statically** in the HTML, or it won't be generated. There is a hidden safelist `<div>` at the top of `docs/index.html` for this.
- daisyUI emits a broken empty `:has()` selector for theme names with spaces; `build.sh` strips it after minify. Keep that step.
- `@font-face` URLs are relative (`fonts/...`), so the compiled CSS expects `fonts/` as a sibling. `build.sh` copies `fonts/` and `assets/` into `docs/` to keep the site self-contained.

## The quality gate

Before considering ANY change done: run `npm run check`. The validator catches banned classes,
raw hex, off-scale spacing, ALL CAPS, arbitrary type, stray underlines, missing `data-theme`,
inline styles, and emoji. Fix every error and re-run until clean. A clean run is the **floor,
not the ceiling** — it proves the hard rules hold but does not judge layout/hierarchy, so still
review the rendered page.

## Source of truth & propagation (critical workflow)

There is **one source of truth**; every other place is a downstream copy. Never edit the same
thing by hand in two places.

A change must be propagated to **three destinations**:

1. **This repo** — edit `src/styles.css` (visual/token) and/or `GUIDELINES.md` + `reference/components.json` (rules/specs), update `docs/index.html` (showcase), then `npm run check`, commit, push. Pages auto-rebuilds.
2. **The Claude skill** `lahzo-internal-design-system` (lives on the maintainer's machine; powers UI generation). Its files mirror this repo: skill `theme/styles.css` ↔ repo `src/styles.css`; skill `rules/design-system-rules.md` ↔ repo `GUIDELINES.md`; skill `reference/components.json` and `examples/` mirror likewise. When you change the repo, output the matching updated skill files so the maintainer can swap them in.
3. **Figma** — not fed by code; update manually. For any visual change, **produce an exact Figma spec** (sizes, colors via token names, states, text style) for the maintainer to apply to variables/components.

**Two change types:**
- *Token* (color/radius/size/type) → one file (`src/styles.css`) + one Figma variable. Easiest.
- *Component* (new pattern/variant) → spec in `GUIDELINES.md` + `reference/components.json` + example in `docs/index.html` + (sometimes) a CSS override in `src/styles.css` + a Figma component. Touches all three destinations.

## Publishing (current state)

- GitHub repo: **oabrosov/Lahzo-Internal-Design-System** (public).
- GitHub Pages: enabled, source = branch `main`, folder `/docs`.
- Live showcase: **https://oabrosov.github.io/Lahzo-Internal-Design-System/**
- Pushing to `main` re-triggers the Pages build automatically.

## How to work with the maintainer

They drive in plain language ("add X", "change the primary color", "make badges colored").
You: make the change in the source of truth, build + validate, show the result, then hand back
(a) what to commit/push, (b) the updated skill files, (c) the Figma spec. Keep explanations
non-technical and don't require them to use a terminal unasked.
