import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,Interactive as l,t as u}from"./Accordion.stories-C87GvKKd.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/Accordion/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`accordion`,children:`Accordion`}),`
`,(0,p.jsx)(n.p,{children:`A collapsible section that hides or reveals content on demand. Used to reduce visual complexity in long forms and detail views.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsx)(n.li,{children:`Form sections that are optional or secondary (Morning / Evening readings)`}),`
`,(0,p.jsx)(n.li,{children:`Details panels where most users only need to see one section at a time`}),`
`,(0,p.jsx)(n.li,{children:`Settings or configuration grouped by topic`}),`
`]}),`
`,(0,p.jsxs)(n.p,{children:[`Do `,(0,p.jsx)(n.strong,{children:`not`}),` use Accordion when all sections need to be visible simultaneously — use a flat form layout instead.`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Accordion/Accordion.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Closed -->
<div class="nx-accordion">
  <button class="nx-accordion__trigger" aria-expanded="false">
    <span class="nx-accordion__title">Morning Reading</span>
    <svg class="nx-accordion__chevron"><!-- chevron path --></svg>
  </button>
</div>

<!-- Open -->
<div class="nx-accordion">
  <button class="nx-accordion__trigger nx-accordion__trigger--open" aria-expanded="true">
    <span class="nx-accordion__title">Morning Reading</span>
    <svg class="nx-accordion__chevron"><!-- chevron path --></svg>
  </button>
  <div class="nx-accordion__body">
    <!-- form fields -->
  </div>
</div>

<!-- Required + has content (closed) -->
<div class="nx-accordion">
  <button class="nx-accordion__trigger" aria-expanded="false">
    <span class="nx-accordion__title nx-accordion__title--required">
      Morning Reading
      <span class="nx-accordion__dot"></span>
    </span>
    <svg class="nx-accordion__chevron"><!-- chevron path --></svg>
  </button>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-border-default`}),` | `,(0,p.jsx)(n.code,{children:`#e0e0e0`}),` | Container border + open-state divider |
| `,(0,p.jsx)(n.code,{children:`--nx-radius-md`}),` | `,(0,p.jsx)(n.code,{children:`10px`}),` | Container corner radius |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-surface`}),` | `,(0,p.jsx)(n.code,{children:`#ffffff`}),` | Closed trigger background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-open`}),` | `,(0,p.jsx)(n.code,{children:`#f7f9fc`}),` | Open trigger background |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-body`}),` | `,(0,p.jsx)(n.code,{children:`14px`}),` | Title font size |
| `,(0,p.jsx)(n.code,{children:`--nx-font-weight-bold`}),` | `,(0,p.jsx)(n.code,{children:`600`}),` | Title font weight |
| `,(0,p.jsx)(n.code,{children:`--nx-color-critical`}),` | `,(0,p.jsx)(n.code,{children:`#d92d20`}),` | Required asterisk |
| `,(0,p.jsx)(n.code,{children:`--nx-color-success`}),` | `,(0,p.jsx)(n.code,{children:`#12b76a`}),` | Has-content indicator dot |
| `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,p.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Trigger focus ring |
| `,(0,p.jsx)(n.code,{children:`--nx-space-5`}),` | `,(0,p.jsx)(n.code,{children:`20px`}),` | Gap between body children |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Trigger is a `,(0,p.jsx)(n.code,{children:`<button type="button">`}),` — keyboard navigable, announced by screen readers`]}),`
`,(0,p.jsxs)(n.li,{children:[`Use `,(0,p.jsx)(n.code,{children:`aria-expanded="true/false"`}),` on the trigger to communicate open state`]}),`
`,(0,p.jsxs)(n.li,{children:[`The body content must be hidden from assistive tech when closed — either use `,(0,p.jsx)(n.code,{children:`hidden`}),` attribute, `,(0,p.jsx)(n.code,{children:`display: none`}),`, or control `,(0,p.jsx)(n.code,{children:`visibility`})]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.code,{children:`aria-controls`}),` on the trigger pointing to the body `,(0,p.jsx)(n.code,{children:`id`}),` is recommended for robust AT support`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { Accordion } from 'components/Accordion/Accordion.jsx';

const [open, setOpen] = useState(false);

<Accordion
  title="Morning Reading"
  required
  open={open}
  onToggle={() => setOpen(o => !o)}
  hasContent={!!morningValue}
>
  <TextInput label="Temperature" suffix="°C" value={morningValue} onChange={fn} />
</Accordion>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};