import { useState, useMemo } from 'react';
import { siblingsFor, trailFor } from '../../components/SideNavigation/SideNavigation.jsx';
import { AppShell } from '../../components/AppShell/AppShell.jsx';
import { AiChatPanel } from '../../components/Toolbar/Toolbar.jsx';
import { Page } from '../../components/Page/Page.jsx';
import { PolarisIconImg } from '../../components/PolarisIcon/PolarisIcon.jsx';
import { MetricCard } from '../../components/MetricCard/MetricCard.jsx';
import { IndexTable, LinkCell } from '../../components/IndexTable/IndexTable.jsx';
import { Pagination } from '../../components/Pagination/Pagination.jsx';
import { SearchSelectButton } from '../../components/SearchSelect/SearchSelect.jsx';
import { StatusBadge } from '../../components/Badge/Badge.jsx';
import { CardLayoutType6 } from '../../components/Card/Card.jsx';
import { Cell } from '../../components/Cell/Cell.jsx';
import { NavCard } from '../../components/NavCard/NavCard.jsx';
import { COUNTRIES } from '../../foundation/emojis/emojiCatalog.js';
import { useViewport, BP_SM } from '../../foundation/useViewport.js';

// Home grid illustrations — imported raw so they render as true inline SVG
// (no <img>, no icon package). Each artwork is a 100×100 illustration that
// already carries its own circular tinted backdrop.
import illoEquipment from './home-illustrations/equipment-management.svg?raw';
import illoMonitoring from './home-illustrations/monitoring.svg?raw';
import illoTraining from './home-illustrations/training.svg?raw';
import illoReports from './home-illustrations/reports-hub.svg?raw';
import illoFacility from './home-illustrations/facility-management.svg?raw';
import illoForecasting from './home-illustrations/forecasting.svg?raw';
import illoEvents from './home-illustrations/events.svg?raw';
import illoTransport from './home-illustrations/coldtrace-transport.svg?raw';
import illoHealthHub from './home-illustrations/health-tech-hub.svg?raw';

export default {
  title: 'Pages/Application Layout',
  parameters: { layout: 'fullscreen' },
};

// ─── Breakpoints ─────────────────────────────────────────────────────────────
// `md` (>= 768) is the boundary where the side nav can be expanded by the
// user. Below `md`, the rail force-collapses to icon-only so the page body
// keeps enough breathing room. Below `sm` (< 640) the rail is hidden behind
// an overlay-able backdrop and reveals on demand (future variant — for now we
// stay collapsed).
//
// `useViewport` and `BP_SM` are imported from the shared foundation
// (src/foundation/useViewport.js) so layout and IndexTable agree on breakpoints.
// Content grids reflow in pure CSS (auto-fit / flex-wrap), so they no longer
// depend on JS width measurement — `width` is only used for edge padding now.

// ─── Shared logos (inline, never external) ───────────────────────────────────
// Same paths as the SideNavigation stories — duplicated here so the layout
// doesn't reach across folders for two SVG constants. The day the logo
// changes, both copies update from the same brand kit.

const NexleafIconLogo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" role="img" aria-label="Nexleaf">
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M24.2226 16.5508H20.6257C19.4526 16.5508 18.5007 17.5023 18.5007 18.6761V22.2722C18.5007 23.4464 19.4526 24.3982 20.6257 24.3982H24.2226C25.3961 24.3982 26.348 23.4464 26.348 22.2722V18.6761C26.348 17.5023 25.3961 16.5508 24.2226 16.5508ZM21.0828 26.5663C21.0828 26.7348 20.945 26.8725 20.7764 26.8725H19.9581C19.7899 26.8725 19.6521 26.7348 19.6521 26.5663V25.7481C19.6521 25.5796 19.7898 25.4419 19.9581 25.4419H20.7764C20.945 25.4419 21.0828 25.5796 21.0828 25.7481V26.5663ZM23.0987 26.5663C23.0987 26.7348 22.9611 26.8725 22.7924 26.8725H21.9744C21.8058 26.8725 21.6681 26.7348 21.6681 26.5663V25.7481C21.6681 25.5796 21.8058 25.4419 21.9744 25.4419H22.7924C22.9611 25.4419 23.0987 25.5796 23.0987 25.7481V26.5663ZM21.0828 28.5607C21.0828 28.7292 20.945 28.8671 20.7764 28.8671H19.9581C19.7899 28.8671 19.6521 28.7292 19.6521 28.5607V27.7425C19.6521 27.5741 19.7898 27.4363 19.9581 27.4363H20.7764C20.945 27.4363 21.0828 27.5741 21.0828 27.7425V28.5607ZM23.0987 28.5607C23.0987 28.7292 22.9611 28.8671 22.7924 28.8671H21.9744C21.8058 28.8671 21.6681 28.7292 21.6681 28.5607V27.7425C21.6681 27.5741 21.8058 27.4363 21.9744 27.4363H22.7924C22.9611 27.4363 23.0987 27.5741 23.0987 27.7425V28.5607ZM25.071 28.5607C25.071 28.7292 24.9333 28.8671 24.7647 28.8671H23.9467C23.7781 28.8671 23.6404 28.7292 23.6404 28.5607V27.7425C23.6404 27.5741 23.7781 27.4363 23.9467 27.4363H24.7647C24.9333 27.4363 25.071 27.5741 25.071 27.7425V28.5607ZM23.0987 30.5331C23.0987 30.7015 22.9611 30.8393 22.7924 30.8393H21.9744C21.8058 30.8393 21.6681 30.7015 21.6681 30.5331V29.7148C21.6681 29.5464 21.8058 29.4086 21.9744 29.4086H22.7924C22.9611 29.4086 23.0987 29.5464 23.0987 29.7148V30.5331Z" fill="white"/>
    <path d="M22.4044 36.2894C22.5033 36.2894 22.5622 36.2467 22.5622 36.1684C22.5622 36.101 22.5218 36.0513 22.4116 36.0513H22.3088V36.2894H22.4044ZM22.1583 35.9305H22.4373C22.5915 35.9305 22.7274 35.9908 22.7274 36.1614C22.7274 36.2467 22.6723 36.3285 22.5879 36.3567L22.7568 36.6517H22.5879L22.4594 36.4031H22.3088V36.6517H22.1583V35.9305ZM22.9696 36.2999C22.9696 35.966 22.7347 35.7279 22.4262 35.7279C22.1179 35.7279 21.8793 35.966 21.8793 36.2999C21.8793 36.6375 22.1179 36.8685 22.4262 36.8685C22.7347 36.8685 22.9696 36.6375 22.9696 36.2999ZM21.7324 36.2999C21.7324 35.8841 22.0445 35.5999 22.4262 35.5999C22.8044 35.5999 23.1165 35.8841 23.1165 36.2999C23.1165 36.7157 22.8044 37.0001 22.4262 37.0001C22.0445 37.0001 21.7324 36.7157 21.7324 36.2999Z" fill="#4D5054"/>
  </svg>
);

