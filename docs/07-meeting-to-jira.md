# 7. Collection → Change → Jira Flow

This is the heartbeat of the workflow: how anything — a meeting, a Slack thread, a PRD —
becomes tracked, implemented work.

## Collection (inputs)

| Input | How it arrives |
|---|---|
| **Meeting / verbal** | You tell Claude what was decided |
| **Google Meet transcript** | Share the transcript doc |
| **Slack** | Paste or point to the messages |
| **PRD** | Shared with you (Google Doc / Word) — pass it to Claude — or you write one with your PRD skill |

## Flow A — starting a project (PRD → tickets)

When a PRD arrives (or you write one):

```
1. INGEST     PRD lands in the project folder as PRD.md (source linked in project.js)
2. PROJECT    hub project scaffolded + Jira epic created (one project = one epic)
3. DECOMPOSE  Claude splits the PRD into tickets under the epic:
                • design tickets      (label discipline:design)
                • engineering tickets (label discipline:engineering)
4. BUILD      design work starts — Figma-first or prototype-first (see below)
```

Engineering tickets born from the same PRD as the design work = **seamless handover**.

## Flow B — a change to existing work

```
1. INPUT      transcript / Slack / verbal / PRD revision
2. EXTRACT    Claude parses it into discrete changes (each: what + why)
3. RECORD     • new scope        → new ticket under the project epic
              • revision to in-progress work → COMMENT on the existing ticket
4. CHANGE     made in the prototype and/or Figma
5. LOG        commit with [PD-XX]; CHANGELOG updated; Figma annotated (annotation skill)
6. CLOSE      ticket gets Figma + commit links → Done
```

**Comments, not ticket-spam:** small revisions go as comments on the existing ticket — the
ticket's comment thread *is* the change history. Only genuinely new scope gets a new ticket.

## Flow C — corrections (quick updates to a design)

For small fixes — spacing, copy, a wrong tone, a misplaced element — just say the correction.
No process on your side; Claude does the bookkeeping:

```
1. FIX        made directly in the prototype and/or Figma
2. LOG        CHANGELOG entry (source: correction) + commit [PD-XX]
3. JIRA       ticket open?  → comment on it ("Correction: …")
              ticket Done?  → small fix ticket linking the original (never reopen)
              no ticket?    → comment on the prototype's build ticket
4. ANNOTATE   design-side corrections get a Figma annotation
```

Several corrections in one session **batch** into a single comment + commit checkpoint.

## Both creation directions

Work starts wherever the mood takes you — the system supports both:

- **Figma-first:** design in Figma → translate to a prototype via [`../FIGMA-MAP.md`](../FIGMA-MAP.md).
- **Prototype-first:** build the prototype from Poltail components → push it *into* Figma (the Figma MCP generates designs from code) → annotate there.

Either way the endpoint is the same: annotated Figma + live prototype + tickets under the epic.

**Mirror rule:** whichever side you start from, the other side catches up — and Claude runs a
**parity audit** on every touch: comparing the Figma section against the prototype (screens
*and* states), flagging gaps ("Figma is missing the error state the prototype has"), and
adding the missing frames/states — versioned and annotated — rather than letting them drift.

## Example

> **Meeting note:** "On the equipment detail page, the temperature alert should be more
> prominent — make it a critical banner at the top, and add an 'Escalate' button."

- This revises an in-progress screen → **comment** on its ticket: *what:* promote alert to critical banner + Escalate action; *why:* alerts were being missed; *source:* meeting 2026-07-31.
- **Change:** swap the inline notice for `<Banner tone="critical">`, add `<Btn tone="critical">Escalate</Btn>`.
- **Log:** commit `proto(equipment-detail): promote temp alert to critical banner — alerts were missed [PD-42]` + CHANGELOG entry.

## Doing it with Claude

Paste the input (PRD, transcript, Slack thread — or just describe it) and say what you want:
*"start a project from this PRD"* or *"turn this into tickets/comments."* Claude drafts for
your approval, files everything, makes the changes, and records the history.
