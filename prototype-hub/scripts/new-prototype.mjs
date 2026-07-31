#!/usr/bin/env node
// Scaffold a new prototype inside a project:
//   node scripts/new-prototype.mjs <project-slug> <proto-slug> "<Title>"
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [, , projectSlug, slug, ...titleParts] = process.argv;
if (!projectSlug || !slug) {
  console.error('Usage: npm run new -- <project-slug> <proto-slug> "<Title>"');
  process.exit(1);
}
const projectDir = resolve(__dirname, '../src/projects', projectSlug);
if (!existsSync(projectDir)) {
  console.error('Project "' + projectSlug + '" does not exist. Create it first: npm run new-project -- ' + projectSlug + ' "Title"');
  process.exit(1);
}
const title = titleParts.join(' ') || slug;
const dir = resolve(projectDir, 'prototypes', slug);
if (existsSync(dir)) {
  console.error('Prototype "' + slug + '" already exists in ' + projectSlug + '.');
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
const today = new Date().toISOString().slice(0, 10);

writeFileSync(resolve(dir, 'meta.js'), `export default {
  title: ${JSON.stringify(title)},
  description: '',
  type: 'screen',   // screen | flow | exploration | component
  status: 'Draft',
  jiraKey: null,
  tags: [],
  updated: '${today}',
};
`);

const componentName = slug.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
writeFileSync(resolve(dir, 'index.jsx'), `import React from 'react';
import { Page } from '@ds';

export default function ${componentName}() {
  return (
    <div style={{ background: '#f1f1f1', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: 24 }}>
        <Page title=${JSON.stringify(title)} subtitle="New prototype" />
        {/* Build here using components from '@ds' */}
      </div>
    </div>
  );
}
`);

writeFileSync(resolve(dir, 'CHANGELOG.md'), `# ${title} — change log

## ${today} — Created
- **What:** Scaffolded prototype.
- **Why:**
- **Source:**
`);

console.log('✔ Created src/projects/' + projectSlug + '/prototypes/' + slug + '/ — open #/' + projectSlug + '/' + slug);
