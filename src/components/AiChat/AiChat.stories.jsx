import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AiChatConversation, AiChatWelcome, AiChatMessage, AiChatResponse,
  AiChatTyping, AiChatSkeleton, AiChatComposer,
  AiChatHistoryCount, AiChatHistorySelectBar, AiChatHistoryCell, AiChatHistoryEmpty,
  AiChatSources, AiChatMediaCard, AiChatTable, AiChatToast, AiChatProgress,
  AiChatDeleteChatsDialog, AiChatRenameChatDialog,
  AiChatIcons,
} from './AiChat.jsx';
import { AiChatPanel, AiLogo, ToolbarAskAiButton } from '../Toolbar/Toolbar.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { StatusBadge } from '../Badge/Badge.jsx';

// Records behind "3 matching records across 2 facilities".
const RECORD_COLUMNS = [
  { key: 'equipment', label: 'Equipment' },
  { key: 'facility', label: 'Facility' },
  { key: 'status', label: 'Status' },
];

const matchingRecords = () => [
  { id: 'r1', equipment: 'Haier HBC-80', facility: 'Changamwe Dispensary', status: <StatusBadge status="pending" /> },
  { id: 'r2', equipment: 'Vestfrost MK 144', facility: 'Likoni Health Centre', status: <StatusBadge status="completed" /> },
  { id: 'r3', equipment: 'Dometic TCW 2000', facility: 'Likoni Health Centre', status: <StatusBadge status="pending" /> },
];

export default {
  title: 'Components/AiChat',
  component: AiChatConversation,
  parameters: { layout: 'padded' },
};

// Content from the Figma frames (AI-Chat-Bot).
const SUGGESTIONS = [
  { id: 'about', label: 'What can Nexleaf AI do', description: 'and how to get started' },
  { id: 'cce-count', label: 'How many CCEs do I have', description: 'Check my inventory' },
];

const FOLLOW_UPS = [
  { id: 'food', label: 'Can i store food or drinks in this fridge?' },
  { id: 'accessories', label: 'Are there any accessories or modifications available to expand the fridge’s functionality?' },
];

const CHAT_ROW_ACTIONS = [
  { id: 'select', label: 'Select Chat', icon: AiChatIcons.select },
  { id: 'view', label: 'View Chat', icon: AiChatIcons.view },
  { id: 'rename', label: 'Rename Chat', icon: AiChatIcons.rename },
  { id: 'share', label: 'Share Chat', icon: AiChatIcons.share },
  { id: 'archive', label: 'Archive Chat', icon: AiChatIcons.archive },
  { id: 'delete', label: 'Delete Chat', icon: AiChatIcons.delete, tone: 'critical' },
];

const OVERFLOW_ACTIONS = [
  { id: 'language', label: 'English', icon: AiChatIcons.language },
  { id: 'settings', label: 'Settings', icon: AiChatIcons.settings },
  { id: 'feedback', label: 'Send Feedback', icon: AiChatIcons.feedback },
];

// Mirrors the production WhatsApp bot: the first reply of a session is
// prefixed with a personalized welcome-back, and greetings get its hello
// response.
const USER_NAME = 'Raphael';
const WELCOME_BACK = `Welcome back to the Nexleaf AI chatbot, ${USER_NAME}. Here's the answer to your question:`;
const GREETING_REPLY = 'Hello! How can I assist you today? If you have any questions about Cold Chain Equipment, installation, operation, troubleshooting, or need information from specific manuals or guides, feel free to ask. I can provide answers based on the documents and resources listed in my library. If you have a specific topic or equipment in mind, just let me know!';
const isGreeting = (text) => /^(hi|hello|hey|good\s(morning|afternoon|evening))\b/i.test(text.trim());

const HAIER_REPLY = `The Haier HBC 150 and HBC 260 fridges are designed primarily for safe storage of vaccines, medicines, and other temperature-sensitive healthcare products. They should not be used to store poisonous, harmful, or radioactive items unless in a secure, designated area.

Do not use any electric appliance inside the fridge unless recommended by the manufacturer. For maintenance, you can clean the interior and exterior, remove dust from the condenser and compressor, and ensure the door seal is clean.

Always disconnect power before maintenance or if the fridge will be unused for a long period. Follow all safety and disposal guidelines as outlined in the manual.`;

const PREVIOUS_CHATS = [
  { id: 'c1', title: 'Chilly Logistics Inspection: Time for a check!', meta: 'Last message just now.' },
  { id: 'c2', title: 'Plan your climate-controlled device check-up!', meta: 'Last message 1 minute ago.' },
  { id: 'c3', title: 'Enhance your cold storage efficiency!', meta: 'Last message 2 minutes ago.' },
  { id: 'c4', title: 'Getting your cooling equipment serviced!', meta: 'Last message 3 minutes ago.' },
  { id: 'c5', title: 'Urgent for cold chain maintenance!', meta: 'Last message 5 minutes ago.' },
  { id: 'c6', title: 'Maintain a healthy cold chain with routine check-ups!', meta: 'Last message 7 minutes ago.' },
  { id: 'c7', title: 'Timely Cold Storage System Maintenance Check!', meta: 'Last message 10 minutes ago.' },
  { id: 'c8', title: 'Arranging Your Cold Chain Maintenance Check!', meta: 'Last message 12 minutes ago.' },
  { id: 'c9', title: 'Protect Your Temperature-Sensitive Items: Maintenance is Key!', meta: 'Last message 15 minutes ago.' },
  { id: 'c10', title: 'Ensure Your Cold Chain is Strong: Maintenance Time!', meta: 'Last message 20 minutes ago.' },
];

