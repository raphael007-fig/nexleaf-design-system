import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  useFocusTrap, useScrollLock, useReturnFocus, useEscapeKey, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';

// ── Nexleaf AI logo (gradient ring) ───────────────────────────────────────
// Used both as the brand logo (left of the toolbar) and as the leading
// icon on the AI Chat Bot button. The SVG defs use useId-scoped IDs so
// multiple instances on the same page don't collide.
export const NexleafLogo = ({ size = 32 }) => {
  const uid = useId().replace(/:/g, '');
  const m0 = `m0-${uid}`, m1 = `m1-${uid}`;
  const f0 = `f0-${uid}`, f1 = `f1-${uid}`;
  const lg = `lg-${uid}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <mask id={m0} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <rect width="20" height="20" fill="white" />
      </mask>
      <g mask={`url(#${m0})`}>
        <path d="M10 0C15.5229 0 20 4.47715 20 10C20 15.5229 15.5229 20 10 20C4.47715 20 0 15.5229 0 10C4.02012e-05 4.47717 4.47717 4.02024e-05 10 0ZM10 4.16699C6.77837 4.16703 4.16703 6.77837 4.16699 10C4.16699 13.2217 6.77835 15.833 10 15.833C13.2217 15.833 15.833 13.2217 15.833 10C15.833 6.77835 13.2217 4.16699 10 4.16699Z" fill={`url(#${lg})`} />
        <mask id={m1} style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
          <circle cx="10.0227" cy="10.0226" r="10.0001" transform="rotate(179.87 10.0227 10.0226)" fill="#D9D9D9" />
        </mask>
        <g mask={`url(#${m1})`}>
          <g opacity="0.3" filter={`url(#${f0})`}>
            <path d="M12.106 2.52299C14.4394 2.52299 13.9116 1.41187 13.356 0.856309C11.0227 -2.14371 3.49482 0.439833 0.0225804 2.52318C-1.64409 9.18944 -3.99557 18.3943 0.0225909 10.023C5.02265 -0.393837 9.18932 2.52299 12.106 2.52299Z" fill="#CCFFD0" />
          </g>
          <g opacity="0.3" filter={`url(#${f1})`}>
            <path d="M7.95632 17.5274C5.62297 17.5327 6.15327 18.6427 6.71008 19.197C9.05023 22.1917 16.5722 19.5911 20.0397 17.4999C21.6913 10.8299 24.0219 1.61974 20.0227 10.0001C15.0463 20.4282 10.873 17.5208 7.95632 17.5274Z" fill="#CCFFD0" />
          </g>
        </g>
      </g>
      <defs>
        <filter id={f0} x="-4.19382" y="-2.5083" width="20.0259" height="17.8716" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur" />
        </filter>
        <filter id={f1} x="4.23203" y="4.65527" width="20.0007" height="17.8979" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id={lg} x1="20.0001" y1="0" x2="0" y2="20.0001" gradientUnits="userSpaceOnUse">
          <stop offset="0.13" stopColor="#BBEEC6" />
          <stop offset="0.18" stopColor="#8DF9A6" />
          <stop offset="0.338" stopColor="#1B9436" />
          <stop offset="0.666" stopColor="#01340D" />
          <stop offset="0.809" stopColor="#27A543" />
          <stop offset="0.858" stopColor="#199234" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Alias — the chat button uses the same mark
export const AiLogo = NexleafLogo;

// ── Nexleaf brand mark (green leaf wrapping a phone) ──────────────────────
// Used as the start-slot logo on mobile and any chrome where the brand
// (not the AI feature) is what we want to emphasize.
export const NexleafBrandLogo = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    {/* Leaf silhouette */}
    <path
      d="M24 5C24 5 13 5 9 12C5.5 18 9 25 9 25C9 25 7 18 12 13C16 9 22 9 22 9C22 9 16 12 13 18C10.5 23 12 27 12 27L15 27C15 27 14 22 17 18C20 14 24 12 24 12L24 5Z"
      fill="#3DBE6B"
    />
    {/* Phone body — sits inside the leaf */}
    <rect x="11" y="9.5" width="7" height="13" rx="1.5"
      fill="#ffffff" stroke="#2E9C5B" strokeWidth="1.2" />
    <rect x="12.5" y="11" width="4" height="7.5" rx="0.5" fill="#E8F5EC" />
    <circle cx="14.5" cy="20.75" r="0.7" fill="#2E9C5B" />
  </svg>
);

// ── Default icons used by Toolbar subcomponents ───────────────────────────
const IcoChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoPin = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.75c-2.62 0-4.75 2.12-4.75 4.74 0 3.55 4.75 7.76 4.75 7.76s4.75-4.21 4.75-7.76C12.75 3.87 10.62 1.75 8 1.75z"
      stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="8" cy="6.5" r="1.75" stroke={color} strokeWidth="1.4" />
  </svg>
);

