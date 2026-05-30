import { useState } from 'react';
import { NumberInput } from './NumberInput.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Forms/NumberInput',
  component: NumberInput,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ width: 320 }}><Story /></div>],
};

const SectionLabel = ({ children }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, marginTop: 20 }}>
    {children}
  </div>
);

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <SectionLabel>Default</SectionLabel>
      <NumberInput label="Quantity" placeholder="0" />

      <SectionLabel>Required</SectionLabel>
      <NumberInput label="Temperature" required placeholder="0" />

      <SectionLabel>With suffix</SectionLabel>
      <NumberInput label="Temperature" suffix="°C" value={4.5} />

      <SectionLabel>With prefix</SectionLabel>
      <NumberInput label="Price" prefix="$" value={20} />

      <SectionLabel>With prefix + suffix</SectionLabel>
      <NumberInput label="Weight" prefix="~" suffix="kg" value={12.5} />

      <SectionLabel>With min / max</SectionLabel>
      <NumberInput label="Percentage" suffix="%" min={0} max={100} value={50} />

      <SectionLabel>With help text</SectionLabel>
      <NumberInput label="Temperature" suffix="°C" helpText="Normal range: 2 – 8 °C" value={4} />

      <SectionLabel>Error</SectionLabel>
      <NumberInput label="Temperature" suffix="°C" error="Temperature is required." />

      <SectionLabel>Disabled</SectionLabel>
      <NumberInput label="Record count" value={42} disabled />

      <SectionLabel>Read-only</SectionLabel>
      <NumberInput label="Record count" value={42} readOnly />
    </div>
  ),
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [temp, setTemp] = useState('');
    const [qty,  setQty]  = useState(1);
    const [attempted, setAttempted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <NumberInput
          label="Temperature"
          required
          suffix="°C"
          placeholder="e.g. 4.5"
          step={0.1}
          value={temp}
          onChange={setTemp}
          error={attempted && temp === '' ? 'Temperature is required.' : undefined}
          helpText="Normal range: 2 – 8 °C"
        />
        <NumberInput
          label="Quantity"
          min={1}
          max={99}
          step={1}
          value={qty}
          onChange={setQty}
          helpText="Max 99 units"
        />
        <NumberInput
          label="Record ID"
          value={42}
          disabled
        />
        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save reading</Btn>
        </div>
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Default     = { args: { label: 'Quantity', placeholder: '0' } };
export const WithSuffix  = { args: { label: 'Temperature', suffix: '°C', value: 4.5, step: 0.1 } };
export const WithPrefix  = { args: { label: 'Price', prefix: '$', value: 20 } };
export const WithMinMax  = { args: { label: 'Percentage', suffix: '%', min: 0, max: 100, value: 50 } };
export const WithError   = { args: { label: 'Temperature', suffix: '°C', error: 'Temperature is required.' } };
export const Disabled    = { args: { label: 'Record count', value: 42, disabled: true } };
