import { useState } from 'react';
import { TertiaryActions, TERTIARY_ACTION_MAP } from './TertiaryActions.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Patterns/Responsive/TertiaryActions',
  component: TertiaryActions,
  parameters: { layout: 'padded' },
};

const STATES = ['functional', 'faulty', 'unknown', 'decommissioning'];

function Demo({ mobile }) {
  const [last, setLast] = useState('—');
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: mobile ? 380 : 720 }}>
      <p style={{ fontSize: 13, color: '#616161', margin: 0 }}>
        Last action fired: <strong>{last}</strong>
      </p>
      {STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'capitalize' }}>
            {s} — primary: {TERTIARY_ACTION_MAP[s].primary.label}
          </span>
          <TertiaryActions state={s} mobile={mobile} onAction={(id) => setLast(`${s} → ${id}`)} />
        </div>
      ))}
    </div>
  );
}

// Mobile — two-button pattern; More opens a bottom sheet.
export const Mobile = {
  name: 'Mobile (More → bottom sheet)',
  render: () => <Demo mobile />,
};

// Desktop — More opens a popover menu.
export const Desktop = {
  name: 'Desktop (More → popover)',
  render: () => <Demo mobile={false} />,
};

// Interaction states — both controls inherit hover / pressed / focus / disabled
// from the shared Btn component, so there's nothing bespoke to force here. The
// live states (hover / pressed / focus) appear on real pointer/keyboard input;
// the only static state worth pinning in docs is `disabled`. We render the real
// rest pattern, then a disabled mirror (primary + More) built from the same Btn
// the component uses internally — kept truthful, no faked state props.
const stateCol = (label, children) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <span style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e' }}>{label}</span>
    {children}
  </div>
);

export const States = {
  name: 'Interaction states',
  render: () => {
    const [last, setLast] = useState('—');
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
        <p style={{ fontSize: 13, color: '#616161', margin: 0 }}>
          Last action fired: <strong>{last}</strong> — hover, press, and focus the buttons to see the live states they inherit from <code>Btn</code>.
        </p>

        {/* Rest — the real component; hover/press/focus are live on these buttons. */}
        {stateCol('Rest (hover / press / focus the buttons)', (
          <TertiaryActions state="functional" mobile={false} onAction={(id) => setLast(`functional → ${id}`)} />
        ))}

        {/* Disabled — the only static state; built from the same Btn pair the
            component renders, since TertiaryActions has no `disabled` prop. */}
        {stateCol('Disabled (primary + More)', (
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="primary" disabled>Edit Information</Btn>
            <Btn variant="secondary" disclosure disabled>More</Btn>
          </div>
        ))}
      </div>
    );
  },
};

// The state → action map as data.
export const Map = {
  name: 'Action map (data)',
  render: () => (
    <pre style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: '#303030', background: '#f7f7f7', padding: 16, borderRadius: 8, overflow: 'auto' }}>
      {JSON.stringify(
        Object.fromEntries(STATES.map((s) => [s, {
          primary: TERTIARY_ACTION_MAP[s].primary.label,
          more: TERTIARY_ACTION_MAP[s].more.map((a) => a.label),
        }])),
        null, 2,
      )}
    </pre>
  ),
};
