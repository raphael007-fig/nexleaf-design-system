#!/usr/bin/env node
// Regenerate ../../src/index.js — the design-system barrel export.
// Run after adding/removing DS components: npm run gen-barrel
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../../src');
const compDir = resolve(srcDir, 'components');

const lines = [
  '// AUTO-GENERATED barrel export for the Poltail design system.',
  "// import { Btn, Card } from '@nexleaf/design-system'",
  '',
  '// ── Tokens ──',
  "export * from './tokens/index.js';",
  '',
  '// ── Components ──',
];

const seen = new Set(); // global dedupe — a symbol may only be exported once across the barrel
for (const name of readdirSync(compDir).sort()) {
  const file = resolve(compDir, name, `${name}.jsx`);
  if (!existsSync(file)) continue;
  const src = readFileSync(file, 'utf8');
  const names = [...src.matchAll(/^export (?:function|const) ([A-Za-z0-9_]+)/gm)]
    .map((m) => m[1]);
  const uniq = [...new Set(names)].filter((n) => {
    if (seen.has(n)) {
      console.warn(`⚠ duplicate export "${n}" in ${name}.jsx — skipped (kept first occurrence)`);
      return false;
    }
    seen.add(n);
    return true;
  });
  if (uniq.length === 0) continue;
  lines.push(`export { ${uniq.join(', ')} } from './components/${name}/${name}.jsx';`);
}

writeFileSync(resolve(srcDir, 'index.js'), lines.join('\n') + '\n');
console.log(`✔ Wrote ${resolve(srcDir, 'index.js')} (${lines.length - 7} component modules)`);
