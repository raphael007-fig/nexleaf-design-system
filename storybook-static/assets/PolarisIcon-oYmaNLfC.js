import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllIcons as s,Colors as c,Sizes as l,t as u}from"./PolarisIcon.stories-C0NuWhDo.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Foundation/PolarisIcon/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`polarisicon`,children:`PolarisIcon`}),`
`,(0,p.jsx)(n.p,{children:`Inline SVG icon system derived from Shopify's Polaris icon set. All icons are embedded as inline SVG data — no external requests, no icon font, no package dependency.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states--sizes--colors`,children:`Interaction states — sizes & colors`}),`
`,(0,p.jsx)(r,{of:l}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsx)(n.li,{children:`Use icons to reinforce meaning, never to replace a text label`}),`
`,(0,p.jsxs)(n.li,{children:[`Action buttons may be icon-only when space is constrained — always add `,(0,p.jsx)(n.code,{children:`aria-label`})]}),`
`,(0,p.jsx)(n.li,{children:`Status indicators, form prefixes/suffixes, navigation items`}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`available-icons-32`,children:`Available icons (32)`}),`
`,(0,p.jsx)(n.p,{children:`All icons are 20×20px native. Click any icon in the grid to copy its name.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`sizes`,children:`Sizes`}),`
`,(0,p.jsxs)(n.p,{children:[`The `,(0,p.jsx)(n.code,{children:`size`}),` prop scales the SVG uniformly. Common values: 12, 16, 20, 24.`]}),`
`,(0,p.jsx)(r,{of:l}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`colors`,children:`Colors`}),`
`,(0,p.jsx)(n.p,{children:`Pass any CSS color value. Always use a token value — never hardcode.`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-implementation`,children:`CSS implementation`}),`
`,(0,p.jsxs)(n.p,{children:[`Icons in non-React stacks should use inline SVG directly. Copy the SVG path from `,(0,p.jsx)(n.code,{children:`PolarisIcon.jsx`}),` and embed it.`]}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Inline SVG (copy path from PolarisIcon.jsx → POLARIS_ICON_DATA) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="#616161" aria-hidden="true">
  <path fill-rule="evenodd" d="M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
</svg>

<!-- Icon-only button — must have aria-label -->
<button aria-label="Search" class="nx-btn nx-btn--secondary">
  <svg width="20" height="20" ...>...</svg>
</button>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`color-tokens-for-icons`,children:`Color tokens for icons`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Usage |
|-------|-------|-------|
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Primary action icons |
| `,(0,p.jsx)(n.code,{children:`--nx-text-subdued`}),` | `,(0,p.jsx)(n.code,{children:`#616161`}),` | Secondary / input adornment icons |
| `,(0,p.jsx)(n.code,{children:`--nx-text-placeholder`}),` | `,(0,p.jsx)(n.code,{children:`#9e9e9e`}),` | Chevron icons, tertiary |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled state icons |
| `,(0,p.jsx)(n.code,{children:`--nx-color-primary`}),` | `,(0,p.jsx)(n.code,{children:`#005bd3`}),` | Interactive / link icons |
| `,(0,p.jsx)(n.code,{children:`--nx-color-critical`}),` | `,(0,p.jsx)(n.code,{children:`#d92d20`}),` | Error / destructive icons |
| `,(0,p.jsx)(n.code,{children:`--nx-color-success`}),` | `,(0,p.jsx)(n.code,{children:`#12b76a`}),` | Success indicator icons |
| `,(0,p.jsx)(n.code,{children:`--nx-color-morning`}),` | `,(0,p.jsx)(n.code,{children:`#f59e0b`}),` | Morning session icons |
| `,(0,p.jsx)(n.code,{children:`--nx-color-evening`}),` | `,(0,p.jsx)(n.code,{children:`#6366f1`}),` | Evening session icons |
| `,(0,p.jsx)(n.code,{children:`--nx-text-on-primary`}),` | `,(0,p.jsx)(n.code,{children:`#ffffff`}),` | Icons on colored backgrounds |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { PolarisIconImg } from 'components/PolarisIcon/PolarisIcon.jsx';

// Basic usage
<PolarisIconImg name="SearchIcon" size={20} color="#616161" />

// Using token value
<PolarisIconImg name="DeleteIcon" size={20} color="var(--nx-color-critical)" />

// In a button
<Btn variant="secondary" icon={<PolarisIconImg name="PlusIcon" size={16} color="currentColor" />}>
  Add item
</Btn>

// Icon only (add aria-label on the parent button)
<IconBtn icon={<PolarisIconImg name="EditIcon" size={20} color="#303030" />} aria-label="Edit" />
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`adding-new-icons`,children:`Adding new icons`}),`
`,(0,p.jsx)(n.p,{children:`To add an icon to the system:`}),`
`,(0,p.jsxs)(n.ol,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Find the SVG path at `,(0,p.jsx)(n.code,{children:`node_modules/@shopify/polaris-icons`}),` or the Figma file `,(0,p.jsx)(n.strong,{children:`Nexleaf Icons V2`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Add an entry to `,(0,p.jsx)(n.code,{children:`POLARIS_ICON_DATA`}),` in `,(0,p.jsx)(n.code,{children:`PolarisIcon.jsx`}),`:`]}),`
`]}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-js`,children:`NewIcon: {
  viewBox: '0 0 20 20',
  body: '<path d="..." />'
},
`})}),`
`,(0,p.jsxs)(n.ol,{start:`3`,children:[`
`,(0,p.jsxs)(n.li,{children:[`The icon becomes available immediately across all instances of `,(0,p.jsx)(n.code,{children:`PolarisIconImg`}),`.`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Decorative icons (beside a text label): add `,(0,p.jsx)(n.code,{children:`aria-hidden="true"`}),` on the `,(0,p.jsx)(n.code,{children:`<svg>`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Meaningful icons with no visible text label: add `,(0,p.jsx)(n.code,{children:`aria-label`}),` on the parent `,(0,p.jsx)(n.code,{children:`<button>`}),` or add a visually hidden `,(0,p.jsx)(n.code,{children:`<span>`}),` describing the action`]}),`
`,(0,p.jsx)(n.li,{children:`Never rely on icon shape alone to communicate status — pair with a text label or badge`}),`
`]})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};