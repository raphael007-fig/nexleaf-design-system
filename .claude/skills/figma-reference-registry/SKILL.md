---
name: "figma-reference-registry"
description: "Raphael's canonical Figma reference frames and already-settled design decisions. Load this BEFORE asking him any layout, copy, sizing, or component question, and whenever he sends a Figma node link, says \"this is the design\", \"I updated this\", \"use this as reference\", or sounds like he is repeating himself. Also load before diffing a screen against a spec, because a frame he has touched outranks the written spec. Prevents re-asking questions he has already answered."
---

# Raphael's reference frames — read them, don't re-ask

## Why this exists

Raphael sent the same scan reference frame across several sessions. Each time it was treated as new:
re-diffed, and then he was asked to re-decide things the frame already answered. His words:

> *"have i not sent it many times, dont you use memory properly?"*

He was right. Every reference frame he sends is a **standing instruction**, not a one-off message.

## The rule

1. **Before asking him any question** about layout, sizing, copy, component choice or state
   behaviour — check the registry in `~/Documents/Design System/FIGMA-MAP.md`, section
   **"CANONICAL REFERENCE FRAMES"**, and the **"Decisions already settled"** table beneath it.
   That file auto-loads via `CLAUDE.md`, so it is already in context. Read it.
2. **If a reference frame covers it, act.** Follow the frame and say which one you followed —
   *"matching your scan reference 8060:289695"* — so he can correct the mapping, not the outcome.
3. **A frame he has touched outranks the written spec.** `PROTOTYPE-C-FIGMA-SPEC.md` loses to his
   canvas every time. When they disagree, follow him and mark the spec superseded in `FIGMA-MAP.md`.
4. **Only ask** when two reference frames genuinely conflict, or when the choice is one no reference
   covers. Then ask once, with the specific options.

## When he sends a frame — the same-turn duty

Any time he sends a node link, or says *"this is the design"*, *"I updated this"*, *"use this as
reference"*, *"I fixed this page"*:

1. Read the frame and extract the concrete spec — sizes, copy, component types, spacing, states.
2. **Append it to the registry table in `FIGMA-MAP.md` in the same turn**, with a "what it governs"
   column that names the frames it applies to.
3. Apply it across **the whole set** it governs, not just the frame he pointed at. A defect or a
   decision on one state frame applies to all its siblings, and to the desktop↔mobile twin.
4. Record any decision it settles in the "Decisions already settled" table so it is never re-asked.

## Reading the frame properly

Extract, don't skim. For a layout reference capture: frame size, the content column width and x,
every text string verbatim, component types (`Tag` vs `Badge` matters), field widths, button labels
and alignment, padding and gaps, and which chrome is present.

**Do not copy stale parts.** A reference frame can be newer than the board in one respect and older
in another — the scan reference still carries a pre-correction breadcrumb. Take what the frame is
*for* and leave what a later decision has already overridden. When unsure which part is stale, check
the "Decisions already settled" table by date.

## Related

`FIGMA-MAP.md` holds the registry itself — this skill is the discipline around it.
`nexleaf-design-workflow` (pre-flight rule 2: build FROM his real source) ·
`prototype-figma-parity` (bulk-operation guardrails) · `ds-components-only` (composition rules).

