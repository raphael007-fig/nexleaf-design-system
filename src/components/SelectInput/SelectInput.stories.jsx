import { useState } from 'react';
import { SelectInput } from './SelectInput.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Forms/SelectInput',
  component: SelectInput,
  parameters: { layout: 'centered' },
  argTypes: { disabled: { control: 'boolean' }, required: { control: 'boolean' } },
  decorators: [Story => <div style={{ width: 280 }}><Story /></div>],
};

export const Default = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: ['United States', 'Canada', 'United Kingdom', 'Australia'],
  },
};

export const Required = {
  args: {
    label: 'Status',
    required: true,
    placeholder: 'Choose status',
    options: ['Active', 'Inactive', 'Pending'],
  },
};

export const Disabled = {
  args: {
    label: 'Region',
    placeholder: 'Select region',
    options: ['North', 'South'],
    disabled: true,
  },
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [session, setSession] = useState('');
    const [status, setStatus] = useState('active');
    const [unit, setUnit] = useState('');
    const [attempted, setAttempted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320, fontFamily: 'Inter, sans-serif' }}>
        <SelectInput
          label="Session type"
          required
          placeholder="Select session"
          options={['Morning', 'Evening', 'Both']}
          value={session}
          onChange={e => setSession(e.target.value)}
          error={attempted && !session ? 'Session type is required.' : undefined}
        />
        <SelectInput
          label="Status"
          options={['Active', 'Inactive', 'Pending']}
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
        <SelectInput
          label="Temperature unit"
          placeholder="Select unit"
          options={['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']}
          value={unit}
          onChange={e => setUnit(e.target.value)}
        />
        <SelectInput
          label="Region"
          placeholder="Not available"
          options={['North', 'South']}
          disabled
        />
        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save</Btn>
        </div>
        {attempted && session && (
          <div style={{ fontSize: 12, color: '#0c5132', background: '#cdfee1', borderRadius: 8, padding: '8px 12px' }}>
            Session type set to: {session}
          </div>
        )}
      </div>
    );
  },
};

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320, fontFamily: 'Inter, sans-serif' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Default</div>
        <SelectInput label="Country" placeholder="Select a country" options={['United States', 'Canada', 'United Kingdom']} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Required</div>
        <SelectInput label="Status" required placeholder="Choose status" options={['Active', 'Inactive', 'Pending']} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Disabled</div>
        <SelectInput label="Region" placeholder="Select region" options={['North', 'South']} disabled />
      </div>
    </div>
  ),
};
