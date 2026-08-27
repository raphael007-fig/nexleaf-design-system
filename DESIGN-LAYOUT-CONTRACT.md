# DESIGN LAYOUT CONTRACT — binding on every session

**This file is the single source of truth for how a ColdTrace screen and a Figma board are laid
out.** It auto-loads via `CLAUDE.md`. Read it before drawing anything. If you deviate, you are
wrong — unless Raphael says otherwise, in which case **update this file in the same turn**.

Why it exists: two sessions built two boards to two different conventions. Raphael, 2026-08-27:
*"WE ARE NOT CONSISTENT… CONSISTENT IN DESIGN LAYOUT SHOULD BE UPDATED SO EVERY SESSION LEARNS FROM
IT."* Rules scattered across a long incident log are not a contract. This is.

---

## 1 · Desktop screen — 1440 × ≥900

```
┌────────────────────────────────────────────────────┐
│ Top bar            1440 × 56  @ 0,0                │  no line, no shadow, EVER
├────┬───────────────────────────────────────────────┤
│nav │  Page card    1328 × ≥804  @ 80,72            │
│ 56 │                                                │
│ ↕  │                                                │
│full│                                                │
└────┴───────────────────────────────────────────────┘
```

| Element | Geometry | Notes |
|---|---|---|
| **Top bar** | `1440 × 56 @ 0,0` | **No divider, border or shadow.** The hairline is a `DROP_SHADOW 0,1 r0` — remove it. Constraints `STRETCH / MIN`. |
| **Side nav** | `56 × <frame height> @ 0,0` | `Closed Navigation`. **Full height, always.** Constraints `MIN / STRETCH`. Sits *below* the top bar in z-order. Re-resize on every frame resize. |
| **Page card** | `1328 × max(804, content + 32) @ 80,72` | A **slab, not a hug** — 804 minimum even when content is short. `72 = 56 top bar + 16`. |
| **Success card** | `752 @ 344,72` | Narrower, centred. Hugs its content. |
| **Modal** | `620`, **vertically centred** | `y = (frame.height − modal.height) / 2`. Never pulled to the top. |
| **Frame height** | `max(900, bottom-most visible child + 24)` | Count things *outside* the card too — toasts, below-card banners. |

**Match cards by exact width, never a range.** `width > 600 && width < 1000` catches modals and
wrecks them. 1328 = page card · 752 = success card · 620 = modal.

**Always re-assert position after a resize.** `frame.resize()` moves children. Set `card.y = 72`,
resize, then set `card.y = 72` again.

## 2 · Layer order and the fixed / scrolls split

Bottom to top in `frame.children`:

```
[ page content, __dropdown, __contact_tags, below-card banner ]   SCROLLS
[ Top bar, Closed Navigation ]                                     FIXED
[ Loader, Overlay, Scrim, Modal, Toast ]                           FIXED
frame.numberOfFixedChildren = chrome.length + overlays.length
```

There is **no `scrollBehavior` property** in this runtime — reading it throws. Use
`numberOfFixedChildren`, which fixes the *last N children in the array* (= top N in the layer panel).

Anchored things (`__dropdown`, `__contact_tags`) stay in **scrolls** — they travel with their field.
Modals sit above the chrome so they dim the top bar.

## 3 · Breadcrumb — the collapse rule

Spec sheet `9134:323533`. **The leading node is an icon, never a text crumb reading "Home."**

| Levels | Renders | Properties |
|---|---|---|
| 1 | `[icon]` | all false |
| 2 | `[icon] › Label` | `Crumb 2` |
| 3 | `[icon] › Label › Label` | `Crumb 2` + `Crumb 3` |
| **>3** | `[icon] › Label › … › Label` | `Crumb 2` + **`Page List`** + `Crumb 3` |

Past three levels the **middle collapses into `…`**. `Crumb 1` (text Home) stays **false** on this
product. Every chevron is bound to the crumb that follows it, so hiding a crumb never leaves a
dangling `›`.

## 4 · Mobile screen — 375 × ≥812

| Element | Geometry |
|---|---|
| Status bar | `375 × 44 @ 0,0` — always |
| Mobile Top Nav | `375 × 52 @ 0,44` — **secondary pages only** |
| Content column | `x = 16`, width `343` |
| Card padding | `0 / 16 / 0 / 16` → children **311** |
| Column `y` | **52** tertiary (wizard step, no nav) · **172** secondary · **198** secondary + toast |
| Frame height | `max(812, column bottom + 24)`; with a sheet, `max(812, sheet + 96)` |

