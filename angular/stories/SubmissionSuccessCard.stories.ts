import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxSubmissionSuccessCardComponent } from '../projects/nexleaf-angular/src/lib/submission-success-card/submission-success-card.component';
import { NxSubmissionSuccessCardModule } from '../projects/nexleaf-angular/src/lib/submission-success-card/submission-success-card.module';

/**
 * nx-submission-success-card — generic submission-confirmation layout. Styled
 * by the shared SubmissionSuccessCard.css in the bundled
 * @nexleaf/angular/styles.css. Mirrors the React SubmissionSuccessCard: icon
 * circle, centered title, info-surface detail panel (sections of lines, any
 * of which can carry a tone dot), footer line and .nx-btn action row.
 */
const meta: Meta<NxSubmissionSuccessCardComponent> = {
  title: 'Components/SubmissionSuccessCard',
  component: NxSubmissionSuccessCardComponent,
  decorators: [moduleMetadata({ imports: [NxSubmissionSuccessCardModule] })],
};
export default meta;

type Story = StoryObj<NxSubmissionSuccessCardComponent>;

const TEMP_IDENTITY = {
  lines: [
    'Equipment Name: MK 114 Vaccine Refrigerator',
    'Serial Number: CCE-2024-MK114-002',
    'Facility: Pumwani Maternity Hospital',
  ],
};
const TEMP_MORNING = {
  heading: 'Morning Reading:',
  lines: [
    'Morning Temp: 2 °C',
    'Yesterday Max/Min: 12 °C / 12 °C',
    'Alarms: No',
    'Recorded by: Juma Mwangi | Jul 21, 2026 | 01:48 PM',
  ],
};
const TEMP_EVENING = {
  heading: 'Evening Reading:',
  lines: [
    'Evening Temp: -1 °C',
    'Equipment Status: Faulty/Needs Repair',
    'Recorded by: Amani Karanja | Jul 21, 2026 | 01:49 PM',
  ],
};

// Morning recorded, evening pending — amber dot, CTA continues the day.
export const MorningRecorded: Story = {
  render: () => ({
    props: {
      sections: [
        TEMP_IDENTITY,
        { lines: [
          'Recording Date: Jul 21, 2026',
          { dot: 'warning', text: 'Record Status: Evening Pending' },
        ]},
        TEMP_MORNING,
      ],
      secondaryActions: [{ label: 'View Temperature Logs' }, { label: 'Create Service Request' }],
    },
    template: `
      <div style="display:flex; justify-content:center; padding:8px;">
        <nx-submission-success-card
          title="Morning Temperature Recorded"
          [sections]="sections"
          footerLabel="Equipment Status" footerValue="Functional"
          primaryLabel="Record Evening Temperature"
          [secondaryActions]="secondaryActions"
          homeLabel="Go to Home Page" />
      </div>
    `,
  }),
};

// Both readings in — green dot, CTA loops to the next fridge.
export const DailyRecordComplete: Story = {
  render: () => ({
    props: {
      sections: [
        TEMP_IDENTITY,
        { lines: [
          'Recording Date: Jul 21, 2026',
          { dot: 'success', text: 'Record Status: Daily Record Complete' },
        ]},
        TEMP_MORNING,
        TEMP_EVENING,
      ],
      secondaryActions: [{ label: 'View Temperature Logs' }, { label: 'Create Service Request' }],
    },
    template: `
      <div style="display:flex; justify-content:center; padding:8px;">
        <nx-submission-success-card
          title="Daily Temperature Record Completed"
          [sections]="sections"
          footerLabel="Equipment Status" footerValue="Faulty/Needs Repair"
          primaryLabel="Record Another CCE"
          [secondaryActions]="secondaryActions"
          homeLabel="Go to Home Page" />
      </div>
    `,
  }),
};

// Back-filled against a past recording date — orange dot + "Submitted On" line.
export const PastEntry: Story = {
  render: () => ({
    props: {
      sections: [
        TEMP_IDENTITY,
        { lines: [
          'Recording Date: Jul 14, 2026',
          'Submitted On: Jul 21, 2026',
          { dot: 'attention', text: 'Record Status: Past Entry — Morning Recorded' },
        ]},
        TEMP_MORNING,
      ],
      secondaryActions: [{ label: 'View Temperature Logs' }],
    },
    template: `
      <div style="display:flex; justify-content:center; padding:8px;">
        <nx-submission-success-card
          title="Morning Temperature Recorded"
          [sections]="sections"
          footerLabel="Equipment Status" footerValue="Functional"
          primaryLabel="Record Evening Temperature"
          [secondaryActions]="secondaryActions"
          homeLabel="Go to Home Page" />
      </div>
    `,
  }),
};

// The layout is not temperature-specific — any submission flow composes it.
export const GenericServiceRequest: Story = {
  render: () => ({
    props: {
      sections: [
        TEMP_IDENTITY,
        { lines: [
          { label: 'Ticket', value: 'SR-2026-0142' },
          { label: 'Submitted', value: 'Jul 21, 2026 | 02:03 PM' },
          { dot: 'warning', text: 'Status: Awaiting Technician' },
        ]},
        { heading: 'Request:', lines: [
          { label: 'Category', value: 'Compressor fault' },
          { label: 'Priority', value: 'High' },
          { label: 'Reported by', value: 'Juma Mwangi' },
        ]},
      ],
      secondaryActions: [{ label: 'Back to Equipment' }],
    },
    template: `
      <div style="display:flex; justify-content:center; padding:8px;">
        <nx-submission-success-card
          title="Service Request Submitted"
          [sections]="sections"
          footerLabel="Next step" footerValue="A technician will be assigned within 24 hours."
          primaryLabel="Track Request"
          [secondaryActions]="secondaryActions"
          homeLabel="Go to Home Page" />
      </div>
    `,
  }),
};
