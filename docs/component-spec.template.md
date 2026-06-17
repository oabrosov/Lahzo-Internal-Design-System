# Component spec: <Name>

> Fill one of these per component, then hand it off. The engineer turns it into a
> `src/components/ui/<Name>/` folder (`<Name>.tsx`, `<Name>.stories.tsx`, `<Name>.mdx`,
> `<Name>.test.tsx`, `index.ts`), a barrel export, and a `reference/components.json` entry.
> Delete these quote blocks when done.

- **daisyUI base class:** `.<class>` (e.g. `.btn`, `.input`, `.card`)
- **Tier:** canonical | essential | tier-3
- **Status:** proposed | spec-ready | built

## Purpose / when to use

<One or two sentences. What problem does it solve, and when should a developer reach for it?>

## Anatomy (parts / slots)

- `<part>` — <description>
- `<part>` — <description>

## Props & variants

| Prop | Type / values | Default | Maps to (class / behavior) | Notes |
|------|---------------|---------|----------------------------|-------|
| variant | `primary \| secondary \| …` | `secondary` | `btn-primary` / `btn-secondary` | |
| size | `xs \| sm \| md \| lg` | `md` | `btn-xs` … (24 / 32 / 40 / 48px) | |
| leftIcon | Phosphor icon | — | leading `<Icon>` | |
| … | | | | |

## States

default / hover / active / focus / disabled — <how each is handled: daisyUI built-in vs theme override>.

## Sizes

<Which control-height steps apply (xs 24 / sm 32 / md 40 / lg 48), and the default.>

## Accessibility

- **role / aria:** <…>
- **keyboard:** <…>
- **focus:** <…>
- **contrast:** <…>

## Content rules

- Sentence-case labels; initialisms preserved (ID, URL, API).
- Icon usage: <which icons, where, default size>.

## Do / Don't

- ✅ <do>
- ❌ <don't>

## Examples (intended usage)

```tsx
<Name variant="primary" size="md">Save changes</Name>
```

## Edge cases / notes

<Loading, empty, overflow, RTL, long labels, anything unusual.>
