import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiLogo } from '../Toolbar/Toolbar.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import { Btn, IconBtn } from '../Btn/Btn.jsx';
import { Checkbox } from '../Checkbox/Checkbox.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';
import { Modal } from '../Modal/Modal.jsx';
import { TextInput } from '../TextInput/TextInput.jsx';
import { Tag } from '../Tag/Tag.jsx';
import { getItemId, getItemLabel } from '../../foundation/itemShape.js';
import {
  BG_PAGE, BG_SURFACE, BG_SURFACE_HOVER, BG_INPUT, BG_INPUT_FOCUS, BG_CONTROL_DISABLED,
  BG_SUCCESS, BG_CRITICAL_SOFT, BG_INFO_BADGE, TEXT_INFO, TEXT_SUCCESS, TEXT_CRITICAL,
  TEXT_DEFAULT, TEXT_SUBDUED, TEXT_PLACEHOLDER, TEXT_DISABLED, TEXT_ON_PRIMARY,
  BORDER_INPUT, BORDER_INPUT_FOCUS, BORDER_LIGHT, BORDER_LIGHTER, BORDER_DEFAULT, FOCUS_RING,
  COLOR_AI, COLOR_CRITICAL, COLOR_CRITICAL_STRONG, RADIUS_SM, RADIUS_LG, SHADOW_OVERLAY,
} from '../../tokens/index.js';
import illoNoteSync from '../../foundation/illustrations/note-sync.svg?raw';

// ─── AiChat — content components for the Ask AI panel ────────────────────────
//
// Implements the AI Chat Bot design (Figma: AI-Chat-Bot / Home//Desktop,
// node 2069:9866). These fill the body of <AiChatPanel> (Toolbar module).
// All pieces are stateless/controlled; the consumer owns the message array
// and the composer value, so any backend can drive them.
//
//   <AiChatPanel open onClose={…} onNewChat={…} onPreviousChat={…}>
//     <AiChatConversation>
//       <AiChatWelcome suggestions={…} onSelect={…} />   ← empty state
//       <AiChatMessage role="user">…</AiChatMessage>
//       <AiChatMessage role="assistant">…</AiChatMessage>
//       <AiChatTyping />                                  ← while responding
//     </AiChatConversation>
//     <AiChatComposer value={v} onChange={…} onSend={…} />
//   </AiChatPanel>

const FONT = 'Inter, sans-serif';

// ─── Icons (inlined from Nexleaf Icons per the icon rule) ────────────────────

// Paperclip — drawn in the source's 32-viewBox space.
const IcoAttachment = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.81178 15.8247C8.05442 17.582 8.05442 20.4313 9.81178 22.1886L9.98751 22.3644C11.6478 24.0247 14.3397 24.0247 16 22.3644C16.3515 22.0129 16.3515 21.4431 16 21.0916C15.6485 20.7401 15.0787 20.7401 14.7272 21.0916C13.7699 22.0489 12.2177 22.0489 11.2603 21.0916L11.0846 20.9159C10.0302 19.8614 10.0302 18.1519 11.0846 17.0975L17.1026 11.0795C18.1539 10.0281 19.8586 10.0281 20.9099 11.0795C21.9613 12.1308 21.9613 13.8354 20.9099 14.8868L18.1669 17.6298C17.7842 18.0126 17.1636 18.0126 16.7809 17.6298C16.3981 17.2471 16.3981 16.6265 16.7809 16.2438L19.482 13.5427C19.8335 13.1912 19.8335 12.6214 19.482 12.2699C19.1305 11.9184 18.5607 11.9184 18.2092 12.2699L15.5081 14.971C14.4224 16.0567 14.4224 17.8169 15.5081 18.9026C16.5938 19.9883 18.354 19.9883 19.4397 18.9026L22.1827 16.1596C23.937 14.4053 23.937 11.561 22.1827 9.80668C20.4284 8.05237 17.5841 8.05237 15.8298 9.80668L9.81178 15.8247Z" fill={color} />
  </svg>
);

const IcoMicrophone = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 3C8.20507 3 6.75 4.45507 6.75 6.25V8.25C6.75 10.0449 8.20507 11.5 10 11.5C11.7949 11.5 13.25 10.0449 13.25 8.25V6.25C13.25 4.45507 11.7949 3 10 3ZM11.75 8.25C11.75 9.2165 10.9665 10 10 10C9.0335 10 8.25 9.2165 8.25 8.25V6.25C8.25 5.2835 9.0335 4.5 10 4.5C10.9665 4.5 11.75 5.2835 11.75 6.25V8.25Z" fill={color} />
    <path d="M5.5 8C5.5 7.58579 5.16421 7.25 4.75 7.25C4.33579 7.25 4 7.58579 4 8V8.25C4 11.3097 6.29027 13.8345 9.25 14.2036V15.75H8C7.58579 15.75 7.25 16.0858 7.25 16.5C7.25 16.9142 7.58579 17.25 8 17.25H12C12.4142 17.25 12.75 16.9142 12.75 16.5C12.75 16.0858 12.4142 15.75 12 15.75H10.75V14.2036C13.7097 13.8345 16 11.3097 16 8.25V8C16 7.58579 15.6642 7.25 15.25 7.25C14.8358 7.25 14.5 7.58579 14.5 8V8.25C14.5 10.7353 12.4853 12.75 10 12.75C7.51472 12.75 5.5 10.7353 5.5 8.25V8Z" fill={color} />
  </svg>
);

// Paper plane — drawn in the source's 32-viewBox space (sits inside the
// 32px send circle).
const IcoSendPlane = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.0083 15.6103L8.99879 10.8607C8.64381 10.0216 9.50418 9.18368 10.3336 9.56067L22.4972 15.0896C23.2788 15.4449 23.2788 16.5551 22.4972 16.9103L10.3336 22.4393C9.50418 22.8163 8.64381 21.9783 8.99878 21.1393L11.0083 16.3896C11.1136 16.1405 11.1136 15.8594 11.0083 15.6103ZM12.3897 15.0259L10.8796 11.4566L20.8751 16L10.8796 20.5434L12.3897 16.9741C12.4209 16.9004 12.4483 16.8256 12.4721 16.75H16.25C16.6642 16.75 17 16.4142 17 16C17 15.5858 16.6642 15.25 16.25 15.25H12.4722C12.4484 15.1743 12.4209 15.0995 12.3897 15.0259Z" fill={color} />
  </svg>
);