// Panel-shaped frame so the standalone stories render at the drawer's
// real proportions (560px wide, fixed height, white surface).
function PanelFrame({ children, height = 640 }) {
  return (
    <div style={{
      width: 560, maxWidth: '100%', height,
      display: 'flex', flexDirection: 'column',
      background: '#ffffff',
      border: '1px solid #ebebeb', borderRadius: 12,
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

// ─── Empty state — centered logo + two-line suggestion cards ──────────────────
export const Welcome = {
  render: () => (
    <PanelFrame>
      <AiChatConversation>
        <AiChatWelcome suggestions={SUGGESTIONS} onSelect={(id) => console.log('pick', id)} />
      </AiChatConversation>
      <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
    </PanelFrame>
  ),
};

// ─── A conversation in progress — green bubble + rich AI response ─────────────
export const Conversation = {
  render: () => (
    <PanelFrame height={760}>
      <AiChatConversation>
        <AiChatMessage role="user">
          What else can be done with the Haier Fridge
        </AiChatMessage>
        <AiChatResponse
          title="What you can do with the Haier Fridge"
          onCopy={() => navigator.clipboard?.writeText(HAIER_REPLY)}
          onLike={() => console.log('like')}
          onDislike={() => console.log('dislike')}
          followUps={FOLLOW_UPS}
          onFollowUpSelect={(id) => console.log('follow-up', id)}
        >
          {HAIER_REPLY}
        </AiChatResponse>
      </AiChatConversation>
      <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
    </PanelFrame>
  ),
};

// ─── Reply variants — sources, error fallback, entity link ────────────────────
const HAIER_STEPS = `To use the Haier HBC 150 or HBC 260 fridge:

1. Installation: Place the fridge on a solid, flat, well-ventilated surface, away from direct sunlight.
2. Preparation: Remove all packing materials and check the contents against the packing list.
3. Powering Up: Connect to the correct power supply. Factory settings are pre-set.
4. Cooling Down: Let the fridge run empty for about 72 hours to reach the correct temperature range.
5. Loading: Once the temperature is stable, load items into the storage basket.`;

export const ReplyVariants = {
  render: () => (
    <PanelFrame height={760}>
      <AiChatConversation>
        <AiChatResponse
          title="How to use Haier Fridge"
          sources={[
            { id: 'google', label: 'Google' },
            { id: 'coldtrace', label: 'research.coldtrace.com' },
          ]}
          onSourceSelect={(id) => console.log('source', id)}
          onCopy={() => navigator.clipboard?.writeText(HAIER_STEPS)}
          onLike={() => {}}
          onDislike={() => {}}
          followUps={[{ id: 'more', label: 'Yes, I would like to know more' }]}
          followUpsLabel="Would you like to know more?"
          onFollowUpSelect={(id) => console.log('follow-up', id)}
        >
          {HAIER_STEPS}
        </AiChatResponse>
        <AiChatResponse onCopy={() => {}} onLike={() => {}} onDislike={() => {}}>
          I'm sorry, but I don't have sufficient information to assist with fixing a stove.
          For specialized support, please contact{' '}
          <a href="mailto:support@coldtrace.org" style={{ color: '#005bd3' }}>support@coldtrace.org</a>.
        </AiChatResponse>
      </AiChatConversation>
      <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
    </PanelFrame>
  ),
};

// ─── Media cards — image / video / file replies ───────────────────────────────
// 560×315 gray placeholder keeps the story self-contained (no remote images).
const PLACEHOLDER_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="560" height="315"><rect width="560" height="315" fill="#e8e8e8"/><circle cx="280" cy="140" r="40" fill="#c9c9c9"/><path d="M170 260l80-80 60 50 80-90 70 120z" fill="#c9c9c9"/></svg>',
)}`;

export const MediaCards = {
  render: () => (
    <PanelFrame height={760}>
      <AiChatConversation>
        <AiChatResponse onCopy={() => {}} onDownload={() => {}} onLike={() => {}} onDislike={() => {}}>
          <AiChatMediaCard type="image" src={PLACEHOLDER_IMG} alt="Image Title" title="Image Title" description="Description goes here" />
        </AiChatResponse>
        <AiChatResponse onCopy={() => {}} onDownload={() => {}} onLike={() => {}} onDislike={() => {}}>
          <AiChatMediaCard type="video" src={PLACEHOLDER_IMG} duration="2:36" title="Video Title" description="Description goes here" />
        </AiChatResponse>
        <AiChatResponse onCopy={() => {}} onDownload={() => {}} onLike={() => {}} onDislike={() => {}}>
          <AiChatMediaCard type="file" fileLabel="PDF" title="Model TM-2000 Temperature Monitor" description="PDF Documentation file" mediaHeight={160} />
        </AiChatResponse>
      </AiChatConversation>
      <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
    </PanelFrame>
  ),
};

// ─── Table reply — records embedded in an answer ──────────────────────────────
export const TableReply = {
  render: () => (
    <PanelFrame height={640}>
      <AiChatConversation>
        <AiChatMessage role="user">Which equipment needs attention?</AiChatMessage>
        <AiChatResponse
          onCopy={() => {}}
          onLike={() => {}}
          onDislike={() => {}}
          followUps={[{ id: 'open-table', label: 'Open them in the equipment table' }]}
          followUpsLabel="Want to dig in?"
          onFollowUpSelect={(id) => console.log(id)}
        >
          Here's what I found: 3 matching records across 2 facilities.
          <div style={{ marginTop: 12 }}>
            <AiChatTable
              columns={RECORD_COLUMNS}
              rows={matchingRecords()}
              onRowClick={(row) => console.log('open record', row.id)}
              footnote="Click a row to open it in the equipment table."
            />
          </div>
        </AiChatResponse>
      </AiChatConversation>
      <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
    </PanelFrame>
  ),
};

// ─── Delete / Rename dialogs + toasts ─────────────────────────────────────────
export const DeleteRenameFlow = {
  render: () => {
    const [dialog, setDialog] = useState(null); // 'delete' | 'rename' | 'deleting' | null
    const [toast, setToast] = useState(null);
    const [name, setName] = useState('Chilly Logistics Inspection: Time for a check!');

    return (
      <PanelFrame height={560}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
          {toast && <AiChatToast onDismiss={() => setToast(null)}>{toast}</AiChatToast>}
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="secondary" size="medium" onClick={() => setDialog('delete')}>Open delete dialog</Btn>
            <Btn variant="secondary" size="medium" onClick={() => setDialog('rename')}>Open rename dialog</Btn>
          </div>
        </div>

        <AiChatDeleteChatsDialog
          open={dialog === 'delete'}
          deleting={dialog === 'deleting'}
          count={2}
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            setDialog('deleting');
            setTimeout(() => { setDialog(null); setToast('2 chats deleted successfully'); }, 1200);
          }}
        />
        <AiChatRenameChatDialog
          open={dialog === 'rename'}
          value={name}
          onChange={setName}
          onCancel={() => setDialog(null)}
          onSave={() => { setDialog(null); setToast('Chat renamed successfully'); }}
        />
      </PanelFrame>
    );
  },
};

// ─── Typing indicator on its own ──────────────────────────────────────────────
export const Typing = {
  render: () => <AiChatTyping />,
};

// ─── Loading — history skeleton (panel first open) ────────────────────────────
export const Loading = {
  render: () => (
    <PanelFrame>
      <AiChatSkeleton />
    </PanelFrame>
  ),
};

// ─── Composer states ──────────────────────────────────────────────────────────
export const ComposerStates = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
        <AiChatComposer value={value} onChange={setValue} onSend={() => setValue('')} onAttach={() => {}} onMic={() => {}} />
        <AiChatComposer value="Summarize active alerts for Kilifi" onChange={() => {}} sending onAttach={() => {}} onMic={() => {}} />
        <AiChatComposer value="" onChange={() => {}} disabled placeholder="Assistant unavailable offline" onAttach={() => {}} onMic={() => {}} />
      </div>
    );
  },
};

// ─── Previous Chat — list with count row, row menus, pagination ───────────────
export const PreviousChatList = {
  render: () => {
    const [checked, setChecked] = useState({ c1: false });
    return (
      <PanelFrame height={760}>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
          <AiChatHistoryCount count={21} onSelectMode={() => console.log('select mode')} />
          {PREVIOUS_CHATS.slice(0, 5).map((chat, i) => (
            <AiChatHistoryCell
              key={chat.id}
              title={chat.title}
              meta={chat.meta}
              state={i === 0 ? 'hover' : undefined}
              checked={!!checked[chat.id]}
              onCheckedChange={(v) => setChecked((c) => ({ ...c, [chat.id]: v }))}
              onOpen={() => console.log('open', chat.id)}
              actions={CHAT_ROW_ACTIONS}
              onAction={(id) => console.log(id, chat.id)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 24px' }}>
          <Pagination hasPrevious={false} hasNext onPrevious={() => {}} onNext={() => {}} label="1/3" type="page" />
        </div>
      </PanelFrame>
    );
  },
};

// ─── Previous Chat — select mode with bulk actions ────────────────────────────
export const PreviousChatSelectMode = {
  render: () => {
    const [selected, setSelected] = useState(['c1']);
    const chats = PREVIOUS_CHATS.slice(0, 5);
    const toggle = (id, v) => setSelected((s) => (v ? [...s, id] : s.filter((x) => x !== id)));
    return (
      <PanelFrame height={640}>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
          <AiChatHistorySelectBar
            selectedCount={selected.length}
            totalCount={chats.length}
            onToggleAll={() => setSelected(selected.length === chats.length ? [] : chats.map((c) => c.id))}
            onArchive={() => console.log('archive', selected)}
            onDelete={() => console.log('delete', selected)}
            onExit={() => setSelected([])}
          />
          {chats.map((chat) => (
            <AiChatHistoryCell
              key={chat.id}
              title={chat.title}
              meta={chat.meta}
              selectMode
              checked={selected.includes(chat.id)}
              onCheckedChange={(v) => toggle(chat.id, v)}
              actions={CHAT_ROW_ACTIONS}
              onAction={(id) => console.log(id, chat.id)}
            />
          ))}
        </div>
      </PanelFrame>
    );
  },
};

// ─── Previous Chat — empty state ──────────────────────────────────────────────
export const PreviousChatEmpty = {
  render: () => (
    <PanelFrame>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <AiChatHistoryEmpty onAction={() => console.log('start new chat')} />
      </div>
    </PanelFrame>
  ),
};

// ─── WhatsApp channel — how the Nexleaf bot renders on WhatsApp ───────────────
//
// Documentation mockup of the production WhatsApp surface (see the panel for
// the in-app surface). Colors are WhatsApp's own — channel branding, not
// design-system tokens.
const WA = {
  chatBg: '#ece5dd',
  headerBg: '#f6f6f6',
  userBubble: '#dcf8c6',
  botBubble: '#ffffff',
  notice: '#d5f4e4',
  text: '#111b21',
  meta: '#667781',
  tick: '#53bdeb',
  verified: '#007bfc',
  accent: '#007aff',
};

function WaTicks() {
  return (
    <svg width={16} height={11} viewBox="0 0 16 11" fill="none" aria-label="Read">
      <path d="m1 5.5 3 3L9.5 3M6.5 8.5l1 1L13 4" stroke={WA.tick} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WaBubble({ from = 'bot', time, children }) {
  const isUser = from === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '78%',
        background: isUser ? WA.userBubble : WA.botBubble,
        borderRadius: 10,
        borderTopLeftRadius: isUser ? 10 : 2,
        borderTopRightRadius: isUser ? 2 : 10,
        boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
        padding: '7px 10px 6px',
        fontSize: 15, lineHeight: '21px', color: WA.text,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>
        {children}
        <span style={{
          float: 'right', display: 'inline-flex', alignItems: 'center', gap: 3,
          margin: '8px -2px 0 10px',
          fontSize: 11, color: WA.meta,
        }}>
          {time}
          {isUser && <WaTicks />}
        </span>
      </div>
    </div>
  );
}

function WaTypingBubble() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{
        background: WA.botBubble, borderRadius: 10, borderTopLeftRadius: 2,
        boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
        padding: '12px 14px', display: 'inline-flex', gap: 4,
      }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#9aa5ab', opacity: i === 1 ? 0.9 : 0.5 }} />
        ))}
      </div>
    </div>
  );
}

// Quick-reply buttons under a bot message (WhatsApp business style).
function WaButtons({ labels }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '78%' }}>
      {labels.map((label) => (
        <div key={label} style={{
          background: WA.botBubble, borderRadius: 8,
          boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
          padding: '9px 12px', textAlign: 'center',
          fontSize: 14, fontWeight: 550, color: '#0a7cff',
        }}>{label}</div>
      ))}
    </div>
  );
}

// Reusable phone shell (header + scrolling conversation + composer).
function WaPhone({ children, scrollKey }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [scrollKey]);
  return (
    <div style={{
      width: 375, maxWidth: '100%', height: 720,
      display: 'flex', flexDirection: 'column',
      background: WA.chatBg,
      border: '1px solid #ebebeb', borderRadius: 12, overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 12px', background: WA.headerBg,
        borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: WA.accent, fontSize: 17 }}>
          <svg width={12} height={20} viewBox="0 0 12 20" fill="none" aria-hidden="true">
            <path d="M10.5 1.5 2 10l8.5 8.5" stroke={WA.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          50
        </span>
        <span style={{
          width: 38, height: 38, borderRadius: '50%', background: '#d3c1ab', flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="7" r="3.4" fill="#8d7351" />
            <path d="M3.5 17.5c1-3.4 3.6-5 6.5-5s5.5 1.6 6.5 5" fill="#8d7351" />
          </svg>
        </span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 650, color: WA.text }}>Nexleaf Chat Bot</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: WA.meta }}>
            Nexleaf Chatbot
            <svg width={13} height={13} viewBox="0 0 20 20" aria-label="Verified">
              <path d="M10 1.5 12.2 3.6l3-.4 1 2.9 2.7 1.4-1 2.9 1 2.9-2.7 1.4-1 2.9-3-.4L10 18.5 7.8 16.4l-3 .4-1-2.9L1.1 12.5l1-2.9-1-2.9 2.7-1.4 1-2.9 3 .4L10 1.5Z" fill={WA.verified} />
              <path d="m6.9 10.1 2.1 2.1 4.1-4.4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: WA.headerBg, flexShrink: 0 }}>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Attach">
          <path d="M10 3.5v13M3.5 10h13" stroke={WA.text} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 100, border: '1px solid rgba(0,0,0,0.08)', padding: '7px 12px', minHeight: 20 }}>
          <span style={{ flex: 1 }} />
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-label="Stickers">
            <circle cx="10" cy="10" r="7.2" stroke={WA.meta} strokeWidth="1.4" />
            <path d="M13 4a7.2 7.2 0 0 0 3 6.8" stroke={WA.meta} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Camera">
          <rect x="2.5" y="5.5" width="15" height="11" rx="2.5" stroke={WA.text} strokeWidth="1.5" />
          <path d="M7 5.5 8.2 3.5h3.6L13 5.5" stroke={WA.text} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="10" cy="11" r="3" stroke={WA.text} strokeWidth="1.5" />
        </svg>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Voice message">
          <rect x="7.5" y="2.5" width="5" height="9.5" rx="2.5" stroke={WA.text} strokeWidth="1.5" />
          <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" stroke={WA.text} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── WhatsApp fault-reporting flow (case-study journey) ───────────────────────
// "The refrigerator at Kireka Health Centre is not cooling" → confirm facility
// → identify equipment → troubleshoot → summarise → service request reference.
// `step` reveals timeline entries one at a time; typing entries render only
// while they are the newest entry.
const WA_FAULT_TIMELINE = [
  { type: 'msg', from: 'user', time: '09:12', text: 'The refrigerator at Kireka Health Centre is not cooling' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:12', text: "Sorry to hear that. Let me help you report this.\n\nYou're reporting an issue at Kireka Health Centre. Is that correct?", buttons: ['✓ Yes, that\'s correct', 'Change facility'] },
  { type: 'msg', from: 'user', time: '09:13', text: 'Yes' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:13', text: 'I found 2 refrigerators registered at Kireka Health Centre:\n\n1. Haier HBC-260 (HC-260-1182)\n2. Vestfrost MK 144 (MK-144-0871)\n\nWhich one has the problem? Reply 1 or 2.' },
  { type: 'msg', from: 'user', time: '09:13', text: '1' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:14', text: 'Haier HBC-260: last reading 14.2°C at 08:47 this morning, above the safe range.\n\nQuick check: is the compressor making any sound, and is the power light on?' },
  { type: 'msg', from: 'user', time: '09:15', text: 'No sound and the power light is off' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:15', text: 'That points to a power problem. Please check:\n\n1. The plug and socket connection\n2. The circuit breaker for the cold room\n\nDid this bring the fridge back on?', buttons: ['Yes, resolved', 'No, still off'] },
  { type: 'msg', from: 'user', time: '09:18', text: 'No, still off' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:18', text: "I'll create a service request so a technician can take over. Summary:\n\n📍 Kireka Health Centre\n🧊 Haier HBC-260 (HC-260-1182)\n⚠️ Not cooling. No compressor sound, power light off\n🔧 Checked: plug, socket, circuit breaker\n🌡️ Last reading: 14.2°C\n\nSubmit this request?", buttons: ['Submit request', 'Edit details'] },
  { type: 'msg', from: 'user', time: '09:19', text: 'Submit request' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '09:19', text: '✅ Service request SR-2024-0847 submitted.\n\nA technician will be assigned and you\'ll receive updates here. In the meantime, move vaccines to the backup fridge or cold boxes.' },
];

export const WhatsAppFaultReport = {
  args: { step: WA_FAULT_TIMELINE.length - 1 },
  argTypes: { step: { control: { type: 'number', min: 0, max: WA_FAULT_TIMELINE.length - 1 } } },
  render: ({ step }) => {
    const visible = WA_FAULT_TIMELINE.slice(0, Number(step) + 1);
    return (
      <WaPhone scrollKey={step}>
        <div style={{ alignSelf: 'center', background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 550, color: WA.meta, boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)' }}>
          Today
        </div>
        {visible.map((entry, i) => {
          if (entry.type === 'typing') {
            return i === visible.length - 1 ? <WaTypingBubble key={i} /> : null;
          }
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: entry.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <WaBubble from={entry.from} time={entry.time}>{entry.text}</WaBubble>
              {entry.buttons && i === visible.length - 1 && <WaButtons labels={entry.buttons} />}
            </div>
          );
        })}
      </WaPhone>
    );
  },
};

// ─── WhatsApp language / connectivity / escalation flow ───────────────────────
// Case-study journey: language selection → an honest live-data limitation →
// escalation to a technician with the collected context carried forward.
const WA_ESCALATION_TIMELINE = [
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '14:02', text: 'Karibu! Welcome to Nexleaf AI.\n\nChoose your language / Chagua lugha yako / Choisissez votre langue:', buttons: ['English', 'Kiswahili', 'Français'] },
  { type: 'msg', from: 'user', time: '14:02', text: 'English' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '14:02', text: "Great. We'll continue in English. You can change language at any time by typing “language”.\n\nHow can I help you today?" },
  { type: 'msg', from: 'user', time: '14:03', text: 'What is the current temperature of the fridge at Kireka Health Centre?' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '14:03', text: "⚠️ I can't retrieve live readings right now. The device at Kireka Health Centre hasn't synced since 08:47 this morning.\n\nMost recent stored reading:\n🌡️ 14.2°C at 08:47 (above the safe 2–8°C range)\n\nThis is stored data, not a live reading. I'll update you as soon as the device reconnects." },
  { type: 'msg', from: 'user', time: '14:05', text: 'The fridge is still warm. I need help' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '14:05', text: "I'll request technician support and pass along everything we know:\n\n📍 Kireka Health Centre\n🧊 Haier HBC-260 (HC-260-1182)\n⚠️ Not cooling. Last stored reading 14.2°C\n📶 Device offline since 08:47\n\nSend this to the regional technician team?", buttons: ['Request technician', 'Not now'] },
  { type: 'msg', from: 'user', time: '14:06', text: 'Request technician' },
  { type: 'typing' },
  { type: 'msg', from: 'bot', time: '14:06', text: "🛠️ Technician request TR-2024-0312 sent to the regional team.\n\nThey'll contact you here on WhatsApp. Your facility, equipment, and issue details were included, so you won't need to explain it again." },
];

export const WhatsAppLanguageEscalation = {
  args: { step: WA_ESCALATION_TIMELINE.length - 1 },
  argTypes: { step: { control: { type: 'number', min: 0, max: WA_ESCALATION_TIMELINE.length - 1 } } },
  render: ({ step }) => {
    const visible = WA_ESCALATION_TIMELINE.slice(0, Number(step) + 1);
    return (
      <WaPhone scrollKey={step}>
        <div style={{ alignSelf: 'center', background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 550, color: WA.meta, boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)' }}>
          Today
        </div>
        {visible.map((entry, i) => {
          if (entry.type === 'typing') {
            return i === visible.length - 1 ? <WaTypingBubble key={i} /> : null;
          }
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: entry.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <WaBubble from={entry.from} time={entry.time}>{entry.text}</WaBubble>
              {entry.buttons && i === visible.length - 1 && <WaButtons labels={entry.buttons} />}
            </div>
          );
        })}
      </WaPhone>
    );
  },
};

export const WhatsAppChannel = {
  render: () => (
    <div style={{
      width: 375, maxWidth: '100%', height: 720,
      display: 'flex', flexDirection: 'column',
      background: WA.chatBg,
      border: '1px solid #ebebeb', borderRadius: 12, overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 12px', background: WA.headerBg,
        borderBottom: '1px solid rgba(0,0,0,0.08)', flexShrink: 0,
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: WA.accent, fontSize: 17 }}>
          <svg width={12} height={20} viewBox="0 0 12 20" fill="none" aria-hidden="true">
            <path d="M10.5 1.5 2 10l8.5 8.5" stroke={WA.accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          50
        </span>
        <span style={{
          width: 38, height: 38, borderRadius: '50%', background: '#d3c1ab', flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="7" r="3.4" fill="#8d7351" />
            <path d="M3.5 17.5c1-3.4 3.6-5 6.5-5s5.5 1.6 6.5 5" fill="#8d7351" />
          </svg>
        </span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 650, color: WA.text }}>Nexleaf Chat Bot</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: WA.meta }}>
            Nexleaf Chatbot
            <svg width={13} height={13} viewBox="0 0 20 20" aria-label="Verified">
              <path d="M10 1.5 12.2 3.6l3-.4 1 2.9 2.7 1.4-1 2.9 1 2.9-2.7 1.4-1 2.9-3-.4L10 18.5 7.8 16.4l-3 .4-1-2.9L1.1 12.5l1-2.9-1-2.9 2.7-1.4 1-2.9 3 .4L10 1.5Z" fill={WA.verified} />
              <path d="m6.9 10.1 2.1 2.1 4.1-4.4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </span>
      </div>

      {/* Conversation */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '12px 12px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ alignSelf: 'center', background: '#fff', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 550, color: WA.meta, boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)' }}>
          Today
        </div>
        <div style={{ alignSelf: 'center', background: WA.notice, borderRadius: 8, padding: '8px 14px', fontSize: 13, lineHeight: '18px', color: WA.text, textAlign: 'center', maxWidth: '88%' }}>
          This business uses a secure service from Meta to manage this chat. Tap to learn more.
        </div>

        <WaBubble from="user" time="18:44">Hello</WaBubble>
        <WaBubble from="bot" time="18:44">
          {`Welcome back to the Nexleaf AI chatbot, ${USER_NAME}. Here's the answer to your question:\n\n${GREETING_REPLY}`}
        </WaBubble>
      </div>

      {/* Composer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: WA.headerBg, flexShrink: 0 }}>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Attach">
          <path d="M10 3.5v13M3.5 10h13" stroke={WA.text} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 100, border: '1px solid rgba(0,0,0,0.08)', padding: '7px 12px', minHeight: 20 }}>
          <span style={{ flex: 1 }} />
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-label="Stickers">
            <circle cx="10" cy="10" r="7.2" stroke={WA.meta} strokeWidth="1.4" />
            <path d="M13 4a7.2 7.2 0 0 0 3 6.8" stroke={WA.meta} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Camera">
          <rect x="2.5" y="5.5" width="15" height="11" rx="2.5" stroke={WA.text} strokeWidth="1.5" />
          <path d="M7 5.5 8.2 3.5h3.6L13 5.5" stroke={WA.text} strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="10" cy="11" r="3" stroke={WA.text} strokeWidth="1.5" />
        </svg>
        <svg width={22} height={22} viewBox="0 0 20 20" fill="none" aria-label="Voice message">
          <rect x="7.5" y="2.5" width="5" height="9.5" rx="2.5" stroke={WA.text} strokeWidth="1.5" />
          <path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" stroke={WA.text} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  ),
};

// ─── Featured card demo (self-playing loop for the portfolio card) ────────────
// The real panel components replay a short conversation on a gradient stage,
// then reset and loop. Captured frame-by-frame for the portfolio card GIF.
const DEMO_PHASES = [1400, 600, 1400, 2800, 600, 1400, 3200]; // ms per phase

function FeaturedDemo() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % DEMO_PHASES.length), DEMO_PHASES[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const q1 = 'How many CCEs do I have';
  const q2 = 'Which devices are offline?';

  return (
    <div style={{
      width: 1200, height: 675, overflow: 'hidden', position: 'relative',
      background: 'radial-gradient(900px 600px at 82% 0%, rgba(49,181,100,0.16), transparent 60%), radial-gradient(700px 500px at 8% 100%, rgba(0,91,211,0.09), transparent 55%), linear-gradient(160deg, #f7faf8 0%, #e9efe9 100%)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        width: 640, marginTop: 34,
        background: '#ffffff', borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 30px 70px -18px rgba(1,0,46,0.28), 0 0 0 1px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', height: 610,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '14px 16px 10px',
          borderBottom: '1px solid #ebebeb', flexShrink: 0,
        }}>
          <AiLogo size={24} />
          <span style={{ fontSize: 14, fontWeight: 650, color: '#303030' }}>
            AI Chat Bot <span style={{ color: '#616161' }}>(beta)</span>
          </span>
        </div>

        <AiChatConversation>
          {phase === 0 && <AiChatWelcome suggestions={SUGGESTIONS} onSelect={() => {}} />}
          {phase >= 1 && <AiChatMessage role="user">{q1}</AiChatMessage>}
          {phase === 2 && <AiChatTyping />}
          {phase >= 3 && (
            <AiChatResponse onCopy={() => {}} onLike={() => {}} onDislike={() => {}}>
              {`${WELCOME_BACK}\n\nYou have 247 cold chain equipment units: 182 vaccine refrigerators, 41 vaccine freezers, and 24 cold boxes. 12 units are currently offline. Want me to list them?`}
            </AiChatResponse>
          )}
          {phase >= 4 && <AiChatMessage role="user">{q2}</AiChatMessage>}
          {phase === 5 && <AiChatTyping />}
          {phase >= 6 && (
            <AiChatResponse>
              {'Here are the 3 devices that need attention:'}
              <div style={{ marginTop: 12 }}>
                <AiChatTable columns={RECORD_COLUMNS} rows={matchingRecords()} />
              </div>
            </AiChatResponse>
          )}
        </AiChatConversation>

        <AiChatComposer value="" onChange={() => {}} onSend={() => {}} onAttach={() => {}} onMic={() => {}} />
      </div>
    </div>
  );
}

export const FeaturedCardDemo = {
  parameters: { layout: 'fullscreen' },
  render: () => <FeaturedDemo />,
};

// ─── Full panel — the complete flow inside AiChatPanel ────────────────────────
//
// Chat view (welcome → conversation with rich responses + follow-ups) and the
// Previous Chat view (back arrow, count/select, row menus, pagination), with
// the header overflow menu (English / Settings / Send Feedback).
export const FullPanel = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [view, setView] = useState('chat'); // 'chat' | 'history'
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState('');
    const [thinking, setThinking] = useState(false);
    const [selectMode, setSelectMode] = useState(false);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [dialog, setDialog] = useState(null); // { kind: 'delete'|'rename', ids, name? } | { kind: 'deleting' }
    const [toast, setToast] = useState(null);
    const [chats, setChats] = useState(PREVIOUS_CHATS);

    const pageSize = 5;
    const pageCount = Math.max(1, Math.ceil(chats.length / pageSize));
    const safePage = Math.min(page, pageCount);
    const pageChats = useMemo(
      () => chats.slice((safePage - 1) * pageSize, safePage * pageSize),
      [chats, safePage],
    );

    function removeChats(ids, verb) {
      setChats((cs) => cs.filter((c) => !ids.includes(c.id)));
      setSelected([]);
      setSelectMode(false);
      setToast(`${ids.length} ${ids.length === 1 ? 'chat' : 'chats'} ${verb} successfully`);
    }

    function ask(text) {
      setMessages((m) => [...m, { role: 'user', text }]);
      setDraft('');
      setThinking(true);
      setTimeout(() => {
        setThinking(false);
        setMessages((m) => {
          const priorReplies = m.filter((x) => x.role === 'assistant').length;
          // WhatsApp-bot behavior: personalized welcome-back on the session's
          // first reply, and its hello response for greetings.
          const prefix = priorReplies === 0 ? `${WELCOME_BACK}\n\n` : '';
          if (isGreeting(text)) {
            return [...m, { role: 'assistant', text: `${prefix}${GREETING_REPLY}` }];
          }
          // Otherwise alternate the two reply shapes so the demo shows both:
          // the titled fridge answer and a records answer with a table.
          const isTableReply = priorReplies % 2 === 1;
          return [...m, isTableReply ? {
            role: 'assistant',
            text: `${prefix}Here's what I found for “${text}”: 3 matching records across 2 facilities.`,
            table: { columns: RECORD_COLUMNS, rows: matchingRecords() },
          } : {
            role: 'assistant',
            title: prefix ? undefined : 'What you can do with the Haier Fridge',
            text: `${prefix}${HAIER_REPLY}`,
            followUps: FOLLOW_UPS,
          }];
        });
      }, 1400);
    }

    function newChat() {
      setMessages([]); setDraft(''); setThinking(false); setView('chat');
    }

    const isHistory = view === 'history';

    return (
      <div style={{ minHeight: 480 }}>
        <ToolbarAskAiButton active={open} onClick={() => setOpen((o) => !o)} />
        <AiChatPanel
          open={open}
          onClose={() => setOpen(false)}
          onBack={isHistory ? () => setView('chat') : undefined}
          title={isHistory ? 'Previous Chat' : 'AI Chat Bot'}
          beta={!isHistory}
          disclaimer={isHistory
            ? 'This shows your recent conversations'
            : 'This chatbot shows off the potential of generative AI in healthcare applications. Your data and submissions are not used to train or improve models.'}
          onNewChat={newChat}
          onPreviousChat={isHistory ? undefined : () => setView('history')}
          overflowActions={OVERFLOW_ACTIONS}
          onOverflowSelect={(id) => console.log('overflow', id)}
        >
          {toast && <AiChatToast onDismiss={() => setToast(null)}>{toast}</AiChatToast>}
          {isHistory ? (
            <>
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
                {chats.length === 0 ? (
                  <AiChatHistoryEmpty onAction={newChat} />
                ) : (
                  <>
                    {selectMode ? (
                      <AiChatHistorySelectBar
                        selectedCount={selected.length}
                        totalCount={pageChats.length}
                        onToggleAll={() => setSelected(
                          selected.length === pageChats.length ? [] : pageChats.map((c) => c.id),
                        )}
                        onArchive={() => removeChats(selected, 'archived')}
                        onDelete={() => setDialog({ kind: 'delete', ids: selected })}
                        onExit={() => { setSelected([]); setSelectMode(false); }}
                      />
                    ) : (
                      <AiChatHistoryCount count={chats.length} onSelectMode={() => setSelectMode(true)} />
                    )}
                    {pageChats.map((chat) => (
                      <AiChatHistoryCell
                        key={chat.id}
                        title={chat.title}
                        meta={chat.meta}
                        selectMode={selectMode}
                        checked={selected.includes(chat.id)}
                        onCheckedChange={(v) => {
                          if (v) setSelectMode(true);
                          setSelected((s) => (v ? [...s, chat.id] : s.filter((x) => x !== chat.id)));
                        }}
                        onOpen={() => setView('chat')}
                        actions={CHAT_ROW_ACTIONS}
                        onAction={(id) => {
                          if (id === 'select') { setSelectMode(true); setSelected([chat.id]); }
                          else if (id === 'view') setView('chat');
                          else if (id === 'rename') setDialog({ kind: 'rename', ids: [chat.id], name: chat.title });
                          else if (id === 'delete') setDialog({ kind: 'delete', ids: [chat.id] });
                          else if (id === 'archive') removeChats([chat.id], 'archived');
                          else console.log(id, chat.id);
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
              {pageCount > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 24px', flexShrink: 0 }}>
                  <Pagination
                    hasPrevious={safePage > 1}
                    hasNext={safePage < pageCount}
                    onPrevious={() => setPage(safePage - 1)}
                    onNext={() => setPage(safePage + 1)}
                    label={`${safePage}/${pageCount}`}
                    type="page"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <AiChatConversation>
                {messages.length === 0 && !thinking && (
                  <AiChatWelcome suggestions={SUGGESTIONS} onSelect={(_id, item) => ask(item.label)} />
                )}
                {messages.map((m, i) => (
                  m.role === 'user' ? (
                    <AiChatMessage key={i} role="user">{m.text}</AiChatMessage>
                  ) : (
                    <AiChatResponse
                      key={i}
                      title={m.title}
                      onCopy={() => navigator.clipboard?.writeText(m.text)}
                      onLike={() => console.log('like', i)}
                      onDislike={() => console.log('dislike', i)}
                      followUps={m.followUps}
                      onFollowUpSelect={(_id, item) => ask(item.label)}
                    >
                      {m.text}
                      {m.table && (
                        <div style={{ marginTop: 12 }}>
                          <AiChatTable
                            columns={m.table.columns}
                            rows={m.table.rows}
                            onRowClick={(row) => console.log('open record', row.id)}
                            footnote="Click a row to open it in the equipment table."
                          />
                        </div>
                      )}
                    </AiChatResponse>
                  )
                ))}
                {thinking && <AiChatTyping />}
              </AiChatConversation>
              <AiChatComposer
                value={draft}
                onChange={setDraft}
                onSend={ask}
                onAttach={() => console.log('attach')}
                onMic={() => console.log('voice input')}
              />
            </>
          )}
        </AiChatPanel>

        <AiChatDeleteChatsDialog
          open={dialog?.kind === 'delete'}
          deleting={dialog?.kind === 'deleting'}
          count={dialog?.ids?.length ?? 1}
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            const ids = dialog?.ids ?? [];
            setDialog({ kind: 'deleting' });
            setTimeout(() => {
              setDialog(null);
              removeChats(ids, 'deleted');
            }, 1200);
          }}
        />
        <AiChatRenameChatDialog
          open={dialog?.kind === 'rename'}
          value={dialog?.name ?? ''}
          onChange={(name) => setDialog((d) => ({ ...d, name }))}
          onCancel={() => setDialog(null)}
          onSave={() => {
            const { ids = [], name } = dialog ?? {};
            setChats((cs) => cs.map((c) => (ids.includes(c.id) ? { ...c, title: name } : c)));
            setDialog(null);
            setToast('Chat renamed successfully');
          }}
        />
      </div>
    );
  },
};
