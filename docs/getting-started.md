# Getting started

## 1. Create your project

Click **“Use this template”** on GitHub (or clone the repo), then:

```bash
npm install
npm run dev          # example app  → http://localhost:5173
npm run storybook    # component explorer → http://localhost:6006
```

Node **20+** is required.

## 2. Where things live

```
src/
├─ components/ui/   ← the components — you OWN this source, edit freely
│  ├─ Button/       ← one folder per component
│  │   Button.tsx  Button.stories.tsx  Button.mdx  Button.test.tsx  index.ts
│  ├─ Icon/  Logo/
│  └─ index.ts      ← barrel: import { Button } from '@/components/ui'
├─ theme/          ← lahzo.css (tokens), ThemeProvider, useTheme, ThemeToggle
├─ lib/cn.ts       ← cn() class-merge helper
├─ examples/       ← the example screen (delete or replace)
├─ App.tsx  main.tsx  index.css
```

## 3. Use a component

```tsx
import { Button } from '@/components/ui';
import { Plus } from '@phosphor-icons/react';

export function Toolbar() {
  return (
    <Button variant="primary" leftIcon={Plus}>
      Add item
    </Button>
  );
}
```

`@/` is aliased to `src/` (see `vite.config.ts` and `tsconfig.json`).

## 4. Make it yours

- Replace `src/examples/` and `src/App.tsx` with your own screens.
- Keep `src/theme/lahzo.css` as the single styling source — adjust tokens there, never
  hard-code colors in components.
- Add components one at a time — see [CONTRIBUTING.md](../CONTRIBUTING.md) and the
  [component-spec template](component-spec.template.md).

## 5. Verify before you ship

```bash
npm run check        # typecheck + lint + design-token lint + tests
```

## Updating from the template

Because you own the code, there's no package to bump. To pull in improvements from a
newer template release, diff your `src/components/ui/` against the release and cherry-pick
what you want. Local edits always win.
