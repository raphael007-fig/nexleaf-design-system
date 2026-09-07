// ── Cold-room record — monitoring detail (Phase 3, §5.5) ───────────────────────
// Tertiary detail page. The temperature surface uses the real charting library
// ColdTrace ships with — amCharts 5 (see ./TempChart.jsx) — with the threshold
// band coming from the equipment's own configuration and every colour from DS
// tokens. All N sensors live on this ONE record (D2): a segmented selector
// switches the plot between sensors and the aggregate.
import { useState, useRef } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import {
  Card, CardSectionTitle, CardField,
  CardLayoutType3, CardLayoutType4, CardLayoutType5,
} from '@ds/components/Card/Card.jsx';
import { Popover } from '@ds/components/Popover/Popover.jsx';
import { OptionList } from '@ds/components/OptionList/OptionList.jsx';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { SearchSelect } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Tag } from '@ds/components/Tag/Tag.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { MetricCard } from '@ds/components/MetricCard/MetricCard.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Tabs } from '@ds/components/Tabs/Tabs.jsx';
import { Cell } from '@ds/components/Cell/Cell.jsx';
import { Divider } from '@ds/components/Divider/Divider.jsx';
import { Skeleton, SkeletonGroup } from '@ds/components/Skeleton/Skeleton.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import { TempChart, ChartLegend } from './TempChart.jsx';
import {
  LAB_EQUIPMENT, facilityLabel, CONTACT_DIRECTORY, MAX_ALARM_CONTACTS, formatDate,
} from './labData.js';

// Right-rail field icons — the DS location/contact cards (CardLayoutType3/4) put
// a 20px muted icon beside every label, so the hand-composed cards in the same
// rail carry them too. Same size and color as the DS originals.
const RailIcon = ({ name }) => <PolarisIconImg name={name} size={20} color="#616161" />;

const COLD_ROOM = LAB_EQUIPMENT.find((r) => r.id === 'ccs-wicr-001');
const TRAIL = [{ id: 'record', label: COLD_ROOM.assetTag }];

