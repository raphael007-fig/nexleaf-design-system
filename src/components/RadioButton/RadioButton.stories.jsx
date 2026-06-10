import { useState } from 'react';
import { RadioButton, RadioGroup } from './RadioButton.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Lists/RadioButton',
  component: RadioButton,
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ fontFamily: 'Inter, sans-serif' }}><Story /></div>],
};

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </div>
    {children}
  </div>
);

// ─── All States ───────────────────────────────────────────────────
export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      <Row label="Default tone">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <RadioButton label="Rest" checked={false} />
          <RadioButton label="Hover" checked={false} />
          <RadioButton label="Focus" checked={false} />
          <RadioButton label="Checked" checked={true} />
          <RadioButton label="Disabled" checked={false} disabled />
          <RadioButton label="Disabled on" checked={true} disabled />
        </div>
      </Row>

      <Row label="Magic tone">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <RadioButton label="Rest"    tone="magic" checked={false} />
          <RadioButton label="Hover"   tone="magic" checked={false} />
          <RadioButton label="Focus"   tone="magic" checked={false} />
          <RadioButton label="Checked" tone="magic" checked={true} />
        </div>
      </Row>

      <Row label="Error — unchecked">
        <RadioButton label="Label" checked={false} error="Error message" />
      </Row>

      <Row label="Error — checked">
        <RadioButton label="Label" checked={true} error="Error message" />
      </Row>

      <Row label="With help text">
        <RadioButton label="Label" checked={false} helpText="Help text" />
      </Row>

      <Row label="No label">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <RadioButton checked={false} />
          <RadioButton checked={true} />
        </div>
      </Row>

    </div>
  ),
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [pref, setPref] = useState('email');
    const [attempted, setAttempted] = useState(false);
    const [plan, setPlan] = useState(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 360 }}>
        <RadioGroup
          title="Notification preference"
          name="pref"
          value={pref}
          onChange={setPref}
          options={[
            { id: 'email',  label: 'Email',  helpText: 'Daily digest at 8am' },
            { id: 'sms',    label: 'SMS' },
            { id: 'push',   label: 'Push notification' },
            { id: 'none',   label: 'None', disabled: true },
          ]}
        />

        <RadioGroup
          title="Choose a plan"
          required
          name="plan"
          value={plan}
          onChange={setPlan}
          tone="magic"
          options={[
            { id: 'basic', label: 'Basic' },
            { id: 'pro',   label: 'Pro' },
          ]}
          error={attempted && !plan ? 'Please select a plan.' : undefined}
        />

        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save</Btn>
        </div>
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Default     = { args: { label: 'Label' } };
export const Checked     = { args: { label: 'Label', checked: true } };
export const Magic       = { args: { label: 'Label', tone: 'magic', checked: true } };
export const WithHelp    = { args: { label: 'Email', checked: false, helpText: 'Daily digest at 8am' } };
export const WithError   = { args: { label: 'Label', checked: false, error: 'Please select an option.' } };
export const Disabled    = { args: { label: 'Label', checked: false, disabled: true } };
export const DisabledOn  = { args: { label: 'Label', checked: true, disabled: true } };
