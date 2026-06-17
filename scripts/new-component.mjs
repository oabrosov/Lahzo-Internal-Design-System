#!/usr/bin/env node
/**
 * Scaffold a new component (folder-per-component) from the Button pattern and wire up every
 * registry in one shot, so nothing is ever forgotten.
 *
 *   npm run new:component -- <Name> [daisyuiBase] [tier]
 *   e.g.  npm run new:component -- Input input essential
 *
 * Creates src/components/ui/<Name>/{<Name>.tsx,<Name>.stories.tsx,<Name>.mdx,<Name>.test.tsx,index.ts},
 * adds the barrel export, and marks the component "built" in reference/components.json.
 * The generated component is a working starter — flesh it out from the component spec.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [name, daisyui = 'custom', tier = 'canonical'] = process.argv.slice(2);

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error('Usage: npm run new:component -- <Name> [daisyuiBase] [tier]   (Name must be PascalCase)');
  process.exit(1);
}

const lower = name[0].toLowerCase() + name.slice(1);
const uiDir = path.resolve(process.cwd(), 'src/components/ui');
const compDir = path.join(uiDir, name);

if (existsSync(compDir)) {
  console.error(`Refusing to overwrite existing component folder: src/components/ui/${name}`);
  process.exit(1);
}

const files = {
  [`${name}.tsx`]: `import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

// TODO: define variants from the component spec (see Button/Button.tsx for the pattern).
export const ${lower}Variants = cva('${daisyui}', {
  variants: {},
  defaultVariants: {},
});

export interface ${name}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${lower}Variants> {}

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(function ${name}(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn(${lower}Variants(), className)} {...props} />;
});
`,
  [`${name}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta = {
  title: 'Components/${name}',
  component: ${name},
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
`,
  [`${name}.mdx`]: `import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ${name}Stories from './${name}.stories';

<Meta of={${name}Stories} />

# ${name}

> TODO: purpose, when to use, anatomy, do/don't — fill from the component spec.

## Playground

<Canvas of={${name}Stories.Playground} />

## Props

<Controls of={${name}Stories.Playground} />
`,
  [`${name}.test.tsx`]: `import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders and merges a custom className', () => {
    const { container } = render(<${name} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
`,
  ['index.ts']: `export * from './${name}';\n`,
};

// 1. Create the folder + files.
mkdirSync(compDir, { recursive: true });
for (const [file, content] of Object.entries(files)) {
  writeFileSync(path.join(compDir, file), content);
}

// 2. Add the barrel export.
const barrelPath = path.join(uiDir, 'index.ts');
const barrel = readFileSync(barrelPath, 'utf8').replace(/\s*$/, '\n');
writeFileSync(barrelPath, `${barrel}export * from './${name}';\n`);

// 3. Mark it built in the component registry.
const regPath = path.resolve(process.cwd(), 'reference/components.json');
const reg = JSON.parse(readFileSync(regPath, 'utf8'));
reg.components[name] = {
  ...(reg.components[name] ?? { tier, daisyui }),
  status: 'built',
  since: reg.version,
  source: `src/components/ui/${name}/${name}.tsx`,
};
writeFileSync(regPath, JSON.stringify(reg, null, 2) + '\n');

console.log(`✓ Created src/components/ui/${name}/ (5 files), updated the barrel + components.json.`);
console.log('  Next: flesh out the component from its spec, then run "npm run check".');
