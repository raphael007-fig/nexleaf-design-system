import { useState } from 'react';
import { Page } from './Page.jsx';
import { siblingsFor } from '../SideNavigation/SideNavigation.jsx';

export default {
  title: 'Components/Navigation/Header Page',
  component: Page,
  parameters: { layout: 'padded', backgrounds: { default: 'light' } },
};

// Inline SVG data-URI for a representative equipment thumbnail — works offline
// and never expires. Replace with a real photo in production.
const EQUIPMENT_THUMB = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'>
  <rect width='80' height='80' fill='#e3d4c2'/>
  <rect x='14' y='10' width='52' height='60' rx='4' fill='#8b5a2b' stroke='#6b4423' stroke-width='1.5'/>
  <rect x='18' y='14' width='44' height='24' rx='2' fill='#a87148'/>
  <rect x='18' y='42' width='44' height='24' rx='2' fill='#a87148'/>
  <circle cx='58' cy='26' r='1.5' fill='#3a2412'/>
  <circle cx='58' cy='54' r='1.5' fill='#3a2412'/>
</svg>`);

const EQUIPMENT_FULL = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
  <rect width='600' height='600' fill='#efe4d4'/>
  <rect x='110' y='80' width='380' height='440' rx='14' fill='#8b5a2b' stroke='#6b4423' stroke-width='4'/>
  <rect x='140' y='110' width='320' height='170' rx='6' fill='#a87148'/>
  <rect x='140' y='300' width='320' height='170' rx='6' fill='#a87148'/>
  <circle cx='420' cy='190' r='8' fill='#3a2412'/>
  <circle cx='420' cy='380' r='8' fill='#3a2412'/>
  <text x='300' y='560' font-family='Inter, sans-serif' font-size='18' fill='#6b4423' text-anchor='middle'>Hairer-HBC-80 (IOM)</text>
</svg>`);

export const Default = {
  args: {
    title: 'Products',
  },
};

export const WithActions = {
  args: {
    title: 'Products',
    primaryAction: { content: 'Add product', onAction: () => {} },
    secondaryActions: [{ content: 'Export', onAction: () => {} }],
  },
};

export const WithBackAction = {
  args: {
    title: 'Product details',
    subtitle: 'Manage your product',
    backAction: { onAction: () => {} },
    primaryAction: { content: 'Save', onAction: () => {} },
    secondaryActions: [{ content: 'Discard', onAction: () => {} }],
  },
};

export const WithMetadata = {
  args: {
    title: 'Winter collection',
    metadata: [
      { label: 'Active', tone: 'success' },
      { label: 'Draft', tone: 'attention' },
    ],
    primaryAction: { content: 'Save', onAction: () => {} },
  },
};

export const WithPagination = {
  args: {
    title: 'Orders',
    pagination: { hasPrevious: true, hasNext: true },
    primaryAction: { content: 'Export', onAction: () => {} },
  },
};

export const WithAllFeatures = {
  name: 'With All Features',
  args: {
    title: 'Temperature Records',
    subtitle: 'ColdChain facility — Nairobi, Kenya',
    backAction: { onAction: () => {} },
    metadata: [
      { label: 'Active', tone: 'success' },
      { label: 'Morning', tone: 'default' },
    ],
    primaryAction: { content: 'Save record', onAction: () => {} },
    secondaryActions: [
      { content: 'Actions', disclosure: true, onAction: () => {} },
      { content: 'Export', onAction: () => {} },
    ],
  },
};

// ─── Title Disclosure (sibling-page switcher) ────────────────────────────────
//
// The chevron next to the title opens an OptionList of pages that sit under
// the same primary group in the Side Navigation. Use this when the page being
// viewed has secondary groups tied to it — it lets the user jump between
// siblings without routing through the side rail.

// Mirrors the "Inventory" group from the Side Navigation's Equipment
// Management variant. The disclosure acts as a sibling-page switcher: each
// pick changes the title AND, in a real app, would route to that sibling's
// page. The body text below the header reflects the active page so the
// navigation effect is observable in Storybook.

const INVENTORY_GROUP = [
  { id: 'coldchain', label: 'ColdChain Equipment' },
  { id: 'rtmds',     label: 'RTMDs' },
  { id: 'solar',     label: 'Solar Equipment' },
  { id: 'passive',   label: 'Passive Equipment' },
  { id: 'oxygen',    label: 'Oxygen Equipment' },
  { id: 'lab',       label: 'Lab Equipment' },
  { id: 'general',   label: 'General Equipment' },
];

const INVENTORY_NAV = [{ id: 'inventory', label: 'Inventory', children: INVENTORY_GROUP }];