const NexleafFullLogo = ({ height = 44 }) => (
  <svg width={(108 / 44) * height} height={height} viewBox="0 0 108 44" fill="none" role="img" aria-label="Nexleaf Analytics">
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M38.2291 32.1377H39.5862L39.404 31.4924C39.2304 30.9214 39.073 30.3009 38.9158 29.7133H38.8827C38.7422 30.309 38.5848 30.9214 38.4111 31.4924L38.2291 32.1377ZM38.3448 28.9437H39.5035L41.2577 34.3555H40.215L39.8015 32.9075H38.0057L37.5919 34.3555H36.5906L38.3448 28.9437ZM44.3697 28.9437H45.4207L47.0428 31.9227C47.2411 32.2868 47.4233 32.717 47.5971 33.1475H47.63C47.5722 32.5681 47.5061 31.9061 47.5061 31.3104V28.9437H48.4247V34.3555H47.3735L45.7517 31.3765C45.5531 31.0124 45.3712 30.5822 45.1974 30.1517H45.1643C45.2221 30.7144 45.2885 31.3848 45.2885 31.9889V34.3555H44.3698L44.3697 28.9437ZM53.175 32.1377H54.5323L54.3501 31.4924C54.1764 30.9213 54.0192 30.3009 53.862 29.7132H53.8287C53.6882 30.309 53.531 30.9213 53.3572 31.4924L53.175 32.1377ZM53.291 28.9437H54.4496L56.2038 34.3555H55.1611L54.7473 32.9075H52.9517L52.5379 34.3555H51.5366L53.291 28.9437ZM59.3159 28.9437H60.3006V33.5279H62.5351V34.3555H59.3159V28.9437ZM66.8221 32.3529L65.192 28.9437H66.2428L66.8221 30.3173C66.9793 30.7144 67.1365 31.0952 67.302 31.5089H67.3349C67.5088 31.0952 67.6742 30.7144 67.8314 30.3173L68.4107 28.9437H69.437L67.8068 32.3529V34.3555H66.8221V32.3529ZM73.6083 29.7712H72.0527V28.9437H76.1486V29.7713H74.5928V34.3555H73.6083V29.7712ZM79.4923 28.9437H80.4771V34.3555H79.4923V28.9437ZM84.0027 31.6661C84.0027 29.8952 85.1117 28.8443 86.4854 28.8443C87.1635 28.8443 87.7102 29.1589 88.0492 29.5311L87.5279 30.1353C87.2462 29.8622 86.9239 29.705 86.502 29.705C85.641 29.705 85.0122 30.4331 85.0122 31.6414C85.0122 32.8578 85.5837 33.6024 86.4854 33.6024C86.9573 33.6024 87.329 33.4121 87.6274 33.0812L88.1567 33.6687C87.7014 34.19 87.1388 34.4549 86.444 34.4549C85.0871 34.4549 84.0027 33.4619 84.0027 31.6661ZM91.1282 33.6604L91.6575 33.015C92.0467 33.3874 92.5847 33.6024 93.1059 33.6024C93.702 33.6024 94.0331 33.3294 94.0331 32.9156C94.0331 32.4854 93.6853 32.3447 93.1967 32.1377L92.4605 31.815C91.9225 31.5917 91.3686 31.1696 91.3686 30.3836C91.3686 29.5147 92.1294 28.8442 93.1887 28.8442C93.8429 28.8442 94.4462 29.1092 94.8687 29.5147L94.3387 30.1601C93.9997 29.8704 93.6025 29.705 93.1887 29.705C92.6841 29.705 92.361 29.9366 92.361 30.3257C92.361 30.7394 92.7669 30.8883 93.2134 31.0786L93.9416 31.3765C94.587 31.6495 95.0343 32.055 95.0343 32.8412C95.0343 33.7184 94.306 34.4549 93.0813 34.4549C92.3364 34.4549 91.6416 34.1817 91.1282 33.6604Z" fill="#4D5054"/>
    <path d="M36.6072 14.05H38.0357L41.7495 20.5413C42.1462 21.2398 42.5112 22.0175 42.8763 22.7792H42.9398C42.8604 21.6999 42.7652 20.5573 42.7652 19.478V14.05H44.019V24.4616H42.5907L38.8769 17.9702C38.4801 17.272 38.0992 16.4943 37.75 15.7324H37.6864C37.7659 16.78 37.8611 17.9069 37.8611 18.986V24.4616H36.6072V14.05ZM47.0185 14.05H53.0178V15.177H48.352V18.4306H52.2879V19.5573H48.352V23.3346H53.1768V24.4616H47.0185V14.05ZM57.3824 19.0813L54.5572 14.05H56.0333L57.4457 16.7005C57.6999 17.1768 57.9219 17.6053 58.2553 18.2243H58.3187C58.5884 17.6053 58.7948 17.1768 59.0489 16.7005L60.4295 14.05H61.8422L59.0012 19.1448L62.0327 24.4616H60.5565L59.033 21.6683C58.7633 21.1445 58.4775 20.6207 58.1441 19.986H58.0809C57.7793 20.6207 57.5251 21.1445 57.2554 21.6683L55.7637 24.4616H54.3509L57.3824 19.0812M63.8578 14.05H65.1909V23.3346H69.73V24.4616H63.8578V14.05ZM71.7295 14.05H77.7288V15.177H73.0627V18.4306H76.9989V19.5573H73.0627V23.3346H77.8875V24.4616H71.7295V14.05ZM81.5696 20.224H84.6803L84.1883 18.6527C83.8074 17.4942 83.4743 16.3514 83.1408 15.1453H83.0775C82.76 16.3514 82.4269 17.4942 82.0616 18.6527L81.5696 20.224ZM82.3791 14.05H83.9026L87.4103 24.4616H85.9975L85.0137 21.3032H81.2206L80.2206 24.4616H78.8715L82.3791 14.05ZM89.0446 14.05H95.0437V15.177H90.3783V18.6844H94.346V19.8113H90.3783V24.4616H89.0446V14.05Z" fill="#40BA5B"/>
    <path d="M24.2226 16.5508H20.6257C19.4526 16.5508 18.5007 17.5023 18.5007 18.6761V22.2722C18.5007 23.4464 19.4526 24.3982 20.6257 24.3982H24.2226C25.3961 24.3982 26.348 23.4464 26.348 22.2722V18.6761C26.348 17.5023 25.3961 16.5508 24.2226 16.5508ZM21.0828 26.5663C21.0828 26.7348 20.945 26.8725 20.7764 26.8725H19.9581C19.7899 26.8725 19.6521 26.7348 19.6521 26.5663V25.7481C19.6521 25.5796 19.7898 25.4419 19.9581 25.4419H20.7764C20.945 25.4419 21.0828 25.5796 21.0828 25.7481V26.5663ZM23.0987 26.5663C23.0987 26.7348 22.9611 26.8725 22.7924 26.8725H21.9744C21.8058 26.8725 21.6681 26.7348 21.6681 26.5663V25.7481C21.6681 25.5796 21.8058 25.4419 21.9744 25.4419H22.7924C22.9611 25.4419 23.0987 25.5796 23.0987 25.7481V26.5663ZM21.0828 28.5607C21.0828 28.7292 20.945 28.8671 20.7764 28.8671H19.9581C19.7899 28.8671 19.6521 28.7292 19.6521 28.5607V27.7425C19.6521 27.5741 19.7898 27.4363 19.9581 27.4363H20.7764C20.945 27.4363 21.0828 27.5741 21.0828 27.7425V28.5607ZM23.0987 28.5607C23.0987 28.7292 22.9611 28.8671 22.7924 28.8671H21.9744C21.8058 28.8671 21.6681 28.7292 21.6681 28.5607V27.7425C21.6681 27.5741 21.8058 27.4363 21.9744 27.4363H22.7924C22.9611 27.4363 23.0987 27.5741 23.0987 27.7425V28.5607ZM25.071 28.5607C25.071 28.7292 24.9333 28.8671 24.7647 28.8671H23.9467C23.7781 28.8671 23.6404 28.7292 23.6404 28.5607V27.7425C23.6404 27.5741 23.7781 27.4363 23.9467 27.4363H24.7647C24.9333 27.4363 25.071 27.5741 25.071 27.7425V28.5607ZM23.0987 30.5331C23.0987 30.7015 22.9611 30.8393 22.7924 30.8393H21.9744C21.8058 30.8393 21.6681 30.7015 21.6681 30.5331V29.7148C21.6681 29.5464 21.8058 29.4086 21.9744 29.4086H22.7924C22.9611 29.4086 23.0987 29.5464 23.0987 29.7148V30.5331Z" fill="white"/>
    <path d="M22.4044 36.2894C22.5033 36.2894 22.5622 36.2467 22.5622 36.1684C22.5622 36.101 22.5218 36.0513 22.4116 36.0513H22.3088V36.2894H22.4044ZM22.1583 35.9305H22.4373C22.5915 35.9305 22.7274 35.9908 22.7274 36.1614C22.7274 36.2467 22.6723 36.3285 22.5879 36.3567L22.7568 36.6517H22.5879L22.4594 36.4031H22.3088V36.6517H22.1583V35.9305ZM22.9696 36.2999C22.9696 35.966 22.7347 35.7279 22.4262 35.7279C22.1179 35.7279 21.8793 35.966 21.8793 36.2999C21.8793 36.6375 22.1179 36.8685 22.4262 36.8685C22.7347 36.8685 22.9696 36.6375 22.9696 36.2999ZM21.7324 36.2999C21.7324 35.8841 22.0445 35.5999 22.4262 35.5999C22.8044 35.5999 23.1165 35.8841 23.1165 36.2999C23.1165 36.7157 22.8044 37.0001 22.4262 37.0001C22.0445 37.0001 21.7324 36.7157 21.7324 36.2999Z" fill="#4D5054"/>
  </svg>
);

