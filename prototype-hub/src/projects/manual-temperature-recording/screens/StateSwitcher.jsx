import React from 'react';
// SHARED — the state picker every flow in this module uses (PD-39).
// Each Figma state frame has exactly one entry here, keyed by the same id, so
// prototype-figma-parity can diff the two sets by id.
//
// Prototype chrome, not product UI: it sits above the app shell so it never
// affects the layout under test. The buttons are still DS `Btn` rather than raw
// elements (ds-components-only is binding even for tooling).
import { Btn } from '@ds';

export default function StateSwitcher({ states = [], value, onChange, section }) {
  const current = states.find((s) => s.id === value) || states[0];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 900,
      background: '#f1f1f1', borderBottom: '1px solid #e3e3e3',
      padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
    }}>
      <span style={{ font: '600 11px/16px Inter, sans-serif', letterSpacing: 0.4, color: '#616161' }}>
        {section}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
        {states.map((s) => (
          <Btn
            key={s.id}
            size="small"
            variant={s.id === value ? 'primary' : 'secondary'}
            onClick={() => onChange(s.id)}
            ariaLabel={s.id + ': ' + s.title}
          >
            {s.id}
          </Btn>
        ))}
      </div>
      {current && (
        <span style={{ font: '400 12px/18px Inter, sans-serif', color: '#303030' }}>{current.title}</span>
      )}
    </div>
  );
}
