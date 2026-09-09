// ── Prototype state registry — Kenya NPHL Lab MVP ─────────────────────────────
// Every reviewable state of the Lab MVP, one entry each. The prototypes filter
// this registry by section title, and a future Figma board references the same
// ids — prototype and Figma cannot drift.
//
// EVERY state renders through the AssembledLabApp router, so every View, Edit,
// Add, Import, Cancel, back-arrow and breadcrumb leads to its real page from
// any starting state (Raf, 2026-09-03: "let all view and edit buttons be
// connected and lead to the right pages").
//
// State-matrix decisions (screen-states-and-interactions — the absence of a
// state is a decision, declared here, not an omission):
//   • Register: default ×3 personas / loading / empty-in-scope / filtered-empty
//     / long-content edge / error are DRAWN. OUT-OF-SCOPE renders as the module
//     home with the surface hidden (§3: no data = no access — an out-of-scope
//     user never sees the list, so an "empty list" frame for them would be a
//     lie). Offline: N/A — desk web work (D7); a failed fetch is the error state.
//   • Add single: default / validation / duplicate-tag / saved(toast+CTA) /
//     edit mode are DRAWN. Loading: N/A (static form, no fetch). Permission:
//     N/A — read-only personas never see the Add CTA (removed, not disabled).
//   • Bulk import: upload / map / preview(validation) / importing(live) /
//     error / success are DRAWN. Permission: N/A — import is admin work; the
//     CTA is absent below Admin scope.
//   • Cold-room flow: every step + details-validation + contacts-at-cap +
//     sensors-assigned + submitting + submit-failed + offline + success DRAWN;
//     cancel = destructive-confirm Modal (live via Cancel). Offline IS drawn
//     here — installers walk to the cold store.
//   • Cold-room detail: default / loading / partial(sensor silent) /
//     no-readings / chart-error DRAWN; per-sensor views live via the Tabs.
//   • Register record detail: default / monitorable-later / decommissioned /
//     read-only DRAWN. No chart states: unmonitored records have no monitoring
//     surface by definition.
//   • Module home: three personas DRAWN (the gating IS the state).
//   • Interaction states (hover/focus/disabled/loading on controls) belong to
//     the DS components and are never redrawn per screen.
import { useState } from 'react';
import { AppShell } from '@ds/components/AppShell/AppShell.jsx';
import { Page } from '@ds/components/Page/Page.jsx';
import { Card, CardSectionTitle, CardField } from '@ds/components/Card/Card.jsx';
import { navItemsForModule, firstItemIdForModule, MODULES, MODULE_HOME_ITEM } from '@ds/foundation/moduleNavs.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
import { ModuleHomeScreen } from './ModuleHomeScreen.jsx';
import { LabRegisterScreen } from './LabRegisterScreen.jsx';
import { AddLabEquipmentScreen } from './AddLabEquipmentScreen.jsx';
import { MonitoringMethodModal } from './MonitoringMethodModal.jsx';
import { BulkImportScreen } from './BulkImportScreen.jsx';
import { ColdRoomFlow } from './ColdRoomFlow.jsx';
import { CreateLabScreen } from './CreateLabScreen.jsx';
import { ColdRoomDetailScreen } from './ColdRoomDetailScreen.jsx';
import { LabRecordDetailScreen } from './LabRecordDetailScreen.jsx';
import { LAB_EQUIPMENT, IMPORT_FILES } from './labData.js';

