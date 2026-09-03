// Hub chrome — a state switcher, never product UI. Same recipe as the
// add-equipment prototypes: filter the shared registry by section title so the
// prototype and the (future) Figma board reference identical state ids.
// Deep-linkable: ?state=<id> opens a specific state.
import { useState } from 'react';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { BG_PAGE, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { STATE_SECTIONS } from './states.jsx';

export function StateSwitcher({ titles }) {
  const sections = STATE_SECTIONS.filter((s) => titles.includes(s.title));
  const states = sections.flatMap((s) => s.states);
  const initial = new URLSearchParams(window.location.search).get('state');
  const [id, setId] = useState(states.some((s) => s.id === initial) ? initial : states[0]?.id);
  const active = states.find((s) => s.id === id) || states[0];
  if (!active) return <p style={{ padding: 24 }}>No states registered for this flow.</p>;
  return (
    <div style={{ background: BG_PAGE, minHeight: '100vh' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
        padding: '10px 16px', background: '#fff', borderBottom: '1px solid #e3e3e3',
      }}>
        <span style={{
          fontSize: 12, fontWeight: 600, color: TEXT_SUBDUED,
          textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4,
        }}>
          State ({states.length})
        </span>
        {states.map((s) => (
          <Btn key={s.id} small variant={s.id === id ? 'primary' : 'secondary'} onClick={() => setId(s.id)}>
            {s.label}
          </Btn>
        ))}
      </div>
      <main key={id}>{active.render()}</main>
    </div>
  );
}
