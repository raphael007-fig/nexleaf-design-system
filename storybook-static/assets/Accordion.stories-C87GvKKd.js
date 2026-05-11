import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";function i({title:e,description:t,required:n,open:r,onToggle:i,hasContent:o,children:s}){return(0,a.jsxs)(`div`,{style:{border:`1.5px solid #e0e0e0`,borderRadius:10,overflow:`hidden`,width:`100%`},children:[(0,a.jsxs)(`button`,{type:`button`,onClick:i,style:{width:`100%`,padding:`14px 16px`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,background:r?`#f7f9fc`:`#fff`,border:`none`,cursor:`pointer`,borderBottom:r?`1px solid #e0e0e0`:`none`,fontFamily:`Inter,sans-serif`,gap:12},children:[(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:2,textAlign:`left`},children:[(0,a.jsxs)(`span`,{style:{fontSize:14,fontWeight:600,color:`#303030`,display:`flex`,alignItems:`center`,gap:6},children:[e,n&&(0,a.jsx)(`span`,{style:{color:`#d92d20`},children:`*`}),o&&!r&&(0,a.jsx)(`span`,{style:{width:7,height:7,borderRadius:`50%`,background:`#12B76A`,display:`inline-block`,flexShrink:0}})]}),t&&(0,a.jsx)(`span`,{style:{fontSize:13,fontWeight:450,color:`#616161`,lineHeight:`20px`,fontFamily:`Inter,sans-serif`},children:t})]}),(0,a.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 18 18`,fill:`none`,style:{transition:`transform 0.2s`,transform:r?`rotate(180deg)`:`rotate(0deg)`,flexShrink:0},children:(0,a.jsx)(`path`,{d:`M4.5 6.75L9 11.25L13.5 6.75`,stroke:`#616161`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),r&&(0,a.jsx)(`div`,{style:{padding:`20px 16px`,display:`flex`,flexDirection:`column`,gap:20},children:s})]})}var a,o=t((()=>{a=r(),i.__docgenInfo={description:``,methods:[],displayName:`Accordion`}})),s,c,l,u,d,f,p,m,h,g,_,v=t((()=>{s=e(n(),1),o(),c=r(),l={title:`Components/Accordion`,component:i,parameters:{layout:`centered`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:400},children:(0,c.jsx)(e,{})})]},u={args:{title:`Morning Reading`,open:!1,required:!0}},d={args:{title:`Morning Reading`,open:!0,required:!0,children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#616161`},children:`Form fields go here.`})}},f={args:{title:`Evening Reading`,open:!1,hasContent:!0,children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#616161`},children:`Already has data.`})}},p={name:`With description`,render:()=>{let[e,t]=(0,s.useState)(!1);return(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:400,fontFamily:`Inter, sans-serif`},children:[(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Closed with description`}),(0,c.jsx)(i,{title:`Morning Reading`,description:`Record the temperature at the start of the day`,required:!0,open:!1}),(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginTop:8},children:`Open with description`}),(0,c.jsx)(i,{title:`Associated Components`,description:`Primary components and accessories linked to this equipment`,open:e,onToggle:()=>t(e=>!e),children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#303030`,margin:0},children:`Content goes here.`})})]})}},m={render:()=>{let[e,t]=(0,s.useState)(!1);return(0,c.jsx)(i,{title:`Morning Temperature Reading`,required:!0,open:e,onToggle:()=>t(!e),children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#303030`},children:`Temperature: 4.5°C`})})}},h={name:`Interaction states`,render:()=>{let[e,t]=(0,s.useState)(!1),[n,r]=(0,s.useState)(!1),[a,o]=(0,s.useState)(!0),[l,u]=(0,s.useState)(``),[d,f]=(0,s.useState)(`4.1`),[p,m]=(0,s.useState)(``);return(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8,width:400,fontFamily:`Inter, sans-serif`},children:[(0,c.jsx)(i,{title:`Morning Reading`,required:!0,open:e,onToggle:()=>t(e=>!e),hasContent:!!l,children:(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:(0,c.jsxs)(`label`,{style:{display:`flex`,flexDirection:`column`,gap:6,fontSize:13,fontWeight:500,color:`#303030`},children:[`Temperature (°C)`,(0,c.jsx)(`input`,{type:`number`,placeholder:`e.g. 4.5`,value:l,onChange:e=>u(e.target.value),style:{padding:`10px 14px`,border:`1px solid #8a8a8a`,borderRadius:8,fontSize:13,fontFamily:`Inter, sans-serif`,outline:`none`}})]})})}),(0,c.jsx)(i,{title:`Evening Reading`,required:!0,open:n,onToggle:()=>r(e=>!e),hasContent:!!d,children:(0,c.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:(0,c.jsxs)(`label`,{style:{display:`flex`,flexDirection:`column`,gap:6,fontSize:13,fontWeight:500,color:`#303030`},children:[`Temperature (°C)`,(0,c.jsx)(`input`,{type:`number`,placeholder:`e.g. 4.5`,value:d,onChange:e=>f(e.target.value),style:{padding:`10px 14px`,border:`1px solid #8a8a8a`,borderRadius:8,fontSize:13,fontFamily:`Inter, sans-serif`,outline:`none`}})]})})}),(0,c.jsx)(i,{title:`Notes`,open:a,onToggle:()=>o(e=>!e),hasContent:!!p,children:(0,c.jsx)(`textarea`,{placeholder:`Add optional notes…`,value:p,onChange:e=>m(e.target.value),rows:3,style:{width:`100%`,padding:`10px 14px`,border:`1px solid #8a8a8a`,borderRadius:8,fontSize:13,fontFamily:`Inter, sans-serif`,resize:`vertical`,outline:`none`,boxSizing:`border-box`}})})]})}},g={name:`All States`,render:()=>{let[e,t]=(0,s.useState)(!1),[n,r]=(0,s.useState)(!0);return(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:400,fontFamily:`Inter, sans-serif`},children:[(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Closed`}),(0,c.jsx)(i,{title:`Morning Reading`,open:!1,required:!0}),(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Closed — has content (green dot)`}),(0,c.jsx)(i,{title:`Evening Reading`,open:!1,hasContent:!0}),(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Open`}),(0,c.jsx)(i,{title:`Morning Reading`,open:!0,required:!0,onToggle:()=>{},children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#616161`,margin:0},children:`Form fields go here`})}),(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`With description`}),(0,c.jsx)(i,{title:`Associated Components`,description:`Primary components and accessories linked to this equipment`,open:!1}),(0,c.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Interactive`}),(0,c.jsx)(i,{title:`Click to toggle`,required:!0,open:e,onToggle:()=>t(e=>!e),hasContent:e,children:(0,c.jsx)(`p`,{style:{fontSize:13,color:`#303030`,margin:0},children:`Temperature: 4.5°C`})})]})}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Morning Reading',
    open: false,
    required: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Morning Reading',
    open: true,
    required: true,
    children: <p style={{
      fontSize: 13,
      color: '#616161'
    }}>Form fields go here.</p>
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Evening Reading',
    open: false,
    hasContent: true,
    children: <p style={{
      fontSize: 13,
      color: '#616161'
    }}>Already has data.</p>
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'With description',
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: 400,
      fontFamily: 'Inter, sans-serif'
    }}>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>Closed with description</div>
        <Accordion title="Morning Reading" description="Record the temperature at the start of the day" required open={false} />

        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginTop: 8
      }}>Open with description</div>
        <Accordion title="Associated Components" description="Primary components and accessories linked to this equipment" open={open} onToggle={() => setOpen(o => !o)}>
          <p style={{
          fontSize: 13,
          color: '#303030',
          margin: 0
        }}>Content goes here.</p>
        </Accordion>
      </div>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Accordion title="Morning Temperature Reading" required open={open} onToggle={() => setOpen(!open)}>
        <p style={{
        fontSize: 13,
        color: '#303030'
      }}>Temperature: 4.5°C</p>
      </Accordion>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  render: () => {
    const [openMorning, setOpenMorning] = useState(false);
    const [openEvening, setOpenEvening] = useState(false);
    const [openNotes, setOpenNotes] = useState(true);
    const [morning, setMorning] = useState('');
    const [evening, setEvening] = useState('4.1');
    const [notes, setNotes] = useState('');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: 400,
      fontFamily: 'Inter, sans-serif'
    }}>
        <Accordion title="Morning Reading" required open={openMorning} onToggle={() => setOpenMorning(o => !o)} hasContent={!!morning}>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
            <label style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: '#303030'
          }}>
              Temperature (°C)
              <input type="number" placeholder="e.g. 4.5" value={morning} onChange={e => setMorning(e.target.value)} style={{
              padding: '10px 14px',
              border: '1px solid #8a8a8a',
              borderRadius: 8,
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              outline: 'none'
            }} />
            </label>
          </div>
        </Accordion>

        <Accordion title="Evening Reading" required open={openEvening} onToggle={() => setOpenEvening(o => !o)} hasContent={!!evening}>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}>
            <label style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            color: '#303030'
          }}>
              Temperature (°C)
              <input type="number" placeholder="e.g. 4.5" value={evening} onChange={e => setEvening(e.target.value)} style={{
              padding: '10px 14px',
              border: '1px solid #8a8a8a',
              borderRadius: 8,
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              outline: 'none'
            }} />
            </label>
          </div>
        </Accordion>

        <Accordion title="Notes" open={openNotes} onToggle={() => setOpenNotes(o => !o)} hasContent={!!notes}>
          <textarea placeholder="Add optional notes…" value={notes} onChange={e => setNotes(e.target.value)} rows={3} style={{
          width: '100%',
          padding: '10px 14px',
          border: '1px solid #8a8a8a',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: 'Inter, sans-serif',
          resize: 'vertical',
          outline: 'none',
          boxSizing: 'border-box'
        }} />
        </Accordion>
      </div>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  render: () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(true);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: 400,
      fontFamily: 'Inter, sans-serif'
    }}>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>Closed</div>
        <Accordion title="Morning Reading" open={false} required />

        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>Closed — has content (green dot)</div>
        <Accordion title="Evening Reading" open={false} hasContent />

        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>Open</div>
        <Accordion title="Morning Reading" open={true} required onToggle={() => {}}>
          <p style={{
          fontSize: 13,
          color: '#616161',
          margin: 0
        }}>Form fields go here</p>
        </Accordion>

        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>With description</div>
        <Accordion title="Associated Components" description="Primary components and accessories linked to this equipment" open={false} />

        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em'
      }}>Interactive</div>
        <Accordion title="Click to toggle" required open={open1} onToggle={() => setOpen1(o => !o)} hasContent={open1}>
          <p style={{
          fontSize: 13,
          color: '#303030',
          margin: 0
        }}>Temperature: 4.5°C</p>
        </Accordion>
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_=[`Collapsed`,`Expanded`,`WithContent`,`WithDescription`,`Interactive`,`InteractionStates`,`AllStates`]}));v();export{g as AllStates,u as Collapsed,d as Expanded,h as InteractionStates,m as Interactive,f as WithContent,p as WithDescription,_ as __namedExportsOrder,l as default,v as t};