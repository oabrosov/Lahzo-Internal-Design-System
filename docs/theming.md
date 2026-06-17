# Theming

The system ships two daisyUI themes — **Light** (`lahzo-light`, default) and **Dark**
(`lahzo-dark`) — defined in `src/theme/lahzo.css`. The IDs are space-free on purpose (it
keeps the minified CSS valid); UI labels say "Light" / "Dark". They share the same
structure (rounded corners, 1.5px
borders, depth 0); only the color tokens differ. Because every component is built from
tokens, the same markup renders correctly in both themes with no per-theme code.

## Wiring it up

Wrap your app once in `ThemeProvider`. It writes `data-theme` onto `<html>` and persists
the choice to `localStorage`.

```tsx
import { ThemeProvider } from '@/theme/ThemeProvider';

createRoot(rootElement).render(
  <ThemeProvider defaultTheme="lahzo-light">
    <App />
  </ThemeProvider>,
);
```

## Reading / changing the theme

```tsx
import { useTheme } from '@/theme/useTheme';

const { theme, setTheme, toggleTheme } = useTheme();
```

Or drop in the ready-made control:

```tsx
import { ThemeToggle } from '@/theme/ThemeToggle';
// <ThemeToggle />  → sun/moon icon button
```

## How it works

- `data-theme="lahzo-light"` (or `"lahzo-dark"`) on `<html>` selects the active daisyUI
  theme. The initial value is set in `index.html`; `ThemeProvider` keeps it in sync.
- Tokens are CSS variables (`--color-primary`, `--color-base-100`, …). Components reference
  them through daisyUI/Tailwind classes (`bg-primary`, `text-base-content`) — never raw hex.

## Adjusting or adding a theme

Edit the `@plugin "daisyui/theme" { … }` blocks in `src/theme/lahzo.css`. To add a third
theme, copy a block, give it a new (space-free) `name`, add the name to the `Theme` type in
`src/theme/context.ts`, and register it in the Storybook toolbar in `.storybook/preview.tsx`.

See [tokens.md](tokens.md) for every token and its value.
