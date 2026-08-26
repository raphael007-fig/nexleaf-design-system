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

## Sections — moving one does NOT move its children  (2026-08-25)

The single worst trap of the Add Equipment build, because it silently destroys other people's work.

```js
section.x = 27000;   // moves the SECTION RECTANGLE ONLY
```

Children keep their absolute coordinates. The result: an empty section rectangle in the new
position, and every frame still sitting where it was — in our case directly **on top of Raf's
existing Changes-page designs**, which is what he saw as "blank white" sections.

**Always move children by the same delta:**

```js
const kids = section.children;
const minX = Math.min(...kids.map(c => c.x));
const minY = Math.min(...kids.map(c => c.y));
const dx = (section.x + PAD) - minX;
const dy = (section.y + PAD) - minY;
for (const c of kids) { c.x += dx; c.y += dy; }
// then re-hug the section around its children
```

**Before placing anything on a shared page**, compute the right edge of everything already there
and start well clear of it:

```js
const others = page.children.filter(c => !mine.includes(c));
const startX = Math.ceil(Math.max(...others.map(c => c.x + c.width)) / 1000) * 1000 + 3000;
```

Then assert zero overlap between every new section and every pre-existing node, and report the
number. Do not rely on the canvas looking right in a screenshot — `get_screenshot` on a section
renders from page origin, so a section far to the right looks like a mostly-empty image either way.

### Section layout conventions that came out of this

- **One section per user-facing flow**, stacked top→bottom, not one section per build-group.
  For Add Equipment: shared entry · MONITORED (Nexleaf RTMD) · BUILT-IN/3RD PARTY · UNMONITORED ·
  ERRORS & EDGE CASES · SHARED modals.
- **Within a section, rows read left→right as a journey.** Happy path is the first row; variants and
  edge cases go in rows beneath it.
- **On-canvas row labels** (Inter Bold 28, grey) so the board is scannable without reading layer names.
- **Annotation panel pinned top-right of each section**, and it must explain *what makes this flow
  different from the others* — not just what the screen does.
- **A frame can only live in one place.** If a screen belongs to two flows, clone it; otherwise
  moving it into the second section silently removes it from the first. This cost two frames
  (B3, S7) that vanished from their rows.

## Hidden nodes are not "fine" — they are the defect  (2026-08-25)

Three separate audits passed while the frames were visibly wrong, because the checks counted
`findAll` results (which include hidden nodes) and the fixes only touched visible ones. One pass
deleted **127 hidden leftover fields** — `Installation Date`, `Installed By`, `Facility Name`,
`Country`, `Follow up action?`, plus duplicate `Configuration date` and `Facility` instances.

Rules:

- Compute **effective visibility** by walking to the frame, not `node.visible` alone.
- An audit reports hidden children of a form container as a **failure**, not a pass.
- Delete strays rather than hiding them. Hidden ones come back in the next audit as phantom
  duplicates and waste a whole cycle.
- `findAll` snapshots go stale the moment you remove a node. Snapshot **ids**, re-fetch with
  `getNodeByIdAsync`, and skip `removed`. Nodes whose id contains `;` are inside an instance —
  they can be re-propertied but never removed or resized.

## Text field anatomy — the five things that are always wrong  (2026-08-25)

The DS `Text field` set: `Label` · `Help text` · `Prefix` · `Suffix` · `Clear button` · `Label
action` (booleans) + `↪️ Label content` / `↪️ Help content` (text) + variants
`State: rest|hover|active|focus|disabled|read only|error` · `Tone` · `Borderless` · `Size`.
The value lives on a nested `Input text` instance: `Type: value|placeholder` +
`↪️ Value content` / `↪️ Placeholder content`.

1. **`Prefix` defaults on in cloned instances** and renders a location pin on every field. Set it
   `false`. `Suffix` (chevron) belongs only on selects and dates.
2. **Placeholder ≠ value.** Set `Type` as well as the string, or a filled field reads grey and an
   empty one reads as data.
3. **Help text is `textAutoResize = NONE`** — two-line help overlaps the next label. Set
   `textAutoResize = 'HEIGHT'` and `layoutSizingVertical = 'HUG'` on the help TEXT.
4. **Resizing the instance does not widen the input.** Set the instance
   `layoutSizingHorizontal = 'FIXED'` + `resize(w, h)`, *then* set each child FRAME
   (`Label`, `Input`) to `FILL`. Pick one width for every control on a screen — 480 here.
