import { useState } from 'react';
import { Banner } from './Banner.jsx';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: { layout: 'padded' },
  argTypes: {
    tone:       { control: 'select', options: ['info', 'success', 'warning', 'critical'] },
    dismissable:{ control: 'boolean' },
  },
};

export const Info     = { args: { tone: 'info',     children: 'Your store will be live after you publish it.' } };
export const Success  = { args: { tone: 'success',  children: 'Changes saved successfully.' } };
export const Warning  = { args: { tone: 'warning',  children: 'Please review your store settings before publishing.' } };
export const Critical = { args: { tone: 'critical', children: 'Something went wrong. Please try again.' } };

export const WithTitle = {
  args: {
    tone: 'warning',
    title: 'Before you archive this product',
    children: 'This will remove the product from all sales channels. Orders that include this product won\'t be affected.',
  },
};

export const WithActions = {
  args: {
    tone: 'info',
    children: 'A new version is available.',
    actions: [{ label: 'Update now', onClick: () => {} }],
  },
};

export const Dismissable = {
  args: { tone: 'success', children: 'Changes saved.', dismissable: true },
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [saved, setSaved] = useState(false);
    const [showWarning, setShowWarning] = useState(true);
    const [showInfo, setShowInfo] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 560, fontFamily: 'Inter, sans-serif' }}>
        {showInfo && (
          <Banner tone="info" dismissable onDismiss={() => setShowInfo(false)}>
            Firmware update available for 3 devices. Dismiss to hide.
          </Banner>
        )}
        {showWarning && (
          <Banner tone="warning" title="Temperature out of range" dismissable onDismiss={() => setShowWarning(false)} actions={[{ label: 'Review record', onClick: () => {} }]}>
            Fridge A recorded 9.2°C at 07:30, exceeding the 8°C threshold.
          </Banner>
        )}
        {saved ? (
          <Banner tone="success">Reading saved. View in the records list.</Banner>
        ) : (
          <Banner tone="critical" inCard actions={[{ label: 'Save reading', onClick: () => setSaved(true) }]}>
            No reading recorded today. Save one now.
          </Banner>
        )}
        {!showInfo && !showWarning && (
          <button
            onClick={() => { setShowInfo(true); setShowWarning(true); setSaved(false); }}
            style={{ alignSelf: 'flex-start', padding: '8px 16px', background: 'none', border: '1px solid #c9c9c9', borderRadius: 8, fontSize: 13, fontFamily: 'Inter, sans-serif', cursor: 'pointer', color: '#303030' }}
          >
            Reset banners
          </button>
        )}
      </div>
    );
  },
};

export const AllTones = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 500 }}>
      <Banner tone="info">This is an info banner.</Banner>
      <Banner tone="success">This is a success banner.</Banner>
      <Banner tone="warning">This is a warning banner.</Banner>
      <Banner tone="critical">This is a critical banner.</Banner>
    </div>
  ),
};

export const InCard = {
  name: 'In-card (compact)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 480, fontFamily: 'Inter, sans-serif' }}>
      <Banner tone="info" inCard>Your session expires in 10 minutes.</Banner>
      <Banner tone="success" inCard>Reading saved successfully.</Banner>
      <Banner tone="warning" inCard>This value is outside the expected range.</Banner>
      <Banner tone="critical" inCard>Unable to save. Please correct the highlighted fields.</Banner>
      <Banner tone="info" inCard dismissable>Dismissable in-card banner example.</Banner>
      <Banner tone="warning" inCard actions={[{ label: 'Review', onClick: () => {} }]}>Action button inside in-card variant.</Banner>
    </div>
  ),
};

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 560, fontFamily: 'Inter, sans-serif' }}>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Simple — all tones</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner tone="info">Your session expires in 10 minutes.</Banner>
          <Banner tone="success">Reading saved successfully.</Banner>
          <Banner tone="warning">This value is outside the expected range.</Banner>
          <Banner tone="critical">Unable to save. Please correct the highlighted fields.</Banner>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Simple — dismissable</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner tone="success" dismissable>Changes saved successfully.</Banner>
          <Banner tone="info" dismissable>A new firmware update is available for your device.</Banner>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Titled — with actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner tone="warning" title="Before you archive this record" actions={[{ label: 'Review fields', onClick: () => {} }]}>
            This will remove the record from all active reports. Data already exported won't be affected.
          </Banner>
          <Banner tone="critical" title="Unable to save reading" actions={[{ label: 'Review fields', onClick: () => {} }]}>
            The temperature value is required. Please enter a valid reading before submitting.
          </Banner>
          <Banner tone="info" title="New firmware available" dismissable actions={[{ label: 'Update now', onClick: () => {} }, { label: 'Remind me later', onClick: () => {} }]}>
            Version 3.2.1 improves Bluetooth stability and temperature accuracy.
          </Banner>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>In-card — compact tinted</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner tone="info" inCard>Your session expires in 10 minutes.</Banner>
          <Banner tone="success" inCard>Reading saved successfully.</Banner>
          <Banner tone="warning" inCard>This value is outside the expected range.</Banner>
          <Banner tone="critical" inCard>Unable to save. Please correct the highlighted fields.</Banner>
          <Banner tone="info" inCard dismissable>Dismissable in-card example.</Banner>
          <Banner tone="warning" inCard actions={[{ label: 'Review', onClick: () => {} }]}>Action button in compact variant.</Banner>
        </div>
      </div>

    </div>
  ),
};
