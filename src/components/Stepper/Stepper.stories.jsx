import { useState } from 'react';
import { Stepper } from './Stepper.jsx';

export default {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif' }}><Story /></div>],
};

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </div>
    {children}
  </div>
);

const PHASES = [
  { label: 'Select RTMD' },
  { label: 'Configure RTMD' },
  { label: 'Facility & Sensors' },
  { label: 'Equipment Details' },
  { label: 'Review & Submit' },
];

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 960 }}>
      <Row label="First step active">
        <Stepper phases={PHASES} activeIndex={0} />
      </Row>
      <Row label="Mid-flow — completed · active · upcoming">
        <Stepper phases={PHASES} activeIndex={2} />
      </Row>
      <Row label="Last step active">
        <Stepper phases={PHASES} activeIndex={4} />
      </Row>
      <Row label="Two phases only">
        <Stepper phases={PHASES.slice(3)} activeIndex={0} />
      </Row>
    </div>
  ),
};

// ─── Interactive — tap visited steps ─────────────────────────────
export const Interactive = {
  render: () => {
    const [active, setActive] = useState(2);
    const [furthest, setFurthest] = useState(2);
    const go = (i) => { setActive(i); setFurthest((f) => Math.max(f, i)); };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 960 }}>
        <Stepper
          phases={PHASES}
          activeIndex={active}
          navigable={PHASES.map((_, i) => i <= furthest)}
          onSelect={go}
        />
        <p style={{ margin: 0, fontSize: 13, color: '#616161' }}>
          Visited steps show the hover pill and are tappable — backward or forward again — without losing
          state. Unvisited steps stay inert. Use Next to unlock further phases:
        </p>
        <button
          onClick={() => go(Math.min(active + 1, PHASES.length - 1))}
          style={{ alignSelf: 'flex-start', font: 'inherit', fontSize: 13, padding: '6px 12px', borderRadius: 8, border: '1px solid #c9c9c9', background: '#fff', cursor: 'pointer' }}
        >
          Next step
        </button>
      </div>
    );
  },
};

// ─── Compact (mobile) ─────────────────────────────────────────────
export const Compact = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 360 }}>
      <Row label="Compact — circles + summary line">
        <Stepper phases={PHASES} activeIndex={2} compact navigable={[true, true, false, false, false]} onSelect={() => {}} />
      </Row>
      <Row label="Compact — first step">
        <Stepper phases={PHASES} activeIndex={0} compact />
      </Row>
    </div>
  ),
};
