# Color & accessibility

## Use tokens, by role

- **Surfaces:** `base-100` (page), `base-200` (cards/inputs/elevated), `base-300`
  (borders/dividers).
- **Text:** `base-content` (default). Muted = `base-content` at opacity **0.8**.
- **Brand / actions:** `primary` (one primary action per surface).
- **Status:** `info`, `success`, `warning`, `error` — always with their `*-content` text.
- **High-emphasis dark / tooltips:** `neutral`.

Never hard-code hex; reference tokens (`bg-base-200`, `text-base-content`, `border-base-300`).

## Contrast (WCAG 2.1 AA)

- Normal text: **4.5:1** minimum. Large text (18px+, or 14px bold): **3:1**.
- Meaningful UI graphics (icons, status dots, focus rings): **3:1**.
- **Safe default:** `base-content` on any base surface clears AA comfortably in both themes.
- On a saturated surface (`bg-primary`, `bg-success`, …), use the matching `*-content`
  token — those pairs are pre-validated.
- **Don't** put a tinted text on a same-family tinted background (e.g. primary text on a
  primary-tinted bubble).

## Don't rely on color alone

Pair every status with a word and/or icon: errors get `error` color **plus** a
`WarningCircle` icon **plus** text; success gets a check **plus** text.

## Selection & active tint

Selected rows / active menu items / AI bubbles use **primary at 40%** with `base-content`
text (`color-mix(in oklab, var(--color-primary) 40%, transparent)`) — already wired in
`lahzo.css`. Don't invent other selection treatments.

## Both themes

Build from tokens and a component works in Light and Dark automatically. Never hard-code a
color "to support dark mode" — that's what tokens are for.