// Non-inventory modules exist and are role-gated, but their content is
// UNCHANGED by the Lab MVP — the ratified FeaturePage placeholder from
// Patterns/Module Navigation says so instead of pretending to be the module.
function ModulePlaceholder({ moduleId, onHome }) {
  const module = MODULES.find((m) => m.id === moduleId);
  const items = navItemsForModule(moduleId);
  const activeId = firstItemIdForModule(moduleId);
  return (
    <AppShell
      level="secondary"
      navItems={items}
      activeItemId={activeId}
      onNavSelect={(id) => { if (id === 'home') onHome?.(); }}
      breadcrumbs={[{ ...MODULE_HOME_ITEM, iconOnly: true }, { id: '__module', label: module.title }]}
      onBreadcrumbSelect={(id) => { if (id === 'home') onHome?.(); }}
      contentWidth="full"
    >
      <div style={{ padding: '0 16px 32px', boxSizing: 'border-box' }}>
        <Page flushTop title={module.title} />
        <Card style={{ marginTop: 8, maxWidth: 720 }}>
          <CardSectionTitle title="Existing module — unchanged by the Lab MVP" />
          <div style={{ display: 'flex', gap: 12 }}>
            <CardField label="Module" value={module.title} />
            <CardField label="Access" value="Gated by the §3 region lists" />
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
            The Lab MVP only decides WHO sees this module (role/scope gating on the home
            launcher). Its content is the existing product surface — nothing here is
            redesigned, so the prototype shows this placeholder rather than a guess.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}

// The interactive assembly/router. Views:
//   'home' · 'register' · 'add' · 'import' · 'flow' · 'detail' (cold room)
//   'record:<id>' (register-record detail) · 'edit:<id>' · 'module:<id>' (placeholder)
// Per-view prop bags (registerProps/addProps/importProps/flowProps/detailProps)
// let each registry state open the SAME wired app at a specific condition.
function AssembledLabApp({
  initialView = 'home', persona = 'lead',
  registerProps = {}, addProps = {}, importProps = {}, flowProps = {}, detailProps = {},
  createLabProps = {},
}) {
  const [view, setView] = useState(initialView);
  const [highlightId, setHighlightId] = useState(registerProps.highlightId ?? null);
  const [returnToast, setReturnToast] = useState(registerProps.initialToast ?? null);
  const [methodOpen, setMethodOpen] = useState(false);
  const toRegister = () => { setView('register'); };
  const onCrumb = (id) => {
    if (id === 'home') setView('home');
    if (id === 'lab' || id === '__module') setView('register');
  };
  if (view === 'home') {
    return (
      <ModuleHomeScreen
        persona={persona}
        onOpenModule={(id) => setView(id === 'inventory' ? 'register' : `module:${id}`)}
      />
    );
  }
  if (view.startsWith('module:')) {
    return <ModulePlaceholder moduleId={view.slice(7)} onHome={() => setView('home')} />;
  }
  if (view.startsWith('edit:')) {
    const record = LAB_EQUIPMENT.find((r) => r.id === view.slice(5));
    return (
      <AddLabEquipmentScreen
        persona={persona === 'qa' ? 'tech' : persona}
        mode="edit"
        record={record}
        onSaved={(saved) => {
          setHighlightId(saved.id);
          setReturnToast({ text: `${saved.name || 'Equipment'} (${saved.assetTag}) was updated`, monitorable: false });
          toRegister();
        }}
        onCancel={toRegister}
        onCrumb={onCrumb}
      />
    );
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
        {...addProps}
      />
    );
  }
  if (view === 'import') {
    return (
      <BulkImportScreen
        onDone={() => {
          setReturnToast({ text: '7 records imported to HIV Reference Lab (NHRL) — 4 marked for review', monitorable: false });
          toRegister();
        }}
        onCancel={toRegister}
        onCrumb={onCrumb}
        {...importProps}
      />
    );
  }
  // Create Lab — the facility form with lab names and inventory in place of
  // vaccine services (Ednah, 2026-09-09). Saving lands on Add lab equipment,
  // which is where a brand-new lab actually needs to go next.
  if (view === 'createlab') {
    return (
      <CreateLabScreen
        onDone={() => setView('add')}
        onCancel={toRegister}
        onCrumb={onCrumb}
        {...createLabProps}
      />
    );
  }
  if (view === 'flow' || view === 'flow-new') {
    return (
      <ColdRoomFlow
        blank={view === 'flow-new'}
        onDone={toRegister}
        onViewRecord={() => setView('detail')}
        onCancel={toRegister}
        onCrumb={onCrumb}
        {...flowProps}
      />
    );
  }
  if (view === 'detail' || view.startsWith('detail:')) {
    return (
      <ColdRoomDetailScreen
        recordId={view.startsWith('detail:') ? view.slice(7) : 'ccs-wicr-001'}
        onBack={toRegister}
        onCrumb={onCrumb}
        onEdit={(id) => setView(`edit:${id}`)}
        {...detailProps}
      />
    );
  }
  if (view.startsWith('record:')) {
    return (
      <LabRecordDetailScreen
        recordId={view.slice(7)}
        persona={persona}
        onBack={toRegister}
        onEdit={(id) => setView(`edit:${id}`)}
        onSetUpMonitoring={() => setView('flow')}
        onCrumb={onCrumb}
      />
    );
  }
  // Add equipment asks the monitoring question first, the way the third-party
  // flow does — then routes to whichever flow that answer implies.
  return (
    <>
    <LabRegisterScreen
      key={returnToast ? 'returned' : 'plain'}
      persona={persona}
      highlightId={highlightId}
      initialToast={returnToast}
      onSetUpMonitoring={() => setView('flow')}
      onView={(id) => setView(LAB_EQUIPMENT.find((r) => r.id === id)?.monitored ? `detail:${id}` : `record:${id}`)}
      onEdit={(id) => setView(`edit:${id}`)}
      onAdd={() => { setReturnToast(null); setMethodOpen(true); }}
      onImport={() => { setReturnToast(null); setView('import'); }}
      onCrumb={onCrumb}
      {...registerProps}
    />
    <MonitoringMethodModal
      open={methodOpen}
      onClose={() => setMethodOpen(false)}
      onContinue={(method) => { setMethodOpen(false); setView(method === 'rtmd' ? 'flow-new' : 'add'); }}
    />
    </>
  );
}

