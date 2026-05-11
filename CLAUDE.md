# Nexleaf Design System Rules

This file governs how all UI work in this project should be implemented. Follow these rules for every design, component, or Figma-driven change.

---

## Project Stack

- **Single-file HTML prototypes** — all code lives in `.html` files
- **React 18** via CDN UMD (`unpkg.com/react@18/umd/react.production.min.js`)
- **ReactDOM 18** via CDN UMD
- **Babel standalone** — JSX is written inside `<script type="text/babel">` tags
- **Inter** font from Google Fonts (weights 400, 500, 600, 700)
- **Styling** — inline CSS in `<style>` blocks + inline `style={{}}` props in React components. No Tailwind, no CSS modules, no styled-components.

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
| `bg-input` | `#fdfdfd` | Text inputs, selects, textareas |
| `bg-disabled` | `rgba(0,0,0,0.06)` | Disabled input backgrounds |
| `bg-selected` | `#f0f7ff` | Selected/checked row highlight |
| `bg-open` | `#f7f9fc` | Accordion/section open state |

### Primary (Interactive)
| Token | Value | Usage |
|-------|-------|-------|
| `color-primary` | `#005bd3` | Primary buttons, links, focus rings, interactive icons |
| `color-primary-disabled` | `rgba(0,0,0,0.17)` | Disabled primary button background |
| `color-primary-hover-shadow` | `rgba(0,91,211,0.12)` | Hover shadow on interactive cards |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `text-default` | `#303030` | Body text, labels, headings |
| `text-subdued` | `#616161` | Secondary text, input icons |
| `text-placeholder` | `#9e9e9e` | Placeholders, tertiary text, chevron icons |
| `text-disabled` | `#b5b5b5` | Disabled text and disabled icon strokes |
| `text-on-primary` | `#ffffff` | Text/icons on primary blue backgrounds |

### Borders
| Token | Value | Usage |
|-------|-------|-------|
| `border-default` | `#e0e0e0` | Card borders, accordion borders, dividers |
| `border-input` | `#8a8a8a` | Active input/select/textarea borders |
| `border-light` | `#ebebeb` | Subtle dividers, list separators |
| `border-lighter` | `#f0f0f0` | Intra-list separators |
| `border-secondary-btn` | `#c9c9c9` | Secondary button borders |

### Semantic States
| Token | Value | Usage |
|-------|-------|-------|
| `color-critical` | `#d92d20` | Error text, required field asterisk |
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

### Contextual / Domain-specific
| Token | Value | Usage |
|-------|-------|-------|
| `color-morning` | `#F59E0B` | Morning/day session indicators |
| `color-evening` | `#6366F1` | Evening/night session indicators |

---

## Typography

IMPORTANT: All text must use the Inter font. Never use system fonts.

| Scale | Size | Weight | Usage |
|-------|------|--------|-------|
| body | 14px | 400 | Default body, input values |
| label | 13px | 500 | Field labels, secondary text |
| caption | 12px | 400–600 | Badges, footnotes |
| heading-sm | 16px | 600 | Card titles, section headings |
| heading-md | 18–20px | 600–700 | Screen/modal headings |

---

## Spacing Scale

Use multiples of 4px. Common values used in this project:

`4` `6` `8` `10` `12` `14` `16` `20` `24`

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

## Component Patterns

### `Btn` — Button
Three variants: `primary`, `secondary`, `ghost`. Supports `disabled`, `fullWidth`, `small`, `type`.

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
- Font: 14px (default), 13px (small), weight 600
- Border radius: 8px

### `FieldLabel` — Form Label
```jsx
<FieldLabel label="Temperature (°C)" required />
```
- 13px, weight 500, `#303030`; asterisk is `#d92d20`

### `TextInput` — Text / Number Input
```jsx
<TextInput label="Max Temp" required value={v} onChange={fn} type="number" suffix="°C" />
<TextInput label="Notes" value={v} onChange={fn} disabled />
```

### `SelectInput` — Dropdown Select
```jsx
<SelectInput label="Status" required value={v} onChange={fn} options={OPTIONS} placeholder="Select…" />
```

### `TextareaInput` — Textarea
```jsx
<TextareaInput label="Comments" value={v} onChange={fn} rows={4} />
```

### `RadioGroup` — Yes / No Radio
```jsx
<RadioGroup label="Was alarm triggered?" required value={v} onChange={fn} />
```

### `StatusBadge` — Pill Badge
```jsx
<StatusBadge status="pending" />   // #fff3cd bg, #856404 text
<StatusBadge status="completed" /> // #cdfee1 bg, #0c5132 text
<StatusBadge status="locked" />    // #f0f0f0 bg, #b5b5b5 text
```

### `Banner` — Contextual Banner
```jsx
<Banner type="info">Message here</Banner>
<Banner type="success">Saved!</Banner>
<Banner type="warning">Check this value.</Banner>
```

