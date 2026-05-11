import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,RadioButtons as l,t as u}from"./Checkbox.stories-CVk_UA40.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/Checkbox/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`checkbox--radiobutton`,children:`Checkbox & RadioButton`}),`
`,(0,p.jsx)(n.p,{children:`Selection controls for binary (checkbox) and mutually exclusive (radio) choices. Both share the same visual language and state behavior.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.p,{children:[`| Component | Use when |
|-----------|----------|
| `,(0,p.jsx)(n.code,{children:`Checkbox`}),` | Independent binary choice — can select any number |
| `,(0,p.jsx)(n.code,{children:`Checkbox`}),` (indeterminate) | "Select all" that is partially selected |
| `,(0,p.jsx)(n.code,{children:`RadioButton`}),` | Mutually exclusive — selecting one deselects others |
| `,(0,p.jsx)(n.code,{children:`ChoiceList`}),` | Multiple radio or checkbox options as a group with a shared label |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Checkbox/Checkbox.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Checkbox unchecked -->
<div class="nx-checkbox">
  <div class="nx-checkbox__row">
    <div role="checkbox" aria-checked="false" tabindex="0"
         class="nx-checkbox__control"></div>
    <span class="nx-checkbox__label">Enable morning session</span>
  </div>
</div>

<!-- Checked -->
<div class="nx-checkbox">
  <div class="nx-checkbox__row">
    <div role="checkbox" aria-checked="true" tabindex="0"
         class="nx-checkbox__control nx-checkbox__control--checked">
      <!-- check icon svg -->
    </div>
    <span class="nx-checkbox__label">Enable morning session</span>
  </div>
</div>

<!-- With error -->
<div class="nx-checkbox">
  <div class="nx-checkbox__row">
    <div role="checkbox" aria-checked="false" tabindex="0"
         class="nx-checkbox__control nx-checkbox__control--error"
         aria-describedby="cb-error"></div>
    <span class="nx-checkbox__label">I agree to the terms</span>
  </div>
  <div class="nx-checkbox__error" id="cb-error">
    <!-- alert icon --> You must accept the terms to continue.
  </div>
</div>

<!-- Disabled -->
<div class="nx-checkbox">
  <div class="nx-checkbox__row">
    <div role="checkbox" aria-checked="false" aria-disabled="true" tabindex="-1"
         class="nx-checkbox__control nx-checkbox__control--disabled"></div>
    <span class="nx-checkbox__label nx-checkbox__label--disabled">Unavailable option</span>
  </div>
</div>

<!-- Radio button -->
<div class="nx-radio">
  <div class="nx-radio__row">
    <div role="radio" aria-checked="true" tabindex="0"
         class="nx-radio__control nx-radio__control--checked"></div>
    <span class="nx-radio__label">Morning</span>
  </div>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-bg-input`}),` | `,(0,p.jsx)(n.code,{children:`#fdfdfd`}),` | Rest background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-input-hover`}),` | `,(0,p.jsx)(n.code,{children:`#fafafa`}),` | Hover background |
| `,(0,p.jsx)(n.code,{children:`--nx-border-input`}),` | `,(0,p.jsx)(n.code,{children:`#8a8a8a`}),` | Rest border |
| `,(0,p.jsx)(n.code,{children:`--nx-border-input-error`}),` | `,(0,p.jsx)(n.code,{children:`#8e1f0b`}),` | Error border |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-critical`}),` | `,(0,p.jsx)(n.code,{children:`#fee9e8`}),` | Error unchecked background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-disabled`}),` | `,(0,p.jsx)(n.code,{children:`rgba(0,0,0,0.08)`}),` | Disabled background |
| `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,p.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Focus ring |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Checked fill / label text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled label |
| `,(0,p.jsx)(n.code,{children:`--nx-text-critical`}),` | `,(0,p.jsx)(n.code,{children:`#8e1f0b`}),` | Error message text |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Controls use `,(0,p.jsx)(n.code,{children:`role="checkbox"`}),` or `,(0,p.jsx)(n.code,{children:`role="radio"`}),` with `,(0,p.jsx)(n.code,{children:`aria-checked`}),` — not native `,(0,p.jsx)(n.code,{children:`<input>`}),` — so `,(0,p.jsx)(n.code,{children:`tabindex`}),` and keyboard handlers must be implemented explicitly (see React component)`]}),`
`,(0,p.jsxs)(n.li,{children:[`Indeterminate state: `,(0,p.jsx)(n.code,{children:`aria-checked="mixed"`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Error message must be connected via `,(0,p.jsx)(n.code,{children:`aria-describedby`})]}),`
`,(0,p.jsx)(n.li,{children:`Clicking the label must toggle the control`}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled controls use `,(0,p.jsx)(n.code,{children:`tabindex="-1"`}),` and `,(0,p.jsx)(n.code,{children:`aria-disabled="true"`})]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { Checkbox, RadioButton, ChoiceList } from 'components/Checkbox/Checkbox.jsx';

// Checkbox
const [checked, setChecked] = useState(false);
<Checkbox label="Enable morning session" checked={checked} onChange={setChecked} />
<Checkbox label="Required field" required checked={checked} onChange={setChecked} helpText="Check this to include." />
<Checkbox label="With error" checked={false} error="This field is required." />
<Checkbox label="Disabled" checked={false} disabled />

// RadioButton
<RadioButton label="Morning" checked={val === 'morning'} onChange={() => setVal('morning')} />
<RadioButton label="Evening" checked={val === 'evening'} onChange={() => setVal('evening')} />

// ChoiceList
<ChoiceList
  title="Session type"
  selected={val}
  onChange={setVal}
  choices={[
    { label: 'Morning', value: 'morning' },
    { label: 'Evening', value: 'evening' },
    { label: 'Both',    value: 'both', disabled: true },
  ]}
/>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};