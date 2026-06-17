#!/usr/bin/env node
/**
 * Guards against registry drift in the folder-per-component layout. Every component folder
 * in src/components/ui must contain <Name>.tsx + index.ts, be re-exported from the top
 * barrel, AND be registered in reference/components.json — and every registered source file
 * must exist. There must be no loose component files directly in src/components/ui.
 * Run as part of `npm run check` / CI.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const uiDir = path.resolve(root, 'src/components/ui');
const reg = JSON.parse(readFileSync(path.resolve(root, 'reference/components.json'), 'utf8'));
const barrel = readFileSync(path.join(uiDir, 'index.ts'), 'utf8');

// Every registered entry that points at a source file (foundation + built components).
const registeredSources = new Set(
  [...Object.values(reg.foundation ?? {}), ...Object.values(reg.components ?? {})]
    .filter((entry) => entry && entry.source)
    .map((entry) => entry.source),
);

const errors = [];
const dirents = readdirSync(uiDir, { withFileTypes: true });

// 1. No loose component files — components must live in folders.
for (const dirent of dirents) {
  if (dirent.isFile() && dirent.name.endsWith('.tsx')) {
    const base = dirent.name.replace(/\.tsx$/, '');
    errors.push(`Loose file ${dirent.name} — move it to src/components/ui/${base}/${dirent.name}.`);
  }
}

// 2. Each component folder is complete, exported, and registered.
const componentDirs = dirents.filter((d) => d.isDirectory()).map((d) => d.name);
for (const name of componentDirs) {
  if (!existsSync(path.join(uiDir, name, `${name}.tsx`))) {
    errors.push(`${name}/ is missing ${name}.tsx`);
  }
  if (!existsSync(path.join(uiDir, name, 'index.ts'))) {
    errors.push(`${name}/ is missing index.ts`);
  }
  if (!barrel.includes(`'./${name}'`)) {
    errors.push(`${name} is not re-exported from src/components/ui/index.ts`);
  }
  if (!registeredSources.has(`src/components/ui/${name}/${name}.tsx`)) {
    errors.push(`${name} is not registered in components.json (use "npm run new:component").`);
  }
}

// 3. Each registered source file actually exists.
for (const source of registeredSources) {
  if (!existsSync(path.resolve(root, source))) {
    errors.push(`Registry points at a missing file: ${source}`);
  }
}

if (errors.length > 0) {
  console.error('✖ Registry check failed:\n');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}

console.log('✓ Registry check passed (folders ↔ barrel ↔ components.json in sync).');
