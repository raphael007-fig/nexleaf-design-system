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
// Region is the required fact and the host facility is optional, because most
// labs sit inside a hospital but NPHL's own regional labs do not. When a host
// facility is given the region is DERIVED from it and never asked twice — the
// convention the register already uses (Raf, 2026-09-08).
//
// Reuses the Add-Equipment wizard system (StepFrame / FormSection) exactly as
// ColdRoomFlow does, so the three flows cannot drift.
import { useState } from 'react';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { TextareaInput } from '@ds/components/TextareaInput/TextareaInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { SubmissionSuccessCard } from '@ds/components/SubmissionSuccessCard/SubmissionSuccessCard.jsx';
import { TEXT_SUBDUED } from '@ds/tokens/index.js';
import { StepFrame, FormSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';
import { LabShell } from './LabShell.jsx';
import {
  LAB_REGIONS, HOST_FACILITIES, regionLabel, regionForHost,
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
];
const STEP_ORDER = ['identification', 'supply', 'inventory', 'transport', 'staff'];

const EMPTY = {
  hostId: '', regionId: '', name: '', code: '',
  latitude: '', longitude: '', labType: '', status: '', population: '',
  energy: '', electricity: '', supplyPoint: '', supplyInterval: '',
  safetyStock: '', supplyMode: '', supplyLevels: '',
  inventoryMethod: '', motos: '', pickups: '', refrigerated: '',
  wasteVehicles: '', incinerators: '', wasteNotes: '',
  labStaff: '', biomedStaff: '',
};

// A lab that sits inside a hospital — the common case Ednah described.
const HOSTED = {
  ...EMPTY,
  hostId: 'ncrh', regionId: 'nairobi',
  name: 'Nairobi County Referral Lab',
  code: 'NRB/LAB/004',
  latitude: '-1.286389', longitude: '36.817223',
  labType: 'Facility', status: 'Public', population: '412000',
  energy: 'Grid Electricity', electricity: '>16h',
  supplyInterval: '3', safetyStock: '1', supplyMode: 'Pull',
  supplyLevels: 'Service Points (SP)',
};

// The NPHL exception: a regional lab with no host facility, so the region is
// asked directly instead of being derived.
const STANDALONE = {
  ...EMPTY,
  hostId: '', regionId: 'nphl',
  name: 'NPHL Regional Lab — Kisumu',
  code: 'NPHL/LAB/011',
  labType: 'Province', status: 'Public',
};

const opts = (list) => list.map((v) => ({ value: v, label: v }));

export function CreateLabScreen({
  state = 'identification', initialValues = null, seed = 'empty',
  onDone, onCancel, onCrumb,
}) {
  // 'errors' and 'success' are states of a step, not steps of their own — an
  // unrecognised value would otherwise fall through every branch to the last.
  const [step, setStep] = useState(
    state === 'success' ? 'staff'
      : state === 'errors' ? 'identification'
        : STEP_ORDER.includes(state) ? state : 'identification',
  );
  const [phase, setPhase] = useState(state === 'success' ? 'success' : 'idle');
  const [showErrors, setShowErrors] = useState(state === 'errors');
  const [form, setForm] = useState(() => ({
    ...(seed === 'hosted' ? HOSTED : seed === 'standalone' ? STANDALONE : EMPTY),
    ...(initialValues || {}),
  }));
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  // Picking a host facility settles the region; clearing it hands the region
  // question back to the user (the NPHL case).
  const setHost = (id) => setForm((f) => ({
    ...f, hostId: id, regionId: id ? regionForHost(id) : '',
  }));

  const stepIndex = STEP_ORDER.indexOf(step);
  const go = (s) => { setStep(s); setShowErrors(false); };
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
    subtitle: 'A lab is mapped to a region. Most labs sit inside a hospital — pick the host facility and the region follows.',
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
                  label: 'Host facility',
                  value: form.hostId
                    ? HOST_FACILITIES.find((f) => f.id === form.hostId)?.label
                    : 'None — a regional lab not mapped to a facility',
                },
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
    </LabShell>
  );

  if (step === 'identification') {
    return frame(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {showErrors && missing.length > 0 && (
          <Banner tone="critical" inCard
            message={`${missing.join(' and ')} ${missing.length === 1 ? 'is' : 'are'} required before this lab can be created.`}
          />
        )}

        <FormSection title="Identification and location" required>
          <SearchSelect
            label="Host facility"
            placeholder="Search and select the hospital this lab sits inside…"
            options={HOST_FACILITIES.map((f) => ({ value: f.id, label: f.label }))}
            value={form.hostId}
            onChange={setHost}
          />

          {form.hostId ? (
            <TextInput
              label="Region"
              value={regionLabel(form.regionId)}
              readOnly
              helpText="Region is derived from the host facility — it is never asked separately. Clear the host facility to set a region directly."
            />
          ) : (
            <SelectInput
              label="Region"
              required
              placeholder="Region (Required)"
              options={LAB_REGIONS.map((r) => ({ value: r.id, label: r.label }))}
              value={form.regionId}
              onChange={set('regionId')}
              error={showErrors && !form.regionId ? 'Pick the region this lab is mapped to.' : undefined}
              helpText="No host facility, so the region is asked directly — the NPHL regional-lab case."
            />
          )}

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
            <Btn variant="secondary" onClick={() => setForm((f) => ({ ...f, latitude: '-1.286389', longitude: '36.817223' }))}>
              Use My Location
            </Btn>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <SelectInput
              label="Lab type" placeholder="Lab Type"
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
        left: <Btn variant="secondary" onClick={onCancel}>Cancel</Btn>,
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
          <SelectInput label="Source of energy" placeholder="Lab Source of Energy"
            options={opts(ENERGY_SOURCES)} value={form.energy} onChange={set('energy')} />
          <SelectInput label="Availability of electricity" placeholder="Availability of Electricity"
            options={opts(ELECTRICITY_AVAILABILITY)} value={form.electricity} onChange={set('electricity')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <SearchSelect label="Supply point" placeholder="Search and select the facility that supplies this lab…"
            options={HOST_FACILITIES.map((f) => ({ value: f.id, label: f.label }))}
            value={form.supplyPoint} onChange={set('supplyPoint')} />
          <TextInput label="Supply interval (months)" placeholder="Supply Interval (months)"
            helpText="Number of months between deliveries"
            value={form.supplyInterval} onChange={set('supplyInterval')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Safety stock level (months)" placeholder="Safety Stock Level (months)"
            helpText="Minimum months of stock held"
            value={form.safetyStock} onChange={set('safetyStock')} />
          <SelectInput label="Mode of supply" placeholder="Mode of Supply"
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
      <FormSection title="Lab inventory">
        <Banner tone="info" inCard
          message="A lab has no vaccine services. This section maps the lab's equipment instead — nothing is created until you add it, and a new lab can be saved empty."
        />
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
          helpText="Both routes already exist for this module — this only decides where you land after saving."
        />
      </FormSection>,
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

  return frame(
    <FormSection title="Lab staff">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <TextInput label="Number of lab technologists and analysts"
          placeholder="Number of Lab Technologists and Analysts"
          value={form.labStaff} onChange={set('labStaff')} />
        <TextInput label="Number of biomedical engineers and technicians"
          placeholder="Number of Biomedical Engineers and Technicians"
          value={form.biomedStaff} onChange={set('biomedStaff')} />
      </div>
    </FormSection>,
    {
      left: <Btn variant="secondary" onClick={() => go('transport')}>Previous</Btn>,
      right: <Btn variant="primary" onClick={() => setPhase('success')}>Save Lab</Btn>,
    },
  );
}