const IcoTranslate = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2.5 5h7M5.5 3v2M4 5c0 3 2.5 5.5 5.5 5.5M9.5 5c0 2-3.5 5-7 5.5"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 17l3-7 3 7M11.5 15h4"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoClose = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// ── ToolbarIconButton — square icon-only button (grid, bell, etc.) ────────
// Pairs with `<PolarisIconImg name="AppsIcon" />` / `"NotificationIcon"` from
// the Polaris icon registry. White surface, hairline border, soft hover.
export function ToolbarIconButton({
  icon, ariaLabel, onClick, disabled, badge,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  let bg = '#ffffff';
  if (disabled) bg = 'rgba(0,0,0,0.06)';
  else if (act) bg = '#ebebeb';
  else if (hov) bg = '#f1f1f1';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => !disabled && setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, padding: 0,
        background: bg,
        border: '1px solid #ebebeb', borderRadius: 10,
        color: disabled ? '#b5b5b5' : '#303030',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        boxShadow: foc
          ? '0 0 0 2px #005bd3'
          : '0 1px 0 rgba(0,0,0,0.02)',
        transition: 'background 0.12s, box-shadow 0.12s',
        flexShrink: 0,
      }}
    >
      {icon}
      {badge != null && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          minWidth: 14, height: 14, padding: '0 4px',
          borderRadius: 100, background: '#e51c00', color: '#ffffff',
          fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, lineHeight: '14px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>{badge}</span>
      )}
    </button>
  );
}

// ── ToolbarAvatar — circular user avatar (image, initials, or icon) ───────
export function ToolbarAvatar({ src, alt = 'User', initials, size = 36, onClick }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);

  const content = src ? (
    <img src={src} alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
  ) : (
    <span style={{
      width: '100%', height: '100%', borderRadius: '50%',
      background: '#e0e0e0', color: '#303030',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
    }}>{initials || alt.slice(0, 1).toUpperCase()}</span>
  );

  if (!onClick) {
    return (
      <span style={{
        display: 'inline-flex', width: size, height: size, flexShrink: 0,
        borderRadius: '50%', overflow: 'hidden',
      }}>{content}</span>
    );
  }

  return (
    <button
      type="button"
      aria-label={alt}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', width: size, height: size,
        padding: 0, border: 'none', background: 'transparent',
        borderRadius: '50%', overflow: 'hidden', cursor: 'pointer',
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : (hov ? '0 0 0 2px #ebebeb' : 'none'),
        transition: 'box-shadow 0.12s',
        flexShrink: 0,
      }}
    >
      {content}
    </button>
  );
}

// ── ToolbarRegionSelector — uses the breadcrumb current-pill style ────────
// Token mapping (matches `Crumb` in Breadcrumbs.jsx):
//   resting:  #ebebeb   ←  breadcrumb current pill / hover state
//   hover:    #e0e0e0   ←  one step darker, same family
//   active:   #d2d2d2   ←  breadcrumb pressed state
//   disabled: transparent
//   radius:   8         ←  same as Crumb + Tab
//   weight:   500       ←  between Crumb 450 (previous) and 550 (current)
// Native-OS emoji stack — needed when we render flag glyphs inline so the
// browser picks the platform-native colour emoji face (Apple Color Emoji on
// macOS / iOS, Segoe UI Emoji on Windows, etc.) instead of falling back to
// the regional indicator letter pair as plain text.
const EMOJI_FONT_STACK =
  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color", "Twemoji Mozilla", sans-serif';

