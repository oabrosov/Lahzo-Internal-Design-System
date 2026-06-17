import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * `cn('px-4', condition && 'px-6')` → later wins, duplicates de-duped.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
