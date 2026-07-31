# Nexleaf Prototype Hub

Central home for all prototype work, organized by **project**. Hosted at
**design.nexleaf.org**. Every prototype is composed **only** from Poltail design-system
components (via the `@ds` alias → `../src`).

```
Hub index  →  Project (Jira epic + PRD + Figma links)  →  Prototypes (a, b, c…)
#/            #/<project>                                  #/<project>/<prototype>
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

One project = one Jira epic. Scaffolds `project.js` (links: `jiraEpic`, `prd`, `figma`)
+ a `PRD.md` working copy. Auto-discovered — no registry edits.

## Add a prototype

```bash
npm run new -- rtmd-alerts alert-detail "Alert Detail"
```

Then build in `index.jsx` using `import { Page, Card, Btn } from '@ds'`.

## History = git + CHANGELOG

Every meaningful change: `CHANGELOG.md` entry (what + why + source) + commit
`proto(<slug>): <what> — <why> [PD-XX]` + the Jira ticket updated (comment for revisions,
new ticket for new scope).

## Structure

```
src/
  App.jsx                      # projects index → project page → prototype
  projects.js                  # auto-discovery
  projects/<project>/
    project.js                 # title, status, jiraEpic, prd, figma
    PRD.md                     # working copy of the PRD
    prototypes/<slug>/
      meta.js · index.jsx · CHANGELOG.md
scripts/
  new-project.mjs · new-prototype.mjs · gen-barrel.mjs
```

Full docs: [`../docs/`](../docs/README.md).
