import { THEMES } from '@utils/constants';

export type Theme = typeof THEMES.LIGHT | typeof THEMES.DARK;

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export interface UseThemeReturn {
    data: {
        theme: Theme;
        isDark: boolean;
        isLight: boolean;
    };
    actions: {
        toggleTheme: () => void;
        setTheme: (theme: Theme) => void;
    };
}
