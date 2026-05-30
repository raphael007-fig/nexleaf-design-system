import { useState } from 'react';
import { SideNavigation } from './SideNavigation.jsx';
import { PolarisIconImg } from '../PolarisIcon/PolarisIcon.jsx';

export default {
  title: 'Components/Navigation/Side Navigation',
  component: SideNavigation,
  parameters: { layout: 'fullscreen' },
};

// ─── Nexleaf logos (inline SVGs, never external images) ─────────────────────
//
// Two marks:
//   • NexleafIconLogo  — 44×44 leaf-only mark, used when the rail is collapsed
//   • NexleafFullLogo  — 108×44 leaf + "NEXLEAF ANALYTICS" wordmark, used when
//                        the rail is expanded
//
// Paths are copied verbatim from the master SVGs (Nexleaf Brand Kit). The
// only edits are adding `aria-label` for screen readers and turning the
// outer `<svg>` into JSX.

const NexleafIconLogo = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    role="img"
    aria-label="Nexleaf"
  >
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M24.2226 16.5508H20.6257C19.4526 16.5508 18.5007 17.5023 18.5007 18.6761V22.2722C18.5007 23.4464 19.4526 24.3982 20.6257 24.3982H24.2226C25.3961 24.3982 26.348 23.4464 26.348 22.2722V18.6761C26.348 17.5023 25.3961 16.5508 24.2226 16.5508ZM21.0828 26.5663C21.0828 26.7348 20.945 26.8725 20.7764 26.8725H19.9581C19.7899 26.8725 19.6521 26.7348 19.6521 26.5663V25.7481C19.6521 25.5796 19.7898 25.4419 19.9581 25.4419H20.7764C20.945 25.4419 21.0828 25.5796 21.0828 25.7481V26.5663ZM23.0987 26.5663C23.0987 26.7348 22.9611 26.8725 22.7924 26.8725H21.9744C21.8058 26.8725 21.6681 26.7348 21.6681 26.5663V25.7481C21.6681 25.5796 21.8058 25.4419 21.9744 25.4419H22.7924C22.9611 25.4419 23.0987 25.5796 23.0987 25.7481V26.5663ZM21.0828 28.5607C21.0828 28.7292 20.945 28.8671 20.7764 28.8671H19.9581C19.7899 28.8671 19.6521 28.7292 19.6521 28.5607V27.7425C19.6521 27.5741 19.7898 27.4363 19.9581 27.4363H20.7764C20.945 27.4363 21.0828 27.5741 21.0828 27.7425V28.5607ZM23.0987 28.5607C23.0987 28.7292 22.9611 28.8671 22.7924 28.8671H21.9744C21.8058 28.8671 21.6681 28.7292 21.6681 28.5607V27.7425C21.6681 27.5741 21.8058 27.4363 21.9744 27.4363H22.7924C22.9611 27.4363 23.0987 27.5741 23.0987 27.7425V28.5607ZM25.071 28.5607C25.071 28.7292 24.9333 28.8671 24.7647 28.8671H23.9467C23.7781 28.8671 23.6404 28.7292 23.6404 28.5607V27.7425C23.6404 27.5741 23.7781 27.4363 23.9467 27.4363H24.7647C24.9333 27.4363 25.071 27.5741 25.071 27.7425V28.5607ZM23.0987 30.5331C23.0987 30.7015 22.9611 30.8393 22.7924 30.8393H21.9744C21.8058 30.8393 21.6681 30.7015 21.6681 30.5331V29.7148C21.6681 29.5464 21.8058 29.4086 21.9744 29.4086H22.7924C22.9611 29.4086 23.0987 29.5464 23.0987 29.7148V30.5331Z" fill="white"/>
    <path d="M22.4044 36.2894C22.5033 36.2894 22.5622 36.2467 22.5622 36.1684C22.5622 36.101 22.5218 36.0513 22.4116 36.0513H22.3088V36.2894H22.4044ZM22.1583 35.9305H22.4373C22.5915 35.9305 22.7274 35.9908 22.7274 36.1614C22.7274 36.2467 22.6723 36.3285 22.5879 36.3567L22.7568 36.6517H22.5879L22.4594 36.4031H22.3088V36.6517H22.1583V35.9305ZM22.9696 36.2999C22.9696 35.966 22.7347 35.7279 22.4262 35.7279C22.1179 35.7279 21.8793 35.966 21.8793 36.2999C21.8793 36.6375 22.1179 36.8685 22.4262 36.8685C22.7347 36.8685 22.9696 36.6375 22.9696 36.2999ZM21.7324 36.2999C21.7324 35.8841 22.0445 35.5999 22.4262 35.5999C22.8044 35.5999 23.1165 35.8841 23.1165 36.2999C23.1165 36.7157 22.8044 37.0001 22.4262 37.0001C22.0445 37.0001 21.7324 36.7157 21.7324 36.2999Z" fill="#4D5054"/>
  </svg>
);

