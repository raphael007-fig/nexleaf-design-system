import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{n as i,t as a}from"./IndexTable-BfI_9NHN.js";import{a as o,c as s,l as c,o as l,s as u}from"./Card-C7JTo71w.js";import{n as d,t as f}from"./Pagination-DWXuJL6k.js";import{n as p,t as m}from"./MetricCard-BnhtWVLm.js";import{n as h,t as g}from"./Page-BH7MPRUi.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;t((()=>{_=e(n(),1),h(),p(),i(),d(),v=r(),c(),y=({size:e=16,color:t=`#303030`})=>(0,v.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,children:[(0,v.jsx)(`path`,{d:`M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z`}),(0,v.jsx)(`path`,{d:`M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z`}),(0,v.jsx)(`path`,{d:`M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z`})]}),b=({size:e=16,color:t=`#303030`})=>(0,v.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,children:[(0,v.jsx)(`path`,{fillRule:`evenodd`,d:`M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z`}),(0,v.jsx)(`path`,{fillRule:`evenodd`,d:`M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z`})]}),x={title:`Pages/Equipment Detail`,parameters:{layout:`fullscreen`}},S={Active:{bg:`#cdfee1`,color:`#0c5132`},Unknown:{bg:`rgba(0,0,0,0.06)`,color:`#616161`},Decommissioned:{bg:`#ffd6a4`,color:`#5e4200`},Faulty:{bg:`#fedad9`,color:`#8e1f0b`},"Under Maintenance":{bg:`#e0f0ff`,color:`#00527c`}},C=({status:e})=>{let t=S[e]||S.Unknown;return(0,v.jsx)(`span`,{style:{background:t.bg,color:t.color,fontSize:12,fontWeight:550,fontFamily:`Inter, sans-serif`,padding:`2px 8px`,borderRadius:8,whiteSpace:`nowrap`,display:`inline-block`,lineHeight:`16px`},children:e})},w=[{id:`1`,installId:`DCM-2024-001`,facility:`Coast General Hospital`,equipmentType:`Inverter`,manufacturer:`Vestfrost`,qty:3,status:`Active`,lastMaintenance:`Jan 15, 2024`},{id:`2`,installId:`DCM-2024-002`,facility:`Kenyatta National Hospital`,equipmentType:`Battery`,manufacturer:`Vestfrost`,qty:14,status:`Unknown`,lastMaintenance:`Feb 20, 2024`},{id:`3`,installId:`DCM-2024-003`,facility:`Jaramogi Oginga Odinga Hospital`,equipmentType:`Solar Panel`,manufacturer:`B-Medical Systems`,qty:25,status:`Decommissioned`,lastMaintenance:`Mar 10, 2024`},{id:`4`,installId:`DCM-2024-004`,facility:`PGH Nakuru`,equipmentType:`Inverter`,manufacturer:`Vestfrost`,qty:4,status:`Faulty`,lastMaintenance:`Apr 5, 2024`},{id:`5`,installId:`DCM-2024-005`,facility:`Moi Teaching & Referral Hospital`,equipmentType:`Solar Panel`,manufacturer:`B-Medical Systems`,qty:15,status:`Decommissioned`,lastMaintenance:`May 30, 2024`},{id:`6`,installId:`DCM-2024-006`,facility:`Malindi Sub-County Hospital`,equipmentType:`Solar Panel`,manufacturer:`B-Medical Systems`,qty:9,status:`Under Maintenance`,lastMaintenance:`Jun 25, 2024`},{id:`7`,installId:`DCM-2024-007`,facility:`Pumwani Maternity Hospital`,equipmentType:`Inverter`,manufacturer:`Vestfrost`,qty:6,status:`Under Maintenance`,lastMaintenance:`Jul 15, 2024`},{id:`8`,installId:`DCM-2024-008`,facility:`Starehe Sub-County Hospital`,equipmentType:`Battery`,manufacturer:`Vestfrost`,qty:32,status:`Faulty`,lastMaintenance:`Aug 1, 2024`},{id:`9`,installId:`DCM-2024-009`,facility:`Malindi District Hospital`,equipmentType:`Inverter`,manufacturer:`Vestfrost`,qty:12,status:`Active`,lastMaintenance:`Sep 10, 2024`},{id:`10`,installId:`DCM-2024-010`,facility:`Malindi Level 4 Hospital`,equipmentType:`Solar Panel`,manufacturer:`B-Medical Systems`,qty:53,status:`Unknown`,lastMaintenance:`Sep 10, 2024`}],T=[{key:`installId`,label:`Installation ID`,width:148},{key:`facility`,label:`Facility`,width:240},{key:`equipmentType`,label:`Equipment Type`,width:160},{key:`manufacturer`,label:`Manufacturer`,width:180},{key:`qty`,label:`Quantity`,width:100,align:`right`},{key:`status`,label:`Equipment Status`,width:180,render:e=>(0,v.jsx)(C,{status:e.status})},{key:`lastMaintenance`,label:`Last Maintenance`,width:160},{key:`view`,label:``,width:56,render:()=>(0,v.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),style:{color:`#005bd3`,textDecoration:`underline`,fontSize:13,fontWeight:450,fontFamily:`Inter, sans-serif`},children:`View`})}],E=[{id:`1`,installId:`DCM-2024-001`,systemType:`Hybrid`,region:`Mombasa`,facility:`Coast General Hospital`,inverter:`Victron Energy`,solar:`Jinko Solar`,battery:`CATL`,accessories:3,date:`Jan 15, 2024`},{id:`2`,installId:`DCM-2024-002`,systemType:`Off-Grid`,region:`Nairobi West`,facility:`Kenyatta National Hospital`,inverter:`SMA Solar`,solar:`Canadian Solar`,battery:`CATL`,accessories:8,date:`Feb 20, 2024`},{id:`3`,installId:`DCM-2024-003`,systemType:`Off-Grid`,region:`Kisumu`,facility:`Jaramogi Oginga Odinga Hospital`,inverter:`Growatt`,solar:`LONGi Solar`,battery:`BYD`,accessories:2,date:`Mar 10, 2024`},{id:`4`,installId:`DCM-2024-004`,systemType:`Grid-Tied`,region:`Nakuru`,facility:`PGH Nakuru`,inverter:`Huawei`,solar:`Jinko Solar`,battery:`BYD`,accessories:3,date:`Apr 5, 2024`},{id:`5`,installId:`DCM-2024-005`,systemType:`Hybrid`,region:`Eldoret`,facility:`Moi Teaching & Referral Hospital`,inverter:`Victron Energy`,solar:`Canadian Solar`,battery:`CATL`,accessories:4,date:`May 30, 2024`},{id:`6`,installId:`DCM-2024-006`,systemType:`Grid-Tied`,region:`Malindi`,facility:`Malindi Sub-County Hospital`,inverter:`SMA Solar`,solar:`LONGi Solar`,battery:`CATL`,accessories:3,date:`Jun 25, 2024`},{id:`7`,installId:`DCM-2024-007`,systemType:`Grid-Tied`,region:`Nairobi West`,facility:`Pumwani Maternity Hospital`,inverter:`Growatt`,solar:`Jinko Solar`,battery:`BYD`,accessories:4,date:`Jul 15, 2024`},{id:`8`,installId:`DCM-2024-008`,systemType:`Hybrid`,region:`Starehe`,facility:`Starehe Sub-County Hospital`,inverter:`Huawei`,solar:`Canadian Solar`,battery:`CATL`,accessories:3,date:`Aug 1, 2024`},{id:`9`,installId:`DCM-2024-009`,systemType:`Off-Grid`,region:`Malindi`,facility:`Malindi District Hospital`,inverter:`Victron Energy`,solar:`LONGi Solar`,battery:`BYD`,accessories:2,date:`Sep 10, 2024`},{id:`10`,installId:`DCM-2024-010`,systemType:`Hybrid`,region:`Malindi`,facility:`Malindi Level 4 Hospital`,inverter:`SMA Solar`,solar:`Jinko Solar`,battery:`CATL`,accessories:2,date:`Sep 10, 2024`}],D=[{key:`installId`,label:`Installation ID`,width:148},{key:`systemType`,label:`System Type`,width:120},{key:`region`,label:`Region`,width:120},{key:`facility`,label:`Facility`,width:200},{key:`inverter`,label:`Inverter`,width:140,render:e=>(0,v.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),style:{color:`#005bd3`,textDecoration:`underline`,fontSize:13,fontWeight:450,fontFamily:`Inter, sans-serif`},children:e.inverter})},{key:`solar`,label:`Solar Panels`,width:140,render:e=>(0,v.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),style:{color:`#005bd3`,textDecoration:`underline`,fontSize:13,fontWeight:450,fontFamily:`Inter, sans-serif`},children:e.solar})},{key:`battery`,label:`Battery`,width:120,render:e=>(0,v.jsx)(`a`,{href:`#`,onClick:e=>e.preventDefault(),style:{color:`#005bd3`,textDecoration:`underline`,fontSize:13,fontWeight:450,fontFamily:`Inter, sans-serif`},children:e.battery})},{key:`accessories`,label:`Accessories`,width:108,align:`right`},{key:`date`,label:`Installation Date`,width:140}],O={name:`Main View`,render:()=>{let[e,t]=(0,_.useState)(new Set),[n,r]=(0,_.useState)(0),[i,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(null),[l,u]=(0,_.useState)(!1);(0,_.useEffect)(()=>{if(!l)return;let e=setTimeout(()=>u(!1),500);return()=>clearTimeout(e)},[l]);let d=e=>{e!==n&&(r(e),t(new Set),o(``),u(!0))},p=n===1,h=p?w.filter(e=>[e.installId,e.facility,e.equipmentType,e.manufacturer].some(e=>e.toLowerCase().includes(i.toLowerCase()))):E.filter(e=>[e.installId,e.systemType,e.region,e.facility].some(e=>e.toLowerCase().includes(i.toLowerCase()))),x=p?T:D;return(0,v.jsx)(`div`,{style:{background:`#f1f1f1`,minHeight:`100vh`,fontFamily:`Inter, sans-serif`},children:(0,v.jsxs)(`div`,{style:{maxWidth:1280,margin:`0 auto`,padding:`0 24px 48px`},children:[(0,v.jsx)(g,{title:`Solar Equipments`,primaryAction:{content:`Add Installation`,onAction:()=>{}}}),(0,v.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(4, 1fr)`,gap:16,marginBottom:16},children:[{key:`total`,title:`Total Installations`,metric:`12`,badge:{label:`4 High Priority`,tone:`warning`},tooltip:`Total number of active solar installations`},{key:`offgrid`,title:`Off-Grid`,metric:`8`,badge:{label:`+2 from last week`,tone:`success`},tooltip:`Installations running fully off-grid`},{key:`hybrid`,title:`Hybrid`,metric:`15`,badge:{label:`0 from last week`,tone:`default`},tooltip:`Installations with hybrid grid + solar setup`},{key:`gridtied`,title:`Grid-Tied`,metric:`4`,badge:{label:`+2 from last week`,tone:`success`},tooltip:`Installations connected directly to the grid`}].map(e=>(0,v.jsx)(m,{title:e.title,metric:e.metric,badge:e.badge,infoTooltip:e.tooltip,selected:s===e.key,onClick:()=>c(t=>t===e.key?null:e.key)},e.key))}),(0,v.jsx)(a,{tabs:[{label:`Summary`},{label:`Component View`}],activeTab:n,onTabChange:d,loading:l,searchValue:i,onSearchChange:e=>o(e.target.value),searchPlaceholder:`Search installations…`,toolbarActions:[{label:`Filter`,icon:(0,v.jsx)(y,{size:16}),onClick:()=>{}},{label:`Columns`,icon:(0,v.jsx)(b,{size:16}),onClick:()=>{}}],columns:x,rows:h,selectedRows:e,onSelectionChange:t,bulkActions:[{label:`Export`,onAction:()=>{}},{label:`Archive`,onAction:()=>{}}],rowActions:p?[{label:`View details`,onAction:()=>{}},{label:`Edit`,onAction:()=>{}},{label:`Remove`,onAction:()=>{},destructive:!0}]:[{label:`View details`,onAction:()=>{}},{label:`Edit`,onAction:()=>{}},{label:`Archive`,onAction:()=>{}},{label:`Delete`,onAction:()=>{},destructive:!0}],emptyState:{heading:`No installations found`,description:`Try adjusting your search or filters.`},footer:(0,v.jsx)(f,{hasPrevious:!1,hasNext:!l&&h.length>=10,label:l?`—`:`1–${h.length} of ${p?w.length:E.length}`,type:`table`})})]})})}},k=[{label:`Component Type`,value:`Data Logger`},{label:`Serial Number`,value:`SN-00482-KE`},{label:`Manufacturer`,value:`Nexleaf Analytics`},{label:`Model`,value:`ColdTrace G3`},{label:`Warranty Status`,value:`In Warranty`},{label:`Quantity`,value:`1`},{label:`Installation Date`,value:`04 Jan 2024`},{label:`Last Serviced`,value:`12 Mar 2025`}],A=[{label:`Primary Components`},{label:`Accessories`}],j=[{id:`1`,type:`Sensor Probe`,manufacturer:`Nexleaf`,model:`ST-400`,equipmentId:`EQ-10022`},{id:`2`,type:`SIM Module`,manufacturer:`Huawei`,model:`ME909`,equipmentId:`EQ-10023`},{id:`3`,type:`Power Adapter`,manufacturer:`Generic`,model:`PA-12V`,equipmentId:`EQ-10030`}],M=[{id:`4`,type:`Mounting Clip`,manufacturer:`Generic`,model:`MC-01`,equipmentId:`EQ-10031`},{id:`5`,type:`Tamper Seal`,manufacturer:`Generic`,model:`TS-200`,equipmentId:`EQ-10032`}],N={name:`View Detail`,render:()=>{let[e,t]=(0,_.useState)(0),n=e===0?j:M;return(0,v.jsx)(`div`,{style:{background:`#f1f1f1`,minHeight:`100vh`,fontFamily:`Inter, sans-serif`},children:(0,v.jsxs)(`div`,{style:{maxWidth:1200,margin:`0 auto`,padding:`0 24px 48px`},children:[(0,v.jsx)(g,{title:`ColdTrace G3`,subtitle:`SN-00482-KE · Nexleaf Analytics`,backAction:{onAction:()=>{}},metadata:[{label:`Active`,tone:`success`}],primaryAction:{content:`Edit`,onAction:()=>{}},secondaryActions:[{content:`Actions`,disclosure:!0,onAction:()=>{}}]}),(0,v.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 320px`,gap:16,alignItems:`start`},children:[(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,v.jsx)(o,{images:[``,``,``],fields:k,notes:`The data logger was reinstalled following the facility power infrastructure upgrade in January 2025. Temperature calibration was completed on-site by field technician James Omondi. No performance issues have been reported since reinstallation.`}),(0,v.jsx)(l,{title:`Associated Components`,description:`Primary components and accessories linked to this equipment`,tabs:A,activeTab:e,onTabChange:t,tableRows:n,footer:(0,v.jsx)(f,{hasPrevious:!1,hasNext:e===0&&n.length>=3,label:`1–${n.length} of ${n.length}`,type:`table`}),defaultOpen:!0})]}),(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,v.jsx)(u,{region:`North Kenya`,facilityName:`Lodwar County Hospital`,facilityHref:`#`,mapLat:3.1211,mapLon:35.5975}),(0,v.jsx)(s,{addedBy:`Grace Mwangi`,contactNumber:`+254 712 345 678`})]})]})]})})}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Main View',
  render: () => {
    const [selected, setSelected] = useState(new Set());
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState('');
    const [activeMetric, setActiveMetric] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      if (!loading) return;
      const t = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(t);
    }, [loading]);
    const handleTabChange = i => {
      if (i === activeTab) return;
      setActiveTab(i);
      setSelected(new Set());
      setSearch('');
      setLoading(true);
    };
    const isComponentView = activeTab === 1;
    const filtered = isComponentView ? COMPONENT_ROWS.filter(r => [r.installId, r.facility, r.equipmentType, r.manufacturer].some(v => v.toLowerCase().includes(search.toLowerCase()))) : TABLE_ROWS.filter(r => [r.installId, r.systemType, r.region, r.facility].some(v => v.toLowerCase().includes(search.toLowerCase())));
    const activeColumns = isComponentView ? COMPONENT_COLUMNS : COLUMNS;
    return <div style={{
      background: '#f1f1f1',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
        <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 24px 48px'
      }}>

          <Page title="Solar Equipments" primaryAction={{
          content: 'Add Installation',
          onAction: () => {}
        }} />

          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 16
        }}>
            {[{
            key: 'total',
            title: 'Total Installations',
            metric: '12',
            badge: {
              label: '4 High Priority',
              tone: 'warning'
            },
            tooltip: 'Total number of active solar installations'
          }, {
            key: 'offgrid',
            title: 'Off-Grid',
            metric: '8',
            badge: {
              label: '+2 from last week',
              tone: 'success'
            },
            tooltip: 'Installations running fully off-grid'
          }, {
            key: 'hybrid',
            title: 'Hybrid',
            metric: '15',
            badge: {
              label: '0 from last week',
              tone: 'default'
            },
            tooltip: 'Installations with hybrid grid + solar setup'
          }, {
            key: 'gridtied',
            title: 'Grid-Tied',
            metric: '4',
            badge: {
              label: '+2 from last week',
              tone: 'success'
            },
            tooltip: 'Installations connected directly to the grid'
          }].map(card => <MetricCard key={card.key} title={card.title} metric={card.metric} badge={card.badge} infoTooltip={card.tooltip} selected={activeMetric === card.key} onClick={() => setActiveMetric(prev => prev === card.key ? null : card.key)} />)}
          </div>

          <IndexTable tabs={[{
          label: 'Summary'
        }, {
          label: 'Component View'
        }]} activeTab={activeTab} onTabChange={handleTabChange} loading={loading} searchValue={search} onSearchChange={e => setSearch(e.target.value)} searchPlaceholder="Search installations…" toolbarActions={[{
          label: 'Filter',
          icon: <IcoFilter size={16} />,
          onClick: () => {}
        }, {
          label: 'Columns',
          icon: <IcoAdjust size={16} />,
          onClick: () => {}
        }]} columns={activeColumns} rows={filtered} selectedRows={selected} onSelectionChange={setSelected} bulkActions={[{
          label: 'Export',
          onAction: () => {}
        }, {
          label: 'Archive',
          onAction: () => {}
        }]} rowActions={isComponentView ? [{
          label: 'View details',
          onAction: () => {}
        }, {
          label: 'Edit',
          onAction: () => {}
        }, {
          label: 'Remove',
          onAction: () => {},
          destructive: true
        }] : [{
          label: 'View details',
          onAction: () => {}
        }, {
          label: 'Edit',
          onAction: () => {}
        }, {
          label: 'Archive',
          onAction: () => {}
        }, {
          label: 'Delete',
          onAction: () => {},
          destructive: true
        }]} emptyState={{
          heading: 'No installations found',
          description: 'Try adjusting your search or filters.'
        }} footer={<Pagination hasPrevious={false} hasNext={!loading && filtered.length >= 10} label={loading ? '—' : \`1–\${filtered.length} of \${isComponentView ? COMPONENT_ROWS.length : TABLE_ROWS.length}\`} type="table" />} />

        </div>
      </div>;
  }
}`,...O.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'View Detail',
  render: () => {
    const [tab, setTab] = useState(0);
    const tableRows = tab === 0 ? PRIMARY_ROWS : ACCESSORY_ROWS;
    return <div style={{
      background: '#f1f1f1',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
        <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px 48px'
      }}>

          <Page title="ColdTrace G3" subtitle="SN-00482-KE · Nexleaf Analytics" backAction={{
          onAction: () => {}
        }} metadata={[{
          label: 'Active',
          tone: 'success'
        }]} primaryAction={{
          content: 'Edit',
          onAction: () => {}
        }} secondaryActions={[{
          content: 'Actions',
          disclosure: true,
          onAction: () => {}
        }]} />

          <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 16,
          alignItems: 'start'
        }}>

            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
              <CardLayoutType1 images={['', '', '']} fields={FIELDS} notes="The data logger was reinstalled following the facility power infrastructure upgrade in January 2025. Temperature calibration was completed on-site by field technician James Omondi. No performance issues have been reported since reinstallation." />
              <CardLayoutType2 title="Associated Components" description="Primary components and accessories linked to this equipment" tabs={TABS} activeTab={tab} onTabChange={setTab} tableRows={tableRows} footer={<Pagination hasPrevious={false} hasNext={tab === 0 && tableRows.length >= 3} label={\`1–\${tableRows.length} of \${tableRows.length}\`} type="table" />} defaultOpen />
            </div>

            <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
              <CardLayoutType3 region="North Kenya" facilityName="Lodwar County Hospital" facilityHref="#" mapLat={3.1211} mapLon={35.5975} />
              <CardLayoutType4 addedBy="Grace Mwangi" contactNumber="+254 712 345 678" />
            </div>

          </div>
        </div>
      </div>;
  }
}`,...N.parameters?.docs?.source}}},P=[`MainView`,`ViewDetail`]}))();export{O as MainView,N as ViewDetail,P as __namedExportsOrder,x as default};