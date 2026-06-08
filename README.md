# Lahzo Internal Design System

The shared visual language for **Lahzo internal tools** — dashboards, CRMs, admin and
settings screens, review tools, data tables, forms. Built on **Tailwind CSS v4 + daisyUI v5**,
styled with the **Lahzo Light** theme: square corners, 1.5px borders, a muted earthy palette,
desktop-first.

One source of truth (`src/styles.css`) feeds three audiences:

| You are a… | Start here |
|---|---|
| **Stakeholder / PM / QA** | Open the **showcase** — every component, live, no setup. See *View the showcase* below. |
| **Developer** | Drop the compiled stylesheet into your tool and use daisyUI + the `text-*` utilities. See *Use it in a tool*. |
| **Designer** | The tokens in `src/styles.css` are the spec; mirror them into your Figma variables with identical names. Read `GUIDELINES.md`. |

## What's in here

| Path | What it is |
|---|---|
| `src/styles.css` | **Source of truth** — the Lahzo theme, the 11 `text-*` styles, and component overrides. |
| `src/phosphor.css` | Phosphor icon-font glyph map (the only icon mechanism). |
| `docs/` | The **published showcase** (GitHub Pages): `index.html` + a compiled `styles.css`, fully self-contained. |
| `GUIDELINES.md` | The authoritative ruleset — components, tokens, typography, scales, accessibility, logo usage. |
| `reference/components.json` | Machine-readable component / token / scale index. |
| `reference/playbooks.md` | Step-by-step recipes: product screen, form, data table, list + detail. |
| `scripts/build.sh` | Compiles `docs/styles.css` scoped to the showcase markup. |
| `scripts/validate.py` | Compliance validator — catches off-system markup before it ships. |
| `assets/`, `fonts/` | Lahzo logos; Beirut Display + Phosphor web fonts. |

## View the showcase

The showcase lives in `docs/` so it can be served as a **GitHub Pages** site. After pushing
this repo, enable Pages → *Deploy from a branch* → branch `main`, folder `/docs`. Share the
resulting URL with anyone — no install needed.

To preview locally:

```bash
npm run serve          # serves docs/ at http://localhost:8080
```

## Use it in a tool

The stylesheet is **scoped to the markup it is built against** — Tailwind only emits classes it
can see. So you don't copy `docs/styles.css` into another project; instead, point the build at
your own HTML and recompile (see below). In your tool:

1. Set the theme on the root element: `<html data-theme="Lahzo — Light Theme">`.
2. Link the compiled stylesheet and keep `fonts/` beside it.
3. Build every element from a daisyUI component + the Lahzo theme classes + a `text-*` utility.
   Never hand-roll a control with raw `<div>`s and custom CSS.

Fonts: **Instrument Sans** (UI) and **IBM Plex Mono** (mono) load from Google Fonts; **Beirut
Display** (display) and **Phosphor** (icons) are bundled in `fonts/`.

## Rebuild & validate

```bash
npm install            # one-time: Tailwind v4 + daisyUI v5 toolchain
npm run build          # compile docs/styles.css for the current showcase markup
npm run validate       # check docs/ against the system rules
npm run check          # build + validate in one step
```

Classes toggled by JS at runtime must also appear statically in the HTML (there's a hidden
safelist element at the top of `docs/index.html`) or the build won't emit them.

## The non-negotiables (full detail in `GUIDELINES.md`)

- **Lahzo Light only** — no dark mode. Theme tokens only, never raw hex.
- **Square corners, 1.5px borders**, muted earthy palette.
- **Eleven type styles**, sentence-case everywhere, underline reserved for links.
- **Spacing scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96.
- **Control heights:** 24 / 32 / 40 (default) / 48. **Icons:** Phosphor regular, 20 default.
- **Accessibility:** every text/background pair meets WCAG AA; muted text is `base-content` at 0.8.

— Version 1.1
