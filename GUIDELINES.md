# Lahzo Internal Design System

Build UI with **Tailwind CSS v4 + daisyUI v5**, styled with the **Lahzo Light theme**.
This document is the complete, authoritative ruleset. Follow it exactly.

## 🛑 Component-first rule (READ FIRST)

This design system is built on a fixed set of **canonical components and styles** — the
daisyUI components below, configured with the Lahzo theme, the defined typography
utilities, and the spacing/sizing scales. **Every UI element must come from this
defined set.** Inventing a button, a menu item, a navbar, or any other element from raw
HTML/CSS is forbidden when a defined pattern exists.

### Canonical components (use the daisyUI class + the Lahzo spec for each)

| Component | daisyUI base | What it covers |
|---|---|---|
| **Button** | `.btn` | Styles: Solid (5 colors), Outline (3 colors), Icon, Ghost, Link. Sizes xs/sm/md/lg. 5 states. Optional left/right icons; Link always carries an underline + external-link icon. |
| **Menu Item** | `.menu li` | Dropdown/menu rows. 4 states (default/hover/active/disabled). Supports icon, badge, divider. |
| **Menu** | `.dropdown-content .menu` | The dropdown popup container holding menu items. base-100 fill, 1.5px base-300 border, 8px padding. |
| **Modal** | `.modal` | Dialog: 480px wide, base-100 fill, 24px padding. Title (text-h2) + close button (top-right) + body content slot + optional footer with Cancel/Save buttons. |
| **Navbar** | custom `.navbar` | Lahzo navbar (Brand + Tabs + Spacer + Right). Always include on every product screen. Two tab styles: tabs-box (default) and tabs-border (alternative). |

Full per-component specs are in the **Components** section below.

### Canonical text styles (use these `text-*` utilities, never raw font properties)

| Utility | Properties | Use case |
|---|---|---|
| `text-display-lg` | Beirut 48 | Hero / page title |
| `text-display` | Beirut 36 | Section display |
| `text-h1` | Sans Medium 24 | Section title |
| `text-h2` | Sans SemiBold 18 | Card / modal title |
| `text-h3` | Sans Medium 16 | Content title |
| `text-body-lg` | Sans Regular 16 | Lead paragraph |
| `text-body` | Sans Regular 14 | Default body, menu item text |
| `text-button` | Sans Medium 14 / 120% | All button labels (Solid/Outline/Icon/Ghost), nav tabs |
| **`btn-link`** (Link) | Sans Medium 14 / 120% / **UNDERLINE** | Link-style buttons only — exclusive to Link |
| `text-caption` | Mono Regular 12 | Metadata, timestamps, IDs |
| `text-label` | Mono Medium 12 | UI labels, section headers, tags |

### Hard rules (no exceptions)

1. **Never hand-roll what a defined pattern covers.** If you find yourself styling a `<div>` with a background and text to look like a button, stop — use `<button class="btn …">` with the right variant.
2. **Drive components through their daisyUI variant classes** (`btn-primary`, `btn-sm`, `tabs-border`, etc.), not bespoke CSS overrides. Only the documented overrides (e.g. `.btn-link`) are allowed.
3. **Never apply raw font properties** (arbitrary `text-[15px]`, `font-semibold` combos) when a matching `text-*` utility exists. Use the utility. If the scale truly lacks something needed across multiple components, add a new `@utility` to `styles.css` and document it — never inline a one-off.
4. **Never introduce hex values outside the theme tokens.** Theme colors are defined in `styles.css` — reference them by token (`bg-primary`, `text-base-content`, etc.).
5. **Underline is reserved for Links only.** No other clickable element (button, tab, menu item, breadcrumb) gets `underline`. The `btn-link` style is the only one with underline baked in.
6. **Sentence-case everywhere.** No `ALL CAPS` headings, labels, or buttons. Preserve initialisms only (ID, URL, API).

The implementation should read as: **pick the daisyUI component → apply the Lahzo variant/theme classes → use a `text-*` utility for text**. It should never read like "build a raw box, set a custom background, set a custom border, set a custom font size" for something the system already defines.

## ⚠️ Component generation process — follow this every time

Before generating any UI, component, mockup, or page, follow this sequence:

1. **Check the canonical component list above first.** If a defined pattern exists for what you need, use it. Do not improvise an alternative.
2. **Start from the base daisyUI component.** Look up the official daisyUI component as the structural foundation. If unsure of the exact shape / variant / class names, verify against the component preview on daisyUI.com.
3. **Apply the Lahzo Light Theme.** Use only theme tokens (`base-100`, `base-200`, `base-300`, `base-content`, `primary`, `success`, `warning`, `error`, etc.). Do not introduce hex values outside the theme. Honor the theme's sharp corners (`--radius-field: 0`, `--radius-box: 0`), 1.5px borders, and muted palette.
4. **Use only the defined typography utilities.** All text must come from the 10 `text-*` utilities. **No custom font sizes or weights, and never all-caps text** — no headings, labels, or buttons rendered in uppercase characters. Sentence-case throughout.
5. **Apply the spacing/sizing/icon scales and all other rules** from the sections below. Control heights come from the fixed scale (24/32/40/48), not arbitrary padding. Spacing only from `4/8/12/16/20/24/32/40/48/64/80/96`. Icons only at `16/20/24/32`. Contrast minimums always met.

**When in doubt — ask, don't assume.** Any time there's a conflict between these layers, or a visual decision that isn't explicitly covered, stop and ask a clarifying question. Do not invent a treatment to fill the gap.

## Stack
- **Tailwind CSS v4** — utility-first CSS framework
- **daisyUI v5** — component class library (Tailwind CSS plugin)
- **@tailwindcss/typography** — prose content styling plugin
- **Fonts:** Instrument Sans (primary), Beirut Display (display), IBM Plex Mono (mono)
- **Icons:** Phosphor Icons (regular weight, icon font)

## Kit structure
```
theme/styles.css           ← source CSS (Tailwind + daisyUI + theme + typography utilities)
theme/styles.compiled.css  ← compiled, drop-in CSS for previews
theme/phosphor.css         ← Phosphor icon-font glyph definitions
fonts/                     ← Beirut Display + Phosphor web fonts (.woff2, .woff)
(icons come from the Phosphor font in theme/ — no per-icon SVG files)
examples/index.html        ← reference page (theme + typography + components)
reference/components.json  ← machine-readable component / token / scale index
```

## Build (Tailwind v4 + daisyUI v5)
- Source CSS uses Tailwind v4's CSS-first config (`@import "tailwindcss"`, `@plugin "daisyui"`, `@theme`, `@utility`).
- Compile with the Tailwind CLI: `tailwindcss -i theme/styles.css -o dist/styles.css --minify` (add `--watch` for dev).
- Or drop `theme/styles.compiled.css` straight into an HTML preview — no build step needed.

## Fonts & Font Stacks

Three font stacks registered in `@theme`:

| Stack | Variable | Font | Usage |
|---|---|---|---|
| Sans | `--font-sans` | Instrument Sans (400–700) | Headings, body, UI text |
| Display | `--font-display` | Beirut Display Book | Display-level headings |
| Mono | `--font-mono` | IBM Plex Mono (400, 500) | Captions, labels, code |

- **Instrument Sans** — Google Fonts import, weights 400–700, normal + italic
- **Beirut Display** — Custom `@font-face` from `fonts/`, Book weight only
- **IBM Plex Mono** — Google Fonts import, weights 400 + 500

## Typography Hierarchy

Custom `@utility` classes that define the Lahzo type scale. Each sets font-family, size, weight, line-height, and letter-spacing in one class.

