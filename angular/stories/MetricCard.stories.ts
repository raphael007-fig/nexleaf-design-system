import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxMetricCardComponent } from '../projects/nexleaf-angular/src/lib/metric-card/metric-card.component';
import { NxMetricCardModule } from '../projects/nexleaf-angular/src/lib/metric-card/metric-card.module';

/**
 * nx-metric-card — selectable metric tile. Styled by the shared MetricCard.css
 * in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxMetricCardComponent> = {
  title: 'Components/MetricCard',
  component: NxMetricCardComponent,
  decorators: [moduleMetadata({ imports: [NxMetricCardModule] })],
};
export default meta;

type Story = StoryObj<NxMetricCardComponent>;

export const States: Story = {
  render: () => ({
    props: {
      functionalBadge: { label: '+3 this week', tone: 'success' },
      alarmBadge: { label: '2 new', tone: 'critical' },
    },
    template: `
      <div style="display:grid; grid-template-columns:repeat(4, minmax(160px, 1fr)); gap:16px; max-width:880px;">
        <nx-metric-card
          title="Functional Units"
          metric="128"
          [badge]="functionalBadge"
        ></nx-metric-card>
        <nx-metric-card
          title="Active Alarms"
          metric="5"
          [badge]="alarmBadge"
          [selected]="true"
        ></nx-metric-card>
        <nx-metric-card
          title="Decommissioned"
          metric="9"
          [disabled]="true"
        ></nx-metric-card>
        <nx-metric-card
          title="Sites Reporting"
          metric="42"
          [loading]="true"
        ></nx-metric-card>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(4, minmax(160px, 1fr)); gap:16px; max-width:880px;">
        <nx-metric-card title="Functional Units" metric="128" [loading]="true"></nx-metric-card>
        <nx-metric-card title="Active Alarms" metric="5" [loading]="true"></nx-metric-card>
        <nx-metric-card title="Decommissioned" metric="9" [loading]="true"></nx-metric-card>
        <nx-metric-card title="Sites Reporting" metric="42" [loading]="true"></nx-metric-card>
      </div>
    `,
  }),
};
