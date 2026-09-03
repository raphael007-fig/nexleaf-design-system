---
name: "screen-states-and-interactions"
description: "Produce AND VERIFY the full state and interaction set for a screen or flow — enumerate every meaningful state (default, loading, empty, error, success, partial, permission, offline, edge, destructive), lay each out in rows in journey order, annotate every single one, and make them togglable in the prototype. Use when Raphael asks to \"design the states\", \"add all states\", \"cover the interactions\", \"annotate each screen\", asks whether a flow is complete, when a screen only has a happy path, or before any design handover. Carries the definition of done and the assertions that prove it."
---

# States & interactions — produce the full set, then prove it

`design-critique` **checks** state coverage; this skill **produces and verifies** it. A screen with
only a happy path is unfinished — engineering will invent the rest, and it'll be wrong.

## Why this skill grew assertions

The rules below were written and then **not enforced**. On 2026-08-27 the Add Equipment board
measured **34/132 annotated (26%)** while the automated sweep reported "0 issues", because the sweep
never counted notes. Raphael had to ask *"did we not create the rules that every flow should be in
rows and then must add annotations for all states?"*

> **A rule that nothing checks is a wish.** Every rule in this skill has a matching assertion in the
> §5 checklist. Report the numbers, not an opinion.

## Step 1 — Derive the state matrix (reason from the screen's job, don't guess)

For every screen in the flow, walk all twelve and decide **applies / doesn't apply, and why**:

| State | Ask |
|---|---|
| **Default / populated** | The normal case with realistic data (never lorem, never "Label") |
| **Loading** | First load *and* partial load. `Skeleton`/`SkeletonGroup` shaped like the real content |
| **Empty — first run** | Nothing exists yet. Say what this is and give the next action |
| **Empty — filtered** | Data exists but the filter excludes it. Different copy from first-run, offers a way back |
| **Error — recoverable** | Request failed. What happened and how to retry (`Banner tone="critical"`) |
| **Error — validation** | Per-field, inline, stated as what to do — not what's wrong |
| **Success / confirmation** | `Toast` transient · `Banner tone="success"` or a success card persistent |
| **Partial data** | Some fields missing (`—`), some readings absent — very common in cold-chain |
| **Permission / read-only** | Can view, cannot act. Actions disabled **with a reason**, never hidden silently |
| **Offline / stale** | Device offline or data older than expected. Say when it was last updated |
| **Edge / limits** | Long names, huge numbers, 1 row, hundreds of rows, zero, negative temps, at/over a cap |
| **Destructive confirm** | Anything irreversible gets a `Modal` with the consequence spelled out |

**Interaction states belong to the design system.** `Button`, `Cell`, `Text field` and nav rows all
ship rest/hover/active/focus/disabled/loading — **never redraw them per screen.** Draw an interaction
only when *screen-level* behaviour changes: a menu open, a row selected, a panel sliding in, a drag
in progress, a dropdown anchored to a field.

## Step 2 — Propose before drawing

A short table: **state · applies? · what the user sees · what they can do next.** Mark anything
uncertain as a question. **Get his nod before generating frames** — states are product decisions.

## Step 3 — Lay it out: rows, in journey order

Per the board contract in `FIGMA-MAP.md`:

```
content                  <- flow intro card, top of the section
§ Happy path             <- group heading
S1  S2  S3  S4  S5       <- screens in code order, 5 per row desktop / 8 mobile
  ↳ note · S1            <- annotation 16px under its screen, same x
§ Variants
§ Edge cases
```

- Groups run **happy path → variants → edges**. That ordering *is* the journey.
- Name frames `<Code> · <Screen> — <State>`; sort by **code**, never by canvas position.
- **Real library instances only** — check `DESIGN-SYSTEM-INVENTORY.md` before composing anything.
  Reuse the shared screen and change only what the state changes.
- Desktop and mobile twins for every state, or the set is incomplete.

## Step 4 — Annotate every state, tone-matched

**Every state frame carries a `note · <CODE>` frame. No exceptions, both viewports.**

- Sits directly beneath its screen: same `x`, `y + height + 16`. 440 wide desktop, 375 mobile.
- **Fill carries the tone of what it describes** — `ℹ` info `#EAF4FF` · `⚠` warning `#FFF1E3` ·
  `⛔` critical `#FEE9E8`. An error state never gets a blue note.
- Content says **what the screen is and the rule it carries** — the commit boundary, why a control is
  a dropdown and not free text, what recovery exists. Never a restatement of the title.
- Longer form where it earns it: `WHEN IT APPEARS:` · `PURPOSE:` · `WHAT IT DOES:`.

**Plus one section-wide note listing every matrix state deemed non-applicable, and why.** The
absence of a state must be a decision on the canvas, not an omission. This is the rule most often
skipped — Add Equipment had no partial-data state and no declaration of it for weeks.

## Step 5 — The definition of done, as assertions

Run these and **report every number**. "Looks complete" is not a result.

```js
// 1. annotation coverage + placement
const note = notes.find(c => c.name === 'note · ' + code);
if (!note) add('NO ANNOTATION');
else if (Math.abs(note.x - f.x) > 1 || Math.abs(note.y - (f.y + f.height + 16)) > 1)
  add('note misplaced');

// 2. matrix coverage — each of the 12 either DRAWN or DECLARED on canvas
// 3. viewport parity — every state has a desktop and a mobile frame
// 4. prototype parity — every state id in the registry has a frame, and vice versa
// 5. state distinctness — if two state frames render identically, one of them is wrong
```

Report as:

```
Frames 132 (66 + 66) · annotated 132/132 · notes placed 132/132
Matrix 11/12 drawn · 1/12 declared on canvas (partial data — N/A, creation flow)
Viewport parity: no gaps · Registry parity 33/33 · No identical siblings
```

## Step 6 — Make them real in the prototype

States must be **inspectable, not just illustrated**:

- Drive from the flow's own state; a dev-only switcher or `?state=empty-filtered` deep link.
- Use the DS's real mechanisms: `Skeleton`, `Banner` tones, `Text field` error, `Toast`, `Modal`,
  `Button` loading/disabled, `Pagination`.
- **Every state drawn in Figma must be reachable in the prototype.** That is the parity bar, and it
  is the step most often left undone — say so plainly when it is outstanding rather than implying the
  flow is finished.

## Step 7 — Record

Per state: CHANGELOG entry · commit `proto(<flow>): add <state> — <why> [PD-XX]` · Jira comment
listing states now covered **and those declared N/A with the reason** · then `design-critique` to
confirm the matrix. Always give him the localhost URL.

## Rules

- **Never ship a screen with only a happy path.** If time is short, name the deferred states on the ticket.
- **Empty ≠ error ≠ loading.** Three messages, three next actions.
- **Copy carries the state.** "No readings yet — record the first one" beats "No data".
- **A defect in one state frame is a defect in all its siblings** and in its desktop/mobile twin. Fix the set.
- **Does a frame already represent this state?** If yes, the task is a fix, not a build. Do not add a
  near-duplicate — that is how A20 came to duplicate A17 and had to be deleted.
- Don't invent a state the product can't produce — reason from the data and the flow.