| Utility Class | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `text-display-lg` | Beirut Display | 48px / 3rem | 400 | 110% | -0.04em | Hero / page title |
| `text-display` | Beirut Display | 36px / 2.25rem | 400 | 120% | -0.02em | Section display |
| `text-h1` | Instrument Sans | 24px / 1.5rem | 500 (Medium) | 120% | 0 | Section title |
| `text-h2` | Instrument Sans | 18px / 1.125rem | 600 (SemiBold) | 120% | 0 | Card / modal title |
| `text-h3` | Instrument Sans | 16px / 1rem | 500 (Medium) | 130% | 0 | Content title |
| `text-body-lg` | Instrument Sans | 16px / 1rem | 400 (Regular) | 150% | 0 | Lead paragraph |
| `text-body` | Instrument Sans | 14px / 0.875rem | 400 (Regular) | 150% | 0 | Default body |
| `text-button` | Instrument Sans | 14px / 0.875rem | 500 (Medium) | 120% | 0 | Button labels |
| `text-caption` | IBM Plex Mono | 12px / 0.75rem | 400 (Regular) | 150% | 0 | Captions / hints |
| `text-label` | IBM Plex Mono | 12px / 0.75rem | 500 (Medium) | 150% | 0 | UI labels (sentence-case) |

### ⚠️ Rule: Only use defined typography styles — strict

**Every text node, every label, every piece of copy must use one of the 10 utility classes above. No exceptions, no "almost" matches, no improvised intermediate sizes.** (These 10 `text-*` utilities plus the `btn-link` style make up the **11 text styles** of the system; `btn-link` is the only one that carries an underline.)

#### Bans (these are wrong, always)
- ❌ `class="text-[15px] font-semibold leading-snug"` — arbitrary Tailwind values
- ❌ `class="text-base font-bold"` — combining size + weight that doesn't match a defined utility
- ❌ Setting an arbitrary `font-size`, `font-weight`, `line-height`, or `letter-spacing` via inline style or arbitrary Tailwind value
- ❌ Inventing intermediate styles like "caption-medium" or "label-small" inline
- ❌ Rendering `text-label` (or any style) in ALL CAPS — `text-label` is sentence-case with zero tracking
- ❌ Using a defined style at a different size to "make it fit" the layout

#### Right way
- ✅ Pick from the 10 defined utilities only
- ✅ Apply exactly one `text-*` utility per text element; let it set family, size, weight, line-height, and tracking together
- ✅ If the scale truly lacks something needed across multiple components, **add a new `@utility` to `styles.css` and document it in the table above** — never inline a one-off

#### Use-case → style mapping

When picking a style, match your text's role to this table. If unsure, default to `text-body`.

| UI role | Style | Notes |
|---|---|---|
| Brand title (page chrome, hero) | `text-display` / `text-display-lg` | Beirut Display, brand voice |
| Page section title | `text-h1` | One per page section |
| Card / modal / sidebar heading | `text-h2` | "Details", "Activity", modal titles |
| Subsection / content title | `text-h3` | Inventory item name, group headings |
| Lead paragraph / featured copy | `text-body-lg` | First paragraph, marketing intro |
| Default body copy | `text-body` | Message bodies, descriptions, helper text, placeholders, search input text |
| Button / link / interactive control label, **form & input field labels (the label above an input/select/textarea)** | `text-button` | Instrument Sans Medium 14 — anything clickable, plus the label above a form control |
| Metadata, timestamps, IDs, secondary captions, role labels (User, Agent), code chips, **input helper / hint / validation text** | `text-caption` | Mono Regular 12px |
| UI labels, section headers (Turn 1, Inventory), tags (Product knowledge), keyboard shortcut chips (A, U), sidebar metadata field names (Session ID) | `text-label` | Mono Medium 12px. Sentence-case — first letter capitalized, rest lowercase (preserve initialisms like ID, URL, API) |

#### Link styling — use `btn-link`

All links use the **`btn-link`** style:
- Text style: **`text-button`** (Instrument Sans Medium 14px)
- Color: **`base-content`** (`#242736`) — never primary
- Always **underlined** (text-decoration-line: underline)
- The underline applies to the **text only** — an icon inside a link is **never underlined**. A link with **no** icon underlines automatically. A link **with** an icon must wrap its text in a `<span>`: the link drops the underline and the span carries it, so the icon (a sibling `<i>`) stays clean. Pattern: `<a class="btn-link"><span>Details</span> <i class="ph ph-arrow-square-out"></i></a>`. The theme handles the rest via `:has()`.
- Optional trailing/leading icon in the same `base-content` color (use `ph-arrow-square-out` for external links)

This applies whether the link is inline in body copy, a standalone CTA, or a value in a metadata row.

##### Link icon adjacency — required

When a link has an icon (typically `ph-arrow-square-out` for external links), **the icon must sit immediately adjacent to the text** — never separated by a flex spacer, never pushed to the opposite edge of a container.

- ✅ Wrap text + icon in a single inline-flex group with **4–6px gap**: `[Trace ↗]`
- ✅ If other elements share the row (e.g., a copy button on the far right), put the link group on the left, then a flex spacer (`flex-1`), then the other element: `[Trace ↗]  ……………………  [copy]`
- ❌ Don't let the link text grow to fill the row — that pushes the icon to the container's far edge
- ❌ Don't use a single evenly-spaced row where `[text] [icon] [other-icon]` are all spread apart — the link icon will read as separated

The icon is part of the link, not a sibling control.

#### Muted / de-emphasized text

