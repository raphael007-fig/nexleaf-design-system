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
const TAB_LABELS = ['All', 'Monitored', 'Cataloged', 'Decommissioned'];
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
export function LabRegisterScreen({
  persona = 'lead', state = 'default', highlightId = null,
  onView, onAdd, onImport, onCrumb,
}) {
  const personaDef = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];
  const loading = state === 'loading';
  const allRows = state === 'empty' ? [] : rowsForPersona(persona);

  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [activeMetric, setActiveMetric] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Applied vs draft filters — the drawer edits a draft; Apply commits it.
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [toast, setToast] = useState(null);

  // Facility scope control — only the facilities this persona is granted.
  const scopedFacilities = LAB_FACILITIES.filter((f) => personaDef.facilities.includes(f.id));
  const [scope, setScope] = useState([]);

  const filtered = useMemo(() => allRows.filter((r) => {
    if (scope.length && !scope.includes(r.facilityId)) return false;
    if (!tabMatch(r, activeTab)) return false;
    if (activeMetric === 'monitored' && !r.monitored) return false;
    if (activeMetric === 'cataloged' && (r.monitored || r.condition === 'Decommissioned')) return false;
    if (activeMetric === 'attention' && !['Damaged / Needs repair', 'Unusable'].includes(r.condition)) return false;
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageStart = safePage * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pagedRows = filtered.slice(pageStart, pageEnd);

  const counts = TAB_LABELS.map((_, i) => allRows.filter((r) => tabMatch(r, i)).length);
  const nMonitored = allRows.filter((r) => r.monitored).length;
  const nCataloged = allRows.filter((r) => !r.monitored && r.condition !== 'Decommissioned').length;
  const nAttention = allRows.filter((r) => ['Damaged / Needs repair', 'Unusable'].includes(r.condition)).length;
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
      key: 'condition', label: 'Condition', width: 170,
      render: (r) => <Badge tone={CONDITION_TONES[r.condition] || 'default'}>{r.condition || 'Not set'}</Badge>,
    },
    {
      key: 'monitored', label: 'Monitored', width: 120,
      render: (r) => (r.monitored
        ? <Badge tone="success">Monitored</Badge>
        : <Badge>Cataloged</Badge>),
    },
    {
      key: 'device', label: 'Assigned device', width: 210,
      render: (r) => (r.device
        ? (
          <span style={{ fontSize: 12, lineHeight: '16px', color: TEXT_SUBDUED }}>
            <span style={{ display: 'block', color: TEXT_DEFAULT, fontWeight: 500 }}>{r.device.baseStation.split(' · ')[0]}</span>
            {r.device.sensors.length} sensors on this record
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
          title="Total equipment" metric={String(allRows.length)} loading={loading}
          infoTooltip={`Every lab equipment record in ${scopeLabel}. Lab equipment is counted separately from cold chain equipment.`}
          selected={activeMetric === 'total'}
          onClick={() => setActiveMetric((p) => (p === 'total' ? null : 'total'))}
        />
        <MetricCard
          title="Monitored" metric={String(nMonitored)} loading={loading}
          badge={nMonitored ? { label: 'Walk-in cold room', tone: 'success' } : undefined}
          infoTooltip={`Records with an assigned monitoring device, out of ${allRows.length} in ${scopeLabel}. V1 monitors the walk-in cold room only.`}
          selected={activeMetric === 'monitored'}
          onClick={() => setActiveMetric((p) => (p === 'monitored' ? null : 'monitored'))}
        />
        <MetricCard
          title="Cataloged (not monitored)" metric={String(nCataloged)} loading={loading}
          infoTooltip={`Register-only records — no monitoring device, out of ${allRows.length} in ${scopeLabel}.`}
          selected={activeMetric === 'cataloged'}
          onClick={() => setActiveMetric((p) => (p === 'cataloged' ? null : 'cataloged'))}
        />
        <MetricCard
          title="Needs attention" metric={String(nAttention)} loading={loading}
          badge={nAttention ? { label: 'Damaged or unusable', tone: 'warning' } : undefined}
          infoTooltip={`Records whose condition is Damaged / Needs repair or Unusable, out of ${allRows.length} in ${scopeLabel}.`}
          selected={activeMetric === 'attention'}
          onClick={() => setActiveMetric((p) => (p === 'attention' ? null : 'attention'))}
        />
      </div>

      {state === 'error' && (
        <div style={{ marginBottom: 24 }}>
          <Banner
            tone="critical"
            title="Couldn't load the lab register"
            actions={[{ label: 'Retry', onClick: () => {} }]}
          >
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
              from microscopes to the walk-in cold room. Most records are catalog-only;
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
          tabs={TAB_LABELS.map((label, i) => ({ label, badge: counts[i] }))}
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
          rowActions={[
            { label: 'View', onAction: (row) => onView?.(row.id) },
            { label: 'Edit', onAction: () => {} },
          ]}
          emptyState={{
            heading: 'No equipment matches this view',
            description: 'Data exists in your scope, but the current tab, search, or filters exclude all of it. Clear the search or reset the filters to get back.',
          }}
          footer={
            <Pagination
              type="table"
              hasPrevious={safePage > 0}
              hasNext={safePage < totalPages - 1}
              onPrevious={() => setPage((p) => Math.max(0, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              label={filtered.length === 0 ? '0 of 0' : `${pageStart + 1}–${pageEnd} of ${filtered.length}`}
            />
          }
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
            <span style={{ fontSize: 13, fontWeight: 650, color: TEXT_DEFAULT }}>Condition</span>
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
                { id: 'no', label: 'Cataloged only' },
              ]}
              value={draft.monitored}
              onChange={(id) => setDraft((d) => ({ ...d, monitored: id }))}
            />
          </div>
        </div>
      </SlideOver>

      {toast && (
        <Toast tone="success" onDismiss={() => setToast(null)}>{toast}</Toast>
      )}
    </LabShell>
  );
}
