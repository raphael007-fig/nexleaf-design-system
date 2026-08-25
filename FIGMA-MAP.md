# Figma → Poltail Mapping

> **Purpose:** the deterministic bridge between Figma designs (Polaris + Tailwind kit +
> Phosphor) and the Poltail code components. When translating a Figma design to code,
> Claude MUST consult this file and reuse the mapped Poltail component + props — never
> re-invent a component. This is the plan-appropriate stand-in for Figma Code Connect
> (which needs a Figma Enterprise/Org plan; Nexleaf is on Pro). If Nexleaf upgrades,
> these mappings graduate directly into real `.figma.ts` Code Connect files.

## Global rules

1. **Source of truth:** the Poltail component (`src/components/<Name>/<Name>.jsx`). Designs describe intent; code decides implementation.
2. **Imports:** components are imported by path (no barrel export yet — see TODO):
   `import { Btn } from '../../../packages/design-system/src/components/Btn/Btn.jsx'` (adjust depth per hub layout).
3. **Icons:** the whole system aligns on **Polaris** (`PolarisIcon` catalog, `POLARIS_ICON_DATA`). Phosphor icons in product designs are translated to their Polaris equivalent via the table below.
4. **Tokens:** never hardcode hex/px. Use `src/tokens/index.js` constants (JS) or `tokens.css` vars (CSS). Figma Polaris `--p-*` variables map to Poltail tokens below.

## Token map (Figma Polaris `--p-*` → Poltail)

| Figma variable | Value | Poltail token (`src/tokens`) |
|---|---|---|
| `--p-color-text` | `#303030` | `TEXT_DEFAULT` |
| `--p-color-text-secondary` | `#616161` | `TEXT_SUBDUED` |
| `--p-color-bg` | `#f1f1f1` | `BG_PAGE` |
| surface / card | `#ffffff` | `BG_SURFACE` |
| nav selected surface | `#fafafa` | `BG_INPUT_FOCUS` |
| primary interactive | `#005bd3` | `COLOR_PRIMARY` |
| `--p-space-100/200/300/400` | 4/8/12/16 | spacing scale 4/8/12/16px |
| `--p-border-radius-200` | 8 | `RADIUS_SM` |
| critical / success / warning / info | — | `*_CRITICAL` / `*_SUCCESS` / `*_WARNING` / `*_INFO` families |

## Component map (top 12 by traffic — real prop APIs)

> Figma-side names marked _(confirm)_ should be verified against the Figma library
> the first time each is used, then locked here. Prop lists are pulled from live code.

### Btn  →  `src/components/Btn/Btn.jsx`
Figma: Polaris "Button" _(confirm)_. Props: `variant` (`primary|secondary|tertiary|plain`), `tone` (`default|critical|success`), `size` (`slim→small`, `medium`, `large`), `icon` (Polaris icon), `disclosure`, `loading`, `disabled`, `fullWidth`, `children`.
Figma variant → prop: `Primary→variant="primary"`, `Secondary→"secondary"`, `Plain→"tertiary"`; `Destructive→tone="critical"`.

### Card  →  `src/components/Card/Card.jsx`
Figma: Polaris "Card" / Tailwind card container _(confirm)_. Props: `children`, `loading`, `loadingContent`, `style`. Subparts: `CardSectionTitle({icon,title})`.

### TextInput  →  `src/components/TextInput/TextInput.jsx`
Figma: Polaris "TextField" _(confirm)_. Props: `label`, `placeholder`, `value`, `onChange`, `prefix`, `suffix`, `helpText`, `error`, `required`, `clearButton`, `type`, `size`, `disabled`, `readOnly`.

### SelectInput  →  `src/components/SelectInput/SelectInput.jsx`
Figma: Polaris "Select" _(confirm)_. Props: `label`, `options[]`, `placeholder`, `value`, `onChange`, `error`, `helpText`, `required`, `disabled`.

### Badge  →  `src/components/Badge/Badge.jsx`
Figma: Polaris "Badge" _(confirm)_. Props: `tone` (`default|info|success|warning|critical|…`), `size`, `icon`, `progress`, `onDismiss`, `children`.

### Tag  →  `src/components/Tag/Tag.jsx`
Figma: Polaris "Tag" _(confirm)_. Props: `label`, `tone`, `icon`, `removable`, `onRemove`, `onClick`, `disabled`, `truncate`.

