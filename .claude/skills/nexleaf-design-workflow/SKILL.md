---
name: "nexleaf-design-workflow"
description: "The end-to-end design workflow for Raphael at Nexleaf — collect (meeting/Slack/PRD/correction) → track in Jira → create in Figma and the prototype hub → verify → deliver on design.nexleaf.org. Use this as the entry point whenever he says \"run the workflow\", starts a new design project, hands over a PRD or meeting notes, asks what the process is, or when work spans more than one stage. Also load it before any multi-frame or multi-screen build, because it carries the pre-flight and the definition of done. Delegates to ds-components-only, prototype-review-then-publish, figma-design-audit, design-critique, nexleaf-design-system, and the PRD skills."
---

# Nexleaf design workflow — the whole loop

Entry point for Raphael's design system → prototype → Jira workflow. **One source of truth per
layer, deterministic bridges between them, and nothing changes silently.**

Repo: `~/Documents/Design System` (auto-loads `PoltailDesign.md` + `FIGMA-MAP.md` via
`CLAUDE.md`). Operating manual: `docs/`. Diagram: `docs/workflow-diagram.svg`.

```
COLLECT → TRACK (Jira PD) → CREATE (Figma ⇄ Prototype, on Poltail) → VERIFY → DELIVER
```

---

## 0. Pre-flight — do this BEFORE touching anything

Every long correction cycle with Raphael has started with one of these five being skipped. Cost so
far: hours of his time, twice a full rebuild. **Run all five, every time.**

**1. Load the skills that already exist.** He has asked *"are you using or running the skills?"* —
that question means work started without them. `ds-components-only` is binding for any UI;
`figma-use` is mandatory before every `use_figma`; `coldtrace-product-context` before any ColdTrace
judgement; `screen-states-and-interactions` before drawing a state set.

**2. Find his real source and build FROM it.** Never reconstruct a screen from a spec's field list
when the real design exists. Twenty-four frames were once built from field labels and thrown away —
*"this is nonsense… you wasted my time."* Before building: search the Figma file for the existing
screen, read the prototype source, open the Design Rep page. Clone the real thing.

**3. Establish what a shared artefact IS before acting on it.** A prototype screenshot and a Figma
frame look identical. He may be sending a **reference for what something should look like**, not a
bug report — reading it backwards once caused a needless design-system change and a revert. If it
is ambiguous, ask: *"is this the target, or the defect?"* One question beats an hour.

**4. Read the whole instruction, including the parts that sound like scope.** *"All states"*,
*"every screen"*, *"and update Jira"* are requirements, not garnish. Half-delivery reads as
carelessness — *"please stop giving me half work."*

**5. Say what you're about to do when the task is large or ambiguous.** For anything spanning many
frames, state the plan and the interpretation in one or two lines first. He will correct a plan in
seconds and a finished board in hours.

**6. THE RECORD ALREADY ANSWERS MOST QUESTIONS. Search it before inventing a field or raising an
"open question."** Sep 9 2026, building Create Lab: four questions were raised for Ednah. **All four
were already answered** — three in the PRD and `coldtrace-product-context`, the fourth in the
meeting transcript being quoted for the other three. He had to ask *"are Ednah's questions not
answered in the PRD?"* and then *"are you sure we don't have this answer?"* twice.

The four sources, in this order, before designing anything new:
- the project's `PRD.md` — scope, ratified decisions, and the **out-of-scope list** (it answers
  "should I rename this?" — terminology neutralisation was out of scope, so no)
