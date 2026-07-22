// ── Top-bar panels — Navigate ColdTrace · Notifications · Account menu ────────
// The three interactive top-bar icons (after the static Kenya country pill):
//   • apps grid  → NavigateColdtraceModal   (jump to any of the 9 modules)
//   • bell       → NotificationsModal        (All Notifications / What's New)
//   • avatar     → AccountMenu               (anchored popover)
// Pure composition — Modal, Popover, NavCard, Tabs, Tag, Illustration hub.

import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal.jsx';
import { Popover } from '../../components/Popover/Popover.jsx';
import { NavCard } from '../../components/NavCard/NavCard.jsx';
import { Tabs } from '../../components/Tabs/Tabs.jsx';
import { Tag } from '../../components/Tag/Tag.jsx';
import { Illustration } from '../../foundation/illustrations/index.jsx';
import { MODULES } from '../../foundation/moduleNavs.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '../../tokens/index.js';

// ─── 1) Navigate ColdTrace — the 9-module grid (apps icon) ────────────────────
// Figma order differs from the home tiles; map by id.
const NAV_ORDER = ['inventory', 'temperature', 'reports', 'service', 'forecasting', 'facilities', 'learning', 'transport', 'events'];
const MODULE_ILLO = {
  inventory: 'equipment-management', temperature: 'monitoring', reports: 'reports-hub',
  service: 'health-tech-hub', forecasting: 'forecasting', facilities: 'facility-management',
  learning: 'training', transport: 'coldtrace-transport', events: 'events',
};

export function NavigateColdtraceModal({ open, onClose, onOpenModule }) {
  const byId = Object.fromEntries(MODULES.map((m) => [m.id, m]));
  return (
    <Modal open={open} onClose={onClose} title="Navigate ColdTrace" maxWidth={560}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        {NAV_ORDER.map((id) => (
          <NavCard
            key={id}
            layout="home"
            hasButton={false}
            title={byId[id]?.title}
            media={<Illustration name={MODULE_ILLO[id]} size={56} />}
            onClick={() => { onOpenModule(id); onClose(); }}
            ariaLabel={byId[id]?.title}
          />
        ))}
      </div>
    </Modal>
  );
}

// ─── 2) Notifications — All / What's New (bell icon) ──────────────────────────
const IcoBell = ({ size = 18, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 2.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2-1 4.4-1.5 5 .5.5 2 1 6 1s5.5-.5 6-1c-.5-.6-1.5-1.8-1.5-5A4.5 4.5 0 0 0 10 2.5Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8.5 16a1.5 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IcoChevron = ({ size = 18, color = '#8a8a8a' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M7.5 5l5 5-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ALL_NOTIFICATIONS = [
  { group: 'Today', items: [
    { id: 'a1', title: 'New Comment on Your Report', body: 'John Doe commented on the February Performance Report: “Can we include more breakdowns by region?”', time: 'Just now' },
    { id: 'a2', title: 'Monthly Compliance Report Generated', body: 'Review key insights on storage performance and incidents.', time: '1 minute ago' },
    { id: 'a3', title: 'System Downtime Alert', body: 'The Nexleaf dashboard will be temporarily unavailable for upgrades on March 20.', time: '9 minutes ago' },
    { id: 'a4', title: 'System Downtime Alert', body: 'The Nexleaf dashboard will be temporarily unavailable for upgrades on March 20.', time: '9 minutes ago' },
    { id: 'a5', title: 'System Downtime Alert', body: 'The Nexleaf dashboard will be temporarily unavailable for upgrades on March 20.', time: '9 minutes ago' },
    { id: 'a6', title: 'Escalated Temperature Excursion', body: 'Incubator HC 1501-2023-001 exceeded threshold for over 30 minutes.', time: '14 minutes ago' },
  ] },
];

// tag tone per What's New category
const WN_TONE = { Feature: 'success', Improvements: 'info', 'Bug fix': 'default' };
const IcoDoc = ({ c = '#616161' }) => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="5" y="3" width="10" height="14" rx="2" stroke={c} strokeWidth="1.4"/><path d="M7.5 7h5M7.5 10h5M7.5 13h3" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>);
const IcoTrend = ({ c = '#616161' }) => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 13l4-4 3 3 5-6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 6h3v3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IcoBug = ({ c = '#616161' }) => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="6" y="7" width="8" height="8" rx="4" stroke={c} strokeWidth="1.4"/><path d="M10 5v2M4 10h2M14 10h2M5 6l1.5 1.5M15 6l-1.5 1.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>);
const WN_ICON = { Feature: IcoDoc, Improvements: IcoTrend, 'Bug fix': IcoBug };

const WHATS_NEW = [
  { group: 'Today',       items: [{ id: 'w1', cat: 'Feature' }, { id: 'w2', cat: 'Improvements' }, { id: 'w3', cat: 'Bug fix' }] },
  { group: 'Yesterday',   items: [{ id: 'w4', cat: 'Improvements' }, { id: 'w5', cat: 'Bug fix' }] },
  { group: '1 week ago',  items: [{ id: 'w6', cat: 'Feature' }] },
  { group: '1 month ago', items: [{ id: 'w7', cat: 'Feature' }, { id: 'w8', cat: 'Bug fix' }] },
  { group: 'Jan 22, 2025', items: [{ id: 'w9', cat: 'Improvements' }, { id: 'w10', cat: 'Bug fix' }] },
];

function GroupLabel({ children }) {
  return <div style={{ fontSize: 12, fontWeight: 550, color: TEXT_SUBDUED, padding: '12px 4px 6px' }}>{children}</div>;
}

function AllNotificationRow({ n }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, border: '1px solid #ebebeb', borderRadius: 8, background: '#fff', cursor: 'pointer' }}>
      <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcoBell /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, lineHeight: '20px', color: TEXT_DEFAULT }}>
          <span style={{ fontWeight: 650 }}>{n.title}</span>
          <span style={{ color: TEXT_SUBDUED }}> — {n.body}</span>
        </div>
        <div style={{ fontSize: 12, color: TEXT_SUBDUED, marginTop: 4 }}>{n.time}</div>
      </div>
      <IcoChevron />
    </div>
  );
}

