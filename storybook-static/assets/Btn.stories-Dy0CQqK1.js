import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{i as n,n as r,r as i,t as a}from"./Btn-Brf2UNB7.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w=e((()=>{n(),o=t(),s=({size:e=16,color:t=`currentColor`})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M10 4v12M4 10h12`,stroke:t,strokeWidth:`1.5`,strokeLinecap:`round`})}),c=({size:e=16,color:t=`currentColor`})=>(0,o.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:`none`,children:(0,o.jsx)(`path`,{d:`M6 8v7a1 1 0 001 1h6a1 1 0 001-1V8M4 6h12M8 6V5a1 1 0 011-1h2a1 1 0 011 1v1`,stroke:t,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})}),l={title:`Components/Btn`,component:a,parameters:{layout:`padded`,backgrounds:{default:`light`}},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`ghost`,`tertiary`,`plain`,`destructive`]},tone:{control:`select`,options:[`default`,`critical`,`success`]},size:{control:`select`,options:[`micro`,`medium`,`large`]},disabled:{control:`boolean`},fullWidth:{control:`boolean`},disclosure:{control:`boolean`},children:{control:`text`}}},u={args:{children:`Save`,variant:`primary`}},d=({children:e})=>(0,o.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,fontSize:11,fontWeight:600,color:`#9e9e9e`,textTransform:`uppercase`,letterSpacing:`0.06em`,marginBottom:8},children:e}),f=({label:e,children:t})=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16,padding:`12px 0`,borderBottom:`1px solid #f0f0f0`,fontFamily:`Inter, sans-serif`},children:[(0,o.jsx)(`div`,{style:{width:120,fontSize:12,color:`#616161`,fontWeight:500,flexShrink:0},children:e}),(0,o.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:12,flexWrap:`wrap`},children:t})]}),p={name:`All Variants × States`,parameters:{layout:`padded`},render:()=>(0,o.jsxs)(`div`,{style:{maxWidth:800,fontFamily:`Inter, sans-serif`},children:[(0,o.jsx)(`h2`,{style:{fontSize:16,fontWeight:600,color:`#303030`,marginBottom:4},children:`Button State Matrix`}),(0,o.jsxs)(`p`,{style:{fontSize:13,color:`#616161`,marginBottom:24,lineHeight:1.5},children:[`Interact with each button to verify hover / active / focus states. Disabled buttons use `,(0,o.jsx)(`code`,{style:{fontFamily:`monospace`,fontSize:11},children:`bg-disabled`}),` + `,(0,o.jsx)(`code`,{style:{fontFamily:`monospace`,fontSize:11},children:`text-disabled`}),`.`]}),(0,o.jsxs)(`div`,{style:{borderTop:`2px solid #e0e0e0`},children:[(0,o.jsxs)(f,{label:`Primary`,children:[(0,o.jsx)(a,{variant:`primary`,children:`Rest`}),(0,o.jsx)(a,{variant:`primary`,disabled:!0,children:`Disabled`}),(0,o.jsx)(a,{variant:`primary`,disclosure:!0,children:`Disclosure`}),(0,o.jsx)(a,{variant:`primary`,icon:(0,o.jsx)(s,{size:16,color:`currentColor`}),children:`With icon`})]}),(0,o.jsxs)(f,{label:`Secondary`,children:[(0,o.jsx)(a,{variant:`secondary`,children:`Rest`}),(0,o.jsx)(a,{variant:`secondary`,disabled:!0,children:`Disabled`}),(0,o.jsx)(a,{variant:`secondary`,disclosure:!0,children:`Disclosure`}),(0,o.jsx)(a,{variant:`secondary`,icon:(0,o.jsx)(s,{size:16,color:`currentColor`}),children:`With icon`})]}),(0,o.jsxs)(f,{label:`Destructive`,children:[(0,o.jsx)(a,{variant:`destructive`,children:`Delete record`}),(0,o.jsx)(a,{variant:`destructive`,disabled:!0,children:`Disabled`}),(0,o.jsx)(a,{variant:`destructive`,icon:(0,o.jsx)(c,{size:16,color:`currentColor`}),children:`With icon`})]}),(0,o.jsxs)(f,{label:`Ghost`,children:[(0,o.jsx)(a,{variant:`ghost`,children:`Learn more`}),(0,o.jsx)(a,{variant:`ghost`,disabled:!0,children:`Disabled`})]}),(0,o.jsxs)(f,{label:`Tertiary`,children:[(0,o.jsx)(a,{variant:`tertiary`,children:`Tertiary`}),(0,o.jsx)(a,{variant:`tertiary`,disabled:!0,children:`Disabled`})]}),(0,o.jsxs)(f,{label:`Sizes`,children:[(0,o.jsx)(a,{variant:`primary`,small:!0,children:`Micro`}),(0,o.jsx)(a,{variant:`primary`,size:`medium`,children:`Medium`}),(0,o.jsx)(a,{variant:`primary`,size:`large`,children:`Large`})]}),(0,o.jsx)(f,{label:`Full width`,children:(0,o.jsx)(`div`,{style:{width:`100%`},children:(0,o.jsx)(a,{variant:`primary`,fullWidth:!0,children:`Full-width primary`})})})]})]})},m={args:{children:`Save`,variant:`primary`}},h={args:{children:`Cancel`,variant:`secondary`}},g={args:{children:`Delete record`,variant:`destructive`}},_={args:{children:`Learn more`,variant:`ghost`}},v={args:{children:`Unavailable`,variant:`primary`,disabled:!0}},y={args:{children:`Submit form`,variant:`primary`,fullWidth:!0},parameters:{layout:`padded`}},b={args:{children:`More actions`,variant:`secondary`,disclosure:!0}},x={name:`ButtonGroup`,render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(d,{children:`Tight (default — 8px)`}),(0,o.jsxs)(i,{gap:`tight`,children:[(0,o.jsx)(a,{variant:`primary`,children:`Save`}),(0,o.jsx)(a,{variant:`secondary`,children:`Cancel`})]})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(d,{children:`Extra tight (4px)`}),(0,o.jsxs)(i,{gap:`extra-tight`,children:[(0,o.jsx)(a,{variant:`secondary`,children:`Back`}),(0,o.jsx)(a,{variant:`primary`,children:`Next`})]})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(d,{children:`Loose (20px)`}),(0,o.jsxs)(i,{gap:`loose`,children:[(0,o.jsx)(a,{variant:`ghost`,children:`Discard`}),(0,o.jsx)(a,{variant:`primary`,children:`Save changes`})]})]})]})},S={name:`BtnGroupSegmented`,render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(d,{children:`Default`}),(0,o.jsx)(r,{buttons:[{label:`All`},{label:`Active`},{label:`Archived`}]})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(d,{children:`With disabled segment`}),(0,o.jsx)(r,{buttons:[{label:`Today`},{label:`This week`},{label:`This month`,disabled:!0}]})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Save',
    variant: 'primary'
  }
}`,...u.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'All Variants × States',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    maxWidth: 800,
    fontFamily: 'Inter, sans-serif'
  }}>
      <h2 style={{
      fontSize: 16,
      fontWeight: 600,
      color: '#303030',
      marginBottom: 4
    }}>Button State Matrix</h2>
      <p style={{
      fontSize: 13,
      color: '#616161',
      marginBottom: 24,
      lineHeight: 1.5
    }}>
        Interact with each button to verify hover / active / focus states.
        Disabled buttons use <code style={{
        fontFamily: 'monospace',
        fontSize: 11
      }}>bg-disabled</code> + <code style={{
        fontFamily: 'monospace',
        fontSize: 11
      }}>text-disabled</code>.
      </p>
      <div style={{
      borderTop: '2px solid #e0e0e0'
    }}>
        <Row label="Primary">
          <Btn variant="primary">Rest</Btn>
          <Btn variant="primary" disabled>Disabled</Btn>
          <Btn variant="primary" disclosure>Disclosure</Btn>
          <Btn variant="primary" icon={<IcoPlus size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Secondary">
          <Btn variant="secondary">Rest</Btn>
          <Btn variant="secondary" disabled>Disabled</Btn>
          <Btn variant="secondary" disclosure>Disclosure</Btn>
          <Btn variant="secondary" icon={<IcoPlus size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Destructive">
          <Btn variant="destructive">Delete record</Btn>
          <Btn variant="destructive" disabled>Disabled</Btn>
          <Btn variant="destructive" icon={<IcoTrash size={16} color="currentColor" />}>With icon</Btn>
        </Row>
        <Row label="Ghost">
          <Btn variant="ghost">Learn more</Btn>
          <Btn variant="ghost" disabled>Disabled</Btn>
        </Row>
        <Row label="Tertiary">
          <Btn variant="tertiary">Tertiary</Btn>
          <Btn variant="tertiary" disabled>Disabled</Btn>
        </Row>
        <Row label="Sizes">
          <Btn variant="primary" small>Micro</Btn>
          <Btn variant="primary" size="medium">Medium</Btn>
          <Btn variant="primary" size="large">Large</Btn>
        </Row>
        <Row label="Full width">
          <div style={{
          width: '100%'
        }}>
            <Btn variant="primary" fullWidth>Full-width primary</Btn>
          </div>
        </Row>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Save',
    variant: 'primary'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Cancel',
    variant: 'secondary'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Delete record',
    variant: 'destructive'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Learn more',
    variant: 'ghost'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Submit form',
    variant: 'primary',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'More actions',
    variant: 'secondary',
    disclosure: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'ButtonGroup',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <div>
        <StateLabel>Tight (default — 8px)</StateLabel>
        <ButtonGroup gap="tight">
          <Btn variant="primary">Save</Btn>
          <Btn variant="secondary">Cancel</Btn>
        </ButtonGroup>
      </div>
      <div>
        <StateLabel>Extra tight (4px)</StateLabel>
        <ButtonGroup gap="extra-tight">
          <Btn variant="secondary">Back</Btn>
          <Btn variant="primary">Next</Btn>
        </ButtonGroup>
      </div>
      <div>
        <StateLabel>Loose (20px)</StateLabel>
        <ButtonGroup gap="loose">
          <Btn variant="ghost">Discard</Btn>
          <Btn variant="primary">Save changes</Btn>
        </ButtonGroup>
      </div>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'BtnGroupSegmented',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <div>
        <StateLabel>Default</StateLabel>
        <BtnGroupSegmented buttons={[{
        label: 'All'
      }, {
        label: 'Active'
      }, {
        label: 'Archived'
      }]} />
      </div>
      <div>
        <StateLabel>With disabled segment</StateLabel>
        <BtnGroupSegmented buttons={[{
        label: 'Today'
      }, {
        label: 'This week'
      }, {
        label: 'This month',
        disabled: true
      }]} />
      </div>
    </div>
}`,...S.parameters?.docs?.source}}},C=[`Playground`,`AllStates`,`Primary`,`Secondary`,`Destructive`,`Ghost`,`Disabled`,`FullWidth`,`WithDisclosure`,`Group`,`Segmented`]}));w();export{p as AllStates,g as Destructive,v as Disabled,y as FullWidth,_ as Ghost,x as Group,u as Playground,m as Primary,h as Secondary,S as Segmented,b as WithDisclosure,C as __namedExportsOrder,l as default,w as t};