### Banner  →  `src/components/Banner/Banner.jsx`
Figma: Polaris "Banner" _(confirm)_. Props: `tone` (`info|success|warning|critical`), `title`, `actions`, `icon`, `hideIcon`, `inCard`, `dismissable`, `onDismiss`, `children`.

### Modal  →  `src/components/Modal/Modal.jsx`
Figma: Polaris "Modal" _(confirm)_. Props: `open`, `onClose`, `title`, `footer`, `size`, `maxWidth`, `bodyPadding`, `closeOnBackdrop`, `closeOnEscape`, `showCloseButton`, `children`.

### IndexTable  →  `src/components/IndexTable/IndexTable.jsx`
Figma: Polaris "IndexTable" / data table _(confirm)_. Props: `columns[]`, `rows[]`, `selectedRows`, `onSelectionChange`, `sortKey`, `sortDir`, `onSort`, `tabs`, `bulkActions`, `rowActions`, `toolbarActions`, `searchValue`, `onSearchChange`, `emptyState`, `loading`, `footer`.

### SideNavigation  →  `src/components/SideNavigation/SideNavigation.jsx`
Figma: the product left rail _(confirm)_. Props: `items[]`, `activeItemId`, `onSelect`, `logo`, `footer`, `footerItems[]`, `collapsed`, `onCollapsedChange`, `width` (240), `collapsedWidth` (60), `touch`, `stickyFooter`, `loading`.

### TopBar  →  `src/components/TopBar/TopBar.jsx`
Figma: product top bar _(confirm)_. Props: `onMenu`, `logo`, `showMenu`, `showLogo`, `breadcrumbs[]`, `onAskAi`, `askAiActive`, `country`, `onApps`, `onNotification`, `onProfile`, `userInitials`, `userAvatar`.

### Toast  →  `src/components/Toast/Toast.jsx`
Figma: Polaris "Toast" _(confirm)_. Props: `open`, `tone` (`info|success|critical`), `icon`, `duration` (4500), `onDismiss`, `children`.

## Icon translation — Phosphor (Figma) → Polaris (`POLARIS_ICON_DATA` name)

Use `<PolarisIconImg name="…" />`. Extend this table as new Phosphor icons appear.

| Phosphor (Figma) | Polaris name (code) |
|---|---|
| ArrowRight / ArrowLeft / ArrowUp / ArrowDown | `ArrowRightIcon` / `ArrowLeftIcon` / `ArrowUpIcon` / `ArrowDownIcon` |
| CaretDown / CaretUp | `CaretDownIcon` / `CaretUpIcon` |
| MagnifyingGlass | `SearchIcon` |
| Bell | `NotificationIcon` |
| Warning | `AlertTriangleIcon` |
| WarningCircle / Info | `AlertCircleIcon` / `InfoIcon` |
| Check / CheckCircle | `CheckIcon` / `CheckCircleIcon` |
| X | `XIcon` |
| Plus | `PlusIcon` |
| Trash | `DeleteIcon` |
| Gear | `SettingsIcon` |
| Calendar | `CalendarIcon` |
| Camera | `CameraIcon` |
| Barcode / QrCode | `BarcodeIcon` / `QrCodeIcon` _(confirm exists)_ |

> If a Phosphor icon has no Polaris equivalent, add the SVG path to `POLARIS_ICON_DATA` rather than importing Phosphor — keeps one catalog.

## Writing to Figma — canvas discipline (BINDING)

When Claude generates or updates designs in Figma (e.g. pushing a prototype to design),
these rules are mandatory. Neatness is part of the deliverable.

**Organization**
1. **Every piece of work lives in a Section.** New project → new page or clearly-titled section. New change → a new section (or sub-area) within the project's space — never scattered loose frames.
2. **Never overwrite — version.** A change creates a **new frame beside the old one**, named `<Screen> — v2 (PD-XX)`. The old frame stays as history until explicitly retired.
3. **Grid arrangement.** Frames align on a consistent grid with even gutters, ordered left→right in journey order. No overlapping, no stray offsets.
4. **Naming parity.** Sections = project name; frames = screen names matching hub prototype slugs; layers named properly (no "Frame 427").

**Construction**
5. **Use design-system components — never redraw them.** If the design system has a Table, place the Table component; don't rebuild one from rectangles. Styles, fonts, and text tokens are already embedded — use them. Raw/detached elements only when no component exists (and that gap gets a ticket).
6. **Note components used.** Each section carries a small note (or annotation) listing which DS components appear, so mapping back to code is instant.

