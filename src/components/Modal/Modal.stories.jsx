import { useState } from 'react';
import { Modal } from './Modal.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Checkbox } from '../Checkbox/Checkbox.jsx';

export default {
  title: 'Components/Overlays/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
};

const wrap = { fontFamily: 'Inter, sans-serif', display: 'flex', gap: 12, flexWrap: 'wrap' };
const colLabel = {
  fontSize: 11, fontWeight: 600, color: '#9e9e9e', marginBottom: 8, fontFamily: 'Inter, sans-serif',
};

// A small slot stand-in mirroring the Figma "Slot" placeholder so the body area
// is visible in the docs without wiring real content.
const Slot = ({ children }) => (
  <div style={{
    border: '1px dashed #b3d9f7', background: '#eaf4ff', borderRadius: 8,
    padding: '12px 16px', fontSize: 13, fontWeight: 450, color: '#00527c', textAlign: 'center',
  }}>
    {children || 'Slot — drop your content here'}
  </div>
);

// Reusable launcher: a trigger button that opens a Modal. Keeps each story to a
// single declarative call. The footer reuses the shared <Btn> (secondary +
// primary), matching the design-system action conventions.
function ModalDemo({
  triggerLabel = 'Open modal',
  size = 'large',
  title = 'Title',
  showCloseButton = true,
  secondaryAction = true,
  body,
  primaryLabel = 'Save',
  secondaryLabel = 'Cancel',
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="secondary" onClick={() => setOpen(true)}>{triggerLabel}</Btn>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={title}
        showCloseButton={showCloseButton}
        footer={
          <>
            {secondaryAction && (
              <Btn variant="secondary" onClick={() => setOpen(false)}>{secondaryLabel}</Btn>
            )}
            <Btn variant="primary" onClick={() => setOpen(false)}>{primaryLabel}</Btn>
          </>
        }
      >
        {body || <Slot />}
      </Modal>
    </>
  );
}

// ─── All sizes — large / small / fullscreen ─────────────────────────────────────

export const Sizes = {
  name: 'Sizes (large / small / fullscreen)',
  render: () => (
    <div style={wrap}>
      <div>
        <p style={colLabel}>Large — 620px (default)</p>
        <ModalDemo triggerLabel="Open large" size="large" title="Large modal" />
      </div>
      <div>
        <p style={colLabel}>Small — 380px</p>
        <ModalDemo triggerLabel="Open small" size="small" title="Small modal" />
      </div>
      <div>
        <p style={colLabel}>Fullscreen — fills viewport (mobile)</p>
        <ModalDemo triggerLabel="Open fullscreen" size="fullscreen" title="Fullscreen modal" />
      </div>
    </div>
  ),
};

// ─── Focused size stories ───────────────────────────────────────────────────────

export const Large = {
  render: () => <ModalDemo triggerLabel="Open large modal" size="large" title="Title" />,
};

export const Small = {
  render: () => <ModalDemo triggerLabel="Open small modal" size="small" title="Title" />,
};

export const Fullscreen = {
  render: () => <ModalDemo triggerLabel="Open fullscreen modal" size="fullscreen" title="Title" />,
};

// ─── Toggles — title / secondary action ─────────────────────────────────────────

export const WithoutTitle = {
  name: 'Without title bar',
  render: () => (
    <ModalDemo
      triggerLabel="Open (no title)"
      size="large"
      title={null}
      body={<Slot>Body content with no title bar — the close button still floats top-right.</Slot>}
    />
  ),
};

export const WithoutSecondaryAction = {
  name: 'Single (primary-only) action',
  render: () => (
    <ModalDemo
      triggerLabel="Open (primary only)"
      size="small"
      title="Terms agreement"
      secondaryAction={false}
      primaryLabel="Done"
    />
  ),
};

// ─── Realistic example — reusing Checkbox + Btn ─────────────────────────────────

export const Example = {
  name: 'Example — confirmation',
  render: () => {
    const [open, setOpen] = useState(false);
    const [agreed, setAgreed] = useState(false);
    return (
      <>
        <Btn variant="primary" onClick={() => setOpen(true)}>Install application</Btn>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="small"
          title="Terms agreement"
          footer={
            <Btn variant="primary" disabled={!agreed} onClick={() => setOpen(false)}>Done</Btn>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#303030' }}>
              In order to install this application you must agree to the terms and services.
            </p>
            <Checkbox label="I agree" checked={agreed} onChange={setAgreed} />
          </div>
        </Modal>
      </>
    );
  },
};
