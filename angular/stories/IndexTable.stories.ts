import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  NxIndexTableComponent,
  NxIndexTableColumn,
  NxIndexTableAction,
} from '../projects/nexleaf-angular/src/lib/index-table/index-table.component';
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

const columns: NxIndexTableColumn[] = [
  { key: 'serial', title: 'Serial Number' },
  { key: 'type', title: 'Equipment Type' },
  { key: 'facility', title: 'Facility' },
  // `type: 'status'` renders the cell as an nx-badge status pill.
  { key: 'status', title: 'Status', type: 'status' },
];

const rows = [
  {
    id: 'VF-2041-TZ',
    serial: 'VF-2041-TZ',
    type: 'Vaccine Refrigerator (ILR)',
    facility: 'Kilimani Health Centre',
    status: 'Functional',
  },
  {
    id: 'CR-0114',
    serial: 'CR-0114',
    type: 'Cold Room',
    facility: 'Dodoma Regional Vaccine Store',
    status: 'Functional',
  },
  {
    id: 'VF-1187',
    serial: 'VF-1187',
    type: 'Vaccine Refrigerator (SDD)',
    facility: 'Mbeya District Hospital',
    status: 'Alarm',
  },
  {
    id: 'FZ-0830',
    serial: 'FZ-0830',
    type: 'Freezer',
    facility: 'Arusha City Clinic',
    status: 'Needs Maintenance',
  },
];

const bulkActions: NxIndexTableAction[] = [
  { label: 'Export selected' },
  { label: 'Mark serviced' },
];

export const Basic: Story = {
  render: () => ({
    props: {
      columns,
      rows,
      // Passing a selection model enables the leading checkbox column.
      // Two rows pre-selected so the bulk bar + selected tint render.
      selectedRows: ['VF-1187', 'FZ-0830'],
      bulkActions,
    },
    template: `
      <div style="max-width:840px;">
        <nx-index-table
          [columns]="columns"
          [rows]="rows"
          [selectedRows]="selectedRows"
          [bulkActions]="bulkActions"
          sortKey="serial"
          sortDir="asc"
          (selectionChange)="selectedRows = $event"
        ></nx-index-table>
      </div>
    `,
  }),
};