// Resolve an ISO-3166-1 alpha-2 country code (e.g. "KE") to the flag glyph
// by combining the two regional indicator letters. Inlined here so the
// Toolbar has no cross-folder import on the emoji catalog; the same helper
// is also exported from `src/foundation/emojis/emojiCatalog.js`.
function flagFromCountryCode(code) {
  if (!code || typeof code !== 'string' || code.length !== 2) return '';
  const A = 0x1f1e6;
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - 65,
    A + code.toUpperCase().charCodeAt(1) - 65,
  );
}

// Renders the flag glyph for a country code, sized and laid out so it
// matches the Foundation/Emojis card rendering (Apple Color Emoji on
// macOS/iOS, Segoe UI Emoji on Windows, etc.). Pulled out so the OptionList
// items below can reuse the exact same component.
function FlagGlyph({ code, size = 18 }) {
  const flag = flagFromCountryCode(code);
  if (!flag) return null;
  return (
    <span
      aria-hidden="true"
      style={{
        // Native-OS emoji face is the *only* font; no Inter fallback, which
        // is what was making the previous render look thin and text-shaped
        // on some browsers — they were falling back to the regional
        // indicator letters when the stack started with Inter.
        fontFamily: EMOJI_FONT_STACK,
        fontSize: size,
        // Tight line height so the glyph's bounding box matches its drawn
        // height — prevents the row from being noticeably taller than the
        // text next to it.
        lineHeight: 1,
        display: 'inline-block',
        // Color emoji bounding boxes vary across platforms; this keeps the
        // glyph optically centred with the text baseline.
        verticalAlign: 'middle',
      }}
    >
      {flag}
    </span>
  );
}

