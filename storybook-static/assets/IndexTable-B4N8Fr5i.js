import{n as e}from"./chunk-DnJy8xQt.js";import{r as t}from"./react-DbGoJA1f.js";import{t as n}from"./jsx-runtime-DxP0NviS.js";import{n as r,o as i,s as a}from"./blocks-DM0YPyCA.js";import{t as o}from"./mdx-react-shim-_E85ceq3.js";import{AllStates as s,Empty as c,InteractionStates as l,Loading as u,WithBulkActions as d,t as f}from"./IndexTable.stories-BUihK3Ed.js";function p(e){let n={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{title:`Components/IndexTable/Docs`}),`
`,(0,h.jsx)(n.h1,{id:`indextable`,children:`IndexTable`}),`
`,(0,h.jsx)(n.p,{children:`Displays a list of structured records in a sortable, selectable table. Use IndexTable when users need to scan, filter, and act on multiple rows of data at once — such as temperature records, facility lists, or submission histories.`}),`
`,(0,h.jsx)(r,{of:s}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`when-to-use`,children:`When to use`}),`
`,(0,h.jsxs)(n.p,{children:[`| Use case | Recommendation |
|----------|---------------|
| Displaying a list of records with multiple attributes | `,(0,h.jsx)(n.strong,{children:`IndexTable`}),` |
| Single-column or card-based list | Use a simple list component instead |
| Inline editing of rows | Combine with modal or drawer pattern |
| Selecting and acting on multiple records | Use `,(0,h.jsx)(n.code,{children:`bulkActions`}),` prop |`]}),`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Do not`}),` use IndexTable for navigation menus or single-action lists.`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`interaction-states`,children:`Interaction states`}),`
`,(0,h.jsx)(n.p,{children:`Checkboxes, sort headers, hover states, bulk action bar, and pagination all work together interactively.`}),`
`,(0,h.jsx)(r,{of:l}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`with-bulk-actions-pre-selected`,children:`With bulk actions pre-selected`}),`
`,(0,h.jsx)(r,{of:d}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`empty-state`,children:`Empty state`}),`
`,(0,h.jsxs)(n.p,{children:[`Shown when `,(0,h.jsx)(n.code,{children:`rows`}),` is an empty array and `,(0,h.jsx)(n.code,{children:`loading`}),` is false. Pass `,(0,h.jsx)(n.code,{children:`emptyState={{ heading, description }}`}),` to customise the message.`]}),`
`,(0,h.jsx)(r,{of:c}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`loading-skeleton`,children:`Loading skeleton`}),`
`,(0,h.jsxs)(n.p,{children:[`When `,(0,h.jsx)(n.code,{children:`loading={true}`}),`, five placeholder rows with pulsing gray bars are rendered in place of data. No real data is required — pass `,(0,h.jsx)(n.code,{children:`rows={[]}`}),` alongside `,(0,h.jsx)(n.code,{children:`loading={true}`}),`.`]}),`
`,(0,h.jsx)(r,{of:u}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`css-structure`,children:`CSS structure`}),`
`,(0,h.jsx)(n.p,{children:`IndexTable is a fully inline-styled React component — no external CSS file is needed.`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-jsx`,children:`// Card container shadow
boxShadow: [
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
  '0 3px 1px -1px rgba(26,26,26,0.07)',
].join(', ')
`})}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`@keyframes indexTablePulse`}),` animation for skeleton rows is injected via an inline `,(0,h.jsx)(n.code,{children:`<style>`}),` tag inside the component.`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`design-tokens-used`,children:`Design tokens used`}),`
`,(0,h.jsxs)(n.p,{children:[`| Token | Value | Role |
|-------|-------|------|
| `,(0,h.jsx)(n.code,{children:`bg-surface`}),` | `,(0,h.jsx)(n.code,{children:`#ffffff`}),` | Card and row background |
| `,(0,h.jsx)(n.code,{children:`bg-selected`}),` | `,(0,h.jsx)(n.code,{children:`#f0f7ff`}),` | Selected row background; bulk bar background |
| `,(0,h.jsx)(n.code,{children:`#f7f7f7`}),` | — | Header row background |
| `,(0,h.jsx)(n.code,{children:`#fafafa`}),` | — | Row hover background |
| `,(0,h.jsx)(n.code,{children:`border-light`}),` | `,(0,h.jsx)(n.code,{children:`#ebebeb`}),` | Row dividers |
| `,(0,h.jsx)(n.code,{children:`#e3e3e3`}),` | — | Header bottom border |
| `,(0,h.jsx)(n.code,{children:`text-default`}),` | `,(0,h.jsx)(n.code,{children:`#303030`}),` | Row cell text; active sort icon |
| `,(0,h.jsx)(n.code,{children:`text-subdued`}),` | `,(0,h.jsx)(n.code,{children:`#616161`}),` | Header label text |
| `,(0,h.jsx)(n.code,{children:`text-placeholder`}),` | `,(0,h.jsx)(n.code,{children:`#9e9e9e`}),` | Unsorted / inactive sort icon |
| `,(0,h.jsx)(n.code,{children:`color-primary`}),` | `,(0,h.jsx)(n.code,{children:`#005bd3`}),` | Checkbox accent; "Deselect all" link |
| `,(0,h.jsx)(n.code,{children:`border-secondary-btn`}),` | `,(0,h.jsx)(n.code,{children:`#c9c9c9`}),` | Bulk action button border |
| `,(0,h.jsx)(n.code,{children:`text-disabled`}),` | `,(0,h.jsx)(n.code,{children:`#b5b5b5`}),` | Disabled checkbox / icon stroke |`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`react-component`,children:`React component`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-jsx`,children:`import { IndexTable } from 'components/IndexTable/IndexTable.jsx';
import { Pagination } from 'components/Pagination/Pagination.jsx';
import { Badge } from 'components/Badge/Badge.jsx';

const COLUMNS = [
  { key: 'date',     label: 'Date',       sortable: true },
  { key: 'facility', label: 'Facility',   sortable: true },
  { key: 'region',   label: 'Region' },
  { key: 'morning',  label: 'Morning °C', sortable: true, align: 'right' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge tone={row.statusTone}>{row.status}</Badge>,
  },
];

function MyPage() {
  const [selected, setSelected] = useState(new Set());
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  return (
    <IndexTable
      columns={COLUMNS}
      rows={rows}
      selectedRows={selected}
      onSelectionChange={setSelected}
      sortKey={sortKey}
      sortDir={sortDir}
      onSort={handleSort}
      bulkActions={[
        { label: 'Export', onAction: () => exportRecords(selected) },
      ]}
      emptyState={{
        heading: 'No records found',
        description: 'Adjust your filters or add a new record.',
      }}
      footer={
        <Pagination
          type="table"
          hasPrevious={page > 0}
          hasNext={hasMore}
          onPrevious={() => setPage(p => p - 1)}
          onNext={() => setPage(p => p + 1)}
          label={\`Showing \${start}–\${end} of \${total}\`}
        />
      }
    />
  );
}
`})}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`props-reference`,children:`Props reference`}),`
`,(0,h.jsxs)(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,(0,h.jsx)(n.code,{children:`columns`}),` | `,(0,h.jsx)(n.code,{children:`Column[]`}),` | `,(0,h.jsx)(n.code,{children:`[]`}),` | Column definitions (see below) |
| `,(0,h.jsx)(n.code,{children:`rows`}),` | `,(0,h.jsx)(n.code,{children:`object[]`}),` | `,(0,h.jsx)(n.code,{children:`[]`}),` | Data rows — each must have a unique `,(0,h.jsx)(n.code,{children:`id`}),` field |
| `,(0,h.jsx)(n.code,{children:`selectedRows`}),` | `,(0,h.jsx)(n.code,{children:`Set<id>`}),` | `,(0,h.jsx)(n.code,{children:`new Set()`}),` | Set of currently selected row IDs |
| `,(0,h.jsx)(n.code,{children:`onSelectionChange`}),` | `,(0,h.jsx)(n.code,{children:`(Set) => void`}),` | — | Called with updated selection Set |
| `,(0,h.jsx)(n.code,{children:`sortKey`}),` | `,(0,h.jsx)(n.code,{children:`string`}),` | — | Key of the currently sorted column |
| `,(0,h.jsx)(n.code,{children:`sortDir`}),` | `,(0,h.jsx)(n.code,{children:`'asc' \\| 'desc'`}),` | `,(0,h.jsx)(n.code,{children:`'asc'`}),` | Current sort direction |
| `,(0,h.jsx)(n.code,{children:`onSort`}),` | `,(0,h.jsx)(n.code,{children:`(key) => void`}),` | — | Called when a sortable column header is clicked |
| `,(0,h.jsx)(n.code,{children:`emptyState`}),` | `,(0,h.jsx)(n.code,{children:`{ heading, description }`}),` | — | Content shown when rows is empty |
| `,(0,h.jsx)(n.code,{children:`bulkActions`}),` | `,(0,h.jsx)(n.code,{children:`{ label, onAction }[]`}),` | — | Actions shown in the bulk bar |
| `,(0,h.jsx)(n.code,{children:`loading`}),` | `,(0,h.jsx)(n.code,{children:`boolean`}),` | `,(0,h.jsx)(n.code,{children:`false`}),` | Shows 5 skeleton rows when true |
| `,(0,h.jsx)(n.code,{children:`footer`}),` | `,(0,h.jsx)(n.code,{children:`ReactNode`}),` | — | Rendered below the table (use `,(0,h.jsx)(n.code,{children:`<Pagination type="table" />`}),`) |`]}),`
`,(0,h.jsx)(n.h3,{id:`column-definition`,children:`Column definition`}),`
`,(0,h.jsxs)(n.p,{children:[`| Field | Type | Description |
|-------|------|-------------|
| `,(0,h.jsx)(n.code,{children:`key`}),` | `,(0,h.jsx)(n.code,{children:`string`}),` | Maps to `,(0,h.jsx)(n.code,{children:`row[key]`}),` for default rendering |
| `,(0,h.jsx)(n.code,{children:`label`}),` | `,(0,h.jsx)(n.code,{children:`string`}),` | Header cell text |
| `,(0,h.jsx)(n.code,{children:`sortable`}),` | `,(0,h.jsx)(n.code,{children:`boolean`}),` | Enables sort icon and click handler |
| `,(0,h.jsx)(n.code,{children:`align`}),` | `,(0,h.jsx)(n.code,{children:`'left' \\| 'right' \\| 'center'`}),` | Cell text alignment (default: `,(0,h.jsx)(n.code,{children:`'left'`}),`) |
| `,(0,h.jsx)(n.code,{children:`width`}),` | `,(0,h.jsx)(n.code,{children:`string \\| number`}),` | Optional column width |
| `,(0,h.jsx)(n.code,{children:`render`}),` | `,(0,h.jsx)(n.code,{children:`(row) => ReactNode`}),` | Custom cell renderer — overrides default `,(0,h.jsx)(n.code,{children:`row[key]`}),` |
| `,(0,h.jsx)(n.code,{children:`noWrap`}),` | `,(0,h.jsx)(n.code,{children:`boolean`}),` | Sets `,(0,h.jsx)(n.code,{children:`white-space: nowrap`}),` on data cells |`]}),`
`,(0,h.jsx)(n.hr,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Select-all checkbox uses a native `,(0,h.jsx)(n.code,{children:`indeterminate`}),` state via `,(0,h.jsx)(n.code,{children:`ref`}),` when some (not all) rows are selected`]}),`
`,(0,h.jsxs)(n.li,{children:[`All `,(0,h.jsx)(n.code,{children:`<th>`}),` headers that are sortable respond to keyboard `,(0,h.jsx)(n.code,{children:`click`}),` events — wrap in `,(0,h.jsx)(n.code,{children:`<button>`}),` if stricter keyboard navigation is required`]}),`
`,(0,h.jsxs)(n.li,{children:[`Bulk action buttons are native `,(0,h.jsx)(n.code,{children:`<button>`}),` elements with visible focus states`]}),`
`,(0,h.jsxs)(n.li,{children:[`Empty state and skeleton rows use `,(0,h.jsx)(n.code,{children:`colSpan={999}`}),` to span all columns correctly`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=n(),o(),a(),f()}))();export{m as default};