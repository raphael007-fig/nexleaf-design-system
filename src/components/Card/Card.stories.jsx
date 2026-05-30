import { useState } from 'react';
import {
  Card,
  CardField,
  CardDivider,
  CardImages,
  CardNotes,
  CardSectionTitle,
  CardLayoutType1,
  CardLayoutType2,
  CardLayoutType3,
  CardLayoutType4,
  CardLayoutType5,
} from './Card.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
};

// ─── AllLayouts — static snapshot ────────────────────────────────────────────

export const AllLayouts = {
  name: 'All Layouts',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 560 }}>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          Layout Type 1 — Main Detail Card
        </p>
        <CardLayoutType1
          images={['', '', '']}
          fields={[
            { label: 'Serial Number',      value: 'SN-00482-KE'        },
            { label: 'Status',             value: 'Active'              },
            { label: 'Last Serviced',      value: '12 Mar 2025'         },
            { label: 'Assigned To',        value: 'Lodwar County Hosp.' },
            { label: 'Model',              value: 'ColdTrace G3'        },
            { label: 'Installation Date',  value: '04 Jan 2024'         },
          ]}
          notes="Unit was reinstalled after the facility power upgrade. Temperature calibration completed on site by field technician James Omondi."
        />
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          Layout Type 2 — Accordion + Embedded Table
        </p>
        <CardLayoutType2
          title="Associated Components"
          description="Primary components and accessories linked to this equipment"
          tabs={[{ label: 'Primary Components' }, { label: 'Accessories' }]}
          tableRows={[
            { id: '1', type: 'Data Logger',  manufacturer: 'Nexleaf', model: 'ColdTrace G3', equipmentId: 'EQ-10021' },
            { id: '2', type: 'Sensor Probe', manufacturer: 'Nexleaf', model: 'ST-400',       equipmentId: 'EQ-10022' },
            { id: '3', type: 'SIM Module',   manufacturer: 'Huawei',  model: 'ME909',        equipmentId: 'EQ-10023' },
          ]}
          footer={<Pagination hasPrevious={false} hasNext label="1–3 of 3" type="table" />}
          defaultOpen
        />
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          Layout Type 3 — Location Card
        </p>
        <CardLayoutType3
          region="North Kenya"
          facilityName="Lodwar County Hospital"
          facilityHref="#"
          mapLat={3.1211}
          mapLon={35.5975}
        />
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          Layout Type 4 — Contact Card
        </p>
        <CardLayoutType4
          addedBy="Grace Mwangi"
          contactNumber="+254 712 345 678"
        />
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          Layout Type 5 — QR Code Card
        </p>
        <CardLayoutType5
          title="QR Code"
          onAssign={() => {}}
        />
      </div>

    </div>
  ),
};

// ─── InteractionStates ────────────────────────────────────────────────────────

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const TABS = [{ label: 'Primary Components' }, { label: 'Accessories' }];
    const PRIMARY_ROWS = [
      { id: '1', type: 'Data Logger',  manufacturer: 'Nexleaf', model: 'ColdTrace G3', equipmentId: 'EQ-10021' },
      { id: '2', type: 'Sensor Probe', manufacturer: 'Nexleaf', model: 'ST-400',       equipmentId: 'EQ-10022' },
      { id: '3', type: 'SIM Module',   manufacturer: 'Huawei',  model: 'ME909',        equipmentId: 'EQ-10023' },
    ];
    const ACCESSORY_ROWS = [
      { id: '4', type: 'Power Adapter', manufacturer: 'Generic', model: 'PA-12V', equipmentId: 'EQ-10030' },
    ];

    const [tab, setTab] = useState(0);
    const rows = tab === 0 ? PRIMARY_ROWS : ACCESSORY_ROWS;

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 13, color: '#616161', margin: 0, fontFamily: 'Inter, sans-serif' }}>
          Click the accordion header to expand/collapse. Switch tabs to filter table rows.
        </p>

        {/* Side-by-side: Type 1 + right column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>

          {/* Left: Type 1 */}
          <CardLayoutType1
            images={['', '', '']}
            fields={[
              { label: 'Serial Number',     value: 'SN-00482-KE'        },
              { label: 'Status',            value: 'Active'              },
              { label: 'Last Serviced',     value: '12 Mar 2025'         },
              { label: 'Assigned To',       value: 'Lodwar County Hosp.' },
              { label: 'Model',             value: 'ColdTrace G3'        },
              { label: 'Installation Date', value: '04 Jan 2024'         },
            ]}
            notes="Unit reinstalled after facility power upgrade. Temperature calibration completed on site by field technician James Omondi."
          />

          {/* Right: Type 3 + Type 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CardLayoutType3
              region="North Kenya"
              facilityName="Lodwar County Hospital"
              facilityHref="#"
            />
            <CardLayoutType4
              addedBy="Grace Mwangi"
              contactNumber="+254 712 345 678"
            />
          </div>
        </div>

        {/* Type 2 full-width */}
        <CardLayoutType2
          title="Associated Components"
          description="Primary components and accessories linked to this equipment"
          tabs={TABS}
          activeTab={tab}
          onTabChange={setTab}
          tableRows={rows}
          footer={<Pagination hasPrevious={false} hasNext={tab === 0} label={tab === 0 ? '1–3 of 3' : '1–1 of 1'} type="table" />}
          defaultOpen
        />
      </div>
    );
  },
};

