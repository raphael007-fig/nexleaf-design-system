// ── Nexleaf Design System — MenuDrawer (responsive global navigation) ─────────
// The drawer-first global navigation for mobile and iPad/tablet. It is the
// responsive form of SideNavigation: the SAME nested nav (active parent
// auto-expands, active child highlighted, full keyboard support) rendered inside
// the SlideOver shell (placement="left") so it slides in over a dimmed page and
// replaces overloaded bottom navigation. No nav logic is re-implemented — the
// drawer composes SideNavigation + SlideOver and adds the header (logo + close)
// and footer (Notification / Profile / legal links).
//
//   <MenuDrawer open={open} onClose={close} activeItemId="coldchain" onSelect={go} />

import { SlideOver } from '../SlideOver/SlideOver.jsx';
import { SideNavigation } from '../SideNavigation/SideNavigation.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';
import { Skeleton } from '../Skeleton/Skeleton.jsx';
import { TEXT_DEFAULT, TEXT_SUBDUED } from '../../tokens/index.js';

// Brand wordmark — the same Nexleaf Analytics logo used by the docked side nav
// (ApplicationLayout). Inlined per the project convention (logos are never
// external); the day the brand kit changes, this updates with the others.
export const NexleafFullLogo = ({ height = 44 }) => (
  <svg width={(108 / 44) * height} height={height} viewBox="0 0 108 44" fill="none" role="img" aria-label="Nexleaf Analytics">
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M38.2291 32.1377H39.5862L39.404 31.4924C39.2304 30.9214 39.073 30.3009 38.9158 29.7133H38.8827C38.7422 30.309 38.5848 30.9214 38.4111 31.4924L38.2291 32.1377ZM38.3448 28.9437H39.5035L41.2577 34.3555H40.215L39.8015 32.9075H38.0057L37.5919 34.3555H36.5906L38.3448 28.9437ZM44.3697 28.9437H45.4207L47.0428 31.9227C47.2411 32.2868 47.4233 32.717 47.5971 33.1475H47.63C47.5722 32.5681 47.5061 31.9061 47.5061 31.3104V28.9437H48.4247V34.3555H47.3735L45.7517 31.3765C45.5531 31.0124 45.3712 30.5822 45.1974 30.1517H45.1643C45.2221 30.7144 45.2885 31.3848 45.2885 31.9889V34.3555H44.3698L44.3697 28.9437ZM53.175 32.1377H54.5323L54.3501 31.4924C54.1764 30.9213 54.0192 30.3009 53.862 29.7132H53.8287C53.6882 30.309 53.531 30.9213 53.3572 31.4924L53.175 32.1377ZM53.291 28.9437H54.4496L56.2038 34.3555H55.1611L54.7473 32.9075H52.9517L52.5379 34.3555H51.5366L53.291 28.9437ZM59.3159 28.9437H60.3006V33.5279H62.5351V34.3555H59.3159V28.9437ZM66.8221 32.3529L65.192 28.9437H66.2428L66.8221 30.3173C66.9793 30.7144 67.1365 31.0952 67.302 31.5089H67.3349C67.5088 31.0952 67.6742 30.7144 67.8314 30.3173L68.4107 28.9437H69.437L67.8068 32.3529V34.3555H66.8221V32.3529ZM73.6083 29.7712H72.0527V28.9437H76.1486V29.7713H74.5928V34.3555H73.6083V29.7712ZM79.4923 28.9437H80.4771V34.3555H79.4923V28.9437ZM84.0027 31.6661C84.0027 29.8952 85.1117 28.8443 86.4854 28.8443C87.1635 28.8443 87.7102 29.1589 88.0492 29.5311L87.5279 30.1353C87.2462 29.8622 86.9239 29.705 86.502 29.705C85.641 29.705 85.0122 30.4331 85.0122 31.6414C85.0122 32.8578 85.5837 33.6024 86.4854 33.6024C86.9573 33.6024 87.329 33.4121 87.6274 33.0812L88.1567 33.6687C87.7014 34.19 87.1388 34.4549 86.444 34.4549C85.0871 34.4549 84.0027 33.4619 84.0027 31.6661ZM91.1282 33.6604L91.6575 33.015C92.0467 33.3874 92.5847 33.6024 93.1059 33.6024C93.702 33.6024 94.0331 33.3294 94.0331 32.9156C94.0331 32.4854 93.6853 32.3447 93.1967 32.1377L92.4605 31.815C91.9225 31.5917 91.3686 31.1696 91.3686 30.3836C91.3686 29.5147 92.1294 28.8442 93.1887 28.8442C93.8429 28.8442 94.4462 29.1092 94.8687 29.5147L94.3387 30.1601C93.9997 29.8704 93.6025 29.705 93.1887 29.705C92.6841 29.705 92.361 29.9366 92.361 30.3257C92.361 30.7394 92.7669 30.8883 93.2134 31.0786L93.9416 31.3765C94.587 31.6495 95.0343 32.055 95.0343 32.8412C95.0343 33.7184 94.306 34.4549 93.0813 34.4549C92.3364 34.4549 91.6416 34.1817 91.1282 33.6604Z" fill="#4D5054"/>
    <path d="M36.6072 14.05H38.0357L41.7495 20.5413C42.1462 21.2398 42.5112 22.0175 42.8763 22.7792H42.9398C42.8604 21.6999 42.7652 20.5573 42.7652 19.478V14.05H44.019V24.4616H42.5907L38.8769 17.9702C38.4801 17.272 38.0992 16.4943 37.75 15.7324H37.6864C37.7659 16.78 37.8611 17.9069 37.8611 18.986V24.4616H36.6072V14.05ZM47.0185 14.05H53.0178V15.177H48.352V18.4306H52.2879V19.5573H48.352V23.3346H53.1768V24.4616H47.0185V14.05ZM57.3824 19.0813L54.5572 14.05H56.0333L57.4457 16.7005C57.6999 17.1768 57.9219 17.6053 58.2553 18.2243H58.3187C58.5884 17.6053 58.7948 17.1768 59.0489 16.7005L60.4295 14.05H61.8422L59.0012 19.1448L62.0327 24.4616H60.5565L59.033 21.6683C58.7633 21.1445 58.4775 20.6207 58.1441 19.986H58.0809C57.7793 20.6207 57.5251 21.1445 57.2554 21.6683L55.7637 24.4616H54.3509L57.3824 19.0812M63.8578 14.05H65.1909V23.3346H69.73V24.4616H63.8578V14.05ZM71.7295 14.05H77.7288V15.177H73.0627V18.4306H76.9989V19.5573H73.0627V23.3346H77.8875V24.4616H71.7295V14.05ZM81.5696 20.224H84.6803L84.1883 18.6527C83.8074 17.4942 83.4743 16.3514 83.1408 15.1453H83.0775C82.76 16.3514 82.4269 17.4942 82.0616 18.6527L81.5696 20.224ZM82.3791 14.05H83.9026L87.4103 24.4616H85.9975L85.0137 21.3032H81.2206L80.2206 24.4616H78.8715L82.3791 14.05ZM89.0446 14.05H95.0437V15.177H90.3783V18.6844H94.346V19.8113H90.3783V24.4616H89.0446V14.05Z" fill="#40BA5B"/>
  </svg>
);

