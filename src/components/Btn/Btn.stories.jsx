import { Btn, IconBtn, ButtonGroup, BtnGroupSegmented } from './Btn.jsx';

const IcoPlus = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoTrash = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M6 8v7a1 1 0 001 1h6a1 1 0 001-1V8M4 6h12M8 6V5a1 1 0 011-1h2a1 1 0 011 1v1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  title: 'Components/Btn',
  component: Btn,
  parameters: { layout: 'padded', backgrounds: { default: 'light' } },
  argTypes: {
    variant:   { control: 'select', options: ['primary', 'strong', 'secondary', 'ghost', 'tertiary', 'plain', 'destructive'] },
    tone:      { control: 'select', options: ['default', 'critical', 'success'] },
    size:      { control: 'select', options: ['micro', 'medium', 'large'] },
    disabled:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disclosure:{ control: 'boolean' },
    children:  { control: 'text' },
  },
};

// ─── Single interactive control ─────────────────────────────────
export const Playground = {
  args: { children: 'Save', variant: 'primary' },
};

// ─── Full state matrix ───────────────────────────────────────────
const StateLabel = ({ children }) => (
  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#9e9e9e',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
    borderBottom: '1px solid #f0f0f0', fontFamily: 'Inter, sans-serif' }}>
    <div style={{ width: 120, fontSize: 12, color: '#616161', fontWeight: 500, flexShrink: 0 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>{children}</div>
  </div>
);

export const AllStates = {
  name: 'All Variants × States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 800, fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#303030', marginBottom: 4 }}>Button State Matrix</h2>
      <p style={{ fontSize: 13, color: '#616161', marginBottom: 24, lineHeight: 1.5 }}>
        Interact with each button to verify hover / active / focus states.
        Disabled buttons use <code style={{ fontFamily: 'monospace', fontSize: 11 }}>bg-disabled</code> + <code style={{ fontFamily: 'monospace', fontSize: 11 }}>text-disabled</code>.
      </p>
      <div style={{ borderTop: '2px solid #e0e0e0' }}>
        <Row label="Primary">
          <Btn variant="primary">Rest</Btn>
          <Btn variant="primary" disabled>Disabled</Btn>
          <Btn variant="primary" disclosure>Disclosure</Btn>
          <Btn variant="primary" icon={<IcoPlus size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Strong">
          <Btn variant="strong">Rest</Btn>
          <Btn variant="strong" disabled>Disabled</Btn>
          <Btn variant="strong" disclosure>Disclosure</Btn>
          <Btn variant="strong" icon={<IcoPlus size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Secondary">
          <Btn variant="secondary">Rest</Btn>
          <Btn variant="secondary" disabled>Disabled</Btn>
          <Btn variant="secondary" disclosure>Disclosure</Btn>
          <Btn variant="secondary" icon={<IcoPlus size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Destructive">
          <Btn variant="destructive">Delete record</Btn>
          <Btn variant="destructive" disabled>Disabled</Btn>
          <Btn variant="destructive" icon={<IcoTrash size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Ghost">
          <Btn variant="ghost">Learn more</Btn>
          <Btn variant="ghost" disabled>Disabled</Btn>
        </Row>
        <Row label="Tertiary">
          <Btn variant="tertiary">Tertiary</Btn>
          <Btn variant="tertiary" disabled>Disabled</Btn>
        </Row>
        <Row label="Sizes">
          <Btn variant="primary" small>Micro</Btn>
          <Btn variant="primary" size="medium">Medium</Btn>
          <Btn variant="primary" size="large">Large</Btn>
        </Row>
        <Row label="Full width">
          <div style={{ width: '100%' }}>
            <Btn variant="primary" fullWidth>Full-width primary</Btn>
          </div>
        </Row>
      </div>
    </div>
  ),
};

// ─── Individual variant stories ──────────────────────────────────
export const Primary = { args: { children: 'Save', variant: 'primary' } };
export const Strong = { args: { children: 'Confirm', variant: 'strong' } };
export const Secondary = { args: { children: 'Cancel', variant: 'secondary' } };
export const Destructive = { args: { children: 'Delete record', variant: 'destructive' } };
export const Ghost = { args: { children: 'Learn more', variant: 'ghost' } };
export const Disabled = { args: { children: 'Unavailable', variant: 'primary', disabled: true } };
export const FullWidth = {
  args: { children: 'Submit form', variant: 'primary', fullWidth: true },
  parameters: { layout: 'padded' },
};
export const WithDisclosure = { args: { children: 'More actions', variant: 'secondary', disclosure: true } };

// ─── Groups ──────────────────────────────────────────────────────
export const Group = {
  name: 'ButtonGroup',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <StateLabel>Tight (default — 8px)</StateLabel>
        <ButtonGroup gap="tight">
          <Btn variant="primary">Save</Btn>
          <Btn variant="secondary">Cancel</Btn>
        </ButtonGroup>
      </div>
      <div>
        <StateLabel>Extra tight (4px)</StateLabel>
        <ButtonGroup gap="extra-tight">
          <Btn variant="secondary">Back</Btn>
          <Btn variant="primary">Next</Btn>
        </ButtonGroup>
      </div>
      <div>
        <StateLabel>Loose (20px)</StateLabel>
        <ButtonGroup gap="loose">
          <Btn variant="ghost">Discard</Btn>
          <Btn variant="primary">Save changes</Btn>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const Segmented = {
  name: 'BtnGroupSegmented',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <StateLabel>Default</StateLabel>
        <BtnGroupSegmented buttons={[
          { label: 'All' },
          { label: 'Active' },
          { label: 'Archived' },
        ]} />
      </div>
      <div>
        <StateLabel>With disabled segment</StateLabel>
        <BtnGroupSegmented buttons={[
          { label: 'Today' },
          { label: 'This week' },
          { label: 'This month', disabled: true },
        ]} />
      </div>
    </div>
  ),
};
