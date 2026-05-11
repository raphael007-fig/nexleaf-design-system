import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllLayouts as s,InteractionStates as c,LayoutType1 as l,LayoutType2 as u,LayoutType3 as d,LayoutType4 as f,Primitives as p,t as m}from"./Card.stories-DktBC61Z.js";function h(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(i,{title:`Components/Card/Docs`}),`
`,(0,_.jsx)(n.h1,{id:`card`,children:`Card`}),`
`,(0,_.jsxs)(n.p,{children:[`Structured content containers for displaying equipment details, location context, contact information, and associated component lists. Cards use the shadow-100 border treatment and a `,(0,_.jsx)(n.code,{children:`12px`}),` border radius throughout.`]}),`
`,(0,_.jsx)(r,{of:s}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`Equipment or asset detail pages where data is grouped into sections`}),`
`,(0,_.jsx)(n.li,{children:`Dashboard sidebars showing location, contact, or status context`}),`
`,(0,_.jsx)(n.li,{children:`Anywhere tabular sub-data needs to be collapsible (Layout Type 2)`}),`
`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,_.jsx)(r,{of:c}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`layout-type-1--main-detail-card`,children:`Layout Type 1 — Main Detail Card`}),`
`,(0,_.jsx)(r,{of:l}),`
`,(0,_.jsx)(n.p,{children:`Equipment detail card with three sections:`}),`
`,(0,_.jsxs)(n.ol,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Photos`}),` — horizontal image row with `,(0,_.jsx)(n.code,{children:`CheckCircleIcon`}),` section title`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Fields`}),` — 2-column key/value grid, minimum row height `,(0,_.jsx)(n.code,{children:`44px`})]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Notes`}),` — free-text block with `,(0,_.jsx)(n.code,{children:`CheckCircleIcon`}),` section title`]}),`
`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`layout-type-2--accordion-table`,children:`Layout Type 2 — Accordion Table`}),`
`,(0,_.jsx)(r,{of:u}),`
`,(0,_.jsx)(n.p,{children:`Collapsible card revealing a tabbed component table. The accordion header shows a title + optional description. The body contains:`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`Tabs`}),` + a sort icon button`]}),`
`,(0,_.jsx)(n.li,{children:`A compact data table with 4 columns and a View link per row`}),`
`,(0,_.jsxs)(n.li,{children:[`Optional table `,(0,_.jsx)(n.code,{children:`Pagination`}),` at the bottom`]}),`
`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`layout-type-3--location-card`,children:`Layout Type 3 — Location Card`}),`
`,(0,_.jsx)(r,{of:d}),`
`,(0,_.jsxs)(n.p,{children:[`Shows region and current facility (facility renders as a link). A map preview image fills the bottom of the card; a styled placeholder is shown when no `,(0,_.jsx)(n.code,{children:`mapSrc`}),` is provided.`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`layout-type-4--contact-card`,children:`Layout Type 4 — Contact Card`}),`
`,(0,_.jsx)(r,{of:f}),`
`,(0,_.jsx)(n.p,{children:`Two-row contact block: added-by person and contact phone number, each with a leading icon.`}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`primitives`,children:`Primitives`}),`
`,(0,_.jsx)(r,{of:p}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`anatomy`,children:`Anatomy`}),`
`,(0,_.jsx)(n.h3,{id:`card-container`,children:`Card container`}),`
`,(0,_.jsxs)(n.p,{children:[`| Property | Value |
|----------|-------|
| Background | `,(0,_.jsx)(n.code,{children:`#ffffff`}),` |
| Border radius | `,(0,_.jsx)(n.code,{children:`12px`}),` |
| Padding | `,(0,_.jsx)(n.code,{children:`12px`}),` |
| Gap (children) | `,(0,_.jsx)(n.code,{children:`12px`}),` |
| Shadow | shadow-100 (see below) |`]}),`
`,(0,_.jsx)(n.h3,{id:`shadow-shadow-100`,children:`Shadow (shadow-100)`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{children:`0 1px 0 rgba(26,26,26,0.07),
inset 1px 0 0 rgba(0,0,0,0.13),
inset -1px 0 0 rgba(0,0,0,0.13),
inset 0 -1px 0 rgba(0,0,0,0.17),
inset 0 1px 0 rgba(204,204,204,0.5)
`})}),`
`,(0,_.jsx)(n.h3,{id:`cardfield`,children:`CardField`}),`
`,(0,_.jsxs)(n.p,{children:[`| Part | Size | Weight | Color |
|------|------|--------|-------|
| Label | 13px | 650 | `,(0,_.jsx)(n.code,{children:`#303030`}),` |
| Value (no icon) | 13px | 450 | `,(0,_.jsx)(n.code,{children:`#303030`}),` |
| Value (with icon) | 13px | 450 | `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Value (link) | 13px | 450 | `,(0,_.jsx)(n.code,{children:`#005bd3`}),`, underlined |
| Icon | 20×20px | — | `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Min row height | 44px | — | — |`]}),`
`,(0,_.jsx)(n.h3,{id:`cardimages`,children:`CardImages`}),`
`,(0,_.jsxs)(n.p,{children:[`| Property | Value |
|----------|-------|
| Thumbnail size | 120×120px |
| Border radius | `,(0,_.jsx)(n.code,{children:`8px`}),` |
| Gap | `,(0,_.jsx)(n.code,{children:`16px`}),` |`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`icons-used`,children:`Icons used`}),`
`,(0,_.jsxs)(n.p,{children:[`| Usage | Icon |
|-------|------|
| Section title (photos, notes) | `,(0,_.jsx)(n.code,{children:`CheckCircleIcon`}),` — `,(0,_.jsx)(n.code,{children:`#12B76A`}),` |
| Region field | `,(0,_.jsx)(n.code,{children:`LocationIcon`}),` — `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Current Facility field | `,(0,_.jsx)(n.code,{children:`CompassIcon`}),` — `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Added by field | `,(0,_.jsx)(n.code,{children:`PersonIcon`}),` — `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Contact number field | `,(0,_.jsx)(n.code,{children:`PhoneIcon`}),` — `,(0,_.jsx)(n.code,{children:`#616161`}),` |
| Accordion toggle | `,(0,_.jsx)(n.code,{children:`ChevronDownIcon`}),` |
| Table sort | `,(0,_.jsx)(n.code,{children:`SortIcon`}),` |`]}),`
`,(0,_.jsx)(n.hr,{}),`
`,(0,_.jsx)(n.h2,{id:`react-components`,children:`React components`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-jsx`,children:`import {
  Card,
  CardField,
  CardDivider,
  CardImages,
  CardNotes,
  CardSectionTitle,
  CardLayoutType1,
  CardLayoutType2,
  CardLayoutType3,
  CardLayoutType4,
} from 'components/Card/Card.jsx';

// Layout Type 1 — Detail card
<CardLayoutType1
  images={[src1, src2, src3]}
  fields={[
    { label: 'Serial Number', value: 'SN-00482-KE' },
    { label: 'Status',        value: 'Active' },
  ]}
  notes="Optional notes text here."
/>

// Layout Type 2 — Accordion table
<CardLayoutType2
  title="Associated Components"
  description="Primary components and accessories"
  tabs={[{ label: 'Primary Components' }, { label: 'Accessories' }]}
  activeTab={tab}
  onTabChange={setTab}
  tableRows={[
    { id: '1', type: 'Data Logger', manufacturer: 'Nexleaf', model: 'ColdTrace G3', equipmentId: 'EQ-10021' },
  ]}
  footer={<Pagination hasPrevious={false} hasNext label="1–3 of 3" type="table" />}
  defaultOpen
/>

// Layout Type 3 — Location card
<CardLayoutType3
  region="North Kenya"
  facilityName="Lodwar County Hospital"
  facilityHref="/facilities/lodwar"
/>

// Layout Type 4 — Contact card
<CardLayoutType4
  addedBy="Grace Mwangi"
  contactNumber="+254 712 345 678"
/>

// Custom card from primitives
<Card>
  <CardSectionTitle title="Equipment Details" />
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
    <CardField label="Model" value="ColdTrace G3" />
    <CardField label="Status" value="Active" />
  </div>
  <CardDivider />
  <CardImages images={[src1, src2]} />
</Card>
`})})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;e((()=>{_=n(),o(),a(),m()}))();export{g as default};