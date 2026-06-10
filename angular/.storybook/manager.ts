import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

/**
 * Manager branding — identifies this surface as the PRODUCTION (Angular) face
 * of the Nexleaf design system, distinct from the React reference Storybook.
 * The empty addons panel is hidden by default (this surface has no interactive
 * addons; docs live in the Docs tab).
 */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Nexleaf · Angular',
    brandTarget: '_self',
    colorPrimary: '#005bd3',
    colorSecondary: '#005bd3',
  }),
  showPanel: false,
});
