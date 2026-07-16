// ── Scan QR Code — page body (shared) ─────────────────────────────────────────
// The "Select an Option" surface (Figma 8048-203702): scan a QR code OR type an
// equipment serial number. One shared body so the standalone Pages story and
// the assembled App Shell flow render the identical screen. Pure composition:
// base Card, the CardLayoutType5 QR-circle media recipe, ToolbarIconButton,
// Divider, TextInput, primary Btn.

import { useState } from 'react';
import { Card } from '../../components/Card/Card.jsx';
import { Divider } from '../../components/Divider/Divider.jsx';
import { TextInput } from '../../components/TextInput/TextInput.jsx';
import { Btn } from '../../components/Btn/Btn.jsx';
import { ToolbarIconButton } from '../../components/Toolbar/Toolbar.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED, BG_INFO } from '../../tokens/index.js';

// Same QR mark as the Card QR-code layout (CardLayoutType5) so the scan entry
// point and the record's QR card share one glyph.
const QrCodeIcon = ({ size = 48, color = TEXT_DEFAULT }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="14" height="14" rx="2" stroke={color} strokeWidth="2" />
    <rect x="9" y="9" width="4" height="4" rx="0.5" fill={color} />
    <rect x="30" y="4" width="14" height="14" rx="2" stroke={color} strokeWidth="2" />
    <rect x="35" y="9" width="4" height="4" rx="0.5" fill={color} />
    <rect x="4" y="30" width="14" height="14" rx="2" stroke={color} strokeWidth="2" />
    <rect x="9" y="35" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="22" width="4" height="4" rx="0.5" fill={color} />
    <rect x="30" y="22" width="4" height="4" rx="0.5" fill={color} />
    <rect x="40" y="22" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="30" width="4" height="4" rx="0.5" fill={color} />
    <rect x="36" y="30" width="4" height="4" rx="0.5" fill={color} />
    <rect x="30" y="36" width="4" height="4" rx="0.5" fill={color} />
    <rect x="40" y="36" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="40" width="4" height="4" rx="0.5" fill={color} />
    <rect x="32" y="40" width="4" height="4" rx="0.5" fill={color} />
  </svg>
);

const IcoChevronRight = ({ size = 20, color = TEXT_DEFAULT }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * ScanQrCodeBody
 * @param {() => void} [onScan]           Chevron / "open the scanner" tap.
 * @param {(serial:string) => void} [onSubmit]  Submit with the typed serial.
 */
export function ScanQrCodeBody({ onScan, onSubmit }) {
  const [serial, setSerial] = useState('');
  return (
    <Card style={{ minHeight: 'calc(100vh - 160px)', padding: 32 }}>
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Heading */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.2px', color: TEXT_DEFAULT }}>
            Select an Option
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 14, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
            Scan QR Code or Enter Equipment Serial No.
          </p>
        </div>

        {/* Scan tile — QR-circle media (same recipe as the record's QR card) +
            title + round chevron affordance (ToolbarIconButton). */}
        <Card style={{ padding: '32px 24px', alignItems: 'center', gap: 16 }}>
          <div
            aria-hidden="true"
            style={{
              width: 88, height: 88, borderRadius: '50%', background: BG_INFO,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <QrCodeIcon size={48} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, lineHeight: '24px', color: TEXT_DEFAULT }}>
            Scan QR Code
          </span>
          <ToolbarIconButton icon={<IcoChevronRight />} ariaLabel="Open the QR scanner" onClick={onScan} />
        </Card>

        <Divider />

        {/* Manual entry */}
        <TextInput
          label="Enter Equipment Serial No."
          placeholder="EQ1-001"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Btn variant="primary" onClick={() => onSubmit?.(serial)}>Submit</Btn>
        </div>
      </div>
    </Card>
  );
}
