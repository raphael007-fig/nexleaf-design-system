export default {
  title: 'Foundation/Colors',
  parameters: { layout: 'padded', controls: { disable: true }, actions: { disable: true } },
};

const Swatch = ({ token, value, usage }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0',
    borderBottom: '1px solid #f0f0f0', fontFamily: 'Inter, sans-serif' }}>
    <div style={{ width: 48, height: 48, borderRadius: 8, background: value, flexShrink: 0,
      border: '1px solid rgba(0,0,0,0.08)' }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#7c3aed', fontWeight: 600 }}>{token}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e', marginTop: 2 }}>{value}</div>
    </div>
    <div style={{ fontSize: 12, color: '#616161', maxWidth: 280 }}>{usage}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 14, fontWeight: 700, color: '#303030', marginBottom: 4,
      textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>
      {title}
    </h2>
    <div style={{ borderTop: '2px solid #e0e0e0' }}>{children}</div>
  </div>
);

const COLORS = {
  'Surface & Background': [
    { token: '--nx-bg-page',        value: '#f1f1f1', usage: 'App/page background' },
    { token: '--nx-bg-surface',     value: '#ffffff', usage: 'Cards, modals, panels' },
    { token: '--nx-bg-input',       value: '#fdfdfd', usage: 'Text inputs, selects, textareas at rest' },
    { token: '--nx-bg-input-hover', value: '#fafafa', usage: 'Input background on hover or focus' },
    { token: '--nx-bg-disabled',    value: 'rgba(0,0,0,0.06)', usage: 'Disabled field backgrounds' },
    { token: '--nx-bg-selected',    value: '#f0f7ff', usage: 'Selected row / checked option highlight' },
    { token: '--nx-bg-open',        value: '#f7f9fc', usage: 'Accordion open state, table pagination row' },
  ],
  'Primary (Interactive)': [
    { token: '--nx-color-primary',          value: '#005bd3', usage: 'Links, focus rings, interactive icons' },
    { token: '--nx-color-primary-disabled', value: 'rgba(0,0,0,0.17)', usage: 'Disabled primary button background' },
  ],
  'Text': [
    { token: '--nx-text-default',     value: '#303030', usage: 'Body text, labels, headings' },
    { token: '--nx-text-subdued',     value: '#616161', usage: 'Secondary text, icon strokes' },
    { token: '--nx-text-placeholder', value: '#9e9e9e', usage: 'Input placeholders, tertiary text' },
    { token: '--nx-text-disabled',    value: '#b5b5b5', usage: 'Disabled text and icons' },
    { token: '--nx-text-on-primary',  value: '#ffffff', usage: 'Text / icons on primary blue backgrounds' },
  ],
  'Borders': [
    { token: '--nx-border-default',       value: '#e0e0e0', usage: 'Card borders, accordion, dividers' },
    { token: '--nx-border-input',         value: '#8a8a8a', usage: 'Active input / select / textarea border' },
    { token: '--nx-border-input-error',   value: '#8e1f0b', usage: 'Input border in error state' },
    { token: '--nx-border-light',         value: '#ebebeb', usage: 'Subtle dividers, list separators' },
    { token: '--nx-border-lighter',       value: '#f0f0f0', usage: 'Intra-list separators' },
    { token: '--nx-border-secondary-btn', value: '#c9c9c9', usage: 'Secondary button borders' },
  ],
  'Success': [
    { token: '--nx-color-success', value: '#12b76a', usage: 'Success icon fill, indicator dots' },
    { token: '--nx-bg-success',    value: '#cdfee1', usage: 'Success banner / badge background' },
    { token: '--nx-text-success',  value: '#0c5132', usage: 'Success banner / badge text' },
    { token: '--nx-border-success',value: '#7be8b4', usage: 'Success banner border' },
  ],
  'Warning': [
    { token: '--nx-bg-warning',    value: '#fff3cd', usage: 'Warning banner / badge background' },
    { token: '--nx-text-warning',  value: '#856404', usage: 'Warning banner / badge text' },
    { token: '--nx-border-warning',value: '#ffd966', usage: 'Warning banner border' },
  ],
  'Info': [
    { token: '--nx-bg-info',    value: '#eaf4ff', usage: 'Info banner background' },
    { token: '--nx-text-info',  value: '#00527c', usage: 'Info banner text' },
    { token: '--nx-border-info',value: '#b3d9f7', usage: 'Info banner border' },
  ],
  'Critical': [
    { token: '--nx-color-critical',  value: '#d92d20', usage: 'Error text, required asterisk, destructive actions' },
    { token: '--nx-bg-critical',     value: '#fee9e8', usage: 'Error input background, critical banner' },
    { token: '--nx-text-critical',   value: '#8e1f0b', usage: 'Critical banner / error message text' },
    { token: '--nx-border-critical', value: '#f5b8b5', usage: 'Critical banner border' },
  ],
  'Domain-Specific': [
    { token: '--nx-color-morning', value: '#f59e0b', usage: 'Morning / day session indicators and labels' },
    { token: '--nx-color-evening', value: '#6366f1', usage: 'Evening / night session indicators and labels' },
  ],
};

export const AllColors = {
  name: 'All Color Tokens',
  render: () => (
    <div style={{ maxWidth: 800, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#303030', marginBottom: 8 }}>Color Tokens</h1>
      <p style={{ fontSize: 14, color: '#616161', marginBottom: 40, lineHeight: 1.6 }}>
        Every color in the system maps to one of these tokens.{' '}
        <strong>Never hardcode hex values</strong> — always reference the CSS custom property.
        Import <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>tokens.css</code>{' '}
        once at the root of your project to make all variables available.
      </p>
      {Object.entries(COLORS).map(([group, tokens]) => (
        <Section key={group} title={group}>
          {tokens.map(t => <Swatch key={t.token} {...t} />)}
        </Section>
      ))}
    </div>
  ),
};
