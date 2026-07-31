# 2. Getting Started

## Prerequisites

- **Node.js** 20+ and **npm**.
- **Git** (history is part of the workflow).
- **Figma desktop app** (optional but recommended — needed to fully read the design-system files).
- **Jira access** to the Nexleaf site (for change tracking).

## Repo layout

```
Design System/
  src/                  # Poltail design system (components, tokens, pages)
    components/         # 47 components, one folder each
    tokens/             # index.js (JS constants) + tokens.css (CSS vars)
    pages/              # full page templates
    index.js            # barrel export → import { Btn } from the DS in one line
    global.css          # base styles + shared keyframes (loaded globally)
  angular/              # Angular port of the system
  prototype-hub/        # where prototypes live (see doc 05)
  .storybook/           # Storybook config
  docs/                 # ← you are here
  WORKFLOW.md           # architecture
  FIGMA-MAP.md          # Figma → Poltail mapping (auto-loaded by CLAUDE.md)
  CLAUDE.md             # loads PoltailDesign.md + FIGMA-MAP.md for Claude sessions
```

## Install

```bash
cd "Design System"
npm install
```

## Run Storybook (browse the design system)

```bash
npm run storybook        # opens on http://localhost:6006
```

## Run the Prototype Hub

```bash
cd prototype-hub
npm run dev              # opens the printed localhost URL
```

The hub imports the design system directly, so any component change shows up in prototypes.

## Other commands

| Command | What it does |
|---|---|
| `npm run build-storybook` | Static Storybook build |
| `npm run test:visual` | Playwright visual tests |
| `npm run storybook:angular` | Storybook for the Angular port |
| `cd prototype-hub && npm run new -- <slug> "Title"` | Scaffold a new prototype |
| `cd prototype-hub && npm run gen-barrel` | Regenerate the DS barrel export |

## Working with Claude

Claude Code, run inside this repo, auto-loads `CLAUDE.md` → which loads the design spec and
the Figma map. So Claude always knows the components, tokens, and how to translate designs.
Just describe the change; Claude builds it from real Poltail components.
