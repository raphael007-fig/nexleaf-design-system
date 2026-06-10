import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxIndexTableComponent } from '../projects/nexleaf-angular/src/lib/index-table/index-table.component';
import { NxIndexTableModule } from '../projects/nexleaf-angular/src/lib/index-table/index-table.module';

/**
 * nx-index-table — selectable / sortable data table. Styled by the shared
 * IndexTable.css in the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxIndexTableComponent> = {
  title: 'Components/IndexTable',
  component: NxIndexTableComponent,
  decorators: [moduleMetadata({ imports: [NxIndexTableModule] })],
};
export default meta;

type Story = StoryObj<NxIndexTableComponent>;

const columns = [
  { key: 'serial', title: 'Serial Number' },
  { key: 'type', title: 'Equipment Type' },
  { key: 'facility', title: 'Facility' },
  { key: 'status', title: 'Status' },
];

const rows = [
  {
    serial: 'VF-2041-TZ',
    type: 'Vaccine Refrigerator (ILR)',
    facility: 'Kilimani Health Centre',
    status: 'Functional',
  },
  {
    serial: 'CR-0114',
    type: 'Cold Room',
    facility: 'Dodoma Regional Vaccine Store',
    status: 'Functional',
  },
  {
    serial: 'VF-1187',
    type: 'Vaccine Refrigerator (SDD)',
    facility: 'Mbeya District Hospital',
    status: 'Alarm',
  },
  {
    serial: 'FZ-0830',
    type: 'Freezer',
    facility: 'Arusha City Clinic',
    status: 'Needs Maintenance',
  },
];

export const Basic: Story = {
  render: () => ({
    props: {
      columns,
      rows,
      // Passing a selection model enables the leading checkbox column.
      selectedRows: ['VF-1187'],
    },
    template: `
      <div style="max-width:840px;">
        <nx-index-table
          [columns]="columns"
          [rows]="rows"
          [selectedRows]="selectedRows"
          sortKey="serial"
          sortDir="asc"
        ></nx-index-table>
      </div>
    `,
  }),
};
