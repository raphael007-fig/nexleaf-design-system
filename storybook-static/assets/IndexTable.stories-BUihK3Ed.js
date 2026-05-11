import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-RTv-c5dQ.js";import{t as r}from"./jsx-runtime-DxP0NviS.js";import{a as i,r as a}from"./Badge-B9KK3cer.js";import{n as o,t as s}from"./IndexTable-BfI_9NHN.js";import{n as c,t as l}from"./Pagination-DWXuJL6k.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E=t((()=>{u=e(n(),1),o(),i(),c(),d=r(),f=({size:e=16,color:t=`#303030`})=>(0,d.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,children:[(0,d.jsx)(`path`,{d:`M3 6a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5h-12.5a.75.75 0 0 1-.75-.75Z`}),(0,d.jsx)(`path`,{d:`M6.75 14a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z`}),(0,d.jsx)(`path`,{d:`M5.5 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z`})]}),p=({size:e=16,color:t=`#303030`})=>(0,d.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 20 20`,fill:t,"aria-hidden":`true`,children:[(0,d.jsx)(`path`,{fillRule:`evenodd`,d:`M9.095 6.25a3.001 3.001 0 0 1 5.81 0h1.345a.75.75 0 0 1 0 1.5h-1.345a3.001 3.001 0 0 1-5.81 0h-5.345a.75.75 0 0 1 0-1.5h5.345Zm1.405.75a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z`}),(0,d.jsx)(`path`,{fillRule:`evenodd`,d:`M8 16a3.001 3.001 0 0 0 2.905-2.25h5.345a.75.75 0 0 0 0-1.5h-5.345a3.001 3.001 0 0 0-5.81 0h-1.345a.75.75 0 0 0 0 1.5h1.345a3.001 3.001 0 0 0 2.905 2.25Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z`})]}),m={title:`Components/IndexTable`,component:s,parameters:{layout:`padded`}},h=[{key:`date`,label:`Date`,sortable:!0},{key:`facility`,label:`Facility`,sortable:!0},{key:`region`,label:`Region`},{key:`morning`,label:`Morning °C`,sortable:!0,align:`right`},{key:`evening`,label:`Evening °C`,sortable:!0,align:`right`},{key:`status`,label:`Status`,render:e=>(0,d.jsx)(a,{tone:e.statusTone,children:e.status})},{key:`submittedBy`,label:`Submitted by`}],g=[{id:1,date:`Apr 28, 2026`,facility:`Kisumu District Hospital`,region:`Kisumu`,morning:`3.2`,evening:`4.1`,status:`Complete`,statusTone:`success`,submittedBy:`Mary A.`},{id:2,date:`Apr 28, 2026`,facility:`Nairobi General`,region:`Nairobi`,morning:`2.9`,evening:`3.8`,status:`Complete`,statusTone:`success`,submittedBy:`James O.`},{id:3,date:`Apr 28, 2026`,facility:`Mombasa Clinic`,region:`Mombasa`,morning:`—`,evening:`—`,status:`Pending`,statusTone:`attention`,submittedBy:`—`},{id:4,date:`Apr 27, 2026`,facility:`Eldoret Referral`,region:`Eldoret`,morning:`4.5`,evening:`5.2`,status:`Complete`,statusTone:`success`,submittedBy:`Anne K.`},{id:5,date:`Apr 27, 2026`,facility:`Nakuru Provincial`,region:`Nakuru`,morning:`8.9`,evening:`—`,status:`Incomplete`,statusTone:`warning`,submittedBy:`Peter M.`},{id:6,date:`Apr 26, 2026`,facility:`Kisumu District Hospital`,region:`Kisumu`,morning:`3.5`,evening:`3.9`,status:`Complete`,statusTone:`success`,submittedBy:`Mary A.`},{id:7,date:`Apr 26, 2026`,facility:`Nairobi General`,region:`Nairobi`,morning:`3.1`,evening:`4.0`,status:`Complete`,statusTone:`success`,submittedBy:`James O.`}],_=4,v={name:`All States`,parameters:{layout:`padded`},render:()=>(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:900},children:(0,d.jsx)(s,{columns:h,rows:g,selectedRows:new Set([1,3]),onSelectionChange:()=>{},sortKey:`date`,sortDir:`desc`,onSort:()=>{},bulkActions:[{label:`Export selected`,onAction:()=>{}},{label:`Mark complete`,onAction:()=>{}}]})})},y=[{label:`All`},{label:`Complete`,badge:`4`},{label:`Incomplete`,badge:`1`},{label:`Pending`,badge:`1`}],b={name:`Interaction states`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,u.useState)(new Set),[n,r]=(0,u.useState)(`date`),[i,a]=(0,u.useState)(`desc`),[o,c]=(0,u.useState)(0),[m,v]=(0,u.useState)(0),[b,x]=(0,u.useState)(``);function S(e){n===e?a(e=>e===`asc`?`desc`:`asc`):(r(e),a(`asc`))}let C=[``,`Complete`,`Incomplete`,`Pending`][m]||``,w=g.filter(e=>{let t=!C||e.status===C,n=!b||Object.values(e).some(e=>String(e).toLowerCase().includes(b.toLowerCase()));return t&&n}),T=w.slice(o*_,o*_+_),E=Math.ceil(w.length/_),D=w.length===0?0:o*_+1,O=Math.min(o*_+_,w.length);function k(e){v(e),c(0),t(new Set)}function A(e){x(e.target.value),c(0)}return(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:960},children:(0,d.jsx)(s,{columns:h,rows:T,selectedRows:e,onSelectionChange:t,sortKey:n,sortDir:i,onSort:S,tabs:y,activeTab:m,onTabChange:k,searchValue:b,onSearchChange:A,searchPlaceholder:`Search records…`,toolbarActions:[{label:`Filter`,icon:(0,d.jsx)(f,{size:16}),onClick:()=>{}},{label:`Columns`,icon:(0,d.jsx)(p,{size:16}),onClick:()=>{}}],bulkActions:[{label:`Export selected`,onAction:()=>alert(`Exporting ${e.size} records`)},{label:`Mark complete`,onAction:()=>alert(`Marking ${e.size} records complete`)}],rowActions:[{label:`View details`,onAction:()=>{}},{label:`Edit`,onAction:()=>{}},{label:`Delete`,onAction:()=>{},destructive:!0}],footer:(0,d.jsx)(l,{type:`table`,hasPrevious:o>0,hasNext:o<E-1,onPrevious:()=>c(e=>e-1),onNext:()=>c(e=>e+1),label:`Showing ${D}–${O} of ${w.length}`})})})}},x={name:`Empty state`,parameters:{layout:`padded`},render:()=>(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:900},children:(0,d.jsx)(s,{columns:h,rows:[],selectedRows:new Set,onSelectionChange:()=>{},emptyState:{heading:`No temperature records found`,description:`Try adjusting your filters or adding a new temperature reading for today.`}})})},S={name:`Loading skeleton`,parameters:{layout:`padded`},render:()=>(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:900},children:(0,d.jsx)(s,{columns:h,rows:[],selectedRows:new Set,onSelectionChange:()=>{},loading:!0})})},C={name:`With row actions`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,u.useState)(new Set);return(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:900},children:(0,d.jsx)(s,{columns:h,rows:g,selectedRows:e,onSelectionChange:t,rowActions:[{label:`View details`,onAction:()=>{}},{label:`Edit`,onAction:()=>{}},{label:`Duplicate`,onAction:()=>{}},{label:`Delete`,onAction:()=>{},destructive:!0}]})})}},w={name:`With bulk actions`,parameters:{layout:`padded`},render:()=>{let[e,t]=(0,u.useState)(new Set([2,4,6]));return(0,d.jsx)(`div`,{style:{fontFamily:`Inter, sans-serif`,maxWidth:900},children:(0,d.jsx)(s,{columns:h,rows:g,selectedRows:e,onSelectionChange:t,sortKey:`date`,sortDir:`desc`,onSort:()=>{},bulkActions:[{label:`Export selected`,onAction:()=>alert(`Exporting ${e.size} records`)},{label:`Mark complete`,onAction:()=>alert(`Marking ${e.size} records complete`)},{label:`Delete`,onAction:()=>alert(`Deleting ${e.size} records`)}]})})}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'All States',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    maxWidth: 900
  }}>
      <IndexTable columns={COLUMNS} rows={ROWS} selectedRows={new Set([1, 3])} onSelectionChange={() => {}} sortKey="date" sortDir="desc" onSort={() => {}} bulkActions={[{
      label: 'Export selected',
      onAction: () => {}
    }, {
      label: 'Mark complete',
      onAction: () => {}
    }]} />
    </div>
}`,...v.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Interaction states',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [selected, setSelected] = useState(new Set());
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState('');
    function handleSort(key) {
      if (sortKey === key) {
        setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    }

    // Filter rows by active tab status
    const tabFilter = ['', 'Complete', 'Incomplete', 'Pending'][activeTab] || '';
    const filteredRows = ROWS.filter(r => {
      const matchesTab = !tabFilter || r.status === tabFilter;
      const matchesSearch = !search || Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase()));
      return matchesTab && matchesSearch;
    });
    const pageRows = filteredRows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);
    const start = filteredRows.length === 0 ? 0 : page * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE + PAGE_SIZE, filteredRows.length);
    function handleTabChange(i) {
      setActiveTab(i);
      setPage(0);
      setSelected(new Set());
    }
    function handleSearch(e) {
      setSearch(e.target.value);
      setPage(0);
    }
    return <div style={{
      fontFamily: 'Inter, sans-serif',
      maxWidth: 960
    }}>
        <IndexTable columns={COLUMNS} rows={pageRows} selectedRows={selected} onSelectionChange={setSelected} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} tabs={TOOLBAR_TABS} activeTab={activeTab} onTabChange={handleTabChange} searchValue={search} onSearchChange={handleSearch} searchPlaceholder="Search records…" toolbarActions={[{
        label: 'Filter',
        icon: <IcoFilter size={16} />,
        onClick: () => {}
      }, {
        label: 'Columns',
        icon: <IcoAdjust size={16} />,
        onClick: () => {}
      }]} bulkActions={[{
        label: 'Export selected',
        onAction: () => alert(\`Exporting \${selected.size} records\`)
      }, {
        label: 'Mark complete',
        onAction: () => alert(\`Marking \${selected.size} records complete\`)
      }]} rowActions={[{
        label: 'View details',
        onAction: () => {}
      }, {
        label: 'Edit',
        onAction: () => {}
      }, {
        label: 'Delete',
        onAction: () => {},
        destructive: true
      }]} footer={<Pagination type="table" hasPrevious={page > 0} hasNext={page < totalPages - 1} onPrevious={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)} label={\`Showing \${start}–\${end} of \${filteredRows.length}\`} />} />
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Empty state',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    maxWidth: 900
  }}>
      <IndexTable columns={COLUMNS} rows={[]} selectedRows={new Set()} onSelectionChange={() => {}} emptyState={{
      heading: 'No temperature records found',
      description: 'Try adjusting your filters or adding a new temperature reading for today.'
    }} />
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Loading skeleton',
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    fontFamily: 'Inter, sans-serif',
    maxWidth: 900
  }}>
      <IndexTable columns={COLUMNS} rows={[]} selectedRows={new Set()} onSelectionChange={() => {}} loading={true} />
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'With row actions',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [selected, setSelected] = useState(new Set());
    return <div style={{
      fontFamily: 'Inter, sans-serif',
      maxWidth: 900
    }}>
        <IndexTable columns={COLUMNS} rows={ROWS} selectedRows={selected} onSelectionChange={setSelected} rowActions={[{
        label: 'View details',
        onAction: () => {}
      }, {
        label: 'Edit',
        onAction: () => {}
      }, {
        label: 'Duplicate',
        onAction: () => {}
      }, {
        label: 'Delete',
        onAction: () => {},
        destructive: true
      }]} />
      </div>;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'With bulk actions',
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const [selected, setSelected] = useState(new Set([2, 4, 6]));
    return <div style={{
      fontFamily: 'Inter, sans-serif',
      maxWidth: 900
    }}>
        <IndexTable columns={COLUMNS} rows={ROWS} selectedRows={selected} onSelectionChange={setSelected} sortKey="date" sortDir="desc" onSort={() => {}} bulkActions={[{
        label: 'Export selected',
        onAction: () => alert(\`Exporting \${selected.size} records\`)
      }, {
        label: 'Mark complete',
        onAction: () => alert(\`Marking \${selected.size} records complete\`)
      }, {
        label: 'Delete',
        onAction: () => alert(\`Deleting \${selected.size} records\`)
      }]} />
      </div>;
  }
}`,...w.parameters?.docs?.source}}},T=[`AllStates`,`InteractionStates`,`Empty`,`Loading`,`WithRowActions`,`WithBulkActions`]}));E();export{v as AllStates,x as Empty,b as InteractionStates,S as Loading,w as WithBulkActions,C as WithRowActions,T as __namedExportsOrder,m as default,E as t};