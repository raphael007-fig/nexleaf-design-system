---
name: "figma-design-audit"
description: "Audit a Figma section against the project's agreed design decisions and produce frame-mapped annotations plus ranked QA flags. Use this whenever Raphael shares a Figma link and asks to scan, audit, review, QA, check, or annotate a section, board, or set of frames, or asks \"give me the right annotations\", \"is this design correct\", or \"check this against what we agreed\". Also trigger when he asks to verify mocks against a spec, meeting decision, spreadsheet, decision tree, or prototype, even if he doesn't say the word \"audit\". Do NOT use for implementing a Figma design as code (use the design-to-code skills) or for writing generic annotation templates with no Figma link to check them against."
---

# Figma Design Audit

Audit designs the way a reviewer who was in every meeting would: compare each frame against the project's agreed decisions, then hand back paste-ready annotations and a ranked list of contradictions. The output is two things in one markdown file: a placement map (the right annotation beside each frame) and QA flags (where the frames disagree with the source of truth).

The single most important idea: **an audit is a comparison, not a proofread.** Typos are the least valuable finds. The valuable finds are frames that contradict the agreed logic, or contradict themselves. That requires assembling the source of truth before opening Figma.

Sibling skill: `design-critique` judges *quality* (UX heuristics, DS compliance, states coverage). This skill judges *correctness vs what was agreed*. Run both when Raphael asks for a full review.

## Step 1: Assemble the source of truth first

Before pulling anything from Figma, gather what the design is supposed to obey:

