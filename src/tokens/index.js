// ── Nexleaf Design System Tokens ──────────────────────────────────────────────
// JS constants mirror of src/tokens/tokens.css. Use these in inline-style
// React components; use the CSS custom properties from tokens.css in `.css` files.

// Surface & Background
export const BG_PAGE        = '#f1f1f1';
export const BG_SURFACE     = '#ffffff';
export const BG_INPUT       = '#fdfdfd';
export const BG_INPUT_FOCUS = '#fafafa';
export const BG_DISABLED         = 'rgba(0,0,0,0.06)';
export const BG_CONTROL_DISABLED = 'rgba(0,0,0,0.08)';
export const BG_ERROR       = '#fee9e8';
export const BG_SELECTED    = '#f0f7ff';
export const BG_OPEN        = '#f7f9fc';
export const BG_SKELETON    = '#e8e8e8';

// Interactive state overlays
export const BG_HOVER_SUBTLE   = 'rgba(0,0,0,0.05)';
export const BG_HOVER          = 'rgba(0,0,0,0.06)';
export const BG_PRESSED        = 'rgba(0,0,0,0.08)';
export const BG_SURFACE_HOVER  = '#f7f7f7';
export const BG_SURFACE_ACTIVE = '#f3f3f3';

// Primary (Interactive)
export const COLOR_PRIMARY              = '#005bd3';
export const COLOR_PRIMARY_HOVER        = '#004bb0';
export const COLOR_PRIMARY_PRESSED      = '#003a8a';
export const COLOR_PRIMARY_DISABLED     = 'rgba(0,0,0,0.17)';
export const COLOR_PRIMARY_HOVER_SHADOW = 'rgba(0,91,211,0.12)';

// Text
export const TEXT_DEFAULT     = '#303030';
export const TEXT_SUBDUED     = '#616161';
export const TEXT_PLACEHOLDER = '#9e9e9e';
export const TEXT_DISABLED    = '#b5b5b5';
export const TEXT_ON_PRIMARY  = '#ffffff';

// Borders
export const BORDER_DEFAULT       = '#e0e0e0';
export const BORDER_INPUT         = '#8a8a8a';
export const BORDER_INPUT_FOCUS   = '#616161';
export const BORDER_INPUT_ERROR   = '#8e1f0b';
export const BORDER_LIGHT         = '#ebebeb';
export const BORDER_LIGHTER       = '#f0f0f0';
export const BORDER_SECONDARY_BTN = '#c9c9c9';

// Semantic — base colors
export const COLOR_CRITICAL        = '#d92d20';
export const COLOR_CRITICAL_STRONG = '#e51c00';
export const COLOR_SUCCESS         = '#12b76a';

// Semantic — success family
export const BG_SUCCESS     = '#cdfee1';
export const TEXT_SUCCESS   = '#0c5132';
export const BORDER_SUCCESS = '#7be8b4';

// Semantic — warning family
export const BG_WARNING     = '#fff3cd';
export const TEXT_WARNING   = '#856404';
export const BORDER_WARNING = '#ffd966';

// Semantic — info family
export const BG_INFO     = '#eaf4ff';
export const TEXT_INFO   = '#00527c';
export const BORDER_INFO = '#b3d9f7';

// Semantic — critical family
export const BG_CRITICAL      = '#fee9e8';
export const BG_CRITICAL_SOFT = '#fde2e1';
export const TEXT_CRITICAL    = '#8e1f0b';
export const BORDER_CRITICAL  = '#f5b8b5';

// Magic tone (purple)
export const MAGIC_TEXT             = '#5700d1';
export const MAGIC_PRIMARY          = '#8051ff';
export const MAGIC_SECONDARY        = '#9474ff';
export const MAGIC_BG_TAG_REST      = '#ede7ff';
export const MAGIC_BG_TAG_HOVER     = '#dcd0ff';
export const MAGIC_BG_INPUT_REST    = '#f8f7ff';
export const MAGIC_BG_INPUT_FOCUS   = '#f3f1ff';

// Contextual / Domain-specific
export const COLOR_MORNING = '#f59e0b';
export const COLOR_EVENING = '#6366f1';

// Button shadows — exact Figma tokens
export const BTN_SHADOW_DEFAULT  = 'inset 0 -1px 0 #b5b5b5, inset -1px 0 0 #e3e3e3, inset 1px 0 0 #e3e3e3, inset 0 1px 0 #e3e3e3';
export const BTN_SHADOW_HOVER    = 'inset 0 -1px 0 #ccc, inset -1px 0 0 #ebebeb, inset 1px 0 0 #ebebeb, inset 0 1px 0 #ebebeb';
export const BTN_SHADOW_ACTIVE   = 'inset 0 2px 1px rgba(26,26,26,0.2), inset 1px 0 1px rgba(26,26,26,0.12), inset -1px 0 1px rgba(26,26,26,0.12)';
export const BTN_SHADOW_PRIMARY  = 'inset 0 2px 0 rgba(255,255,255,0.2), inset 2px 0 0 rgba(255,255,255,0.2), inset -2px 0 0 rgba(255,255,255,0.2), inset 0 -1px 0 1px #000, inset 0 1px 0 #000';
export const BTN_SHADOW_CRITICAL = 'inset 0 1px 0 rgba(255,255,255,0.48), inset -1px 0 0 rgba(255,255,255,0.2), inset 1px 0 0 rgba(255,255,255,0.2), inset 0 -1.5px 0 rgba(0,0,0,0.25)';
export const FOCUS_RING          = '0 0 0 2px #005bd3';

// Border radius scale (mirrors tokens.css --nx-radius-*).
export const RADIUS_XS      = 4;    // Dismiss buttons, tiny chips, inner icon hit-areas
export const RADIUS_CONTROL = 6;    // Compact icon controls (row-action menu, pagination cells)
export const RADIUS_SM      = 8;    // Buttons, inputs, banners, list containers
export const RADIUS_MD      = 10;   // Accordions
export const RADIUS_LG      = 12;   // Option-card, checkbox containers
export const RADIUS_XL      = 16;   // Proto/navigation cards
export const RADIUS_PILL    = 100;  // Badges, pills

// ── Status badge / info & success tone notes ──────────────────────────────────
// Two deliberate value pairs differ from the base semantic tokens; documented
// here so they aren't "fixed" by mistake:
//   • Badge `info` fill uses #e0f0ff (a touch deeper than BG_INFO #eaf4ff) for
//     better contrast of the chip against white surfaces. BG_INFO stays the
//     banner background.
//   • Filled green surfaces (success Btn, success-strong Badge) use #29845a,
//     darker than COLOR_SUCCESS #12b76a, so white text on them clears AA. The
//     #12b76a token remains the success *icon/indicator* color.
export const COLOR_SUCCESS_FILLED = '#29845a'; // filled-button / strong-badge green
export const BG_INFO_BADGE        = '#e0f0ff'; // info Badge chip fill (vs banner BG_INFO)
