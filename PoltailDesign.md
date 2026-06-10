# Nexleaf Design System Rules

This file governs how all UI work in this project should be implemented. Follow these rules for every design, component, or Figma-driven change.

---

## Project Stack

- **Storybook component library** — source of truth lives in `/src/components/`. Always import from there. The Storybook app itself runs **React 19** (see `package.json`).
- **React 18** via CDN UMD for HTML prototypes (`unpkg.com/react@18/umd/react.production.min.js`)
- **ReactDOM 18** via CDN UMD
- **Babel standalone** — JSX is written inside `<script type="text/babel">` tags in HTML prototypes
- **Inter** font from Google Fonts (weights 400, 500, 600, 700)
- **Styling** — inline CSS in `<style>` blocks + inline `style={{}}` props in React components. No Tailwind, no CSS modules, no styled-components.

### Multi-framework delivery — CSS is canonical (ratified)

**The canonical visual source of truth is `src/tokens/tokens.css` + the shared `nx-*.css` layers.** Both frameworks are views of it: Angular consumes the CSS natively (classes), React mirrors it (inline styles). Design decisions (color, spacing, radius, sizing, states) land in **tokens + CSS first** — never in one framework's component alone. New components are authored CSS-layer-first, then both wrappers.

| Layer | Where it lives | Role |
|-------|----------------|------|
| **Tokens + CSS** (canonical) | `src/tokens/tokens.css` + `src/components/<Name>/<Name>.css` | Single visual source of truth; consumable by Django/vanilla/any stack |
| **Angular** (production) | `angular/projects/nexleaf-angular/src/lib/<name>/`, published as `@nexleaf/angular` with the bundled `styles.css` | What engineering ships |
| **React** (reference) | `src/components/<Name>/<Name>.jsx` | Design playground, HTML prototypes, the richest docs |

**Two delivery surfaces (one system):**
- **React Storybook** (`npm run storybook`, port 6006) — the design/reference environment with full MDX docs.
- **Angular Storybook** (`npm run storybook:angular` / `cd angular && npm run storybook`, port 6007) — the **production-facing** surface: renders `@nexleaf/angular` against the exact bundled `styles.css` the package ships.

Coverage is **full**: every component ships all three layers (42 stylesheets in the Angular bundle), and both surfaces are locked by the visual gate (see "Visual gate"). A few mappings aren't 1:1 by name: `Card` → `nx-card-layout-type1…6`, `Breadcrumbs` lives in the toolbar module (`nx-breadcrumbs`), and React's `Overlay` is a legacy thin wrapper over `Modal` (Angular uses `nx-modal`).

---

## Figma Design System Files

Always reference these three files when implementing designs:

