export default {
  title: 'Foundation/Spacing',
  parameters: { layout: 'padded', controls: { disable: true }, actions: { disable: true } },
};

const SPACING = [
  { token: '--nx-space-1',  value: '4px',  num: 4  },
  { token: '--nx-space-2',  value: '8px',  num: 8  },
  { token: '--nx-space-3',  value: '12px', num: 12 },
  { token: '--nx-space-4',  value: '16px', num: 16 },
  { token: '--nx-space-5',  value: '20px', num: 20 },
  { token: '--nx-space-6',  value: '24px', num: 24 },
  { token: '--nx-space-8',  value: '32px', num: 32 },
  { token: '--nx-space-10', value: '40px', num: 40 },
];

const RADIUS = [
  { token: '--nx-radius-sm',     value: '8px',   usage: 'Buttons, inputs, banners, list containers' },
  { token: '--nx-radius-md',     value: '10px',  usage: 'Accordions' },
  { token: '--nx-radius-lg',     value: '12px',  usage: 'Option-cards, checkbox containers' },
  { token: '--nx-radius-xl',     value: '16px',  usage: 'Proto / navigation cards' },
  { token: '--nx-radius-pill',   value: '100px', usage: 'Badges, pills, tags' },
  { token: '--nx-radius-circle', value: '50%',   usage: 'Status indicator dots, avatars' },
];

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
    <h2 style={{ fontSize: 14, fontWeight: 700, color: '#303030', marginBottom: 4,
      textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {title}
    </h2>
    <div style={{ borderTop: '2px solid #e0e0e0' }}>{children}</div>
  </div>
);

export const AllSpacing = {
  name: 'Spacing & Radius Tokens',
  render: () => (
    <div style={{ maxWidth: 860, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#303030', marginBottom: 8 }}>Spacing & Border Radius</h1>
      <p style={{ fontSize: 14, color: '#616161', marginBottom: 40, lineHeight: 1.6 }}>
        All spacing is based on a <strong>4px grid</strong>. Use the CSS custom properties from{' '}
        <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>tokens.css</code>{' '}
        — never hardcode arbitrary pixel values.
      </p>

      <Section title="Spacing Scale">
        {SPACING.map(({ token, value, num }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
            borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: 160, flexShrink: 0 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{token}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e', marginTop: 2 }}>{value}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: num, height: num, background: '#005bd3', borderRadius: 2, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: '#9e9e9e' }}>{num}px × {num}px</div>
            </div>
            <div style={{ width: 280, flexShrink: 0 }}>
              <div style={{ height: 24, display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{ background: '#f0f7ff', border: '1px solid #005bd3', borderRadius: 4, padding: '0 6px',
                  fontSize: 11, color: '#005bd3', fontFamily: 'monospace' }}>
                  padding: var({token})
                </div>
              </div>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Border Radius">
        {RADIUS.map(({ token, value, usage }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0',
            borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: 200, flexShrink: 0 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{token}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e', marginTop: 2 }}>{value}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: token === '--nx-radius-circle' ? 40 : 64,
                height: token === '--nx-radius-circle' ? 40 : 40,
                background: '#e8f0fe',
                border: '1.5px solid #005bd3',
                borderRadius: value,
                flexShrink: 0,
              }} />
            </div>
            <div style={{ width: 280, fontSize: 12, color: '#616161', flexShrink: 0 }}>{usage}</div>
          </div>
        ))}
      </Section>

      <Section title="Common Spacing Patterns">
        <div style={{ padding: '16px 0' }}>
          <pre style={{ fontSize: 12, color: '#303030', background: '#f7f9fc', border: '1px solid #e0e0e0',
            borderRadius: 8, padding: 16, lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace' }}>
{`/* Card / panel */
.nx-card {
  padding: var(--nx-space-6);       /* 24px */
  border-radius: var(--nx-radius-xl); /* 16px */
  gap: var(--nx-space-5);           /* 20px between sections */
}

/* Form layout */
.nx-form {
  display: flex;
  flex-direction: column;
  gap: var(--nx-space-5);           /* 20px between fields */
}

/* Button row */
.nx-btn-row {
  display: flex;
  gap: var(--nx-space-3);           /* 12px between buttons */
}

/* Input padding */
.nx-input {
  padding: var(--nx-space-2) var(--nx-space-3); /* 8px 12px */
  border-radius: var(--nx-radius-sm);           /* 8px */
}

/* Badge / pill */
.nx-badge {
  padding: var(--nx-space-1) var(--nx-space-2); /* 4px 8px */
  border-radius: var(--nx-radius-pill);          /* 100px */
}`}
          </pre>
        </div>
      </Section>
    </div>
  ),
};
