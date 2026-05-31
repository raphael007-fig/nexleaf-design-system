import { useState } from 'react';
import { SearchSelect, SearchSelectMulti, SearchSelectButton } from './SearchSelect.jsx';

export default {
  title: 'Components/Forms/SearchSelect',
  parameters: { layout: 'padded' },
};

const REGIONS = [
  { id: 'nairobi',   label: 'Nairobi' },
  { id: 'mombasa',   label: 'Mombasa' },
  { id: 'kisumu',    label: 'Kisumu' },
  { id: 'nakuru',    label: 'Nakuru' },
  { id: 'eldoret',   label: 'Eldoret' },
  { id: 'kilimani',  label: 'Kilimani' },
  { id: 'westlands', label: 'Westlands' },
  { id: 'karen',     label: 'Karen' },
  { id: 'langata',   label: "Lang'ata" },
  { id: 'malindi',   label: 'Malindi' },
  { id: 'thika',     label: 'Thika' },
  { id: 'kitale',    label: 'Kitale' },
];

const STATUS_OPTIONS = [
  { id: 'active',        label: 'Active' },
  { id: 'inactive',      label: 'Inactive' },
  { id: 'pending',       label: 'Pending' },
  { id: 'decommissioned',label: 'Decommissioned' },
  { id: 'under_maintenance', label: 'Under Maintenance' },
];

// ─── Hierarchical (nested) options ────────────────────────────────────────────
// Two levels: country → city. Used by the "Nested options" stories below.
const NESTED_REGIONS = [
  {
    id: 'nairobi', label: 'Nairobi',
    children: [
      { id: 'kilimani',  label: 'Kilimani' },
      { id: 'dagoretti', label: 'Dagoretti' },
      { id: 'westlands', label: 'Westlands' },
      { id: 'karen',     label: 'Karen' },
      { id: 'langata',   label: "Lang'ata" },
    ],
  },
  {
    id: 'karnataka', label: 'Karnataka',
    children: [
      { id: 'bengaluru', label: 'Bengaluru' },
      { id: 'mysuru',    label: 'Mysuru' },
      { id: 'mangaluru', label: 'Mangaluru' },
    ],
  },
  {
    id: 'lagos', label: 'Lagos',
    children: [
      { id: 'ikeja',    label: 'Ikeja' },
      { id: 'lekki',    label: 'Lekki' },
      { id: 'surulere', label: 'Surulere' },
    ],
  },
];

// Three levels deep: continent → country → region. Demonstrates indeterminate state cascading.
const DEEP_TREE = [
  {
    id: 'africa', label: 'Africa',
    children: [
      {
        id: 'kenya', label: 'Kenya',
        children: [
          { id: 'nairobi-region', label: 'Nairobi' },
          { id: 'coast',          label: 'Coast' },
          { id: 'rift-valley',    label: 'Rift Valley' },
        ],
      },
      {
        id: 'nigeria', label: 'Nigeria',
        children: [
          { id: 'lagos-state', label: 'Lagos' },
          { id: 'abuja',       label: 'Abuja' },
        ],
      },
    ],
  },
  {
    id: 'asia', label: 'Asia',
    children: [
      {
        id: 'india', label: 'India',
        children: [
          { id: 'karnataka-state', label: 'Karnataka' },
          { id: 'maharashtra',     label: 'Maharashtra' },
          { id: 'tamil-nadu',      label: 'Tamil Nadu' },
        ],
      },
      {
        id: 'indonesia', label: 'Indonesia',
        children: [
          { id: 'jakarta', label: 'Jakarta' },
          { id: 'bali',    label: 'Bali' },
        ],
      },
    ],
  },
];

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single select — default</div>
      <SearchSelect
        label="Region"
        placeholder="Select a region"
        options={REGIONS}
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single select — required</div>
      <SearchSelect
        label="Status"
        required
        placeholder="Choose status"
        options={STATUS_OPTIONS}
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single select — disabled</div>
      <SearchSelect
        label="Region"
        placeholder="Select a region"
        options={REGIONS}
        value="nairobi"
        disabled
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single select — error</div>
      <SearchSelect
        label="Region"
        required
        placeholder="Select a region"
        options={REGIONS}
        error="Please select a region."
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multi select — default</div>
      <SearchSelectMulti
        label="Regions"
        placeholder="Select regions"
        options={REGIONS}
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multi select — required</div>
      <SearchSelectMulti
        label="Regions"
        required
        placeholder="Select regions"
        options={REGIONS}
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multi select — disabled</div>
      <SearchSelectMulti
        label="Regions"
        placeholder="Select regions"
        options={REGIONS}
        value={['kilimani', 'westlands', 'karen']}
        disabled
      />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multi select — error</div>
      <SearchSelectMulti
        label="Regions"
        required
        placeholder="Select regions"
        options={REGIONS}
        error="Please select at least one region."
      />

    </div>
  ),
};

