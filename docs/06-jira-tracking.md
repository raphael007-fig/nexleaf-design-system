# 6. Jira Change Tracking

Jira is the **change ledger**: every design or prototype change becomes a ticket recording
*what* changed and *why*, linked to the Figma frame and/or the code commit.

## Where

- **Site:** https://nexleaf.atlassian.net
- **Project:** **Product Board (`PD`)** — next-gen software project.
- **One design project = one epic.** Each hub project gets its own epic in PD (the epic key is recorded in the project's `project.js` → the hub links to it).
- **Design Ops epic:** [**PD-30**](https://nexleaf.atlassian.net/browse/PD-30) — for system-level work (design system, hub, workflow itself), not product projects.
- **Seed example:** [PD-31 — Prototype: Temperature Readings — initial build](https://nexleaf.atlassian.net/browse/PD-31) — copy its shape for new tickets.

## Issue structure

| Level | Use |
|---|---|
| **Epic** | One per design project (PD-30 reserved for Design Ops) |
| **Task / Story** | One discrete piece of work — labeled `discipline:design` or `discipline:engineering` |
| **Comments** | Revisions to in-progress work — the comment thread is the change history |
| **Subtask** | Steps within a larger change, if needed |

## Ticket template

Every ticket body follows this shape:

```
What:    <the change, in one or two sentences>
Why:     <the reason — the decision or problem behind it>
Source:  meeting | transcript | slack | verbal   (+ date)
Links:   Figma frame URL · prototype path/commit · CHANGELOG
Surface: figma | prototype | both
```

## Labels

PD is a next-gen project (no custom fields needed) — we use **labels** for filtering:

- `design-workflow` — on every ticket in this system (lets you filter the whole stream).
- `discipline:design` / `discipline:engineering` — who the ticket is for (PRD decomposition creates both).
- `surface:figma` / `surface:prototype` / `surface:both` — where the change landed.
- `source:meeting` / `source:transcript` / `source:slack` / `source:verbal` / `source:prd` — where it came from.

Useful filter: `label = design-workflow ORDER BY created DESC` — the full change ledger.

## Status flow

PD's standard workflow applies: **To Do → In Progress → Done.** "In review" is signaled by
the ticket sitting in In Progress with the Figma/commit links attached and a review request
in the comments (or move it to a Review column if one is added to the board later).

## Definition of Done (per ticket)

1. Built from real Poltail components (no hand-rolled UI).
2. Prototype `CHANGELOG.md` entry added (what + why + source).
3. Commit made with the standard message + `[PD-XX]` key.
4. Ticket has the Figma frame and/or commit link, then moves to Done.

## Creating tickets with Claude

Describe the change (or paste a transcript/Slack thread) and ask Claude to create the
tickets — it drafts them in this template, you approve, and it files them under PD-30 with
the right labels. See [Meeting → Jira Flow](07-meeting-to-jira.md).
