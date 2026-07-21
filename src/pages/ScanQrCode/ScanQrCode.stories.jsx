// ── Pages / Scan QR Code ───────────────────────────────────────────────────────
// The "Select an Option" entry screen reached from the Home Quick Action
// (Figma node 8048-203702): scan a QR code OR type an equipment serial number.
// The body lives in ScanQrCodeBody.jsx.
//
// This page OWNS the whole entry experience: the live scan screen, the failed
// serial-search / unassigned-QR pop-ups, and the monitoring-method modal that
// opens over the scanner. Continuing past the method choice enters the wizard
// — those states live under Pages/Add Equipment.

import { useState } from 'react';
import { AppShell } from '../../components/AppShell/AppShell.jsx';
import { AiChatDemo } from '../../components/AiChat/AiChatDemo.jsx';
import { PolarisIconImg } from '../../components/PolarisIcon/PolarisIcon.jsx';
import { TEXT_SUBDUED } from '../../tokens/index.js';
import { ScanQrCodeBody } from './ScanQrCodeBody.jsx';
import { AddEquipmentFlow } from '../AddEquipment/AddEquipmentFlow.jsx';
import { AssembledFlow, StateFrame } from '../AddEquipment/flowHarness.jsx';

export default {
  title: 'Pages/Scan QR Code',
  parameters: { layout: 'fullscreen' },
};

const BREADCRUMBS = [
  { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />, iconOnly: true },
  { id: 'equipment', label: 'Equipment Management' },
  { id: 'scan', label: 'Scan QR Code' },
];

// ── Live page — wired to the Add Equipment flow ──────────────────────────────
// The production behavior: an unknown serial raises the "no equipment found"
// pop-up, the simulated scanner reads an unassigned QR label, a known serial
// (e.g. EQ1-001) shows the found toast — and the primary actions lead into the
// Add Equipment wizard (Pages/Add Equipment). Fixed-height card and level
// switching (secondary here → tertiary in the wizard) included.
export const ScanToAddEquipment = {
  name: 'Scan QR Code (live)',
  render: () => <AssembledFlow initialStep="search" />,
};

// ── Full journeys that begin at this page ─────────────────────────────────────

export const FullFlowFromSerialSearch = {
  name: 'Full flow · from failed serial search',
  render: () => <AssembledFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" />,
};

export const FullFlowFromQrScan = {
  name: 'Full flow · from unassigned QR scan',
  render: () => <AssembledFlow entryContext="qr-scan" entryQr="QR-30977" />,
};

// ── Pop-ups over the scanner ──────────────────────────────────────────────────

export const EntryNoEquipmentFound = {
  name: 'Entry · no equipment found (serial)',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" />
    </StateFrame>
  ),
};

export const EntryUnassignedQrCode = {
  name: 'Entry · unassigned QR code',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow entryContext="qr-scan" entryQr="QR-30977" />
    </StateFrame>
  ),
};

export const MonitoringMethodSelection = {
  name: 'Monitoring-method selection (modal)',
  render: () => (
    <StateFrame>
      <AddEquipmentFlow entryContext="serial-search" entrySerial="CCE-30977-KLF" initialStep="method" />
    </StateFrame>
  ),
};

// ── Static variants ───────────────────────────────────────────────────────────

// The scan screen with inert callbacks — layout reference without flow logic.
export const ScanQrCodePage = {
  name: 'Scan QR Code (static)',
  render: () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [lastAction, setLastAction] = useState(null);
    return (
      <AppShell
        level="secondary"
        activeItemId="coldchain"
        breadcrumbs={BREADCRUMBS}
        onBreadcrumbSelect={() => {}}
        contentWidth="fluid"
        onAskAi={() => setChatOpen((o) => !o)}
        askAiActive={chatOpen}
      >
        <AiChatDemo open={chatOpen} onClose={() => setChatOpen(false)} />
        <ScanQrCodeBody
          onScan={() => setLastAction('scan')}
          onSubmit={(serial) => setLastAction(`submit:${serial || '(empty)'}`)}
        />
        {lastAction && (
          <span style={{ position: 'fixed', bottom: 8, right: 12, fontSize: 11, color: TEXT_SUBDUED }}>
            last action: {lastAction}
          </span>
        )}
      </AppShell>
    );
  },
};

// Body only — the card without the shell, for docs/embedding.
export const BodyOnly = {
  name: 'Body only',
  render: () => <ScanQrCodeBody onScan={() => {}} onSubmit={() => {}} />,
};
