# Lahzo build playbooks

Short recipes for the screens that come up most. They compose the **canonical
components** in a sensible order so you don't reinvent structure each time. They are
starting points, not straitjackets — adapt to the actual content, then run
`scripts/validate.py` before you finish.

Every screen, regardless of playbook:
- `data-theme="Lahzo — Light Theme"` on `<html>`, `bg-base-100 text-base-content` on `<body>`.
- The **Navbar** as the top-level header (Lahzo logo + divider + tool name; optional tabs/search/avatar).
- Page padding and gaps from the spacing scale (commonly `px-6`/`px-8`, `gap-4`/`gap-6`, section `space-y-8`).
- Sentence-case everywhere. One `text-*` utility per text node. Muted text = `base-content` at opacity 0.8.

---

## 1. Product screen (the default shell)

The general-purpose internal-tool screen.

```
Navbar
└─ main (max width or full-bleed, page padding from the scale)
   ├─ Page header: text-h1 title  +  primary action button (right)
   ├─ Optional toolbar row: filter chips (btn-sm), search input, sort control
   └─ Content region: table, cards, list+detail, or a form
```

- Title is `text-h1`, one per screen. Section headings `text-h2`.
- The single primary action is `btn-primary` (top-right). Supporting actions are
  `btn-secondary` or `btn-ghost`.
- Wrap distinct content blocks in **Cards** when they need separation; otherwise use
  whitespace from the scale.

---

## 2. Form

For create/edit flows and the dialogs behind them.

```
Card or Modal
├─ Title: text-h2
├─ Field group (repeat):
│  ├─ Label above the field: text-label (sentence-case)
│  ├─ Control: Input / Select / Textarea (40px / md), full width
│  ├─ Helper text (optional): text-caption, base-content @ 0.8
│  └─ Error (optional): text-caption in error color + a ph-warning-circle icon + words
└─ Action row (right-aligned, 16px gap): Cancel (btn-secondary) · Submit (btn-primary)
```

- Label sits **above** the control, 8px gap. Required fields: append a small `*` in the
  label (don't rely on color alone).
- Validation never relies on color alone — pair the error color with an icon and text.
- Group related fields with `space-y-4`; separate sections with `space-y-8` or a divider.
- In a Modal, the form follows the Modal spec (480px, title `text-h2`, Cancel/Submit footer).

---

## 3. Data table view

List of records with filtering and pagination.

```
Page header (text-h1) + primary action (btn-primary)
Toolbar row: search input (md) · filter chips (btn-sm) · sort control (btn-sm, ph-caret-down)
Table (.table)
├─ Header row: Instrument Sans Medium 14px @ 0.8 opacity, sentence-case
├─ Body rows: text-body; row actions as btn-ghost icon buttons (ph-pencil-simple, ph-trash)
└─ Optional: table-zebra, table-pin-rows for long lists
Pagination (.join + .btn): numbered or "Page n of m"
Empty state: centered ph-* icon (32px), text-h3 message, text-body hint, primary action
```

- Keep cell padding to spec (16px horizontal / 12px vertical). Don't right-align text
  columns; right-align only numeric/action columns.
- Status cells use a **Badge**, not bare colored text.

---

## 4. List + detail (master–detail)

Two- or three-pane review/browse layouts (inbox, CRM record, conversation review).

```
Navbar
└─ flex row, full height
   ├─ Left pane (fixed width, e.g. 320px): Sidebar Menu or a scrollable list
   │   ├─ list controls: filter chips (btn-sm), search input
   │   └─ list items: text-body title + text-caption metadata; selected item = primary @ 40% tint
   ├─ Center pane (flex-1): the selected record's content
   └─ Right pane (fixed width): Details — text-label field names + text-body/caption values
```

- Exactly one selected list item at a time (primary @ 40% background tint, `base-content` text).
- Field rows in the Details pane: label is `text-label`, value is `text-body` (or
  `text-caption` for IDs/timestamps). IDs and timestamps use `text-caption` (mono).
- A persistent action bar (e.g. accept/reject) can be docked at the bottom of the center
  pane; keyboard-shortcut hints render as `text-label` chips next to the buttons.
- Panes don't get borders-for-decoration; separate them with `base-300` 1.5px dividers
  only where structure needs it.
