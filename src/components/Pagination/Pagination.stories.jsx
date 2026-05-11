import { useState } from 'react';
import { Pagination } from './Pagination.jsx';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  argTypes: {
    type:        { control: 'select', options: ['page', 'table'] },
    hasPrevious: { control: 'boolean' },
    hasNext:     { control: 'boolean' },
  },
};

export const Default = { args: { hasPrevious: false, hasNext: true } };
export const BothEnabled = { args: { hasPrevious: true, hasNext: true } };
export const BothDisabled = { args: { hasPrevious: false, hasNext: false } };
export const WithLabel = { args: { hasPrevious: true, hasNext: true, label: 'Showing 1–20 of 80 results' } };

export const TableType = {
  args: { type: 'table', hasPrevious: true, hasNext: true, label: '1–20 of 80 results' },
  parameters: { layout: 'padded' },
  decorators: [Story => <div style={{ width: 480, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}><Story /></div>],
};

export const AllTypes = {
  name: 'Both Types',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'Inter, sans-serif' }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Page type — all states</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
          <Pagination hasPrevious={false} hasNext={true}  label="1 of 5" />
          <Pagination hasPrevious={true}  hasNext={true}  label="3 of 5" />
          <Pagination hasPrevious={true}  hasNext={false} label="5 of 5" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Table type</div>
        <div style={{ width: 480, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
          <Pagination type="table" hasPrevious={true} hasNext={true} label="Showing 1–20 of 134" />
        </div>
        <div style={{ width: 480, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', marginTop: 8 }}>
          <Pagination type="table" hasPrevious={false} hasNext={false} label="Showing all 12 results" />
        </div>
      </div>
    </div>
  ),
};

export const AllStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Pagination hasPrevious={false} hasNext={true} />
      <Pagination hasPrevious={true}  hasNext={true} />
      <Pagination hasPrevious={true}  hasNext={false} />
      <Pagination hasPrevious={false} hasNext={false} />
    </div>
  ),
};

export const Interactive = {
  render: () => {
    const [page, setPage] = useState(1);
    const total = 5;
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#616161', marginBottom: 16 }}>Page {page} of {total}</p>
        <Pagination
          hasPrevious={page > 1}
          hasNext={page < total}
          onPrevious={() => setPage(p => p - 1)}
          onNext={() => setPage(p => p + 1)}
          label={`${page} / ${total}`}
        />
      </div>
    );
  },
};

export const InteractionStates = {
  name: 'Interaction states',
  parameters: { layout: 'padded' },
  render: () => {
    const [page, setPage] = useState(3);
    const [offset, setOffset] = useState(20);
    const pageSize = 20;
    const total = 134;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'Inter, sans-serif', width: 520 }}>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Page navigation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <Pagination
              hasPrevious={page > 1}
              hasNext={page < 12}
              onPrevious={() => setPage(p => p - 1)}
              onNext={() => setPage(p => p + 1)}
              label={`Record ${page} of 12`}
            />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Table footer</div>
          <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', background: '#fff', fontSize: 13, color: '#616161' }}>
              {Array.from({ length: Math.min(pageSize, total - offset) }, (_, i) => (
                <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0', color: '#303030' }}>
                  Record {offset + i + 1} — Temperature 4.{i}°C
                </div>
              ))}
            </div>
            <Pagination
              type="table"
              hasPrevious={offset > 0}
              hasNext={offset + pageSize < total}
              onPrevious={() => setOffset(o => Math.max(0, o - pageSize))}
              onNext={() => setOffset(o => Math.min(total - pageSize, o + pageSize))}
              label={`Showing ${offset + 1}–${Math.min(offset + pageSize, total)} of ${total}`}
            />
          </div>
        </div>

      </div>
    );
  },
};
