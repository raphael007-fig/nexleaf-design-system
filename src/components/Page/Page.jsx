import { useState } from 'react';
import { Btn } from '../Btn/Btn.jsx';
import { Badge } from '../Badge/Badge.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';

export function Page({
  title = 'Title',
  subtitle,
  backAction,
  metadata = [],
  primaryAction,
  secondaryActions = [],
  pagination,
  children,
}) {
  const [hovBack, setHovBack] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        paddingTop: 24, paddingBottom: 24 }}>
        {/* Left: back + title */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', flex: '1 0 0', minWidth: 0 }}>
          {backAction && (
            <button onClick={backAction.onAction}
              onMouseEnter={() => setHovBack(true)}
              onMouseLeave={() => setHovBack(false)}
              title="Back"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: 8, border: 'none',
                background: hovBack ? 'rgba(0,0,0,0.06)' : 'transparent',
                cursor: 'pointer', flexShrink: 0, padding: 4,
                transition: 'background 0.12s', outline: 'none' }}>
              <PolarisIconImg name="ArrowLeftIcon" size={20} color="#303030" />
            </button>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: backAction ? 2 : 0 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
              <span style={{ fontSize: 20, fontWeight: 650, letterSpacing: '-0.2px',
                lineHeight: '24px', color: '#303030', whiteSpace: 'nowrap',
                fontFamily: 'Inter,sans-serif' }}>
                {title}
              </span>
              {metadata.length > 0 && (
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {metadata.map((m, i) => (
                    <Badge key={i} tone={m.tone || 'default'}>{m.label}</Badge>
                  ))}
                </div>
              )}
            </div>
            {subtitle && (
              <span style={{ fontSize: 12, fontWeight: 450, color: '#616161',
                lineHeight: '16px', fontFamily: 'Inter,sans-serif' }}>
                {subtitle}
              </span>
            )}
          </div>
        </div>
        {/* Right: actions */}
        {(secondaryActions.length > 0 || primaryAction || pagination) && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            {secondaryActions.map((action, i) => (
              <Btn key={i} variant="secondary" size="medium" onClick={action.onAction} disclosure={action.disclosure}>
                {action.content}
              </Btn>
            ))}
            {primaryAction && (
              <Btn variant="primary" size="medium" onClick={primaryAction.onAction}>
                {primaryAction.content}
              </Btn>
            )}
            {pagination && <Pagination {...pagination} />}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
