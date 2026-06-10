import { useState } from 'react';
import { Badge } from '../Badge/Badge.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Toggle } from '../Toggle/Toggle.jsx';
import { RadioButton } from '../RadioButton/RadioButton.jsx';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';
import {
  BG_SURFACE, BG_SURFACE_HOVER, BG_SUCCESS,
  BG_CRITICAL_SOFT, BG_WARNING, BG_INFO, BG_HOVER,
  TEXT_DEFAULT, TEXT_SUBDUED,
  RADIUS_SM, RADIUS_CONTROL,
} from '../../tokens/index.js';

// Icon-tile background per tone. The 32px tile is soft-tinted so the row can
// signal success / alert / caution context without re-colouring the glyph.
const ICON_TONES = {
  success:  BG_SUCCESS,       // #cdfee1 (default)
  critical: BG_CRITICAL_SOFT, // #fde2e1
  warning:  BG_WARNING,       // #fff3cd
  info:     BG_INFO,          // #eaf4ff
  neutral:  BG_HOVER,         // rgba(0,0,0,0.06)
};

// Card surface shadow — same recipe as Card / NavCard so list rows share an
// identical edge treatment (Figma shadow-bevel-100).
const CARD_SHADOW = [
  '0 1px 0 rgba(26,26,26,0.07)',
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');

// Trailing forward chevron — matches the NavCard "View" chevron at 20px.
const ChevronRight = ({ size = 20, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}>
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Cell — composable list row.
 *
 * A single 64px-tall row for list / table-of-contents surfaces. Every slot is
 * optional, so one component covers icon-only, title-only, and rich rows with a
 * trailing badge, button, radio, toggle, or chevron.
 *
 * Layout: [icon tile] [title + titleBadge / description] … [trailing control].
 * The title block grows to fill, pushing the trailing control to the far edge.
 *
 * Pass `onClick` to make the whole row interactive (hover background + button
 * semantics). The inner button/toggle/radio stop propagation so they never
 * double-fire the row click. Force the hover look in docs with `state="hover"`.
 *
 * @param {React.ReactNode} [icon]            Icon rendered inside the 32px tile.
 * @param {'success'|'critical'|'warning'|'info'|'neutral'} [iconTone='success'] Tile tint.
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [titleBadge]      Small badge beside the title.
 * @param {React.ReactNode} [description]
 * @param {number} [descriptionLines=1]       Description line clamp: 1 = single
 *                                            line + ellipsis (default); N = clamp
 *                                            to N lines; 0/null = wrap freely.
 * @param {React.ReactNode} [badge]           Trailing default-tone badge.
 * @param {string} [buttonLabel]              Renders a trailing secondary button.
 * @param {() => void} [onButtonClick]
 * @param {boolean} [hasRadioButton]          Renders a trailing radio control.
 * @param {boolean} [radioChecked]
 * @param {(v:boolean)=>void} [onRadioChange]
 * @param {boolean} [hasToggle]               Renders a trailing toggle control.
 * @param {boolean} [toggleChecked]
 * @param {(v:boolean)=>void} [onToggleChange]
 * @param {boolean} [hasChevron]              Renders a trailing forward chevron.
 * @param {() => void} [onClick]              Whole-row click → interactive hover.
 * @param {'default'|'hover'} [state='default']
 * @param {boolean} [loading]                 Render a shape-matching skeleton.
 * @param {boolean} [hasIcon]                 Force the icon-tile skeleton when loading
 *                                            (defaults to true since most rows have an icon).
 * @param {string} [ariaLabel]
 */
export function Cell({
  icon,
  iconTone = 'success',
  title,
  titleBadge,
  description,
  descriptionLines = 1,
  badge,
  buttonLabel,
  onButtonClick,
  hasRadioButton = false,
  radioChecked = false,
  onRadioChange,
  hasToggle = false,
  toggleChecked = false,
  onToggleChange,
  hasChevron = false,
  onClick,
  state = 'default',
  loading = false,
  hasIcon = true,
  ariaLabel,
}) {
  const [hov, setHov] = useState(false);
  const interactive = typeof onClick === 'function';
  const showHover = state === 'hover' || (interactive && hov);

  const row = {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: 64,
    display: 'flex',
    // Multi-line rows (those with a description) top-align the icon tile and the
    // trailing control to the title; single-line rows stay vertically centered.
    alignItems: description != null ? 'flex-start' : 'center',
    gap: 8,
    padding: 12,
    background: showHover ? BG_SURFACE_HOVER : BG_SURFACE,
    borderRadius: RADIUS_SM,
    boxShadow: CARD_SHADOW,
    cursor: interactive ? 'pointer' : 'default',
    transition: 'background-color 0.15s ease',
    fontFamily: 'Inter, sans-serif',
  };

  // ─── Loading skeleton ───────────────────────────────────────────────────
  // Shape-matching placeholder: icon tile + two text lines + a trailing block.
  // Uses the same 64px row surface so the row doesn't reflow when content lands.
  if (loading) {
    return (
      <div style={{ ...row, cursor: 'default', background: BG_SURFACE }} aria-hidden={false}>
        <SkeletonGroup label="Loading row">
          {hasIcon && (
            <Skeleton width={32} height={32} radius={RADIUS_CONTROL} ariaLabel={null} />
          )}
          <div style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 6,
          }}>
            <Skeleton width="50%" height={14} delay={0.04} ariaLabel={null} />
            <Skeleton width="72%" height={13} delay={0.08} ariaLabel={null} />
          </div>
          <Skeleton width={20} height={20} radius={4} delay={0.12} ariaLabel={null} style={{ marginLeft: 'auto' }} />
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

  // Stop trailing controls from also firing the row's onClick.
  const stop = (fn) => (e) => { e.stopPropagation?.(); fn?.(); };

  const hasTrailing =
    badge != null || buttonLabel != null || hasRadioButton || hasToggle || hasChevron;

  return (
    <div style={row} {...interactiveProps}>
      {icon != null && (
        <div style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: RADIUS_CONTROL,
          background: ICON_TONES[iconTone] || BG_SUCCESS,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </div>
      )}

      {(title != null || description != null) && (
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}>
          {title != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontSize: 14,
                fontWeight: 650,
                lineHeight: '20px',
                color: TEXT_DEFAULT,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {title}
              </span>
              {titleBadge != null && (
                typeof titleBadge === 'string'
                  ? <Badge tone="default">{titleBadge}</Badge>
                  : titleBadge
              )}
            </div>
          )}
          {description != null && (
            <span style={{
              fontSize: 13,
              fontWeight: 450,
              lineHeight: '20px',
              color: TEXT_SUBDUED,
              overflow: 'hidden',
              // descriptionLines=1 → single line + ellipsis (default, keeps dense
              // rows from wrapping); >1 → clamp to N lines; 0/null → free wrap.
              ...(descriptionLines === 1
                ? { whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
                : descriptionLines > 1
                  ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: descriptionLines, textOverflow: 'ellipsis' }
                  : {}),
            }}>
              {description}
            </span>
          )}
        </div>
      )}

      {hasTrailing && (
        <div style={{
          marginLeft: 'auto',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          {badge != null && (
            typeof badge === 'string' ? <Badge tone="default">{badge}</Badge> : badge
          )}
          {buttonLabel != null && (
            <Btn variant="secondary" small onClick={stop(onButtonClick)}>{buttonLabel}</Btn>
          )}
          {hasRadioButton && (
            <span onClick={(e) => e.stopPropagation()}>
              <RadioButton checked={radioChecked} onChange={onRadioChange} />
            </span>
          )}
          {hasToggle && (
            <span onClick={(e) => e.stopPropagation()}>
              <Toggle checked={toggleChecked} onChange={onToggleChange} />
            </span>
          )}
          {hasChevron && <ChevronRight />}
        </div>
      )}
    </div>
  );
}
