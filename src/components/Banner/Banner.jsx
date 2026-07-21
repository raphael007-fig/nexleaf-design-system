import { useState } from 'react';

// ─── Line icons — paths sourced from PolarisIcon.jsx (Nexleaf Icons V2) ──────

const IconInfo = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" />
    <path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

const IconCheck = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M13.28 9.03a.75.75 0 0 0-1.06-1.06l-2.97 2.97-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

const IconWarning = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
    <path d="M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z" />
  </svg>
);

const IconCritical = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z" />
    <path d="M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path fillRule="evenodd" d="M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z" />
  </svg>
);

// XSmall — 20×20 viewBox, rendered at 20px but icon paths sit naturally within
const IconX = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z" />
  </svg>
);

// ─── Tone tokens — exact values from Figma (node 109293:4284) ────────────────
const TONES = {
  info: {
    headerBg:   '#91d0ff',
    headerText: '#002133',
    inCardBg:   '#eaf4ff',
    inCardText: '#00527c',
    Icon: IconInfo,
  },
  success: {
    headerBg:   '#29845a',
    headerText: '#f8fffb',
    inCardBg:   '#cdfee1',
    inCardText: '#0c5132',
    Icon: IconCheck,
  },
  warning: {
    headerBg:   '#ffb800',
    headerText: '#332e00',
    inCardBg:   '#fff1e3',
    inCardText: '#5e4200',
    Icon: IconWarning,
  },
  critical: {
    headerBg:   '#e51c00',
    headerText: '#fffbfb',
    inCardBg:   '#fee9e8',
    inCardText: '#8e1f0b',
    Icon: IconCritical,
  },
};

// Card shadow from Figma shadow-200 spec
const CARD_SHADOW = '0 3px 1px -1px rgba(26,26,26,0.07), inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)';

// Action button — matches Figma secondary button style inside banner
const BannerBtn = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '6px 12px',
      background: '#ffffff',
      border: 'none',
      borderRadius: 8,
      boxShadow: 'inset 0 -1px 0 #b5b5b5, inset -1px 0 0 #e3e3e3, inset 1px 0 0 #e3e3e3, inset 0 1px 0 #e3e3e3',
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      fontWeight: 550,
      lineHeight: '16px',
      color: '#303030',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </button>
);

/**
 * Banner
 *
 * Props:
 *   tone        — 'info' | 'success' | 'warning' | 'critical'
 *   title       — string — renders the titled variant (colored header + white body)
 *   inCard      — boolean — renders the compact tinted in-card variant
 *   dismissable — boolean — shows the × dismiss button
 *   onDismiss   — function — called when dismissed
 *   actions     — [{ label, onClick }] — action buttons
 *   icon        — ReactNode — optional override for the tone icon (defaults to
 *                 the tone's own glyph; used e.g. for a QR/search context icon)
 *   children    — message text
 */
export function Banner({ tone = 'info', title, inCard = false, dismissable, onDismiss, actions, icon, children }) {
  const t = TONES[tone] || TONES.info;
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const dismiss = () => { setDismissed(true); onDismiss?.(); };

  // ── Titled variant ──────────────────────────────────────────────────────────
  if (title) {
    return (
      <div style={{ borderRadius: 12, overflow: 'hidden', background: '#ffffff', boxShadow: CARD_SHADOW }}>
        {/* Colored header */}
        <div style={{
          background: t.headerBg,
          display: 'flex', alignItems: 'center', gap: 4,
          paddingLeft: 12, paddingRight: 8,
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, paddingTop: 12, paddingBottom: 12 }}>
            {/* Icon at 14px inside a 20px container, matching Figma */}
            <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {icon || <t.Icon size={14} color={t.headerText} />}
            </div>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 650,
              lineHeight: '20px', color: t.headerText, flex: 1,
            }}>
              {title}
            </span>
          </div>
          {dismissable && (
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              style={{
                width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, flexShrink: 0,
              }}
            >
              <IconX size={20} color={t.headerText} />
            </button>
          )}
        </div>
        {/* White body */}
        <div style={{ background: '#ffffff', padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#303030' }}>
            {children}
          </p>
          {actions?.length > 0 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {actions.map((a, i) => <BannerBtn key={i} onClick={a.onClick}>{a.label}</BannerBtn>)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── In-card variant ─────────────────────────────────────────────────────────
  if (inCard) {
    return (
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'flex-start', gap: 8,
        background: t.inCardBg, borderRadius: 8, padding: 8,
      }}>
        <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
          {icon || <t.Icon size={20} color={t.inCardText} />}
        </div>
        <div style={{ flex: 1, paddingRight: dismissable ? 28 : 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: t.inCardText }}>
            {children}
          </p>
          {actions?.length > 0 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {actions.map((a, i) => <BannerBtn key={i} onClick={a.onClick}>{a.label}</BannerBtn>)}
            </div>
          )}
        </div>
        {dismissable && (
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              position: 'absolute', top: 4, right: 8,
              width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 4,
            }}
          >
            <IconX size={20} color={t.inCardText} />
          </button>
        )}
      </div>
    );
  }

  // ── Simple variant ──────────────────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: '#ffffff', borderRadius: 12, padding: 12,
      boxShadow: CARD_SHADOW,
    }}>
      {/* Colored icon pill — 28×28, tone bg, 8px radius, 4px padding → icon 20×20 */}
      <div style={{
        width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: t.headerBg, borderRadius: 8, flexShrink: 0, padding: 4, boxSizing: 'border-box',
      }}>
        {icon || <t.Icon size={20} color={t.headerText} />}
      </div>
      {/* Message */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
        <p style={{ margin: 0, flex: 1, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#303030' }}>
          {children}
        </p>
        {actions?.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {actions.map((a, i) => <BannerBtn key={i} onClick={a.onClick}>{a.label}</BannerBtn>)}
          </div>
        )}
      </div>
      {/* Dismiss */}
      {dismissable && (
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, flexShrink: 0,
          }}
        >
          <IconX size={20} color="#616161" />
        </button>
      )}
    </div>
  );
}
