import { useState } from 'react';
import { OptionCard } from './OptionCard.jsx';
import {
  BG_INFO, BG_SURFACE, COLOR_PRIMARY, COLOR_SUCCESS_FILLED, COLOR_CRITICAL_STRONG,
} from '../../tokens/index.js';

export default {
  title: 'Components/Lists/OptionCard',
  component: OptionCard,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 588 }}><Story /></div>],
};

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </div>
    {children}
  </div>
);

// Demo illustration — a monitored screen with a status badge (inline SVG).
const IlloMonitor = ({ badge = 'check', size = 64 }) => {
  const badgeFill = badge === 'check' ? COLOR_SUCCESS_FILLED
    : badge === 'signal' ? COLOR_PRIMARY
      : COLOR_CRITICAL_STRONG;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="44" height="30" rx="4" fill={BG_INFO} stroke={COLOR_PRIMARY} strokeWidth="2.5" />
      <path d="M15 32c3-6 6-6 9 0s6 6 9 0 6-6 9 0" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 42v7" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 52h20" stroke={COLOR_PRIMARY} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="16" r="11" fill={badgeFill} stroke={BG_SURFACE} strokeWidth="2.5" />
      {badge === 'check' && <path d="m45.5 16.2 3 3 5-5.5" stroke={BG_SURFACE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
      {badge === 'signal' && (<>
        <path d="M46 18.5a6 6 0 0 1 8 0" stroke={BG_SURFACE} strokeWidth="2" strokeLinecap="round" />
        <path d="M47.8 15.6a3.6 3.6 0 0 1 4.4 0" stroke={BG_SURFACE} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="20.4" r="1.4" fill={BG_SURFACE} />
      </>)}
      {badge === 'cross' && <path d="m46.5 12.5 7 7m0-7-7 7" stroke={BG_SURFACE} strokeWidth="2.5" strokeLinecap="round" />}
    </svg>
  );
};

const OPTIONS = [
  { id: 'rtmd', badge: 'check', title: 'Monitored Equipment by Nexleaf', description: 'A Nexleaf remote temperature monitoring device is (or will be) installed on this equipment. Data uploads automatically.' },
  { id: 'external', badge: 'signal', title: 'Built in or 3rd Party Device', description: 'The equipment has its own logger or display e.g. a built-in Haier logger or a Berlinger Fridge-tag. We’ll check whether it can be connected.' },
  { id: 'none', badge: 'cross', title: 'Unmonitored Equipment', description: 'No device records this equipment’s temperature. Temperatures will be recorded manually with a thermometer.' },
];

// ─── Interactive group ────────────────────────────────────────────
export const Interactive = {
  render: () => {
    const [value, setValue] = useState(null);
    return (
      <div role="radiogroup" aria-label="How is this equipment's temperature monitored?" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.id}
            media={<IlloMonitor badge={o.badge} />}
            title={o.title}
            description={o.description}
            selected={value === o.id}
            onSelect={() => setValue(o.id)}
          />
        ))}
      </div>
    );
  },
};

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Row label="Rest">
        <OptionCard media={<IlloMonitor badge="check" />} title={OPTIONS[0].title} description={OPTIONS[0].description} />
      </Row>
      <Row label="Selected">
        <OptionCard media={<IlloMonitor badge="signal" />} title={OPTIONS[1].title} description={OPTIONS[1].description} selected />
      </Row>
      <Row label="Disabled">
        <OptionCard media={<IlloMonitor badge="cross" />} title={OPTIONS[2].title} description={OPTIONS[2].description} disabled />
      </Row>
      <Row label="No media">
        <OptionCard title="Text-only option" description="OptionCard works without an illustration too." />
      </Row>
    </div>
  ),
};
