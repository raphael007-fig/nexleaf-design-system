// ── Cold-room monitoring — the Phase-2 install flow (§5.4, D2, D4, D5) ─────────
// REUSES the Add-Equipment wizard system (StepFrame / phase spine / review
// sections cloned from projects/add-equipment/screens/AddEquipmentFlow.jsx —
// layer 1 of that file is explicitly designed for reuse by other "add X"
// flows). Content differences, all decided in the brief:
//   • Agreed order (Aug 24/25): Facility & Contacts → Equipment Details →
//     Monitoring Device LAST → Review & Submit.
//   • ONE cold-room record, an ARRAY of sensors (D2 intended model). Sensor
//     assignment is a dropdown, never free text (CT5 A–D · CTX pre-fed).
//   • No thresholds anywhere: WICR bands (2–8 °C) are admin config (D5).
//   • Alarm contacts use the RTMD flow's own component and its platform cap of
//     10 (the third-party add-equipment flow's exact field), asked with the
//     base station rather than the facility — D4's provisional 5 is superseded
//     by what the platform actually enforces.
//   • Type comes from the managed lab list (cold rooms are not in PQS);
//     no compartment question.
import { useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Toast } from '@ds/components/Toast/Toast.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
// The generic addition-flow wizard system (layer 1 of the Add Equipment flow,
// designed for reuse by other "add X" flows) — imported, not cloned, so the
// two flows can never drift.
import {
  StepFrame, FormSection, ReviewRows, ReviewSection, AlarmContactsField,
} from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import {
  WarrantyMaintenanceFields, warrantyMaintenanceRows,
  EMPTY_WARRANTY_MAINTENANCE,
} from './WarrantyMaintenance.jsx';
import { LabShell } from './LabShell.jsx';
import {
  LAB_FACILITIES, CONTACT_DIRECTORY, MAX_ALARM_CONTACTS,
  BASE_STATIONS, CT5_SENSORS, CTX_SENSORS, facilityLabel, CONDITIONS,
  DEPLOYMENT_STATUS, LAB_MODELS, LAB_TYPES, makeOptions, modelOptions,
} from './labData.js';

const TRAIL = [{ id: 'add-monitoring', label: 'Set Up Monitoring' }];

// Steps 1 and 2 are the register form's own steps (Raf, 2026-09-07): the same
// Facility & Equipment capture, then the same shared Warranty & Maintenance
// fields. Monitoring then continues where only this flow goes.
const PHASES = [
  { label: 'Facility & Equipment', steps: ['facility'] },
  { label: 'Warranty & Maintenance', steps: ['warranty'] },
  { label: 'Base Station, Sensors & Alarms', steps: ['device'] },
  { label: 'Review & Submit', steps: ['review'] },
];
const STEP_ORDER = ['facility', 'warranty', 'device', 'review'];

// What a sensor is FOR. In-room readings count toward in-range; ambient is
// context; a door sensor reports openings, not temperature — the meeting left
// fridge door sensors as "confirm scope", so the role exists and nothing forces
// it (Sep 2026).
const SENSOR_ROLES = ['In-room', 'Ambient', 'Door'];

// ── The flow ──────────────────────────────────────────────────────────────────
// A new monitored record starts empty, exactly as the register form does.
const EMPTY_EQUIPMENT = {
  type: '', name: '', make: '', model: '', serial: '', qrCode: '',
  location: '', condition: '', acquired: null, notes: '',
};

const DEFAULT_EQUIPMENT = {
  type: 'walk-in-cold-room',
  name: 'Walk-in Cold Room (reagent store)',
  make: 'Foster Refrigerator', model: 'PROB1100H',
  assetTag: 'MOH/DLS/NPHL/CCS/WICR-001', serial: 'FR-PROB-2019-4471',
  // Per the CCE install convention (Aug 25): a QR code is required before the
  // details step can complete. Applied to lab assets pending Ednah's confirm
  // (logged on PD-41).
  qrCode: 'QR-70021',
  location: 'Central cold store, Block C', condition: 'Functional', acquired: '2019-06-18',
};