// ─── Interaction States ───────────────────────────────────────────────────────

export const InteractionStates = {
  name: 'Interaction states',
  render: () => {
    const [single, setSingle]   = useState('');
    const [multi,  setMulti]    = useState([]);

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <SearchSelect
          label="Region"
          required
          placeholder="Select a region"
          options={REGIONS}
          value={single}
          onChange={setSingle}
        />
        {single && (
          <p style={{ margin: 0, fontSize: 13, color: '#616161' }}>Selected: <strong style={{ color: '#303030' }}>{single}</strong></p>
        )}

        <SearchSelectMulti
          label="Regions"
          placeholder="Select multiple regions"
          options={REGIONS}
          value={multi}
          onChange={setMulti}
        />
        {multi.length > 0 && (
          <p style={{ margin: 0, fontSize: 13, color: '#616161' }}>Selected: <strong style={{ color: '#303030' }}>{multi.join(', ')}</strong></p>
        )}
      </div>
    );
  },
};

// ─── Single Select ────────────────────────────────────────────────────────────

export const SingleSelect = {
  name: 'Single select',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 400 }}>
        <SearchSelect
          label="Status"
          required
          placeholder="Choose a status"
          options={STATUS_OPTIONS}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

// ─── Multi Select ─────────────────────────────────────────────────────────────

