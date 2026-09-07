import { StateSwitcher } from '../../screens/StateSwitcher.jsx';

// States come from the shared registry (screens/states.jsx) so this prototype
// and the Figma board reference identical ids.
const TITLES = ['Lab register (Inventory ▸ Lab)', 'Register record (detail)'];

export default function Proto() {
  return <StateSwitcher titles={TITLES} />;
}
