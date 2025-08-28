import { useContext } from 'react';

import { THEMES } from '@utils/constants';

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
        isDark: theme === THEMES.DARK,
        isLight: theme === THEMES.LIGHT,
    };

    const actions = {
        toggleTheme,
        setTheme,
    };

    return { data, actions };
};
