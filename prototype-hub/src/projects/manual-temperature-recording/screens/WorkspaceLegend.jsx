import React from 'react';
// SHARED SCREEN — the workspace legend (PD-34 / PD-35).
// Two rows: TEMPERATURE (condition) and COMPLETION (recording state).
// The swatch tones come from the Badge token map so the legend and the table
// can never drift apart.
import { Badge, PolarisIconImg } from '@ds';

const TEMPERATURE = [
  { label: 'Within Range',       swatch: '#cdfee1', border: '#29845a' },
  { label: 'Above Range',        swatch: '#fedad9', border: '#e51c00' },
  { label: 'Below Range',        swatch: '#e0f0ff', border: '#0094d5' },
  { label: 'AM/PM Conditions',   split: true },
];

// Past Entry is amber and Amended is grey-dot, matching the Recording Status
// badges in the table. Raphael flagged the yellow/orange confusion on 27 Aug:
// `attention` is yellow, `warning` is orange, which is the opposite of the names.
const COMPLETION = [
  { label: 'Complete',     icon: 'CheckIcon' },
  { label: 'Morning Only', icon: 'ClockIcon' },
  { label: 'Not Started',  swatch: '#ffffff', border: '#d0d0d0' },
  { label: 'Past Entry',   tone: 'attention' },
  { label: 'Amended',      tone: 'warning' },
  { label: 'Today',        swatch: '#ffffff', border: '#005bd3' },
];

function Swatch({ item }) {
  if (item.split) {
    return (
      <span style={{ display: 'inline-flex', gap: 2 }}>
        <span style={{ width: 8, height: 14, borderRadius: '7px 0 0 7px', background: '#cdfee1' }} />
        <span style={{ width: 8, height: 14, borderRadius: '0 7px 7px 0', background: '#fedad9' }} />
      </span>
    );
  }
  if (item.icon)   return <PolarisIconImg name={item.icon} size={16} color="#616161" />;
  if (item.tone)   return <Badge tone={item.tone} size="small">{' '}</Badge>;
  return <span style={{ width: 14, height: 14, borderRadius: 4, background: item.swatch, border: '1px solid ' + item.border }} />;
}

function Row({ title, items }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.3, color: '#616161', minWidth: 96 }}>
        {title}
      </span>
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <span style={{ color: '#e3e3e3' }}>|</span>}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#303030' }}>
            <Swatch item={item} />
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function WorkspaceLegend() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Row title="TEMPERATURE:" items={TEMPERATURE} />
      <Row title="COMPLETION:"  items={COMPLETION} />
    </div>
  );
}