function WhatsNewRow({ n, i }) {
  const Icon = WN_ICON[n.cat] || IcoDoc;
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, border: '1px solid #ebebeb', borderRadius: 8, background: '#fff' }}>
      <span style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 650, color: TEXT_DEFAULT }}>{`Whats new ${i}`}</div>
        <div style={{ fontSize: 13, color: TEXT_SUBDUED }}>Short description goes here</div>
      </div>
      <Tag tone={WN_TONE[n.cat]}>{n.cat}</Tag>
    </div>
  );
}

export function NotificationsModal({ open, onClose }) {
  const [tab, setTab] = useState(0);
  const allCount = ALL_NOTIFICATIONS.reduce((s, g) => s + g.items.length, 0);
  const wnCount = WHATS_NEW.reduce((s, g) => s + g.items.length, 0);
  let wnIndex = 0;
  return (
    <Modal open={open} onClose={onClose} title="Notifications" maxWidth={660}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Tabs
          tabs={[{ id: 'all', label: 'All Notifications', badge: allCount }, { id: 'new', label: "What's New", badge: wnCount }]}
          activeIndex={tab}
          onSelect={(_id, _item, i) => setTab(i)}
        />
        <div style={{ maxHeight: '56vh', overflowY: 'auto', paddingRight: 4 }}>
          {tab === 0
            ? ALL_NOTIFICATIONS.map((g) => (
                <div key={g.group}>
                  <GroupLabel>{g.group}</GroupLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {g.items.map((n) => <AllNotificationRow key={n.id} n={n} />)}
                  </div>
                </div>
              ))
            : WHATS_NEW.map((g) => (
                <div key={g.group}>
                  <GroupLabel>{g.group}</GroupLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {g.items.map((n) => <WhatsNewRow key={n.id} n={n} i={++wnIndex} />)}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Modal>
  );
}

// ─── 3) Account menu — anchored popover (avatar) ──────────────────────────────
const IcoPerson = ({ c = '#303030' }) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.5" r="3" stroke={c} strokeWidth="1.5"/><path d="M4.5 16.5a5.5 5.5 0 0 1 11 0" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>);
const IcoUsers = ({ c = '#303030' }) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7.5" cy="7" r="2.4" stroke={c} strokeWidth="1.4"/><circle cx="14" cy="8" r="1.9" stroke={c} strokeWidth="1.4"/><path d="M3 15.5a4.5 4.5 0 0 1 9 0M12.5 15.5a3.6 3.6 0 0 1 4.5-.4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>);
const IcoWhatsapp = ({ c = '#fff' }) => (<span style={{ width: 20, height: 20, borderRadius: 6, background: '#303030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 3a7 7 0 0 0-6 10.5L3 17l3.7-1a7 7 0 1 0 3.3-13Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M7.5 8c0 2.5 2 4.5 4.5 4.5.6 0 1-.6.7-1.1l-.8-1-.9.4c-.6-.3-1.1-.8-1.4-1.4l.4-.9-1-.8C7.9 7.4 7.5 7.6 7.5 8Z" fill={c}/></svg></span>);
const IcoService = ({ c = '#fff' }) => (<span style={{ width: 20, height: 20, borderRadius: 6, background: '#303030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="9" rx="2" stroke={c} strokeWidth="1.5"/><path d="M6.5 10.5h1M12.5 10.5h1M9.5 9.5v2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg></span>);
const IcoLogout = ({ c = '#303030' }) => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M12 7l3 3-3 3M15 10H8" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);

const ACCOUNT_ITEMS = [
  { id: 'account', icon: IcoPerson, title: 'My Account', desc: 'Profile overview, Update Details & Password' },
  { id: 'users', icon: IcoUsers, title: 'Manage users' },
  { id: 'whatsapp', icon: IcoWhatsapp, title: 'Chat with us on Whatsapp' },
  { id: 'service', icon: IcoService, title: 'Request help on Service Desk' },
  { id: 'logout', icon: IcoLogout, title: 'Log out' },
];

export function AccountMenu({ open, onClose, anchorRef, onSelect }) {
  const [hov, setHov] = useState(null);
  return (
    <Popover open={open} onClose={onClose} anchorRef={anchorRef} placement="bottom-end" role="menu" ariaLabel="Account menu">
      <div style={{ width: 320, padding: 8, fontFamily: 'Inter, sans-serif' }}>
        {ACCOUNT_ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.id}
              role="menuitem"
              tabIndex={0}
              onClick={() => { onSelect?.(it.id); onClose(); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(it.id); onClose(); } }}
              onMouseEnter={() => setHov(it.id)}
              onMouseLeave={() => setHov(null)}
              style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 8, cursor: 'pointer', background: hov === it.id ? '#f1f1f1' : 'transparent', outline: 'none' }}
            >
              <span style={{ flexShrink: 0, marginTop: 1 }}><Icon /></span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 550, color: TEXT_DEFAULT, lineHeight: '20px' }}>{it.title}</div>
                {it.desc && <div style={{ fontSize: 13, color: TEXT_SUBDUED, lineHeight: '18px' }}>{it.desc}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </Popover>
  );
}