export const WithTitleDisclosure = {
  name: 'With Title Disclosure',
  parameters: {
    docs: {
      description: {
        story:
          'A chevron-down button sits next to the title. Clicking it opens an `OptionList` of sibling pages (sourced from the same Inventory group in the Side Navigation) so the user can jump between them without leaving the page header. Picking a sibling updates the title, the active row in the menu, and (in a real app) the page body — try it: the placeholder body below the header swaps as you switch.',
      },
    },
  },
  render: () => {
    // Single source of truth: `pageId`. Everything derives from it — title,
    // disclosure's `activeItemId`, and the placeholder body content.
    const [pageId, setPageId] = useState('coldchain');
    const page = INVENTORY_GROUP.find(p => p.id === pageId) ?? INVENTORY_GROUP[0];

    // `siblingsFor` returns null when the current page has no siblings — the
    // chevron auto-hides. Wire its `onSelect` to whichever navigation hook
    // your app uses (here: just `setPageId`).
    const disclosure = siblingsFor(INVENTORY_NAV, pageId);
    if (disclosure) disclosure.onSelect = setPageId;

    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Page
          title={page.label}
          backAction={{ onAction: () => {} }}
          titleDisclosure={disclosure}
          primaryAction={{ content: 'Add New', onAction: () => {} }}
        />
        {/* Placeholder body — proves the page itself swapped, not just the
            label inside the chevron menu. In production this slot is the
            real page route component. */}
        <div style={{
          padding: 24,
          marginTop: 8,
          background: '#fafafa',
          border: '1px dashed #e0e0e0',
          borderRadius: 12,
          color: '#616161',
          fontSize: 13,
          lineHeight: '20px',
        }}>
          You are viewing the <strong style={{ color: '#303030' }}>{page.label}</strong> page.
          {' '}Open the chevron next to the title to switch to another equipment type — the title
          and this body both update in lock-step (single `pageId` state drives both).
        </div>
      </div>
    );
  },
};

export const WithImage = {
  name: 'With Image (thumbnail + modal)',
  parameters: {
    docs: {
      description: {
        story:
          'Equipment-style header: a 40×40 thumbnail sits between the back arrow and the title. Clicking the thumbnail opens a modal with the full-resolution image (try it in the live story). Pass either a plain URL string or `{ src, full, alt }` to use a higher-res image in the modal.',
      },
    },
  },
  args: {
    title: 'Hairer-HBC-80 (IOM)',
    subtitle: 'BE0G91EAS0 00EJ8 S0003',
    backAction: { onAction: () => {} },
    image: { src: EQUIPMENT_THUMB, full: EQUIPMENT_FULL, alt: 'Hairer HBC-80 cold-chain refrigerator' },
    metadata: [{ label: 'Functional', tone: 'success' }],
    primaryAction: { content: 'Edit Information', onAction: () => {} },
    secondaryActions: [
      { content: 'More Actions', disclosure: true, onAction: () => {} },
      { content: 'Create Service Requests', onAction: () => {} },
    ],
  },
};

export const Full = {
  args: {
    title: 'Temperature Records',
    subtitle: 'ColdChain facility — Nairobi, Kenya',
    backAction: { onAction: () => {} },
    metadata: [{ label: 'Active', tone: 'success' }],
    primaryAction: { content: 'Save record', onAction: () => {} },
    secondaryActions: [
      { content: 'Actions', disclosure: true, onAction: () => {} },
      { content: 'Export', onAction: () => {} },
    ],
  },
};

// ─── Record variant — responsive tertiary record header ───────────────────────
// variant="record" turns Header Page into the focused record/detail header:
// back arrow + dominant name + health status chip beside the title + serial.
// On mobile the title compacts and the action row stacks below.

import { TertiaryActions } from '../TertiaryActions/TertiaryActions.jsx';

const recordFrame = (w, node) => (
  <div style={{ width: w, maxWidth: '100%', background: '#f1f1f1', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', margin: '0 0 16px', padding: '0 16px' }}>
    {node}
  </div>
);

export const RecordVariant = {
  name: 'Record variant — health states',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {recordFrame(420, <Page variant="record" mobile backAction={{ onClick: () => {} }} title="Hairer-HBC-80 (IOM)" status="functional" subtitle="BE0G91EAS0 00EJ8 S0003" actions={<TertiaryActions state="functional" mobile onAction={() => {}} />} />)}
      {recordFrame(420, <Page variant="record" mobile backAction={{ onClick: () => {} }} title="Hairer-HBC-80 (IOM)" status="faulty" subtitle="BE0G91EAS0 00EJ8 S0003" actions={<TertiaryActions state="faulty" mobile onAction={() => {}} />} />)}
      {recordFrame(420, <Page variant="record" mobile backAction={{ onClick: () => {} }} title="Hairer-HBC-80 (IOM)" status="unknown" subtitle="BE0G91EAS0 00EJ8 S0003" actions={<TertiaryActions state="unknown" mobile onAction={() => {}} />} />)}
      {recordFrame(420, <Page variant="record" mobile backAction={{ onClick: () => {} }} title="Hairer-HBC-80 (IOM)" status="decommissioned" subtitle="BE0G91EAS0 00EJ8 S0003" actions={<TertiaryActions state="decommissioning" mobile onAction={() => {}} />} />)}
    </div>
  ),
};

export const RecordLongTitle = {
  name: 'Record variant — long title (chip preserved)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {recordFrame(360, <Page variant="record" mobile backAction={{ onClick: () => {} }} title="Haier Biomedical HBC-80 Vaccine Refrigerator (IOM Field Unit)" status="functional" subtitle="BE0G91EAS0 00EJ8 S0003" />)}
    </div>
  ),
};

export const RecordDesktop = {
  name: 'Record variant — desktop (actions inline)',
  render: () => (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {recordFrame('100%', <Page variant="record" mobile={false} backAction={{ onClick: () => {} }} title="Hairer-HBC-80 (IOM)" status="functional" subtitle="BE0G91EAS0 00EJ8 S0003" actions={<TertiaryActions state="functional" mobile={false} onAction={() => {}} />} />)}
    </div>
  ),
};
