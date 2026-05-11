import { PolarisIconImg, POLARIS_ICON_DATA } from './PolarisIcon.jsx';

export default {
  title: 'Foundation/PolarisIcon',
  component: PolarisIconImg,
  parameters: { layout: 'centered' },
  argTypes: {
    name:  { control: 'select', options: Object.keys(POLARIS_ICON_DATA) },
    size:  { control: 'number' },
    color: { control: 'color' },
  },
};

// Single icon with controls panel — use the Controls tab to change name/size/color
export const Playground = {
  name: 'Playground (single)',
  args: { name: 'SearchIcon', size: 20, color: '#616161' },
};

// Full library grid
export const AllIcons = {
  name: 'All Icons',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: '#303030', marginBottom: 4 }}>
        Icon Library
      </h2>
      <p style={{ fontSize: 13, color: '#616161', marginBottom: 20, lineHeight: 1.5 }}>
        {Object.keys(POLARIS_ICON_DATA).length} inline SVG icons.
        All rendered at 20×20px. Click to copy the icon name.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, maxWidth: 720 }}>
        {Object.keys(POLARIS_ICON_DATA).map(name => (
          <div
            key={name}
            title={name}
            onClick={() => navigator.clipboard?.writeText(name)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '12px 6px 10px', border: '1px solid #e0e0e0', borderRadius: 8,
              background: '#fff', cursor: 'pointer', transition: 'border-color 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#005bd3'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}
          >
            <PolarisIconImg name={name} size={20} color="#616161" />
            <span style={{ fontSize: 9, color: '#9e9e9e', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word' }}>
              {name.replace('Icon', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Common sizes
export const Sizes = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontFamily: 'Inter, sans-serif' }}>
      {[12, 16, 20, 24, 32].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <PolarisIconImg name="SearchIcon" size={size} color="#616161" />
          <span style={{ fontSize: 11, color: '#9e9e9e' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

// Icon colors in context
export const Colors = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontFamily: 'Inter, sans-serif' }}>
      {[
        { label: 'text-default',     color: '#303030' },
        { label: 'text-subdued',     color: '#616161' },
        { label: 'text-placeholder', color: '#9e9e9e' },
        { label: 'text-disabled',    color: '#b5b5b5' },
        { label: 'color-primary',    color: '#005bd3' },
        { label: 'color-critical',   color: '#d92d20' },
        { label: 'color-success',    color: '#12b76a' },
        { label: 'color-morning',    color: '#f59e0b' },
        { label: 'color-evening',    color: '#6366f1' },
      ].map(({ label, color }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <PolarisIconImg name="AlertCircleIcon" size={20} color={color} />
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#9e9e9e' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};
