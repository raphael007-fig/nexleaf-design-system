# Nexleaf Design Workflow — Documentation

This folder documents the end-to-end design workflow: how a change goes from an idea
in a meeting, to a design in Figma, to a working prototype in code, to a tracked ticket
in Jira — with everything staying in sync.

**New here? Read in this order:**

1. [Overview](01-overview.md) — the system at a glance and the one principle it runs on.
2. [Getting Started](02-getting-started.md) — prerequisites, install, and running things.
3. [Design System (Poltail)](03-design-system.md) — the component library and tokens.
4. [Figma → Code Bridge](04-figma-bridge.md) — how Figma designs become Poltail code.
5. [Prototype Hub](05-prototype-hub.md) — where prototypes live and how to build them.
6. [Jira Change Tracking](06-jira-tracking.md) — the change ledger structure.
7. [Meeting → Jira Flow](07-meeting-to-jira.md) — turning discussions into tracked changes.
8. [Conventions](08-conventions.md) — naming, commits, versioning, definition of done.
9. [Glossary](09-glossary.md) — terms and acronyms.

## 30-second summary

```
FIGMA  →  MAPPING  →  POLTAIL (Storybook)  →  PROTOTYPE HUB  →  JIRA
intent    bridge      code source of truth    real prototypes    change ledger
```

- **Figma** owns what it should look like (Polaris + Tailwind kit + Phosphor icons).
- **Poltail** is the code design system — the source of truth for how things are actually built (47 React components + tokens).
- The **mapping file** ([`../FIGMA-MAP.md`](../FIGMA-MAP.md)) translates Figma components → Poltail components deterministically.
- The **Prototype Hub** (`../prototype-hub/`) is where prototypes are assembled, using only Poltail components.
- **Jira** records every change and *why* it happened, linking the Figma frame and the code commit.

## The skill stack (which skill does what)

| Skill | Job | Stage |
|---|---|---|
| `prd-writer` / `one-page-prd-generator` | Full PRD / one-pager from a rough idea | Collect |
| `product-os` | Pressure-test the idea/PRD/decision — *should we build it?* | Collect → Track |
| `nexleaf-design-system` | Build screens by composing Poltail — never reinvent | Create |
| `figma-generate-design` + `figma-use` | Push prototypes/screens into Figma (canvas discipline applies) | Create |
| `design-critique` | Quality review — heuristics, DS compliance, states — *is it good?* | Create → Deliver |
| `figma-design-audit` | Audit frames vs agreed decisions, annotations + QA flags — *is it right?* | Deliver |

## Related root docs

- [`../WORKFLOW.md`](../WORKFLOW.md) — the original architecture write-up (this `/docs` set expands it).
- [`../FIGMA-MAP.md`](../FIGMA-MAP.md) — the live Figma→Poltail mapping (auto-loaded by `CLAUDE.md`).
- [`../PoltailDesign.md`](../PoltailDesign.md) — the deep design-system spec.
