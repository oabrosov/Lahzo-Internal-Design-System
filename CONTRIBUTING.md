# Contributing to the Lahzo design system

This system stays coherent because changes go through one source of truth and one check.
Read `GUIDELINES.md` first — it is authoritative. This file is the workflow.

## Golden rule

Every UI element is **a canonical daisyUI component + the Lahzo theme classes + a defined
`text-*` utility**, held to the spacing / sizing / icon / contrast / sentence-case rules. If
you find yourself writing custom CSS or raw `<div>` controls, stop — the system almost
certainly already has the pattern.

## Where things live

- **A color, radius, border, or font change** → `src/styles.css` only. That is the single
  source of truth; the showcase and every tool inherit from it. Do not patch a token in a
  consuming project.
- **A new component pattern** → first check whether it's covered (`GUIDELINES.md`,
  `reference/components.json`). If it is, follow the spec. If it genuinely isn't, use the base
  daisyUI component styled only by the theme tokens — no bespoke CSS — and document it.
- **Showcase examples** → `docs/index.html`.
- **Reference data** → keep `reference/components.json` in sync when you add or change a spec.

## Workflow for any change

```bash
npm install            # one-time
# 1. edit src/styles.css (tokens) and/or docs/index.html (examples)
npm run build          # recompile docs/styles.css against the markup
npm run validate       # must pass with 0 errors
npm run serve          # eyeball it at http://localhost:8080
```

A green validator is the **floor, not the ceiling** — it proves the hard constraints hold
(no banned classes, no raw hex, on-scale spacing, sentence-case, theme set). It does **not**
judge layout, hierarchy, or spacing rhythm, so always open the page and look.

## Keeping Figma in sync

Tokens in `src/styles.css` are the source of truth. Mirror them into Figma **variables with
identical names** (`color/primary`, `radius/field`, and so on) so design and code never drift.
When a token changes here, update the matching Figma variable in the same change.

## Pull-request checklist

- [ ] Change is in `src/styles.css` if it's a token; not patched downstream.
- [ ] `npm run check` passes (build + validate, 0 errors).
- [ ] New or changed specs reflected in `reference/components.json` and `GUIDELINES.md`.
- [ ] Showcase updated in `docs/index.html` if a component changed.
- [ ] Eyeballed in the browser — layout, hierarchy, and spacing rhythm look right.
- [ ] No dark-mode assumptions, no raw hex, sentence-case copy, Phosphor icons only.