// Static stand-in image for the linked code QR-70021 (an asset, not UI — the
// card itself is the DS CardLayoutType5). Deterministic pattern, no network.
const QR_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84">
  <rect width="84" height="84" fill="#fff"/>
  <g fill="#303030">
    <path d="M8 8h20v20H8zm4 4v12h12V12z"/><rect x="14" y="14" width="8" height="8"/>
    <path d="M56 8h20v20H56zm4 4v12h12V12z"/><rect x="62" y="14" width="8" height="8"/>
    <path d="M8 56h20v20H8zm4 4v12h12V60z"/><rect x="14" y="62" width="8" height="8"/>
    ${[[34, 8], [42, 12], [34, 20], [46, 24], [38, 30], [8, 34], [16, 38], [28, 34], [36, 38], [48, 34], [60, 38], [72, 34], [12, 46], [24, 44], [34, 48], [44, 44], [56, 48], [68, 44], [76, 50], [34, 58], [44, 60], [56, 58], [64, 64], [72, 60], [36, 68], [46, 70], [58, 68], [70, 72], [34, 76], [50, 76]]
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="6"/>`).join('')}
  </g>
</svg>`)}`;

// WICR thresholds — from the equipment type's config (2–8 °C), never entered.
const T_MIN = 2;
const T_MAX = 8;

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
export function ColdRoomDetailScreen({ state = 'default', onBack, onCrumb, onEdit }) {
  const [sensorId, setSensorId] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  // Alarm contacts live in state so Manage contacts can actually change them —
  // the card's count and rows read from here, never from a hardcoded label.
  const [contacts, setContacts] = useState(['c1', 'c2']);
  const [contactsOpen, setContactsOpen] = useState(false);
  const actionsRef = useRef(null);
  const sensorsRef = useRef(null);
  const loading = state === 'loading';
  const sensors = COLD_ROOM.device.sensors;
  const atCap = contacts.length >= MAX_ALARM_CONTACTS;

  // Header Actions menu — every item lands somewhere real: Edit routes to the
  // shared add/edit form, the other two scroll to the sensors surface where
  // Manage and View Region Config live.
  const ACTION_OPTIONS = [
    { id: 'edit', label: 'Edit record' },
    { id: 'sensors', label: 'Manage sensors' },
    { id: 'region', label: 'View region config' },
  ];
  const onAction = (id) => {
    setMenuOpen(false);
    if (id === 'edit') onEdit?.(COLD_ROOM.id);
    else sensorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const series = sensorId === 'all' ? AGG : (SERIES[sensorId] || AGG);
  const truncated = state === 'partial' && sensorId === 'sensor-b';
  const shownSeries = truncated ? series.filter((p) => p.frac <= 0.75) : series;
  const current = LAST(shownSeries);
  const out = current < T_MIN || current > T_MAX;
  const isAmbient = sensorId === 'sensor-d';

  return (
    <LabShell level="tertiary" trail={TRAIL} onCrumb={onCrumb}>
      <div ref={actionsRef}>
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
          secondaryActions={[{ content: 'Actions', disclosure: true, onClick: () => setMenuOpen((v) => !v) }]}
        />
      </div>
      <Popover
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={actionsRef}
        placement="bottom-end"
        minWidth={220}
        ariaLabel="Record actions"
      >
        <OptionList
          flush
          dense
          options={ACTION_OPTIONS}
          onChange={onAction}
          ariaLabel="Record actions"
        />
      </Popover>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        {/* ── Main column ── */}
        <div style={{ flex: '3 1 420px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {state === 'partial' && (
            <Banner tone="warning" inCard>
              <span style={{ display: 'block', fontWeight: 650 }}>Sensor B has not reported for 6 hours</span>
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
              <Banner tone="critical" inCard actions={[{ label: 'Retry', onClick: () => {} }]}>
                <span style={{ display: 'block', fontWeight: 650 }}>Couldn't load temperature history</span>
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
            <div ref={sensorsRef} />
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
          {/* DS Location card (CardLayoutType3) — region + facility link + map,
              per the EquipmentDetail canonical. Room stays on the Record card. */}
          <CardLayoutType3
            region="National Public Health Lab"
            facilityName={facilityLabel(COLD_ROOM.facilityId)}
            facilityHref="#"
            mapLat={-1.3005}
            mapLon={36.8065}
          />
          <Card>
            <CardSectionTitle title="Record" />
            <CardField icon={<RailIcon name="BarcodeIcon" />} label="Asset tag" value={COLD_ROOM.assetTag} />
            <CardField icon={<RailIcon name="HashtagIcon" />} label="Serial" value={COLD_ROOM.serial || '—'} />
            <CardField icon={<RailIcon name="WrenchIcon" />} label="Condition" value={COLD_ROOM.condition} />
            <CardField icon={<RailIcon name="PinIcon" />} label="Location / room" value={COLD_ROOM.location} />
            <CardField icon={<RailIcon name="CalendarIcon" />} label="Acquired" value={formatDate(COLD_ROOM.acquired)} />
          </Card>
          {/* DS QR card (CardLayoutType5) — QR-70021 was linked during the install
              (F-flow, required); the card renders it scannable with the modal
              preview. Contact card (CardLayoutType4) carries the record's
              primary alarm contact. */}
          <CardLayoutType5 title="QR Code" qrCodeSrc={QR_SRC} />
          <CardLayoutType4
            addedBy={CONTACT_DIRECTORY[0].name}
            contactNumber={CONTACT_DIRECTORY[0].phone}
          />
          <Card>
            <CardSectionTitle title="Monitoring device" />
            <CardField icon={<RailIcon name="MediaReceiverIcon" />} label="Base station" value={COLD_ROOM.device.baseStation} />
            <CardField icon={<RailIcon name="WifiIcon" />} label="Sensors" value={`${sensors.length} on this record`} />
            <CardField icon={<RailIcon name="GaugeIcon" />} label="Thresholds" value="2–8 °C · Walk-in Cold Room config" />
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <CardSectionTitle title="Alarm contacts" />
              <Badge size="small">{`${contacts.length} of ${MAX_ALARM_CONTACTS}`}</Badge>
            </div>
            {contacts.map((id) => {
              const c = CONTACT_DIRECTORY.find((x) => x.id === id);
              return c ? (
                <CardField
                  key={id}
                  icon={<RailIcon name="PersonIcon" />}
                  label={c.name}
                  value={`${c.phone} · ${c.occupation}`}
                />
              ) : null;
            })}
            <Btn variant="tertiary" small onClick={() => setContactsOpen(true)}>Manage contacts</Btn>
          </Card>
        </div>
      </div>

      {/* Manage contacts — the same directory search and added-contact rows as
          the install flow's step 1, in a Modal so the record page never leaves
          the screen. The D4 hard cap of 5 is enforced here too: at the cap the
          search collapses to the cap notice, so adding is never silently
          blocked. */}
      <Modal
        open={contactsOpen}
        onClose={() => setContactsOpen(false)}
        title={`Alarm contacts · ${contacts.length} of ${MAX_ALARM_CONTACTS}`}
        size="large"
        footer={(
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Btn variant="primary" onClick={() => setContactsOpen(false)}>Done</Btn>
          </div>
        )}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
            These people are called when {COLD_ROOM.name} goes out of range
            (2–8 °C, from the Walk-in Cold Room configuration). Contacts come from
            the facility's shared directory.
          </p>

          {atCap ? (
            <Banner tone="warning" inCard>
              <span style={{ display: 'block', fontWeight: 650 }}>
                Contact limit reached ({MAX_ALARM_CONTACTS} of {MAX_ALARM_CONTACTS})
              </span>
              A facility can hold {MAX_ALARM_CONTACTS} RTMD alarm contacts. Remove a
              contact to add someone — the limit is enforced by the platform.
            </Banner>
          ) : (
            <SearchSelect
              label="Add a contact"
              placeholder="Search the facility directory…"
              options={CONTACT_DIRECTORY
                .filter((c) => !contacts.includes(c.id))
                .map((c) => ({ id: c.id, label: `${c.name} · ${c.phone} · ${c.occupation}` }))}
              value=""
              onChange={(v) => {
                const id = v && v.target ? v.target.value : v;
                if (id) setContacts((cs) => (cs.includes(id) || cs.length >= MAX_ALARM_CONTACTS ? cs : [...cs, id]));
              }}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>
              On this record
            </span>
            {contacts.length === 0 ? (
              <Banner tone="critical" inCard>
                <span style={{ display: 'block', fontWeight: 650 }}>No alarm contacts</span>
                An excursion here would alert nobody. Add at least one contact.
              </Banner>
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {contacts.map((id) => {
                  const c = CONTACT_DIRECTORY.find((x) => x.id === id);
                  return (
                    <Tag
                      key={id}
                      label={c ? `${c.name} · ${c.phone}` : id}
                      removable
                      onRemove={() => setContacts((cs) => cs.filter((x) => x !== id))}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </LabShell>
  );
}
