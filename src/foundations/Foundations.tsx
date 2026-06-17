import tokens from '../../reference/tokens.json';

function Swatch({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="size-12 shrink-0 rounded border-[1.5px] border-base-300"
        style={{ backgroundColor: `var(--color-${name})` }}
      />
      <div>
        <p className="text-button">{name}</p>
        <p className="text-caption text-base-content/80">{role}</p>
      </div>
    </div>
  );
}

/**
 * Live token reference. Colors render straight from the active theme's CSS variables
 * (toggle the theme in the toolbar to see both); scales come from reference/tokens.json.
 * Nothing here hardcodes a value, so it can never drift from the system.
 */
export function Foundations() {
  return (
    <div className="max-w-[960px] space-y-12 p-8">
      <section className="space-y-4">
        <h2 className="text-h2">Colors</h2>
        <p className="text-body text-base-content/80">
          Live from the active theme. Values live in <code>src/theme/lahzo.css</code>; use them
          via classes like <code>bg-primary</code> or <code>text-base-content</code> — never raw hex.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {tokens.colorTokens.map((token) => (
            <Swatch key={token.name} name={token.name} role={token.role} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-h2">Spacing scale (px)</h2>
        <div className="space-y-2">
          {tokens.spacingPx.map((px) => (
            <div key={px} className="flex items-center gap-4">
              <span className="w-8 text-caption text-base-content/80">{px}</span>
              <div className="h-4 bg-primary" style={{ width: `${px}px` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-h2">Control heights</h2>
        <div className="flex items-end gap-6">
          {Object.entries(tokens.controlHeightsPx).map(([size, px]) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <div className="w-16 bg-base-300" style={{ height: `${px}px` }} />
              <span className="text-caption text-base-content/80">
                {size} · {px}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-h2">Icon sizes (px)</h2>
        <div className="flex items-end gap-6">
          {tokens.iconSizesPx.map((px) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <div className="bg-neutral" style={{ width: `${px}px`, height: `${px}px` }} />
              <span className="text-caption text-base-content/80">{px}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
