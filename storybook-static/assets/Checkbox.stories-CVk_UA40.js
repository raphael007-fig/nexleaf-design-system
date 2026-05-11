import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{i,n as a,r as o,t as s}from"./Checkbox-BmDu-t7x.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w=t((()=>{c=e(n(),1),i(),l=r(),u={title:`Components/Checkbox`,component:s,parameters:{layout:`centered`},argTypes:{checked:{control:`select`,options:[!1,!0,`indeterminate`]},disabled:{control:`boolean`},tone:{control:`select`,options:[`default`,`magic`]}}},d={args:{label:`Remember me`,checked:!1}},f={args:{label:`Remember me`,checked:!0}},p={args:{label:`Select all`,checked:`indeterminate`}},m={args:{label:`Disabled option`,checked:!1,disabled:!0}},h={args:{label:`I agree`,error:`You must agree to continue.`}},g={args:{label:`Subscribe`,helpText:`Receive weekly updates.`}},_={render:()=>{let[e,t]=(0,c.useState)(!1);return(0,l.jsx)(s,{label:`Toggle me`,checked:e,onChange:t})}},v={name:`RadioButton`,render:()=>{let[e,t]=(0,c.useState)(`a`);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,l.jsx)(o,{label:`Option A`,checked:e===`a`,onChange:()=>t(`a`)}),(0,l.jsx)(o,{label:`Option B`,checked:e===`b`,onChange:()=>t(`b`)}),(0,l.jsx)(o,{label:`Disabled`,checked:!1,disabled:!0})]})}},y={name:`ChoiceList (single)`,render:()=>{let[e,t]=(0,c.useState)(`omaha`);return(0,l.jsx)(a,{title:`Location`,selected:e,onChange:t,choices:[{value:`apple-valley`,label:`Apple Valley`},{value:`omaha`,label:`Omaha`},{value:`duluth`,label:`Duluth`}]})}},b={name:`All States`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,fontFamily:`Inter, sans-serif`},children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`},children:`Checkbox states`}),(0,l.jsx)(s,{label:`Unchecked`,checked:!1}),(0,l.jsx)(s,{label:`Checked`,checked:!0}),(0,l.jsx)(s,{label:`Indeterminate`,checked:`indeterminate`}),(0,l.jsx)(s,{label:`Disabled unchecked`,checked:!1,disabled:!0}),(0,l.jsx)(s,{label:`Disabled checked`,checked:!0,disabled:!0}),(0,l.jsx)(s,{label:`With error`,checked:!1,error:`This field is required.`}),(0,l.jsx)(s,{label:`With help text`,checked:!1,helpText:`This option enables daily alerts.`}),(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginTop:8},children:`Radio button states`}),(0,l.jsx)(o,{label:`Unselected`,checked:!1}),(0,l.jsx)(o,{label:`Selected`,checked:!0}),(0,l.jsx)(o,{label:`Disabled`,checked:!1,disabled:!0})]})},x={name:`Interaction states`,render:()=>{let[e,t]=(0,c.useState)({morning:!0,evening:!1,alerts:!1,terms:!1}),[n,r]=(0,c.useState)(`celsius`),i=e=>t(t=>({...t,[e]:!t[e]}));return(0,l.jsxs)(`div`,{style:{display:`flex`,gap:40,fontFamily:`Inter, sans-serif`,alignItems:`flex-start`,flexWrap:`wrap`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:6},children:`Checkboxes`}),(0,l.jsx)(s,{label:`Morning session`,checked:e.morning,onChange:()=>i(`morning`),helpText:`Records at 07:00 – 12:00`}),(0,l.jsx)(s,{label:`Evening session`,checked:e.evening,onChange:()=>i(`evening`)}),(0,l.jsx)(s,{label:`Enable alerts`,checked:e.alerts,onChange:()=>i(`alerts`)}),(0,l.jsx)(s,{label:`Accept terms`,checked:e.terms,onChange:()=>i(`terms`),error:e.terms?void 0:`You must accept to continue.`}),(0,l.jsx)(s,{label:`Locked option`,checked:!0,disabled:!0})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:6},children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:6},children:`Radio buttons`}),(0,l.jsx)(o,{label:`Celsius (°C)`,checked:n===`celsius`,onChange:()=>r(`celsius`)}),(0,l.jsx)(o,{label:`Fahrenheit (°F)`,checked:n===`fahrenheit`,onChange:()=>r(`fahrenheit`)}),(0,l.jsx)(o,{label:`Kelvin (K)`,checked:n===`kelvin`,onChange:()=>r(`kelvin`)}),(0,l.jsx)(o,{label:`Unit locked`,checked:!1,disabled:!0})]})]})}},S={name:`ChoiceList (multiple)`,render:()=>{let[e,t]=(0,c.useState)([`vvm`]);return(0,l.jsx)(a,{title:`Actions taken`,allowMultiple:!0,selected:e,onChange:t,choices:[{value:`vvm`,label:`VVM Check`},{value:`transfer`,label:`Vaccine Transfer`},{value:`discarded`,label:`Frozen Vaccine Discarded`}]})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Remember me',
    checked: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Remember me',
    checked: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Select all',
    checked: 'indeterminate'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'I agree',
    error: 'You must agree to continue.'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe',
    helpText: 'Receive weekly updates.'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="Toggle me" checked={checked} onChange={setChecked} />;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'RadioButton',
  render: () => {
    const [val, setVal] = useState('a');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>
        <RadioButton label="Option A" checked={val === 'a'} onChange={() => setVal('a')} />
        <RadioButton label="Option B" checked={val === 'b'} onChange={() => setVal('b')} />
        <RadioButton label="Disabled" checked={false} disabled />
      </div>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'ChoiceList (single)',
  render: () => {
    const [val, setVal] = useState('omaha');
    return <ChoiceList title="Location" selected={val} onChange={setVal} choices={[{
      value: 'apple-valley',
      label: 'Apple Valley'
    }, {
      value: 'omaha',
      label: 'Omaha'
    }, {
      value: 'duluth',
      label: 'Duluth'
    }]} />;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    fontFamily: 'Inter, sans-serif'
  }}>
      <div style={{
      fontSize: 11,
      fontWeight: 600,
      color: '#9e9e9e',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }}>Checkbox states</div>
      <Checkbox label="Unchecked" checked={false} />
      <Checkbox label="Checked" checked={true} />
      <Checkbox label="Indeterminate" checked="indeterminate" />
      <Checkbox label="Disabled unchecked" checked={false} disabled />
      <Checkbox label="Disabled checked" checked={true} disabled />
      <Checkbox label="With error" checked={false} error="This field is required." />
      <Checkbox label="With help text" checked={false} helpText="This option enables daily alerts." />

      <div style={{
      fontSize: 11,
      fontWeight: 600,
      color: '#9e9e9e',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginTop: 8
    }}>Radio button states</div>
      <RadioButton label="Unselected" checked={false} />
      <RadioButton label="Selected" checked={true} />
      <RadioButton label="Disabled" checked={false} disabled />
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  render: () => {
    const [checks, setChecks] = useState({
      morning: true,
      evening: false,
      alerts: false,
      terms: false
    });
    const [radioVal, setRadioVal] = useState('celsius');
    const toggle = key => setChecks(c => ({
      ...c,
      [key]: !c[key]
    }));
    return <div style={{
      display: 'flex',
      gap: 40,
      fontFamily: 'Inter, sans-serif',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }}>

        {/* Checkboxes */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 6
        }}>Checkboxes</div>
          <Checkbox label="Morning session" checked={checks.morning} onChange={() => toggle('morning')} helpText="Records at 07:00 – 12:00" />
          <Checkbox label="Evening session" checked={checks.evening} onChange={() => toggle('evening')} />
          <Checkbox label="Enable alerts" checked={checks.alerts} onChange={() => toggle('alerts')} />
          <Checkbox label="Accept terms" checked={checks.terms} onChange={() => toggle('terms')} error={!checks.terms ? 'You must accept to continue.' : undefined} />
          <Checkbox label="Locked option" checked={true} disabled />
        </div>

        {/* Radio buttons */}
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}>
          <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: '#9e9e9e',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 6
        }}>Radio buttons</div>
          <RadioButton label="Celsius (°C)" checked={radioVal === 'celsius'} onChange={() => setRadioVal('celsius')} />
          <RadioButton label="Fahrenheit (°F)" checked={radioVal === 'fahrenheit'} onChange={() => setRadioVal('fahrenheit')} />
          <RadioButton label="Kelvin (K)" checked={radioVal === 'kelvin'} onChange={() => setRadioVal('kelvin')} />
          <RadioButton label="Unit locked" checked={false} disabled />
        </div>

      </div>;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'ChoiceList (multiple)',
  render: () => {
    const [val, setVal] = useState(['vvm']);
    return <ChoiceList title="Actions taken" allowMultiple selected={val} onChange={setVal} choices={[{
      value: 'vvm',
      label: 'VVM Check'
    }, {
      value: 'transfer',
      label: 'Vaccine Transfer'
    }, {
      value: 'discarded',
      label: 'Frozen Vaccine Discarded'
    }]} />;
  }
}`,...S.parameters?.docs?.source}}},C=[`Unchecked`,`Checked`,`Indeterminate`,`Disabled`,`WithError`,`WithHelpText`,`Interactive`,`RadioButtons`,`ChoiceListSingle`,`AllStates`,`InteractionStates`,`ChoiceListMultiple`]}));w();export{b as AllStates,f as Checked,S as ChoiceListMultiple,y as ChoiceListSingle,m as Disabled,p as Indeterminate,x as InteractionStates,_ as Interactive,v as RadioButtons,d as Unchecked,h as WithError,g as WithHelpText,C as __namedExportsOrder,u as default,w as t};