const IcoThumbsUp = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.539 14.5703C11.1349 14.6037 9.7416 14.317 8.46479 13.7318L8.1577 13.591C7.79065 13.4228 7.39966 13.3153 7 13.2719V8.0491C7.05159 8.01929 7.10156 7.98633 7.14961 7.95029C8.43643 6.98517 9.31813 5.57715 9.62537 4.00021C10.4506 4.0142 11.0897 4.73316 11.003 5.55745L10.8704 6.8168C10.7616 7.85007 11.5718 8.75 12.6108 8.75H14.2052C14.9635 8.75 15.5471 9.41965 15.4435 10.1708L15.1058 12.619C14.955 13.7122 14.0337 14.5347 12.9304 14.561L12.539 14.5703ZM5.5 8.25H4.5V13.25H5.5V8.25ZM7.83981 15.0954C9.32366 15.7755 10.9429 16.1087 12.5747 16.0699L12.9662 16.0605C14.8048 16.0168 16.3404 14.646 16.5917 12.824L16.9294 10.3758C17.1573 8.72324 15.8734 7.25 14.2052 7.25H12.6108C12.4624 7.25 12.3466 7.12144 12.3622 6.97383L12.4947 5.71448C12.6756 3.99638 11.3284 2.5 9.60085 2.5H9.23673C8.73718 2.5 8.30911 2.85725 8.21975 3.34874L8.16468 3.65165C7.93973 4.88883 7.25589 5.99543 6.25 6.75H4.25C3.55964 6.75 3 7.30964 3 8V13.5C3 14.1904 3.55964 14.75 4.25 14.75H6.59525C6.91882 14.75 7.23858 14.8198 7.53272 14.9546L7.83981 15.0954Z" fill={color} />
  </svg>
);

const IcoThumbsDown = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.1602 4.90431C10.6763 4.22421 9.05709 3.89095 7.42527 3.9298L7.03385 3.93912C5.19515 3.9829 3.65958 5.35371 3.40828 7.17567L3.07059 9.62391C2.84265 11.2764 4.12663 12.7497 5.7948 12.7497H7.38921C7.53764 12.7497 7.65337 12.8782 7.63784 13.0258L7.50527 14.2852C7.32442 16.0033 8.67156 17.4997 10.3991 17.4997H10.7633C11.2628 17.4997 11.6909 17.1424 11.7802 16.6509L11.8353 16.348C12.0603 15.1108 12.7441 14.0042 13.75 13.2497H15.75C16.4404 13.2497 17 12.69 17 11.9997V6.49967C17 5.80931 16.4404 5.24967 15.75 5.24967L13.4048 5.24967C13.0812 5.24967 12.7614 5.17988 12.4673 5.04506L12.1602 4.90431ZM7.46097 5.42938C8.8651 5.39595 10.2584 5.68271 11.5352 6.26791L11.8423 6.40866C12.2093 6.57689 12.6003 6.68437 13 6.72776L13 11.9506C12.9484 11.9804 12.8984 12.0133 12.8504 12.0494C11.5636 13.0145 10.6819 14.4225 10.3746 15.9995C9.54941 15.9855 8.91026 15.2665 8.99703 14.4422L9.1296 13.1829C9.23836 12.1496 8.42819 11.2497 7.38921 11.2497H5.7948C5.03654 11.2497 4.45291 10.58 4.55652 9.82887L4.89421 7.38063C5.04499 6.28745 5.96633 5.46497 7.06955 5.4387L7.46097 5.42938ZM14.5 11.7497H15.5V6.74967H14.5L14.5 11.7497Z" fill={color} />
  </svg>
);

const IcoDuplicate = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.75 8.5C9.16421 8.5 9.5 8.83579 9.5 9.25V10.5H10.75C11.1642 10.5 11.5 10.8358 11.5 11.25C11.5 11.6642 11.1642 12 10.75 12H9.5V13.25C9.5 13.6642 9.16421 14 8.75 14C8.33579 14 8 13.6642 8 13.25V12H6.75C6.33579 12 6 11.6642 6 11.25C6 10.8358 6.33579 10.5 6.75 10.5H8V9.25C8 8.83579 8.33579 8.5 8.75 8.5Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 3.5C7.31198 3.5 6.13175 4.60376 6.0103 6.0103C4.60376 6.13175 3.5 7.31198 3.5 8.75V13.75C3.5 15.2688 4.73122 16.5 6.25 16.5H11.25C12.688 16.5 13.8682 15.3962 13.9897 13.9897C15.3962 13.8683 16.5 12.688 16.5 11.25V6.25C16.5 4.73122 15.2688 3.5 13.75 3.5H8.75ZM11.25 6H7.525C7.64082 5.42944 8.14526 5 8.75 5H13.75C14.4404 5 15 5.55964 15 6.25V11.25C15 11.8547 14.5706 12.3592 14 12.475V8.75C14 7.23122 12.7688 6 11.25 6ZM6.25 7.5C5.55964 7.5 5 8.05964 5 8.75V13.75C5 14.4404 5.55964 15 6.25 15H11.25C11.9404 15 12.5 14.4404 12.5 13.75V8.75C12.5 8.05964 11.9404 7.5 11.25 7.5H6.25Z" fill={color} />
  </svg>
);

const IcoDelete = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M11.5001 8.25C11.9143 8.25 12.2501 8.58579 12.2501 9V13.25C12.2501 13.6642 11.9143 14 11.5001 14C11.0858 14 10.7501 13.6642 10.7501 13.25V9C10.7501 8.58579 11.0858 8.25 11.5001 8.25Z" fill={color} />
    <path d="M9.25006 9C9.25006 8.58579 8.91427 8.25 8.50006 8.25C8.08585 8.25 7.75006 8.58579 7.75006 9V13.25C7.75006 13.6642 8.08585 14 8.50006 14C8.91427 14 9.25006 13.6642 9.25006 13.25V9Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.25 5.25C7.25 3.73122 8.48122 2.5 10 2.5C11.5188 2.5 12.75 3.73122 12.75 5.25H15.7501C16.1643 5.25 16.5001 5.58579 16.5001 6C16.5001 6.41421 16.1643 6.75 15.7501 6.75H15L14.9999 12.2001C14.9998 13.8802 14.9998 14.7203 14.6728 15.362C14.3852 15.9265 13.9262 16.3854 13.3618 16.673C12.72 17 11.88 17 10.1998 17H9.80005C8.11984 17 7.27974 17 6.63799 16.673C6.07349 16.3854 5.61455 15.9264 5.32693 15.3619C4.99995 14.7202 4.99997 13.8801 5 12.1999L5.00011 6.75H4.25006C3.83585 6.75 3.50006 6.41421 3.50006 6C3.50006 5.58579 3.83585 5.25 4.25006 5.25H7.25ZM8.75 5.25C8.75 4.55964 9.30964 4 10 4C10.6904 4 11.25 4.55964 11.25 5.25H8.75ZM6.50013 6.75H13.5L13.4998 12.2001C13.4998 13.0649 13.4986 13.6233 13.4639 14.0483C13.4306 14.4558 13.3741 14.6068 13.3363 14.681C13.1925 14.9632 12.963 15.1927 12.6808 15.3365C12.6066 15.3743 12.4555 15.4308 12.048 15.4641C11.623 15.4988 11.0646 15.5 10.1998 15.5H9.80005C8.93519 15.5 8.37677 15.4988 7.95175 15.4641C7.54424 15.4308 7.39316 15.3743 7.31899 15.3365C7.03674 15.1927 6.80727 14.9632 6.66346 14.681C6.62567 14.6068 6.56916 14.4557 6.53587 14.0482C6.50115 13.6232 6.5 13.0648 6.50002 12.1999L6.50013 6.75Z" fill={color} />
  </svg>
);

