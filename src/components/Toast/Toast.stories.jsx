import { useState } from 'react';
import { Toast } from './Toast.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Overlays/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif', minHeight: 220 }}><Story /></div>],
};

// ─── Interactive ──────────────────────────────────────────────────
export const Interactive = {
  render: () => {
    const [notice, setNotice] = useState(null);
    return (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Btn variant="secondary" onClick={() => setNotice({ tone: 'success', message: 'EQ1-001 is already registered. Its record opens here for temperature recording.' })}>
          Success toast
        </Btn>
        <Btn variant="secondary" onClick={() => setNotice({ tone: 'warning', message: 'A facility can have at most 10 alarm contacts. Remove one to add someone else.' })}>
          Warning toast
        </Btn>
        <Btn variant="secondary" onClick={() => setNotice({ tone: 'critical', message: 'The connection service is not responding. Try again in a few minutes.' })}>
          Critical toast
        </Btn>
        {notice && (
          <Toast tone={notice.tone} onDismiss={() => setNotice(null)}>
            {notice.message}
          </Toast>
        )}
      </div>
    );
  },
};

// ─── Placements (persistent, for review) ─────────────────────────
export const Placements = {
  render: () => (
    <>
      <Toast tone="info" duration={0} placement="top-right" onDismiss={() => {}}>
        top-right (default)
      </Toast>
      <Toast tone="success" duration={0} placement="bottom-center" onDismiss={() => {}}>
        bottom-center
      </Toast>
    </>
  ),
};
