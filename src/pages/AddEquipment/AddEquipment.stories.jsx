// ── Pages / Add Equipment ─────────────────────────────────────────────────────
// The Add Equipment WIZARD: monitoring-method decision → one wizard chrome
// (Page header + Stepper + fixed-height tertiary card) serving all three
// flows: Nexleaf RTMD · built-in/third-party device · no monitoring device.
//
// The Scan QR Code entry point and the pop-ups over it (no-equipment-found,
// unassigned QR, method modal) live under Pages/Scan QR Code — this file owns
// only the wizard itself. Shared shell harness: ./flowHarness.jsx.

import { AddEquipmentFlow, EXISTING_SERIALS, ASSIGNED_QRS } from './AddEquipmentFlow.jsx';
import { AssembledFlow, StateFrame } from './flowHarness.jsx';

export default {
  title: 'Pages/Add Equipment',
  parameters: { layout: 'fullscreen' },
};

const RTMD_BASE = { monitoring: { method: 'rtmd' } };

// ─── Full interactive flow (wizard entry without the scanner) ─────────────────

export const FullFlowFromEquipmentManagement = {
  name: 'Full flow · from Equipment Management',
  render: () => <AssembledFlow entryContext="equipment-management" />,
};

// ─── Flow 1 · Nexleaf RTMD ────────────────────────────────────────────────────

export const RtmdSelectDevice = {
  name: 'RTMD · select device + configuration date',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow initialStep="rtmd-select" initialData={RTMD_BASE} />
    </StateFrame>
  ),
};

export const RtmdConfigure = {
  name: 'RTMD · configure + location permission',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="rtmd-configure"
        initialData={{ ...RTMD_BASE, rtmd: { deviceId: 'rtmd-1' } }}
      />
    </StateFrame>
  ),
};

export const RtmdFacilityContacts = {
  name: 'RTMD · facility & alarm contacts',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="rtmd-facility"
        initialData={{ ...RTMD_BASE, rtmd: { deviceId: 'rtmd-1', locationGranted: true, configured: true, facilityId: 'mombasa-north', contacts: ['c1'] } }}
      />
    </StateFrame>
  ),
};

export const RtmdContactsLimit = {
  name: 'RTMD · alarm contacts, limit reached',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="rtmd-facility"
        initialData={{ ...RTMD_BASE, rtmd: {
          deviceId: 'rtmd-1', locationGranted: true, configured: true, facilityId: 'mombasa-north',
          contacts: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
        } }}
      />
    </StateFrame>
  ),
};

export const RtmdSensorConfiguration = {
  name: 'RTMD · sensor configuration',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="rtmd-sensors"
        initialData={{ ...RTMD_BASE, rtmd: { deviceId: 'rtmd-1', locationGranted: true, configured: true, facilityId: 'mombasa-north' } }}
      />
    </StateFrame>
  ),
};

export const RtmdConfirmation = {
  name: 'RTMD · confirmation',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="rtmd-confirm"
        initialData={{
          ...RTMD_BASE,
          rtmd: { deviceId: 'rtmd-1', locationGranted: true, configured: true, facilityId: 'mombasa-north', hasSensor2: true, contacts: ['c1', 'c2'] },
        }}
      />
    </StateFrame>
  ),
};

// ─── Flow 2 · Built-in / third-party device ───────────────────────────────────

export const ProviderSupported = {
  name: 'Third-party · provider with integration',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="provider"
        initialData={{ monitoring: { method: 'external' }, integration: { providerId: 'berlinger' } }}
      />
    </StateFrame>
  ),
};

export const ProviderUnsupported = {
  name: 'Third-party · provider without integration',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="provider"
        initialData={{ monitoring: { method: 'external' }, integration: { providerId: 'elitech' } }}
      />
    </StateFrame>
  ),
};

export const ConnectDevice = {
  name: 'Third-party · connect device',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="connect"
        initialData={{ monitoring: { method: 'external' }, integration: { providerId: 'berlinger' } }}
      />
    </StateFrame>
  ),
};

export const ConnectionSuccessful = {
  name: 'Third-party · connection successful',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="connected"
        initialData={{
          monitoring: { method: 'external' },
          integration: {
            providerId: 'berlinger', deviceId: 'FT2-0048812', accessCode: '482913',
            status: 'connected', lastSync: 'Just now', latestReading: '+4.6 °C at 09:42',
          },
        }}
      />
    </StateFrame>
  ),
};

