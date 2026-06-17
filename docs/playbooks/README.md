# Playbooks

Starting points for the screens that come up most. Compose the components in a sensible
order; adapt to the actual content. Every screen: a header (brand + tool name + optional
tabs/search/avatar), page padding from the scale, sentence-case, one `text-*` per node,
muted text at `base-content/80`.

## 1. Product screen (the default shell)

```
Header
└─ main (page padding)
   ├─ Page header: text-h1 title + primary Button (right)
   ├─ Optional toolbar: search input · secondary Buttons · sort control
   └─ Content: table, cards, list+detail, or a form
```

One `text-h1` and one `primary` Button per screen; supporting actions are `secondary` or
`ghost`. See `src/examples/DashboardExample.tsx`.

## 2. Form (create / edit / dialog)

```
Card or Modal
├─ Title: text-h2
├─ Field group (repeat):
│  ├─ Label above the control: text-button, sentence-case (required → trailing *)
│  ├─ Control: Input / Select / Textarea (md, full width)
│  ├─ Helper (optional): text-caption @ 0.8
│  └─ Error (optional): error color + WarningCircle icon + text
└─ Actions (right, gap-4): Cancel (secondary) · Submit (primary)
```

Group related fields with `space-y-4`; separate sections with `space-y-8`. Validation never
relies on color alone.

## 3. Data table

```
Page header (text-h1) + primary Button
Toolbar: search · filter chips (sm) · sort (sm)
Table: header row (medium 14 @ 0.8), body rows (text-body), row actions as ghost icons
Pagination
Empty state: 32px icon · text-h3 message · text-body hint · primary action
```

Status cells use a Badge, not bare colored text. Right-align only numeric/action columns.

## 4. List + detail

```
Header
└─ flex row, full height
   ├─ Left (fixed, ~320px): list or sidebar menu (+ search / filter chips)
   ├─ Center (flex-1): the selected record
   └─ Right (fixed): details — text-label field names + text-body values
```

Exactly one selected item at a time (primary @ 40% tint, `base-content` text). Separate
panes with `base-300` 1.5px dividers only where structure needs them.
