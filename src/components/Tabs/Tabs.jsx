import { useState } from 'react';

const TabsCaretDown = ({ color = '#303030', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M5 8l5 5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TabsPlusIcon = ({ color = '#303030' }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 4.75v10.5M4.75 10h10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function Tabs({
  tabs = [],
  activeIndex = 0,
  onChange,
  fitted = false,
  moreViews = false,
  canAddNew = false,
  mobile = false,
}) {
  const [hovIdx, setHovIdx] = useState(null);
  const [focIdx, setFocIdx] = useState(null);
  const fontSize = mobile ? 14 : 12;
  const lineH = mobile ? '20px' : '16px';

  function tabBg(key, disabled) {
    if (disabled) return 'transparent';
    if (key === activeIndex) return 'rgba(0,0,0,0.08)';
    if (hovIdx === key || focIdx === key) return 'rgba(0,0,0,0.05)';
    return 'transparent';
  }

  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, padding: '0 4px', alignItems: 'center', fontFamily: 'Inter,sans-serif' }}>
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        const isFoc = focIdx === i;
        const rightPad = isActive && tab.actions ? 8 : 12;
        return (
          <div key={i} role="tab" aria-selected={isActive} tabIndex={tab.disabled ? -1 : 0}
            onClick={() => !tab.disabled && onChange && onChange(i)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !tab.disabled && onChange && onChange(i); } }}
            onMouseEnter={() => !tab.disabled && setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            onFocus={() => setFocIdx(i)}
            onBlur={() => setFocIdx(null)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 28, padding: `6px ${rightPad}px 6px 12px`,
              borderRadius: 8, background: tabBg(i, tab.disabled),
              cursor: tab.disabled ? 'default' : 'pointer',
              flexShrink: fitted ? undefined : 0,
              flex: fitted ? '1 0 0' : undefined,
              minWidth: fitted ? 1 : undefined,
              position: 'relative', outline: 'none',
              transition: 'background 0.1s', userSelect: 'none', boxSizing: 'border-box' }}>
            {isFoc && <div style={{ position: 'absolute', inset: -1, borderRadius: 8, border: '2px solid #005bd3', pointerEvents: 'none', zIndex: 1 }} />}
            <span style={{ fontSize, fontWeight: 550, lineHeight: lineH, color: tab.disabled ? '#b5b5b5' : '#303030', whiteSpace: 'nowrap' }}>{tab.label}</span>
            {tab.badge !== undefined && (
              <div style={{ paddingLeft: 8, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <div style={{ background: 'rgba(0,0,0,0.06)', borderRadius: 8, height: 20, padding: '2px 8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 550, color: tab.disabled ? '#b5b5b5' : '#616161', lineHeight: '16px', whiteSpace: 'nowrap' }}>{tab.badge}</span>
                </div>
              </div>
            )}
            {isActive && tab.actions && (
              <div style={{ marginLeft: 4, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <TabsCaretDown size={16} color="#303030" />
              </div>
            )}
          </div>
        );
      })}
      {moreViews && (
        <div tabIndex={0}
          onMouseEnter={() => setHovIdx('more')} onMouseLeave={() => setHovIdx(null)}
          style={{ display: 'flex', alignItems: 'center', height: 28, padding: '6px 8px 6px 12px', borderRadius: 8,
            background: hovIdx === 'more' ? 'rgba(0,0,0,0.05)' : 'transparent',
            cursor: 'pointer', transition: 'background 0.1s', outline: 'none', userSelect: 'none', flexShrink: 0 }}>
          <span style={{ fontSize, fontWeight: 550, lineHeight: lineH, color: '#303030', whiteSpace: 'nowrap' }}>More views</span>
          <TabsCaretDown size={20} color="#303030" />
        </div>
      )}
      {canAddNew && (
        <div tabIndex={0}
          onMouseEnter={() => setHovIdx('add')} onMouseLeave={() => setHovIdx(null)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 6px', borderRadius: 8,
            background: hovIdx === 'add' ? 'rgba(0,0,0,0.05)' : 'transparent',
            cursor: 'pointer', transition: 'background 0.1s', outline: 'none', flexShrink: 0 }}>
          <TabsPlusIcon color="#303030" />
        </div>
      )}
    </div>
  );
}
