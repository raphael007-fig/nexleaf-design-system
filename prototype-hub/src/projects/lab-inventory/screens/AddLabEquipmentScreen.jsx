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
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
// The generic addition-flow wizard system (layer 1 of the Add Equipment flow).
import { StepFrame, FormSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import { LabShell } from './LabShell.jsx';

// Same 20px muted glyph the add-equipment flow puts on its QR section.
const IcoQr = () => <PolarisIconImg name="ShopcodesIcon" size={20} color="#616161" />;
import {
  LAB_FACILITIES, LAB_TYPES, CONDITIONS, PERSONAS, LAB_EQUIPMENT,
  LAB_MODELS, makeOptions, modelOptions,
  isMonitorableNow, isMonitorableLater,
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
        : { facilityId: scopedFacilities.length === 1 ? scopedFacilities[0].id : '', type: '', name: '', make: '', model: '', assetTag: '', serial: '', location: '', condition: '', acquired: null, notes: '' }));
  // QR is OPTIONAL here (Raf, 2026-09-07). The 3rd-party add-equipment flow
  // REQUIRES a code because a monitored CCE is found by scanning it; a lab
  // register is walked with a clipboard, and most lab kit has no label at all —
  // so the section is offered, not enforced. Whether lab assets get QR codes at
  // all is still an open question on PD-41.
  const [qrCode, setQrCode] = useState(() => (mode === 'edit' && record ? (record.qrCode || '') : ''));
  const [qrModal, setQrModal] = useState(null);   // null | 'assign' | 'view'
  const [errors, setErrors] = useState(() => (state === 'errors'
    ? {
      facilityId: 'Choose the facility that owns this equipment.',
      type: 'Choose an equipment type from the list.',
      assetTag: 'Enter the lab’s own asset tag — it is how this record is found.',
      condition: 'Choose the equipment’s condition.',
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

  function save() {
    const next = {};
    if (!form.facilityId) next.facilityId = 'Choose the facility that owns this equipment.';
    if (!form.type) next.type = 'Choose an equipment type from the list.';
    if (!form.name.trim()) next.name = 'Enter the equipment name — it is how staff recognise this record.';
    // Asset tag is OPTIONAL (Raf, 2026-09-07), but a tag that IS entered must
    // still be unique within the region.
    if (form.assetTag.trim() && dupTag) next.assetTag = 'This asset tag already exists in the National Public Health Lab. Open the existing record instead of creating a duplicate.';
    if (!form.condition) next.condition = 'Choose the equipment’s condition.';
    setErrors(next);
    if (Object.keys(next).length) return;
    // §5.2: toast + return to list with the row highlighted (the register owns
    // both); monitorable types get the Set-up-monitoring action in the toast.
    onSaved?.({ ...form, id: isEdit ? record.id : undefined, edited: isEdit, monitorable: isMonitorableNow(form.type) });
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
        backAction={{ onClick: onCancel, ariaLabel: 'Back to Lab Equipment' }}
      />

      <StepFrame
        title={isEdit ? 'Update the register record' : 'Register record'}
        subtitle="Most fields mirror the lab’s paper register. The name is required; the asset tag is optional but must be unique where a lab uses one."
        footerLeft={<Btn variant="secondary" onClick={onCancel}>Cancel</Btn>}
        footerRight={<Btn variant="primary" onClick={save}>{isEdit ? 'Save changes' : 'Add equipment'}</Btn>}
      >
        <FormSection title="Ownership" required>
          <SearchSelect
            label="Facility"
            required
            placeholder="Choose the owning facility"
            options={scopedFacilities}
            value={form.facilityId}
            onChange={set('facilityId')}
            error={errors.facilityId}
          />
          <p style={{ margin: '-8px 0 0', fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
            Region is derived from the facility — it is never asked separately.
          </p>
          <SelectInput
            label="Type"
            required
            placeholder="Choose an equipment type"
            options={LAB_TYPES.map((t) => ({ id: t.id, label: t.label }))}
            value={form.type}
            onChange={set('type')}
            error={errors.type}
            helpText="From the managed lab-type list — the type also decides whether the equipment can be monitored."
          />
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
        </FormSection>

        <FormSection title="Identification" required>
          <TextInput
            label="Name"
            required
            placeholder="e.g. Refrigerated centrifuge"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            helpText="What staff call it — this is how the equipment is recognised in the register."
          />
          {/* Make and model are PICKED, not typed (Raf, 2026-09-07). Labs re-buy
              from the same manufacturers, so free text produced spelling drift
              in the paper registers. Both stay creatable — a lab will always
              own something the seeded list has never seen — and choosing a make
              narrows the model list to that make's kit. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <SearchSelect
              label="Make"
              placeholder="Choose or type a manufacturer"
              options={makeOptions()}
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
              onCreate={(name) => setForm((f) => ({ ...f, make: name, model: '' }))}
              createLabel="Add new manufacturer"
              helpText="From the managed manufacturer list — add one if it is genuinely new."
            />
            <SearchSelect
              label="Model"
              placeholder={form.make ? `Choose or type a ${form.make} model` : 'Choose or type a model'}
              options={modelOptions(form.make)}
              value={form.model}
              onChange={set('model')}
              onCreate={(name) => setForm((f) => ({ ...f, model: name }))}
              createLabel="Add new model"
              helpText={form.make ? `Models NPHL already holds for ${form.make}.` : 'Pick the make first to narrow this list.'}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <TextInput
              label="Asset tag"
              placeholder="Optional — the lab’s own ID, e.g. NHRL/EQP/101"
              value={form.assetTag}
              onChange={set('assetTag')}
              error={errors.assetTag}
              helpText="Optional. Where a lab tags its kit, enter it exactly as labelled — it must still be unique in the region."
            />
            <TextInput
              label="Serial number"
              placeholder="Optional"
              value={form.serial}
              onChange={set('serial')}
              helpText="Often missing or duplicated on lab equipment — leave blank if unreadable."
            />
          </div>
        </FormSection>

        <FormSection title="Placement & condition">
          <TextInput
            label="Location / room"
            placeholder="e.g. Molecular lab, Room 12"
            value={form.location}
            onChange={set('location')}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <SelectInput
              label="Condition"
              required
              placeholder="Choose a condition"
              options={CONDITIONS.map((c) => ({ id: c, label: c }))}
              value={form.condition}
              onChange={set('condition')}
              error={errors.condition}
              helpText="The lab’s condition vocabulary. Age (“old”, “new”) is not a condition — use Notes."
            />
            <DateField
              label="Acquisition date"
              placeholder="Optional"
              value={form.acquired}
              onChange={set('acquired')}
            />
          </div>
          <TextareaInput
            label="Notes"
            placeholder="Anything the register should keep — provenance, validation status, shared use…"
            value={form.notes}
            onChange={set('notes')}
          />
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
                <Btn variant="secondary" onClick={() => setQrModal('view')}>Check QR Code</Btn>
                <Btn variant="secondary" onClick={() => setQrModal('assign')}>Reassign QR Code</Btn>
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
                <Btn variant="secondary" onClick={() => setQrModal('assign')}>Assign QR Code</Btn>
              </div>
            </>
          )}
        </FormSection>
      </StepFrame>

      {/* Assign / check — deliberately small: scanning happens on a phone, this
          just records which pre-printed code was stuck on the equipment. */}
      <Modal
        open={qrModal === 'assign'}
        onClose={() => setQrModal(null)}
        title="Assign a QR code"
        size="small"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Btn variant="secondary" onClick={() => setQrModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => { setQrCode(`QR-${70000 + Math.floor(Math.random() * 900)}`); setQrModal(null); }}>
              Assign next code
            </Btn>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Codes come from the pre-printed sheet the programme issues — they are never
          typed by hand. Assigning takes the next unused code and links it to this
          record when you save.
        </p>
      </Modal>
      <Modal
        open={qrModal === 'view'}
        onClose={() => setQrModal(null)}
        title={qrCode || 'QR code'}
        size="small"
        footer={<div style={{ display: 'flex', justifyContent: 'flex-end' }}><Btn variant="secondary" onClick={() => setQrModal(null)}>Close</Btn></div>}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          {qrCode} is reserved for this record. Print it from the label sheet and stick it
          where a phone can reach it — inside a cold-room door, or on the equipment body.
        </p>
      </Modal>
    </LabShell>
  );
}
