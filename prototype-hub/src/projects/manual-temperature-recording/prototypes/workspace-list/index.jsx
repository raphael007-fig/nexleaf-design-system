import React, { useState } from 'react';
// FLOW — PD-34. Workspace List view, all ten states from Figma section
// "W1 · WORKSPACE LIST VIEW: states (PD-34)" node 9221:47950.
// Reference frame 8331:99736. File YzbXqlrKTcGbWxwzGkLTct.
//
// Composed only from Poltail (see .claude/skills/ds-components-only).
// Every Figma state has one entry in STATES with the same id, so parity can be
// diffed by id (see .claude/skills/prototype-figma-parity).
import { AppShell, Banner, Toast, Pagination } from '@ds';
import WorkspaceShell from '../../screens/WorkspaceShell.jsx';
import RecordingDateBar from '../../screens/RecordingDateBar.jsx';
import WorkspaceLegend from '../../screens/WorkspaceLegend.jsx';
import ReadingsTable from '../../screens/ReadingsTable.jsx';
import StateSwitcher from '../../screens/StateSwitcher.jsx';
import { readings, RECORDING_DATE, PAST_ENTRY_DATE, PAST_ENTRY_DAYS } from '../../screens/fixtures.js';

const STATES = [
  { id: 'W1',  title: 'List view (default)' },
  { id: 'W1a', title: 'Loading' },
  { id: 'W1b', title: 'Empty (first run)' },
  { id: 'W1c', title: 'Empty (filtered)' },
  { id: 'W1d', title: 'Load error' },
  { id: 'W1e', title: 'Offline / stale data' },
  { id: 'W1f', title: 'Read-only (regional staff)' },
  { id: 'W1g', title: 'Rows selected' },
  { id: 'W1h', title: 'Past entry mode (7-day window)' },
  { id: 'W1i', title: 'Mixed recording statuses' },
];

export default function WorkspaceList() {
  const [state, setState] = useState('W1');
  const [toast, setToast] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');

  const loading  = state === 'W1a';
  const pastEntry = state === 'W1h';
  const readOnly = state === 'W1f';
  const rows =
    state === 'W1b' || state === 'W1c' || state === 'W1d' ? []
    : state === 'W1h' ? readings('pending')
    : readings('mixed');

  const emptyState =
    state === 'W1b' ? { heading: 'No cold-chain equipment on record',
                        description: 'This facility has no equipment yet. Add equipment before recording temperatures.' }
  : state === 'W1c' ? { heading: 'No equipment matches these filters',
                        description: 'Equipment exists, but the current filters or recording date exclude all of it. Clear the filters to see everything.' }
  : undefined;

  // One banner per state, tone carrying the meaning.
  const banner =
    state === 'W1d' ? { tone: 'critical', title: 'Could not load readings',
                        body: 'Saved entries are safe. Retry to load the table again.', action: 'Retry' }
  : state === 'W1e' ? { tone: 'warning', title: 'You are offline',
                        body: 'Showing data from the last sync. Recording still works and will upload when the connection returns.' }
  : state === 'W1f' ? { tone: 'info', title: 'Read-only for this facility',
                        body: 'You can view readings for facilities you do not record for. Recording is limited to facility staff.' }
  : state === 'W1h' ? { tone: 'warning', title: 'Past Entry Mode',
                        body: 'You are viewing and recording temperatures for ' + PAST_ENTRY_DATE + '. Entries will be saved against that recording date, not today. You can record up to ' + PAST_ENTRY_DAYS + ' days back.' }
  : null;

  React.useEffect(() => { setSelected(state === 'W1g' ? new Set([1, 3, 5]) : new Set()); }, [state]);

  return (
    <>
      <StateSwitcher section="W1 · WORKSPACE LIST" states={STATES} value={state} onChange={setState} />

      <AppShell level="secondary" contentWidth="full">
        <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
          <WorkspaceShell
            view="list"
            onViewChange={(v) => setToast(v === 'calendar' ? 'Calendar view is the workspace-calendar flow (PD-35).' : null)}
            filters={filters}
            onFilterChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))}
            loading={loading}
            disabled={readOnly}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <RecordingDateBar
                date={pastEntry ? PAST_ENTRY_DATE : RECORDING_DATE}
                pastEntry={pastEntry}
                search={search}
                onSearch={setSearch}
                onPrev={() => setToast('Step back one recording date.')}
                onNext={() => setToast('Step forward one recording date.')}
                onPickDate={() => setToast('Pick Date opens the date picker, limited to ' + PAST_ENTRY_DAYS + ' days back.')}
                onToday={() => setState('W1')}
                disabled={loading}
              />

              <WorkspaceLegend />

              {/* In-card banner: no `title` prop — Banner.jsx checks `title`
                  before `inCard`, so the two together render the header
                  banner. The lead sentence carries the title instead. */}
              {banner && (
                <Banner tone={banner.tone} inCard
                  actions={banner.action ? [{ label: banner.action, onClick: () => setState('W1') }] : undefined}>
                  {banner.title}. {banner.body}
                </Banner>
              )}

              <ReadingsTable
                rows={rows}
                loading={loading}
                selected={selected}
                onSelectionChange={setSelected}
                readOnly={readOnly}
                pastEntry={pastEntry}
                emptyState={emptyState}
                bulkActions={state === 'W1g' ? [
                  { label: 'Record morning for selected', onAction: () => setToast('Bulk record morning for ' + selected.size + ' CCEs.') },
                  { label: 'Export selected',             onAction: () => setToast('Export ' + selected.size + ' rows.') },
                ] : undefined}
                onRecord={(row) => setToast('Record ' + row.make + ' ' + row.model + ' (' + row.serial + ')'
                  + (pastEntry ? ' against ' + PAST_ENTRY_DATE + '.' : '.'))}
                footer={rows.length ? <Pagination hasPrevious={false} hasNext onNext={() => {}} label={rows.length + ' of ' + rows.length} /> : undefined}
              />
            </div>
          </WorkspaceShell>
        </div>

        {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
      </AppShell>
    </>
  );
}
