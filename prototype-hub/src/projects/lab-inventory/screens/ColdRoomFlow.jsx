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
//   • Alarm contacts hard-cap at 5 with a visible counter (D4).
//   • Type comes from the managed lab list (cold rooms are not in PQS);
//     no compartment question.
import { useState, useEffect, useRef } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { useIsMobile, useViewport } from '@ds/foundation/useViewport.js';
import { Card, CardSectionTitle } from '@ds/components/Card/Card.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Tag } from '@ds/components/Tag/Tag.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect, SearchSelectMulti } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Stepper } from '@ds/components/Stepper/Stepper.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import {
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_CRITICAL, BORDER_LIGHT,
} from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import {
  LAB_FACILITIES, CONTACT_DIRECTORY, MAX_ALARM_CONTACTS,
  BASE_STATIONS, CT5_SENSORS, CTX_SENSORS, facilityLabel, CONDITIONS,
} from './labData.js';

const TRAIL = [{ id: 'add-monitoring', label: 'Set Up Monitoring' }];

const PHASES = [
  { label: 'Facility & Contacts', steps: ['facility'] },
  { label: 'Equipment Details', steps: ['details'] },
  { label: 'Base Station & Sensors', steps: ['device'] },
  { label: 'Review & Submit', steps: ['review'] },
];
const STEP_ORDER = ['facility', 'details', 'device', 'review'];

