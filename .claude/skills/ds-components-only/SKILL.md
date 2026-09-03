---
name: "ds-components-only"
description: "BINDING rule for all UI work in Raphael's projects (Design System repo, prototype-hub, ColdTrace/Nexleaf screens, workflow tooling): NEVER generate UI components from scratch — always compose from the Poltail design system in code, and place real Figma library instances on canvas. Trigger whenever building, editing, prototyping, or generating ANY screen, page, table, card, form, panel, button, or widget in his projects, and when reviewing code or designs for compliance. Also trigger on \"audit for design system compliance\" or \"replace with my design system components\"."
---

# DS Components Only — the No-Scratch Rule

**Never generate UI from scratch. Ever.** In code, compose from the Poltail design system
(`~/Documents/Design System/src`, via `src/index.js` / the `@ds` alias). In Figma, place
**real library instances** — a frame styled to look like the DS is a failure, not a shortcut.

## Search properly BEFORE concluding anything is missing

**Broad multi-word queries miss things.** Run several **short, single-concept** searches first:

- `search_design_system` with `"metric"`, then `"card"`, then `"tile"`, then `"KPI"` — one concept
  each. (`"banner toast page header card metric"` returned nothing and produced a false "gap";
  `"metric KPI tile"` found **Metric Card** immediately.)
- Search **both vocabularies** — code name ≠ Figma name: `OptionCard` → **Choice list**,
  `TextInput` → **Text field**, `RadioGroup` → **Choice list**, the wizard progress bar → **Frame**
  on the **Step Grid** page (*not* `Stepper`, which is a numeric increment control).
- Also scan the **Design Rep** page, where patterns live as designs rather than components.

## Diff against the canonical reference BEFORE declaring a defect

Structure that looks wrong is often the house pattern. Pull the equivalent node from the canonical
reference and compare **node types, child order, geometry** before "fixing" anything.

The ColdTrace **top bar is a `GROUP`**, deliberately. It was mis-diagnosed as a hand-rolled
lookalike and briefly replaced with the library's `Top bar` — which is the generic **Polaris** bar.
Wrong call, reverted. **"It's a group, therefore it's wrong" is not a diagnosis.**

**When Raf sends a screenshot, establish what it is before acting.** A prototype screenshot and a
Figma frame look alike. He may be sending a **reference for what something should be**, not a bug
report — read the message, and if it's ambiguous, ask which side is the source of truth. Getting
this backwards once cost a needless DS change and a revert.

## Layout & placement — copy the canonical references, don't invent

**Code:** `src/pages/ApplicationLayout/ApplicationLayout.stories.jsx` (Sectioned layout).

```jsx
<AppShell level="secondary" navItems={…} activeItemId={…} contentWidth="full">
  <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
    <Page title="…" subtitle="…" primaryAction={{ content: '…', disclosure: true, onAction }} />
    <div style={{ …grid…, marginBottom: 24 }}>{/* metrics */}</div>
    <div style={{ marginBottom: 24 }}>{/* banner */}</div>
    <IndexTable … />
  </div>
</AppShell>
```

- **`contentWidth="full"`** — never a fixed px width.
- **Wrapper top padding MUST be 0** — `Page` already owns 24px.
- **24px section rhythm** via `marginBottom: 24` per section.
- Wrap every screen in `AppShell`. `level`: `primary` · `secondary` · `tertiary`.
- **Tooling/hub chrome must never overlap product controls.**

**Figma desktop:** Design Rep — Top bar 1440×56 (+1px divider at y=57) · collapsed rail 56px at
x=0 · content at **x=80, y=72**, width 1280.

**Figma mobile (375):** Design Rep → *Mobile And Ipad Screen Layout*. Clone, don't invent:
status bar `Component 2` 375×44 at y=0 · `Mobile Top Nav` 375×52 at y=44 · content column
**x=16, width 343** · `Bottom sheet` for the notch. Frame height `max(812, column bottom + 24)`.

### Overlay + layout order (Raf's reference: E2 Scanner running)

Child order on a screen frame, **back → front**:

```
content column → status bar → Mobile Top Nav → Loader (full frame, 0,0) → Modal (frontmost)
```

