// ── Inventory ▸ Lab — the lab register list (Phase 1, §5.1) ────────────────────
// Canonical ColdTrace list pattern, cloned from ApplicationLayout Sectioned:
// breadcrumb → H1 + facility scope + Download + Add CTA → KPI row → toolbar
// (counted tabs · search + Filters + Columns) → IndexTable → pagination.
// Filters live in a right SlideOver drawer (Reset All / Apply). Records are
// entered via an explicit View action — never a whole-row click.
//
// Three-state rule (§3): loading ≠ empty ≠ out-of-scope. `loading` uses the
// components' own skeletons so no "0" chrome renders before the fetch
// resolves; out-of-scope users never reach this screen at all (the surface is
// hidden — see ModuleHomeScreen).
import { useMemo, useState } from 'react';
import { Page } from '@ds/components/Page/Page.jsx';
import { MetricCard } from '@ds/components/MetricCard/MetricCard.jsx';
import { IndexTable } from '@ds/components/IndexTable/IndexTable.jsx';
import { Pagination } from '@ds/components/Pagination/Pagination.jsx';
import { Badge } from '@ds/components/Badge/Badge.jsx';
import { Banner } from '@ds/components/Banner/Banner.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { Card } from '@ds/components/Card/Card.jsx';
import { Checkbox } from '@ds/components/Checkbox/Checkbox.jsx';
import { RadioGroup } from '@ds/components/RadioButton/RadioButton.jsx';
import { SlideOver } from '@ds/components/SlideOver/SlideOver.jsx';
import { SearchSelectButton } from '@ds/components/SearchSelect/SearchSelect.jsx';
import { Toast } from '@ds/components/Toast/Toast.jsx';
import { PolarisIconImg } from '@ds/components/PolarisIcon/PolarisIcon.jsx';
import { Illustration } from '@ds/foundation/illustrations/index.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '@ds/tokens/index.js';
import { LabShell } from './LabShell.jsx';
import {
  LAB_FACILITIES, LAB_TYPES, CONDITIONS, CONDITION_TONES, PERSONAS,
  rowsForPersona, facilityLabel, typeLabel, formatDate,
} from './labData.js';

// Table-toolbar glyphs — same icon vocabulary as ApplicationLayout Sectioned.
const IcoFilter = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path d="M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z" />
    <path d="M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
    <path d="M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
  </svg>
);
const IcoAdjust = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path fillRule="evenodd" d="M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    <path fillRule="evenodd" d="M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

const PAGE_SIZE = 10;
const TAB_LABELS = ['All', 'Monitored', 'Not monitored', 'Decommissioned'];

// What each equipment status means, said plainly on its KPI card.
// The cards read as a ladder — working, broken, unverified, retired — which is
// not the order the form offers them in.
const STATUS_CARD_ORDER = ['Functional', 'Faulty', 'Unknown', 'Decommissioned'];
const STATUS_MEANING = {
  Functional: 'Working',
  Faulty: 'Needs repair',
  Unknown: 'Needs verifying',
  Decommissioned: 'Retired',
};
const STATUS_TOOLTIP = {
  Functional: 'Records the lab has confirmed are working',
  Faulty: 'Records that need a repair',
  Unknown: 'Records nobody has verified — the honest default for an imported register',
  Decommissioned: 'Retired records, kept for audit and excluded from active counts',
};
const EMPTY_FILTERS = { facilities: [], types: [], conditions: [], monitored: 'all' };

function tabMatch(row, tabIndex) {
  if (tabIndex === 1) return row.monitored;
  if (tabIndex === 2) return !row.monitored && row.condition !== 'Decommissioned';
  if (tabIndex === 3) return row.condition === 'Decommissioned';
  return true;
}

/**
 * @param {'lead'|'tech'|'qa'} persona   Scope projection (§3).
 * @param {'default'|'loading'|'empty'|'error'} state
 * @param {string} [highlightId]  Row to highlight (return from Add, §5.2).
 * @param {(rowId:string)=>void} [onView]  View action → cold-room / record detail.
 * @param {()=>void} [onAdd]      Add equipment CTA.
 * @param {()=>void} [onImport]   Bulk import CTA.
 */
