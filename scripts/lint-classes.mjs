#!/usr/bin/env node
/**
 * Lahzo design-token linter (the JS successor to the old validate.py).
 * Scans Tailwind class strings in src (.ts/.tsx files) for the system's hard rules:
 *   - banned daisyUI classes
 *   - raw hex in arbitrary values  (bg-[#fff])
 *   - the `uppercase` utility       (sentence-case only)
 *   - a stray `underline` utility   (underline is reserved for .btn-link)
 *   - off-scale spacing             (p/m/gap/space steps outside the Lahzo scale)
 * Exits non-zero on any violation so CI can gate on it.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src');

// Single source of truth — the scale + banned list come from reference/tokens.json.
const tokens = JSON.parse(readFileSync(path.resolve(process.cwd(), 'reference/tokens.json'), 'utf8'));
const BANNED = tokens.bannedClasses;
const ALLOWED_PX = new Set([0, ...tokens.spacingPx]);
const ALLOWED_STEPS = new Set([0, ...tokens.spacingPx.map((px) => px / 4)]);
const SPACING =
  /^(gap-x|gap-y|space-x|space-y|gap|px|py|pt|pb|pl|pr|ps|pe|mx|my|mt|mb|ml|mr|ms|me|p|m)-(.+)$/;

/** Recursively collect .ts/.tsx files under src. */
function collect(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, out);
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}

/** Pull the contents of every quoted string in a source file. */
function quotedStrings(src) {
  const matches = src.match(/(["'`])((?:\\.|(?!\1).)*)\1/gs) ?? [];
  return matches.map((m) => m.slice(1, -1));
}

const findings = [];

for (const file of collect(ROOT)) {
  const rel = path.relative(process.cwd(), file);
  const src = readFileSync(file, 'utf8');

  for (const str of quotedStrings(src)) {
    const tokens = str.split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      const cls = token.replace(/^[a-z-]+:/i, ''); // strip variant prefixes like hover:/dark:

      if (BANNED.includes(cls)) {
        findings.push(`${rel}: banned class "${cls}"`);
        continue;
      }
      if (/\[#[0-9a-fA-F]{3,8}\]/.test(cls)) {
        findings.push(`${rel}: raw hex in "${cls}" — use a theme token`);
        continue;
      }
      if (cls === 'uppercase') {
        findings.push(`${rel}: "uppercase" is banned — sentence-case only`);
        continue;
      }
      if (cls === 'underline') {
        findings.push(`${rel}: stray "underline" — underline is reserved for .btn-link`);
        continue;
      }

      const spacing = cls.match(SPACING);
      if (spacing) {
        const value = spacing[2];
        if (value.startsWith('[') && value.endsWith(']')) {
          const px = value.match(/^\[(\d+(?:\.\d+)?)px\]$/);
          if (px && !ALLOWED_PX.has(Number(px[1]))) {
            findings.push(`${rel}: off-scale spacing "${cls}" (px not on the scale)`);
          }
        } else if (/^\d+$/.test(value) && !ALLOWED_STEPS.has(Number(value))) {
          findings.push(`${rel}: off-scale spacing "${cls}" (step not on the scale)`);
        }
      }
    }
  }
}

if (findings.length > 0) {
  console.error('✖ Design-token lint failed:\n');
  for (const f of [...new Set(findings)]) console.error('  - ' + f);
  console.error(`\n${findings.length} issue(s).`);
  process.exit(1);
}

console.log('✓ Design-token lint passed.');
