import { useState, useEffect } from 'react';
import { Page } from '../../components/Page/Page.jsx';
import { MetricCard } from '../../components/MetricCard/MetricCard.jsx';
import { IndexTable } from '../../components/IndexTable/IndexTable.jsx';
import { Pagination } from '../../components/Pagination/Pagination.jsx';

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
import {
  CardLayoutType1,
  CardLayoutType2,
  CardLayoutType3,
  CardLayoutType4,
} from '../../components/Card/Card.jsx';

export default {
  title: 'Pages/Equipment Detail',
  parameters: { layout: 'fullscreen' },
};

// ─── Main View data ───────────────────────────────────────────────────────────

const STATUS_STYLES = {
  'Active':            { bg: '#cdfee1',         color: '#0c5132' },
  'Unknown':           { bg: 'rgba(0,0,0,0.06)', color: '#616161' },
  'Decommissioned':    { bg: '#ffd6a4',         color: '#5e4200' },
  'Faulty':            { bg: '#fedad9',         color: '#8e1f0b' },
  'Under Maintenance': { bg: '#e0f0ff',         color: '#00527c' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Unknown'];
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 12, fontWeight: 550,
      fontFamily: 'Inter, sans-serif', padding: '2px 8px', borderRadius: 8,
      whiteSpace: 'nowrap', display: 'inline-block', lineHeight: '16px' }}>
      {status}
    </span>
  );
};

const COMPONENT_ROWS = [
  { id: '1',  installId: 'DCM-2024-001', facility: 'Coast General Hospital',          equipmentType: 'Inverter',    manufacturer: 'Vestfrost',         qty: 3,  status: 'Active',            lastMaintenance: 'Jan 15, 2024' },
  { id: '2',  installId: 'DCM-2024-002', facility: 'Kenyatta National Hospital',      equipmentType: 'Battery',     manufacturer: 'Vestfrost',         qty: 14, status: 'Unknown',           lastMaintenance: 'Feb 20, 2024' },
  { id: '3',  installId: 'DCM-2024-003', facility: 'Jaramogi Oginga Odinga Hospital', equipmentType: 'Solar Panel', manufacturer: 'B-Medical Systems', qty: 25, status: 'Decommissioned',    lastMaintenance: 'Mar 10, 2024' },
  { id: '4',  installId: 'DCM-2024-004', facility: 'PGH Nakuru',                      equipmentType: 'Inverter',    manufacturer: 'Vestfrost',         qty: 4,  status: 'Faulty',            lastMaintenance: 'Apr 5, 2024'  },
  { id: '5',  installId: 'DCM-2024-005', facility: 'Moi Teaching & Referral Hospital',equipmentType: 'Solar Panel', manufacturer: 'B-Medical Systems', qty: 15, status: 'Decommissioned',    lastMaintenance: 'May 30, 2024' },
  { id: '6',  installId: 'DCM-2024-006', facility: 'Malindi Sub-County Hospital',     equipmentType: 'Solar Panel', manufacturer: 'B-Medical Systems', qty: 9,  status: 'Under Maintenance', lastMaintenance: 'Jun 25, 2024' },
  { id: '7',  installId: 'DCM-2024-007', facility: 'Pumwani Maternity Hospital',      equipmentType: 'Inverter',    manufacturer: 'Vestfrost',         qty: 6,  status: 'Under Maintenance', lastMaintenance: 'Jul 15, 2024' },
  { id: '8',  installId: 'DCM-2024-008', facility: 'Starehe Sub-County Hospital',     equipmentType: 'Battery',     manufacturer: 'Vestfrost',         qty: 32, status: 'Faulty',            lastMaintenance: 'Aug 1, 2024'  },
  { id: '9',  installId: 'DCM-2024-009', facility: 'Malindi District Hospital',       equipmentType: 'Inverter',    manufacturer: 'Vestfrost',         qty: 12, status: 'Active',            lastMaintenance: 'Sep 10, 2024' },
  { id: '10', installId: 'DCM-2024-010', facility: 'Malindi Level 4 Hospital',        equipmentType: 'Solar Panel', manufacturer: 'B-Medical Systems', qty: 53, status: 'Unknown',           lastMaintenance: 'Sep 10, 2024' },
];

