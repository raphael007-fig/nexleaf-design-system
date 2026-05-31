import { useState, useId, useRef, useEffect, cloneElement, isValidElement } from 'react';
import { prefersReducedMotion } from '../../foundation/overlay/overlayHooks.js';

// ─── Arrow SVGs ───────────────────────────────────────────────────────────────
// Using SVG paths so filter:drop-shadow applies to the combined body+arrow shape

const ArrowDown = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"
    style={{ display: 'block', marginTop: -1, flexShrink: 0 }}>
    <path d="M0 0 L8 10 L16 0 Z" fill="#ffffff" />
  </svg>
);

const ArrowUp = () => (
  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"
    style={{ display: 'block', marginBottom: -1, flexShrink: 0 }}>
    <path d="M0 10 L8 0 L16 10 Z" fill="#ffffff" />
  </svg>
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────

/**
 * Tooltip
 *
 * Props:
 *   content    — string — tooltip label text
 *   position   — 'above' | 'below'  (default: 'above')
 *   children   — the trigger element
 */
export function Tooltip({
  content,
  position = 'above',
  children,
}) {
  const [visible, setVisible] = useState(false);
  const tipId = useId();
  const wrapRef = useRef(null);
  const reduce = prefersReducedMotion();

  // Touch + keyboard dismissal: on touch devices the tooltip is shown by a tap
  // (toggled below) and there's no hover-out, so close it on an outside tap or
  // Escape. Hover/focus paths still close themselves via onMouseLeave/onBlur.
  useEffect(() => {
    if (!visible) return;
    const onDocPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setVisible(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setVisible(false); };
    document.addEventListener('touchstart', onDocPointer, true);
    document.addEventListener('mousedown', onDocPointer, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('touchstart', onDocPointer, true);
      document.removeEventListener('mousedown', onDocPointer, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [visible]);

  // Associate the trigger with the tooltip bubble for screen readers. Clone the
  // single child to attach aria-describedby; if children isn't a single element
  // (e.g. raw text) we skip the clone and the wrapper still positions it.
  const describedChild = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': tipId })
    : children;

  // Outer drop-shadow applied to the whole shape (body + arrow merged)
  const DROP_SHADOW = 'drop-shadow(0px 4px 6px rgba(26,26,26,0.2))';

  // Inset border-shadows matching Figma shadow-300 spec
  const INSET_SHADOW = [
    'inset 1px 0 0 rgba(0,0,0,0.13)',
    'inset -1px 0 0 rgba(0,0,0,0.13)',
    'inset 0 -1px 0 rgba(0,0,0,0.17)',
    'inset 0 1px 0 rgba(204,204,204,0.5)',
  ].join(', ');

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onTouchStart={() => setVisible(v => !v)}
    >
      {describedChild}

      {visible && (
        <div
          id={tipId}
          role="tooltip"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(position === 'above'
              ? { bottom: 'calc(100% + 6px)' }
              : { top: 'calc(100% + 6px)' }),
            zIndex: 1000,
            pointerEvents: 'none',
            filter: DROP_SHADOW,
            animation: reduce ? 'none' : 'nxFadeIn 0.12s ease-out',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Arrow at top when tooltip is below trigger */}
          {position === 'below' && <ArrowUp />}

          {/* Tooltip body */}
          <div style={{
            background: '#ffffff',
            borderRadius: 8,
            padding: '4px 8px',
            boxShadow: INSET_SHADOW,
            whiteSpace: 'nowrap',
          }}>
            <span style={{
              display: 'block',
              fontSize: 13,
              fontWeight: 450,
              color: '#303030',
              lineHeight: '20px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {content}
            </span>
          </div>

          {/* Arrow at bottom when tooltip is above trigger */}
          {position === 'above' && <ArrowDown />}
        </div>
      )}
    </div>
  );
}
