#!/usr/bin/env node
// Scaffold a new project: node scripts/new-project.mjs <slug> "<Title>" [JIRA-EPIC]
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [, , slug, title = slug, jiraEpic = null] = process.argv;
if (!slug) {
  console.error('Usage: npm run new-project -- <slug> "<Title>" [JIRA-EPIC]');
  process.exit(1);
}
const dir = resolve(__dirname, '../src/projects', slug);
if (existsSync(dir)) {
  console.error(`Project "${slug}" already exists.`);
  process.exit(1);
}
mkdirSync(resolve(dir, 'prototypes'), { recursive: true });
const today = new Date().toISOString().slice(0, 10);

writeFileSync(resolve(dir, 'project.js'), `export default {
  title: ${JSON.stringify(title)},
  description: '',
  status: 'Active',
  jiraEpic: ${jiraEpic ? JSON.stringify(jiraEpic) : 'null'},   // the project's Jira epic (PD-XX)
  prd: null,     // link to the PRD (Google Doc / Confluence / repo path)
  figma: null,   // link to the project's Figma file or section
  updated: '${today}',
};
`);

writeFileSync(resolve(dir, 'PRD.md'), `# ${title} — PRD (working copy)

> Source of truth: link the original in project.js \`prd\`. This file is the repo working
> copy — paste or summarize the PRD here so Claude sessions have it in-context.

## Problem

## Goals

## Requirements

## Out of scope
`);

console.log('✔ Created src/projects/' + slug + '/ — add prototypes with: npm run new -- ' + slug + ' <proto-slug> "Title"');