export function ToolbarRegionSelector({
  value,
  // ISO-3166-1 alpha-2 of the currently-selected region. When set, the
  // pill renders the country's flag emoji as the leading glyph.
  countryCode,
  // Read-only by default (no chevron, not clickable). When `pickable` is
  // true the pill grows a chevron and opens a country picker on click —
  // typically wired up for admin / multi-region operator roles. Most users
  // shouldn't see this affordance.
  pickable = false,
  // Required when `pickable`. Array of `{ code, name }` (or the full shape
  // exported from `foundation/emojis/emojiCatalog` — extra fields are
  // ignored). Drives the OptionList rendered on click.
  countries,
  // Fires with the selected country's `code` (and the matching entry, for
  // convenience) when the user picks one from the menu. Required when
  // `pickable`. The selector closes itself; the consumer just needs to
  // update `countryCode` + `value` on the next render.
  onCountryChange,
  // Fired on click — only meaningful when `pickable` is false (the menu
  // owns clicks otherwise). Kept for backward compatibility with the old
  // single-button API.
  onClick,
  ariaLabel = 'Change region',
  disabled,
  leadingIcon,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  // Picker state (only used when `pickable`). Position is resolved from the
  // button's bounding rect at open time and re-resolved if it re-opens, so
  // the menu always docks under the current button position even if the
  // page has reflowed.
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  // Close on Escape / outside click. Listener is only attached while the
  // menu is open so we don't pay the cost on every render.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => {
      if (
        popRef.current && !popRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  let bg = '#ebebeb';
  if (disabled) bg = 'transparent';
  else if (act) bg = '#d2d2d2';
  else if (hov) bg = '#e0e0e0';

  const color = disabled ? '#b5b5b5' : '#303030';

  // Leading element resolution: countryCode > leadingIcon > pin fallback.
  let leading;
  if (countryCode) {
    leading = <FlagGlyph code={countryCode} size={18} />;
  } else if (leadingIcon) {
    leading = leadingIcon;
  } else {
    leading = <IcoPin size={18} color="currentColor" />;
  }

  const handleClick = () => {
    if (disabled) return;
    if (pickable) {
      if (btnRef.current) setRect(btnRef.current.getBoundingClientRect());
      setOpen((o) => !o);
    } else if (onClick) {
      onClick();
    }
  };

  // Country options rendered inside the popover. Each option's label is
  // `<flag>  <name>` — keeps the picker visually consistent with the pill
  // itself.
  const options = (countries || []).map((c) => ({
    id: c.code,
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <FlagGlyph code={c.code} size={18} />
        <span>{c.name}</span>
      </span>
    ),
  }));

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup={pickable ? 'listbox' : undefined}
        aria-expanded={pickable ? open : undefined}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => !disabled && setHov(true)}
        onMouseLeave={() => { setHov(false); setAct(false); }}
        onMouseDown={() => !disabled && setAct(true)}
        onMouseUp={() => setAct(false)}
        onFocus={() => !disabled && setFoc(true)}
        onBlur={() => setFoc(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 12px',
          background: bg,
          border: 'none', borderRadius: 8,
          color,
          fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, lineHeight: '20px',
          // Non-pickable + no onClick → read-only label, kill the pointer.
          cursor: disabled
            ? 'not-allowed'
            : (pickable || onClick) ? 'pointer' : 'default',
          outline: 'none',
          boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
          transition: 'background 0.1s, box-shadow 0.12s',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', color }}>
          {leading}
        </span>
        <span>{value}</span>
        {/* Chevron only renders for pickable mode. Normal-user pills are a
            read-only label, no disclosure affordance. */}
        {pickable && <IcoChevronDown size={18} color={color} />}
      </button>

      {pickable && open && rect && createPortal(
        <div
          ref={popRef}
          role="presentation"
          style={{
            position: 'fixed',
            top: rect.bottom + 6,
            // Right-align the menu under the button so it doesn't spill
            // off the right edge of narrow viewports. The button itself is
            // usually positioned near the right of the toolbar.
            left: Math.max(8, rect.right - 220),
            zIndex: 100,
            // Bounded scroll height — 24 countries × ~36 px per row would
            // be too tall otherwise. Mirrors the IndexTable LinkCell popover.
            maxHeight: 320,
            overflowY: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            borderRadius: 8,
          }}
        >
          <OptionList
            options={options}
            selected={countryCode}
            onChange={(code) => {
              const next = (countries || []).find((c) => c.code === code) || null;
              setOpen(false);
              if (onCountryChange) onCountryChange(code, next);
            }}
          />
        </div>,
        document.body,
      )}
    </>
  );
}

// ── ToolbarAiChatButton — pill-shaped trigger for the AI Chat panel ───────
//
// Visually matches the spec's "AI Chat Bot (beta)" pill: full-pill radius,
// leading AI logo, label, optional trailing icon (translate). The whole
// thing is one clickable button — `onClick` opens the AI chat panel that
// slides in from the right side of the app.
//
export function ToolbarAiChatButton({
  label = 'AI Chat Bot',
  beta = true,
  trailingIcon,
  onTrailingClick,
  trailingAriaLabel = 'Translate',
  ariaLabel,
  onClick,
  active = false,
  disabled = false,
  width = 200,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  let borderColor = '#e0e0e0';
  if (foc || active) borderColor = '#005bd3';
  else if (hov) borderColor = '#c9c9c9';

  let bg = '#ffffff';
  if (disabled) bg = 'rgba(0,0,0,0.06)';
  else if (act) bg = '#f1f1f1';
  else if (hov) bg = '#f7f7f7';

  const hasTrailing = !!trailingIcon;

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex', alignItems: 'center',
        width, maxWidth: '100%',
      }}
    >
      <button
        type="button"
        aria-label={ariaLabel || `${label}${beta ? ' (beta)' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={active}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={() => !disabled && setHov(true)}
        onMouseLeave={() => { setHov(false); setAct(false); }}
        onMouseDown={() => !disabled && setAct(true)}
        onMouseUp={() => setAct(false)}
        onFocus={() => !disabled && setFoc(true)}
        onBlur={() => setFoc(false)}
        style={{
          width: '100%',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: hasTrailing ? '8px 44px 8px 14px' : '8px 16px',
          background: bg,
          border: `1px solid ${borderColor}`, borderRadius: 100,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 500, lineHeight: '20px',
          color: disabled ? '#b5b5b5' : '#303030',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxShadow: (foc || active) ? '0 0 0 2px #005bd3' : 'none',
          transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
          boxSizing: 'border-box',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'inline-flex', flexShrink: 0 }}>
          <AiLogo size={20} />
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, flex: 1, minWidth: 0 }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
          {beta && (
            <span style={{
              color: disabled ? '#b5b5b5' : '#616161',
              fontSize: 13, fontWeight: 400,
            }}>(beta)</span>
          )}
        </span>
      </button>

      {hasTrailing && (
        onTrailingClick ? (
          <button
            type="button"
            aria-label={trailingAriaLabel}
            disabled={disabled}
            onClick={disabled ? undefined : (e) => { e.stopPropagation(); onTrailingClick(e); }}
            style={{
              position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, padding: 0,
              background: 'transparent', border: 'none', borderRadius: 100,
              color: disabled ? '#b5b5b5' : '#303030',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >{trailingIcon}</button>
        ) : (
          <span style={{
            position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20,
            color: disabled ? '#b5b5b5' : '#303030', pointerEvents: 'none',
          }}>{trailingIcon}</span>
        )
      )}
    </span>
  );
}

ToolbarAiChatButton.IcoTranslate = IcoTranslate;

// ── ToolbarAskAiButton — compact mobile variant ("Ask AI" pill) ───────────
// Same `aria-haspopup="dialog"` semantics; opens `<AiChatPanel />`.
// Drops the helper "(beta)" suffix and the translate trailing icon, and
// shows a chevron-down to hint at the dropdown/panel.
export function ToolbarAskAiButton({
  label = 'Ask AI',
  onClick,
  active = false,
  disabled = false,
  ariaLabel,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  let borderColor = '#e0e0e0';
  if (foc || active) borderColor = '#005bd3';
  else if (hov) borderColor = '#c9c9c9';

  let bg = '#ffffff';
  if (disabled) bg = 'rgba(0,0,0,0.06)';
  else if (act) bg = '#f1f1f1';
  else if (hov) bg = '#f7f7f7';

  return (
    <button
      type="button"
      aria-label={ariaLabel || label}
      aria-haspopup="dialog"
      aria-expanded={active}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => !disabled && setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 10px 6px 8px',
        background: bg,
        border: `1px solid ${borderColor}`, borderRadius: 100,
        color: disabled ? '#b5b5b5' : '#303030',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14, fontWeight: 600, lineHeight: '20px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        boxShadow: (foc || active) ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ display: 'inline-flex', flexShrink: 0 }}>
        <AiLogo size={20} />
      </span>
      <span>{label}</span>
      <IcoChevronDown size={16} color={disabled ? '#b5b5b5' : '#303030'} />
    </button>
  );
}

// ── ToolbarMenuButton — hamburger menu trigger (mobile end slot) ──────────
// Inline SVG fallback (3 horizontal bars) so this file has no runtime
// dependency on the PolarisIcon module. If you prefer the registry icon,
// pass `<PolarisIconImg name="MenuIcon" />` as `icon` to `ToolbarIconButton`
// instead.
const IcoMenu = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3.5 5.25h13M3.5 10h13M3.5 14.75h13"
      stroke={color} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export function ToolbarMenuButton({
  onClick, ariaLabel = 'Open menu', disabled, expanded = false, icon,
}) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [act, setAct] = useState(false);

  let bg = '#ffffff';
  if (disabled) bg = 'rgba(0,0,0,0.06)';
  else if (act) bg = '#ebebeb';
  else if (hov) bg = '#f1f1f1';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="menu"
      aria-expanded={expanded}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => !disabled && setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, padding: 0,
        background: bg,
        border: '1px solid #ebebeb', borderRadius: 10,
        color: disabled ? '#b5b5b5' : '#303030',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : '0 1px 0 rgba(0,0,0,0.02)',
        transition: 'background 0.12s, box-shadow 0.12s',
        flexShrink: 0,
      }}
    >
      {icon || <IcoMenu size={22} color="currentColor" />}
    </button>
  );
}

// ── AiChatPanel — right-side drawer opened by ToolbarAiChatButton ─────────
//
// Stateless dialog. Consumer controls `open` and renders any chat UI as
// children. Slides in from the right; backdrop click and Escape close it.
//
export function AiChatPanel({
  open,
  onClose,
  title = 'AI Chat Bot',
  beta = true,
  width = 420,
  children,
}) {
  const panelRef = useRef(null);
  // The panel declares aria-modal, so it must behave like one: trap focus
  // inside, lock body scroll, restore focus to the trigger on close, and close
  // on Escape. Sourced from the shared overlay hooks for parity with <Modal>.
  useReturnFocus(open);
  useScrollLock(open);
  useFocusTrap(open, panelRef);
  useEscapeKey(open, onClose);

  if (!open) return null;

  const reduce = prefersReducedMotion();

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose && onClose(); }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 100,
        display: 'flex', justifyContent: 'flex-end',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{
          width, maxWidth: '100%', height: '100%',
          background: '#ffffff',
          borderLeft: '1px solid #ebebeb',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', outline: 'none',
          animation: reduce ? 'none' : 'slideInRight 0.22s ease-out',
        }}
      >
        <header style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px',
          borderBottom: '1px solid #ebebeb',
        }}>
          <AiLogo size={24} />
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, flex: 1, minWidth: 0 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600,
              color: '#303030', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{title}</span>
            {beta && <span style={{ color: '#616161', fontSize: 13, fontWeight: 400 }}>(beta)</span>}
          </span>
          <button
            type="button"
            aria-label="Close AI chat"
            onClick={onClose}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, padding: 0,
              background: 'transparent', border: 'none', borderRadius: 8,
              color: '#303030', cursor: 'pointer',
            }}
          >
            <IcoClose size={18} color="currentColor" />
          </button>
        </header>
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          {children}
        </div>
      </aside>
      <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

// ── Toolbar — three-region bar (start / center / end) ─────────────────────
//
// Stateless layout primitive. Composes the auxiliary subcomponents
// (ToolbarSearch, ToolbarRegionSelector, ToolbarIconButton, ToolbarAvatar)
// or any custom node.
//
// `start`  — typically logo + Breadcrumbs
// `center` — typically a ToolbarSearch (collapses on narrow widths)
// `end`    — typically region selector + icon buttons + avatar
//
// ── Toolbar loading skeleton ──────────────────────────────────────────────
//
// Renders the toolbar's overall three-region layout with skeleton blocks in
// place of each interactive child. Sizes are chosen to approximate the real
// subcomponents: 32×32 logo circle + 200×20 breadcrumb line on start, a
// pill-shaped 200×36 block in the center, and a row of icon-button squares
// + an avatar circle on the end. We don't try to mirror every consumer's
// exact composition — the goal is to preserve total layout height/width so
// the page doesn't reflow when the real toolbar swaps in.
function ToolbarSkeleton({ mobile, sideNavWidth = 0 }) {
  return (
    <>
      {sideNavWidth > 0 && <div aria-hidden="true" />}
      <div style={{
        display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12,
        minWidth: 0, justifySelf: 'start',
        paddingLeft: sideNavWidth > 0 ? (mobile ? 8 : 16) : 0,
      }}>
        {sideNavWidth > 0 ? (
          // Reserved-slot mode → breadcrumb-shaped skeleton instead of a
          // logo-shaped one, since the side nav owns the logo slot now.
          <>
            <Skeleton width={28} height={28} radius={8} ariaLabel="Loading toolbar" />
            <Skeleton width={12} height={20} radius={2} ariaLabel={null} />
            <Skeleton width={160} height={28} radius={8} delay={0.04} ariaLabel={null} />
          </>
        ) : (
          <>
            <Skeleton.Circle size={32} ariaLabel="Loading toolbar" />
            {!mobile && <Skeleton width={200} height={20} radius={4} ariaLabel={null} />}
          </>
        )}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 0, justifySelf: 'center',
      }}>
        <Skeleton
          width={mobile ? 110 : 200}
          height={mobile ? 32 : 36}
          radius={100}
          ariaLabel={null}
        />
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: mobile ? 6 : 8,
        justifySelf: 'end',
      }}>
        {mobile ? (
          <Skeleton width={40} height={40} radius={10} ariaLabel={null} />
        ) : (
          <>
            <Skeleton width={96} height={36} radius={8} ariaLabel={null} />
            <Skeleton width={40} height={40} radius={10} ariaLabel={null} />
            <Skeleton width={40} height={40} radius={10} ariaLabel={null} />
            <Skeleton.Circle size={36} />
          </>
        )}
      </div>
    </>
  );
}

export function Toolbar({
  start, center, end,
  // Default bg now matches `bg-page` (#f1f1f1) so the toolbar blends with the
  // side navigation rail and the page surface — the Figma shell has no visible
  // chrome boundary between the three. Pass `background="#ffffff"` to opt back
  // into the older "card-style" toolbar look.
  background = '#f1f1f1',
  // Border-bottom is removed by default. Opt in via `elevated` for a soft
  // drop shadow when the toolbar floats over scrollable content.
  elevated = false,
  sticky = false,
  mobile = false,
  loading = false,
  // Reserves a fixed-width empty slot at the toolbar's left edge so a docked
  // Side Navigation can sit "under" the toolbar (technically beside, but
  // visually it reads as one chrome surface). Match this to the
  // SideNavigation's `width` / `collapsedWidth`. 0 = no reserved slot.
  sideNavWidth = 0,
}) {
  const gridTemplate = sideNavWidth > 0
    ? `${sideNavWidth}px minmax(0, 1fr) auto minmax(0, 1fr)`
    : 'minmax(0, 1fr) auto minmax(0, 1fr)';

  return (
    <header
      role="banner"
      data-mobile={mobile ? 'true' : 'false'}
      aria-busy={loading ? true : undefined}
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 50 : undefined,
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        alignItems: 'center',
        gap: mobile ? 8 : 16,
        // Switched from fixed vertical padding to a minHeight + horizontal-
        // only padding. Inner cells (buttons, breadcrumbs, etc.) carry their
        // own vertical padding; this keeps the bar at the design-spec 56 px
        // even when slots are sparse.
        minHeight: mobile ? 48 : 56,
        padding: mobile
          ? `0 12px 0 ${sideNavWidth > 0 ? 0 : 12}px`
          : `0 16px 0 ${sideNavWidth > 0 ? 0 : 16}px`,
        background,
        boxShadow: elevated ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {loading ? <ToolbarSkeleton mobile={mobile} sideNavWidth={sideNavWidth} /> : (
        <>
          {sideNavWidth > 0 && (
            // Empty reserved cell — the docked Side Navigation sits over this
            // area visually. `aria-hidden` because there's no content for
            // assistive tech to announce here.
            <div aria-hidden="true" />
          )}
          <div style={{
            display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12,
            minWidth: 0, justifySelf: 'start',
            paddingLeft: sideNavWidth > 0 ? (mobile ? 8 : 16) : 0,
          }}>
            {start}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 0, justifySelf: 'center',
          }}>
            {center}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: mobile ? 6 : 8,
            justifySelf: 'end',
          }}>
            {end}
          </div>
        </>
      )}
    </header>
  );
}
