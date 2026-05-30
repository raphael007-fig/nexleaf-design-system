import { useState } from 'react';
import { BTN_SHADOW_ACTIVE } from '../../tokens/index.js';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';

function PaginationBtn({ direction, disabled, type = 'page', onClick, focused, onFocus, onBlur }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const isPage = type === 'page';

  const bg = disabled
    ? (isPage ? 'rgba(0,0,0,0.04)' : 'transparent')
    : act  ? 'rgba(0,0,0,0.17)'
      : hov  ? 'rgba(0,0,0,0.13)'
        : isPage ? 'rgba(0,0,0,0.08)' : 'transparent';

  // Focus ring takes precedence over pressed shadow so the keyboard
  // indicator is never combined with another box-shadow (WCAG 2.4.7).
  let shadow = 'none';
  if (focused && !disabled)        shadow = '0 0 0 2px #005bd3';
  else if (act && !disabled)       shadow = BTN_SHADOW_ACTIVE;

  const br = direction === 'prev' ? '8px 0 0 8px' : '0 8px 8px 0';

  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
      onClick={!disabled ? onClick : undefined} disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 4, border: 'none', outline: 'none',
        borderRadius: br, background: bg, boxShadow: shadow,
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.1s, box-shadow 0.12s' }}>
      {direction === 'prev'
        ? <PolarisIconImg name="ChevronLeftIcon"  size={20} color={disabled ? '#b5b5b5' : '#303030'} />
        : <PolarisIconImg name="ChevronRightIcon" size={20} color={disabled ? '#b5b5b5' : '#303030'} />}
    </button>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────
// Renders skeleton boxes in place of the arrow buttons and a Skeleton.Line
// for the label area. Matches the live component's height (28px for the
// button row) so the surrounding layout doesn't shift on toggle.
function PaginationSkeleton({ type, hasLabel }) {
  const isTable = type === 'table';
  // 28px tall = 20px icon + 4px padding × 2 (matches PaginationBtn)
  const btnSize = 28;
  const ArrowBoxes = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Skeleton width={btnSize} height={btnSize} radius={0}
        style={{ borderRadius: '8px 0 0 8px' }} />
      <Skeleton width={btnSize} height={btnSize} radius={0}
        style={{ borderRadius: '0 8px 8px 0', marginLeft: 1 }} />
    </div>
  );

  if (isTable) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%',
        background: '#f7f9fc', padding: '6px 8px 6px 12px' }}>
        {hasLabel && (
          <Skeleton.Line width={140} height={13} />
        )}
        <div style={{ flex: '1 0 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {ArrowBoxes}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Skeleton width={btnSize} height={btnSize} radius={0}
        style={{ borderRadius: '8px 0 0 8px' }} />
      {hasLabel && (
        <div style={{ padding: '4px 12px', display: 'flex', alignItems: 'center', height: btnSize }}>
          <Skeleton.Line width={96} height={13} />
        </div>
      )}
      <Skeleton width={btnSize} height={btnSize} radius={0}
        style={{ borderRadius: '0 8px 8px 0' }} />
    </div>
  );
}

export function Pagination({
  hasPrevious = false,
  hasNext = true,
  onPrevious,
  onNext,
  label,
  type = 'page',
  loading = false,
}) {
  // Track which button currently has keyboard focus so we can paint a
  // 2px primary focus ring (`#005bd3`) on it. WCAG 2.4.7 requires a
  // visible focus indicator on every interactive element.
  const [focused, setFocused] = useState(null); // 'prev' | 'next' | null

  if (loading) {
    return <PaginationSkeleton type={type} hasLabel={label !== undefined && label !== null && label !== false} />;
  }

  if (type === 'table') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%',
        background: '#f7f9fc', padding: '6px 8px 6px 12px' }}>
        {label && (
          <span style={{ fontSize: 13, fontWeight: 450, color: '#303030', lineHeight: '20px',
            whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
            {label}
          </span>
        )}
        <div style={{ flex: '1 0 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <PaginationBtn direction="prev" disabled={!hasPrevious} onClick={onPrevious} type="table"
            focused={focused === 'prev'}
            onFocus={() => setFocused('prev')} onBlur={() => setFocused(null)} />
          <PaginationBtn direction="next" disabled={!hasNext}     onClick={onNext}     type="table"
            focused={focused === 'next'}
            onFocus={() => setFocused('next')} onBlur={() => setFocused(null)} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PaginationBtn direction="prev" disabled={!hasPrevious} onClick={onPrevious} type="page"
        focused={focused === 'prev'}
        onFocus={() => setFocused('prev')} onBlur={() => setFocused(null)} />
      {label && (
        <div style={{ padding: '4px 12px', fontSize: 13, fontWeight: 450, color: '#303030',
          lineHeight: '20px', whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
          {label}
        </div>
      )}
      <PaginationBtn direction="next" disabled={!hasNext} onClick={onNext} type="page"
        focused={focused === 'next'}
        onFocus={() => setFocused('next')} onBlur={() => setFocused(null)} />
    </div>
  );
}