5. **`State: error` renders its own message.** Don't also switch on Help text or the error prints
   twice.

Node **names go stale** after reordering — always read the `Label content` property, never
`node.name`, and rename the node to match once you're done.

## Screens grow; the chrome doesn't follow  (2026-08-25)

After content is fixed, four things still need re-fitting, in this order:

1. card column → `layoutSizingVertical = 'HUG'`
2. screen frame → `resize(w, 56 + column.height + 32)` (frames are `layoutMode: NONE`)
3. left rail → `resize(56, frame.height - 56)`
4. modal overlay → the dim layer is inside a top-level **`Loader`** instance; resize *that*,
   not the `Overlay` rectangle inside it (which is instance-nested and refuses). Then recentre
   the `Modal` frame, and move anything you anchored to it by the same delta.

Then re-flow the section rows — heights changed, so the next row will be sitting inside the
previous one. Assert zero overlap between every pair of section children afterwards.

**Cloned buttons inherit `opacity: 0`** if you happened to clone a hidden one (`Save Draft` in the
footer is the usual culprit). Set `opacity = 1` on the clone *and* its descendants, and turn
`Icon` off unless you meant to keep the source's icon.

## Modal slots DO take real component instances  (2026-08-25) — corrects an earlier assumption

I believed a frame inside a `Modal` couldn't accept children, and floated a `Button` over the
modal as a sibling of the screen frame instead. **Wrong.** Raf fixed it by hand and told me to
look at what he did: he dragged the buttons **into `.slot examples`**.

The reason is the node types, and they must be checked before assuming anything:

```
Modal            FRAME      ← plain frame assembly, not an instance
├── Title bar    INSTANCE
├── Content      FRAME      ← accepts children
│   └── .slot examples FRAME  ← accepts children — put DS instances HERE
├── Footer       INSTANCE   (Secondary action / Primary action inside it)
└── Cancel button INSTANCE  (the X)
```

Only nodes whose **id contains `;`** are instance-nested and closed to structural edits. The
`.slot examples` children read `id=top`, so `appendChild` / `insertChild` works normally.

Rule: **read `node.type` and the id before concluding you can't place a component.** Floating a
control over a modal is a bodge — it breaks the moment the modal is recentred or resized.

