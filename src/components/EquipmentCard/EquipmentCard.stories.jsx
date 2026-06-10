import { EquipmentCard } from './EquipmentCard.jsx';

export default {
  title: 'Patterns/Responsive/EquipmentCard',
  component: EquipmentCard,
  parameters: { layout: 'padded' },
};

const list = (children) => (
  <div style={{ maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Inter, sans-serif' }}>
    {children}
  </div>
);

// A scannable mobile list — table columns distilled to decision-critical fields.
export const List = {
  name: 'Mobile list',
  render: () => list(
    <>
      <EquipmentCard name="Vestfrost MK 144" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" maintenance="upcoming" onClick={() => {}} />
      <EquipmentCard name="B Medical Systems" type="Vaccine Refrigerator" serial="DCM-2024-004" facility="Kisumu" health="faulty" maintenance="overdue" onClick={() => {}} />
      <EquipmentCard name="Haier HBC-80" type="Vaccine Refrigerator" serial="DCM-2024-007" facility="Nairobi West" health="unknown" onClick={() => {}} />
      <EquipmentCard name="Vestfrost MK 304" type="Vaccine Freezer" serial="DCM-2024-010" facility="Nakuru" health="functional" lifecycle="approaching decommissioning" onClick={() => {}} />
    </>
  ),
};

// Every status dimension at once — Health + Maintenance + Lifecycle, separated.
export const AllStatuses = {
  name: 'All status dimensions',
  render: () => list(
    <EquipmentCard
      name="Hairer-HBC-80 (IOM)"
      type="Vaccine Refrigerator"
      serial="BE0G91EAS0 00EJ8 S0003"
      facility="Annusait Hospital (IRC)"
      health="faulty"
      maintenance="overdue"
      lifecycle="approaching decommissioning"
      onClick={() => {}}
    />
  ),
};

// Non-interactive (no chevron, no hover ring).
export const Static = {
  name: 'Static (no tap)',
  render: () => list(
    <EquipmentCard name="Vestfrost MK 144" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" />
  ),
};

// Interaction states side-by-side — rest, hover (forced), and static.
export const States = {
  name: 'Interaction states',
  render: () => list(
    <>
      <EquipmentCard name="Rest — tappable" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" onClick={() => {}} />
      <EquipmentCard name="Hover / focus (forced)" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" onClick={() => {}} state="hover" />
      <EquipmentCard name="Static — not tappable" type="Vaccine Freezer" serial="DCM-2024-001" facility="Mombasa" health="functional" />
    </>
  ),
};

// Loading — shape-matching skeletons so the list doesn't reflow when data lands.
export const Loading = {
  name: 'Loading',
  render: () => list(
    <>
      <EquipmentCard loading />
      <EquipmentCard loading />
      <EquipmentCard loading />
    </>
  ),
};
