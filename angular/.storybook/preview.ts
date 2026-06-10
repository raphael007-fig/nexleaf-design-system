import type { Preview } from '@storybook/angular';

/**
 * Global styles come from angular.json (`storybook-host:build` → "styles":
 * dist/nexleaf-angular/styles.css) — the bundled tokens + every nx-* component
 * stylesheet, i.e. exactly the CSS the @nexleaf/angular package ships. What
 * renders here is what a consuming Angular app gets.
 */
const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
    options: {
      storySort: { order: ['Foundation', 'Components', 'Patterns'] },
    },
  },
};

export default preview;
