import { useState } from 'react';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { BG_PAGE, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { STATE_SECTIONS } from '../../screens/states.jsx';

// Figma: section “B · BUILT-IN or 3RD PARTY” (9 desktop frames + 9 mobile twins).
// States come from the shared registry so prototype and Figma cannot drift.
const TITLES = ["Flow 2 \u00b7 Third-party device (manual)"];
const SECTIONS = STATE_SECTIONS.filter((s) => TITLES.includes(s.title));
const STATES = SECTIONS.flatMap((s) => s.states);

export default function ThirdPartyDevice() {
  const initial = new URLSearchParams(window.location.search).get('state');
  const [id, setId] = useState(STATES.some((s) => s.id === initial) ? initial : STATES[0]?.id);
  const active = STATES.find((s) => s.id === id) || STATES[0];
  if (!active) return <p style={{ padding: 24 }}>No states registered for this flow.</p>;
  return (
    <div style={{ background: BG_PAGE, minHeight: '100vh' }}>
      {/* Hub chrome — a state switcher, never product UI. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
        padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e3e3e3' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: TEXT_SUBDUED,
          textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4 }}>
          State ({STATES.length})
        </span>
        {STATES.map((s) => (
          <Btn key={s.id} small variant={s.id === id ? 'primary' : 'secondary'}
            onClick={() => setId(s.id)}>{s.label}</Btn>
        ))}
      </div>
      <main key={id}>{active.render()}</main>
    </div>
  );
}
