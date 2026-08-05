---
name: ds-components-only
description: BINDING rule for all UI work in this repo and Raphael's projects — NEVER generate UI components from scratch; always compose from the Poltail design system. Trigger whenever building, editing, prototyping, or generating ANY screen, page, table, card, form, panel, button, or widget, and when auditing code for design-system compliance.
---

# DS Components Only — the No-Scratch Rule

**Never generate UI components from scratch. Ever.** Every visible element is composed
from the Poltail design system (`src/components`, `src/tokens`), imported via the barrel
(`src/index.js`; `@ds` alias in `prototype-hub`).

This applies everywhere, with the workflow project (`prototype-hub/`) held to the
strictest standard — it is the showcase of the system.

## The rule, precisely

1. **Before writing any UI**, list the elements the screen needs, then find each one's
   Poltail component (47 in `src/components/`: Btn, Card, NavCard, Page, IndexTable,
   LinkCell, Badge, Tag/TagGroup, Banner, Modal, SlideOver, BottomSheet, Toast, Tabs,
   TextInput, SelectInput, SearchSelect, Checkbox, RadioButton, Toggle, DatePicker,
   DateField, Skeleton, Popover, Tooltip, Breadcrumbs, Pagination, Stepper,
   SideNavigation, TopBar, Toolbar, MenuDrawer, AppShell, MetricCard, EquipmentCard,
   Accordion, OptionCard, OptionList, Cell, Divider, Upload, Overlay, AiChat,
   PolarisIcon, ...). Read the component's `.stories.jsx` for exact props before using.
2. **Standard mappings:** links in tables → `LinkCell` · status/type chips → `Badge` ·
   labels → `Tag` · buttons → `Btn` · panels → `SlideOver`/`Modal`/`BottomSheet` ·
   page headers → `Page` · navigation cards → `NavCard` · tables → `IndexTable`
   (`bare` inside custom containers).
3. **Tokens only** for values: `src/tokens/index.js` (JS) / `tokens.css` (CSS vars).
   No hardcoded hex/px for anything the tokens cover.
4. **Icons: Polaris only** (`PolarisIconImg` / `POLARIS_ICON_DATA`). Missing icon → add
   its SVG path to the catalog; never import another icon library.
5. **CSS files do LAYOUT ONLY** (grid/flex positioning, margins, containers). Never
   re-style DS internals, re-create component visuals, or override DS CSS.
6. **If no DS component fits:** do NOT hand-roll a lookalike. Say so, propose
   adding/extending a DS component (folder + stories per repo convention), raise a Jira
   ticket (`ds(<Component>): ...`). The screen uses it only after it exists in the DS.


## Search properly BEFORE concluding anything is missing

Broad multi-word queries miss things. Run several **short, single-concept** searches
(`"metric"`, then `"card"`, then `"tile"`, then `"KPI"`) scoped to the library key, and also
scan the product files for the pattern used as a *design* rather than a component (the
**Design Rep** page is the canonical layout/tile resource). Only after both come up empty is
something genuinely missing. (A broad query missed `Metric Card`, which does exist.)

## Layout & placement — copy the canonical references, don't invent

**Code:** `src/pages/ApplicationLayout/ApplicationLayout.stories.jsx` (Sectioned layout) is
THE reference for screen placement. Read it before building any screen.

```jsx
<AppShell level="secondary" navItems={...} activeItemId={...} contentWidth="full">
  <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
    <Page title="..." subtitle="..." primaryAction={{ content: '...', disclosure: true, onAction }} />
    <div style={{ ...grid..., marginBottom: 24 }}>{/* metrics */}</div>
    <div style={{ marginBottom: 24 }}>{/* banner */}</div>
    <IndexTable ... />
  </div>
</AppShell>
```

- `contentWidth="full"` — never a fixed px width; content fills the right column so its edges
  align with the toolbar's breadcrumb (left) and avatar (right).
- **Wrapper top padding MUST be 0** — `Page` already owns 24px top padding. Adding more stacks
  two gaps and visibly shoves the header down the screen (a real bug Raf caught).
- **24px section rhythm** via `marginBottom: 24` per section, not a wrapper `gap`.
- Wrap every screen in `AppShell`; a bare content column is incomplete.
- Tooling/hub chrome must never overlap product top-bar controls (Ask AI, region, apps,
  notifications, avatar).

## After a correction

When Raf corrects something, encode it in this skill AND `FIGMA-MAP.md` / `docs/` in the SAME
turn — not just in the code. A fix that isn't written down gets repeated.

## Figma layout & spacing

Match the Design Rep reference: Top bar 1440x56 (+1px divider at y=57) - collapsed nav rail
56px at x=0 - content at **x=80, y=72**, width 1280 - **no extra top padding on the content
column** (y=72 already gives the 16px gap; padding double-spaces the header). Wrap screens in
`AppShell` containing a `Page`; a bare content column is incomplete.

## When something is genuinely missing

Do not hand-roll a lookalike and do not open a new ticket. Build the component properly in
the design-system Figma file (`Nexleaf Design System v2.1`, fileKey `y4XdS2kaiS8eMHY3z8wORP`)
following its conventions, ask Raf to publish the library, and **comment on PD-16 "Design
System V2.1 Updates"** - the running log for DS component work.

## Nested-instance defaults

A placed Figma instance keeps placeholder text ("Label", "Content", "Heading",
"0 High Priority"). Set every visible string via `setProperties` on the nested instance.

## Self-audit (mandatory before presenting any UI)

Scan your own output for: raw `<button>`, `<table>`, `<input>`, `<select>`, links styled
as buttons/pills, custom badge/chip divs, hardcoded colors, non-Polaris icons.
Any hit = replace with the DS component before showing the result. Also check for leftover
placeholder strings, inconsistent sizing across sibling elements, wrapping text, spacing that
deviates from the reference, and global edits that hit unintended nodes (matching a common
name like `content` also matches annotation panels).

## Compliance audits

On "audit for DS compliance" / "replace with my design system components": sweep the
target, list every violation with its DS replacement, apply the replacements, record the
change (CHANGELOG + commit `proto(...)/ds(...) [PD-XX]` + Jira comment).

## Related

`FIGMA-MAP.md` (component map, canvas rules, mirror rule) · `docs/08-conventions.md`.
