import { useState } from 'react';
import { Badge } from '../Badge/Badge.jsx';
import { Tooltip } from '../Tooltip/Tooltip.jsx';

// ─── Info Icon (InfoIcon from PolarisIcon) ────────────────────────────────────

const InfoIcon = ({ color = '#9e9e9e' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill={color} aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" />
    <path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    <path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
  </svg>
);

// ─── Skeleton bar ─────────────────────────────────────────────────────────────

function SkeletonBar({ width, height, animDelay = 0 }) {
  return (
    <div style={{
      width,
      height,
      borderRadius: 8,
      background: '#e3e3e3',
      animation: 'metricCardPulse 1.4s ease-in-out infinite',
      animationDelay: `${animDelay}s`,
      flexShrink: 0,
    }} />
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

/**
 * MetricCard
 *
 * Props:
 *   title        — metric label text
 *   metric       — primary value (string or number)
 *   badge        — { label: string, tone?: Badge tone key }
 *                  tone options: 'info' | 'success' | 'attention' | 'warning' | 'critical' | 'default'
 *   onClick      — fn — makes card interactive (hover/active/focus states)
 *   selected     — boolean — active filter state
 *   disabled     — boolean
 *   loading      — boolean — shows skeleton placeholders
 *   infoTooltip  — string — tooltip text shown on info icon hover (replaces onInfoClick)
 *   onInfoClick  — fn — info icon click handler
 */
export function MetricCard({
  title = 'Total Installations',
  metric = '0',
  badge,
  onClick,
  selected = false,
  disabled = false,
  loading = false,
  infoTooltip,
  onInfoClick,
}) {
  const [hovered,     setHovered]     = useState(false);
  const [pressed,     setPressed]     = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const isClickable = !!onClick && !disabled && !loading;

  // ── Background ──────────────────────────────────────────────────────────────
  let bg;
  if (disabled) {
    bg = 'rgba(0,0,0,0.05)';
  } else if (pressed) {
    bg = '#f3f3f3';
  } else if (selected) {
    bg = 'rgba(0,0,0,0.08)';
  } else if (hovered) {
    bg = '#f7f7f7';
  } else {
    bg = '#ffffff';
  }

  // ── Shadows ─────────────────────────────────────────────────────────────────
  const INSET_NORMAL = [
    'inset 1px 0 0 rgba(0,0,0,0.13)',
    'inset -1px 0 0 rgba(0,0,0,0.13)',
    'inset 0 -1px 0 rgba(0,0,0,0.17)',
    'inset 0 1px 0 rgba(204,204,204,0.5)',
  ].join(', ');

  const INSET_PRESSED = [
    'inset -1px 0 1px rgba(26,26,26,0.12)',
    'inset 1px 0 1px rgba(26,26,26,0.12)',
    'inset 0 2px 1px rgba(26,26,26,0.2)',
  ].join(', ');

  const DROP  = '0 1px 0 rgba(26,26,26,0.07)';
  const FOCUS = '0 0 0 2px #005bd3';

  let boxShadow;
  if (focused) {
    boxShadow = `${FOCUS}, ${INSET_NORMAL}`;
  } else if (pressed) {
    boxShadow = INSET_PRESSED;
  } else {
    boxShadow = `${DROP}, ${INSET_NORMAL}`;
  }

  // ── Event handlers ──────────────────────────────────────────────────────────
  const handlers = isClickable ? {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown:  () => setPressed(true),
    onMouseUp:    () => setPressed(false),
    onFocus:      () => setFocused(true),
    onBlur:       () => setFocused(false),
    onKeyDown:    (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } },
  } : {};

  // Badge tone: use 'default' when card is disabled so badge goes grey
  const badgeTone = disabled ? 'default' : (badge?.tone || 'info');

  return (
    <>
      <style>{`
        @keyframes metricCardPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? onClick : undefined}
        {...handlers}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 16,
          borderRadius: 12,
          background: bg,
          boxShadow,
          cursor: isClickable ? 'pointer' : 'default',
          userSelect: 'none',
          fontFamily: 'Inter, sans-serif',
          width: '100%',
          boxSizing: 'border-box',
          transition: 'background 0.1s',
          outline: 'none',
        }}
      >
        {loading ? (
          /* ── Loading skeleton ────────────────────────────────────────────── */
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <SkeletonBar width={120} height={16} animDelay={0} />
              <div style={{
                width: 14, height: 14, borderRadius: 4,
                background: 'rgba(0,0,0,0.12)',
                animation: 'metricCardPulse 1.4s ease-in-out infinite',
              }} />
            </div>
            <SkeletonBar width={120} height={40} animDelay={0.07} />
            <SkeletonBar width={88}  height={20} animDelay={0.14} />
          </>
        ) : (
          /* ── Data content ──────────────────────────────────────────────────── */
          <>
            {/* Title row + info icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <span style={{
                fontSize: 13,
                fontWeight: 650,
                color: disabled ? '#b5b5b5' : '#616161',
                lineHeight: '20px',
                fontFamily: 'Inter, sans-serif',
              }}>
                {title}
              </span>

              <Tooltip
                content={infoTooltip || 'More information'}
                position="above"
              >
                <button
                  onClick={e => { e.stopPropagation(); if (onInfoClick) onInfoClick(e); }}
                  onMouseEnter={() => !disabled && setIconHovered(true)}
                  onMouseLeave={() => setIconHovered(false)}
                  tabIndex={!disabled ? 0 : -1}
                  aria-label="More information"
                  style={{
                    background: iconHovered && !disabled ? 'rgba(0,0,0,0.06)' : 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    cursor: !disabled ? 'pointer' : 'default',
                    outline: 'none',
                    transition: 'background 0.1s',
                  }}
                >
                  <InfoIcon color={disabled ? '#b5b5b5' : iconHovered ? '#616161' : '#9e9e9e'} />
                </button>
              </Tooltip>
            </div>

            {/* Metric value */}
            <span style={{
              fontSize: 30,
              fontWeight: 700,
              color: disabled ? '#b5b5b5' : '#303030',
              lineHeight: '40px',
              letterSpacing: '-0.3px',
              fontFamily: 'Inter, sans-serif',
            }}>
              {metric}
            </span>

            {/* Badge — uses existing Badge component */}
            {badge && (
              <div style={{ alignSelf: 'flex-start' }}>
                <Badge tone={badgeTone}>{badge.label}</Badge>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
