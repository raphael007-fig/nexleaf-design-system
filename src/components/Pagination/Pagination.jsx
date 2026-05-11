import { useState } from 'react';
import { BTN_SHADOW_ACTIVE } from '../../tokens/index.js';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';

function PaginationBtn({ direction, disabled, type = 'page', onClick }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const isPage = type === 'page';

  const bg = disabled
    ? (isPage ? 'rgba(0,0,0,0.04)' : 'transparent')
    : act  ? 'rgba(0,0,0,0.17)'
      : hov  ? 'rgba(0,0,0,0.13)'
        : isPage ? 'rgba(0,0,0,0.08)' : 'transparent';

  const shadow = act && !disabled ? BTN_SHADOW_ACTIVE : 'none';
  const br = direction === 'prev' ? '8px 0 0 8px' : '0 8px 8px 0';

  return (
    <button onClick={!disabled ? onClick : undefined} disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 4, border: 'none', outline: 'none',
        borderRadius: br, background: bg, boxShadow: shadow,
        position: 'relative', overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.1s' }}>
      {direction === 'prev'
        ? <PolarisIconImg name="ChevronLeftIcon"  size={20} color={disabled ? '#b5b5b5' : '#303030'} />
        : <PolarisIconImg name="ChevronRightIcon" size={20} color={disabled ? '#b5b5b5' : '#303030'} />}
    </button>
  );
}

export function Pagination({ hasPrevious = false, hasNext = true, onPrevious, onNext, label, type = 'page' }) {
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
          <PaginationBtn direction="prev" disabled={!hasPrevious} onClick={onPrevious} type="table" />
          <PaginationBtn direction="next" disabled={!hasNext}     onClick={onNext}     type="table" />
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PaginationBtn direction="prev" disabled={!hasPrevious} onClick={onPrevious} type="page" />
      {label && (
        <div style={{ padding: '4px 12px', fontSize: 13, fontWeight: 450, color: '#303030',
          lineHeight: '20px', whiteSpace: 'nowrap', fontFamily: 'Inter,sans-serif' }}>
          {label}
        </div>
      )}
      <PaginationBtn direction="next" disabled={!hasNext} onClick={onNext} type="page" />
    </div>
  );
}