### `Accordion` — Expandable Section
```jsx
<Accordion title="Morning Reading" required open={open} onToggle={fn} hasContent={!!value}>
  {/* form fields */}
</Accordion>
```
- Has a green dot indicator when `hasContent && !open`

### `Overlay` — Modal Backdrop
```jsx
<Overlay onClose={fn}>
  <div style={{ background: '#fff', borderRadius: 16, padding: 24 }}>
    {/* modal content */}
  </div>
</Overlay>
```
- Backdrop: `rgba(0,0,0,0.5)`, fixed full-screen
- Closes on Escape key and backdrop click
- Max width: 620px, centered

### `Divider`
```jsx
<Divider />
```
- 1px, `#ebebeb`, margin 4px vertical

---

## Icon System

### Primary: Nexleaf Icons V2
512 icons, all PascalCase naming, 20×20px native size. Each icon has `Mobile=false` and `Mobile=true` variants.

When implementing from Figma, use the Nexleaf icon as the SVG source. Render as inline SVG components in React, e.g.:

```jsx
const IconSearch = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    {/* SVG paths from Figma */}
  </svg>
);
```

**Icon categories (40 total):** Alerts, Arrows, Buildings, Cards, Chevrons & carets, Circles, Clipboard, Code, Communication, Containers, Cursors, Data, Devices, Diagrams, Envelopes, Folders, Gears, Hands & eyes, Humans, Layout, Location, Logos, Media, Menus & controls, Money, Nature, Objects, Paper & pencil, Paper sheets, Receipts, Search, Security, Shopping, Symbols, Tags, Text & formatting, Time, Tools, UI, Vehicles

**Naming patterns:**
- `Filled` suffix → solid/filled variant (e.g. `HomeFilled`, `PersonFilled`)
- `Up/Down/Left/Right` → directional variants
- `Add/Remove/Check/None` → action/state variants
- `Small` → visually smaller design (e.g. `CheckSmall`, `XSmall`)
- `Logo*` → third-party brand logos
- `Chart*` → data viz icons

### Fallback: Phosphor Icons (fill weight)
When a Nexleaf icon doesn't exist for a use case, use Phosphor Icons at fill weight.
- 16px: https://phosphoricons.com/?weight=fill&q=wif&size=16
- 20px: https://phosphoricons.com/?weight=fill&q=wif&size=20
- 24px: https://phosphoricons.com/?weight=fill&q=wif&size=24

Prefer 20px Phosphor icons to match the Nexleaf native size. Always render as inline SVG — never as an icon font or external image.

IMPORTANT: Do not install icon packages. All icons are inline SVG components.

---

## Layout Conventions

- Mobile-first. Max content width: typically 480–620px centered.
- Cards and modals use `padding: 24px`
- Form sections use `display: flex; flexDirection: column; gap: 20px`
- Button rows use `display: flex; gap: 12px`
- All interactive elements must have correct `cursor` style: `pointer` (enabled), `not-allowed` (disabled)

---

## Animations

| Class / Usage | Definition |
|---------------|------------|
| `.spinner` | `spin 0.7s linear infinite` — loading spinner |
| `.modal-anim` | `fadeInScale 0.18s ease-out` — modal entrance |
| `.scan-beam` | `scanBeam 1.4s ease-in-out alternate infinite` — QR scan animation |
| `.accordion-body` / `.open` | `max-height` transition `0.25s ease` |
| Card hover | `transition: border-color 0.15s, box-shadow 0.15s` |

Define animations in the `<style>` block at the top of the file.

---

## File Structure Conventions

- Each prototype is a **single self-contained `.html` file**
- Structure within the `<script type="text/babel">` block:
  1. Constants & data
  2. Utility functions
  3. Inline SVG icon components
  4. UI primitives (Btn, FieldLabel, TextInput, etc.)
  5. Feature-specific components / modals
  6. Screen-level components
  7. Root `App` component with routing/state
  8. `ReactDOM.createRoot(document.getElementById('root')).render(<App/>)`

---

## Available Components (in poltail.html)

IMPORTANT: Always check this list before building anything new. Reuse existing components rather than creating custom implementations.

### Actions
| Component | Props / Variants | Notes |
|-----------|-----------------|-------|
| `Btn` | `variant`: primary, secondary, ghost, tertiary, plain · `tone`: default, critical, success · `size`: micro, medium, large · `disabled`, `fullWidth`, `disclosure`, `icon` | Main button component — use for all buttons |
| `IconBtn` | `icon`, `onClick`, `disabled`, `variant`: default, primary | Icon-only button |
| `BtnGroupSegmented` | `buttons=[{label,icon,onClick,disabled}]`, `connectedTop` | Segmented control |
| `ButtonGroup` | `gap`: tight, loose | Wraps multiple buttons |

