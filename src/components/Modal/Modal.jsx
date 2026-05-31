// ── Nexleaf Design System — Modal ─────────────────────────────────────────────
// Accessible dialog primitive. Wraps content in a focus-trapped, scroll-locked,
// ARIA-correct dialog rendered through a portal. Every blocking modal surface in
// the system (image zoom, confirmation, AI panel, etc.) should sit on top of
// this instead of re-implementing backdrop + Escape by hand.
//
// Two usage modes:
//   1. Structured — pass `title` (+ optional `footer`). Modal renders the white
//      card surface, header with close button, scrollable body, footer row.
//   2. Raw — pass only `children`. Modal renders just the dialog wrapper; the
//      children supply their own surface. Provide `ariaLabel` for a name.
//
//   <Modal open={open} onClose={fn} title="Edit reading" footer={<Btn…/>}>
//     …form…
//   </Modal>

import { useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import {
  useFocusTrap, useScrollLock, useReturnFocus, useEscapeKey, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import { BG_SURFACE, BORDER_LIGHT, TEXT_DEFAULT, TEXT_SUBDUED, FOCUS_RING } from '../../tokens/index.js';

const IcoX = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

function CloseButton({ onClick }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      onClick={onClick}
      onFocus={() => { if (ref.current) ref.current.style.boxShadow = FOCUS_RING; }}
      onBlur={() => { if (ref.current) ref.current.style.boxShadow = 'none'; }}
      onMouseEnter={() => { if (ref.current) ref.current.style.background = 'rgba(0,0,0,0.06)'; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.background = 'transparent'; }}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent',
        color: TEXT_SUBDUED, cursor: 'pointer', outline: 'none', flexShrink: 0, padding: 0,
      }}
    >
      <IcoX />
    </button>
  );
}

export function Modal({
  open,
  onClose,
  children,
  title,
  footer,
  maxWidth = 620,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  ariaLabel,
  ariaLabelledby,
  zIndex = 1000,
}) {
  const dialogRef = useRef(null);
  const generatedTitleId = useId();
  const titleId = title ? generatedTitleId : undefined;

  useReturnFocus(open);
  useScrollLock(open);
  useFocusTrap(open, dialogRef);
  useEscapeKey(open && closeOnEscape, onClose);

  if (!open || typeof document === 'undefined') return null;

  const reduce = prefersReducedMotion();
  const labelledBy = ariaLabelledby || titleId;

  const structured = title != null || footer != null;

  const dialogInner = structured ? (
    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 32px)' }}>
      {(title != null || showCloseButton) && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 16, padding: '20px 24px 16px', borderBottom: `1px solid ${BORDER_LIGHT}`,
        }}>
          {title != null && (
            <h2 id={titleId} style={{
              margin: 0, fontSize: 18, fontWeight: 650, lineHeight: '24px', color: TEXT_DEFAULT,
            }}>
              {title}
            </h2>
          )}
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      )}
      <div style={{ padding: '16px 24px', overflowY: 'auto', flex: '1 1 auto' }}>
        {children}
      </div>
      {footer != null && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
          padding: '16px 24px', borderTop: `1px solid ${BORDER_LIGHT}`,
        }}>
          {footer}
        </div>
      )}
    </div>
  ) : children;

  const surfaceStyle = structured ? {
    width: '100%', maxWidth, background: BG_SURFACE, borderRadius: 16,
    boxShadow: '0 8px 28px rgba(0,0,0,0.18)', overflow: 'hidden',
  } : {
    width: '100%', maxWidth,
  };

  return createPortal(
    <div
      onMouseDown={e => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={!labelledBy ? ariaLabel : undefined}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={{
          ...surfaceStyle, outline: 'none',
          animation: reduce ? 'none' : 'nxFadeInScale 0.18s ease-out',
        }}
      >
        {dialogInner}
      </div>
    </div>,
    document.body
  );
}