export const ConnectionFailed = {
  name: 'Third-party · connection failed',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="connect"
        simulateConnection="failed"
        initialData={{
          monitoring: { method: 'external' },
          integration: { providerId: 'berlinger', deviceId: 'FT2-0048812', accessCode: '0000', status: 'failed' },
        }}
      />
    </StateFrame>
  ),
};

export const ConnectionUnavailable = {
  name: 'Third-party · connection service unavailable',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="connect"
        simulateConnection="unavailable"
        initialData={{
          monitoring: { method: 'external' },
          integration: { providerId: 'haier', deviceId: 'HB-7741-002', accessCode: '118842', status: 'unavailable' },
        }}
      />
    </StateFrame>
  ),
};

export const RegisterExternalDevice = {
  name: 'Third-party · register device (no integration)',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="register"
        initialData={{
          monitoring: { method: 'external' },
          integration: { providerId: 'elitech' },
          externalDevice: { providerId: 'elitech', manufacturer: 'Elitech' },
        }}
      />
    </StateFrame>
  ),
};

// ─── Flow 3 · No monitoring device & converging steps ─────────────────────────

export const EquipmentDetails = {
  name: 'Equipment details',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        entryContext="qr-scan"
        entryQr="QR-30977"
        initialStep="details"
        initialData={{ monitoring: { method: 'none' } }}
      />
    </StateFrame>
  ),
};

export const ReviewAndConfirm = {
  name: 'Review and confirm',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        entryContext="serial-search"
        entrySerial="CCE-30977-KLF"
        initialStep="review"
        initialData={{
          monitoring: { method: 'external' },
          integration: { providerId: 'elitech' },
          externalDevice: { providerId: 'elitech', manufacturer: 'Elitech', model: 'RC-5+', serial: 'EL-2025-118842', comm: 'USB download' },
          equipment: {
            serial: 'CCE-30977-KLF', qrCode: '', type: 'ILR Refrigerator',
            manufacturer: 'Vestfrost', model: 'MK 144', facilityId: 'mombasa-north', location: 'EPI store room',
          },
        }}
      />
    </StateFrame>
  ),
};

export const SuccessReturnToRecording = {
  name: 'Success · return to temperature recording',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        entryContext="serial-search"
        entrySerial="CCE-30977-KLF"
        initialStep="success"
        initialData={{
          monitoring: { method: 'none' },
          equipment: {
            serial: 'CCE-30977-KLF', qrCode: '', type: 'ILR Refrigerator',
            manufacturer: 'Vestfrost', model: 'MK 144', facilityId: 'mombasa-north', location: 'EPI store room',
          },
        }}
      />
    </StateFrame>
  ),
};

// ─── Errors & edge states ─────────────────────────────────────────────────────

export const SerialNumberAlreadyExists = {
  name: 'Error · serial number already exists',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        entryContext="serial-search"
        entrySerial={EXISTING_SERIALS[1]}
        initialStep="details"
        initialData={{ monitoring: { method: 'none' }, equipment: { serial: EXISTING_SERIALS[1], type: 'ILR Refrigerator', manufacturer: 'Vestfrost', facilityId: 'mombasa-north' } }}
        initialErrors={{ serial: 'An equipment record with this serial number already exists. Search for it in Manual Temperature Recording instead of creating a duplicate.' }}
      />
    </StateFrame>
  ),
};

export const QrCodeAlreadyAssigned = {
  name: 'Error · QR code already assigned',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        entryContext="qr-scan"
        entryQr={ASSIGNED_QRS[0]}
        initialStep="details"
        initialData={{ monitoring: { method: 'none' }, equipment: { qrCode: ASSIGNED_QRS[0], serial: 'CCE-88214-NRB', type: 'Vaccine Freezer', manufacturer: 'Haier Biomedical', facilityId: 'knh' } }}
        initialErrors={{ qrCode: 'This QR code is already assigned to another equipment record. Remove it there first, or scan a different code.' }}
      />
    </StateFrame>
  ),
};

export const MissingRequiredDetails = {
  name: 'Error · missing required details',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow
        initialStep="details"
        initialData={{ monitoring: { method: 'none' } }}
        initialErrors={{
          serial: 'Serial number is required.',
          type: 'Equipment type is required.',
          manufacturer: 'Manufacturer is required.',
          facilityId: 'Facility is required.',
        }}
      />
    </StateFrame>
  ),
};

export const CancelConfirmation = {
  name: 'Cancel · discard confirmation',
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
};