- Project memory (`MEMORY.md` and linked memories) for agreed direction and open decisions
- Decision/spec docs in the project folder (e.g. extracted decision trees, meeting summaries, annotation kits from earlier audits)
- The workflow contracts in the Design System repo (`~/Documents/Design System`): `FIGMA-MAP.md` — the Figma→Poltail component map, the **canvas discipline** (sections, versioned frames, grid, naming), and the **mirror rule** (prototype ⇄ Figma parity)
- The project's PRD and Jira epic/tickets (Product Board `PD`): the ticket thread records decisions and corrections chronologically — `project.js` in the prototype hub carries the epic key and links
- The prototype-hub prototype and its `CHANGELOG.md` (renders as the hub's Activity panel): the running prototype is the best reference for intended states — it encodes decisions the docs may lag behind
- Content sources of record (support spreadsheets, copy decks) via the Drive connector when linked

If there is no source of truth available, say so and ask for one before auditing. Without it you can only proofread, and the audit will miss the bugs that matter.

## Step 2: Pull the section from Figma

1. `get_screenshot` on the section node at high `maxDimension` (2048 to 4096) for the overview. Identify the row/group structure and labels.
2. `get_metadata` on the section for frame names and node ids. Node ids let annotations point at exact frames.
3. Zoom into each group: `get_screenshot` per child frame node at readable resolution.

**When metadata fails or is too large** (SSE parse errors, token overflow on big sections): fall back to visual slicing. Request the screenshot at full original resolution (`maxDimension` = original width), download it, and crop each labeled group locally:

```bash
# macOS sips crop: -c <height> <width> --cropOffset <y> <x>
# Run inside bash -c '...' if the shell is zsh: zsh does not word-split unquoted variables
bash -c 'sips -c 1320 2100 --cropOffset 2300 2650 full.png --out groupB.png'
```

Read every crop. Do not audit from the overview alone: the bugs live in body copy that is only legible up close.

## Step 3: Read with the bug taxonomy in mind

These are the bug classes that real audits keep finding, roughly in order of how much they matter:

1. **Copy-paste drift between sibling variants.** The most common serious bug. When a designer duplicates variant B to make variant C, the parts they forgot to change contradict the parts they did change. Check every field of every sibling frame against what THAT variant is supposed to say, not against whether it reads plausibly.
2. **Self-contradiction inside one frame.** One element says Functional while another says Faulty; a timestamp says 5 days while the copy says "no data in 7 days". Cross-check facts within the frame against each other.
3. **Wrong state values vs the canonical model.** Status chains, badges, tiers, codes: check each against the spec, not against memory.
4. **Presence-rule violations.** Elements that should hide in a given state but are shown (a last-data line on an unmonitored device), and elements the state requires but are missing (a tertiary link present on some variants, absent on others).
5. **Affordance/destination disagreement.** Icon says in-app chevron, meta text says an external destination, or vice versa. Icon, text, and behavior must agree.
6. **Context terminology.** Titles and labels that must change per surface (e.g. "Issue Details" vs "Status Details", "Device" vs "Equipment"). Duplicated frames keep the wrong one.
7. **Format consistency.** Separator patterns (label: value vs label · value), singular/plural headers, house punctuation style.
8. **Placeholder leakage and text bugs.** Fake codes that are not in the real taxonomy, truncated text layers, duplicated section headers, typos in titles.
9. **Mirror-rule parity gaps.** Compare the section against the prototype: screens and states that exist on one side but not the other (an error state the prototype handles that Figma never drew, or vice versa). These go in MISSING FRAMES / STATES with the fix being "mirror it across".
10. **Canvas-discipline violations.** Loose frames outside sections, overwritten frames where a versioned copy was required, unnamed layers, frames out of journey order, redrawn elements that should be design-system components (per `FIGMA-MAP.md`).

Prioritize reading sibling variant groups side by side: that is where class 1 and 2 bugs hide.

## Step 4: Write the audit document

One markdown file in the project folder, named after the section (e.g. `figma-annotations-<section>.md`). Use this structure:

```markdown
# Annotations for Figma section: <name> (<node-id>)
One-line explanation of the placement map and category tags.

## <ROW OR GROUP NAME>
### <Frame or group> (<node ids>)
**[TAG] Optional element pointer.** Annotation text.

## SECTION-WIDE ANNOTATIONS
(things that apply to every frame)

## QA FLAGS: fix in frames before handoff
(numbered, ranked: logic contradictions first, then copy/data bugs, then polish.
 Lead with a bolded headline for the highest-priority find.)

## MISSING FRAMES / STATES
(states the system defines that this section does not cover, and where they live if known —
 include prototype-side states per the mirror rule; offer to add them as versioned frames)
```

Category tags: `[LOGIC]` system behavior and state rules · `[DEV]` payload contracts, conditional rendering, deep links · `[INT]` interaction behavior and defaults · `[CONTENT]` copy rules and voice · `[A11Y]` accessibility · `[VISUAL]` tokens, hierarchy, component usage · `[METRICS]` what to measure and why · `[OPEN]` unresolved questions and dependencies.

Writing rules for annotations:

- **Paste-ready**: each block must stand alone on a Figma sticky. Name the frame it attaches to. No references to "the doc above".
- **Explain why, not just what.** "Steps live inside each issue so users know which step fixes which cause" beats "put steps in accordions". Annotations teach the next reader the reasoning.
- **QA flags state the fix**, not just the problem: current value, correct value, and why it matters when the why is not obvious.
- Match the project's house copy style (this project: plain punctuation, no em dashes).
- Annotations describe the agreed design; QA flags describe divergence from it. Never mix the two: an annotation is what to paste, a flag is what to fix.

## Step 5: Deliver

Save the file in the project folder and send it with SendUserFile. In the chat summary, lead with the single most important QA find (the one that changes the design's meaning), then the counts, not the full list. If the audit found decisions that changed since the frames were made (e.g. a section built before a later meeting decision), call those out as updates rather than mistakes.

Then close the loop in the workflow:

- **Jira**: post the QA-flag summary as a comment on the project's ticket (`[PD-XX]` from `project.js`); open flags block Done per the Definition of Done.
- **Fixes applied to Figma** happen per the canvas discipline: new versioned frames beside the originals, annotated — never silent overwrites.
- **Missing states** found via the mirror rule get added to both sides (Figma frame + prototype) or ticketed if deferred, and the prototype `CHANGELOG.md` records what the audit changed.

