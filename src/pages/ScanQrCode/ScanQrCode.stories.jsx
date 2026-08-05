// ── Pages / Scan QR Code ───────────────────────────────────────────────────────
// The "Select an Option" entry screen reached from the Home Quick Action
// (Figma node 8048-203702): scan a QR code OR type an equipment serial number.
// The body lives in ScanQrCodeBody.jsx.
//
// This page owns the entry SURFACE only. The Add Equipment wizard that
// continues from here is prototype work and lives in the standalone
// "3rd Party Equipment flow" app (localhost:5180), not in the design system.

import { useState } from 'react';
import { AppShell } from '../../components/AppShell/AppShell.jsx';
import { AiChatDemo } from '../../components/AiChat/AiChatDemo.jsx';
import { PolarisIconImg } from '../../components/PolarisIcon/PolarisIcon.jsx';
import { TEXT_SUBDUED } from '../../tokens/index.js';
import { ScanQrCodeBody } from './ScanQrCodeBody.jsx';

export default {
  title: 'Pages/Scan QR Code',
  parameters: { layout: 'fullscreen' },
};

const BREADCRUMBS = [
  { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />, iconOnly: true },
  { id: 'equipment', label: 'Equipment Management' },
  { id: 'scan', label: 'Scan QR Code' },
];

// The scan screen with inert callbacks — layout reference without flow logic.
export const ScanQrCodePage = {
  name: 'Scan QR Code',
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