- **Shell level decides the nav.** Tertiary = has a wizard stepper = **no Mobile Top Nav**, back
  arrow in the header. Derive from content, never from the frame-code prefix.
- **Column constraints `MIN / MIN`.** Inherited `CENTER/CENTER` is what made columns drift on every
  refit. Chrome is `STRETCH / MIN`.
- **A phone frame is 812 and the page behind a sheet clips.** Never stretch the frame to fit the
  page. Sheets pin to the bottom. Paginate rather than grow.
- Modals become **bottom sheets**. Review rows **stack** (label above value).
- Every desktop state has a mobile twin, or the set is incomplete.

## 5 · Board layout — sections, rows, journey order

```
SECTION  "<Flow name>"
  content                    ← flow intro card, top-left
  § Happy path               ← group heading (TEXT)
  A1  A2  A3  A4  A5         ← screens in CODE order, 5/row desktop · 8/row mobile
    ↳ note · A1              ← annotation, 16px under its screen, same x
  A6  A7  A8  A9
  § Variants
  § Edge cases
```

Groups run **happy path → variants → edges**. That ordering *is* the journey.

Spacing: `PADX 64 · PADY 112 · COLGAP 80 · ROWGAP 140 · NOTEGAP 16 · HEADGAP 28 · GROUPGAP 180 ·
INTROGAP 120`. Row wrap by **width budget** (`64 + 5×1440 + 4×80` desktop, `64 + 8×375 + 7×80`
mobile), not a fixed count.

- **Sort screens by semantic code, never by canvas position.** Sorting by `(y, x)` scrambles the
  order on every re-run.
- **Section width = widest row**, not the last row. Getting this wrong sizes sections far too small
  and frames render outside their own boundary.
- Mobile section sits at `desktop.x + desktop.width + 600`, same `y`. Section pairs stack with 500.
- **Never bulk-operate on a section you don't own.** Build an explicit allow-list; skip any section
  carrying `getSharedPluginData('nexleaf.parity','owner')`.

## 6 · Annotation — every state, tone-matched

**Every state frame carries a `note · <CODE>` frame. No exceptions, both viewports.**

- Directly beneath its screen: same `x`, `y + height + 16`. **440** wide desktop, **375** mobile.
- **Fill carries the tone of what it describes:** `ℹ` info `#EAF4FF` · `⚠` warning `#FFF1E3` ·
  `⛔` critical `#FEE9E8`. An error state never gets a blue note.
- Title: tone glyph + a short statement of what the screen *is*.
- Body answers **when it appears · what it's for · the rule it carries** — the commit boundary, why a
  control is a dropdown and not free text, what recovery exists. Never a restatement of the title.
- **One `note · matrix` per section** declaring which of the 12 states were deemed N/A and why.
  Absence must be a decision on the canvas, not an omission.

## 7 · Definition of done — five numbers, every time

```
Frames        132 (66 desktop + 66 mobile)
Annotated     132/132        Notes placed 132/132
Matrix        11/12 drawn · 1/12 declared on canvas
Viewport      no gaps
Registry      33/33 bound, 0 unbound
```

Never report "looks complete". **A rule that nothing checks is a wish** — every rule above has an
assertion, and the numbers get reported.

## 8 · Composition

- **Never build a component from scratch.** Check `DESIGN-SYSTEM-INVENTORY.md` (82 components) first.
- `Tag` for chips — **never `Badge`**. `Cell` for list rows. `Pagination` for paging.
- When Figma and code disagree, **read the code first** — it has been right every time.
- Bind colour variables, but **read the resolved value back**: a variable whose name matches your
  intent may not carry the value your component needs.

---

## Known inconsistency, still open

Two annotation body formats exist in the file:

- **Add Equipment** (132 notes) — tone glyph title + a short prose body.
- **Manual Temperature Recording** — a structured `WHEN IT APPEARS: / PURPOSE: / WHAT IT DOES:` block.

§6 above is the standard. The Manual Temp Recording long form carries more and is the older house
style; the short form reads faster at board zoom. **These need to converge on one.** Until Raphael
picks, do not add a third variant — match whichever board you are working in and flag it.
