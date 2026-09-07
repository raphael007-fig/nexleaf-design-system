# Prompt — implement a prototype properly in Figma

Paste the block below into a Claude Code session started in `~/Documents/Design System`.
Fill the four `<...>` placeholders first. Everything else is fixed.

This is the **prototype → Figma** direction: a working React prototype with a state registry becomes
a complete, contract-compliant Figma board. For the reverse (Figma → code) use `figma-implement-design`.

---

```
Implement a prototype in Figma, to the letter of DESIGN-LAYOUT-CONTRACT.md.

  PROJECT      <e.g. Add Equipment>
  JIRA         <e.g. PD-23>
  PROTOTYPE    <e.g. prototype-hub/src/projects/add-equipment>
  FIGMA PAGE   <page name or node id where the section goes>

Work in six stages and STOP for my approval at the end of Stage 1. Do not draw anything
before I approve the plan — I will correct a plan in seconds and a finished board in hours.

────────────────────────────────────────────────────────────
STAGE 0 · LOAD AND ORIENT — no writes
────────────────────────────────────────────────────────────
Load, in this order:
  • figma-use                       MANDATORY before every use_figma call, no exceptions
  • ds-components-only              binding for anything visible
  • figma-reference-registry        before you ask me any layout question
  • prototype-figma-parity          the registry is the contract
  • screen-states-and-interactions  the 12-state matrix and its assertions
  • nexleaf-design-system           ColdTrace composition
  • coldtrace-product-context       only if a product judgement is involved

Read DESIGN-LAYOUT-CONTRACT.md §1–§8 and DESIGN-SYSTEM-INVENTORY.md.

Then, read-only:
  1. Parse the prototype's state registry — STATE_SECTIONS / STATES in states*.jsx.
     Walk the bracket depth to find the array end; a fixed-length slice truncates it.
     That id set is the CONTRACT for what states exist. Figma answers to it.
  2. Identify the clone source. Check the canonical reference frames at the end of
     FIGMA-MAP.md first. If one governs this screen family, that is the source and it
     outranks any written spec. If none does, name the nearest existing sibling screen.
     NEVER start from a blank frame.
  3. List the existing sections on the target page and their owners
     (getSharedPluginData('nexleaf.parity','owner')). You will touch none of them.

Report: state count · section count · the clone source and why · the target page.

────────────────────────────────────────────────────────────
STAGE 1 · THE PLAN — stop here for approval
────────────────────────────────────────────────────────────
Give me, in one message:

  a) The state matrix. For each of the 12 states in screen-states-and-interactions:
     state · applies? · which registry id(s) cover it · what the user sees · what they
     do next. Mark anything you are unsure of as a question, not an assumption.

  b) Any state that does NOT apply, with the reason. This becomes the section's
     `note · matrix` on canvas. Absence must be a decision, not an omission.

  c) The section and group plan: section name, group headings in journey order
     (happy path → variants → edges), and which frame codes sit in each.

  d) Frame codes. One per registry state, plus sub-states where a state legitimately
     owns several frames. Sequential, prefixed by flow.

  e) The clone source, and the frame family per code — page card 1328 / success 752 /
     modal 620.

  f) Anything the prototype does that no DS component covers. Propose a DS addition and
     a PD-16 comment. Do not hand-roll it.

THEN STOP. Wait for my approval.

────────────────────────────────────────────────────────────
STAGE 2 · BUILD DESKTOP — follow §6b in order, literally
────────────────────────────────────────────────────────────
Per frame, in this sequence:

  1. Clone the source. Never a blank frame.
  2. Set the frame family and chrome BEFORE content — §1 geometry.
       Top bar   1440×56 @0,0    · no line, no shadow, ever. STRETCH/MIN.
       Side nav  56×<frame h> @0,0 · full height. MIN/STRETCH. Below the top bar.
       Page card 1328 × max(804, content+32) @80,72 · a slab, not a hug. MIN/MIN.
  3. Compose from real instances by key from DESIGN-SYSTEM-INVENTORY.md.
     Tag for chips, NEVER Badge. Cell for list rows. Pagination for paging.
  4. Set text through component properties, never .characters — assigning to a
     property-driven node silently no-ops. Keys carry a literal "↪️ " prefix, so
     resolve by regex:
       const keyOf = (n, re) => Object.keys(n.componentProperties||{}).find(k => re.test(k));
  5. Append before sizing. layoutSizingHorizontal='FILL' only works on an auto-layout child.
  6. Respect instance boundaries. An id containing ';' rejects resize/remove/appendChild.
     Overlay a sibling frame instead, and log the missing variant as a DS gap.
  7. Assert clones render: visible=true, opacity=1 on the clone AND its descendants,
     then read the size back. Hidden sources produce hidden clones and report success.
  8. Name every structural node you create — __dropdown, __contact_tags, __step_counter_row.
     Later passes target BY NAME, never by counting parents.
  9. Refit in this exact order:
       hug inner stacks → set card geometry → resize frame →
       RE-ASSERT card.y (resize moves children) → resync full-bleed overlays
       (Loader/Overlay/Scrim → 0,0 + frame size) → re-pin sheets → resize the side nav
 10. Layer order and fixed split — §2:
       [content, anchored things] SCROLLS · [Top bar, nav] FIXED · [overlays] FIXED
       frame.numberOfFixedChildren = chrome + overlays
       There is NO scrollBehavior property in this runtime; reading it throws.
 11. Breadcrumb per §3. The leading node is an ICON, never a text crumb reading "Home".
     Past three levels the middle collapses into "…".
 12. Bind parity before moving on:
       frame.setSharedPluginData('nexleaf.parity','stateId', <registry id>);
       frame.setSharedPluginData('nexleaf.parity','frameCode', <code>);
       frame.setSharedPluginData('nexleaf.parity','viewport','desktop');

Read every write back, NBSP-normalised:
  const norm = s => String(s).replace(/[   ]/g,' ');
A plugin run that throws rolls back the WHOLE run — re-read state after any failure.

Report: frames built · frames bound · anything you could not compose from the DS.

────────────────────────────────────────────────────────────
STAGE 3 · MOBILE TWINS — §4
────────────────────────────────────────────────────────────
Every desktop state gets a 375 twin, or the set is incomplete.

  Status bar 375×44 @0,0 always · Mobile Top Nav 375×52 @0,44 SECONDARY PAGES ONLY
  Content column x=16 w=343 · card padding 0/16/0/16 → children 311
  Column y: 52 tertiary · 172 secondary · 198 secondary+toast
  Column constraints MIN/MIN. Inherited CENTER/CENTER is what makes columns drift.
  Frame height max(812, column bottom + 24); with a sheet max(812, sheet + 96)

Shell level comes from CONTENT, not the frame-code prefix: tertiary = has a wizard
stepper = no Mobile Top Nav, back arrow in the header. Deriving it from the prefix
produced 20 false positives once.

A phone frame is 812 and the page behind a sheet CLIPS. Never stretch the frame to fit
the page. Sheets pin to the bottom. Paginate rather than grow. Modals become bottom
sheets. Review rows stack, label above value.

Bind viewport='mobile'. Report: twins built · viewport gaps (should be zero).

────────────────────────────────────────────────────────────
STAGE 4 · ANNOTATE — §6, every state, both viewports
────────────────────────────────────────────────────────────
  • One `note · <CODE>` per state frame. No exceptions.
  • Same x as its screen, y + height + 16. 440 wide desktop, 375 mobile.
  • Fill carries the TONE of what it describes:
      ℹ info #EAF4FF · ⚠ warning #FFF1E3 · ⛔ critical #FEE9E8
    An error state never gets a blue note.
  • Title: tone glyph + what the screen IS. Body: when it appears, what it's for, and
    the RULE it carries — the commit boundary, why a control is a dropdown and not free
    text, what recovery exists. Never a restatement of the title.
  • One `content` intro card per section, top-left, in the structured
    WHEN IT APPEARS / PURPOSE / WHAT IT DOES form.
  • One `note · matrix` per section listing the states declared N/A and why.

────────────────────────────────────────────────────────────
STAGE 5 · LAY OUT THE BOARD — §5
────────────────────────────────────────────────────────────
  content → § group heading → screens in CODE order → note under each screen
  5 per row desktop, 8 per row mobile, wrapped by WIDTH BUDGET not a fixed count
  PADX 64 · PADY 112 · COLGAP 80 · ROWGAP 140 · NOTEGAP 16 · HEADGAP 28 · GROUPGAP 180
  Mobile section at desktop.x + desktop.width + 600, same y

  • Sort by SEMANTIC CODE, never by canvas position. Sorting by (y,x) rescrambles on
    every run.
  • Section width = the WIDEST row, not the last row. Getting this wrong sizes sections
    too small and frames render outside their own boundary.
  • Operate on an explicit allow-list of your own sections only. Skip anything with an
    `owner` tag. Iterate EVERY child type, not just frames. There is no undo.

────────────────────────────────────────────────────────────
STAGE 6 · VERIFY — report five numbers, then what you did NOT check
────────────────────────────────────────────────────────────
  1. Annotation coverage      note · <CODE> present for every state frame
  2. Note placement           same x, y + height + 16
  3. Matrix coverage          of 12: how many drawn, how many declared on canvas
  4. Viewport parity          every state has a desktop and a mobile frame
  5. Registry parity          every registry id has a frame, every frame has an id

Plus: nothing spilling outside its frame · no section overlaps · no hollow rows
(a container whose identifying content was deleted) · no placeholder strings
("Label", "Title", "Error message") · no opacity-0 or hidden strays · top bars clean
of shadows · side nav full height · cards at their family geometry.

State distinctness: if two frames sharing a state id render identically, ONE OF THEM IS
WRONG. Four search-result states were pixel-identical for weeks and every automated
pass approved them.

────────────────────────────────────────────────────────────
RULES THAT OVERRIDE CONVENIENCE
────────────────────────────────────────────────────────────
• Never say "done", "looks right" or "N/N pass" on the strength of your own checker.
  Report numbers and name what you did not check. A returned success value is not proof.
• Check these five failure modes BEFORE acting, not after:
   1 loose selector — allow-list or exact value, never a range, never "all of type X";
     print the target list and count before writing
   2 replaced without deleting — add the new AND remove the old in one pass, then assert
   3 asked instead of read — the reference registry and settled decisions come first
   4 claimed without reading the code — when Figma and code disagree, the code has been
     right every time
   5 built new instead of fixing the set — a defect in one state frame is a defect in all
     its siblings and in its desktop/mobile twin
• If no DS component fits: propose a DS addition and a PD-16 comment. Never hand-roll.
• When I correct you, write it into DESIGN-LAYOUT-CONTRACT.md (the owning section) or
  the relevant skill IN THE SAME TURN, and add an assertion that catches it next time.
  A rule that nothing checks is a wish.
• git push, npm run dev, npm run deploy are MINE. Give me the command.
  Publishing the DS library or design.nexleaf.org — ask first.

Start with Stage 0 and report before planning.
```

---

## Reverse direction, and the smaller jobs

**Figma → code:** `figma-implement-design` + `figma-pixel-perfect`. The extract → implement →
verify loop, not this prompt.

**Adding states to a board that already exists:** don't re-run the whole thing. Say so, and the
`screen-states-and-interactions` + `prototype-figma-parity` pair will diff the registry against the
board and build only the delta. Rebuilding a compliant board is how work gets lost.

**One screen, one fix:** the short prompt in `CLAUDE-CODE-PROMPT.md` is enough. This one is for a
whole flow.
