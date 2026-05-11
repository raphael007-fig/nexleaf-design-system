import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,Playground as l,t as u}from"./TextInput.stories-D5zqRwen.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/TextInput/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`textinput`,children:`TextInput`}),`
`,(0,p.jsx)(n.p,{children:`Single-line text entry field. Used for short free-form values: names, temperatures, IDs, search queries.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`TextInput`}),` — short free-form string, number, email, password, search`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`TextareaInput`}),` — multi-line text (comments, notes, long descriptions)`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`SelectInput`}),` — when the user must choose from a fixed list`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`NumberInput`}),` — when you need numeric step controls`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/TextInput/TextInput.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Basic -->
<div class="nx-field">
  <div class="nx-field__label">
    <span>Store name</span>
  </div>
  <div class="nx-input-wrap">
    <input class="nx-input" type="text" placeholder="e.g. My Store" />
  </div>
</div>

<!-- Required -->
<div class="nx-field">
  <div class="nx-field__label nx-field__label--required">
    <span>Email address</span>
  </div>
  <div class="nx-input-wrap">
    <input class="nx-input" type="email" placeholder="user@example.com" required />
  </div>
</div>

<!-- With prefix and suffix -->
<div class="nx-field">
  <div class="nx-field__label"><span>Temperature</span></div>
  <div class="nx-input-wrap">
    <span class="nx-input__prefix">~</span>
    <input class="nx-input" type="number" placeholder="4.5" />
    <span class="nx-input__suffix">°C</span>
  </div>
</div>

<!-- Error state -->
<div class="nx-field">
  <div class="nx-field__label"><span>Email</span></div>
  <div class="nx-input-wrap nx-input-wrap--error">
    <input class="nx-input" type="email" value="not-valid" />
  </div>
  <div class="nx-field__error">
    <!-- error icon SVG here -->
    Enter a valid email address.
  </div>
</div>

<!-- Disabled -->
<div class="nx-field">
  <div class="nx-field__label"><span>Record ID</span></div>
  <div class="nx-input-wrap nx-input-wrap--disabled">
    <input class="nx-input" type="text" value="REC-0042" disabled />
  </div>
</div>

<!-- With help text -->
<div class="nx-field">
  <div class="nx-field__label"><span>Password</span></div>
  <div class="nx-input-wrap">
    <input class="nx-input" type="password" />
  </div>
  <span class="nx-field__help">Must be at least 8 characters.</span>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-border-input`}),` | `,(0,p.jsx)(n.code,{children:`#8a8a8a`}),` | Rest/hover/focus border |
| `,(0,p.jsx)(n.code,{children:`--nx-border-input-error`}),` | `,(0,p.jsx)(n.code,{children:`#8e1f0b`}),` | Error state border |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-input`}),` | `,(0,p.jsx)(n.code,{children:`#fdfdfd`}),` | Rest background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-input-hover`}),` | `,(0,p.jsx)(n.code,{children:`#fafafa`}),` | Hover + focus background |
| `,(0,p.jsx)(n.code,{children:`--nx-bg-critical`}),` | `,(0,p.jsx)(n.code,{children:`#fee9e8`}),` | Error background |
| `,(0,p.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,p.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Focus ring |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Input value text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-placeholder`}),` | `,(0,p.jsx)(n.code,{children:`#9e9e9e`}),` | Placeholder text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled text |
| `,(0,p.jsx)(n.code,{children:`--nx-color-critical`}),` | `,(0,p.jsx)(n.code,{children:`#d92d20`}),` | Error icon and message |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-label`}),` | `,(0,p.jsx)(n.code,{children:`13px`}),` | Input value and label size |
| `,(0,p.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,p.jsx)(n.code,{children:`8px`}),` | Input corner radius |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Always pair inputs with a visible `,(0,p.jsx)(n.code,{children:`<label>`}),` — never use `,(0,p.jsx)(n.code,{children:`placeholder`}),` as the only label`]}),`
`,(0,p.jsxs)(n.li,{children:[`Required fields use the `,(0,p.jsx)(n.code,{children:`required`}),` attribute (not just the visual asterisk)`]}),`
`,(0,p.jsxs)(n.li,{children:[`Error messages must be connected via `,(0,p.jsx)(n.code,{children:`aria-describedby`}),` pointing to the error element`]}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled inputs use the native `,(0,p.jsx)(n.code,{children:`disabled`}),` attribute — assistive technology announces state`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.code,{children:`readonly`}),` inputs behave like disabled visually but remain in the tab order and are announced differently`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { TextInput } from 'components/TextInput/TextInput.jsx';

// Basic
<TextInput label="Store name" placeholder="e.g. My Store" value={v} onChange={fn} />

// Required with suffix
<TextInput label="Temperature" required suffix="°C" type="number" value={v} onChange={fn} />

// Error state
<TextInput label="Email" value={v} onChange={fn} error="Enter a valid email address." />

// Disabled
<TextInput label="Record ID" value="REC-0042" disabled />

// With help text
<TextInput label="Password" type="password" helpText="Must be at least 8 characters." value={v} onChange={fn} />

// Clear button (appears when field has value)
<TextInput label="Search" clearButton value={v} onChange={fn} />

// Magic / AI tone
<TextInput label="AI prompt" tone="magic" placeholder="Describe your product..." value={v} onChange={fn} />
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`playground`,children:`Playground`}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};