import { useEffect, useState } from 'react';
import { SideNavigation, siblingsFor } from '../../components/SideNavigation/SideNavigation.jsx';
import {
  Toolbar,
  ToolbarAiChatButton,
  ToolbarRegionSelector,
  ToolbarIconButton,
  ToolbarAvatar,
  AiChatPanel,
} from '../../components/Toolbar/Toolbar.jsx';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import { Page } from '../../components/Page/Page.jsx';
import { PolarisIconImg } from '../../components/PolarisIcon/PolarisIcon.jsx';
import { MetricCard } from '../../components/MetricCard/MetricCard.jsx';
import { IndexTable, LinkCell } from '../../components/IndexTable/IndexTable.jsx';
import { Pagination } from '../../components/Pagination/Pagination.jsx';
import { SearchSelectButton } from '../../components/SearchSelect/SearchSelect.jsx';
import { COUNTRIES } from '../../foundation/emojis/emojiCatalog.js';

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
const BP_MD = 768;
const BP_SM = 640;

function useViewport() {
  const get = () => (typeof window === 'undefined' ? 1440 : window.innerWidth);
  const [w, setW] = useState(get);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return { width: w, isBelowMd: w < BP_MD, isBelowSm: w < BP_SM };
}

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

// ─── Status palette + badge component ────────────────────────────────────────
// Same colour map Equipment Detail uses so an "Active" installation reads
// identically on both pages.

