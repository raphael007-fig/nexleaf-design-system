// ── Prototype state registry — Kenya NPHL Lab MVP ─────────────────────────────
// Every reviewable state of the Lab MVP, one entry each. The prototypes filter
// this registry by section title, and a future Figma board references the same
// ids — prototype and Figma cannot drift.
//
// State matrix decisions (screen-states-and-interactions, declared here so the
// absence of a state is a decision, not an omission):
//   • Register: default/loading/empty-in-scope/filtered-empty(live)/error are
//     drawn; OUT-OF-SCOPE renders as the module home with the surface hidden
//     (§3: no data = no access — an out-of-scope user never sees the list).
//   • Add single: default/validation/duplicate-tag(live)/saved+CTA. No offline
//     state — desk web work (D7); a failed save reuses the validation banner.
//   • Bulk import: upload/map/preview(validation)/importing(live)/success/
//     error. No permission state — import is admin work, hidden otherwise.
//   • Cold-room flow: every step + contacts-at-cap + submitting/failed/offline
//     + success. Offline IS drawn here (installers walk to the cold store).
//   • Detail: default/per-sensor(live)/partial(sensor offline)/no-readings/
//     chart-error/loading. Ambient sensor renders un-banded by design.
//   • Destructive confirm: the flow's cancel modal (live via Cancel).
import { useState } from 'react';
import { ModuleHomeScreen } from './ModuleHomeScreen.jsx';
import { LabRegisterScreen } from './LabRegisterScreen.jsx';
import { AddLabEquipmentScreen } from './AddLabEquipmentScreen.jsx';
import { BulkImportScreen } from './BulkImportScreen.jsx';
import { ColdRoomFlow } from './ColdRoomFlow.jsx';
import { ColdRoomDetailScreen } from './ColdRoomDetailScreen.jsx';

// One interactive end-to-end assembly: home → register → add / import /
// monitoring flow → cold-room detail. Breadcrumb + nav callbacks route back.
function AssembledLabApp({ initialView = 'home', persona = 'lead' }) {
  const [view, setView] = useState(initialView);
  const [highlightId, setHighlightId] = useState(null);
  const [returnToast, setReturnToast] = useState(null);
  const toRegister = () => { setView('register'); };
  const onCrumb = (id) => {
    if (id === 'home') setView('home');
    if (id === 'lab' || id === '__module') setView('register');
  };
  if (view === 'home') {
    return <ModuleHomeScreen persona={persona} onOpenModule={() => setView('register')} />;
  }
  if (view === 'add') {
    return (
      <AddLabEquipmentScreen
        persona={persona === 'qa' ? 'tech' : persona}
        onSaved={(record) => {
          // §5.2: toast + return to list, new row highlighted. The prototype
          // backend has one pre-seeded row to stand in for the created record.
          setHighlightId('ccs-wicr-001');
          setReturnToast({
            text: `${record.name || 'Equipment'} (${record.assetTag}) was added to the register`,
            monitorable: record.monitorable,
          });
          toRegister();
        }}
        onCancel={toRegister}
        onCrumb={onCrumb}
      />
    );
  }
  if (view === 'import') {
    return <BulkImportScreen onDone={toRegister} onCancel={toRegister} onCrumb={onCrumb} />;
  }
  if (view === 'flow') {
    return (
      <ColdRoomFlow
        onDone={toRegister}
        onViewRecord={() => setView('detail')}
        onCancel={toRegister}
        onCrumb={onCrumb}
      />
    );
  }
  if (view === 'detail') {
    return <ColdRoomDetailScreen onBack={toRegister} onCrumb={onCrumb} />;
  }
  return (
    <LabRegisterScreen
      key={returnToast ? 'returned' : 'plain'}
      persona={persona}
      highlightId={highlightId}
      initialToast={returnToast}
      onSetUpMonitoring={() => setView('flow')}
      onView={(id) => { if (id === 'ccs-wicr-001') setView('detail'); }}
      onAdd={() => { setReturnToast(null); setView('add'); }}
      onImport={() => { setReturnToast(null); setView('import'); }}
      onCrumb={onCrumb}
    />
  );
}

