import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./OptionList-DhS20rQi.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b=t((()=>{o=e(n(),1),i(),s=r(),c={title:`Components/OptionList`,component:a,parameters:{layout:`centered`}},l=[{value:`apple-valley`,label:`Apple Valley`},{value:`omaha`,label:`Omaha`},{value:`duluth`,label:`Duluth`},{value:`minneapolis`,label:`Minneapolis`}],u={render:()=>{let[e,t]=(0,o.useState)(`omaha`);return(0,s.jsx)(a,{title:`Location`,options:l,selected:e,onChange:t})}},d={render:()=>{let[e,t]=(0,o.useState)([`vvm`,`maintenance`]);return(0,s.jsx)(a,{title:`Actions taken`,allowMultiple:!0,options:[{value:`transfer`,label:`Vaccine Transfer`},{value:`vvm`,label:`VVM Check`},{value:`discarded`,label:`Frozen Vaccine Discarded`},{value:`shake`,label:`Shake Test Conducted`},{value:`maintenance`,label:`Refrigerator Maintenance`}],selected:e,onChange:t})}},f={render:()=>{let[e,t]=(0,o.useState)(`all`);return(0,s.jsx)(a,{options:[{value:`all`,label:`All`,badge:`12`},{value:`active`,label:`Active`,badge:`3`},{value:`draft`,label:`Draft`,badge:`7`},{value:`archived`,label:`Archived`,badge:`24`}],selected:e,onChange:t})}},p={render:()=>{let[e,t]=(0,o.useState)(`label2`);return(0,s.jsx)(a,{options:l.map(e=>({...e,media:!0})),selected:e,onChange:t})}},m={render:()=>{let[e,t]=(0,o.useState)([]);return(0,s.jsx)(a,{allowMultiple:!0,sections:[{title:`Refrigerators`,options:[{value:`fridge-a`,label:`Fridge A`},{value:`fridge-b`,label:`Fridge B`}]},{title:`Freezers`,options:[{value:`freezer-a`,label:`Freezer A`},{value:`freezer-b`,label:`Freezer B`}]}],selected:e,onChange:t})}},h={render:()=>{let[e,t]=(0,o.useState)(`a`);return(0,s.jsx)(a,{options:[{value:`a`,label:`Available`},{value:`b`,label:`Unavailable`,disabled:!0},{value:`c`,label:`In transit`}],selected:e,onChange:t})}},g={name:`Interaction states`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,o.useState)(`omaha`),[n,r]=(0,o.useState)([`vvm`]);return(0,s.jsxs)(`div`,{style:{display:`flex`,gap:24,flexWrap:`wrap`,alignItems:`flex-start`,fontFamily:`Inter, sans-serif`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Single select`}),(0,s.jsx)(a,{title:`Device location`,options:[{value:`apple-valley`,label:`Apple Valley`,description:`Zone North`},{value:`omaha`,label:`Omaha`,description:`Zone Central`},{value:`duluth`,label:`Duluth`,description:`Zone North`},{value:`minneapolis`,label:`Minneapolis`,description:`Zone Central`},{value:`locked`,label:`Restricted`,disabled:!0}],selected:e,onChange:t}),(0,s.jsxs)(`p`,{style:{marginTop:8,fontSize:12,color:`#616161`},children:[`Selected: `,(0,s.jsx)(`strong`,{children:e})]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Multi-select`}),(0,s.jsx)(a,{allowMultiple:!0,title:`Actions taken`,options:[{value:`vvm`,label:`VVM Check`,badge:`Today`},{value:`transfer`,label:`Vaccine Transfer`},{value:`shake`,label:`Shake Test Conducted`},{value:`maintenance`,label:`Refrigerator Maintenance`},{value:`discarded`,label:`Frozen Vaccine Discarded`,disabled:!0}],selected:n,onChange:r}),(0,s.jsxs)(`p`,{style:{marginTop:8,fontSize:12,color:`#616161`},children:[`Selected: `,(0,s.jsx)(`strong`,{children:n.length?n.join(`, `):`none`})]})]})]})}},_={name:`All States`,render:()=>{let[e,t]=(0,o.useState)(`omaha`),[n,r]=(0,o.useState)([`vvm`]);return(0,s.jsxs)(`div`,{style:{display:`flex`,gap:16,flexWrap:`wrap`,alignItems:`flex-start`,fontFamily:`Inter, sans-serif`},children:[(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Single select`}),(0,s.jsx)(a,{title:`Location`,options:l,selected:e,onChange:t})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Multi-select`}),(0,s.jsx)(a,{allowMultiple:!0,title:`Actions`,selected:n,onChange:r,options:[{value:`vvm`,label:`VVM Check`},{value:`transfer`,label:`Vaccine Transfer`},{value:`discarded`,label:`Frozen Vaccine Discarded`,disabled:!0}]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`With badges + descriptions`}),(0,s.jsx)(a,{selected:e,onChange:t,options:[{value:`omaha`,label:`Omaha`,badge:`3`,description:`Zone North`},{value:`duluth`,label:`Duluth`,badge:`7`,description:`Zone South`},{value:`locked`,label:`Locked facility`,disabled:!0}]})]}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:`Error state`}),(0,s.jsx)(a,{options:l,selected:null,error:`Please select a location.`})]})]})}},v={render:()=>(0,s.jsx)(a,{options:l,selected:null,error:`Please select a location.`})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('omaha');
    return <OptionList title="Location" options={LOCATIONS} selected={val} onChange={setVal} />;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState(['vvm', 'maintenance']);
    const opts = [{
      value: 'transfer',
      label: 'Vaccine Transfer'
    }, {
      value: 'vvm',
      label: 'VVM Check'
    }, {
      value: 'discarded',
      label: 'Frozen Vaccine Discarded'
    }, {
      value: 'shake',
      label: 'Shake Test Conducted'
    }, {
      value: 'maintenance',
      label: 'Refrigerator Maintenance'
    }];
    return <OptionList title="Actions taken" allowMultiple options={opts} selected={val} onChange={setVal} />;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('all');
    const opts = [{
      value: 'all',
      label: 'All',
      badge: '12'
    }, {
      value: 'active',
      label: 'Active',
      badge: '3'
    }, {
      value: 'draft',
      label: 'Draft',
      badge: '7'
    }, {
      value: 'archived',
      label: 'Archived',
      badge: '24'
    }];
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('label2');
    const opts = LOCATIONS.map(o => ({
      ...o,
      media: true
    }));
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState([]);
    const sections = [{
      title: 'Refrigerators',
      options: [{
        value: 'fridge-a',
        label: 'Fridge A'
      }, {
        value: 'fridge-b',
        label: 'Fridge B'
      }]
    }, {
      title: 'Freezers',
      options: [{
        value: 'freezer-a',
        label: 'Freezer A'
      }, {
        value: 'freezer-b',
        label: 'Freezer B'
      }]
    }];
    return <OptionList allowMultiple sections={sections} selected={val} onChange={setVal} />;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [val, setVal] = useState('a');
    const opts = [{
      value: 'a',
      label: 'Available'
    }, {
      value: 'b',
      label: 'Unavailable',
      disabled: true
    }, {
      value: 'c',
      label: 'In transit'
    }];
    return <OptionList options={opts} selected={val} onChange={setVal} />;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [location, setLocation] = useState('omaha');
    const [actions, setActions] = useState(['vvm']);
    return <div style={{
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
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
        }}>Single select</div>
          <OptionList title="Device location" options={[{
          value: 'apple-valley',
          label: 'Apple Valley',
          description: 'Zone North'
        }, {
          value: 'omaha',
          label: 'Omaha',
          description: 'Zone Central'
        }, {
          value: 'duluth',
          label: 'Duluth',
          description: 'Zone North'
        }, {
          value: 'minneapolis',
          label: 'Minneapolis',
          description: 'Zone Central'
        }, {
          value: 'locked',
          label: 'Restricted',
          disabled: true
        }]} selected={location} onChange={setLocation} />
          <p style={{
          marginTop: 8,
          fontSize: 12,
          color: '#616161'
        }}>Selected: <strong>{location}</strong></p>
        </div>

        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>Multi-select</div>
          <OptionList allowMultiple title="Actions taken" options={[{
          value: 'vvm',
          label: 'VVM Check',
          badge: 'Today'
        }, {
          value: 'transfer',
          label: 'Vaccine Transfer'
        }, {
          value: 'shake',
          label: 'Shake Test Conducted'
        }, {
          value: 'maintenance',
          label: 'Refrigerator Maintenance'
        }, {
          value: 'discarded',
          label: 'Frozen Vaccine Discarded',
          disabled: true
        }]} selected={actions} onChange={setActions} />
          <p style={{
          marginTop: 8,
          fontSize: 12,
          color: '#616161'
        }}>
            Selected: <strong>{actions.length ? actions.join(', ') : 'none'}</strong>
          </p>
        </div>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  render: () => {
    const [single, setSingle] = useState('omaha');
    const [multi, setMulti] = useState(['vvm']);
    return <div style={{
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
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
        }}>Single select</div>
          <OptionList title="Location" options={LOCATIONS} selected={single} onChange={setSingle} />
        </div>
        <div>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 8
        }}>Multi-select</div>
          <OptionList allowMultiple title="Actions" selected={multi} onChange={setMulti} options={[{
          value: 'vvm',
          label: 'VVM Check'
        }, {
          value: 'transfer',
          label: 'Vaccine Transfer'
        }, {
          value: 'discarded',
          label: 'Frozen Vaccine Discarded',
          disabled: true
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
        }}>With badges + descriptions</div>
          <OptionList selected={single} onChange={setSingle} options={[{
          value: 'omaha',
          label: 'Omaha',
          badge: '3',
          description: 'Zone North'
        }, {
          value: 'duluth',
          label: 'Duluth',
          badge: '7',
          description: 'Zone South'
        }, {
          value: 'locked',
          label: 'Locked facility',
          disabled: true
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
        }}>Error state</div>
          <OptionList options={LOCATIONS} selected={null} error="Please select a location." />
        </div>
      </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <OptionList options={LOCATIONS} selected={null} error="Please select a location." />
}`,...v.parameters?.docs?.source}}},y=[`SingleSelect`,`MultiSelect`,`WithBadges`,`WithMedia`,`WithSections`,`WithDisabled`,`InteractionStates`,`AllStates`,`WithError`]}));b();export{_ as AllStates,g as InteractionStates,d as MultiSelect,u as SingleSelect,f as WithBadges,h as WithDisabled,v as WithError,p as WithMedia,m as WithSections,y as __namedExportsOrder,c as default,b as t};