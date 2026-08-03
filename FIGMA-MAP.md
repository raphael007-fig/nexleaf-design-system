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

In code the equivalent is `AppShell` (supplies TopBar + SideNavigation) wrapping `Page`.
A prototype that renders only a content column is incomplete.

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

## Mirror rule — prototype ⇄ Figma parity (BINDING)

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