Related: modal footers ship with both a `Secondary action` and a `Primary action`. Cancelling is
a secondary action — don't leave `Cancel` + `Cancel scan` side by side, and hide the `Cancel
button` X where the spec says the dialog has no dismiss.

## Field value colour is a bound variable, and it does NOT follow the `Type` variant  (2026-08-25)

The `Input text` sub-instance has `Type: value|placeholder`, but the `Value` text node's fill is
bound to a colour variable that stays wherever it was last set. Result: **55 placeholders were
rendering in the value colour** (they read as real data) and **7 real values were rendering in the
disabled colour** (they read as placeholders). Raf spotted it as "Sensor A" looking greyed on the
*selected* frame.

- value → `Color/text/text-secondary` (97,97,97)
- placeholder → `Color/text/text-disabled` (181,181,181)

Set both the variant **and** the bound variable:

```js
const fills = JSON.parse(JSON.stringify(t.fills));
fills[0] = figma.variables.setBoundVariableForPaint(fills[0], 'color', wantedVar);
t.fills = fills;
```

Audit rule: compare `Type` against the rendered fill on every field. They disagree silently.

## `get_screenshot` caches per node id  (2026-08-25)

After a mutation, requesting the same `nodeId` can return the **previous** image — twice in a row,
including with `contentsOnly` toggled. I nearly "re-fixed" a modal that was already correct.

- Confirm a write by **reading the geometry back**, not by looking at a screenshot.
- To force a fresh render, screenshot a **different** node — the parent section is ideal, and it
  doubles as the row-layout check.

## Add Equipment breadcrumb trail  (2026-08-25) — corrects the spec

Raf: *"the breadcrumbs in all these screens are wrong — it's meant to be Home, Coldchain
Equipment, Add Equipment."*

**Every screen in the Add Equipment flow reads the same trail:**

```
Home › Coldchain Equipment › Add Equipment
```

All three crumbs are text `Button` instances (`Variant=tertiary`), the last one `State=active`.
No icon-only Home, no per-step last crumb.

This supersedes `PROTOTYPE-C-FIGMA-SPEC.md` §1, which said entry screens use
`Home / Manual Temp. Recording / Scan QR Code` and wizard steps use
`Home / Manual Temp. Recording / Add Equipment`. Both were wrong on two counts: the middle crumb
is **Coldchain Equipment** (the module the flow is entered from), and the scan/entry pages do
**not** get their own last crumb — scanning is a step *inside* Add Equipment, not a sibling
destination. The success pages get the full trail too; they previously showed a lone `Home` chip.

Applies to the prototype as well — `BREADCRUMBS` in `states.jsx` / `statesB.jsx` / `statesC.jsx`.
Keep the two in parity; the shell level still switches secondary→tertiary by step, only the trail
is now constant.

## Primary buttons are BLUE — `fill-emphasis`, not `fill-brand`  (2026-08-25)

Raf: *"fix all the black buttons to be blue."* 33 enabled primaries across the Add Equipment set
were bound to **`Color/bg/fill/fill-brand`** (48,48,48 — near-black) instead of
**`Color/bg/fill/fill-emphasis`** (0,91,211). They had been inherited from a cloned source.

This is not a preference call — the code side settles it:

```js
// src/tokens/index.js
COLOR_PRIMARY = '#005bd3';   // = rgb(0,91,211) = fill-emphasis
```

`Btn` variant `primary` renders `COLOR_PRIMARY`, so the prototype was always blue and **Figma was
the side out of step**. Whenever a colour looks off in Figma, resolve the code token before
deciding which side is wrong.

Leave alone — these are *meant* to look dark-but-faint:

| Token | Where | Renders |
|---|---|---|
| `fill-brand-disabled` @ 17% | disabled + loading primaries | light grey |
| `fill-transparent-active` | breadcrumb current-page chip | light grey pill |

A raw RGB check flags all three as "dark". Filter by the **bound variable name**, not the colour.

## Mobile: 375 conversion recipe  (2026-08-25)

Canonical source is the **Design Rep → “Mobile And Ipad Screen Layout”** section. Don't invent
mobile chrome; clone these:

| Part | Node | Size |
|---|---|---|
| Status bar (`Component 2`) | `8483:118168` | 375×44 at y=0 |
| `Mobile Top Nav` | `8483:121743` | 375×52 at y=44 |
| `Bottom sheet` (notch / `Sheet header`) | `8483:121973` | 375 wide |

Layout: content column **x=16, width 343**, starting at **y=96**. Frame height
`max(812, column bottom + 24)`.

Conversion steps, in order:

1. Clone the desktop frame, `resize(375, h)`.
2. Remove the `Top bar` GROUP and the 56px `Closed Navigation` rail.
3. Append the status bar and `Mobile Top Nav` clones.
4. Move the content column to 16,96 and resize to 343.
5. **Stepper → compact.** Keep **every** step circle visible with its dashed connectors, blank
   each step's `Details` so the circles are unlabelled, and add a separate
   `Step N of T · <label>` line beneath, indented to the card's 24px gutter.
   **Do NOT reduce this to a single circle** — I tried that on 2026-08-25 and Raf sent back the
   reference: the whole run stays visible on mobile so progress is legible at a glance.
   The connector `LINE` nodes are absolutely positioned and keep their desktop geometry — re-span
   each one between adjacent circle centres (`cx + r + 8` → `next.cx − r − 8`) or they shoot off
   the right edge.
6. **Recursive fit.** Anything wider than its container gets `layoutSizingHorizontal = 'FILL'`.
   A single pass on the column is not enough — entry screens nest three levels of fixed-width
   frames, and they bleed outside the card until you recurse.
7. **Review rows must stack.** The desktop row is HORIZONTAL with a FIXED 220px label column, so
   at 343 the value gets ~51px and shreds. Flip each row to VERTICAL, both texts `FILL` + `HUG` —
   label above value.
8. **Page header:** hide the page-level `Actions` slot (it's HUG 248 and empty on these screens),
   set `Header` and `Title wrapper` to `FILL`, subtitle `textAutoResize = 'HEIGHT'`. Without this
   the subtitle clips; hide `Actions` *after* setting FILL or the title wraps to one word per line.
9. **Modals → bottom sheets:** width 375, `x=0`, `y = frame.height − sheet.height`, top corners
   16 / bottom 0, prepend the cloned `Sheet header` notch, hide the `Cancel button` X.
10. Resize the `Loader` overlay to the final frame height, then re-pin the sheet.

## Overlay + layout order — Raf's reference  (2026-08-25)

He sent **E2 (Scanner running, mobile)** as the model and said "adjust all". Child order on a
screen frame, **back → front**:

```
0  content column        (x=16 mobile / x=80 desktop)
1  status bar            375×44 at 0,0        ← mobile only
2  Mobile Top Nav        375×52 at 0,44       ← mobile only  (desktop: Top bar GROUP)
3  Loader                full frame at 0,0    ← the dim overlay, ABOVE the chrome
4  Modal / sheet         frontmost
```

Two things this pins down:

- **The dim layer covers the chrome too.** The `Loader` sits above the top nav and status bar, not
  behind them. Resize it to the *final* frame height — it is the node to resize, not the `Overlay`
  rectangle inside it, which is instance-nested and refuses.
- **The modal is always the last child.** Mobile: `x=0, y = frame.height − sheet.height` (pinned
  bottom, top corners 16). Desktop: centred both axes.

Re-assert this order after any height change — `appendChild(loader)` then `appendChild(modal)` is
the cheap way to do it.

## Annotation panels carry the tone of what they describe  (2026-08-25)

Raf: *"any annotation tied to error or warning should be in red or yellow light fill."*
Use the DS Banner surfaces so the board matches the components:

| Tone | Fill | Use on |
|---|---|---|
| info | `234,244,255` | default — behaviour, rules, flow explanations |
| warning | `255,241,227` | blocked permissions, offline, not-found, "no readings yet", open decisions |
| critical | `254,233,232` | validation conflicts, submit failure, and the ERRORS section panel |

A note explaining a red screen should not be blue.

## Horizontal padding is the #1 thing that survives a desktop→mobile clone  (2026-08-26)

Three separate corrections from Raf, all the same defect: an inner frame kept a desktop-scale side
padding, so the mobile content was squeezed.

| Where | Was | Should be | Content width |
|---|---|---|---|
| Success card | `32/48/32/48` | `32/16/32/16` | 247 → **311** |
| Entry card inner frame | `0/40/0/40` | `0/0/0/0` | 231 → **311** |
| Wizard card | — | `0/24/0/24`, children at 0 | **295** |

The gutter belongs on **the card**, never on its children. After any clone, walk the subtree and
check `paddingLeft` / `paddingRight` at every level — the visible symptom is text wrapping far
earlier than the card edge.

**And don't over-correct.** Zeroing every padding ≥ 24 also wiped the legitimate 24px wizard
gutter. Fix the specific frames you diffed, not everything that matches a threshold.

## Mobile chrome differs by shell level — tertiary has NO top nav  (2026-08-26)

Raf: *"this is a tertiary mobile page, we don't need the mobile top nav there… most tertiary pages
have a back button in their headers."* Reference: Design Rep `8483:120121`.

| Level | Mobile chrome | Used by |
|---|---|---|
| **secondary** | status bar 375×44 **+ `Mobile Top Nav` 375×52** · content at y=96 | entry / scan / method / success |
| **tertiary** | status bar 375×44 **only** · content at y=52 | every wizard step |

On tertiary the **back arrow in the `Page` header is the only way back** — that's why the nav is
redundant. Don't add both.

This matches the prototype exactly: `SECONDARY_STEPS = new Set(['search','entry','method','success'])`
in `states*.jsx`, with `level = onScanPage ? 'secondary' : 'tertiary'`. **The code already encodes
the answer** — check it before deciding chrome by eye.

## A phone frame is 812 — the content behind a sheet CLIPS  (2026-08-26)

Raf's rule, from his corrected S1: *"the frame should not be too long when the bottom sheet is
small… it should take the height of the actual mobile frame size."*

Mobile frames with a bottom sheet had been grown to fit the whole underlying form (1493–1513px),
which is not what a phone shows. Correct:

```js
frame.height = Math.max(812, sheet.height + 96);   // 96 keeps some backdrop visible
frame.clipsContent = true;                          // the form behind simply scrolls off
sheet.y = frame.height - sheet.height;              // pinned bottom
loader.resize(375, frame.height);                   // dim layer follows
```

The long underlying column is fine — it is *meant* to be clipped. Only grow past 812 when the
**sheet itself** needs the room.

Same principle for the contacts list: **paginate rather than stretch.** More than **5** contacts on
mobile, more than **10** on desktop → show one page plus the DS `Pagination` component and a
`Showing 1–N of T` line. A screen that scrolls for 1,500px is a layout failure, not a long list.

## Text nodes contain NON-BREAKING SPACES  (2026-08-25)

A copy fix reported success and changed nothing, twice. The cause: the text was
`1 registered record…` — **char 160, not char 32** — so `/registered record/` never matched,
`find()` returned `undefined`, and the guarded write was skipped silently.

**Normalise before matching, always:**

```js
const norm = (s) => String(s).replace(/[   ]/g, ' ').trim();
```

This also means every content audit written with literal spaces has a blind spot. The placeholder
sweep, the copy checks, the duplicate-label checks — all of them need `norm()`.

And the deeper rule it proves: **a guarded write that finds nothing looks identical to a guarded
write that succeeded.** Return the value you just wrote, not a "done" string.

## Cloning: check `visible` AND `opacity` on the source  (2026-08-25)

Two separate hours lost to the same trap. Cloning a node that is hidden or transparent produces a
clone that is also hidden or transparent, and the script reports success:

- `Save Draft` in the footer is `opacity: 0` → 84 invisible button clones
- the `Badge` in A8 is `visible: false` → 52 invisible "Added" badges

Before cloning: assert the source renders. After cloning: set `visible = true`, `opacity = 1` on
the clone **and its descendants**, then read back the rendered size.

## Screenshots only render the desktop app's ACTIVE TAB  (2026-08-25)

`get_screenshot` on a node that lives on a **non-active page** either returns a blank render or
errors with *“No node could be found … make sure the document containing the node is the active
tab.”* `figma.setCurrentPageAsync()` inside the plugin does **not** make that page the app's
active tab.

So: build on the page that's currently open, verify visually there, then **reparent the finished
sections** to their destination page at the end. `page.appendChild(section)` moves the whole
subtree — unlike setting `section.x`, which leaves children behind.

## Toasts belong to one frame only  (2026-08-25)

A generic `Form Submitted Successfully` banner had been cloned onto **all five** success frames,
and on A14 it sat on top of the real submission toast — two toasts, one of them tone `warning`.
The submission toast fires only on the post-submit frame, tone `success`, top-right. Everywhere
else: no toast. Check for stacked overlays at the top-right of every frame, not just the one you
are editing.

## Only reflow sections you own  (2026-08-26)

The board auto-layout loop selected *every* `SECTION` on the page. Raf's own scratch section,
**Update**, got swept into the 6-per-row grid and repositioned — 16 frames moved, its 3 loose
`INSTANCE` children left behind (the loop only iterated frames), so it came out scattered.

Rules now:

- Reflow operates on an **explicit allow-list** of the Prototype C sections, never `all sections`.
- Any section that is not mine carries `setSharedPluginData('nexleaf.parity','owner','raf-scratch-do-not-reflow')`
  and is skipped.
- A reflow that moves frames must move **all child types**, not just `type === 'FRAME'`.
- Park foreign sections clear of the board (`x = 12000`); the Prototype C board starts at `x = 24100`.

Exact restore for a section that has already been re-gridded: Figma **version history** → pick the
version from before the run → copy that section → paste. Nothing in the Plugin API recovers prior
positions.

## `CENTER/CENTER` constraints were the cause of the recurring column drift  (2026-08-26)

Every mobile column had `constraints = CENTER/CENTER` inherited from the desktop clone. So each
time `frame.resize()` ran to refit the height, Figma **moved the column** to keep it centred — the
column crept down, the frame was refit against the new position, and the drift compounded. This is
what I kept "fixing" and kept coming back (A9 at y=99, U4 135, B7 140, X11 2, E11–E13 28/36/44).

Fix, applied to all 66 mobile frames:

```js
col.constraints = { horizontal: 'MIN', vertical: 'MIN' };      // page body pins top-left
chrome.constraints = { horizontal: 'STRETCH', vertical: 'MIN' }; // status bar + top nav
```

and **re-assert `col.y` after every `f.resize()`**, never before only.

### Mobile column offset convention

| screen | column `y` |
|---|---|
| tertiary (wizard step, no top nav) | **52** |
| secondary (has Mobile Top Nav) | **172** |
| secondary with a toast | **198** |

48 frames already agreed on 52 and 10 on 172 — the outliers were drift, not intent. Derive the
convention from the majority before "fixing" anything.

## Classify chrome by content, not by frame-name prefix  (2026-08-26)

I asserted secondary/tertiary from the key prefix (`E*`, `X*`, `S*`, `U*`) and produced 20 false
positives. The real test is **does the screen carry a wizard stepper**:

```js
const tertiary = !!f.findOne(n => n.name === '__step_counter_row' || /Stepper/i.test(n.name))
              || !!f.findOne(n => n.type === 'TEXT' && /^Step \d+ of \d+/.test(norm(n.characters)));
