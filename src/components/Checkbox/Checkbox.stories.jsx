import { useState } from 'react';
import { Checkbox, RadioButton, ChoiceList } from './Checkbox.jsx';

export default {
  title: 'Components/Lists/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    checked:  { control: 'select', options: [false, true, 'indeterminate'] },
    disabled: { control: 'boolean' },
    tone:     { control: 'select', options: ['default', 'magic'] },
  },
};

export const Unchecked = { args: { label: 'Remember me', checked: false } };
export const Checked   = { args: { label: 'Remember me', checked: true } };
export const Indeterminate = { args: { label: 'Select all', checked: 'indeterminate' } };
export const Disabled  = { args: { label: 'Disabled option', checked: false, disabled: true } };
export const WithError = { args: { label: 'I agree', error: 'You must agree to continue.' } };
export const WithHelpText = { args: { label: 'Subscribe', helpText: 'Receive weekly updates.' } };

export const Interactive = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="Toggle me" checked={checked} onChange={setChecked} />;
  },
};

export const RadioButtons = {
  name: 'RadioButton',
  render: () => {
    const [val, setVal] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <RadioButton label="Option A" checked={val === 'a'} onChange={() => setVal('a')} />
        <RadioButton label="Option B" checked={val === 'b'} onChange={() => setVal('b')} />
        <RadioButton label="Disabled" checked={false} disabled />
      </div>
    );
  },
};

export const ChoiceListSingle = {
  name: 'ChoiceList (single)',
  render: () => {
    const [val, setVal] = useState('omaha');
    return (
      <ChoiceList title="Location" selected={val} onChange={setVal}
        choices={[
          { id: 'apple-valley', label: 'Apple Valley' },
          { id: 'omaha', label: 'Omaha' },
          { id: 'duluth', label: 'Duluth' },
        ]} />
    );
  },
};

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Checkbox states</div>
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled unchecked" checked={false} disabled />
      <Checkbox label="Disabled checked" checked={true} disabled />
      <Checkbox label="With error" checked={false} error="This field is required." />
      <Checkbox label="With help text" checked={false} helpText="This option enables daily alerts." />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 8 }}>Radio button states</div>
      <RadioButton label="Unselected" checked={false} />
      <RadioButton label="Selected" checked={true} />
      <RadioButton label="Disabled" checked={false} disabled />
    </div>
  ),
};

export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [checks, setChecks] = useState({
      morning: true,
      evening: false,
      alerts: false,
      terms: false,
    });
    const [radioVal, setRadioVal] = useState('celsius');
    const toggle = (key) => setChecks(c => ({ ...c, [key]: !c[key] }));

    return (
      <div style={{ display: 'flex', gap: 40, fontFamily: 'Inter, sans-serif', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Checkboxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Checkboxes</div>
          <Checkbox
            label="Morning session"
            checked={checks.morning}
            onChange={() => toggle('morning')}
            helpText="Records at 07:00 – 12:00"
          />
          <Checkbox
            label="Evening session"
            checked={checks.evening}
            onChange={() => toggle('evening')}
          />
          <Checkbox
            label="Enable alerts"
            checked={checks.alerts}
            onChange={() => toggle('alerts')}
          />
          <Checkbox
            label="Accept terms"
            checked={checks.terms}
            onChange={() => toggle('terms')}
            error={!checks.terms ? 'You must accept to continue.' : undefined}
          />
          <Checkbox
            label="Locked option"
            checked={true}
            disabled
          />
        </div>

        {/* Radio buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Radio buttons</div>
          <RadioButton
            label="Celsius (°C)"
            checked={radioVal === 'celsius'}
            onChange={() => setRadioVal('celsius')}
          />
          <RadioButton
            label="Fahrenheit (°F)"
            checked={radioVal === 'fahrenheit'}
            onChange={() => setRadioVal('fahrenheit')}
          />
          <RadioButton
            label="Kelvin (K)"
            checked={radioVal === 'kelvin'}
            onChange={() => setRadioVal('kelvin')}
          />
          <RadioButton
            label="Unit locked"
            checked={false}
            disabled
          />
        </div>

      </div>
    );
  },
};

export const ChoiceListMultiple = {
  name: 'ChoiceList (multiple)',
  render: () => {
    const [val, setVal] = useState(['vvm']);
    return (
      <ChoiceList title="Actions taken" allowMultiple selected={val} onChange={setVal}
        choices={[
          { id: 'vvm', label: 'VVM Check' },
          { id: 'transfer', label: 'Vaccine Transfer' },
          { id: 'discarded', label: 'Frozen Vaccine Discarded' },
        ]} />
    );
  },
};
