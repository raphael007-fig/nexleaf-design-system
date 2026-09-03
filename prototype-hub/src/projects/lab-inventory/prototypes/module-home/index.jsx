import { StateSwitcher } from '../../screens/StateSwitcher.jsx';

// States come from the shared registry (screens/states.jsx) so this prototype
// and the Figma board reference identical ids.
const TITLES = ['Module home · role-gated', 'Full flow (interactive)'];

export default function Proto() {
  return <StateSwitcher titles={TITLES} />;
}
