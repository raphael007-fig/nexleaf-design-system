---
name: nexleaf-design-system
description: Build UI for Raphael's Nexleaf / ColdTrace cold-chain product by REUSING the existing design system (components + tokens) instead of inventing new markup. Use this whenever the user wants to build, prototype, mock up, or generate any screen, page, form, dashboard, widget, layout, or component for ColdTrace / Nexleaf — or translate a Figma frame for this product into code — even if they don't say "design system" by name. Also trigger when they mention reusing components/tokens, the ColdTrace app, temperature-recording / cold-chain / equipment / facility screens, or building "another home layout / prototype like the others". Do NOT trigger for unrelated projects that have their own, different design system.
---

# Nexleaf / ColdTrace Design System

Raphael maintains one design system for the ColdTrace cold-chain product. Any UI
you build for this product must be assembled from what already exists — reusing
it keeps prototypes consistent, hands engineering something real, and respects
the governance the system is built on. Inventing fresh markup or colors defeats
the whole point.

## Step 1 — Read the source of truth first

Before writing any UI, read:

```
/Users/raphaelokojie/Documents/Design System/PoltailDesign.md
```

That file is canonical. It documents the CSS-canonical governance, the full
component + token inventory, the responsive system, the item-shape / callback
contracts, and the two delivery surfaces. Don't skip it — it tells you what
already exists so you don't rebuild it.

Then browse the actual components before composing a screen:

- **React (reference surface):** `/Users/raphaelokojie/Documents/Design System/src/components/<Name>/`
  — each has `.jsx`, `.stories.jsx`, `.mdx`, and an `nx-*.css`.
- **Angular (production surface, `@nexleaf/angular`):** `/Users/raphaelokojie/Documents/Design System/angular/projects/nexleaf-angular/src/lib/<kebab-name>/`
- **Tokens:** `/Users/raphaelokojie/Documents/Design System/src/tokens/tokens.css` (CSS custom props) and `src/tokens/index.js` (JS mirrors).

## Step 2 — Pick the framework

Confirm which surface the user wants (ask only if unclear):

- **React** — the reference/prototyping surface. Matches the React Storybook
  (`localhost:6006`). Components are inline-styled `.jsx`; compose them directly.
- **Angular** — the production surface engineering ships. Import from
  `@nexleaf/angular` and the one bundled `styles.css`. Matches Angular Storybook
  (`localhost:6007`).

If they just want a quick prototype and don't care, default to **React** and say so.

## Step 3 — Compose, don't reinvent

Assemble the screen from existing pieces. Mirror an existing pattern rather than
starting from a blank div:

- **Shell / navigation:** `AppShell`, `TopBar`, `SideNavigation`, `MenuDrawer`,
  `Page` (with its `record` variant), breadcrumbs via `useNavSync`.
- **Content:** `Card` (layout types 1–6), `Cell`, `NavCard`, `MetricCard`,
  `IndexTable`, `Banner`, `Badge` / `StatusBadge`, `Tag`, `Accordion`.
- **Forms:** `TextInput`, `NumberInput`, `Textarea`, `SelectInput`,
  `SearchSelect`, `Checkbox`, `RadioButton`, `Toggle`, `DatePicker`, `Upload`.
- **Overlays / responsive:** `Modal`, `Popover`, `SlideOver`, `BottomSheet`,
  `EquipmentCard`, `TertiaryActions`.

When you need a small variation (e.g. "an Action Card but with a button instead
of a chevron"), compose the existing primitives (`Card` header + `Cell` with
`buttonLabel`) rather than authoring new visual CSS.

## The guardrails (why they matter)

These aren't red tape — they keep every prototype pixel-consistent with the
shipped system and safe to hand to engineering:

- **Reuse first. Don't create new components without explicit approval.** If a
  new component is genuinely needed, say so and wait for the go-ahead; a thin
  composition of existing parts almost always covers it.
- **No hardcoded colors.** Every color comes from a token in `tokens.css`
  (`var(--nx-…)` in CSS / the `src/tokens/index.js` const in React). Raw hex
  outside the token file breaks theming and the visual gate.
- **Inline SVG only — never an icon package.** The system ships hand-inlined
  SVGs; adding an icon dependency is off-pattern.
- **Additive, never destructive.** Extend with new props/variants/stories.
  Don't delete or rewrite existing components; don't break their public props.
- **Match the surrounding code.** Inline-styled React, template-only Angular —
  follow the idiom of the files you're editing.

## Step 4 — Preview it

Show the result running rather than asking the user to check manually:

- React Storybook: `cd "/Users/raphaelokojie/Documents/Design System" && npm run storybook` → `localhost:6006`
- Angular Storybook: `cd "/Users/raphaelokojie/Documents/Design System/angular" && npm run storybook` → `localhost:6007`
- Prepend `CI=1 STORYBOOK_DISABLE_TELEMETRY=1` to skip the telemetry prompt.

For a new component/screen, add a Storybook story so it's viewable, and (if the
change is visual) capture a screenshot to confirm it before reporting done.

## When the work is NOT inside the design-system repo

If the current session is in a different folder (a standalone prototype, the
temperature-recording repo, etc.), the paths above still apply — read
`PoltailDesign.md` from the absolute path first, then decide whether to build the
screen inside the design-system repo (as a new story/pattern) or to reference the
system's tokens/components from the other project. Ask the user which they want if
it's ambiguous.
