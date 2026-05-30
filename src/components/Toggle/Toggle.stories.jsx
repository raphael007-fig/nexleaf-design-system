import { useState } from 'react';
import { Toggle } from './Toggle.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
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

      <Row label="Rest">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Toggle label="Off" checked={false} />
          <Toggle label="On"  checked={true}  />
        </div>
      </Row>

      <Row label="Hover (mouse over to see)">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Toggle label="Off" checked={false} />
          <Toggle label="On"  checked={true}  />
        </div>
      </Row>

      <Row label="Focus (tab to see)">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Toggle label="Off" checked={false} />
          <Toggle label="On"  checked={true}  />
        </div>
      </Row>

      <Row label="Disabled">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Toggle label="Off" checked={false} disabled />
          <Toggle label="On"  checked={true}  disabled />
        </div>
      </Row>

      <Row label="Error — unchecked">
        <Toggle label="Label" checked={false} error="Error message" />
      </Row>

      <Row label="Error — checked">
        <Toggle label="Label" checked={true} error="Error message" />
      </Row>

      <Row label="With help text">
        <Toggle label="Label" checked={false} helpText="Help text" />
      </Row>

      <Row label="No label">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Toggle checked={false} />
          <Toggle checked={true}  />
        </div>
      </Row>

    </div>
  ),
};

// ─── Interaction states ───────────────────────────────────────────
export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode,      setDarkMode]      = useState(false);
    const [autoSync,      setAutoSync]      = useState(false);
    const [attempted,     setAttempted]     = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 360 }}>
        <Toggle
          label="Enable notifications"
          checked={notifications}
          onChange={setNotifications}
          helpText="Receive alerts when readings are out of range."
        />
        <Toggle
          label="Dark mode"
          checked={darkMode}
          onChange={setDarkMode}
        />
        <Toggle
          label="Auto-sync readings"
          checked={autoSync}
          onChange={setAutoSync}
          error={attempted && !autoSync ? 'Auto-sync must be enabled.' : undefined}
        />
        <Toggle
          label="Apply to all devices"
          checked={false}
          disabled
        />
        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save</Btn>
        </div>
      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────
export const Default    = { args: { label: 'Apply to all' } };
export const Checked    = { args: { label: 'Apply to all', checked: true } };
export const WithHelp   = { args: { label: 'Enable notifications', checked: false, helpText: 'Receive alerts for out-of-range readings.' } };
export const WithError  = { args: { label: 'Auto-sync', checked: false, error: 'Auto-sync must be enabled.' } };
export const Disabled   = { args: { label: 'Apply to all', checked: false, disabled: true } };
export const DisabledOn = { args: { label: 'Apply to all', checked: true, disabled: true } };