const NexleafFullLogo = ({ height = 44 }) => (
  <svg
    width={(108 / 44) * height}
    height={height}
    viewBox="0 0 108 44"
    fill="none"
    role="img"
    aria-label="Nexleaf Analytics"
  >
    <path d="M22.6056 7C22.8248 9.04673 21.0734 10.3941 20.5264 11.1046C20.6445 11.1612 20.7608 11.2213 20.8774 11.2802C22.3346 12.0138 23.6828 12.9292 24.8327 14.0942V12.989C24.8393 12.6204 25.1001 12.3267 25.393 12.3311C25.6842 12.3344 25.9188 12.6346 25.9148 13.003V15.3458C26.998 16.787 27.9982 18.2234 28.4146 20.9002C28.4397 21.0622 29.3256 25.8426 27.8621 30.9128C27.5209 32.0959 27.0264 33.2533 26.3739 34.3845L24.8623 36.9143L26.9636 34.9797C29.4079 32.6605 31.7312 28.9865 31.8583 23.914C31.7798 17.6709 27.6539 10.5862 22.6056 7Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#4D5054"/>
    <path d="M26.3481 22.2723C26.3481 23.4463 25.3962 24.3983 24.2227 24.3983H20.6258C19.4527 24.3983 18.5007 23.4463 18.5007 22.2723V18.6762C18.5007 17.5025 19.4527 16.5509 20.6258 16.5509H24.2227C25.3962 16.5509 26.348 17.5025 26.348 18.6762L26.3481 22.2723ZM27.8622 30.9129C29.3259 25.8427 28.4398 21.0623 28.4145 20.9002C27.9985 18.2233 26.9983 16.7871 25.9149 15.346V13.0031C25.9188 12.6348 25.6843 12.3344 25.3929 12.3312C25.1002 12.3266 24.8392 12.6206 24.8327 12.9891V14.0942C23.6829 12.9292 22.3345 12.014 20.8777 11.2802C20.7609 11.2214 20.6448 11.1614 20.5264 11.1047C20.3611 11.3365 18.7437 12.9232 17.4859 16.6557C17.0089 18.1531 16.8085 19.3918 16.7179 20.6151C16.1905 27.7102 20.2132 31.1958 22.4828 33.0416C22.8543 33.3441 25.1299 34.9513 24.8623 36.9143L26.3739 34.3845C27.0264 33.2536 27.5208 32.0959 27.8622 30.9129Z" fill="#40BA5B"/>
    <path d="M22.4828 33.0414C20.2131 31.1957 16.1906 27.7101 16.7178 20.6151C16.8085 19.3916 17.0091 18.1529 17.486 16.6556C18.7437 12.923 20.3611 11.3363 20.5265 11.1047C18.0559 9.92356 15.3035 9.23529 12.6944 8.72339C14.041 12.672 12.213 14.6596 12.14 19.9281C12.346 28.5689 17.9356 32.3731 21.4384 33.6578C21.8888 33.8225 24.4416 34.9785 24.8623 36.9141C25.13 34.951 22.8543 33.3439 22.4828 33.0415" fill="#B2E3AF"/>
    <path d="M38.2291 32.1377H39.5862L39.404 31.4924C39.2304 30.9214 39.073 30.3009 38.9158 29.7133H38.8827C38.7422 30.309 38.5848 30.9214 38.4111 31.4924L38.2291 32.1377ZM38.3448 28.9437H39.5035L41.2577 34.3555H40.215L39.8015 32.9075H38.0057L37.5919 34.3555H36.5906L38.3448 28.9437ZM44.3697 28.9437H45.4207L47.0428 31.9227C47.2411 32.2868 47.4233 32.717 47.5971 33.1475H47.63C47.5722 32.5681 47.5061 31.9061 47.5061 31.3104V28.9437H48.4247V34.3555H47.3735L45.7517 31.3765C45.5531 31.0124 45.3712 30.5822 45.1974 30.1517H45.1643C45.2221 30.7144 45.2885 31.3848 45.2885 31.9889V34.3555H44.3698L44.3697 28.9437ZM53.175 32.1377H54.5323L54.3501 31.4924C54.1764 30.9213 54.0192 30.3009 53.862 29.7132H53.8287C53.6882 30.309 53.531 30.9213 53.3572 31.4924L53.175 32.1377ZM53.291 28.9437H54.4496L56.2038 34.3555H55.1611L54.7473 32.9075H52.9517L52.5379 34.3555H51.5366L53.291 28.9437ZM59.3159 28.9437H60.3006V33.5279H62.5351V34.3555H59.3159V28.9437ZM66.8221 32.3529L65.192 28.9437H66.2428L66.8221 30.3173C66.9793 30.7144 67.1365 31.0952 67.302 31.5089H67.3349C67.5088 31.0952 67.6742 30.7144 67.8314 30.3173L68.4107 28.9437H69.437L67.8068 32.3529V34.3555H66.8221V32.3529ZM73.6083 29.7712H72.0527V28.9437H76.1486V29.7713H74.5928V34.3555H73.6083V29.7712ZM79.4923 28.9437H80.4771V34.3555H79.4923V28.9437ZM84.0027 31.6661C84.0027 29.8952 85.1117 28.8443 86.4854 28.8443C87.1635 28.8443 87.7102 29.1589 88.0492 29.5311L87.5279 30.1353C87.2462 29.8622 86.9239 29.705 86.502 29.705C85.641 29.705 85.0122 30.4331 85.0122 31.6414C85.0122 32.8578 85.5837 33.6024 86.4854 33.6024C86.9573 33.6024 87.329 33.4121 87.6274 33.0812L88.1567 33.6687C87.7014 34.19 87.1388 34.4549 86.444 34.4549C85.0871 34.4549 84.0027 33.4619 84.0027 31.6661ZM91.1282 33.6604L91.6575 33.015C92.0467 33.3874 92.5847 33.6024 93.1059 33.6024C93.702 33.6024 94.0331 33.3294 94.0331 32.9156C94.0331 32.4854 93.6853 32.3447 93.1967 32.1377L92.4605 31.815C91.9225 31.5917 91.3686 31.1696 91.3686 30.3836C91.3686 29.5147 92.1294 28.8442 93.1887 28.8442C93.8429 28.8442 94.4462 29.1092 94.8687 29.5147L94.3387 30.1601C93.9997 29.8704 93.6025 29.705 93.1887 29.705C92.6841 29.705 92.361 29.9366 92.361 30.3257C92.361 30.7394 92.7669 30.8883 93.2134 31.0786L93.9416 31.3765C94.587 31.6495 95.0343 32.055 95.0343 32.8412C95.0343 33.7184 94.306 34.4549 93.0813 34.4549C92.3364 34.4549 91.6416 34.1817 91.1282 33.6604Z" fill="#4D5054"/>
    <path d="M36.6072 14.05H38.0357L41.7495 20.5413C42.1462 21.2398 42.5112 22.0175 42.8763 22.7792H42.9398C42.8604 21.6999 42.7652 20.5573 42.7652 19.478V14.05H44.019V24.4616H42.5907L38.8769 17.9702C38.4801 17.272 38.0992 16.4943 37.75 15.7324H37.6864C37.7659 16.78 37.8611 17.9069 37.8611 18.986V24.4616H36.6072V14.05ZM47.0185 14.05H53.0178V15.177H48.352V18.4306H52.2879V19.5573H48.352V23.3346H53.1768V24.4616H47.0185V14.05ZM57.3824 19.0813L54.5572 14.05H56.0333L57.4457 16.7005C57.6999 17.1768 57.9219 17.6053 58.2553 18.2243H58.3187C58.5884 17.6053 58.7948 17.1768 59.0489 16.7005L60.4295 14.05H61.8422L59.0012 19.1448L62.0327 24.4616H60.5565L59.033 21.6683C58.7633 21.1445 58.4775 20.6207 58.1441 19.986H58.0809C57.7793 20.6207 57.5251 21.1445 57.2554 21.6683L55.7637 24.4616H54.3509L57.3824 19.0812M63.8578 14.05H65.1909V23.3346H69.73V24.4616H63.8578V14.05ZM71.7295 14.05H77.7288V15.177H73.0627V18.4306H76.9989V19.5573H73.0627V23.3346H77.8875V24.4616H71.7295V14.05ZM81.5696 20.224H84.6803L84.1883 18.6527C83.8074 17.4942 83.4743 16.3514 83.1408 15.1453H83.0775C82.76 16.3514 82.4269 17.4942 82.0616 18.6527L81.5696 20.224ZM82.3791 14.05H83.9026L87.4103 24.4616H85.9975L85.0137 21.3032H81.2206L80.2206 24.4616H78.8715L82.3791 14.05ZM89.0446 14.05H95.0437V15.177H90.3783V18.6844H94.346V19.8113H94.346V19.8113H90.3783V24.4616H89.0446V14.05Z" fill="#40BA5B"/>
    <path d="M24.2226 16.5508H20.6257C19.4526 16.5508 18.5007 17.5023 18.5007 18.6761V22.2722C18.5007 23.4464 19.4526 24.3982 20.6257 24.3982H24.2226C25.3961 24.3982 26.348 23.4464 26.348 22.2722V18.6761C26.348 17.5023 25.3961 16.5508 24.2226 16.5508ZM21.0828 26.5663C21.0828 26.7348 20.945 26.8725 20.7764 26.8725H19.9581C19.7899 26.8725 19.6521 26.7348 19.6521 26.5663V25.7481C19.6521 25.5796 19.7898 25.4419 19.9581 25.4419H20.7764C20.945 25.4419 21.0828 25.5796 21.0828 25.7481V26.5663ZM23.0987 26.5663C23.0987 26.7348 22.9611 26.8725 22.7924 26.8725H21.9744C21.8058 26.8725 21.6681 26.7348 21.6681 26.5663V25.7481C21.6681 25.5796 21.8058 25.4419 21.9744 25.4419H22.7924C22.9611 25.4419 23.0987 25.5796 23.0987 25.7481V26.5663ZM21.0828 28.5607C21.0828 28.7292 20.945 28.8671 20.7764 28.8671H19.9581C19.7899 28.8671 19.6521 28.7292 19.6521 28.5607V27.7425C19.6521 27.5741 19.7898 27.4363 19.9581 27.4363H20.7764C20.945 27.4363 21.0828 27.5741 21.0828 27.7425V28.5607ZM23.0987 28.5607C23.0987 28.7292 22.9611 28.8671 22.7924 28.8671H21.9744C21.8058 28.8671 21.6681 28.7292 21.6681 28.5607V27.7425C21.6681 27.5741 21.8058 27.4363 21.9744 27.4363H22.7924C22.9611 27.4363 23.0987 27.5741 23.0987 27.7425V28.5607ZM25.071 28.5607C25.071 28.7292 24.9333 28.8671 24.7647 28.8671H23.9467C23.7781 28.8671 23.6404 28.7292 23.6404 28.5607V27.7425C23.6404 27.5741 23.7781 27.4363 23.9467 27.4363H24.7647C24.9333 27.4363 25.071 27.5741 25.071 27.7425V28.5607ZM23.0987 30.5331C23.0987 30.7015 22.9611 30.8393 22.7924 30.8393H21.9744C21.8058 30.8393 21.6681 30.7015 21.6681 30.5331V29.7148C21.6681 29.5464 21.8058 29.4086 21.9744 29.4086H22.7924C22.9611 29.4086 23.0987 29.5464 23.0987 29.7148V30.5331Z" fill="white"/>
    <path d="M22.4044 36.2894C22.5033 36.2894 22.5622 36.2467 22.5622 36.1684C22.5622 36.101 22.5218 36.0513 22.4116 36.0513H22.3088V36.2894H22.4044ZM22.1583 35.9305H22.4373C22.5915 35.9305 22.7274 35.9908 22.7274 36.1614C22.7274 36.2467 22.6723 36.3285 22.5879 36.3567L22.7568 36.6517H22.5879L22.4594 36.4031H22.3088V36.6517H22.1583V35.9305ZM22.9696 36.2999C22.9696 35.966 22.7347 35.7279 22.4262 35.7279C22.1179 35.7279 21.8793 35.966 21.8793 36.2999C21.8793 36.6375 22.1179 36.8685 22.4262 36.8685C22.7347 36.8685 22.9696 36.6375 22.9696 36.2999ZM21.7324 36.2999C21.7324 35.8841 22.0445 35.5999 22.4262 35.5999C22.8044 35.5999 23.1165 35.8841 23.1165 36.2999C23.1165 36.7157 22.8044 37.0001 22.4262 37.0001C22.0445 37.0001 21.7324 36.7157 21.7324 36.2999Z" fill="#4D5054"/>
  </svg>
);

