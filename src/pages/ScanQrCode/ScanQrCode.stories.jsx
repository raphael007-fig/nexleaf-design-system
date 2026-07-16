// ── Pages / Scan QR Code ───────────────────────────────────────────────────────
// The "Select an Option" entry screen reached from the Home Quick Action
// (Figma node 8048-203702): scan a QR code OR type an equipment serial number.
// The body lives in ScanQrCodeBody.jsx (shared with the App Shell assembled
// flow, where Quick Action routes here and Home routes back). This story shows
// the page standalone; for the full Home ⇄ Scan ⇄ Record navigation, see
// Patterns/Responsive/App Shell.

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

// ── Assembled page — the scan screen inside the responsive shell ─────────────
export const ScanQrCodePage = {
  name: 'Scan QR Code (assembled)',
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
        {/* Demo-only echo of the last action, for interaction verification. */}
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