**Coverage — design the whole journey**
7. Every flow shows **all meaningful states**: happy path, sad path, error states, empty states, loading, and edge cases. The entire journey reads left→right on the canvas like a story.
8. **Annotate** decisions, states, and open questions on the canvas (annotation skill).

**Feedback**
9. Reviewer questions/feedback get noted next to the frame (and mirrored to the Jira ticket). **Unresolved feedback blocks Done.** When feedback causes a change → new versioned frame + annotation + ticket comment.

## Layout anatomy — every product screen (BINDING)

Learned from the **Design Rep** page (`8483:56185`), which is the canonical resource dump
for layouts. A desktop screen is NEVER just a content column:

| Part | Spec |
|---|---|
| **Top bar** | 1440×56 at y=0, + 1px divider at y=57. Contains breadcrumb, AI Chat Bot, region, apps, notifications, avatar. |
| **Side navigation** | Collapsed rail 56px wide at x=0, full height ("Closed Navigation"); expanded rail 240px. |
| **Content** | starts at **x=80, y=72** (clear of rail + top bar), width 1280 on a 1440 frame. |
| **Page header** | the real **Page** component instance (`Header` + `Actions`): set `Title content`, `Subtitle content`, and put the screen's primary action in the header's **Actions** slot — hide unused `Secondary action` / `Pagination` children rather than adding your own button. |

**Nav visibility by level** (AppShell `level` prop, same rule in Figma):
`primary` = no nav (Home is a launcher) · `secondary` = full nav (rail/drawer) ·
`tertiary` = rail for context; record header leads on mobile.

Responsive variants (mobile / tablet / desktop, Primary / Secondary / Tertiary / Menu) are
all laid out on the Design Rep page — **consult it before building a screen**, don't invent
a layout.

### Code side — copy `src/pages/ApplicationLayout` exactly

`src/pages/ApplicationLayout/ApplicationLayout.stories.jsx` (Sectioned layout) is the
**canonical reference for screen placement in code**. Read it before building a screen; do
not invent spacing.

```jsx
<AppShell level="secondary" navItems={…} activeItemId={…} contentWidth="full">
  {/* Horizontal 16px matches the Toolbar's padding so content edges line up with
      the breadcrumb (left) and avatar (right). TOP PADDING IS 0 — <Page> already
      owns 24px of top padding; adding more stacks two gaps and pushes the header
      way down the screen. */}
  <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
    <Page title="…" subtitle="…" primaryAction={{ content: '…', disclosure: true, onAction }} />
    <div style={{ …grid…, marginBottom: 24 }}>{/* metrics */}</div>
    <div style={{ marginBottom: 24 }}>{/* banner */}</div>
    <IndexTable … />
  </div>
</AppShell>
```

Rules that follow from it:
- **`contentWidth="full"`** — not a fixed px value; the content fills the right column.
- **Wrapper top padding 0**, horizontal 16 (12 on the smallest viewport), bottom 32.
- **24px section rhythm** via `marginBottom: 24` on each section (Page's own bottom padding
  provides the first gap) — not a flex/grid `gap` on a wrapper.
- A prototype that renders only a content column, with no `AppShell`, is incomplete.
- Hub/tooling chrome must never overlap product controls (the top bar's Ask AI, region,
  apps, notifications, avatar).

## Primary buttons — emphasis blue (DECIDED)

Primary buttons use the **emphasis** token family, not the library Button's black default:

| Purpose | Figma variable (Nexleaf Styles → Semantic tokens) | Code token |
|---|---|---|
| Primary bg | `Color/bg/fill/fill-emphasis` | `COLOR_PRIMARY` `#005bd3` |
| Hover | `Color/bg/fill/fill-emphasis-hover` | `COLOR_PRIMARY_HOVER` |
| Pressed | `Color/bg/fill/fill-emphasis-active` | `COLOR_PRIMARY_PRESSED` |

- In Figma, **bind the variable** (`setBoundVariableForPaint`) — never paste a hex.
- The code's `Btn variant="primary"` already matches; **no code change needed**.
- When placing a library Button instance whose primary variant renders black, rebind its fill
  to `fill-emphasis`.
- **Scope the change to the intended button only.** Selecting "any INSTANCE named Button" also
  matches breadcrumb buttons in the Top bar — verify by checking the node's text and ancestry
  (`Actions` → `Page` for a header action) before writing, and sanity-check the count.

