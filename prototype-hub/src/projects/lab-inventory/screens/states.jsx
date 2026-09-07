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
import { BulkImportScreen } from './BulkImportScreen.jsx';
import { ColdRoomFlow } from './ColdRoomFlow.jsx';
import { ColdRoomDetailScreen } from './ColdRoomDetailScreen.jsx';
import { LabRecordDetailScreen } from './LabRecordDetailScreen.jsx';
import { LAB_EQUIPMENT } from './labData.js';

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
}) {
  const [view, setView] = useState(initialView);
  const [highlightId, setHighlightId] = useState(registerProps.highlightId ?? null);
  const [returnToast, setReturnToast] = useState(registerProps.initialToast ?? null);
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
  if (view === 'flow') {
    return (
      <ColdRoomFlow
        onDone={toRegister}
        onViewRecord={() => setView('detail')}
        onCancel={toRegister}
        onCrumb={onCrumb}
        {...flowProps}
      />
    );
  }
  if (view === 'detail') {
    return <ColdRoomDetailScreen onBack={toRegister} onCrumb={onCrumb} onEdit={(id) => setView(`edit:${id}`)} {...detailProps} />;
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
  return (
    <LabRegisterScreen
      key={returnToast ? 'returned' : 'plain'}
      persona={persona}
      highlightId={highlightId}
      initialToast={returnToast}
      onSetUpMonitoring={() => setView('flow')}
      onView={(id) => setView(id === 'ccs-wicr-001' ? 'detail' : `record:${id}`)}
      onEdit={(id) => setView(`edit:${id}`)}
      onAdd={() => { setReturnToast(null); setView('add'); }}
      onImport={() => { setReturnToast(null); setView('import'); }}
      onCrumb={onCrumb}
      {...registerProps}
    />
  );
}

const FLOW_READY = { deviceId: 'rtmd-1', sensors: ['Sensor A', 'Sensor B', 'Sensor C', 'Sensor D (ambient)'] };

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
      { id: 'add-default', label: 'Form — technician scope', render: () => <AssembledLabApp persona="tech" initialView="add" /> },
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
      { id: 'import-map', label: '2 · Map columns', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'map' }} /> },
      { id: 'import-preview', label: '3 · Preview & validation flags', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'preview' }} /> },
      { id: 'import-error', label: 'Import failed — nothing created', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'error' }} /> },
      { id: 'import-success', label: 'Success — records created', render: () => <AssembledLabApp persona="lead" initialView="import" importProps={{ state: 'success' }} /> },
    ],
  },
  {
    title: 'Cold-room monitoring (install)',
    states: [
      { id: 'flow-facility', label: '1 · Facility & contacts', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'facility' }} /> },
      {
        id: 'flow-contacts-cap',
        label: 'Contacts at the cap (5 of 5)',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'facility', initialData: { contacts: ['c1', 'c2', 'c3', 'c4', 'c5'] } }} />,
      },
      { id: 'flow-details', label: '2 · Equipment details', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'details' }} /> },
      {
        id: 'flow-details-errors',
        label: '2 · Missing asset tag + QR',
        render: () => (
          <AssembledLabApp persona="lead" initialView="flow" flowProps={{
            initialStep: 'details',
            initialData: { equipment: { assetTag: '', qrCode: '' } },
            initialErrors: {
              assetTag: 'Enter the asset tag — it is how this record is found.',
              qrCode: 'Assign a QR code — the step cannot complete without one.',
            },
          }} />
        ),
      },
      { id: 'flow-device', label: '3 · Base station & sensors', render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'device' }} /> },
      {
        id: 'flow-device-assigned',
        label: '3 · Sensors assigned (CT5 A–D)',
        render: () => <AssembledLabApp persona="lead" initialView="flow" flowProps={{ initialStep: 'device', initialData: FLOW_READY }} />,
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