// Leaf-only brand mark — the same leaf as NexleafFullLogo, without the wordmark.
// Used in the compact top bar (mobile / tablet) where the wordmark won't fit.
export const NexleafIconLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" role="img" aria-label="Nexleaf">
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M24.2226 16.5508H20.6257C19.4526 16.5508 18.5007 17.5023 18.5007 18.6761V22.2722C18.5007 23.4464 19.4526 24.3982 20.6257 24.3982H24.2226C25.3961 24.3982 26.348 23.4464 26.348 22.2722V18.6761C26.348 17.5023 25.3961 16.5508 24.2226 16.5508ZM21.0828 26.5663C21.0828 26.7348 20.945 26.8725 20.7764 26.8725H19.9581C19.7899 26.8725 19.6521 26.7348 19.6521 26.5663V25.7481C19.6521 25.5796 19.7898 25.4419 19.9581 25.4419H20.7764C20.945 25.4419 21.0828 25.5796 21.0828 25.7481V26.5663ZM23.0987 26.5663C23.0987 26.7348 22.9611 26.8725 22.7924 26.8725H21.9744C21.8058 26.8725 21.6681 26.7348 21.6681 26.5663V25.7481C21.6681 25.5796 21.8058 25.4419 21.9744 25.4419H22.7924C22.9611 25.4419 23.0987 25.5796 23.0987 25.7481V26.5663ZM21.0828 28.5607C21.0828 28.7292 20.945 28.8671 20.7764 28.8671H19.9581C19.7899 28.8671 19.6521 28.7292 19.6521 28.5607V27.7425C19.6521 27.5741 19.7898 27.4363 19.9581 27.4363H20.7764C20.945 27.4363 21.0828 27.5741 21.0828 27.7425V28.5607ZM23.0987 28.5607C23.0987 28.7292 22.9611 28.8671 22.7924 28.8671H21.9744C21.8058 28.8671 21.6681 28.7292 21.6681 28.5607V27.7425C21.6681 27.5741 21.8058 27.4363 21.9744 27.4363H22.7924C22.9611 27.4363 23.0987 27.5741 23.0987 27.7425V28.5607ZM25.071 28.5607C25.071 28.7292 24.9333 28.8671 24.7647 28.8671H23.9467C23.7781 28.8671 23.6404 28.7292 23.6404 28.5607V27.7425C23.6404 27.5741 23.7781 27.4363 23.9467 27.4363H24.7647C24.9333 27.4363 25.071 27.5741 25.071 27.7425V28.5607ZM23.0987 30.5331C23.0987 30.7015 22.9611 30.8393 22.7924 30.8393H21.9744C21.8058 30.8393 21.6681 30.7015 21.6681 30.5331V29.7148C21.6681 29.5464 21.8058 29.4086 21.9744 29.4086H22.7924C22.9611 29.4086 23.0987 29.5464 23.0987 29.7148V30.5331Z" fill="white"/>
  </svg>
);

