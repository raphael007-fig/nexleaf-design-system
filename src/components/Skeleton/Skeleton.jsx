import { useEffect } from 'react';

// ─── Shared pulse keyframe ────────────────────────────────────────────────────
// Injected once per page on first <Skeleton> mount. All Skeleton instances
// (and any consumer that wants to match the system pulse) share the same
// `skeletonPulse` keyframe so timing stays identical everywhere.

const KEYFRAME_ID = 'nx-skeleton-keyframe';
const KEYFRAME_CSS = `
  @keyframes skeletonPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
`;

function useSkeletonKeyframe() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(KEYFRAME_ID)) return;
    const tag = document.createElement('style');
    tag.id = KEYFRAME_ID;
    tag.textContent = KEYFRAME_CSS;
    document.head.appendChild(tag);
  }, []);
}

// ─── Tokens ───────────────────────────────────────────────────────────────────
// Single source of truth for skeleton visuals. Kept inline (no import from
// tokens/) so the component stays self-contained and easy to copy.

const SK_BG       = '#e8e8e8';   // base block color
const SK_DURATION = '1.4s';      // pulse cycle
const SK_RADIUS   = 4;           // default radius for blocks/lines

// ─── <Skeleton /> — generic block ─────────────────────────────────────────────
//
// The base primitive. Renders a rectangular pulsing block. Use directly for
// anything that isn't text or a circle (e.g. a thumbnail placeholder, a card
// area, a custom shape).
//
// Props:
//   width        — CSS width  (default '100%')
//   height       — CSS height (default 16)
//   radius       — border-radius in px (default 4)
//   delay        — animation-delay in seconds, used to stagger groups
//   style        — escape hatch for one-off overrides
//   ariaLabel    — accessible name (defaults to 'Loading'). Pass null to suppress.

export function Skeleton({
  width = '100%',
  height = 16,
  radius = SK_RADIUS,
  delay = 0,
  style,
  ariaLabel = 'Loading',
}) {
  useSkeletonKeyframe();
  return (
    <div
      role={ariaLabel ? 'status' : undefined}
      aria-label={ariaLabel || undefined}
      aria-live={ariaLabel ? 'polite' : undefined}
      aria-busy={ariaLabel ? true : undefined}
      style={{
        width,
        height,
        borderRadius: radius,
        background: SK_BG,
        animation: `skeletonPulse ${SK_DURATION} ease-in-out infinite`,
        animationDelay: `${delay}s`,
        flexShrink: 0,
        boxSizing: 'border-box',
        ...style,
      }}
    />
  );
}

// ─── <Skeleton.Line /> — text line ────────────────────────────────────────────
//
// One line of placeholder text. Height defaults to 13px (matches the system's
// `label` text scale). Use multiple stacked Lines for paragraphs — pass
// staggered `delay` values to make the pulse cascade left-to-right.

function SkeletonLine({ width = '100%', height = 13, delay = 0, style }) {
  return (
    <Skeleton
      width={width}
      height={height}
      radius={4}
      delay={delay}
      style={style}
      ariaLabel={null}
    />
  );
}

// ─── <Skeleton.Circle /> — circular block ─────────────────────────────────────
//
// Square block forced to a circle via 50% radius. Use for avatars, status
// dots, or icon placeholders. `size` sets both width and height.

function SkeletonCircle({ size = 20, delay = 0, style }) {
  return (
    <Skeleton
      width={size}
      height={size}
      radius="50%"
      delay={delay}
      style={style}
      ariaLabel={null}
    />
  );
}

// Attached as static properties so consumers can write
// `<Skeleton.Line />` / `<Skeleton.Circle />` without separate imports.
Skeleton.Line   = SkeletonLine;
Skeleton.Circle = SkeletonCircle;

// ─── <SkeletonGroup /> — accessible wrapper ───────────────────────────────────
//
// Optional convenience wrapper for groups of skeletons. Sets a single
// `aria-busy="true"` on the container and hides children from AT, so users of
// screen readers get one announcement ("Loading <region>") instead of N.

export function SkeletonGroup({ label = 'Loading', children, style }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
      style={{ display: 'contents', ...style }}
    >
      <span style={{
        position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
        overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
      }}>
        {label}
      </span>
      <div aria-hidden="true" style={{ display: 'contents' }}>
        {children}
      </div>
    </div>
  );
}
