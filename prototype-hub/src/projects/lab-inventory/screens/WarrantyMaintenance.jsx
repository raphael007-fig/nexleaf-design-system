// ── Warranty & Maintenance — the shared step-2 body ───────────────────────────
// Lifted out of AddLabEquipmentScreen so the cold-room monitoring install flow
// asks for cover and service history the SAME way the unmonitored register form
// does (Raf, 2026-09-07). One implementation, two flows — the fields, the copy
// and the maintenance calculation can never drift apart.
//
// Pure composition from the Poltail DS: DateField, SelectInput, SearchSelect,
// RadioGroup, Badge inside the Add-Equipment FormSection.
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { TextInput } from '@ds/components/TextInput/TextInput.jsx';
import { SelectInput } from '@ds/components/SelectInput/SelectInput.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { RadioButton } from '@ds/components/RadioButton/RadioButton.jsx';
import { DateField } from '@ds/components/DateField/DateField.jsx';
import { TEXT_SUBDUED, TEXT_DEFAULT } from '@ds/tokens/index.js';
import { FormSection } from '../../add-equipment/screens/AddEquipmentFlow.jsx';

export const MAINTENANCE_SCHEDULES = ['Quarterly', 'Every 6 months', 'Annually', 'Not scheduled'];
// 'No contract' is deliberately absent — the Service agreement yes/no answers
// that, so this list only ever holds actual providers.
export const SERVICE_PROVIDERS = [
  'Vendor (original supplier)', 'Local service agent', 'Calibration Centre', 'In-house biomedical team',
];

// Maintenance status is CCE's five values, and it is CALCULATED, never picked
// (Raf, 2026-09-07): the schedule measured against the last service date. With
// no schedule or no service date the honest answer is Unknown — which is also
// the bug in CCE today, where an Overdue chip is computed against a Last
// Service Date that is never populated.
const SCHEDULE_DAYS = { 'Quarterly': 90, 'Every 6 months': 182, 'Annually': 365 };

export function maintenanceStatus(schedule, lastService) {
  if (!schedule || schedule === 'Not scheduled' || !lastService) {
    return { label: 'Unknown', tone: 'default', why: 'No schedule or no last service date — nothing to measure.' };
  }
  const interval = SCHEDULE_DAYS[schedule] || 365;
  const due = new Date(lastService).getTime() + interval * 86400000;
  const daysToDue = Math.ceil((due - Date.now()) / 86400000);
  // The Due/Upcoming windows are 30/90 days, but capped against the interval —
  // otherwise a Quarterly schedule (90 days) could never read OK, and a fridge
  // serviced yesterday would already say Upcoming.
  const dueWindow = Math.min(30, Math.round(interval * 0.25));
  const upcomingWindow = Math.min(90, Math.round(interval * 0.6));
  const on = () => new Date(due).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  if (daysToDue < 0) return { label: 'Overdue', tone: 'critical', why: `${Math.abs(daysToDue)} days past due (${on()}).` };
  if (daysToDue <= dueWindow) return { label: 'Due', tone: 'warning', why: `Due in ${daysToDue} days (${on()}).` };
  if (daysToDue <= upcomingWindow) return { label: 'Upcoming', tone: 'info', why: `Due ${on()}.` };
  return { label: 'OK', tone: 'success', why: `Next service ${on()}.` };
}

const fmt = (d) => (d
  ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  : null);

/**
 * The review rows for whatever this step collected — so both flows summarise it
 * identically too.
 * @param {object} v  The same value object the fields are driven by.
 */
export function warrantyMaintenanceRows(v) {
  return {
    maintenance: [
      ['Schedule', v.schedule || '— (not scheduled)'],
      ['Last service date', fmt(v.lastService) || '— (no history)'],
      ['Maintenance status', maintenanceStatus(v.schedule, v.lastService).label],
    ],
    warranty: [
      ['Warranty start', fmt(v.warrantyStart) || '— (not recorded)'],
      ['Warranty end', fmt(v.warrantyEnd) || '—'],
      ['Service agreement', v.agreement === 'yes' ? 'Yes' : v.agreement === 'no' ? 'No' : '— (not answered)'],
      ...(v.agreement === 'yes' ? [
        ['Service provider', v.servicer || '— (none)'],
        ['Provider contact', [v.servicerPhone, v.servicerEmail].filter(Boolean).join(' · ') || '— (none recorded)'],
        ['Cover', [fmt(v.coverFrom), fmt(v.coverTo) || 'open-ended'].filter(Boolean).join(' → ') || '—'],
      ] : []),
    ],
  };
}

export const EMPTY_WARRANTY_MAINTENANCE = {
  warrantyStart: null, warrantyEnd: null,
  schedule: '', lastService: null,
  agreement: '', servicer: '', servicerPhone: '', servicerEmail: '', coverFrom: null, coverTo: null,
};

