import { useState } from 'react';
import { MetricCard } from './MetricCard.jsx';

export default {
  title: 'Components/MetricCard',
  component: MetricCard,
  parameters: { layout: 'padded' },
};

// ─── AllStates — static snapshot ─────────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>

      {/* Rest */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Rest</p>
        <MetricCard
          title="Total Installations"
          metric="247"
          badge={{ label: '0 High Priority', tone: 'info' }}
          infoTooltip="Total devices with an active installation record"
        />
      </div>

      {/* Hover — simulated via hovered prop not available statically, so show note */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Hover (interactive — see Interaction States)</p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 12,
          background: '#f7f7f7',
          boxShadow: '0 1px 0 rgba(26,26,26,0.07), inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: '#616161', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}>Total Installations</span>
            <svg width={20} height={20} viewBox="0 0 20 20" fill="#9e9e9e"><path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" /><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" /><path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" /></svg>
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#303030', lineHeight: '40px', letterSpacing: '-0.3px', fontFamily: 'Inter, sans-serif' }}>247</span>
          <div style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', height: 20, padding: '2px 8px', borderRadius: 8, background: '#e0f0ff' }}>
            <span style={{ fontSize: 12, fontWeight: 550, color: '#00527c', lineHeight: '16px', fontFamily: 'Inter, sans-serif' }}>0 High Priority</span>
          </div>
        </div>
      </div>

      {/* Active / Pressed */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Active / Pressed</p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 12,
          background: '#f3f3f3',
          boxShadow: 'inset -1px 0 1px rgba(26,26,26,0.12), inset 1px 0 1px rgba(26,26,26,0.12), inset 0 2px 1px rgba(26,26,26,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: '#616161', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}>Total Installations</span>
            <svg width={20} height={20} viewBox="0 0 20 20" fill="#9e9e9e"><path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" /><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" /><path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" /></svg>
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#303030', lineHeight: '40px', letterSpacing: '-0.3px', fontFamily: 'Inter, sans-serif' }}>247</span>
          <div style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', height: 20, padding: '2px 8px', borderRadius: 8, background: '#e0f0ff' }}>
            <span style={{ fontSize: 12, fontWeight: 550, color: '#00527c', lineHeight: '16px', fontFamily: 'Inter, sans-serif' }}>0 High Priority</span>
          </div>
        </div>
      </div>

      {/* Selected */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Selected</p>
        <MetricCard
          title="Total Installations"
          metric="247"
          badge={{ label: '0 High Priority', tone: 'info' }}
          selected
          onClick={() => {}}
        />
      </div>

      {/* Focus */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Focus</p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 12,
          background: '#ffffff',
          boxShadow: '0 0 0 2px #005bd3, inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 650, color: '#616161', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}>Total Installations</span>
            <svg width={20} height={20} viewBox="0 0 20 20" fill="#9e9e9e"><path d="M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z" /><path d="M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" /><path fillRule="evenodd" d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" /></svg>
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: '#303030', lineHeight: '40px', letterSpacing: '-0.3px', fontFamily: 'Inter, sans-serif' }}>247</span>
          <div style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', height: 20, padding: '2px 8px', borderRadius: 8, background: '#e0f0ff' }}>
            <span style={{ fontSize: 12, fontWeight: 550, color: '#00527c', lineHeight: '16px', fontFamily: 'Inter, sans-serif' }}>0 High Priority</span>
          </div>
        </div>
      </div>

      {/* Disabled */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Disabled</p>
        <MetricCard
          title="Total Installations"
          metric="0"
          badge={{ label: '0 High Priority', tone: 'neutral' }}
          disabled
        />
      </div>

      {/* Loading */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Loading</p>
        <MetricCard loading />
      </div>

    </div>
  ),
};

// ─── InteractionStates — filter behavior ─────────────────────────────────────

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [selected, setSelected] = useState(null);

    const CARDS = [
      { id: 'total',    title: 'Total Installations', metric: '247', badge: { label: '3 Critical',      tone: 'critical'  }, infoTooltip: 'Total devices with an active installation record' },
      { id: 'offline',  title: 'Devices Offline',     metric: '12',  badge: { label: '12 Offline',      tone: 'attention' }, infoTooltip: 'Devices that have not reported in over 24 hours' },
      { id: 'alerts',   title: 'Active Alerts',       metric: '5',   badge: { label: '2 High Priority', tone: 'critical'  }, infoTooltip: 'Open alerts requiring immediate attention' },
      { id: 'requests', title: 'Service Requests',    metric: '23',  badge: { label: '8 Pending',       tone: 'info'      }, infoTooltip: 'Submitted service requests awaiting resolution' },
    ];

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 900 }}>
        <p style={{ fontSize: 13, color: '#616161', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Click a card to filter — only one can be active at a time.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {CARDS.map(card => (
            <MetricCard
              key={card.id}
              title={card.title}
              metric={card.metric}
              badge={card.badge}
              infoTooltip={card.infoTooltip}
              selected={selected === card.id}
              onClick={() => setSelected(prev => prev === card.id ? null : card.id)}
            />
          ))}
        </div>

        {selected && (
          <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 8, background: '#f0f7ff', fontSize: 13, color: '#00527c', fontFamily: 'Inter, sans-serif' }}>
            Filtering by: <strong>{CARDS.find(c => c.id === selected)?.title}</strong>
          </div>
        )}
      </div>
    );
  },
};

// ─── BadgeTones ───────────────────────────────────────────────────────────────

export const BadgeTones = {
  name: 'Badge tones',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 900, fontFamily: 'Inter, sans-serif' }}>
      <MetricCard title="Total Installations" metric="247" badge={{ label: '3 Info',          tone: 'info'      }} />
      <MetricCard title="Active Systems"       metric="231" badge={{ label: '231 Healthy',    tone: 'success'   }} />
      <MetricCard title="Devices Offline"      metric="12"  badge={{ label: '12 Offline',     tone: 'attention' }} />
      <MetricCard title="Active Alerts"        metric="5"   badge={{ label: '2 High Priority', tone: 'critical'  }} />
      <MetricCard title="Service Requests"     metric="23"  badge={{ label: '8 Pending',       tone: 'default'   }} />
      <MetricCard title="Unknown Devices"      metric="4"   badge={{ label: 'No data',         tone: 'default'   }} disabled />
    </div>
  ),
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading = {
  name: 'Loading skeleton',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 900 }}>
      <MetricCard loading />
      <MetricCard loading />
      <MetricCard loading />
      <MetricCard loading />
    </div>
  ),
};
