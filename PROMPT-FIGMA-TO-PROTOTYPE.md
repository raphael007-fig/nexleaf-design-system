# Prompt — update the prototype to match the Figma board

Paste the block below into a Claude Code session started in `~/Documents/Design System`.
Fill the four `<...>` placeholders first.

This is the **Figma → prototype** direction: a board that has been designed and reviewed becomes
reachable, inspectable states in the prototype hub. It's the half of parity that gets left undone —
states get drawn, the flow reads as finished, and nothing is clickable.

For the reverse (prototype → Figma) use `PROMPT-PROTOTYPE-TO-FIGMA.md`.

## Which side wins when they disagree

This matters, and the two prompts answer it differently.

| Question | Authority |
|---|---|
| Layout, copy, which states exist, journey order | **Figma** — a frame Raphael has touched outranks any written spec |
| How a component behaves, tokens, prop names, variants | **The code** — it has been right every time |

So: take the *what* from the board, the *how* from `@ds`. If the board shows something the design
system can't do, that's a DS gap for PD-16 — not a licence to hand-roll it.

---

```
Update the prototype so every state on the Figma board is reachable.

  PROJECT      <e.g. Manual Temperature Recording>
  JIRA         <e.g. PD-33>
  FIGMA        <section node id, e.g. 9175:34937>
  HUB PROJECT  <e.g. prototype-hub/src/projects/manual-temperature-recording>

Work in five stages and STOP for my approval at the end of Stage 2. Do not write code
before I approve the delta.

────────────────────────────────────────────────────────────
STAGE 0 · LOAD AND ORIENT — no writes
────────────────────────────────────────────────────────────
Load: ds-components-only (BINDING for anything visible) · figma-use (MANDATORY before
every use_figma call) · prototype-figma-parity · screen-states-and-interactions ·
nexleaf-design-system · prototype-review-then-publish · coldtrace-product-context if a
product judgement is involved.

Read DESIGN-LAYOUT-CONTRACT.md and DESIGN-SYSTEM-INVENTORY.md.

Read, do not write:
  1. The Figma section. Every state frame, its code, its rendered copy, its component
     instances, and its `note · <CODE>` — the note carries the RULE the screen enforces,
     which is what the prototype has to implement, not just the pixels.
  2. The hub project as it stands: project.js, every prototypes/<slug>/meta.js, the
     shared screens/ directory, and the state registry.
  3. The DS components each frame uses. Get the real prop names from src/components,
     not from the frame's layer names.

────────────────────────────────────────────────────────────
STAGE 1 · THE PARITY DIFF — numbers, not prose
────────────────────────────────────────────────────────────
Report, as counts and lists:
  • Figma state frames (desktop / mobile)
  • Registry state ids
  • drawn but NOT reachable   ← the work
  • reachable but NOT drawn   ← surface as a QUESTION; the code may be ahead of the
                                design, which is not automatically an error
  • frames with no parity binding
  • states whose Figma note describes behaviour the prototype does not implement
    (a rule can be missing even when the screen exists)

Read the binding, don't infer it:
  frame.getSharedPluginData('nexleaf.parity','stateId')

────────────────────────────────────────────────────────────
STAGE 2 · THE PLAN — stop here for approval
────────────────────────────────────────────────────────────
  a) For each unreachable state: the registry id you'll add, the flow it belongs to,
     which shared screen renders it, and what changes versus its sibling state.
  b) Which existing screens/ components you'll EXTEND versus what genuinely needs a new
     one. Default to extending — a new component that duplicates an existing screen is
     the mistake, not the fix.
  c) The DS mechanism per state, by name:
       loading → Skeleton / SkeletonGroup      empty → the component's own emptyState
       error → Banner tone="critical"          validation → the field's error prop
       success → Toast or Banner tone="success"
       in progress → Btn loading               read-only → disabled + a reason
       paging → Pagination                     confirm → Modal
  d) Anything the board shows that no DS component covers → propose the DS addition and
     a PD-16 comment. Do NOT hand-roll it, do not restyle a lookalike.
  e) Whether any behaviour in a Figma note contradicts what the code currently does. If
     so, say which and ask — do not silently pick a side.

THEN STOP. Wait for approval.

────────────────────────────────────────────────────────────
STAGE 3 · IMPLEMENT
────────────────────────────────────────────────────────────
Compose from the design system. Never write UI from scratch.
  • Import from '@ds' — the barrel, or the deep path if that's the local convention.
    Check DESIGN-SYSTEM-INVENTORY.md first. Tag for chips, NEVER Badge. Cell for list
    rows. Pagination for paging.
  • Tokens only. No literal hex, no invented spacing. Polaris icons only.
  • Layout follows src/pages/ApplicationLayout: contentWidth="full", wrapper padding
    '0 16px 32px' — TOP PADDING 0 — 24px section rhythm, wrapped in AppShell.
  • CSS for layout only; never restyle a DS component from outside.

Extend the registry so parity can close:
  • Add each new state to STATE_SECTIONS with a stable id, a human label, and a render().
  • Keep section titles matching the Figma group headings — that's what makes the diff
    meaningful.
  • Every state must be deep-linkable: ?state=<id>. Verify the id resolves from a cold
    load, not just via the switcher.

Drive states from real props and real state, not a duplicate screen per state:
  • One screen component, state passed in. If you find yourself copying a screen to
    change one banner, stop — that's the A20 mistake in code form.
  • Loading uses Skeleton shaped like the real content, not a spinner over a blank box.
  • Empty ≠ error ≠ loading. Three messages, three next actions.
  • Copy comes VERBATIM from the Figma frame. Don't paraphrase reviewed copy.

Implement the RULE, not just the layout. If the note says a control is a dropdown and
never free text, or that nothing is written until Submit, or that a window closes after
3 days — the prototype should behave that way, or say plainly that it doesn't yet.

────────────────────────────────────────────────────────────
STAGE 4 · VERIFY WHAT YOU CAN, AND NAME WHAT YOU CANNOT
────────────────────────────────────────────────────────────
You cannot run the dev server or a browser. Do not imply you have.

Do:
  • Parse-check every file you touched.
  • Re-run the parity diff and report it: registry ids · Figma frames · bound · drawn but
    unreachable (should now be 0) · reachable but undrawn.
  • Confirm each new id resolves from ?state=<id> by reading the routing, not by trusting it.
  • Grep your own work for hand-rolled UI: literal hex, inline pixel values, a div doing
    a DS component's job.

Then report:
  • The five parity numbers.
  • The localhost deep link for EVERY new state, so I can click through them.
  • What is UNVERIFIED — every visual and interactive claim, explicitly. "Parse-clean and
    imports resolve" is not "renders correctly".
  • Anything you could not compose from the DS, with the proposed addition.

────────────────────────────────────────────────────────────
STAGE 5 · RECORD
────────────────────────────────────────────────────────────
  • CHANGELOG.md in the flow directory — what changed and why.
  • Commit: proto(<flow>): <what> — <why> [PD-XX]
  • Jira comment: states now reachable, states declared N/A with reasons, and any DS gap.
  • Give me the localhost URL first, always. Then ask before anything is published.

────────────────────────────────────────────────────────────
RULES THAT OVERRIDE CONVENIENCE
────────────────────────────────────────────────────────────
• AUTHORITY: Figma decides layout, copy and which states exist — a frame I have touched
  outranks any written spec. The CODE decides how a component behaves, its props and its
  tokens. Take the what from the board, the how from @ds.
• Never say "done", "works" or "N/N pass" on the strength of your own checker. Report
  numbers and name what you did not check.
• Check these five before acting, not after:
   1 loose selector — allow-list or exact match; print the target list and count first
   2 replaced without deleting — add the new AND remove the old, then assert
   3 asked instead of read — the reference registry and settled decisions come first
   4 claimed without reading the code
   5 built new instead of fixing the set — extend, don't duplicate
• If no DS component fits: propose a DS addition + a PD-16 comment. Never hand-roll,
  never restyle a lookalike.
• When I correct you, write it into DESIGN-LAYOUT-CONTRACT.md (the owning section) or the
  relevant skill IN THE SAME TURN, with an assertion. A rule that nothing checks is a wish.
• git push, npm run dev, npm run deploy are MINE. Give me the command. Publishing to
  design.nexleaf.org — ask first.

Start with Stage 0 and report the parity diff before planning.
```

---

## Why this direction is the one that slips

Drawing states is visible progress; wiring them is not. On this project the temperature-monitoring
board reached 18 annotated states with **none** reachable in the prototype, and the flow still read
as finished in every status update.

The parity bar is one sentence: **every state drawn in Figma is reachable in the prototype.** If it
isn't, the flow is not done — say so rather than reporting the Figma numbers alone.
