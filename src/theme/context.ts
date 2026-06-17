import { createContext } from 'react';

/** The two daisyUI theme IDs shipped by the design system (labeled "Light" / "Dark"). */
export type Theme = 'lahzo-light' | 'lahzo-dark';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
