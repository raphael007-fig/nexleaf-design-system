import { useState } from 'react';
import { Tooltip } from './Tooltip.jsx';
import { Btn } from '../Btn/Btn.jsx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};

// ─── AllStates — static snapshot ─────────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 80,
      padding: '60px 80px',
    }}>
      {/* Above */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#9e9e9e', fontFamily: 'Inter, sans-serif' }}>position="above"</span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Simulated visible tooltip for static story */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 'calc(100% + 6px)',
            zIndex: 1000,
            pointerEvents: 'none',
            filter: 'drop-shadow(0px 4px 6px rgba(26,26,26,0.2))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 8,
              padding: '4px 8px',
              boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 450, color: '#303030', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}>
                Create new view
              </span>
            </div>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ display: 'block', marginTop: -1 }}>
              <path d="M0 0 L8 10 L16 0 Z" fill="#ffffff" />
            </svg>
          </div>
          <Btn variant="secondary">Add view</Btn>
        </div>
      </div>

      {/* Below */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#9e9e9e', fontFamily: 'Inter, sans-serif' }}>position="below"</span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 'calc(100% + 6px)',
            zIndex: 1000,
            pointerEvents: 'none',
            filter: 'drop-shadow(0px 4px 6px rgba(26,26,26,0.2))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ display: 'block', marginBottom: -1 }}>
              <path d="M0 10 L8 0 L16 10 Z" fill="#ffffff" />
            </svg>
            <div style={{
              background: '#ffffff',
              borderRadius: 8,
              padding: '4px 8px',
              boxShadow: 'inset 1px 0 0 rgba(0,0,0,0.13), inset -1px 0 0 rgba(0,0,0,0.13), inset 0 -1px 0 rgba(0,0,0,0.17), inset 0 1px 0 rgba(204,204,204,0.5)',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 450, color: '#303030', lineHeight: '20px', fontFamily: 'Inter, sans-serif' }}>
                Create new view
              </span>
            </div>
          </div>
          <Btn variant="secondary">Add view</Btn>
        </div>
      </div>
    </div>
  ),
};

// ─── InteractionStates — hover to trigger ────────────────────────────────────

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: 48,
      alignItems: 'center',
      padding: '80px 60px',
    }}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#9e9e9e' }}>Hover each button</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Tooltip content="Create new view" position="above">
            <Btn variant="secondary">Above</Btn>
          </Tooltip>

          <Tooltip content="Create new view" position="below">
            <Btn variant="secondary">Below</Btn>
          </Tooltip>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#9e9e9e' }}>On icon button</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <Tooltip content="Filter records" position="above">
            <Btn variant="secondary" icon={
              <svg width="16" height="16" viewBox="0 0 20 20" fill="#303030">
                <path d="M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z" />
                <path d="M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
                <path d="M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
              </svg>
            }>Filter</Btn>
          </Tooltip>

          <Tooltip content="Adjust columns" position="above">
            <Btn variant="secondary" icon={
              <svg width="16" height="16" viewBox="0 0 20 20" fill="#303030">
                <path fillRule="evenodd" d="M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                <path fillRule="evenodd" d="M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            }>Columns</Btn>
          </Tooltip>

          <Tooltip content="Export data" position="above">
            <Btn variant="secondary">Export</Btn>
          </Tooltip>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#9e9e9e' }}>Longer label</span>
        <Tooltip content="Record morning and evening temperature readings" position="above">
          <Btn variant="primary">How to record</Btn>
        </Tooltip>
      </div>

    </div>
  ),
};
