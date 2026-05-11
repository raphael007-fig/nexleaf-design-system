import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllVariants as s,Default as c,t as l}from"./Divider.stories-Bg7koAx8.js";function u(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,p:`p`,pre:`pre`,...t(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{title:`Components/Divider/Docs`}),`
`,(0,f.jsx)(n.h1,{id:`divider`,children:`Divider`}),`
`,(0,f.jsx)(n.p,{children:`Horizontal rule for separating content sections. Three visual weights to match different contexts.`}),`
`,(0,f.jsx)(r,{of:s}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`interaction-states--all-variants`,children:`Interaction states — all variants`}),`
`,(0,f.jsx)(r,{of:s}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`variants`,children:`Variants`}),`
`,(0,f.jsxs)(n.p,{children:[`| Variant | Height | Color | Margin | Use for |
|---------|--------|-------|--------|---------|
| `,(0,f.jsx)(n.code,{children:`default`}),` | 1px | `,(0,f.jsx)(n.code,{children:`#ebebeb`}),` | `,(0,f.jsx)(n.code,{children:`4px 0`}),` | Standard section separation |
| `,(0,f.jsx)(n.code,{children:`strong`}),` | 1.5px | `,(0,f.jsx)(n.code,{children:`#e0e0e0`}),` | `,(0,f.jsx)(n.code,{children:`8px 0`}),` | Major section breaks, card edges |
| `,(0,f.jsx)(n.code,{children:`subtle`}),` | 1px | `,(0,f.jsx)(n.code,{children:`#f0f0f0`}),` | `,(0,f.jsx)(n.code,{children:`0`}),` | Intra-list rows, tight separators |`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Divider/Divider.css';
`})}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-html`,children:`<div class="nx-divider"></div>
<div class="nx-divider nx-divider--strong"></div>
<div class="nx-divider nx-divider--subtle"></div>

<!-- or using <hr> -->
<hr class="nx-divider" />
`})}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,f.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,f.jsx)(n.code,{children:`--nx-border-light`}),` | `,(0,f.jsx)(n.code,{children:`#ebebeb`}),` | Default divider color |
| `,(0,f.jsx)(n.code,{children:`--nx-border-default`}),` | `,(0,f.jsx)(n.code,{children:`#e0e0e0`}),` | Strong divider color |
| `,(0,f.jsx)(n.code,{children:`--nx-border-lighter`}),` | `,(0,f.jsx)(n.code,{children:`#f0f0f0`}),` | Subtle divider color |
| `,(0,f.jsx)(n.code,{children:`--nx-space-1`}),` | `,(0,f.jsx)(n.code,{children:`4px`}),` | Default vertical margin |
| `,(0,f.jsx)(n.code,{children:`--nx-space-2`}),` | `,(0,f.jsx)(n.code,{children:`8px`}),` | Strong vertical margin |`]}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,f.jsx)(n.pre,{children:(0,f.jsx)(n.code,{className:`language-jsx`,children:`import { Divider } from 'components/Divider/Divider.jsx';

<Divider />                       // default
<Divider variant="strong" />      // 1.5px, #e0e0e0
<Divider variant="subtle" />      // 1px, #f0f0f0, no margin
`})}),`
`,(0,f.jsx)(n.hr,{}),`
`,(0,f.jsx)(r,{of:c})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,f.jsx)(n,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;e((()=>{f=n(),o(),a(),l()}))();export{d as default};