// ─── Equipment Management nav tree (filled icons only, per system standard) ─

const EQUIPMENT_ITEMS = [
  { id: 'home',            label: 'Home',            icon: <PolarisIconImg name="HomeFilledIcon"      size={20} color="#303030" /> },
  { id: 'health',          label: 'Health Status',   icon: <PolarisIconImg name="HeartFilledIcon"     size={20} color="#303030" /> },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <PolarisIconImg name="InventoryFilledIcon" size={20} color="#303030" />,
    children: [
      { id: 'coldchain', label: 'ColdChain Equipment' },
      { id: 'rtmds',     label: 'RTMDs' },
      { id: 'solar',     label: 'Solar Equipment' },
      { id: 'passive',   label: 'Passive Equipment' },
      { id: 'oxygen',    label: 'Oxygen Equipment' },
      { id: 'lab',       label: 'Lab Equipment' },
      { id: 'general',   label: 'General Equipment' },
    ],
  },
  { id: 'sparePart',       label: 'Spare Part',      icon: <PolarisIconImg name="CartFilledIcon"      size={20} color="#303030" /> },
  { id: 'performance',     label: 'Performance',     icon: <PolarisIconImg name="GaugeFilledIcon"     size={20} color="#303030" /> },
  { id: 'electrification', label: 'Electrification', icon: <PolarisIconImg name="FlashIcon"           size={20} color="#303030" /> },
];

// ─── Inline icons used inside the IndexTable's own toolbar ───────────────────
// Filter / Columns are the standard table-toolbar affordances — copied
// verbatim from Equipment Detail so the two pages share one icon vocabulary.

const IcoFilter = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path d="M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z" />
    <path d="M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z" />
    <path d="M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
  </svg>
);