// Helper: pick the right mark for the current collapsed state.
const logoFor = (collapsed) => (collapsed ? <NexleafIconLogo /> : <NexleafFullLogo />);

// ─── Equipment Management nav tree ───────────────────────────────────────────
//
// Children of "Inventory" cover every equipment domain Nexleaf tracks. All
// icons are the *Filled* variants from the PolarisIcon catalog so the rail
// reads as a single visual family (no mix of outline + solid). New icons
// added to the catalog to support this variant: `FlashIcon` (already solid),
// `HeartFilledIcon`, and `GaugeFilledIcon`.
const EQUIPMENT_ITEMS = [
  { id: 'home',            label: 'Home',            icon: <PolarisIconImg name="HomeFilledIcon"      size={20} color="#303030" /> },
  { id: 'health',          label: 'Health Status',   icon: <PolarisIconImg name="HeartFilledIcon"     size={20} color="#303030" /> },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <PolarisIconImg name="InventoryFilledIcon" size={20} color="#303030" />,
    children: [
      { id: 'coldchain',  label: 'ColdChain Equipment' },
      { id: 'rtmds',      label: 'RTMDs' },
      { id: 'solar',      label: 'Solar Equipment' },
      { id: 'passive',    label: 'Passive Equipment' },
      { id: 'oxygen',     label: 'Oxygen Equipment' },
      { id: 'lab',        label: 'Lab Equipment' },
      { id: 'general',    label: 'General Equipment' },
    ],
  },
  { id: 'sparePart',       label: 'Spare Part',      icon: <PolarisIconImg name="CartFilledIcon"      size={20} color="#303030" /> },
  { id: 'performance',     label: 'Performance',     icon: <PolarisIconImg name="GaugeFilledIcon"     size={20} color="#303030" /> },
  { id: 'electrification', label: 'Electrification', icon: <PolarisIconImg name="FlashIcon"           size={20} color="#303030" /> },
];

