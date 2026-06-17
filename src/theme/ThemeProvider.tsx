import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemeContextValue } from './context';

export type { Theme, ThemeContextValue } from './context';

const STORAGE_KEY = 'lahzo-theme';

function getInitialTheme(fallback: Theme): Theme {
  if (typeof window === 'undefined') return fallback;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'lahzo-light' || stored === 'lahzo-dark' ? stored : fallback;
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Theme used on first load when nothing is persisted. Defaults to `lahzo-light`. */
  defaultTheme?: Theme;
}

/**
 * Provides the active theme, writes `data-theme` onto `<html>`, and persists the
 * choice to `localStorage`. Wrap your app once at the root.
 */
export function ThemeProvider({ children, defaultTheme = 'lahzo-light' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(defaultTheme));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === 'lahzo-light' ? 'lahzo-dark' : 'lahzo-light')),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
