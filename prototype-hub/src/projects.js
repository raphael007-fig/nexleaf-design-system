// Auto-discovers projects and their prototypes.
// Structure: ./projects/<project>/project.js  +  ./projects/<project>/prototypes/<slug>/{meta.js,index.jsx}
// Drop folders in — no registry edits (Vite import.meta.glob).

const projectMetas = import.meta.glob('./projects/*/project.js', { eager: true });
const protoMetas = import.meta.glob('./projects/*/prototypes/*/meta.js', { eager: true });
const protoComps = import.meta.glob('./projects/*/prototypes/*/index.jsx');
const protoLogs = import.meta.glob('./projects/*/prototypes/*/CHANGELOG.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const projects = Object.entries(projectMetas)
  .map(([path, mod]) => {
    const slug = path.split('/')[2];
    const prototypes = Object.entries(protoMetas)
      .filter(([p]) => p.split('/')[2] === slug)
      .map(([p, m]) => {
        const protoSlug = p.split('/')[4];
        return {
          slug: protoSlug,
          title: protoSlug,
          description: '',
          // flow = a journey through shared screens (the usual case — one per ticket)
          // screen = a single surface · exploration · component
          type: 'flow',
          // Shared screens this flow paths through, from ../screens/. Documents reuse:
          // two tickets over the same screens are two flows importing the same modules.
          screens: [],
          status: 'Draft',
          jiraKey: null,
          tags: [],
          updated: '',
          ...(m.default || {}),
          load: protoComps[`./projects/${slug}/prototypes/${protoSlug}/index.jsx`],
          changelog: protoLogs[`./projects/${slug}/prototypes/${protoSlug}/CHANGELOG.md`] || '',
        };
      })
      .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));

    return {
      slug,
      title: slug,
      description: '',
      status: 'Active',
      jiraEpic: null,   // e.g. 'PD-32' — the project's epic
      prd: null,        // link or repo path to the PRD
      figma: null,      // link to the project's Figma file/section
      updated: '',
      ...(mod.default || {}),
      prototypes,
    };
  })
  .sort((a, b) => (b.updated || '').localeCompare(a.updated || ''));
