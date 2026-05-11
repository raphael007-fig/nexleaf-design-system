export function Accordion({ title, description, required, open, onToggle, hasContent, children }) {
  return (
    <div style={{ border: '1.5px solid #e0e0e0', borderRadius: 10, overflow: 'hidden', width: '100%' }}>
      <button type="button" onClick={onToggle}
        style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: open ? '#f7f9fc' : '#fff', border: 'none', cursor: 'pointer',
          borderBottom: open ? '1px solid #e0e0e0' : 'none', fontFamily: 'Inter,sans-serif', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#303030', display: 'flex', alignItems: 'center', gap: 6 }}>
            {title}
            {required && <span style={{ color: '#d92d20' }}>*</span>}
            {hasContent && !open && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#12B76A', display: 'inline-block', flexShrink: 0 }} />}
          </span>
          {description && (
            <span style={{ fontSize: 13, fontWeight: 450, color: '#616161', lineHeight: '20px', fontFamily: 'Inter,sans-serif' }}>
              {description}
            </span>
          )}
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#616161" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
}
