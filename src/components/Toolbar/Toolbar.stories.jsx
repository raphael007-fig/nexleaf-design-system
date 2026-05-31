import { useState } from 'react';
import {
  Toolbar,
  ToolbarAiChatButton,
  ToolbarAskAiButton,
  ToolbarRegionSelector,
  ToolbarIconButton,
  ToolbarMenuButton,
  ToolbarAvatar,
  AiChatPanel,
  NexleafLogo,
  NexleafBrandLogo,
} from './Toolbar.jsx';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import { COUNTRIES } from '../../foundation/emojis/emojiCatalog.js';

export default {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
};

// Shared Home crumb — icon-only, identical to the standalone Breadcrumbs
// stories. Keeps the Toolbar demos in sync with the project-wide pattern.
const HOME_CRUMB = {
  id: 'home',
  label: 'Home',
  icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />,
  iconOnly: true,
};

// ── Action icons — Polaris icon registry (no custom SVG paths) ───────────
const IcoGrid = ({ size = 20, color = '#303030' }) => (
  <PolarisIconImg name="AppsIcon" size={size} color={color} />
);
const IcoBell = ({ size = 20, color = '#303030' }) => (
  <PolarisIconImg name="NotificationIcon" size={size} color={color} />
);

const IcoTranslate = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M2.5 5h7M5.5 3v2M4 5c0 3 2.5 5.5 5.5 5.5M9.5 5c0 2-3.5 5-7 5.5"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 17l3-7 3 7M11.5 15h4"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SAMPLE_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces';

const PAGE = {
  background: '#f1f1f1',
  minHeight: 360,
  fontFamily: 'Inter, sans-serif',
};

