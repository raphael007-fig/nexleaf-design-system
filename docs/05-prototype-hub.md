# 5. Prototype Hub

The hub (`../prototype-hub/`) is the single home for all prototype work, hosted at
**design.nexleaf.org**. It's organized by **project**: the index lists projects; each
project page lists its prototypes plus links to its Jira epic, PRD, and Figma file.
Every prototype is assembled **only** from Poltail components.

```
Hub index  →  Project (epic + PRD + Figma links)  →  Prototypes (a, b, c…)
#/            #/<project>                            #/<project>/<prototype>
```

## Run

```bash
cd prototype-hub
npm run dev
```

## Create a project

```bash
npm run new-project -- rtmd-alerts "RTMD Alerts" PD-32
```

Scaffolds `src/projects/<slug>/` with `project.js` (title, status, `jiraEpic`, `prd`,
`figma`, updated) and a `PRD.md` working copy. **One project = one Jira epic** (see
[Jira](06-jira-tracking.md)). Projects are auto-discovered — no registry edits.

## Add a prototype to a project

```bash
npm run new -- rtmd-alerts alert-detail "Alert Detail"
```

Scaffolds `src/projects/<project>/prototypes/<slug>/` with `meta.js`, `index.jsx`, and
`CHANGELOG.md`. Build with the barrel:

```jsx
import { Page, Card, Btn, IndexTable, Badge } from '@ds';
```

## Structure

```
prototype-hub/
  src/
    App.jsx                      # projects index → project page → prototype (hash router)
    projects.js                  # auto-discovery (projects + their prototypes)
    projects/<project>/
      project.js                 # title, status, jiraEpic, prd, figma, updated
      PRD.md                     # working copy of the PRD (source linked in project.js)
      prototypes/<slug>/
        meta.js                  # title, description, status, jiraKey, tags, updated
        index.jsx                # the prototype (default export)
        CHANGELOG.md             # what changed and why
  scripts/
    new-project.mjs              # scaffold a project
    new-prototype.mjs            # scaffold a prototype inside a project
    gen-barrel.mjs               # regenerate ../src/index.js
```

## Activity log & prototype types

Each prototype's `CHANGELOG.md` renders in the hub as an **Activity panel** — open a
prototype and click **Activity** to see what was created/updated/changed, entry by entry.
Keeping the CHANGELOG current is what keeps this panel truthful.

`meta.js` carries a `type` — `screen` | `flow` | `exploration` | `component` — shown as a
chip on cards and in the prototype top bar, so different kinds of prototypes coexist cleanly
in one project.

## Rules

- **Only Poltail components.** A missing component is a signal to extend the design system (ticket it), not to hand-roll UI in a prototype.
- **Every meaningful change is logged** — CHANGELOG entry (what + why + source) + commit `proto(<slug>): <what> — <why> [PD-XX]`. Small tweaks batch into checkpoints; see [Conventions](08-conventions.md).
- `meta.js` carries the prototype's Jira key; `project.js` carries the epic — the hub renders both as links.

## Deploy — design.nexleaf.org

`vercel.json` is configured for a Vite build. Point the design.nexleaf.org Vercel project
(or a route/subdomain of it) at `prototype-hub/` so the team browses projects and clicks
through live prototypes.
