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
import { AppShell, Toast } from '@ds';
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
  const [errDismissed, setErrDismissed] = useState(false);

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
  React.useEffect(() => { setTab(state === 'D2a' ? 2 : 0); setErrDismissed(false); }, [state]);

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
          <DashboardHome
            tasks={tasks}
            loading={loading}
            urgentCount={noAlerts ? 0 : 5}
            alertsMode={allDone ? 'clear' : loadError ? 'error' : 'live'}
            tasksMode={allDone ? 'complete' : loadError ? 'error' : 'live'}
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

        {/* D1c — the launcher itself is fine; only tasks and alerts failed. The
            notice must not claim more than that, and the cards must not still
            show live counts (the self-contradiction Raphael caught on D1c).
            Raphael: "dont make it full screen, move it to the top right of the
            page" — so this is the DS Toast (compact in-card Banner, fixed
            top-right, 480px; icon · text · Retry on one row), NOT a Banner in
            the content column. Copy follows the D1c frame (9196:38686) — which
            has NO Retry and says "Try again shortly"; Raphael asked for a Retry
            button, so the closing sentence is dropped and the frame needs the
            button added (ask first). Two short sentences keep one row at 480px. duration={0} because it carries a Retry;
            dismissing hides the notice but leaves the page in its error state,
            which is what the counts reflect. */}
        {loadError && !errDismissed && (
          <Toast
            tone="critical"
            placement="top-right"
            duration={0}
            actions={[{ label: 'Retry', onClick: () => setState('D1') }]}
            onDismiss={() => setErrDismissed(true)}
          >
            Today's tasks and alerts couldn't load. Recorded readings are safe.
          </Toast>
        )}

        {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
      </AppShell>
    </>
  );
}
