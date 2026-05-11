import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{a as n,i as r,n as i,r as a,t as o}from"./Badge-B9KK3cer.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C=e((()=>{n(),s=t(),c={title:`Components/Badge`,component:a,parameters:{layout:`centered`},argTypes:{tone:{control:`select`,options:[...Object.keys(i),...Object.keys(o)]},size:{control:`select`,options:[`medium`,`large`]},progress:{control:`select`,options:[void 0,`incomplete`,`partial`,`complete`]},progressIndicator:{control:`boolean`},icon:{control:`boolean`},onDismiss:{control:!1}}},l={args:{children:`Label`,tone:`default`}},u={args:{children:`Info`,tone:`info`}},d={args:{children:`Active`,tone:`success`}},f={args:{children:`Warning`,tone:`warning`}},p={args:{children:`Critical`,tone:`critical`}},m={args:{children:`Pending`,tone:`attention`}},h={name:`All Tones — Regular`,render:()=>(0,s.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:Object.keys(i).map(e=>(0,s.jsx)(a,{tone:e},e))})},g={name:`Progress Dots (legacy)`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,s.jsx)(a,{progress:`incomplete`,children:`Incomplete`}),(0,s.jsx)(a,{progress:`partial`,children:`Partial`}),(0,s.jsx)(a,{progress:`complete`,children:`Complete`})]})},_={name:`StatusBadge`,render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,s.jsx)(r,{status:`pending`}),(0,s.jsx)(r,{status:`completed`}),(0,s.jsx)(r,{status:`locked`}),(0,s.jsx)(r,{status:`critical`}),(0,s.jsx)(r,{status:`info`})]})},v=({tone:e})=>(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,s.jsx)(a,{tone:e,children:`Label`}),(0,s.jsx)(a,{tone:e,progressIndicator:!0,children:`Label`}),(0,s.jsx)(a,{tone:e,icon:!0,children:`Label`}),(0,s.jsx)(a,{tone:e,onDismiss:()=>{},children:`Label`})]}),y={name:`Strong — Medium`,parameters:{layout:`padded`},render:()=>(0,s.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,display:`flex`,flexDirection:`column`,gap:10},children:Object.keys(o).map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,s.jsx)(`span`,{style:{fontSize:11,color:`#9e9e9e`,width:148,flexShrink:0},children:e}),(0,s.jsx)(v,{tone:e})]},e))})},b={name:`Strong — Large`,parameters:{layout:`padded`},render:()=>(0,s.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,display:`flex`,flexDirection:`column`,gap:12},children:Object.keys(o).map(e=>(0,s.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,s.jsx)(`span`,{style:{fontSize:11,color:`#9e9e9e`,width:148,flexShrink:0},children:e}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,s.jsx)(a,{tone:e,size:`large`,children:`Label`}),(0,s.jsx)(a,{tone:e,size:`large`,progressIndicator:!0,children:`Label`}),(0,s.jsx)(a,{tone:e,size:`large`,icon:!0,children:`Label`}),(0,s.jsx)(a,{tone:e,size:`large`,onDismiss:()=>{},children:`Label`})]})]},e))})},x={name:`All States`,parameters:{layout:`padded`},render:()=>(0,s.jsxs)(`div`,{style:{fontFamily:`Inter, sans-serif`,display:`flex`,flexDirection:`column`,gap:28},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:10},children:`Regular tones`}),(0,s.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:Object.keys(i).map(e=>(0,s.jsx)(a,{tone:e},e))})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:10},children:`Progress dots`}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,s.jsx)(a,{progress:`incomplete`,children:`Incomplete`}),(0,s.jsx)(a,{progress:`partial`,children:`Partial`}),(0,s.jsx)(a,{progress:`complete`,children:`Complete`})]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:10},children:`Strong tones — plain / dot / icon / dismiss`}),(0,s.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:Object.keys(o).map(e=>(0,s.jsx)(v,{tone:e},e))})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:10},children:`Large size`}),(0,s.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,s.jsx)(a,{size:`large`,children:`Default`}),(0,s.jsx)(a,{tone:`info`,size:`large`,children:`Info`}),(0,s.jsx)(a,{tone:`success`,size:`large`,children:`Active`}),(0,s.jsx)(a,{tone:`info-strong`,size:`large`,children:`Info Strong`}),(0,s.jsx)(a,{tone:`success-strong`,size:`large`,children:`Success Strong`}),(0,s.jsx)(a,{tone:`critical-strong`,size:`large`,children:`Critical Strong`})]})]})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Label',
    tone: 'default'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Info',
    tone: 'info'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Active',
    tone: 'success'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Warning',
    tone: 'warning'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Critical',
    tone: 'critical'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Pending',
    tone: 'attention'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'All Tones — Regular',
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
  }}>
      {Object.keys(BADGE_TONES).map(tone => <Badge key={tone} tone={tone} />)}
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Progress Dots (legacy)',
  render: () => <div style={{
    display: 'flex',
    gap: 8
  }}>
      <Badge progress="incomplete">Incomplete</Badge>
      <Badge progress="partial">Partial</Badge>
      <Badge progress="complete">Complete</Badge>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'StatusBadge',
  render: () => <div style={{
    display: 'flex',
    gap: 8
  }}>
      <StatusBadge status="pending" />
      <StatusBadge status="completed" />
      <StatusBadge status="locked" />
      <StatusBadge status="critical" />
      <StatusBadge status="info" />
    </div>
}`,..._.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Strong — Medium',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  }}>
      {Object.keys(BADGE_STRONG_TONES).map(tone => <div key={tone} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }}>
          <span style={{
        fontSize: 11,
        color: '#9e9e9e',
        width: 148,
        flexShrink: 0
      }}>{tone}</span>
          <StrongRow tone={tone} />
        </div>)}
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Strong — Large',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      {Object.keys(BADGE_STRONG_TONES).map(tone => <div key={tone} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }}>
          <span style={{
        fontSize: 11,
        color: '#9e9e9e',
        width: 148,
        flexShrink: 0
      }}>{tone}</span>
          <div style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
            <Badge tone={tone} size="large">Label</Badge>
            <Badge tone={tone} size="large" progressIndicator>Label</Badge>
            <Badge tone={tone} size="large" icon>Label</Badge>
            <Badge tone={tone} size="large" onDismiss={() => {}}>Label</Badge>
          </div>
        </div>)}
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: 28
  }}>

      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 10
      }}>Regular tones</div>
        <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }}>
          {Object.keys(BADGE_TONES).map(tone => <Badge key={tone} tone={tone} />)}
        </div>
      </div>

      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 10
      }}>Progress dots</div>
        <div style={{
        display: 'flex',
        gap: 8
      }}>
          <Badge progress="incomplete">Incomplete</Badge>
          <Badge progress="partial">Partial</Badge>
          <Badge progress="complete">Complete</Badge>
        </div>
      </div>

      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 10
      }}>
          Strong tones — plain / dot / icon / dismiss
        </div>
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
          {Object.keys(BADGE_STRONG_TONES).map(tone => <StrongRow key={tone} tone={tone} />)}
        </div>
      </div>

      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 10
      }}>Large size</div>
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>
          <Badge size="large">Default</Badge>
          <Badge tone="info" size="large">Info</Badge>
          <Badge tone="success" size="large">Active</Badge>
          <Badge tone="info-strong" size="large">Info Strong</Badge>
          <Badge tone="success-strong" size="large">Success Strong</Badge>
          <Badge tone="critical-strong" size="large">Critical Strong</Badge>
        </div>
      </div>

    </div>
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Info`,`Success`,`Warning`,`Critical`,`Attention`,`AllTones`,`WithProgress`,`Statuses`,`StrongTones`,`StrongLarge`,`AllStates`]}));C();export{x as AllStates,h as AllTones,m as Attention,p as Critical,l as Default,u as Info,_ as Statuses,b as StrongLarge,y as StrongTones,d as Success,f as Warning,g as WithProgress,S as __namedExportsOrder,c as default,C as t};