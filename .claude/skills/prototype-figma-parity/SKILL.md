---
name: "prototype-figma-parity"
description: "Keep Raphael's prototype and its Figma frames airtight and in sync, using the prototype's own state registry as the contract. Run this whenever prototype states are added, renamed or removed; whenever Figma frames are created or reorganised; before any handover, audit or review; and whenever he asks \"are they in sync\", \"is anything missing\", \"check parity\", or says the prototype and Figma have diverged. Also run it after any multi-frame Figma build to prove nothing was silently dropped, and before ANY bulk reposition/resize/reflow on a shared Figma page."
---

# Prototype ⇄ Figma parity — the registry is the contract

Hand-copying a React prototype into Figma frames is never airtight. Something is always silently
missing, and the miss is only found when Raphael scrolls the board. This skill removes the judgement:
**the prototype's state registry is the contract, and every frame is bound to a state id.**

Nothing here is a matter of opinion. Either the diff returns empty or it names what's wrong.

## The contract

The prototype exports its states — e.g. `~/Documents/3rd Party Equipment flow/src/statesC.jsx`:

```js
export const STATE_SECTIONS = [ { title, states: [ { id, label, … } ] } ];
export const STATES = STATE_SECTIONS.flatMap(s => s.states);
```

Each `id` is a real deep link: `localhost:5180/add-equipment-flow/?proto=c&state=<id>`.
**That id set is the source of truth for what states exist.** Figma answers to it, not the reverse.

## The binding

Every Figma frame carries its state id in **shared plugin data** — invisible, and it survives renames
(a naming convention does not):

```js
const NS = 'nexleaf.parity';
frame.setSharedPluginData(NS, 'stateId',   'rtmd-details');
frame.setSharedPluginData(NS, 'frameCode', 'A2');
frame.setSharedPluginData(NS, 'viewport',  'desktop');   // or 'mobile'
```

`figma.setPluginData` is **not available** in this host runtime — it throws. Always use
`setSharedPluginData` / `getSharedPluginData` with a stable namespace.

A state may legitimately own **several** frames (sub-states: idle / open dropdown / selected /
error). That's expected — the diff reports it, it isn't a failure. What *is* a failure is a state
with **zero** frames, or a frame bound to nothing.

## Running the diff

