import { useState, useRef, useEffect } from 'react';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';

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

// Stable id helpers so a tab and its panel can reference each other via
// aria-controls / aria-labelledby. Keyed by the tab's `id` (falling back to its
// index) so callers that render <TabPanel> can connect with the same key.
export const tabDomId   = (key) => `nx-tab-${key}`;
export const tabPanelId = (key) => `nx-tabpanel-${key}`;

export function Tabs({
  tabs = [],
  activeIndex = 0,
  onSelect,
  fitted = false,
  moreViews = false,
  canAddNew = false,
  mobile = false,
  loading = false,
  loadingCount = 3,
  ariaLabel = 'Tabs',
}) {
  const [hovIdx, setHovIdx] = useState(null);
  const [focIdx, setFocIdx] = useState(null);
  const fontSize = mobile ? 14 : 12;
  const lineH = mobile ? '20px' : '16px';

  // Refs to each tab DOM node so arrow-key navigation can programmatically
  // focus the destination tab (roving-tabindex pattern requires the actual
  // DOM .focus() call — React state alone won't move the browser caret).
  const tabRefs = useRef([]);
  // Track whether the user just navigated via arrow keys so we can move focus
  // in an effect *after* React commits the new activeIndex / tabIndex values.
  const pendingFocus = useRef(null);

  useEffect(() => {
    if (pendingFocus.current !== null) {
      const node = tabRefs.current[pendingFocus.current];
      if (node && typeof node.focus === 'function') node.focus();
      pendingFocus.current = null;
    }
  }, [activeIndex]);

  // Centralised activation — canonical callback is onSelect(id, item, index).
  // `id` is the tab's stable identity (falls back to its index as a string);
  // `index` is provided as the 3rd arg for callers that track selection by
  // position rather than id.
  const activate = (i) => {
    const item = tabs[i];
    if (!item || item.disabled) return;
    if (onSelect) onSelect(item.id ?? String(i), item, i);
  };

  // Find the next non-disabled tab in a given direction, wrapping at the
  // ends. Returns the same index back if every other tab is disabled.
  const findNext = (from, dir) => {
    const n = tabs.length;
    if (n === 0) return from;
    for (let step = 1; step <= n; step++) {
      const idx = (from + dir * step + n * step) % n;
      if (!tabs[idx]?.disabled) return idx;
    }
    return from;
  };
  const findFirst = () => tabs.findIndex(t => !t?.disabled);
  const findLast  = () => {
    for (let i = tabs.length - 1; i >= 0; i--) if (!tabs[i]?.disabled) return i;
    return -1;
  };

  const onTabKeyDown = (e, i) => {
    if (tabs[i]?.disabled) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        activate(i);
        return;
      case 'ArrowRight': {
        e.preventDefault();
        const next = findNext(i, +1);
        if (next !== i) { pendingFocus.current = next; activate(next); }
        return;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        const prev = findNext(i, -1);
        if (prev !== i) { pendingFocus.current = prev; activate(prev); }
        return;
      }
      case 'Home': {
        e.preventDefault();
        const first = findFirst();
        if (first !== -1 && first !== i) { pendingFocus.current = first; activate(first); }
        return;
      }
      case 'End': {
        e.preventDefault();
        const last = findLast();
        if (last !== -1 && last !== i) { pendingFocus.current = last; activate(last); }
        return;
      }
      default:
        return;
    }
  };

  if (loading) {
    // Tab pills are 28px tall with 8px border-radius. Widths vary by label so
    // we randomise across a small set of plausible widths for a natural look.
    const PLACEHOLDER_WIDTHS = [72, 96, 60, 88, 104];
    return (
      <div role="tablist" aria-busy="true" style={{ display: 'flex', gap: 4, padding: '0 4px', alignItems: 'center', fontFamily: 'Inter,sans-serif' }}>
        <SkeletonGroup label="Loading tabs">
          {Array.from({ length: loadingCount }).map((_, i) => (
            <Skeleton
              key={i}
              width={PLACEHOLDER_WIDTHS[i % PLACEHOLDER_WIDTHS.length]}
              height={28}
              radius={8}
              delay={i * 0.06}
              ariaLabel={null}
            />
          ))}
        </SkeletonGroup>
      </div>
    );
  }

  function tabBg(key, disabled) {
    if (disabled) return 'transparent';
    if (key === activeIndex) return 'rgba(0,0,0,0.08)';
    if (hovIdx === key || focIdx === key) return 'rgba(0,0,0,0.05)';
    return 'transparent';
  }

  return (
    <div role="tablist" aria-label={ariaLabel} style={{ display: 'flex', gap: 4, padding: '0 4px', alignItems: 'center', fontFamily: 'Inter,sans-serif' }}>
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        const isFoc = focIdx === i;
        const rightPad = isActive && tab.actions ? 8 : 12;
        const key = tab.id ?? i;
        // Roving tabindex: only the active tab is in the tab sequence. Arrow
        // keys move focus + selection between siblings; Tab moves out of the
        // tablist entirely (WAI-ARIA tablist pattern).
        const rovingTabIndex = tab.disabled ? -1 : (isActive ? 0 : -1);
        return (
          <div key={i}
            ref={el => { tabRefs.current[i] = el; }}
            id={tabDomId(key)}
            role="tab" aria-selected={isActive} aria-disabled={tab.disabled || undefined}
            aria-controls={tab.panel === false ? undefined : tabPanelId(key)}
            tabIndex={rovingTabIndex}
            onClick={() => !tab.disabled && activate(i)}
            onKeyDown={e => onTabKeyDown(e, i)}
            onMouseEnter={() => !tab.disabled && setHovIdx(i)}
            onMouseLeave={() => setHovIdx(null)}
            onFocus={() => setFocIdx(i)}
            onBlur={() => setFocIdx(null)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
              // Touch target: tab pills are 28px on desktop; bump to a 44px hit
              // area on mobile so they clear the WCAG touch-target minimum.
              height: mobile ? 44 : 28, padding: `6px ${rightPad}px 6px 12px`,
              borderRadius: 8, background: tabBg(i, tab.disabled),
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
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

// ─── TabPanel ─────────────────────────────────────────────────────────────────
// Companion to <Tabs>. Renders the content region a tab controls, wired with
// role="tabpanel" + aria-labelledby back to its tab so the relationship is
// announced. Pass the same `id` you used as the tab's `id` (or its index).
//
//   <Tabs tabs={[{id:'a',label:'A'},{id:'b',label:'B'}]} activeIndex={idx} … />
//   <TabPanel id="a" active={idx === 0}>…</TabPanel>
//   <TabPanel id="b" active={idx === 1}>…</TabPanel>
//
// Inactive panels are removed via the `hidden` attribute (kept in the DOM so
// ids stay valid for aria-controls). tabIndex={0} makes the panel itself
// focusable per the WAI-ARIA tabs pattern when it has no focusable children.
export function TabPanel({ id, tabId, active = true, children, style }) {
  const key = id;
  return (
    <div
      id={tabPanelId(key)}
      role="tabpanel"
      aria-labelledby={tabDomId(tabId ?? key)}
      tabIndex={0}
      hidden={!active}
      style={{ outline: 'none', ...style }}
    >
      {children}
    </div>
  );
}
