import { useState } from 'react';
import { DateField } from './DateField.jsx';

export default {
  title: 'Components/Forms/DateField',
  component: DateField,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 480 }}><Story /></div>],
};

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </div>
    {children}
  </div>
);

// ─── Interactive ──────────────────────────────────────────────────
export const Interactive = {
  render: () => {
    const [date, setDate] = useState(new Date());
    return (
      <DateField
        label="Configuration date"
        required
        value={date}
        onChange={setDate}
        helpText="Click the field to open the calendar. This is usually today."
      />
    );
  },
};

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Row label="Empty">
        <DateField label="Installation date" onChange={() => {}} />
      </Row>
      <Row label="Filled">
        <DateField label="Configuration date" required value={new Date(2026, 6, 20)} onChange={() => {}} />
      </Row>
      <Row label="Help text">
        <DateField label="Configuration date" value={new Date(2026, 6, 20)} onChange={() => {}} helpText="When this RTMD is being configured on the equipment." />
      </Row>
      <Row label="Error">
        <DateField label="Configuration date" required onChange={() => {}} error="Configuration date is required." />
      </Row>
      <Row label="Disabled">
        <DateField label="Decommission date" value={new Date(2026, 6, 20)} onChange={() => {}} disabled />
      </Row>
    </div>
  ),
};