const COMPONENT_COLUMNS = [
  { key: 'installId',       label: 'Installation ID',  width: 148 },
  { key: 'facility',        label: 'Facility',          width: 240 },
  { key: 'equipmentType',   label: 'Equipment Type',    width: 160 },
  { key: 'manufacturer',    label: 'Manufacturer',      width: 180 },
  { key: 'qty',             label: 'Quantity',          width: 100, align: 'right' },
  { key: 'status',          label: 'Equipment Status',  width: 180, render: row => <StatusBadge status={row.status} /> },
  { key: 'lastMaintenance', label: 'Last Maintenance',  width: 160 },
  { key: 'view',            label: '',                  width: 56, render: () => (
    <a href="#" onClick={e => e.preventDefault()} style={{ color: '#005bd3', textDecoration: 'underline', fontSize: 13, fontWeight: 450, fontFamily: 'Inter, sans-serif' }}>View</a>
  )},
];

const TABLE_ROWS = [
  { id: '1',  installId: 'DCM-2024-001', systemType: 'Hybrid',    region: 'Mombasa',      facility: 'Coast General Hospital',           inverter: 'Victron Energy', solar: 'Jinko Solar',    battery: 'CATL', accessories: 3,  date: 'Jan 15, 2024' },
  { id: '2',  installId: 'DCM-2024-002', systemType: 'Off-Grid',  region: 'Nairobi West', facility: 'Kenyatta National Hospital',        inverter: 'SMA Solar',      solar: 'Canadian Solar', battery: 'CATL', accessories: 8,  date: 'Feb 20, 2024' },
  { id: '3',  installId: 'DCM-2024-003', systemType: 'Off-Grid',  region: 'Kisumu',       facility: 'Jaramogi Oginga Odinga Hospital',  inverter: 'Growatt',        solar: 'LONGi Solar',    battery: 'BYD',  accessories: 2,  date: 'Mar 10, 2024' },
  { id: '4',  installId: 'DCM-2024-004', systemType: 'Grid-Tied', region: 'Nakuru',       facility: 'PGH Nakuru',                       inverter: 'Huawei',         solar: 'Jinko Solar',    battery: 'BYD',  accessories: 3,  date: 'Apr 5, 2024'  },
  { id: '5',  installId: 'DCM-2024-005', systemType: 'Hybrid',    region: 'Eldoret',      facility: 'Moi Teaching & Referral Hospital', inverter: 'Victron Energy', solar: 'Canadian Solar', battery: 'CATL', accessories: 4,  date: 'May 30, 2024' },
  { id: '6',  installId: 'DCM-2024-006', systemType: 'Grid-Tied', region: 'Malindi',      facility: 'Malindi Sub-County Hospital',      inverter: 'SMA Solar',      solar: 'LONGi Solar',    battery: 'CATL', accessories: 3,  date: 'Jun 25, 2024' },
  { id: '7',  installId: 'DCM-2024-007', systemType: 'Grid-Tied', region: 'Nairobi West', facility: 'Pumwani Maternity Hospital',       inverter: 'Growatt',        solar: 'Jinko Solar',    battery: 'BYD',  accessories: 4,  date: 'Jul 15, 2024' },
  { id: '8',  installId: 'DCM-2024-008', systemType: 'Hybrid',    region: 'Starehe',      facility: 'Starehe Sub-County Hospital',      inverter: 'Huawei',         solar: 'Canadian Solar', battery: 'CATL', accessories: 3,  date: 'Aug 1, 2024'  },
  { id: '9',  installId: 'DCM-2024-009', systemType: 'Off-Grid',  region: 'Malindi',      facility: 'Malindi District Hospital',        inverter: 'Victron Energy', solar: 'LONGi Solar',    battery: 'BYD',  accessories: 2,  date: 'Sep 10, 2024' },
  { id: '10', installId: 'DCM-2024-010', systemType: 'Hybrid',    region: 'Malindi',      facility: 'Malindi Level 4 Hospital',         inverter: 'SMA Solar',      solar: 'Jinko Solar',    battery: 'CATL', accessories: 2,  date: 'Sep 10, 2024' },
];

