// ── Cold-room record — monitoring detail (Phase 3, §5.5) ───────────────────────
// Tertiary detail page. The temperature surface CLONES the house chart pattern
// from Pages/Temperature Alert Detail (TempChart: inline SVG, threshold band
// from the equipment's own config, token colors) — no new chart library, no
// new visual language. All N sensors live on this ONE record (D2): a segmented
// selector switches the plot between sensors and the aggregate.
import { useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { Card, CardSectionTitle, CardField } from '@ds/components/Card/Card.jsx';
import { MetricCard } from '@ds/components/MetricCard/MetricCard.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Tabs } from '@ds/components/Tabs/Tabs.jsx';
import { Cell } from '@ds/components/Cell/Cell.jsx';
import { Divider } from '@ds/components/Divider/Divider.jsx';
import { Skeleton, SkeletonGroup } from '@ds/components/Skeleton/Skeleton.jsx';
import {
  BG_SURFACE, BG_INFO, BG_HOVER, BORDER_INFO, BORDER_LIGHTER,
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_PLACEHOLDER,
  COLOR_PRIMARY, COLOR_CRITICAL, COLOR_SUCCESS,
} from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import { LAB_EQUIPMENT, facilityLabel, CONTACT_DIRECTORY, formatDate } from './labData.js';

const COLD_ROOM = LAB_EQUIPMENT.find((r) => r.id === 'ccs-wicr-001');
const TRAIL = [{ id: 'record', label: COLD_ROOM.assetTag }];

// WICR thresholds — from the equipment type's config (2–8 °C), never entered.
const T_MIN = 2;
const T_MAX = 8;

// ── TempChart — cloned from Pages/Temperature Alert Detail ────────────────────
function TempChart({ points = [], min = T_MIN, max = T_MAX, truncated }) {
  const all = [...points.map((p) => p.temp), min, max];
  const yMin = Math.floor(Math.min(...all)) - 2;
  const yMax = Math.ceil(Math.max(...all)) + 2;
  const W = 640; const H = 210; const L = 38; const R = 14; const T = 14; const B = 26;
  const x = (f) => L + f * (W - L - R);
  const y = (t) => T + (1 - (t - yMin) / (yMax - yMin)) * (H - T - B);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.frac).toFixed(1)},${y(p.temp).toFixed(1)}`).join(' ');
  const last = points[points.length - 1];
  const lastOut = last && (last.temp > max || last.temp < min);
  const ticks = [yMin, min, max, yMax].filter((v, i, a) => a.indexOf(v) === i);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Temperature history">
      <rect x={L} y={y(max)} width={W - L - R} height={y(min) - y(max)} fill={BG_INFO} stroke={BORDER_INFO} strokeDasharray="3 3" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke={BORDER_LIGHTER} />
          <text x={L - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">{t}°</text>
        </g>
      ))}
      {truncated && last && (
        <g>
          <rect x={x(last.frac)} y={T} width={x(1) - x(last.frac)} height={H - T - B} fill={BG_HOVER} opacity="0.6" />
          <text x={(x(last.frac) + x(1)) / 2} y={(T + H - B) / 2} textAnchor="middle" fontSize="10" fontWeight="600" fill={TEXT_SUBDUED} fontFamily="Inter">No data</text>
        </g>
      )}
      {points.length > 0 && <path d={line} fill="none" stroke={COLOR_PRIMARY} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}
      {last && !truncated && <circle cx={x(last.frac)} cy={y(last.temp)} r="4.5" fill={lastOut ? COLOR_CRITICAL : COLOR_SUCCESS} stroke={BG_SURFACE} strokeWidth="1.5" />}
      <text x={L} y={H - 8} fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">−24 hours</text>
      <text x={W - R} y={H - 8} textAnchor="end" fontSize="10" fill={TEXT_PLACEHOLDER} fontFamily="Inter">Now</text>
    </svg>
  );
}

function ChartLegend() {
  const Item = ({ swatch, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: TEXT_SUBDUED }}>{swatch}{label}</span>
  );
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Item swatch={<span style={{ width: 16, height: 2, background: COLOR_PRIMARY, display: 'inline-block', borderRadius: 1 }} />} label="Sensor reading (RTMD)" />
      <Item swatch={<span style={{ width: 14, height: 10, background: BG_INFO, border: `1px dashed ${BORDER_INFO}`, display: 'inline-block' }} />} label="Acceptable range 2–8 °C" />
    </div>
  );
}

// ── Deterministic per-sensor series (24 h, in range; sensor C drifts warm) ────
const jit = (i, a = 0.4) => Math.sin(i * 3.7) * a;
const gen = (n, fn) => Array.from({ length: n }, (_, i) => {
  const f = i / (n - 1);
  return { frac: f, temp: +fn(f, i).toFixed(1) };
});
const SERIES = {
  'sensor-a': gen(25, (f, i) => 4.4 + jit(i)),
  'sensor-b': gen(25, (f, i) => 5.1 + jit(i, 0.3)),
  'sensor-c': gen(25, (f, i) => (f < 0.7 ? 5.6 + jit(i, 0.5) : 5.8 + (f - 0.7) * 5)), // near-door creep
  'sensor-d': gen(25, (f, i) => 21.5 + jit(i, 0.8)), // ambient, outside the band on purpose
};
const AGG = gen(25, (f, i) => (4.4 + 5.1 + (f < 0.7 ? 5.6 : 5.8 + (f - 0.7) * 5)) / 3 + jit(i, 0.2));
const LAST = (s) => s[s.length - 1].temp;

const STATS = {
  uptime: '99.2%', inRange: '97.4%',
  // Last 24 h — must agree with the drawn series (sensor C creeps toward 8 °C
  // near the door but stays inside the band).
  below: '0h 0m below 2 °C', above: '0h 0m above 8 °C',
};

/**
 * @param {'default'|'loading'|'partial'|'no-readings'|'chart-error'} state
 *   'partial' — sensor B offline for 6 h (very common in cold-chain data).
 */
export function ColdRoomDetailScreen({ state = 'default', onBack, onCrumb }) {
  const [sensorId, setSensorId] = useState('all');
  const loading = state === 'loading';
  const sensors = COLD_ROOM.device.sensors;

  const series = sensorId === 'all' ? AGG : (SERIES[sensorId] || AGG);
  const truncated = state === 'partial' && sensorId === 'sensor-b';
  const shownSeries = truncated ? series.filter((p) => p.frac <= 0.75) : series;
  const current = LAST(shownSeries);
  const out = current < T_MIN || current > T_MAX;
  const isAmbient = sensorId === 'sensor-d';

  return (
    <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
      <Page
        flushTop
        loading={loading}
        title={COLD_ROOM.name}
        subtitle={`${COLD_ROOM.assetTag} · ${COLD_ROOM.make} ${COLD_ROOM.model} · ${facilityLabel(COLD_ROOM.facilityId)}`}
        backAction={{ onClick: onBack, ariaLabel: 'Back to Lab Equipment' }}
        metadata={[
          { label: 'Monitored', tone: 'success' },
          { label: COLD_ROOM.condition, tone: 'success' },
        ]}
        secondaryActions={[{ content: 'Actions', disclosure: true, onClick: () => {} }]}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        {/* ── Main column ── */}
        <div style={{ flex: '3 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {state === 'partial' && (
            <Banner tone="warning" title="Sensor B has not reported for 6 hours">
              The other sensors are reporting normally, so the cold room is still covered.
              Check Sensor B's placement and cable — its last reading was at 07:12 today.
            </Banner>
          )}

          {/* Current condition — per selected sensor, denominator on the face. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 12 }}>
            <MetricCard
              loading={loading}
              title={sensorId === 'all' ? 'Current (sensor average)' : `Current — ${sensors.find((s) => s.id === sensorId)?.label}`}
              metric={state === 'no-readings' ? '—' : `${current.toFixed(1)} °C`}
              badge={state === 'no-readings' ? undefined : {
                label: isAmbient ? 'Ambient — not banded' : out ? 'Out of range' : 'In range',
                tone: isAmbient ? 'info' : out ? 'critical' : 'success',
              }}
              infoTooltip="Latest reading from the selected sensor. The average covers the three in-room sensors; the ambient sensor is excluded."
            />
            <MetricCard loading={loading} title="Acceptable range" metric="2–8 °C"
              infoTooltip="From the Walk-in Cold Room configuration — WHO-derived, admin-managed (D5). Not set per install." />
            <MetricCard loading={loading} title="Uptime (7 days)" metric={state === 'no-readings' ? '—' : STATS.uptime}
              infoTooltip="Share of expected uploads received across all sensors on this record, last 7 days." />
            <MetricCard loading={loading} title="Time in range (7 days)" metric={state === 'no-readings' ? '—' : STATS.inRange}
              infoTooltip="Share of in-room readings inside 2–8 °C, last 7 days. Ambient readings are excluded." />
          </div>

          {/* Temperature history — the Equipment Plot surface for this record. */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <CardSectionTitle title="Temperature history — last 24 hours" />
              <Tabs
                ariaLabel="Sensor selector"
                tabs={[
                  { label: 'All (avg)' },
                  ...sensors.map((s) => ({ label: s.label.replace(' (ambient)', ' · amb') })),
                ]}
                activeIndex={sensorId === 'all' ? 0 : sensors.findIndex((s) => s.id === sensorId) + 1}
                onSelect={(i) => setSensorId(i === 0 ? 'all' : sensors[i - 1].id)}
              />
            </div>
            {loading ? (
              <SkeletonGroup label="Loading temperature history">
                <Skeleton width="100%" height={210} />
              </SkeletonGroup>
            ) : state === 'chart-error' ? (
              <Banner tone="critical" title="Couldn't load temperature history" inCard
                actions={[{ label: 'Retry', onClick: () => {} }]}>
                The data request failed — the record and its sensors are unaffected.
              </Banner>
            ) : state === 'no-readings' ? (
              <div style={{ padding: '28px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT, marginBottom: 4 }}>No readings yet</div>
                <div style={{ fontSize: 13, color: TEXT_SUBDUED, lineHeight: '20px' }}>
                  Monitoring was set up moments ago. The first upload usually arrives within
                  an hour — check back, or confirm the base station has signal.
                </div>
              </div>
            ) : (
              <>
                <TempChart points={shownSeries} truncated={truncated} />
                <ChartLegend />
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 12, color: TEXT_SUBDUED }}>
                  <span><b style={{ color: TEXT_DEFAULT }}>{STATS.below}</b></span>
                  <span><b style={{ color: TEXT_DEFAULT }}>{STATS.above}</b></span>
                  <span>Denominator: in-room sensors A–C, last 24 h</span>
                </div>
              </>
            )}
          </Card>

          {/* Sensors on this ONE record — the D2 model made visible. */}
          <Card>
            <CardSectionTitle title={`Sensors on this record · ${sensors.length}`} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sensors.map((s, i) => {
                const sSeries = SERIES[s.id];
                const sTemp = LAST(sSeries);
                const offline = state === 'partial' && s.id === 'sensor-b';
                const ambient = s.id === 'sensor-d';
                return (
                  <div key={s.id}>
                    {i > 0 && <Divider />}
                    <Cell
                      title={s.label}
                      description={`${s.placement} · ${offline ? 'last reported 07:12 today' : state === 'no-readings' ? 'no readings yet' : `${sTemp.toFixed(1)} °C, 2 min ago`}`}
                      badge={offline
                        ? <Badge tone="warning">Not reporting</Badge>
                        : state === 'no-readings'
                          ? <Badge tone="info">Awaiting first upload</Badge>
                          : ambient
                            ? <Badge tone="info">Ambient</Badge>
                            : <Badge tone="success">In range</Badge>}
                      onClick={() => setSensorId(s.id)}
                      ariaLabel={`Show ${s.label} on the chart`}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Right rail — small single-purpose cards ── */}
        <div style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CardSectionTitle title="Facility" />
            <CardField label="Facility" value={facilityLabel(COLD_ROOM.facilityId)} />
            <CardField label="Region" value="National Public Health Lab" />
            <CardField label="Location" value={COLD_ROOM.location} />
          </Card>
          <Card>
            <CardSectionTitle title="Record" />
            <CardField label="Asset tag" value={COLD_ROOM.assetTag} />
            <CardField label="Serial" value={COLD_ROOM.serial || '—'} />
            <CardField label="Condition" value={COLD_ROOM.condition} />
            <CardField label="Acquired" value={formatDate(COLD_ROOM.acquired)} />
          </Card>
          <Card>
            <CardSectionTitle title="Monitoring device" />
            <CardField label="Base station" value={COLD_ROOM.device.baseStation} />
            <CardField label="Sensors" value={`${sensors.length} on this record`} />
            <CardField label="Thresholds" value="2–8 °C · Walk-in Cold Room config" />
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <CardSectionTitle title="Alarm contacts" />
              <Badge size="small">{`2 of 5`}</Badge>
            </div>
            {CONTACT_DIRECTORY.slice(0, 2).map((c) => (
              <CardField key={c.id} label={c.name} value={`${c.phone} · ${c.occupation}`} />
            ))}
            <Btn variant="tertiary" small onClick={() => {}}>Manage contacts</Btn>
          </Card>
        </div>
      </div>
    </LabShell>
  );
}
