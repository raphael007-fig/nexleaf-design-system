#!/usr/bin/env node
// Scaffold a SHARED SCREEN for a project — reused by multiple flows.
//   node scripts/new-screen.mjs <project-slug> <ScreenName>
// Screens are the nouns (CceDetail, CceEditForm, ExportPanel); prototypes are the
// verbs (flows) that path through them. Two tickets over the same screens = two
// flows importing the same screen modules, so a screen fix lands everywhere at once.
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [, , projectSlug, rawName] = process.argv;
if (!projectSlug || !rawName) {
  console.error('Usage: npm run new-screen -- <project-slug> <ScreenName>');
  process.exit(1);
}
const projectDir = resolve(__dirname, '../src/projects', projectSlug);
if (!existsSync(projectDir)) {
  console.error('Project "' + projectSlug + '" does not exist.');
  process.exit(1);
}
const name = rawName.replace(/(^|[-_\s])(\w)/g, (_, __, c) => c.toUpperCase()).replace(/[-_\s]/g, '');
const dir = resolve(projectDir, 'screens');
mkdirSync(dir, { recursive: true });
const file = resolve(dir, name + '.jsx');
if (existsSync(file)) { console.error('Screen ' + name + ' already exists.'); process.exit(1); }

writeFileSync(file, `import React from 'react';
// SHARED SCREEN — imported by one or more flows in this project.
// Compose from the design system only (see .claude/skills/ds-components-only).
// Keep it presentational: take data + callbacks as props so each flow can drive it.
import { Page } from '@ds';

export default function ${name}({ onAction }) {
  return (
    <>
      <Page title="${name.replace(/([A-Z])/g, ' $1').trim()}" />
      {/* build with @ds components */}
    </>
  );
}
`);
console.log('✔ Created src/projects/' + projectSlug + '/screens/' + name + '.jsx');
console.log('  Import it in a flow:  import ' + name + " from '../../screens/" + name + ".jsx';");