// Sensors are rows of {serial, role} now that they are added with a "+".
// A deep link that opens the register form on step 2 or 3 arrives with step 1
// already answered (Raf, 2026-09-08). Without it those states illustrated a
// screen no user can reach by walking the form: an empty step 2, and a review
// whose every row was an em-dash. FLOW_READY does the same job for the
// monitored flow, so both register forms now seed their steps the same way.
const ADD_READY = {
  form: {
    facilityId: 'nhrl',
    type: 'centrifuge',
    name: 'Refrigerated centrifuge',
    make: 'Eppendorf',
    model: '5702 R',
    serial: '5702R-8817',
    assetTag: 'NHRL/EQP/101',
    location: 'Sample prep, Room 6',
    condition: 'Functional',
    acquired: '2022-03-12',
  },
  deployment: 'Deployed',
  wm: {
    warrantyStart: '2022-03-12',
    warrantyEnd: '2025-03-12',
    schedule: 'Quarterly',
    lastService: '2026-08-11',
    agreement: 'yes',
    servicer: 'Calibration Centre',
    servicerPhone: '+254 722 415 990',
    servicerEmail: 'service@calibration.go.ke',
    coverFrom: '2026-01-01',
    coverTo: '2026-12-31',
  },
};

const FLOW_READY = {
  deviceId: 'rtmd-1',
  sensors: [
    { serial: 'Sensor A', role: 'In-room' },
    { serial: 'Sensor B', role: 'In-room' },
    { serial: 'Sensor C', role: 'In-room' },
    { serial: 'Sensor D', role: 'Ambient' },
  ],
};

