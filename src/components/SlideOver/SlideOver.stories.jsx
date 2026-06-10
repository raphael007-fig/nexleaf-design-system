import { useState } from 'react';
import { SlideOver } from './SlideOver.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { Badge } from '../Badge/Badge.jsx';

export default {
  title: 'Components/Overlays/SlideOver',
  component: SlideOver,
  parameters: { layout: 'fullscreen' },
};

// A small slot stand-in so the body area is visible in the docs without wiring
// real content.
const Slot = ({ children, minHeight = 200 }) => (
  <div style={{
    border: '1px dashed #b3d9f7', background: '#eaf4ff', borderRadius: 8,
    padding: '16px', fontSize: 13, fontWeight: 450, color: '#00527c', textAlign: 'center',
    minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    {children || 'Slot — drop your content here'}
  </div>
);

// Reusable launcher: a trigger button that opens a SlideOver. Keeps each story
// to a single declarative call.
function SlideOverDemo({
  triggerLabel = 'Open panel',
  title = 'Title',
  titleAccessory,
  actions,
  footer,
  width,
  showCloseButton = true,
  body,
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="secondary" onClick={() => setOpen(true)}>{triggerLabel}</Btn>
      <SlideOver
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        titleAccessory={titleAccessory}
        actions={actions}
        footer={footer}
        width={width}
        showCloseButton={showCloseButton}
      >
        {body || <Slot />}
      </SlideOver>
    </>
  );
}

// ─── Default ────────────────────────────────────────────────────────────────────

export const Default = {
  render: () => <SlideOverDemo triggerLabel="Open slide-over" title="Title" />,
};

// ─── With a title accessory (badge) ───────────────────────────────────────────

export const WithTitleAccessory = {
  name: 'With title accessory',
  render: () => (
    <SlideOverDemo
      triggerLabel="Open with badge"
      title="Action Required"
      titleAccessory={<Badge tone="critical">3 urgent issues</Badge>}
    />
  ),
};

// ─── With header actions ──────────────────────────────────────────────────────

export const WithActions = {
  name: 'With header actions',
  render: () => (
    <SlideOverDemo
      triggerLabel="Open with actions"
      title="Edit equipment"
      actions={<Btn variant="primary" small>Save</Btn>}
    />
  ),
};

// ─── With a footer action row ─────────────────────────────────────────────────

export const WithFooter = {
  name: 'With footer',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Btn variant="secondary" onClick={() => setOpen(true)}>Open with footer</Btn>
        <SlideOver
          open={open}
          onClose={() => setOpen(false)}
          title="Filters"
          footer={
            <>
              <Btn variant="secondary" onClick={() => setOpen(false)}>Clear</Btn>
              <Btn variant="primary" onClick={() => setOpen(false)}>Apply</Btn>
            </>
          }
        >
          <Slot>Filter controls go here</Slot>
        </SlideOver>
      </>
    );
  },
};

// ─── Widths — responsive ──────────────────────────────────────────────────────

export const Widths = {
  name: 'Widths (responsive)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', gap: 12, flexWrap: 'wrap', padding: 24 }}>
      <SlideOverDemo triggerLabel="Narrow — 400px" title="Narrow panel" width={400} />
      <SlideOverDemo triggerLabel="Default — 480px" title="Default panel" width={480} />
      <SlideOverDemo triggerLabel="Wide — 640px" title="Wide panel" width={640} />
    </div>
  ),
};

// ─── Placements — right / left / bottom ───────────────────────────────────────

function PlacementDemo({ placement, triggerLabel, title, dragHandle }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Btn variant="secondary" onClick={() => setOpen(true)}>{triggerLabel}</Btn>
      <SlideOver
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        title={title}
        dragHandle={dragHandle}
      >
        <Slot>
          {placement === 'bottom'
            ? 'Bottom placement backs the Bottom Sheet — drag the handle down or tap outside to close.'
            : placement === 'left'
              ? 'Left placement backs the Menu Drawer.'
              : 'Right placement is the Right Slider Modal.'}
        </Slot>
      </SlideOver>
    </>
  );
}

