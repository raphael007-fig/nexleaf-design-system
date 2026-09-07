// ── "How is this equipment's temperature monitored?" — the register's first ──
// question, asked the way the third-party add-equipment flow asks it (Figma
// 8055-205358): a Modal of OptionCards over the page, Continue disabled until
// one is chosen.
//
// TWO options here, not three (Raf, 2026-09-07): NPHL has no built-in or
// 3rd-party logger path — lab equipment is either monitored by a Nexleaf RTMD
// or it is not monitored at all. Same styling, same copy pattern, one card
// fewer.
import { useState } from 'react';
import { Modal } from '@ds/components/Modal/Modal.jsx';
import { Btn } from '@ds/components/Btn/Btn.jsx';
import { OptionCard } from '@ds/components/OptionCard/OptionCard.jsx';
import { Illustration } from '@ds/foundation/illustrations/index.jsx';

export const LAB_METHOD_OPTIONS = [
  {
    id: 'rtmd',
    title: 'Monitored Equipment by Nexleaf',
    description: 'A Nexleaf remote temperature monitoring device is (or will be) installed on this equipment. Data uploads automatically.',
    illo: 'monitored',
  },
  {
    id: 'none',
    title: 'Unmonitored Equipment',
    description: 'No device records this equipment’s temperature. Temperatures will be recorded manually with a thermometer.',
    illo: 'not-monitored',
  },
];

/**
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {(method: 'rtmd'|'none') => void} onContinue
 */
export function MonitoringMethodModal({ open, onClose, onContinue }) {
  const [method, setMethod] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="How is this equipment's temperature monitored?"
      footer={<>
        <Btn variant="secondary" small onClick={onClose}>Cancel</Btn>
        <Btn variant="primary" small disabled={!method} onClick={() => onContinue?.(method)}>
          Continue
        </Btn>
      </>}
    >
      <div
        role="radiogroup"
        aria-label="How is this equipment's temperature monitored?"
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        {LAB_METHOD_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            media={<Illustration name={opt.illo} size={64} />}
            title={opt.title}
            description={opt.description}
            selected={method === opt.id}
            onSelect={() => setMethod(opt.id)}
          />
        ))}
      </div>
    </Modal>
  );
}