const IcoArchive = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.25 10.75C8.25 10.3358 8.58579 10 9 10H11C11.4142 10 11.75 10.3358 11.75 10.75C11.75 11.1642 11.4142 11.5 11 11.5H9C8.58579 11.5 8.25 11.1642 8.25 10.75Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.25 3.5C4.2835 3.5 3.5 4.2835 3.5 5.25V7.25C3.5 7.84469 3.79663 8.37009 4.25 8.68633V13.75C4.25 15.2688 5.48122 16.5 7 16.5H13C14.5188 16.5 15.75 15.2688 15.75 13.75V8.68633C16.2034 8.37009 16.5 7.84469 16.5 7.25V5.25C16.5 4.2835 15.7165 3.5 14.75 3.5H5.25ZM14.25 9H5.75V13.75C5.75 14.4404 6.30964 15 7 15H13C13.6904 15 14.25 14.4404 14.25 13.75V9ZM5 5.25C5 5.11193 5.11193 5 5.25 5H14.75C14.8881 5 15 5.11193 15 5.25V7.25C15 7.38807 14.8881 7.5 14.75 7.5H5.25C5.11193 7.5 5 7.38807 5 7.25V5.25Z" fill={color} />
  </svg>
);

// Three-dot overflow (matches the header/cell "…" glyph)
const IcoDots = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10Z" fill={color} />
    <path d="M11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10Z" fill={color} />
    <path d="M15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" fill={color} />
  </svg>
);

// Menu-row glyphs (Polaris-style 20px strokes) for the chat action menus.
const IcoEye = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2.8 10s2.4-4.5 7.2-4.5S17.2 10 17.2 10s-2.4 4.5-7.2 4.5S2.8 10 2.8 10Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.1" stroke={color} strokeWidth="1.4" />
  </svg>
);

const IcoEdit = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M14.6659 3.60354C14.8611 3.40828 15.1777 3.40828 15.373 3.60354L16.4337 4.6642C16.6289 4.85946 16.6289 5.17604 16.4337 5.37131L15.4765 6.32842L13.7088 4.56065L14.6659 3.60354Z" fill={color} />
    <path d="M13.0017 5.26776L14.7694 7.03553L10.9388 10.8661C10.58 11.225 10.0982 11.434 9.59095 11.4508L8.81894 11.4764C8.67442 11.4812 8.55599 11.3628 8.56078 11.2183L8.5864 10.4462C8.60322 9.93903 8.81224 9.45719 9.17108 9.09834L13.0017 5.26776Z" fill={color} />
    <path d="M5 7.24999C5 6.00734 6.00736 4.99999 7.25 4.99999H9.08C9.49421 4.99999 9.83 4.6642 9.83 4.24999C9.83 3.83577 9.49421 3.49999 9.08 3.49999H7.25C5.17893 3.49999 3.5 5.17892 3.5 7.24999V12.75C3.5 14.8211 5.17893 16.5 7.25 16.5H12.75C14.8211 16.5 16.5 14.8211 16.5 12.75V10.92C16.5 10.5058 16.1642 10.17 15.75 10.17C15.3358 10.17 15 10.5058 15 10.92V12.75C15 13.9926 13.9926 15 12.75 15H7.25C6.00736 15 5 13.9926 5 12.75V7.24999Z" fill={color} />
  </svg>
);

const IcoShare = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3v9M10 3 7.2 5.8M10 3l2.8 2.8" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 10.5v3.75c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V10.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoCheckSquare = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3.7" y="3.7" width="12.6" height="12.6" rx="2.3" stroke={color} strokeWidth="1.4" />
    <path d="m7.3 10.2 1.9 1.9 3.5-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoGlobe = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="6.8" stroke={color} strokeWidth="1.4" />
    <path d="M3.2 10h13.6M10 3.2c-1.8 1.9-2.7 4.2-2.7 6.8s.9 4.9 2.7 6.8c1.8-1.9 2.7-4.2 2.7-6.8s-.9-4.9-2.7-6.8Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const IcoGear = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.2" stroke={color} strokeWidth="1.4" />
    <path d="M10 3.2 11 5l2-.4 1.4 1.4-.4 2 1.8 1-0 1.9-1.8 1 .4 2L13 15.4l-2-.4-1 1.8-1.9 0-1-1.8-2 .4L3.7 14l.4-2-1.8-1 0-1.9 1.8-1-.4-2L5.1 4.6l2 .4 1-1.8 1.9 0Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IcoFeedback = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M17.2 2.8 8.6 11.4M17.2 2.8l-5.5 14.7a.45.45 0 0 1-.84.02L8.6 11.4m8.6-8.6L2.5 8.3a.45.45 0 0 0 .02.84l6.08 2.26" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IcoDownload = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M17.2222 5.84419C17.2222 6.30442 16.8491 6.67752 16.3889 6.67752C15.9287 6.67752 15.5556 6.30442 15.5556 5.84419V5.27752C15.5556 4.81728 15.1825 4.44419 14.7222 4.44419L5.27778 4.44419C4.81754 4.44419 4.44444 4.81728 4.44444 5.27752V5.84419C4.44444 6.30442 4.07135 6.67752 3.61111 6.67752C3.15087 6.67752 2.77778 6.30442 2.77778 5.84419V5.27752C2.77778 3.89681 3.89707 2.77752 5.27778 2.77752H14.7222C16.1029 2.77752 17.2222 3.89681 17.2222 5.27752V5.84419Z" fill={color} />
    <path d="M10.8333 7.23307C10.8333 6.77284 10.4602 6.39974 10 6.39974C9.53976 6.39974 9.16667 6.77284 9.16667 7.23307V14.6657L7.25592 12.7549C6.93049 12.4295 6.40285 12.4295 6.07741 12.7549C5.75197 13.0804 5.75197 13.608 6.07741 13.9334L9.41074 17.2668C9.73618 17.5922 10.2638 17.5922 10.5893 17.2668L13.9226 13.9334C14.248 13.608 14.248 13.0804 13.9226 12.7549C13.5972 12.4295 13.0695 12.4295 12.7441 12.7549L10.8333 14.6657L10.8333 7.23307Z" fill={color} />
  </svg>
);

const IcoPlay = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.375 8.48419C16.5417 9.15776 16.5417 10.8417 15.375 11.5153L7.875 15.8454C6.70833 16.519 5.25 15.677 5.25 14.3299L5.25 5.6696C5.25 4.32245 6.70833 3.48048 7.875 4.15406L15.375 8.48419ZM14.625 10.2162C14.7917 10.12 14.7917 9.87945 14.625 9.78322L7.125 5.4531C6.95833 5.35687 6.75 5.47715 6.75 5.6696L6.75 14.3299C6.75 14.5223 6.95833 14.6426 7.125 14.5464L14.625 10.2162Z" fill={color} />
  </svg>
);