// ── Footer icons (small inline SVG, 18px) ─────────────────────────────────────
const FIco = ({ d, size = 18, color = TEXT_SUBDUED }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">{d(color)}</svg>
);
const IcoShield = (c) => <path d="M10 3 5 5v4c0 3 2 5.5 5 6.5 3-1 5-3.5 5-6.5V5l-5-2Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />;
const IcoGrid = (c) => <><rect x="4" y="4" width="5" height="5" rx="1" stroke={c} strokeWidth="1.3" /><rect x="11" y="4" width="5" height="5" rx="1" stroke={c} strokeWidth="1.3" /><rect x="4" y="11" width="5" height="5" rx="1" stroke={c} strokeWidth="1.3" /><rect x="11" y="11" width="5" height="5" rx="1" stroke={c} strokeWidth="1.3" /></>;
const IcoBook = (c) => <path d="M5 4h7a2 2 0 0 1 2 2v10H7a2 2 0 0 0-2 2V4Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />;

// ── Default ColdTrace navigation tree ─────────────────────────────────────────
// Filled icons (system standard) via PolarisIconImg — identical to the docked
// SideNavigation in ApplicationLayout. Inventory is the nested parent whose
// children also drive the Secondary-page title switcher.
export const COLDTRACE_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" /> },
  { id: 'health-status', label: 'Health Status', icon: <PolarisIconImg name="HeartFilledIcon" size={20} color="#303030" /> },
  {
    id: 'inventory', label: 'Inventory', icon: <PolarisIconImg name="InventoryFilledIcon" size={20} color="#303030" />,
    children: [
      { id: 'coldchain', label: 'ColdChain Equipment' },
      { id: 'rtmds', label: 'RTMDs' },
      { id: 'solar', label: 'Solar Equipment' },
      { id: 'passive', label: 'Passive Equipment' },
      { id: 'oxygen', label: 'Oxygen Equipment' },
      { id: 'lab', label: 'Lab Equipment' },
      { id: 'general', label: 'General Equipment' },
    ],
  },
  { id: 'spare-part', label: 'Spare Part', icon: <PolarisIconImg name="CartFilledIcon" size={20} color="#303030" /> },
  { id: 'performance', label: 'Performance', icon: <PolarisIconImg name="GaugeFilledIcon" size={20} color="#303030" /> },
  { id: 'electrification', label: 'Electrification', icon: <PolarisIconImg name="FlashIcon" size={20} color="#303030" /> },
];

// ── Loading skeleton — one nav row (icon block + text line) ───────────────────
// Mirrors a SideNavigation touch row: a ~20px leading icon block and a single
// text line whose width varies per row so the placeholder reads as a list (not
// a stack of identical bars). Sized + padded like the real 44px touch rows so
// the drawer doesn't reflow when the live nav arrives.
function SkeletonNavRow({ width }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      minHeight: 44, padding: '0 16px',
    }}>
      <Skeleton width={20} height={20} radius={6} ariaLabel={null} />
      <Skeleton width={width} height={12} ariaLabel={null} />
    </div>
  );
}

function LegalLink({ icon, label, href }) {
  return (
    <a href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 13, fontWeight: 450, color: TEXT_SUBDUED, textDecoration: 'none',
      fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
    }}>
      {icon}{label}
    </a>
  );
}