```

Tertiary → no Mobile Top Nav, back arrow lives in the header. Secondary → Mobile Top Nav.
Run that check before reporting; a prefix is a naming habit, not a contract.

B9 and U5 turned out to have their stepper circles but **no `__step_counter_row`** — the run of
circles alone is not the compact stepper, the "Step X of Y · Label" line is part of it.

## Component property keys carry a literal `↪️ ` prefix  (2026-08-26)

Exposed nested properties are keyed with the arrow glyph **in the string**:

```
"↪️ Placeholder content#108611:12"   ← the real key
"Placeholder content#108611:12"      ← throws: Could not find a component property with name
```

Never hardcode these. Resolve by regex against the live instance:

```js
const keyOf = (n, re) => Object.keys(n.componentProperties || {}).find(k => re.test(k));
it.setProperties({ [keyOf(it, /Placeholder content/)]: '' });
```

## Mixed-font text: `loadFontAsync(t.fontName)` throws  (2026-08-26)

`__step_counter` is two runs — `Step 3 of 4 · ` Inter Regular + `Monitoring Device` Inter Semi Bold
— so `t.fontName` is `figma.mixed` and passing it to `loadFontAsync` fails with
*“Cannot unwrap symbol”*. Load each face, set the string, then restore the runs:

```js
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
t.characters = lead + bold;
t.setRangeFontName(0, lead.length, { family: 'Inter', style: 'Regular' });
t.setRangeFontName(lead.length, t.characters.length, { family: 'Inter', style: 'Semi Bold' });
```

Inspect runs first with `t.getStyledTextSegments(['fontName'])`.

A plugin run that throws **rolls back the whole run** — earlier successful edits in the same call
are discarded. Re-read state after a failure rather than assuming a partial apply.

## Tag input: a real DS gap  (2026-08-26)

`Text field` has no multi-select / tag variant, and its `Input` row is inside the instance, so
`appendChild` fails with *“New parent is an instance or is inside of an instance.”*

Interim composition used on **A20** (desktop + mobile): blank the field's placeholder via its
property, then overlay a `__contact_tags` auto-layout frame of real `Badge` instances positioned
inside the input box. `Badge` has a **`Cancel` variant** — `Cancel=true` is the removable ✕ tag.

- desktop: `John Zulu · +254 711 100 100` (Cancel=true) + `+ 2 others` (Cancel=false)
- mobile: `John Z…` (Cancel=true) + `+ 2 others` (Cancel=true) — name truncates to fit 311px

Assert `insideBox`, `vCentred`, and an ≥8px gap to the suffix chevron. Proper fix — a tag-input
Text field variant — is on **PD-16**.

## The board layout bug that made everything look scrambled  (2026-08-26)

Two defects in the same reflow helper, and together they wrecked the whole page:

**1. Section width came from the last row, not the widest row.**

```js
for (const f of frames) { …; x += f.width + 80; }
sec.resizeWithoutConstraints(x + 64, …);   // ← WRONG: x is the final partial row
```

A section whose content reached x=9104 got sized to 3168. Frames rendered *outside* their own
section boundary, and because the next section was positioned with `desktop.x + desktop.width + 600`,
the mobile sections landed **on top of** the desktop frames. Track `maxRight` across every row.

**2. Frames were sorted by their current `(y, x)`.**

After the first bad reflow that order is arbitrary, so each subsequent pass scrambled it further and
interleaved `note ·` frames between screens. Sort by **semantic code**, never by position:

```js
const parse = n => { const m = /^([A-Z]+)(\d+)\s·/.exec(n.name); return m && { p: m[1], i: +m[2] }; };
screens.sort((a,b) => parse(a).p === parse(b).p ? parse(a).i - parse(b).i
                                               : parse(a).p.localeCompare(parse(b).p));
