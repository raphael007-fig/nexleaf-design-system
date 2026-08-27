import React, { useState } from 'react';
// FLOW — PD-36. The ColdTrace home launcher and its Today's Temperature Tasks
// drawer: the entry point into Manual Temperature Recording.
// Reference: Figma 8127:118754 (home) and 8127:118912 (drawer), section
// 9165:153497, page "Daily Temp Recording", file YzbXqlrKTcGbWxwzGkLTct.
//
// Composed only from Poltail (see .claude/skills/ds-components-only). The
// screen itself is the shared module ../../screens/DashboardHome.jsx so the
// other flows in this project can path through the same surface.
import { AppShell, Toast } from '@ds';
import DashboardHome from '../../screens/DashboardHome.jsx';

// Sample data. One source for the card badge, the drawer tabs and the drawer
// list — which is why the counts cannot disagree the way they do in Figma
// (card "10 Pending" vs drawer "13 Pending", logged on PD-36).
//
// One fixture for the whole module: the same 10 CCEs across 4 facilities that
// the Figma v2 frames now use (section 9175:34937). Inconsistent sample data
// across a flow is itself a defect.
const TASKS = {
  morning: [
    { id: 'm1', name: 'Vestfrost VLS 400A Greenline', facility: 'Pumwani Maternity Hospital', session: 'Morning' },
    { id: 'm2', name: 'B Medical TCW 40 SDD',         facility: 'Pumwani Maternity Hospital', session: 'Morning' },
    { id: 'm3', name: 'Dometic TCW 4000 AC',          facility: 'Pumwani Maternity Hospital', session: 'Morning' },
    { id: 'm4', name: 'B Medical TCW 40 SDD',         facility: 'Likoni Clinic',              session: 'Morning' },
    { id: 'm5', name: 'Haier HBC-130',                facility: 'Likoni Clinic',              session: 'Morning' },
    { id: 'm6', name: 'Zero Appliances ZLF 30',       facility: 'Likoni Clinic',              session: 'Morning' },
  ],
  evening: [
    { id: 'e1', name: 'B Medical TCW 40 SDD',         facility: 'Likoni Clinic',              session: 'Evening' },
    { id: 'e2', name: 'Haier HBC-130',                facility: 'Likoni Clinic',              session: 'Evening' },
    { id: 'e3', name: 'Zero Appliances ZLF 30',       facility: 'Likoni Clinic',              session: 'Evening' },
    { id: 'e4', name: 'Vestfrost VLS 400A Greenline', facility: 'Kisumu District Hospital',   session: 'Evening' },
    { id: 'e5', name: 'Aucma BC/BD-100',              facility: 'Kisumu District Hospital',   session: 'Evening' },
    { id: 'e6', name: 'Aucma BC/BD-100',              facility: 'Nyeri Health Center',        session: 'Evening' },
    { id: 'e7', name: 'Haier HBC-130',                facility: 'Nyeri Health Center',        session: 'Evening' },
  ],
  completed: [],
};

export default function DashboardEntry() {
  const [toast, setToast] = useState(null);

  return (
    // level="primary" — home is a launcher, so the rail is hidden. This matches
    // the reference frames, whose Closed Navigation carries no visible items.
    // contentWidth="full" + wrapper padding '0 16px 32px' is the canonical
    // placement from src/pages/ApplicationLayout; top padding stays 0.
    <AppShell level="primary" contentWidth="full">
      <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
        <DashboardHome
          tasks={TASKS}
          urgentCount={5}
          onScan={() => setToast('Scan QR code or enter serial number — opens the equipment lookup.')}
          onRecord={(task) => setToast(`Record ${task.session.toLowerCase()} reading — ${task.name}, ${task.facility}.`)}
          onModule={(m) => setToast(
            m.id === 'temperature'
              ? 'Temperature Monitoring — opens the Manual Temperature Recording workspace.'
              : `${m.title} — not part of this prototype.`
          )}
          onViewAlerts={() => setToast('Action Required — opens the temperature alert list.')}
        />
      </div>

      {toast && <Toast tone="info" onDismiss={() => setToast(null)}>{toast}</Toast>}
    </AppShell>
  );
}