### Feedback & Status
| Component | Props / Variants | Notes |
|-----------|-----------------|-------|
| `Badge` | `tone`: default, info, success, attention, warning, critical · `size`: medium, large · `progress`: incomplete, partial, complete · `children` | General-purpose badge — accepts custom text via children |
| `StatusBadge` | `status`: pending, completed, locked, critical, info | Preset status pill |
| `Banner` | `tone`: info, success, warning, critical · `title`, `dismissable`, `onDismiss`, `actions` | Contextual message banner |

### Forms
| Component | Props / Variants | Notes |
|-----------|-----------------|-------|
| `TextInput` | `label`, `value`, `onChange`, `type`, `placeholder`, `prefix`, `suffix`, `disabled`, `readOnly`, `required`, `helpText`, `error`, `clearButton`, `borderless`, `tone`, `size`: medium, slim, `labelAction` | Primary text/number input |
| `TextareaInput` | `label`, `value`, `onChange`, `rows`, `disabled`, `readOnly`, `required`, `helpText`, `error`, `maxLength`, `labelAction` | Multiline text input |
| `NumberInput` | `label`, `value`, `onChange`, `min`, `max`, `step`, `prefix`, `disabled`, `readOnly`, `required`, `helpText`, `error` | Stepper number input |
| `SelectInput` | `label`, `options`, `placeholder`, `disabled` | Dropdown select |
| `Checkbox` | `label`, `helpText`, `error`, `disabled`, `checked`, `onChange`, `tone` | Single checkbox |
| `RadioButton` | `label`, `helpText`, `disabled`, `checked`, `onChange` | Single radio button |
| `RadioGroup` | `label`, `options`, `disabled` | Yes/No radio pair |
| `ChoiceList` | `title`, `choices`, `selected`, `onChange`, `allowMultiple`, `error` | Grouped checkbox or radio list |

### Navigation & Layout
| Component | Props / Variants | Notes |
|-----------|-----------------|-------|
| `Page` | `title`, `subtitle`, `backAction`, `metadata=[{label,tone}]`, `primaryAction`, `secondaryActions=[{content,onAction,disclosure}]`, `pagination` | Page-level header wrapper |
| `Pagination` | `hasPrevious`, `hasNext`, `onPrevious`, `onNext`, `label`, `type`: page, table | Prev/next pagination — page type is standalone pill buttons; table type is full-width row with `#f7f9fc` bg |
| `Tabs` | `tabs=[{label,badge,disabled}]`, `activeIndex`, `onChange`, `fitted`, `moreViews`, `canAddNew`, `mobile` | Tab bar — desktop and mobile variants |
| `Accordion` | `title`, `required`, `open`, `onToggle`, `hasContent` | Expandable section with green dot indicator |
| `Overlay` | `onClose`, `children` | Modal backdrop — closes on Escape + backdrop click |
| `Divider` | `variant`: default, strong | Horizontal rule |

### Data Display
| Component | Props / Variants | Notes |
|-----------|-----------------|-------|
| `IndexTable` | `type`: products, orders · `rows`, `tabs`, `onTabChange` | Sortable table with search, filters, bulk actions, pagination |
| `OptionList` | `title`, `options=[{value,label,badge,media,disabled,description}]`, `selected`, `onChange`, `allowMultiple`, `sections` | Selectable list — single or multi-select |

### Icons
| Component | Usage | Notes |
|-----------|-------|-------|
| `PolarisIconImg` | `<PolarisIconImg name="ArrowLeftIcon" size={20} color="#303030"/>` | Primary icon renderer — pulls from built-in `POLARIS_ICON_DATA` map |

**Available icon names (subset):** `ArrowLeftIcon`, `ArrowRightIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `ChevronUpIcon`, `ChevronDownIcon`, `SearchIcon`, `FilterIcon`, `SortIcon`, `CheckIcon`, `CheckSmallIcon`, `XIcon`, `XSmallIcon`, `PlusIcon`, `MinusIcon`, `InfoIcon`, `AlertTriangleIcon`, `AlertDiamondIcon` — and 500+ more in `POLARIS_ICON_DATA`.

---

## General Rules

- IMPORTANT: Never hardcode colors — use the token values defined above
- IMPORTANT: Never import or link to icon packages — always use inline SVG
- IMPORTANT: All new `.html` files must include the React 18 CDN scripts and Inter font link
- IMPORTANT: When implementing Figma designs, translate to this project's inline-style React pattern — do not output Tailwind classes or CSS modules
- Disabled states must always set `cursor: 'not-allowed'` and reduce opacity or use disabled color tokens
- Form fields always pair a `FieldLabel` with the input component
- Interactive card hover states always change `borderColor` to `#005bd3` with a matching shadow `rgba(0,91,211,0.12)`
