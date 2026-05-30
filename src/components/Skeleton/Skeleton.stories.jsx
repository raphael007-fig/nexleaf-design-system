import { Skeleton, SkeletonGroup } from './Skeleton.jsx';
import { Card } from '../Card/Card.jsx';
import { CardLayoutType1 } from '../Card/Card.jsx';
import { Page } from '../Page/Page.jsx';
import { Tabs } from '../Tabs/Tabs.jsx';
import { MetricCard } from '../MetricCard/MetricCard.jsx';
import { Btn } from '../Btn/Btn.jsx';
import { IndexTable } from '../IndexTable/IndexTable.jsx';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
};

// ─── AllStates — primitive variants ──────────────────────────────────────────

export const AllStates = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480, fontFamily: 'Inter, sans-serif' }}>

      <Section label="Default block (Skeleton)">
        <Skeleton />
      </Section>

      <Section label="Fixed width and height">
        <Skeleton width={200} height={40} />
      </Section>

      <Section label="Custom radius (square)">
        <Skeleton width={64} height={64} radius={8} />
      </Section>

      <Section label="Skeleton.Line — single text line">
        <Skeleton.Line />
      </Section>

      <Section label="Skeleton.Line — paragraph (staggered delay)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton.Line width="100%" delay={0}    />
          <Skeleton.Line width="92%"  delay={0.06} />
          <Skeleton.Line width="78%"  delay={0.12} />
          <Skeleton.Line width="45%"  delay={0.18} />
        </div>
      </Section>

      <Section label="Skeleton.Circle — avatar">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Skeleton.Circle size={20} />
          <Skeleton.Circle size={32} delay={0.06} />
          <Skeleton.Circle size={48} delay={0.12} />
        </div>
      </Section>

      <Section label="SkeletonGroup — one accessible announcement for many blocks">
        <SkeletonGroup label="Loading profile">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton.Circle size={48} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Skeleton.Line width="60%" />
              <Skeleton.Line width="40%" delay={0.06} />
            </div>
          </div>
        </SkeletonGroup>
      </Section>

    </div>
  ),
};

// ─── Per-component skeleton parity ───────────────────────────────────────────

export const ComponentParity = {
  name: 'Component parity (Card / Page / Tabs / Btn / MetricCard / IndexTable)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'Inter, sans-serif' }}>

      <Section label="Page header (loading)">
        <Page
          loading
          title="Equipment Details"
          backAction={{ onAction: () => {} }}
          primaryAction={{ content: 'Add Installation', onAction: () => {} }}
          secondaryActions={[{ content: 'Export', onAction: () => {} }]}
        />
      </Section>

      <Section label="Tabs (loading)">
        <Tabs loading loadingCount={4} />
      </Section>

      <Section label="Btn — loading (spinner)">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Btn variant="primary" loading>Saving</Btn>
          <Btn variant="secondary" loading>Saving</Btn>
          <Btn variant="ghost" loading>Saving</Btn>
        </div>
      </Section>

      <Section label="Btn — skeleton (page is loading)">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Btn skeleton size="medium" />
          <Btn skeleton size="medium" skeletonWidth={140} />
          <Btn skeleton size="large" />
        </div>
      </Section>

      <Section label="MetricCard (loading)">
        <div style={{ display: 'flex', gap: 12 }}>
          <MetricCard loading />
          <MetricCard loading />
          <MetricCard loading />
        </div>
      </Section>

      <Section label="Card — default skeleton">
        <div style={{ maxWidth: 360 }}>
          <Card loading />
        </div>
      </Section>

      <Section label="CardLayoutType1 — shape-matching skeleton">
        <div style={{ maxWidth: 560 }}>
          <CardLayoutType1 loading />
        </div>
      </Section>

      <Section label="IndexTable (loading)">
        <IndexTable
          loading
          columns={[
            { key: 'date',    label: 'Date',    sortable: true },
            { key: 'name',    label: 'Facility' },
            { key: 'region',  label: 'Region' },
            { key: 'status',  label: 'Status' },
          ]}
          rows={[]}
        />
      </Section>

    </div>
  ),
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function Section({ label, children }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 500, color: '#9e9e9e', margin: '0 0 8px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </p>
      {children}
    </div>
  );
}