const COLUMNS = [
  { key: 'installId',   label: 'Installation ID',  width: 148 },
  { key: 'systemType',  label: 'System Type',       width: 120 },
  { key: 'region',      label: 'Region',            width: 120 },
  { key: 'facility',    label: 'Facility',          width: 200 },
  { key: 'inverter',    label: 'Inverter',          width: 140, render: row => (
    <a href="#" onClick={e => e.preventDefault()} style={{ color: '#005bd3', textDecoration: 'underline', fontSize: 13, fontWeight: 450, fontFamily: 'Inter, sans-serif' }}>{row.inverter}</a>
  )},
  { key: 'solar',       label: 'Solar Panels',      width: 140, render: row => (
    <a href="#" onClick={e => e.preventDefault()} style={{ color: '#005bd3', textDecoration: 'underline', fontSize: 13, fontWeight: 450, fontFamily: 'Inter, sans-serif' }}>{row.solar}</a>
  )},
  { key: 'battery',     label: 'Battery',           width: 120, render: row => (
    <a href="#" onClick={e => e.preventDefault()} style={{ color: '#005bd3', textDecoration: 'underline', fontSize: 13, fontWeight: 450, fontFamily: 'Inter, sans-serif' }}>{row.battery}</a>
  )},
  { key: 'accessories', label: 'Accessories',       width: 108, align: 'right' },
  { key: 'date',        label: 'Installation Date', width: 140 },
];

// ─── Main View ────────────────────────────────────────────────────────────────

