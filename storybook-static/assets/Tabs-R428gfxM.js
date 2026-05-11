import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,WithBadges as l,t as u}from"./Tabs.stories-C-HfCIf3.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/Tabs/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`tabs`,children:`Tabs`}),`
`,(0,p.jsx)(n.p,{children:`Horizontal navigation for switching between related views within the same page context. Does not cause full page navigation — it filters or switches the content below.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsx)(n.li,{children:`Filtering a list by status (All / Active / Archived)`}),`
`,(0,p.jsx)(n.li,{children:`Switching between related data views (Overview / Details / History)`}),`
`,(0,p.jsx)(n.li,{children:`Mobile: larger 14px tabs for touch targets`}),`
`]}),`
`,(0,p.jsxs)(n.p,{children:[`Do `,(0,p.jsx)(n.strong,{children:`not`}),` use Tabs for top-level page navigation — use the sidebar/nav instead.`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Tabs/Tabs.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Basic tabs -->
<div role="tablist" class="nx-tabs">
  <button role="tab" aria-selected="true"  class="nx-tab nx-tab--active">All</button>
  <button role="tab" aria-selected="false" class="nx-tab">Active</button>
  <button role="tab" aria-selected="false" class="nx-tab nx-tab--disabled" disabled>Archived</button>
</div>

<!-- With badge counts -->
<div role="tablist" class="nx-tabs">
  <button role="tab" aria-selected="true" class="nx-tab nx-tab--active">
    All
    <span class="nx-tab__badge">24</span>
  </button>
  <button role="tab" aria-selected="false" class="nx-tab">
    Active
    <span class="nx-tab__badge">12</span>
  </button>
</div>

<!-- Fitted (equal-width tabs) -->
<div role="tablist" class="nx-tabs nx-tabs--fitted">
  <button role="tab" class="nx-tab nx-tab--active">Morning</button>
  <button role="tab" class="nx-tab">Evening</button>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,p.jsx)(n.code,{children:`8px`}),` | Tab corner radius |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-caption`}),` | `,(0,p.jsx)(n.code,{children:`12px`}),` | Tab label size (desktop) |
| `,(0,p.jsx)(n.code,{children:`--nx-font-weight-semibold`}),` | `,(0,p.jsx)(n.code,{children:`550`}),` | Tab label weight |
| `,(0,p.jsx)(n.code,{children:`--nx-line-height-tight`}),` | `,(0,p.jsx)(n.code,{children:`16px`}),` | Tab label line height |
| `,(0,p.jsx)(n.code,{children:`--nx-color-primary`}),` | `,(0,p.jsx)(n.code,{children:`#005bd3`}),` | Focus ring border |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Tab label color |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled tab text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-subdued`}),` | `,(0,p.jsx)(n.code,{children:`#616161`}),` | Badge count color |
| `,(0,p.jsx)(n.code,{children:`--nx-space-1`}),` | `,(0,p.jsx)(n.code,{children:`4px`}),` | Gap between tabs |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Wrap in `,(0,p.jsx)(n.code,{children:`<div role="tablist">`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Each tab: `,(0,p.jsx)(n.code,{children:`role="tab"`}),`, `,(0,p.jsx)(n.code,{children:`aria-selected="true/false"`})]}),`
`,(0,p.jsxs)(n.li,{children:[`The content panel: `,(0,p.jsx)(n.code,{children:`role="tabpanel"`}),` with `,(0,p.jsx)(n.code,{children:`aria-labelledby`}),` pointing to the active tab's `,(0,p.jsx)(n.code,{children:`id`})]}),`
`,(0,p.jsx)(n.li,{children:`Keyboard: Arrow keys move focus between tabs; Enter/Space selects`}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled tabs: add `,(0,p.jsx)(n.code,{children:`disabled`}),` attribute and `,(0,p.jsx)(n.code,{children:`aria-disabled="true"`})]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { Tabs } from 'components/Tabs/Tabs.jsx';

const [active, setActive] = useState(0);

<Tabs
  activeIndex={active}
  onChange={setActive}
  tabs={[
    { label: 'All', badge: 24 },
    { label: 'Active', badge: 12 },
    { label: 'Archived', disabled: true },
  ]}
/>

// Fitted (equal width)
<Tabs fitted activeIndex={active} onChange={setActive}
  tabs={[{ label: 'Morning' }, { label: 'Evening' }]} />

// With "More views" and "Add new" controls
<Tabs moreViews canAddNew activeIndex={active} onChange={setActive}
  tabs={[{ label: 'All' }, { label: 'Active' }]} />
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};