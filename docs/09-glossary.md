# 9. Glossary

**Poltail** — the code design system in this repo. Name = **Pol**aris + **Tail**wind. React 19 + Storybook 10, 47 components + tokens.

**Polaris** — Shopify's open-source design system. Poltail is based on it; icons and many patterns come from it.

**Tailwind (Figma kit)** — Tailwind UI components used on the Figma side, part of the mixed Figma toolkit.

**Phosphor** — the icon set used in newer Figma product designs. Being translated to Polaris icons in code (see [Figma Bridge](04-figma-bridge.md)).

**Design token** — a named design value (color, spacing, radius, shadow). Lives in `src/tokens/` as JS constants and CSS variables. Always use these instead of hardcoded values.

**Barrel export** — `src/index.js`, which re-exports every component + token so consumers import in one line (`import { Btn } from '@ds'`).

**Mapping file** — [`../FIGMA-MAP.md`](../FIGMA-MAP.md). Translates Figma components → Poltail components. The stand-in for Figma Code Connect on a Pro plan.

**Code Connect** — Figma's native design→code linker. Requires Figma Enterprise/Org (Nexleaf is on Pro), so we use the mapping file instead.

**Prototype Hub** — `prototype-hub/`, the app that houses all prototypes, each built from Poltail components, with a live index and per-prototype changelog.

**Prototype** — a screen/flow assembled from Poltail components inside the hub. Not production code; a working, clickable design artifact.

**Storybook** — the tool for browsing/developing the design system components in isolation (`npm run storybook`).

**Chromatic** — visual review/regression service for Storybook.

**Traceability loop** — the linkage **Jira ticket ⇄ Figma frame ⇄ prototype commit** that lets anyone trace why a change happened.

**Nexleaf (Nexleaf Analytics)** — the organization; builds technology for global health, including vaccine cold-chain monitoring.

**Cold chain** — the temperature-controlled supply chain (e.g. vaccine fridges) that much of the product monitors.

**RTMD** — Remote Temperature Monitoring Device; hardware that reports fridge temperatures, a core product concept.
