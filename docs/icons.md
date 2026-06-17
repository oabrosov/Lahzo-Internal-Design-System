# Icons

The system uses [Phosphor](https://phosphoricons.com/) via
[`@phosphor-icons/react`](https://github.com/phosphor-icons/react) — tree-shakeable SVG
components, so only the icons you import are bundled (no icon webfont). Use the `<Icon>`
wrapper for consistent sizing and color.

## Usage

```tsx
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Icon } from '@/components/ui';

<Icon icon={MagnifyingGlass} />              {/* 20px, regular, currentColor */}
<Icon icon={MagnifyingGlass} size={24} />    {/* explicit size */}
<Icon icon={MagnifyingGlass} label="Search" /> {/* meaningful → exposed to AT */}
```

Many components accept icons directly:

```tsx
<Button leftIcon={MagnifyingGlass}>Search</Button>
```

## Rules

- **Sizes:** `16 | 20 | 24 | 32` only — 16 in xs/sm controls, 20 in md (default), 24 for
  emphasis, 32 for empty states.
- **Color:** icons inherit `currentColor`. Color them via a `text-*` class on a parent,
  not with a hard-coded color.
- **Weight:** `regular` by default — only change it when a design explicitly calls for it.
- **Accessibility:** an icon with meaning needs a `label` (it renders `role="img"` +
  `aria-label`). A decorative icon omits `label` and is `aria-hidden`. Icon-only buttons
  must carry their own `aria-label`.
- **No emoji, no other icon sets.**
