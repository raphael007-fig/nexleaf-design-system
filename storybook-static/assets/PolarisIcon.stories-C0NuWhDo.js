import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";import{n,r,t as i}from"./PolarisIcon-0qTvWZG3.js";var a,o,s,c,l,u,d,f=e((()=>{r(),a=t(),o={title:`Foundation/PolarisIcon`,component:n,parameters:{layout:`centered`},argTypes:{name:{control:`select`,options:Object.keys(i)},size:{control:`number`},color:{control:`color`}}},s={name:`Playground (single)`,args:{name:`SearchIcon`,size:20,color:`#616161`}},c={name:`All Icons`,parameters:{layout:`padded`},render:()=>(0,a.jsxs)(`div`,{style:{fontFamily:`Inter, sans-serif`},children:[(0,a.jsx)(`h2`,{style:{fontSize:16,fontWeight:600,color:`#303030`,marginBottom:4},children:`Icon Library`}),(0,a.jsxs)(`p`,{style:{fontSize:13,color:`#616161`,marginBottom:20,lineHeight:1.5},children:[Object.keys(i).length,` inline SVG icons. All rendered at 20×20px. Click to copy the icon name.`]}),(0,a.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(80px, 1fr))`,gap:8,maxWidth:720},children:Object.keys(i).map(e=>(0,a.jsxs)(`div`,{title:e,onClick:()=>navigator.clipboard?.writeText(e),style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:6,padding:`12px 6px 10px`,border:`1px solid #e0e0e0`,borderRadius:8,background:`#fff`,cursor:`pointer`,transition:`border-color 0.12s`},onMouseEnter:e=>e.currentTarget.style.borderColor=`#005bd3`,onMouseLeave:e=>e.currentTarget.style.borderColor=`#e0e0e0`,children:[(0,a.jsx)(n,{name:e,size:20,color:`#616161`}),(0,a.jsx)(`span`,{style:{fontSize:9,color:`#9e9e9e`,textAlign:`center`,lineHeight:1.3,wordBreak:`break-word`},children:e.replace(`Icon`,``)})]},e))})]})},l={parameters:{layout:`padded`},render:()=>(0,a.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:24,fontFamily:`Inter, sans-serif`},children:[12,16,20,24,32].map(e=>(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:8},children:[(0,a.jsx)(n,{name:`SearchIcon`,size:e,color:`#616161`}),(0,a.jsxs)(`span`,{style:{fontSize:11,color:`#9e9e9e`},children:[e,`px`]})]},e))})},u={parameters:{layout:`padded`},render:()=>(0,a.jsx)(`div`,{style:{display:`flex`,gap:16,flexWrap:`wrap`,fontFamily:`Inter, sans-serif`},children:[{label:`text-default`,color:`#303030`},{label:`text-subdued`,color:`#616161`},{label:`text-placeholder`,color:`#9e9e9e`},{label:`text-disabled`,color:`#b5b5b5`},{label:`color-primary`,color:`#005bd3`},{label:`color-critical`,color:`#d92d20`},{label:`color-success`,color:`#12b76a`},{label:`color-morning`,color:`#f59e0b`},{label:`color-evening`,color:`#6366f1`}].map(({label:e,color:t})=>(0,a.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:6},children:[(0,a.jsx)(n,{name:`AlertCircleIcon`,size:20,color:t}),(0,a.jsx)(`span`,{style:{fontFamily:`monospace`,fontSize:10,color:`#9e9e9e`},children:e})]},e))})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Playground (single)',
  args: {
    name: 'SearchIcon',
    size: 20,
    color: '#616161'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'All Icons',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif'
  }}>
      <h2 style={{
      fontSize: 16,
      fontWeight: 600,
      color: '#303030',
      marginBottom: 4
    }}>
        Icon Library
      </h2>
      <p style={{
      fontSize: 13,
      color: '#616161',
      marginBottom: 20,
      lineHeight: 1.5
    }}>
        {Object.keys(POLARIS_ICON_DATA).length} inline SVG icons.
        All rendered at 20×20px. Click to copy the icon name.
      </p>
      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
      gap: 8,
      maxWidth: 720
    }}>
        {Object.keys(POLARIS_ICON_DATA).map(name => <div key={name} title={name} onClick={() => navigator.clipboard?.writeText(name)} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 6px 10px',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        background: '#fff',
        cursor: 'pointer',
        transition: 'border-color 0.12s'
      }} onMouseEnter={e => e.currentTarget.style.borderColor = '#005bd3'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}>
            <PolarisIconImg name={name} size={20} color="#616161" />
            <span style={{
          fontSize: 9,
          color: '#9e9e9e',
          textAlign: 'center',
          lineHeight: 1.3,
          wordBreak: 'break-word'
        }}>
              {name.replace('Icon', '')}
            </span>
          </div>)}
      </div>
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    fontFamily: 'Inter, sans-serif'
  }}>
      {[12, 16, 20, 24, 32].map(size => <div key={size} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }}>
          <PolarisIconImg name="SearchIcon" size={size} color="#616161" />
          <span style={{
        fontSize: 11,
        color: '#9e9e9e'
      }}>{size}px</span>
        </div>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    fontFamily: 'Inter, sans-serif'
  }}>
      {[{
      label: 'text-default',
      color: '#303030'
    }, {
      label: 'text-subdued',
      color: '#616161'
    }, {
      label: 'text-placeholder',
      color: '#9e9e9e'
    }, {
      label: 'text-disabled',
      color: '#b5b5b5'
    }, {
      label: 'color-primary',
      color: '#005bd3'
    }, {
      label: 'color-critical',
      color: '#d92d20'
    }, {
      label: 'color-success',
      color: '#12b76a'
    }, {
      label: 'color-morning',
      color: '#f59e0b'
    }, {
      label: 'color-evening',
      color: '#6366f1'
    }].map(({
      label,
      color
    }) => <div key={label} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }}>
          <PolarisIconImg name="AlertCircleIcon" size={20} color={color} />
          <span style={{
        fontFamily: 'monospace',
        fontSize: 10,
        color: '#9e9e9e'
      }}>{label}</span>
        </div>)}
    </div>
}`,...u.parameters?.docs?.source}}},d=[`Playground`,`AllIcons`,`Sizes`,`Colors`]}));f();export{c as AllIcons,u as Colors,s as Playground,l as Sizes,d as __namedExportsOrder,o as default,f as t};