export function MenuDrawer({
  open,
  onClose,
  items = COLDTRACE_NAV_ITEMS,
  activeItemId,
  onSelect,
  logo = <NexleafFullLogo height={44} />,
  footer,
  onNotification,
  onProfile,
  // Which Secondary-tier items the drawer surfaces. Driven by the top bar: an
  // item only appears here once it has overflowed OUT of the bar (see
  // topBarOverflowForWidth) — so the two stay in sync and never duplicate a
  // control. Defaults to both for standalone use (no top bar present).
  secondaryVisible = ['notification', 'profile'],
  legalLinks = [
    { label: 'Privacy Policy', href: '#', icon: <FIco d={IcoShield} /> },
    { label: 'Nexleaf Analytics', href: '#', icon: <FIco d={IcoGrid} /> },
    { label: 'ColdTrace Terms of Service', href: '#', icon: <FIco d={IcoBook} /> },
  ],
  width = 'min(86vw, 320px)',
  // Render shape-matching skeleton nav rows in place of the live navigation
  // (the list is still loading). The drawer chrome — logo header + footer area —
  // stays intact so the panel doesn't reflow when the real nav arrives.
  loading = false,
}) {
  // SECONDARY tier — Notification + Profile. Rendered as real NavItem rows (same
  // component + states + 44px touch height as the primary list), with filled
  // icons, separated by a divider. Only the items that have dropped out of the
  // top bar are shown (kept in sync via `secondaryVisible`).
  const ALL_SECONDARY = [
    { id: 'notification', label: 'Notification', icon: <PolarisIconImg name="NotificationFilledIcon" size={20} color="#303030" />, onClick: onNotification },
    { id: 'profile', label: 'Profile', icon: <PolarisIconImg name="PersonFilledIcon" size={20} color="#303030" />, onClick: onProfile },
  ];
  const footerItems = ALL_SECONDARY.filter((i) => secondaryVisible.includes(i.id));

  // Legal links — left-aligned (start), each with its icon at the start.
  const legalFooter = legalLinks.length > 0 ? (
    <div style={{
      marginTop: 4, padding: '12px 16px 12px 8px',
      display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '10px 16px',
    }}>
      {legalLinks.map((l) => <LegalLink key={l.label} {...l} />)}
    </div>
  ) : null;

  // ── Loading: same SlideOver shell, skeleton nav in place of the live list ────
  // Seven rows of varied width (matches the default ColdTrace tree length), so
  // the placeholder reads as a navigation list and the panel keeps its height.
  if (loading) {
    return (
      <SlideOver
        open={open}
        onClose={onClose}
        placement="left"
        width={width}
        bodyPadding={0}
        showCloseButton={false}
        panelBackground="#f1f1f1"
        panelRadius={24}
        initialFocus="container"
        ariaLabel="Main menu"
      >
        <div
          style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
          aria-busy="true"
          aria-label="Loading navigation"
        >
          {/* Logo header — same spot as SideNavigation's logo row, kept intact. */}
          <div style={{ flexShrink: 0, padding: '16px', display: 'flex', alignItems: 'center' }}>
            {logo}
          </div>
          {/* Skeleton nav rows — the scrolling middle region. */}
          <div style={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', padding: '8px 0' }}>
            {['62%', '48%', '55%', '40%', '58%', '44%', '50%'].map((w, i) => (
              <SkeletonNavRow key={i} width={w} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, right: 12,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent',
              color: TEXT_SUBDUED, cursor: 'pointer', padding: 0, outline: 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </SlideOver>
    );
  }

  return (
    <SlideOver
      open={open}
      onClose={onClose}
      placement="left"
      width={width}
      bodyPadding={0}
      showCloseButton={false}
      panelBackground="#f1f1f1"
      panelRadius={24}
      initialFocus="container"
      ariaLabel="Main menu"
    >
      {/* The whole drawer IS the SideNavigation surface (one #f1f1f1 background,
          no white header). The logo lives in SideNavigation's own logo row; the
          close button is placed at the right of that row. */}
      <div style={{ position: 'relative', height: '100%' }}>
        <SideNavigation
          items={items}
          activeItemId={activeItemId}
          onSelect={(id) => onSelect?.(id)}
          width="100%"
          touch
          stickyFooter
          logo={logo}
          ariaLabel="Main navigation"
          footerItems={footerItems}
          footer={footer ?? legalFooter}
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          style={{
            position: 'absolute', top: 12, right: 12,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent',
            color: TEXT_SUBDUED, cursor: 'pointer', padding: 0, outline: 'none',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </SlideOver>
  );
}
