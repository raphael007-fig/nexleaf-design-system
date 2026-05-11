import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,t as l}from"./Tooltip.stories-wY6dqwjA.js";function u(e){let n={code:`code`,em:`em`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{title:`Components/Tooltip/Docs`}),`
`,(0,f.jsx)(n.h1,{id:`tooltip`,children:`Tooltip`}),`
`,(0,f.jsx)(n.p,{children:`Floating label that briefly explains the function of a UI element. Triggered on hover or focus. Use when an icon or control needs a short text description that would clutter the interface if shown inline.`}),`
`,(0,f.jsx)(r,{of:s}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,f.jsxs)(n.ul,{children:[`
`,(0,f.jsx)(n.li,{children:`Icon-only buttons that need a label (e.g. filter, export, settings)`}),`
`,(0,f.jsx)(n.li,{children:`Truncated text that should show the full value on hover`}),`
`,(0,f.jsxs)(n.li,{children:[`Form fields with supplementary hints that don't fit as `,(0,f.jsx)(n.code,{children:`helpText`})]}),`
`]}),`
`,(0,f.jsxs)(n.p,{children:[`Do `,(0,f.jsx)(n.strong,{children:`not`}),` use tooltips for critical information — use a `,(0,f.jsx)(n.code,{children:`Banner`}),` or inline `,(0,f.jsx)(n.code,{children:`helpText`}),` instead. Tooltips are invisible until hovered and must never contain interactive content.`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,f.jsx)(r,{of:c}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`two-positions`,children:`Two positions`}),`
`,(0,f.jsxs)(n.p,{children:[`| `,(0,f.jsx)(n.code,{children:`position`}),` | Tooltip placement | Arrow direction |
|------------|------------------|-----------------|
| `,(0,f.jsx)(n.code,{children:`above`}),` `,(0,f.jsx)(n.em,{children:`(default)`}),` | Above the trigger | Points down ↓ |
| `,(0,f.jsx)(n.code,{children:`below`}),` | Below the trigger | Points up ↑ |`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,f.jsxs)(n.p,{children:[`| Property | Value | Token |
|----------|-------|-------|
| Background | `,(0,f.jsx)(n.code,{children:`#ffffff`}),` | `,(0,f.jsx)(n.code,{children:`bg-surface`}),` |
| Text color | `,(0,f.jsx)(n.code,{children:`#303030`}),` | `,(0,f.jsx)(n.code,{children:`text-default`}),` |
| Font size | `,(0,f.jsx)(n.code,{children:`13px`}),` | label |
| Font weight | `,(0,f.jsx)(n.code,{children:`450`}),` | — |
| Border radius | `,(0,f.jsx)(n.code,{children:`8px`}),` | — |
| Padding | `,(0,f.jsx)(n.code,{children:`4px 8px`}),` | — |
| Drop shadow | `,(0,f.jsx)(n.code,{children:`0px 4px 6px -2px rgba(26,26,26,0.2)`}),` | shadow-300 |
| Inset top | `,(0,f.jsx)(n.code,{children:`inset 0 1px 0 rgba(204,204,204,0.5)`}),` | shadow-300 |
| Inset bottom | `,(0,f.jsx)(n.code,{children:`inset 0 -1px 0 rgba(0,0,0,0.17)`}),` | shadow-300 |
| Inset sides | `,(0,f.jsx)(n.code,{children:`inset ±1px 0 0 rgba(0,0,0,0.13)`}),` | shadow-300 |`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,f.jsxs)(n.ul,{children:[`
`,(0,f.jsxs)(n.li,{children:[`The floating tooltip div uses `,(0,f.jsx)(n.code,{children:`role="tooltip"`})]}),`
`,(0,f.jsxs)(n.li,{children:[`Trigger must have `,(0,f.jsx)(n.code,{children:`aria-describedby`}),` pointing to the tooltip in production use`]}),`
`,(0,f.jsxs)(n.li,{children:[`Tooltip appears on both `,(0,f.jsx)(n.code,{children:`:hover`}),` and `,(0,f.jsx)(n.code,{children:`:focus`}),` so keyboard users can trigger it`]}),`
`,(0,f.jsx)(n.li,{children:`Never put interactive elements (links, buttons) inside a tooltip`}),`
`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-jsx`,children:`import { Tooltip } from 'components/Tooltip/Tooltip.jsx';

// Default (above)
<Tooltip content="Create new view">
  <button>Add view</button>
</Tooltip>

// Below
<Tooltip content="Filter records" position="below">
  <Btn variant="secondary" icon={<FilterIcon />}>Filter</Btn>
</Tooltip>
`})})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),o(),a(),l()}))();export{d as default};