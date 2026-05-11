import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,Default as c,InteractionStates as l,t as u}from"./SelectInput.stories-iwcfnZc3.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/SelectInput/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`selectinput`,children:`SelectInput`}),`
`,(0,p.jsx)(n.p,{children:`Dropdown that lets the user choose one option from a predefined list. Part of the Forms family alongside TextInput, TextareaInput, and NumberInput.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`SelectInput`}),` — user must pick from a known, bounded set of options (status, country, session type)`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`RadioGroup`}),` — when there are ≤ 4 options and you want them all visible at once`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`OptionList`}),` — when options are rich (icons, descriptions, sections, multi-select)`]}),`
`]}),`
`,(0,p.jsx)(n.p,{children:`Do not use SelectInput for open-ended input — use TextInput instead.`}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:l}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsxs)(n.p,{children:[`SelectInput's styling is primarily applied to the native `,(0,p.jsx)(n.code,{children:`<select>`}),` element to keep it accessible and avoid custom dropdown implementations.`]}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Basic -->
<div style="width: 100%;">
  <label style="font-size: 13px; font-weight: 500; color: #303030; display: block; margin-bottom: 6px;">
    Country
  </label>
  <select class="nx-select">
    <option value="" disabled selected>Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </select>
</div>
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`.nx-select {
  width: 100%;
  padding: 10px 40px 10px 14px;
  border-radius: var(--nx-radius-sm);        /* 8px */
  border: 1.5px solid var(--nx-border-input); /* #8a8a8a */
  background: var(--nx-bg-input);             /* #fdfdfd */
  font-family: var(--nx-font-family);
  font-size: var(--nx-font-size-body);        /* 14px */
  color: var(--nx-text-default);
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  /* Chevron via inline SVG data URI */
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.nx-select:focus-visible {
  box-shadow: var(--nx-focus-ring);
}

.nx-select:disabled {
  border: none;
  background: var(--nx-bg-disabled);
  color: var(--nx-text-disabled);
  cursor: not-allowed;
}

/* Placeholder option styling */
.nx-select option[value=""] {
  color: var(--nx-text-placeholder);
}
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,p.jsx)(n.code,{children:`8px`}),` | Corner radius |
| `,(0,p.jsx)(n.code,{children:`--nx-border-input`}),` | `,(0,p.jsx)(n.code,{children:`#8a8a8a`}),` | Rest/hover/focus border |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-input`}),` | `,(0,p.jsx)(n.code,{children:`#fdfdfd`}),` | Rest background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-disabled`}),` | `,(0,p.jsx)(n.code,{children:`rgba(0,0,0,0.06)`}),` | Disabled background |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Selected value text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-placeholder`}),` | `,(0,p.jsx)(n.code,{children:`#9e9e9e`}),` | Placeholder option text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-subdued`}),` | `,(0,p.jsx)(n.code,{children:`#616161`}),` | Chevron icon color |
| `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,p.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Focus outline |
| `,(0,p.jsx)(n.code,{children:`--nx-color-critical`}),` | `,(0,p.jsx)(n.code,{children:`#d92d20`}),` | Required asterisk |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Wrap in a `,(0,p.jsx)(n.code,{children:`<label>`}),` or use `,(0,p.jsx)(n.code,{children:`aria-labelledby`}),` — never use placeholder as the sole label`]}),`
`,(0,p.jsxs)(n.li,{children:[`The placeholder `,(0,p.jsx)(n.code,{children:`<option>`}),` should have `,(0,p.jsx)(n.code,{children:`disabled`}),` and `,(0,p.jsx)(n.code,{children:`value=""`}),` so it cannot be re-selected`]}),`
`,(0,p.jsxs)(n.li,{children:[`Required fields use the native `,(0,p.jsx)(n.code,{children:`required`}),` attribute on `,(0,p.jsx)(n.code,{children:`<select>`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Custom chevron is decorative — `,(0,p.jsx)(n.code,{children:`aria-hidden="true"`}),` if implemented as a separate element`]}),`
`,(0,p.jsxs)(n.li,{children:[`Native `,(0,p.jsx)(n.code,{children:`<select>`}),` has full keyboard and screen-reader support out of the box — do not replace it with a `,(0,p.jsx)(n.code,{children:`<div>`}),` dropdown unless OptionList's richer feature set is needed`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { SelectInput } from 'components/SelectInput/SelectInput.jsx';

const OPTIONS = ['Morning', 'Evening', 'Both'];

// Basic
<SelectInput
  label="Session type"
  placeholder="Select type"
  options={OPTIONS}
  value={val}
  onChange={e => setVal(e.target.value)}
/>

// Required
<SelectInput
  label="Status"
  required
  placeholder="Choose status"
  options={['Active', 'Inactive', 'Pending']}
  value={val}
  onChange={fn}
/>

// Disabled
<SelectInput label="Region" options={['North']} disabled />
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`playground`,children:`Playground`}),`
`,(0,p.jsx)(r,{of:c})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};