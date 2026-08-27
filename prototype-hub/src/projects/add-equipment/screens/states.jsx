// ── Prototype state registry ──────────────────────────────────────────────────
// Every reviewable state of the Add Equipment flow. The "Full flow" entries
// are fully interactive end-to-end; the rest open the prototype at one
// specific state (converted 1:1 from the original Storybook stories).

import { useState } from 'react';
import { AppShell } from '@ds/components/AppShell/AppShell.jsx';
import { BG_PAGE, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { AddEquipmentFlow, EXISTING_SERIALS, ASSIGNED_QRS } from './AddEquipmentFlow.jsx';

// State stories render on the app page background, without the shell chrome.
function StateFrame({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: BG_PAGE, padding: '32px 16px 16px', boxSizing: 'border-box' }}>
      {children}
    </div>
  );
}

// Canonical trail for this flow — Home › Coldchain Equipment › Add Equipment.
// Same on every screen including the scan/entry pages and the success page:
// scanning is a step *inside* Add Equipment, not a sibling destination.
const BREADCRUMBS = [
  { id: 'home', label: 'Home' },
  { id: 'coldchain-equipment', label: 'Coldchain Equipment' },
  { id: 'add-equipment', label: 'Add Equipment' },
];

// Scan QR Code (and the pop-ups over it) is a SECONDARY page; the Add
// Equipment wizard itself is TERTIARY — the shell level follows the step.
const SECONDARY_STEPS = new Set(['search', 'entry', 'method', 'success']);

function AssembledFlow({ entryContext, entrySerial, entryQr, initialStep }) {
  const [lastAction, setLastAction] = useState(null);
  const firstStep = initialStep
    || (entryContext === 'serial-search' || entryContext === 'qr-scan' ? 'entry' : 'method');
  const [step, setStep] = useState(firstStep);
  const onScanPage = SECONDARY_STEPS.has(step);
  const crumbs = BREADCRUMBS;
  return (
    <AppShell
      level={onScanPage ? 'secondary' : 'tertiary'}
      activeItemId="coldchain"
      breadcrumbs={crumbs}
      onBreadcrumbSelect={() => {}}
      contentWidth="fluid"
    >
      <AddEquipmentFlow
        entryContext={entryContext}
        entrySerial={entrySerial}
        entryQr={entryQr}
        initialStep={initialStep}
        onStepChange={setStep}
        onExit={() => setLastAction('exit → back to Manual Temperature Recording')}
        onCreated={(record) => setLastAction(`created: ${record.equipment.serial || '(no serial)'}`)}
      />
      {lastAction && (
        <span style={{ position: 'fixed', bottom: 8, right: 12, fontSize: 11, color: TEXT_SUBDUED }}>
          last action: {lastAction}
        </span>
      )}
    </AppShell>
  );
}

const RTMD_BASE = { monitoring: { method: 'rtmd' } };

