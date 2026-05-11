import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,Group as c,Segmented as l,t as u}from"./Btn.stories-Dy0CQqK1.js";function d(e){let n={code:`code`,em:`em`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/Btn/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`button`,children:`Button`}),`
`,(0,p.jsx)(n.p,{children:`Triggers an action. Buttons are the primary interactive control in the system — they submit forms, navigate between screens, and execute commands.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.p,{children:[`| Variant | Use when |
|---------|----------|
| `,(0,p.jsx)(n.strong,{children:`Primary`}),` | The single most important action on a screen (Save, Continue, Confirm) |
| `,(0,p.jsx)(n.strong,{children:`Secondary`}),` | Supplementary actions alongside a primary (Cancel, Back, View) |
| `,(0,p.jsx)(n.strong,{children:`Destructive`}),` | Irreversible, high-risk actions (Delete, Remove, Discard) |
| `,(0,p.jsx)(n.strong,{children:`Ghost`}),` | Inline contextual actions; tertiary links that open drawers or modals |
| `,(0,p.jsx)(n.strong,{children:`Plain`}),` | Low-emphasis; navigation-style links within a page |`]}),`
`,(0,p.jsxs)(n.p,{children:[(0,p.jsx)(n.strong,{children:`Do not`}),` place two primary buttons side by side. One primary per view.`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`/* Import this before using any classes */
@import 'tokens/tokens.css';
@import 'components/Btn/Btn.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Primary -->
<button class="nx-btn nx-btn--primary">Save</button>

<!-- Secondary (default border style) -->
<button class="nx-btn nx-btn--secondary">Cancel</button>

<!-- Destructive -->
<button class="nx-btn nx-btn--destructive">Delete record</button>

<!-- Ghost / plain link -->
<button class="nx-btn nx-btn--ghost">Learn more</button>

<!-- Size modifiers -->
<button class="nx-btn nx-btn--primary nx-btn--sm">Micro</button>
<button class="nx-btn nx-btn--primary nx-btn--lg">Large</button>

<!-- Full width -->
<button class="nx-btn nx-btn--primary nx-btn--full">Submit</button>

<!-- Disabled -->
<button class="nx-btn nx-btn--primary" disabled>Save</button>

<!-- Button group -->
<div class="nx-btn-group">
  <button class="nx-btn nx-btn--primary">Save</button>
  <button class="nx-btn nx-btn--secondary">Cancel</button>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,p.jsx)(n.code,{children:`8px`}),` | Border radius (all variants) |
| `,(0,p.jsx)(n.code,{children:`--nx-font-family`}),` | `,(0,p.jsx)(n.code,{children:`'Inter', sans-serif`}),` | Font |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-caption`}),` | `,(0,p.jsx)(n.code,{children:`12px`}),` | Default button text size |
| `,(0,p.jsx)(n.code,{children:`--nx-font-weight-bold`}),` | `,(0,p.jsx)(n.code,{children:`600`}),` | Primary / destructive weight |
| `,(0,p.jsx)(n.code,{children:`--nx-font-weight-semibold`}),` | `,(0,p.jsx)(n.code,{children:`550`}),` | Secondary weight |
| `,(0,p.jsx)(n.code,{children:`--nx-line-height-tight`}),` | `,(0,p.jsx)(n.code,{children:`16px`}),` | Button text line height |
| `,(0,p.jsx)(n.code,{children:`--nx-shadow-btn-rest`}),` | `,(0,p.jsx)(n.em,{children:`(inset shadow)`}),` | Secondary at rest border |
| `,(0,p.jsx)(n.code,{children:`--nx-shadow-btn-hover`}),` | `,(0,p.jsx)(n.em,{children:`(inset shadow)`}),` | Secondary on hover |
| `,(0,p.jsx)(n.code,{children:`--nx-shadow-btn-active`}),` | `,(0,p.jsx)(n.em,{children:`(inset shadow)`}),` | All buttons pressed state |
| `,(0,p.jsx)(n.code,{children:`--nx-shadow-btn-primary`}),` | `,(0,p.jsx)(n.em,{children:`(inset shadow)`}),` | Primary at rest |
| `,(0,p.jsx)(n.code,{children:`--nx-shadow-btn-critical`}),` | `,(0,p.jsx)(n.em,{children:`(inset shadow)`}),` | Destructive at rest |
| `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,p.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Focus outline (all variants) |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-disabled`}),` | `,(0,p.jsx)(n.code,{children:`rgba(0,0,0,0.06)`}),` | Disabled background |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-on-primary`}),` | `,(0,p.jsx)(n.code,{children:`#ffffff`}),` | Text on filled buttons |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`why-box-shadow-borders`,children:`Why box-shadow borders?`}),`
`,(0,p.jsxs)(n.p,{children:[`Standard CSS `,(0,p.jsx)(n.code,{children:`border`}),` occupies layout space — toggling it on state change shifts content around it.
Inset `,(0,p.jsx)(n.code,{children:`box-shadow`}),` is painted `,(0,p.jsx)(n.em,{children:`inside`}),` the element's bounds, so state transitions are layout-shift-free.
The outset focus ring then layers on top without conflicting with the inset border.`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Always use a `,(0,p.jsx)(n.code,{children:`<button>`}),` element (not `,(0,p.jsx)(n.code,{children:`<div>`}),` or `,(0,p.jsx)(n.code,{children:`<a>`}),` for actions)`]}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled buttons should use the `,(0,p.jsx)(n.code,{children:`disabled`}),` attribute (not just visual styling)`]}),`
`,(0,p.jsxs)(n.li,{children:[`Icon-only buttons (`,(0,p.jsx)(n.code,{children:`IconBtn`}),`) must have an `,(0,p.jsx)(n.code,{children:`aria-label`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Never remove `,(0,p.jsx)(n.code,{children:`outline: none`}),` without replacing it with `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` on `,(0,p.jsx)(n.code,{children:`:focus-visible`})]}),`
`,(0,p.jsx)(n.li,{children:`Destructive actions should be confirmed in a dialog before executing`}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { Btn, ButtonGroup, BtnGroupSegmented, IconBtn } from 'components/Btn/Btn.jsx';

// Basic variants
<Btn variant="primary" onClick={fn}>Save</Btn>
<Btn variant="secondary" onClick={fn}>Cancel</Btn>
<Btn variant="destructive" onClick={fn}>Delete</Btn>
<Btn variant="ghost" onClick={fn}>Learn more</Btn>

// Modifiers
<Btn variant="primary" small>Compact</Btn>
<Btn variant="primary" fullWidth>Full width</Btn>
<Btn variant="secondary" disclosure>More actions</Btn>
<Btn variant="primary" disabled>Unavailable</Btn>

// With icon (inline SVG)
<Btn variant="primary" icon={<IconPlus size={16} color="currentColor" />}>Add item</Btn>

// Groups
<ButtonGroup>
  <Btn variant="primary">Save</Btn>
  <Btn variant="secondary">Cancel</Btn>
</ButtonGroup>

<BtnGroupSegmented buttons={[
  { label: 'All',      onClick: fn },
  { label: 'Active',   onClick: fn },
  { label: 'Archived', onClick: fn, disabled: true },
]} />
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`groups--segmented`,children:`Groups & segmented`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};