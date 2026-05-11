import { TextInput } from './TextInput.jsx';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: { layout: 'padded' },
  argTypes: {
    disabled:   { control: 'boolean' },
    readOnly:   { control: 'boolean' },
    required:   { control: 'boolean' },
    clearButton:{ control: 'boolean' },
    borderless: { control: 'boolean' },
    tone:  { control: 'select', options: ['default', 'magic'] },
    size:  { control: 'select', options: ['medium', 'slim'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
  decorators: [Story => <div style={{ width: 320 }}><Story /></div>],
};

// ─── Playground ──────────────────────────────────────────────────
export const Playground = {
  args: { label: 'Store name', placeholder: 'e.g. My Store' },
};

// ─── All states matrix ───────────────────────────────────────────
const StateLabel = ({ children }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, marginTop: 20 }}>
    {children}
  </div>
);

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ width: 360 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#303030', marginBottom: 4 }}>TextInput State Matrix</h2>
      <p style={{ fontSize: 13, color: '#616161', marginBottom: 8, lineHeight: 1.5 }}>
        Click each input to verify focus ring. Error state has no focus ring.
      </p>

      <StateLabel>Rest (default)</StateLabel>
      <TextInput label="Temperature" placeholder="4.5" />

      <StateLabel>Required</StateLabel>
      <TextInput label="Email address" placeholder="user@example.com" required />

      <StateLabel>With prefix + suffix</StateLabel>
      <TextInput label="Temperature reading" prefix="~" suffix="°C" placeholder="4.5" />

      <StateLabel>With help text</StateLabel>
      <TextInput label="Password" type="password" helpText="Must be at least 8 characters." />

      <StateLabel>Error state</StateLabel>
      <TextInput label="Email" value="not-an-email" error="Enter a valid email address." />

      <StateLabel>Error with required</StateLabel>
      <TextInput label="Temperature" required value="" error="Temperature is required." />

      <StateLabel>Disabled</StateLabel>
      <TextInput label="Record ID" value="REC-0042" disabled />

      <StateLabel>Read-only</StateLabel>
      <TextInput label="Created by" value="system@nexleaf.org" readOnly />

      <StateLabel>With clear button</StateLabel>
      <TextInput label="Search" value="fridge zone A" clearButton />

      <StateLabel>Slim size</StateLabel>
      <TextInput label="Quick filter" placeholder="Type to filter…" size="slim" />

      <StateLabel>Magic / AI tone</StateLabel>
      <TextInput label="AI prompt" tone="magic" placeholder="Describe your product..." />

      <StateLabel>Borderless</StateLabel>
      <TextInput label="Inline edit" placeholder="Click to edit…" borderless />

      <StateLabel>Label action</StateLabel>
      <TextInput label="Password" type="password" labelAction="Forgot password?" onLabelAction={() => {}} />
    </div>
  ),
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ width: 360 }}><Story /></div>],
  render: () => {
    const [temp, setTemp] = useState('');
    const [device, setDevice] = useState('FRZ-A01');
    const [notes, setNotes] = useState('');
    const [attempted, setAttempted] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'Inter, sans-serif' }}>
        <TextInput
          label="Temperature"
          required
          suffix="°C"
          placeholder="e.g. 4.5"
          type="number"
          value={temp}
          onChange={setTemp}
          error={attempted && !temp ? 'Temperature reading is required.' : undefined}
          helpText="Normal range: 2 – 8 °C"
        />
        <TextInput
          label="Device ID"
          placeholder="e.g. FRZ-001"
          value={device}
          onChange={setDevice}
        />
        <TextInput
          label="Notes"
          placeholder="Optional notes…"
          value={notes}
          onChange={setNotes}
        />
        <TextInput
          label="Record ID"
          value="REC-0042"
          disabled
        />
        <button
          onClick={() => setAttempted(true)}
          style={{
            padding: '10px 20px', background: '#005bd3', color: '#fff',
            border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start',
          }}
        >
          Save reading
        </button>
        {attempted && temp && (
          <div style={{ fontSize: 12, color: '#0c5132', background: '#cdfee1', borderRadius: 8, padding: '8px 12px' }}>
            Reading saved successfully.
          </div>
        )}
      </div>
    );
  },
};

// ─── Individual named stories ─────────────────────────────────────
export const Default      = { args: { label: 'Store name', placeholder: 'e.g. My Store' } };
export const Required     = { args: { label: 'Email', placeholder: 'user@example.com', required: true } };
export const WithSuffix   = { args: { label: 'Temperature', suffix: '°C', placeholder: '4.5' } };
export const WithPrefix   = { args: { label: 'Price', prefix: '$', placeholder: '0.00' } };
export const WithError    = { args: { label: 'Email', value: 'not-an-email', error: 'Enter a valid email address.' } };
export const WithHelpText = { args: { label: 'Password', type: 'password', helpText: 'Must be at least 8 characters.' } };
export const Disabled     = { args: { label: 'Read-only field', value: 'Cannot edit', disabled: true } };
export const ClearButton  = { args: { label: 'Search', value: 'Some text', clearButton: true } };
export const MagicTone    = { args: { label: 'AI prompt', placeholder: 'Describe your product...', tone: 'magic' } };