// ─── LayoutType1 ──────────────────────────────────────────────────────────────

export const LayoutType1 = {
  name: 'Layout Type 1 — Detail Card',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 480, fontFamily: 'Inter, sans-serif' }}>
      <CardLayoutType1
        images={['', '', '']}
        fields={[
          { label: 'Serial Number',     value: 'SN-00482-KE'        },
          { label: 'Status',            value: 'Active'              },
          { label: 'Last Serviced',     value: '12 Mar 2025'         },
          { label: 'Assigned To',       value: 'Lodwar County Hosp.' },
          { label: 'Model',             value: 'ColdTrace G3'        },
          { label: 'Installation Date', value: '04 Jan 2024'         },
          { label: 'Manufacturer',      value: 'Nexleaf Analytics'   },
          { label: 'Warranty Expires',  value: '04 Jan 2026'         },
        ]}
        notes="Unit reinstalled after the facility power upgrade in January 2025. Temperature calibration completed on site by field technician James Omondi. No issues reported since reinstallation."
      />
    </div>
  ),
};

// ─── LayoutType2 ──────────────────────────────────────────────────────────────

export const LayoutType2 = {
  name: 'Layout Type 2 — Accordion Table',
  parameters: { layout: 'padded' },
  render: () => {
    const TABS = [{ label: 'Primary Components' }, { label: 'Accessories' }];
    const PRIMARY = [
      { id: '1', type: 'Data Logger',  manufacturer: 'Nexleaf', model: 'ColdTrace G3', equipmentId: 'EQ-10021' },
      { id: '2', type: 'Sensor Probe', manufacturer: 'Nexleaf', model: 'ST-400',       equipmentId: 'EQ-10022' },
      { id: '3', type: 'SIM Module',   manufacturer: 'Huawei',  model: 'ME909',        equipmentId: 'EQ-10023' },
    ];
    const ACCESSORIES = [
      { id: '4', type: 'Power Adapter', manufacturer: 'Generic', model: 'PA-12V', equipmentId: 'EQ-10030' },
      { id: '5', type: 'Mounting Clip', manufacturer: 'Generic', model: 'MC-01',  equipmentId: 'EQ-10031' },
    ];

    const [tab, setTab] = useState(0);
    const rows = tab === 0 ? PRIMARY : ACCESSORIES;

    return (
      <div style={{ maxWidth: 600, fontFamily: 'Inter, sans-serif' }}>
        <CardLayoutType2
          title="Associated Components"
          description="Primary components and accessories linked to this equipment"
          tabs={TABS}
          activeTab={tab}
          onTabChange={setTab}
          tableRows={rows}
          footer={<Pagination hasPrevious={false} hasNext={tab === 0} label={tab === 0 ? '1–3 of 3' : '1–2 of 2'} type="table" />}
          defaultOpen
        />
      </div>
    );
  },
};

// ─── LayoutType3 ──────────────────────────────────────────────────────────────

export const LayoutType3 = {
  name: 'Layout Type 3 — Location Card',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 280, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>With map placeholder</p>
        <CardLayoutType3
          region="North Kenya"
          facilityName="Lodwar County Hospital"
          facilityHref="#"
          mapLat={3.1211}
          mapLon={35.5975}
        />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Different region</p>
        <CardLayoutType3
          region="Nairobi"
          facilityName="Kenyatta National Hospital"
          facilityHref="#"
          mapLat={-1.3017}
          mapLon={36.8083}
        />
      </div>
    </div>
  ),
};

