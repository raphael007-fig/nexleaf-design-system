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

## Self-audit (mandatory before presenting any UI)

Scan your own output for: raw `<button>`, `<table>`, `<input>`, `<select>`, links styled
as buttons/pills, custom badge/chip divs, hardcoded colors, non-Polaris icons.
Any hit = replace with the DS component before showing the result.

## Compliance audits

On "audit for DS compliance" / "replace with my design system components": sweep the
target, list every violation with its DS replacement, apply the replacements, record the
change (CHANGELOG + commit `proto(...)/ds(...) [PD-XX]` + Jira comment).

## Related

`FIGMA-MAP.md` (component map, canvas rules, mirror rule) · `docs/08-conventions.md`.
