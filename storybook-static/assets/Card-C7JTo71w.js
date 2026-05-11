import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./IndexTable-BfI_9NHN.js";function o({children:e,style:t}){return(0,_.jsx)(`div`,{style:{background:`#ffffff`,borderRadius:12,padding:12,display:`flex`,flexDirection:`column`,gap:12,boxShadow:T,fontFamily:`Inter, sans-serif`,boxSizing:`border-box`,...t},children:e})}function s({icon:e,title:t}){return(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[e&&(0,_.jsx)(`span`,{style:{display:`flex`,flexShrink:0},children:e}),(0,_.jsx)(`span`,{style:{fontSize:13,fontWeight:650,color:`#303030`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:t})]})}function c({icon:e,label:t,value:n,linkHref:r,onLinkClick:i}){return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4,flex:`1 0 0`,minWidth:0,justifyContent:`center`},children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[e&&(0,_.jsx)(`span`,{style:{display:`flex`,flexShrink:0},children:e}),(0,_.jsx)(`span`,{style:{fontSize:13,fontWeight:650,color:`#303030`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:t})]}),r||i?(0,_.jsx)(`a`,{href:r||`#`,onClick:i?e=>{e.preventDefault(),i()}:void 0,style:{fontSize:13,fontWeight:450,color:`#005bd3`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`,textDecoration:`underline`,cursor:`pointer`},children:n}):(0,_.jsx)(`span`,{style:{fontSize:13,fontWeight:450,color:e?`#616161`:`#303030`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:n})]})}function l(){return(0,_.jsx)(`div`,{style:{height:1,background:`#ebebeb`}})}function u({images:e=[]}){return(0,_.jsx)(`div`,{style:{display:`flex`,gap:16},children:e.map((e,t)=>(0,_.jsx)(`div`,{style:{width:120,height:120,borderRadius:8,overflow:`hidden`,flexShrink:0,background:`#f1f1f1`},children:e?(0,_.jsx)(`img`,{src:e,alt:`Photo ${t+1}`,style:{width:`100%`,height:`100%`,objectFit:`cover`,display:`block`}}):(0,_.jsx)(`div`,{style:{width:`100%`,height:`100%`,background:`#e0e0e0`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,_.jsx)(w,{})})},t))})}function d({icon:e,title:t,text:n}){return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,_.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[e&&(0,_.jsx)(`span`,{style:{display:`flex`,flexShrink:0},children:e}),(0,_.jsx)(`span`,{style:{fontSize:13,fontWeight:650,color:`#303030`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:t})]}),(0,_.jsx)(`p`,{style:{fontSize:13,fontWeight:400,color:`#616161`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`,margin:0},children:n})]})}function f({images:e=[],fields:t=[],notes:n}){return(0,_.jsxs)(o,{children:[e.length>0&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{icon:(0,_.jsx)(v,{}),title:`Equipment Photos`}),(0,_.jsx)(u,{images:e})]}),t.length>0&&(()=>{let e=[];for(let n=0;n<t.length;n+=2)e.push(t.slice(n,n+2));return e.map((e,t)=>(0,_.jsxs)(`div`,{style:{display:`flex`,gap:12,height:44,alignItems:`center`},children:[e.map((e,t)=>(0,_.jsx)(c,{icon:e.icon,label:e.label,value:e.value,linkHref:e.linkHref,onLinkClick:e.onLinkClick},t)),e.length===1&&(0,_.jsx)(`div`,{style:{flex:`1 0 0`}})]},t))})(),n&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(l,{}),(0,_.jsx)(d,{icon:(0,_.jsx)(v,{}),title:`Notes`,text:n})]})]})}function p({title:e=`Associated Components`,description:t,tabs:n=[],activeTab:r=0,onTabChange:i,tableRows:o=[],footer:s,defaultOpen:c=!1}){let[l,u]=(0,g.useState)(c);return(0,_.jsxs)(`div`,{style:{background:`#ffffff`,borderRadius:12,boxShadow:T,fontFamily:`Inter, sans-serif`,boxSizing:`border-box`,overflow:`hidden`},children:[(0,_.jsxs)(`button`,{onClick:()=>u(e=>!e),"aria-expanded":l,style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,padding:`12px 16px`,background:`none`,border:`none`,cursor:`pointer`,width:`100%`,textAlign:`left`,gap:12,outline:`none`},children:[(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,_.jsx)(`span`,{style:{fontSize:14,fontWeight:650,color:`#303030`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:e}),t&&(0,_.jsx)(`span`,{style:{fontSize:13,fontWeight:450,color:`#616161`,lineHeight:`20px`,fontFamily:`Inter, sans-serif`},children:t})]}),(0,_.jsx)(`span`,{style:{display:`flex`,transform:l?`rotate(180deg)`:`rotate(0deg)`,transition:`transform 0.2s`},children:(0,_.jsx)(C,{})})]}),l&&(0,_.jsx)(`div`,{style:{borderTop:`1px solid #ebebeb`,padding:`12px 16px 16px`},children:(0,_.jsx)(a,{bare:!0,columns:E,rows:o,tabs:n,activeTab:r,onTabChange:i,emptyState:{heading:`No components found`,description:`No components are linked to this equipment yet.`},footer:s})})]})}function m({region:e,facilityName:t,facilityHref:n,onFacilityClick:r,mapSrc:i,mapLat:a,mapLon:s}){let l=[t,e].filter(Boolean).join(`, `),u=.015,d=a!=null&&s!=null?`https://www.openstreetmap.org/export/embed.html?bbox=${s-u},${a-u},${s+u},${a+u}&layer=mapnik&mlat=${a}&mlon=${s}`:null;return(0,_.jsxs)(o,{children:[(0,_.jsx)(c,{icon:(0,_.jsx)(y,{}),label:`Region`,value:e}),(0,_.jsx)(c,{icon:(0,_.jsx)(b,{}),label:`Current Facility`,value:t,linkHref:n,onLinkClick:r}),(0,_.jsx)(`div`,{style:{borderRadius:8,overflow:`hidden`,height:167,background:`#e8efe8`},children:i?(0,_.jsx)(`img`,{src:i,alt:`Map of ${l}`,style:{width:`100%`,height:`100%`,objectFit:`cover`,display:`block`}}):d?(0,_.jsx)(`iframe`,{title:`Map of ${l}`,src:d,width:`100%`,height:`100%`,style:{border:`none`,display:`block`},loading:`lazy`}):(0,_.jsx)(`div`,{style:{width:`100%`,height:`100%`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,_.jsx)(y,{size:32,color:`#9e9e9e`})})})]})}function h({addedBy:e,contactNumber:t}){return(0,_.jsxs)(o,{children:[(0,_.jsx)(c,{icon:(0,_.jsx)(x,{}),label:`Added by`,value:e}),(0,_.jsx)(c,{icon:(0,_.jsx)(S,{}),label:`Contact Number`,value:t})]})}var g,_,v,y,b,x,S,C,w,T,E,D=t((()=>{g=e(n(),1),i(),_=r(),v=({size:e=20,color:t=`#616161`})=>(0,_.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:[(0,_.jsx)(`path`,{d:`M4.63 8.81a5.5 5.5 0 0 1 6.56-4.18.75.75 0 0 0 .325-1.464 7 7 0 1 0 5.32 8.35.75.75 0 0 0-1.465-.325 5.5 5.5 0 1 1-10.74-2.38Z`}),(0,_.jsx)(`path`,{d:`M16.03 6.78a.75.75 0 0 0-1.06-1.06l-4.97 4.97-2.22-2.22a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.5-5.5Z`})]}),y=({size:e=20,color:t=`#616161`})=>(0,_.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:[(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M10 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0-1.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`}),(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M8.827 16h-3.077a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-3.077l.07-.061a17.427 17.427 0 0 0 1.707-1.758c1.224-1.46 2.55-3.574 2.55-5.954 0-3.167-2.328-5.477-5.5-5.477s-5.5 2.31-5.5 5.477c0 2.38 1.326 4.495 2.55 5.954a17.426 17.426 0 0 0 1.777 1.819Zm1.173-11.75c-2.35 0-4 1.646-4 3.977 0 1.846 1.049 3.618 2.2 4.99a15.919 15.919 0 0 0 1.8 1.816 15.92 15.92 0 0 0 1.8-1.817c1.151-1.371 2.2-3.143 2.2-4.99 0-2.33-1.65-3.976-4-3.976Z`})]}),b=({size:e=20,color:t=`#616161`})=>(0,_.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:[(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M13.28 6.72a.75.75 0 0 1 .19.742l-1.25 4.25a.75.75 0 0 1-.508.508l-4.25 1.25a.75.75 0 0 1-.932-.932l1.25-4.25a.75.75 0 0 1 .508-.508l4.25-1.25a.75.75 0 0 1 .742.19Zm-4.176 2.384-.747 2.539 2.539-.747-1.792-1.792Z`}),(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z`})]}),x=({size:e=20,color:t=`#616161`})=>(0,_.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:[(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M10 3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-2 3.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z`}),(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M15.484 14.227a6.274 6.274 0 0 0-10.968 0l-.437.786a1.338 1.338 0 0 0 1.17 1.987h9.502a1.338 1.338 0 0 0 1.17-1.987l-.437-.786Zm-9.657.728a4.773 4.773 0 0 1 8.346 0l.302.545h-8.95l.302-.545Z`})]}),S=({size:e=20,color:t=`#616161`})=>(0,_.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M6.75 4.5c-1.283 0-2.213 1.025-2.044 2.127.384 2.498 1.296 4.459 2.707 5.89 1.41 1.43 3.373 2.389 5.96 2.786 1.101.17 2.126-.76 2.126-2.044v-.727a.25.25 0 0 0-.187-.242l-1.9-.498a.25.25 0 0 0-.182.022l-1.067.576c-.69.373-1.638.492-2.422-.056a8.678 8.678 0 0 1-2.071-2.09c-.542-.787-.423-1.735-.045-2.428l.57-1.047a.252.252 0 0 0 .022-.182l-.498-1.9a.25.25 0 0 0-.242-.187h-.726Zm-3.526 2.355c-.334-2.174 1.497-3.856 3.527-3.855h.726a1.75 1.75 0 0 1 1.693 1.306l.498 1.9c.113.43.058.885-.153 1.276l-.001.002-.572 1.05c-.191.351-.169.668-.036.86a7.184 7.184 0 0 0 1.694 1.71c.187.13.498.156.85-.034l1.067-.576a1.75 1.75 0 0 1 1.276-.153l1.9.498a1.75 1.75 0 0 1 1.306 1.693v.727c0 2.03-1.68 3.86-3.854 3.527-2.838-.436-5.12-1.511-6.8-3.216-1.68-1.703-2.701-3.978-3.121-6.715Z`})}),C=({size:e=20,color:t=`#616161`})=>(0,_.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,style:{display:`block`,flexShrink:0},children:(0,_.jsx)(`path`,{d:`M5 7.5l5 5 5-5`,stroke:t,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),w=()=>(0,_.jsxs)(`svg`,{width:32,height:32,viewBox:`0 0 20 20`,fill:`#9e9e9e`,"aria-hidden":`true`,children:[(0,_.jsx)(`path`,{fillRule:`evenodd`,d:`M1 5.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-9Zm2-.5a.5.5 0 0 0-.5.5v5.17l2.536-2.536a1.5 1.5 0 0 1 2.122 0l3.01 3.01.87-.879a1.5 1.5 0 0 1 2.122 0l2.34 2.34v-7.1a.5.5 0 0 0-.5-.5H3Z`}),(0,_.jsx)(`path`,{d:`M13.25 8a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z`})]}),T=[`0 1px 0 rgba(26,26,26,0.07)`,`inset 1px 0 0 rgba(0,0,0,0.13)`,`inset -1px 0 0 rgba(0,0,0,0.13)`,`inset 0 -1px 0 rgba(0,0,0,0.17)`,`inset 0 1px 0 rgba(204,204,204,0.5)`].join(`, `),E=[{key:`type`,label:`Equipment Type`},{key:`manufacturer`,label:`Manufacturer`},{key:`model`,label:`Model`},{key:`equipmentId`,label:`Equipment ID`},{key:`_view`,label:``,width:60,render:()=>(0,_.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),style:{fontSize:13,color:`#005bd3`,textDecoration:`underline`,cursor:`pointer`},children:`View`})}],o.__docgenInfo={description:`Card

