import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { UseThemeReturn } from '../../types/theme';

export const useTheme = (): UseThemeReturn => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    const { theme, toggleTheme, setTheme } = context;

    const data = {
        theme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
    };

    const actions = {
        toggleTheme,
        setTheme,
    };

    return { data, actions };
};
