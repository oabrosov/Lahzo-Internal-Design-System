import { Moon, Sun } from '@phosphor-icons/react';
import { Icon } from '@/components/ui/Icon';
import { useTheme } from './useTheme';

/** Icon button that flips between Light and Dark themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'lahzo-dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-square"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Icon icon={isDark ? Sun : Moon} />
    </button>
  );
}