// A canvas wrapper that mimics how the sidebar lives inside an app shell so
// the radius + right-edge shadow read correctly at every viewport.
const Shell = ({ children, height = 720 }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      minHeight: height,
      background: '#ffffff',
      fontFamily: 'Inter, sans-serif',
    }}
  >
    {children}
    <div style={{ flex: 1, background: '#ffffff', padding: 24 }}>
      <p style={{
        margin: 0, fontSize: 13, fontWeight: 450, color: '#9e9e9e',
        fontFamily: 'Inter, sans-serif',
      }}>
        Page content goes here.
      </p>
    </div>
  </div>
);

// ─── Equipment Management — expanded ─────────────────────────────────────────

export const EquipmentManagementExpanded = {
  name: 'Equipment Management — Expanded',
  render: () => {
    const [activeId, setActiveId] = useState('coldchain');
    return (
      <Shell>
        <SideNavigation
          logo={logoFor(false)}
          items={EQUIPMENT_ITEMS}
          activeItemId={activeId}
          onItemSelect={setActiveId}
          ariaLabel="Equipment Management"
        />
      </Shell>
    );
  },
};

// ─── Equipment Management — collapsed ────────────────────────────────────────
//
// Starts collapsed but tracks the state so the auto-expand interaction is
// demonstrable: clicking the Inventory icon expands the rail AND opens the
// group, no second click needed. The logo swaps with the state too.