// ── Wizard chrome cloned from AddEquipmentFlow (layer 1) ──────────────────────
function useFixedFrame(deps = []) {
  const ref = useRef(null);
  const [top, setTop] = useState(184);
  const [bottomInset, setBottomInset] = useState(16);
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setTop(Math.round(el.getBoundingClientRect().top));
      let inset = 0;
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        inset += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.marginBottom) || 0);
      }
      setBottomInset(Math.max(16, Math.round(inset)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return { ref, height: `calc(100dvh - ${top + bottomInset}px)` };
}

function StepFrame({ stepper, title, subtitle, children, footerLeft, footerRight }) {
  const isMobile = useIsMobile();
  const { width: viewportWidth } = useViewport();
  const compactStepper = viewportWidth < 920;
  const { ref: frameRef, height: frameHeight } = useFixedFrame([]);
  return (
    <div ref={frameRef}>
      <Card style={{
        height: frameHeight, overflow: 'hidden',
        padding: isMobile ? '20px 16px 12px' : '32px 40px 20px',
        gap: 0,
      }}>
        {stepper && (
          <div style={{ flexShrink: 0 }}>
            <Stepper
              phases={stepper.phases}
              activeIndex={stepper.activeIndex}
              compact={compactStepper}
              navigable={stepper.navigable}
              onSelect={stepper.onSelect}
            />
          </div>
        )}
        <div style={{
          flex: '1 1 auto', minHeight: 0, overflowY: 'auto',
          marginTop: stepper ? (isMobile ? 20 : 28) : 0, paddingRight: 8,
        }}>
          <div style={{ width: '100%', maxWidth: 620, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>{title}</h2>
              {subtitle && (
                <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>{subtitle}</p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 8 }}>
              {children}
            </div>
          </div>
        </div>
        {(footerLeft || footerRight) && (
          <div style={{ flexShrink: 0, paddingTop: isMobile ? 12 : 16, borderTop: `1px solid ${BORDER_LIGHT}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{footerLeft}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{footerRight}</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function FormSection({ title, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${BORDER_LIGHT}`, paddingBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
          {title}{required && <span style={{ color: TEXT_CRITICAL, marginLeft: 2 }}>*</span>}
        </h3>
      </div>
      {children}
    </div>
  );
}

function ReviewRows({ rows }) {
  const visible = rows.filter(Boolean);
  return (
    <div>
      {visible.map(([label, value], i) => (
        <div key={label} style={{
          display: 'flex', gap: 24, alignItems: 'baseline', padding: '12px 0',
          borderBottom: i < visible.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none',
        }}>
          <span style={{ width: 180, flexShrink: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>{label}</span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 500, lineHeight: '20px', color: TEXT_DEFAULT, overflowWrap: 'anywhere' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewSection({ title, status, onEdit, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <CardSectionTitle title={title} />
          {status}
        </div>
        {onEdit && <Btn variant="ghost" small onClick={onEdit}>Edit</Btn>}
      </div>
      {children}
    </div>
  );
}

// ── The flow ──────────────────────────────────────────────────────────────────
const DEFAULT_EQUIPMENT = {
  name: 'Walk-in Cold Room (reagent store)',
  make: 'Foster Refrigerator', model: 'PROB1100H',
  assetTag: 'MOH/DLS/NPHL/CCS/WICR-001', serial: 'FR-PROB-2019-4471',
  location: 'Central cold store, Block C', condition: 'Functional', acquired: null,
};

/**
 * @param {string} [initialStep]   'facility'|'details'|'device'|'review'|'success'
 * @param {object} [initialData]   Partial {facilityId, contacts, equipment, deviceId, sensors}.
 * @param {'submitting'|'submit-failed'|'offline'|null} [simulate]
 */
export function ColdRoomFlow({
  initialStep = 'facility', initialData = {}, simulate = null,
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
  const [facilityId, setFacilityId] = useState(initialData.facilityId ?? 'ccs');
  const [contacts, setContacts] = useState(initialData.contacts ?? ['c1', 'c3']);
  const [directory, setDirectory] = useState(CONTACT_DIRECTORY);
  const [equipment, setEquipment] = useState({ ...DEFAULT_EQUIPMENT, ...(initialData.equipment || {}) });
  const [deviceId, setDeviceId] = useState(initialData.deviceId ?? '');
  const [sensors, setSensors] = useState(initialData.sensors ?? []);
  const [errors, setErrors] = useState({});

  const device = BASE_STATIONS.find((d) => d.id === deviceId) || null;
  const sensorOptions = (device?.kind === 'CTX' ? CTX_SENSORS : CT5_SENSORS)
    .map((s) => ({ id: s, label: s }));
  const atCap = contacts.length >= MAX_ALARM_CONTACTS;

  function go(next) {
    setStep(next);
    setVisited((v) => new Set([...v, next]));
  }

  const activePhaseIndex = PHASES.findIndex((p) => p.steps.includes(step));
  const navigable = PHASES.map((p, i) => i).filter((i) => PHASES[i].steps.some((s) => visited.has(s)));
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
          title="Set Up Monitoring — Walk-in Cold Room"
          subtitle="Install the Nexleaf base station and assign its sensors to this one cold-room record. Thresholds follow the Walk-in Cold Room configuration (2–8 °C) — nothing to enter here."
          backAction={{ onClick: () => setCancelOpen(true), ariaLabel: 'Cancel monitoring setup' }}
        />
      )}

      {step === 'facility' && (
        <StepFrame
          stepper={stepper}
          title="Facility & alarm contacts"
          subtitle="Who owns the cold room, and who is called when it goes out of range. Contacts join the facility's shared directory."
          footerLeft={<Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!facilityId || contacts.length === 0} onClick={() => go('details')}>
              Next
            </Btn>
          )}
        >
          <FormSection title="Facility" required>
            <SearchSelect
              label="Facility"
              required
              placeholder="Choose a facility"
              options={LAB_FACILITIES}
              value={facilityId}
              onChange={(v) => setFacilityId(v && v.target ? v.target.value : v)}
            />
            <Banner tone="info" inCard hideIcon>
              The cold room is a shared NPHL asset, so it lives under <b>Central Cold Store</b> —
              not inside one unit lab. Region is derived from the facility.
            </Banner>
          </FormSection>
          <FormSection title={`Alarm contacts · ${contacts.length} of ${MAX_ALARM_CONTACTS}`} required>
            {atCap ? (
              <Banner tone="warning" title={`Contact limit reached (${MAX_ALARM_CONTACTS} of ${MAX_ALARM_CONTACTS})`} inCard>
                A facility can hold {MAX_ALARM_CONTACTS} RTMD alarm contacts. To add someone,
                remove a contact first — the limit is enforced by the platform.
              </Banner>
            ) : (
              <SearchSelect
                label="Add a contact"
                placeholder="Search the facility directory…"
                options={directory
                  .filter((c) => !contacts.includes(c.id))
                  .map((c) => ({ id: c.id, label: `${c.name} · ${c.phone} · ${c.occupation}` }))}
                value=""
                onChange={(v) => {
                  const id = v && v.target ? v.target.value : v;
                  if (id) setContacts((cs) => (cs.includes(id) || cs.length >= MAX_ALARM_CONTACTS ? cs : [...cs, id]));
                }}
                onCreate={(name) => {
                  const id = `new-${Date.now()}`;
                  setDirectory((d) => [...d, { id, name, phone: '+254 7— — —', occupation: 'New contact' }]);
                  setContacts((cs) => (cs.length >= MAX_ALARM_CONTACTS ? cs : [...cs, id]));
                }}
                createLabel="Add new contact"
              />
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {contacts.map((id) => {
                const c = directory.find((x) => x.id === id);
                return (
                  <Tag
                    key={id}
                    label={c ? `${c.name} · ${c.phone}` : id}
                    removable
                    onRemove={() => setContacts((cs) => cs.filter((x) => x !== id))}
                  />
                );
              })}
            </div>
            {contacts.length === 0 && (
              <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
                At least one alarm contact is needed before the cold room can alert anyone.
              </p>
            )}
          </FormSection>
        </StepFrame>
      )}

      {step === 'details' && (
        <StepFrame
          stepper={stepper}
          title="Equipment details"
          subtitle="The cold-room record itself. Type is Walk-in Cold Room from the managed lab list — cold rooms are not in PQS, and there is no compartment question."
          footerLeft={<Btn variant="secondary" onClick={() => go('facility')}>Back</Btn>}
          footerRight={(
            <Btn
              variant="primary"
              onClick={() => {
                const next = {};
                if (!equipment.assetTag.trim()) next.assetTag = 'Enter the asset tag — it is how this record is found.';
                setErrors(next);
                if (!Object.keys(next).length) go('device');
              }}
            >
              Next
            </Btn>
          )}
        >
          <FormSection title="Identification" required>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <TextInput label="Type" value="Walk-in Cold Room" readOnly
                helpText="Set when this record was cataloged. Fridge-vs-freezer never comes up — the type carries the thresholds." />
              <TextInput label="Name" value={equipment.name}
                onChange={(e) => setEquipment((q) => ({ ...q, name: e.target.value }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <TextInput label="Make" value={equipment.make}
                onChange={(e) => setEquipment((q) => ({ ...q, make: e.target.value }))} />
              <TextInput label="Model" value={equipment.model}
                onChange={(e) => setEquipment((q) => ({ ...q, model: e.target.value }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <TextInput label="Asset tag" required value={equipment.assetTag} error={errors.assetTag}
                onChange={(e) => { setEquipment((q) => ({ ...q, assetTag: e.target.value })); setErrors({}); }} />
              <TextInput label="Serial number" placeholder="Optional" value={equipment.serial}
                onChange={(e) => setEquipment((q) => ({ ...q, serial: e.target.value }))} />
            </div>
          </FormSection>
          <FormSection title="Placement & condition">
            <TextInput label="Location / room" value={equipment.location}
              onChange={(e) => setEquipment((q) => ({ ...q, location: e.target.value }))} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
              <SelectInput
                label="Condition"
                options={CONDITIONS.map((c) => ({ id: c, label: c }))}
                value={equipment.condition}
                onChange={(e) => setEquipment((q) => ({ ...q, condition: e.target.value }))}
              />
              <DateField label="Installation date" placeholder="Optional" value={equipment.acquired}
                onChange={(d) => setEquipment((q) => ({ ...q, acquired: d }))} />
            </div>
          </FormSection>
        </StepFrame>
      )}

      {step === 'device' && (
        <StepFrame
          stepper={stepper}
          title="Base station & sensors"
          subtitle="Monitoring comes last: the equipment is the primary, the device is secondary. All sensors attach to this ONE cold-room record."
          footerLeft={<Btn variant="secondary" onClick={() => go('details')}>Back</Btn>}
          footerRight={(
            <Btn variant="primary" disabled={!deviceId || sensors.length === 0} onClick={() => go('review')}>
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
          <FormSection title={`Sensors on this record · ${sensors.length} assigned`} required>
            <SearchSelectMulti
              label="Assign sensors"
              required
              placeholder={device
                ? (device.kind === 'CTX' ? 'Pick pre-fed CTX sensor serials…' : 'Pick from the CT5’s four sensors (A–D)…')
                : 'Choose a base station first'}
              options={sensorOptions}
              value={sensors}
              onChange={setSensors}
              disabled={!deviceId}
            />
            <Banner tone="info" title="One record, many sensors" inCard>
              A walk-in cold room needs 3–4 sensors, and every reading lands on this one
              record — it stays one piece of equipment in every count. Sensor IDs are picked
              from the system, never typed{device?.kind === 'CT5' ? '; Sensor D is ambient and may sit outside the cold room' : ''}.
            </Banner>
            <Banner tone="info" inCard hideIcon>
              <b>No thresholds to enter.</b> Alarms follow the Walk-in Cold Room configuration
              (2–8 °C, WHO-derived), managed by administrators. The NPHL region can override
              durations later if the lab lead confirms reagents need it.
            </Banner>
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
            <Banner tone="warning" title="You're offline — submission is paused">
              Everything entered here is kept on this device. Submit becomes available as soon
              as the connection returns; nothing needs re-entering.
            </Banner>
          )}
          {submitState === 'failed' && (
            <Banner tone="critical" title="Submission failed — nothing was created"
              actions={[{ label: 'Try again', onClick: submit }]}>
              The server rejected the request. Your entries are unchanged — retry, or come
              back later; the record is not partially saved.
            </Banner>
          )}
          <ReviewSection title="Facility & Contacts" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('facility')}>
            <ReviewRows rows={[
              ['Facility', facilityLabel(facilityId)],
              ['Region', 'National Public Health Lab (derived from facility)'],
              ['Alarm contacts', `${contacts.length} of ${MAX_ALARM_CONTACTS} — ${contacts.map((id) => directory.find((c) => c.id === id)?.name || id).join(', ')}`],
            ]} />
          </ReviewSection>
          <ReviewSection title="Equipment" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('details')}>
            <ReviewRows rows={[
              ['Type', 'Walk-in Cold Room'],
              ['Name', equipment.name],
              ['Make / Model', `${equipment.make} ${equipment.model}`],
              ['Asset tag', equipment.assetTag],
              equipment.serial ? ['Serial number', equipment.serial] : null,
              ['Location', equipment.location],
              ['Condition', equipment.condition],
            ]} />
          </ReviewSection>
          <ReviewSection title="Monitoring" status={<Badge tone="success" size="small">Complete</Badge>} onEdit={() => go('device')}>
            <ReviewRows rows={[
              ['Base station', device ? `${device.model} · IMEI ${device.imei}` : '—'],
              ['Sensors on this record', sensors.length ? sensors.join(' · ') : '—'],
              ['Thresholds', 'Walk-in Cold Room configuration (2–8 °C) — admin-managed, not set here'],
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
                title: 'What was set up',
                rows: [
                  ['Equipment', `${equipment.name} · ${equipment.assetTag}`],
                  ['Facility', facilityLabel(facilityId)],
                  ['Base station', device ? `${device.model} · IMEI ${device.imei}` : 'ColdTrace 5'],
                  ['Sensors', `${sensors.length || 4} on this one record`],
                  ['Alarms', `2–8 °C (Walk-in Cold Room configuration) → ${contacts.length} contact${contacts.length === 1 ? '' : 's'}`],
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
          The cold-room record stays cataloged in the register — only this monitoring setup
          (base station, sensors, contacts added here) is discarded.
        </p>
      </Modal>
    </LabShell>
  );
}
