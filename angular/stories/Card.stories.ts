import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxCardLayoutType1Component } from '../projects/nexleaf-angular/src/lib/card/card.component';
import { NxCardModule } from '../projects/nexleaf-angular/src/lib/card/card.module';
import { NxCellModule } from '../projects/nexleaf-angular/src/lib/cell/cell.module';

/**
 * nx-card-layout-type1..4 + type6 — equipment-record card layouts. Styled by
 * the shared Card.css in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxCardLayoutType1Component> = {
  title: 'Components/Card',
  component: NxCardLayoutType1Component,
  decorators: [moduleMetadata({ imports: [NxCardModule, NxCellModule] })],
};
export default meta;

type Story = StoryObj<NxCardLayoutType1Component>;

const equipmentFields = [
  { label: 'Equipment Type', value: 'Vaccine Refrigerator (ILR)' },
  { label: 'Serial Number', value: 'VF-2041-TZ' },
  { label: 'Facility', value: 'Kilimani Health Centre' },
  { label: 'Maintenance', value: 'Last serviced 12 May 2026' },
];

const maintenanceRows = [
  { date: '12 May 2026', task: 'Thermostat recalibration', tech: 'A. Mwangi' },
  { date: '03 Feb 2026', task: 'Door gasket replacement', tech: 'J. Otieno' },
  { date: '18 Nov 2025', task: 'Routine preventive service', tech: 'A. Mwangi' },
];

export const LayoutTypes: Story = {
  render: () => ({
    props: {
      equipmentFields,
      maintenanceTabs: [{ label: 'Maintenance' }, { label: 'Alarms' }],
      maintenanceRows,
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:560px;">
        <nx-card-layout-type1
          [fields]="equipmentFields"
          notes="Unit holds temperature well; door seal replaced in February."
        ></nx-card-layout-type1>

        <nx-card-layout-type2
          title="Service History"
          description="Recent maintenance for VF-2041-TZ"
          [tabs]="maintenanceTabs"
          [activeTab]="0"
          [tableRows]="maintenanceRows"
        ></nx-card-layout-type2>

        <nx-card-layout-type3
          region="Dodoma Region"
          facilityName="Kilimani Health Centre"
          facilityHref="#"
        ></nx-card-layout-type3>

        <nx-card-layout-type4
          addedBy="Grace Ndlovu"
          contactNumber="+255 712 345 678"
        ></nx-card-layout-type4>

        <nx-card-layout-type6
          tone="critical"
          title="Action Required"
          badge="2 Urgent Issues"
          actionLabel="View All Issues"
        >
          <nx-cell
            title="Temperature alarm"
            description="VF-1187 above 8&deg;C for 4 hours"
            [hasChevron]="true"
          ></nx-cell>
          <nx-cell
            title="Reading overdue"
            description="Morning reading missing for VF-2041-TZ"
            [hasChevron]="true"
          ></nx-cell>
        </nx-card-layout-type6>
      </div>
    `,
  }),
};