/**
 * initialToast — §5.2 return-from-Add: { text, monitorable } shows a success
 * Toast on arrival; when the added type is monitorable it carries the
 * "Set up monitoring" action (duration 0 — a toast with a button must not
 * vanish before it can be pressed).
 */
export function LabRegisterScreen({
  persona = 'lead', state = 'default', highlightId = null, initialToast = null,
  initialSearch = '',
  onView, onEdit, onAdd, onImport, onSetUpMonitoring, onCrumb,
}) {
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];
  const loading = state === 'loading';
  const allRows = state === 'empty' ? [] : rowsForPersona(persona);

  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [activeMetric, setActiveMetric] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Applied vs draft filters — the drawer edits a draft; Apply commits it.
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [toast, setToast] = useState(initialToast ? initialToast.text : null);
  const toastHasAction = Boolean(initialToast?.monitorable && toast === initialToast.text);

  // Facility scope control — only the facilities this persona is granted.
  const scopedFacilities = LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id));
  const [scope, setScope] = useState([]);

  const filtered = useMemo(() => allRows.filter((r) => {
    if (scope.length && !scope.includes(r.facilityId)) return false;
    if (!tabMatch(r, activeTab)) return false;
    if (activeMetric === 'monitored' && !r.monitored) return false;
    if (activeMetric === 'not-monitored' && (r.monitored || r.condition === 'Decommissioned')) return false;
    if (activeMetric?.startsWith('status:') && (r.condition || 'Not set') !== activeMetric.slice(7)) return false;
    if (activeMetric === 'attention' && !['Faulty', 'Unknown'].includes(r.condition)) return false;
    if (filters.facilities.length && !filters.facilities.includes(r.facilityId)) return false;
    if (filters.types.length && !filters.types.includes(r.type)) return false;
    if (filters.conditions.length && !filters.conditions.includes(r.condition)) return false;
    if (filters.monitored === 'yes' && !r.monitored) return false;
    if (filters.monitored === 'no' && r.monitored) return false;
    const q = search.trim().toLowerCase();
    if (q && ![r.assetTag, r.name, r.make, r.model, r.location, facilityLabel(r.facilityId), typeLabel(r.type)]
      .some((v) => String(v || '').toLowerCase().includes(q))) return false;
    return true;
  }), [allRows, scope, activeTab, activeMetric, filters, search]);

  // The KPI row counts the CURRENT scope — facility scope plus the active tab
  // (Raf, 2026-09-07: "track changes ... based on monitored or unmonitored") —
  // but ignores the KPI cards' own selection, so clicking one can't collapse
  // the row it lives in.
  const kpiRows = useMemo(() => allRows.filter((r) => {
    if (scope.length && !scope.includes(r.facilityId)) return false;
    return tabMatch(r, activeTab);
  }), [allRows, scope, activeTab]);

  // A week ago: whatever the status was before any change inside the window.
  const WEEK_MS = 7 * 86400000;
  const statusLastWeek = (r) => (r.conditionChangedAt
    && Date.now() - new Date(r.conditionChangedAt).getTime() <= WEEK_MS
    ? (r.previousCondition || r.condition)
    : r.condition);
  const countNow = (c) => kpiRows.filter((r) => (r.condition || 'Not set') === c).length;
  const countThen = (c) => kpiRows.filter((r) => (statusLastWeek(r) || 'Not set') === c).length;
  // ── KPI pill definition ───────────────────────────────────────────────────
  // A pill says what changed in the last week, in words rather than a bare
  // signed number: "+2" next to Faulty is ambiguous, and a green minus sign
  // reads as an error. So:
  //   no movement            → "No change", neutral
  //   movement the lab wants → "N fewer than last week" / "N more…", success
  //   movement it does not   → the same wording, critical
  // Which direction is wanted depends on the card: MORE Functional is good,
  // FEWER Faulty / Unknown / Decommissioned is good.
  const deltaPill = (delta, moreIsBetter) => {
    if (!delta) return { label: 'No change', tone: 'default' };
    const words = `${Math.abs(delta)} ${delta > 0 ? 'more' : 'fewer'} than last week`;
    const wanted = moreIsBetter ? delta > 0 : delta < 0;
    return { label: words, tone: wanted ? 'success' : 'critical' };
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pagedRows = filtered.slice(pageStart, pageEnd);

  // No data chrome before the fetch resolves (§3): while loading or errored,
  // tab counts, KPI numbers and pagination must not show live-looking values.
  const showData = !loading && state !== 'error';
  // Tab counts and KPI counts read the SAME set — the facility scope — so the
  // numbers on screen always add up against each other (Raf, 2026-09-07).
  const scopedRows = useMemo(
    () => allRows.filter((r) => !scope.length || scope.includes(r.facilityId)),
    [allRows, scope],
  );
  const counts = TAB_LABELS.map((_, i) => scopedRows.filter((r) => tabMatch(r, i)).length);
  const nMonitored = scopedRows.filter((r) => r.monitored).length;
  const nNotMonitored = scopedRows.filter((r) => !r.monitored && r.condition !== 'Decommissioned').length;
  const nAttention = scopedRows.filter((r) => ['Faulty', 'Unknown'].includes(r.condition)).length;
  const scopeLabel = personaDef.facilities.length > 1
    ? `all ${personaDef.facilities.length} NPHL facilities`
    : facilityLabel(personaDef.facilities[0]);

  const filterCount =
    filters.facilities.length + filters.types.length + filters.conditions.length
    + (filters.monitored !== 'all' ? 1 : 0);

  const columns = [
    // Asset tag is the primary identifier (§2) — the lab's own ID, never a raw
    // machine id. Serial is secondary and often absent.
    {
      key: 'assetTag', label: 'Asset tag', width: 200, primary: true,
      render: (r) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 550 }}>
          {r.assetTag}
          {r.id === highlightId && <Badge tone="info" size="small">Just added</Badge>}
        </span>
      ),
    },
    { key: 'type', label: 'Type', width: 150, render: (r) => typeLabel(r.type) },
    { key: 'name', label: 'Name', width: 200, subtitle: true },
    { key: 'makeModel', label: 'Make / Model', width: 190, render: (r) => `${r.make} ${r.model}` },
    { key: 'facility', label: 'Facility', width: 200, render: (r) => facilityLabel(r.facilityId) },
    { key: 'location', label: 'Location / room', width: 170 },
    {
      key: 'condition', label: 'Equipment status', width: 170,
      render: (r) => <Badge tone={CONDITION_TONES[r.condition] || 'default'}>{r.condition || 'Not set'}</Badge>,
    },
    {
      // The badge is the door (Raf, 2026-09-07): Monitored opens the monitored
      // record — chart, sensors, alarms; Not monitored opens the register
      // record. Same destinations as View, one click closer.
      key: 'monitored', label: 'Monitored', width: 120,
      render: (r) => (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onView?.(r.id); }}
          aria-label={r.monitored
            ? `Open the monitored record for ${r.assetTag}`
            : `Open the register record for ${r.assetTag}`}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
        >
          {r.monitored
            ? <Badge tone="success">Monitored</Badge>
            : <Badge>Not monitored</Badge>}
        </button>
      ),
    },
    {
      key: 'device', label: 'Assigned device', width: 210,
      render: (r) => (r.device
        ? (
          <span style={{ fontSize: 12, lineHeight: '16px', color: TEXT_SUBDUED }}>
            <span style={{ display: 'block', color: TEXT_DEFAULT, fontWeight: 500 }}>{r.device.baseStation.split(' · ')[0]}</span>
            {r.device.sensors.length} {r.device.sensors.length === 1 ? 'sensor' : 'sensors'} on this record
          </span>
        )
        : '—'),
    },
  ];

  const emptyInScope = !loading && state !== 'error' && allRows.length === 0;

  return (
    <LabShell level="secondary" onCrumb={onCrumb}>
      <Page
        title="Lab Equipment"
        subtitle={`National Public Health Lab · scoped to ${scopeLabel} (${personaDef.grant})`}
        loading={loading}
        secondaryActions={[
          {
            node: (
              <SearchSelectButton
                label="Facility"
                placeholder="All facilities in scope"
                leadingIcon={<PolarisIconImg name="LocationIcon" size={16} color="currentColor" />}
                options={scopedFacilities}
                value={scope}
                onChange={setScope}
                multiple
              />
            ),
          },
          { content: 'Download', onClick: () => setToast('Register export started — you will get a link when it is ready.') },
          ...(onImport && personaDef.canInstall ? [{ content: 'Import from spreadsheet', onClick: onImport }] : []),
        ]}
        primaryAction={personaDef.canInstall ? { content: 'Add equipment', onClick: onAdd } : undefined}
      />

      {/* KPI row — every card states its denominator (the persona's scope). */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
        gap: 12, marginBottom: 24,
      }}>
        <MetricCard
          title="Total equipment" metric={showData ? String(kpiRows.length) : '—'} loading={loading}
          badge={showData ? deltaPill(kpiRows.length - kpiRows.length, true) : undefined}
          infoTooltip={`Every lab equipment record in ${scopeLabel}${activeTab ? ` on the ${TAB_LABELS[activeTab]} tab` : ''}. Lab equipment is counted separately from cold chain equipment.`}
          selected={activeMetric === 'total'}
          onClick={() => setActiveMetric((p) => (p === 'total' ? null : 'total'))}
        />
        {/* The rest of the row is the EQUIPMENT STATUS split (Raf, 2026-09-07)
            — monitored vs not is the tab row and the Monitored column, so the
            cards are spent on the condition the lab acts on. Each pill is the
            week-on-week change within the scope the cards are counting, so
            switching to Monitored or Not monitored re-reads both. */}
        {STATUS_CARD_ORDER.map((c) => {
          const n = countNow(c);
          // Fewer Faulty/Unknown/Decommissioned is good news; fewer Functional is not.
          const delta = n - countThen(c);
          return (
            <MetricCard
              key={c}
              title={c}
              metric={showData ? String(n) : '—'}
              loading={loading}
              badge={showData ? deltaPill(delta, c === 'Functional') : undefined}
              infoTooltip={`${STATUS_TOOLTIP[c]} — out of ${kpiRows.length} records in ${scopeLabel}${activeTab ? ` on the ${TAB_LABELS[activeTab]} tab` : ''}.`}
              selected={activeMetric === `status:${c}`}
              onClick={() => setActiveMetric((p) => (p === `status:${c}` ? null : `status:${c}`))}
            />
          );
        })}
      </div>

      {state === 'error' && (
        <div style={{ marginBottom: 24 }}>
          {/* inCard everywhere (Raf, 2026-09-03) — never the titled variant. */}
          <Banner tone="critical" inCard actions={[{ label: 'Retry', onClick: () => {} }]}>
            <span style={{ display: 'block', fontWeight: 650 }}>Couldn't load the lab register</span>
            The request failed before any records arrived. Check connectivity and retry —
            nothing has been changed.
          </Banner>
        </div>
      )}

      {emptyInScope ? (
        // Empty-in-scope ≠ out-of-scope: data simply doesn't exist yet, so the
        // screen says what this register is and offers both ways to fill it.
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 16px', textAlign: 'center' }}>
            <Illustration name="equipment-management" size={96} />
            <div style={{ fontSize: 15, fontWeight: 650, color: TEXT_DEFAULT }}>
              No lab equipment registered yet
            </div>
            <p style={{ margin: 0, maxWidth: 440, fontSize: 13, lineHeight: '20px', color: TEXT_SUBDUED }}>
              This register holds everything {personaDef.facilities.length > 1 ? 'the NPHL labs own' : `${scopeLabel} owns`} —
              from microscopes to the walk-in cold room. Most records are not monitored;
              monitoring is set up separately for equipment that supports it.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {personaDef.canInstall && <Btn variant="primary" onClick={onAdd}>Add your first equipment</Btn>}
              {personaDef.canInstall && <Btn variant="secondary" onClick={onImport}>Import from spreadsheet</Btn>}
            </div>
          </div>
        </Card>
      ) : state === 'error' ? null : (
        <IndexTable
          columns={columns}
          rows={pagedRows}
          loading={loading}
          selectedRows={selected}
          onSelectionChange={setSelected}
          tabs={TAB_LABELS.map((label, i) => ({ label, badge: showData ? counts[i] : undefined }))}
          activeTab={activeTab}
          onTabChange={(i) => { setActiveTab(i); setPage(0); setSelected(new Set()); }}
          searchValue={search}
          onSearchChange={(e) => { setSearch(e.target.value); setPage(0); }}
          searchPlaceholder="Search asset tag, name, make, location…"
          toolbarActions={[
            {
              label: filterCount ? `Filters (${filterCount})` : 'Filters',
              icon: <IcoFilter size={16} />,
              onClick: () => { setDraft(filters); setDrawerOpen(true); },
            },
            { label: 'Columns', icon: <IcoAdjust size={16} />, onClick: () => {} },
          ]}
          bulkActions={[{ label: 'Export', onAction: () => {} }]}
          rowActions={personaDef.canInstall
            // Read-only scopes get View only — actions are removed with the
            // permission, not rendered dead.
            ? [
              { label: 'View', onAction: (row) => onView?.(row.id) },
              { label: 'Edit', onAction: (row) => onEdit?.(row.id) },
            ]
            : [{ label: 'View', onAction: (row) => onView?.(row.id) }]}
          emptyState={{
            heading: 'No equipment matches this view',
            description: 'Data exists in your scope, but the current tab, search, or filters exclude all of it. Clear the search or reset the filters to get back.',
          }}
          footer={showData ? (
            <Pagination
              type="table"
              hasPrevious={safePage > 0}
              hasNext={safePage < totalPages - 1}
              onPrevious={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              label={filtered.length === 0 ? '0 of 0' : `${pageStart + 1}–${pageEnd} of ${filtered.length}`}
            />
          ) : undefined}
        />
      )}

      {/* Right-drawer filters — Reset All / Apply, per the canonical pattern. */}
      <SlideOver
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filters"
        width={400}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, width: '100%' }}>
            <Btn variant="tertiary" onClick={() => setDraft(EMPTY_FILTERS)}>Reset All</Btn>
            <Btn variant="primary" onClick={() => { setFilters(draft); setPage(0); setDrawerOpen(false); }}>Apply</Btn>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Facility</span>
            {scopedFacilities.map((f) => (
              <Checkbox
                key={f.id}
                label={f.label}
                checked={draft.facilities.includes(f.id)}
                onChange={(v) => setDraft((d) => ({
                  ...d,
                  facilities: v ? [...d.facilities, f.id] : d.facilities.filter((x) => x !== f.id),
                }))}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Type</span>
            {LAB_TYPES.map((t) => (
              <Checkbox
                key={t.id}
                label={t.label}
                checked={draft.types.includes(t.id)}
                onChange={(v) => setDraft((d) => ({
                  ...d,
                  types: v ? [...d.types, t.id] : d.types.filter((x) => x !== t.id),
                }))}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Equipment status</span>
            {CONDITIONS.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={draft.conditions.includes(c)}
                onChange={(v) => setDraft((d) => ({
                  ...d,
                  conditions: v ? [...d.conditions, c] : d.conditions.filter((x) => x !== c),
                }))}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Monitored</span>
            <RadioGroup
              name="monitored-filter"
              options={[
                { id: 'all', label: 'All' },
                { id: 'yes', label: 'Monitored only' },
                { id: 'no', label: 'Not monitored' },
              ]}
              value={draft.monitored}
              onChange={(id) => setDraft((d) => ({ ...d, monitored: id }))}
            />
          </div>
        </div>
      </SlideOver>

      {toast && (
        <Toast
          tone="success"
          onDismiss={() => setToast(null)}
          duration={toastHasAction ? 0 : undefined}
          actions={toastHasAction ? [{ label: 'Set up monitoring', onClick: onSetUpMonitoring }] : undefined}
        >
          {toast}
        </Toast>
      )}
    </LabShell>
  );
}
