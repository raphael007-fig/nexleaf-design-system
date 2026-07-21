// ── Add Equipment flow — shared story harness ─────────────────────────────────
// Used by BOTH story files: Pages/Scan QR Code owns the scan entry and the
// pop-ups over it; Pages/Add Equipment owns the wizard states. One harness so
// the responsive shell + level-switching behavior stays identical in both.

import { useState } from 'react';
import { AppShell } from '../../components/AppShell/AppShell.jsx';
import { PolarisIconImg } from '../../components/PolarisIcon/PolarisIcon.jsx';
import { BG_PAGE, TEXT_SUBDUED } from '../../tokens/index.js';
import { AddEquipmentFlow } from './AddEquipmentFlow.jsx';

// State stories render on the app page background, without the shell chrome.
export function StateFrame({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: BG_PAGE, padding: '32px 16px 16px', boxSizing: 'border-box' }}>
      {children}
    </div>
  );
}

const BREADCRUMBS = [
  { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />, iconOnly: true },
  { id: 'temp-recording', label: 'Manual Temp. Recording' },
  { id: 'add-equipment', label: 'Add Equipment' },
];

// Scan QR Code (and the pop-ups over it) is a SECONDARY page; the Add
// Equipment wizard itself is TERTIARY — the shell level follows the step.
const SECONDARY_STEPS = new Set(['search', 'entry', 'method', 'success']);

export function AssembledFlow({ entryContext, entrySerial, entryQr, initialStep }) {
  const [lastAction, setLastAction] = useState(null);
  const firstStep = initialStep
    || (entryContext === 'serial-search' || entryContext === 'qr-scan' ? 'entry' : 'method');
  const [step, setStep] = useState(firstStep);
  const onScanPage = SECONDARY_STEPS.has(step);
  const crumbs = onScanPage
    ? [...BREADCRUMBS.slice(0, 2), { id: 'scan', label: 'Scan QR Code' }]
    : BREADCRUMBS;
  return (
    <AppShell
      level={onScanPage ? 'secondary' : 'tertiary'}
      activeItemId="coldchain"
      breadcrumbs={crumbs}
      onBreadcrumbSelect={() => {}}
      contentWidth="fluid"
    >
      <AddEquipmentFlow
        entryContext={entryContext}
        entrySerial={entrySerial}
        entryQr={entryQr}
        initialStep={initialStep}
        onStepChange={setStep}
        onExit={() => setLastAction('exit → back to Manual Temperature Recording')}
        onCreated={(record) => setLastAction(`created: ${record.equipment.serial || '(no serial)'}`)}
      />
      {lastAction && (
        <span style={{ position: 'fixed', bottom: 8, right: 12, fontSize: 11, color: TEXT_SUBDUED }}>
          last action: {lastAction}
        </span>
      )}
    </AppShell>
  );
}
