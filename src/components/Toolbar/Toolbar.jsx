import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  useFocusTrap, useScrollLock, useReturnFocus, useEscapeKey, prefersReducedMotion,
} from '../../foundation/overlay/overlayHooks.js';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { Btn, IconBtn } from '../Btn/Btn.jsx';

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

// ── AiChatPanel header icons (inlined per the icon rule) ──────────────────
const IcoCompose = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M14.6659 3.60354C14.8611 3.40828 15.1777 3.40828 15.373 3.60354L16.4337 4.6642C16.6289 4.85946 16.6289 5.17604 16.4337 5.37131L15.4765 6.32842L13.7088 4.56065L14.6659 3.60354Z" fill={color} />
    <path d="M13.0017 5.26776L14.7694 7.03553L10.9388 10.8661C10.58 11.225 10.0982 11.434 9.59095 11.4508L8.81894 11.4764C8.67442 11.4812 8.55599 11.3628 8.56078 11.2183L8.5864 10.4462C8.60322 9.93903 8.81224 9.45719 9.17108 9.09834L13.0017 5.26776Z" fill={color} />
    <path d="M5 7.24999C5 6.00734 6.00736 4.99999 7.25 4.99999H9.08C9.49421 4.99999 9.83 4.6642 9.83 4.24999C9.83 3.83577 9.49421 3.49999 9.08 3.49999H7.25C5.17893 3.49999 3.5 5.17892 3.5 7.24999V12.75C3.5 14.8211 5.17893 16.5 7.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V10.92C16.5 10.5058 16.1642 10.17 15.75 10.17C15.3358 10.17 15 10.5058 15 10.92V12.75C15 13.9926 13.9926 15 12.75 15H7.25C6.00736 15 5 13.9926 5 12.75V7.24999Z" fill={color} />
  </svg>
);

const IcoPageClock = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.75 12C7.75 11.5858 7.41421 11.25 7 11.25C6.58579 11.25 6.25 11.5858 6.25 12V13.2929C6.25 13.6244 6.3817 13.9424 6.61612 14.1768L7.46967 15.0303C7.76256 15.3232 8.23744 15.3232 8.53033 15.0303C8.82322 14.7374 8.82322 14.2626 8.53033 13.9697L7.75 13.1893V12Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M14.25 17H9.82867C9.0558 17.6254 8.07165 18 7 18C4.51472 18 2.5 15.9853 2.5 13.5C2.5 11.2703 4.12172 9.41928 6.25 9.06222V5.75C6.25 4.23122 7.48122 3 9 3H12C12.1989 3 12.3897 3.07902 12.5303 3.21967L16.7803 7.46967C16.921 7.61032 17 7.80109 17 8V14.25C17 15.7688 15.7688 17 14.25 17ZM7.75 5.75C7.75 5.05964 8.30964 4.5 9 4.5H11.25V7C11.25 7.9665 12.0335 8.75 13 8.75H15.5V14.25C15.5 14.9404 14.9404 15.5 14.25 15.5H11.0322C11.3316 14.8975 11.5 14.2184 11.5 13.5C11.5 11.2703 9.87828 9.41928 7.75 9.06222V5.75ZM14.4393 7.25L12.75 5.56066V7C12.75 7.13807 12.8619 7.25 13 7.25H14.4393ZM7 16.5C8.65685 16.5 10 15.1569 10 13.5C10 11.8431 8.65685 10.5 7 10.5C5.34315 10.5 4 11.8431 4 13.5C4 15.1569 5.34315 16.5 7 16.5Z" fill={color} />
  </svg>
);

const IcoMenuHorizontal = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10Z" fill={color} />
    <path d="M11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10Z" fill={color} />
    <path d="M15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" fill={color} />
  </svg>
);

const IcoArrowLeft = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 10C17.5 10.4602 17.1269 10.8333 16.6667 10.8333L5.90087 10.8333L8.923 13.8552C9.24845 14.1806 9.24848 14.7082 8.92306 15.0337C8.59764 15.3591 8.07 15.3591 7.74455 15.0337L3.29966 10.5893C3.14336 10.433 3.05555 10.221 3.05555 10C3.05555 9.77897 3.14336 9.567 3.29966 9.41071L7.74455 4.96627C8.07 4.64085 8.59764 4.64088 8.92306 4.96633C9.24848 5.29178 9.24845 5.81942 8.923 6.14484L5.90087 9.16667L16.6667 9.16667C17.1269 9.16667 17.5 9.53976 17.5 10Z" fill={color} />
  </svg>
);

const IcoMinimize = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M14.1667 9.44444C14.6269 9.44444 15 9.07135 15 8.61111C15 8.15087 14.6269 7.77778 14.1667 7.77778H13.4007L16.9781 4.20037C17.3036 3.87493 17.3036 3.34729 16.9781 3.02186C16.6527 2.69642 16.1251 2.69642 15.7996 3.02186L12.2222 6.59927V5.83333C12.2222 5.3731 11.8491 5 11.3889 5C10.9287 5 10.5556 5.3731 10.5556 5.83333V8.61111C10.5556 9.07135 10.9287 9.44444 11.3889 9.44444L14.1667 9.44444Z" fill={color} />
    <path d="M5.83333 10.5556C5.3731 10.5556 5 10.9287 5 11.3889C5 11.8491 5.3731 12.2222 5.83333 12.2222H6.59927L3.02186 15.7996C2.69642 16.1251 2.69642 16.6527 3.02186 16.9781C3.34729 17.3036 3.87493 17.3036 4.20037 16.9781L7.77778 13.4007V14.1667C7.77778 14.6269 8.15087 15 8.61111 15C9.07135 15 9.44444 14.6269 9.44444 14.1667V11.3889C9.44444 10.9287 9.07135 10.5556 8.61111 10.5556H5.83333Z" fill={color} />
  </svg>
);

