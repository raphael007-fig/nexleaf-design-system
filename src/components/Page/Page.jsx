import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Btn } from '../Btn/Btn.jsx';
import { Badge, StatusBadge } from '../Badge/Badge.jsx';
import { useIsMobile } from '../../foundation/useViewport.js';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { Skeleton, SkeletonGroup } from '../Skeleton/Skeleton.jsx';
import { Overlay } from '../Overlay/Overlay.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { BottomSheet } from '../BottomSheet/BottomSheet.jsx';

// ─── Modal close icon (inline) ───────────────────────────────────────────────
const IcoXMark = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path d="M11.06 10l4.47-4.47a.75.75 0 1 0-1.06-1.06L10 8.94 5.53 4.47a.75.75 0 1 0-1.06 1.06L8.94 10l-4.47 4.47a.75.75 0 1 0 1.06 1.06L10 11.06l4.47 4.47a.75.75 0 1 0 1.06-1.06L11.06 10Z" />
  </svg>
);

// ─── Chevron down (inline, used by the Title Disclosure) ─────────────────────
const IcoChevronDown = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 7.5l5 5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Normalize the `image` prop so callers can pass either a string URL (used as
// both thumbnail and full-size) or `{ src, full?, alt? }` for separate
// thumbnail vs. full-resolution sources.
function normalizeImage(image, fallbackAlt) {
  if (!image) return null;
  if (typeof image === 'string') return { src: image, full: image, alt: fallbackAlt };
  const { src, full, alt } = image;
  if (!src) return null;
  return { src, full: full || src, alt: alt || fallbackAlt };
}

export function Page({
  title = 'Title',
  subtitle,
  backAction,
  image,
  metadata = [],
  primaryAction,
  secondaryActions = [],
  pagination,
  loading = false,
  titleDisclosure,
  // ── Record variant (responsive tertiary record header) ──────────────────────
  // variant="record" renders the focused record header used on tertiary/detail
  // pages: back arrow + dominant name + health status chip beside the title +
  // serial subtitle. Responsive — on mobile the title compacts and the action
  // row (e.g. <TertiaryActions/>) stacks full-width below the title.
  variant = 'default',
  status,            // health status string → StatusBadge (record variant)
  statusChip,        // node override for the chip (record variant)
  actions,           // node — record-variant action row (e.g. <TertiaryActions/>)
  mobile,            // override useIsMobile() for the record variant
  // Drop the header's own top padding when the Page sits inside a shell that
  // already provides the top rhythm (e.g. AppShell's content container). Keeps
  // the header's start point flush with non-Page content (Home) at the same level.
  flushTop = false,
  children,
}) {
  const autoMobile = useIsMobile();
  const isMobileRecord = mobile ?? autoMobile;
  const [hovBack, setHovBack] = useState(false);
  const [hovImage, setHovImage] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  // Single focus-target state — only one of these buttons can be focused at a
  // time. Values: 'back' | 'image' | 'disclosure' | 'closeImage' | null.
  const [focused, setFocused] = useState(null);
  const img = normalizeImage(image, title);

  // Unified back/primary/secondary handlers — accept either `onClick`
  // (preferred, matches the rest of the component library) or `onAction`
  // (legacy Page API). Both fire if both are provided, so existing consumers
  // keep working while new code uses `onClick`.
  const handleBack = () => {
    if (backAction?.onClick) backAction.onClick();
    if (backAction?.onAction) backAction.onAction();
  };
  const handlePrimary = () => {
    if (primaryAction?.onClick) primaryAction.onClick();
    if (primaryAction?.onAction) primaryAction.onAction();
  };
  const handleSecondary = (action) => () => {
    if (action?.onClick) action.onClick();
    if (action?.onAction) action.onAction();
  };

  // ─── Title Disclosure popover state ─────────────────────────────────────────
  // Only renders when `titleDisclosure` is provided. A chevron-down button sits
  // next to the title; clicking it portals an `OptionList` directly under the
  // title showing sibling pages so the user can jump between them without
  // routing through the side nav.
  const [discOpen, setDiscOpen]   = useState(false);
  const [discRect, setDiscRect]   = useState(null);
  const [hovDisc, setHovDisc]     = useState(false);
  const discBtnRef = useRef(null);
  const discPopRef = useRef(null);

  // Close the popover on Escape / outside click. Effect only attaches listeners
  // while the popover is open, so we don't pay the cost on every render.
  useEffect(() => {
    // On mobile the switcher is a BottomSheet, which manages its own dismissal —
    // skip the desktop popover's outside-click/Escape handling there.
    if (!discOpen || autoMobile) return;
    const onKey = (e) => { if (e.key === 'Escape') setDiscOpen(false); };
    const onClick = (e) => {
      if (
        discPopRef.current && !discPopRef.current.contains(e.target) &&
        discBtnRef.current && !discBtnRef.current.contains(e.target)
      ) setDiscOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [discOpen]);

  const openDisc = () => {
    if (discBtnRef.current) setDiscRect(discBtnRef.current.getBoundingClientRect());
    setDiscOpen(true);
  };
  if (loading) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          paddingTop: 24, paddingBottom: 24 }}>
          <SkeletonGroup label="Loading page header">
            {/* Left: back chip + title block (matches paddingTop: 2 used by real header) */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', flex: '1 0 0', minWidth: 0 }}>
              {backAction && <Skeleton width={28} height={28} radius={8} ariaLabel={null} />}
              {img && <Skeleton width={40} height={40} radius={8} delay={0.03} ariaLabel={null} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: backAction ? 2 : 0, marginLeft: img ? 8 : 0 }}>
                <Skeleton width={220} height={24} radius={6} ariaLabel={null} />
                <Skeleton width={140} height={14} radius={4} delay={0.06} ariaLabel={null} />
              </div>
            </div>
            {/* Right: action placeholders */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              {secondaryActions.map((_, i) => (
                <Skeleton key={i} width={96} height={28} radius={8} delay={0.04 + i * 0.04} ariaLabel={null} />
              ))}
              {primaryAction && <Skeleton width={120} height={28} radius={8} delay={0.12} ariaLabel={null} />}
            </div>
          </SkeletonGroup>
        </div>
        {children}
      </div>
    );
  }
  // ── Record variant — focused, responsive tertiary record header ─────────────
  if (variant === 'record') {
    const chip = statusChip ?? (status != null ? <StatusBadge status={status} /> : null);
    // Title scales fluidly with the viewport — reduced up to ~20% from the
    // 24px desktop size (down to 19px) so it stays legible and keeps hierarchy.
    const titleSize = 'clamp(19px, 1.1rem + 0.6vw, 24px)';
    const actionRow = actions ?? ((primaryAction || secondaryActions.length > 0) ? (
      <>
        {secondaryActions.map((action, i) => (
          action.node
            ? <span key={i} style={{ display: 'inline-flex' }}>{action.node}</span>
            : <Btn key={i} variant="secondary" size={isMobileRecord ? 'large' : 'medium'} onClick={handleSecondary(action)} disclosure={action.disclosure}>{action.content}</Btn>
        ))}
        {primaryAction && <Btn variant="primary" size={isMobileRecord ? 'large' : 'medium'} onClick={handlePrimary}>{primaryAction.content}</Btn>}
      </>
    ) : null);

    return (
      <header style={{
        display: 'flex', flexDirection: 'column', gap: isMobileRecord ? 12 : 0,
        // Transparent — sits on the page background like the default Header Page
        // (no white card). Vertical padding only; the page provides horizontal.
        padding: isMobileRecord ? '12px 0' : '20px 0',
        paddingTop: flushTop
          ? 'var(--nx-safe-top, 0px)'
          : `calc(${isMobileRecord ? '12px' : '20px'} + var(--nx-safe-top, 0px))`,
        background: 'transparent', fontFamily: 'Inter,sans-serif', width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {backAction && (
            <button
              type="button" aria-label="Back" onClick={handleBack}
              onMouseEnter={() => setHovBack(true)} onMouseLeave={() => setHovBack(false)}
              onFocus={() => setFocused('back')} onBlur={() => setFocused(null)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 8, border: 'none', flexShrink: 0, padding: 0,
                marginTop: 1, cursor: 'pointer', outline: 'none',
                background: hovBack ? 'rgba(0,0,0,0.06)' : 'transparent',
                boxShadow: focused === 'back' ? '0 0 0 2px #005bd3' : undefined,
                transition: 'background 0.12s, box-shadow 0.12s',
              }}>
              <PolarisIconImg name="ArrowLeftIcon" size={20} color="#303030" />
            </button>
          )}
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={{
                margin: 0, fontSize: titleSize, fontWeight: 650, lineHeight: '1.2',
                letterSpacing: '-0.2px', color: '#303030', minWidth: 0,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {title}
              </h1>
              {chip && <span style={{ flexShrink: 0, marginTop: isMobileRecord ? 2 : 4 }}>{chip}</span>}
            </div>
            {subtitle && (
              <div style={{
                marginTop: 2, fontSize: isMobileRecord ? 14 : 15, fontWeight: 450,
                lineHeight: '20px', color: '#616161',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {subtitle}
              </div>
            )}
          </div>
          {!isMobileRecord && actionRow && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>{actionRow}</div>
          )}
        </div>
        {isMobileRecord && actionRow && <div style={{ display: 'flex', gap: 8 }}>{actionRow}</div>}
        {children}
      </header>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex',
        flexDirection: autoMobile ? 'column' : 'row',
        alignItems: autoMobile ? 'stretch' : 'flex-start',
        justifyContent: 'space-between',
        gap: autoMobile ? 12 : 0,
        paddingTop: flushTop ? 0 : (autoMobile ? 16 : 24), paddingBottom: autoMobile ? 16 : 24 }}>
        {/* Left: back + title */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', flex: autoMobile ? '0 0 auto' : '1 0 0', minWidth: 0 }}>
          {backAction && (
            <button onClick={handleBack}
              onMouseEnter={() => setHovBack(true)}
              onMouseLeave={() => setHovBack(false)}
              onFocus={() => setFocused('back')}
              onBlur={() => setFocused(null)}
              title="Back"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: 8, border: 'none',
                background: hovBack ? 'rgba(0,0,0,0.06)' : 'transparent',
                cursor: 'pointer', flexShrink: 0, padding: 4,
                transition: 'background 0.12s, box-shadow 0.12s', outline: 'none',
                boxShadow: focused === 'back' ? '0 0 0 2px #005bd3' : undefined }}>
              <PolarisIconImg name="ArrowLeftIcon" size={20} color="#303030" />
            </button>
          )}
          {img && (
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              onMouseEnter={() => setHovImage(true)}
              onMouseLeave={() => setHovImage(false)}
              onFocus={() => setFocused('image')}
              onBlur={() => setFocused(null)}
              aria-label={`Open full image of ${img.alt || title}`}
              aria-haspopup="dialog"
              title={img.alt || title}
              style={{
                width: 40, height: 40,
                borderRadius: 8,
                border: 'none',
                padding: 0,
                marginRight: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
                background: '#f1f1f1',
                // Focus ring composes with whatever shadow is already painted
                // (hover glow or the rest inset border) — never replaces it.
                boxShadow: focused === 'image'
                  ? (hovImage
                      ? '0 0 0 2px #005bd3, 0 0 0 1px rgba(0,91,211,0.5), 0 4px 12px rgba(0,91,211,0.18)'
                      : '0 0 0 2px #005bd3, inset 0 0 0 1px rgba(0,0,0,0.06)')
                  : (hovImage
                      ? '0 0 0 1px rgba(0,91,211,0.5), 0 4px 12px rgba(0,91,211,0.18)'
                      : 'inset 0 0 0 1px rgba(0,0,0,0.06)'),
                transition: 'box-shadow 0.15s',
                outline: 'none',
                display: 'block',
              }}
            >
              <img
                src={img.src}
                alt=""
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
            </button>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: backAction ? 2 : 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
              <span style={{ fontSize: 20, fontWeight: 650, letterSpacing: '-0.2px',
                lineHeight: '24px', color: '#303030', whiteSpace: 'nowrap',
                fontFamily: 'Inter,sans-serif' }}>
                {title}
              </span>
              {titleDisclosure && titleDisclosure.items && titleDisclosure.items.length > 0 && (
                <button
                  ref={discBtnRef}
                  type="button"
                  onClick={() => (discOpen ? setDiscOpen(false) : openDisc())}
                  onMouseEnter={() => setHovDisc(true)}
                  onMouseLeave={() => setHovDisc(false)}
                  onFocus={() => setFocused('disclosure')}
                  onBlur={() => setFocused(null)}
                  aria-haspopup="menu"
                  aria-expanded={discOpen}
                  aria-label={titleDisclosure.ariaLabel || `Switch to a sibling of ${title}`}
                  title="Switch page"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 24, height: 24, borderRadius: 6, border: 'none',
                    background: discOpen || hovDisc ? 'rgba(0,0,0,0.06)' : 'transparent',
                    cursor: 'pointer', flexShrink: 0, padding: 2, marginLeft: -2,
                    transition: 'background 0.12s, box-shadow 0.12s', outline: 'none',
                    boxShadow: focused === 'disclosure' ? '0 0 0 2px #005bd3' : undefined,
                    color: '#303030',
                  }}
                >
                  <span style={{
                    display: 'inline-flex',
                    transform: discOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.18s ease',
                  }}>
                    <IcoChevronDown size={16} color="#303030" />
                  </span>
                </button>
              )}
              {metadata.length > 0 && (
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {metadata.map((m, i) => (
                    <Badge key={i} tone={m.tone || 'default'}>{m.label}</Badge>
                  ))}
                </div>
              )}
            </div>
            {subtitle && (
              <span style={{ fontSize: 12, fontWeight: 450, color: '#616161',
                lineHeight: '16px', fontFamily: 'Inter,sans-serif' }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {/* Right (desktop) / below the title (mobile): actions. On mobile the row
            sits under the text and uses the large (touch) button size. */}
        {(secondaryActions.length > 0 || primaryAction || pagination) && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
            flexWrap: autoMobile ? 'wrap' : 'nowrap' }}>
            {secondaryActions.map((action, i) => (
              action.node ? (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {action.node}
                </span>
              ) : (
                <Btn key={i} variant="secondary" size={autoMobile ? 'large' : 'medium'} onClick={handleSecondary(action)} disclosure={action.disclosure}>
                  {action.content}
                </Btn>
              )
            ))}
            {primaryAction && (
              <Btn variant="primary" size={autoMobile ? 'large' : 'medium'} onClick={handlePrimary}>
                {primaryAction.content}
              </Btn>
            )}
            {pagination && <Pagination {...pagination} />}
          </div>
        )}
      </div>
      {children}

      {/* Title Disclosure — sibling-page switcher. Desktop: OptionList popover
          under the chevron. Mobile: the SAME options in a BottomSheet (pulled
          from the nav), matching the "More → bottom sheet" pattern. */}
      {(() => {
        if (!titleDisclosure || !titleDisclosure.items || titleDisclosure.items.length === 0) return null;
        const options = titleDisclosure.items.map((it) => ({ id: it.id, label: it.label, disabled: it.disabled }));
        const handleChange = (id) => {
          setDiscOpen(false);
          const item = titleDisclosure.items.find((i) => i.id === id);
          if (item?.onClick) item.onClick();
          if (titleDisclosure.onSelect) titleDisclosure.onSelect(id);
        };
        // Mobile → bottom sheet (selector), same logic as the desktop dropdown.
        if (autoMobile) {
          return (
            <BottomSheet open={discOpen} onClose={() => setDiscOpen(false)} title={titleDisclosure.sectionTitle} showCloseButton>
              <OptionList flush options={options} selected={titleDisclosure.activeItemId} onChange={handleChange} />
            </BottomSheet>
          );
        }
        // Desktop → popover under the chevron.
        if (!discOpen || !discRect) return null;
        return createPortal(
          <div
            ref={discPopRef}
            role="menu"
            style={{ position: 'fixed', top: discRect.bottom + 4, left: discRect.left, zIndex: 100, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderRadius: 8 }}
          >
            <OptionList title={titleDisclosure.sectionTitle} options={options} selected={titleDisclosure.activeItemId} onChange={handleChange} />
          </div>,
          document.body
        );
      })()}

      {/* Image preview modal — opens when the header thumbnail is clicked */}
      {img && imageOpen && (
        <Overlay onClose={() => setImageOpen(false)}>
          <div
            role="dialog"
            aria-label={img.alt || title}
            style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0,0,0,0.24)',
            }}
          >
            <button
              type="button"
              onClick={() => setImageOpen(false)}
              onFocus={() => setFocused('closeImage')}
              onBlur={() => setFocused(null)}
              aria-label="Close image preview"
              style={{
                position: 'absolute',
                top: 12, right: 12,
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                cursor: 'pointer',
                padding: 0,
                zIndex: 1,
                outline: 'none',
                boxShadow: focused === 'closeImage' ? '0 0 0 2px #005bd3' : undefined,
                transition: 'box-shadow 0.12s',
              }}
            >
              <IcoXMark size={16} color="#303030" />
            </button>
            <img
              src={img.full || img.src}
              alt={img.alt || title}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '85vh',
                objectFit: 'contain',
                background: '#f1f1f1',
              }}
            />
          </div>
        </Overlay>
      )}
    </div>
  );
}
