# Spacing & sizing

## Spacing scale

Padding, margin, and gap come from one scale (px):

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

No off-scale values (no 5, 10, 14, 18…). Common screen rhythm: page padding `px-6`/`px-8`,
content gaps `gap-4`/`gap-6`, section spacing `space-y-8`. The design-token linter flags
off-scale spacing.

## Control heights

| Size | Height | Horizontal padding | Use |
|------|--------|--------------------|-----|
| xs | 24px | 8px | tags, micro-chips |
| sm | 32px | 12px | filter chips, dense toolbars |
| **md** | **40px** | 16px | default — buttons, inputs, selects (≈95% of cases) |
| lg | 48px | 20px | hero CTAs only |

Internal gap between an icon and its label: **8px** (md/lg), **6px** (sm/xs).

## Icon sizes

`16 · 20 · 24 · 32` px. 16 inside xs/sm controls, **20** the default (md), 24 for emphasis,
32 for empty states. Never 12 or 14 — bump to 16.

## Corners & borders

Driven by the theme: fields/boxes `0.5rem`, selectors `0.25rem`, borders `1.5px`, no
shadows. Don't add `rounded-*`/`shadow-*` overrides — let the tokens drive the look.
