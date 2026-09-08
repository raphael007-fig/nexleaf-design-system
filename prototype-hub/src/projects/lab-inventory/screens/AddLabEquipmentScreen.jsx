// ── Add / edit lab equipment — single (Phase 1, §5.2) ─────────────────────────
// Rides the Add-Equipment WIZARD FRAME (StepFrame — full-width fixed-height
// card, pinned footer), matching Prototype C's Add Equipment surface (Raf,
// 2026-09-03: "should have the add equipment frame, and be full width").
// No stepper: this is a single-step register capture, not the monitored
// install. No PQS make/model dependency, no thresholds, no sensor. Facility
// drives region (never asked). Asset tag — the lab's own ID — is the primary
// identifier; serial is optional.
//
// §5.2 success behaviour: save → return to the register with a success Toast
// and the new row highlighted; when the Type is monitorable the Toast carries
// the "Set up monitoring" action. There is no interstitial confirmation panel.
import { useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { TEXT_SUBDUED, TEXT_DEFAULT } from '@ds/tokens/index.js';
// The generic addition-flow wizard system (layer 1 of the Add Equipment flow).
import { StepFrame, FormSection, ReviewRows, QrPreview } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
// Step 2 is shared with the cold-room monitoring install flow.
import {
  WarrantyMaintenanceFields, warrantyMaintenanceRows, maintenanceStatus,
  EMPTY_WARRANTY_MAINTENANCE,
} from './WarrantyMaintenance.jsx';
import { LabShell } from './LabShell.jsx';

// Ported verbatim from the 3rd-party installation flow so a lab record and a
// cold-chain record answer these questions identically (Raf, 2026-09-07).
// Deployment status — from the live ColdTrace equipment page (Raf, 2026-09-07).
// This is the LIFECYCLE answer (is it in service, and for how long), which is a
// different question from Condition (is it working).
// Warranty + service cover (step 2). Warranty years is the 3rd-party flow's
// list; the rest is what a lab actually needs to answer "is this repair
// already paid for?" before raising one.


// Same 3-phase shape as the 3rd-party add-equipment flow (Raf, 2026-09-07), so
// adding a lab record and adding a cold-chain record feel like one product:
// facility first (it sets the region), then the equipment, then a review.
const STEP_IDS = ['facility', 'details', 'review'];
const PHASES = [
  { label: 'Facility & Equipment', steps: ['facility'] },
  { label: 'Warranty & Maintenance', steps: ['details'] },
  { label: 'Review & Submit', steps: ['review'] },
];

// Same 20px muted glyph the add-equipment flow puts on its QR section.
const IcoQr = ({ size = 20, color = '#616161' }) => <PolarisIconImg name="ShopcodesIcon" size={size} color={color} />;
const IcoCamera = () => <PolarisIconImg name="CameraIcon" size={16} color="#ffffff" />;
import {
  LAB_FACILITIES, LAB_TYPES, CONDITIONS, PERSONAS, LAB_EQUIPMENT,
  LAB_MODELS, makeOptions, modelOptions,
  isMonitorableNow, isMonitorableLater,
  DEPLOYMENT_STATUS,
} from './labData.js';

/**
 * @param {'lead'|'tech'} persona
 * @param {'default'|'errors'|'dup'} state  'errors' pre-fills the validation
 *   failure; 'dup' pre-fills a duplicate asset tag (unique-within-region).
 * @param {'add'|'edit'} mode  'edit' prefills from `record` and saves changes
 *   instead of creating — same form, one source of field truth.
 * @param {object} [record]   The LAB_EQUIPMENT row being edited (edit mode).
 * @param {(record)=>void} [onSaved]  Return to the register — record carries
 *   `monitorable` (and `edited` in edit mode) so the register arms the Toast.
 */
export function AddLabEquipmentScreen({
  persona = 'tech', state = 'default', mode = 'add', record = null,
  initialStep = null, initialData = null,
  onSaved, onCancel, onCrumb,
}) {
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[1];
  const scopedFacilities = LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id));
  const isEdit = mode === 'edit' && record;

  const [form, setForm] = useState(() => (isEdit
    ? {
      facilityId: record.facilityId, type: record.type, name: record.name || '',
      make: record.make || '', model: record.model || '', assetTag: record.assetTag || '',
      serial: record.serial || '', location: record.location || '',
      condition: record.condition || '', acquired: record.acquired || null, notes: record.notes || '',
    }
    : state === 'errors'
      ? { facilityId: '', type: '', name: 'Reagent refrigerator', make: '', model: '', assetTag: '', serial: '', location: '', condition: '', acquired: null, notes: '' }
      : state === 'dup'
        ? { facilityId: 'nhrl', type: 'ultra-cold', name: 'Ultra-low freezer −86 °C', make: 'Eppendorf New Brunswick', model: 'Innova U535', assetTag: 'NHRL/EQP/022', serial: '', location: 'Molecular lab, Room 12', condition: 'Functional', acquired: null, notes: '' }
        : {
          facilityId: scopedFacilities.length === 1 ? scopedFacilities[0].id : '',
          type: '', name: '', make: '', model: '', assetTag: '', serial: '',
          location: '', condition: '', acquired: null, notes: '',
          // A deep link that opens on step 2 or 3 must arrive with step 1
          // answered — otherwise the state illustrates a screen no user can
          // reach by walking the form: a review with every row an em-dash
          // (Raf, 2026-09-08). Same mechanism the monitored flow already uses
          // via FLOW_READY, so both register forms seed their steps alike.
          ...((initialData && initialData.form) || {}),
        }));
  // QR is OPTIONAL here (Raf, 2026-09-07). The 3rd-party add-equipment flow
  // REQUIRES a code because a monitored CCE is found by scanning it; a lab
  // register is walked with a clipboard, and most lab kit has no label at all —
  // so the section is offered, not enforced. Whether lab assets get QR codes at
  // all is still an open question on PD-41.
  // Installation + warranty (ported from the 3rd-party flow). Status is
  // required there because a monitored device must be installed to report; here
  // it records whether the lab is actually using the equipment yet.
  // Step 2 — warranty and service cover. All optional: a record is valid
  // without it, and most lab kit outlives whatever cover it came with.
  // Warranty, maintenance and the service contract live in one object because
  // the cold-room monitoring flow drives the same shared fields with it.
  const [wm, setWm] = useState(() => ({ ...EMPTY_WARRANTY_MAINTENANCE, ...((initialData && initialData.wm) || {}) }));
  // Back and Cancel confirm before discarding, the same as the monitoring
  // install flow (Raf, 2026-09-07) — a half-filled register record is work.
  const [cancelOpen, setCancelOpen] = useState(false);
  const [deployment, setDeployment] = useState(() => (mode === 'edit' && record ? (record.deployment || '') : ((initialData && initialData.deployment) || '')));
  // Types typed in via "+ Add" this session — the same escape hatch the
  // 3rd-party flow gives its device dropdowns, so an unlisted instrument never
  // blocks the record. A typed type is never monitorable: nothing has been
  // configured for it, so it has no thresholds to inherit.
  const [customTypes, setCustomTypes] = useState([]);
  const [customMakes, setCustomMakes] = useState([]);
  const [customModels, setCustomModels] = useState([]);
  const [customProviders, setCustomProviders] = useState([]);
  // Filled when the user picks "Other" from the list rather than typing a type.
  const [otherType, setOtherType] = useState(() => (mode === 'edit' && record ? (record.otherType || '') : ''));
  const [qrCode, setQrCode] = useState(() => (mode === 'edit' && record ? (record.qrCode || '') : ((initialData && initialData.qrCode) || '')));
  // Same QR state shape as the 3rd-party flow: a view flag, an assign panel
  // ({scanning, scanned}) and the label sequence the simulated scanner issues.
  const [qrViewOpen, setQrViewOpen] = useState(false);
  const [assignQr, setAssignQr] = useState(null);
  const [nextQrSeq, setNextQrSeq] = useState(70071);
  // Validation states open on the step that owns them.
  // Validation states open on the step that OWNS the fields — step 1 since the
  // 3-step refactor (was 'details', which is now Warranty & Maintenance).
  const [step, setStep] = useState(() => initialStep || 'facility');
  // Everything up to the opening step counts as visited, so the stepper can
  // navigate back to it (Raf, 2026-09-07 — steps are for navigation).
  const [visited, setVisited] = useState(() => new Set(
    STEP_IDS.slice(0, Math.max(0, STEP_IDS.indexOf(initialStep || 'facility')) + 1),
  ));
  const go = (next) => { setStep(next); setVisited((v) => new Set([...v, next])); };
  // The seeded validation state must be the SAME messages recordErrors() would
  // produce, on the SAME fields that are actually required — asset tag stopped
  // being one, and "condition" became "status".
  const [errors, setErrors] = useState(() => (state === 'errors'
    ? {
      facilityId: 'Choose the facility that owns this equipment.',
      type: 'Choose an equipment type from the list.',
      make: 'Choose or type the manufacturer.',
      condition: 'Choose the equipment’s status.',
      acquired: 'Enter the purchase date.',
    }
    : state === 'dup'
      ? { assetTag: 'This asset tag already exists in the National Public Health Lab. Open the existing record instead of creating a duplicate.' }
      : {}));

  const set = (key) => (v) => {
    const value = v && v.target ? v.target.value : v;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  // Unique-within-region check — in edit mode the record's own tag is not a
  // duplicate of itself.
  const dupTag = form.assetTag.trim()
    && LAB_EQUIPMENT.some((r) => r.assetTag.toLowerCase() === form.assetTag.trim().toLowerCase()
      && (!isEdit || r.id !== record.id));

  const activePhaseIndex = PHASES.findIndex((ph) => ph.steps.includes(step));
  // Per-phase booleans, not indices — the Stepper reads navigable[i].
  const navigable = PHASES.map((ph) => ph.steps.some((x) => visited.has(x)));
  const stepper = {
    phases: PHASES,
    activeIndex: activePhaseIndex,
    navigable,
    onSelect: (i) => go(PHASES[i].steps[0]),
  };

  // ONE validator for the record, used by step 1 and by submit — two copies had
  // already started to drift (submit was not checking type or make).
  function recordErrors() {
    const next = {};
    if (!form.facilityId) next.facilityId = 'Choose the facility that owns this equipment.';
    if (!form.type) next.type = 'Choose an equipment type from the list.';
    if (form.type === 'other' && !otherType.trim()) next.otherType = 'Enter what type of equipment this is — “Other” on its own is not a record.';
    if (!form.make.trim()) next.make = 'Choose or type the manufacturer.';
    // Asset tag and Model are OPTIONAL (Raf, 2026-09-07) — but a tag that IS
    // entered must still be unique within the region.
    if (form.assetTag.trim() && dupTag) next.assetTag = 'This asset tag already exists in the National Public Health Lab. Open the existing record instead of creating a duplicate.';
    if (!form.condition) next.condition = 'Choose the equipment’s status.';
    if (!form.acquired) next.acquired = 'Enter the purchase date.';
    return next;
  }

  // Live validity for the footer: Next stays disabled until the record's
  // required fields are answered (Raf, 2026-09-07), so the button never invites
  // a click that only produces errors.
  const recordComplete = Object.keys(recordErrors()).length === 0;

  // Step 1 holds the whole record, so it is the gate. Step 2 (warranty and
  // service cover) carries nothing mandatory.
  function nextFromFacility() {
    const next = recordErrors();
    setErrors(next);
    if (Object.keys(next).length) return;
    go('details');
  }
  function nextFromDetails() { go('review'); }

  function save() {
    const next = recordErrors();
    setErrors(next);
    // A record can only be incomplete here if the user jumped back via the
    // stepper — send them to the step that owns the fields.
    if (Object.keys(next).length) { go('facility'); return; }
    // §5.2: toast + return to list with the row highlighted (the register owns
    // both); monitorable types get the Set-up-monitoring action in the toast.
    onSaved?.({ ...form, ...wm, maintStatus: maintenanceStatus(wm.schedule, wm.lastService).label, otherType: form.type === 'other' ? otherType.trim() : '', deployment, qrCode, id: isEdit ? record.id : undefined, edited: isEdit, monitorable: isMonitorableNow(form.type) });
  }

  const monitorableNow = isMonitorableNow(form.type);
  const monitorableLater = isMonitorableLater(form.type);

  return (
    <LabShell
      level="secondary"
      trail={[{ id: 'add', label: isEdit ? `Edit ${record.assetTag}` : 'Add Lab Equipment' }]}
      onCrumb={onCrumb}
    >
      <Page
        flushTop
        title={isEdit ? 'Edit Lab Equipment' : 'Add Lab Equipment'}
        subtitle={isEdit
          ? `${record.name} · ${record.assetTag}. Changes apply to the register record — monitoring is managed separately.`
          : 'Register a piece of lab equipment in the NPHL inventory. This adds the equipment to the register — monitoring, where supported, is set up afterwards.'}
        backAction={{ onClick: () => setCancelOpen(true), ariaLabel: 'Back to Lab Equipment' }}
      />

      {step === 'facility' && (
        <StepFrame
          stepper={stepper}
          title="Facility & equipment"
          subtitle="The facility (which sets the region) and the equipment itself. Most fields mirror the lab’s paper register."
          footerLeft={<Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>}
          footerRight={<Btn variant="primary" disabled={!recordComplete} onClick={nextFromFacility}>Next</Btn>}
        >
        <SearchSelect
          label="Facility"
          required
          placeholder="Search facilities…"
          options={scopedFacilities}
          value={form.facilityId}
          onChange={set('facilityId')}
          error={errors.facilityId}
        />
        <p style={{ margin: '-8px 0 0', fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
          Region is derived from the facility — it is never asked separately.
        </p>
        {/* No section heading — the field carries its own label (Raf,
            2026-09-07). FormSection always draws a header rule, so this
            group is a plain stack. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SearchSelect
            label="Equipment type"
            required
            placeholder="Choose or type an equipment type"
            options={[
              ...LAB_TYPES.map((t) => ({ id: t.id, label: t.label })),
              ...customTypes.map((t) => ({ id: t, label: t })),
            ]}
            value={form.type}
            onChange={set('type')}
            onCreate={(text) => {
              setCustomTypes((c) => (c.includes(text) ? c : [...c, text]));
              setForm((f) => ({ ...f, type: text }));
              setErrors((e) => (e.type ? { ...e, type: undefined } : e));
            }}
            createLabel="Add equipment type"
            error={errors.type}
            helpText="From the managed lab-type list — the type also decides whether the equipment can be monitored. Type a new one if the lab owns something unlisted."
          />
          {form.type === 'other' && (
            <TextInput
              label="What type of equipment is it?"
              required
              placeholder="The lab’s own word for this equipment, e.g. Cryostat"
              value={otherType}
              onChange={(e) => { setOtherType(e.target.value); setErrors((x) => (x.otherType ? { ...x, otherType: undefined } : x)); }}
              error={errors.otherType}
              helpText="Recorded as typed. Ask an administrator to add it to the managed list if the lab owns several."
            />
          )}
          {monitorableNow && (
            <Banner tone="info" inCard hideIcon>
              <b>Walk-in Cold Room supports monitoring.</b> Finish this register record first —
              you’ll be offered the monitoring setup right after saving.
            </Banner>
          )}
          {monitorableLater && (
            <Banner tone="info" inCard hideIcon>
              <b>Fridge/freezer monitoring is coming later.</b> This record stays in the register for
              now and can be connected without re-registering when it lands.
            </Banner>
          )}
        </div>


        <FormSection title="Identification" required>
          <TextInput
            label="Name"
            placeholder="e.g. Refrigerated centrifuge"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            helpText="Optional — what staff call it. With no name and no asset tag, the record is found by type and location alone."
          />
          {/* Make and model are PICKED, not typed (Raf, 2026-09-07). Labs re-buy
              from the same manufacturers, so free text produced spelling drift
              in the paper registers. Both stay creatable — a lab will always
              own something the seeded list has never seen — and choosing a make
              narrows the model list to that make's kit. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <SearchSelect
              label="Make"
              required
              error={errors.make}
              placeholder="Choose or type a manufacturer"
              options={[...makeOptions(), ...customMakes.map((m) => ({ id: m, label: m }))]}
              value={form.make}
              onChange={(v) => {
                const make = v && v.target ? v.target.value : v;
                // A new make invalidates a model that belonged to the old one.
                setForm((f) => ({
                  ...f,
                  make,
                  model: (LAB_MODELS[make] || []).includes(f.model) ? f.model : '',
                }));
              }}
              onCreate={(name) => {
                setCustomMakes((c) => (c.includes(name) ? c : [...c, name]));
                setForm((f) => ({ ...f, make: name, model: '' }));
                setErrors((e) => (e.make ? { ...e, make: undefined } : e));
              }}
              createLabel="Add new manufacturer"
              helpText="From the managed manufacturer list — add one if it is genuinely new."
            />
            <SearchSelect
              label="Model"
              error={errors.model}
              placeholder={form.make ? `Choose or type a ${form.make} model` : 'Choose or type a model'}
              options={[...modelOptions(form.make), ...customModels.map((m) => ({ id: m, label: m }))]}
              value={form.model}
              onChange={set('model')}
              onCreate={(name) => {
                setCustomModels((c) => (c.includes(name) ? c : [...c, name]));
                setForm((f) => ({ ...f, model: name }));
              }}
              createLabel="Add new model"
              helpText={form.make ? `Models NPHL already holds for ${form.make}.` : 'Pick the make first to narrow this list.'}
            />
          </div>
        {/* Serial number, then Asset tag beneath it (Raf, 2026-09-07). */}
          <TextInput
            label="Serial number"
            placeholder="Optional"
            value={form.serial}
            onChange={set('serial')}
            helpText="Often missing or duplicated on lab equipment — leave blank if unreadable."
          />
          <TextInput
            label="Asset tag"
            placeholder="Optional — the lab’s own ID, e.g. NHRL/EQP/101"
            value={form.assetTag}
            onChange={set('assetTag')}
            error={errors.assetTag}
            helpText="Optional. Where a lab tags its kit, enter it exactly as labelled — it must still be unique in the region."
          />
        </FormSection>

        <FormSection title="Placement & status">
          <TextInput
            label="Location / room"
            placeholder="e.g. Molecular lab, Room 12"
            value={form.location}
            onChange={set('location')}
          />
        {/* Condition, then Deployment status directly beneath it (Raf,
            2026-09-07) — stacked, not side by side. */}
          <SelectInput
            label="Equipment status"
            required
            placeholder="Choose a condition"
            options={CONDITIONS.map((c) => ({ id: c, label: c }))}
            value={form.condition}
            onChange={set('condition')}
            error={errors.condition}
            helpText="Whether the equipment works. Age (“old”, “new”) is not a status — use Notes."
          />
          {/* Deployment status sits beside Condition (Raf, 2026-09-07): the two
              together say whether the equipment works AND whether it is in
              service. */}
          <SelectInput
            label="Deployment status"
            options={DEPLOYMENT_STATUS.map((d) => ({ id: d, label: d }))}
            placeholder="Select…"
            value={deployment}
            onChange={(e) => setDeployment(e.target ? e.target.value : e)}
            helpText="Whether the equipment is in service. Equipment status says if it works; this says if it is being used."
          />
          {/* Purchase date shows for every deployment status — it is a fact about
              the record, not about being installed (Raf, 2026-09-07). */}
          <div>
            <DateField
              label="Purchase date"
              required
              value={form.acquired}
              onChange={set('acquired')}
              error={errors.acquired}
              helpText="When the lab bought it — separate from when it was installed."
            />
          </div>
        </FormSection>




        {/* QR Code — the same section as the 3rd-party add-equipment flow, but
            optional: a code links a physical label to this record so a phone
            scan opens it. */}
        <FormSection icon={<IcoQr />} title="QR Code">
          {qrCode ? (
            <>
              <Banner tone="info" inCard hideIcon>
                <span style={{ display: 'block', fontWeight: 650 }}>{qrCode} will be linked to this record</span>
                Scanning this label on the equipment opens this register record. Optional —
                the record saves with or without it.
              </Banner>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Btn variant="secondary" onClick={() => setQrViewOpen(true)}>Check QR Code</Btn>
                <Btn variant="secondary" onClick={() => setAssignQr({ scanning: false, scanned: null })}>Reassign QR Code</Btn>
                <Btn variant="tertiary" onClick={() => setQrCode('')}>Remove</Btn>
              </div>
            </>
          ) : (
            <>
              <Banner tone="info" inCard hideIcon>
                <span style={{ display: 'block', fontWeight: 650 }}>No QR code assigned — optional</span>
                Assign one only where the lab actually labels its equipment. Most lab kit
                is found by asset tag or name, so this can stay empty.
              </Banner>
              <div style={{ display: 'flex' }}>
                <Btn variant="secondary" onClick={() => setAssignQr({ scanning: false, scanned: null })}>Assign QR Code</Btn>
              </div>
            </>
          )}
        </FormSection>

        {/* Notes is the last thing on the form (Raf, 2026-09-07) — a free-text
            catch-all belongs after every structured field has been answered. */}
        <FormSection title="Notes">
          <TextareaInput
            placeholder="Anything the register should keep — provenance, validation status, shared use…"
            value={form.notes}
            onChange={set('notes')}
          />
        </FormSection>

        </StepFrame>
      )}

      {step === 'details' && (
        <StepFrame
          stepper={stepper}
          title="Warranty & Maintenance"
          subtitle="The cover and service history behind this equipment, so a fault can be checked against them before a repair is raised. All optional."
          footerLeft={<Btn variant="secondary" onClick={() => go('facility')}>Back</Btn>}
          footerRight={<Btn variant="primary" onClick={nextFromDetails}>Next</Btn>}
        >
          <WarrantyMaintenanceFields
            value={wm}
            onChange={(patch) => setWm((w) => ({ ...w, ...patch }))}
            providers={customProviders}
            onProviderCreate={(name) => setCustomProviders((c) => (c.includes(name) ? c : [...c, name]))}
          />
        </StepFrame>
      )}

      {step === 'review' && (
        <StepFrame
          stepper={stepper}
          title="Review & submit"
          subtitle="Check the record before it joins the register. Nothing is created until you submit."
          footerLeft={<Btn variant="secondary" onClick={() => go('details')}>Back</Btn>}
          footerRight={<Btn variant="primary" disabled={!recordComplete} onClick={save}>{isEdit ? 'Save changes' : 'Add equipment'}</Btn>}
        >
          <FormSection title="Ownership">
            <ReviewRows rows={[
              ['Facility', scopedFacilities.find((f) => f.id === form.facilityId)?.label || '—'],
              ['Region', 'National Public Health Lab — set by the facility'],
            ]} />
          </FormSection>
          <FormSection title="Equipment">
            <ReviewRows rows={[
              ['Equipment type', form.type === 'other' ? `${otherType || '—'} (other)` : (LAB_TYPES.find((t) => t.id === form.type)?.label || form.type || '—')],
              ['Name', form.name || '—'],
              ['Make / model', [form.make, form.model].filter(Boolean).join(' ') || '—'],
              ['Asset tag', form.assetTag || '— (none)'],
              ['Serial number', form.serial || '— (none)'],
            ]} />
          </FormSection>
          <FormSection title="Placement & status">
            <ReviewRows rows={[
              ['Location / room', form.location || '—'],
              ['Equipment status', form.condition || '—'],
              ['Deployment status', deployment || '—'],
              ['Purchase date', form.acquired ? new Date(form.acquired).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'],
              ['QR code', qrCode || '— (none)'],
            ]} />
          </FormSection>
          <FormSection title="Maintenance">
            <ReviewRows rows={warrantyMaintenanceRows(wm).maintenance} />
          </FormSection>
          <FormSection title="Warranty & service">
            <ReviewRows rows={warrantyMaintenanceRows(wm).warranty} />
          </FormSection>
          {isMonitorableNow(form.type) && (
            <Banner tone="info" inCard hideIcon>
              <span style={{ display: 'block', fontWeight: 650 }}>Monitoring comes next</span>
              This type supports monitoring. Submitting creates the register record —
              you will be offered the monitoring setup straight after.
            </Banner>
          )}
        </StepFrame>
      )}

      {/* Check QR Code — view the assigned label (structure from the 3rd-party
          add-equipment flow, including its QR preview). */}
      <Modal
        open={qrViewOpen}
        onClose={() => setQrViewOpen(false)}
        title="QR Code"
        size="small"
        footer={<Btn variant="secondary" small onClick={() => setQrViewOpen(false)}>Close</Btn>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '12px 0', textAlign: 'center' }}>
          <div style={{ border: '1px solid #e3e3e3', borderRadius: 12, padding: 16 }}>
            <QrPreview code={qrCode || 'QR'} size={192} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>{qrCode}</span>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
            This label will identify the equipment. Scanning it opens the register record.
          </p>
        </div>
      </Modal>

      {/* Assign QR Code — the flow's scan panel: the code comes from a scan, it
          is never typed. */}
      <Modal
        open={assignQr != null}
        onClose={() => setAssignQr(null)}
        title="Assign QR Code"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Btn variant="secondary" small onClick={() => setAssignQr(null)}>Cancel</Btn>
            <Btn
              variant="primary"
              small
              disabled={!assignQr?.scanned}
              onClick={() => { setQrCode(assignQr.scanned); setAssignQr(null); }}
            >
              Assign QR Code
            </Btn>
          </div>
        )}
      >
        {assignQr != null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              border: '1px solid #e3e3e3', borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              padding: '40px 24px',
            }}>
              <IcoQr size={44} color={TEXT_SUBDUED} />
              <span style={{ fontSize: 16, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT }}>
                Scan QR Code
              </span>
              <Btn
                variant="primary"
                icon={<IcoCamera />}
                loading={assignQr.scanning}
                disabled={assignQr.scanning}
                onClick={() => {
                  setAssignQr((a) => ({ ...a, scanning: true }));
                  const code = `QR-${nextQrSeq}`;
                  setNextQrSeq((n) => n + 1);
                  setTimeout(() => setAssignQr((a) => (a ? { scanning: false, scanned: code } : a)), 1200);
                }}
              >
                {assignQr.scanning ? 'Scanning…' : assignQr.scanned ? 'Scan Again' : 'Start Scanning'}
              </Btn>
            </div>
            {assignQr.scanned && (
              <Banner tone="success" inCard>
                QR Code scanned successfully! ({assignQr.scanned})
              </Banner>
            )}
          </div>
        )}
      </Modal>
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title={isEdit ? 'Discard these changes?' : 'Discard this record?'}
        size="small"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, width: '100%' }}>
            <Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep editing</Btn>
            <Btn variant="primary" tone="critical" onClick={() => { setCancelOpen(false); onCancel?.(); }}>
              {isEdit ? 'Discard changes' : 'Discard record'}
            </Btn>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          {isEdit
            ? 'The record stays as it was — only the edits made here are discarded.'
            : 'Nothing has been added to the register yet. Everything entered on these steps is discarded.'}
        </p>
      </Modal>
    </LabShell>
  );
}
