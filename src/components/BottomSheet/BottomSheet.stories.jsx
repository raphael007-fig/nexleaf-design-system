import { useState } from 'react';
import { BottomSheet } from './BottomSheet.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { OptionList } from '../OptionList/OptionList.jsx';

export default {
  title: 'Patterns/Responsive/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

function Launcher({ label = 'Open sheet', children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <Btn variant="secondary" onClick={() => setOpen(true)}>{label}</Btn>
      {children(open, () => setOpen(false))}
    </div>
  );
}

// ─── More actions (flat list) — matches the Figma sheet (text rows) ───────────
export const MoreActions = {
  name: 'More actions',
  render: () => (
    <Launcher label="More">
      {(open, close) => (
        <BottomSheet
          open={open}
          onClose={close}
          actions={[
            { id: 'view-summary', label: 'View Summary' },
            { id: 'service', label: 'Create Service Request' },
            { id: 'plot', label: 'View Plot' },
            { id: 'daily', label: 'View Daily Summary' },
            { id: 'qr', label: 'Assign QR Code' },
          ]}
        />
      )}
    </Launcher>
  ),
};

// ─── Grouped actions (Record / Monitoring / Issues / Lifecycle) ───────────────
export const GroupedActions = {
  name: 'Grouped actions',
  render: () => (
    <Launcher label="More (grouped)">
      {(open, close) => (
        <BottomSheet
          open={open}
          onClose={close}
          title="Equipment actions"
          groups={[
            { title: 'Record', actions: [
              { id: 'edit', label: 'Edit Information' },
              { id: 'qr', label: 'Assign QR Code' },
            ] },
            { title: 'Monitoring', actions: [
              { id: 'plot', label: 'View Plot' },
              { id: 'daily', label: 'View Daily Summary' },
            ] },
            { title: 'Issues', actions: [
              { id: 'open-issues', label: 'View Open Issues' },
              { id: 'service', label: 'Create Service Request' },
            ] },
            { title: 'Lifecycle', actions: [
              { id: 'export', label: 'Export Record' },
              { id: 'decommission', label: 'Review Decommissioning', destructive: true },
            ] },
          ]}
        />
      )}
    </Launcher>
  ),
};

// ─── Filter / sort (arbitrary content) ────────────────────────────────────────
export const FilterSort = {
  name: 'Filter / sort',
  render: () => {
    const [sort, setSort] = useState('name');
    return (
      <Launcher label="Filter & sort">
        {(open, close) => (
          <BottomSheet open={open} onClose={close} title="Sort by" showCloseButton>
            <OptionList
              flush
              selected={sort}
              onChange={setSort}
              options={[
                { id: 'name', label: 'Name (A–Z)' },
                { id: 'health', label: 'Health status' },
                { id: 'maintenance', label: 'Maintenance due' },
                { id: 'recent', label: 'Recently updated' },
              ]}
            />
            <div style={{ marginTop: 12 }}>
              <Btn variant="primary" fullWidth onClick={close}>Apply</Btn>
            </div>
          </BottomSheet>
        )}
      </Launcher>
    );
  },
};

// ─── Interaction states — forced rest / hover / pressed on the action rows ────
// The whole sheet is kept open so the rows are visible. Each row's interaction
// fill is forced via the action `state` field (default rows respond to real
// pointer hover/focus/press; these are pinned for documentation).
export const States = {
  name: 'Interaction states',
  render: () => (
    <BottomSheet
      open
      onClose={() => {}}
      title="Action row states"
      groups={[
        { actions: [
          { id: 'rest', label: 'Rest', state: 'default' },
          { id: 'hover', label: 'Hover / focus (forced)', state: 'hover' },
          { id: 'pressed', label: 'Pressed (forced)', state: 'active' },
          { id: 'disabled', label: 'Disabled', disabled: true },
          { id: 'destructive', label: 'Destructive', destructive: true },
        ] },
      ]}
    />
  ),
};

// ─── Loading — shape-matching skeleton rows so the sheet doesn't reflow ───────
export const Loading = {
  name: 'Loading',
  render: () => (
    <BottomSheet open onClose={() => {}} title="Equipment actions" loading />
  ),
};

// ─── Selector ─────────────────────────────────────────────────────────────────
export const Selector = {
  name: 'Selector',
  render: () => {
    const [cat, setCat] = useState('coldchain');
    return (
      <Launcher label="Choose category">
        {(open, close) => (
          <BottomSheet open={open} onClose={close} title="Equipment category" showCloseButton>
            <OptionList
              flush
              selected={cat}
              onChange={(v) => { setCat(v); close(); }}
              options={[
                { id: 'coldchain', label: 'ColdChain Equipment' },
                { id: 'rtmds', label: 'RTMDs' },
                { id: 'solar', label: 'Solar Equipment' },
                { id: 'passive', label: 'Passive Equipment' },
                { id: 'oxygen', label: 'Oxygen Equipment' },
                { id: 'lab', label: 'Lab Equipment' },
                { id: 'general', label: 'General Equipment' },
              ]}
            />
          </BottomSheet>
        )}
      </Launcher>
    );
  },
};
