import React, { useState, useEffect } from 'react';

import { THEMES } from '@utils/constants';

import { ThemeContext } from './ThemeContext';

import type { Theme } from '../../types/theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (
            savedTheme &&
            (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK)
        ) {
            return savedTheme;
        }

        // Check for system preference
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? THEMES.DARK
                : THEMES.LIGHT;
        }

        return THEMES.LIGHT;
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === THEMES.DARK) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
        );
    };

    const contextValue = {
        theme,
        toggleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