## Annotation format — house style (BINDING)

Match the existing annotation panels in the file (e.g. `8519:186503`):

- Panel = frame named **`content`**, fill **`#eaf4ff`** (BG_INFO), padding 12, spacing 10,
  title **Inter Bold 14**, body **Regular 12/18**.
- Two panel kinds, side by side under the frames:
  1. **Behaviour panel** — `WHEN IT APPEARS:` · `PURPOSE:` · `WHAT IT DOES:` (bullets) ·
     `User decision example:` (a quote in the user's voice).
  2. **Component breakdown** — `Component:` · `Fields` · `Example` · `DS instances used` ·
     `Rationale`. **Place a live instance of the component inside the panel** — the reader
     should see the real thing, not only a description.
- Also used: KPI/tile definition panels (`Definition` / `Derived from` / `User understanding`)
  and comparison panels (previous vs improved, with the reasoning).
- Explain **why**, not just what. Annotations teach the next reader the reasoning.

## Figma scripting hygiene (learned the hard way)

- **Clean up test nodes with `try/finally`.** A `clone()` whose later `appendChild` throws
  leaves the clone parented to the PAGE — an orphan floating over the frames. Always
  `try { ... } finally { clone.remove(); }`.
- **After any write session, sweep for strays:** list `page.children` and delete anything that
  isn't an intended section/frame.
- **Header cells have a `State`** — `blank` renders no label even when `Table content` is set.
  Set `State = 'rest'` on every data-column header, and verify labels by reading back the text
  nodes, not by assuming the property took.
- **Verify by reading back**, then screenshot. Setting a property is not proof it applied.

## Mirror rule — the handshake (BINDING)

Prototype and Figma must tell the same story, **but neither side is changed silently**:

- **Prototype changed → Figma must follow.** Claude does *not* write to Figma unprompted. It
  **tells Raf what diverged and asks** first, e.g.
  > The prototype now does X; your Figma frames still show Y. Want me to update Figma?
  On approval, mirror it per the canvas discipline (new versioned frame, annotated) and comment
  on the Jira ticket.
- **Figma changed → Raf says "go check it."** He edits Figma himself and tells Claude to look;
  Claude then reads the frames, reports what changed, and updates the prototype to match.
- **Every correction counts.** A fix made in the prototype (spacing, copy, a new control, a
  state) is a divergence until it exists in Figma too. Track it and raise it — don't let it
  drift.
- Report parity findings as a short list: what's on each side, what's missing where, and the
  proposed fix — then wait for the go-ahead.

## Mirror rule — parity details

The prototype and the project's Figma section must tell the **same story**. Neither side
is allowed to drift ahead silently — whichever side moved, the other catches up.

1. **Reflect back.** If the prototype gains anything good — a state, a flow step, an
   interaction, better copy — it goes back into Figma as new versioned frames in the
   project's section (per the canvas discipline above). Design-first work flows forward
   the same way via the component map.
2. **Parity audit on every touch.** Whenever Claude works on a project, it compares the
   Figma section's frames against the prototype:
   - inventory what exists on each side (screens **and states**);
   - flag anything missing on either side — e.g. *"the prototype has an error state for
     Submit; your Figma section doesn't"* — and **add it to Figma** (versioned, annotated),
     noting it in the ticket;
   - flag prototype gaps the same way (state exists in Figma but not in code).
3. **Think states and systems, not frames.** Claude operates as a product designer +
   UX designer: for every screen it asks *what are all the states?* (happy, sad, error,
   empty, loading, edge) and *what system parts does this touch?* (DS components, tokens,
   other screens in the journey) — and designs for those, unprompted.
4. Parity gaps found during an audit are reported to Raf with what was added/fixed —
   never silently ignored.

## Figma library inventory — CONFIRMED (from "Nexleaf Design System v2.1", file `y4XdS2kaiS8eMHY3z8wORP`)

Read live from the file via Figma desktop. Each Figma component has its own page; page
node IDs below let tools jump straight to a component.

**Top-12 names confirmed:** Button `7:3` → Btn · Card `75727:31140` (+ Card Component
`84989:44873`) → Card · Text field `376:12` → TextInput · Select `364:2186` → SelectInput ·
Badge `367:343` → Badge · Tag `364:1477` → Tag · Banner `20:21` → Banner · Modal `358:0` →
Modal · Index table `44707:19512` → IndexTable · Navigation `48:108` → SideNavigation ·
Top bar `434:2197` → TopBar · Toast `364:1236` → Toast.

**Rest of the Figma library → Poltail:**

| Figma page (node) | Poltail component |
|---|---|
| Breadcrumbs `84703:5713` | Breadcrumbs |
| Checkbox `341:1996` | Checkbox |
| Choice list `1317:4361` | ChoiceList (Checkbox.jsx) |
| Date picker `1334:566` | DatePicker (+ DateField for input) |
| Divider `72951:34134` | Divider |
| Drop zone `657:219` | Upload |
| Empty state `7534:0` | IndexTable `emptyState` prop |
| Inline error `50638:21000` | TextInput/SelectInput `error` prop |
| Option list `441:3720` | OptionList |
| Page `345:1992` + Page actions `922:4327` | Page (`primaryAction`/`secondaryActions`) |
| Pagination `931:125` | Pagination |
| Popover `395:4226` | Popover |
| Progress bar `5540:54` / Spinner `7913:9305` | Skeleton / Btn `loading` |
| Radio button `395:2170` | RadioButton |
| Select `364:2186` | SelectInput |
| Skeleton body/display/thumbnail `62007:*` | Skeleton / SkeletonGroup |
| Step Grid `84893:4317` | Stepper |
| Tabs `898:0` | Tabs / TabPanel |
| Toggle `84937:19912` | Toggle |
| Tooltip `2098:94` | Tooltip |
| Listbox `110421:5092` | SearchSelect |
| Avatar `462:3886` | TopBar `userAvatar`/`userInitials` |
| Action List `254:440` | TertiaryActions / MenuDrawer items |
| Data table `5504:1727` | IndexTable (prefer it) |

**Figma-only (no Poltail equivalent yet — using one in a design = DS ticket):**
Account Connection, Callout card, Color picker, Contextual save bar, Description list,
Exception list, Filters / Index filters, Footer help, Fullscreen bar, Keyboard key,
Media card, Range slider, Resource list, Thumbnail / Video thumbnail, WYSIWYG.

**Poltail-only (no Figma page yet — design-side gap, mirror rule applies):**
Accordion, AiChat, AppShell, BottomSheet, Cell, EquipmentCard, MenuDrawer, MetricCard,
NavCard, NumberInput, OptionCard, Overlay, SlideOver, SubmissionSuccessCard,
TemperatureTasksCard, TextareaInput, Toolbar.

## TODO
- [x] Confirm Figma-side component names against the library (done via Figma desktop, full page inventory above).
- [x] Barrel export `src/index.js` (done; regenerate via `npm run gen-barrel`).
- [ ] Per-component variant→prop mapping for the newly confirmed components (fill in as each is first used).
- [ ] Decide whether the Poltail-only components get Figma pages (mirror-rule backlog).
- [ ] Expand the Phosphor→Polaris table as icons are encountered.

---

## The top bar — canonical source and how to place it  (2026-08-24)

**Corrected finding.** The top bar in this file is a **`GROUP`**, and that is *deliberate* — it is
Raf's own canonical pattern, used throughout the **Design Rep** page. Do **not** "fix" it by
swapping in the DS library's `Top bar` component: that component is the generic **Polaris** bar
(Logo · Search field · User menu) and is **not** the ColdTrace bar. An earlier pass mis-diagnosed
the group as a hand-rolled lookalike and briefly replaced it — wrong, and reverted.

**Canonical source of truth: the Design Rep top bar group `8483:64221`.** Clone it. Its structure:

```
Top bar [GROUP]                      1440×56 at y=0
├── Top bar [FRAME]                  Logo(240) · Search(957) · Right content [INSTANCE](243)
│                                    Right content ▸ Sidekick · Secondary menu · User menu
├── Language [INSTANCE]              x=811, y=18, 20×20
├── Breadcrumb [INSTANCE]            x=80,  y=14
└── Actions [INSTANCE]               x=1174, y=14, 98×28 — the country pill ("Kenya")
```

Rendered left→right: **breadcrumb · AI Chat Bot (beta) · Kenya ▾ · apps · notifications · avatar**
— which matches what `AppShell`/`TopBar` renders in the prototype.

**What was actually wrong in the Sandbox frames** (all three, since state frames are duplicates):

| Defect | Canonical | Sandbox (before) |
|---|---|---|
| `Right content` | **INSTANCE** of `Right content` | detached plain `FRAME` |
| `Actions` (country pill) | sibling inside the group, x=1174, w=98, label `Kenya` | nested *inside* `Right content`, w=78 |
| Breadcrumb home crumb | text `Button` reading **Home** | `Icon only` instance |
| Breadcrumb trail | screen-specific | leftover `Equipment Management › Equipment Details` |

**Procedure — clone, don't rebuild:**

1. `setCurrentPageAsync(Design Rep)` → `getNodeById('8483:64221').clone()`.
2. `setCurrentPageAsync(Sandbox)` → `frame.appendChild(clone)`, `clone.x = clone.y = 0`.
3. Re-insert at the nav's index so order is **content → Line → Top bar → Closed Navigation** —
   the side nav must sit **above** the bar so the rail logo shows.
4. Load `Inter Regular` + `Medium`, then retarget the breadcrumb text to the screen
   (e.g. `Home › Temperature Readings › Daily`) and hide the `...` truncation frame when there are
   only three crumbs.
5. Remove the old group, then **read back every frame** and screenshot to confirm.

**Standing lesson.** Structure that looks wrong may be the house pattern. **Diff against the
canonical reference before declaring a defect** — compare node types, child order and geometry
against Design Rep, and only then call something broken. Saying "this is a lookalike" without that
diff produced a wrong rule that had to be retracted.

## Parity is textual, not just structural  (2026-08-24)

Raf caught a subtitle — `"Cold-chain submissions across facilities"` — that existed in the
prototype's `<Page>` but **not** in the Figma header. Structure matched; content didn't. His call:
drop it from the prototype (Figma's header is title-only).

**The gap in my method:** I had been diffing *components and geometry* and calling that parity.
It isn't. **Every visible string must exist on both sides, and nowhere else.**

**Do this on every parity pass — both directions:**

1. Pull every visible string from the Figma frame, sorted by position:
   ```js
   content.findAll(n => n.type === 'TEXT' && isVisible(n))
     .sort((a,b) => (a.absoluteBoundingBox.y - b.absoluteBoundingBox.y)
                 || (a.absoluteBoundingBox.x - b.absoluteBoundingBox.x))
     .map(t => String(t.characters).replace(/\s+/g,' ').trim())
   ```
   (`isVisible` must walk **ancestors** — a visible text node inside a hidden parent still returns
   `visible === true`.)
2. List the prototype's rendered strings — title, subtitle, action labels, KPI titles/values/badges,
   banner copy, column headers, every cell, empty-state copy, toast copy.
3. Diff **both ways**. Extra-in-prototype is as much a defect as missing-in-prototype.
4. State the count in the report (e.g. "48 strings, both sides") so the check is visibly done.

Temperature Readings baseline: **48 strings**, matching.

**Standing lesson.** "The components match" is not parity. Diff the words too, and say the number.

## Code name ≠ Figma name — search both  (2026-08-24)

I searched the v2.1 library for **"Option card"** (the name the code uses), got nothing, and declared a
DS gap in an annotation panel. Raf corrected it: the component exists as **`Option list`**
(`f087159f60fa6e321efd069242fca3ba07671aca`), with variants
`Allow multiple = false|true` × `Media = false|true`. The `Media=true` variant *is* the icon + label
tile used on the Scan QR screen.

This is the **second** false-gap claim (after Metric Card / PD-32). The rule "run several short
single-concept searches" wasn't enough on its own, because I only searched the concept **as the code
names it**.

**Added rule:** before claiming a gap, search **both vocabularies** —
- the **code** name (`OptionCard`, `SearchSelect`, `MetricCard`), and
- the **Figma** name, which tends to be Polaris-flavoured and spaced (`Option list`, `Search field`,
  `Metric Card`, `Text field`, `Index table`).

Then scan the DS file's **page list** — each component has its own page, so the page names are a
complete inventory. A gap is only real when both vocabularies and the page list come up empty.

Known code → Figma name pairs:
`OptionCard` → **Option list** · `TextInput` → **Text field** · `TextareaInput` → **Multiline field** ·
`NumberInput` → **Number field** · `Btn` → **Button** · `IndexTable` → **Index table** ·
`MetricCard` → **Metric Card** · `SelectInput` → **Select** · `RadioButton` → **Radio button**.

## Figma generation specs — Raf's guides are the authority  (2026-08-25)

Raf drops **screen-generation specs** for Figma work (first: `PROTOTYPE-C-FIGMA-SPEC.md`, in the
prototype's own folder). When one exists it **outranks my reading of the prototype, the code, and
any existing Figma page.** Read it end-to-end *before* generating a single frame.

**Why this rule exists:** on the Add Equipment flow I built 24 frames from field labels, then 7 from
a borrowed template, before the spec surfaced. It already contained the verbatim copy, the field
specs, the enable rules, the build order and the deep links. Every frame I'd made had to be redone.

### How to work from a spec

1. **Read §0 product rules first.** They explain *why* screens look the way they do — compose with
   the logic, not just the pixels.
2. **Read the "what NOT to draw" section before building.** Older Figma pages still contain removed
   patterns; without this you will faithfully copy something that was deliberately deleted.
   For Add Equipment that's: provider/integration pickers, connect screens, **Access code** fields,
   region select, min/max alarm inputs, compartment selects, free-text sensor serial, hard-stop
   location gating.
3. **Follow its build order and frame count** — it is the checklist. Report progress against it.
4. **Use its deep links** (`?proto=c&state=<id>`) to screenshot-match each frame against the live
   prototype rather than eyeballing.
5. **Treat its copy as verbatim.** Don't paraphrase labels, help text or button strings.
6. If the spec and the canvas disagree, the spec wins — and say so rather than silently picking one.

### Chrome rules this spec established (they generalise)

- **Breadcrumb depends on shell level.** Entry screens render at AppShell **secondary** →
  `Home / Manual Temp. Recording / Scan QR Code`. Wizard steps render at **tertiary** →
  `Home / Manual Temp. Recording / Add Equipment`.
- **The page subtitle varies by branch**, it isn't one string. Add Equipment has three, by
  monitoring method (rtmd / external / none).
- **Stepper spine length varies by branch too** — RTMD 4 phases, third-party 4, unmonitored 3.
  Below 920px the Stepper switches to its compact variant.
- Each step carries a **title (16/650) *and* a subtitle (13/450 subdued)** — not title alone.

## Figma scripting — the four traps that cost the Add Equipment build  (2026-08-25)

Building 59 frames surfaced four failure modes, each of which silently produced a *wrong but
plausible* result. All four are now checked automatically before presenting work.

**1. Text inside an instance is a component property, not a text node.**
`node.characters = "…"` on a nested instance appears to succeed and then renders the old value.
Page titles, subtitles, breadcrumb chips and button labels are all property-driven.
→ Find the key matching `/Label content|Title content|Subtitle content|Help content/` and call
`inst.setProperties({ [key]: value })`. Keep the raw-text write only as a fallback.

**2. `resize()` and `primaryAxisSizingMode` do not grow an auto-layout frame — `layoutSizingVertical
= 'HUG'` does.** A modal sat at 244px through two attempted fixes while six fields were clipped
inside it. Order matters: children HUG → stack HUG → content HUG → *then* measure → then resize the
parent. Setting `layoutSizingHorizontal = 'FILL'` on a banner also collapses it to 1px unless
vertical HUG is set too.

**3. Nodes invalidate mid-iteration.** `findAll()` then mutating throws
`Node with id "…" not found` on nested instances (`.button-shine` is a frequent casualty), and the
script is atomic so the whole batch is lost.
→ Snapshot `.map(n => n.id)` first, re-fetch with `getNodeById` inside the loop, and skip
`!node || node.removed`.

**4. Prefix matching hits the wrong node.** Anchoring to "the field whose label starts with
`Facility`" matched the **stepper step** labelled *Facility & Contacts*, so a derived region line and
a banner were injected into the stepper. → Match the label **exactly**, and additionally check the
node's component family (`/Text field|Select/`) before treating it as a form field.

**And the meta-rule:** a returned success value is not evidence. Every one of the above returned a
clean result object while the canvas was wrong. **Screenshot after every mutation**, and on a
network or SSE error **re-read state before retrying** — one write landed while its response was
lost, and a blind retry would have double-applied it.

### Standing audit before presenting any Figma set

Run these over every frame in the section, not a sample:
- forbidden patterns from the spec's "what NOT to draw"
- placeholder residue: `^Label$`, `^Value$`, `^Error message$`, `Write here`, template-file names
- visible template artefacts (`__field_template`, `__form_stack`)
- content overflow: stack bottom vs frame bottom
- state count vs the spec's checklist

The Add Equipment run found 15 real issues this way — inherited placeholders and stale footer
labels — that no screenshot spot-check had caught.
