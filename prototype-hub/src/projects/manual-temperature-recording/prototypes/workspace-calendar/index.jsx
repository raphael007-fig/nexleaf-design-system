import React, { useState } from 'react';
// FLOW — PD-35. Workspace Calendar view, all six states from Figma section
// "W2 · WORKSPACE CALENDAR: states (PD-35)" node 9221:47951.
// Reference frames 8573:46422 (Today) and 8575:35326 (Past Entry).
import { AppShell, Banner, Toast } from '@ds';
import WorkspaceShell from '../../screens/WorkspaceShell.jsx';
import RecordingDateBar from '../../screens/RecordingDateBar.jsx';
import WorkspaceLegend from '../../screens/WorkspaceLegend.jsx';
import RecordingCalendar from '../../screens/RecordingCalendar.jsx';
import StateSwitcher from '../../screens/StateSwitcher.jsx';
import { EQUIPMENT, RECORDING_DATE, PAST_ENTRY_DATE, AMENDMENT_DAYS } from '../../screens/fixtures.js';

const STATES = [
  { id: 'W2',  title: 'Calendar (Today)' },
  { id: 'W2a', title: 'Loading' },
  { id: 'W2b', title: 'Empty (filtered)' },
  { id: 'W2c', title: 'Load error' },
  { id: 'W3',  title: 'Calendar (Past Entry)' },
  { id: 'W3a', title: 'Amendment window expired' },
];

// Facility groups, built from the shared fixture so the group counts always
// equal their row totals (the duplicate-group / wrong-count defect on PD-35).
const GROUPS = ['Nairobi', 'Mombasa', 'Kisumu', 'Nyeri'].map((facility) => ({
  facility,
  items: EQUIPMENT.filter((e) => e.facility === facility),
}));

export default function WorkspaceCalendar() {
  const [state, setState] = useState('W2');
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({});

  const loading   = state === 'W2a';
  const pastEntry = state === 'W3' || state === 'W3a';
  const groups    = (state === 'W2b' || state === 'W2c') ? [] : GROUPS;

  const banner =
    state === 'W2c' ? { tone: 'critical', title: 'Could not load the month',
                        body: 'The month grid failed to load. Filters and the recording date are unaffected.', action: 'Retry' }
  : state === 'W3'  ? { tone: 'warning', title: 'Past Entry Mode',
                        body: 'Viewing ' + PAST_ENTRY_DATE + '. Entries will be saved against that recording date.' }
  : state === 'W3a' ? { tone: 'critical', title: 'Amendment window closed',
                        body: 'This reading is older than ' + AMENDMENT_DAYS + ' days, so it can no longer be amended. It stays visible as a read-only record.' }
  : null;

  return (
    <>
      <StateSwitcher section="W2 · WORKSPACE CALENDAR" states={STATES} value={state} onChange={setState} />

      <AppShell level="secondary" contentWidth="full">
        <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
          <WorkspaceShell
            view="calendar"
            onViewChange={(v) => setToast(v === 'list' ? 'List view is the workspace-list flow (PD-34).' : null)}
            filters={filters}
            onFilterChange={(k, v) => setFilters((f) => ({ ...f, [k]: v }))}
            loading={loading}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <RecordingDateBar
                date={pastEntry ? PAST_ENTRY_DATE : RECORDING_DATE}
                pastEntry={pastEntry}
                onPrev={() => setToast('Previous month.')}
                onNext={() => setToast('Next month.')}
                onPickDate={() => setToast('Pick Date jumps the grid to a month.')}
                onToday={() => setState('W2')}
                disabled={loading}
              />

              <WorkspaceLegend />

              {/* In-card banner: no `title` prop — Banner.jsx checks `title`
                  before `inCard`, so the two together render the header
                  banner. The lead sentence carries the title instead. */}
              {banner && (
                <Banner tone={banner.tone} inCard
                  actions={banner.action ? [{ label: banner.action, onClick: () => setState('W2') }] : undefined}>
                  {banner.title}. {banner.body}
                </Banner>
              )}

              <RecordingCalendar
                groups={groups}
                loading={loading}
                recordedUpTo={state === 'W3a' ? 10 : 27}
                today={27}
                emptyState={
                  state === 'W2b' ? { heading: 'No equipment matches these filters',
                                      description: 'Same rule as the List. The filter is hiding the equipment, not the month.' }
                : state === 'W2c' ? { heading: 'Month unavailable', description: 'Retry to load the grid.' }
                : undefined
                }
              />
            </div>
          </WorkspaceShell>
        </div>

        {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
      </AppShell>
    </>
  );
}