/**
 * @param {string} [initialStep]   'facility'|'details'|'device'|'review'|'success'
 * @param {object} [initialData]   Partial {facilityId, contacts, equipment, deviceId, sensors}.
 * @param {object} [initialErrors] Field errors shown immediately (prototype states).
 * @param {'submitting'|'submit-failed'|'offline'|null} [simulate]
 */
export function ColdRoomFlow({
  initialStep = 'facility', initialData = {}, initialErrors = {}, simulate = null,
  // `blank` is the difference between the two ways in (Raf, 2026-09-07):
  //   • "Set up monitoring" on an existing register record → prefilled
  //   • Add equipment → Monitored → a NEW record, so nothing is prefilled
  blank = false,
  onDone, onViewRecord, onCancel, onCrumb,
}) {
  const [step, setStep] = useState(initialStep);
  const [visited, setVisited] = useState(() => new Set(
    STEP_ORDER.slice(0, Math.max(0, STEP_ORDER.indexOf(initialStep)) + 1),
  ));
  const [cancelOpen, setCancelOpen] = useState(false);
  const [submitState, setSubmitState] = useState(
    simulate === 'submitting' ? 'submitting' : simulate === 'submit-failed' ? 'failed' : 'idle',
  );

  // D1 (A): the cold room is a central NPHL asset → Central Cold Store.
  const [facilityId, setFacilityId] = useState(initialData.facilityId ?? (blank ? '' : 'ccs'));
  const [contacts, setContacts] = useState(initialData.contacts ?? (blank ? [] : ['c1', 'c3']));
  const [directory, setDirectory] = useState(CONTACT_DIRECTORY);
  const [equipment, setEquipment] = useState(blank
    ? { ...EMPTY_EQUIPMENT, ...(initialData.equipment || {}) }
    : { ...DEFAULT_EQUIPMENT, ...(initialData.equipment || {}) });
  const [deviceId, setDeviceId] = useState(initialData.deviceId ?? '');
  const [sensors, setSensors] = useState(initialData.sensors ?? []);
  const [errors, setErrors] = useState(initialErrors);
  const [contactNotice, setContactNotice] = useState(null);
  // The register form's step 2, driven by the shared field set.
  const [wm, setWm] = useState(EMPTY_WARRANTY_MAINTENANCE);
  const [customProviders, setCustomProviders] = useState([]);
  const [customMakes, setCustomMakes] = useState([]);
  const [customModels, setCustomModels] = useState([]);
  const [customTypes, setCustomTypes] = useState([]);
  const [otherType, setOtherType] = useState('');
  // A cold room being monitored is, by definition, deployed.
  const [deployment, setDeployment] = useState(initialData.deployment ?? 'Deployed');

  const device = BASE_STATIONS.find((d) => d.id === deviceId) || null;
  const sensorOptions = (device?.kind === 'CTX' ? CTX_SENSORS : CT5_SENSORS)
    .map((s) => ({ id: s, label: s }));
  // A CT5 has exactly four sensors; a CTX draws from the pre-fed serial pool.
  const maxSensors = device?.kind === 'CT5' ? 4 : (device ? CTX_SENSORS.length : 0);
  // Copy follows the chosen type, not a hardcoded cold room: the type carries
  // the thresholds, so it also carries what the screens can honestly say.
  const typeName = equipment.type === 'other'
    ? (otherType.trim() || 'Other')
    : (LAB_TYPES.find((t) => t.id === equipment.type)?.label || 'this equipment');
  const band = equipment.type === 'ultra-cold' ? '−40 to −86 °C' : '2–8 °C';
  const configName = `${typeName} configuration`;
  // Don't lowercase the label — it would eat the °C in "Ultra-cold freezer
  // (−40/−86 °C)" — and don't restate the band when the label already carries it.
  const bandSuffix = typeName.includes('°C') ? '' : ` (${band})`;

  // One validator for step 1, so the primary can stay disabled until the
  // record is answerable (same rule as the register form).
  function recordErrors() {
    const next = {};
    if (!facilityId) next.facilityId = 'Choose the facility that owns this cold room.';
    if (!equipment.type) next.type = 'Choose an equipment type from the list.';
    if (equipment.type === 'other' && !otherType.trim()) next.otherType = 'Enter what type of equipment this is.';
    if (!equipment.make.trim()) next.make = 'Choose or type the manufacturer.';
    if (!equipment.condition) next.condition = 'Choose the equipment’s status.';
    if (!equipment.acquired) next.acquired = 'Enter the purchase date.';
    return next;
  }
  const recordComplete = Object.keys(recordErrors()).length === 0;

  function nextFromFacility() {
    const found = recordErrors();
    setErrors(found);
    if (!Object.keys(found).length) go('warranty');
  }

  function go(next) {
    setStep(next);
    setVisited((v) => new Set([...v, next]));
  }

  const activePhaseIndex = PHASES.findIndex((p) => p.steps.includes(step));
  // Per-phase booleans, not indices — the Stepper reads navigable[i].
  const navigable = PHASES.map((p) => p.steps.some((s) => visited.has(s)));
  const stepper = step === 'success' ? null : {
    phases: PHASES,
    activeIndex: activePhaseIndex,
    navigable,
    onSelect: (i) => go(PHASES[i].steps[0]),
  };

  function submit() {
    if (simulate === 'offline') return; // the offline banner owns the story
    setSubmitState('submitting');
    setTimeout(() => {
      if (simulate === 'submit-failed') setSubmitState('failed');
      else { setSubmitState('idle'); go('success'); }
    }, 1200);
  }

  // Success is a landing surface (secondary), the wizard itself is tertiary —
  // same shell-level switching as Add Equipment.
  const level = step === 'success' ? 'secondary' : 'tertiary';

  return (
    <LabShell level={level} trail={TRAIL} onCrumb={onCrumb}>
      {step !== 'success' && (
        <Page
          flushTop
          title="Set Up Monitoring"
          subtitle={equipment.type
            ? `Install the Nexleaf base station and assign its sensors to this ONE record — ${typeName}. Thresholds follow the ${configName}${bandSuffix} — nothing to enter here.`
            : 'Install the Nexleaf base station and assign its sensors to ONE equipment record. Thresholds come from the equipment type — nothing to enter here.'}
          backAction={{ onClick: () => setCancelOpen(true), ariaLabel: 'Cancel monitoring setup' }}
        />
      )}

      {step === 'facility' && (
        <StepFrame
          stepper={stepper}
          title="Facility & equipment"
          subtitle="The facility (which sets the region) and the equipment itself — the same capture as the register form, so a monitored record holds exactly what an unmonitored one does."
          footerLeft={<Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!recordComplete} onClick={nextFromFacility}>Next</Btn>
          )}
        >
          <SearchSelect
            label="Facility"
            required
            placeholder="Choose a facility"
            options={LAB_FACILITIES}
            value={facilityId}
            onChange={(v) => setFacilityId(v && v.target ? v.target.value : v)}
            error={errors.facilityId}
          />
          <p style={{ margin: '-8px 0 0', fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
            Region is derived from the facility — it is never asked separately.
          </p>

          {/* The type is CHOSEN, not fixed (the Sep 2026 meeting: the monitored
              flow mirrors the unmonitored one exactly). The register already
              holds monitored fridges and ultra-cold freezers, which a
              cold-room-only flow could never have created. */}
          <SearchSelect
            label="Equipment type"
            required
            placeholder="Choose or type an equipment type"
            options={[
              ...LAB_TYPES.map((t) => ({ id: t.id, label: t.label })),
              ...customTypes.map((t) => ({ id: t, label: t })),
            ]}
            value={equipment.type}
            onChange={(v) => {
              const type = v && v.target ? v.target.value : v;
              setEquipment((q) => ({ ...q, type }));
              setErrors((er) => ({ ...er, type: undefined }));
            }}
            onCreate={(text) => {
              setCustomTypes((c) => (c.includes(text) ? c : [...c, text]));
              setEquipment((q) => ({ ...q, type: text }));
              setErrors((er) => ({ ...er, type: undefined }));
            }}
            createLabel="Add equipment type"
            error={errors.type}
            helpText="The type carries the temperature thresholds — they are never entered here."
          />
          {equipment.type === 'other' && (
            <TextInput
              label="What type of equipment is it?"
              required
              placeholder="The lab’s own word for this equipment"
              value={otherType}
              onChange={(e) => { setOtherType(e.target.value); setErrors((x) => ({ ...x, otherType: undefined })); }}
              error={errors.otherType}
            />
          )}
          {equipment.type === 'walk-in-cold-room' && (
            <Banner tone="info" inCard hideIcon>
              A walk-in cold room is a shared NPHL asset, so it lives under <b>Central Cold
              Store</b> — not inside one unit lab.
            </Banner>
          )}

          <FormSection title="Identification" required>
            <TextInput
              label="Name"
              placeholder="Optional — what staff call it"
              value={equipment.name}
              onChange={(e) => setEquipment((q) => ({ ...q, name: e.target.value }))}
              helpText="Optional — what staff call it."
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <SearchSelect
                label="Make"
                required
                error={errors.make}
                placeholder="Choose or type a manufacturer"
                options={[...makeOptions(), ...customMakes.map((m) => ({ id: m, label: m }))]}
                value={equipment.make}
                onChange={(v) => {
                  const make = v && v.target ? v.target.value : v;
                  setEquipment((q) => ({
                    ...q, make,
                    model: (LAB_MODELS[make] || []).includes(q.model) ? q.model : '',
                  }));
                  setErrors((er) => ({ ...er, make: undefined }));
                }}
                onCreate={(name) => {
                  setCustomMakes((c) => (c.includes(name) ? c : [...c, name]));
                  setEquipment((q) => ({ ...q, make: name, model: '' }));
                  setErrors((er) => ({ ...er, make: undefined }));
                }}
                createLabel="Add new manufacturer"
                helpText="From the managed manufacturer list — add one if it is genuinely new."
              />
              <SearchSelect
                label="Model"
                placeholder={equipment.make ? `Choose or type a ${equipment.make} model` : 'Choose or type a model'}
                options={[...modelOptions(equipment.make), ...customModels.map((m) => ({ id: m, label: m }))]}
                value={equipment.model}
                onChange={(v) => setEquipment((q) => ({ ...q, model: v && v.target ? v.target.value : v }))}
                onCreate={(name) => {
                  setCustomModels((c) => (c.includes(name) ? c : [...c, name]));
                  setEquipment((q) => ({ ...q, model: name }));
                }}
                createLabel="Add new model"
                helpText={equipment.make ? `Models NPHL already holds for ${equipment.make}.` : 'Pick the make first to narrow this list.'}
              />
            </div>
            <TextInput
              label="Serial number"
              placeholder="Optional"
              value={equipment.serial}
              onChange={(e) => setEquipment((q) => ({ ...q, serial: e.target.value }))}
              helpText="Often missing or duplicated on lab equipment — leave blank if unreadable."
            />
            {/* Asset tag is REQUIRED on this path, unlike the register form: a
                monitored record is the one every alarm and reading points at. */}
            <TextInput
              label="Asset tag"
              placeholder="Optional — e.g. MOH/DLS/NPHL/CCS/WICR-001"
              value={equipment.assetTag}
              error={errors.assetTag}
              onChange={(e) => { setEquipment((q) => ({ ...q, assetTag: e.target.value })); setErrors((er) => ({ ...er, assetTag: undefined })); }}
              helpText="Optional, as in the register form. Where a lab tags its kit, enter it exactly as labelled."
            />
          </FormSection>

          <FormSection title="Placement & status">
            <TextInput
              label="Location / room"
              placeholder="e.g. Central cold store, Block C"
              value={equipment.location}
              onChange={(e) => setEquipment((q) => ({ ...q, location: e.target.value }))}
            />
            <SelectInput
              label="Equipment status"
              required
              placeholder="Choose a condition"
              options={CONDITIONS.map((c) => ({ id: c, label: c }))}
              value={equipment.condition}
              onChange={(e) => { setEquipment((q) => ({ ...q, condition: e.target ? e.target.value : e })); setErrors((er) => ({ ...er, condition: undefined })); }}
              error={errors.condition}
              helpText="Whether the equipment works. Age (“old”, “new”) is not a status — use Notes."
            />
            <SelectInput
              label="Deployment status"
              options={DEPLOYMENT_STATUS.map((d) => ({ id: d, label: d }))}
              placeholder="Select…"
              value={deployment}
              onChange={(e) => setDeployment(e.target ? e.target.value : e)}
              helpText="Whether the equipment is in service. Equipment status says if it works; this says if it is being used."
            />
            <DateField
              label="Purchase date"
              required
              value={equipment.acquired}
              onChange={(d) => { setEquipment((q) => ({ ...q, acquired: d })); setErrors((er) => ({ ...er, acquired: undefined })); }}
              error={errors.acquired}
              helpText="When the lab bought it — separate from when it was installed."
            />
          </FormSection>

          <FormSection title="QR code">
            <TextInput
              label="QR code"
              placeholder="Optional — scan or type the code on the sticker"
              value={equipment.qrCode}
              onChange={(e) => setEquipment((q) => ({ ...q, qrCode: e.target.value }))}
              helpText="Optional, for future use. A code links a physical label to this record so a phone scan opens it."
            />
          </FormSection>

          <FormSection title="Notes">
            <TextareaInput
              placeholder="Anything the register should keep — provenance, validation status, shared use…"
              value={equipment.notes || ''}
              onChange={(e) => setEquipment((q) => ({ ...q, notes: e.target.value }))}
            />
          </FormSection>
        </StepFrame>
      )}

      {step === 'warranty' && (
        <StepFrame
          stepper={stepper}
          title="Warranty & Maintenance"
          subtitle="The cover and service history behind this equipment, so a fault can be checked against them before a repair is raised. All optional."
          footerLeft={<Btn variant="secondary" onClick={() => go('facility')}>Back</Btn>}
          footerRight={<Btn variant="primary" onClick={() => go('device')}>Next</Btn>}
        >
          {/* The register form's step 2, imported — not a second copy. */}
          <WarrantyMaintenanceFields
            value={wm}
            onChange={(patch) => setWm((w) => ({ ...w, ...patch }))}
            providers={customProviders}
            onProviderCreate={(name) => setCustomProviders((c) => (c.includes(name) ? c : [...c, name]))}
          />
        </StepFrame>
      )}

      {step === 'device' && (
        <StepFrame
          stepper={stepper}
          title="Base station & sensors"
          subtitle={`Monitoring comes last: the equipment is the primary, the device is secondary. All sensors attach to this ONE record — ${typeName}.`}
          footerLeft={<Btn variant="secondary" onClick={() => go('warranty')}>Back</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!deviceId || !sensors.length || sensors.some((r) => !r.serial)} onClick={() => go('review')}>
              Next
            </Btn>
          )}
        >
          <FormSection title="Base station" required>
            <SearchSelect
              label="Nexleaf RTMD"
              required
              placeholder="Choose a base station by model / IMEI"
              options={BASE_STATIONS.map((d) => ({ id: d.id, label: `${d.model} · IMEI ${d.imei}` }))}
              value={deviceId}
              onChange={(v) => {
                const id = v && v.target ? v.target.value : v;
                setDeviceId(id);
                setSensors([]); // sensor vocabulary follows the device kind
              }}
            />
          </FormSection>
          {/* Sensors are added one at a time with a "+" (the meeting, Sep 2026):
              a cold room needs 3–4, a fridge usually one, and some carry a door
              sensor — a fixed multi-select could not express that. Each row is
              a serial plus the ROLE it plays, because the role decides whether
              the reading counts toward in-range (in-room), is context only
              (ambient), or is an open-door event (door). */}
          <FormSection title={deviceId ? `Sensors on this record · ${sensors.length} of ${maxSensors}` : 'Sensors on this record'} required>
            {sensors.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr) auto', gap: 12, alignItems: 'end' }}>
                <SearchSelect
                  label={`Sensor ${i + 1}`}
                  required
                  placeholder={device
                    ? (device.kind === 'CTX' ? 'Pick a pre-fed CTX serial…' : 'Pick a CT5 sensor (A–D)…')
                    : 'Choose a base station first'}
                  options={sensorOptions.filter((o) => o.id === row.serial || !sensors.some((x) => x.serial === o.id))}
                  value={row.serial}
                  onChange={(v) => {
                    const serial = v && v.target ? v.target.value : v;
                    setSensors((rs) => rs.map((r, j) => (j === i ? { ...r, serial } : r)));
                    setErrors((er) => ({ ...er, sensors: undefined }));
                  }}
                  disabled={!deviceId}
                  error={errors.sensors && !row.serial ? 'Choose a sensor.' : undefined}
                />
                <SelectInput
                  label="Role"
                  options={SENSOR_ROLES.map((r) => ({ id: r, label: r }))}
                  value={row.role}
                  onChange={(e) => {
                    const role = e.target ? e.target.value : e;
                    setSensors((rs) => rs.map((r, j) => (j === i ? { ...r, role } : r)));
                  }}
                />
                <Btn
                  variant="tertiary"
                  onClick={() => setSensors((rs) => rs.filter((_, j) => j !== i))}
                  ariaLabel={`Remove sensor ${i + 1}`}
                >
                  Remove
                </Btn>
              </div>
            ))}
            <div style={{ display: 'flex' }}>
              <Btn
                variant="secondary"
                disabled={!deviceId || sensors.length >= maxSensors}
                onClick={() => setSensors((rs) => [...rs, { serial: '', role: rs.length ? 'Ambient' : 'In-room' }])}
              >
                + Add sensor
              </Btn>
            </div>
            {!deviceId && (
              <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
                Choose a base station first — it decides which sensors exist.
              </p>
            )}
            {deviceId && sensors.length >= maxSensors && (
              <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
                {device.model} carries {maxSensors} sensors — remove one to swap it.
              </p>
            )}
            {/* ONE banner about sensors (Raf, 2026-09-07: the empty-state banner and
                this one were saying the same thing twice). It carries the count
                guidance while the list is empty, then just the rule. */}
            <Banner tone="info" inCard>
              <span style={{ display: 'block', fontWeight: 650 }}>One record, many sensors</span>
              {sensors.length === 0
                ? 'Add at least one — a walk-in cold room normally has 3–4 in-room sensors plus an ambient one, a fridge usually one. '
                : ''}
              Every reading lands on this one record — it stays one piece of equipment in
              every count. Serials are picked from the system, never typed.
            </Banner>
            <Banner tone="info" inCard hideIcon>
              <b>No thresholds to enter.</b> Alarms follow the {configName}{bandSuffix},
              WHO-derived and managed by administrators. The NPHL region can override
              durations later if the lab lead confirms reagents need it.
            </Banner>
          </FormSection>
          {/* Alarm contacts belong with the RTMD, not the facility step (Raf,
              2026-09-07): the exact component from the third-party / RTMD
              add-equipment flow, imported from layer 1 so there is one
              implementation. Contacts are optional — the empty state says what
              happens without them. */}
          <FormSection title="Alarms">
            <AlarmContactsField
              max={MAX_ALARM_CONTACTS}
              contacts={contacts}
              onChange={setContacts}
              directory={directory}
              onDirectoryAdd={(c) => setDirectory((d) => [...d, c])}
              onNotice={setContactNotice}
            />
          </FormSection>
        </StepFrame>
      )}

      {step === 'review' && (
        <StepFrame
          stepper={stepper}
          title="Review & submit"
          subtitle="One cold-room record, monitored by one base station and its sensors."
          footerLeft={<Btn variant="secondary" onClick={() => go('device')} disabled={submitState === 'submitting'}>Back</Btn>}
          footerRight={(
            <Btn
              variant="primary"
              loading={submitState === 'submitting'}
              disabled={simulate === 'offline'}
              onClick={submit}
            >
              {submitState === 'submitting' ? 'Submitting…' : 'Submit'}
            </Btn>
          )}
        >
          {simulate === 'offline' && (
            <Banner tone="warning" inCard>
              <span style={{ display: 'block', fontWeight: 650 }}>You're offline — submission is paused</span>
              Everything entered here is kept on this device. Submit becomes available as soon
              as the connection returns; nothing needs re-entering.
            </Banner>
          )}
          {submitState === 'failed' && (
            <Banner tone="critical" inCard actions={[{ label: 'Try again', onClick: submit }]}>
              <span style={{ display: 'block', fontWeight: 650 }}>Submission failed — nothing was created</span>
              The server rejected the request. Your entries are unchanged — retry, or come
              back later; the record is not partially saved.
            </Banner>
          )}
          <ReviewSection title="Facility" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('facility')}>
            <ReviewRows rows={[
              ['Facility', facilityLabel(facilityId)],
              ['Region', 'National Public Health Lab (derived from facility)'],
            ]} />
          </ReviewSection>
          <ReviewSection title="Equipment" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('facility')}>
            <ReviewRows rows={[
              ['Type', typeName],
              ['Name', equipment.name],
              ['Make / Model', `${equipment.make} ${equipment.model}`],
              ['Asset tag', equipment.assetTag],
              ['QR code', equipment.qrCode],
              equipment.serial ? ['Serial number', equipment.serial] : null,
              ['Location', equipment.location],
              ['Equipment status', equipment.condition],
              ['Deployment status', deployment || '—'],
              ['Purchase date', equipment.acquired
                ? new Date(equipment.acquired).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—'],
            ]} />
          </ReviewSection>
          <ReviewSection title="Maintenance" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('warranty')}>
            <ReviewRows rows={warrantyMaintenanceRows(wm).maintenance} />
          </ReviewSection>
          <ReviewSection title="Warranty & service" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('warranty')}>
            <ReviewRows rows={warrantyMaintenanceRows(wm).warranty} />
          </ReviewSection>
          <ReviewSection title="Monitoring" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('device')}>
            <ReviewRows rows={[
              ['Base station', device ? `${device.model} · IMEI ${device.imei}` : '—'],
              ['Sensors on this record', sensors.length
                ? sensors.map((r) => `${r.serial} (${r.role.toLowerCase()})`).join(' · ')
                : '—'],
              ['Thresholds', `${configName}${bandSuffix} — admin-managed, not set here`],
              ['Alarm contacts', contacts.length
                ? `${contacts.length} of ${MAX_ALARM_CONTACTS} — ${contacts.map((id) => directory.find((c) => c.id === id)?.name || id).join(', ')}`
                : 'None (dashboard alarms only)'],
            ]} />
          </ReviewSection>
        </StepFrame>
      )}

      {step === 'success' && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
          <SubmissionSuccessCard
            title="The walk-in cold room is now monitored"
            sections={[
              {
                heading: 'What was set up',
                lines: [
                  { label: 'Equipment', value: `${equipment.name} · ${equipment.assetTag}` },
                  { label: 'Facility', value: facilityLabel(facilityId) },
                  { label: 'Base station', value: device ? `${device.model} · IMEI ${device.imei}` : 'ColdTrace 5' },
                  { label: 'Sensors', value: `${sensors.length} on this one record` },
                  { label: 'Alarms', value: `${band} (${configName}) → ${contacts.length} contact${contacts.length === 1 ? '' : 's'}` },
                ],
              },
            ]}
            primaryAction={{ label: 'View cold-room record', onClick: onViewRecord }}
            secondaryActions={[{ label: 'Back to Lab Equipment', onClick: onDone }]}
          />
        </div>
      )}

      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Discard monitoring setup?"
        size="small"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, width: '100%' }}>
            <Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep editing</Btn>
            <Btn variant="primary" tone="critical" onClick={() => { setCancelOpen(false); onCancel?.(); }}>
              Discard setup
            </Btn>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          The cold-room record stays in the register — only this monitoring setup
          (base station, sensors, contacts added here) is discarded.
        </p>
      </Modal>

      {contactNotice && (
        <Toast tone={contactNotice.tone} onDismiss={() => setContactNotice(null)}>
          {contactNotice.message}
        </Toast>
      )}
    </LabShell>
  );
}