// ── AiChatPanel — right-side drawer opened by ToolbarAiChatButton ─────────
//
// Stateless dialog implementing the AI Chat Bot design (Figma: AI-Chat-Bot,
// node 2069:10173). Consumer controls `open` and renders the chat UI as
// children (see src/components/AiChat/). Slides in from the right; backdrop
// click, the minimize control, and Escape all close it.
//
// Header: [← back?] logo + title, then [Start New Chat] [Previous Chat]
// [⋯ overflow] [✕ close] — each action renders only when its callback is
// passed. `disclaimer` renders the muted usage note under the title row.
// `overflowActions` ({ id, label, icon?, tone? }[]) gives the "⋯" button a
// built-in dropdown (fires onOverflowSelect); plain `onOverflow` still works
// for consumers that render their own menu.
export function AiChatPanel({
  open,
  onClose,
  onBack,
  title = 'AI Chat Bot',
  beta = true,
  width = 560,
  disclaimer = 'This chatbot shows off the potential of generative AI in healthcare applications. Your data and submissions are not used to train or improve models.',
  onNewChat,
  onPreviousChat,
  onOverflow,
  overflowActions,
  onOverflowSelect,
  children,
}) {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowBtnRef = useRef(null);
  const overflowMenuRef = useRef(null);

  // Outside-click + Escape close for the built-in overflow dropdown.
  useEffect(() => {
    if (!overflowOpen) return;
    function onDoc(e) {
      if (overflowMenuRef.current && !overflowMenuRef.current.contains(e.target)
        && !(overflowBtnRef.current && overflowBtnRef.current.contains(e.target))) {
        setOverflowOpen(false);
      }
    }
    function onKey(e) { if (e.key === 'Escape') setOverflowOpen(false); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [overflowOpen]);
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
        <header style={{ flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, rowGap: 8, flexWrap: 'wrap',
            padding: '16px 16px 4px',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 140 }}>
              {onBack && (
                <button
                  type="button"
                  aria-label="Back"
                  onClick={onBack}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, padding: 0,
                    background: 'transparent', border: 'none', borderRadius: 8,
                    color: '#616161', cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <IcoArrowLeft size={20} color="currentColor" />
                </button>
              )}
              <AiLogo size={24} />
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 650, lineHeight: '20px',
                color: '#303030', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {title}{beta && <span style={{ color: '#616161', fontWeight: 650 }}> (beta)</span>}
              </span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              {onNewChat && (
                <Btn variant="secondary" size="medium" icon={<IcoCompose size={16} />} onClick={onNewChat}>
                  Start New Chat
                </Btn>
              )}
              {onPreviousChat && (
                <Btn variant="secondary" size="medium" icon={<IcoPageClock size={16} />} onClick={onPreviousChat}>
                  Previous Chat
                </Btn>
              )}
              {(overflowActions?.length || onOverflow) && (
                <span ref={overflowBtnRef} style={{ position: 'relative', display: 'inline-flex' }}>
                  <IconBtn
                    icon={<IcoMenuHorizontal size={20} />}
                    onClick={overflowActions?.length ? () => setOverflowOpen((o) => !o) : onOverflow}
                  />
                  {overflowOpen && overflowActions?.length > 0 && (
                    <div
                      ref={overflowMenuRef}
                      style={{
                        position: 'absolute', top: 'calc(100% + 4px)', right: 0,
                        zIndex: 10, width: 180,
                        background: '#ffffff', borderRadius: 12,
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.10), 0 10px 10px -5px rgba(0,0,0,0.04)',
                      }}
                    >
                      <OptionList
                        sections={[{
                          options: overflowActions.map((a) => ({
                            id: a.id,
                            label: a.tone === 'critical' ? <span style={{ color: '#d92d20' }}>{a.label}</span> : a.label,
                            media: a.icon
                              ? <span style={{ display: 'inline-flex', color: a.tone === 'critical' ? '#d92d20' : '#616161' }}>{a.icon}</span>
                              : undefined,
                            disabled: a.disabled,
                          })),
                        }]}
                        onChange={(id) => {
                          setOverflowOpen(false);
                          const idx = overflowActions.findIndex((a) => a.id === id);
                          onOverflowSelect && onOverflowSelect(id, overflowActions[idx], idx);
                        }}
                      />
                    </div>
                  )}
                </span>
              )}
              <button
                type="button"
                aria-label="Close AI chat"
                onClick={onClose}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, padding: 0,
                  background: 'transparent', border: 'none', borderRadius: 8,
                  color: '#616161', cursor: 'pointer',
                }}
              >
                <IcoClose size={20} color="currentColor" />
              </button>
            </span>
          </div>
          {disclaimer && (
            <div style={{
              padding: '8px 12px',
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, lineHeight: '16px',
              color: '#616161',
            }}>{disclaimer}</div>
          )}
          <div style={{ margin: '0 12px', height: 1, background: '#ebebeb' }} />
        </header>
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
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
