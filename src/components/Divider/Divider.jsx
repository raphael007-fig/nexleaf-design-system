export function Divider({ variant = 'default' }) {
  const s = variant === 'strong' ? { height: 1.5, background: '#e0e0e0', margin: '8px 0' }
    : variant === 'subtle'   ? { height: 1,   background: '#f0f0f0', margin: 0 }
      : { height: 1, background: '#ebebeb', margin: '4px 0' };
  return <div style={s} />;
}