- `coldtrace-product-context` — the data model and hierarchy (it answered "is a lab inside a
  hospital?" → *labs = facilities*, so the invented Host facility field was wrong) and the platform
  taxonomies (`Occupation` has no "Lab Technologist", so that invented label was wrong)
- `docs/coldtrace-domain.md` — the live product documented field by field, including whole forms
- the meeting transcript, **read for the blanket rule as well as the exceptions**. *"Everything is
  the same where there's a facility put a slash lab"* + one carve-out means every unnamed field is
  decided. Do not apply a blanket rule to three sections and then call a field in the fourth "open".

**A product observation is not an open question.** "A reference lab has no vaccinating catchment" is
a fair thought; it does not outrank a decision she already made. Raise it as a comment, build what
was decided.

---

## 1. Collect

Inputs: **meeting / verbal · Google Meet transcript · Slack thread · PRD** (sent to him or
written with `prd-writer` / `one-page-prd-generator`) · **a correction** ("fix X").

- New project → he provides the **Figma link once, at project start**; record it in the hub
  project's `project.js` (`figma`, `prd`, `jiraEpic`). No link = no parity audits.
- Pressure-test the idea/PRD with **`product-os`** before building, when stakes justify it.
- **A spec is not above him.** When his instruction contradicts a written spec, he wins and the
  spec gets marked superseded in `FIGMA-MAP.md` — that's how the breadcrumb trail and the mobile
  stepper were settled.

## 2. Track — Jira (Product Board `PD`)

- **One epic per project.** `PD-30` = Design Ops (system/workflow). **`PD-16` = the running log
  for design-system component work.**
- **Move the ticket to `In Progress` when work starts**, not when it ends.
- **New scope = ticket. Observation, revision, or correction = comment.** Investigate first —
  search the Figma file *and* the repo before claiming anything is missing or filing anything.
- Labels: `design-workflow` · `discipline:design|engineering` · `surface:figma|prototype|both` ·
  `source:meeting|transcript|slack|verbal|prd`.
- A PRD decomposes into **design tickets and engineering tickets** under the project epic.
- **If a change is later reverted, say so on the ticket.** A comment describing work that no longer
  exists is worse than no comment.

## 3. Create — either direction, never silently

Load **`ds-components-only`** (binding) and **`nexleaf-design-system`** for composition.

- **Never build UI from scratch.** Code composes Poltail (`@ds`); Figma places **real library
  instances**. A styled lookalike is a failure.
- **Layout:** code follows `src/pages/ApplicationLayout` (`contentWidth="full"`, wrapper
  `padding: '0 16px 32px'` — **top padding 0** — 24px section rhythm, wrapped in `AppShell`).
  Figma desktop follows **Design Rep**; Figma mobile follows **Mobile And Ipad Screen Layout**
  (375 wide, content x=16/343, cloned status bar + Mobile Top Nav, bottom sheets for modals).
- **Mirror handshake:** prototype changed → **ask before writing to Figma**. Figma changed → he
  says **"go check it"**. Every correction is a divergence until it exists on both sides.
- **Missing component?** Don't hand-roll, don't open a ticket — build it in the DS Figma file
  (`y4XdS2kaiS8eMHY3z8wORP`) or extend the code component, then **comment on PD-16**.
- Figma canvas discipline: own section, **versioned frames** (never overwrite), rows read
  left→right as a journey, **all states**, annotated in his house style — and annotation fill
  carries the tone of what it describes (info blue / warning yellow / critical red).

### Work the whole set, not the first item

A state frame is a duplicate of its siblings, so **a defect in one is a defect in all of them.**
Fix the set, read every member back, then verify. The same applies to desktop↔mobile twins: a
change to one needs the same change to the other, or they drift.

## 4. Verify — before he ever sees it

**A geometry check is not an audit.** Mine passed repeatedly on screens that were visibly broken:
hidden strays, stacked toasts, floating dropdowns, clipped cards, and five fields reading the
literal placeholder `"Error message"`. Boxes were the right size; the content was wrong.

Audit in this order:

1. **Content and state** — read the rendered copy and component properties of *every* frame and
   compare to the spec. Placeholders (`Title`, `Label`, `Content`, `Option 1`, **`Error message`**),
   copy that contradicts what's shown ("1 record matches" over two results), inconsistent sample
   data across a flow.
2. **State distinctness** — *if two state frames render identically, one of them is wrong.* Four
   search-result states were pixel-identical for weeks and every automated pass approved them.
3. **Hidden strays** — walk effective visibility; treat hidden children of a form container as a
   failure and **delete** them. One sweep removed 127, a later one 84 more.
4. **Geometry** — overflow, overlap, sizing consistency. Last, not first.
5. **`design-critique`** (is it good?) and **`figma-design-audit`** (is it what we agreed?).

**Evidence rules.** A returned success value is not proof — read the value back. A screenshot is
not proof either: `get_screenshot` caches per node and only renders the app's active tab, so a
stale image will happily show you the previous state. Confirm writes by reading geometry and
properties, and force a fresh render from a different (parent) node.

**Never report "done" or "N/N pass" on the strength of a checker you wrote.** Say what you verified
and how, and name what you did *not* check. He has had to ask *"are you sure?"* and *"have u
audited properly"* — both times the honest answer was no.

## 5. Deliver — three surfaces, all on design.nexleaf.org

Load **`prototype-review-then-publish`**.

| Surface | URL | Updated by |
|---|---|---|
| Local review | `localhost:5173/#/<project>/<slug>` | `npm run dev` — hot reload |
| Preview | `/prototype-hub-preview/` | **auto** (watcher + CI) |
| Team | `/prototype-hub/` | **approval only** — `npm run deploy` |

- **Always give him the localhost URL.** Every time.
- **Ask before publishing** to the team URL. Claude can't deploy or push — no gcloud/GitHub
  credentials in the sandbox — so hand him the command.
- The sandbox also **cannot run his macOS-installed native build binaries**, so a code change he
  hasn't run is *unverified* — say so rather than implying it works.
- **Record:** Slack DM + Jira comment + prototype `CHANGELOG.md` + commit
  `proto(<slug>): <what> — <why> [PD-XX]` (or `ds(<Component>): …`).

## Standing rules learned from his corrections

1. **Emphasis blue** (`Color/bg/fill/fill-emphasis` = `COLOR_PRIMARY #005bd3`) for primary buttons —
   bind the variable, never a hex. The library Button's dark default is the outlier; the code is
   right. When Figma and code disagree on a token, **resolve the code token before deciding which
   side is wrong.**
2. **Respect spacing.** Check gaps against the canonical reference before finishing.
3. **Never drop his data** to fit a component limitation — find another way and log it on PD-16.
4. **Search properly** — several short single-concept queries, and search both the code and Figma
   vocabularies (`OptionCard` → *Choice list*, `TextInput` → *Text field*).
5. **Comment, don't ticket**, for anything noticed mid-task.
6. **Encode every correction into the skills/docs in the same turn** as the fix — and if a rule
   written down later proves wrong, **retract it explicitly** rather than quietly editing.
7. Scope Figma edits to the intended node — verify text + ancestry and sanity-check the count.
8. Clean up test nodes with `try/finally`; sweep for strays after writes.
9. **Check the node type before assuming a limitation.** Only nodes whose id contains `;` are
   instance-nested. He had to show me by hand that a modal's `.slot examples` frame accepts real
   component instances — I had floated a button over the modal instead.
10. **Don't swallow errors in a bulk pass.** `catch (e) {}` is how half a pass appears to succeed.
11. **Never invent an enum, a field or a label.** Every option list, field name and helper string
    must come from the live product, the domain doc, or a transcript. Sep 9 2026: six option lists
    on Create Lab were invented and every one was wrong — `Status` is ownership
    (`Public`/`NGO`/`Private`), not an operational state, and `Supply Levels` are the platform's
    `PR`/`SN1`/`SN2`/`LD`/`SP` codes. He had to send screenshots of the real dropdowns. If a value
    cannot be traced to a source, it is a guess — say so, or go and read the form.
12. **Rule 1 is not a discovery.** The library Button's `Variant=primary` being dark `#303030` is
    *already recorded* here, with the fix: bind `Color/bg/fill/fill-emphasis`. Sep 9 2026 it was
    re-derived from scratch, reported as a new "DS gap", and then patched with a **raw hex** — the
    exact thing rule 1 forbids. Before writing up a DS gap, check whether this file already names
    it and already says what to do.