// Small chain-link glyph for source chips.
const IcoLink = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M8.6 11.4a3.2 3.2 0 0 0 4.53 0l2.83-2.83a3.2 3.2 0 1 0-4.53-4.53l-1.2 1.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.4 8.6a3.2 3.2 0 0 0-4.53 0l-2.83 2.83a3.2 3.2 0 1 0 4.53 4.53l1.2-1.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoCheck = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Exported so consumers can compose the panel/cell menus from the same glyphs
// the design uses (select / view / rename / share / archive / delete, plus the
// header-menu language / settings / feedback set).
export const AiChatIcons = {
  select: <IcoCheckSquare />,
  view: <IcoEye />,
  rename: <IcoEdit />,
  share: <IcoShare />,
  archive: <IcoArchive />,
  delete: <IcoDelete />,
  language: <IcoGlobe />,
  settings: <IcoGear />,
  feedback: <IcoFeedback />,
  copy: <IcoDuplicate />,
  download: <IcoDownload />,
};

// ─── Typing-dots keyframe (injected once, à la Skeleton/Btn spinner) ─────────
const TYPING_KEYFRAME_ID = 'nx-ai-chat-typing-keyframe';
function useTypingKeyframe() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(TYPING_KEYFRAME_ID)) return;
    const tag = document.createElement('style');
    tag.id = TYPING_KEYFRAME_ID;
    tag.textContent = `
      @keyframes nxAiChatTyping {
        0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
        30%           { opacity: 1;   transform: translateY(-3px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .nx-ai-chat-typing__dot { animation: none !important; opacity: 0.6; }
      }
    `;
    document.head.appendChild(tag);
  }, []);
}

// ─── AiChatConversation — scrollable message column ──────────────────────────
//
// Fills the panel body and keeps the newest message in view: on any change to
// its children it scrolls to the bottom.
export function AiChatConversation({ children, autoScroll = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!autoScroll || !ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [children, autoScroll]);

  return (
    <div
      ref={ref}
      style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 16,
        padding: '20px 16px',
        fontFamily: FONT,
      }}
    >
      {children}
    </div>
  );
}

// ─── AiChatSuggestionCard — two-line prompt card in the welcome state ────────
//
// Figma "Human" card: #fafafa fill, light border, 12px radius, 8px padding,
// 12px/550 lines. Fires the canonical onSelect via AiChatWelcome.
function AiChatSuggestionCard({ label, description, onClick }) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
      } : undefined}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.background = BG_PAGE; e.currentTarget.style.borderColor = BORDER_DEFAULT; } }}
      onMouseLeave={(e) => { e.currentTarget.style.background = BG_INPUT_FOCUS; e.currentTarget.style.borderColor = BORDER_LIGHT; }}
      onFocus={(e) => { if (onClick) e.currentTarget.style.boxShadow = FOCUS_RING; }}
      onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        background: BG_INPUT_FOCUS,
        border: `1px solid ${BORDER_LIGHT}`,
        borderRadius: RADIUS_LG,
        padding: 8,
        fontSize: 12, fontWeight: 550, lineHeight: '16px', color: TEXT_DEFAULT,
        cursor: onClick ? 'pointer' : 'default',
        outline: 'none', userSelect: 'none',
        transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
        textAlign: 'left',
      }}
    >
      <span>{label}</span>
      {description && <span>{description}</span>}
    </div>
  );
}