// ── Stub AI chat panel content ───────────────────────────────────────────
function ChatPanelBody() {
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about your equipment, alarms, or reports.' },
  ]);
  const [draft, setDraft] = useState('');

  function send() {
    if (!draft.trim()) return;
    const text = draft.trim();
    setMsgs((m) => [...m, { from: 'user', text }]);
    setDraft('');
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', text: 'Thanks — I\'ll look into that. (This is a stub reply.)' }]);
    }, 500);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: m.from === 'user' ? '#005bd3' : '#f1f1f1',
            color: m.from === 'user' ? '#ffffff' : '#303030',
            padding: '8px 12px', borderRadius: 12,
            fontSize: 14, lineHeight: '20px',
          }}>{m.text}</div>
        ))}
      </div>
      <div style={{
        display: 'flex', gap: 8, padding: 12,
        borderTop: '1px solid #ebebeb', background: '#ffffff',
      }}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="Ask the AI Chat Bot…"
          style={{
            flex: 1, padding: '8px 12px',
            border: '1px solid #e0e0e0', borderRadius: 8,
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={send}
          style={{
            padding: '8px 14px', background: '#303030', color: '#ffffff',
            border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >Send</button>
      </div>
    </div>
  );
}

// ── Stories ──────────────────────────────────────────────────────────────

// ── Side-nav shell (the new app chrome) ──────────────────────────────────
//
// Matches the latest Figma frame (7221:209011). The toolbar leaves a 240 px
// empty slot at the left where the docked Side Navigation visually sits. The
// brand logo has moved into the side nav, so the toolbar's start slot now
// hosts a Breadcrumbs trail directly. The breadcrumb uses the same icon-only
// Home pattern shared by every other story.
//
// In a real app shell you'd render `<SideNavigation />` and `<Toolbar
// sideNavWidth={240} />` as siblings — both with `background: #f1f1f1` so the
// two surfaces blend into one chrome.

export const SideNavShell = {
  name: 'Side-nav shell (matches latest spec)',
  render: () => {
    const TRAIL = [
      HOME_CRUMB,
      { label: 'Equipment Management' },
      { label: 'ColdChain Equipment' },
      { label: 'View Equipment Details' },
      { label: 'Equipment Details' },
    ];
    const [trail, setTrail] = useState(TRAIL);
    const [chatOpen, setChatOpen] = useState(false);

    return (
      // Render at the 1440 px design width with horizontal scroll if the
      // Storybook canvas is narrower. Without this, the breadcrumb's last
      // "Equipment Details" pill gets clipped because the start cell has
      // less than ~370 px to host the four visible nodes (Home, EM, …,
      // current pill). Real app shells are always at least 1280 px wide so
      // this is closer to the production rendering than the stripped-down
      // canvas default.
      <div style={{ ...PAGE, overflowX: 'auto' }}>
        <div style={{ minWidth: 1440 }}>
          <Toolbar
            // Reserves a 240 px transparent slot at the left. The real Side
            // Navigation would dock here as a sibling at the same width; the
            // matching `#f1f1f1` background makes the seam invisible.
            sideNavWidth={240}
            start={(
              <Breadcrumbs
                items={trail}
                onSelect={(_id, _item, i) => setTrail(trail.slice(0, i + 1))}
              />
            )}
            center={(
              <ToolbarAiChatButton
                label="AI Chat Bot"
                beta
                trailingIcon={<IcoTranslate />}
                trailingAriaLabel="Translate"
                onTrailingClick={() => {}}
                onClick={() => setChatOpen(true)}
                active={chatOpen}
              />
            )}
            end={(
              <>
                <ToolbarRegionSelector countryCode="KE" value="Kenya" />
                <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={() => {}} />
                <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={() => {}} />
                <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" onClick={() => {}} />
              </>
            )}
          />

          <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
            <ChatPanelBody />
          </AiChatPanel>

          <div style={{ padding: 24, color: '#616161', fontSize: 13, paddingLeft: 240 + 24 }}>
            The 240 px gap on the left is where the docked <strong>Side Navigation</strong> sits.
            Click any crumb to truncate the trail; the breadcrumb collapses to a “…”
            when more than three levels deep, matching the project pattern.
          </div>
        </div>
      </div>
    );
  },
};

// ── Admin variant: same shell, but the region selector picks ─────────────
//
// Most users see a read-only country pill (flag + name, no chevron). Operators
// with permissions across multiple countries get the chevron + an OptionList
// of countries sourced from `foundation/emojis/emojiCatalog`. Picking a
// country fires `onCountryChange` and updates the pill in-place.

export const SideNavShellAdmin = {
  name: 'Side-nav shell — admin region picker',
  render: () => {
    const TRAIL = [
      HOME_CRUMB,
      { label: 'Equipment Management' },
      { label: 'ColdChain Equipment' },
      { label: 'View Equipment Details' },
      { label: 'Equipment Details' },
    ];
    const [trail, setTrail] = useState(TRAIL);
    const [chatOpen, setChatOpen] = useState(false);
    // Country is local state so the pill reflects whatever the picker selects.
    // In a real app this would live in a session / user store.
    const [country, setCountry] = useState(
      COUNTRIES.find((c) => c.code === 'KE') || COUNTRIES[0],
    );

    return (
      <div style={{ ...PAGE, overflowX: 'auto' }}>
        <div style={{ minWidth: 1440 }}>
          <Toolbar
            sideNavWidth={240}
            start={(
              <Breadcrumbs
                items={trail}
                onSelect={(_id, _item, i) => setTrail(trail.slice(0, i + 1))}
              />
            )}
            center={(
              <ToolbarAiChatButton
                label="AI Chat Bot"
                beta
                trailingIcon={<IcoTranslate />}
                trailingAriaLabel="Translate"
                onTrailingClick={() => {}}
                onClick={() => setChatOpen(true)}
                active={chatOpen}
              />
            )}
            end={(
              <>
                <ToolbarRegionSelector
                  pickable
                  countries={COUNTRIES}
                  countryCode={country.code}
                  value={country.name}
                  onCountryChange={(_code, entry) => entry && setCountry(entry)}
                />
                <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={() => {}} />
                <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={() => {}} />
                <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" onClick={() => {}} />
              </>
            )}
          />

          <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
            <ChatPanelBody />
          </AiChatPanel>

          <div style={{ padding: 24, color: '#616161', fontSize: 13, paddingLeft: 240 + 24, maxWidth: 720 }}>
            <strong>Admin view.</strong> Click the country pill on the right to open the picker — the list is sourced from <code>foundation/emojis/emojiCatalog</code> so the same flag glyphs render in both surfaces. Normal-user pills don't carry the chevron and the menu doesn't open on click.
          </div>
        </div>
      </div>
    );
  },
};

export const FullToolbar = {
  name: 'Full toolbar (matches spec)',
  render: () => {
    const TRAIL = [
      HOME_CRUMB,
      { label: 'Equipment Management' },
      { label: 'ColdChain Equipment' },
    ];
    const [trail, setTrail] = useState(TRAIL);
    const [chatOpen, setChatOpen] = useState(false);

    return (
      <div style={PAGE}>
        <Toolbar
          start={(
            <>
              <NexleafLogo size={32} />
              <Breadcrumbs items={trail} onSelect={(_id, _item, i) => setTrail(trail.slice(0, i + 1))} />
            </>
          )}
          center={(
            <ToolbarAiChatButton
              label="AI Chat Bot"
              beta
              trailingIcon={<IcoTranslate />}
              trailingAriaLabel="Translate"
              onTrailingClick={() => {}}
              onClick={() => setChatOpen(true)}
              active={chatOpen}
            />
          )}
          end={(
            <>
              <ToolbarRegionSelector countryCode="KE" value="Kenya" />
              <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={() => {}} />
              <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={() => {}} />
              <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" onClick={() => {}} />
            </>
          )}
        />

        <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
          <ChatPanelBody />
        </AiChatPanel>

        <div style={{ padding: 24, color: '#616161', fontSize: 13 }}>
          Click the centered <strong>AI Chat Bot (beta)</strong> button to open the chat panel on the right.
        </div>
      </div>
    );
  },
};

// ── Mobile responsive ────────────────────────────────────────────────────
//
// Compact layout: brand leaf logo · "Ask AI" pill · hamburger menu.
// `mobile` on `<Toolbar>` tightens the padding/gap. Consumers wire
// the hamburger to their own drawer/menu UI.
//
export const Mobile = {
  name: 'Mobile responsive (≤ 480px)',
  render: () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <div style={{ ...PAGE, padding: 16 }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <Toolbar
            mobile
            start={<NexleafBrandLogo size={32} />}
            center={(
              <ToolbarAskAiButton
                label="Ask AI"
                onClick={() => setChatOpen(true)}
                active={chatOpen}
              />
            )}
            end={(
              <ToolbarMenuButton
                onClick={() => setMenuOpen((o) => !o)}
                expanded={menuOpen}
              />
            )}
          />

          <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)} title="Ask AI">
            <ChatPanelBody />
          </AiChatPanel>

          <div style={{ marginTop: 24, color: '#616161', fontSize: 13, lineHeight: '20px' }}>
            <strong>Mobile composition:</strong>
            <ul style={{ paddingLeft: 18, marginTop: 8 }}>
              <li><code>NexleafBrandLogo</code> — brand mark (leaf + phone)</li>
              <li><code>ToolbarAskAiButton</code> — compact "Ask AI" pill, opens <code>AiChatPanel</code></li>
              <li><code>ToolbarMenuButton</code> — hamburger menu; wires up to your drawer</li>
            </ul>
            <p>Hamburger is currently <strong>{menuOpen ? 'expanded' : 'collapsed'}</strong>.</p>
          </div>
        </div>
      </div>
    );
  },
};

