import { Badge, StatusBadge, BADGE_TONES, BADGE_STRONG_TONES } from './Badge.jsx';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    tone:              { control: 'select', options: [...Object.keys(BADGE_TONES), ...Object.keys(BADGE_STRONG_TONES)] },
    size:              { control: 'select', options: ['medium', 'large'] },
    progress:          { control: 'select', options: [undefined, 'incomplete', 'partial', 'complete'] },
    progressIndicator: { control: 'boolean' },
    icon:              { control: 'boolean' },
    onDismiss:         { control: false },
  },
};

export const Default    = { args: { children: 'Label', tone: 'default' } };
export const Info       = { args: { children: 'Info',     tone: 'info' } };
export const Success    = { args: { children: 'Active',   tone: 'success' } };
export const Warning    = { args: { children: 'Warning',  tone: 'warning' } };
export const Critical   = { args: { children: 'Critical', tone: 'critical' } };
export const Attention  = { args: { children: 'Pending',  tone: 'attention' } };

export const AllTones = {
  name: 'All Tones — Regular',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {Object.keys(BADGE_TONES).map(tone => (
        <Badge key={tone} tone={tone} />
      ))}
    </div>
  ),
};

export const WithProgress = {
  name: 'Progress Dots (legacy)',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge progress="incomplete">Incomplete</Badge>
      <Badge progress="partial">Partial</Badge>
      <Badge progress="complete">Complete</Badge>
    </div>
  ),
};

export const Statuses = {
  name: 'StatusBadge',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <StatusBadge status="pending" />
      <StatusBadge status="completed" />
      <StatusBadge status="locked" />
      <StatusBadge status="critical" />
      <StatusBadge status="info" />
    </div>
  ),
};

// ─── Strong tones ────────────────────────────────────────────────────────────

// Each strong tone has 4 sub-variants: plain | dot | icon | dismiss
const StrongRow = ({ tone }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Badge tone={tone}>Label</Badge>
    <Badge tone={tone} progressIndicator>Label</Badge>
    <Badge tone={tone} icon>Label</Badge>
    <Badge tone={tone} onDismiss={() => {}}>Label</Badge>
  </div>
);

export const StrongTones = {
  name: 'Strong — Medium',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.keys(BADGE_STRONG_TONES).map(tone => (
        <div key={tone} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, color: '#9e9e9e', width: 148, flexShrink: 0 }}>{tone}</span>
          <StrongRow tone={tone} />
        </div>
      ))}
    </div>
  ),
};

export const StrongLarge = {
  name: 'Strong — Large',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Object.keys(BADGE_STRONG_TONES).map(tone => (
        <div key={tone} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, color: '#9e9e9e', width: 148, flexShrink: 0 }}>{tone}</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Badge tone={tone} size="large">Label</Badge>
            <Badge tone={tone} size="large" progressIndicator>Label</Badge>
            <Badge tone={tone} size="large" icon>Label</Badge>
            <Badge tone={tone} size="large" onDismiss={() => {}}>Label</Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Regular tones</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {Object.keys(BADGE_TONES).map(tone => <Badge key={tone} tone={tone} />)}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Progress dots</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge progress="incomplete">Incomplete</Badge>
          <Badge progress="partial">Partial</Badge>
          <Badge progress="complete">Complete</Badge>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Strong tones — plain / dot / icon / dismiss
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.keys(BADGE_STRONG_TONES).map(tone => <StrongRow key={tone} tone={tone} />)}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Large size</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge size="large">Default</Badge>
          <Badge tone="info" size="large">Info</Badge>
          <Badge tone="success" size="large">Active</Badge>
          <Badge tone="info-strong" size="large">Info Strong</Badge>
          <Badge tone="success-strong" size="large">Success Strong</Badge>
          <Badge tone="critical-strong" size="large">Critical Strong</Badge>
        </div>
      </div>

    </div>
  ),
};
