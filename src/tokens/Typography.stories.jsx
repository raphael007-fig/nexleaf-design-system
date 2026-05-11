export default {
  title: 'Foundation/Typography',
  parameters: { layout: 'padded', controls: { disable: true }, actions: { disable: true } },
};

const TypeRow = ({ token, size, weight, lineHeight, usage, sample }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '14px 0',
    borderBottom: '1px solid #f0f0f0', fontFamily: 'Inter, sans-serif' }}>
    <div style={{ width: 200, flexShrink: 0 }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600, marginBottom: 2 }}>{token}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e' }}>{size} / {weight} / lh {lineHeight}</div>
    </div>
    <div style={{ flex: 1, fontSize: parseInt(size), fontWeight: parseInt(weight), color: '#303030', lineHeight }}>
      {sample}
    </div>
    <div style={{ width: 200, fontSize: 12, color: '#616161', flexShrink: 0 }}>{usage}</div>
  </div>
);

const WeightRow = ({ name, value, sample }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0',
    borderBottom: '1px solid #f0f0f0', fontFamily: 'Inter, sans-serif' }}>
    <div style={{ width: 200, flexShrink: 0 }}>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{name}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e', marginTop: 2 }}>{value}</div>
    </div>
    <div style={{ fontSize: 14, fontWeight: parseInt(value), color: '#303030', flex: 1 }}>{sample}</div>
    <div style={{ width: 200, fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e' }}>font-weight: {value}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 14, fontWeight: 700, color: '#303030', marginBottom: 4,
      textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>
      {title}
    </h2>
    <div style={{ borderTop: '2px solid #e0e0e0' }}>{children}</div>
  </div>
);

export const AllTypography = {
  name: 'All Typography Tokens',
  render: () => (
    <div style={{ maxWidth: 860, fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: '#303030', marginBottom: 8 }}>Typography</h1>
      <p style={{ fontSize: 14, color: '#616161', marginBottom: 40, lineHeight: 1.6 }}>
        All text in the system uses <strong>Inter</strong>. Never fall back to system fonts.
        Use CSS custom properties from{' '}
        <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>tokens.css</code>.
      </p>

      <Section title="Type Scale">
        <TypeRow
          token="--nx-font-size-heading-lg"
          size="24px" weight="700" lineHeight="32px"
          usage="Page headings (rare)"
          sample="Temperature Reading"
        />
        <TypeRow
          token="--nx-font-size-heading-md"
          size="20px" weight="600" lineHeight="28px"
          usage="Screen / modal headings"
          sample="Morning Reading"
        />
        <TypeRow
          token="--nx-font-size-heading-sm"
          size="16px" weight="600" lineHeight="24px"
          usage="Card titles, section headings"
          sample="Fridge A — Zone 1"
        />
        <TypeRow
          token="--nx-font-size-body"
          size="14px" weight="400" lineHeight="20px"
          usage="Default body, input values, descriptions"
          sample="Enter the temperature reading for this session."
        />
        <TypeRow
          token="--nx-font-size-label"
          size="13px" weight="500" lineHeight="20px"
          usage="Field labels, secondary text, table headers"
          sample="Temperature (°C)"
        />
        <TypeRow
          token="--nx-font-size-caption"
          size="12px" weight="400" lineHeight="16px"
          usage="Badges, footnotes, timestamps, helper text"
          sample="Last updated 2 hours ago"
        />
      </Section>

      <Section title="Font Weights">
        <WeightRow name="--nx-font-weight-regular"   value="400" sample="Regular — body text, input values, descriptions" />
        <WeightRow name="--nx-font-weight-medium"    value="500" sample="Medium — field labels, secondary headings" />
        <WeightRow name="--nx-font-weight-semibold"  value="550" sample="Semibold — strong emphasis, nav items" />
        <WeightRow name="--nx-font-weight-bold"      value="600" sample="Bold — card titles, buttons, section headings" />
        <WeightRow name="--nx-font-weight-extrabold" value="700" sample="Extra bold — page headings, hero text" />
      </Section>

      <Section title="Line Heights">
        {[
          { token: '--nx-line-height-tight',   value: '16px', usage: 'Captions, badges, compact UI' },
          { token: '--nx-line-height-normal',  value: '20px', usage: 'Body copy, labels, inputs' },
          { token: '--nx-line-height-relaxed', value: '24px', usage: 'Headings, multi-line descriptions' },
        ].map(({ token, value, usage }) => (
          <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0',
            borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: 200, flexShrink: 0 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{token}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#9e9e9e', marginTop: 2 }}>{value}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', background: '#f7f9fc',
                border: '1px solid #e0e0e0', borderRadius: 6, padding: '8px 12px', lineHeight: value,
                fontSize: 14, color: '#303030' }}>
                <span>Line one of text content</span>
                <span>Line two of text content</span>
              </div>
            </div>
            <div style={{ width: 200, fontSize: 12, color: '#616161', flexShrink: 0 }}>{usage}</div>
          </div>
        ))}
      </Section>

      <Section title="CSS Implementation">
        <div style={{ padding: '16px 0', fontFamily: 'monospace' }}>
          <pre style={{ fontSize: 12, color: '#303030', background: '#f7f9fc', border: '1px solid #e0e0e0',
            borderRadius: 8, padding: 16, lineHeight: 1.7, overflowX: 'auto' }}>
{`/* Always use tokens — never hardcode px or font-weight */

.nx-heading-md {
  font-size: var(--nx-font-size-heading-md);   /* 20px */
  font-weight: var(--nx-font-weight-bold);     /* 600 */
  line-height: var(--nx-line-height-relaxed);  /* 24px */
  color: var(--nx-text-default);              /* #303030 */
}

.nx-label {
  font-size: var(--nx-font-size-label);        /* 13px */
  font-weight: var(--nx-font-weight-medium);   /* 500 */
  line-height: var(--nx-line-height-normal);   /* 20px */
  color: var(--nx-text-default);
}

.nx-caption {
  font-size: var(--nx-font-size-caption);      /* 12px */
  font-weight: var(--nx-font-weight-regular);  /* 400 */
  line-height: var(--nx-line-height-tight);    /* 16px */
  color: var(--nx-text-subdued);              /* #616161 */
}`}
          </pre>
        </div>
      </Section>
    </div>
  ),
};