Base container. All layout types are built on top of this.

Props:
  children — card content
  style    — optional style overrides`,methods:[],displayName:`Card`},s.__docgenInfo={description:`CardSectionTitle

Section header row with optional leading icon.

Props:
  icon  — React element (20×20 SVG)
  title — string`,methods:[],displayName:`CardSectionTitle`},c.__docgenInfo={description:`CardField  (maps to CardDisplayText in Figma)

A label + value pair stacked vertically. Optional icon beside the label.
When linkHref or onLinkClick is provided, value renders as a blue underlined link.

Props:
  icon        — React element (20×20 SVG), shown before the label
  label       — string
  value       — string
  linkHref    — string — makes value a link
  onLinkClick — fn    — makes value a link (preventDefault)`,methods:[],displayName:`CardField`},l.__docgenInfo={description:`CardDivider

Full-bleed 1px horizontal rule at \`#ebebeb\`. Bleeds to the card's edge by
using negative horizontal margin.`,methods:[],displayName:`CardDivider`},u.__docgenInfo={description:`CardImages  (maps to CardDisplayImages in Figma)

Horizontal row of image thumbnails. Supports 1–3 images.
If src is empty/null, shows a grey placeholder.

Props:
  images — array of src strings (1–3)`,methods:[],displayName:`CardImages`,props:{images:{defaultValue:{value:`[]`,computed:!1},required:!1}}},d.__docgenInfo={description:`CardNotes

A section with an optional icon + title heading and a multi-line body text.

Props:
  icon  — React element
  title — string
  text  — string`,methods:[],displayName:`CardNotes`},f.__docgenInfo={description:`CardLayoutType1

Equipment detail card. Shows photos, a 2-column key/value grid, and optional notes.

Props:
  images — string[] (1–3 image src values)
  fields — { label, value, icon?, linkHref?, onLinkClick? }[]
  notes  — string`,methods:[],displayName:`CardLayoutType1`,props:{images:{defaultValue:{value:`[]`,computed:!1},required:!1},fields:{defaultValue:{value:`[]`,computed:!1},required:!1}}},p.__docgenInfo={description:`CardLayoutType2

An accordion card that reveals a tabbed IndexTable of associated components.

Props:
  title         — accordion header title
  description   — subtitle below the title
  tabs          — [{ label }] passed to IndexTable toolbar
  activeTab     — number
  onTabChange   — fn(index)
  tableRows     — { id, type, manufacturer, model, equipmentId }[]
  footer        — ReactNode passed to IndexTable footer (e.g. Pagination)
  defaultOpen   — boolean`,methods:[],displayName:`CardLayoutType2`,props:{title:{defaultValue:{value:`'Associated Components'`,computed:!1},required:!1},tabs:{defaultValue:{value:`[]`,computed:!1},required:!1},activeTab:{defaultValue:{value:`0`,computed:!1},required:!1},tableRows:{defaultValue:{value:`[]`,computed:!1},required:!1},defaultOpen:{defaultValue:{value:`false`,computed:!1},required:!1}}},m.__docgenInfo={description:`CardLayoutType3

Location context card: region, current facility link, and a Google Maps embed.

Props:
  region          — string
  facilityName    — string
  facilityHref    — string (optional, makes facility a link)
  onFacilityClick — fn (optional)
  mapSrc          — string (optional static image src — overrides the embed)`,methods:[],displayName:`CardLayoutType3`},h.__docgenInfo={description:`CardLayoutType4

Contact details card: who added the record and their phone number.

Props:
  addedBy       — string
  contactNumber — string`,methods:[],displayName:`CardLayoutType4`}}));export{f as a,h as c,u as i,D as l,l as n,p as o,c as r,m as s,o as t};