1. **Read the registry** from the prototype source — parse the `id:` values out of `states*.jsx`
   (`node -e` with a regex is enough; don't hand-transcribe them).
2. **Walk the Figma sections** and read each frame's `stateId`.
3. **Report five things, always:**

| Check | Meaning | Action |
|---|---|---|
| `statesWithNoFrame` | a prototype state nobody drew | build it, or agree it's out of scope and say so |
| `unbound` | a frame with no state id | bind it, or delete it — an orphan frame is drift |
| `desktopOnly` / `mobileOnly` | a state that exists on one viewport only | build the twin |
| `statesWithMultipleFrames` | sub-states — informational | confirm each is genuinely distinct |
| identical siblings | two frames that render the same | **one of them is wrong** — see below |

4. **Fix only the deltas.** Don't rebuild what's already in sync.

## State frames must be distinguishable

The most expensive failure this catches. Four search-result frames once rendered identically —
same panels, same helper line, no selection affordance — differing only in whether one button was
greyed. Every geometry check approved them for weeks.

For each group of frames sharing a `stateId`, compare their **rendered copy and component
properties**. If two differ only by a button's `State`, the design is missing the affordance that
makes them different states at all.

## Bulk operations must be scoped to an allow-list

Any loop that repositions, resizes, reflows or re-pads is **destructive to anything it touches that
you didn't build**. A reflow written as "every `SECTION` on the page" once swept Raphael's own
scratch section (`Update`) into the board grid — 16 frames moved, and its 3 loose `INSTANCE`
children were left behind because the loop only iterated `type === 'FRAME'`. There is no Plugin API
undo; only Figma version history recovers it, and only by hand.

Before any bulk write:

1. **Build the target list explicitly** — the project's sections by name or id. Never `all sections`.
2. **Skip anything marked as his**:
   ```js
   if (sec.getSharedPluginData('nexleaf.parity', 'owner')) continue;   // 'raf-scratch-do-not-reflow'
   ```
   Tag foreign sections the first time you meet one, and park them clear of the board.
3. **Iterate every child type**, not just frames, or you tear groups apart.
4. **Report the target list back** before the write when the operation is wide.

If you have already damaged one of his sections: say so immediately and unprompted, name exactly
what moved, and give him the version-history route (File → version history → the version before the
run → copy that section → paste). Do not quietly re-tidy and hope he doesn't notice.

## Re-assert geometry *after* every resize

Mobile columns cloned from desktop inherited `constraints = CENTER/CENTER`, so every
`frame.resize()` moved them to stay centred. The drift compounded across passes and looked like a
new bug each time. Pin first, resize, then set the offset again:

```js
col.constraints = { horizontal: 'MIN', vertical: 'MIN' };        // page body
chrome.constraints = { horizontal: 'STRETCH', vertical: 'MIN' }; // status bar + top nav
col.y = offset;
f.resize(375, target);
col.y = offset;            // re-assert — resize may have moved it
```

**Any defect you have "fixed" more than twice is not a defect, it is a mechanism.** Stop patching
positions and go find what is moving them.

## Derive conventions from the majority before "fixing" anything

When values disagree across a set, count them. 48 frames at one offset and 7 scattered means the 48
are the convention and the 7 are drift — not that you should pick a new number. Likewise, classify
screens by **content**, not by name prefix: asserting secondary/tertiary from frame codes
(`E*`, `X*`, `S*`) produced 20 false positives, where testing for an actual wizard stepper produced 2
true ones.

## Verify by assertion when you cannot see the pixels

`get_screenshot` URLs are not reachable from the sandbox, and the screenshot service caches per node
id and only renders the desktop app's active tab. So verification is measured, not eyeballed:
assert the thing you claim. For an element placed inside another, return `insideBox`, `vCentred`,
and the gap to its neighbour — and read the resulting text back through the NBSP normaliser
(`s => String(s).replace(/[   ]/g, ' ')`).

A sweep that reports zero issues is only worth anything if it also reports **how many frames it
actually examined**. Scope it to real state frames (`/^[A-Z]+\d+ ·/`) or helper nodes named `note`
and `content` will bury the signal — the first run of one sweep produced 130 "issues" of which 128
were noise.

## Figma Plugin API traps worth re-reading

- A plugin run that throws **rolls back the entire run** — earlier successful edits in the same call
  are discarded. Re-read state after a failure instead of assuming a partial apply.
- Exposed nested component property keys carry a literal `↪️ ` prefix in the string. Never hardcode
  them; resolve by regex: `Object.keys(n.componentProperties).find(k => /Placeholder content/.test(k))`.
- Multi-run text makes `node.fontName` return `figma.mixed`, and `loadFontAsync(figma.mixed)` throws
  *"Cannot unwrap symbol"*. Inspect with `getStyledTextSegments(['fontName'])`, load each face, set
  `characters`, then restore the runs with `setRangeFontName`.
- Nodes whose id contains `;` are instance-nested: you can set properties and `layoutSizing`, but
  `resize`, `remove` and `appendChild` all fail. To place content "inside" a component that has no
  slot, overlay a sibling frame positioned over it — and log the missing variant as a DS gap.
- `layoutSizingHorizontal = 'FILL'` only works once the node is already a child of an auto-layout
  frame. Append first, then set it.

## What parity does NOT mean

- **Not pixel identity.** The prototype is 1440-fluid; Figma frames are fixed. Compare *content and
  state*, not coordinates.
- **Not one-way generation.** Raphael edits the Figma canvas directly and expects those edits to
  survive. This skill reconciles; it never overwrites his work wholesale.
- **Not a substitute for reading the screens.** It proves nothing is *absent*. It cannot prove what
  is present is *right* — that's `figma-design-audit` and `design-critique`.

## Report format

Give him the numbers and the links, never a bare "in sync":

```
Registry: 33 states · Figma: 134 frames (67 desktop + 67 mobile) · bound 134 / unbound 0
Missing frames (5): full-serial-search · full-qr-scan · full-equipment-management ·
                    device-rtmd · no-device
Viewport gaps: none
Deep link for any state: localhost:5180/add-equipment-flow/?proto=c&state=<id>
Figma: <section links>
```

Then say plainly which gaps you fixed and which need his decision.

## When the registry itself is wrong

If Figma has a state the prototype lacks, that is not automatically a Figma error — the design may
be ahead of the code. Surface it as a **question**, not a deletion: *"the board has X, the registry
doesn't — should the prototype gain the state, or should the frame go?"*

## Related

`nexleaf-design-workflow` (entry point — run parity in its Verify stage) · `ds-components-only`
(how frames must be built) · `figma-design-audit` (is it what we agreed) ·
`prototype-review-then-publish` (the mirror handshake: ask before writing to Figma).

