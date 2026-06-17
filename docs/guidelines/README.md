# Guidelines

The design rules behind the components. The components already encode these — follow them
when composing screens or adding new components.

## The one rule

Every UI element = a **daisyUI component + the Lahzo theme + a defined `text-*` style.**
Don't hand-roll controls or invent CSS when a pattern already exists.

## Non-negotiables

- **Theme tokens only** — never raw hex. See [../tokens.md](../tokens.md).
- **The scales:** spacing 4–96, control heights 24 / 32 / 40 / 48, icons 16 / 20 / 24 / 32.
- **11 text styles**, one per text node; **sentence-case** always (initialisms allowed).
- **Underline** is reserved for `.btn-link`.
- **WCAG AA** contrast; muted text = `base-content` at opacity **0.8**.
- **Phosphor icons** only — no emoji, no other sets.
- **Both themes** render from the same token-based code.

## In this section (cross-cutting foundations only)

- [typography.md](typography.md)
- [spacing-sizing.md](spacing-sizing.md)
- [color-a11y.md](color-a11y.md)

**Per-component usage + API docs live next to the component** as a Storybook MDX page
(e.g. `src/components/ui/Button/Button.mdx`), browsable in the deployed Storybook — they are not
duplicated here. This folder holds only rules that span the whole system.
