// ── Add lab equipment — single (Phase 1, §5.2) ─────────────────────────────────
// Deliberately SHORT: this is inventory capture, not the monitored install.
// No PQS make/model dependency, no thresholds, no sensor. Facility drives
// region (never asked). Asset tag — the lab's own ID — is the primary
// identifier; serial is optional. When the chosen Type is monitorable, saving
// offers "Set up monitoring" → the Phase-2 install flow.
import { useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Card, CardSectionTitle } from '@ds/components/Card/Card.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { Divider } from '@ds/components/Divider/Divider.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import {
  LAB_FACILITIES, LAB_TYPES, CONDITIONS, PERSONAS, LAB_EQUIPMENT,
  isMonitorableNow, isMonitorableLater, facilityLabel,
} from './labData.js';

const TRAIL = [{ id: 'add', label: 'Add Lab Equipment' }];

/**
 * @param {'lead'|'tech'} persona
 * @param {'default'|'errors'|'saved'} state  'errors' pre-fills the validation
 *   failure; 'saved' opens on the post-save panel with the monitoring CTA.
 * @param {(record)=>void} [onSaved]     Return to the register (highlighted row).
 * @param {()=>void} [onSetUpMonitoring] Route into the Phase-2 install flow.
 */
export function AddLabEquipmentScreen({
  persona = 'tech', state = 'default', onSaved, onSetUpMonitoring, onCancel, onCrumb,
}) {
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[1];
  const scopedFacilities = LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id));

  const [form, setForm] = useState(() => (state === 'errors'
    ? { facilityId: '', type: '', name: 'Reagent refrigerator', make: '', model: '', assetTag: '', serial: '', location: '', condition: '', acquired: null, notes: '' }
    : state === 'saved'
      ? { facilityId: 'ccs', type: 'walk-in-cold-room', name: 'Walk-in Cold Room (reagent store)', make: 'Foster Refrigerator', model: 'PROB1100H', assetTag: 'MOH/DLS/NPHL/CCS/WICR-002', serial: '', location: 'Central cold store, Block C', condition: 'Functional', acquired: null, notes: '' }
      : { facilityId: scopedFacilities.length === 1 ? scopedFacilities[0].id : '', type: '', name: '', make: '', model: '', assetTag: '', serial: '', location: '', condition: '', acquired: null, notes: '' }));
  const [errors, setErrors] = useState(() => (state === 'errors'
    ? {
      facilityId: 'Choose the facility that owns this equipment.',
      type: 'Choose an equipment type from the list.',
      assetTag: 'Enter the lab’s own asset tag — it is how this record is found.',
      condition: 'Choose the equipment’s condition.',
    }
    : {}));
  const [saved, setSaved] = useState(state === 'saved');

  const set = (key) => (v) => {
    const value = v && v.target ? v.target.value : v;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const dupTag = form.assetTag.trim()
    && LAB_EQUIPMENT.some((r) => r.assetTag.toLowerCase() === form.assetTag.trim().toLowerCase());

  function save() {
    const next = {};
    if (!form.facilityId) next.facilityId = 'Choose the facility that owns this equipment.';
    if (!form.type) next.type = 'Choose an equipment type from the list.';
    if (!form.assetTag.trim()) next.assetTag = 'Enter the lab’s own asset tag — it is how this record is found.';
    else if (dupTag) next.assetTag = 'This asset tag already exists in the National Public Health Lab. Open the existing record instead of creating a duplicate.';
    if (!form.condition) next.condition = 'Choose the equipment’s condition.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaved(true);
  }

  const monitorableNow = isMonitorableNow(form.type);
  const monitorableLater = isMonitorableLater(form.type);

  return (
    <LabShell level="secondary" trail={TRAIL} onCrumb={onCrumb}>
      <Page
        flushTop
        title="Add Lab Equipment"
        subtitle="Register a piece of lab equipment in the NPHL inventory. This creates a catalog record — monitoring, where supported, is set up afterwards."
        backAction={{ onClick: onCancel, ariaLabel: 'Back to Lab Equipment' }}
      />

      {saved ? (
        <Card style={{ maxWidth: 720 }}>
          <Banner tone="success" title={`${form.name || 'Equipment'} was added to the register`} inCard>
            Asset tag {form.assetTag} · {facilityLabel(form.facilityId)}. The record is
            cataloged{monitorableNow ? ' and its type supports monitoring' : ''}.
          </Banner>
          {monitorableNow && (
            <Banner tone="info" title="This type can be monitored now" inCard
              actions={[{ label: 'Set up monitoring', onClick: onSetUpMonitoring }]}>
              Walk-in cold rooms are monitored with a Nexleaf base station and multiple
              sensors on this one record. Thresholds follow the Walk-in Cold Room
              configuration (2–8 °C) — nothing to enter here.
            </Banner>
          )}
          {monitorableLater && (
            <Banner tone="info" title="Monitoring for fridges and freezers is coming later" inCard>
              This record stays cataloged for now; it can be connected without re-registering
              when fridge/freezer monitoring lands.
            </Banner>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn variant="primary" onClick={() => onSaved?.(form)}>Back to Lab Equipment</Btn>
            <Btn variant="secondary" onClick={() => { setSaved(false); setForm((f) => ({ ...f, name: '', assetTag: '', serial: '', notes: '' })); }}>
              Add another
            </Btn>
          </div>
        </Card>
      ) : (
        <Card style={{ maxWidth: 720 }}>
          <CardSectionTitle title="Ownership" />
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
              <b>Walk-in Cold Room supports monitoring.</b> Finish this catalog record first —
              you’ll be offered the monitoring setup right after saving.
            </Banner>
          )}

          <Divider />
          <CardSectionTitle title="Identification" />
          <TextInput
            label="Name"
            placeholder="e.g. Refrigerated centrifuge"
            value={form.name}
            onChange={set('name')}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <TextInput label="Make" placeholder="e.g. Eppendorf" value={form.make} onChange={set('make')} />
            <TextInput label="Model" placeholder="e.g. 5810 R" value={form.model} onChange={set('model')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            <TextInput
              label="Asset tag"
              required
              placeholder="The lab’s own ID, e.g. NHRL/EQP/101"
              value={form.assetTag}
              onChange={set('assetTag')}
              error={errors.assetTag}
              helpText="The primary identifier. Each lab keeps its own tag scheme — enter it exactly as labelled."
            />
            <TextInput
              label="Serial number"
              placeholder="Optional"
              value={form.serial}
              onChange={set('serial')}
              helpText="Often missing or duplicated on lab equipment — leave blank if unreadable."
            />
          </div>

          <Divider />
          <CardSectionTitle title="Placement & condition" />
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
              helpText="Same vocabulary as Passive Equipment. Age (“old”, “new”) is not a condition — use Notes."
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <Btn variant="secondary" onClick={onCancel}>Cancel</Btn>
            <Btn variant="primary" onClick={save}>Add equipment</Btn>
          </div>
        </Card>
      )}
    </LabShell>
  );
}