// ─── LayoutType4 ──────────────────────────────────────────────────────────────

export const LayoutType4 = {
  name: 'Layout Type 4 — Contact Card',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 280, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CardLayoutType4
        addedBy="Grace Mwangi"
        contactNumber="+254 712 345 678"
      />
      <CardLayoutType4
        addedBy="James Omondi"
        contactNumber="+254 733 221 009"
      />
    </div>
  ),
};

export const LayoutType5 = {
  name: 'Layout Type 5 — QR Code Card',
  parameters: { layout: 'padded' },
  render: () => {
    // 160px sample QR (inline SVG data URI). Replace with a real scannable QR
    // in production — this is purely visual.
    const SAMPLE_QR =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 21' shape-rendering='crispEdges'>
          <rect width='21' height='21' fill='#ffffff'/>
          <g fill='#303030'>
            <rect x='1' y='1' width='7' height='7'/>
            <rect x='2' y='2' width='5' height='5' fill='#ffffff'/>
            <rect x='3' y='3' width='3' height='3'/>
            <rect x='13' y='1' width='7' height='7'/>
            <rect x='14' y='2' width='5' height='5' fill='#ffffff'/>
            <rect x='15' y='3' width='3' height='3'/>
            <rect x='1' y='13' width='7' height='7'/>
            <rect x='2' y='14' width='5' height='5' fill='#ffffff'/>
            <rect x='3' y='15' width='3' height='3'/>
            <rect x='9' y='1' width='1' height='1'/>
            <rect x='11' y='1' width='1' height='1'/>
            <rect x='10' y='2' width='1' height='1'/>
            <rect x='9' y='4' width='1' height='1'/>
            <rect x='11' y='3' width='1' height='1'/>
            <rect x='1' y='9' width='1' height='1'/>
            <rect x='3' y='10' width='1' height='1'/>
            <rect x='5' y='9' width='1' height='1'/>
            <rect x='7' y='10' width='1' height='1'/>
            <rect x='9' y='9' width='2' height='1'/>
            <rect x='12' y='9' width='1' height='2'/>
            <rect x='14' y='9' width='1' height='1'/>
            <rect x='16' y='10' width='1' height='1'/>
            <rect x='18' y='9' width='1' height='2'/>
            <rect x='9' y='11' width='1' height='1'/>
            <rect x='11' y='12' width='1' height='1'/>
            <rect x='13' y='11' width='2' height='2'/>
            <rect x='17' y='12' width='2' height='1'/>
            <rect x='9' y='13' width='2' height='1'/>
            <rect x='12' y='13' width='1' height='1'/>
            <rect x='14' y='14' width='1' height='1'/>
            <rect x='16' y='13' width='1' height='2'/>
            <rect x='19' y='13' width='1' height='2'/>
            <rect x='10' y='15' width='1' height='1'/>
            <rect x='13' y='16' width='2' height='1'/>
            <rect x='17' y='16' width='1' height='2'/>
            <rect x='19' y='17' width='1' height='1'/>
            <rect x='9' y='17' width='1' height='2'/>
            <rect x='11' y='18' width='2' height='1'/>
            <rect x='14' y='18' width='1' height='1'/>
            <rect x='15' y='19' width='2' height='1'/>
            <rect x='18' y='19' width='2' height='1'/>
          </g>
        </svg>
      `);

    return (
      <div style={{ maxWidth: 420, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CardLayoutType5
          title="QR Code"
          onAssign={() => {}}
        />
        <CardLayoutType5
          title="QR Code"
          qrCodeSrc={SAMPLE_QR}
          onView={() => {}}
        />
        <CardLayoutType5 title="QR Code" loading />
      </div>
    );
  },
};

// ─── Primitives ───────────────────────────────────────────────────────────────

export const Primitives = {
  name: 'Primitives',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>CardField — no icon (plain value)</p>
        <Card>
          <CardField label="Serial Number" value="SN-00482-KE" />
          <CardDivider />
          <CardField label="Model" value="ColdTrace G3" />
        </Card>
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>CardField — with link value</p>
        <Card>
          <CardField label="Assigned Facility" value="Lodwar County Hospital" linkHref="#" />
        </Card>
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>CardImages — 3 placeholders</p>
        <Card>
          <CardImages images={['', '', '']} />
        </Card>
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>CardImages — 1 image</p>
        <Card>
          <CardImages images={['']} />
        </Card>
      </div>

    </div>
  ),
};