export const STATE_SECTIONS = [
  {
    title: 'Main entry',
    states: [
      {
        id: 'scan',
        label: 'Scan QR / enter serial',
        render: () => <AssembledFlow initialStep="search" />,
      },
    ],
  },
  {
    title: 'Full flows (interactive)',
    states: [
      {
        id: 'full-serial-search',
        label: 'From failed serial search',
        render: () => <AssembledFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" />,
      },
      {
        id: 'full-qr-scan',
        label: 'From unassigned QR scan',
        render: () => <AssembledFlow entryContext="qr-scan" entryQr="QR-30977" />,
      },
      {
        id: 'full-equipment-management',
        label: 'From Equipment Management',
        render: () => <AssembledFlow entryContext="equipment-management" />,
      },
    ],
  },
  {
    title: 'Entry contexts',
    states: [
      {
        id: 'entry-serial',
        label: 'No equipment found (serial)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" />
          </StateFrame>
        ),
      },
      {
        id: 'entry-qr',
        label: 'Unassigned QR code',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow entryContext="qr-scan" entryQr="QR-30977" />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Shared decision',
    states: [
      {
        id: 'method',
        label: 'Monitoring-method selection',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" initialStep="method" />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Flow 1 · Nexleaf RTMD (equipment before device)',
    states: [
      {
        id: 'facility',
        label: '1 · Facility & alarm contacts',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="facility"
              initialData={{ ...RTMD_BASE, rtmd: { facilityId: 'mombasa-north', contacts: ['c1'] } }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-contacts-limit',
        label: 'Alarm contacts · limit reached',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="facility"
              initialData={{ ...RTMD_BASE, rtmd: {
                facilityId: 'mombasa-north',
                contacts: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
              } }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-details',
        label: '2 · Equipment details (before device)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="details"
              initialData={{ ...RTMD_BASE,
                rtmd: { facilityId: 'mombasa-north', contacts: ['c1'] },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-select',
        label: '3 · Select RTMD by IMEI / MAC',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-select"
              initialData={{ ...RTMD_BASE,
                rtmd: { facilityId: 'mombasa-north', contacts: ['c1'] },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-configure',
        label: '4 · Configure (location optional)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-configure"
              initialData={{ ...RTMD_BASE,
                rtmd: { deviceId: 'rtmd-1', facilityId: 'mombasa-north', contacts: ['c1'] },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-sensors',
        label: '5 · Assign sensor · CT5 (A–D)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-sensors"
              initialData={{ ...RTMD_BASE,
                rtmd: { deviceId: 'rtmd-1', configured: true, facilityId: 'mombasa-north', contacts: ['c1'] },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-sensors-ctx',
        label: '5 · Assign sensor · CTX (pre-fed serials)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-sensors"
              initialData={{ ...RTMD_BASE,
                rtmd: { deviceId: 'rtmd-3', configured: true, facilityId: 'mombasa-north', contacts: ['c1'] },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'rtmd-confirm',
        label: '6 · Confirmation',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-confirm"
              initialData={{ ...RTMD_BASE,
                rtmd: {
                  deviceId: 'rtmd-1', configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'],
                  sensor1: { serial: 'Sensor A' },
                },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  status: 'installed', regionId: 'coast', facilityId: 'mombasa-north',
                },
              }}
            />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Flow 2 · Third-party device (manual)',
    states: [
      {
        id: 'device',
        label: 'Identify monitoring device',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="device"
              initialData={{
                monitoring: { method: 'external' },
                externalDevice: { manufacturer: 'Berlinger', model: 'Fridge-tag' },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'device-rtmd',
        label: 'Third-party RTMD (with sensor id)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="device"
              initialData={{
                monitoring: { method: 'external' },
                externalDevice: { manufacturer: 'Berlinger', model: 'Fridge-tag 3', serial: 'FT3-00214', identifier: 'sensor A' },
              }}
            />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Flow 3 · No monitoring device',
    states: [
      {
        id: 'no-device',
        label: 'Straight to details',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="details"
              initialData={{ monitoring: { method: 'none' }, rtmd: { facilityId: 'mombasa-north' }, equipment: { facilityId: 'mombasa-north', regionId: 'coast' } }}
            />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Converging steps',
    states: [
      {
        id: 'details',
        label: 'Equipment details',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="details"
              initialData={{ monitoring: { method: 'none' }, rtmd: { facilityId: 'mombasa-north' }, equipment: { facilityId: 'mombasa-north', regionId: 'coast' } }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'review',
        label: 'Review · third-party (manual)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="review"
              initialData={{
                monitoring: { method: 'external' },
                externalDevice: { manufacturer: 'Berlinger', model: 'Fridge-tag', serial: 'FT-124456', identifier: 'sensor A' },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'review-rtmd',
        label: 'Review · Nexleaf RTMD',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="review"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'success',
        label: 'Success → record temperature',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="success"
              initialData={{
                monitoring: { method: 'none' },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'success-rtmd',
        label: 'Success · Nexleaf RTMD',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="equipment-management"
              initialStep="success"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'success-thirdparty',
        label: 'Success · third-party (manual)',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="equipment-management"
              initialStep="success"
              initialData={{
                monitoring: { method: 'external' },
                externalDevice: { manufacturer: 'Berlinger', model: 'Fridge-tag', serial: 'FT-124456', identifier: 'sensor A' },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
    ],
  },
  {
    title: 'Errors & edge cases',
    states: [
      {
        id: 'submitting',
        label: 'Submitting · in progress',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="review"
              simulate="submitting"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'submit-failed',
        label: 'Submit failed · server error',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="review"
              simulate="submit-failed"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'offline',
        label: 'Offline · cannot submit',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="review"
              simulate="offline"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'location-denied',
        label: 'Location permission denied',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="rtmd-configure"
              simulate="location-denied"
              initialData={{ ...RTMD_BASE,
                rtmd: { ...RTMD_BASE.rtmd, locationGranted: false, configured: false },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'success-no-readings',
        label: 'Success · no readings yet',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="success"
              simulate="no-readings"
              initialData={{
                monitoring: { method: 'rtmd' },
                rtmd: { deviceId: 'rtmd-3', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1', 'c2'], sensor1: { serial: 'SEN-10041' } },
                equipment: {
                  serial: 'CCE-30977-KLF', qrCode: 'QR-3307', makeModel: 'Vestfrost MK 144',
                  fundingSource: 'Gavi', status: 'installed', installDate: new Date(2026, 6, 20), powerSource: 'Grid Electricity', regionId: 'coast',
                  facilityId: 'mombasa-north', warrantyYears: '3 years',
                },
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'serial-exists',
        label: 'Serial number already exists',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial={EXISTING_SERIALS[1]}
              initialStep="details"
              initialData={{
                monitoring: { method: 'none' },
                equipment: { serial: EXISTING_SERIALS[1], makeModel: 'Vestfrost MK 144', status: 'installed', regionId: 'coast', facilityId: 'mombasa-north' },
              }}
              initialErrors={{ serial: 'An equipment record with this serial number already exists. Search for it in Manual Temperature Recording instead of creating a duplicate.' }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'qr-assigned',
        label: 'QR code already assigned',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="qr-scan"
              entryQr={ASSIGNED_QRS[0]}
              initialStep="details"
              initialData={{
                monitoring: { method: 'none' },
                equipment: { qrCode: ASSIGNED_QRS[0], serial: 'CCE-88214-NRB', makeModel: 'Haier Biomedical HBD-116', status: 'installed', regionId: 'nairobi', facilityId: 'knh' },
              }}
              initialErrors={{ qrCode: 'This QR code is already assigned to another equipment record. Remove it there first, or scan a different code.' }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'missing-details',
        label: 'Missing required details',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              initialStep="details"
              initialData={{ monitoring: { method: 'none' } }}
              initialErrors={{
                serial: 'Serial number is required.',
                makeModel: 'Equipment make and model is required.',
                status: 'Equipment status is required.',
              }}
            />
          </StateFrame>
        ),
      },
      {
        id: 'cancel',
        label: 'Cancel · discard confirmation',
        render: () => (
          <StateFrame>
            <AddEquipmentFlow
              entryContext="serial-search"
              entrySerial="CCE-30977-KLF"
              initialStep="method"
              initialCancelOpen
            />
          </StateFrame>
        ),
      },
    ],
  },
];

export const STATES = STATE_SECTIONS.flatMap((s) => s.states);