export const STATE_SECTIONS = [
  {
    title: 'Full flow (interactive)',
    states: [
      { id: 'full-lead', label: 'Biomed lead — end to end', render: () => <AssembledLabApp persona="lead" /> },
      { id: 'full-tech', label: 'Lab technician — scoped', render: () => <AssembledLabApp persona="tech" initialView="register" /> },
      { id: 'full-qa', label: 'Lab manager / QA — read-only', render: () => <AssembledLabApp persona="qa" initialView="register" /> },
    ],
  },
  {
    title: 'Module home · role-gated',
    states: [
      { id: 'home-lead', label: 'Biomed lead — all modules', render: () => <AssembledLabApp persona="lead" initialView="home" /> },
      { id: 'home-tech', label: 'Lab technician — surfaces hidden', render: () => <AssembledLabApp persona="tech" initialView="home" /> },
      { id: 'home-qa', label: 'Lab manager / QA — read-only scope', render: () => <AssembledLabApp persona="qa" initialView="home" /> },
    ],
  },
  {
    title: 'Lab register (Inventory ▸ Lab)',
    states: [
      { id: 'register-lead', label: 'Populated — lead, all NPHL', render: () => <AssembledLabApp persona="lead" initialView="register" /> },
      { id: 'register-tech', label: 'Populated — technician, own lab only', render: () => <AssembledLabApp persona="tech" initialView="register" /> },
      { id: 'register-qa', label: 'Read-only — QA (no Add, View only)', render: () => <AssembledLabApp persona="qa" initialView="register" /> },
      { id: 'register-loading', label: 'Loading — no “0” chrome', render: () => <AssembledLabApp persona="lead" initialView="register" registerProps={{ state: 'loading' }} /> },
      { id: 'register-empty', label: 'Empty in scope — first run', render: () => <AssembledLabApp persona="tech" initialView="register" registerProps={{ state: 'empty' }} /> },
      {
        id: 'register-filtered-empty',
        label: 'Filtered empty — data exists, search excludes it',
        render: () => <AssembledLabApp persona="lead" initialView="register" registerProps={{ initialSearch: 'cryostat' }} />,
      },
      {
        id: 'register-edge-long',
        label: 'Edge — longest tag, name and location',
        render: () => <AssembledLabApp persona="lead" initialView="register" registerProps={{ initialSearch: 'chromatography' }} />,
      },
      { id: 'register-error', label: 'Error — register failed to load', render: () => <AssembledLabApp persona="lead" initialView="register" registerProps={{ state: 'error' }} /> },
      // Out-of-scope: the surface is HIDDEN, so what the user actually sees is
      // the module home without it (§3) — not an empty list shell.
      { id: 'register-out-of-scope', label: 'Out of scope — surface hidden', render: () => <AssembledLabApp persona="tech" initialView="home" /> },
    ],
  },
  {
    title: 'Add equipment (single)',
    states: [
      { id: 'add-default', label: '1 · Facility & equipment', render: () => <AssembledLabApp persona="tech" initialView="add" /> },
      // Step 1 with every answer given — the state the control sub-states on the
      // Figma board illustrate (a dropdown open inside an otherwise complete
      // form). add-default stays genuinely empty; this is the "ready for Next"
      // projection of the same step (Raf, 2026-09-08).
      { id: 'add-filled', label: '1 · Facility & equipment — complete', render: () => <AssembledLabApp persona="tech" initialView="add" addProps={{ initialData: ADD_READY }} /> },
      { id: 'add-warranty', label: '2 · Warranty & Maintenance', render: () => <AssembledLabApp persona="tech" initialView="add" addProps={{ initialStep: 'details', initialData: ADD_READY }} /> },
      { id: 'add-review', label: '3 · Review & submit', render: () => <AssembledLabApp persona="tech" initialView="add" addProps={{ initialStep: 'review', initialData: ADD_READY }} /> },
      { id: 'add-errors', label: 'Validation errors', render: () => <AssembledLabApp persona="tech" initialView="add" addProps={{ state: 'errors' }} /> },
      { id: 'add-dup-tag', label: 'Duplicate asset tag (unique in region)', render: () => <AssembledLabApp persona="tech" initialView="add" addProps={{ state: 'dup' }} /> },
      { id: 'add-edit-mode', label: 'Edit mode — prefilled record', render: () => <AssembledLabApp persona="lead" initialView="edit:nhrl-058" /> },
      {
        // §5.2 success: back on the register — toast with the monitoring
        // action (duration 0), new row highlighted "Just added".
        id: 'add-saved-monitorable',
        label: 'Saved — toast + “Set up monitoring”',
        render: () => (
          <AssembledLabApp
            persona="lead"
            initialView="register"
            registerProps={{
              highlightId: 'ccs-wicr-001',
              initialToast: { text: 'Walk-in Cold Room (reagent store) (MOH/DLS/NPHL/CCS/WICR-001) was added to the register', monitorable: true },
            }}
          />
        ),
      },
    ],
  },
  {
    title: 'Bulk import',
    states: [
      { id: 'import-upload', label: '1 · Upload', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'upload' }} /> },
      // The upload step with all three files attached — the only state that can
      // show the file chips and their remove controls (Raf, 2026-09-08).
      { id: 'import-files-added', label: '1 · Upload — three files attached', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'upload', initialFileIds: IMPORT_FILES.map((f) => f.id) }} /> },
      { id: 'import-map', label: '2 · Map columns', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'map' }} /> },
      { id: 'import-preview', label: '3 · Preview & validation flags', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'preview' }} /> },
      { id: 'import-error', label: 'Import failed — nothing created', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'error' }} /> },
      { id: 'import-success', label: 'Success — records created', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'success' }} /> },
    ],
  },
  {
    // Ednah, 2026-09-09: no create-lab form existed in any design. It mirrors
    // Create Facility with lab names, /facility/lab, and inventory replacing
    // vaccine services. Transport & waste is kept deliberately, for consistency.
    title: 'Create lab (mirrors create facility)',
    states: [
      { id: 'lab-identification', label: '1 · Identification & location — hosted in a hospital', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'identification', seed: 'hosted' }} /> },
      { id: 'lab-identification-standalone', label: '1 · NPHL regional lab — no host facility', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'identification', seed: 'standalone' }} /> },
      { id: 'lab-identification-errors', label: '1 · Validation errors — region & lab name', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'errors', seed: 'empty' }} /> },
      { id: 'lab-supply', label: '2 · Supply chain & logistics', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'supply', seed: 'hosted' }} /> },
      { id: 'lab-inventory', label: '3 · Lab inventory (replaces vaccine services)', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'inventory', seed: 'hosted' }} /> },
      { id: 'lab-transport', label: '4 · Transport & waste management', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'transport', seed: 'hosted' }} /> },
      { id: 'lab-staff', label: '5 · Lab staff', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'staff', seed: 'hosted' }} /> },
      { id: 'lab-review', label: '6 · Review & submit', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'review', seed: 'hosted' }} /> },
      { id: 'lab-success', label: 'Lab created', render: () => <AssembledLabApp persona="lead" initialView="createlab" createLabProps={{ state: 'success', seed: 'hosted' }} /> },
    ],
  },
  {
    title: 'Cold-room monitoring (install)',
    states: [
      { id: 'flow-facility', label: '1 · Facility & equipment', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'facility' }} /> },
      { id: 'flow-warranty', label: '2 · Warranty & Maintenance', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'warranty' }} /> },
      {
        id: 'flow-details-errors',
        label: '1 · Validation errors',
        render: () => (
          <AssembledLabApp persona="lead" initialView="flow" flowProps={{
            initialStep: 'facility',
            // The monitored flow requires facility, type, make, status and
            // purchase date — asset tag and QR became optional at the Sep 2026
            // meeting, so seeding errors on them was stale.
            initialData: { equipment: { type: '', make: '', condition: '', acquired: null } },
            initialErrors: {
              type: 'Choose an equipment type from the list.',
              make: 'Choose or type the manufacturer.',
              condition: 'Choose the equipment’s status.',
              acquired: 'Enter the purchase date.',
            },
          }} />
        ),
      },
      { id: 'flow-device', label: '3 · Base station, sensors & alarms', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'device' }} /> },
      {
        id: 'flow-device-assigned',
        label: '3 · Sensors assigned (CT5 A–D)',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'device', initialData: FLOW_READY }} />,
      },
      {
        id: 'flow-contacts-cap',
        label: '3 · Contacts at the cap (10 of 10)',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'device', initialData: { ...FLOW_READY, contacts: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'] } }} />,
      },
      {
        id: 'flow-review',
        label: '4 · Review & submit',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'review', initialData: FLOW_READY }} />,
      },
      {
        id: 'flow-submitting',
        label: 'Submitting — in progress',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'review', simulate: 'submitting', initialData: FLOW_READY }} />,
      },
      {
        id: 'flow-submit-failed',
        label: 'Submit failed — server error',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'review', simulate: 'submit-failed', initialData: FLOW_READY }} />,
      },
      {
        id: 'flow-offline',
        label: 'Offline — cannot submit',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'review', simulate: 'offline', initialData: FLOW_READY }} />,
      },
      {
        id: 'flow-success',
        label: 'Success — cold room monitored',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'success', initialData: { ...FLOW_READY, contacts: ['c1', 'c3'] } }} />,
      },
    ],
  },
  {
    title: 'Cold-room record (detail)',
    states: [
      { id: 'detail-default', label: 'Default — all sensors, in range', render: () => <AssembledLabApp persona="lead" initialView="detail" /> },
      { id: 'detail-loading', label: 'Loading', render: () => <AssembledLabApp persona="lead" initialView="detail" detailProps={{ state: 'loading' }} /> },
      { id: 'detail-partial', label: 'Partial — Sensor B not reporting', render: () => <AssembledLabApp persona="lead" initialView="detail" detailProps={{ state: 'partial' }} /> },
      { id: 'detail-no-readings', label: 'No readings yet — just installed', render: () => <AssembledLabApp persona="lead" initialView="detail" detailProps={{ state: 'no-readings' }} /> },
      { id: 'detail-chart-error', label: 'Chart failed to load', render: () => <AssembledLabApp persona="lead" initialView="detail" detailProps={{ state: 'chart-error' }} /> },
    ],
  },
  {
    title: 'Register record (detail)',
    states: [
      { id: 'record-default', label: 'Not monitored — analyser', render: () => <AssembledLabApp persona="lead" initialView="record:nhrl-044" /> },
      { id: 'record-monitorable-later', label: 'Fridge — monitoring later', render: () => <AssembledLabApp persona="lead" initialView="record:nhrl-058" /> },
      { id: 'record-decommissioned', label: 'Decommissioned — still reachable', render: () => <AssembledLabApp persona="lead" initialView="record:nfsnrl-90" /> },
      { id: 'record-readonly', label: 'Read-only — QA, no Edit', render: () => <AssembledLabApp persona="qa" initialView="record:nfsnrl-77" /> },
    ],
  },
];