export const MinimalToolbar = {
  name: 'Minimal — logo + breadcrumbs + avatar',
  render: () => {
    const [trail, setTrail] = useState([
      HOME_CRUMB, { label: 'Settings' },
    ]);
    return (
      <div style={PAGE}>
        <Toolbar
          start={(
            <>
              <NexleafLogo size={32} />
              <Breadcrumbs items={trail} onSelect={(_id, _item, i) => setTrail(trail.slice(0, i + 1))} />
            </>
          )}
          end={<ToolbarAvatar initials="RO" />}
        />
      </div>
    );
  },
};

export const ChatPanelOpenByDefault = {
  name: 'AI Chat panel — open by default',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={PAGE}>
        <Toolbar
          start={<NexleafLogo size={32} />}
          center={(
            <ToolbarAiChatButton
              onClick={() => setOpen((o) => !o)}
              active={open}
              trailingIcon={<IcoTranslate />}
              onTrailingClick={() => {}}
            />
          )}
          end={<ToolbarAvatar initials="RO" />}
        />
        <AiChatPanel open={open} onClose={() => setOpen(false)}>
          <ChatPanelBody />
        </AiChatPanel>
      </div>
    );
  },
};

export const WithNotificationBadge = {
  name: 'Icon button — with notification badge',
  render: () => (
    <div style={PAGE}>
      <Toolbar
        start={<NexleafLogo size={32} />}
        end={(
          <>
            <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={() => {}} />
            <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" badge={3} onClick={() => {}} />
            <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" />
          </>
        )}
      />
    </div>
  ),
};

