import React from 'react';
// FLOW — PD-39. The module's state register: every state that exists in Figma,
// with the flow that renders it. This is the parity contract the
// prototype-figma-parity skill diffs against, so ids here must match the Figma
// frame ids exactly.
import { AppShell, Page, Card, Badge, Btn, IndexTable, Banner } from '@ds';

// section = the Figma section node; each row is one frame.
export const REGISTER = [
  { section: 'D · HOME DASHBOARD ENTRY: states (PD-36)', node: '9221:47949', mobileNode: '9366:56547', flow: 'dashboard-entry', states: [
    ['D1',  'Home: dashboard entry'], ['D1a', 'Home: Loading'], ['D1b', 'Home: All complete (0 pending)'],
    ['D1c', 'Home: Load error'], ['D1d', 'Home: No alerts'], ['D2',  'Home: Tasks drawer'],
    ['D2a', 'Tasks drawer: Completed tab (empty)'], ['D2b', 'Tasks drawer: Loading'],
  ]},
  { section: 'W1 · WORKSPACE LIST VIEW: states (PD-34)', node: '9221:47950', mobileNode: '9355:88923', flow: 'workspace-list', states: [
    ['W1',  'List view'], ['W1a', 'Loading'], ['W1b', 'Empty (first run)'], ['W1c', 'Empty (filtered)'],
    ['W1d', 'Load error'], ['W1e', 'Offline / stale data'], ['W1f', 'Read-only (regional staff)'],
    ['W1g', 'Rows selected'], ['W1h', 'Past entry mode (7-day window)'], ['W1i', 'Mixed recording statuses'],
  ]},
  { section: 'W2 · WORKSPACE CALENDAR: states (PD-35)', node: '9221:47951', mobileNode: '9365:56141', flow: 'workspace-calendar', states: [
    ['W2',  'Calendar (Today)'], ['W2a', 'Loading'], ['W2b', 'Empty (filtered)'], ['W2c', 'Load error'],
    ['W3',  'Calendar (Past Entry)'], ['W3a', 'Amendment window expired'],
  ]},
  { section: 'R · RECORDING FORM: states (PD-37)', node: '9247:48686', mobileNode: '9363:54860', flow: 'recording-form', states: [
    ['R1',  'Record: entry modal'], ['R2',  'Record Morning: empty form'], ['R3',  'Record Morning: filled'],
    ['R4',  'Record Morning: confirming'], ['R5',  'Record Morning: success'], ['R6',  'Record Evening: empty form'],
    ['R7',  'Record Evening: filled'], ['R8',  'Record Evening: confirm modal'], ['R9',  'Record Evening: processing'],
    ['R10', 'Record Evening: success'], ['R11', 'Edge: evening blocked, record morning first'],
    ['R12', 'Edge: morning complete, evening pending'], ['R13', 'Edge: alarm = yes, action taken'],
    ['R14', 'Edge: alarm = yes, action detail'], ['R15', 'Error: success with alarm raised'],
  ]},
  { section: 'A · AMENDMENT FLOW: states (PD-38)', node: '9248:51450', mobileNode: '9362:54348', flow: 'amendment', states: [
    ['A1', 'Amend Morning: view recording (editable)'], ['A2', 'Amend Evening: view recording (editable)'],
    ['A3', 'Amend Morning: history / audit trail'], ['A4', 'Amend Evening: history / audit trail'],
    ['A6', 'Amendment: summary after change (revertable history)'],
    ['A7', 'Amend Morning: window expired (read-only)'],
  ]},
];

// Mobile-only states. Desktop lays the five filters out inline as a row of
// selects, so there is no desktop frame for a filter sheet to pair with. These
// live on the mobile surface only, and the parity diff must not expect a
// desktop twin for them.
export const MOBILE_ONLY = [
  { section: 'W1-M · WORKSPACE LIST VIEW: mobile (PD-34)', node: '9355:88923', flow: 'workspace-list', states: [
    ['W1j', 'Filter sheet (shared with the calendar view)'],
    ['W1k', 'Filter sheet: choosing an option'],
    ['W1l', 'Filter sheet: filled'],
    ['W1m', 'List: filters applied'],
  ]},
  { section: 'W2-M · WORKSPACE CALENDAR: mobile (PD-35)', node: '9365:56141', flow: 'workspace-calendar', states: [
    ['W3e', 'Calendar: filters applied'],
  ]},
];

const TOTAL = REGISTER.reduce((n, s) => n + s.states.length, 0);
const MOBILE_TOTAL = MOBILE_ONLY.reduce((n, s) => n + s.states.length, 0);
const FIGMA = 'https://www.figma.com/design/YzbXqlrKTcGbWxwzGkLTct/MultiEquipment-Management--UI-Design?node-id=';

export default function StatesSet() {
  const columns = [
    { key: 'id',    label: 'State', render: (r) => <Badge tone="default">{r.id}</Badge> },
    { key: 'title', label: 'What it shows' },
    { key: 'flow',  label: 'Prototype flow' },
    { key: 'open',  label: '', align: 'right',
      render: (r) => (
        <Btn variant="secondary" size="small"
          onClick={() => { window.location.hash = '#/manual-temperature-recording/' + r.flow; }}>
          Open flow
        </Btn>
      ) },
  ];

  return (
    <AppShell level="secondary" contentWidth="full">
      <div style={{ padding: '0 16px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Page
          title="States and interactions"
          subtitle={TOTAL + ' desktop states across 5 flows, each with a mobile twin of the same id, plus '
            + MOBILE_TOTAL + ' mobile-only states. Every state here exists as a Figma frame with the same id.'}
        />

        <Banner tone="info">
          This is the parity contract for PD-39. The id is the join key between this register
          and the Figma frame names, on both the desktop and mobile sections. If a state exists
          in one surface and not the other, that is the defect — except for the mobile-only
          states listed at the bottom, which have no desktop frame by design.
        </Banner>

        {REGISTER.map((sec) => (
          <Card key={sec.node}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#303030' }}>{sec.section}</div>
                  <div style={{ fontSize: 12, color: '#616161' }}>
                    {sec.states.length} states · flow <code>{sec.flow}</code> · desktop <code>{sec.node}</code>{sec.mobileNode ? <> · mobile <code>{sec.mobileNode}</code></> : null}
                  </div>
                </div>
                <Btn variant="ghost" size="small"
                  onClick={() => window.open(FIGMA + sec.node.replace(':', '-'), '_blank', 'noopener')}>
                  Open in Figma
                </Btn>
              </div>

              <IndexTable
                columns={columns}
                rows={sec.states.map(([id, title]) => ({ id, title, flow: sec.flow }))}
                bare
              />
            </div>
          </Card>
        ))}

        {MOBILE_ONLY.map((sec) => (
          <Card key={sec.node + '-mobile-only'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#303030' }}>
                    {sec.section} <Badge tone="attention">mobile only</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: '#616161' }}>
                    {sec.states.length} states · flow <code>{sec.flow}</code> · mobile <code>{sec.node}</code> · no desktop twin
                  </div>
                </div>
                <Btn variant="ghost" size="small"
                  onClick={() => window.open(FIGMA + sec.node.replace(':', '-'), '_blank', 'noopener')}>
                  Open in Figma
                </Btn>
              </div>

              <IndexTable
                columns={columns}
                rows={sec.states.map(([id, title]) => ({ id, title, flow: sec.flow }))}
                bare
              />
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
