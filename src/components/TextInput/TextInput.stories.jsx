import { useState } from 'react';
import { TextInput } from './TextInput.jsx';
import { Btn } from '../Btn/Btn.jsx';

// ─── Inline icons — paths from Nexleaf Icons V2 (PolarisIcon.jsx) ────────────
const IcoSearch = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#9e9e9e" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path fillRule="evenodd" d="M12.323 13.383a5.5 5.5 0 1 1 1.06-1.06l2.897 2.897a.75.75 0 1 1-1.06 1.06l-2.897-2.897Zm.677-4.383a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
  </svg>
);
const IcoCalendar = () => (
  <svg width={16} height={16} viewBox="0 0 20 20" fill="#9e9e9e" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path fillRule="evenodd" d="M7.75 3.5a.75.75 0 0 0-1.5 0v.407a3.075 3.075 0 0 0-.702.252 3.75 3.75 0 0 0-1.64 1.639c-.226.444-.32.924-.365 1.47-.043.531-.043 1.187-.043 2v1.464c0 .813 0 1.469.043 2 .045.546.14 1.026.366 1.47a3.75 3.75 0 0 0 1.639 1.64c.444.226.924.32 1.47.365.531.043 1.187.043 2 .043h3.383c.323 0 .542 0 .735-.02a3.75 3.75 0 0 0 3.344-3.344c.02-.193.02-.412.02-.735v-2.883c0-.813 0-1.469-.043-2-.045-.546-.14-1.026-.366-1.47a3.75 3.75 0 0 0-1.639-1.64 3.076 3.076 0 0 0-.702-.251v-.407a.75.75 0 0 0-1.5 0v.259c-.373-.009-.794-.009-1.268-.009h-1.964c-.474 0-.895 0-1.268.009v-.259Zm-1.521 1.995c.197-.1.458-.17.912-.207.462-.037 1.057-.038 1.909-.038h1.9c.853 0 1.447 0 1.91.038.453.037.714.107.912.207.423.216.767.56.983.984.1.197.17.458.207.912.014.18.024.38.029.609h-9.982c.006-.228.015-.429.03-.61.036-.453.106-.714.206-.911a2.25 2.25 0 0 1 .984-.984Zm-1.229 4.005v1.2c0 .853 0 1.447.038 1.91.037.453.107.714.207.912.216.423.56.767.984.983.197.1.458.17.912.207.462.037 1.057.038 1.909.038h3.306c.385 0 .52-.001.626-.012a2.25 2.25 0 0 0 2.006-2.006c.011-.106.012-.241.012-.626v-2.606h-10Z" />
  </svg>
);

export default {
  title: 'Components/Forms/TextInput',
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
        <div style={{ alignSelf: 'flex-start' }}>
          <Btn variant="primary" small onClick={() => setAttempted(true)}>Save reading</Btn>
        </div>
        {attempted && temp && (
          <div style={{ fontSize: 12, color: '#0c5132', background: '#cdfee1', borderRadius: 8, padding: '8px 12px' }}>
            Reading saved successfully.
          </div>
        )}
      </div>
    );
  },
};

// ─── Prefix & Suffix ─────────────────────────────────────────────
const ColLabel = ({ children }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
    {children}
  </div>
);

export const PrefixAndSuffix = {
  name: 'Prefix & Suffix',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 560, fontFamily: 'Inter, sans-serif' }}>

      <div>
        <ColLabel>Prefix — icon</ColLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Location" prefix={<IcoSearch />} placeholder="New York" value="New York" />
          <TextInput label="Search devices" prefix={<IcoSearch />} placeholder="e.g. FRZ-001" />
        </div>
      </div>

      <div>
        <ColLabel>Prefix — text</ColLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Price" prefix="$" placeholder="0.00" type="number" value="20.00" />
          <TextInput label="Discount" prefix="%" placeholder="0" type="number" />
        </div>
      </div>

      <div>
        <ColLabel>Suffix — icon</ColLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Label" suffix={<IcoCalendar />} placeholder="Pick a date" value="Value" />
          <TextInput label="Scheduled at" suffix={<IcoCalendar />} placeholder="Select date" />
        </div>
      </div>

      <div>
        <ColLabel>Suffix — text</ColLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Weight" suffix="lbs" placeholder="0" type="number" value="5" />
          <TextInput label="Temperature" suffix="°C" placeholder="4.5" type="number" />
        </div>
      </div>

      <div>
        <ColLabel>Prefix + Suffix combined</ColLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <TextInput label="Temperature reading" prefix="~" suffix="°C" placeholder="4.5" type="number" />
          <TextInput label="Price range" prefix="$" suffix="USD" placeholder="0.00" type="number" value="20.00" />
        </div>
      </div>

    </div>
  ),
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
