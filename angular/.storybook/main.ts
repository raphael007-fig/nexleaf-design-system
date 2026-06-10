import type { StorybookConfig } from '@storybook/angular';

/**
 * Angular Storybook — the PRODUCTION-FACING surface of the Nexleaf design
 * system. Renders the `nx-*` components from @nexleaf/angular against the same
 * shared CSS the React Storybook uses (the bundled dist `styles.css`, loaded
 * via angular.json → storybook-host:build → "styles"). The React Storybook
 * remains the design/reference environment; this one is what engineering
 * consumes. See PoltailDesign.md → "Two delivery surfaces".
 *
 * Run `npm run build` (ng-packagr + bundle-styles) before starting so
 * dist/nexleaf-angular/styles.css exists.
 */
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: [],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: { autodocs: false },
};

export default config;
