import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,AllTypes as c,InteractionStates as l,t as u}from"./Pagination.stories-DG1uz2DC.js";function d(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i,{title:`Components/Pagination/Docs`}),`
`,(0,p.jsx)(n.h1,{id:`pagination`,children:`Pagination`}),`
`,(0,p.jsx)(n.p,{children:`Previous/Next navigation control for paged content. Two types: standalone page navigation and an inline table footer bar.`}),`
`,(0,p.jsx)(r,{of:c}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`two-types`,children:`Two types`}),`
`,(0,p.jsxs)(n.p,{children:[`| `,(0,p.jsx)(n.code,{children:`type`}),` | Usage | Background |
|--------|-------|-----------|
| `,(0,p.jsx)(n.code,{children:`page`}),` | Standalone between-page nav (e.g. detail records) | none |
| `,(0,p.jsx)(n.code,{children:`table`}),` | Footer row inside an IndexTable | `,(0,p.jsx)(n.code,{children:`#f7f9fc`}),` (bg-open) |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,p.jsx)(r,{of:l}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Pagination/Pagination.css';
`})}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-html`,children:`<!-- Page type -->
<nav class="nx-pagination" aria-label="Pagination">
  <button class="nx-pagination__btn nx-pagination__btn--prev" aria-label="Previous" disabled>
    <!-- ChevronLeft icon -->
  </button>
  <span class="nx-pagination__label">Record 3 of 12</span>
  <button class="nx-pagination__btn nx-pagination__btn--next" aria-label="Next">
    <!-- ChevronRight icon -->
  </button>
</nav>

<!-- Table type (inside table footer row) -->
<div class="nx-pagination nx-pagination--table">
  <span class="nx-pagination__label">Showing 1–20 of 134</span>
  <div class="nx-pagination__nav">
    <button class="nx-pagination__btn nx-pagination__btn--prev" aria-label="Previous" disabled>
      <!-- ChevronLeft icon -->
    </button>
    <button class="nx-pagination__btn nx-pagination__btn--next" aria-label="Next">
      <!-- ChevronRight icon -->
    </button>
  </div>
</div>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,p.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,p.jsx)(n.code,{children:`--nx-bg-open`}),` | `,(0,p.jsx)(n.code,{children:`#f7f9fc`}),` | Table pagination background |
| `,(0,p.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,p.jsx)(n.code,{children:`#303030`}),` | Label text + active icon |
| `,(0,p.jsx)(n.code,{children:`--nx-text-disabled`}),` | `,(0,p.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled icon color |
| `,(0,p.jsx)(n.code,{children:`--nx-font-size-label`}),` | `,(0,p.jsx)(n.code,{children:`13px`}),` | Label font size |`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsxs)(n.li,{children:[`Wrap in `,(0,p.jsx)(n.code,{children:`<nav aria-label="Pagination">`}),` for landmark navigation`]}),`
`,(0,p.jsxs)(n.li,{children:[`Prev/Next buttons need `,(0,p.jsx)(n.code,{children:`aria-label="Previous page"`}),` / `,(0,p.jsx)(n.code,{children:`aria-label="Next page"`})]}),`
`,(0,p.jsxs)(n.li,{children:[`Disabled buttons use the `,(0,p.jsx)(n.code,{children:`disabled`}),` attribute — no click handler needed`]}),`
`,(0,p.jsxs)(n.li,{children:[`Label text ("1–20 of 134") should be a live region if it updates dynamically: `,(0,p.jsx)(n.code,{children:`aria-live="polite"`})]}),`
`]}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,p.jsx)(n.pre,{children:(0,p.jsx)(n.code,{className:`language-jsx`,children:`import { Pagination } from 'components/Pagination/Pagination.jsx';

// Page nav
<Pagination
  hasPrevious={currentPage > 1}
  hasNext={currentPage < totalPages}
  onPrevious={() => setPage(p => p - 1)}
  onNext={() => setPage(p => p + 1)}
  label={\`Record \${current} of \${total}\`}
/>

// Table footer
<Pagination
  type="table"
  hasPrevious={offset > 0}
  hasNext={offset + pageSize < total}
  onPrevious={onPrev}
  onNext={onNext}
  label={\`Showing \${offset + 1}–\${Math.min(offset + pageSize, total)} of \${total}\`}
/>
`})}),`
`,(0,p.jsx)(n.hr,{}),`
`,(0,p.jsx)(r,{of:s})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;e((()=>{p=n(),o(),a(),u()}))();export{f as default};