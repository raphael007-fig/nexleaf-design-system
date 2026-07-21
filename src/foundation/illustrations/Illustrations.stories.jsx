// ── Foundation / Illustrations — the hub gallery ─────────────────────────────
// Every illustration in the design system, rendered from the ONE catalog in
// src/foundation/illustrations/. If artwork isn't in this gallery, it isn't in
// the system — add the .svg + a catalog entry, and it shows up here.

import { ILLUSTRATIONS, Illustration } from './index.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '../../tokens/index.js';

export default {
  title: 'Foundation/Illustrations',
  parameters: { layout: 'padded' },
};

const CARD_SHADOW = [
  '0 1px 0 rgba(26,26,26,0.07)',
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');

export const AllIllustrations = {
  name: 'All Illustrations',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, color: TEXT_DEFAULT }}>Illustrations</h1>
      <p style={{ margin: '0 0 24px', fontSize: 14, color: TEXT_SUBDUED, maxWidth: 720 }}>
        All spot artwork lives in <code>src/foundation/illustrations/</code> and every surface
        pulls from it — use <code>&lt;Illustration name="…" size /&gt;</code> or import the raw
        SVG from the hub. {Object.keys(ILLUSTRATIONS).length} illustrations.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {Object.entries(ILLUSTRATIONS).map(([id, entry]) => (
          <div key={id} style={{
            background: '#ffffff', borderRadius: 8, boxShadow: CARD_SHADOW,
            padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          }}>
            <Illustration name={id} size={80} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>{entry.title}</div>
              <code style={{ fontSize: 11, color: TEXT_SUBDUED }}>{id}</code>
              <div style={{ fontSize: 11, lineHeight: '16px', color: TEXT_SUBDUED, marginTop: 6 }}>{entry.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// The three monitoring-type illustrations side by side at their native 64px —
// the Add Equipment "How is this equipment's temperature monitored?" choices.
export const MonitoringStatusSet = {
  name: 'Monitoring status set',
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'Inter, sans-serif' }}>
      {['monitored', 'connect-monitor', 'not-monitored'].map((id) => (
        <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Illustration name={id} size={64} />
          <code style={{ fontSize: 12, color: TEXT_SUBDUED }}>{id}</code>
        </div>
      ))}
    </div>
  ),
};
