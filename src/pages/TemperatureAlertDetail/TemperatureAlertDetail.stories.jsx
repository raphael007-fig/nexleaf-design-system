import { Banner } from '../../components/Banner/Banner.jsx';
import { Badge } from '../../components/Badge/Badge.jsx';
import { Btn, ButtonGroup } from '../../components/Btn/Btn.jsx';
import { MetricCard } from '../../components/MetricCard/MetricCard.jsx';
import { Accordion } from '../../components/Accordion/Accordion.jsx';
import { Skeleton } from '../../components/Skeleton/Skeleton.jsx';
import {
  BG_PAGE, BG_SURFACE, TEXT_DEFAULT, TEXT_SUBDUED, TEXT_PLACEHOLDER,
  BORDER_LIGHTER, COLOR_PRIMARY, COLOR_CRITICAL, COLOR_SUCCESS, COLOR_MORNING,
  BG_INFO, TEXT_INFO, BORDER_INFO, BG_HOVER,
} from '../../tokens/index.js';

// ─── Page pattern: Temperature Alert Detail ───────────────────────────────────
// The Action Required → alarm-investigation tertiary page inside Temperature
// Monitoring (Event → Investigation → Decision → Action). This is a PATTERN
// story — a composition of existing components (Banner, Badge, Btn, MetricCard,
// Accordion, Skeleton + the Card edge-shadow surface), not a new component.
// The interactive flow lives in the Temperature Recording prototype (Prototype F).

export default {
  title: 'Pages/Temperature Alert Detail',
  parameters: { layout: 'fullscreen' },
};

// Card edge-shadow surface (same recipe as Card / Cell / NavCard)
const CARD_SHADOW = '0 1px 0 rgba(26,26,26,0.07), inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)';
const SECTION = { background: BG_SURFACE, borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: CARD_SHADOW, boxSizing: 'border-box' };

