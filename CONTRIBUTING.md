# Contributing

This repo is a **template**: a curated set of clean, owned React components. The bar is
high because the code itself is the deliverable — developers copy it and build on top.

## Roles

- **Designer** — owns components, their specs, and the UX guidelines. Fills in a
  [component spec](docs/component-spec.template.md) per component.
- **Engineer** — turns each filled spec into a wrapper + stories + docs + test.

## Add a component (the workflow)

1. **Spec it.** Copy `docs/component-spec.template.md` and fill it in.
2. **Scaffold it.** `npm run new:component -- <Name> [daisyuiBase] [tier]` — creates the
   `<Name>/` folder (`<Name>.tsx`, `<Name>.stories.tsx`, `<Name>.mdx`, `<Name>.test.tsx`,
   `index.ts`), adds the barrel export, and registers it in `reference/components.json`. No
   registry step to forget.
3. **Flesh it out** from the spec, following the Button pattern: `forwardRef`, props extend the
   native element, variants via [`cva`](https://cva.style), classes merged with `cn()` — daisyUI
   base class + theme tokens only. Complete the stories, MDX, and tests.
4. **Verify.** `npm run check && npm run storybook` — both themes, axe clean.
5. **PR** with the checklist below.

## Conventions

- **Tokens only.** Never raw hex or off-scale spacing — use theme tokens and the scales
  (see [docs/tokens.md](docs/tokens.md)). The design-token linter enforces this.
- **One `text-*` style per text node**; **sentence-case** always (initialisms allowed).
- **Underline** is reserved for `.btn-link`.
- **Icons:** Phosphor via the `<Icon>` wrapper; sizes 16 / 20 / 24 / 32.
- **Both themes:** build from tokens so Light + Dark work with no per-theme code.
- **Accessibility:** every interactive element is keyboard- and screen-reader-usable;
  icon-only controls need an `aria-label`.

## PR checklist

- [ ] `<Name>/` folder with `.tsx` + `.stories.tsx` + `.mdx` + `.test.tsx` + `index.ts`
- [ ] Exported from the barrel + added to `reference/components.json`
- [ ] `npm run check` passes (typecheck, lint, lint:classes, test)
- [ ] Works in **Light** and **Dark** (Storybook toolbar)
- [ ] Storybook **a11y** addon reports no violations
- [ ] Tokens-only classes; sentence-case copy
- [ ] `CHANGELOG.md` updated

## Versioning & releases

Semantic versioning via Git tags + GitHub Releases (`v1.0.0`, …). Each release is a
snapshot template consumers can diff against. Use
[Conventional Commits](https://www.conventionalcommits.org/) and keep
[`CHANGELOG.md`](CHANGELOG.md) current. Because components are copy-owned, "upgrading" =
diffing a newer release and cherry-picking the parts you want.
