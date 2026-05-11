import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InteractionStates as c,WithSections as l,t as u}from"./OptionList.stories-D_n_yXOO.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/OptionList/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`optionlist`,children:`OptionList`}),`
`,(0,p.jsx)(n.p,{children:`A rich list of selectable options. Supports single and multi-select, sections, badges, descriptions, and media thumbnails. Typically rendered inside a popover or panel.`}),`
`,(0,p.jsx)(r,{of:s}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`OptionList`}),` — when options need more than just a label (descriptions, badges, icons, sections)`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`SelectInput`}),` — simple bounded list with just labels, no extra metadata`]}),`
`,(0,p.jsxs)(n.li,{children:[(0,p.jsx)(n.strong,{children:`Checkbox / ChoiceList`}),` — always-visible options (not inside a dropdown/popover)`]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/OptionList/OptionList.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Single-select list -->
<div class="nx-option-list" role="listbox" aria-label="Status">

  <!-- Section heading (optional) -->
  <div class="nx-option-list__section-title">Active</div>

  <!-- Unselected option -->
  <div role="option" aria-selected="false" tabindex="0" class="nx-option">
    <div class="nx-option__content">
      <div class="nx-option__label-row">
        <span class="nx-option__label">Morning session</span>
        <span class="nx-option__badge">Today</span>
      </div>
      <span class="nx-option__description">Recorded at 07:30</span>
    </div>
  </div>

  <!-- Selected option -->
  <div role="option" aria-selected="true" tabindex="0" class="nx-option nx-option--selected">
    <div class="nx-option__content">
      <div class="nx-option__label-row">
        <span class="nx-option__label">Evening session</span>
      </div>
    </div>
    <!-- check icon svg -->
  </div>

  <!-- Disabled option -->
  <div role="option" aria-selected="false" aria-disabled="true" tabindex="-1"
       class="nx-option nx-option--disabled">
    <div class="nx-option__content">
      <div class="nx-option__label-row">
        <span class="nx-option__label">Locked record</span>
      </div>
    </div>
  </div>

</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-bg-surface`}),` | `,(0,p.jsx)(n.code,{children:`#ffffff`}),` | List background |
| `,(0,p.jsx)(n.code,{children:`--nx-border-default`}),` | `,(0,p.jsx)(n.code,{children:`#e0e0e0`}),` | List border |
| `,(0,p.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,p.jsx)(n.code,{children:`8px`}),` | Container + item corner radius |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Option label |
| `,(0,p.jsx)(n.code,{children:`--nx-text-subdued`}),` | `,(0,p.jsx)(n.code,{children:`#616161`}),` | Description, badge text |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled option text |
| `,(0,p.jsx)(n.code,{children:`--nx-color-primary`}),` | `,(0,p.jsx)(n.code,{children:`#005bd3`}),` | Focus ring |
| `,(0,p.jsx)(n.code,{children:`--nx-color-critical`}),` | `,(0,p.jsx)(n.code,{children:`#d92d20`}),` | Error message icon/text |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-label`}),` | `,(0,p.jsx)(n.code,{children:`13px`}),` | Option label size |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-caption`}),` | `,(0,p.jsx)(n.code,{children:`12px`}),` | Badge text + description size |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Container: `,(0,p.jsx)(n.code,{children:`role="listbox"`}),` with `,(0,p.jsx)(n.code,{children:`aria-label`}),` or `,(0,p.jsx)(n.code,{children:`aria-labelledby`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Each item: `,(0,p.jsx)(n.code,{children:`role="option"`}),` with `,(0,p.jsx)(n.code,{children:`aria-selected`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Multi-select listbox: `,(0,p.jsx)(n.code,{children:`aria-multiselectable="true"`}),` on the container`]}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled options: `,(0,p.jsx)(n.code,{children:`aria-disabled="true"`}),` and `,(0,p.jsx)(n.code,{children:`tabindex="-1"`})]}),`
`,(0,p.jsx)(n.li,{children:`Keyboard: Arrow keys navigate, Enter/Space selects`}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { OptionList } from 'components/OptionList/OptionList.jsx';

// Single select
const [selected, setSelected] = useState('morning');
<OptionList
  options={[
    { label: 'Morning', value: 'morning', description: '07:30 – 12:00' },
    { label: 'Evening', value: 'evening', description: '18:00 – 22:00' },
    { label: 'Night',   value: 'night',   disabled: true },
  ]}
  selected={selected}
  onChange={setSelected}
/>

// Multi-select
<OptionList
  allowMultiple
  options={options}
  selected={selectedArr}
  onChange={setSelectedArr}
/>

// With sections
<OptionList
  sections={[
    { title: 'Recent', options: recentOptions },
    { title: 'All',    options: allOptions },
  ]}
  selected={selected}
  onChange={setSelected}
/>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(r,{of:l})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};