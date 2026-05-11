import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,InCard as c,InteractionStates as l,WithActions as u,WithTitle as d,t as f}from"./Banner.stories-Djdf6uBE.js";function p(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{title:`Components/Banner/Docs`}),`
`,(0,h.jsx)(n.h1,{id:`banner`,children:`Banner`}),`
`,(0,h.jsx)(n.p,{children:`Full-width contextual message. Communicates feedback, warnings, or important information about a page or action. Not used for toast/snackbar notifications.`}),`
`,(0,h.jsx)(r,{of:s}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Info`}),` — neutral guidance, reminders, or non-critical notices`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Success`}),` — confirmation that an action completed (form saved, record created)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Warning`}),` — something needs attention but isn't blocking`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Critical`}),` — an error occurred or a required action is blocked`]}),`
`]}),`
`,(0,h.jsxs)(n.p,{children:[`Use the `,(0,h.jsx)(n.strong,{children:`titled form`}),` (with a header bar) for longer messages that need a title and body copy, or when actions are included. Use the `,(0,h.jsx)(n.strong,{children:`simple form`}),` for short one-liners.`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`three-visual-forms`,children:`Three visual forms`}),`
`,(0,h.jsx)(n.h3,{id:`simple`,children:`Simple`}),`
`,(0,h.jsx)(n.p,{children:`White card with a colored icon pill (28×28, tone color, 8px radius), message text, optional actions row, and optional × dismiss button.`}),`
`,(0,h.jsx)(n.h3,{id:`titled`,children:`Titled`}),`
`,(0,h.jsx)(n.p,{children:`Two-part card: full-width colored header bar (tone color + icon + title, optional dismiss) + white body with message and action buttons.`}),`
`,(0,h.jsx)(n.h3,{id:`in-card-compact`,children:`In-card (compact)`}),`
`,(0,h.jsx)(n.p,{children:`Tinted background using the tone's light color, inline icon, message, and optional actions. Used inside cards and panels where space is constrained.`}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,h.jsx)(r,{of:l}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`tone-reference`,children:`Tone reference`}),`
`,(0,h.jsxs)(n.p,{children:[`| Tone | Header / icon pill bg | Header text | In-card bg | In-card text | Usage |
|------|-----------------------|-------------|-----------|--------------|-------|
| `,(0,h.jsx)(n.code,{children:`info`}),` | `,(0,h.jsx)(n.code,{children:`#91d0ff`}),` | `,(0,h.jsx)(n.code,{children:`#002133`}),` | `,(0,h.jsx)(n.code,{children:`#eaf4ff`}),` | `,(0,h.jsx)(n.code,{children:`#00527c`}),` | General notices |
| `,(0,h.jsx)(n.code,{children:`success`}),` | `,(0,h.jsx)(n.code,{children:`#29845a`}),` | `,(0,h.jsx)(n.code,{children:`#f8fffb`}),` | `,(0,h.jsx)(n.code,{children:`#cdfee1`}),` | `,(0,h.jsx)(n.code,{children:`#0c5132`}),` | Saved, confirmed |
| `,(0,h.jsx)(n.code,{children:`warning`}),` | `,(0,h.jsx)(n.code,{children:`#ffb800`}),` | `,(0,h.jsx)(n.code,{children:`#332e00`}),` | `,(0,h.jsx)(n.code,{children:`#fff1e3`}),` | `,(0,h.jsx)(n.code,{children:`#5e4200`}),` | At risk, review needed |
| `,(0,h.jsx)(n.code,{children:`critical`}),` | `,(0,h.jsx)(n.code,{children:`#e51c00`}),` | `,(0,h.jsx)(n.code,{children:`#fffbfb`}),` | `,(0,h.jsx)(n.code,{children:`#fee9e8`}),` | `,(0,h.jsx)(n.code,{children:`#8e1f0b`}),` | Error, blocked |`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Banner/Banner.css';
`})}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<!-- Simple info -->
<div class="nx-banner nx-banner--info" role="status">
  <!-- info icon svg -->
  <span class="nx-banner__text">Your session expires in 10 minutes.</span>
</div>

<!-- Simple with dismiss -->
<div class="nx-banner nx-banner--warning" role="alert">
  <!-- warning icon -->
  <span class="nx-banner__text">This reading is outside the expected range.</span>
  <button class="nx-banner__dismiss" aria-label="Dismiss"><!-- × icon --></button>
</div>

<!-- Titled critical -->
<div class="nx-banner--titled" role="alert">
  <div class="nx-banner__header nx-banner__header--critical">
    <!-- critical icon -->
    <span>Unable to save reading</span>
    <button class="nx-banner__dismiss" aria-label="Dismiss"><!-- × icon --></button>
  </div>
  <div class="nx-banner__body">
    <p>The temperature value is required. Please enter a valid reading before submitting.</p>
    <div class="nx-banner__actions">
      <button class="nx-btn nx-btn--secondary">Review fields</button>
    </div>
  </div>
</div>
`})}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,h.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,h.jsx)(n.code,{children:`--nx-radius-sm`}),` | `,(0,h.jsx)(n.code,{children:`8px`}),` | Corner radius |
| `,(0,h.jsx)(n.code,{children:`--nx-bg-surface`}),` | `,(0,h.jsx)(n.code,{children:`#ffffff`}),` | Titled banner body background |
| `,(0,h.jsx)(n.code,{children:`--nx-bg-critical`}),` | `,(0,h.jsx)(n.code,{children:`#fee9e8`}),` | Critical simple background |
| `,(0,h.jsx)(n.code,{children:`--nx-font-size-label`}),` | `,(0,h.jsx)(n.code,{children:`13px`}),` | Banner text size |
| `,(0,h.jsx)(n.code,{children:`--nx-font-weight-bold`}),` | `,(0,h.jsx)(n.code,{children:`600`}),` | Titled banner header title |
| `,(0,h.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,h.jsx)(n.code,{children:`#303030`}),` | Titled banner body text |
| `,(0,h.jsx)(n.code,{children:`--nx-space-3`}),` | `,(0,h.jsx)(n.code,{children:`12px`}),` | Margin above action buttons |`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Simple banners that appear in response to user action: use `,(0,h.jsx)(n.code,{children:`role="status"`}),` (polite) or `,(0,h.jsx)(n.code,{children:`role="alert"`}),` (assertive/error)`]}),`
`,(0,h.jsxs)(n.li,{children:[`Titled critical banners: always `,(0,h.jsx)(n.code,{children:`role="alert"`}),` so screen readers announce immediately`]}),`
`,(0,h.jsxs)(n.li,{children:[`Dismiss button must have an accessible name: `,(0,h.jsx)(n.code,{children:`aria-label="Dismiss"`}),` or visually hidden text`]}),`
`,(0,h.jsx)(n.li,{children:`Do not auto-dismiss error banners — the user must acknowledge them`}),`
`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-jsx`,children:`import { Banner } from 'components/Banner/Banner.jsx';

// Simple
<Banner tone="info">Your session expires in 10 minutes.</Banner>
<Banner tone="success">Reading saved successfully.</Banner>
<Banner tone="warning" dismissable>Value is outside expected range.</Banner>

// Titled (colored header + white body)
<Banner
  tone="critical"
  title="Unable to save"
  dismissable
  actions={[{ label: 'Review', onClick: fn }]}
>
  Please correct the highlighted fields and try again.
</Banner>

// In-card (compact tinted variant — use inside cards/panels)
<Banner tone="info" inCard>Your session expires in 10 minutes.</Banner>
<Banner tone="warning" inCard dismissable>Value is outside the expected range.</Banner>
<Banner tone="critical" inCard actions={[{ label: 'Fix now', onClick: fn }]}>
  Temperature reading is missing.
</Banner>
`})}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(r,{of:d}),`
`,(0,h.jsx)(r,{of:u}),`
`,(0,h.jsx)(r,{of:c})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=n(),o(),a(),f()}))();export{m as default};