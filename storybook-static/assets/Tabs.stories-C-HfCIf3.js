import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./Tabs-D1XHWI7e.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b=t((()=>{o=e(n(),1),i(),s=r(),c={title:`Components/Tabs`,component:a,parameters:{layout:`centered`}},l=[{label:`All`},{label:`Active`},{label:`Draft`},{label:`Archived`}],u={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t})}},d={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:[{label:`All`,badge:`42`},{label:`Active`,badge:`12`},{label:`Draft`,badge:`8`},{label:`Archived`,badge:`22`}],activeIndex:e,onChange:t})}},f={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t,moreViews:!0})}},p={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t,canAddNew:!0})}},m={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:l.map((t,n)=>({...t,actions:n===e})),activeIndex:e,onChange:t})}},h={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t,fitted:!0})})}},g={name:`Interaction states`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsxs)(`div`,{style:{fontFamily:`Inter, sans-serif`,width:560},children:[(0,s.jsx)(a,{tabs:[{label:`All`,badge:`42`},{label:`Active`,badge:`12`},{label:`Draft`,badge:`8`},{label:`Archived`,badge:`22`,disabled:!1},{label:`Locked`,disabled:!0}],activeIndex:e,onChange:t}),(0,s.jsx)(`div`,{style:{marginTop:0,padding:`16px 20px`,background:`#ffffff`,border:`1px solid #e0e0e0`,borderTop:`none`,borderRadius:`0 0 8px 8px`,fontSize:13,color:`#616161`,minHeight:60},children:[`Showing all 42 temperature records across all devices.`,`Showing 12 active devices currently recording.`,`8 draft records awaiting review.`,`22 archived records.`,null][e]??(0,s.jsx)(`span`,{style:{color:`#b5b5b5`},children:`This tab is locked.`})})]})}},_={name:`All States`,render:()=>{let[e,t]=(0,o.useState)(0),[n,r]=(0,o.useState)(0);return(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,fontFamily:`Inter, sans-serif`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Default`}),(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`With badges`}),(0,s.jsx)(a,{activeIndex:e,onChange:t,tabs:[{label:`All`,badge:`42`},{label:`Active`,badge:`12`},{label:`Draft`,badge:`8`},{label:`Archived`,badge:`22`}]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`With disabled tab`}),(0,s.jsx)(a,{activeIndex:0,onChange:()=>{},tabs:[{label:`All`},{label:`Active`},{label:`Draft`,disabled:!0},{label:`Archived`}]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Fitted (400px container)`}),(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(a,{fitted:!0,activeIndex:n,onChange:r,tabs:[{label:`Morning`},{label:`Evening`},{label:`Both`}]})})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`More views + Add new`}),(0,s.jsx)(a,{tabs:l,activeIndex:e,onChange:t,moreViews:!0,canAddNew:!0})]})]})}},v={render:()=>{let[e,t]=(0,o.useState)(0);return(0,s.jsx)(a,{tabs:[{label:`All`},{label:`Active`},{label:`Draft`,disabled:!0},{label:`Archived`}],activeIndex:e,onChange:t})}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} />;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [{
      label: 'All',
      badge: '42'
    }, {
      label: 'Active',
      badge: '12'
    }, {
      label: 'Draft',
      badge: '8'
    }, {
      label: 'Archived',
      badge: '22'
    }];
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} moreViews />;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    return <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} canAddNew />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = DEMO_TABS.map((t, i) => ({
      ...t,
      actions: i === active
    }));
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    return <div style={{
      width: 400
    }}>
        <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} fitted />
      </div>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [{
      label: 'All',
      badge: '42'
    }, {
      label: 'Active',
      badge: '12'
    }, {
      label: 'Draft',
      badge: '8'
    }, {
      label: 'Archived',
      badge: '22',
      disabled: false
    }, {
      label: 'Locked',
      disabled: true
    }];
    const content = ['Showing all 42 temperature records across all devices.', 'Showing 12 active devices currently recording.', '8 draft records awaiting review.', '22 archived records.', null];
    return <div style={{
      fontFamily: 'Inter, sans-serif',
      width: 560
    }}>
        <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />
        <div style={{
        marginTop: 0,
        padding: '16px 20px',
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderTop: 'none',
        borderRadius: '0 0 8px 8px',
        fontSize: 13,
        color: '#616161',
        minHeight: 60
      }}>
          {content[active] ?? <span style={{
          color: '#b5b5b5'
        }}>This tab is locked.</span>}
        </div>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  render: () => {
    const [active, setActive] = useState(0);
    const [active2, setActive2] = useState(0);
    return <div style={{
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
          marginBottom: 8
        }}>Default</div>
          <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} />
        </div>
        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>With badges</div>
          <Tabs activeIndex={active} onChange={setActive} tabs={[{
          label: 'All',
          badge: '42'
        }, {
          label: 'Active',
          badge: '12'
        }, {
          label: 'Draft',
          badge: '8'
        }, {
          label: 'Archived',
          badge: '22'
        }]} />
        </div>
        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>With disabled tab</div>
          <Tabs activeIndex={0} onChange={() => {}} tabs={[{
          label: 'All'
        }, {
          label: 'Active'
        }, {
          label: 'Draft',
          disabled: true
        }, {
          label: 'Archived'
        }]} />
        </div>
        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>Fitted (400px container)</div>
          <div style={{
          width: 400
        }}>
            <Tabs fitted activeIndex={active2} onChange={setActive2} tabs={[{
            label: 'Morning'
          }, {
            label: 'Evening'
          }, {
            label: 'Both'
          }]} />
          </div>
        </div>
        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>More views + Add new</div>
          <Tabs tabs={DEMO_TABS} activeIndex={active} onChange={setActive} moreViews canAddNew />
        </div>
      </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = [{
      label: 'All'
    }, {
      label: 'Active'
    }, {
      label: 'Draft',
      disabled: true
    }, {
      label: 'Archived'
    }];
    return <Tabs tabs={tabs} activeIndex={active} onChange={setActive} />;
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`WithBadges`,`WithMoreViews`,`WithAddNew`,`WithActions`,`Fitted`,`InteractionStates`,`AllStates`,`WithDisabled`]}));b();export{_ as AllStates,u as Default,h as Fitted,g as InteractionStates,m as WithActions,p as WithAddNew,d as WithBadges,v as WithDisabled,f as WithMoreViews,y as __namedExportsOrder,c as default,b as t};