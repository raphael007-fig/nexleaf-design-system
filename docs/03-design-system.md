# 3. Design System (Poltail)

"Poltail" = **Pol**aris + **Tail**wind — a Polaris-based system with Tailwind-flavored
ergonomics. It's the source of truth for how UI is actually built. Browse it live with
`npm run storybook`.

## Tokens

Never hardcode colors, spacing, or radii. Use tokens from `src/tokens/`:
- **JS constants** — `src/tokens/index.js` (for inline styles in `.jsx`).
- **CSS variables** — `src/tokens/tokens.css` (for `.css` files).

Key values (see the token files for the full set):

| Kind | Examples |
|---|---|
| Text | `TEXT_DEFAULT #303030`, `TEXT_SUBDUED #616161`, `TEXT_PLACEHOLDER #9e9e9e` |
| Surface | `BG_PAGE #f1f1f1`, `BG_SURFACE #fff`, `BG_INPUT #fdfdfd` |
| Primary (interactive) | `COLOR_PRIMARY #005bd3` (Polaris blue) |
| Semantic | success / warning / info / critical families (bg + text + border each) |
| Brand green | `COLOR_AI #31b564` — reserved for AI/success/brand, **not** primary actions |
| Radius | `RADIUS_XS 4` → `RADIUS_SM 8` → `RADIUS_LG 12` → `RADIUS_PILL 100` |
| Spacing | 4 / 8 / 12 / 16 scale |

Token stories live under `src/tokens/*.stories.jsx` (Colors, Typography, Spacing, Shadows).

## Component catalog (47)

Imported in one line via the barrel: `import { Btn, Card, IndexTable } from '@ds'`
(in the hub) or from `../src/index.js` elsewhere.

- **Actions & inputs:** Btn, Checkbox, RadioButton, Toggle, TextInput, TextareaInput, NumberInput, SelectInput, SearchSelect, DateField, DatePicker, Upload, Stepper
- **Containers & layout:** Card, Page, AppShell, Divider, Accordion, Tabs, OptionCard, OptionList, Cell
- **Navigation:** SideNavigation, TopBar, Toolbar, Breadcrumbs, Pagination, MenuDrawer, NavCard, TertiaryActions
- **Data display:** IndexTable, MetricCard, EquipmentCard, TemperatureTasksCard, Badge, Tag
- **Feedback & overlays:** Banner, Toast, Modal, Popover, Tooltip, SlideOver, BottomSheet, Overlay, Skeleton, SubmissionSuccessCard
- **Media/AI:** AiChat, PolarisIcon

Each component's props are documented in its `.stories.jsx` / `.mdx`. The top-12 prop APIs
are also summarized in [`../FIGMA-MAP.md`](../FIGMA-MAP.md).

## Conventions

- **One folder per component:** `src/components/<Name>/` with `<Name>.jsx`, `<Name>.css`, `<Name>.stories.jsx` (+ optional `.mdx`).
- **Styling:** mostly inline styles driven by tokens; some components use a `.css` file. CSS is loaded globally (via Storybook `preview.js`, and in the hub via a glob import) — components don't self-import CSS.
- **CSS prefix:** `nx-` on classes/keyframes to avoid collisions with host apps.
- **Barrel export:** `src/index.js` re-exports every component + token. Regenerate with `prototype-hub` → `npm run gen-barrel` after adding components.

## Adding or changing a component

1. Create/edit the component folder and its story.
2. Run `npm run gen-barrel` (from `prototype-hub/`) so it's exported.
3. Bump the version and note it (see [Conventions](08-conventions.md)).
4. Verify visually in Storybook + run `npm run test:visual`.
5. Track the change in Jira (see [Jira](06-jira-tracking.md)).

## Testing

- **Chromatic** — visual review of Storybook stories.
- **Playwright** — `npm run test:visual` (update snapshots with `npm run test:visual:update`).

## Angular port

`angular/` mirrors the system for Angular consumers. Keep it in step when the React
components change (`npm run storybook:angular` to browse it).
