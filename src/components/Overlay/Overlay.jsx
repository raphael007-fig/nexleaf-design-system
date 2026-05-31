// ── Nexleaf Design System — Overlay ───────────────────────────────────────────
// Thin backward-compatible wrapper over the accessible <Modal> primitive.
// Existing callers do <Overlay onClose={fn}>{cardMarkup}</Overlay> and supply
// their own white card surface, so Overlay renders Modal in "raw" mode (no
// built-in header/footer) — but now inherits focus trap, scroll lock, return
// focus, role="dialog"/aria-modal, and Escape handling for free.
//
// New code should prefer <Modal> directly.

import { Modal } from '../Modal/Modal.jsx';

export function Overlay({ children, onClose, maxWidth = 620, ariaLabel = 'Dialog' }) {
  return (
    <Modal open onClose={onClose} maxWidth={maxWidth} ariaLabel={ariaLabel} showCloseButton={false}>
      {children}
    </Modal>
  );
}