- The **dim layer sits above the chrome**, not behind it. Resize the **`Loader`** instance, not the
  `Overlay` rectangle inside it (instance-nested, refuses).
- Modal always last. Mobile: `x=0, y = frame.height − sheet.height`, top corners 16, notch header,
  no X. Desktop: centred both axes.
- Re-assert after any height change: `appendChild(loader)` then `appendChild(modal)`.

### The top bar — clone, don't rebuild

Canonical: Design Rep top bar **group** `8483:64221` in `YzbXqlrKTcGbWxwzGkLTct`.

```
Top bar [GROUP]        1440×56 at y=0
├── Top bar [FRAME]    Logo(240) · Search(957) · Right content [INSTANCE](243)
├── Language [INSTANCE]   x=811, y=18
├── Breadcrumb [INSTANCE] x=80,  y=14
└── Actions [INSTANCE]    x=1174, y=14 — country pill ("Kenya")
```

Audit every screen for all four. Cloned bars routinely ship with `Right content` **detached** and
`Actions` missing entirely.

**ColdTrace Add Equipment breadcrumb:** `Home › Coldchain Equipment › Add Equipment` on *every*
screen — entry, wizard and success. Three text `Button` instances, last one `State=active`.

## Code side — components

1. **Find the component first** — 47 in `src/components/`. Read its `.stories.jsx`.
2. **Mappings:** table links → `LinkCell` · chips → `Badge` · labels → `Tag` · buttons → `Btn` ·
   panels → `SlideOver`/`Modal`/`BottomSheet` · page header → `Page` · tables → `IndexTable` ·
   metrics → `MetricCard`.
3. **Tokens only**; **Polaris icons only** (`PolarisIconImg` / `POLARIS_ICON_DATA`).
4. **CSS = layout only.**

## Figma side — real instances

1. `get_libraries` → **Nexleaf Design System v2.1 (Test)**. The library also carries generic
   **Polaris** components — a name match is not a fit.
2. **Drive instances via `setProperties`.** Assigning `.characters` to a property-driven node
   silently does nothing.
3. **Override nested defaults** — placed instances keep "Label"/"Content"/"Heading" and, when
   cloned, *the source screen's* real content. Inverse trap: an **unused** property may still read
   `"Title"` while the visible copy comes from a text node — audit the **rendered text**.
4. **Instance limits:** nodes whose id contains `;` are instance-nested — you can set properties
   and `layoutSizing` on them, but never `resize` or `remove`. Everything else is fair game.
5. **Modal slots DO accept components.** `Modal` on these screens is a plain FRAME assembly
   (`Title bar`/`Footer`/`Cancel button` are instances; `Content` and `.slot examples` are frames).
   Append real DS instances into `.slot examples` — never float a control over the modal.
6. **Node names go stale** after reordering. Read the `Label content` property, not `node.name`.

### Text field anatomy — the six things that are always wrong

1. **`Prefix` defaults on** in cloned instances (a location pin on every field). Set it `false`.
   `Suffix` (chevron) only on selects and dates.
2. **Placeholder ≠ value.** Set the `Type` variant as well as the string.
3. **Value colour is a bound variable that does not follow `Type`.** value →
   `Color/text/text-secondary`, placeholder → `Color/text/text-disabled`. They desync silently.
4. **Help text is `textAutoResize = NONE`** — two-line help overlaps the next label.
5. **One width for every control on a screen.**
6. **`State: error` renders its own inline error node, which defaults to the literal string
   `"Error message"`.** Setting the help content is not enough — write the message into the
   `Inline error` text node too, or the screen ships with a placeholder.

### Buttons

- **Primary is BLUE** — `Color/bg/fill/fill-emphasis` (0,91,211), matching `COLOR_PRIMARY =
  '#005bd3'` in code. `fill-brand` (48,48,48) on an enabled primary is a defect.
- Leave `fill-brand-disabled` @17% (disabled/loading) and `fill-transparent-active` (breadcrumb
  chip) alone — they read "dark" on a raw colour check but render light grey. **Filter by bound
  variable name, not by colour.**