export const Placements = {
  name: 'Placements (right / left / bottom)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', gap: 12, flexWrap: 'wrap', padding: 24 }}>
      <PlacementDemo placement="right" triggerLabel="Right (default)" title="Right panel" />
      <PlacementDemo placement="left" triggerLabel="Left (drawer)" title="Left panel" />
      <PlacementDemo placement="bottom" triggerLabel="Bottom (sheet)" title="Bottom sheet" dragHandle />
    </div>
  ),
};

// ─── Realistic example — Action Required feed ─────────────────────────────────

const IcoChevronRight = ({ size = 16, color = '#9e9e9e' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoTemp = ({ color = '#616161' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.5 11.3V5a1.5 1.5 0 0 1 3 0v6.3a3 3 0 1 1-3 0Z" stroke={color} strokeWidth="1.4" />
    <circle cx="10" cy="13.5" r="1.4" fill={color} />
  </svg>
);

const IcoGear = ({ color = '#616161' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.2" stroke={color} strokeWidth="1.4" />
    <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5 5l1.4 1.4M13.6 13.6 15 15M15 5l-1.4 1.4M6.4 13.6 5 15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IcoBox = ({ color = '#616161' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3 4 6v8l6 3 6-3V6l-6-3ZM4 6l6 3 6-3M10 9v8" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

function IssueRow({ icon, title, meta, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
        padding: '12px 16px', background: '#ffffff', cursor: 'pointer',
        border: `1px solid ${hover ? '#005bd3' : '#e0e0e0'}`, borderRadius: 8,
        boxShadow: hover ? '0 0 0 1px rgba(0,91,211,0.12)' : 'none',
        fontFamily: 'Inter, sans-serif', transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 8, background: '#f3f3f3', flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 650, color: '#303030' }}>{title}</span>
        <span style={{ fontSize: 13, fontWeight: 450, color: '#616161' }}>{meta}</span>
      </span>
      <IcoChevronRight />
    </button>
  );
}

export const Example = {
  name: 'Example — Action Required',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <Btn variant="primary" onClick={() => setOpen(true)}>View action required</Btn>
        <SlideOver
          open={open}
          onClose={() => setOpen(false)}
          title="Action Required"
          titleAccessory={<Badge tone="critical">3 urgent issues</Badge>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              background: '#f3f3f3', borderRadius: 8, padding: '10px 12px',
              fontSize: 13, fontWeight: 450, color: '#616161',
            }}>
              This data has been collected within the last 24 hours.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <IssueRow
                icon={<IcoTemp />}
                title="Temperature exceeds threshold"
                meta="Incubator HC 1501-2023-001 | Main Laboratory"
                onClick={() => {}}
              />
              <IssueRow
                icon={<IcoGear />}
                title="Maintenance due"
                meta="Generator GEN-2023-005 | Power Room"
                onClick={() => {}}
              />
              <IssueRow
                icon={<IcoBox />}
                title="Low spare parts stock"
                meta="Oxygen Equipment | Storage Room"
                onClick={() => {}}
              />
            </div>

            <div style={{
              border: '1px solid #e0e0e0', borderRadius: 8, padding: 16,
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 650, color: '#303030' }}>
                  Learn how to troubleshoot devices
                </span>
                <span style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: '#616161' }}>
                  Training resources are available to help you diagnose and resolve issues with RTMD
                  devices that appear as Faulty or Unknown.
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Btn variant="secondary" small>Watch Video</Btn>
                <Btn variant="secondary" small>Download Troubleshooting PDF</Btn>
                <Btn variant="secondary" small>Request Service</Btn>
              </div>
            </div>
          </div>
        </SlideOver>
      </div>
    );
  },
};
