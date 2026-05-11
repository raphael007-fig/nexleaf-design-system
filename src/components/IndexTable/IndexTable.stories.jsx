import { useState } from 'react';
import { IndexTable } from './IndexTable.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';

// Toolbar icons (inline, reused from IndexTable.jsx style)
const IcoFilter = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path d="M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z" />
    <path d="M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
    <path d="M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
  </svg>
);

const IcoAdjust = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path fillRule="evenodd" d="M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    <path fillRule="evenodd" d="M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

export default {
  title: 'Components/IndexTable',
  component: IndexTable,
  parameters: { layout: 'padded' },
};

// ─── Sample data ──────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: 'date',        label: 'Date',        sortable: true },
  { key: 'facility',    label: 'Facility',    sortable: true },
  { key: 'region',      label: 'Region' },
  { key: 'morning',     label: 'Morning °C',  sortable: true, align: 'right' },
  { key: 'evening',     label: 'Evening °C',  sortable: true, align: 'right' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge tone={row.statusTone}>{row.status}</Badge>,
  },
  { key: 'submittedBy', label: 'Submitted by' },
];

const ROWS = [
  { id: 1, date: 'Apr 28, 2026', facility: 'Kisumu District Hospital', region: 'Kisumu',  morning: '3.2', evening: '4.1', status: 'Complete',   statusTone: 'success',   submittedBy: 'Mary A.' },
  { id: 2, date: 'Apr 28, 2026', facility: 'Nairobi General',          region: 'Nairobi', morning: '2.9', evening: '3.8', status: 'Complete',   statusTone: 'success',   submittedBy: 'James O.' },
  { id: 3, date: 'Apr 28, 2026', facility: 'Mombasa Clinic',           region: 'Mombasa', morning: '—',   evening: '—',   status: 'Pending',    statusTone: 'attention', submittedBy: '—' },
  { id: 4, date: 'Apr 27, 2026', facility: 'Eldoret Referral',         region: 'Eldoret', morning: '4.5', evening: '5.2', status: 'Complete',   statusTone: 'success',   submittedBy: 'Anne K.' },
  { id: 5, date: 'Apr 27, 2026', facility: 'Nakuru Provincial',        region: 'Nakuru',  morning: '8.9', evening: '—',   status: 'Incomplete', statusTone: 'warning',   submittedBy: 'Peter M.' },
  { id: 6, date: 'Apr 26, 2026', facility: 'Kisumu District Hospital', region: 'Kisumu',  morning: '3.5', evening: '3.9', status: 'Complete',   statusTone: 'success',   submittedBy: 'Mary A.' },
  { id: 7, date: 'Apr 26, 2026', facility: 'Nairobi General',          region: 'Nairobi', morning: '3.1', evening: '4.0', status: 'Complete',   statusTone: 'success',   submittedBy: 'James O.' },
];

const PAGE_SIZE = 4;

// ─── AllStates — static snapshot ─────────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
      <IndexTable
        columns={COLUMNS}
        rows={ROWS}
        selectedRows={new Set([1, 3])}
        onSelectionChange={() => {}}
        sortKey="date"
        sortDir="desc"
        onSort={() => {}}
        bulkActions={[
          { label: 'Export selected', onAction: () => {} },
          { label: 'Mark complete',   onAction: () => {} },
        ]}
      />
    </div>
  ),
};

// ─── InteractionStates — fully interactive ────────────────────────────────────