export const EquipmentManagementCollapsed = {
  name: 'Equipment Management — Collapsed',
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    const [activeId, setActiveId]   = useState('coldchain');
    return (
      <Shell>
        <SideNavigation
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          logo={logoFor(collapsed)}
          items={EQUIPMENT_ITEMS}
          activeItemId={activeId}
          onItemSelect={setActiveId}
          ariaLabel="Equipment Management"
        />
      </Shell>
    );
  },
};

// ─── Side-by-side: expanded + collapsed ──────────────────────────────────────

export const SideBySide = {
  name: 'Both states side-by-side',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 560 }}>
        <SideNavigation
          logo={logoFor(false)}
          items={EQUIPMENT_ITEMS}
          activeItemId="coldchain"
          ariaLabel="Equipment Management (expanded)"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: 560 }}>
        <SideNavigation
          collapsed
          logo={logoFor(true)}
          items={EQUIPMENT_ITEMS}
          activeItemId="coldchain"
          ariaLabel="Equipment Management (collapsed)"
        />
      </div>
    </div>
  ),
};

// ─── Interactive: collapse toggle + selection ────────────────────────────────

const ToggleCollapseIcon = ({ collapsed, color = '#303030' }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d={collapsed
        ? 'M7.5 5l5 5-5 5'   // chevron right → expand
        : 'M12.5 5l-5 5 5 5' // chevron left  → collapse
      }
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Footer collapse toggle — uses the same hover, focus, and pressed treatments
// as the NavItem rows so it reads as part of the same control family.
//   rest    → transparent bg,                  #616161 text
//   hover   → bg-hover-subtle (rgba 0,0,0,.05) #303030 text
//   pressed → bg-pressed       (rgba 0,0,0,.08) #303030 text
//   focus   → 2 px #005bd3 ring (keyboard only)
function CollapseToggle({ collapsed, onToggle }) {
  const [hover, setHover]   = useState(false);
  const [active, setActive] = useState(false);
  const [focus, setFocus]   = useState(false);

  const bg = active
    ? 'rgba(0,0,0,0.08)'   // bg-pressed
    : hover
      ? 'rgba(0,0,0,0.05)' // bg-hover-subtle
      : 'transparent';
  const textColor = hover || active ? '#303030' : '#616161';

  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      aria-expanded={!collapsed}
      title={collapsed ? 'Expand' : 'Collapse'}
      style={{
        width: '100%',
        padding: collapsed ? 6 : '6px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: bg,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        color: textColor,
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        fontWeight: 500,
        justifyContent: collapsed ? 'center' : 'flex-start',
        outline: 'none',
        boxShadow: focus ? '0 0 0 2px #005bd3' : 'none',
        transition: 'background 0.12s, color 0.12s, box-shadow 0.12s',
      }}
    >
      <ToggleCollapseIcon collapsed={collapsed} color={textColor} />
      {!collapsed && <span>Collapse</span>}
    </button>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

export const Loading = {
  name: 'Loading skeleton',
  render: () => (
    <Shell>
      <SideNavigation
        logo={logoFor(false)}
        loading
        items={EQUIPMENT_ITEMS}
        ariaLabel="Equipment Management (loading)"
      />
    </Shell>
  ),
};

export const LoadingCollapsed = {
  name: 'Loading skeleton — collapsed',
  render: () => (
    <Shell>
      <SideNavigation
        collapsed
        logo={logoFor(true)}
        loading
        items={EQUIPMENT_ITEMS}
        ariaLabel="Equipment Management (loading, collapsed)"
      />
    </Shell>
  ),
};

// ─── Empty state (renders as skeleton) ──────────────────────────────────────
//
// Empty `items` arrays render the same skeleton view as the explicit
// `loading` state. Real-world nav data almost always arrives from a fetch,
// so "no items yet" reads better as "still initialising" than as a dead end.
// `aria-busy="true"` on the list lets assistive tech announce the
// in-progress state.

export const Empty = {
  name: 'Empty state (renders as skeleton)',
  render: () => (
    <Shell>
      <SideNavigation
        logo={logoFor(false)}
        items={[]}
        ariaLabel="Empty navigation"
      />
    </Shell>
  ),
};

// ─── Disabled sub-item ───────────────────────────────────────────────────────
//
// "Lab Equipment" is gated behind a feature flag here. The row is dimmed,
// the cursor is `not-allowed`, click is a no-op, and keyboard arrow nav
// skips over it.
export const DisabledSubItem = {
  name: 'Disabled sub-item',
  render: () => {
    const [activeId, setActiveId] = useState('coldchain');
    const items = EQUIPMENT_ITEMS.map(item =>
      item.id === 'inventory'
        ? { ...item, children: item.children.map(c =>
            c.id === 'lab' ? { ...c, disabled: true } : c
          ) }
        : item
    );
    return (
      <Shell>
        <SideNavigation
          logo={logoFor(false)}
          items={items}
          activeItemId={activeId}
          onSelect={setActiveId}
          ariaLabel="Equipment Management"
        />
      </Shell>
    );
  },
};

// ─── Keyboard navigation ─────────────────────────────────────────────────────
//
// Tab into the rail, then use ↑/↓ to move between rows, →/← to expand/collapse
// groups (or jump to parent from a sub-item), Home/End to jump to ends.
// Disabled rows are skipped.
export const KeyboardNavigation = {
  name: 'Keyboard navigation (arrow keys)',
  render: () => {
    const [activeId, setActiveId] = useState('coldchain');
    return (
      <Shell>
        <SideNavigation
          logo={logoFor(false)}
          items={EQUIPMENT_ITEMS}
          activeItemId={activeId}
          onSelect={setActiveId}
          ariaLabel="Equipment Management"
        />
      </Shell>
    );
  },
};

export const Interactive = {
  name: 'Interactive (toggle + select)',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeId, setActiveId]   = useState('coldchain');

    return (
      <Shell>
        <SideNavigation
          collapsed={collapsed}
          // Lets the sidebar auto-expand when the user clicks a collapsed
          // group with sub-items — they get to see the children immediately
          // instead of having to expand the rail first.
          onCollapsedChange={setCollapsed}
          logo={logoFor(collapsed)}
          items={EQUIPMENT_ITEMS}
          activeItemId={activeId}
          onItemSelect={setActiveId}
          footer={
            <CollapseToggle
              collapsed={collapsed}
              onToggle={() => setCollapsed(c => !c)}
            />
          }
          ariaLabel="Equipment Management"
        />
      </Shell>
    );
  },
};