// ─── AiChatWelcome — centered empty state ─────────────────────────────────────
//
// Figma: 72px AI logo, "Nexleaf **AI Chat Bot**" (20px, bold product name),
// then a row of two-line suggestion cards. Vertically centered in the panel.
// Suggestions follow the shared item shape ({ id, label, description? }) and
// fire the canonical onSelect(id, item, index) when picked.
export function AiChatWelcome({
  brand = 'Nexleaf',
  title = 'AI Chat Bot',
  suggestions = [],
  onSelect,
}) {
  return (
    <div style={{
      flex: '1 0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 24,
      padding: '16px 0',
      fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <AiLogo size={72} />
        <div style={{ fontSize: 20, lineHeight: '25px', color: TEXT_DEFAULT }}>
          <span style={{ fontWeight: 400 }}>{brand} </span>
          <span style={{ fontWeight: 700 }}>{title}</span>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', padding: '0 16px' }}>
          {suggestions.map((item, index) => {
            const id = getItemId(item, 'AiChatWelcome') ?? String(index);
            return (
              <AiChatSuggestionCard
                key={id}
                label={getItemLabel(item)}
                description={item?.description}
                onClick={onSelect ? () => onSelect(id, item, index) : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── AiChatMessage — one turn of the conversation ────────────────────────────
//
// role="user"       → right-aligned success-green speech bubble with a tail
// role="assistant"  → AiLogo above plain text (simple reply; use
//                     <AiChatResponse> for titled replies with actions)
export function AiChatMessage({ role = 'assistant', children, timestamp }) {
  const isUser = role === 'user';

  const meta = timestamp && (
    <div style={{
      fontSize: 11, fontWeight: 450, color: TEXT_PLACEHOLDER,
      marginTop: 4,
      textAlign: isUser ? 'right' : 'left',
    }}>{timestamp}</div>
  );

  if (isUser) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: FONT }}>
        <div style={{
          position: 'relative',
          maxWidth: 343,
          background: BG_SUCCESS,
          borderRadius: RADIUS_LG,
          padding: '12px 16px',
          fontSize: 14, fontWeight: 450, lineHeight: '20px', color: TEXT_DEFAULT,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {children}
          {/* Speech tail poking out the right edge (Figma "Polygon") */}
          <svg
            aria-hidden="true"
            width={15} height={14} viewBox="0 0 15.14 13.67" fill="none"
            style={{ position: 'absolute', right: -7, bottom: 8, transform: 'rotate(135deg)' }}
          >
            <path d="M5.74839 1.05145C6.5578 -0.350485 8.58133 -0.350485 9.39074 1.05145L14.8543 10.5145C15.6637 11.9165 14.6519 13.6689 13.0331 13.6689H2.10605C0.487226 13.6689 -0.524536 11.9165 0.284874 10.5145L5.74839 1.05145Z" fill={BG_SUCCESS} />
          </svg>
        </div>
        {meta}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', fontFamily: FONT }}>
      <span style={{ flexShrink: 0, display: 'inline-flex' }} aria-hidden="true">
        <AiLogo size={24} />
      </span>
      <div style={{ minWidth: 0, width: '100%' }}>
        <div style={{
          fontSize: 14, fontWeight: 450, lineHeight: '20px', color: TEXT_DEFAULT,
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>{children}</div>
        {meta}
      </div>
    </div>
  );
}

// ─── AiChatResponse — full assistant reply block ──────────────────────────────
//
// Figma "AI Chat Response": logo, optional bold title, body content, then a
// [Copy] [👍] [👎] action row, and — when `followUps` are provided — a divider
// with "Other questions can you ask?" info-chips. Follow-ups use the shared
// item shape and fire onFollowUpSelect(id, item, index).
export function AiChatResponse({
  title,
  children,
  sources = [],
  onSourceSelect,
  onCopy,
  onDownload,
  onLike,
  onDislike,
  copyLabel = 'Copy',
  downloadLabel = 'Download',
  followUps = [],
  followUpsLabel = 'Other questions can you ask?',
  onFollowUpSelect,
}) {
  const hasActions = onCopy || onDownload || onLike || onDislike;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', fontFamily: FONT, width: '100%' }}>
      <span style={{ flexShrink: 0, display: 'inline-flex' }} aria-hidden="true">
        <AiLogo size={24} />
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', color: TEXT_DEFAULT }}>
        {title && (
          <div style={{ fontSize: 13, fontWeight: 650, lineHeight: '20px' }}>{title}</div>
        )}
        <div style={{
          fontSize: 14, fontWeight: 450, lineHeight: '20px',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>{children}</div>
      </div>

      {sources.length > 0 && <AiChatSources sources={sources} onSelect={onSourceSelect} />}

      {hasActions && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {onCopy && (
            <Btn variant="secondary" size="medium" icon={<IcoDuplicate size={16} />} onClick={onCopy}>
              {copyLabel}
            </Btn>
          )}
          {onDownload && (
            <Btn variant="secondary" size="medium" icon={<IcoDownload size={16} />} onClick={onDownload}>
              {downloadLabel}
            </Btn>
          )}
          {onLike && <IconBtn icon={<IcoThumbsUp size={20} />} onClick={onLike} />}
          {onDislike && <IconBtn icon={<IcoThumbsDown size={20} />} onClick={onDislike} />}
        </div>
      )}

      {followUps.length > 0 && (
        <>
          <div style={{ width: '100%', height: 1, background: BORDER_LIGHT }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 13, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>
              {followUpsLabel}
            </div>
            {followUps.map((item, index) => {
              const id = getItemId(item, 'AiChatResponse') ?? String(index);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={onFollowUpSelect ? () => onFollowUpSelect(id, item, index) : undefined}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.96)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
                  onFocus={(e) => { e.currentTarget.style.boxShadow = FOCUS_RING; }}
                  onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                  style={{
                    background: BG_INFO_BADGE,
                    color: TEXT_INFO,
                    border: 'none', borderRadius: RADIUS_SM,
                    padding: '4px 8px',
                    fontFamily: FONT, fontSize: 12, fontWeight: 550, lineHeight: '16px',
                    textAlign: 'left',
                    cursor: onFollowUpSelect ? 'pointer' : 'default',
                    outline: 'none',
                    transition: 'filter 0.12s, box-shadow 0.12s',
                  }}
                >
                  {getItemLabel(item)}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── AiChatTyping — assistant is composing ───────────────────────────────────
export function AiChatTyping({ label = 'AI is thinking' }) {
  useTypingKeyframe();
  return (
    <div role="status" aria-label={label}
      style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: FONT }}>
      <span style={{ flexShrink: 0, display: 'inline-flex' }} aria-hidden="true">
        <AiLogo size={24} />
      </span>
      <span style={{ display: 'inline-flex', gap: 4, padding: '6px 0' }} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="nx-ai-chat-typing__dot"
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: TEXT_SUBDUED,
              animation: `nxAiChatTyping 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </span>
    </div>
  );
}

// ─── AiChatSkeleton — first-load placeholder for the conversation ────────────
//
// Shape-matches a short exchange (user bubble + assistant reply) so the panel
// doesn't reflow when history arrives. Same pulse as every other skeleton.
export function AiChatSkeleton() {
  return (
    <div aria-label="Loading conversation" role="status"
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton width="60%" height={40} radius={RADIUS_LG} ariaLabel={null} />
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Skeleton width={24} height={24} radius={12} ariaLabel={null} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton width="90%" height={12} ariaLabel={null} />
          <Skeleton width="75%" height={12} delay={0.15} ariaLabel={null} />
          <Skeleton width="40%" height={12} delay={0.3} ariaLabel={null} />
        </div>
      </div>
    </div>
  );
}

// ─── AiChatSources — "grounding" chips under a reply ─────────────────────────
//
// Gray link-pills (system Tag) naming where an answer came from. Items follow
// the shared item shape; clicking fires onSelect(id, item, index).
export function AiChatSources({ sources = [], onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontFamily: FONT }}>
      {sources.map((item, index) => {
        const id = getItemId(item, 'AiChatSources') ?? String(index);
        return (
          <Tag
            key={id}
            label={getItemLabel(item)}
            icon={<IcoLink size={14} />}
            onClick={onSelect ? () => onSelect(id, item, index) : undefined}
          />
        );
      })}
    </div>
  );
}

// ─── AiChatMediaCard — image / video / file attachment in a reply ────────────
//
// Figma "Media card" (Polaris MediaCard): white surface, 12px radius,
// shadow-100 edge, media area on top, 16px content with 13/650 title and
// 12/450 description. `type="video"` overlays the play/duration pill;
// `type="file"` renders the red file tile instead of an image.
export function AiChatMediaCard({
  type = 'image',
  src,
  alt = '',
  duration,
  fileLabel = 'PDF',
  title,
  description,
  mediaHeight = 214,
  onOpen,
}) {
  return (
    <div
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={onOpen ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(e); }
      } : undefined}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: BG_SURFACE,
        borderRadius: RADIUS_LG,
        overflow: 'hidden',
        // shadow-100: drop + the shared bevel edge
        boxShadow: `0 1px 0 rgba(26,26,26,0.07), ${HISTORY_CELL_BEVEL}`,
        fontFamily: FONT,
        cursor: onOpen ? 'pointer' : 'default',
        outline: 'none',
      }}
    >
      <div style={{ position: 'relative', height: mediaHeight, background: BG_PAGE }}>
        {type === 'file' ? (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: COLOR_CRITICAL_STRONG,
          }}>
            <span style={{
              fontSize: 44, fontWeight: 800, letterSpacing: 2, lineHeight: 1,
              color: TEXT_ON_PRIMARY, border: `4px solid ${TEXT_ON_PRIMARY}`,
              padding: '10px 24px', borderRadius: 12,
            }}>{fileLabel}</span>
          </div>
        ) : (
          src && <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        {type === 'video' && (
          <span style={{
            position: 'absolute', left: 16, bottom: 16,
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 8px 4px 4px',
            background: 'rgba(0,0,0,0.71)',
            borderRadius: RADIUS_SM,
            color: TEXT_ON_PRIMARY,
            fontSize: 13, fontWeight: 550, lineHeight: '20px',
          }}>
            <IcoPlay size={20} />
            {duration}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT }}>{title}</div>
        {description && (
          <div style={{ fontSize: 12, fontWeight: 450, lineHeight: '16px', color: TEXT_DEFAULT }}>{description}</div>
        )}
      </div>
    </div>
  );
}

// ─── AiChatTable — compact records table inside a reply ──────────────────────
//
// For answers like "3 matching records across 2 facilities": renders the rows
// right in the conversation, in the same card chrome as AiChatMediaCard.
// Columns: { key, label, align? }. Rows: objects keyed by column (values can
// be nodes — e.g. a StatusBadge). The card scrolls horizontally if the columns
// outgrow the 528px panel column. `onRowClick(row, index)` makes rows
// interactive (e.g. open the record).
export function AiChatTable({ columns = [], rows = [], onRowClick, footnote }) {
  return (
    <div style={{
      width: '100%', boxSizing: 'border-box',
      background: BG_SURFACE,
      borderRadius: RADIUS_LG,
      overflow: 'hidden',
      boxShadow: `0 1px 0 rgba(26,26,26,0.07), ${HISTORY_CELL_BEVEL}`,
      fontFamily: FONT,
      whiteSpace: 'normal', /* reset AiChatResponse's pre-wrap body */
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  style={{
                    padding: '8px 12px',
                    background: BG_INPUT_FOCUS,
                    borderBottom: `1px solid ${BORDER_LIGHT}`,
                    fontSize: 12, fontWeight: 550, lineHeight: '16px', color: TEXT_SUBDUED,
                    textAlign: col.align || 'left',
                    whiteSpace: 'nowrap',
                  }}
                >{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.id ?? index}
                onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                onMouseEnter={onRowClick ? (e) => { e.currentTarget.style.background = BG_SURFACE_HOVER; } : undefined}
                onMouseLeave={onRowClick ? (e) => { e.currentTarget.style.background = 'transparent'; } : undefined}
                style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background 0.12s' }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: '8px 12px',
                      borderTop: index === 0 ? 'none' : `1px solid ${BORDER_LIGHTER}`,
                      fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_DEFAULT,
                      textAlign: col.align || 'left',
                      whiteSpace: 'nowrap',
                    }}
                  >{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <div style={{
          padding: '8px 12px',
          borderTop: `1px solid ${BORDER_LIGHT}`,
          fontSize: 12, fontWeight: 450, lineHeight: '16px', color: TEXT_SUBDUED,
        }}>{footnote}</div>
      )}
    </div>
  );
}

// ─── AiChatToast — floating success/critical banner (delete/rename feedback) ─
//
// Portals to the top-right of the viewport (z-toast layer), slides in, and
// auto-dismisses after `duration` ms (default 5s — pass null to keep it up).
// `inline` opts back into in-flow rendering for docs/embedding.
const TOAST_KEYFRAME_ID = 'nx-ai-chat-toast-keyframe';
function useToastKeyframe() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(TOAST_KEYFRAME_ID)) return;
    const tag = document.createElement('style');
    tag.id = TOAST_KEYFRAME_ID;
    tag.textContent = `
      @keyframes nxAiChatToastIn {
        from { transform: translateX(16px); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .nx-ai-chat-toast { animation: none !important; }
      }
    `;
    document.head.appendChild(tag);
  }, []);
}

export function AiChatToast({
  tone = 'success',
  children,
  onDismiss,
  duration = 5000,
  inline = false,
}) {
  useToastKeyframe();

  // Auto-dismiss after `duration` ms. The callback lives in a ref so a parent
  // re-render (new onDismiss identity) doesn't restart the countdown.
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;
  useEffect(() => {
    if (duration == null) return;
    const t = setTimeout(() => dismissRef.current && dismissRef.current(), duration);
    return () => clearTimeout(t);
  }, [duration]);

  const isSuccess = tone === 'success';
  const bg = isSuccess ? BG_SUCCESS : BG_CRITICAL_SOFT;
  const color = isSuccess ? TEXT_SUCCESS : TEXT_CRITICAL;

  const toast = (
    <div
      className="nx-ai-chat-toast"
      role="status"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        boxSizing: 'border-box',
        width: inline ? '100%' : 'auto',
        maxWidth: inline ? undefined : 360,
        padding: '8px 10px',
        background: bg, color,
        borderRadius: RADIUS_SM,
        boxShadow: inline ? 'none' : SHADOW_OVERLAY,
        fontFamily: FONT, fontSize: 12, fontWeight: 550, lineHeight: '16px',
        animation: inline ? 'none' : 'nxAiChatToastIn 0.18s ease-out',
      }}
    >
      <IcoCheck size={16} />
      <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 20, height: 20, padding: 0, flexShrink: 0,
            background: 'transparent', border: 'none', borderRadius: 4,
            color: 'inherit', cursor: 'pointer',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13.9697 15.0303C14.2626 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697L11.0607 10L15.0303 6.03033C15.3232 5.73744 15.3232 5.26256 15.0303 4.96967C14.7374 4.67678 14.2626 4.67678 13.9697 4.96967L10 8.93934L6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L8.93934 10L4.96967 13.9697C4.67678 14.2626 4.67678 14.7374 4.96967 15.0303C5.26256 15.3232 5.73744 15.3232 6.03033 15.0303L10 11.0607L13.9697 15.0303Z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  );

  if (inline || typeof document === 'undefined') return toast;

  return createPortal(
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1200 /* z-toast */ }}>
      {toast}
    </div>,
    document.body,
  );
}

// ─── AiChatProgress — floating "working…" card (e.g. Deleting Chat) ──────────
const SPIN_KEYFRAME_ID = 'nx-ai-chat-spin-keyframe';
function useSpinKeyframe() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(SPIN_KEYFRAME_ID)) return;
    const tag = document.createElement('style');
    tag.id = SPIN_KEYFRAME_ID;
    tag.textContent = '@keyframes nxAiChatSpin { to { transform: rotate(360deg); } }';
    document.head.appendChild(tag);
  }, []);
}

export function AiChatProgress({ label = 'Working…', overlay = true }) {
  useSpinKeyframe();
  const card = (
    <div role="status" aria-label={label} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      padding: '16px 24px',
      background: BG_SURFACE, borderRadius: RADIUS_LG,
      boxShadow: SHADOW_OVERLAY,
      fontFamily: FONT, fontSize: 12, fontWeight: 550, lineHeight: '16px', color: TEXT_DEFAULT,
    }}>
      <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden="true"
        style={{ animation: 'nxAiChatSpin 0.7s linear infinite' }}>
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
        <path d="M10 2a8 8 0 0 1 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {label}
    </div>
  );
  if (!overlay || typeof document === 'undefined') return card;
  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1400,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.2)',
    }}>{card}</div>,
    document.body,
  );
}

// ─── AiChatDeleteChatsDialog — confirm permanent deletion ────────────────────
//
// Figma "Delete Chat": small modal, body copy, [Cancel] [Delete (red)].
// While `deleting`, the floating progress card replaces the modal.
export function AiChatDeleteChatsDialog({
  open,
  count = 1,
  onCancel,
  onConfirm,
  deleting = false,
}) {
  if (deleting) return <AiChatProgress label="Deleting Chat" />;
  return (
    <Modal
      open={open}
      onClose={onCancel}
      size="small"
      title={`Delete ${count} ${count === 1 ? 'Chat' : 'Chats'}`}
      footer={
        <>
          <Btn variant="secondary" size="medium" onClick={onCancel}>Cancel</Btn>
          <Btn variant="destructive" size="medium" onClick={onConfirm}>Delete</Btn>
        </>
      }
    >
      <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>
        Are you sure you want to permanently delete {count === 1 ? 'this chat' : 'these chats'}? This cannot be undone.
      </div>
    </Modal>
  );
}

// ─── AiChatRenameChatDialog — rename a previous conversation ─────────────────
export function AiChatRenameChatDialog({
  open,
  value = '',
  onChange,
  onCancel,
  onSave,
  saving = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      size="small"
      title="Rename Chat"
      footer={
        <>
          <Btn variant="secondary" size="medium" onClick={onCancel}>Cancel</Btn>
          <Btn variant="primary" size="medium" onClick={onSave} loading={saving} disabled={!value.trim()}>Save</Btn>
        </>
      }
    >
      <TextInput
        value={value}
        onChange={(e) => onChange && onChange(typeof e === 'string' ? e : e.target.value)}
        placeholder="Chat name"
        ariaLabel="Chat name"
      />
    </Modal>
  );
}

// ─── AiChatMenu — anchored dropdown of chat actions ──────────────────────────
//
// Portal-rendered fixed dropdown (same pattern as IndexTable's row-action
// menu) built on the system OptionList. `items` follow the shared item shape
// plus `icon` and `tone` ('critical' for Delete). Fires onSelect(id, item,
// index) then closes.
export function AiChatMenu({ open, onClose, anchorRef, items = [], onSelect }) {
  const menuRef = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!open) { setRect(null); return; }
    if (anchorRef?.current) setRect(anchorRef.current.getBoundingClientRect());
  }, [open, anchorRef]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)
        && !(anchorRef?.current && anchorRef.current.contains(e.target))) {
        onClose && onClose();
      }
    }
    function onKey(e) { if (e.key === 'Escape') onClose && onClose(); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, anchorRef]);

  if (!open || !rect || typeof document === 'undefined') return null;

  const menuWidth = 180;
  const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
  const top = Math.min(rect.bottom + 4, window.innerHeight - 8);

  // OptionList has no tone concept — color critical rows the same way
  // IndexTable's row-action menu does (red label + red glyph).
  const options = items.map((item, index) => {
    const critical = item.tone === 'critical';
    const label = getItemLabel(item);
    return {
      id: getItemId(item, 'AiChatMenu') ?? String(index),
      label: critical ? <span style={{ color: COLOR_CRITICAL }}>{label}</span> : label,
      media: item.icon
        ? <span style={{ display: 'inline-flex', color: critical ? COLOR_CRITICAL : TEXT_SUBDUED }}>{item.icon}</span>
        : undefined,
      disabled: item.disabled,
    };
  });

  function handleChange(id) {
    const index = options.findIndex((o) => o.id === id);
    onSelect && onSelect(id, items[index], index);
    onClose && onClose();
  }

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed', top, left, zIndex: 1300,
        width: menuWidth,
        boxShadow: SHADOW_OVERLAY,
        borderRadius: RADIUS_LG,
        background: BG_SURFACE,
      }}
    >
      <OptionList sections={[{ options }]} onChange={handleChange} />
    </div>,
    document.body,
  );
}

// ─── AiChatHistoryCount — "You have N chats" row + Select entry point ─────────
export function AiChatHistoryCount({ count, label, onSelectMode, selectLabel = 'Select' }) {
  const text = label ?? `You have ${count} chats with Nexleaf AI`;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, width: '100%',
      fontFamily: FONT,
    }}>
      <span style={{ fontSize: 13, fontWeight: 650, lineHeight: '20px', color: TEXT_SUBDUED }}>{text}</span>
      {onSelectMode && (
        <Btn variant="ghost" onClick={onSelectMode}>{selectLabel}</Btn>
      )}
    </div>
  );
}

// ─── AiChatHistorySelectBar — bulk-select header (select mode) ────────────────
//
// Replaces the count row while selecting: [☐] "N selected" [archive] [delete]
// spacer [✕ exit].
// The leading checkbox mirrors the selection: checked when everything is
// selected, indeterminate while only some rows are (IndexTable's select-all
// pattern). Pass `totalCount` and it derives the state; an explicit `checked`
// still wins for callers that manage it themselves.
export function AiChatHistorySelectBar({
  selectedCount = 0,
  totalCount,
  checked,
  onToggleAll,
  onArchive,
  onDelete,
  onExit,
}) {
  const derivedChecked = checked !== undefined
    ? checked
    : totalCount > 0 && selectedCount >= totalCount
      ? true
      : selectedCount > 0
        ? 'indeterminate'
        : false;
  const iconBtn = (label, icon, onClick, disabled) => (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, padding: 0,
        background: 'transparent', border: 'none', borderRadius: RADIUS_SM,
        color: disabled ? TEXT_DISABLED : TEXT_SUBDUED,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >{icon}</button>
  );

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 0', width: '100%',
      background: BG_SURFACE, fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Checkbox checked={derivedChecked} onChange={onToggleAll} ariaLabel="Select all chats" />
        <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: TEXT_DEFAULT }}>
          {selectedCount} selected
        </span>
        {onArchive && iconBtn('Archive selected chats', <IcoArchive size={20} />, onArchive, selectedCount === 0)}
        {onDelete && iconBtn('Delete selected chats', <IcoDelete size={20} />, onDelete, selectedCount === 0)}
      </div>
      {onExit && iconBtn('Exit selection', (
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13.9697 15.0303C14.2626 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697L11.0607 10L15.0303 6.03033C15.3232 5.73744 15.3232 5.26256 15.0303 4.96967C14.7374 4.67678 14.2626 4.67678 13.9697 4.96967L10 8.93934L6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L8.93934 10L4.96967 13.9697C4.67678 14.2626 4.67678 14.7374 4.96967 15.0303C5.26256 15.3232 5.73744 15.3232 6.03033 15.0303L10 11.0607L13.9697 15.0303Z" fill="currentColor" />
        </svg>
      ), onExit)}
    </div>
  );
}

// Bevel edge shared with <Cell> (shadow-bevel-100); selected swaps the black
// alphas for primary-blue ones, per the Figma "Selected Chat" cell.
const HISTORY_CELL_BEVEL = [
  'inset 1px 0 0 rgba(0,0,0,0.13)',
  'inset -1px 0 0 rgba(0,0,0,0.13)',
  'inset 0 -1px 0 rgba(0,0,0,0.17)',
  'inset 0 1px 0 rgba(204,204,204,0.5)',
].join(', ');
// Derived from COLOR_PRIMARY (#005bd3) at the bevel alphas.
const HISTORY_CELL_BEVEL_SELECTED = [
  'inset 1px 0 0 rgba(0,91,211,0.2)',
  'inset -1px 0 0 rgba(0,91,211,0.2)',
  'inset 0 -1px 0 rgba(0,91,211,0.25)',
  'inset 0 1px 0 rgba(0,91,211,0.5)',
].join(', ');

// ─── AiChatHistoryCell — one previous conversation ────────────────────────────
//
// White bevel card: bold title + "Last message …" meta + trailing "…" that
// opens an AiChatMenu of `actions`. Hovering (or select mode) floats a
// checkbox off the left edge; `checked` shows the selected blue bevel.
export function AiChatHistoryCell({
  title,
  meta,
  onOpen,
  actions = [],
  onAction,
  selectMode = false,
  checked = false,
  onCheckedChange,
  state, // force 'hover' for docs
}) {
  const [hov, setHov] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dotsRef = useRef(null);

  const hovered = state === 'hover' || hov || menuOpen;
  const showCheckbox = selectMode || ((hovered || checked) && onCheckedChange);

  return (
    <div
      style={{ position: 'relative', width: '100%', fontFamily: FONT }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onClick={onOpen}
        onKeyDown={onOpen ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(e); }
        } : undefined}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', boxSizing: 'border-box',
          padding: 12,
          background: checked || hovered ? BG_SURFACE_HOVER : BG_SURFACE,
          borderRadius: RADIUS_SM,
          boxShadow: checked ? HISTORY_CELL_BEVEL_SELECTED : HISTORY_CELL_BEVEL,
          cursor: onOpen ? 'pointer' : 'default',
          outline: 'none',
          transition: 'background 0.12s, box-shadow 0.12s',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 14, fontWeight: 650, lineHeight: '20px', color: TEXT_DEFAULT,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{title}</div>
          <div style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED }}>{meta}</div>
        </div>

        {actions.length > 0 && (
          <button
            ref={dotsRef}
            type="button"
            aria-label={`Actions for ${typeof title === 'string' ? title : 'chat'}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 24, height: 24, padding: 0, flexShrink: 0,
              background: 'transparent', border: 'none', borderRadius: RADIUS_SM,
              color: TEXT_SUBDUED, cursor: 'pointer',
            }}
          >
            <IcoDots size={20} />
          </button>
        )}
      </div>

      {showCheckbox && (
        <div
          style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={checked}
            onChange={() => onCheckedChange && onCheckedChange(!checked)}
            ariaLabel={`Select ${typeof title === 'string' ? title : 'chat'}`}
          />
        </div>
      )}

      <AiChatMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorRef={dotsRef}
        items={actions}
        onSelect={onAction}
      />
    </div>
  );
}

// ─── AiChatHistoryEmpty — "no chats yet" state ────────────────────────────────
export function AiChatHistoryEmpty({
  message = 'You have not created any chats yet',
  actionLabel = 'Start a New Chat',
  onAction,
  illustration = illoNoteSync,
}) {
  return (
    <div style={{
      flex: '1 0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: '16px 0',
      fontFamily: FONT,
    }}>
      <span
        aria-hidden="true"
        style={{ display: 'inline-flex', width: 100, height: 100 }}
        dangerouslySetInnerHTML={{ __html: illustration }}
      />
      <div style={{ fontSize: 13, fontWeight: 450, lineHeight: '20px', color: TEXT_SUBDUED, textAlign: 'center' }}>
        {message}
      </div>
      {onAction && (
        <Btn variant="secondary" size="medium" onClick={onAction}>{actionLabel}</Btn>
      )}
    </div>
  );
}

// ─── AiChatComposer — message input pinned at the panel foot ─────────────────
//
// Figma footer: [attach] [text field with mic suffix] [green send circle].
// Field chrome follows the shared input spec; the textarea auto-grows up to
// ~4 lines. Enter sends, Shift+Enter adds a line.
export function AiChatComposer({
  value = '',
  onChange,
  onSend,
  onAttach,
  onMic,
  placeholder = 'Ask about your cold chain…',
  disabled = false,
  sending = false,
  footnote = null,
}) {
  const taRef = useRef(null);

  // Auto-grow: reset then track scrollHeight, capped at 4 lines (80px).
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 80)}px`;
  }, [value]);

  const canSend = !disabled && !sending && value.trim().length > 0;

  function send() {
    if (!canSend) return;
    onSend && onSend(value.trim());
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // focus-within field chrome, mirrored from the shared input spec
  function setFieldFocus(el, focused) {
    el.style.borderColor = focused ? BORDER_INPUT_FOCUS : BORDER_INPUT;
    el.style.background = focused ? BG_INPUT_FOCUS : BG_INPUT;
    el.style.boxShadow = focused ? FOCUS_RING : 'none';
  }

  return (
    <div style={{
      flexShrink: 0,
      padding: '16px 16px 24px',
      display: 'flex', flexDirection: 'column', gap: 8,
      fontFamily: FONT,
      background: BG_SURFACE,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        {onAttach && (
          <button
            type="button"
            aria-label="Attach a file"
            disabled={disabled}
            onClick={disabled ? undefined : onAttach}
            onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = BG_PAGE; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, padding: 0, flexShrink: 0,
              background: 'transparent', border: 'none', borderRadius: '50%',
              color: disabled ? TEXT_DISABLED : TEXT_SUBDUED,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'background 0.12s',
            }}
          >
            <IcoAttachment size={32} />
          </button>
        )}

        <div
          onFocusCapture={(e) => setFieldFocus(e.currentTarget, true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFieldFocus(e.currentTarget, false);
          }}
          style={{
            flex: 1, minWidth: 0,
            display: 'flex', alignItems: 'center', gap: 4,
            border: `0.66px solid ${BORDER_INPUT}`,
            background: BG_INPUT,
            borderRadius: RADIUS_SM,
            padding: '6px 12px',
            opacity: disabled ? 0.6 : 1,
            transition: 'border-color 0.12s, background 0.12s, box-shadow 0.12s',
          }}
        >
          <textarea
            ref={taRef}
            rows={1}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            aria-label="Message the AI assistant"
            onChange={(e) => onChange && onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, minWidth: 0, resize: 'none',
              border: 'none', outline: 'none', background: 'transparent',
              fontFamily: FONT, fontSize: 13, fontWeight: 450, lineHeight: '20px',
              color: TEXT_DEFAULT, padding: 0,
              cursor: disabled ? 'not-allowed' : 'text',
            }}
          />
          {onMic && (
            <button
              type="button"
              aria-label="Voice input"
              disabled={disabled}
              onClick={disabled ? undefined : onMic}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, padding: 0, flexShrink: 0,
                background: 'transparent', border: 'none',
                color: disabled ? TEXT_DISABLED : TEXT_SUBDUED,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              <IcoMicrophone size={20} />
            </button>
          )}
        </div>

        {/* Stays AI-green while idle (per design); grays only when the whole
            composer is disabled or a send is in flight. Empty-field clicks
            are guarded no-ops. */}
        <button
          type="button"
          aria-label="Send message"
          aria-disabled={!canSend}
          disabled={disabled || sending}
          onClick={send}
          onFocus={(e) => { e.currentTarget.style.boxShadow = FOCUS_RING; }}
          onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, padding: 0, flexShrink: 0,
            background: (disabled || sending) ? BG_CONTROL_DISABLED : COLOR_AI,
            border: 'none', borderRadius: '50%',
            color: (disabled || sending) ? TEXT_DISABLED : TEXT_ON_PRIMARY,
            cursor: canSend ? 'pointer' : 'default',
            outline: 'none',
            transition: 'background 0.12s, box-shadow 0.12s, filter 0.12s',
          }}
          onMouseEnter={(e) => { if (canSend) e.currentTarget.style.filter = 'brightness(1.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
        >
          <IcoSendPlane size={32} />
        </button>
      </div>

      {footnote && (
        <div style={{
          fontSize: 11, fontWeight: 450, lineHeight: '16px',
          color: TEXT_PLACEHOLDER, textAlign: 'center',
        }}>{footnote}</div>
      )}
    </div>
  );
}
