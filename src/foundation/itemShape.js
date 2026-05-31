// ── Nexleaf Design System — Item shape contract ───────────────────────────────
//
// Canonical item shape for every component that takes an array of selectable
// things (options, tabs, nav items, choices, breadcrumbs):
//
//   { id, label, disabled?, ...componentExtras }
//
//   • id       — REQUIRED stable identity. Emitted by selection callbacks and
//                used for controlled-selection matching.
//   • label    — display text (string or ReactNode).
//   • disabled — optional; opt the item out of interaction.
//
// `value` is the DEPRECATED legacy identity key (form controls historically used
// it to mirror native <option value>). It is still honored as a fallback so no
// existing call-site breaks, but it logs a one-time console warning per component
// nudging migration to `id`.
//
// Use `getItemId`/`getItemLabel` instead of reaching into `item.id`/`item.value`
// directly so the fallback + warning stay in exactly one place.

// One warning per componentName per session — keeps console noise to a single
// line even when a list has hundreds of legacy options.
const _warned = new Set();

export function warnDeprecatedValue(componentName) {
  const name = componentName || 'Component';
  if (_warned.has(name)) return;
  _warned.add(name);
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(
      `[Nexleaf] ${name}: item \`value\` is deprecated — use \`id\` as the ` +
      `canonical identity key ({ id, label }). \`value\` still works for now.`
    );
  }
}

// Returns the item's canonical identity: `id` when present, else the legacy
// `value` (emitting a one-time deprecation warning). Primitive items (a bare
// string/number option) are returned as-is.
export function getItemId(item, componentName) {
  if (item == null || typeof item !== 'object') return item;
  if (item.id != null) return item.id;
  if (item.value != null) {
    warnDeprecatedValue(componentName);
    return item.value;
  }
  return undefined;
}

// Returns the item's display label. Primitive items are their own label.
export function getItemLabel(item) {
  if (item == null || typeof item !== 'object') return item;
  return item.label;
}
