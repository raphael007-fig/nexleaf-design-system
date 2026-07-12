// ── Nexleaf Design System — AiChatDemo (canonical Ask AI panel demo) ──────────
// The fully-assembled AI Chat Bot panel — AiChatPanel chrome + the AiChat kit
// (welcome, conversation, composer, history with select/rename/delete, dialogs,
// toast) driven by a scripted stand-in for a real backend. ONE reusable piece so
// every surface's "Ask AI" opens the SAME experience: the Application Layout,
// the responsive App Shell, and any future page demo.
//
//   <AiChatDemo open={chatOpen} onClose={() => setChatOpen(false)} />
//
// Suggestions and sent messages get a canned ColdTrace-flavored reply after a
// short "thinking" delay; greetings mirror the production WhatsApp bot's hello
// response; unscripted questions answer with an embedded records table.

import { useState } from 'react';
import { AiChatPanel } from '../Toolbar/Toolbar.jsx';
import { StatusBadge } from '../Badge/Badge.jsx';
import {
  AiChatConversation, AiChatWelcome, AiChatMessage, AiChatResponse, AiChatTyping, AiChatComposer,
  AiChatHistoryCount, AiChatHistorySelectBar, AiChatHistoryCell, AiChatHistoryEmpty, AiChatIcons,
  AiChatTable, AiChatToast, AiChatDeleteChatsDialog, AiChatRenameChatDialog,
} from './AiChat.jsx';

const AI_SUGGESTIONS = [
  { id: 'about', label: 'What can Nexleaf AI do', description: 'and how to get started' },
  { id: 'cce-count', label: 'How many CCEs do I have', description: 'Check my inventory' },
];

const AI_REPLIES = {
  about: {
    title: 'What Nexleaf AI can do',
    text: 'I can answer questions about your cold chain: equipment inventory, offline devices, temperature excursions, alerts, and service requests. Try asking "How many CCEs do I have" or "Summarize active alerts".',
    followUps: [
      { id: 'cce-count', label: 'How many CCEs do I have' },
      { id: 'alerts', label: 'Summarize my active alerts' },
    ],
  },
  'cce-count': {
    title: 'Your cold chain equipment',
    text: 'You have 247 cold chain equipment units: 182 vaccine refrigerators, 41 vaccine freezers, and 24 cold boxes. 12 units are currently offline. Want me to list them?',
    followUps: [
      { id: 'offline', label: 'Which devices are offline?' },
      { id: 'service', label: 'Open service requests' },
    ],
  },
};

const AI_PREVIOUS_CHATS = [
  { id: 'p1', title: 'Chilly Logistics Inspection: Time for a check!', meta: 'Last message just now.' },
  { id: 'p2', title: 'Plan your climate-controlled device check-up!', meta: 'Last message 1 minute ago.' },
  { id: 'p3', title: 'Enhance your cold storage efficiency!', meta: 'Last message 2 minutes ago.' },
  { id: 'p4', title: 'Getting your cooling equipment serviced!', meta: 'Last message 3 minutes ago.' },
  { id: 'p5', title: 'Urgent for cold chain maintenance!', meta: 'Last message 5 minutes ago.' },
];

const AI_CHAT_ROW_ACTIONS = [
  { id: 'select', label: 'Select Chat', icon: AiChatIcons.select },
  { id: 'view', label: 'View Chat', icon: AiChatIcons.view },
  { id: 'rename', label: 'Rename Chat', icon: AiChatIcons.rename },
  { id: 'share', label: 'Share Chat', icon: AiChatIcons.share },
  { id: 'archive', label: 'Archive Chat', icon: AiChatIcons.archive },
  { id: 'delete', label: 'Delete Chat', icon: AiChatIcons.delete, tone: 'critical' },
];

const AI_OVERFLOW_ACTIONS = [
  { id: 'language', label: 'English', icon: AiChatIcons.language },
  { id: 'settings', label: 'Settings', icon: AiChatIcons.settings },
  { id: 'feedback', label: 'Send Feedback', icon: AiChatIcons.feedback },
];

// Mirrors the production WhatsApp bot: personalized welcome-back on the first
// reply of a session, and its hello response for greetings.
const AI_USER_NAME = 'Raphael';
const AI_WELCOME_BACK = `Welcome back to the Nexleaf AI chatbot, ${AI_USER_NAME}. Here's the answer to your question:`;
const AI_GREETING_REPLY = 'Hello! How can I assist you today? If you have any questions about Cold Chain Equipment, installation, operation, troubleshooting, or need information from specific manuals or guides, feel free to ask. I can provide answers based on the documents and resources listed in my library. If you have a specific topic or equipment in mind, just let me know!';
const aiIsGreeting = (text) => /^(hi|hello|hey|good\s(morning|afternoon|evening))\b/i.test(text.trim());

// Records behind the fallback "3 matching records across 2 facilities" answer.
const AI_RECORD_COLUMNS = [
  { key: 'equipment', label: 'Equipment' },
  { key: 'facility', label: 'Facility' },
  { key: 'status', label: 'Status' },
];

