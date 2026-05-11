import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{Full as s,WithAllFeatures as c,WithBackAction as l,WithPagination as u,t as d}from"./Page.stories-C_GEpRCJ.js";function f(e){let n={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(i,{title:`Components/Page/Docs`}),`
`,(0,m.jsx)(n.h1,{id:`page`,children:`Page`}),`
`,(0,m.jsx)(n.p,{children:`Top-level layout wrapper. Provides the page header: title, subtitle, back navigation, metadata badges, and primary/secondary action buttons. Does not constrain the content area — that is the responsibility of the route layout.`}),`
`,(0,m.jsx)(r,{of:c}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,m.jsxs)(n.p,{children:[`Wrap every screen-level view with `,(0,m.jsx)(n.code,{children:`Page`}),`. It is the single source of truth for:`]}),`
`,(0,m.jsxs)(n.ul,{children:[`
`,(0,m.jsx)(n.li,{children:`Page title and subtitle`}),`
`,(0,m.jsx)(n.li,{children:`Back button (when in a detail view)`}),`
`,(0,m.jsx)(n.li,{children:`Metadata badges (status, category labels)`}),`
`,(0,m.jsx)(n.li,{children:`Primary CTA and secondary actions`}),`
`,(0,m.jsx)(n.li,{children:`Optional pagination controls in the header`}),`
`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`interaction-states--all-variants`,children:`Interaction states — all variants`}),`
`,(0,m.jsx)(r,{of:c}),`
`,(0,m.jsx)(r,{of:l}),`
`,(0,m.jsx)(r,{of:u}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`anatomy`,children:`Anatomy`}),`
`,(0,m.jsx)(n.pre,{children:(0,m.jsx)(n.code,{children:`┌──────────────────────────────────────────────────────┐
│ ← [back]  Page Title  [badge] [badge]  [Sec] [Primary]│
│            Subtitle text                              │
├──────────────────────────────────────────────────────┤
│  {children}                                          │
└──────────────────────────────────────────────────────┘
`})}),`
`,(0,m.jsxs)(n.ul,{children:[`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Back button`}),` — 28×28px ghost icon button, only shown when `,(0,m.jsx)(n.code,{children:`backAction`}),` is provided`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Title`}),` — 20px, weight 650, `,(0,m.jsx)(n.code,{children:`#303030`})]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Subtitle`}),` — 12px, `,(0,m.jsx)(n.code,{children:`#616161`}),`, below title`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Metadata badges`}),` — inline `,(0,m.jsx)(n.code,{children:`Badge`}),` components beside the title`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Secondary actions`}),` — secondary buttons, left of primary`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Primary action`}),` — single primary button, rightmost`]}),`
`,(0,m.jsxs)(n.li,{children:[(0,m.jsx)(n.strong,{children:`Pagination`}),` — optional `,(0,m.jsx)(n.code,{children:`Pagination`}),` component in the actions area`]}),`
`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`css-selector-structure`,children:`CSS selector structure`}),`
`,(0,m.jsx)(n.pre,{children:(0,m.jsx)(n.code,{className:`language-css`,children:`@import 'tokens/tokens.css';
@import 'components/Page/Page.css';
`})}),`
`,(0,m.jsx)(n.pre,{children:(0,m.jsx)(n.code,{className:`language-html`,children:`<div class="nx-page">
  <div class="nx-page__header">

    <!-- Left: back + title -->
    <div class="nx-page__left">
      <!-- Back button (optional) -->
      <button class="nx-page__back-btn" aria-label="Back">
        <!-- ArrowLeft icon -->
      </button>

      <div class="nx-page__title-col">
        <div class="nx-page__title-row">
          <span class="nx-page__title">Temperature Records</span>
          <!-- Badges (optional) -->
          <div class="nx-page__badges">
            <span class="nx-badge nx-badge--success">Active</span>
          </div>
        </div>
        <span class="nx-page__subtitle">Last synced 2 hours ago</span>
      </div>
    </div>

    <!-- Right: actions -->
    <div class="nx-page__actions">
      <button class="nx-btn nx-btn--secondary">Export</button>
      <button class="nx-btn nx-btn--primary">Record reading</button>
    </div>

  </div>

  <!-- Page content -->
  <div class="nx-page__content">
    <!-- IndexTable, form, etc. -->
  </div>
</div>
`})}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,m.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,m.jsx)(n.code,{children:`--nx-bg-surface`}),` | `,(0,m.jsx)(n.code,{children:`#ffffff`}),` | Page background |
| `,(0,m.jsx)(n.code,{children:`--nx-space-6`}),` | `,(0,m.jsx)(n.code,{children:`24px`}),` | Header top/bottom padding |
| `,(0,m.jsx)(n.code,{children:`--nx-space-2`}),` | `,(0,m.jsx)(n.code,{children:`8px`}),` | Gap between action buttons |
| `,(0,m.jsx)(n.code,{children:`--nx-space-1`}),` | `,(0,m.jsx)(n.code,{children:`4px`}),` | Gap between back button and title |
| `,(0,m.jsx)(n.code,{children:`--nx-text-default`}),` | `,(0,m.jsx)(n.code,{children:`#303030`}),` | Title color |
| `,(0,m.jsx)(n.code,{children:`--nx-text-subdued`}),` | `,(0,m.jsx)(n.code,{children:`#616161`}),` | Subtitle color |
| `,(0,m.jsx)(n.code,{children:`--nx-font-size-caption`}),` | `,(0,m.jsx)(n.code,{children:`12px`}),` | Subtitle size |
| `,(0,m.jsx)(n.code,{children:`--nx-bg-disabled`}),` | `,(0,m.jsx)(n.code,{children:`rgba(0,0,0,0.06)`}),` | Back button hover background |
| `,(0,m.jsx)(n.code,{children:`--nx-focus-ring`}),` | `,(0,m.jsx)(n.code,{children:`0 0 0 2px #005bd3`}),` | Back button focus ring |`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,m.jsxs)(n.ul,{children:[`
`,(0,m.jsxs)(n.li,{children:[`Back button must have `,(0,m.jsx)(n.code,{children:`aria-label="Back"`}),` — it is icon-only`]}),`
`,(0,m.jsxs)(n.li,{children:[`Page `,(0,m.jsx)(n.code,{children:`<h1>`}),` should be inside `,(0,m.jsx)(n.code,{children:`.nx-page__title`}),` for correct heading hierarchy`]}),`
`,(0,m.jsxs)(n.li,{children:[`When using metadata badges, ensure status is also announced in the page title or a visually hidden `,(0,m.jsx)(n.code,{children:`<span>`}),` for screen readers that don't read badge content inline`]}),`
`]}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,m.jsx)(n.pre,{children:(0,m.jsx)(n.code,{className:`language-jsx`,children:`import { Page } from 'components/Page/Page.jsx';

// Basic
<Page title="Temperature Records">
  {/* content */}
</Page>

// With back action, subtitle, metadata, and actions
<Page
  title="Fridge A — Zone 1"
  subtitle="Last synced 2 hours ago"
  backAction={{ onAction: () => navigate(-1) }}
  metadata={[
    { label: 'Active', tone: 'success' },
    { label: 'Morning', tone: 'default' },
  ]}
  primaryAction={{ content: 'Record reading', onAction: openForm }}
  secondaryActions={[
    { content: 'Export', onAction: exportData },
    { content: 'More actions', disclosure: true, onAction: openMenu },
  ]}
>
  {/* IndexTable, form, etc. */}
</Page>
`})}),`
`,(0,m.jsx)(n.hr,{}),`
`,(0,m.jsx)(r,{of:s})]})}function p(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,m.jsx)(n,{...e,children:(0,m.jsx)(f,{...e})}):f(e)}var m;e((()=>{m=n(),o(),a(),d()}))();export{p as default};