export const STATE_SECTIONS = [
  {
    title: 'Full flow (interactive)',
    states: [
      { id: 'full-lead', label: 'Biomed lead — end to end', render: () => <AssembledLabApp persona="lead" /> },
      { id: 'full-tech', label: 'Lab technician — scoped', render: () => <AssembledLabApp persona="tech" initialView="register" /> },
    ],
  },
  {
    title: 'Module home · role-gated',
    states: [
      { id: 'home-lead', label: 'Biomed lead — all modules', render: () => <ModuleHomeScreen persona="lead" /> },
      { id: 'home-tech', label: 'Lab technician — surfaces hidden', render: () => <ModuleHomeScreen persona="tech" /> },
      { id: 'home-qa', label: 'Lab manager / QA — read-only scope', render: () => <ModuleHomeScreen persona="qa" /> },
    ],
  },
  {
    title: 'Lab register (Inventory ▸ Lab)',
    states: [
      { id: 'register-lead', label: 'Populated — lead, all NPHL', render: () => <LabRegisterScreen persona="lead" /> },
      { id: 'register-tech', label: 'Populated — technician, own lab only', render: () => <LabRegisterScreen persona="tech" /> },
      { id: 'register-qa', label: 'Read-only — QA (no Add CTA)', render: () => <LabRegisterScreen persona="qa" /> },
      { id: 'register-loading', label: 'Loading — no “0” chrome', render: () => <LabRegisterScreen persona="lead" state="loading" /> },
      { id: 'register-empty', label: 'Empty in scope — first run', render: () => <LabRegisterScreen persona="tech" state="empty" /> },
      { id: 'register-error', label: 'Error — register failed to load', render: () => <LabRegisterScreen persona="lead" state="error" /> },
      // Out-of-scope: the surface is HIDDEN, so what the user actually sees is
      // the module home without it (§3) — not an empty list shell.
      { id: 'register-out-of-scope', label: 'Out of scope — surface hidden', render: () => <ModuleHomeScreen persona="tech" /> },
    ],
  },
  {
    title: 'Add equipment (single)',
    states: [
      { id: 'add-default', label: 'Form — technician scope', render: () => <AddLabEquipmentScreen persona="tech" /> },
      { id: 'add-errors', label: 'Validation errors', render: () => <AddLabEquipmentScreen persona="tech" state="errors" /> },
      {
        // §5.2 success: back on the register — toast with the monitoring
        // action (duration 0), new row highlighted "Just added".
        id: 'add-saved-monitorable',
        label: 'Saved — toast + “Set up monitoring”',
        render: () => (
          <LabRegisterScreen
            persona="lead"
            highlightId="ccs-wicr-001"
            initialToast={{ text: 'Walk-in Cold Room (reagent store) (MOH/DLS/NPHL/CCS/WICR-001) was added to the register', monitorable: true }}
            onSetUpMonitoring={() => {}}
          />
        ),
      },
    ],
  },
  {
    title: 'Bulk import',
    states: [
      { id: 'import-upload', label: '1 · Upload', render: () => <BulkImportScreen state="upload" /> },
      { id: 'import-map', label: '2 · Map columns', render: () => <BulkImportScreen state="map" /> },
      { id: 'import-preview', label: '3 · Preview & validation flags', render: () => <BulkImportScreen state="preview" /> },
      { id: 'import-error', label: 'Import failed — nothing created', render: () => <BulkImportScreen state="error" /> },
      { id: 'import-success', label: 'Success — records created', render: () => <BulkImportScreen state="success" /> },
    ],
  },
  {
    title: 'Cold-room monitoring (install)',
    states: [
      { id: 'flow-facility', label: '1 · Facility & contacts', render: () => <ColdRoomFlow initialStep="facility" /> },
      {
        id: 'flow-contacts-cap',
        label: 'Contacts at the cap (5 of 5)',
        render: () => <ColdRoomFlow initialStep="facility" initialData={{ contacts: ['c1', 'c2', 'c3', 'c4', 'c5'] }} />,
      },
      { id: 'flow-details', label: '2 · Equipment details', render: () => <ColdRoomFlow initialStep="details" /> },
      { id: 'flow-device', label: '3 · Base station & sensors', render: () => <ColdRoomFlow initialStep="device" /> },
      {
        id: 'flow-device-assigned',
        label: '3 · Sensors assigned (CT5 A–D)',
        render: () => (
          <ColdRoomFlow
            initialStep="device"
            initialData={{ deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'] }}
          />
        ),
      },
      {
        id: 'flow-review',
        label: '4 · Review & submit',
        render: () => (
          <ColdRoomFlow
            initialStep="review"
            initialData={{ deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'] }}
          />
        ),
      },
      {
        id: 'flow-submit-failed',
        label: 'Submit failed — server error',
        render: () => (
          <ColdRoomFlow
            initialStep="review"
            simulate="submit-failed"
            initialData={{ deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'] }}
          />
        ),
      },
      {
        id: 'flow-offline',
        label: 'Offline — cannot submit',
        render: () => (
          <ColdRoomFlow
            initialStep="review"
            simulate="offline"
            initialData={{ deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'] }}
          />
        ),
      },
      {
        id: 'flow-success',
        label: 'Success — cold room monitored',
        render: () => (
          <ColdRoomFlow
            initialStep="success"
            initialData={{ deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'], contacts: ['c1', 'c3'] }}
          />
        ),
      },
    ],
  },
  {
    title: 'Cold-room record (detail)',
    states: [
      { id: 'detail-default', label: 'Default — all sensors, in range', render: () => <ColdRoomDetailScreen /> },
      { id: 'detail-loading', label: 'Loading', render: () => <ColdRoomDetailScreen state="loading" /> },
      { id: 'detail-partial', label: 'Partial — Sensor B not reporting', render: () => <ColdRoomDetailScreen state="partial" /> },
      { id: 'detail-no-readings', label: 'No readings yet — just installed', render: () => <ColdRoomDetailScreen state="no-readings" /> },
      { id: 'detail-chart-error', label: 'Chart failed to load', render: () => <ColdRoomDetailScreen state="chart-error" /> },
    ],
  },
];
