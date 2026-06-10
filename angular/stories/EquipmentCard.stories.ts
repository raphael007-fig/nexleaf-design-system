import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NxEquipmentCardComponent } from '../projects/nexleaf-angular/src/lib/equipment-card/equipment-card.component';
import { NxEquipmentCardModule } from '../projects/nexleaf-angular/src/lib/equipment-card/equipment-card.module';

/**
 * nx-equipment-card — mobile list card for an equipment record. Health /
 * Maintenance / Lifecycle render as separate status badges.
 */
const meta: Meta<NxEquipmentCardComponent> = {
  title: 'Patterns/Responsive/EquipmentCard',
  component: NxEquipmentCardComponent,
  decorators: [moduleMetadata({ imports: [NxEquipmentCardModule] })],
};
export default meta;

type Story = StoryObj<NxEquipmentCardComponent>;

export const List: Story = {
  render: () => ({
    template: `
      <div style="max-width:420px; display:flex; flex-direction:column; gap:12px;">
        <nx-equipment-card
          name="Hairer-HBC-80 (IOM)"
          type="Ice-Lined Refrigerator"
          serial="HBC-2021-0080"
          facility="Kakuma Mission Hospital"
          health="functional"
          maintenance="upcoming"
        ></nx-equipment-card>
        <nx-equipment-card
          name="Vestfrost MK 144"
          type="Vaccine Refrigerator"
          serial="MK144-2019-0231"
          facility="Mombasa County Hospital"
          health="faulty"
          maintenance="overdue"
        ></nx-equipment-card>
        <nx-equipment-card
          name="B Medical RCW 25"
          type="Cold Box"
          serial="BM-2020-1142"
          facility="Kisumu District Store"
          health="unknown"
        ></nx-equipment-card>
        <nx-equipment-card
          name="Vestfrost MK 304"
          type="Vaccine Refrigerator"
          serial="MK304-2014-0067"
          facility="Nairobi Central Depot"
          health="functional"
          lifecycle="approaching decommissioning"
        ></nx-equipment-card>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="max-width:420px; display:flex; flex-direction:column; gap:12px;">
        <nx-equipment-card [loading]="true"></nx-equipment-card>
        <nx-equipment-card [loading]="true"></nx-equipment-card>
        <nx-equipment-card [loading]="true"></nx-equipment-card>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="max-width:420px; display:flex; flex-direction:column; gap:20px;">
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">Rest</div>
          <nx-equipment-card
            name="Hairer-HBC-80 (IOM)"
            type="Ice-Lined Refrigerator"
            serial="HBC-2021-0080"
            facility="Kakuma Mission Hospital"
            health="functional"
            maintenance="upcoming"
          ></nx-equipment-card>
        </div>
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">Hover (forced)</div>
          <nx-equipment-card
            name="Hairer-HBC-80 (IOM)"
            type="Ice-Lined Refrigerator"
            serial="HBC-2021-0080"
            facility="Kakuma Mission Hospital"
            health="functional"
            maintenance="upcoming"
            state="hover"
          ></nx-equipment-card>
        </div>
        <div>
          <div style="font: 12px/1.4 sans-serif; color: var(--nx-text-subdued, #6d7175); margin-bottom: 8px;">Non-interactive (no chevron, no hover ring)</div>
          <nx-equipment-card
            name="Hairer-HBC-80 (IOM)"
            type="Ice-Lined Refrigerator"
            serial="HBC-2021-0080"
            facility="Kakuma Mission Hospital"
            health="functional"
            maintenance="upcoming"
            [interactive]="false"
          ></nx-equipment-card>
        </div>
      </div>
    `,
  }),
};