function Section({ title, titleRight, children }) {
  return (
    <div style={SECTION}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 650, color: TEXT_DEFAULT }}>{title}</span>
          {titleRight}
        </div>
      )}
      {children}
    </div>
  );
}
function KV({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13, lineHeight: '20px' }}>
      <span style={{ color: TEXT_SUBDUED, flexShrink: 0 }}>{label}</span>
      <span style={{ color: TEXT_DEFAULT, fontWeight: 550, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ─── Temperature history chart (inline SVG; band + auto line + manual dots) ───
function TempChart({ points = [], manual = [], min = 2, max = 8, alertFrac, truncated }) {
  const all = [...points.map(p => p.temp), ...manual.map(m => m.temp), min, max];
  const yMin = Math.floor(Math.min(...all)) - 2, yMax = Math.ceil(Math.max(...all)) + 2;
  const W = 640, H = 210, L = 38, R = 14, T = 14, B = 26;
  const x = f => L + f * (W - L - R);
  const y = t => T + (1 - (t - yMin) / (yMax - yMin)) * (H - T - B);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.frac).toFixed(1)},${y(p.temp).toFixed(1)}`).join(' ');
  const last = points[points.length - 1];
  const lastOut = last && (last.temp > max || last.temp < min);
  const ticks = [yMin, min, max, yMax].filter((v, i, a) => a.indexOf(v) === i);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Temperature history">
      <rect x={L} y={y(max)} width={W - L - R} height={y(min) - y(max)} fill={BG_INFO} stroke={BORDER_INFO} strokeDasharray="3 3" />
      {ticks.map(t => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={BORDER_LIGHTER} />
          <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">{t}°</text>
        </g>
      ))}
      {alertFrac != null && (
        <g>
          <line x1={x(alertFrac)} x2={x(alertFrac)} y1={T} y2={H - B} stroke={COLOR_CRITICAL} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={x(alertFrac)} y={T - 3} textAnchor="middle" fontSize="10" fontWeight="600" fill={COLOR_CRITICAL} fontFamily="Inter">Alert</text>
        </g>
      )}
      {truncated && last && (
        <g>
          <rect x={x(last.frac)} y={T} width={x(1) - x(last.frac)} height={H - T - B} fill={BG_HOVER} opacity="0.6" />
          <text x={(x(last.frac) + x(1)) / 2} y={(T + H - B) / 2} textAnchor="middle" fontSize="10" fontWeight="600" fill={TEXT_SUBDUED} fontFamily="Inter">No data</text>
        </g>
      )}
      {points.length > 0 && <path d={line} fill="none" stroke={COLOR_PRIMARY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}
      {manual.map((m, i) => (
        <g key={i} transform={`translate(${x(m.frac)},${y(m.temp)})`}>
          <rect x="-4.5" y="-4.5" width="9" height="9" transform="rotate(45)" fill={COLOR_MORNING} stroke={BG_SURFACE} strokeWidth="1.5" />
        </g>
      ))}
      {last && !truncated && <circle cx={x(last.frac)} cy={y(last.temp)} r="4.5" fill={lastOut ? COLOR_CRITICAL : COLOR_SUCCESS} stroke={BG_SURFACE} strokeWidth="1.5" />}
      <text x={L} y={H - 8} fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">−6 hours</text>
      <text x={W - R} y={H - 8} textAnchor="end" fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">Now</text>
    </svg>
  );
}
function ChartLegend({ hasManual, hasAuto = true }) {
  const Item = ({ swatch, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: TEXT_SUBDUED }}>{swatch}{label}</span>
  );
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {hasAuto && <Item swatch={<span style={{ width: 16, height: 2, background: COLOR_PRIMARY, display: 'inline-block', borderRadius: 1 }} />} label="RTMD (automatic)" />}
      {hasManual && <Item swatch={<span style={{ width: 8, height: 8, background: COLOR_MORNING, display: 'inline-block', transform: 'rotate(45deg)' }} />} label="Manual reading" />}
      <Item swatch={<span style={{ width: 14, height: 10, background: BG_INFO, border: `1px dashed ${BORDER_INFO}`, display: 'inline-block' }} />} label="Acceptable range" />
      <Item swatch={<span style={{ width: 2, height: 12, background: COLOR_CRITICAL, display: 'inline-block' }} />} label="Alert start" />
    </div>
  );
}

// ─── Fixture data ──────────────────────────────────────────────────────────────
const jit = (i, a = 0.5) => Math.sin(i * 3.7) * a;
const gen = (n, fn) => Array.from({ length: n }, (_, i) => { const f = i / (n - 1); return { frac: f, temp: +fn(f, i).toFixed(1) }; });
const HIGH_SERIES = gen(25, (f, i) => (f < 0.48 ? 4.8 + jit(i) : 4.9 + ((f - 0.48) / 0.52) * 7.9));
const LOW_SERIES = gen(25, (f, i) => (f < 0.4 ? 3.6 + jit(i, 0.4) : 3.4 - ((f - 0.4) / 0.6) * 4.2));
const NORMAL_SERIES = gen(25, (f, i) => (f < 0.25 ? 5 + jit(i, 0.4) : f < 0.5 ? 5.2 + ((f - 0.25) / 0.25) * 5.2 : f < 0.75 ? 10.4 - ((f - 0.5) / 0.25) * 5.4 : 5 + jit(i, 0.3)));
const OFFLINE_SERIES = gen(25, (f, i) => (f < 0.35 ? 5.4 + jit(i, 0.4) : 5.6 + ((f - 0.35) / 0.65) * 3.8)).filter(p => p.frac <= 0.7);

const EQUIP = { name: 'Incubator HC 1501', make: 'Heraeus', model: 'HC 1501', serial: 'HC-1501-2023-001', type: 'Incubator', facility: 'Main Laboratory' };
const DEVICE = { deviceId: 'RTMD-7841', sensor: 'Sensor 1 — Cabinet', lastSync: '2 minutes ago', battery: '78%', signal: 'Good' };

const TIMELINE = [
  { tone: COLOR_MORNING, text: 'Manual reading recorded: 11.9°C by Juma Mwangi', at: 'Jul 23, 1:16 PM' },
  { tone: COLOR_PRIMARY, text: 'SMS notification sent to facility staff', at: 'Jul 23, 11:21 AM' },
  { tone: COLOR_CRITICAL, text: 'Alert AL-2026-0341 created — severity Critical', at: 'Jul 23, 11:20 AM' },
  { tone: COLOR_CRITICAL, text: 'Temperature crossed the maximum threshold (8°C)', at: 'Jul 23, 11:19 AM' },
];
const CHECKS = [
  'Confirm the equipment door is fully closed and the seal is intact',
  'Verify the power supply and any voltage regulator',
  'Inspect the temperature shown on the equipment display',
  'Compare a manual reading with the RTMD reading',
  'Check sensor placement inside the cabinet',
  'Review recent power or connectivity interruptions',
];

// ─── The page composition ──────────────────────────────────────────────────────
function AlertDetailPage({
  title = 'Temperature exceeds threshold',
  severity = 'Critical',
  state = 'active', // 'active' | 'normal' | 'unknown'
  equip = EQUIP,
  device = DEVICE,
  deviceOnline = true,
  manualOnly = false,
  current = { temp: '12.8°C', range: '2°C – 8°C', deviation: '+4.8°C', deviationSub: '4.8°C above maximum', lastReading: 'Last reading 2 minutes ago', out: true },
  banners = [],
  chart = { points: HIGH_SERIES, manual: [], alertFrac: 0.55 },
  chartEmpty = false,
  chartError = false,
  timeline = TIMELINE,
  actionBanner = null,
  actions,
  maxWidth = 960,
}) {
  const stateBadge = state === 'active'
    ? <Badge tone="critical">Active</Badge>
    : state === 'normal'
      ? <Badge tone="success">Returned to normal</Badge>
      : <Badge tone="warning">Unable to confirm</Badge>;
  const sevBadge = <Badge tone={severity === 'Critical' ? 'critical' : 'warning'}>{severity}</Badge>;

  return (
    <div style={{ minHeight: '100vh', background: BG_PAGE, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth, margin: '0 auto', padding: '20px 20px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 550, color: COLOR_PRIMARY, padding: 0 }}>‹ Back to Action Required</button>
        </div>

        {/* 1 — Alert header */}
        <Section>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: state === 'normal' ? '#cdfee1' : state === 'unknown' ? '#fff3cd' : '#fde2e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M3 13a7 7 0 1 1 14 0" stroke={state === 'normal' ? '#0c5132' : state === 'unknown' ? '#856404' : COLOR_CRITICAL} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 13l3.2-4" stroke={state === 'normal' ? '#0c5132' : state === 'unknown' ? '#856404' : COLOR_CRITICAL} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="13" r="1.4" fill={state === 'normal' ? '#0c5132' : state === 'unknown' ? '#856404' : COLOR_CRITICAL} />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: TEXT_DEFAULT, lineHeight: '26px' }}>{title}</h1>
                {sevBadge}{stateBadge}
              </div>
              <div style={{ fontSize: 13, color: TEXT_SUBDUED, marginTop: 4, lineHeight: '20px' }}>
                <span style={{ fontWeight: 650, color: TEXT_DEFAULT }}>{equip.name}</span>{' · '}S/N: {equip.serial}{' · '}{equip.facility}
              </div>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 10, fontSize: 12, color: TEXT_SUBDUED }}>
                <span><b style={{ color: TEXT_DEFAULT }}>Started:</b> Jul 23, 11:19 AM</span>
                <span><b style={{ color: TEXT_DEFAULT }}>Duration:</b> 3h 12m {state === 'normal' ? '(resolved)' : '(ongoing)'}</span>
                <span><b style={{ color: TEXT_DEFAULT }}>Last updated:</b> 2 minutes ago</span>
                <span><b style={{ color: TEXT_DEFAULT }}>Alert ID:</b> AL-2026-0341</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 2 — Current condition */}
        <Section title="Current Condition"
          titleRight={<span style={{ fontSize: 12, color: TEXT_SUBDUED }}>Source: <span style={{ fontWeight: 600, color: TEXT_INFO }}>{manualOnly ? 'Manual temperature recording' : 'Nexleaf RTMD'}</span></span>}>
          {banners.map((b, i) => <Banner key={i} tone={b.tone} title={b.title} inCard>{b.body}</Banner>)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
            <MetricCard title={state === 'unknown' ? 'Last Known Temperature' : 'Current Temperature'} metric={current.temp}
              badge={{ label: current.out ? 'Out of range' : 'In range', tone: current.out ? 'critical' : 'success' }} />
            <MetricCard title="Acceptable Range" metric={current.range} />
            <MetricCard title="Deviation" metric={current.deviation}
              badge={{ label: current.deviationSub, tone: current.out ? 'critical' : 'success' }} />
          </div>
          <div style={{ fontSize: 12, color: TEXT_SUBDUED }}>{current.lastReading}</div>
        </Section>

        {/* 3 — Temperature history */}
        <Section title="Temperature History"
          titleRight={
            <div style={{ display: 'flex', gap: 6 }}>
              {['6 hours', '24 hours', '7 days'].map((r, i) => (
                <span key={r} style={{ padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: i === 0 ? TEXT_DEFAULT : BG_HOVER, color: i === 0 ? BG_SURFACE : TEXT_SUBDUED }}>{r}</span>
              ))}
            </div>
          }>
          {chartError ? (
            <Banner tone="critical" title="Couldn't load temperature history" inCard
              actions={[{ label: 'Retry', onClick: () => {} }]}>
              The data request failed — check connectivity and try again.
            </Banner>
          ) : chartEmpty ? (
            <div style={{ padding: '28px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT, marginBottom: 4 }}>No historical readings available</div>
              <div style={{ fontSize: 13, color: TEXT_SUBDUED, lineHeight: '20px' }}>This equipment has no recorded readings for this period yet. Record a manual temperature to start building history.</div>
            </div>
          ) : (
            <>
              <TempChart {...chart} />
              <ChartLegend hasAuto={chart.points.length > 0} hasManual={chart.manual.length > 0} />
            </>
          )}
        </Section>

        {/* 4 — Alert timeline */}
        <Section title="Alert Timeline">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {timeline.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < timeline.length - 1 ? `1px solid ${BORDER_LIGHTER}` : 'none' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: e.tone, flexShrink: 0, marginTop: 5 }} />
                <span style={{ flex: 1, fontSize: 13, color: TEXT_DEFAULT, lineHeight: '20px' }}>{e.text}</span>
                <span style={{ fontSize: 12, color: TEXT_SUBDUED, whiteSpace: 'nowrap', flexShrink: 0, lineHeight: '20px' }}>{e.at}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 5 — Equipment & monitoring context (borrowed from Inventory / owned by Temp Monitoring) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
          <Section title="Equipment" titleRight={<Badge tone="success">Functional</Badge>}>
            <KV label="Manufacturer" value={equip.make} />
            <KV label="Model" value={equip.model} />
            <KV label="Serial Number" value={equip.serial} />
            <KV label="Type" value={equip.type} />
            <KV label="Facility" value={equip.facility} />
            <Btn variant="secondary">View Equipment</Btn>
          </Section>
          <Section title="Monitoring Device"
            titleRight={manualOnly ? <Badge>Manual</Badge> : <Badge tone={deviceOnline ? 'success' : 'critical'}>{deviceOnline ? 'Online' : 'Offline'}</Badge>}>
            <KV label="Monitoring Type" value={manualOnly ? 'Manual temperature recording' : 'Nexleaf RTMD'} />
            {manualOnly ? (
              <>
                <KV label="Schedule" value="Morning & Evening readings" />
                <KV label="Last Manual Reading" value="9.1°C · Jul 23, 8:34 AM" />
                <KV label="Recorded By" value="Juma Mwangi" />
                <div style={{ fontSize: 12, color: TEXT_SUBDUED }}>No RTMD installed on this equipment.</div>
              </>
            ) : (
              <>
                <KV label="Device ID" value={device.deviceId} />
                <KV label="Sensor" value={device.sensor} />
                <KV label="Last Sync" value={device.lastSync} />
                <KV label="Battery" value={device.battery} />
                <KV label="Signal" value={device.signal} />
                <Btn variant="secondary">View RTMD / Monitoring Device</Btn>
              </>
            )}
          </Section>
        </div>

        {/* 6 — Troubleshooting guidance */}
        <Accordion title="Recommended Checks" open onToggle={() => {}}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHECKS.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <circle cx="8" cy="8" r="7" stroke={COLOR_PRIMARY} strokeWidth="1.3" />
                  <path d="M5 8.2l2 2 4-4.5" stroke={COLOR_PRIMARY} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 13, color: TEXT_DEFAULT, lineHeight: '20px' }}>{c}</span>
              </div>
            ))}
            <div style={{ fontSize: 12, color: TEXT_SUBDUED }}>These are recommended checks based on the alert state — they are not a diagnosis.</div>
          </div>
        </Accordion>

        {/* 7 — Actions (state-driven) */}
        <Section title="Actions">
          {actionBanner}
          <ButtonGroup>
            {actions || (
              <>
                <Btn variant="primary">Create Service Request</Btn>
                <Btn variant="secondary">Record Manual Temperature</Btn>
                <Btn variant="secondary">Return to Action Required</Btn>
              </>
            )}
          </ButtonGroup>
        </Section>
      </div>
    </div>
  );
}

// ─── Stories: the 14 required states ──────────────────────────────────────────

export const ActiveHighTemperature = () => <AlertDetailPage />;

export const ActiveLowTemperature = () => (
  <AlertDetailPage
    title="Temperature below threshold"
    equip={{ name: 'MK 114 Vaccine Refrigerator', make: 'Vestfrost', model: 'MK 114', serial: 'CCE-2024-MK114-002', type: 'Vaccine Refrigerator', facility: 'Pumwani Maternity Hospital' }}
    device={{ deviceId: 'RTMD-6512', sensor: 'Sensor 1 — Cabinet', lastSync: '4 minutes ago', battery: '91%', signal: 'Good' }}
    current={{ temp: '-0.6°C', range: '2°C – 8°C', deviation: '−2.6°C', deviationSub: '2.6°C below minimum', lastReading: 'Last reading 4 minutes ago', out: true }}
    chart={{ points: LOW_SERIES, manual: [], alertFrac: 0.62 }}
    timeline={TIMELINE.slice(1)}
  />
);

export const ReturnedToNormal = () => (
  <AlertDetailPage
    state="normal" severity="Warning"
    current={{ temp: '5.2°C', range: '2°C – 8°C', deviation: 'In range', deviationSub: 'Within acceptable range', lastReading: 'Last reading 11 minutes ago', out: false }}
    chart={{ points: NORMAL_SERIES, manual: [], alertFrac: 0.33 }}
    timeline={[{ tone: COLOR_SUCCESS, text: 'Temperature returned to normal range (2–8°C)', at: 'Jul 23, 11:50 AM' }, ...TIMELINE.slice(1)]}
    actions={(
      <>
        <Btn variant="primary">Review Temperature History</Btn>
        <Btn variant="secondary">View Equipment</Btn>
        <Btn variant="secondary">Create Service Request</Btn>
      </>
    )}
  />
);

export const RtmdOffline = () => (
  <AlertDetailPage
    state="unknown"
    deviceOnline={false}
    device={{ deviceId: 'RTMD-4090', sensor: 'Sensor 1 — Cabinet', lastSync: '46 minutes ago', battery: '12%', signal: 'No signal' }}
    current={{ temp: '9.4°C', range: '2°C – 8°C', deviation: '+1.4°C', deviationSub: '1.4°C above maximum', lastReading: 'Last reading 46 minutes ago · Sync failed', out: true }}
    banners={[{ tone: 'warning', title: 'Current temperature unavailable', body: 'The RTMD has not synced for 46 minutes. The values below are the last known readings — record a manual temperature to confirm the current condition.' }]}
    chart={{ points: OFFLINE_SERIES, manual: [], alertFrac: 0.55, truncated: true }}
    timeline={[{ tone: COLOR_MORNING, text: 'RTMD stopped syncing — last reading 9.4°C', at: 'Jul 23, 1:57 PM' }, ...TIMELINE.slice(1)]}
  />
);

export const ManualOnlyEquipment = () => (
  <AlertDetailPage
    severity="Warning" manualOnly
    equip={{ name: 'Dometic TCW 4000 AC', make: 'Dometic', model: 'TCW 4000 AC', serial: 'CCE-2024-PMH-011', type: 'Vaccine Refrigerator', facility: 'Pumwani Maternity Hospital' }}
    current={{ temp: '9.1°C', range: '2°C – 8°C', deviation: '+1.1°C', deviationSub: '1.1°C above maximum', lastReading: 'Last reading Jul 23, 8:34 AM · Next reading: Morning (manual)', out: true }}
    banners={[{ tone: 'info', body: 'This equipment is monitored by manual temperature recording — there is no RTMD installed. The reading shown is the most recent manual entry by Juma Mwangi.' }]}
    chart={{ points: [], manual: [{ frac: 0.84, temp: 9.1 }], alertFrac: null }}
    timeline={[{ tone: COLOR_MORNING, text: 'Manual reading recorded: 9.1°C by Juma Mwangi', at: 'Jul 23, 8:34 AM' }, ...TIMELINE.slice(1)]}
  />
);

export const AutomaticAndManualReadings = () => (
  <AlertDetailPage chart={{ points: HIGH_SERIES, manual: [{ frac: 0.62, temp: 11.9 }], alertFrac: 0.55 }} />
);

export const ManualReadingAdded = () => (
  <AlertDetailPage
    chart={{ points: HIGH_SERIES, manual: [{ frac: 0.62, temp: 11.9 }, { frac: 0.985, temp: 11.6 }], alertFrac: 0.55 }}
    timeline={[{ tone: COLOR_MORNING, text: 'Manual reading recorded: 11.6°C by Juma Mwangi', at: 'Jul 23, 2:40 PM' }, ...TIMELINE]}
    actionBanner={<Banner tone="success" inCard>Morning temperature recorded — added to this alert's history.</Banner>}
  />
);

export const ServiceRequestCreated = () => (
  <AlertDetailPage
    timeline={[{ tone: '#6366F1', text: 'Service request created (SR-2026-0142) — referencing alert AL-2026-0341', at: 'Jul 23, 2:41 PM' }, ...TIMELINE]}
    actionBanner={<Banner tone="success" inCard>Service request <b>SR-2026-0142</b> was created for this alert and is awaiting a technician.</Banner>}
    actions={(
      <>
        <Btn variant="primary">Record Manual Temperature</Btn>
        <Btn variant="secondary">View Service Request</Btn>
        <Btn variant="secondary">Return to Action Required</Btn>
      </>
    )}
  />
);

export const NoHistoricalReadings = () => (
  <AlertDetailPage
    severity="Warning" manualOnly chartEmpty
    equip={{ name: 'Dometic TCW 4000 AC', make: 'Dometic', model: 'TCW 4000 AC', serial: 'CCE-2024-PMH-011', type: 'Vaccine Refrigerator', facility: 'Pumwani Maternity Hospital' }}
    current={{ temp: '9.1°C', range: '2°C – 8°C', deviation: '+1.1°C', deviationSub: '1.1°C above maximum', lastReading: 'Last reading Jul 23, 8:34 AM', out: true }}
    timeline={TIMELINE.slice(1)}
  />
);

export const LoadingState = () => (
  <div style={{ minHeight: '100vh', background: BG_PAGE, fontFamily: 'Inter, sans-serif' }}>
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton width={220} height={16} />
      <div style={SECTION}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Skeleton width={44} height={44} radius="50%" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton width="45%" height={18} />
            <Skeleton width="70%" height={13} />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
        <MetricCard loading /><MetricCard loading /><MetricCard loading />
      </div>
      <div style={{ ...SECTION, height: 240, alignItems: 'stretch' }}>
        <Skeleton width={160} height={14} />
        <Skeleton width="100%" height={170} />
      </div>
      <div style={{ textAlign: 'center', fontSize: 13, color: TEXT_SUBDUED }}>Loading alert data…</div>
    </div>
  </div>
);

export const DataFetchError = () => <AlertDetailPage chartError />;

export const StaleReadingWarning = () => (
  <AlertDetailPage
    banners={[{ tone: 'warning', title: 'Stale reading', body: 'The latest reading is 46 minutes old — data may not reflect the current condition.' }]}
    current={{ temp: '12.8°C', range: '2°C – 8°C', deviation: '+4.8°C', deviationSub: '4.8°C above maximum', lastReading: 'Last reading 46 minutes ago', out: true }}
  />
);

export const MobileLayout = () => (
  <div style={{ maxWidth: 375, margin: '0 auto', boxShadow: `0 0 0 1px ${BORDER_LIGHTER}` }}>
    <AlertDetailPage maxWidth={375} />
  </div>
);

export const DesktopLayout = () => <AlertDetailPage maxWidth={1080} />;
