import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

/** Lahzo icon sizes (px). 20 is the default for md controls. */
export type IconSize = 16 | 20 | 24 | 32;

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export interface IconProps {
  /** A Phosphor icon component, e.g. `MagnifyingGlass` from `@phosphor-icons/react`. */
  icon: PhosphorIcon;
  /** Pixel size on the Lahzo icon scale. Defaults to 20. */
  size?: IconSize;
  /** Phosphor weight. Defaults to `regular` (the only weight the system uses by default). */
  weight?: IconWeight;
  className?: string;
  /**
   * Accessible label. When provided the icon is exposed to assistive tech;
   * when omitted the icon is decorative (`aria-hidden`).
   */
  label?: string;
}

/**
 * Standardized wrapper over `@phosphor-icons/react`. Icons inherit the current
 * text color (`currentColor`) and are constrained to the 16/20/24/32 size scale.
 */
export function Icon({ icon: Glyph, size = 20, weight = 'regular', className, label }: IconProps) {
  return (
    <Glyph
      size={size}
      weight={weight}
      className={cn('shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
