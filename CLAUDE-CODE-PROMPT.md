# Using this workflow in Claude Code

## Why it works

Claude Code reads `CLAUDE.md` from the directory you launch it in, and loads skills from
`.claude/skills/`. Both now live in this repo, so a Claude Code session started here inherits the
same context and the same rules as the Cowork session.

Auto-loaded on every session (via `CLAUDE.md`):

| File | What it carries |
|---|---|
| `PoltailDesign.md` | the design system's own principles |
| `DESIGN-LAYOUT-CONTRACT.md` | **binding** — screen geometry, chrome, breadcrumb, mobile shell, board layout, annotation, definition of done |
| `FIGMA-MAP.md` | the five failure modes, canonical reference frames, settled decisions, every Figma API trap |
| `DESIGN-SYSTEM-INVENTORY.md` | all 82 components with keys and properties |
| `docs/coldtrace-domain.md` | how the product actually behaves, incl. the 7-day / 3-day windows |

Plus 15 skills in `.claude/skills/`.

## One-time setup

```bash
cd ~/Documents/Design\ System
claude
```

Claude Code needs two MCP servers that Cowork had built in. Without them the Figma and Jira
steps of the workflow can't run:

- **Figma** — for `use_figma`, `get_screenshot`, `search_design_system`
- **Atlassian** — for the Jira comments on PD-16 / PD-23 / PD-30

Add them with `claude mcp add`, or in `~/.claude.json`. Everything else — the docs, the skills, the
git repo — is already in place.

Two things that do **not** carry over:
- `product-os/references/*.md` couldn't be copied (permissions); the main `SKILL.md` is there.
- The prototype at `~/Documents/3rd Party Equipment flow` is **not a git repo** and is outside this
  one. Its current code now also lives at
  `prototype-hub/src/projects/add-equipment/screens/`.

---

## The prompt

Paste this at the start of a Claude Code session in this directory.

```
You are working in my Nexleaf design system repo. Read CLAUDE.md first — it auto-loads
DESIGN-LAYOUT-CONTRACT.md, FIGMA-MAP.md, DESIGN-SYSTEM-INVENTORY.md and
docs/coldtrace-domain.md. Treat all four as binding, and use the skills in .claude/skills/.

CONTEXT
- Figma file: YzbXqlrKTcGbWxwzGkLTct (design) and y4XdS2kaiS8eMHY3z8wORP (DS library v2.1).
- Jira: Product Board PD. PD-23 Add Equipment · PD-33 Manual Temp Recording ·
  PD-16 design-system component work · PD-30 design ops.
- Prototype hub: prototype-hub/ — projects are add-equipment, manual-temperature-recording,
  sandbox. Flows live at projects/<project>/prototypes/<slug>/{meta.js,index.jsx}.

BEFORE YOU TOUCH ANYTHING
1. Load the skills that apply. ds-components-only is binding for any UI. figma-use is
   mandatory before every use_figma call. figma-reference-registry before you ask me any
   layout question. coldtrace-product-context before any product judgement.
2. Check the canonical reference frames and the settled-decisions table at the end of
   FIGMA-MAP.md. If a reference frame answers the question, follow it and tell me which one.
   A frame I have touched outranks any written spec. Do not re-ask what is already settled.
3. Check DESIGN-SYSTEM-INVENTORY.md before claiming a component is missing or composing
   anything by hand. Tag for chips, never Badge. Cell for list rows.
4. When Figma and the code disagree, read the code first. It has been right every time.
5. For anything spanning more than a few frames, state the plan in two lines before you start.
   I will correct a plan in seconds and a finished board in hours.

THE FIVE FAILURE MODES — check these before acting, not after
1. Loose selector — build an explicit allow-list or match an exact value. Never a range,
   never "all of type X". Print the target list and count before writing.
2. Replaced without deleting — adding the new thing and removing the old one are one
   operation. Then assert the old one is gone.
3. Asked instead of read — see rule 2 above.
4. Claimed without reading the code.
5. Built new instead of fixing the set — a defect in one state frame is a defect in all its
   siblings and in its desktop/mobile twin.

HOW TO REPORT
Never say "done", "looks right" or "N/N pass" on the strength of your own checker. Report
numbers, and name what you did NOT check. A returned success value is not proof — read it back.
For a flow, report the five: annotation coverage · note placement · matrix coverage
(drawn vs declared) · viewport parity · registry parity.

WHAT I RUN, NOT YOU
- git push, npm run dev, npm run deploy. Give me the command; don't try to work around
  missing credentials.
- Publishing the DS library, and publishing to design.nexleaf.org — ask first.

WHEN I CORRECT YOU
Write the correction into FIGMA-MAP.md or the relevant skill in the SAME turn, and add an
assertion that catches it next time. A rule that nothing checks is a wish. If a rule you wrote
down later proves wrong, retract it explicitly rather than quietly editing.

Start by telling me what you've loaded and what you understand the current state to be.
```

## Shorter version, for a specific task

```
Read CLAUDE.md. Load nexleaf-design-workflow and the skills it delegates to.

Task: <what you want>
Figma: <node link, if any>
Jira: <PD-xx>

Follow DESIGN-LAYOUT-CONTRACT.md exactly. Check the reference registry before asking me
anything. Report the five numbers when you're done, and tell me what you didn't check.
```

## Session ownership — who does what

| Surface | Owns |
|---|---|
| **Claude Code**, this repo | **Add Equipment (PD-23)** — the flow, the board, the hub project |
| **Cowork**, folder connected | **Temperature monitoring (PD-33/34/35/36/38)** |
| **claude.ai chat** | no filesystem — emits transportable amendments only (contract §0) |

Two sessions in one repo: `git pull --rebase` before editing shared files, and never bulk-operate
on a Figma section you don't own (contract §5).

## What is genuinely outstanding

So a new session doesn't rediscover these.

**Blocking, and the first thing to do**
- **The hub build has never been run.** Add Equipment's 6 flows are parse-clean and imports-resolve,
  not render-proven. `cd prototype-hub && npm run dev`. If it throws, the likely culprit is
  `screens/AddEquipmentFlow.jsx` — 2,168 lines lifted from a standalone app whose Vite config
  aliased `@ds` to an absolute path.

**Waiting on Raphael**
- **The DS library is unpublished.** `Cell`, `QR code`, the Breadcrumb 4/5 slots, the Button
  loading-label fix and the Text field `Tags` property reach nothing until he publishes it.
- **Ednah's call on the amendment windows** — four questions, with a recommendation, on PD-38.

**Settled 2026-08-27 — do not re-open**
- Soft tints: the code is right and already tiered; the library is missing the soft-surface tier.
  **PD-42** adds it, **PD-43** is the opaque `fill-transparent-secondary` bug. `Cell`'s tints stay raw
  until PD-42 lands.
- Annotation format: per-state notes use the tone-glyph short form; the structured `WHEN IT APPEARS`
  block is for the section intro card only. The temperature-monitoring board's 18 per-state notes
  need condensing.

**Known gaps**
- `DESIGN-SYSTEM-INVENTORY.md` doesn't yet list `Toast actions` / `Banner inlineActions`, added in
  commit `46c2f25`.
- **Prototype parity** — the temperature-monitoring states are drawn in Figma but not reachable in
  the hub prototype.
- **`~/Documents/3rd Party Equipment flow` is not a git repo.** Its code now also lives at
  `prototype-hub/src/projects/add-equipment/screens/`; that copy is tracked.
- `product-os/references/*.md` couldn't be copied into the repo (permissions); the main `SKILL.md` is
  there.