export const MainView = {
  name: 'Main View',
  render: () => {
    const [selected, setSelected]         = useState(new Set());
    const [activeTab, setActiveTab]       = useState(0);
    const [search, setSearch]             = useState('');
    const [activeMetric, setActiveMetric] = useState(null);
    const [loading, setLoading]           = useState(false);

    useEffect(() => {
      if (!loading) return;
      const t = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(t);
    }, [loading]);

    const handleTabChange = (i) => {
      if (i === activeTab) return;
      setActiveTab(i);
      setSelected(new Set());
      setSearch('');
      setLoading(true);
    };

    const isComponentView = activeTab === 1;

    const filtered = isComponentView
      ? COMPONENT_ROWS.filter(r =>
          [r.installId, r.facility, r.equipmentType, r.manufacturer].some(v =>
            v.toLowerCase().includes(search.toLowerCase())
          )
        )
      : TABLE_ROWS.filter(r =>
          [r.installId, r.systemType, r.region, r.facility].some(v =>
            v.toLowerCase().includes(search.toLowerCase())
          )
        );

    const activeColumns = isComponentView ? COMPONENT_COLUMNS : COLUMNS;

    return (
      <div style={{ background: '#f1f1f1', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 48px' }}>

          <Page
            title="Solar Equipments"
            primaryAction={{ content: 'Add Installation', onAction: () => {} }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
            {[
              { key: 'total',    title: 'Total Installations', metric: '12', badge: { label: '4 High Priority',   tone: 'warning' }, tooltip: 'Total number of active solar installations'   },
              { key: 'offgrid',  title: 'Off-Grid',            metric: '8',  badge: { label: '+2 from last week', tone: 'success' }, tooltip: 'Installations running fully off-grid'         },
              { key: 'hybrid',   title: 'Hybrid',              metric: '15', badge: { label: '0 from last week',  tone: 'default' }, tooltip: 'Installations with hybrid grid + solar setup' },
              { key: 'gridtied', title: 'Grid-Tied',           metric: '4',  badge: { label: '+2 from last week', tone: 'success' }, tooltip: 'Installations connected directly to the grid' },
            ].map(card => (
              <MetricCard
                key={card.key}
                title={card.title}
                metric={card.metric}
                badge={card.badge}
                infoTooltip={card.tooltip}
                selected={activeMetric === card.key}
                onClick={() => setActiveMetric(prev => prev === card.key ? null : card.key)}
              />
            ))}
          </div>

          <IndexTable
            tabs={[{ label: 'Summary' }, { label: 'Component View' }]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            loading={loading}
            searchValue={search}
            onSearchChange={e => setSearch(e.target.value)}
            searchPlaceholder="Search installations…"
            toolbarActions={[
              { label: 'Filter',  icon: <IcoFilter size={16} />, onClick: () => {} },
              { label: 'Columns', icon: <IcoAdjust size={16} />, onClick: () => {} },
            ]}
            columns={activeColumns}
            rows={filtered}
            selectedRows={selected}
            onSelectionChange={setSelected}
            bulkActions={[
              { label: 'Export',  onAction: () => {} },
              { label: 'Archive', onAction: () => {} },
            ]}
            rowActions={isComponentView ? [
              { label: 'View details', onAction: () => {} },
              { label: 'Edit',         onAction: () => {} },
              { label: 'Remove',       onAction: () => {}, destructive: true },
            ] : [
              { label: 'View details', onAction: () => {} },
              { label: 'Edit',         onAction: () => {} },
              { label: 'Archive',      onAction: () => {} },
              { label: 'Delete',       onAction: () => {}, destructive: true },
            ]}
            emptyState={{ heading: 'No installations found', description: 'Try adjusting your search or filters.' }}
            footer={
              <Pagination
                hasPrevious={false}
                hasNext={!loading && filtered.length >= 10}
                label={loading ? '—' : `1–${filtered.length} of ${isComponentView ? COMPONENT_ROWS.length : TABLE_ROWS.length}`}
                type="table"
              />
            }
          />

        </div>
      </div>
    );
  },
};

// ─── View Detail data ─────────────────────────────────────────────────────────

const FIELDS = [
  { label: 'Component Type',    value: 'Data Logger'       },
  { label: 'Serial Number',     value: 'SN-00482-KE'       },
  { label: 'Manufacturer',      value: 'Nexleaf Analytics' },
  { label: 'Model',             value: 'ColdTrace G3'      },
  { label: 'Warranty Status',   value: 'In Warranty'       },
  { label: 'Quantity',          value: '1'                 },
  { label: 'Installation Date', value: '04 Jan 2024'       },
  { label: 'Last Serviced',     value: '12 Mar 2025'       },
];

const TABS = [{ label: 'Primary Components' }, { label: 'Accessories' }];

const PRIMARY_ROWS = [
  { id: '1', type: 'Sensor Probe',  manufacturer: 'Nexleaf', model: 'ST-400', equipmentId: 'EQ-10022' },
  { id: '2', type: 'SIM Module',    manufacturer: 'Huawei',  model: 'ME909',  equipmentId: 'EQ-10023' },
  { id: '3', type: 'Power Adapter', manufacturer: 'Generic', model: 'PA-12V', equipmentId: 'EQ-10030' },
];

const ACCESSORY_ROWS = [
  { id: '4', type: 'Mounting Clip', manufacturer: 'Generic', model: 'MC-01',  equipmentId: 'EQ-10031' },
  { id: '5', type: 'Tamper Seal',   manufacturer: 'Generic', model: 'TS-200', equipmentId: 'EQ-10032' },
];

// ─── View Detail ──────────────────────────────────────────────────────────────

export const ViewDetail = {
  name: 'View Detail',
  render: () => {
    const [tab, setTab] = useState(0);
    const tableRows = tab === 0 ? PRIMARY_ROWS : ACCESSORY_ROWS;

    return (
      <div style={{ background: '#f1f1f1', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px' }}>

          <Page
            title="ColdTrace G3"
            subtitle="SN-00482-KE · Nexleaf Analytics"
            backAction={{ onAction: () => {} }}
            metadata={[{ label: 'Active', tone: 'success' }]}
            primaryAction={{ content: 'Edit', onAction: () => {} }}
            secondaryActions={[{ content: 'Actions', disclosure: true, onAction: () => {} }]}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CardLayoutType1
                images={['', '', '']}
                fields={FIELDS}
                notes="The data logger was reinstalled following the facility power infrastructure upgrade in January 2025. Temperature calibration was completed on-site by field technician James Omondi. No performance issues have been reported since reinstallation."
              />
              <CardLayoutType2
                title="Associated Components"
                description="Primary components and accessories linked to this equipment"
                tabs={TABS}
                activeTab={tab}
                onTabChange={setTab}
                tableRows={tableRows}
                footer={
                  <Pagination
                    hasPrevious={false}
                    hasNext={tab === 0 && tableRows.length >= 3}
                    label={`1–${tableRows.length} of ${tableRows.length}`}
                    type="table"
                  />
                }
                defaultOpen
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CardLayoutType3
                region="North Kenya"
                facilityName="Lodwar County Hospital"
                facilityHref="#"
                mapLat={3.1211}
                mapLon={35.5975}
              />
              <CardLayoutType4
                addedBy="Grace Mwangi"
                contactNumber="+254 712 345 678"
              />
            </div>

          </div>
        </div>
      </div>
    );
  },
};
