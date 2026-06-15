import type { Preview } from '@storybook/angular';

/**
 * Global styles come from angular.json (`storybook-host:build` → "styles":
 * dist/nexleaf-angular/styles.css) — the bundled tokens + every nx-* component
 * stylesheet, i.e. exactly the CSS the @nexleaf/angular package ships. What
 * renders here is what a consuming Angular app gets.
 *
 * Sidebar sort mirrors the React Storybook: Docs first inside a component,
 * then Foundation → Components → Patterns, with the Navigation children pinned
 * in the same curated order.
 */
const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
    options: {
      // NOTE: Storybook stringifies this function and re-evals it in the
      // manager — it must be plain JS (no TS annotations) and self-contained.
      // @ts-ignore — params intentionally untyped (annotations break the eval'd string)
      storySort: (a, b) => {
        const TOP_ORDER = ['Foundation', 'Components', 'Patterns'];
        const NAV_ORDER = ['NavCard', 'TopBar', 'Breadcrumbs', 'Pagination', 'Tabs', 'Toolbar', 'Header Page', 'Side Navigation'];
        const NAV_PREFIX = 'Components/Navigation/';

        // 1) Same component → Docs first, then preserve original order.
        if (a.title === b.title) {
          if (a.name === 'Docs') return -1;
          if (b.name === 'Docs') return 1;
          return 0;
        }

        // 2) Top-level group ordering.
        const aTop = a.title.split('/')[0];
        const bTop = b.title.split('/')[0];
        if (aTop !== bTop) {
          const ai = TOP_ORDER.indexOf(aTop);
          const bi = TOP_ORDER.indexOf(bTop);
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return aTop.localeCompare(bTop);
        }

        // 3) Pin Navigation children in the curated order.
        if (a.title.startsWith(NAV_PREFIX) && b.title.startsWith(NAV_PREFIX)) {
          const aLeaf = a.title.slice(NAV_PREFIX.length).split('/')[0];
          const bLeaf = b.title.slice(NAV_PREFIX.length).split('/')[0];
          const ai = NAV_ORDER.indexOf(aLeaf);
          const bi = NAV_ORDER.indexOf(bLeaf);
          if (ai !== bi) return ai - bi;
        }

        // 4) Numeric-aware alphabetical fallback.
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
  },
};

export default preview;
