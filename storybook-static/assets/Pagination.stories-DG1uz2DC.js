import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./Pagination-DWXuJL6k.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y=t((()=>{o=e(n(),1),i(),s=r(),c={title:`Components/Pagination`,component:a,parameters:{layout:`centered`},argTypes:{type:{control:`select`,options:[`page`,`table`]},hasPrevious:{control:`boolean`},hasNext:{control:`boolean`}}},l={args:{hasPrevious:!1,hasNext:!0}},u={args:{hasPrevious:!0,hasNext:!0}},d={args:{hasPrevious:!1,hasNext:!1}},f={args:{hasPrevious:!0,hasNext:!0,label:`Showing 1–20 of 80 results`}},p={args:{type:`table`,hasPrevious:!0,hasNext:!0,label:`1–20 of 80 results`},parameters:{layout:`padded`},decorators:[e=>(0,s.jsx)(`div`,{style:{width:480,border:`1px solid #e0e0e0`,borderRadius:8,overflow:`hidden`},children:(0,s.jsx)(e,{})})]},m={name:`Both Types`,parameters:{layout:`padded`},render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,fontFamily:`Inter, sans-serif`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Page type — all states`}),(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,alignItems:`flex-start`},children:[(0,s.jsx)(a,{hasPrevious:!1,hasNext:!0,label:`1 of 5`}),(0,s.jsx)(a,{hasPrevious:!0,hasNext:!0,label:`3 of 5`}),(0,s.jsx)(a,{hasPrevious:!0,hasNext:!1,label:`5 of 5`})]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Table type`}),(0,s.jsx)(`div`,{style:{width:480,border:`1px solid #e0e0e0`,borderRadius:8,overflow:`hidden`},children:(0,s.jsx)(a,{type:`table`,hasPrevious:!0,hasNext:!0,label:`Showing 1–20 of 134`})}),(0,s.jsx)(`div`,{style:{width:480,border:`1px solid #e0e0e0`,borderRadius:8,overflow:`hidden`,marginTop:8},children:(0,s.jsx)(a,{type:`table`,hasPrevious:!1,hasNext:!1,label:`Showing all 12 results`})})]})]})},h={render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,alignItems:`center`},children:[(0,s.jsx)(a,{hasPrevious:!1,hasNext:!0}),(0,s.jsx)(a,{hasPrevious:!0,hasNext:!0}),(0,s.jsx)(a,{hasPrevious:!0,hasNext:!1}),(0,s.jsx)(a,{hasPrevious:!1,hasNext:!1})]})},g={render:()=>{let[e,t]=(0,o.useState)(1);return(0,s.jsxs)(`div`,{style:{textAlign:`center`},children:[(0,s.jsxs)(`p`,{style:{fontSize:13,color:`#616161`,marginBottom:16},children:[`Page `,e,` of `,5]}),(0,s.jsx)(a,{hasPrevious:e>1,hasNext:e<5,onPrevious:()=>t(e=>e-1),onNext:()=>t(e=>e+1),label:`${e} / 5`})]})}},_={name:`Interaction states`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,o.useState)(3),[n,r]=(0,o.useState)(20);return(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32,fontFamily:`Inter, sans-serif`,width:520},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Page navigation`}),(0,s.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,alignItems:`flex-start`},children:(0,s.jsx)(a,{hasPrevious:e>1,hasNext:e<12,onPrevious:()=>t(e=>e-1),onNext:()=>t(e=>e+1),label:`Record ${e} of 12`})})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Table footer`}),(0,s.jsxs)(`div`,{style:{border:`1px solid #e0e0e0`,borderRadius:8,overflow:`hidden`},children:[(0,s.jsx)(`div`,{style:{padding:`12px 16px`,borderBottom:`1px solid #e0e0e0`,background:`#fff`,fontSize:13,color:`#616161`},children:Array.from({length:Math.min(20,134-n)},(e,t)=>(0,s.jsxs)(`div`,{style:{padding:`6px 0`,borderBottom:`1px solid #f0f0f0`,color:`#303030`},children:[`Record `,n+t+1,` — Temperature 4.`,t,`°C`]},t))}),(0,s.jsx)(a,{type:`table`,hasPrevious:n>0,hasNext:n+20<134,onPrevious:()=>r(e=>Math.max(0,e-20)),onNext:()=>r(e=>Math.min(114,e+20)),label:`Showing ${n+1}–${Math.min(n+20,134)} of 134`})]})]})]})}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    hasPrevious: false,
    hasNext: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    hasPrevious: true,
    hasNext: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    hasPrevious: false,
    hasNext: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    hasPrevious: true,
    hasNext: true,
    label: 'Showing 1–20 of 80 results'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'table',
    hasPrevious: true,
    hasNext: true,
    label: '1–20 of 80 results'
  },
  parameters: {
    layout: 'padded'
  },
  decorators: [Story => <div style={{
    width: 480,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    overflow: 'hidden'
  }}><Story /></div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Both Types',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    fontFamily: 'Inter, sans-serif'
  }}>
      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12
      }}>Page type — all states</div>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-start'
      }}>
          <Pagination hasPrevious={false} hasNext={true} label="1 of 5" />
          <Pagination hasPrevious={true} hasNext={true} label="3 of 5" />
          <Pagination hasPrevious={true} hasNext={false} label="5 of 5" />
        </div>
      </div>
      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12
      }}>Table type</div>
        <div style={{
        width: 480,
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden'
      }}>
          <Pagination type="table" hasPrevious={true} hasNext={true} label="Showing 1–20 of 134" />
        </div>
        <div style={{
        width: 480,
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 8
      }}>
          <Pagination type="table" hasPrevious={false} hasNext={false} label="Showing all 12 results" />
        </div>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center'
  }}>
      <Pagination hasPrevious={false} hasNext={true} />
      <Pagination hasPrevious={true} hasNext={true} />
      <Pagination hasPrevious={true} hasNext={false} />
      <Pagination hasPrevious={false} hasNext={false} />
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [page, setPage] = useState(1);
    const total = 5;
    return <div style={{
      textAlign: 'center'
    }}>
        <p style={{
        fontSize: 13,
        color: '#616161',
        marginBottom: 16
      }}>Page {page} of {total}</p>
        <Pagination hasPrevious={page > 1} hasNext={page < total} onPrevious={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)} label={\`\${page} / \${total}\`} />
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [page, setPage] = useState(3);
    const [offset, setOffset] = useState(20);
    const pageSize = 20;
    const total = 134;
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      fontFamily: 'Inter, sans-serif',
      width: 520
    }}>

        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 12
        }}>Page navigation</div>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'flex-start'
        }}>
            <Pagination hasPrevious={page > 1} hasNext={page < 12} onPrevious={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)} label={\`Record \${page} of 12\`} />
          </div>
        </div>

        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 12
        }}>Table footer</div>
          <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          overflow: 'hidden'
        }}>
            <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #e0e0e0',
            background: '#fff',
            fontSize: 13,
            color: '#616161'
          }}>
              {Array.from({
              length: Math.min(pageSize, total - offset)
            }, (_, i) => <div key={i} style={{
              padding: '6px 0',
              borderBottom: '1px solid #f0f0f0',
              color: '#303030'
            }}>
                  Record {offset + i + 1} — Temperature 4.{i}°C
                </div>)}
            </div>
            <Pagination type="table" hasPrevious={offset > 0} hasNext={offset + pageSize < total} onPrevious={() => setOffset(o => Math.max(0, o - pageSize))} onNext={() => setOffset(o => Math.min(total - pageSize, o + pageSize))} label={\`Showing \${offset + 1}–\${Math.min(offset + pageSize, total)} of \${total}\`} />
          </div>
        </div>

      </div>;
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`BothEnabled`,`BothDisabled`,`WithLabel`,`TableType`,`AllTypes`,`AllStates`,`Interactive`,`InteractionStates`]}));y();export{h as AllStates,m as AllTypes,d as BothDisabled,u as BothEnabled,l as Default,_ as InteractionStates,g as Interactive,p as TableType,f as WithLabel,v as __namedExportsOrder,c as default,y as t};