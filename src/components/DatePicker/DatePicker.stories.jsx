import { useState } from 'react';
import { DatePicker } from './DatePicker.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif' }}><Story /></div>],
};

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, marginBottom: 28 }}>
    <SectionLabel>{label}</SectionLabel>
    {children}
  </div>
);

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => {
    const aug10 = new Date(2023, 7, 10);
    const rangeAug = { start: new Date(2023, 7, 9), end: new Date(2023, 7, 12) };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Row label="Single date">
          <DatePicker value={aug10} initialMonth={aug10} />
        </Row>

        <Row label="Range">
          <DatePicker value={rangeAug} allowRange initialMonth={rangeAug.start} />
        </Row>

        <Row label="Multi month">
          <DatePicker value={aug10} multiMonth initialMonth={aug10} />
        </Row>

        <Row label="Multi month — range">
          <DatePicker
            value={{ start: new Date(2023, 7, 28), end: new Date(2023, 8, 1) }}
            allowRange multiMonth
            initialMonth={new Date(2023, 7, 1)}
          />
        </Row>

        <Row label="Vertical stack (mobile)">
          <DatePicker value={aug10} multiMonth verticalStack initialMonth={aug10} />
        </Row>

        <Row label="Min / max bounds">
          <DatePicker
            value={aug10}
            initialMonth={aug10}
            minDate={new Date(2023, 7, 5)}
            maxDate={new Date(2023, 7, 20)}
          />
        </Row>
      </div>
    );
  },
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [date,  setDate]  = useState(new Date());
    const [range, setRange] = useState({ start: null, end: null });
    const [saved, setSaved] = useState(false);

    const fmt = d => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28, maxWidth: 700 }}>
        <div>
          <SectionLabel>Pick a single date</SectionLabel>
          <DatePicker value={date} onChange={setDate} />
          <div style={{ marginTop: 8, fontSize: 13, color: '#616161' }}>
            Selected: <strong style={{ color: '#303030' }}>{fmt(date)}</strong>
          </div>
        </div>

        <div>
          <SectionLabel>Pick a date range</SectionLabel>
          <DatePicker value={range} onChange={setRange} allowRange multiMonth />
          <div style={{ marginTop: 8, fontSize: 13, color: '#616161' }}>
            From <strong style={{ color: '#303030' }}>{fmt(range.start)}</strong>
            {' '}to <strong style={{ color: '#303030' }}>{fmt(range.end)}</strong>
          </div>
        </div>

        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setSaved(true)}>Save dates</Btn>
        </div>

        {saved && (
          <div style={{ fontSize: 12, color: '#0c5132', background: '#cdfee1', borderRadius: 8, padding: '8px 12px', alignSelf: 'flex-start' }}>
            Dates saved.
          </div>
        )}
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Single = {
  args: { value: new Date(2023, 7, 10), initialMonth: new Date(2023, 7, 10) },
};

export const Range = {
  args: {
    value: { start: new Date(2023, 7, 9), end: new Date(2023, 7, 12) },
    allowRange: true,
    initialMonth: new Date(2023, 7, 1),
  },
};

export const MultiMonth = {
  args: { value: new Date(2023, 7, 10), multiMonth: true, initialMonth: new Date(2023, 7, 1) },
};

export const VerticalStack = {
  args: { value: new Date(2023, 7, 10), multiMonth: true, verticalStack: true, initialMonth: new Date(2023, 7, 1) },
};

export const WithBounds = {
  args: {
    value: new Date(2023, 7, 10),
    initialMonth: new Date(2023, 7, 1),
    minDate: new Date(2023, 7, 5),
    maxDate: new Date(2023, 7, 20),
  },
};