const STATUS_STYLES = {
  'Active':            { bg: '#cdfee1',         color: '#0c5132' },
  'Unknown':           { bg: 'rgba(0,0,0,0.06)', color: '#616161' },
  'Decommissioned':    { bg: '#ffd6a4',         color: '#5e4200' },
  'Faulty':            { bg: '#fedad9',         color: '#8e1f0b' },
  'Under Maintenance': { bg: '#e0f0ff',         color: '#00527c' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Unknown'];
  return (
    <span
      role="status"
      aria-label={`Equipment status: ${status}`}
      style={{
        background: s.bg, color: s.color,
        fontSize: 12, fontWeight: 550,
        fontFamily: 'Inter, sans-serif',
        padding: '2px 8px', borderRadius: 8,
        whiteSpace: 'nowrap', display: 'inline-block', lineHeight: '16px',
      }}
    >
      {status}
    </span>
  );
};

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

// ─── Inline icons used by the toolbar action cluster ─────────────────────────

const IcoGrid = ({ size = 20, color = '#303030' }) => (
  <PolarisIconImg name="AppsIcon" size={size} color={color} />
);
const IcoBell = ({ size = 20, color = '#303030' }) => (
  <PolarisIconImg name="NotificationIcon" size={size} color={color} />
);
const IcoTranslate = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2.5 5h7M5.5 3v2M4 5c0 3 2.5 5.5 5.5 5.5M9.5 5c0 2-3.5 5-7 5.5"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 17l3-7 3 7M11.5 15h4"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HOME_CRUMB = {
  id: 'home',
  label: 'Home',
  icon: <PolarisIconImg name="HomeFilledIcon" size={20} color="#303030" />,
  iconOnly: true,
};

const SAMPLE_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=faces';

// ─── Collapse toggle (footer slot of the side nav) ───────────────────────────
// Stateful little button with the same hover/focus treatment as the NavItem
// rows above it. Shared across both stories below.

const CollapseIcon = ({ collapsed, color = '#303030' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d={collapsed ? 'M7.5 5l5 5-5 5' : 'M12.5 5l-5 5 5 5'}
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

function CollapseToggle({ collapsed, onToggle }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  const [foc, setFoc] = useState(false);
  const bg = act ? 'rgba(0,0,0,0.08)' : hov ? 'rgba(0,0,0,0.05)' : 'transparent';
  const textColor = hov || act ? '#303030' : '#616161';
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => setAct(true)}
      onMouseUp={() => setAct(false)}
      onFocus={() => setFoc(true)}
      onBlur={() => setFoc(false)}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      aria-expanded={!collapsed}
      style={{
        width: '100%', padding: collapsed ? 6 : '6px 10px',
        display: 'flex', alignItems: 'center', gap: 8,
        background: bg, border: 'none', borderRadius: 8,
        cursor: 'pointer', color: textColor,
        fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
        justifyContent: collapsed ? 'center' : 'flex-start',
        outline: 'none',
        boxShadow: foc ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
      }}
    >
      <CollapseIcon collapsed={collapsed} color={textColor} />
      {!collapsed && <span>Collapse</span>}
    </button>
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
    value: 'coast', label: 'Coast',
    children: [
      { value: 'mombasa-county', label: 'Mombasa County', children: [
        { value: 'mombasa-island', label: 'Mombasa Island' },
        { value: 'kisauni',        label: 'Kisauni' },
        { value: 'likoni',         label: 'Likoni' },
      ] },
      { value: 'kilifi-county', label: 'Kilifi County', children: [
        { value: 'malindi',     label: 'Malindi' },
        { value: 'kilifi-town', label: 'Kilifi Town' },
      ] },
    ],
  },
  {
    value: 'nairobi', label: 'Nairobi',
    children: [
      { value: 'nairobi-county', label: 'Nairobi County', children: [
        { value: 'nairobi-west', label: 'Nairobi West' },
        { value: 'starehe',      label: 'Starehe' },
        { value: 'dagoretti',    label: 'Dagoretti' },
        { value: 'embakasi',     label: 'Embakasi' },
      ] },
    ],
  },
  {
    value: 'rift-valley', label: 'Rift Valley',
    children: [
      { value: 'nakuru-county', label: 'Nakuru County', children: [
        { value: 'nakuru-town', label: 'Nakuru Town' },
        { value: 'naivasha',    label: 'Naivasha' },
      ] },
      { value: 'uasin-gishu-county', label: 'Uasin Gishu County', children: [
        { value: 'eldoret', label: 'Eldoret' },
        { value: 'turbo',   label: 'Turbo' },
      ] },
    ],
  },
  {
    value: 'nyanza', label: 'Nyanza',
    children: [
      { value: 'kisumu-county', label: 'Kisumu County', children: [
        { value: 'kisumu-central', label: 'Kisumu Central' },
        { value: 'kisumu-east',    label: 'Kisumu East' },
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

export const SectionedLayout = {
  name: 'Sectioned Layout',
  render: () => {
    const { width, isBelowMd } = useViewport();

    // Side-nav state. Below `md` the user can't expand — we lock it
    // collapsed so the content doesn't get squeezed. Above `md` the user
    // owns it. Initial state on first paint is collapsed (matches the Figma
    // shell screenshot).
    const [userCollapsed, setUserCollapsed] = useState(true);
    const collapsed = isBelowMd ? true : userCollapsed;
    const navWidth = collapsed ? 56 : 240;

    const [activeId, setActiveId] = useState('coldchain');
    const [country, setCountry]   = useState(
      COUNTRIES.find((c) => c.code === 'KE') || COUNTRIES[0],
    );
    const [chatOpen, setChatOpen] = useState(false);

    const [trail, setTrail] = useState([
      HOME_CRUMB,
      { label: 'Equipment Management' },
      { label: 'ColdChain Equipment' },
      { label: 'View Equipment Details' },
      { label: 'Equipment Details' },
    ]);
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
      <div style={{ background: '#f1f1f1', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

        {/* Side navigation — fixed full-height rail at the left edge. The
            rail's own `bg-page` + inset right shadow matches the toolbar's
            bg, so the visual seam between them disappears. */}
        <div style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          zIndex: 10,
        }}>
          <SideNavigation
            collapsed={collapsed}
            // Locking auto-expand behind the breakpoint: clicking a collapsed
            // parent below `md` would expand the rail and squeeze the page.
            onCollapsedChange={isBelowMd ? undefined : setUserCollapsed}
            logo={collapsed ? <NexleafIconLogo /> : <NexleafFullLogo />}
            items={EQUIPMENT_ITEMS}
            activeItemId={activeId}
            onItemSelect={setActiveId}
            footer={
              isBelowMd ? null : (
                <CollapseToggle
                  collapsed={userCollapsed}
                  onToggle={() => setUserCollapsed((c) => !c)}
                />
              )
            }
            ariaLabel="Equipment Management"
          />
        </div>

        {/* Right column: toolbar (sticky) + page content (scrolls under). */}
        <div style={{
          marginLeft: navWidth,
          transition: 'margin-left 0.18s ease',
          minWidth: 0,            // lets the IndexTable inside enable its
                                  // horizontal scroll without pushing the
                                  // whole column wider.
        }}>
          {/* Toolbar — sticky, full width of the right column. `sideNavWidth`
              is 0 here because the rail is rendered as a sibling (fixed
              positioned), not "inside" the toolbar's reserved slot. */}
          <div style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <Toolbar
              sideNavWidth={0}
              start={(
                <Breadcrumbs
                  items={trail}
                  onNavigate={(i) => setTrail(trail.slice(0, i + 1))}
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
                  {/* Region pill — read-only for normal users. Switch to
                      `pickable + countries + onCountryChange` for admin
                      sessions (see Toolbar's "Side-nav shell — admin"
                      story). */}
                  <ToolbarRegionSelector
                    countryCode={country.code}
                    value={country.name}
                  />
                  <ToolbarIconButton icon={<IcoGrid />} ariaLabel="Apps" onClick={() => {}} />
                  <ToolbarIconButton icon={<IcoBell />} ariaLabel="Notifications" onClick={() => {}} />
                  <ToolbarAvatar src={SAMPLE_AVATAR} alt="Profile" onClick={() => {}} />
                </>
              )}
            />
          </div>

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
          <main
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
              ColdChain Equipment
            </h1>

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
                        size="large"
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
              gridTemplateColumns: width < BP_SM
                ? '1fr'
                : width < 1024
                  ? 'repeat(2, 1fr)'
                  : 'repeat(4, 1fr)',
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
          </main>
        </div>
      </div>
    );
  },
};
