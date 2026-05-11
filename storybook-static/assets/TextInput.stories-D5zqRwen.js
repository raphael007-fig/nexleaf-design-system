import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,t as r}from"./TextInput-CJbGSvnV.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b=e((()=>{n(),i=t(),a={title:`Components/TextInput`,component:r,parameters:{layout:`padded`},argTypes:{disabled:{control:`boolean`},readOnly:{control:`boolean`},required:{control:`boolean`},clearButton:{control:`boolean`},borderless:{control:`boolean`},tone:{control:`select`,options:[`default`,`magic`]},size:{control:`select`,options:[`medium`,`slim`]},label:{control:`text`},placeholder:{control:`text`}},decorators:[e=>(0,i.jsx)(`div`,{style:{width:320},children:(0,i.jsx)(e,{})})]},o={args:{label:`Store name`,placeholder:`e.g. My Store`}},s=({children:e})=>(0,i.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:4,marginTop:20},children:e}),c={name:`All States`,parameters:{layout:`padded`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:360},children:(0,i.jsx)(e,{})})],render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,fontFamily:`Inter, sans-serif`},children:[(0,i.jsx)(`h2`,{style:{fontSize:16,fontWeight:600,color:`#303030`,marginBottom:4},children:`TextInput State Matrix`}),(0,i.jsx)(`p`,{style:{fontSize:13,color:`#616161`,marginBottom:8,lineHeight:1.5},children:`Click each input to verify focus ring. Error state has no focus ring.`}),(0,i.jsx)(s,{children:`Rest (default)`}),(0,i.jsx)(r,{label:`Temperature`,placeholder:`4.5`}),(0,i.jsx)(s,{children:`Required`}),(0,i.jsx)(r,{label:`Email address`,placeholder:`user@example.com`,required:!0}),(0,i.jsx)(s,{children:`With prefix + suffix`}),(0,i.jsx)(r,{label:`Temperature reading`,prefix:`~`,suffix:`°C`,placeholder:`4.5`}),(0,i.jsx)(s,{children:`With help text`}),(0,i.jsx)(r,{label:`Password`,type:`password`,helpText:`Must be at least 8 characters.`}),(0,i.jsx)(s,{children:`Error state`}),(0,i.jsx)(r,{label:`Email`,value:`not-an-email`,error:`Enter a valid email address.`}),(0,i.jsx)(s,{children:`Error with required`}),(0,i.jsx)(r,{label:`Temperature`,required:!0,value:``,error:`Temperature is required.`}),(0,i.jsx)(s,{children:`Disabled`}),(0,i.jsx)(r,{label:`Record ID`,value:`REC-0042`,disabled:!0}),(0,i.jsx)(s,{children:`Read-only`}),(0,i.jsx)(r,{label:`Created by`,value:`system@nexleaf.org`,readOnly:!0}),(0,i.jsx)(s,{children:`With clear button`}),(0,i.jsx)(r,{label:`Search`,value:`fridge zone A`,clearButton:!0}),(0,i.jsx)(s,{children:`Slim size`}),(0,i.jsx)(r,{label:`Quick filter`,placeholder:`Type to filter…`,size:`slim`}),(0,i.jsx)(s,{children:`Magic / AI tone`}),(0,i.jsx)(r,{label:`AI prompt`,tone:`magic`,placeholder:`Describe your product...`}),(0,i.jsx)(s,{children:`Borderless`}),(0,i.jsx)(r,{label:`Inline edit`,placeholder:`Click to edit…`,borderless:!0}),(0,i.jsx)(s,{children:`Label action`}),(0,i.jsx)(r,{label:`Password`,type:`password`,labelAction:`Forgot password?`,onLabelAction:()=>{}})]})},l={name:`Interaction states`,parameters:{layout:`padded`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:360},children:(0,i.jsx)(e,{})})],render:()=>{let[e,t]=useState(``),[n,a]=useState(`FRZ-A01`),[o,s]=useState(``),[c,l]=useState(!1);return(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,fontFamily:`Inter, sans-serif`},children:[(0,i.jsx)(r,{label:`Temperature`,required:!0,suffix:`°C`,placeholder:`e.g. 4.5`,type:`number`,value:e,onChange:t,error:c&&!e?`Temperature reading is required.`:void 0,helpText:`Normal range: 2 – 8 °C`}),(0,i.jsx)(r,{label:`Device ID`,placeholder:`e.g. FRZ-001`,value:n,onChange:a}),(0,i.jsx)(r,{label:`Notes`,placeholder:`Optional notes…`,value:o,onChange:s}),(0,i.jsx)(r,{label:`Record ID`,value:`REC-0042`,disabled:!0}),(0,i.jsx)(`button`,{onClick:()=>l(!0),style:{padding:`10px 20px`,background:`#005bd3`,color:`#fff`,border:`none`,borderRadius:8,fontFamily:`Inter, sans-serif`,fontSize:13,fontWeight:600,cursor:`pointer`,alignSelf:`flex-start`},children:`Save reading`}),c&&e&&(0,i.jsx)(`div`,{style:{fontSize:12,color:`#0c5132`,background:`#cdfee1`,borderRadius:8,padding:`8px 12px`},children:`Reading saved successfully.`})]})}},u={args:{label:`Store name`,placeholder:`e.g. My Store`}},d={args:{label:`Email`,placeholder:`user@example.com`,required:!0}},f={args:{label:`Temperature`,suffix:`°C`,placeholder:`4.5`}},p={args:{label:`Price`,prefix:`$`,placeholder:`0.00`}},m={args:{label:`Email`,value:`not-an-email`,error:`Enter a valid email address.`}},h={args:{label:`Password`,type:`password`,helpText:`Must be at least 8 characters.`}},g={args:{label:`Read-only field`,value:`Cannot edit`,disabled:!0}},_={args:{label:`Search`,value:`Some text`,clearButton:!0}},v={args:{label:`AI prompt`,placeholder:`Describe your product...`,tone:`magic`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Store name',
    placeholder: 'e.g. My Store'
  }
}`,...o.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    layout: 'padded'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>],
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif'
  }}>
      <h2 style={{
      fontSize: 16,
      fontWeight: 600,
      color: '#303030',
      marginBottom: 4
    }}>TextInput State Matrix</h2>
      <p style={{
      fontSize: 13,
      color: '#616161',
      marginBottom: 8,
      lineHeight: 1.5
    }}>
        Click each input to verify focus ring. Error state has no focus ring.
      </p>

      <StateLabel>Rest (default)</StateLabel>
      <TextInput label="Temperature" placeholder="4.5" />

      <StateLabel>Required</StateLabel>
      <TextInput label="Email address" placeholder="user@example.com" required />

      <StateLabel>With prefix + suffix</StateLabel>
      <TextInput label="Temperature reading" prefix="~" suffix="°C" placeholder="4.5" />

      <StateLabel>With help text</StateLabel>
      <TextInput label="Password" type="password" helpText="Must be at least 8 characters." />

      <StateLabel>Error state</StateLabel>
      <TextInput label="Email" value="not-an-email" error="Enter a valid email address." />

      <StateLabel>Error with required</StateLabel>
      <TextInput label="Temperature" required value="" error="Temperature is required." />

      <StateLabel>Disabled</StateLabel>
      <TextInput label="Record ID" value="REC-0042" disabled />

      <StateLabel>Read-only</StateLabel>
      <TextInput label="Created by" value="system@nexleaf.org" readOnly />

      <StateLabel>With clear button</StateLabel>
      <TextInput label="Search" value="fridge zone A" clearButton />

      <StateLabel>Slim size</StateLabel>
      <TextInput label="Quick filter" placeholder="Type to filter…" size="slim" />

      <StateLabel>Magic / AI tone</StateLabel>
      <TextInput label="AI prompt" tone="magic" placeholder="Describe your product..." />

      <StateLabel>Borderless</StateLabel>
      <TextInput label="Inline edit" placeholder="Click to edit…" borderless />

      <StateLabel>Label action</StateLabel>
      <TextInput label="Password" type="password" labelAction="Forgot password?" onLabelAction={() => {}} />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>],
  render: () => {
    const [temp, setTemp] = useState('');
    const [device, setDevice] = useState('FRZ-A01');
    const [notes, setNotes] = useState('');
    const [attempted, setAttempted] = useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: 'Inter, sans-serif'
    }}>
        <TextInput label="Temperature" required suffix="°C" placeholder="e.g. 4.5" type="number" value={temp} onChange={setTemp} error={attempted && !temp ? 'Temperature reading is required.' : undefined} helpText="Normal range: 2 – 8 °C" />
        <TextInput label="Device ID" placeholder="e.g. FRZ-001" value={device} onChange={setDevice} />
        <TextInput label="Notes" placeholder="Optional notes…" value={notes} onChange={setNotes} />
        <TextInput label="Record ID" value="REC-0042" disabled />
        <button onClick={() => setAttempted(true)} style={{
        padding: '10px 20px',
        background: '#005bd3',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        fontFamily: 'Inter, sans-serif',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        alignSelf: 'flex-start'
      }}>
          Save reading
        </button>
        {attempted && temp && <div style={{
        fontSize: 12,
        color: '#0c5132',
        background: '#cdfee1',
        borderRadius: 8,
        padding: '8px 12px'
      }}>
            Reading saved successfully.
          </div>}
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Store name',
    placeholder: 'e.g. My Store'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    required: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Temperature',
    suffix: '°C',
    placeholder: '4.5'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Price',
    prefix: '$',
    placeholder: '0.00'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    value: 'not-an-email',
    error: 'Enter a valid email address.'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Must be at least 8 characters.'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Read-only field',
    value: 'Cannot edit',
    disabled: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    value: 'Some text',
    clearButton: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'AI prompt',
    placeholder: 'Describe your product...',
    tone: 'magic'
  }
}`,...v.parameters?.docs?.source}}},y=[`Playground`,`AllStates`,`InteractionStates`,`Default`,`Required`,`WithSuffix`,`WithPrefix`,`WithError`,`WithHelpText`,`Disabled`,`ClearButton`,`MagicTone`]}));b();export{c as AllStates,_ as ClearButton,u as Default,g as Disabled,l as InteractionStates,v as MagicTone,o as Playground,d as Required,m as WithError,h as WithHelpText,p as WithPrefix,f as WithSuffix,y as __namedExportsOrder,a as default,b as t};