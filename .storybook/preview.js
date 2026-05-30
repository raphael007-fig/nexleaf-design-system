import '../src/global.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    // Custom sidebar sort.
    //
    // Three rules, applied in order:
    //   1. Docs first. Inside any component's story list, the "Docs" leaf
    //      (from each MDX `<Meta title="…/Docs" />`) sorts before all stories.
    //   2. Top-level groups: Foundation → Components → Pages.
    //   3. Navigation children pinned: Breadcrumbs, Pagination, Tabs,
    //      Toolbar, Header Page (otherwise alphabetical would put Header
    //      Page 2nd instead of 5th).
    // Everything else falls back to numeric-aware alphabetical.
    options: {
      storySort: (a, b) => {
        const TOP_ORDER = ['Foundation', 'Components', 'Pages'];
        const NAV_ORDER = ['Breadcrumbs', 'Pagination', 'Tabs', 'Toolbar', 'Header Page', 'Side Navigation'];
        const NAV_PREFIX = 'Components/Navigation/';

        // 1) Same component → Docs first, then preserve original order.
        if (a.title === b.title) {
          if (a.name === 'Docs') return -1;
          if (b.name === 'Docs') return 1;
          return 0;
        }

        // 2) Top-level group ordering (Foundation, Components, Pages).
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

        // 3) Pin Navigation children in the explicit order above.
        if (a.title.startsWith(NAV_PREFIX) && b.title.startsWith(NAV_PREFIX)) {
          const aLeaf = a.title.slice(NAV_PREFIX.length).split('/')[0];
          const bLeaf = b.title.slice(NAV_PREFIX.length).split('/')[0];
          const ai = NAV_ORDER.indexOf(aLeaf);
          const bi = NAV_ORDER.indexOf(bLeaf);
          if (ai !== bi) return ai - bi;
        }

        // 4) Fallback alphabetical (numeric-aware so "Item 2" < "Item 10").
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
  },
};

export default preview;