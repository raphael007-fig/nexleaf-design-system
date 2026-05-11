import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DxP0NviS.js";var n,r,i,a,o,s,c;e((()=>{n=t(),r={title:`Foundation/Shadows`,parameters:{layout:`padded`,controls:{disable:!0},actions:{disable:!0}}},i=({title:e,subtitle:t,children:r})=>(0,n.jsxs)(`div`,{style:{marginBottom:48,fontFamily:`Inter, sans-serif`},children:[(0,n.jsx)(`h2`,{style:{fontSize:14,fontWeight:700,color:`#303030`,marginBottom:t?2:4,textTransform:`uppercase`,letterSpacing:`0.06em`},children:e}),t&&(0,n.jsx)(`p`,{style:{fontSize:13,color:`#616161`,marginBottom:4},children:t}),(0,n.jsx)(`div`,{style:{borderTop:`2px solid #e0e0e0`},children:r})]}),a=[{label:`Rest`,token:`--nx-shadow-btn-rest`,shadow:`inset 0 -1px 0 #b5b5b5, inset -1px 0 0 #e3e3e3, inset 1px 0 0 #e3e3e3, inset 0 1px 0 #e3e3e3`,bg:`#ffffff`,color:`#303030`,notes:`Bottom shadow darker (#b5b5b5) → visible bottom edge. Side/top lighter (#e3e3e3) → subtle framing.`},{label:`Hover`,token:`--nx-shadow-btn-hover`,shadow:`inset 0 -1px 0 #ccc, inset -1px 0 0 #ebebeb, inset 1px 0 0 #ebebeb, inset 0 1px 0 #ebebeb`,bg:`#f9f9f9`,color:`#303030`,notes:`All shadow values lighter — border recedes slightly on hover.`},{label:`Active / Pressed`,token:`--nx-shadow-btn-active`,shadow:`inset 0 2px 1px rgba(26,26,26,0.20), inset 1px 0 1px rgba(26,26,26,0.12), inset -1px 0 1px rgba(26,26,26,0.12)`,bg:`#f0f0f0`,color:`#303030`,notes:`Top-inset shadow replaces bottom — creates "pressed in" visual. Darks darken.`},{label:`Focus`,token:`--nx-shadow-btn-rest + --nx-focus-ring`,shadow:`inset 0 -1px 0 #b5b5b5, inset -1px 0 0 #e3e3e3, inset 1px 0 0 #e3e3e3, inset 0 1px 0 #e3e3e3, 0 0 0 2px #005bd3`,bg:`#ffffff`,color:`#303030`,notes:`Rest shadow + outset focus ring. Both coexist without conflicting border declarations.`},{label:`Disabled`,token:`none`,shadow:`none`,bg:`rgba(0,0,0,0.06)`,color:`#b5b5b5`,notes:`No shadow. bg-disabled + text-disabled tokens. cursor: not-allowed.`}],o=[{label:`Rest`,token:`--nx-shadow-btn-primary`,shadow:`inset 0 2px 0 rgba(255,255,255,0.20), inset 2px 0 0 rgba(255,255,255,0.20), inset -2px 0 0 rgba(255,255,255,0.20), inset 0 -1px 0 1px #000, inset 0 1px 0 #000`,bg:`#005bd3`,color:`#ffffff`,notes:`White inner highlights on top/sides (20% opacity). Black inner stroke on all edges for definition.`},{label:`Focus`,token:`--nx-shadow-btn-primary + --nx-focus-ring`,shadow:`inset 0 2px 0 rgba(255,255,255,0.20), inset 2px 0 0 rgba(255,255,255,0.20), inset -2px 0 0 rgba(255,255,255,0.20), inset 0 -1px 0 1px #000, inset 0 1px 0 #000, 0 0 0 2px #005bd3`,bg:`#005bd3`,color:`#ffffff`,notes:`Primary shadow + outset focus ring stacked.`},{label:`Disabled`,token:`none`,shadow:`none`,bg:`rgba(0,0,0,0.17)`,color:`#b5b5b5`,notes:`color-primary-disabled bg, text-disabled text.`}],s={name:`Shadow & Focus Tokens`,render:()=>(0,n.jsxs)(`div`,{style:{maxWidth:860,fontFamily:`Inter, sans-serif`},children:[(0,n.jsx)(`h1`,{style:{fontSize:28,fontWeight:700,color:`#303030`,marginBottom:8},children:`Shadows & Focus Rings`}),(0,n.jsxs)(`p`,{style:{fontSize:14,color:`#616161`,marginBottom:16,lineHeight:1.6},children:[`The Nexleaf button system uses `,(0,n.jsx)(`strong`,{children:`box-shadow instead of border`}),`. Inset shadows create button borders without causing layout shift on state changes. The outset focus ring layers on top, so both coexist without conflicts.`]}),(0,n.jsxs)(`div`,{style:{background:`#fff3cd`,border:`1px solid #ffd966`,borderRadius:8,padding:`10px 14px`,fontSize:13,color:`#856404`,marginBottom:40,lineHeight:1.5},children:[(0,n.jsx)(`strong`,{children:`Why box-shadow borders?`}),` A standard CSS `,(0,n.jsx)(`code`,{children:`border`}),` occupies layout space — toggling it on state change shifts surrounding content. Inset box-shadow is painted inside the element bounds and causes zero layout shift, making state transitions smooth.`]}),(0,n.jsx)(i,{title:`Secondary Button States`,subtitle:`White background · #303030 text · inset shadow border`,children:a.map(({label:e,token:t,shadow:r,bg:i,color:a,notes:o})=>(0,n.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:20,padding:`16px 0`,borderBottom:`1px solid #f0f0f0`},children:[(0,n.jsxs)(`div`,{style:{width:100,flexShrink:0},children:[(0,n.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11,color:`#7c3aed`,fontWeight:600,marginBottom:8},children:e}),(0,n.jsx)(`button`,{style:{background:i,color:a,boxShadow:r,padding:`8px 14px`,borderRadius:8,border:`none`,fontFamily:`Inter, sans-serif`,fontSize:13,fontWeight:600,cursor:e===`Disabled`?`not-allowed`:`default`,opacity:1},children:`Button`})]}),(0,n.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,n.jsxs)(`div`,{style:{fontFamily:`monospace`,fontSize:10,color:`#616161`,background:`#f7f9fc`,border:`1px solid #e0e0e0`,borderRadius:6,padding:`8px 10px`,lineHeight:1.7,wordBreak:`break-all`,marginBottom:8},children:[`box-shadow: `,t===`none`?`none`:t]}),(0,n.jsx)(`div`,{style:{fontSize:12,color:`#616161`,lineHeight:1.5},children:o})]})]},e))}),(0,n.jsx)(i,{title:`Primary Button States`,subtitle:`#005bd3 background · #ffffff text · inset shadow`,children:o.map(({label:e,token:t,shadow:r,bg:i,color:a,notes:o})=>(0,n.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:20,padding:`16px 0`,borderBottom:`1px solid #f0f0f0`},children:[(0,n.jsxs)(`div`,{style:{width:100,flexShrink:0},children:[(0,n.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11,color:`#7c3aed`,fontWeight:600,marginBottom:8},children:e}),(0,n.jsx)(`button`,{style:{background:i,color:a,boxShadow:r,padding:`8px 14px`,borderRadius:8,border:`none`,fontFamily:`Inter, sans-serif`,fontSize:13,fontWeight:600,cursor:e===`Disabled`?`not-allowed`:`default`},children:`Button`})]}),(0,n.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,n.jsxs)(`div`,{style:{fontFamily:`monospace`,fontSize:10,color:`#616161`,background:`#f7f9fc`,border:`1px solid #e0e0e0`,borderRadius:6,padding:`8px 10px`,lineHeight:1.7,wordBreak:`break-all`,marginBottom:8},children:[`box-shadow: `,t===`none`?`none`:t]}),(0,n.jsx)(`div`,{style:{fontSize:12,color:`#616161`,lineHeight:1.5},children:o})]})]},e))}),(0,n.jsx)(i,{title:`Focus Ring`,children:(0,n.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:20,padding:`16px 0`,borderBottom:`1px solid #f0f0f0`},children:[(0,n.jsxs)(`div`,{style:{width:100,flexShrink:0},children:[(0,n.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11,color:`#7c3aed`,fontWeight:600,marginBottom:8},children:`--nx-focus-ring`}),(0,n.jsx)(`div`,{style:{fontFamily:`monospace`,fontSize:11,color:`#9e9e9e`,marginBottom:12},children:`0 0 0 2px #005bd3`}),(0,n.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,n.jsx)(`button`,{style:{boxShadow:`0 0 0 2px #005bd3`,background:`#fff`,color:`#303030`,padding:`8px 14px`,borderRadius:8,border:`none`,fontFamily:`Inter, sans-serif`,fontSize:13,fontWeight:600},children:`Focused`}),(0,n.jsx)(`input`,{style:{boxShadow:`0 0 0 2px #005bd3`,background:`#fdfdfd`,color:`#303030`,padding:`8px 12px`,borderRadius:8,border:`1px solid #8a8a8a`,fontFamily:`Inter, sans-serif`,fontSize:14,outline:`none`,width:`100%`},defaultValue:`Input`})]})]}),(0,n.jsxs)(`div`,{style:{flex:1},children:[(0,n.jsxs)(`p`,{style:{fontSize:13,color:`#616161`,lineHeight:1.6,marginBottom:12},children:[`Applied to `,(0,n.jsx)(`em`,{children:`any`}),` interactive element on keyboard focus. Outset shadow — does not conflict with inset button shadow. Always `,(0,n.jsx)(`code`,{style:{background:`#f0f0f0`,padding:`2px 4px`,borderRadius:4,fontSize:11},children:`outline: none`}),` on the element itself and use this token instead, so the ring respects border-radius.`]}),(0,n.jsx)(`pre`,{style:{fontSize:11,color:`#303030`,background:`#f7f9fc`,border:`1px solid #e0e0e0`,borderRadius:8,padding:`10px 14px`,lineHeight:1.7,fontFamily:`monospace`},children:`:focus-visible {
  outline: none;
  box-shadow: var(--nx-shadow-btn-rest), var(--nx-focus-ring);
  /* or for primary: */
  box-shadow: var(--nx-shadow-btn-primary), var(--nx-focus-ring);
}`})]})]})})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Shadow & Focus Tokens',
  render: () => <div style={{
    maxWidth: 860,
    fontFamily: 'Inter, sans-serif'
  }}>
      <h1 style={{
      fontSize: 28,
      fontWeight: 700,
      color: '#303030',
      marginBottom: 8
    }}>Shadows & Focus Rings</h1>
      <p style={{
      fontSize: 14,
      color: '#616161',
      marginBottom: 16,
      lineHeight: 1.6
    }}>
        The Nexleaf button system uses <strong>box-shadow instead of border</strong>.
        Inset shadows create button borders without causing layout shift on state changes.
        The outset focus ring layers on top, so both coexist without conflicts.
      </p>
      <div style={{
      background: '#fff3cd',
      border: '1px solid #ffd966',
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      color: '#856404',
      marginBottom: 40,
      lineHeight: 1.5
    }}>
        <strong>Why box-shadow borders?</strong> A standard CSS <code>border</code> occupies layout space —
        toggling it on state change shifts surrounding content. Inset box-shadow is painted inside the element
        bounds and causes zero layout shift, making state transitions smooth.
      </div>

      <Section title="Secondary Button States" subtitle="White background · #303030 text · inset shadow border">
        {SECONDARY_STATES.map(({
        label,
        token,
        shadow,
        bg,
        color,
        notes
      }) => <div key={label} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
            <div style={{
          width: 100,
          flexShrink: 0
        }}>
              <div style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#7c3aed',
            fontWeight: 600,
            marginBottom: 8
          }}>{label}</div>
              <button style={{
            background: bg,
            color,
            boxShadow: shadow,
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: label === 'Disabled' ? 'not-allowed' : 'default',
            opacity: 1
          }}>
                Button
              </button>
            </div>
            <div style={{
          flex: 1,
          minWidth: 0
        }}>
              <div style={{
            fontFamily: 'monospace',
            fontSize: 10,
            color: '#616161',
            background: '#f7f9fc',
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            padding: '8px 10px',
            lineHeight: 1.7,
            wordBreak: 'break-all',
            marginBottom: 8
          }}>
                box-shadow: {token !== 'none' ? token : 'none'}
              </div>
              <div style={{
            fontSize: 12,
            color: '#616161',
            lineHeight: 1.5
          }}>{notes}</div>
            </div>
          </div>)}
      </Section>

      <Section title="Primary Button States" subtitle="#005bd3 background · #ffffff text · inset shadow">
        {PRIMARY_STATES.map(({
        label,
        token,
        shadow,
        bg,
        color,
        notes
      }) => <div key={label} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
            <div style={{
          width: 100,
          flexShrink: 0
        }}>
              <div style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#7c3aed',
            fontWeight: 600,
            marginBottom: 8
          }}>{label}</div>
              <button style={{
            background: bg,
            color,
            boxShadow: shadow,
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: label === 'Disabled' ? 'not-allowed' : 'default'
          }}>
                Button
              </button>
            </div>
            <div style={{
          flex: 1,
          minWidth: 0
        }}>
              <div style={{
            fontFamily: 'monospace',
            fontSize: 10,
            color: '#616161',
            background: '#f7f9fc',
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            padding: '8px 10px',
            lineHeight: 1.7,
            wordBreak: 'break-all',
            marginBottom: 8
          }}>
                box-shadow: {token !== 'none' ? token : 'none'}
              </div>
              <div style={{
            fontSize: 12,
            color: '#616161',
            lineHeight: 1.5
          }}>{notes}</div>
            </div>
          </div>)}
      </Section>

      <Section title="Focus Ring">
        <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}>
          <div style={{
          width: 100,
          flexShrink: 0
        }}>
            <div style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#7c3aed',
            fontWeight: 600,
            marginBottom: 8
          }}>
              --nx-focus-ring
            </div>
            <div style={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: '#9e9e9e',
            marginBottom: 12
          }}>
              0 0 0 2px #005bd3
            </div>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
              <button style={{
              boxShadow: '0 0 0 2px #005bd3',
              background: '#fff',
              color: '#303030',
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 600
            }}>
                Focused
              </button>
              <input style={{
              boxShadow: '0 0 0 2px #005bd3',
              background: '#fdfdfd',
              color: '#303030',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid #8a8a8a',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              outline: 'none',
              width: '100%'
            }} defaultValue="Input" />
            </div>
          </div>
          <div style={{
          flex: 1
        }}>
            <p style={{
            fontSize: 13,
            color: '#616161',
            lineHeight: 1.6,
            marginBottom: 12
          }}>
              Applied to <em>any</em> interactive element on keyboard focus. Outset shadow — does not conflict with inset button shadow.
              Always <code style={{
              background: '#f0f0f0',
              padding: '2px 4px',
              borderRadius: 4,
              fontSize: 11
            }}>outline: none</code> on the element
              itself and use this token instead, so the ring respects border-radius.
            </p>
            <pre style={{
            fontSize: 11,
            color: '#303030',
            background: '#f7f9fc',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: '10px 14px',
            lineHeight: 1.7,
            fontFamily: 'monospace'
          }}>
{\`:focus-visible {
  outline: none;
  box-shadow: var(--nx-shadow-btn-rest), var(--nx-focus-ring);
  /* or for primary: */
  box-shadow: var(--nx-shadow-btn-primary), var(--nx-focus-ring);
}\`}
            </pre>
          </div>
        </div>
      </Section>
    </div>
}`,...s.parameters?.docs?.source}}},c=[`AllShadows`]}))();export{s as AllShadows,c as __namedExportsOrder,r as default};