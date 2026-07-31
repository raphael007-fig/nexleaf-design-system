# 4. Figma → Code Bridge

## The problem

Figma designs use a **mix** of Polaris + Tailwind Figma UI components + **Phosphor icons**.
The code design system (Poltail) has its **own** components. They don't line up 1:1, so a
Figma frame can't be blindly auto-converted — it needs a translation layer.

## Why not Figma Code Connect?

Code Connect is Figma's native design→code linker, but it requires a **Figma Organization
or Enterprise plan**. Nexleaf is on **Pro**, so it's unavailable. Instead we use a
**repo-committed mapping file** that Claude reads on every session. It's deterministic, costs
nothing, and if Nexleaf ever upgrades, the mapping data graduates straight into real
`.figma.ts` Code Connect files.

## The mapping file

[`../FIGMA-MAP.md`](../FIGMA-MAP.md) is the bridge. It contains:

1. **Global rules** — source of truth, import convention, icon + token rules.
2. **Token map** — Figma Polaris `--p-*` variables → Poltail tokens.
3. **Component map** — Figma component → Poltail component + prop/variant mapping + import path (top-12 done; rest are a tracked TODO).
4. **Icon translation** — Phosphor (Figma) → Polaris (`POLARIS_ICON_DATA`) name table.

It's auto-loaded into Claude via `CLAUDE.md`, so any Claude session in this repo already
knows how to translate.

## Icons: aligned on Polaris

The whole system standardizes on **Polaris** icons (the `PolarisIcon` catalog, sourced from
the "Nexleaf Icons V2" Figma file). Newer product designs that used Phosphor are translated
to their Polaris equivalent via the table in the map. Rule: if a Phosphor icon has no Polaris
match, **add its SVG path to `POLARIS_ICON_DATA`** rather than importing Phosphor — keep one
catalog.

## How to translate a design (step by step)

1. Open the Figma frame; identify each component and its variant/props.
2. Look each up in [`../FIGMA-MAP.md`](../FIGMA-MAP.md) → get the Poltail component + prop mapping.
3. Map any icons via the Phosphor→Polaris table.
4. Map raw values to tokens via the token table (never hardcode).
5. Build the screen in the [Prototype Hub](05-prototype-hub.md) using only mapped components.
6. Track it in [Jira](06-jira-tracking.md) with a link to the Figma frame.

With Claude: just share the Figma frame/URL and describe intent — it consults the map and
assembles the screen from real components.

## Extending the map

- First time you use a component whose Figma name is marked _(confirm)_, verify it against the Figma library and lock the name in.
- Add newly-mapped components to the table (35 remain — listed in the map's TODO).
- Grow the Phosphor→Polaris icon table as new icons appear.
- To fully verify Figma-side names, open "Nexleaf Design System v2.1" in the Figma desktop app so the reader can traverse it.