export const StickyOnScroll = {
  name: 'Sticky toolbar (scroll the page)',
  render: () => {
    const [chatOpen, setChatOpen] = useState(false);
    return (
      <div style={{ ...PAGE, minHeight: 800 }}>
        <Toolbar
          sticky
          elevated
          start={(
            <>
              <NexleafLogo size={32} />
              <Breadcrumbs
                items={[HOME_CRUMB, { label: 'Reports' }, { label: 'Q3' }]}
                onSelect={() => {}}
              />
            </>
          )}
          center={(
            <ToolbarAiChatButton
              trailingIcon={<IcoTranslate />}
              onTrailingClick={() => {}}
              onClick={() => setChatOpen(true)}
              active={chatOpen}
            />
          )}
          end={(
            <>
              <ToolbarRegionSelector countryCode="KE" value="Kenya" />
              <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" />
            </>
          )}
        />
        <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
          <ChatPanelBody />
        </AiChatPanel>
        <div style={{ padding: 24, color: '#616161', fontSize: 13 }}>
          Scroll the page — toolbar stays pinned to the top.
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>Scrollable content line {i + 1}</p>
          ))}
        </div>
      </div>
    );
  },
};

export const Loading = {
  name: 'Loading skeleton',
  render: () => (
    <div style={PAGE}>
      <Toolbar loading />
      <div style={{ padding: 24, color: '#616161', fontSize: 13 }}>
        While <code>loading</code> is <code>true</code>, the toolbar renders
        its three-region layout with skeleton blocks in place of the real
        interactive children. Set <code>loading={'{false}'}</code> when the
        data arrives.
      </div>
    </div>
  ),
};

export const LoadingMobile = {
  name: 'Loading skeleton — mobile',
  render: () => (
    <div style={{ ...PAGE, padding: 16 }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <Toolbar loading mobile />
      </div>
    </div>
  ),
};

export const InteractionStates = {
  name: 'Interaction states reference',
  render: () => (
    <div style={{ ...PAGE, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toolbar
        start={<NexleafLogo size={32} />}
        center={(
          <ToolbarAiChatButton
            trailingIcon={<IcoTranslate />}
            onTrailingClick={() => {}}
            onClick={() => {}}
          />
        )}
        end={(
          <>
            <ToolbarRegionSelector countryCode="KE" value="Kenya" />
            <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={() => {}} />
            <ToolbarAvatar initials="RO" />
          </>
        )}
      />

      <Toolbar
        elevated
        start={<NexleafLogo size={32} />}
        center={(
          <ToolbarAiChatButton
            active
            trailingIcon={<IcoTranslate />}
            onTrailingClick={() => {}}
            onClick={() => {}}
          />
        )}
        end={<ToolbarAvatar initials="RO" />}
      />

      <Toolbar
        start={<NexleafLogo size={32} />}
        center={<ToolbarAiChatButton disabled trailingIcon={<IcoTranslate />} />}
        end={(
          <>
            <ToolbarRegionSelector countryCode="KE" value="Kenya" disabled />
            <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" disabled />
            <ToolbarAvatar initials="RO" />
          </>
        )}
      />
    </div>
  ),
};
