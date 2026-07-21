// ── Nexleaf Design System — Toast ────────────────────────────────────────────
// A transient, auto-dismissing notice. Visuals come entirely from the compact
// in-card Banner; Toast adds the fixed positioning (Z_TOAST layer), overlay
// elevation, and the auto-hide timer. Dismissable by the ✕ or by waiting.
//
//   {notice && (
//     <Toast tone={notice.tone} onDismiss={() => setNotice(null)}>
//       {notice.message}
//     </Toast>
//   )}

import { useEffect } from 'react';
import { Banner } from '../Banner/Banner.jsx';
import { Z_TOAST, SHADOW_OVERLAY, RADIUS_SM } from '../../tokens/index.js';

const PLACEMENTS = {
  'top-right': { top: 24, right: 24 },
  'top-center': { top: 24, left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: 24, left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: 24, right: 24 },
};

/**
 * Toast
 *
 * @param {boolean} [open=true]           Render / hide the toast.
 * @param {'info'|'success'|'warning'|'critical'} [tone='info']
 * @param {React.ReactNode} [icon]        Optional Banner icon override.
 * @param {React.ReactNode} children      The message.
 * @param {() => void} onDismiss          Fires on ✕ or when the timer elapses.
 * @param {number} [duration=4500]        Auto-dismiss delay (ms); 0 disables.
 * @param {'top-right'|'top-center'|'bottom-center'|'bottom-right'} [placement='top-right']
 */
export function Toast({
  open = true,
  tone = 'info',
  icon,
  children,
  onDismiss,
  duration = 4500,
  placement = 'top-right',
}) {
  useEffect(() => {
    if (!open || !duration) return undefined;
    const t = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(t);
  }, [open, children, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        ...(PLACEMENTS[placement] || PLACEMENTS['top-right']),
        zIndex: Z_TOAST,
        width: 'min(480px, calc(100vw - 32px))',
        boxShadow: SHADOW_OVERLAY,
        borderRadius: RADIUS_SM,
      }}
    >
      <Banner tone={tone} inCard icon={icon} dismissable onDismiss={onDismiss}>
        {children}
      </Banner>
    </div>
  );
}