const IcoAdjust = ({ size = 16, color = '#303030' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
    <path fillRule="evenodd" d="M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    <path fillRule="evenodd" d="M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
  </svg>
);

// ─── Status badge ─────────────────────────────────────────────────────────────
// Uses the canonical StatusBadge from Badge.jsx (imported below) so an "Active"
// installation reads identically here and on Equipment Detail, from one source.

// Deterministic status distribution so the demo isn't all "Active". Priority
// is intentional: Decommissioned wins over Faulty wins over Under Maintenance
// wins over Unknown, so the various special states all appear at least once
// in the 49-row dataset.
function statusFor(i) {
  if (i % 11 === 0) return 'Decommissioned';
  if (i % 7 === 0)  return 'Faulty';
  if (i % 5 === 0)  return 'Under Maintenance';
  if (i % 13 === 0) return 'Unknown';
  return 'Active';
}

const HOME_CRUMB = {
  id: 'home',
  label: 'Home',
  icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />,
  iconOnly: true,
};

// ─── HomeLanding — the Home page surface ─────────────────────────────────────
//
// Rendered when activeId === 'home'. There is intentionally NO side rail here:
// Home is a top-level landing surface that shows the breadcrumb only. Each
// section card is an entry point — clicking one calls `onEnter(id)`, which
// flips activeId into the app shell (rail reappears) and grows the breadcrumb
// to Home → Section, tracing exactly where the user entered from.
function HomeCard({ item, onEnter }) {
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  // A group has no page of its own — enter its first child. A leaf enters itself.
  const target = item.children && item.children.length ? item.children[0].id : item.id;
  const active = hov || foc;
  return (
    <button
      type="button"
      onClick={() => onEnter(target)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        textAlign: 'left', width: '100%',
        padding: 16,
        background: '#ffffff',
        border: `1px solid ${active ? '#005bd3' : '#e0e0e0'}`,
        borderRadius: 16,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        boxShadow: active ? '0 0 0 3px rgba(0,91,211,0.12)' : 'none',
        outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40, flexShrink: 0,
        background: '#f1f1f1', borderRadius: 12,
      }}>
        {item.icon}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#303030' }}>{item.label}</span>
        <span style={{ fontSize: 12, fontWeight: 400, color: '#616161' }}>
          {item.children && item.children.length
            ? `${item.children.length} sections`
            : 'Open'}
        </span>
      </span>
    </button>
  );
}

function HomeLanding({ items, homeId, onEnter }) {
  const sections = (items || []).filter((it) => it.id !== homeId);
  return (
    <section aria-label="Home" style={{ paddingTop: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          margin: 0, fontFamily: 'Inter, sans-serif',
          fontSize: 20, fontWeight: 700, color: '#303030',
        }}>
          Welcome back
        </h2>
        <p style={{
          margin: '4px 0 0', fontFamily: 'Inter, sans-serif',
          fontSize: 14, fontWeight: 400, color: '#616161',
        }}>
          Pick a section to get started. Your trail begins here at Home.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 12 }}>
        {sections.map((item) => (
          <HomeCard key={item.id} item={item} onEnter={onEnter} />
        ))}
      </div>
    </section>
  );
}

// ─── Sample table data — full Equipment Detail column set, generated ──────
//
// The Sectioned Layout demo uses the exact column shape Equipment Detail
// Main View uses, including the Solar Panels / Battery LinkCell columns
// with overflow popovers and the inline Inverter link button. Rows are
// generated rather than hand-written so we can dial the row count up to
// 49 (or more) without bloating the file.

const SOLAR_POOL = [
  'Jinko Solar', 'Canadian Solar', 'LONGi Solar', 'Trina Solar', 'JA Solar',
  'REC', 'SunPower', 'Q CELLS', 'Hanwha', 'First Solar',
  'Risen Energy', 'Astronergy', 'GCL', 'Suntech', 'Yingli',
  'ZNShine', 'Talesun', 'Phono Solar', 'Seraphim', 'Tongwei',
  'Akcome',
];
const BATTERY_POOL = [
  'CATL', 'BYD', 'LG Chem', 'Samsung SDI', 'Panasonic',
  'Tesla', 'Pylontech', 'Sonnen', 'Enphase', 'AlphaESS',
];
// Cycle through realistic-sounding installations. Order is intentional —
// the first ten match Equipment Detail's Main View exactly so the two
// demos read as the same dataset; rows 11+ extend with plausible variety.
const FACILITY_POOL = [
  'Coast General Hospital',          // 1
  'Kenyatta National Hospital',      // 2
  'Jaramogi Oginga Odinga Hospital', // 3
  'PGH Nakuru',                      // 4
  'Moi Teaching & Referral Hospital',// 5
  'Malindi Sub-County Hospital',     // 6
  'Pumwani Maternity Hospital',      // 7
  'Starehe Sub-County Hospital',     // 8
  'Malindi District Hospital',       // 9
  'Malindi Level 4 Hospital',        // 10
  'Kisumu County Referral',
  'Nyeri County Hospital',
  'Garissa County Hospital',
  'Bungoma County Hospital',
  'Embu Provincial Hospital',
  'Machakos Level 5 Hospital',
  'Meru Level 5 Hospital',
  'Naivasha Sub-County Hospital',
  'Kakamega County Hospital',
  'Thika Level 5 Hospital',
  'Kericho County Hospital',
  'Kitale County Hospital',
  'Mombasa Polytechnic Health Centre',
  'Kisii Teaching & Referral',
  'Lodwar County Hospital',
];
const REGION_POOL = [
  'Mombasa', 'Nairobi West', 'Kisumu', 'Nakuru', 'Eldoret',
  'Malindi', 'Starehe', 'Nyeri', 'Garissa', 'Machakos',
  'Bungoma', 'Embu', 'Meru', 'Naivasha', 'Kakamega',
  'Thika', 'Kericho', 'Kitale', 'Kisii', 'Lodwar',
];
const SYSTEM_TYPES = ['Hybrid', 'Off-Grid', 'Grid-Tied'];
const INVERTERS    = ['Victron Energy', 'SMA Solar', 'Growatt', 'Huawei', 'Fronius', 'SolarEdge'];
const MONTHS       = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Per-row solar/battery quantities cycle through these patterns so the table
// shows the LinkCell single-item, +N Others, and high-overflow cases together.
const SOLAR_COUNT_CYCLE   = [1, 6, 1, 3, 10, 1, 21, 1, 11, 1];
const BATTERY_COUNT_CYCLE = [1, 1, 3, 1, 1, 6, 1, 10, 1, 1];

const linkItems = (pool, count, start = 0) =>
  Array.from({ length: count }, (_, i) => ({
    label: pool[(start + i) % pool.length],
    href: '#',
  }));

function generateInstallationRows(count) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const id = String(n);
    return {
      id,
      installId:   `DCM-2024-${String(n).padStart(3, '0')}`,
      systemType:  SYSTEM_TYPES[i % SYSTEM_TYPES.length],
      region:      REGION_POOL[i % REGION_POOL.length],
      facility:    FACILITY_POOL[i % FACILITY_POOL.length],
      inverter:    INVERTERS[i % INVERTERS.length],
      solar:       linkItems(SOLAR_POOL,   SOLAR_COUNT_CYCLE[i % SOLAR_COUNT_CYCLE.length],   i % SOLAR_POOL.length),
      battery:     linkItems(BATTERY_POOL, BATTERY_COUNT_CYCLE[i % BATTERY_COUNT_CYCLE.length], i % BATTERY_POOL.length),
      accessories: (i * 3) % 9 + 1,
      status:      statusFor(i),
      date:        `${MONTHS[i % 12]} ${(i * 7) % 28 + 1}, 2024`,
    };
  });
}

