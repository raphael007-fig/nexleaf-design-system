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
//
// Size variants (structured mode), matching the Figma component:
//   • size="small"      → 380px wide   (compact confirmations)
//   • size="large"      → 620px wide   (default)
//   • size="fullscreen" → fills the viewport, square corners, no backdrop inset
//                         (reserve for mobile, per the design spec)
// `maxWidth` still wins if passed explicitly, so existing call-sites are
// unaffected and one-off widths remain possible.

import { useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import {
  useFocusTrap, useScrollLock, useReturnFocus, useEscapeKey, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import {
  BG_SURFACE, BG_SURFACE_ACTIVE, BORDER_DEFAULT, TEXT_DEFAULT, TEXT_SUBDUED,
  FOCUS_RING, RADIUS_XL,
} from '../../tokens/index.js';

// Modal surface elevation — Figma `shadow-600`: a soft 20px drop shadow plus a
// 1px inset hairline so the white card reads crisply against the scrim.
const MODAL_SHADOW =
  '0 20px 20px -8px rgba(26,26,26,0.28), ' +
  'inset 0 1px 0 rgba(204,204,204,0.5), inset 0 -1px 0 rgba(0,0,0,0.17), ' +
  'inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.17)';

// Width per size token (px). `fullscreen` is handled separately (fills viewport).
const SIZE_WIDTHS = { small: 380, large: 620 };

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
  size = 'large',
  maxWidth,
  bodyPadding = 16,
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
  const fullscreen = size === 'fullscreen';
  // Explicit maxWidth wins; otherwise resolve from the size token.
  const resolvedWidth = maxWidth ?? SIZE_WIDTHS[size] ?? SIZE_WIDTHS.large;
  const hasHeader = title != null || showCloseButton;

  const dialogInner = structured ? (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: fullscreen ? '100%' : undefined,
      maxHeight: fullscreen ? '100%' : 'calc(100vh - 32px)',
    }}>
      {hasHeader && (
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: title != null ? 'space-between' : 'flex-end',
          gap: 8, padding: '12px 12px 12px 16px',
          background: BG_SURFACE_ACTIVE, borderBottom: `1px solid ${BORDER_DEFAULT}`,
          flexShrink: 0,
        }}>
          {title != null && (
            <h2 id={titleId} style={{
              margin: 0, fontSize: 14, fontWeight: 650, lineHeight: '20px',
              color: TEXT_DEFAULT, flex: '1 1 auto', minWidth: 0,
            }}>
              {title}
            </h2>
          )}
          {showCloseButton && <CloseButton onClick={onClose} />}
        </div>
      )}
      <div style={{ padding: bodyPadding, overflowY: 'auto', flex: '1 1 auto' }}>
        {children}
      </div>
      {footer != null && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
          padding: 16, background: BG_SURFACE, borderTop: `1px solid ${BORDER_DEFAULT}`,
          flexShrink: 0,
        }}>
          {footer}
        </div>
      )}
    </div>
  ) : children;

  const surfaceStyle = fullscreen ? {
    width: '100%', height: '100%', maxWidth: 'none', background: BG_SURFACE,
    borderRadius: 0, boxShadow: 'none', overflow: 'hidden',
  } : structured ? {
    width: '100%', maxWidth: resolvedWidth, background: BG_SURFACE, borderRadius: RADIUS_XL,
    boxShadow: MODAL_SHADOW, overflow: 'hidden',
  } : {
    width: '100%', maxWidth: resolvedWidth,
  };

  return createPortal(
    <div
      onMouseDown={e => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: fullscreen ? 0 : 16,
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
