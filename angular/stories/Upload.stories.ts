import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxUploadComponent } from '../projects/nexleaf-angular/src/lib/upload/upload.component';
import type { NxUploadFile } from '../projects/nexleaf-angular/src/lib/upload/upload.component';
import { NxUploadModule } from '../projects/nexleaf-angular/src/lib/upload/upload.module';

/**
 * nx-upload — file upload dropzone + file list. Renders the shared
 * `.nx-upload` CSS classes from the bundled @nexleaf/angular/styles.css.
 */
const meta: Meta<NxUploadComponent> = {
  title: 'Components/Upload',
  component: NxUploadComponent,
  decorators: [moduleMetadata({ imports: [NxUploadModule] })],
};
export default meta;

type Story = StoryObj<NxUploadComponent>;

const DONE_FILE: NxUploadFile[] = [
  {
    id: 'file-1',
    name: 'fridge-temperature-log.csv',
    size: 24576,
    uploadedAt: '2026-06-01T08:30:00Z',
    status: 'done',
  },
];

const ERROR_FILE: NxUploadFile[] = [
  {
    id: 'file-2',
    name: 'service-report-photo.jpg',
    size: 4718592,
    uploadedAt: null,
    status: 'error',
    errorMessage: 'File exceeds the 2 MB limit',
  },
];

export const States: Story = {
  render: () => ({
    props: { doneFiles: DONE_FILE, errorFiles: ERROR_FILE },
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:360px;">
        <nx-upload
          label="Calibration certificate"
          helperText="Drag a file here or click to browse (PDF, max 2 MB)"
          accept=".pdf"
        ></nx-upload>

        <nx-upload
          label="Temperature log export"
          helperText="CSV exports from the ColdTrace device"
          accept=".csv"
          [files]="doneFiles"
        ></nx-upload>

        <nx-upload
          label="Service report photo"
          helperText="JPG or PNG, max 2 MB"
          accept=".jpg,.png"
          [files]="errorFiles"
        ></nx-upload>
      </div>
    `,
  }),
};