```

### The board layout contract

Every section now reads top to bottom:

```
content            ← the flow intro card ("Flow A — MONITORED… WHEN: user picks…"), y = 112
§ group heading    ← the TEXT node, e.g. "Happy path — 4 steps"
A1 A2 A3 A4 A5     ← screens in code order, 5 per row desktop / 8 per row mobile
  ↳ note · A1      ← the annotation sits 16px under the screen it annotates
§ next heading
…
```

Spacing: `PADX 64 · PADY 112 · COLGAP 80 · ROWGAP 140 · NOTEGAP 16 · HEADGAP 28 · GROUPGAP 180 ·
INTROGAP 120`. Row wrap is by **width budget** (`64 + 5×1440 + 4×80` desktop, `64 + 8×375 + 7×80`
mobile), not a fixed count, so mixed-width children still wrap correctly.

Group membership is read off the frame codes, not guessed:

| section | groups |
|---|---|
| 0 · Shared entry | Happy path E1–E8 · Edge cases E9–E13 |
| A · Monitored | Happy path — 4 steps A1–A9 · Variants A10–A20 |
| B · Built-in / 3rd party | Happy path — 4 steps B1–B7 · Variants B8–B9 |
| C · Unmonitored | Happy path — 3 steps U1–U5 |
| Errors & edge cases | Validation & conflicts X1–X5 · Permission/submission X6–X10 · Empty / first-run X11–X14 |
| Shared | QR assign sequence S1–S4 · Shared modals & responsive S5–S6 |

Mobile pairs sit at `desktop.x + desktop.width + 600`, same `y`. Section pairs stack with a 500 gap.

**Always assert after a layout pass**: no child outside its section
(`c.x + c.width > sec.width`), and no section-to-section overlap. Both must come back empty.

## Read the code component BEFORE filing a DS gap  (2026-08-26)

I filed "Text field has no tag variant, there is no Tag component" on PD-16 and composed the
alarm-contact chips from `Badge`. Both claims were wrong, and thirty seconds of reading would have
shown it:

- **`Tag` exists** — 18 variants in the v2.1 library (`Removable`, `Tone`, `State`, `Label content`),
  and in code at `src/components/Tag/`.
- **The pattern already shipped** — `SearchSelectMulti` has a `tagsInside` prop and the alarm-contacts
  field in `AddEquipmentFlow.jsx` already passes it. Figma was the stale side, not the library.

The code contract for `tagsInside`, which the Figma frames must match:

| | rule |
|---|---|
| chip component | **`Tag`**, not `Badge` |
| first chip | label = the option label (`` `${name} · ${phone}` ``), **removable**, `truncate` |
| first chip width | **clamped to 50% of the input row**, ellipsised past that |
| overflow chip | `+ N others` — **never removable** |
| clear-all | a ✕ before the chevron whenever `selected.length > 0` (Text field's `Clear button` prop) |

That clear-all is what appeared as a "second ✕" in a mobile screenshot; I copied it onto the overflow
chip instead. **When a screenshot shows an affordance, find which element in the code owns it before
redrawing it.**

Standing rule, now proven twice (this and the black-vs-blue primaries): **when Figma and code
disagree, read the code first — it has usually been right.** File the gap only after the component
source says the gap is real.

## Build the state that exists; don't invent a new frame  (2026-08-26)

Asked for "a state showing selected contacts as tags", I cloned A1 and made a new frame **A20**. It
duplicated A17 (`John Zulu + 2 others` *is* three contacts) and contradicted itself — three chips in
the field, zero contact rows beneath, because A1 has no rows. Deleted.

The real defect was on the frames that already existed: A16 and A17 had contacts listed while their
field still read the placeholder. The rule from the workflow applies exactly — **work the whole set,
not the first item; a defect in one is a defect in all of them.**

Before adding a frame, ask: *does an existing frame already represent this state?* If yes, the task is
a fix, not a build. And derive the content from the frame's own data — the chips are now read from
each frame's top contact row, so the field cannot drift from the list beneath it.