const aiMatchingRecords = () => [
  { id: 'r1', equipment: 'Haier HBC-80', facility: 'Changamwe Dispensary', status: <StatusBadge status="pending" /> },
  { id: 'r2', equipment: 'Vestfrost MK 144', facility: 'Likoni Health Centre', status: <StatusBadge status="completed" /> },
  { id: 'r3', equipment: 'Dometic TCW 2000', facility: 'Likoni Health Centre', status: <StatusBadge status="pending" /> },
];

export function AiChatDemo({ open, onClose }) {
  const [view, setView] = useState('chat'); // 'chat' | 'history'
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [dialog, setDialog] = useState(null); // { kind: 'delete'|'rename'|'deleting', ids?, name? }
  const [toast, setToast] = useState(null);
  const [chats, setChats] = useState(AI_PREVIOUS_CHATS);

  function removeChats(ids, verb) {
    setChats((cs) => cs.filter((c) => !ids.includes(c.id)));
    setSelected([]);
    setSelectMode(false);
    setToast(`${ids.length} ${ids.length === 1 ? 'chat' : 'chats'} ${verb} successfully`);
  }

  function ask(text, replyId) {
    setMessages((m) => [...m, { role: 'user', text }]);
    setDraft('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      const reply = AI_REPLIES[replyId];
      setMessages((m) => {
        const prefix = m.filter((x) => x.role === 'assistant').length === 0
          ? `${AI_WELCOME_BACK}\n\n` : '';
        if (!reply && aiIsGreeting(text)) {
          return [...m, { role: 'assistant', text: `${prefix}${AI_GREETING_REPLY}` }];
        }
        return [...m, reply ? {
          role: 'assistant',
          title: prefix ? undefined : reply.title,
          text: `${prefix}${reply.text}`,
          followUps: reply.followUps,
        } : {
          // Unscripted question → records answer with the table embedded.
          role: 'assistant',
          text: `${prefix}Here's what I found for “${text}”: 3 matching records across 2 facilities.`,
          table: { columns: AI_RECORD_COLUMNS, rows: aiMatchingRecords() },
        }];
      });
    }, 1400);
  }

  function newChat() {
    setMessages([]);
    setDraft('');
    setThinking(false);
    setView('chat');
  }

  const isHistory = view === 'history';

  return (
    <AiChatPanel
      open={open}
      onClose={onClose}
      onBack={isHistory ? () => setView('chat') : undefined}
      title={isHistory ? 'Previous Chat' : 'AI Chat Bot'}
      beta={!isHistory}
      disclaimer={isHistory
        ? 'This shows your recent conversations'
        : 'This chatbot shows off the potential of generative AI in healthcare applications. Your data and submissions are not used to train or improve models.'}
      onNewChat={newChat}
      onPreviousChat={isHistory ? undefined : () => setView('history')}
      overflowActions={AI_OVERFLOW_ACTIONS}
      onOverflowSelect={() => {}}
    >
      {toast && <AiChatToast onDismiss={() => setToast(null)}>{toast}</AiChatToast>}
      {isHistory ? (
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 16px' }}>
          {chats.length === 0 ? (
            <AiChatHistoryEmpty onAction={newChat} />
          ) : (
            <>
              {selectMode ? (
                <AiChatHistorySelectBar
                  selectedCount={selected.length}
                  totalCount={chats.length}
                  onToggleAll={() => setSelected(
                    selected.length === chats.length ? [] : chats.map((c) => c.id),
                  )}
                  onArchive={() => removeChats(selected, 'archived')}
                  onDelete={() => setDialog({ kind: 'delete', ids: selected })}
                  onExit={() => { setSelected([]); setSelectMode(false); }}
                />
              ) : (
                <AiChatHistoryCount count={chats.length} onSelectMode={() => setSelectMode(true)} />
              )}
              {chats.map((chat) => (
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
                  actions={AI_CHAT_ROW_ACTIONS}
                  onAction={(id) => {
                    if (id === 'select') { setSelectMode(true); setSelected([chat.id]); }
                    else if (id === 'view') setView('chat');
                    else if (id === 'rename') setDialog({ kind: 'rename', ids: [chat.id], name: chat.title });
                    else if (id === 'delete') setDialog({ kind: 'delete', ids: [chat.id] });
                    else if (id === 'archive') removeChats([chat.id], 'archived');
                  }}
                />
              ))}
            </>
          )}
        </div>
      ) : (
        <>
          <AiChatConversation>
            {messages.length === 0 && !thinking && (
              <AiChatWelcome suggestions={AI_SUGGESTIONS} onSelect={(id, item) => ask(item.label, id)} />
            )}
            {messages.map((m, i) => (
              m.role === 'user' ? (
                <AiChatMessage key={i} role="user">{m.text}</AiChatMessage>
              ) : (
                <AiChatResponse
                  key={i}
                  title={m.title}
                  onCopy={() => navigator.clipboard?.writeText(m.text)}
                  onLike={() => {}}
                  onDislike={() => {}}
                  followUps={m.followUps}
                  onFollowUpSelect={(id, item) => ask(item.label, id)}
                >
                  {m.text}
                  {m.table && (
                    <div style={{ marginTop: 12 }}>
                      <AiChatTable
                        columns={m.table.columns}
                        rows={m.table.rows}
                        onRowClick={() => {}}
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
            onSend={(text) => ask(text)}
            onAttach={() => {}}
            onMic={() => {}}
          />
        </>
      )}

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
    </AiChatPanel>
  );
}
