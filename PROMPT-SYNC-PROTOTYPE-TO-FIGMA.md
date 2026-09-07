# Prompt — the prototype changed, bring the Figma board up to date

Paste the block below into a Claude Code session started in `~/Documents/Design System`.
Fill the placeholders first.

**This is an incremental sync, not a build.** The board already exists, is annotated, and passes the
five numbers. The job is to move the delta across and nothing else.

| Situation | Prompt |
|---|---|
| No board yet — build one from the prototype | `PROMPT-PROTOTYPE-TO-FIGMA.md` |
| **Board exists, prototype changed** | **this file** |
| Board exists, prototype is behind | `PROMPT-FIGMA-TO-PROTOTYPE.md` |

## The rule that stops this going wrong

**Never rebuild a compliant board.** A board that already carries 132 annotated frames, correct
chrome and parity bindings represents days of review. Touch only what changed.

And when the prototype and a frame disagree, work out *which kind* of disagreement it is:

| The difference is… | Authority |
|---|---|
| A state exists / doesn't · copy · a rule or behaviour | **The prototype** — it moved, the board follows |
| Layout, geometry, chrome, spacing on a frame Raphael has hand-corrected | **His frame** — the prototype is what's wrong. Ask; don't overwrite his work |

That second row is the one that costs hours. A prototype refactor can quietly "fix" a layout he
corrected by hand three sessions ago.

---