const TOOLBAR_TABS = [
  { label: 'All' },
  { label: 'Complete', badge: '4' },
  { label: 'Incomplete', badge: '1' },
  { label: 'Pending', badge: '1' },
];

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [selected, setSelected] = useState(new Set());
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState('');

    function handleSort(key) {
      if (sortKey === key) {
        setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    }

    // Filter rows by active tab status
    const tabFilter = ['', 'Complete', 'Incomplete', 'Pending'][activeTab] || '';
    const filteredRows = ROWS.filter(r => {
      const matchesTab = !tabFilter || r.status === tabFilter;
      const matchesSearch = !search || Object.values(r).some(v =>
        String(v).toLowerCase().includes(search.toLowerCase())
      );
      return matchesTab && matchesSearch;
    });

    const pageRows = filteredRows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);
    const start = filteredRows.length === 0 ? 0 : page * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE + PAGE_SIZE, filteredRows.length);

    function handleTabChange(i) {
      setActiveTab(i);
      setPage(0);
      setSelected(new Set());
    }

    function handleSearch(e) {
      setSearch(e.target.value);
      setPage(0);
    }

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 960 }}>
        <IndexTable
          columns={COLUMNS}
          rows={pageRows}
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          tabs={TOOLBAR_TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchValue={search}
          onSearchChange={handleSearch}
          searchPlaceholder="Search records…"
          toolbarActions={[
            { label: 'Filter', icon: <IcoFilter size={16} />, onClick: () => {} },
            { label: 'Columns', icon: <IcoAdjust size={16} />, onClick: () => {} },
          ]}
          bulkActions={[
            { label: 'Export selected', onAction: () => alert(`Exporting ${selected.size} records`) },
            { label: 'Mark complete',   onAction: () => alert(`Marking ${selected.size} records complete`) },
          ]}
          rowActions={[
            { label: 'View details', onAction: () => {} },
            { label: 'Edit',         onAction: () => {} },
            { label: 'Delete',       onAction: () => {}, destructive: true },
          ]}
          footer={
            <Pagination
              type="table"
              hasPrevious={page > 0}
              hasNext={page < totalPages - 1}
              onPrevious={() => setPage(p => p - 1)}
              onNext={() => setPage(p => p + 1)}
              label={`Showing ${start}–${end} of ${filteredRows.length}`}
            />
          }
        />
      </div>
    );
  },
};

// ─── Empty ────────────────────────────────────────────────────────────────────

export const Empty = {
  name: 'Empty state',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
      <IndexTable
        columns={COLUMNS}
        rows={[]}
        selectedRows={new Set()}
        onSelectionChange={() => {}}
        emptyState={{
          heading: 'No temperature records found',
          description: 'Try adjusting your filters or adding a new temperature reading for today.',
        }}
      />
    </div>
  ),
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading = {
  name: 'Loading skeleton',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
      <IndexTable
        columns={COLUMNS}
        rows={[]}
        selectedRows={new Set()}
        onSelectionChange={() => {}}
        loading={true}
      />
    </div>
  ),
};

// ─── WithRowActions ───────────────────────────────────────────────────────────

export const WithRowActions = {
  name: 'With row actions',
  parameters: { layout: 'padded' },
  render: () => {
    const [selected, setSelected] = useState(new Set());
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
        <IndexTable
          columns={COLUMNS}
          rows={ROWS}
          selectedRows={selected}
          onSelectionChange={setSelected}
          rowActions={[
            { label: 'View details', onAction: () => {} },
            { label: 'Edit',         onAction: () => {} },
            { label: 'Duplicate',    onAction: () => {} },
            { label: 'Delete',       onAction: () => {}, destructive: true },
          ]}
        />
      </div>
    );
  },
};

// ─── WithBulkActions — pre-selected rows ──────────────────────────────────────

export const WithBulkActions = {
  name: 'With bulk actions',
  parameters: { layout: 'padded' },
  render: () => {
    const [selected, setSelected] = useState(new Set([2, 4, 6]));

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
        <IndexTable
          columns={COLUMNS}
          rows={ROWS}
          selectedRows={selected}
          onSelectionChange={setSelected}
          sortKey="date"
          sortDir="desc"
          onSort={() => {}}
          bulkActions={[
            { label: 'Export selected', onAction: () => alert(`Exporting ${selected.size} records`) },
            { label: 'Mark complete',   onAction: () => alert(`Marking ${selected.size} records complete`) },
            { label: 'Delete',          onAction: () => alert(`Deleting ${selected.size} records`) },
          ]}
        />
      </div>
    );
  },
};