- **Cloned buttons inherit `opacity: 0`** if the source was hidden (`Save Draft` in the footer is
  the usual culprit). Set opacity on the clone *and* its descendants; turn `Icon` off.

### Mobile conversion (375)

- **Recurse when fitting.** One pass on the column is not enough — entry screens nest three levels
  of fixed-width frames that bleed outside the card.
- **Review rows must stack** — the desktop row is HORIZONTAL with a FIXED 220px label column, so at
  343 the value gets ~51px and shreds. Flip to VERTICAL, label above value.
- **Page header:** hide the empty page-level `Actions` slot (HUG 248) or the subtitle clips.
- **Stepper compact keeps the WHOLE run of circles** with dashed connectors, unlabelled, above a
  `Step N of T · Label` line. Do NOT reduce it to one circle. The connector `LINE` nodes are
  absolutely positioned and keep desktop geometry — re-span each between adjacent circle centres.
- **Action rows stack** when the buttons exceed the width; buttons go `FILL`.
- **Banner icon columns must stay HUG** — filling every frame inside a banner squeezes the copy
  into a sliver.

## When something is genuinely missing

Do **not** hand-roll a lookalike, and do **not** open a new ticket. Build it in the design-system
Figma file (`y4XdS2kaiS8eMHY3z8wORP`), ask Raf to publish, and **comment on PD-16**. Same for
code-side DS changes — and if a DS change turns out to be based on a misread, revert it and say so
on the ticket.

## Annotations carry the tone of what they describe

Raf: *"any annotation tied to error or warning should be in red or yellow light fill."* Use the DS
Banner surfaces:

| Tone | Fill | Use on |
|---|---|---|
| info | `234,244,255` | behaviour, rules, flow explanations |
| warning | `255,241,227` | blocked permissions, offline, not-found, open decisions |
| critical | `254,233,232` | validation conflicts, submit failure, the errors section panel |

House style: 440px wide, radius 8, 16px padding, 10px gap, Bold 16 title + Regular 13/20 body,
placed directly beneath the frame it explains.

## Auditing — measure content, not boxes

**A geometry checker will pass on a visibly broken screen.** Mine did, repeatedly. What actually
finds defects is reading the **rendered copy and component state** of every frame and comparing it
to the spec.

Check for:

- placeholder strings — including **`Error message`**, `Title`, `Label`, `Content`, `Option 1`
- **hidden strays** — compute *effective* visibility by walking to the frame, and treat hidden
  children of a form container as a **failure**. Delete them; hiding them means they resurface.
  (One pass deleted 127; a later one found 84 more at `opacity: 0`.)
- **states that render identically** — if two state frames differ only by a button being greyed,
  one of them is wrong. Four search-result states were pixel-identical for weeks.
- copy that contradicts the content ("1 record matches" above two results)
- duplicate or near-duplicate button labels in one container (`Cancel` + `Cancel scan`)
- banners with no text; toasts duplicated across frames; content outside the card
- inconsistent sample data across a flow (same device, serial and date throughout)

`findAll` results go stale the moment you remove a node — snapshot **ids**, re-fetch with
`getNodeByIdAsync`, skip `removed`. Never swallow errors in a bulk pass; collect and return them.

## Working safely in Figma

- `use_figma` is **atomic**, but a **network error can arrive after the script ran** — re-read
  state before retrying.
- **`get_screenshot` caches per node id and only renders the desktop app's active tab.** A stale
  image will show you the previous state; a node on a background page renders blank or errors.
  Confirm writes by **reading geometry back**, force a fresh render via a different (parent) node,
  and build on the open page then reparent with `page.appendChild(section)` — which moves the whole
  subtree, unlike setting `section.x`, which strands the children.

## After a correction

When Raf corrects something, **encode it here (and in `FIGMA-MAP.md` / `docs/`) in the same turn**.
A fix that isn't written down gets repeated. **If a rule here later proves wrong, retract it
explicitly** — say what was believed, what's true, and why the diff was missed.

## Related

`FIGMA-MAP.md` · `docs/08-conventions.md` · skills `nexleaf-design-system`, `design-critique`,
`figma-design-audit`, `prototype-review-then-publish`.

