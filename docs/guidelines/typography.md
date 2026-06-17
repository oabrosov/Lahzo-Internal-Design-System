# Typography

Eleven styles, no exceptions — no arbitrary `text-[15px] font-semibold` combinations. The
full table (font / size / line-height / weight) is in [../tokens.md](../tokens.md).

## The styles, by job

- **Display Lg / Display** (`text-display-lg`, `text-display`) — Beirut Display; hero and
  section display headings only.
- **H1 / H2 / H3** (`text-h1`, `text-h2`, `text-h3`) — one `text-h1` per screen; `text-h2`
  for card/modal titles; `text-h3` for content/sub-card titles.
- **Body Lg / Body** (`text-body-lg`, `text-body`) — `text-body` is the default for copy,
  menu items, table cells; `text-body-lg` for lead paragraphs.
- **Button** (`text-button`) — control labels, nav tabs, and the label above a form field.
- **Caption / Label** (`text-caption`, `text-label`) — IBM Plex Mono; captions for
  metadata / timestamps / IDs / hints, labels for UI tags and section headers.
- **Link** (`.btn-link`) — the only underlined style.

## Rules

- **One `text-*` utility per text node.** Don't stack font utilities to fake a size.
- **Sentence-case everywhere.** Never ALL CAPS; preserve initialisms (ID, URL, API).
- **Muted text** = the proper `text-*` style, color kept as `base-content`, at opacity
  **0.8 only** → `text-base-content/80`. Never 0.5/0.6/0.7.
- **Links** are `base-content` + underline; the underline is on the text, never the icon
  (the theme handles this via `:has()`).
