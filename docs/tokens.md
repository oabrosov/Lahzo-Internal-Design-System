# Tokens & scales

**Use tokens, never raw values.** Reference colors through classes (`bg-primary`,
`text-base-content`, `border-base-300`) and keep spacing/sizing on the scales below. The
design-token linter (`npm run lint:classes`) enforces this.

**Where each thing is defined (single sources):**
- **Color values** → `src/theme/lahzo.css` (the two `@plugin "daisyui/theme"` blocks).
- **Scales + token/type names + banned classes** → `reference/tokens.json` (the linter and the
  Foundations page both read this).
- **Live, always-accurate reference** → Storybook → **Foundations → Tokens** (renders colors
  from the active theme and the scales from `tokens.json`).

This page is a human-readable summary; if a number here ever disagrees with those sources,
the sources win.

## Color tokens

Names and roles below; the **values** live in `lahzo.css` and render live in Foundations.
Use them by class — never hardcode a hex.

| Token | Usage |
|------|-------|
| base-100 | Page background |
| base-200 | Cards, inputs, elevated surfaces |
| base-300 | Borders, dividers |
| base-content | Default text |
| primary | Brand, primary actions, focus rings |
| secondary | Quiet secondary actions |
| accent | Decorative accents |
| neutral | High-emphasis dark UI, tooltips |
| info / success / warning / error | Status |

Each color has a matching `*-content` token for accessible text on top of it. In dark,
`base-200` is **darker** than `base-100`, so elevated surfaces recede.

## Structural tokens (source: `lahzo.css`)

| Token | Value |
|------|-------|
| `--radius-selector` | `0.25rem` (4px) — badges, toggles, avatars |
| `--radius-field` | `0.5rem` (8px) — buttons, inputs, selects |
| `--radius-box` | `0.5rem` (8px) — cards, modals, alerts |
| `--border` | `1.5px` — all component borders |
| `--depth` / `--noise` | `0` — flat, no shadow/noise |

## Scales (source: `reference/tokens.json`)

- **Spacing (px):** `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96` — padding, margin,
  gap. No off-scale values (no 5, 10, 14…).
- **Control heights:** xs 24 · sm 32 · **md 40 (default)** · lg 48.
- **Icon sizes (px):** `16 · 20 · 24 · 32` — 20 is the default (md controls). See
  [icons.md](icons.md).

## Typography — the 11 styles (source: `lahzo.css`)

| Utility | Font | Size / line-height / weight |
|---------|------|------------------------------|
| `text-display-lg` | Beirut Display | 48 / 110% / 400 |
| `text-display` | Beirut Display | 36 / 120% / 400 |
| `text-h1` | Instrument Sans | 24 / 120% / 500 |
| `text-h2` | Instrument Sans | 18 / 120% / 600 |
| `text-h3` | Instrument Sans | 16 / 130% / 500 |
| `text-body-lg` | Instrument Sans | 16 / 150% / 400 |
| `text-body` | Instrument Sans | 14 / 150% / 400 |
| `text-button` | Instrument Sans | 14 / 120% / 500 |
| `text-caption` | IBM Plex Mono | 12 / 150% / 400 |
| `text-label` | IBM Plex Mono | 12 / 150% / 500 |
| `.btn-link` | Instrument Sans | 14 / 120% / 500 + underline |

One `text-*` per text node. **Muted text** = `base-content` at opacity **0.8** only
(`text-base-content/80`).
