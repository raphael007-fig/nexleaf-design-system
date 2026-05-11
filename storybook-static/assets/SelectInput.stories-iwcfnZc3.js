import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";function i({label:e,options:t,placeholder:n,disabled:r,value:i,onChange:s,required:c}){let[l,u]=(0,a.useState)(``),d=s!==void 0,f=d?i||``:l;function p(e){d||u(e.target.value),s&&s(e)}return(0,o.jsxs)(`div`,{style:{width:`100%`},children:[e&&(0,o.jsxs)(`label`,{style:{fontSize:13,fontWeight:500,color:`#303030`,display:`block`,marginBottom:6,fontFamily:`Inter,sans-serif`},children:[e,c&&(0,o.jsx)(`span`,{style:{color:`#d92d20`,marginLeft:2},children:`*`})]}),(0,o.jsxs)(`select`,{value:f,onChange:p,disabled:r,style:{width:`100%`,padding:`10px 40px 10px 14px`,borderRadius:8,border:`1.5px solid ${r?`transparent`:`#8a8a8a`}`,background:r?`rgba(0,0,0,0.06)`:`#fdfdfd`,fontSize:14,color:f?`#303030`:`#9e9e9e`,outline:`none`,cursor:r?`not-allowed`:`pointer`,fontFamily:`Inter,sans-serif`,backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23616161' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,backgroundRepeat:`no-repeat`,backgroundPosition:`right 12px center`,WebkitAppearance:`none`,appearance:`none`},children:[(0,o.jsx)(`option`,{value:``,disabled:!0,children:n||`Select…`}),(t||[]).map(e=>(0,o.jsx)(`option`,{value:e,style:{color:`#303030`},children:e},e))]})]})}var a,o,s=t((()=>{a=e(n(),1),o=r(),i.__docgenInfo={description:``,methods:[],displayName:`SelectInput`}})),c,l,u,d,f,p,m,h,g,_=t((()=>{c=e(n(),1),s(),l=r(),u={title:`Components/SelectInput`,component:i,parameters:{layout:`centered`},argTypes:{disabled:{control:`boolean`},required:{control:`boolean`}},decorators:[e=>(0,l.jsx)(`div`,{style:{width:280},children:(0,l.jsx)(e,{})})]},d={args:{label:`Country`,placeholder:`Select a country`,options:[`United States`,`Canada`,`United Kingdom`,`Australia`]}},f={args:{label:`Status`,required:!0,placeholder:`Choose status`,options:[`Active`,`Inactive`,`Pending`]}},p={args:{label:`Region`,placeholder:`Select region`,options:[`North`,`South`],disabled:!0}},m={name:`Interaction states`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,c.useState)(``),[n,r]=(0,c.useState)(`active`),[a,o]=(0,c.useState)(``),[s,u]=(0,c.useState)(!1);return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:320,fontFamily:`Inter, sans-serif`},children:[(0,l.jsx)(i,{label:`Session type`,required:!0,placeholder:`Select session`,options:[`Morning`,`Evening`,`Both`],value:e,onChange:e=>t(e.target.value),error:s&&!e?`Session type is required.`:void 0}),(0,l.jsx)(i,{label:`Status`,options:[`Active`,`Inactive`,`Pending`],value:n,onChange:e=>r(e.target.value)}),(0,l.jsx)(i,{label:`Temperature unit`,placeholder:`Select unit`,options:[`Celsius (°C)`,`Fahrenheit (°F)`,`Kelvin (K)`],value:a,onChange:e=>o(e.target.value)}),(0,l.jsx)(i,{label:`Region`,placeholder:`Not available`,options:[`North`,`South`],disabled:!0}),(0,l.jsx)(`button`,{onClick:()=>u(!0),style:{padding:`10px 20px`,background:`#005bd3`,color:`#fff`,border:`none`,borderRadius:8,fontFamily:`Inter, sans-serif`,fontSize:13,fontWeight:600,cursor:`pointer`,alignSelf:`flex-start`},children:`Save`}),s&&e&&(0,l.jsxs)(`div`,{style:{fontSize:12,color:`#0c5132`,background:`#cdfee1`,borderRadius:8,padding:`8px 12px`},children:[`Session type set to: `,e]})]})}},h={name:`All States`,parameters:{layout:`padded`},render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:20,width:320,fontFamily:`Inter, sans-serif`},children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Default`}),(0,l.jsx)(i,{label:`Country`,placeholder:`Select a country`,options:[`United States`,`Canada`,`United Kingdom`]})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Required`}),(0,l.jsx)(i,{label:`Status`,required:!0,placeholder:`Choose status`,options:[`Active`,`Inactive`,`Pending`]})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{style:{fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:12},children:`Disabled`}),(0,l.jsx)(i,{label:`Region`,placeholder:`Select region`,options:[`North`,`South`],disabled:!0})]})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: ['United States', 'Canada', 'United Kingdom', 'Australia']
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Status',
    required: true,
    placeholder: 'Choose status',
    options: ['Active', 'Inactive', 'Pending']
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Region',
    placeholder: 'Select region',
    options: ['North', 'South'],
    disabled: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [session, setSession] = useState('');
    const [status, setStatus] = useState('active');
    const [unit, setUnit] = useState('');
    const [attempted, setAttempted] = useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 320,
      fontFamily: 'Inter, sans-serif'
    }}>
        <SelectInput label="Session type" required placeholder="Select session" options={['Morning', 'Evening', 'Both']} value={session} onChange={e => setSession(e.target.value)} error={attempted && !session ? 'Session type is required.' : undefined} />
        <SelectInput label="Status" options={['Active', 'Inactive', 'Pending']} value={status} onChange={e => setStatus(e.target.value)} />
        <SelectInput label="Temperature unit" placeholder="Select unit" options={['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)']} value={unit} onChange={e => setUnit(e.target.value)} />
        <SelectInput label="Region" placeholder="Not available" options={['North', 'South']} disabled />
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
          Save
        </button>
        {attempted && session && <div style={{
        fontSize: 12,
        color: '#0c5132',
        background: '#cdfee1',
        borderRadius: 8,
        padding: '8px 12px'
      }}>
            Session type set to: {session}
          </div>}
      </div>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 320,
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
      }}>Default</div>
        <SelectInput label="Country" placeholder="Select a country" options={['United States', 'Canada', 'United Kingdom']} />
      </div>
      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12
      }}>Required</div>
        <SelectInput label="Status" required placeholder="Choose status" options={['Active', 'Inactive', 'Pending']} />
      </div>
      <div>
        <div style={{
        fontSize: 11,
        fontWeight: 600,
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 12
      }}>Disabled</div>
        <SelectInput label="Region" placeholder="Select region" options={['North', 'South']} disabled />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Required`,`Disabled`,`InteractionStates`,`AllStates`]}));_();export{h as AllStates,d as Default,p as Disabled,m as InteractionStates,f as Required,g as __namedExportsOrder,u as default,_ as t};