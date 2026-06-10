import { useState } from 'react';
import { Btn } from '../Btn/Btn.jsx';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';
import {
  BG_SURFACE, BG_SELECTED, TEXT_DEFAULT, TEXT_SUBDUED,
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER_SHADOW,
  RADIUS_SM,
} from '../../tokens/index.js';

// Card surface shadow — same recipe as the data Card so navigation cards and
// content cards share an identical edge treatment.
const CARD_SHADOW = [
  '0 1px 0 rgba(26,26,26,0.07)',
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');

// Interactive hover ring — design-system rule for clickable cards: switch the
// edge to brand blue + a matching tinted shadow.
const CARD_SHADOW_HOVER = `inset 0 0 0 1px ${COLOR_PRIMARY}, 0 2px 6px ${COLOR_PRIMARY_HOVER_SHADOW}`;

// Trailing chevron baked into the "View" button (the Figma button shows a
// forward chevron, not the Btn `disclosure` down-caret).
const ChevronRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * NavCard — Home / Sub-Home navigation card.
 *
 * Two layouts, each with an optional "View" button:
 *   • layout="home" — illustration + title + description centered, button centered.
 *   • layout="sub"  — icon top-left, title + description left-aligned, button left.
 *
 * Pass `buttonLabel` to render the action button; omit it for the no-button
 * variant. Provide `onClick` to make the whole card interactive (adds a blue
 * hover ring); the inner button's `onButtonClick` takes precedence on click.
 *
 * @param {'home'|'sub'} [layout='home']
 * @param {React.ReactNode} title
 * @param {React.ReactNode} description
 * @param {React.ReactNode} media       Illustration (home) or icon (sub).
 * @param {string} [buttonLabel]        Renders the View button when set.
 * @param {() => void} [onButtonClick]
 * @param {() => void} [onClick]        Whole-card click → interactive hover.
 * @param {boolean} [loading]           Render a shape-matching skeleton.
 * @param {boolean} [hasButton]         When loading, render the button skeleton
 *                                      (defaults to true).
 */
export function NavCard({
  layout = 'home',
  title,
  description,
  media,
  buttonLabel,
  onButtonClick,
  onClick,
  loading = false,
  hasButton = true,
  ariaLabel,
}) {
  const [hov, setHov] = useState(false);
  const isHome = layout === 'home';
  const interactive = typeof onClick === 'function';

  const surface = {
    boxSizing: 'border-box',
    background: interactive && hov ? BG_SELECTED : BG_SURFACE,
    borderRadius: RADIUS_SM,
    boxShadow: interactive && hov ? CARD_SHADOW_HOVER : CARD_SHADOW,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: isHome ? 'center' : 'flex-start',
    textAlign: isHome ? 'center' : 'left',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'box-shadow 0.15s ease, background-color 0.15s ease',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  };

  // ─── Loading skeleton ───────────────────────────────────────────────────
  // Shape-matching placeholder honouring the layout's alignment: home centers
  // the media + text + button; sub left-aligns them (icon top-left).
  if (loading) {
    return (
      <div style={{ ...surface, cursor: 'default', background: BG_SURFACE, boxShadow: CARD_SHADOW }}>
        <SkeletonGroup label="Loading card">
          {isHome ? (
            <>
              <Skeleton width={48} height={48} radius="50%" ariaLabel={null} />
              <Skeleton width={140} height={14} radius={4} delay={0.06} ariaLabel={null} style={{ marginTop: 16 }} />
              <Skeleton width={200} height={13} radius={4} delay={0.10} ariaLabel={null} style={{ marginTop: 6 }} />
              {hasButton && (
                <Skeleton width={120} height={32} radius={8} delay={0.16} ariaLabel={null} style={{ marginTop: 12 }} />
              )}
            </>
          ) : (
            <>
              <Skeleton width={40} height={40} radius={8} ariaLabel={null} />
              <Skeleton width="60%" height={14} radius={4} delay={0.06} ariaLabel={null} style={{ marginTop: 12 }} />
              <Skeleton width="85%" height={13} radius={4} delay={0.10} ariaLabel={null} style={{ marginTop: 6 }} />
              {hasButton && (
                <Skeleton width={120} height={32} radius={8} delay={0.16} ariaLabel={null} style={{ marginTop: 12 }} />
              )}
            </>
          )}
        </SkeletonGroup>
      </div>
    );
  }

  const interactiveProps = interactive
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-label': ariaLabel,
        onClick,
        onMouseEnter: () => setHov(true),
        onMouseLeave: () => setHov(false),
        onFocus: () => setHov(true),
        onBlur: () => setHov(false),
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
        },
      }
    : {};

  const handleButtonClick = (e) => {
    // Don't let a button click also fire the card's onClick.
    e.stopPropagation?.();
    onButtonClick?.();
  };

  return (
    <div style={surface} {...interactiveProps}>
      {media != null && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isHome ? 'center' : 'flex-start',
        }}>
          {media}
        </div>
      )}

      {title != null && (
        <div style={{
          marginTop: media != null ? (isHome ? 16 : 12) : 0,
          fontSize: 14,
          fontWeight: 650,
          lineHeight: '20px',
          color: TEXT_DEFAULT,
        }}>
          {title}
        </div>
      )}

      {description != null && (
        <div style={{
          marginTop: 2,
          fontSize: 13,
          fontWeight: 450,
          lineHeight: '20px',
          color: TEXT_SUBDUED,
        }}>
          {description}
        </div>
      )}

      {buttonLabel != null && (
        <div style={{ marginTop: 12 }}>
          <Btn variant="secondary" small onClick={handleButtonClick}>
            {buttonLabel}
            <ChevronRight />
          </Btn>
        </div>
      )}
    </div>
  );
}
