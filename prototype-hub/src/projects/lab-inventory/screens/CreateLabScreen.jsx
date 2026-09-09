// ── Create Lab — mirrors Create Facility, with lab names and inventory ────────
// Ednah, 2026-09-09 (Lab Equipment Design, with Innocent): no create-lab form
// existed anywhere in the designs. Her ruling was that the lab form IS the
// facility form — "everything is the same where there's a facility put a
// slash lab" — with four substitutions:
//   • "Facility name" → "Lab name", "Facility code" → "Lab code"
//   • URL /facility → /facility/lab
//   • Section 3 "Vaccine Services & Cold Chain" is REMOVED and replaced by the
//     lab's inventory mapping — "they don't do vaccine, so we can remove this
//     and just link them to creating the inventory for that lab here"
//   • Sections 2 (Supply Chain & Logistics), 4 (Transport & Waste Management)
//     and 5 (Staff) are carried over. Transport & waste was KEPT deliberately:
//     "I think for consistency, we would rather do it instead of eliminating
//     it. And it's relevant."
//
// Region is asked DIRECTLY. A lab is itself a facility — "Kenya Lab (global
// group, never selectable) → NPHL = region → labs = facilities" (PRD §Scope and
// the ratified product context), so there is no host-hospital entity in V1 to
// derive a region from. Ednah's "most labs are hosted within a hospital" is a
// fact about the world, not a field. An earlier pass here invented a Host
// facility field; it contradicted the data model and was removed (2026-09-09).
//
// Field names stay as the facility form has them: "terminology neutralisation"
// is explicitly OUT OF SCOPE for V1 (PRD), so Vaccine Supply Point and Mode of
// Vaccine Supply keep their names, and the staff counts keep the platform's own
// Occupation vocabulary (Nurse / Vaccine Handler / Biomedical Engineer /
// Biomedical Technician) — there is no "Lab Technologist" in that taxonomy.
//
// Reuses the Add-Equipment wizard system (StepFrame / FormSection) exactly as
// ColdRoomFlow does, so the three flows cannot drift.
import { useState } from 'react';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { CardSectionTitle } from '@ds/components/Card/Card.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
import { StepFrame, FormSection, ReviewRows, ReviewSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import { LabShell } from './LabShell.jsx';
import {
  LAB_REGIONS, HOST_FACILITIES, regionLabel, hostFacilityLabel,
  ENERGY_SOURCES, ELECTRICITY_AVAILABILITY, SUPPLY_MODES, SUPPLY_LEVELS,
  LAB_FACILITY_TYPES, LAB_STATUSES,
} from './labData.js';

const TRAIL = [{ id: 'create-lab', label: 'Create Lab' }];

// The facility form's five sections, with section 3 swapped for inventory.
const PHASES = [
  { label: 'Identification & Location', steps: ['identification'] },
  { label: 'Supply Chain & Logistics', steps: ['supply'] },
  { label: 'Lab Inventory', steps: ['inventory'] },
  { label: 'Transport & Waste Management', steps: ['transport'] },
  { label: 'Lab Staff', steps: ['staff'] },
  { label: 'Review & Submit', steps: ['review'] },
];
const STEP_ORDER = ['identification', 'supply', 'inventory', 'transport', 'staff', 'review'];

const EMPTY = {
  regionId: '', name: '', code: '',
  latitude: '', longitude: '', labType: '', status: '', population: '',
  energy: '', electricity: '', supplyPoint: '', supplyInterval: '',
  safetyStock: '', supplyMode: '', supplyLevels: '',
  inventoryMethod: '', coldBoxLarge: '', coldBoxSmall: '',
  carrierLarge: '', carrierSmall: '',
  motos: '', pickups: '', refrigerated: '',
  wasteVehicles: '', incinerators: '', wasteNotes: '',
  labStaff: '', biomedStaff: '',
};

// A lab that sits inside a hospital — the common case Ednah described.
const HOSTED = {
  ...EMPTY,
  regionId: 'nairobi',
  name: 'Nairobi County Referral Lab',
  code: 'NRB/LAB/004',
  latitude: '-1.286389', longitude: '36.817223',
  labType: 'Facility', status: 'Public', population: '412000',
  energy: 'Grid Electricity', electricity: '>16h',
  supplyPoint: 'knh', supplyInterval: '3', safetyStock: '1', supplyMode: 'Pull',
  supplyLevels: 'Service Points (SP)',
};

// A regional lab under NPHL rather than a county one — same shape, different
// region. There is no "no facility" case: a lab is itself a facility.
const STANDALONE = {
  ...EMPTY,
  regionId: 'nphl',
  name: 'NPHL Regional Lab — Kisumu',
  code: 'NPHL/LAB/011',
  labType: 'Province', status: 'Public',
};

const opts = (list) => list.map((v) => ({ value: v, label: v }));
const months = (n) => (String(n) === '1' ? '1 month' : `${n} months`);

export function CreateLabScreen({
  state = 'identification', initialValues = null, seed = 'empty',
  simulate = null,
  onDone, onCancel, onCrumb,
}) {
  // 'errors' and 'success' are states of a step, not steps of their own — an
  // unrecognised value would otherwise fall through every branch to the last.
  const [step, setStep] = useState(
    state === 'success' ? 'review'
      : state === 'errors' ? 'identification'
        : STEP_ORDER.includes(state) ? state : 'identification',
  );
  const [phase, setPhase] = useState(state === 'success' ? 'success' : 'idle');
  // Saving a lab is a server write, so it gets the same three states the
  // cold-room install has: in-flight, failed-with-nothing-created, and a
  // destructive confirm before a part-filled form is thrown away.
  const [cancelOpen, setCancelOpen] = useState(simulate === 'cancel-confirm');
  const [submitState, setSubmitState] = useState(
    simulate === 'submitting' ? 'submitting' : simulate === 'submit-failed' ? 'failed' : 'idle',
  );
  const [showErrors, setShowErrors] = useState(state === 'errors');
  const [form, setForm] = useState(() => ({
    ...(seed === 'hosted' ? HOSTED : seed === 'standalone' ? STANDALONE : EMPTY),
    ...(initialValues || {}),
  }));
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const stepIndex = STEP_ORDER.indexOf(step);
  const go = (s) => { setStep(s); setShowErrors(false); };

  function submit() {
    setSubmitState('submitting');
    setTimeout(() => {
      if (simulate === 'submit-failed') setSubmitState('failed');
      else { setSubmitState('idle'); setPhase('success'); }
    }, 1200);
  }
  const stepper = {
    phases: PHASES,
    activeIndex: stepIndex,
    navigable: PHASES.map((_, i) => i <= stepIndex),
    onSelect: (i) => go(STEP_ORDER[i]),
  };

  // Region and lab name are the only required facts — the facility form's own
  // two required fields, renamed.
  const missing = [];
  if (!form.regionId) missing.push('Region');
  if (!form.name.trim()) missing.push('Lab name');
  const canContinue = missing.length === 0;

  const header = {
    title: 'Create Lab',
    subtitle: 'A lab is a facility mapped to a region. Same form as Create Facility, with lab names and the lab’s inventory in place of vaccine services.',
  };

  if (phase === 'success') {
    return (
      <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmissionSuccessCard
            title={`${form.name || 'Lab'} was created`}
            sections={[{
              heading: 'What was created',
              lines: [
                { label: 'Lab name', value: form.name || '—' },
                { label: 'Lab code', value: form.code || '—' },
                { label: 'Region', value: regionLabel(form.regionId) },
                {
                  label: 'Inventory',
                  value: form.inventoryMethod
                    ? `Next: ${form.inventoryMethod.toLowerCase()}`
                    : 'None yet — the lab has no equipment until inventory is added',
                },
              ],
            }]}
            primaryAction={{ label: 'Add lab equipment', onClick: onDone }}
            secondaryActions={[{ label: 'Back to Lab Equipment', onClick: onCancel }]}
          />
        </div>
      </LabShell>
    );
  }

  const frame = (body, { left, right }) => (
    <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
      <StepFrame
        header={header}
        stepper={stepper}
        footerLeft={left}
        footerRight={right}
      >
        {body}
      </StepFrame>

      {/* Six steps of entry is too much to throw away on a stray click. */}
      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Discard this lab?"
        size="small"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, width: '100%' }}>
            <Btn variant="secondary" onClick={() => setCancelOpen(false)}>Keep editing</Btn>
            <Btn variant="primary" tone="critical" onClick={() => { setCancelOpen(false); onCancel?.(); }}>
              Discard lab
            </Btn>
          </div>
        )}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
          Nothing has been created yet, so there is nothing to undo — but everything typed
          across these six steps is lost and would need entering again.
        </p>
      </Modal>
    </LabShell>
  );

  if (step === 'identification') {
    return frame(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {showErrors && missing.length > 0 && (
          <Banner tone="critical" inCard>
            {`${missing.join(' and ')} ${missing.length === 1 ? 'is' : 'are'} required before this lab can be created.`}
          </Banner>
        )}

        <FormSection title="Identification and location" required>
          {/* A lab IS a facility in this model — "Kenya Lab (global group, never
              selectable) → NPHL = region → labs = facilities" (PRD §Scope, and
              the ratified product context). There is no host-hospital entity in
              V1, so the region is asked directly rather than derived from some
              parent. Ednah's "most labs are hosted within a hospital" is a fact
              about the world, not a field. */}
          <SelectInput
            label="Region"
            required
            placeholder="Region (Required)"
            options={LAB_REGIONS.map((r) => ({ value: r.id, label: r.label }))}
            value={form.regionId}
            onChange={set('regionId')}
            error={showErrors && !form.regionId ? 'Pick the region this lab is mapped to.' : undefined}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <TextInput
              label="Lab name" required placeholder="Lab Name"
              value={form.name} onChange={set('name')}
              error={showErrors && !form.name.trim() ? 'Give the lab a name.' : undefined}
            />
            <TextInput
              label="Lab code" placeholder="Lab Code"
              value={form.code} onChange={set('code')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 550 }}>Enter lab (GPS) coordinates</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <TextInput placeholder="Latitude" value={form.latitude} onChange={set('latitude')} />
              <TextInput placeholder="Longitude" value={form.longitude} onChange={set('longitude')} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: TEXT_SUBDUED, fontSize: 12 }}>
              <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.25 }} />
              OR
              <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.25 }} />
            </div>
            <Btn variant="secondary"
              icon={<PolarisIconImg name="LocationFilledIcon" size={16} color="#303030" />}
              onClick={() => setForm((f) => ({ ...f, latitude: '-1.286389', longitude: '36.817223' }))}>
              Use My Location
            </Btn>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <SelectInput
              label="Facility type" placeholder="Facility Type"
              options={opts(LAB_FACILITY_TYPES)}
              value={form.labType} onChange={set('labType')}
            />
            <SelectInput
              label="Status" placeholder="Status"
              options={opts(LAB_STATUSES)}
              value={form.status} onChange={set('status')}
            />
          </div>

          <TextInput
            label="Total population served" placeholder="Total Population Served"
            helpText="Catchment area population"
            value={form.population} onChange={set('population')}
          />
        </FormSection>
      </div>,
      {
        left: <Btn variant="secondary" onClick={() => setCancelOpen(true)}>Cancel</Btn>,
        right: (
          <Btn
            variant="primary"
            onClick={() => (canContinue ? go('supply') : setShowErrors(true))}
          >
            Next
          </Btn>
        ),
      },
    );
  }

  if (step === 'supply') {
    return frame(
      <FormSection title="Supply chain & logistics">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <SelectInput label="Facility source of energy" placeholder="Facility Source of Energy"
            options={opts(ENERGY_SOURCES)} value={form.energy} onChange={set('energy')} />
          <SelectInput label="Availability of electricity" placeholder="Availability of Electricity"
            options={opts(ELECTRICITY_AVAILABILITY)} value={form.electricity} onChange={set('electricity')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SearchSelect label="Vaccine supply point" placeholder="Search and select a facility…"
            helpText="Facility that delivers vaccines to this location"
            options={HOST_FACILITIES.map((f) => ({ value: f.id, label: f.label }))}
            value={form.supplyPoint} onChange={set('supplyPoint')} />
          <TextInput label="Supply interval (months)" placeholder="Supply Interval (months)"
            helpText="Number of months between deliveries"
            value={form.supplyInterval} onChange={set('supplyInterval')} />
          <TextInput label="Safety stock level (months)" placeholder="Safety Stock Level (months)"
            helpText="Minimum months of stock held"
            value={form.safetyStock} onChange={set('safetyStock')} />
          <SelectInput label="Mode of vaccine supply" placeholder="Mode of Vaccine Supply"
            options={opts(SUPPLY_MODES)} value={form.supplyMode} onChange={set('supplyMode')} />
        </div>
        <SelectInput label="Supply levels" placeholder="Supply Levels"
          options={opts(SUPPLY_LEVELS)} value={form.supplyLevels} onChange={set('supplyLevels')} />
      </FormSection>,
      {
        left: <Btn variant="secondary" onClick={() => go('identification')}>Previous</Btn>,
        right: <Btn variant="primary" onClick={() => go('inventory')}>Next</Btn>,
      },
    );
  }

  // Section 3 · where the facility form asks about vaccine services, the lab
  // form maps the lab's inventory instead (Ednah: "they don't do vaccine...
  // just link them to creating the inventory for that lab here").
  if (step === 'inventory') {
    return frame(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <FormSection title="Lab inventory & cold chain equipment">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CardSectionTitle title="Lab inventory" />
            <Banner tone="info" inCard>
              No equipment is created here. Save the lab first, then add its equipment —
              a lab with an empty register is fine and can be stocked later.
            </Banner>
            <SelectInput
              label="How should this lab's inventory be added?"
              placeholder="Choose a method"
              options={[
                { value: 'Add equipment one by one', label: 'Add equipment one by one' },
                { value: 'Import a register spreadsheet', label: 'Import a register spreadsheet' },
                { value: 'Later — save the lab empty', label: 'Later — save the lab empty' },
              ]}
              value={form.inventoryMethod}
              onChange={set('inventoryMethod')}
              helpText="This only decides where you land after saving."
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CardSectionTitle title="Passive cold chain equipment" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <TextInput label="Cold boxes (large)" placeholder="Cold Boxes (Large)"
                value={form.coldBoxLarge} onChange={set('coldBoxLarge')} />
              <TextInput label="Cold boxes (small)" placeholder="Cold Boxes (Small)"
                value={form.coldBoxSmall} onChange={set('coldBoxSmall')} />
              <TextInput label="Carriers (large)" placeholder="Carriers (Large)"
                value={form.carrierLarge} onChange={set('carrierLarge')} />
              <TextInput label="Carriers (small)" placeholder="Carriers (Small)"
                value={form.carrierSmall} onChange={set('carrierSmall')} />
            </div>
          </div>
        </FormSection>
      </div>,
      {
        left: <Btn variant="secondary" onClick={() => go('supply')}>Previous</Btn>,
        right: <Btn variant="primary" onClick={() => go('transport')}>Next</Btn>,
      },
    );
  }

  if (step === 'transport') {
    return frame(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <FormSection title="Transport">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <TextInput label="Motos" placeholder="Motos" helpText="Functional units"
              value={form.motos} onChange={set('motos')} />
            <TextInput label="Pick-ups" placeholder="Pick-ups" helpText="Functional units"
              value={form.pickups} onChange={set('pickups')} />
            <TextInput label="Refrigerated vehicles" placeholder="Refrigerated Vehicles" helpText="Functional units"
              value={form.refrigerated} onChange={set('refrigerated')} />
          </div>
        </FormSection>
        <FormSection title="Waste management">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <TextInput label="Waste vehicles" placeholder="Waste Vehicles" helpText="Functional units"
              value={form.wasteVehicles} onChange={set('wasteVehicles')} />
            <TextInput label="Incinerators" placeholder="Incinerators" helpText="Functional units"
              value={form.incinerators} onChange={set('incinerators')} />
          </div>
          <TextareaInput label="Waste disposal notes" placeholder="Waste Disposal Notes"
            helpText='For "Other" disposal methods'
            value={form.wasteNotes} onChange={set('wasteNotes')} />
        </FormSection>
      </div>,
      {
        left: <Btn variant="secondary" onClick={() => go('inventory')}>Previous</Btn>,
        right: <Btn variant="primary" onClick={() => go('staff')}>Next</Btn>,
      },
    );
  }

  if (step === 'review') {
    const done = <Badge tone="success" size="small">Complete</Badge>;
    return frame(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {submitState === 'failed' ? (
          <Banner tone="critical" inCard actions={[{ label: 'Try again', onClick: submit }]}>
            <span style={{ display: 'block', fontWeight: 650 }}>Save failed — the lab was not created</span>
            The server rejected the request. Everything you entered is still here and nothing
            was partially saved — retry, or come back to it later.
          </Banner>
        ) : (
          <Banner tone="info" inCard>
            Nothing has been created yet. Check the lab reads correctly, then save — every
            section can still be edited from here.
          </Banner>
        )}

        <ReviewSection title="Identification & location" status={done} onEdit={() => go('identification')}>
          <ReviewRows rows={[
            ['Lab name', form.name || '—'],
            ['Lab code', form.code || '—'],
            ['Region', regionLabel(form.regionId)],
            (form.latitude || form.longitude)
              ? ['GPS coordinates', `${form.latitude || '—'}, ${form.longitude || '—'}`] : null,
            form.labType ? ['Facility type', form.labType] : null,
            form.status ? ['Status', form.status] : null,
            form.population ? ['Total population served', form.population] : null,
          ]} />
        </ReviewSection>

        <ReviewSection title="Supply chain & logistics" status={done} onEdit={() => go('supply')}>
          <ReviewRows rows={[
            ['Facility source of energy', form.energy || '—'],
            ['Availability of electricity', form.electricity || '—'],
            ['Vaccine supply point', form.supplyPoint ? hostFacilityLabel(form.supplyPoint) : '—'],
            ['Supply interval', form.supplyInterval ? months(form.supplyInterval) : '—'],
            ['Safety stock level', form.safetyStock ? months(form.safetyStock) : '—'],
            ['Mode of vaccine supply', form.supplyMode || '—'],
            ['Supply levels', form.supplyLevels || '—'],
          ]} />
        </ReviewSection>

        <ReviewSection title="Lab inventory & cold chain equipment" status={done} onEdit={() => go('inventory')}>
          <ReviewRows rows={[
            ['Inventory', form.inventoryMethod || 'None yet — the lab can be saved empty'],
            ['Cold boxes', `${form.coldBoxLarge || 0} large · ${form.coldBoxSmall || 0} small`],
            ['Carriers', `${form.carrierLarge || 0} large · ${form.carrierSmall || 0} small`],
          ]} />
        </ReviewSection>

        <ReviewSection title="Transport & waste management" status={done} onEdit={() => go('transport')}>
          <ReviewRows rows={[
            ['Transport', `${form.motos || 0} motos · ${form.pickups || 0} pick-ups · ${form.refrigerated || 0} refrigerated`],
            ['Waste', `${form.wasteVehicles || 0} vehicles · ${form.incinerators || 0} incinerators`],
            form.wasteNotes ? ['Waste disposal notes', form.wasteNotes] : null,
          ]} />
        </ReviewSection>

        <ReviewSection title="Lab staff" status={done} onEdit={() => go('staff')}>
          <ReviewRows rows={[
            ['Epi nurses & vaccine handlers', form.labStaff || '—'],
            ['Biomedical engineers & technicians', form.biomedStaff || '—'],
          ]} />
        </ReviewSection>
      </div>,
      {
        left: (
          <Btn variant="secondary" onClick={() => go('staff')} disabled={submitState === 'submitting'}>
            Previous
          </Btn>
        ),
        right: (
          <Btn variant="primary" loading={submitState === 'submitting'} onClick={submit}>
            {submitState === 'submitting' ? 'Saving…' : 'Save Lab'}
          </Btn>
        ),
      },
    );
  }

  return frame(
    <FormSection title="Lab staff">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TextInput label="Number of epi nurses and vaccine handlers"
          placeholder="Number of Epi Nurses and Vaccine Handlers"
          value={form.labStaff} onChange={set('labStaff')} />
        <TextInput label="Number of biomedical engineers and technicians"
          placeholder="Number of Biomedical Engineers and Technicians"
          value={form.biomedStaff} onChange={set('biomedStaff')} />
      </div>
    </FormSection>,
    {
      left: <Btn variant="secondary" onClick={() => go('transport')}>Previous</Btn>,
      right: <Btn variant="primary" onClick={() => go('review')}>Next</Btn>,
    },
  );
}