export const MultiSelect = {
  name: 'Multi select',
  render: () => {
    const [val, setVal] = useState(['kilimani', 'westlands', 'langata']);
    return (
      <div style={{ maxWidth: 400 }}>
        <SearchSelectMulti
          label="Select"
          placeholder="Select regions"
          options={REGIONS}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

// ─── Nested options (multi) ───────────────────────────────────────────────────
// Click a parent to select / deselect every leaf beneath it. Parent shows the
// indeterminate state (dashed checkbox) when only some of its descendants
// are selected.

export const NestedOptions = {
  name: 'Nested options — multi',
  render: () => {
    const [val, setVal] = useState(['kilimani', 'dagoretti']);
    return (
      <div style={{ maxWidth: 400 }}>
        <SearchSelectMulti
          label="Regions"
          required
          placeholder="Select regions"
          options={NESTED_REGIONS}
          value={val}
          onChange={setVal}
        />
        <p style={{ marginTop: 12, fontSize: 13, color: '#616161', fontFamily: 'Inter, sans-serif' }}>
          Open the dropdown — selecting <em>Nairobi</em> picks every city beneath it. Selecting just
          two of its children renders Nairobi in the indeterminate state.
        </p>
      </div>
    );
  },
};

// ─── Nested options — single ──────────────────────────────────────────────────
// In single-select mode, branches are not selectable — only leaves.

export const NestedOptionsSingle = {
  name: 'Nested options — single',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ maxWidth: 400 }}>
        <SearchSelect
          label="Region"
          placeholder="Pick a city"
          options={NESTED_REGIONS}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

// ─── Deep tree (3 levels) ─────────────────────────────────────────────────────

export const DeepTree = {
  name: 'Nested options — 3 levels deep',
  render: () => {
    const [val, setVal] = useState([]);
    return (
      <div style={{ maxWidth: 420 }}>
        <SearchSelectMulti
          label="Where do you operate?"
          placeholder="Select regions"
          options={DEEP_TREE}
          value={val}
          onChange={setVal}
        />
        <p style={{ marginTop: 12, fontSize: 13, color: '#616161', fontFamily: 'Inter, sans-serif' }}>
          Indeterminate state cascades — selecting <em>Nairobi</em> marks both <em>Kenya</em> and
          <em> Africa</em> as indeterminate. Selecting all of <em>Africa</em>'s descendants flips
          it to checked.
        </p>
      </div>
    );
  },
};

// ─── Tags inside the field ────────────────────────────────────────────────────
// When tagsInside is true, the first selected value renders as a Tag inside the
// field (clamped to 50% of the row width with ellipsis), and the remainder
// collapse into a "+N others" chip. Used in dense filter bars.

export const TagsInside = {
  name: 'Tags inside field',
  render: () => {
    const [a, setA] = useState(['nairobi']);
    const [b, setB] = useState(['kilimani', 'westlands', 'karen']);
    const [c, setC] = useState(['kilimani']);

    return (
      <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 420 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            One selected
          </div>
          <SearchSelectMulti
            label="Region"
            placeholder="Select regions"
            options={REGIONS}
            value={a}
            onChange={setA}
            tagsInside
          />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Multiple selected — "+ N others" chip
          </div>
          <SearchSelectMulti
            label="Region"
            placeholder="Select regions"
            options={REGIONS}
            value={b}
            onChange={setB}
            tagsInside
          />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            First label too long → ellipsis
          </div>
          <SearchSelectMulti
            label="Region"
            placeholder="Select regions"
            options={[
              { id: 'long', label: 'A very long region name that will not fit in fifty percent' },
              ...REGIONS,
            ]}
            value={['long', 'mombasa', 'kisumu']}
            onChange={() => {}}
            tagsInside
          />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Tags inside + nested options
          </div>
          <SearchSelectMulti
            label="Regions"
            placeholder="Select regions"
            options={NESTED_REGIONS}
            value={c}
            onChange={setC}
            tagsInside
          />
        </div>
      </div>
    );
  },
};

// ─── SearchSelectButton — button trigger ──────────────────────────────────────
// Same dropdown + tree + search behaviour, but the trigger is a button. The
// button text collapses the selection: "First +N Others".

const NESTED_REGIONS_BTN = [
  {
    id: 'nairobi', label: 'Nairobi',
    children: [
      { id: 'dagoretti',     label: 'Dagoretti' },
      { id: 'embakasi-east', label: 'Embakasi East' },
      { id: 'embakasi-west', label: 'Embakasi West' },
      { id: 'kumukunji',     label: 'Kumukunji' },
    ],
  },
  {
    id: 'karnatika', label: 'Karnatika',
    children: [
      { id: 'chamarajanagar', label: 'Chamarajanagar' },
      { id: 'karuna-trust',   label: 'Karuna Trust' },
      { id: 'shimoga',        label: 'Shimoga' },
    ],
  },
];

export const ButtonSizes = {
  name: 'Button trigger — sizes',
  render: () => {
    const [s, setS] = useState(['dagoretti', 'embakasi-east', 'embakasi-west']);
    const [m, setM] = useState(['dagoretti', 'embakasi-east', 'embakasi-west']);
    const [l, setL] = useState(['dagoretti', 'embakasi-east', 'embakasi-west']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Small
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={s}
            onChange={setS}
            multiple
            size="small"
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Medium (default)
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={m}
            onChange={setM}
            multiple
            size="medium"
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Large
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={l}
            onChange={setL}
            multiple
            size="large"
          />
        </div>
      </div>
    );
  },
};

export const ButtonSingle = {
  name: 'Button trigger — single',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ padding: 24 }}>
        <SearchSelectButton
          label="Region"
          placeholder="Choose Region"
          options={NESTED_REGIONS_BTN}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

export const ButtonMulti = {
  name: 'Button trigger — multi (+N Others)',
  render: () => {
    const [val, setVal] = useState([]);
    return (
      <div style={{ padding: 24 }}>
        <SearchSelectButton
          label="Region"
          placeholder="Choose Region"
          options={NESTED_REGIONS_BTN}
          value={val}
          onChange={setVal}
          multiple
        />
      </div>
    );
  },
};

export const ButtonAllStates = {
  name: 'Button trigger — all states',
  render: () => {
    const [a, setA] = useState([]);
    const [b, setB] = useState(['dagoretti']);
    const [c, setC] = useState(['dagoretti', 'embakasi-east', 'embakasi-west']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Empty
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={a}
            onChange={setA}
            multiple
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            One selected
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={b}
            onChange={setB}
            multiple
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Multiple selected — "First +N Others"
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={c}
            onChange={setC}
            multiple
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Disabled
          </div>
          <SearchSelectButton
            label="Region"
            placeholder="Select regions"
            options={NESTED_REGIONS_BTN}
            value={['dagoretti', 'embakasi-east']}
            multiple
            disabled
          />
        </div>
      </div>
    );
  },
};

export const ButtonLongLabelOverflow = {
  name: 'Button trigger — long first label keeps "+N Others" visible',
  render: () => {
    const opts = [
      { id: 'long', label: 'A very long region name that should ellipsise' },
      { id: 'mombasa', label: 'Mombasa' },
      { id: 'kisumu',  label: 'Kisumu' },
      { id: 'nakuru',  label: 'Nakuru' },
    ];
    const [a, setA] = useState(['long']);
    const [b, setB] = useState(['long', 'mombasa', 'kisumu', 'nakuru']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Long label alone — ellipsises inside the cap
          </div>
          <SearchSelectButton
            label="Region"
            options={opts}
            value={a}
            onChange={setA}
            multiple
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Long label + N others — label truncates, "+3 Others" stays
          </div>
          <SearchSelectButton
            label="Region"
            options={opts}
            value={b}
            onChange={setB}
            multiple
          />
        </div>
      </div>
    );
  },
};

export const ButtonInToolbar = {
  name: 'Button trigger — toolbar of filters',
  render: () => {
    const [region, setRegion] = useState(['dagoretti', 'embakasi-east']);
    const [status, setStatus] = useState(['active']);
    return (
      <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <SearchSelectButton
            label="Region"
            placeholder="Region"
            options={NESTED_REGIONS_BTN}
            value={region}
            onChange={setRegion}
            multiple
            size="small"
          />
          <SearchSelectButton
            label="Status"
            placeholder="Status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={setStatus}
            multiple
            size="small"
          />
        </div>
      </div>
    );
  },
};

// ─── Tags below (default) vs tags inside — side-by-side ───────────────────────

export const TagModesCompared = {
  name: 'Tags below vs tags inside',
  render: () => {
    const [below,  setBelow]  = useState(['kilimani', 'westlands', 'karen']);
    const [inside, setInside] = useState(['kilimani', 'westlands', 'karen']);
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 420 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            Default — tags below the field
          </div>
          <SearchSelectMulti
            label="Region"
            placeholder="Select regions"
            options={REGIONS}
            value={below}
            onChange={setBelow}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            tagsInside — first chip + overflow
          </div>
          <SearchSelectMulti
            label="Region"
            placeholder="Select regions"
            options={REGIONS}
            value={inside}
            onChange={setInside}
            tagsInside
          />
        </div>
      </div>
    );
  },
};
