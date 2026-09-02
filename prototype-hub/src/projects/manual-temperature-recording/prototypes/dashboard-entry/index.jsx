import React, { useState } from 'react';
// FLOW — PD-36. The ColdTrace home launcher and its Today's Temperature Tasks
// drawer: the entry point into Manual Temperature Recording.
// Reference: Figma 8127:118754 (home) and 8127:118912 (drawer), state section
// "D · HOME DASHBOARD ENTRY: states (PD-36)" node 9221:47949.
//
// Composed only from Poltail (see .claude/skills/ds-components-only). The screen
// itself is the shared module ../../screens/DashboardHome.jsx so the other flows
// in this project can path through the same surface.
//
// All eight Figma states are togglable and keyed by the same ids as the frames,
// so parity is a diff on ids (see .claude/skills/prototype-figma-parity).
import { AppShell, Toast, Banner } from '@ds';
import DashboardHome from '../../screens/DashboardHome.jsx';
import TaskDrawer from '../../screens/TaskDrawer.jsx';
import StateSwitcher from '../../screens/StateSwitcher.jsx';
import { TASKS } from '../../screens/fixtures.js';

const STATES = [
  { id: 'D1',  title: 'Home: dashboard entry' },
  { id: 'D1a', title: 'Home: Loading' },
  { id: 'D1b', title: 'Home: All complete (0 pending)' },
  { id: 'D1c', title: 'Home: Load error' },
  { id: 'D1d', title: 'Home: No alerts' },
  { id: 'D2',  title: 'Home: Tasks drawer' },
  { id: 'D2a', title: 'Tasks drawer: Completed tab (empty)' },
  { id: 'D2b', title: 'Tasks drawer: Loading' },
];

const EMPTY_TASKS = { morning: [], evening: [], completed: [] };
const DONE_TASKS  = { morning: [], evening: [], completed: TASKS.morning.concat(TASKS.evening) };

export default function DashboardEntry() {
  const [state, setState] = useState('D1');
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState(0);

  const loading    = state === 'D1a';
  const allDone    = state === 'D1b';
  const loadError  = state === 'D1c';
  const noAlerts   = state === 'D1d';
  const drawerOpen = state === 'D2' || state === 'D2a' || state === 'D2b';

  // The card badge, the drawer tabs and the drawer list all read this one
  // object, which is why the counts cannot disagree the way they do in Figma
  // ("10 Pending" on the card vs "13 Pending" in the drawer, logged on PD-36).
  const tasks = allDone ? DONE_TASKS : loadError ? EMPTY_TASKS : TASKS;

  // D2a opens on the Completed tab; every other drawer state opens on Morning.
  React.useEffect(() => { setTab(state === 'D2a' ? 2 : 0); }, [state]);

  return (
    <>
      <StateSwitcher section="D · HOME DASHBOARD ENTRY" states={STATES} value={state} onChange={setState} />

      {/* level="primary" — home is a launcher, so the rail is hidden. This
          matches the reference frames, whose Closed Navigation carries no
          visible items. contentWidth="full" + wrapper padding '0 16px 32px' is
          the canonical placement from src/pages/ApplicationLayout; top padding
          stays 0. */}
      <AppShell level="primary" contentWidth="full">
        <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
          {loadError && (
            <div style={{ paddingTop: 16 }}>
              {/* The launcher itself is fine; only tasks and alerts failed. The
                  banner must not claim more than that, and the cards below must
                  not still show live counts (the self-contradiction Raphael
                  caught on D1c). */}
              <Banner
                tone="critical"
                title="Tasks and alerts are unavailable"
                actions={[{ label: 'Retry', onClick: () => setState('D1') }]}
              >
                Scanning and the module tiles still work. Recorded readings are safe.
              </Banner>
            </div>
          )}

          <DashboardHome
            tasks={tasks}
            loading={loading}
            urgentCount={noAlerts || loadError || allDone ? 0 : 5}
            alert={
              noAlerts
                ? { title: 'No equipment in an alarm condition', description: 'Temperature tasks are still outstanding.' }
                : undefined
            }
            onScan={() => setToast('Scan QR code or enter serial number. Opens the equipment lookup.')}
            onRecord={(task) => setToast('Record ' + task.session.toLowerCase() + ' reading. ' + task.name + ', ' + task.facility + '.')}
            onModule={(m) => setToast(
              m.id === 'temperature'
                ? 'Temperature Monitoring. Opens the Manual Temperature Recording workspace.'
                : m.title + ' is not part of this prototype.'
            )}
            onViewAlerts={() => setToast('Action Required. Opens the temperature alert list.')}
          />
        </div>

        {/* The DS TemperatureTasksCard opens its own internal View All panel, so
            the card's own button is already wired. This instance is the one the
            state switcher drives, which is how D2 / D2a / D2b are reachable
            without clicking through. Logged on PD-16: the card should expose a
            controlled `open` so the two cannot diverge. */}
        <TaskDrawer
          open={drawerOpen}
          onClose={() => setState('D1')}
          tasks={state === 'D2a' ? { ...tasks, completed: [] } : tasks}
          activeTab={tab}
          onTabChange={setTab}
          loading={state === 'D2b'}
          onRecord={(task) => setToast('Record ' + task.session.toLowerCase() + ' reading. ' + task.name + '.')}
        />

        {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
      </AppShell>
    </>
  );
}
