import { useId } from 'react';
import { prefersReducedMotion } from '../../foundation/overlay/overlayHooks.js';
import { BORDER_DEFAULT, BG_OPEN, TEXT_DEFAULT, TEXT_SUBDUED, COLOR_CRITICAL, COLOR_SUCCESS } from '../../tokens/index.js';

export function Accordion({ title, description, required, open, onToggle, hasContent, children }) {
  const reactId = useId();
  const headerId = `nx-accordion-header-${reactId}`;
  const bodyId = `nx-accordion-body-${reactId}`;
  const reduce = prefersReducedMotion();

  return (
    <div style={{ border: `1px solid ${BORDER_DEFAULT}`, borderRadius: 10, overflow: 'hidden', width: '100%' }}>
      <button type="button" id={headerId} onClick={onToggle}
        aria-expanded={!!open} aria-controls={bodyId}
        style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: open ? BG_OPEN : '#fff', border: 'none', cursor: 'pointer',
          borderBottom: open ? `1px solid ${BORDER_DEFAULT}` : 'none', fontFamily: 'Inter,sans-serif', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_DEFAULT, display: 'flex', alignItems: 'center', gap: 6 }}>
            {title}
            {required && <span style={{ color: COLOR_CRITICAL }}>*</span>}
            {hasContent && !open && <span style={{ width: 7, height: 7, borderRadius: '50%', background: COLOR_SUCCESS, display: 'inline-block', flexShrink: 0 }} />}
          </span>
          {description && (
            <span style={{ fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED, lineHeight: '20px', fontFamily: 'Inter,sans-serif' }}>
              {description}
            </span>
          )}
        </div>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transition: reduce ? 'none' : 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke={TEXT_SUBDUED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* Body stays mounted so the height transition can animate; collapsed via
          max-height + opacity. `hidden` from AT is conveyed by aria-expanded on
          the trigger plus inert content (pointerEvents none) when closed. */}
      <div id={bodyId} role="region" aria-labelledby={headerId}
        style={{
          maxHeight: open ? 2000 : 0,
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: reduce ? 'none' : 'max-height 0.25s ease, opacity 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}>
        <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