```
The prototype has changed. Bring the Figma board up to date — incrementally.

  PROJECT      <e.g. Add Equipment>
  JIRA         <e.g. PD-23>
  FIGMA        <section node ids you own, e.g. the 12 Add Equipment sections>
  PROTOTYPE    <e.g. prototype-hub/src/projects/add-equipment>
  WHAT CHANGED <one line from me, or "work it out from git">

DO NOT REBUILD THE BOARD. It is annotated and compliant. Move the delta and nothing else.
Work in five stages and STOP for approval at the end of Stage 2.

────────────────────────────────────────────────────────────
STAGE 0 · LOAD AND ORIENT — no writes
────────────────────────────────────────────────────────────
Load: figma-use (MANDATORY before every use_figma call) · ds-components-only (binding) ·
prototype-figma-parity · figma-reference-registry · screen-states-and-interactions ·
figma-design-audit · coldtrace-product-context if a product judgement is involved.

Read DESIGN-LAYOUT-CONTRACT.md and DESIGN-SYSTEM-INVENTORY.md.

Establish what actually changed, from evidence:
  • git log / git diff on the prototype since the board was last synced. If the sync date
    is unknown, ask me rather than guessing a range.
  • The state registry now versus the ids bound on the board
    (getSharedPluginData('nexleaf.parity','stateId')).
  • The rendered copy and component props in the changed screens.

List the sections you own and their `owner` tags. You will touch no others.

────────────────────────────────────────────────────────────
STAGE 1 · THE DELTA — classify every difference, don't lump them
────────────────────────────────────────────────────────────
Report as a table. One row per difference, with its class:

  ADDED STATE        in the registry, no frame yet         → build desktop + mobile
  REMOVED STATE      frame exists, registry no longer has it → ASK before deleting; a
                     frame may be deliberately ahead of the code
  CHANGED COPY       verbatim old → new, per frame
  CHANGED BEHAVIOUR  a rule moved — the NOTE needs updating, not just the pixels
  CHANGED COMPONENT  a different DS component or variant is now used
  CHANGED LAYOUT     ⚠ check whether the affected frame is one I hand-corrected. If it
                     is, the PROTOTYPE is what's wrong. Flag it, don't overwrite.
  NO-OP              differs in the code but not in anything the board shows

For every row: which frame codes it hits, **desktop and mobile**, and whether the
`note · <CODE>` also needs rewriting.

The note is the part that gets missed. If a rule changed — a cap, a window, a control
type, a commit boundary — the annotation is now WRONG, and a wrong note is worse than a
missing one.

────────────────────────────────────────────────────────────
STAGE 2 · THE PLAN — stop here for approval
────────────────────────────────────────────────────────────
Give me:
  a) The delta table above, with a count per class.
  b) The exact frame list you will touch, desktop and mobile. Print it. If the list is
     longer than the delta warrants, you have a loose selector — narrow it.
  c) Which frames you will NOT touch and why.
  d) Any CHANGED LAYOUT row that collides with a frame I corrected by hand — as a
     question, not a plan.
  e) Anything the prototype now does that no DS component covers → DS addition + PD-16.

THEN STOP. Wait for approval.

────────────────────────────────────────────────────────────
STAGE 3 · APPLY THE DELTA
────────────────────────────────────────────────────────────
Per frame, in the affected set only:

  • Text through component properties, never .characters — assigning to a property-driven
    node silently no-ops. Keys carry a literal "↪️ " prefix; resolve by regex:
      const keyOf = (n, re) => Object.keys(n.componentProperties||{}).find(k => re.test(k));
  • Normalise before matching, or your regex silently matches nothing:
      const norm = s => String(s).replace(/[   ]/g,' ');
  • Component swaps: import the real instance by key from DESIGN-SYSTEM-INVENTORY.md.
    Tag for chips, NEVER Badge. Never restyle a lookalike.
  • Nodes whose id contains ';' are instance-nested: properties and layoutSizing yes;
    resize / remove / appendChild throw. Overlay a sibling and log the DS gap.
  • New frames: clone the nearest sibling, never a blank frame, then follow contract §6b
    in order — chrome and family before content, append before sizing, assert clones
    render, name structural nodes, refit in the stated order, RE-ASSERT card.y after the
    resize, bind parity.
  • Every new desktop state gets a 375 mobile twin per §4, or the set is incomplete.
  • Update the `note · <CODE>` wherever behaviour changed. Keep the tone-matched fill:
    ℹ #EAF4FF · ⚠ #FFF1E3 · ⛔ #FEE9E8. An error state never gets a blue note.
  • Update the section's `note · matrix` if a state moved between drawn and declared.

Then, and only if the frame set changed size or count:
  • Re-flow the affected sections per §5 — sort by SEMANTIC CODE, section width from the
    WIDEST row, notes 16px under their screen.
  • Operate on an explicit allow-list of your own sections. Skip anything owner-tagged.
    Iterate EVERY child type, not just frames. There is no undo.

If nothing changed size, don't re-flow. A gratuitous re-flow is a chance to break a
board that was already correct.

────────────────────────────────────────────────────────────
STAGE 4 · VERIFY — the five numbers plus a regression check
────────────────────────────────────────────────────────────
Report the five for the WHOLE board, not just the frames you touched — a sync is exactly
when a global regression sneaks in:

  1 annotation coverage   2 note placement   3 matrix coverage (drawn vs declared)
  4 viewport parity       5 registry parity

Plus the regression sweep:
  • nothing spilling outside its frame · no section overlaps
  • top bars clean of shadows · side nav 56 × full frame height
  • cards at family geometry — 1328 @80,72 · 752 @344,72 · 620 vertically centred
  • no placeholder strings · no hidden or opacity-0 strays · no hollow rows
  • breadcrumb still collapsing per §3
  • no leftover of anything you replaced

State distinctness: if two frames sharing a state id now render identically, ONE OF THEM
IS WRONG.

Then say plainly:
  • frames touched, of how many examined
  • what you did NOT check, and what remains unverified
  • whether a screenshot was actually inspected, or only geometry read back

────────────────────────────────────────────────────────────
STAGE 5 · RECORD
────────────────────────────────────────────────────────────
  • Jira comment on the project ticket: the delta by class, frames touched, notes
    rewritten, anything left open. If something was reverted, SAY SO — a comment
    describing work that no longer exists is worse than no comment.
  • Any new rule or trap → DESIGN-LAYOUT-CONTRACT.md (owning section) or FIGMA-MAP.md,
    in the same turn, with an assertion.
  • A new reference frame I've sent → add it to the registry at the end of FIGMA-MAP.md,
    same turn, with what it governs.

────────────────────────────────────────────────────────────
RULES THAT OVERRIDE CONVENIENCE
────────────────────────────────────────────────────────────
• NEVER REBUILD A COMPLIANT BOARD. Touch the delta only.
• AUTHORITY: the prototype decides which states exist, the copy, and the rules. MY
  HAND-CORRECTED FRAMES decide layout, geometry and chrome — if a prototype refactor
  disagrees with one, the prototype is wrong. Ask.
• Never say "done", "in sync" or "N/N pass" on the strength of your own checker. Report
  numbers and name what you did not check.
• The five failure modes, checked before acting:
   1 loose selector — print the target list and count before writing
   2 replaced without deleting — add AND remove in one pass, then assert
   3 asked instead of read — reference registry and settled decisions first
   4 claimed without reading the code
   5 built new instead of fixing the set — a defect in one frame is a defect in all its
     siblings and in its twin
• No DS component fits → propose the addition + PD-16. Never hand-roll.
• git push, npm run dev, npm run deploy are MINE. Publishing — ask first.

Start with Stage 0 and give me the delta table before planning anything.
```

---

## The two failure modes specific to a sync

**Over-reach.** The delta is four frames; the pass touches sixty. Every wide edit on this project
came from a selector that matched more than intended — a padding threshold that wiped a legitimate
gutter, a width range that dragged ten centred modals to the top. Printing the target list *before*
writing is the whole defence.

**Stale notes.** The screen gets updated and the annotation doesn't, so the board now confidently
documents a rule that no longer exists. Reviewers trust notes. A wrong note is worse than a missing
one — which is why Stage 1 forces every behaviour change to name the note it invalidates.