/**
 * WarrantyMaintenanceFields
 *
 * @param {object} value    See EMPTY_WARRANTY_MAINTENANCE for the shape.
 * @param {(patch: object) => void} onChange  Called with a partial patch.
 * @param {string[]} [providers]  Session-created providers, so a "+ Add"
 *   entry survives (SearchSelect resolves its label from `options`).
 * @param {(name: string) => void} [onProviderCreate]
 */
export function WarrantyMaintenanceFields({ value, onChange, providers = [], onProviderCreate }) {
  const v = value;
  const set = (patch) => onChange?.(patch);

  return (
    <>
      <FormSection title="Warranty">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, alignItems: 'start' }}>
          <DateField
            label="Warranty start date"
            value={v.warrantyStart}
            onChange={(d) => set({ warrantyStart: d })}
            helpText="Usually the purchase or commissioning date."
          />
          <DateField
            label="Warranty end date"
            value={v.warrantyEnd}
            onChange={(d) => set({ warrantyEnd: d })}
            helpText="When cover lapses — what a repair is checked against."
          />
        </div>
      </FormSection>

      <FormSection title="Maintenance">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, alignItems: 'start' }}>
          <SelectInput
            label="Maintenance schedule"
            options={MAINTENANCE_SCHEDULES.map((s) => ({ id: s, label: s }))}
            placeholder="Select…"
            value={v.schedule}
            onChange={(e) => set({ schedule: e.target ? e.target.value : e })}
            helpText="How often preventive maintenance is planned."
          />
          <DateField
            label="Last service date"
            value={v.lastService}
            onChange={(d) => set({ lastService: d })}
            helpText="The date the schedule is measured from. Leave blank if it has never been serviced."
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Maintenance status</span>
          <Badge tone={maintenanceStatus(v.schedule, v.lastService).tone} size="small">
            {maintenanceStatus(v.schedule, v.lastService).label}
          </Badge>
        </div>
        <p style={{ margin: '-8px 0 0', fontSize: 12, lineHeight: '18px', color: TEXT_SUBDUED }}>
          Calculated, never entered — the schedule measured against the last service
          date. {maintenanceStatus(v.schedule, v.lastService).why}
        </p>
      </FormSection>

      <FormSection title="Service contract">
        {/* Yes / No sit side by side (Raf, 2026-09-07) — two answers to one
            question read faster in a row than stacked. RadioGroup only stacks,
            so the row is composed from the DS RadioButton directly. */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#303030', lineHeight: '20px' }}>
            Service agreement
          </span>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { id: 'yes', label: 'Yes', helpText: 'There is a contract or agreement covering service.' },
              { id: 'no', label: 'No', helpText: 'No agreement — repairs are arranged case by case.' },
            ].map((opt) => (
              <div key={opt.id} style={{ flex: '1 1 220px', minWidth: 0 }}>
                <RadioButton
                  tone="brand"
                  name="service-agreement"
                  label={opt.label}
                  helpText={opt.helpText}
                  checked={v.agreement === opt.id}
                  onChange={() => set(opt.id === 'no'
                    ? { agreement: 'no', servicer: '', servicerPhone: '', servicerEmail: '', coverFrom: null, coverTo: null }
                    : { agreement: 'yes' })}
                />
              </div>
            ))}
          </div>
        </div>
        {v.agreement === 'yes' && (
          <>
            <SearchSelect
              label="Service provider"
              placeholder="Choose or type a provider"
              options={[...SERVICE_PROVIDERS, ...providers].map((p) => ({ id: p, label: p }))}
              value={v.servicer}
              onChange={(x) => set({ servicer: x && x.target ? x.target.value : x })}
              onCreate={(text) => { onProviderCreate?.(text); set({ servicer: text }); }}
              createLabel="Add provider"
              helpText="Who services it — the vendor, a local agent, or the calibration centre."
            />
            {/* The provider's own contact details, both optional (Raf,
                2026-09-07) — who to call when the equipment fails. Contract
                reference was dropped: nobody reads a PO number off this form. */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, alignItems: 'start' }}>
              <TextInput
                label="Phone number"
                placeholder="Optional — e.g. +254 722 000 000"
                value={v.servicerPhone}
                onChange={(e) => set({ servicerPhone: e.target.value })}
                helpText="Who to call when this equipment fails."
              />
              <TextInput
                label="Email address"
                placeholder="Optional — e.g. service@vendor.co.ke"
                value={v.servicerEmail}
                onChange={(e) => set({ servicerEmail: e.target.value })}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16, alignItems: 'start' }}>
              <DateField label="Cover start date" value={v.coverFrom} onChange={(d) => set({ coverFrom: d })}
                helpText="When the contract starts." />
              <DateField label="Cover end date" value={v.coverTo} onChange={(d) => set({ coverTo: d })}
                helpText="Leave blank for an open-ended arrangement." />
            </div>
          </>
        )}
      </FormSection>
    </>
  );
}
