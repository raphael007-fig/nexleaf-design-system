import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,BadgeTones as c,InteractionStates as l,Loading as u,t as d}from"./MetricCard.stories-BPqCzYoh.js";function f(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i,{title:`Components/MetricCard/Docs`}),`
`,(0,m.jsx)(n.h1,{id:`metriccard`,children:`MetricCard`}),`
`,(0,m.jsx)(n.p,{children:`Displays a high-level operational KPI in a compact, scannable card. Can function as a static informational display or an interactive dashboard filter that narrows visible content when selected.`}),`
`,(0,m.jsx)(r,{of:s}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,m.jsxs)(n.ul,{children:[`
`,(0,m.jsx)(n.li,{children:`Monitoring dashboards with key operational metrics`}),`
`,(0,m.jsx)(n.li,{children:`Equipment management — offline count, alert totals, installation status`}),`
`,(0,m.jsx)(n.li,{children:`Dashboard filter bars where each card narrows data when clicked`}),`
`,(0,m.jsx)(n.li,{children:`Analytics overviews that need to be scannable at a glance`}),`
`]}),`
`,(0,m.jsxs)(n.p,{children:[(0,m.jsx)(n.strong,{children:`Avoid`}),` when content is text-heavy, requires detailed interpretation, or when a table would provide better clarity.`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,m.jsx)(r,{of:l}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`badge-tones`,children:`Badge tones`}),`
`,(0,m.jsx)(r,{of:c}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`loading-skeleton`,children:`Loading skeleton`}),`
`,(0,m.jsx)(r,{of:u}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`states`,children:`States`}),`
`,(0,m.jsxs)(n.p,{children:[`| State | Trigger | Background |
|-------|---------|------------|
| Rest | Default | `,(0,m.jsx)(n.code,{children:`#ffffff`}),` |
| Hover | `,(0,m.jsx)(n.code,{children:`onMouseEnter`}),` (clickable only) | `,(0,m.jsx)(n.code,{children:`#f7f7f7`}),` |
| Active / Pressed | `,(0,m.jsx)(n.code,{children:`onMouseDown`}),` | `,(0,m.jsx)(n.code,{children:`#f3f3f3`}),` + inset shadow |
| Selected | `,(0,m.jsx)(n.code,{children:`selected={true}`}),` | `,(0,m.jsx)(n.code,{children:`rgba(0,0,0,0.08)`}),` |
| Focus | Keyboard focus (clickable only) | `,(0,m.jsx)(n.code,{children:`#ffffff`}),` + `,(0,m.jsx)(n.code,{children:`2px #005bd3`}),` ring |
| Disabled | `,(0,m.jsx)(n.code,{children:`disabled={true}`}),` | `,(0,m.jsx)(n.code,{children:`rgba(0,0,0,0.05)`}),` + muted text |
| Loading | `,(0,m.jsx)(n.code,{children:`loading={true}`}),` | Skeleton bars, `,(0,m.jsx)(n.code,{children:`#e3e3e3`}),` |`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`badge-tones-reference`,children:`Badge tones reference`}),`
`,(0,m.jsxs)(n.p,{children:[`Uses the existing `,(0,m.jsx)(n.code,{children:`Badge`}),` component — tone values map directly to `,(0,m.jsx)(n.code,{children:`Badge`}),` tone keys.`]}),`
`,(0,m.jsxs)(n.p,{children:[`| Tone | Background | Text |
|------|-----------|------|
| `,(0,m.jsx)(n.code,{children:`info`}),` | `,(0,m.jsx)(n.code,{children:`#e0f0ff`}),` | `,(0,m.jsx)(n.code,{children:`#00527c`}),` |
| `,(0,m.jsx)(n.code,{children:`success`}),` | `,(0,m.jsx)(n.code,{children:`#cdfee1`}),` | `,(0,m.jsx)(n.code,{children:`#0c5132`}),` |
| `,(0,m.jsx)(n.code,{children:`attention`}),` | `,(0,m.jsx)(n.code,{children:`#ffef9d`}),` | `,(0,m.jsx)(n.code,{children:`#4f4700`}),` |
| `,(0,m.jsx)(n.code,{children:`warning`}),` | `,(0,m.jsx)(n.code,{children:`#ffd6a4`}),` | `,(0,m.jsx)(n.code,{children:`#5e4200`}),` |
| `,(0,m.jsx)(n.code,{children:`critical`}),` | `,(0,m.jsx)(n.code,{children:`#fedad9`}),` | `,(0,m.jsx)(n.code,{children:`#8e1f0b`}),` |
| `,(0,m.jsx)(n.code,{children:`default`}),` | `,(0,m.jsx)(n.code,{children:`rgba(0,0,0,0.06)`}),` | `,(0,m.jsx)(n.code,{children:`#616161`}),` |`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`anatomy`,children:`Anatomy`}),`
`,(0,m.jsxs)(n.ol,{children:[`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Container`}),` — `,(0,m.jsx)(n.code,{children:`border-radius: 12px`}),`, `,(0,m.jsx)(n.code,{children:`padding: 16px`}),`, `,(0,m.jsx)(n.code,{children:`gap: 12px`})]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Metric label`}),` — 13px / 650 weight / `,(0,m.jsx)(n.code,{children:`#616161`})]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Info icon`}),` — 14px ⓘ icon, optional click handler`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Metric value`}),` — 30px / 700 weight / `,(0,m.jsx)(n.code,{children:`#303030`}),` / `,(0,m.jsx)(n.code,{children:`letter-spacing: -0.3px`})]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Badge`}),` — optional, 20px height, tone-colored pill`]}),`
`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,m.jsxs)(n.p,{children:[`| Property | Value | Token |
|----------|-------|-------|
| Background (rest) | `,(0,m.jsx)(n.code,{children:`#ffffff`}),` | `,(0,m.jsx)(n.code,{children:`bg-surface`}),` |
| Background (hover) | `,(0,m.jsx)(n.code,{children:`#f7f7f7`}),` | — |
| Background (active) | `,(0,m.jsx)(n.code,{children:`#f3f3f3`}),` | — |
| Background (disabled) | `,(0,m.jsx)(n.code,{children:`rgba(0,0,0,0.05)`}),` | `,(0,m.jsx)(n.code,{children:`bg-disabled`}),` |
| Label text | `,(0,m.jsx)(n.code,{children:`#616161`}),` | `,(0,m.jsx)(n.code,{children:`text-subdued`}),` |
| Metric text | `,(0,m.jsx)(n.code,{children:`#303030`}),` | `,(0,m.jsx)(n.code,{children:`text-default`}),` |
| Disabled text | `,(0,m.jsx)(n.code,{children:`#b5b5b5`}),` | `,(0,m.jsx)(n.code,{children:`text-disabled`}),` |
| Focus ring | `,(0,m.jsx)(n.code,{children:`#005bd3`}),` | `,(0,m.jsx)(n.code,{children:`color-primary`}),` |
| Border radius | `,(0,m.jsx)(n.code,{children:`12px`}),` | — |
| Drop shadow | `,(0,m.jsx)(n.code,{children:`0 1px 0 rgba(26,26,26,0.07)`}),` | shadow-100 |
| Inset border | `,(0,m.jsx)(n.code,{children:`inset ±1px …`}),` | shadow-100 |
| Pressed inset | `,(0,m.jsx)(n.code,{children:`inset 0 2px 1px rgba(26,26,26,0.2)`}),` | shadow-inset-200 |
| Skeleton fill | `,(0,m.jsx)(n.code,{children:`#e3e3e3`}),` | — |`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,m.jsxs)(n.ul,{children:[`
`,(0,m.jsxs)(n.li,{children:[`When `,(0,m.jsx)(n.code,{children:`onClick`}),` is provided, the card renders as `,(0,m.jsx)(n.code,{children:`role="button"`}),` with `,(0,m.jsx)(n.code,{children:`tabIndex={0}`})]}),`
`,(0,m.jsx)(n.li,{children:`Keyboard: Enter and Space activate the card`}),`
`,(0,m.jsxs)(n.li,{children:[`Selected state is communicated via `,(0,m.jsx)(n.code,{children:`aria-pressed`}),` (recommended in consuming pages)`]}),`
`,(0,m.jsxs)(n.li,{children:[`Info icon has `,(0,m.jsx)(n.code,{children:`aria-label="More information"`})]}),`
`,(0,m.jsxs)(n.li,{children:[`Disabled cards are non-interactive — do not use `,(0,m.jsx)(n.code,{children:`disabled`}),` HTML attribute on the wrapper (it would break keyboard navigation for screen readers)`]}),`
`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,m.jsx)(n.pre,{children:(0,m.jsx)(n.code,{className:`language-jsx`,children:`import { MetricCard } from 'components/MetricCard/MetricCard.jsx';

// Static display
<MetricCard
  title="Total Installations"
  metric="247"
  badge={{ label: '3 Critical', tone: 'critical' }}
/>

// Interactive filter card
<MetricCard
  title="Devices Offline"
  metric="12"
  badge={{ label: '12 Offline', tone: 'warning' }}
  selected={activeFilter === 'offline'}
  onClick={() => setActiveFilter(prev => prev === 'offline' ? null : 'offline')}
/>

// With info icon tooltip
<MetricCard
  title="Active Alerts"
  metric="5"
  badge={{ label: '2 High Priority', tone: 'critical' }}
  onInfoClick={() => setTooltipOpen(true)}
/>

// Loading
<MetricCard loading />

// Disabled
<MetricCard
  title="Unknown Devices"
  metric="—"
  badge={{ label: 'No data', tone: 'neutral' }}
  disabled
/>
`})})]})}function p(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,m.jsx)(n,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=n(),o(),a(),d()}))();export{p as default};