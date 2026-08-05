---
name: nexleaf-design-workflow
description: End-to-end design workflow entry point — collect (meeting/Slack/PRD/correction) → track in Jira → create in Figma and the prototype hub → verify → deliver on design.nexleaf.org. Use when Raphael says "run the workflow", starts a new design project, hands over a PRD or meeting notes, asks what the process is, or when work spans more than one stage.
---

# Nexleaf design workflow — the whole loop

One source of truth per layer, deterministic bridges, and nothing changes silently.
Operating manual: `docs/`. Diagram: `docs/workflow-diagram.svg`. Bridge: `FIGMA-MAP.md`.

```
COLLECT -> TRACK (Jira PD) -> CREATE (Figma <-> Prototype, on Poltail) -> VERIFY -> DELIVER
```

## 1. Collect
Meeting / verbal, Meet transcript, Slack thread, PRD, or a correction ("fix X").
New project: Raf gives the **Figma link once at project start** -> record in the hub project's
`project.js` (`figma`, `prd`, `jiraEpic`). No link = no parity audits.
Pressure-test with `product-os` when the stakes justify it.

## 2. Track — Jira (Product Board `PD`)
- One **epic per project**. `PD-30` = Design Ops. **`PD-16` = design-system component log.**
- Move the ticket to **In Progress when work starts**.
- **New scope = ticket. Observation / revision / correction = comment.** Search Figma AND the
  repo before claiming something is missing or filing anything.
- Labels: `design-workflow`, `discipline:*`, `surface:*`, `source:*`.
- A PRD decomposes into design + engineering tickets under the epic — that's the handover.

## 3. Create — either direction, never silently
Load `ds-components-only` (binding) and `nexleaf-design-system`.
- **Never build UI from scratch.** Code composes Poltail (`@ds`); Figma places **real library
  instances**. A styled lookalike is a failure.
- **Layout:** code = `src/pages/ApplicationLayout` (`contentWidth="full"`, wrapper
  `padding: '0 16px 32px'` with **top padding 0** because `Page` owns its 24px, 24px section
  rhythm, wrapped in `AppShell`). Figma = the **Design Rep** page (top bar 56 + divider, rail 56
  at x=0, content x=80/y=72, **nav layered above the top bar**).
- **Mirror handshake:** prototype changed -> **ask before writing to Figma**. Figma changed ->
  Raf says **"go check it"** -> read frames, update the prototype.
- **Missing component?** Don't hand-roll, don't open a ticket — build it in the DS Figma file
  (`y4XdS2kaiS8eMHY3z8wORP`) or extend the code component, then **comment on PD-16**.
- Canvas discipline: own section, **versioned frames**, journey order, **all states**, annotated
  in his house style (`content` panels, `#eaf4ff`, Bold 14 title, behaviour panel + component
  breakdown **containing live component instances**).

## 4. Verify — before he sees it
- **Self-audit:** raw HTML elements, custom pills, hardcoded colors, hand-drawn icons, leftover
  placeholders, inconsistent sibling sizing, wrapping text, spacing vs the reference, canvas
  strays, global edits hitting unintended nodes. **Read values back** — setting != applied.
- `design-critique` — is it good? · `figma-design-audit` — is it right vs what we agreed?

## 5. Deliver — three surfaces on design.nexleaf.org
Load `prototype-review-then-publish`.

| Surface | URL | Updated by |
|---|---|---|
| Local review | `localhost:5173/#/<project>/<slug>` | `npm run dev` (hot reload) |
| Preview | `/prototype-hub-preview/` | **auto** (watcher + CI) |
| Team | `/prototype-hub/` | **approval only** — `npm run deploy` |

**Always give the localhost URL. Always ask before publishing.** Claude cannot deploy or push
(no gcloud/GitHub credentials) — hand over the command and confirm the "Verified live" line.
Record: Slack DM + Jira comment + `CHANGELOG.md` + commit `proto(<slug>): <what> — <why> [PD-XX]`.

## Standing rules from his corrections
1. **Emphasis blue** (`fill-emphasis` = `COLOR_PRIMARY #005bd3`) for primary buttons — bind the
   variable in Figma, never a hex. The library Button's black default is the outlier.
2. **Respect spacing** — check gaps against the canonical reference.
3. **Never drop his data** to fit a component limit — find another way, log the limit on PD-16.
4. **Search with short single-concept queries**, not one broad one.
5. **Comment, don't ticket**, for anything noticed mid-task.
6. **Encode every correction into the skills/docs in the same turn as the fix.**
7. Scope Figma edits to the intended node (verify text + ancestry, sanity-check the count).
8. `try/finally` around test clones; sweep `page.children` for strays after writes.