When text needs to read as quieter (timestamps, hints, helper labels, captions sitting under main values):
- Use the proper `text-*` utility (don't change the style)
- Keep the color as **`base-content`** (`#242736`)
- Apply **opacity: 0.8** when muting is needed

**Use `0.8` only — not `0.5`, `0.6`, `0.7`, `0.45`.** One opacity value for muted text across the entire system. If something needs to be lighter than 0.8 muted, reconsider whether it should be visible at all.

#### Self-audit before completing a generation

Before claiming any component or page is done, run this check on every piece of text:
1. Does it use exactly one of the 10 `text-*` utilities (no arbitrary size/weight)?
2. Is it sentence-case (no ALL CAPS), preserving only initialisms like ID/URL/API?
3. If it's de-emphasized, is opacity exactly 0.8?
4. If it's a link, does it use `btn-link` (text-button + base-content + underline)?

If any answer is "no", fix before reporting completion.

**These utilities are additive to standard Tailwind text classes** (`text-5xl`, `text-lg`, etc. still work). Use the hierarchy utilities when you want the full typographic style applied at once.

### Tailwind class mapping
| Hierarchy | Tailwind Equivalent |
|---|---|
| Display Lg | `text-5xl` (48px) |
| Display | `text-4xl` (36px) |
| H1 | `text-2xl` (24px) |
| H2 | `text-lg` (18px) |
| H3 | `text-base` (16px) |
| Body Lg | `text-base` (16px) |
| Body | `text-sm` (14px) |
| Button | `text-sm` (14px) |
| Caption | `text-xs` (12px) |
| Label | `text-xs` (12px) |

## Prose (@tailwindcss/typography)

The `.prose` class is customized to match the Lahzo hierarchy:
- Base paragraph: 16px (Body Lg)
- h1: 24px Medium (matches H1)
- h2: 18px SemiBold (matches H2)
- h3: 16px Medium (matches H3)
- h4: 14px SemiBold
- Code: IBM Plex Mono
- Colors: uses daisyUI theme tokens (base-content, primary, base-200, base-300)

## Accessibility — contrast minimums

**Every text-on-background combination must meet WCAG AA contrast.** This is non-negotiable and applies to every generation.

### Minimums

| Text type | Minimum contrast ratio |
|---|---|
| Normal text (below 18px, or below 14px bold) | **4.5 : 1** |
| Large text (18px+, or 14px+ bold/semibold) | **3 : 1** |
| UI graphical elements (icons, focus rings, borders carrying meaning) | **3 : 1** |

### Rules

1. **Never put theme-tinted text on a same-family tinted background.** The most common bug:
   - ❌ Primary-colored text on a `primary @ 40%` bubble (e.g., "Agent (Fran)" in the conversation bubble) — measures ~2.5:1, fails AA
   - ❌ Error-colored text on an `error @ 12%` tag — likely fails AA
   - ✅ **Use `base-content` (`#242736`)** for the text — it gives ~12:1 contrast on any of our light tinted surfaces
2. **Muted text (opacity 0.8 base-content) is safe on `base-100`, `base-200`, `base-300`, and our 12%-tinted bubbles.** Don't go below 0.8 — that drops contrast under 4.5:1 fast.
3. **On saturated solid surfaces** (`btn-primary`, `btn-success`, `btn-error`, `btn-neutral`, `btn-warning`), use the matching `*-content` token (e.g., `primary-content`, `success-content`) for text. These pairs are pre-validated in the theme.
4. **Icons carrying meaning** (status dots, validation icons, link arrows) follow the same 3:1 minimum. Decorative icons that duplicate adjacent text don't have to meet it, but still shouldn't be invisible.
5. **State indicators must not rely on color alone.** Errors get an icon + text, not just red color. Success states get a checkmark + text.

### Self-check before completing

For every text node you generate, mentally answer: *"What color is this text and what color is the background it sits on?"* If you can't immediately picture the contrast being safely above 4.5:1, recolor to `base-content` (the safe default) and proceed.

When using semantic-tinted backgrounds (`*-tinted` chips, alert bands, etc.), default to **`base-content` text** unless you have specifically verified the alternative.

## Sizing & Spacing Scales

These scales are **strict**. Do not invent values outside them. If a layout seems to need something different, reconsider the layout before adding an exception.

### Spacing scale (gaps, paddings, layout offsets)

**Allowed values (px):** `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`, `96`

Use these for:
- Flex/grid `gap` (spacing between siblings)
- Padding (top/bottom/left/right of containers)
- Margin / offsets
- Page-level outer padding

No `2px`, `5px`, `10px`, `11px`, `13px`, `14px` — those are all out.

### Control height scale (single-line controls)

All single-line interactive controls use one of four fixed heights. **The control's height is set explicitly** (a fixed height class / daisyUI size variant) — never derived from ad-hoc padding math. Content is centered vertically inside.

| Size | Height | Horizontal padding | Use case |
|---|---|---|---|
| **xs** | 24px | 8px | Tags, micro-chips, inline pills (e.g., "Flagged" tag) |
| **sm** | 32px | 12px | Filter chips, dense controls, compact toolbars |
| **md** *(default)* | 40px | 16px | Buttons, inputs, selects, textareas single-row, search fields |
| **lg** | 48px | 20px | Hero CTAs, key conversion buttons (use sparingly) |

**`md` is the default.** Use `sm` only in dense filter rows or compact toolbars. Use `xs` only for tag pills. Use `lg` only for hero CTAs.

Internal gap between icon + text inside a control: `8px` for md/lg, `6px` for sm/xs.

### Icon size scale

**Allowed sizes (px):** `16`, `20`, `24`, `32`

| Size | Use case |
|---|---|
| **16px** | Inside `sm`/`xs` controls; alongside caption-sized text (12px) |
| **20px** *(default)* | Inside `md` controls (buttons, inputs); standalone UI icons |
| **24px** | Emphasis icons; section icons; alongside h2/h3 text |
| **32px+** | Empty states, hero illustrations, large feature icons |

No `12px` or `14px` icons — bump up to 16.

### Component-type → height mapping

| Component | Default height | Notes |
|---|---|---|
| Button | **40px** (md) | Use `sm` (32px) only for dense UIs, `lg` (48px) only for hero CTAs |
| Input (text, number, email) | **40px** (md) | Match button height for inline form layouts |
| Select | **40px** (md) | Same as input |
| Textarea (single row) | **40px** (md) | Multi-line auto-grows from there |
| Filter chip | **32px** (sm) | Dense filter row default |
| Tag / badge | **24px** (xs) | Inline labels (e.g., status pills) |
| Sort / utility control | **32px** (sm) | "Newest ↓", view-mode toggles, etc. |
| Search input | **40px** (md) | Same as standard input |
| Top bar / nav | **64px** | Page chrome height (not a "control") |

## Components

### Navbar

**Every product screen must include this Navbar as the top-level header.** It is a custom component — not a standard daisyUI component — built specifically for Lahzo tools.

#### Structure

```
[ Brand  |  Tabs  |  ——Spacer——  |  Right ]
```

```html
<nav class="navbar bg-base-100 h-16 px-6 gap-6">
  <!-- Brand -->
  <div class="flex items-center gap-4">
    <img src="assets/lahzo-wordmark-navy.svg" alt="Lahzo" width="78" height="16" />
    <div class="w-[1.5px] h-4 bg-base-300"></div>
    <span class="font-display text-2xl leading-[120%]">Tool Name</span>
  </div>

  <!-- Tabs -->
  <div class="flex">
    <a class="btn btn-neutral btn-sm px-4 text-button">Selected</a>
    <a class="btn btn-ghost btn-sm px-4 text-button">Option</a>
    <a class="btn btn-ghost btn-sm px-4 text-button">Option</a>
  </div>

  <!-- Spacer -->
  <div class="flex-1"></div>

  <!-- Right -->
  <div class="flex items-center gap-4">
    <label class="input w-70">
      <i class="ph ph-magnifying-glass text-xl"></i>
      <input type="search" class="grow text-body" placeholder="Search…" />
    </label>
    <div class="w-10 h-10 bg-base-200 flex items-center justify-center">
      <i class="ph ph-user text-xl"></i>
    </div>
  </div>
</nav>
```

#### Mandatory elements

| Element | Required | Spec |
|---|---|---|
| **Lahzo SVG logo** | ✅ Always | The wordmark, always on the far left, at a **fixed 78×16** (never scaled). Use the bundled asset (see Logo assets below) — never replace it with text. |
| **Divider** | ✅ Always | `1.5px × 16px` vertical line in `base-300`, separates logo from tool name |
| **Tool name** | ✅ Always | Beirut Display Book, `24px`, `120%` line-height. The product/tool name (e.g. "Loupe", "Dashboard") |
| **Nav tabs** | Optional | Primary navigation. See Tab States below |
| **Search** | Optional | Standard `input` (40px height) with `ph-magnifying-glass` icon |
| **Avatar** | Optional | `40×40px`, `base-200` fill, user profile placeholder |

#### Anatomy and spacing

| Property | Value |
|---|---|
| **Height** | `64px` (fixed) |
| **Background** | `base-100` (`#F8F8F6`) |
| **Horizontal padding** | `24px` |
| **Gap between Brand / Tabs / Right** | `24px` |
| **Brand internal gap** | `16px` (logo → divider → tool name) |
| **Tabs internal gap** | `0px` (tabs butt up against each other) |
| **Right section gap** | `16px` (search → avatar) |
| **Spacer** | `flex-grow: 1` between Tabs and Right — pushes Right section to the far end |

#### Tab style variants

The navbar supports **two tab styles**, both built on the design system's Tab component. Pick one and use it consistently across the product — do not mix on the same screen.

##### Default — tabs box

`tabs tabs-box` — active tab gets a filled `neutral` background with white text. The denser, more emphatic option.

| State | Fill | Text color |
|---|---|---|
| **Default** | Transparent | `base-content` at 0.8 opacity |
| **Hover** | `base-200` | `base-content` |
| **Selected** | `neutral` (`#242736`) | `neutral-content` (white) |

##### Alternative — tabs border

`tabs tabs-border` — active tab indicated by a 1.5px bottom underline in `base-content`. The lighter, more editorial option.

| State | Underline | Text color |
|---|---|---|
| **Default** | `base-300` 1.5px | `base-content` at 0.8 opacity |
| **Hover** | `base-300` 1.5px | `base-content` |
| **Selected** | `base-content` 1.5px | `base-content` at full opacity |

Both styles use the same `40px` height, `16px` horizontal padding, and `text-button` typography (Instrument Sans Medium 14px, 120% line-height).

#### Rules

- **Always present** on every product screen as the top-level header
- **Lahzo logo is mandatory** — never omit the logo or replace it with text
- **Tool name is mandatory** — always display the product name next to the logo

#### Allowed header elements (strict)

The header may contain **only navigation elements** — no page-level actions:

1. The **brand** — Lahzo logo + divider + tool name (mandatory, far left)
2. **Nav tabs** (current section / sub-section)
3. A **search** input
4. A **user avatar** (often with a user-menu dropdown)
5. A **dropdown that opens a menu** for navigation (e.g. account/workspace switcher) — this is a navigation control, not an action trigger

**Actions do not belong in the header.** No "Refresh", "Save", "Archive", "Export", icon
buttons that perform an action, status text, counters, taglines, or ad-hoc widgets. Page-
level actions (Refresh, Queue, primary CTAs, filters' Clear, etc.) live in a **page-level
toolbar** under the page title, on the right of the page header row, or in a card toolbar
near the data they act on. Status/info goes into the interface — a summary row at the top
of a list pane, a stat strip on the page, or the details panel. Keep the header for
*"where am I / how do I navigate"* only.

#### Tabs in the navbar — alignment

When the navbar contains nav tabs, the tab labels are **vertically centered in the navbar**
(default `items-center`), and the active tab anchor extends the full navbar height so its
border-bottom **sits exactly on the navbar's bottom border** — one continuous 1.5px line
across the header. The result: the brand and tab labels share the navbar's vertical center,
with a generous gap between each tab label and the underline below it.

Canonical recipe — use this every time you put tabs in the header:

```html
<nav class="navbar bg-base-100 h-16 px-6 gap-6 shrink-0 py-0">
  <!-- Brand (vertically centered by default items-center) -->
  <div class="flex items-center gap-4 shrink-0">
    <img src="…/lahzo-wordmark-navy.svg" width="78" height="16" alt="Lahzo" />
    <div class="w-[1.5px] h-4 bg-base-300"></div>
    <span class="font-display text-2xl leading-none">Product name</span>
  </div>
  <!-- Tabs stretch the full navbar height; anchors h-full so text centers, underline at bottom -->
  <div role="tablist" class="tabs tabs-border self-stretch">
    <a role="tab" class="tab text-button h-full" data-screen="…">Tab A</a>
    <a role="tab" class="tab tab-active text-button h-full" data-screen="…">Tab B</a>
  </div>
  <div class="flex-1"></div>
</nav>
<div class="h-[1.5px] bg-base-300 shrink-0"></div>
```

The pieces that matter:
- **`py-0` on the navbar** removes daisyUI's default vertical padding so the tabs container can reach the navbar's bottom edge.
- **`self-stretch` on the tablist** stretches it to the full navbar height (overriding the default `items-center` for that one child).
- **`h-full` on each `.tab` anchor** makes the anchor fill the navbar; daisyUI centers the text inside the anchor automatically, so the label lands at the navbar's vertical center while the anchor's border-bottom lands at the bottom edge — i.e., on the header separator.
- The page-level separator (`<div class="h-[1.5px] bg-base-300">`) continues the same line through the non-tab segment of the header.

Do not bottom-align the navbar; do not use ad-hoc paddings to push the brand around — the
centered layout above is the one recipe.

#### Logo assets

Bundled in `assets/`. The brand color is the navy `base-content` (`#242736`).

| File | What | Use |
|---|---|---|
| `lahzo-wordmark-navy.svg` | Horizontal "Lahzo" logotype (78×16) | **Header / navbar only.** Drop in via `<img width="78" height="16">` — **always exactly 78×16, never scaled.** |
| `lahzo-mark-navy.svg` | Compact symbol/mark (20×28) | **Footers only.** Don't use it in the header or as a general decorative element. |
| `lahzo-wordmark.svg` / `lahzo-mark.svg` | Same shapes, `fill="currentColor"` | **Inline** these (not `<img>`) when the logo must take the surrounding text color — e.g. white on a dark `neutral` footer. `currentColor` only works when the SVG is inlined in the DOM. |

- The header wordmark is **always 78×16** — don't stretch, shrink, recolor (except via the currentColor variant), rotate, or add effects.
- The mark belongs in **footers**; the wordmark belongs in the **header**. Don't swap them.
- The logo is the only place the brand mark appears — it is not a decorative element to sprinkle around screens.
- **One selected tab at a time** — the selected tab indicates the current route
- The navbar is **full-width** and reflows responsively
- Do not add borders or shadows to the navbar — it sits flat on `base-100`

### Footer

A custom Lahzo component (like the Navbar — **not** a standard daisyUI component). A
full-width bar that sits at the bottom of a page, separated from content by a **top border**
(`border-t-[1.5px] border-base-300`), flat on `base-100`, square corners. It is the
designated home for the **Lahzo mark** (`lahzo-mark-navy.svg`, the compact 20×28 mark — the
mark belongs in footers, the wordmark in the header).

Typography: copyright / address → **`text-caption`** (IBM Plex Mono 12); link-column titles
→ **`text-h3`** (Instrument Sans Medium 16); links → **`btn-link`** (Instrument Sans Medium
14, underlined, `base-content`). Sentence/normal case as written; never ALL CAPS.

**Three variants:**

**1 — Simple footer** (one row, ~64px): mark on the left, flex spacer, copyright on the right.

```html
<footer class="border-t-[1.5px] border-base-300 bg-base-100 px-6 h-16 flex items-center gap-6 shrink-0">
  <img src="assets/lahzo-mark-navy.svg" width="20" height="28" alt="Lahzo" class="shrink-0" />
  <div class="flex-1"></div>
  <p class="text-caption opacity-80">© 2026 Lahzo. All rights reserved.</p>
</footer>
```

**2 — Footer with links** (taller, `items-start justify-between`): left = mark + address block
(`text-caption`); right = link columns (`gap-12` between columns), each column a `text-h3`
title over a `gap-3` stack of `btn-link`s.

```html
<footer class="border-t-[1.5px] border-base-300 bg-base-100 px-6 pt-6 pb-6 flex items-start justify-between gap-12 shrink-0">
  <div class="flex flex-col gap-3">
    <img src="assets/lahzo-mark-navy.svg" width="20" height="28" alt="Lahzo" />
    <p class="text-caption opacity-80 leading-relaxed">
      Lahzo, Inc.<br />501 Union Street, Suite 545 PMB 40191<br />Nashville, TN 37219<br />© 2026 Lahzo. All rights reserved.
    </p>
  </div>
  <div class="flex gap-12">
    <nav class="flex flex-col gap-3">
      <span class="text-h3">Product</span>
      <a class="btn-link" href="#">Option one</a>
      <a class="btn-link" href="#">Option two</a>
      <a class="btn-link" href="#">Option three</a>
    </nav>
    <nav class="flex flex-col gap-3">
      <span class="text-h3">Legal</span>
      <a class="btn-link" href="#">Privacy policy</a>
      <a class="btn-link" href="#">Terms of use</a>
    </nav>
  </div>
</footer>
```

**3 — Footer with links and search** — same as variant 2, with a search **Input** (the
magnifier input, ~280px wide, `text-body`) added as the last item in the right cluster.

Notes:
- **When to include the footer (opt-in — the opposite of the navbar).** Unlike the navbar,
  which is generated on every screen by default, the footer is **only** included when one of
  these is true: (a) the user **explicitly asks** for a footer, (b) a footer is **present in
  a provided wireframe / reference**, or (c) a footer **already exists in the project** being
  redesigned. Otherwise **do not add one**.
- Footer **links use `btn-link`** standalone (not wrapped in `.btn`) so they read as compact
  underlined text links, not button-height controls. The underline-on-text rule still applies.
- Use the **mark, never the wordmark**, in the footer; keep it at its native 20×28.
- It's tier-appropriate for scrollable/page-style screens; a full-height app shell (e.g. a
  3-pane tool) usually doesn't need one. Don't force it into a fixed-height layout where it
  would steal vertical space from the primary work area.

### Buttons

Four button style categories. Pick by intent — do not mix styles for visual variety.

#### Button hierarchy — when to use which

A surface has **one primary** action; everything else uses **secondary**; **ghost is for
tertiary only**. This is the most-broken rule in fresh generations — use it as a checklist.

| Tier | Variant | Use for |
|---|---|---|
| **Primary** | `btn-primary` | The **single** main action of a screen, page, dialog, or section — Save, Submit, Confirm, Continue, "Acceptable" on a review. One per surface. |
| **Secondary** *(default for everything non-primary — use this **a lot**)* | `btn-secondary` | The default for any labeled action that isn't the one primary CTA: page-level toolbar actions (**Refresh**, **Queue**, **Export**, **New**, **Download**), **sidebar filter chips and sort buttons** (Flagged, Spot check, Newest), Cancel/Back/Skip next to a primary, filter **Clear**, secondary CTAs, dialog secondaries, segmented non-active toggles. **If you're about to type `btn-ghost` on a labeled button, stop and use `btn-secondary` instead.** |
| **Neutral solid** | `btn-neutral` | High-emphasis dark actions that aren't the primary — destructive confirmations, segmented "selected" chips. |
| **Tertiary / utility** | `btn-ghost` | Icon-only utility (close `ph-x`, copy, kebab, toolbar icon buttons), and very-low-emphasis controls only. **Never for a labeled secondary action like Refresh or Clear** — those go to `btn-secondary`. Transparent at rest, subtle `base-content` tint on hover (10%), darker pressed (20%). |
| **Inline / link** | `btn-link` | Inline text-level CTAs and links. |
| **Edge cases** | `btn-success` / `btn-error` | Only when success/danger semantics genuinely matter (Approve a moderation queue, Delete something important). Not everyday actions. |

**Rule of thumb (read this every time you pick a button color):** if a button has a **text
label**, default to **`btn-secondary`** — toolbar actions, filter chips, sort buttons,
Cancel, Back, anything that isn't the one primary CTA. `btn-primary` is reserved for the
**single** main action of the surface. `btn-ghost` is **only** for icon-only utility
controls (close `ph-x`, copy, kebab menus, row-level icons) — never for a labeled action,
no matter how minor. If in doubt, the answer is `btn-secondary`.

#### Outline (opt-in only)

**Use outline buttons only when the user explicitly asks for them.** Don't choose them
on your own as a stylistic variation — default to solid or ghost. When requested, they're
limited to **three color variants:**

| Variant | When to use |
|---|---|
| **`btn-outline`** (neutral) | Bordered neutral action — low-emphasis alternative to `btn-neutral`. |
| **`btn-outline btn-success`** | Bordered positive action — when solid success is too heavy. |
| **`btn-outline btn-error`** | Bordered destructive action — secondary "Delete" next to a primary CTA. |

No other outline color combinations (e.g. `btn-outline btn-primary`, `btn-outline btn-secondary`) are supported.

#### Icon buttons

Icon-only buttons use **`btn-ghost btn-square`** — `btn-square` gives them a **square
interactive area** (the hit/hover region is always a square matching the control height:
40 / 32 / 24px for md / sm / xs). Always include an `aria-label`, and a tooltip when the
meaning isn't obvious. Icon buttons are the **only** place ghost is acceptable for a
labeled-action affordance — and even then there's no label, just the icon. Common patterns:
- Close button: `btn-ghost btn-square` + `ph-x` icon
- Copy / kebab / row utility: `btn-ghost btn-square` + a `ph-*` icon + tooltip
- Dropdown trigger (with a visible label): `btn-secondary` + text + `ph-caret-down`

Ghost and icon buttons keep full **hover and pressed feedback** — transparent at rest, a
subtle `base-content` tint on hover (10%), darker when pressed (20%). The theme provides
this; don't add per-button background overrides.

#### ⚠️ Banned styles

The following daisyUI style modifiers are **not part of our visual language** and must never be used:
- ❌ `btn-soft` — not supported
- ❌ `btn-dash` — not supported
- ❌ `btn-accent` (solid) — accent is for decorative highlights, not button actions
- ❌ `btn-info` / `btn-warning` (solid) — use `btn-primary` or `btn-neutral` instead; info/warning semantics belong to alerts, not buttons
- ❌ `btn-outline btn-primary` / `btn-outline btn-secondary` / `btn-outline btn-warning` / `btn-outline btn-info` / `btn-outline btn-accent` — only neutral, success, and error outlines are supported

#### Sizes

The default button size is **40px** (daisyUI's `md` — no size class needed). This is the size used in all our component examples and should be the choice 95% of the time.

| Size | Class | Height | When to use |
|---|---|---|---|
| Default | *(none)* | 40px | The standard size — toolbars, forms, modals, page actions |
| Small | `btn-sm` | 32px | Dense tables, compact toolbars where 40px feels heavy |
| Extra small | `btn-xs` | 24px | Inline actions in extremely dense UI (chip rows, table cell controls) |
| Large | `btn-lg` | 48px | Hero CTAs and key conversion buttons on marketing surfaces only |

Smaller sizes are an escape hatch for density-constrained contexts — they should be a deliberate decision, not a default. If a layout feels cramped with 40px buttons, reconsider the layout before reaching for `btn-sm`.

#### States

All buttons support five states: **default**, **hover** (10% darker), **active** (20% darker), **focus** (ring), and **disabled** (50% opacity). Solid/outline states come from daisyUI; the **ghost** hover/pressed states are provided by the theme (transparent → 10% → 20% `base-content` tint). Don't override state styles per button.

### Dropdown

Dropdowns use the daisyUI `dropdown` component with CSS-based positioning — no JavaScript required.

#### Structure

```html
<div class="dropdown dropdown-bottom">
  <button class="btn btn-neutral" tabindex="0">
    Options <i class="ph ph-caret-down text-xl"></i>
  </button>
  <ul class="dropdown-content menu bg-base-100 border border-base-300 w-52 p-2" tabindex="0">
    <li><a>Item one</a></li>
    <li><a>Item two</a></li>
    <li><a>Item three</a></li>
  </ul>
</div>
```

#### Allowed trigger styles

The dropdown trigger is a standard button. Only these button variants are allowed as triggers:
- `btn btn-neutral` — default, dark trigger
- `btn btn-primary` — primary-colored trigger
- `btn btn-outline` — bordered neutral trigger
- `btn btn-ghost` — borderless, transparent trigger

Always include a `ph-caret-down` (or `ph-caret-up` for `dropdown-top`) icon in the trigger.

#### Allowed positions

Only **two** position classes are supported:

| Class | Behavior |
|---|---|
| **`dropdown-bottom`** | Opens menu below the trigger (default) |
| **`dropdown-top`** | Opens menu above the trigger |

**Do not use** `dropdown-left`, `dropdown-right`, `dropdown-start`, `dropdown-center`, or `dropdown-end`. These remain in daisyUI but are excluded from our design language.

#### Spacing

- **Trigger-to-menu gap:** `4px` — always. The dropdown panel sits 4px below (or above) the trigger button.
- **Menu item height:** `32px` (sm control height)
- **Menu padding:** `8px` (`p-2`)

#### Menu item states

| State | Appearance |
|---|---|
| Default | Transparent / `base-100` background, `base-content` text |
| Hover | `base-200` background |
| Active | `primary @ 40%` background tint, `base-content` text |
| Disabled | 50% opacity, non-interactive |

Note: the Active state uses a 40%-tinted `primary` background (not a solid fill), keeping the menu surface readable while clearly marking selection.

#### Content variations

Menus support:
- **Dividers** — `<hr>` or `<li class="menu-title">` between groups
- **Badges** — counter badges inside menu items (right-aligned)
- **Navigation** — active item highlighted with `primary` background

#### ⚠️ Banned dropdown features

- ❌ `dropdown-hover` — do not open on hover; click-to-open only
- ❌ `dropdown-left` / `dropdown-right` / `dropdown-start` / `dropdown-center` / `dropdown-end` — only bottom and top
- ❌ `dropdown-open` — do not force-open dropdowns

### Data Input components

#### Checkbox

`<input type="checkbox" class="checkbox" />` — 20×20 square. Active: primary fill + base-content check mark. Indeterminate: primary fill + horizontal bar. Disabled: 50% opacity. With label: 8px gap, label uses Body text style.

#### Radio

`<input type="radio" class="radio" name="group" />` — 20×20 circle, 10px filled dot when checked. Use shared `name` attribute to group exclusive options. Stack vertically with 12px gap between options.

#### Toggle

`<input type="checkbox" class="toggle" />` — 40×24 pill with 16×16 white knob. Off: base-200 fill + base-300 border. On: primary fill, knob right. Disabled: 50% opacity. With label: 12px gap, label uses Body text style.

#### Range

`<input type="range" class="range" />` — 4px track (base-300 unfilled, primary filled), 16px round thumb (primary). Default 320px width. When showing the value, place a Caption (mono 12px at 0.8 opacity) above the track centered on the thumb.

### Data Display components

#### Alert

`<div role="alert" class="alert">` — Inline status message with icon + text. 16px padding all sides, 12px icon-to-text gap. Five variants: default (base-200 / base-content), info (muted blue + white), success (forest green + white), warning (warm gold + white), error (terracotta + white). Always include an icon (info/check-circle/warning/x for the matching variant).

#### Toast

Floating notification stack — wraps one or more Alerts. `<div class="toast">` is fixed-positioned in a corner. Multiple alerts stack vertically with 12px gap. Default position: bottom-right. Position modifiers: `toast-top`, `toast-bottom`, `toast-start`, `toast-center`, `toast-end`.

#### Table

`<table class="table">` — Tabular data layout. Header row (Instrument Sans Medium 14px at 0.8 opacity), body rows (Body text style), 16px horizontal / 12px vertical cell padding. 1.5px base-300 border on the table and below the header. Variants: `table-zebra` (alternate row backgrounds in base-200), `table-pin-rows` (sticky header), `table-xs/sm/md/lg` for cell density.

### Navigation components

#### Pagination

Built with `<div class="join">` + `<button class="join-item btn">` — buttons sit flush with shared borders. Use the Button master as the trigger style; mark the active page button with `btn-active` (neutral fill, white text). Two patterns: numbered (« 1 2 3 4 ») and compact (« Page 22 of 100 »).

#### Menu

`<ul class="menu">` — Vertical navigation list for sidebars. Items use Body text style with 8px vertical / 12px horizontal padding (32px row height). Use `menu-title` for grouped section headers (Caption text style, 0.6 opacity). Insert dividers (1.5px base-300 line) between groups. Active item uses `primary @ 40%` background tint (same as the Menu Item Active state).

> Note: this is distinct from the dropdown `Menu` (the popup container for dropdowns, `.dropdown-content .menu`). The sidebar menu is the standalone vertical nav list pattern from daisyUI.

### Breadcrumbs

Navigation trail showing the user's location in a hierarchy. Built on the daisyUI `breadcrumbs` component.

#### Structure

```html
<div class="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>
```

#### Rules

- **Text style**: `Body` (Instrument Sans Regular 14px) — same as daisyUI's default `text-sm`
- **Separator**: forward slash `/` rendered between items at 0.5 opacity
- **Previous items** (links, `<li><a>`): `base-content` at 0.8 opacity — clickable, no underline (breadcrumbs are special navigation context; the `Link` underline style is reserved for inline text links)
- **Current page** (last `<li>` without anchor): `base-content` at full opacity — not clickable
- **Item gap**: 12px between items (including separator)

#### Optional icons

Each item may have a leading 16px Phosphor icon, 8px gap before the label. Icon inherits the item's color/opacity (full for current, 0.8 for links).

#### Banned

- ❌ Don't underline breadcrumb links (use Body text style, not Link)
- ❌ Don't use custom separators (chevrons, dots) — stick with `/` per the daisyUI default

### Modal

Dialog modals with a close button at the top-right corner. Used for confirmations, forms, and focused workflows. Built on the daisyUI `modal` component.

#### Structure

```html
<dialog class="modal" id="my_modal">
  <div class="modal-box">
    <button class="btn btn-ghost btn-sm absolute right-4 top-4">
      <i class="ph ph-x"></i>
    </button>
    <h3 class="text-h2">Modal title</h3>
    <p class="text-body opacity-80 mt-4">Modal body text goes here.</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
```

#### Two variants

| Variant | When to use |
|---|---|
| **Simple dialog** | Short messages, confirmations, or informational notices — title + body + close button only |
| **Action dialog** | Decisions requiring user action — title + body + close button + action buttons |

#### Anatomy and spacing

| Element | Spec |
|---|---|
| **Modal box width** | `480px` (fixed) |
| **Background** | `base-100` (`#F8F8F6`) |
| **Padding** | `24px` all sides. Simple dialog uses `48px` bottom padding for extra breathing room |
| **Title** | `text-h2` (Instrument Sans SemiBold 18px) |
| **Body text** | `text-body` (Instrument Sans Regular 14px), **opacity 0.8** |
| **Title → body gap** | `16px` |
| **Content → actions gap** | `48px` |
| **Close button** | `32×32px` frame, `ph-x` icon at `16px`, positioned top-right of modal box |
| **Action bar** | Right-aligned, `16px` gap between buttons |
| **Action buttons** | Standard `40px` height — `btn-secondary` for cancel, `btn-primary` for confirm |

#### Focus management

When the dialog opens, move focus **into** the dialog but **not onto the close button or any
destructive control** — otherwise that control shows a focus ring and reads as
pre-selected. A native `<dialog>` auto-focuses the first focusable element, which is usually
the top-right close button, so override it:

```html
<div class="modal-box" tabindex="-1"> … </div>
```
```js
function openModal() {
  dialog.showModal();
  dialog.querySelector('.modal-box').focus(); // programmatic focus = no visible ring
}
```

Focus the modal box (or, for a form modal, the first meaningful **input** — not a segmented
button or the close icon). Keep ESC/backdrop close working. The close button is a borderless
`btn-ghost` (the theme guarantees it renders transparent with no border).

#### Backdrop

The modal sits on a semi-transparent backdrop. Use the daisyUI `modal-backdrop` pattern — clicking outside the modal closes it.

#### Rules

- **Always include a close button** (`ph-x`) in the top-right corner
- **Always closable** via ESC key, close button, or backdrop click
- **One primary action max** per modal — the confirm/save/submit button
- **Cancel is always `btn-secondary`**, confirm is always `btn-primary`**
- Do not stack more than two action buttons. For complex flows, reconsider the UX
- Modal title uses `text-h2`, never `text-h1` or `text-display`
- Body text is always muted at **opacity 0.8** — never full opacity, never below 0.8

### Chat Bubble

Speech bubbles for chat / conversation UIs. Built on the daisyUI `chat` component using the **"chat with header and footer"** variant only. No avatar slot.

#### Structure

```html
<div class="chat chat-start">
  <div class="chat-header">
    Obi-Wan Kenobi
    <time class="text-xs opacity-50">2 hours ago</time>
  </div>
  <div class="chat-bubble">You were the Chosen One!</div>
  <div class="chat-footer opacity-50">Delivered</div>
</div>
```

#### Slots

| Slot | Class | Required | Spec |
|---|---|---|---|
| **Header** | `chat-header` | Optional | Sender name + timestamp. Both `text-caption`. Name at full opacity, time at 0.8 |
| **Bubble** | `chat-bubble` | ✅ Required | The message. Square corners (theme `radius-box: 0`). `16px` horizontal / `12px` vertical padding. Default fill: `base-200` |
| **Footer** | `chat-footer` | Optional | Status / delivery info. `text-caption` at 0.8 opacity |

**No `chat-image` (avatar) slot.** This design system does not use avatars in chat bubbles. The header text identifies the sender.

#### Direction

| Class | Alignment | Use case |
|---|---|---|
| **`chat-start`** | Left-aligned | Received messages, other participants. Default |
| **`chat-end`** | Right-aligned | Current user's own messages |

#### Color variants

Only **two** bubble colors are supported:

| Class | Fill | Use case |
|---|---|---|
| *(default)* | `base-200` | Neutral bubble — use for both sides in symmetric conversations |
| **`chat-bubble-primary`** | `primary` @ **40%** + `base-content` text | Primary-tinted bubble for AI/agent messages. Same 40% selection/active tint used across the system (see "Selection & active tint"). |

**Do not use** `chat-bubble-secondary`, `chat-bubble-accent`, `chat-bubble-info`, `chat-bubble-success`, `chat-bubble-warning`, or `chat-bubble-error`. Only neutral and primary are supported.

#### Rules

- **Always use the header-and-footer variant** — do not use bare bubbles without the header/footer structure
- **No avatars** — never add `chat-image`. Sender identity comes from the header text
- **Square corners** — bubbles follow the theme's `radius-box: 0`, no rounded corners
- **One color per conversation role** — don't alternate colors randomly. Use neutral for human messages, primary-tinted for AI/agent if distinction is needed

### Tabs

Tab navigation for switching between content panels. Built on the daisyUI `tabs` component. Only **three variants** are supported.

#### Allowed variants

| Variant | Class | Use case |
|---|---|---|
| **Tabs border** | `tabs tabs-border` | Standard tab bar with bottom-border underline on the active tab |
| **Tabs box (radio)** | `tabs tabs-box` | Box-style tabs using radio inputs — active tab gets a filled `neutral` background |
| **Radio tabs border + content** | `tabs tabs-border` + `tab-content` | Border tabs paired with content panels — switching tabs reveals the corresponding panel |

#### Structure

```html
<!-- 1. Tabs border -->
<div role="tablist" class="tabs tabs-border">
  <a role="tab" class="tab">Tab 1</a>
  <a role="tab" class="tab tab-active">Tab 2</a>
  <a role="tab" class="tab">Tab 3</a>
</div>

<!-- 2. Tabs box (radio) -->
<div class="tabs tabs-box">
  <input type="radio" name="tabs" class="tab" aria-label="Tab 1" />
  <input type="radio" name="tabs" class="tab" aria-label="Tab 2" checked="checked" />
  <input type="radio" name="tabs" class="tab" aria-label="Tab 3" />
</div>

<!-- 3. Radio tabs border + tab content -->
<div class="tabs tabs-border">
  <input type="radio" name="tabs" class="tab" aria-label="Tab 1" />
  <div class="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>
  <input type="radio" name="tabs" class="tab" aria-label="Tab 2" checked="checked" />
  <div class="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>
  <input type="radio" name="tabs" class="tab" aria-label="Tab 3" />
  <div class="tab-content border-base-300 bg-base-100 p-10">Tab content 3</div>
</div>
```

#### Tab styling

- **Tab height**: `40px` (md default)
- **Tab text**: `text-button` (Instrument Sans Medium 14px, 120% line-height)
- **Inactive tab text**: `base-content` at 0.8 opacity
- **Active tab (border)**: full opacity text + bottom border underline in `base-content`
- **Active tab (box)**: `neutral` fill (`#242736`) with white text
- **Tab content panel**: `base-100` background, `base-300` border (top excluded), `40px` padding

#### ⚠️ Banned tab variants

- ❌ `tabs-lift` — not part of the visual language
- ❌ `tabs-xs` / `tabs-sm` / `tabs-lg` / `tabs-xl` — use default `md` size only
- ❌ `tabs-bottom` — tabs must always appear above content
- ❌ Bare `tabs` without `tabs-border` or `tabs-box` — always use one of the two style classes

## Icons — Phosphor Icons

**Phosphor Icons** is the only icon library for this project. Never use other icon libraries, emoji, or font-based symbols (like ▾ ✕ ★).

### Setup
- **Icon font:** `@font-face` for "Phosphor" in `theme/styles.css`, glyph mappings in `theme/phosphor.css`. This is the **only** icon mechanism — the font covers the full Phosphor set (1,500+ glyphs) via `<i class="ph ph-{name}"></i>`.
- **Available weights:** regular (default), bold, fill, light, thin, duotone

### Rules
- **Default weight:** Regular — use other weights only when explicitly requested
- **Component icon size:** 20×20px
- **Never** use icons from other libraries, emoji characters, or Unicode symbols as icon substitutes

### HTML Usage (icon font)
```html
<!-- Basic icon — always needs both classes: ph + ph-{name} -->
<i class="ph ph-house"></i>

<!-- In a daisyUI button -->
<button class="btn btn-primary">
  <i class="ph ph-plus text-xl"></i>
  Add Item
</button>

<!-- Sizing with Tailwind text classes -->
<i class="ph ph-gear text-sm"></i>   <!-- 14px -->
<i class="ph ph-gear text-base"></i> <!-- 16px -->
<i class="ph ph-gear text-xl"></i>   <!-- 20px — component default -->
<i class="ph ph-gear text-2xl"></i>  <!-- 24px -->
```

### Recoloring

Icons are font glyphs, so they take the current text color automatically — set color with
a Tailwind text-color utility (`text-base-content`, `text-primary`, `text-error`, …) or let
them inherit. Default render size is 20×20px (`text-xl`).

```html
<i class="ph ph-warning-circle text-xl text-error"></i>
```

### Common Icon Names
| Icon | Class | Usage |
|---|---|---|
| House | `ph-house` | Home/dashboard |
| Gear | `ph-gear` | Settings |
| MagnifyingGlass | `ph-magnifying-glass` | Search |
| Plus | `ph-plus` | Add/create |
| X | `ph-x` | Close/dismiss |
| Check | `ph-check` | Confirm/success |
| CaretDown | `ph-caret-down` | Dropdown chevron |
| CaretUp | `ph-caret-up` | Collapse chevron |
| CaretRight | `ph-caret-right` | Navigation/expand |
| ArrowRight | `ph-arrow-right` | Navigate forward |
| ArrowLeft | `ph-arrow-left` | Navigate back |
| Trash | `ph-trash` | Delete |
| PencilSimple | `ph-pencil-simple` | Edit |
| Eye | `ph-eye` | View/visibility |
| Bell | `ph-bell` | Notifications |
| User | `ph-user` | Profile/account |
| SignOut | `ph-sign-out` | Logout |
| DotsThree | `ph-dots-three` | More options |
| Warning | `ph-warning` | Warning state |
| Info | `ph-info` | Info state |
| CheckCircle | `ph-check-circle` | Success state |
| XCircle | `ph-x-circle` | Error state |

## Default daisyUI Theme

Always use the **Lahzo — Light Theme** custom theme when generating any daisyUI output. Set it via `data-theme="Lahzo — Light Theme"` on the `<html>` element.

**Dark mode is out of scope.** There is no Lahzo dark theme in this system. If a request asks for dark mode, say it isn't part of the design system yet rather than improvising one — an improvised dark theme would break the square-corner / 1.5px-border / contrast rules the system depends on.

**Sharp-edged design system:** This theme uses **flat, square edges** (`--radius-field: 0`, `--radius-box: 0`) with slightly thicker **1.5px borders**. Do not apply custom rounded corners to components — let the theme tokens drive the visual language.

### Theme Quick Reference — Lahzo — Light Theme
| Token | Value | Usage |
|---|---|---|
| primary | `#63A8CC` (sky blue) | Main brand color, buttons, links, focus rings |
| primary-content | `#242736` | Text on primary surfaces |
| secondary | `#EBEBE5` (light warm gray) | Quiet secondary actions (same value as base-200 — visually blends with elevated surfaces) |
| secondary-content | `#242736` | Text on secondary surfaces |
| accent | `#FFD294` (light gold) | Highlights, decorative accents |
| accent-content | `#242736` | Text on accent surfaces |
| neutral | `#242736` (dark navy) | Dark UI elements, footer, tooltips |
| neutral-content | `#FFFFFF` | Text on neutral surfaces |
| base-100 | `#F8F8F6` (warm white) | Page background |
| base-200 | `#EBEBE5` (light warm gray) | Cards, inputs, elevated surfaces |
| base-300 | `#DCDCD3` (warm gray) | Borders, dividers, deeper surfaces |
| base-content | `#242736` | Default text color |
| info | `#3E7FA3` (muted blue) | Informational messages |
| info-content | `#FFFFFF` | Text on info surfaces |
| success | `#3F6F55` (muted green) | Success states |
| success-content | `#FFFFFF` | Text on success surfaces |
| warning | `#CE8D3B` (warm gold) | Warning states |
| warning-content | `#FFFFFF` | Text on warning surfaces |
| error | `#B0402A` (terracotta) | Error/danger states |
| error-content | `#FFFFFF` | Text on error surfaces |
| **radius-selector** | `0.25rem` (4px) | Selectors/toggles — tiny corner softening |
| **radius-field** | `0rem` | **Fields, inputs, buttons — square** |
| **radius-box** | `0rem` | **Cards, modals, alerts — square** |
| size-selector | `0.25rem` | Selector base unit |
| size-field | `0.25rem` | Field base unit |
| **border** | `1.5px` | All component borders |
| depth | 0 | Flat — no shadows from depth token |
| noise | 0 | Clean — no noise overlay |

### ⚠️ Visual character changes
- **Square corners everywhere** — buttons, inputs, modals, cards, alerts. No more `rounded-full` buttons or `rounded-2xl` cards.
- **1.5px borders** instead of 1px — slightly more pronounced edges.
- **Muted, earthy palette** — primary is desaturated sky blue, info is muted slate-blue, success is forest green, warning is warm gold, error is terracotta.
- **Quiet secondary** — `secondary` is the same value as `base-200` (`#EBEBE5`). Secondary buttons read as soft, low-emphasis affordances; warm gold lives exclusively in `warning`.

> **Dark mode:** intentionally not part of this system. Don't emit a `Lahzo_dark` theme or any dark variant.

## Scope, component tiers, and behavior

**Desktop internal tools.** Design for a desktop viewport (data tables, sidebars, 480px
modals, a 64px top bar). Don't invest in mobile breakpoints; just don't let layouts
hard-break if a window is narrowed.

**Three component tiers:**
1. **Canonical** components (Buttons, Navbar, Dropdown/Menu, Modal, Tabs, Breadcrumbs,
   Pagination, Sidebar Menu, Alert, Toast, Table, Checkbox/Radio/Toggle/Range, Chat
   Bubble) — use their specs above.
2. **Specified essentials** — Card, Input, Select, Textarea, Badge, Avatar, Tooltip —
   use the specs below.
3. **Everything else** (Drawer, Accordion/Collapse, Stat, Progress/Loading/Skeleton,
   Steps, File input, empty states, and any other daisyUI component) — use the **base
   daisyUI component as-is**, styled only by the Lahzo theme tokens and held to the same
   typography / spacing / sizing / icon / contrast / sentence-case rules. **No bespoke
   CSS.** Don't invent a new styled component when daisyUI already has one.

**Ambiguity:** pick the safest documented default, proceed, and note assumptions at the
end. Ask only for big structural unknowns. Never improvise an off-system treatment to
fill a gap — fall back to tier 3 instead.

## Additional component specs (essentials)

### Card

Generic content container for grouping related information. Base daisyUI `card`.

```html
<div class="card bg-base-200 border border-base-300 p-6">
  <h2 class="text-h2">Card title</h2>
  <p class="text-body opacity-80 mt-4">Body content.</p>
</div>
```

- **Fill:** `base-200`. **Border:** 1.5px `base-300`. **Corners:** square (theme). No shadow.
- **Padding:** `24px` (`p-6`) default; `16px` (`p-4`) for dense cards.
- **Title:** `text-h2` (or `text-h3` for a sub-card). **Body:** `text-body`.
- Don't add `rounded-*` or `shadow-*` — the theme is flat and square.
- Cards separate content blocks; don't nest cards more than one level.

### Input

Single-line text/number/email/search field. Base daisyUI `input`.

```html
<label class="input w-full">
  <i class="ph ph-magnifying-glass text-xl"></i>
  <input type="text" class="grow text-body" placeholder="Search…" />
</label>
```

- **Height:** 40px (md). **Fill:** `base-200`. **Border:** 1.5px `base-300`. Square corners.
- **Typography (per the Figma Input reference):**
  - **Field label** (above the input) → **`text-button`** (Instrument Sans Medium 14 / 1.2), full `base-content`, sentence-case. *(Not `text-label` — that mono style is for metadata field names, not input labels.)*
  - **Input text + placeholder** → **`text-body`** (Instrument Sans Regular 14 / 1.5).
  - **Helper / hint / validation text** (below the input) → **`text-caption`** (IBM Plex Mono Regular 12 / 1.5): neutral hint = `base-content` @ 0.8; error = `error` color; success = `success` color.
- **Leading icon** (optional): 20px, `base-content`.
- **Focus:** theme focus ring (don't override). **Disabled:** 50% opacity.
- Put the label **above** the field (8px gap), not a placeholder-as-label.
- Error state: 1.5px `error` border + a `text-caption` error message with `ph-warning-circle`.

### Select

Dropdown picker for choosing one option. Base daisyUI `select`.

```html
<select class="select w-full text-body">
  <option disabled selected>Choose one</option>
  <option>Option one</option>
  <option>Option two</option>
</select>
```

- Same box as Input: 40px, `base-200` fill, 1.5px `base-300` border, square, `text-body`.
- Label above in `text-button`. Use a Select for a fixed option set; use a **Dropdown +
  Menu** when items need icons, badges, or actions.

### Textarea

Multi-line text entry. Base daisyUI `textarea`.

```html
<textarea class="textarea w-full text-body" rows="4" placeholder="Description…"></textarea>
```

- Single-row height starts at 40px (md) and grows. Same fill/border/corners as Input.
- **Text + placeholder:** `text-body`. Label above in `text-button`. Helper/validation below in `text-caption`.
- Use `rows` to set a sensible default height; don't fix height with off-scale values.

### Badge

Small status/label pill. Base daisyUI `badge`.

```html
<span class="badge badge-soft text-label">Active</span>
```

- **Height:** ~24px (xs control scale). **Text:** `text-label` (mono 12px, sentence-case).
- **Default fill:** `base-200` with `base-content` text. For status, keep **`base-content`
  text on a tinted fill** (never same-family tinted text on a tinted bg — see contrast rules).
- A status badge pairs color with the **word** (and an icon if needed) — never color alone.
- Use badges for status/labels, not as buttons. Don't use them for counts inside menu
  items — those are right-aligned counters per the Menu Item spec.

### Avatar

User/entity image or initials. Base daisyUI `avatar`.

```html
<div class="avatar">
  <div class="w-10 h-10 bg-base-200 text-base-content flex items-center justify-center">
    <i class="ph ph-user text-xl"></i>
  </div>
</div>
```

- **Default size:** 40×40 (matches control height); 24 or 32 for dense rows, 64 for profiles.
- **Square corners** (theme) — no `rounded-full` avatars. Fill `base-200`.
- Fallback = initials in `text-label` **or** a `ph-user` icon, `base-content`.
- This is also the navbar avatar placeholder. Don't use avatars inside chat bubbles
  (chat bubbles have no avatar slot).

### Tooltip

Hover hint for an icon button or truncated label. Base daisyUI `tooltip`.

```html
<div class="tooltip" data-tip="Delete">
  <button class="btn btn-ghost" aria-label="Delete"><i class="ph ph-trash text-xl"></i></button>
</div>
```

- Fill `neutral` (`#242736`), text `neutral-content` (white), `text-caption`. Square corners.
- Keep tips to a few words; sentence-case. **Don't put essential information only in a
  tooltip** — it's a hint, not a substitute for a visible label.
- Always also give icon-only controls an `aria-label`; the tooltip is visual, the
  `aria-label` is for assistive tech.

## Scrollbars

daisyUI has no scrollbar component, so the theme styles scrollbars directly to match the
light theme — **square (no radius), thin, quiet.** This is applied globally; you don't add
classes for it.

| Part | Value |
|---|---|
| Width / height | `12px` |
| Track | transparent |
| Thumb | `base-300` (`#DCDCD3`), square corners |
| Thumb hover | `base-content` @ 35% |
| Firefox | `scrollbar-width: thin`, `scrollbar-color: base-300 transparent` |

Don't restyle scrollbars per component or introduce rounded/overlay scrollbars — the global
theme rule is the single source. Just use normal `overflow-*` utilities on scroll containers.

## Selection & active tint

Selected and active surfaces share **one** treatment across the system: **primary
(`#63A8CC`) at 40% opacity**, with **`base-content` text**. This applies to:

- **Selected list rows / the active item in a sidebar list** (e.g. the active conversation in a master–detail view)
- **Active menu items** (`menu-active`)
- **The AI / agent chat bubble** (`chat-bubble-primary`)

Use exactly this tint — don't substitute full `primary`, a different opacity, or `base-200`.
In code: `color-mix(in oklab, var(--color-primary) 40%, transparent)` (the `chat-bubble-primary`
class and the `menu-active` state already resolve to it; for a custom selected row use
`bg-[color-mix(in_oklab,var(--color-primary)_40%,transparent)]`). Never put primary-colored
text on this tint — always `base-content`.