const TABLE_ROWS = generateInstallationRows(49);

const TABLE_COLUMNS = [
  { key: 'installId',  label: 'Installation ID',  width: 148, primary: true },
  { key: 'systemType', label: 'System Type',      width: 120 },
  { key: 'region',     label: 'Region',           width: 120 },
  { key: 'facility',   label: 'Facility',         width: 220, subtitle: true },
  { key: 'inverter',   label: 'Inverter',         width: 140, render: (row) => (
    <button
      type="button"
      aria-label={`View inverter ${row.inverter} for ${row.facility}`}
      onClick={() => {}}
      style={{
        background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
        color: '#005bd3', textDecoration: 'underline', fontSize: 13, fontWeight: 450,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {row.inverter}
    </button>
  )},
  { key: 'solar',      label: 'Solar Panels',     width: 180, render: (row) => (
    <LinkCell
      items={row.solar}
      visible={1}
      othersLabel="Others"
      ariaLabel={`Solar panels for ${row.facility}`}
    />
  )},
  { key: 'battery',    label: 'Battery',          width: 160, render: (row) => (
    <LinkCell
      items={row.battery}
      visible={1}
      othersLabel="Others"
      ariaLabel={`Batteries for ${row.facility}`}
    />
  )},
  { key: 'accessories', label: 'Accessories',     width: 108, align: 'right' },
  { key: 'status',      label: 'Status',          width: 160, render: (row) => <StatusBadge status={row.status} /> },
  { key: 'date',        label: 'Installation Date', width: 140 },
];

// Tab definitions. Counts are derived from TABLE_ROWS so they stay in sync
// even if `generateInstallationRows` changes its status distribution.
const TAB_FILTERS = ['__all', 'Active', 'Faulty', 'Under Maintenance', 'Decommissioned'];
const TAB_LABELS  = ['All',    'Active', 'Faulty', 'Under Maintenance', 'Decommissioned'];
function countFor(statusKey) {
  if (statusKey === '__all') return TABLE_ROWS.length;
  return TABLE_ROWS.filter((r) => r.status === statusKey).length;
}

const PAGE_SIZE = 10;

// ─── Region picker options (3-level Province → County → Sub-county tree) ────
// Same tree Equipment Detail Main View uses. Sub-counties are the only
// selectable leaves; province + county checkboxes toggle every leaf below
// them (the SearchSelect component handles that bookkeeping internally).
const REGION_OPTIONS = [
  {
    id: 'coast', label: 'Coast',
    children: [
      { id: 'mombasa-county', label: 'Mombasa County', children: [
        { id: 'mombasa-island', label: 'Mombasa Island' },
        { id: 'kisauni',        label: 'Kisauni' },
        { id: 'likoni',         label: 'Likoni' },
      ] },
      { id: 'kilifi-county', label: 'Kilifi County', children: [
        { id: 'malindi',     label: 'Malindi' },
        { id: 'kilifi-town', label: 'Kilifi Town' },
      ] },
    ],
  },
  {
    id: 'nairobi', label: 'Nairobi',
    children: [
      { id: 'nairobi-county', label: 'Nairobi County', children: [
        { id: 'nairobi-west', label: 'Nairobi West' },
        { id: 'starehe',      label: 'Starehe' },
        { id: 'dagoretti',    label: 'Dagoretti' },
        { id: 'embakasi',     label: 'Embakasi' },
      ] },
    ],
  },
  {
    id: 'rift-valley', label: 'Rift Valley',
    children: [
      { id: 'nakuru-county', label: 'Nakuru County', children: [
        { id: 'nakuru-town', label: 'Nakuru Town' },
        { id: 'naivasha',    label: 'Naivasha' },
      ] },
      { id: 'uasin-gishu-county', label: 'Uasin Gishu County', children: [
        { id: 'eldoret', label: 'Eldoret' },
        { id: 'turbo',   label: 'Turbo' },
      ] },
    ],
  },
  {
    id: 'nyanza', label: 'Nyanza',
    children: [
      { id: 'kisumu-county', label: 'Kisumu County', children: [
        { id: 'kisumu-central', label: 'Kisumu Central' },
        { id: 'kisumu-east',    label: 'Kisumu East' },
      ] },
    ],
  },
];

// ─── Sectioned Layout ────────────────────────────────────────────────────────
//
// Full app shell composed from real design-system primitives:
//   • SideNavigation — fixed left rail, collapses to 56 px (icon-only) by
//     default. Auto-collapses below the `md` breakpoint.
//   • Toolbar — sticky at the top, reserves a `sideNavWidth` slot equal to
//     the rail's current width so the two surfaces share one chrome.
//   • Content area — sits inside the right column with a 16 px gap below
//     the toolbar and 24 / 32 px horizontal insets. Hosts <Page>, MetricCards,
//     and an IndexTable as a realistic example.
//
// Layout strategy: the side nav is `position: fixed` on the left edge, so it
// stays put while the right column scrolls. The right column gets a
// `marginLeft` equal to the current nav width and an `min-width: 0` so the
// IndexTable inside can horizontally scroll without affecting the rail.

function SectionedView({ onGoHome, initialActiveId = 'coldchain' }) {
    const { width } = useViewport();
    // The shell (rail dock / drawer / collapse) is now owned by AppShell.

    // `activeId` is the single source of truth for the whole navigation
    // system: it drives the side rail's selection, the Page header title,
    // AND the breadcrumb trail. There is no separate `trail` state — keeping
    // one source means the three can never drift out of sync.
    //
    //   • SideNavigation  → activeItemId={activeId}
    //   • Page header     → siblingsFor(EQUIPMENT_ITEMS, activeId)
    //   • Breadcrumbs     → trailFor(EQUIPMENT_ITEMS, activeId, { home })
    //
    // `activeId === 'home'` is the special landing case: the side rail is
    // hidden entirely and only the breadcrumb (just "Home") shows.
    const [activeId, setActiveId] = useState(initialActiveId);
    const [country, setCountry]   = useState(
      COUNTRIES.find((c) => c.code === 'KE') || COUNTRIES[0],
    );
    const [chatOpen, setChatOpen] = useState(false);

    const isHome = activeId === 'home';

    // Breadcrumb trail derived from the nav tree. trailFor returns
    // [Home] on the home page, [Home, item] for a top-level page, and
    // [Home, group, page] for a sub-item — exactly "where the user
    // entered from Home" down to the current page.
    const trail = useMemo(
      () => trailFor(EQUIPMENT_ITEMS, activeId, { home: HOME_CRUMB }),
      [activeId],
    );

    // Map a breadcrumb click back onto activeId so the rail + header follow.
    // • Home crumb        → land on the Home page (clears the trail to [Home]).
    // • A group crumb     → that section has no page of its own, so land on
    //                       its first child (the section's default page).
    // • Any leaf crumb    → select it directly.
    // Clicking the last (current) crumb is a no-op inside Breadcrumbs already.
    function handleCrumbSelect(id) {
      // The Home crumb leaves the app shell entirely and returns to the
      // standalone Home Layout surface.
      if (id === HOME_CRUMB.id) { onGoHome(); return; }
      const group = EQUIPMENT_ITEMS.find((it) => it.id === id && it.children);
      if (group) { setActiveId(group.children[0].id); return; }
      setActiveId(id);
    }
    // Side-rail selection. The "Home" rail item also leaves the shell for the
    // Home Layout; everything else just moves the active page.
    function handleNavSelect(id) {
      if (id === HOME_CRUMB.id) { onGoHome(); return; }
      setActiveId(id);
    }
    const [selected, setSelected] = useState(new Set());
    // Active metric tile — null = no filter applied. Click toggles; clicking
    // the active tile clears it. Mirrors Equipment Detail Main View so the
    // interaction behaves identically across pages.
    const [activeMetric, setActiveMetric] = useState(null);
    // Region picker state — array of selected leaf values (sub-county codes).
    // Empty array = no region filter. The SearchSelect component owns the
    // tree-toggle UX; we just hold the result.
    const [region, setRegion] = useState([]);
    // Table-toolbar state. `activeTab` indexes into `TAB_FILTERS`; 0 = "All".
    // Search runs over installId + facility + region + systemType (matches the
    // user's mental "scan the row" model).
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch]       = useState('');
    // Pagination state — page size 10. We reset to page 0 whenever the tab
    // or search query changes so the user doesn't get stranded on an empty
    // page after a filter narrows the dataset.
    const [page, setPage] = useState(0);

    const filteredRows = TABLE_ROWS.filter((r) => {
      const statusKey = TAB_FILTERS[activeTab];
      const matchesTab = statusKey === '__all' || r.status === statusKey;
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || [r.installId, r.facility, r.region, r.systemType]
        .some((v) => String(v).toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
    const safePage   = Math.min(page, totalPages - 1);
    const pageStart  = safePage * PAGE_SIZE;
    const pageEnd    = Math.min(pageStart + PAGE_SIZE, filteredRows.length);
    const pagedRows  = filteredRows.slice(pageStart, pageEnd);

    function handleTabChange(i) {
      if (i === activeTab) return;
      setActiveTab(i);
      setPage(0);
      setSelected(new Set());
    }
    function handleSearchChange(e) {
      setSearch(e.target.value);
      setPage(0);
    }

    return (
      // Unified hybrid shell: docked rail on desktop, MenuDrawer below — same
      // nav tree + activeId drive both, with the breadcrumb/title in sync.
      <AppShell
        navItems={EQUIPMENT_ITEMS}
        activeItemId={activeId}
        onNavSelect={handleNavSelect}
        breadcrumbs={trail}
        onBreadcrumbSelect={handleCrumbSelect}
        level={isHome ? 'primary' : 'secondary'}
        contentWidth="full"
        country={country}
        onAskAi={() => setChatOpen((o) => !o)}
        askAiActive={chatOpen}
      >

        {/* AI Chat panel (kept extra) — toggled by the TopBar's Ask AI button. */}
        <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
          <div style={{ padding: 24, fontSize: 13, color: '#616161' }}>
            AI chat panel content lives here.
          </div>
        </AiChatPanel>

          {/* Page content — three sections matching the Figma frame:
                1. Page header (48 px tall sliver in the design).
                2. Metric row (128 px sliver).
                3. IndexTable (taller — fills remaining viewport).
              Wrapped at `contentMaxWidth` so wider screens don't stretch the
              table to readability-killer lengths. */}
          <div
            aria-labelledby="sectioned-layout-title"
            style={{
              // Top padding is 0 here on purpose. The <Page> primitive has
              // its own 24 px top padding so it provides the visual breath
              // directly under the toolbar; adding an extra `padding-top`
              // on the wrapper would stack two gaps and push the title too
              // far down. Same for the in-section rhythm below.
              //
              // Horizontal padding is intentionally 16 px (12 px on the
              // smallest viewport) — matches the Toolbar's `padding: 0 16px`
              // so the breadcrumb on the left and the avatar on the right
              // sit on the same vertical lines as the page content's left
              // and right edges.
              //
              // No `maxWidth` cap — content fills the full right column so
              // the table, metric grid, and page header all expand on wide
              // screens and the right edge meets the toolbar's right edge.
              padding: width < BP_SM ? '0 12px 32px' : '0 16px 32px',
              boxSizing: 'border-box',
            }}
          >
            <h1 id="sectioned-layout-title" style={{
              position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
              overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
            }}>
              {isHome ? 'Home' : (trail[trail.length - 1]?.label ?? 'ColdChain Equipment')}
            </h1>

            {/* Home landing — breadcrumbs-only surface. Picking a section
                card calls `setActiveId`, which both navigates into the app
                shell (rail reappears) and grows the breadcrumb to
                Home → Section, exactly tracing where the user entered from. */}
            {isHome ? (
              <HomeLanding items={EQUIPMENT_ITEMS} homeId={HOME_CRUMB.id} onEnter={setActiveId} />
            ) : (
            <>
            {/* Sections stack directly — no flex `gap`. The Page primitive's
                built-in 24 px bottom padding spaces it from the metrics, and
                the metrics row carries an explicit `marginBottom: 24` so
                metrics → table matches the same rhythm. Net: all three
                vertical gaps (toolbar→header, header→metrics, metrics→table)
                read as 24 px. */}

            {/* Section 1 — Page header
                Uses the canonical <Page> primitive (the "Header Page"
                component from Components/Navigation). The title disclosure
                is derived from the same nav tree the side rail uses, so
                picking a sibling from the chevron menu updates both the
                rail's `activeItemId` and this page's title in lock-step. */}
            {(() => {
              const disclosure = siblingsFor(EQUIPMENT_ITEMS, activeId);
              if (disclosure) disclosure.onSelect = setActiveId;
              const currentPage = disclosure
                ? disclosure.items.find((it) => it.id === activeId)
                : EQUIPMENT_ITEMS.find((it) => it.id === activeId);
              const pageTitle = currentPage?.label ?? 'ColdChain Equipment';
              return (
                <Page
                  title={pageTitle}
                  titleDisclosure={disclosure}
                  // Region picker sits left of the primary CTA. Wrapped in a
                  // `node` so we can drop any composed control (not just a
                  // plain Btn) into the secondary-actions slot.
                  secondaryActions={[{
                    node: (
                      <SearchSelectButton
                        label="Region"
                        placeholder="Choose Region"
                        // Leading location pin reads as "this picker is
                        // about places," not just a generic dropdown.
                        // 16-px to match Btn's icon slot.
                        leadingIcon={<PolarisIconImg name="LocationIcon" size={16} color="currentColor" />}
                        options={REGION_OPTIONS}
                        value={region}
                        onChange={setRegion}
                        multiple
                      />
                    ),
                  }]}
                  primaryAction={{ content: 'Add Installation', onClick: () => {} }}
                />
              );
            })()}

            {/* Section 2 — Metric tiles. `marginBottom: 24` puts the metrics
                exactly 24 px above the table, matching Page → Metrics (which
                is Page's 24 px bottom padding).
                Tiles are interactive — same shape as Equipment Detail Main
                View: each card carries an `infoTooltip` for the (i) icon,
                a `selected` state driven by `activeMetric`, and an `onClick`
                that toggles selection. Clicking the active tile clears it. */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 12,
              marginBottom: 24,
            }}>
              {[
                { key: 'total',    title: 'Total Installations', metric: '247', badge: { label: '3 Critical',      tone: 'critical'  }, tooltip: 'Total devices with an active installation record.' },
                { key: 'offline',  title: 'Devices Offline',     metric: '12',  badge: { label: '12 Offline',      tone: 'attention' }, tooltip: 'Devices that have not reported in over 24 hours.' },
                { key: 'alerts',   title: 'Active Alerts',       metric: '5',   badge: { label: '2 High Priority', tone: 'critical'  }, tooltip: 'Open alerts requiring immediate attention.' },
                { key: 'requests', title: 'Service Requests',    metric: '23',  badge: { label: '8 Pending',       tone: 'info'      }, tooltip: 'Submitted service requests awaiting resolution.' },
              ].map((card) => (
                <MetricCard
                  key={card.key}
                  title={card.title}
                  metric={card.metric}
                  badge={card.badge}
                  infoTooltip={card.tooltip}
                  selected={activeMetric === card.key}
                  onClick={() => setActiveMetric((prev) => (prev === card.key ? null : card.key))}
                />
              ))}
            </div>

            {/* Section 3 — IndexTable */}
            <IndexTable
                columns={TABLE_COLUMNS}
                rows={pagedRows}
                selectedRows={selected}
                onSelectionChange={setSelected}
                // Status tabs with badge counts. Tab 0 ("All") shows every
                // row; the rest filter by status. Selecting a tab resets
                // pagination + selection so the user lands on page 1 of the
                // newly-filtered dataset.
                tabs={TAB_LABELS.map((label, i) => ({
                  label,
                  badge: countFor(TAB_FILTERS[i]),
                }))}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                // Search runs across installId, facility, region, systemType.
                // `IndexTable` owns the input chrome (icon, placeholder,
                // clear button); we just pass the value + change handler.
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search records…"
                toolbarActions={[
                  { label: 'Filter',  icon: <IcoFilter size={16} />, onClick: () => {} },
                  { label: 'Columns', icon: <IcoAdjust size={16} />, onClick: () => {} },
                ]}
                bulkActions={[
                  { label: 'Export',  onAction: () => {} },
                  { label: 'Archive', onAction: () => {} },
                ]}
                rowActions={[
                  { label: 'View details', onAction: () => {} },
                  { label: 'Edit',         onAction: () => {} },
                  { label: 'Delete',       onAction: () => {}, destructive: true },
                ]}
                emptyState={{
                  heading: 'No installations match this filter',
                  description: 'Try a different status tab or clear the search.',
                }}
                footer={
                  <Pagination
                    type="table"
                    hasPrevious={safePage > 0}
                    hasNext={safePage < totalPages - 1}
                    onPrevious={() => setPage((p) => Math.max(0, p - 1))}
                    onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    label={
                      filteredRows.length === 0
                        ? '0 of 0'
                        : `${pageStart + 1}–${pageEnd} of ${filteredRows.length}`
                    }
                  />
                }
              />
            </>
            )}
          </div>
      </AppShell>
    );
}

// ─── Home Layout ──────────────────────────────────────────────────────────────
//
// The top-level landing surface (Figma "Home / Desktop"). No side rail — the
// top bar shows only the Home breadcrumb. The body is composed entirely from
// existing design-system primitives:
//
//   • CardLayoutType6 — the two header/action cards:
//       – "Quick Action"    (default tone, single Cell entry point)
//       – "Action Required" (critical tone, badge + "View All Issues",
//                             two alert Cells)
//   • Cell      — the rows inside both action cards (icon tile + title +
//                 description + chevron), tinted via `iconTone`.
//   • NavCard   — the 3-column grid of section tiles (layout="home":
//                 centered illustration + title, no description/button).
//   • Toolbar / Breadcrumbs — the same top bar the Sectioned Layout uses.

// Header / cell glyphs — inline SVG (never an icon font, per system rule).
const IcoScanRows = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 6h2M4 10h2M4 14h2M8 6h8M8 10h8M8 14h5"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Alert circle — symmetric, optically balanced next to the small title (the
// triangle read bottom-heavy/lopsided at this size).
const IcoAlertCircle = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M10 6.3v4.4M10 13.4h.01"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IcoGauge = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 14a7 7 0 1 1 14 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="m10 14 3.2-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1.4" fill={color} />
  </svg>
);

const IcoGear = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.4" stroke={color} strokeWidth="1.5" />
    <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IcoQr = ({ size = 20, color = '#616161' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="12" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <rect x="3" y="12" width="5" height="5" rx="1" stroke={color} strokeWidth="1.4" />
    <path d="M12 12h2v2M16 12v5M12 16h2" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Home grid illustrations ─────────────────────────────────────────────────
// Each NavCard's media is the section's full-colour illustration. The artwork
// already includes its own circular tinted backdrop, so there is no separate
// tinted-disc wrapper — the raw SVG is dropped in and scaled to 80×80.

const HomeMedia = ({ svg }) => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 80, height: 80, flexShrink: 0,
    }}
    // The illustration's own width/height attrs are overridden to 80×80 by the
    // wrapper's CSS so every tile renders at the same size.
    ref={(node) => {
      if (!node) return;
      const el = node.querySelector('svg');
      if (el) { el.setAttribute('width', '80'); el.setAttribute('height', '80'); el.style.display = 'block'; }
    }}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

// Section tiles. Each maps to one of the provided home illustrations.
const HOME_SECTIONS = [
  // `target` wires this tile into the Sectioned Layout shell (opens at the
  // ColdChain Equipment page). Tiles without a target are inert for now.
  { id: 'inventory',   title: 'Inventory Management',   svg: illoEquipment, target: 'coldchain' },
  { id: 'temperature', title: 'Temperature Monitoring', svg: illoMonitoring },
  { id: 'learning',    title: 'Learning Hub',           svg: illoTraining },
  { id: 'reports',     title: 'Reports',                svg: illoReports },
  { id: 'facility',    title: 'Facility Registry',      svg: illoFacility },
  { id: 'forecasting', title: 'Forecasting',            svg: illoForecasting },
  { id: 'events',      title: 'Events',                 svg: illoEvents },
  { id: 'transport',   title: 'ColdChain Transport',    svg: illoTransport },
  { id: 'service',     title: 'Service Requests',       svg: illoHealthHub },
];

function HomeView({ onOpenSection }) {
    const { width } = useViewport();
    const [country] = useState(COUNTRIES.find((c) => c.code === 'KE') || COUNTRIES[0]);
    const [chatOpen, setChatOpen] = useState(false);

    // Grids reflow in pure CSS (flex-wrap + auto-fit) — keyed off the actual
    // available width, so no JS measurement, no resize lag, never overflow.

    return (
      <AppShell
        navItems={EQUIPMENT_ITEMS}
        activeItemId="home"
        onNavSelect={(id) => { if (id !== 'home') onOpenSection(id); }}
        breadcrumbs={[HOME_CRUMB]}
        level="primary"
        contentWidth="full"
        country={country}
        onAskAi={() => setChatOpen((o) => !o)}
        askAiActive={chatOpen}
      >
        <AiChatPanel open={chatOpen} onClose={() => setChatOpen(false)}>
          <div style={{ padding: 24, fontSize: 13, color: '#616161' }}>
            AI chat panel content lives here.
          </div>
        </AiChatPanel>

        <div
          aria-labelledby="home-layout-title"
          style={{ padding: width < BP_SM ? '24px 12px 32px' : '24px 16px 32px', boxSizing: 'border-box' }}
        >
          {/* Greeting */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 450, color: '#616161' }}>Hey there 😊,</p>
            <h1 id="home-layout-title" style={{
              margin: '4px 0 0', fontSize: 24, fontWeight: 700, lineHeight: '32px',
              letterSpacing: '-0.2px', color: '#303030',
            }}>
              What would you like to do today?
            </h1>
          </div>

          {/* Action row — Quick Action (~1fr) + Action Required (~2fr), wrapping
              to a stack when they no longer fit (pure-CSS flex, no JS width). */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: '1 1 260px', minWidth: 0 }}>
              <CardLayoutType6 icon={<IcoScanRows />} title="Quick Action">
                <Cell
                  icon={<IcoQr />}
                  iconTone="neutral"
                  title="Scan QR Code or Enter Serial No."
                  onClick={() => {}}
                  ariaLabel="Scan QR Code or Enter Serial No."
                />
              </CardLayoutType6>
            </div>

            <div style={{ flex: '2 1 460px', minWidth: 0 }}>
              <CardLayoutType6
                tone="critical"
                icon={<IcoAlertCircle />}
                title="Action Required"
                badge="5 Urgent Issues"
                actionLabel="View All"
                onAction={() => {}}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
                  <Cell
                    icon={<IcoGauge />}
                    iconTone="neutral"
                    title="Temperature exceeds threshold"
                    description="Incubator HC 1501-2023-001 | Main Laboratory"
                    hasChevron
                    onClick={() => {}}
                    ariaLabel="Temperature exceeds threshold — Incubator HC 1501-2023-001"
                  />
                  <Cell
                    icon={<IcoGear />}
                    iconTone="neutral"
                    title="Maintenance due"
                    description="Generator GEN-2023-005 | Power Room"
                    hasChevron
                    onClick={() => {}}
                    ariaLabel="Maintenance due — Generator GEN-2023-005"
                  />
                </div>
              </CardLayoutType6>
            </div>
          </div>

          {/* Section grid — NavCard home tiles. Capped at 3 columns on desktop,
              stepping 3 → 2 → 1 via container queries (.nx-home-grid in
              global.css): container-relative, pure CSS, no overflow/resize lag. */}
          <div className="nx-home-grid">
            <div className="nx-home-grid__tiles">
            {HOME_SECTIONS.map(({ id, title, svg, target }) => (
              <NavCard
                key={id}
                layout="home"
                title={title}
                media={<HomeMedia svg={svg} />}
                onClick={target ? () => onOpenSection(target) : () => {}}
                ariaLabel={title}
              />
            ))}
            </div>
          </div>
        </div>
      </AppShell>
    );
}

// ─── Application shell ────────────────────────────────────────────────────────
// Single stateful host shared by both stories. `view` flips between the
// standalone Home Layout and the Sectioned Layout app shell so the two can
// navigate to each other within one Storybook frame:
//   • Home → Sectioned : the "Inventory Management" tile (target 'coldchain').
//   • Sectioned → Home : the side-rail "Home" item and the "Home" breadcrumb.
function ApplicationShell({ initialView = 'home' }) {
  const [view, setView] = useState(initialView);
  const [targetId, setTargetId] = useState('coldchain');

  if (view === 'home') {
    return (
      <HomeView
        onOpenSection={(id) => { if (id) setTargetId(id); setView('sectioned'); }}
      />
    );
  }
  return (
    <SectionedView initialActiveId={targetId} onGoHome={() => setView('home')} />
  );
}

export const SectionedLayout = {
  name: 'Sectioned Layout',
  render: () => <ApplicationShell initialView="sectioned" />,
};

export const HomeLayout = {
  name: 'Home Layout',
  render: () => <ApplicationShell initialView="home" />,
};