| Purpose | File |
|---------|------|
| **Components** | [Nexleaf Design System v2.1](https://www.figma.com/design/y4XdS2kaiS8eMHY3z8wORP/Nexleaf-Design-System-v2.1--Test-) |
| **Styles / Tokens** | [Nexleaf Styles – Polaris Focused](https://www.figma.com/design/db0FKgCAeJWBYyd1pSnmeg/Nexleaf-Styles--Polaris-Focused-) |
| **Icons** | [Nexleaf Icons V2](https://www.figma.com/design/JhGY89eiVhgdfJMIQMCjNn/Nexleaf-Icons-V2) |

---

## Figma Implementation Flow (Required — do not skip)

1. Run `get_design_context` on the target node to get structured design data
2. If the response is too large, run `get_metadata` first to find the right sub-nodes, then re-fetch with `get_design_context`
3. Run `get_screenshot` for visual reference
4. Translate output into this project's conventions (inline styles, React, HTML files) — not raw Tailwind or framework-specific code
5. Validate the final UI against the Figma screenshot before marking complete

---

## Color Tokens

IMPORTANT: Never hardcode colors outside of this palette. Every color used in the codebase must map to one of these tokens.

### Core Surface & Background
| Token | Value | Usage |
|-------|-------|-------|
| `bg-page` | `#f1f1f1` | Page/app background |
| `bg-surface` | `#ffffff` | Cards, modals, panels |
| `bg-input` | `#fdfdfd` | Text inputs, selects, textareas (default) |
| `bg-input-focus` | `#fafafa` | Input background on hover/focus |
| `bg-disabled` | `rgba(0,0,0,0.06)` | Disabled input backgrounds (text fields — large surfaces) |
| `bg-control-disabled` | `rgba(0,0,0,0.08)` | Disabled background for small controls (Checkbox, Radio, Toggle) — stronger contrast needed at small sizes |
| `bg-error` | `#fee9e8` | Error input background |
| `bg-selected` | `#f0f7ff` | Selected/checked row highlight |
| `bg-open` | `#f7f9fc` | Accordion/section open state |
| `bg-skeleton` | `#e8e8e8` | Skeleton/placeholder block fill (Skeleton primitive, all loading states) |

### Interactive State Overlays
Translucent black overlays for hover/pressed states on neutral surfaces, plus the two opaque grays used by MetricCard. Use these instead of hardcoding overlay values inside components.

| Token | Value | Usage |
|-------|-------|-------|
| `bg-hover-subtle` | `rgba(0,0,0,0.05)` | Tabs hover, MetricCard disabled background |
| `bg-hover` | `rgba(0,0,0,0.06)` | Page back-button hover, Badge default background |
| `bg-pressed` | `rgba(0,0,0,0.08)` | Tabs active tab, MetricCard selected |
| `bg-surface-hover` | `#f7f7f7` | MetricCard hover (opaque, on white surface) |
| `bg-surface-active` | `#f3f3f3` | MetricCard active/pressed (opaque, on white surface) |

### Primary (Interactive)
| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#005bd3` | Primary buttons, links, focus rings, interactive icons |
| `color-primary-hover` | `#004bb0` | Primary button hover background |
| `color-primary-pressed` | `#003a8a` | Primary button pressed/active background |
| `color-primary-disabled` | `rgba(0,0,0,0.17)` | Disabled primary button background |
| `color-primary-hover-shadow` | `rgba(0,91,211,0.12)` | Hover shadow on interactive cards |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `text-default` | `#303030` | Body text, labels, headings |
| `text-subdued` | `#616161` | Secondary text, input icons, **chevron / disclosure / list-affordance icons** (Cell, EquipmentCard, SideNavigation caret, Btn disclosure) |
| `text-placeholder` | `#9e9e9e` | Placeholders, tertiary text (**not** chevrons — those use `text-subdued`) |
| `text-disabled` | `#b5b5b5` | Disabled text and disabled icon strokes |
| `text-on-primary` | `#ffffff` | Text/icons on primary blue backgrounds |

### Borders
| Token | Value | Usage |
|-------|-------|-------|
| `border-default` | `#e0e0e0` | Card borders, accordion borders, dividers |
| `border-input` | `0.66px solid #8a8a8a` | Default input/select/textarea border |
| `border-input-focus` | `0.66px solid #616161` | Input border on hover/focus |
| `border-input-error` | `0.66px solid #8e1f0b` | Input border in error state |
| `border-light` | `#ebebeb` | Subtle dividers, list separators |
| `border-lighter` | `#f0f0f0` | Intra-list separators |
| `border-secondary-btn` | `#c9c9c9` | Secondary button borders |

### Semantic States
| Token | Value | Usage |
|-------|-------|-------|
| `color-critical` | `#d92d20` | Error text, required field asterisk |
| `color-critical-strong` | `#e51c00` | Filled destructive button background, PDF file-type tile |
| `color-success` | `#12B76A` | Success icon fill, indicator dots |
| `bg-success` | `#cdfee1` | Success banner/badge background |
| `text-success` | `#0c5132` | Success banner/badge text |
| `border-success` | `#7be8b4` | Success banner border |
| `bg-warning` | `#fff3cd` | Warning banner/badge background |
| `text-warning` | `#856404` | Warning banner/badge text |
| `border-warning` | `#ffd966` | Warning banner border |
| `bg-info` | `#eaf4ff` | Info banner background |
| `text-info` | `#00527c` | Info banner text |
| `border-info` | `#b3d9f7` | Info banner border |
| `bg-critical-soft` | `#fde2e1` | Subtler error background — error badge circle in Upload |

### Magic Tone (Purple)
Optional purple variant for emphasis or marketing-style tones. Used by Tag (`tone="magic"`) and form controls (Checkbox, RadioButton, TextInput with `tone="magic"`). Tag chips and input fills use different background shades — names are disambiguated.

| Token | Value | Usage |
|-------|-------|-------|
| `magic-text` | `#5700d1` | Purple label/text, checked label in form controls |
| `magic-primary` | `#8051ff` | Strong border (focused/hover) + filled fill on check |
| `magic-secondary` | `#9474ff` | Subtle rest border on unchecked controls |
| `magic-bg-tag-rest` | `#ede7ff` | Tag chip rest background |
| `magic-bg-tag-hover` | `#dcd0ff` | Tag chip hover background |
| `magic-bg-input-rest` | `#f8f7ff` | Input fill on unchecked rest |
| `magic-bg-input-focus` | `#f3f1ff` | Input fill on hover/focus |

### Contextual / Domain-specific
| Token | Value | Usage |
|-------|-------|-------|
| `color-morning` | `#F59E0B` | Morning/day session indicators |
| `color-evening` | `#6366F1` | Evening/night session indicators |

### Responsive / Shell (hybrid AppShell)
Added for the responsive shell + overlays. Use the tokens — don't hardcode z-index, shadow, or shell dimensions inside components.

| Token | Value | Usage |
|-------|-------|-------|
| `z-sticky` | `100` | Sticky TopBar |
| `z-drawer` / `z-overlay` | `1000` | MenuDrawer / SlideOver scrim |
| `z-sheet` | `1100` | BottomSheet (above drawer) |
| `z-toast` | `1200` | Toasts |
| `shadow-overlay` | (elevation) | SlideOver / MenuDrawer panel |
| `shadow-sheet` | (upward) | BottomSheet panel |
| `topbar-h-mobile` / `topbar-h-desktop` | `48px` / `56px` | TopBar min-height |
| `drawer-width-max` | `320px` | MenuDrawer max width (mobile) |
| `sheet-max-h` | `88vh` | BottomSheet max height |
| `tap-target` / `tap-target-comfortable` | `44px` / `48px` | Minimum touch targets |
| `safe-top/right/bottom/left` | `env(safe-area-inset-*)` | Notch / status-bar spacing (web + wrapped app) |

---

## Typography

IMPORTANT: All text must use the Inter font. Never use system fonts.

| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| body | 14px | 400 | Default body |
| label | 13px | 500 | Field labels, input values, secondary text |
| caption | 12px | 400–600 | Badges, footnotes |
| heading-sm | 16px | 600 | Card titles, section headings |
| heading-md | 18–20px | 600–700 | Screen/modal headings |

> **Note on font weights:** Inter is loaded with weights 400/500/600/700, but Polaris's source designs use the intermediate weights **450 / 550 / 650** for body-default / medium / semibold. Both ranges are valid in this system; components in `src/components/` standardize on the 450/550/650 set for visual parity with the Polaris source. New components should pick one set and stay consistent.

---

## Spacing Scale

Use multiples of 4px. Common values: `4` `6` `8` `10` `12` `14` `16` `20` `24`

---

## Border Radius

| Usage | Value |
|-------|-------|
| Buttons, inputs, banners, list containers | `8px` |
| Accordions | `10px` |
| Option-card, checkbox containers | `12px` |
| Proto/navigation cards | `16px` |
| Badges/pills | `100px` (full pill) |
| Status indicator dots | `50%` (circle) |

---

## Input Field Style (shared across ALL inputs)

`TextInput`, `SelectInput`, `SearchSelect`, `SearchSelectMulti`, `TextareaInput` all share identical field styling:

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| Default | `0.66px solid #8a8a8a` | `#fdfdfd` | none |
| Hover | `0.66px solid #616161` | `#fafafa` | none |
| Focus | `0.66px solid #616161` | `#fafafa` | `0 0 0 2px #005bd3` |
| Error | `0.66px solid #8e1f0b` | `#fee9e8` | none |
| Disabled | none | `rgba(0,0,0,0.08)` | none |

- Padding: `6px 12px`
- Font: `13px`, weight `450`, Inter
- Border radius: `8px`
- Error display: error icon (`IcoErrorCircle`) + `13px #d92d20` text below the field

---

## Item Shape & Callback Contract

Every component that takes an array of selectable things — options, choices, tabs, nav items, breadcrumbs — follows one shared contract. Helpers live in `src/foundation/itemShape.js` (`getItemId`, `getItemLabel`); use them instead of reaching into `item.id` / `item.value` directly so the fallback + deprecation warning stay in one place.

### Item shape

```js
{ id, label, disabled?, ...componentExtras }
```

- **`id`** — REQUIRED canonical identity. Emitted by selection callbacks and used for controlled-selection matching. Stable across re-orderings.
- **`label`** — display text (string or ReactNode).
- **`disabled?`** — optional; opts the item out of interaction.
- Component-specific extras stay on the item: `helpText`, `description`, `badge`, `media`, `icon`, `children` (tree nodes), etc.

**`value` is DEPRECATED** as an identity key. It is still honored as a fallback (so legacy call-sites keep working) but logs a one-time console warning per component nudging migration to `id`. New data must use `id`. Note: `value` remains the correct prop for a controlled form field's *current value* (`<TextInput value=… />`) and for DescriptionList-style `{ label, value }` display pairs — the deprecation is only about item *identity* keys inside option arrays.

```jsx
// ✅ canonical
options={[{ id: 'morning', label: 'Morning' }, { id: 'evening', label: 'Evening' }]}

// ⚠️ legacy — still works, warns once per component
options={[{ value: 'morning', label: 'Morning' }]}
```

Components on this contract: `SelectInput`, `OptionList`, `RadioGroup` / `ChoiceList`, `SearchSelect` / `SearchSelectMulti` / `SearchSelectButton`, `Tabs`, `Breadcrumbs`, `SideNavigation`.

### Callback naming

| Intent | Canonical callback | Fired with |
|--------|--------------------|------------|
| Form-value emission (inputs, checkboxes, radios, option lists, selects) | `onChange` | the new value (or DOM event for native inputs) |
| Navigation / structural selection (tabs, breadcrumbs, side nav) | `onSelect` | `(id, item, index)` |

- **`onSelect(id, item, index)`** is the single navigation/selection signature across the system. `id` is the item's canonical identity (falling back to the string-coerced index when no `id`/`key` is set); `item` is the full item; `index` is its position, for callers that track selection positionally.
- Legacy aliases have been **removed** (hard rename) — there is no `Tabs.onChange`(index), no `Breadcrumbs.onNavigate`, no `SideNavigation.onItemSelect`. Use `onSelect`.

```jsx
// Tabs / Breadcrumbs — read the 3rd arg when you track position
<Tabs activeIndex={active} onSelect={(_id, _item, i) => setActive(i)} tabs={…} />
<Breadcrumbs items={trail} onSelect={(_id, _item, i) => setTrail(trail.slice(0, i + 1))} />

// SideNavigation — id-based
<SideNavigation activeItemId={activeId} onSelect={setActiveId} items={…} />
```

### Navigation sync: one `activeId` drives rail + header + breadcrumbs

SideNavigation, the Page header, and Breadcrumbs are **one navigation system** — they're all driven by a single `activeId` so they can't drift apart. Two helper exports from `SideNavigation.jsx` derive the dependent surfaces from the shared nav `items` tree:

- **`siblingsFor(items, activeId)`** → the Page header's `titleDisclosure` (sibling chevron menu), or `null` to hide it.
- **`trailFor(items, activeId, { home })`** → the Breadcrumbs `trail`. Returns `[home]` on the home page, `[home, item]` for a top-level page, `[home, group, child]` for a sub-item.

The breadcrumb's "step back as reset" logic then becomes the navigation model for the whole shell:

```jsx
const [activeId, setActiveId] = useState('coldchain');
const trail = trailFor(NAV_ITEMS, activeId, { home: HOME_CRUMB });

function onCrumb(id) {
  if (id === HOME_CRUMB.id) return setActiveId('home');   // Home resets the trail
  const group = NAV_ITEMS.find((it) => it.id === id && it.children);
  setActiveId(group ? group.children[0].id : id);         // group crumb → its first child
}

<SideNavigation items={NAV_ITEMS} activeItemId={activeId} onSelect={setActiveId} … />
<Page titleDisclosure={siblingsFor(NAV_ITEMS, activeId)} … />
<Breadcrumbs items={trail} onSelect={onCrumb} />
```

**Home is a top-level landing surface.** When `activeId === 'home'`, render the shell **without** the side rail — only the breadcrumb (`[Home]`) shows. Picking a section from the Home page calls `setActiveId`, bringing the rail back and growing the breadcrumb to `Home → Section`. See **Application Layout → Sectioned Layout**.

---

## Responsive System (Hybrid Shell)

One route/IA at every size — only the *shell* adapts. Works in responsive web and iOS/Android/iPad containers. Built from `AppShell` + the progressive `TopBar` + the `MenuDrawer`, all driven by `useViewport` (`src/foundation/useViewport.js`).

### Breakpoints

| Token | Value | What changes |
|-------|-------|--------------|
| `BP_SM` | `640` | Below: side padding tightens 16 → 12px |
| `BP_MD` | `768` | Below: TopBar = **mobile**; a **tertiary/record page hides the global top bar** (record header leads) |
| `BP_LG` | `1024` | At/above: **SideNavigation rail docks** (240px / 60px collapsed); below it's the hamburger → MenuDrawer |

### Content width

`AppShell` wraps every page in one shared container so Primary / Secondary / Tertiary line up identically (no jump when navigating):

- **`max-width: 1080px`**, centered, padding `24px` top / `16px` sides (12px < 640) / `32px` bottom (`box-sizing: border-box`).
- Content column = `viewport − 240px (docked rail)`, capped at 1080 (the cap engages ≈ ≥ 1320px viewport).
- `contentWidth` prop overrides it; `contentWidth="full"` opts a page out to full-bleed (e.g. the IndexTable Sectioned Layout).
- **Mobile tertiary exception:** when the top bar is hidden (focused record page < 768), the top padding collapses to `12px + safe-area` so the record header leads where the bar would have sat — flush start, but never touching the viewport edge.
- **`Page flushTop`** — inside the shell, pass `flushTop` to `Page` so its own header top-padding doesn't stack on the container's (keeps the Secondary/Tertiary header start aligned with Primary's content). Standalone `Page` (no shell) leaves it off.

### Progressive TopBar

ONE bar that collapses by width — controls are never deleted, they move into the drawer. `nxTopBarStateForWidth`:

| State | Width | Shows |
|-------|-------|-------|
| `wide` | ≥ 1024 | full breadcrumb + bell + profile |
| `medium` | ≥ 900 | compressed breadcrumb + bell + profile |
| `compact` | ≥ 768 | no breadcrumb, bell in bar, profile → drawer |
| `mobile` | < 768 | logo dropped, bell + profile → drawer |

The drawer's "Secondary" tier (Notification / Profile) stays in sync with whatever overflowed out of the bar (`topBarOverflowForWidth`).

### Navigation — Model 2 (split control)

Parent rows are **pages AND groups**. The row splits into two hit areas: the **label** navigates (`onSelect`, closes the drawer), the **caret** toggles expand/collapse (no navigation). Implemented identically in the docked rail (`SideNavigation`) and the `MenuDrawer`, and mirrored in `nx-menu-drawer` (Angular).

### Home module-tile grid

The NavCard dashboard tiles use a **container query** utility (`.nx-home-grid` / `.nx-home-grid__tiles` in `global.css`), so they key off the content column (correct whether the rail is docked) in pure CSS — no JS, no resize lag, capped at 3:

- container ≥ **720px → 3 columns** · ≥ **460px → 2** · else **1**

> **Responsive grids rule:** content grids reflow in pure CSS (`repeat(auto-fit, minmax(min(100%, N), 1fr))` or `flex-wrap`, or container queries when a hard column cap is needed) — **not** JS-width-driven `gridTemplateColumns`, which lags a frame on resize and can overflow.

---

## Loading & Interaction States

Every interactive/data component documents two state families (shown as dedicated Storybook stories + an MDX section):

- **Loading** — a shape-matching skeleton via the shared `Skeleton` primitive (`src/components/Skeleton/Skeleton.jsx`; CSS class `.nx-skeleton` / `--circle` for non-React stacks). Same footprint as the loaded content so the list never reflows. Pulse: `bg-skeleton` `#e8e8e8`, 1.4s. Components with a `loading` prop: Cell, NavCard, MetricCard, EquipmentCard, MenuDrawer, BottomSheet, TopBar, IndexTable.
- **Interaction states** — rest / hover / pressed / focus / disabled (+ selected/active/open where relevant). Components that own their look expose a forced **`state="hover"`** (or per-row `state`) so docs can show the look without live input; focus rings use `--nx-color-primary`. Components built on `Btn` / `SideNavigation` inherit those states.

`Cell` truncates its description to a single line by default (`descriptionLines={1}` → ellipsis); pass `2`+ to clamp to N lines, or `0`/`null` to wrap freely.

---

## Component Patterns

### `Btn` — Button
```jsx
<Btn variant="primary" onClick={fn}>Label</Btn>
<Btn variant="secondary" onClick={fn}>Label</Btn>
<Btn variant="ghost" onClick={fn}>Label</Btn>
<Btn variant="primary" disabled>Label</Btn>
<Btn variant="primary" fullWidth small onClick={fn}>Label</Btn>
```
- Primary: `#005bd3` bg, white text; disabled → `rgba(0,0,0,0.17)` bg, `#b5b5b5` text
- Secondary: white bg, `#303030` text, `1.5px solid #c9c9c9` border
- Ghost: transparent bg, `#005bd3` text
- Padding: `11px 20px` (default), `8px 16px` (small)
- Font: 14px (default), 13px (small), weight 600, border radius 8px
- IMPORTANT: Always use `<Btn>` — never write raw `<button>` elements in stories or UI code

### `TextInput` — Text / Number Input
```jsx
<TextInput label="Max Temp" required value={v} onChange={fn} type="number" suffix="°C" />
<TextInput label="Notes" value={v} onChange={fn} disabled />
<TextInput label="Search" value={v} onChange={fn} clearButton />
```
Props: `label`, `value`, `onChange`, `type`, `placeholder`, `prefix`, `suffix`, `disabled`, `readOnly`, `required`, `helpText`, `error`, `clearButton`, `borderless`, `tone`, `size` (medium/slim), `labelAction`, `onLabelAction`

### `SelectInput` — Dropdown Select
```jsx
<SelectInput label="Status" required value={v} onChange={fn} options={OPTIONS} placeholder="Select…" />
<SelectInput label="Status" error="Required." value={v} onChange={fn} options={OPTIONS} />
```
Props: `label`, `options` (string[] or `{id, label}[]`), `placeholder`, `disabled`, `value`, `onChange`, `required`, `error`, `helpText`

### `SearchSelect` — Searchable Single Select
```jsx
<SearchSelect label="Region" required placeholder="Select a region" options={OPTS} value={v} onChange={setV} />
<SearchSelect label="Region" error="Required." options={OPTS} value={v} onChange={setV} />
<SearchSelect label="Region" disabled value="nairobi" options={OPTS} />

// Nested options — branches are not selectable, only leaves
<SearchSelect label="Region" options={NESTED} value={v} onChange={setV} />
```
- Trigger becomes a live `<input>` when open — typing filters the dropdown
- Options can carry `children` for hierarchical menus (unbounded depth, indented by `level * 20px`, parent labels in weight 600)
- In single-select, branches are non-selectable — only leaves can be picked
- Props: `label`, `required`, `placeholder`, `options` (`{id, label, disabled?, children?}[]`), `value`, `onChange`, `disabled`, `error`

### `SearchSelectButton` — Button-trigger Search Select
```jsx
// Single
<SearchSelectButton label="Region" placeholder="Select region" options={OPTS} value={v} onChange={setV} />

// Multi — button text becomes "First +N Others"
<SearchSelectButton label="Region" placeholder="Select regions" options={OPTS} value={arr} onChange={setArr} multiple />

// Sizes (matches Btn): 'small' | 'medium' (default) | 'large'
<SearchSelectButton label="Region" options={OPTS} value={arr} onChange={setArr} multiple size="large" />
```
- Same dropdown, search, and tree behaviour as `SearchSelect`/`SearchSelectMulti` — but the trigger is the actual `Btn` component (`variant="secondary"`, `disclosure`) from the design system
- Search lives **inside** the popover, rendered with the design-system `<TextInput>` (with `clearButton`) — no separator line below it
- Checkboxes in the option list are stateless renderings of the `<Checkbox>` component visuals (same 16×16 box, `#303030` checked bg, identical SVG paths)
- Button text: `placeholder` when empty, the option label when 1 selected, `"First +N Others"` (or `+1 Other`) when multi
- Props: `label`, `placeholder`, `options`, `value`, `onChange`, `multiple`, `disabled`, `size` (`'small' \| 'medium' \| 'large'`), `maxTags`, `dropdownWidth`

### `SearchSelectMulti` — Searchable Multi Select
```jsx
<SearchSelectMulti label="Regions" required placeholder="Select regions" options={OPTS} value={arr} onChange={setArr} />
<SearchSelectMulti label="Regions" options={OPTS} value={arr} onChange={setArr} maxTags={3} />

// Nested options — clicking a parent toggles every descendant leaf
<SearchSelectMulti label="Regions" options={NESTED} value={arr} onChange={setArr} />

// tagsInside — first chip inline (≤50% width, ellipsises if longer) + "+N others" overflow
<SearchSelectMulti label="Regions" options={OPTS} value={arr} onChange={setArr} tagsInside />
```
- Trigger becomes a live `<input>` when open — typing filters the dropdown
- Hierarchical options: parents render with checkbox + indeterminate state derived from leaf descendants (`checked` / `indeterminate` / `unchecked`). Clicking a parent toggles every leaf beneath it. Only leaf values are stored in `value`.
- **Tag placement**:
  - Default (`tagsInside={false}`) — every selected leaf renders as a removable `Tag` below the field
  - `tagsInside` — first selection renders inline (max-width 50%, ellipsis on overflow), remaining selections collapse into a single `+ N others` chip; nothing escapes the field boundary
- Props: `label`, `required`, `placeholder`, `options`, `value`, `onChange`, `disabled`, `error`, `maxTags`, `tagsInside`

### `NumberInput` — Numeric Input
```jsx
<NumberInput label="Quantity" value={v} onChange={setV} />
<NumberInput label="Temperature" suffix="°C" step={0.1} required value={v} onChange={setV} helpText="Normal: 2 – 8 °C" />
<NumberInput label="Percentage" suffix="%" min={0} max={100} value={v} onChange={setV} />
<NumberInput label="Record count" value={42} disabled />
```
- Uses native browser number spinner — same height as TextInput (no custom +/− buttons)
- Props: `label`, `value`, `onChange`, `prefix`, `suffix`, `min`, `max`, `step`, `placeholder`, `required`, `disabled`, `readOnly`, `helpText`, `error`, `labelAction`, `onLabelAction`

### `TextareaInput` — Textarea
```jsx
<TextareaInput label="Comments" value={v} onChange={fn} rows={4} />
<TextareaInput label="Notes" value={v} onChange={fn} required error="Required." maxLength={500} />
```

### `Checkbox` — Single Checkbox
```jsx
<Checkbox label="I agree" checked={v} onChange={fn} />
<Checkbox label="Disabled" checked disabled />
<Checkbox label="Error" checked={v} onChange={fn} error="Required." />
```

### `RadioButton` / `RadioGroup` — Mutually Exclusive Choice
```jsx
<RadioGroup
  title="Notification preference"
  name="pref"
  value={v}
  onChange={setV}
  options={[
    { id: 'email', label: 'Email', helpText: 'Daily digest at 8am' },
    { id: 'sms',   label: 'SMS' },
  ]}
/>
<RadioGroup title="Plan" required tone="magic" value={v} onChange={setV} options={OPTS} error="Required." />
<RadioButton label="Email" checked onChange={fn} />
```
- Always present at least two options — a single radio should be a Checkbox
- Supports `tone="magic"` (purple) variant
- Outer ring `16×16px`, inner dot `6×6px`, `role="radio"`
- Props (RadioButton): `label`, `checked`, `onChange`, `disabled`, `helpText`, `error`, `tone`, `name`
- Props (RadioGroup): `title`, `name`, `value`, `onChange`, `options`, `tone`, `error`, `required`, `disabled`

### `DatePicker` — Calendar Date Picker
```jsx
<DatePicker value={date} onChange={setDate} />
<DatePicker value={range} onChange={setRange} allowRange multiMonth />
<DatePicker value={range} onChange={setRange} allowRange multiMonth verticalStack />
<DatePicker value={date} onChange={setDate} minDate={min} maxDate={max} />
```
- Single date when `allowRange={false}`, range `{ start, end }` when `true`
- `multiMonth` shows two months side by side; combine with `verticalStack` for mobile
- Card: `#fdfdfd` bg, `0.66px solid #e0e0e0`, `12px` radius, `16px` padding
- Day cells `32×32px`; selected `#303030`/`#fff`; range middle `#ebebeb`; today inset `0.66px #8a8a8a`
- Props: `value`, `onChange`, `allowRange`, `multiMonth`, `verticalStack`, `minDate`, `maxDate`, `initialMonth`

### `Tag` / `TagGroup` — Keyword Chip
```jsx
<Tag label="Africa" />
<Tag label="Africa" removable onRemove={fn} />
<Tag label="Smart suggestion" tone="magic" icon={<IcoInfo />} removable onRemove={fn} />
<Tag label="Locked" disabled />
<TagGroup>
  {tags.map(t => <Tag key={t} label={t} removable onRemove={() => remove(t)} />)}
</TagGroup>
```
- Used inside `SearchSelectMulti` for selected chips, and in filter bars / AI-suggestion lists
- Pill `border-radius: 100px`, `13px / 450`, padding `3px 10px` (`3px 4px 3px 10px` when removable)
- Default rest `#ebebeb`/`#303030`; magic `#ede7ff`/`#5700d1`
- X button has `aria-label="Remove {label}"`; tag responds to Backspace/Delete when focused
- Props: `label`, `tone` (`default`/`magic`), `icon`, `removable`, `onRemove`, `onClick`, `disabled`

### `Toggle` — Switch
```jsx
<Toggle label="Enable notifications" checked={v} onChange={setV} />
<Toggle label="Auto-sync" checked={v} onChange={setV} helpText="Receive alerts when readings are out of range." />
<Toggle label="Auto-sync" checked={v} onChange={setV} error="Auto-sync must be enabled." />
<Toggle label="Apply to all" checked={false} disabled />
```
- Use for immediate on/off settings (notifications, dark mode). For opt-in inside a form with Save, use `Checkbox` instead.
- Pill-shaped track `36×20px`, white thumb `14×14px`, `role="switch"`
- Props: `label`, `checked`, `onChange`, `disabled`, `helpText`, `error`

### `Badge` — Status/Label Badge
```jsx
<Badge tone="success">Active</Badge>
<Badge tone="warning" size="large">Pending</Badge>
<Badge tone="critical" progress="incomplete">Overdue</Badge>
<Badge tone="default" onDismiss={fn}>Removable</Badge>
```
Props: `tone` (default/info/success/attention/warning/critical), `size` (medium/large), `progress` (incomplete/partial/complete), `progressIndicator`, `icon`, `onDismiss`, `children`

### `StatusBadge` — Preset Status Pill
```jsx
<StatusBadge status="pending" />    // #fff3cd bg, #856404 text
<StatusBadge status="completed" />  // #cdfee1 bg, #0c5132 text
<StatusBadge status="locked" />     // #f0f0f0 bg, #b5b5b5 text
```

### `Banner` — Contextual Banner
```jsx
<Banner type="info">Message here</Banner>
<Banner type="success">Saved!</Banner>
<Banner type="warning">Check this value.</Banner>
<Banner type="critical">Something went wrong.</Banner>
```

### `Accordion` — Expandable Section
```jsx
<Accordion title="Morning Reading" description="Optional subtitle" required open={open} onToggle={fn} hasContent={!!value}>
  {/* form fields */}
</Accordion>
```
- Green dot indicator when `hasContent && !open`
- Props: `title`, `description`, `required`, `open`, `onToggle`, `hasContent`, `children`

### `Overlay` — Modal Backdrop
```jsx
<Overlay onClose={fn}>
  <div style={{ background: '#fff', borderRadius: 16, padding: 24 }}>
    {/* modal content */}
  </div>
</Overlay>
```
- Backdrop: `rgba(0,0,0,0.5)`, fixed full-screen, `fadeInScale 0.18s ease-out`
- Closes on Escape key and backdrop click, max width 620px centered

### `Card` — Detail Card
```jsx
<Card>
  <CardSectionTitle icon={<MyIcon />} title="Location" />
  <CardField label="Region" value="Nairobi" />
  <CardField label="Website" value="View" linkHref="https://…" />
  <CardDivider />
</Card>
```
Exports: `Card`, `CardSectionTitle`, `CardField`, `CardDivider`

### `MetricCard` — KPI Metric Tile
```jsx
<MetricCard title="Total Installations" metric="142" badge={{ tone: 'success', label: '+12%' }} onClick={fn} infoTooltip="Updated daily" />
<MetricCard title="Offline Devices" metric="3" loading={false} selected={false} />
```
Props: `title`, `metric`, `badge` (`{tone, label}`), `onClick`, `selected`, `disabled`, `loading`, `infoTooltip`

### `Tooltip` — Hover Tooltip
```jsx
<Tooltip content="Helpful hint" position="above">
  <button>Hover me</button>
</Tooltip>
```
Props: `content`, `position` (above/below), `children`

### `OptionList` — Selectable List
```jsx
<OptionList options={OPTIONS} selected={selected} onChange={setSelected} />
<OptionList options={OPTIONS} selected={selected} onChange={setSelected} allowMultiple />
<OptionList sections={[
  { title: 'Actions', options: [{ id: 'edit', label: 'Edit' }] },
  { title: '', options: [{ id: 'delete', label: 'Delete', tone: 'critical' }] },
]} onChange={handleChange} />
```
Props: `title`, `options` (`{id, label, badge, media, disabled, description}[]`), `selected`, `onChange`, `allowMultiple`, `sections`, `error`

### `IndexTable` — Data Table
```jsx
<IndexTable
  columns={COLUMNS}
  rows={ROWS}
  selectedRows={selected}
  onSelectionChange={setSelected}
  tabs={TABS}
  activeTab={activeTab}
  onTabChange={handleTabChange}
  loading={loading}
  rowActions={[
    { label: 'Edit', onAction: fn },
    { label: 'Delete', tone: 'critical', onAction: fn },
  ]}
/>
```
- Bulk selection, search, tabs, loading skeleton, row actions (three-dot menu using `OptionList`)

### `Tabs` — Tab Bar
```jsx
<Tabs tabs={[{ id: 'overview', label: 'Overview' }, { id: 'history', label: 'History', badge: '3' }]} activeIndex={i} onSelect={(_id, _item, idx) => setI(idx)} />
<Tabs tabs={TABS} activeIndex={i} onSelect={(_id, _item, idx) => setI(idx)} fitted />
```
Props: `tabs` (`{id, label, badge, disabled}[]`), `activeIndex`, `onSelect` (`(id, item, index)`), `fitted`, `moreViews`, `canAddNew`, `mobile`

### `Pagination` — Prev / Next
```jsx
<Pagination hasPrevious hasNext onPrevious={fn} onNext={fn} label="Page 1 of 10" type="page" />
<Pagination hasPrevious hasNext onPrevious={fn} onNext={fn} label="1–20 of 80" type="table" />
```
Props: `hasPrevious`, `hasNext`, `onPrevious`, `onNext`, `label`, `type` (page/table)

### `Divider`
```jsx
<Divider />                   // 1px #ebebeb, 4px vertical margin
<Divider variant="strong" />  // 1.5px #e0e0e0, 8px vertical margin
<Divider variant="subtle" />  // 1px #f0f0f0, no margin
```

### `Page` — Page Header Wrapper
```jsx
<Page title="Temperature Records">
  {/* content */}
</Page>

<Page
  title="Fridge A — Zone 1"
  subtitle="Last synced 2 hours ago"
  backAction={{ onAction: () => navigate(-1) }}
  metadata={[{ label: 'Active', tone: 'success' }]}
  primaryAction={{ content: 'Record reading', onAction: openForm }}
  secondaryActions={[{ content: 'Export', onAction: exportData }]}
>
  {/* content */}
</Page>

// Record (tertiary) variant — back + title + health chip + serial, actions stack below on mobile
<Page variant="record" backAction={{ onAction: goBack }} title="Hairer-HBC-80 (IOM)"
  status="functional" subtitle="BE0G91EAS0 00EJ8 S0003"
  actions={<TertiaryActions state="functional" onAction={fn} />} />
```

### Responsive / shell & list components

These compose the hybrid shell and the mobile list/record surfaces. Each ships React + CSS-class + Angular layers (see those sections) and the Loading / Interaction-state stories described above.

```jsx
// SideNavigation — docked rail; Model 2 split (label navigates, caret expands)
<SideNavigation items={NAV_ITEMS} activeItemId={id} onSelect={setId} collapsed={c} onCollapsedChange={setC} />

// AppShell — hybrid shell: docks the rail ≥1024, drawer below; one TopBar; shared 1080 content container
<AppShell activeItemId={id} onNavSelect={go} breadcrumbs={trail} level="secondary" /* contentWidth=1080|'full' */>{page}</AppShell>

// TopBar — progressive top bar (wide→medium→compact→mobile); loading swaps breadcrumb/region/avatar for skeletons
<TopBar breadcrumbs={trail} onMenu={openDrawer} country={{code:'KE',name:'Kenya'}} onAskAi={fn} />

// MenuDrawer — left drawer (SlideOver) the hamburger opens; nested nav + Notification/Profile + legal tiers; loading nav skeleton
<MenuDrawer open={open} onClose={close} items={NAV_ITEMS} activeItemId={id} onSelect={go} loading={false} />

// BottomSheet — mobile sheet (More actions / filter / selector); drag handle; loading content skeleton
<BottomSheet open={open} onClose={close} title="Equipment actions">{rows}</BottomSheet>

// SlideOver — the overlay primitive behind MenuDrawer/BottomSheet; placement 'right' | 'left' | 'bottom'
<SlideOver open={open} onClose={close} placement="right">{content}</SlideOver>

// EquipmentCard — mobile list card (Health/Maintenance/Lifecycle badges); loading + state="hover"
<EquipmentCard name="Vestfrost MK 144" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" onClick={open} />

// TertiaryActions — state-driven [primary][More] for a record (functional/faulty/unknown/decommissioning)
<TertiaryActions state="faulty" mobile onAction={fn} />

// Cell — composable 64px list row (icon · title/desc · trailing control); descriptionLines=1 default
<Cell icon={<Ico/>} title="Temperature exceeds threshold" description="Incubator HC 1501 | Main Lab" hasChevron onClick={fn} />

// NavCard — home/sub navigation tile (illustration + title); loading skeleton
<NavCard layout="home" title="Inventory Management" media={<Media/>} onClick={open} />

// MetricCard — KPI tile (see above); loading skeleton + selected state
```

---

## CSS Class Structure (non-React stacks)

For Django / Angular / vanilla-HTML consumers, components ship a hand-written stylesheet using a **BEM-ish, `nx-`-prefixed** convention. Every value is a `var(--nx-*)` token — there are **no hardcoded colors or sizes** in the CSS, so the class layer stays 1:1 with the React layer and the Figma variables.

### Naming convention

| Pattern | Meaning | Example |
|---------|---------|---------|
| `.nx-{block}` | Base component (reset + shared shape) | `.nx-btn`, `.nx-badge`, `.nx-banner` |
| `.nx-{block}--{modifier}` | Variant / size / state modifier | `.nx-btn--primary`, `.nx-btn--sm`, `.nx-badge--critical` |
| `.nx-{block}__{element}` | Child element inside the block | `.nx-tab__badge` |
| `.nx-{block}:disabled` / `:focus-visible` | Native pseudo-states | `.nx-btn:disabled`, `.nx-btn:focus-visible` |
| `.nx-{block}-{subcomponent}` | Related sub-component | `.nx-btn-group`, `.nx-btn-group--segmented` |

### Import order (required)

`tokens.css` defines the `:root` custom properties and **must be imported first**, before any component stylesheet:

```css
@import 'tokens/tokens.css';            /* defines --nx-* custom properties */
@import 'components/Btn/Btn.css';       /* consumes them */
@import 'components/Tabs/Tabs.css';
```

```html
<!-- Button -->
<button class="nx-btn nx-btn--primary">Save</button>
<button class="nx-btn nx-btn--secondary nx-btn--sm">Cancel</button>
<button class="nx-btn nx-btn--primary" disabled>Unavailable</button>

<!-- Tabs -->
<div role="tablist" class="nx-tabs">
  <button role="tab" aria-selected="true" class="nx-tab nx-tab--active">All<span class="nx-tab__badge">24</span></button>
  <button role="tab" aria-selected="false" class="nx-tab">Active</button>
</div>
```

### Components that ship a `.css` layer

**All of them.** Every component has its `nx-*.css` (the only exception is `Overlay`, a React-legacy wrapper with no Angular visual twin). The full set — foundational (`Accordion`, `Badge`, `Banner`, `Btn`, `Breadcrumbs`, `Card` incl. layout types, `Checkbox`, `DatePicker`, `Divider`, `IndexTable`, `MetricCard`, `Modal`, `NumberInput`, `OptionList`, `Page`, `Pagination`, `PolarisIcon`, `Popover`, `RadioButton`, `SearchSelect`, `SelectInput`, `Tabs`, `Tag`, `TextInput`, `TextareaInput`, `Toggle`, `Tooltip`, `Upload`) and responsive/shell (`Cell`, `NavCard`, `Skeleton`, `EquipmentCard`, `TertiaryActions`, `MenuDrawer`, `BottomSheet`, `SlideOver`, `SideNavigation`, `TopBar`, `Toolbar`) — plus `src/global.css` (keyframes, resets, `.nx-home-grid`) and `src/tokens/tokens.css`. 42 stylesheets total in the Angular bundle. All token names map 1:1 to the JS constants in `src/tokens/index.js`.

The Angular package bundles tokens + every component stylesheet into one file at build time (`angular/scripts/bundle-styles.mjs`), shipped as **`@nexleaf/angular/styles.css`** (and a tokens-only `@nexleaf/angular/tokens.css`) — so an Angular app imports one stylesheet instead of each `nx-*.css`.

---

## Angular Components

Angular ships as **real, compilable library source**, not just doc snippets. It lives in an isolated workspace under `angular/` (kept separate from the React/Vite/Storybook build) and publishes as the `@nexleaf/angular` package.

- **Source:** `angular/projects/nexleaf-angular/src/lib/<name>/` — one `.component.ts` + one `.module.ts` per component, re-exported from `src/public-api.ts`.
- **Coverage:** functional parity with React — every React component has an Angular equivalent. The foundational set (accordion, badge, banner, btn, card → `nx-card-layout-type1…6`, checkbox, date-picker, divider, index-table, metric-card, number-input, option-list, page, pagination, polaris-icon, radio, search-select, select-input, tabs, tag, text-input, textarea-input, toggle, toolbar incl. `nx-breadcrumbs`, tooltip, upload, **modal**, **popover**, **skeleton**), the responsive/shell layer (app-shell, **side-navigation**, top-bar, menu-drawer, bottom-sheet, slide-over, overlay foundation, equipment-card, tertiary-actions, cell, nav-card), and the `nav-sync` helpers.
- **Build:** `cd angular && npm install && npm run build` (Angular 18 + ng-packagr → `angular/dist/nexleaf-angular`), which also runs `scripts/bundle-styles.mjs`.
- **Storybook (production surface):** `cd angular && npm run storybook` (port 6007; or `npm run storybook:angular` from the repo root). 41 stories across the library, rendered against the exact bundled `styles.css` the package ships. `npm run build-storybook` produces the static site in `angular/storybook-static/`. Run `npm run build` first so `dist/nexleaf-angular/styles.css` exists.
- **Architecture:** template-only components — each one emits the same `nx-*` CSS classes + tokens as the React/CSS layers, so styling stays 1:1. **Styling ships as one bundled `@nexleaf/angular/styles.css`** (tokens + every component stylesheet; also `@nexleaf/angular/tokens.css` for just the vars) — import it once. Components are `standalone: false` and grouped into per-component `NxXxxModule`s (NgModule pattern). Form controls implement `ControlValueAccessor` for `ngModel`.

### Conventions

| Concern | Convention | Example |
|---------|------------|---------|
| Module | `Nx{Name}Module` from `@nexleaf/angular` | `import { NxBtnModule } from '@nexleaf/angular';` |
| Element selector | `<nx-{name}>` (kebab-case) | `<nx-btn>`, `<nx-tabs>` |
| String/literal input | plain attribute | `variant="primary"` |
| Boolean / expression input | property binding `[x]` | `[small]="true"`, `[disabled]="true"`, `[buttons]="[…]"` |
| Event output | `(event)="handler($event)"` | `(click)="save()"`, `(change)="active = $event"` |
| Sub-components | nested `nx-*` elements | `<nx-btn-group>`, `<nx-btn-group-segmented [buttons]="[…]" />` |

```ts
import { NxBtnModule } from '@nexleaf/angular';

// Variants + modifiers
<nx-btn variant="primary" (click)="save()">Save</nx-btn>
<nx-btn variant="secondary" [small]="true">Compact</nx-btn>
<nx-btn variant="primary" [fullWidth]="true">Full width</nx-btn>
<nx-btn variant="primary" [disabled]="true">Unavailable</nx-btn>

// Tabs — index-driven, two-way via output
<nx-tabs
  [activeIndex]="active"
  (change)="active = $event"
  [tabs]="[
    { label: 'All', badge: 24 },
    { label: 'Active', badge: 12 },
    { label: 'Archived', disabled: true }
  ]" />
```

> Note: Angular `(change)`/`[activeIndex]` is the framework-idiomatic shape for that platform. The React layer uses the system-standard `onSelect(id, item, index)` callback (see "Item Shape & Callback Contract") — the two are intentionally framework-native rather than identical.

---

## Visual Gate (automated regression check)

`playwright.config.js` + `tests/visual/` lock the rendered look of **both** delivery surfaces — 106 committed baseline screenshots (React: 12 curated stories; Angular: all 41 stories; each at desktop 1280×860 + mobile 375×812).

```bash
npm run test:visual          # compare both Storybooks against committed baselines
npm run test:visual:update   # re-seed baselines after an INTENDED visual change
```

- Baselines live in `tests/visual/__snapshots__/` and are **committed** — a failing diff means the look changed. Intended → update baselines (and say so in the PR); unintended → fix before merging.
- The Angular side always builds the package + static Storybook first, so the gate tests the exact artifact `@nexleaf/angular` ships.
- Servers are reused if already running (React 6006 / Angular static 6007); otherwise the gate starts them itself.
- Run the gate after ANY change to tokens, an `nx-*.css`, or a component in either framework.

---

## Storybook Sidebar Groups

| Group | Components |
|-------|-----------|
| `Foundation/` | Colors, Typography, Spacing, Shadows, PolarisIcon, Emojis |
| `Components/Inputs` | TextInput, NumberInput, TextareaInput, SelectInput, SearchSelect |
| `Components/Navigation` | SideNavigation, TopBar, Breadcrumbs, Tabs, Pagination, Toolbar, Header Page |
| `Components/Overlays` | Modal, Popover, SlideOver |
| `Components/Lists` | Cell, OptionList |
| `Components/` (root) | Btn, Checkbox, RadioButton, Toggle, DatePicker, Tag, Badge, Banner, Accordion, Card, IndexTable, MetricCard, NavCard, Skeleton, Tooltip, Divider, Page |
| `Patterns/Responsive` | AppShell, MenuDrawer, BottomSheet, EquipmentCard, TertiaryActions |
| `Pages/` | Application Layout, Equipment Detail |

MDX docs pages use `[Group]/[Name]/Docs` as the `<Meta title>`. Sidebar order is Foundation → Components → Patterns → Pages (see `.storybook/preview.js` `storySort`).

---

## Icon System

### Primary: Nexleaf Icons V2
512 icons, PascalCase naming, 20×20px native. Render as inline SVG:

```jsx
const IconSearch = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    {/* paths from Figma */}
  </svg>
);
```

Naming: `Filled` → solid · `Up/Down/Left/Right` → directional · `Add/Remove/Check/None` → state · `Small` → smaller design · `Logo*` → brand · `Chart*` → data viz

### Fallback: Phosphor Icons (fill weight, 20px preferred)
Inline SVG only — never icon font or external image. Do not install icon packages.

---

## Layout Conventions

- Mobile-first; one IA at every size (see **Responsive System**). App pages render inside the `AppShell` content container (**1080px** max, centered); standalone forms/modals stay narrower (480–620px).
- Cards and modals: `padding: 24px`
- Form sections: `display: flex; flexDirection: column; gap: 20px`
- Button rows: `display: flex; gap: 12px`
- Interactive elements: `cursor: pointer` (enabled), `cursor: not-allowed` (disabled)

---

## Animations

| Usage | Definition |
|-------|------------|
| Loading spinner | `spin 0.7s linear infinite` |
| Modal entrance | `fadeInScale 0.18s ease-out` |
| QR scan beam | `scanBeam 1.4s ease-in-out alternate infinite` |
| Accordion open/close | `max-height` transition `0.25s ease` |
| Card hover | `transition: border-color 0.15s, box-shadow 0.15s` |

---

## File Structure (HTML Prototypes)

`<script type="text/babel">` block order:
1. Constants & data
2. Utility functions
3. Inline SVG icon components
4. UI primitives (Btn, TextInput, etc.)
5. Feature-specific components / modals
6. Screen-level components
7. Root `App` component
8. `ReactDOM.createRoot(document.getElementById('root')).render(<App/>)`

---

## General Rules

- IMPORTANT: Never hardcode colors — always use token values above
- IMPORTANT: Never import or link to icon packages — always inline SVG
- IMPORTANT: All new `.html` files must include React 18 CDN scripts and Inter font link
- IMPORTANT: When implementing Figma designs, use inline-style React — no Tailwind, no CSS modules
- IMPORTANT: Always use `<Btn>` — never write raw `<button>` elements in stories or UI
- All input fields share the same border/focus/error style — see Input Field Style section
- Interactive card hover: `borderColor: '#005bd3'`, shadow `rgba(0,91,211,0.12)`
