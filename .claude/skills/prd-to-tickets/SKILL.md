---
name: "prd-to-tickets"
description: "Turn a PRD into a tracked, buildable backlog for Raphael: decompose it into design and engineering tickets under the project's Jira epic, get his approval on the breakdown, create them in Jira (Product Board PD), and scaffold one prototype-hub FLOW per design ticket with shared screens underneath. Use when he hands over a PRD, says \"turn this into tickets\", \"break this down\", \"start a project from this PRD\", or when a PRD has produced untracked work. Also use to work a single ticket end to end (\"work PD-42\")."
---

# PRD → tickets → flows → screens

Turns a PRD into a tracked backlog. Companion to `nexleaf-design-workflow`; `prd-writer` /
`one-page-prd-generator` write the PRD, this decomposes it.

## The model — ticket = flow, screens are shared

Raf's tickets are **user stories = flows**, and several flows usually cross the **same screens**:

> "As a user I want to update the information on a CCE"  → PD-42
> "As a user I want to export the data on a CCE"        → PD-43
> Both walk through the same CCE detail screen.

So the unit is the **flow**, with screens as shared modules underneath — never duplicate a screen
per ticket:

```
projects/<project>/
  screens/               ← the NOUNS, built once, imported by many flows
    CceDetail.jsx
    CceEditForm.jsx
    ExportPanel.jsx
  prototypes/
    update-cce-info/     ← the VERB (flow) — PD-42, imports CceDetail + CceEditForm
    export-cce-data/     ← the VERB (flow) — PD-43, imports CceDetail + ExportPanel
```

- **One ticket = one flow = one prototype folder**, `meta.js` carries `jiraKey` and
  `screens: ['CceDetail', 'CceEditForm']` (rendered as a "Screens used" column on the hub project
  page, so reuse is visible).
- **A screen exists once.** Fixing it lands in every flow that imports it — that's the point.
- Scaffold: `npm run new-screen -- <project> CceDetail` · `npm run new -- <project> <flow-slug> "Title"`.
- **Figma mirrors this:** shared screens are base frames in the project section; each flow is its
  own left→right frame sequence named `<Flow> — v1 (PD-42)`, reusing/instancing the screen frames
  rather than redrawing them. Flow-specific states (the export panel open, a validation error)
  live in that flow's sequence.

```
PRD → Epic (project) → Story per flow [PD-42] → prototype flow + Figma frame group + commits
```

## A. Decompose a PRD

1. **Read it fully.** Save a working copy at `projects/<project>/PRD.md`; source link in
   `project.js.prd`.
2. **Ensure the epic exists** in `PD`, key recorded in `project.js.jiraEpic`. (`PD-30` = Design
   Ops, `PD-16` = design-system log — never put project work there.)
3. **Slice by user story / flow**, not by layer or by screen. Each ticket = one thing a user can
   accomplish end to end.
4. **Identify the shared screens across those flows** and list them — this is the key step. State
   which screens are new, which already exist, and which flows share them.
5. **Split disciplines with labels, not duplicate tickets:** `discipline:design`,
   `discipline:engineering` (both when one outcome needs each), plus `design-workflow`,
   `surface:*`, `source:prd`.
6. **Show the breakdown FIRST** — a table: flow/ticket title · why separate · discipline ·
   screens it uses (new vs existing) · dependencies. **Never create tickets unasked.** Flag
   ambiguity instead of inventing scope.
7. **On approval:** create the tickets under the epic (house template: What / Why / Source /
   Links / Surface + acceptance criteria), scaffold any **new shared screens**, then scaffold one
   **flow prototype per design ticket** with `jiraKey` + `screens` set. Don't build the screens
   yet — that's per-ticket work.
8. **Report:** epic link, ticket keys, screens created, flows scaffolded, open questions.

## B. Work a single ticket ("work PD-42")

1. **Read the ticket** — description *and all comments* (comments hold the correction history).
2. **Move it to `In Progress`** before building. Always.
3. Open its flow prototype (matching `jiraKey`), or scaffold it.
4. **Reuse screens.** Import existing screen modules; only create a new screen if none fits — and
   if a shared screen needs changing, say so, because it affects the other flows.
5. Build per `ds-components-only` + `nexleaf-design-system` — Poltail only, layout per
   `src/pages/ApplicationLayout`, all states.
6. **Self-audit**, then `design-critique`. Fix findings before showing anything.
7. **Give the localhost URL** (`prototype-review-then-publish` — always first).
8. **Mirror to Figma only after asking**: the flow's frame sequence `<Flow> — v1 (PD-42)`, real
   library instances, annotated in his house style.
9. **Record:** CHANGELOG · commit `[PD-42]` · Jira comment with links · Slack DM.
10. Done only when the DoD is met — parity confirmed, no unresolved feedback.

## C. Seeing the whole set

- **Jira:** `"Epic Link" = <epic> ORDER BY status`, or the PD board filtered by
  `label = design-workflow`.
- **Hub:** the project page = the design board — each flow with status, PD badge, and screens used.
- **Ask Claude:** "status of \<project\>" → cross-reads the epic's tickets against the hub's flows
  and reports which tickets have flows, which don't, and which have diverged from Figma.

## Rules

- **Show the breakdown before creating anything.** Approval gate, every time.
- **Never duplicate a screen to satisfy a ticket** — share it and note the dependency.
- A PRD that yields one ticket is fine; don't inflate the count.
- Observations found mid-ticket are **comments on that ticket**; design-system gaps go to **PD-16**.
- Tickets live in **Jira only** — GitHub is source control, no parallel Issues.
- If the PRD prescribes solutions, extract the underlying need (per `prd-writer`); tickets
  describe outcomes, design owns the solution.

