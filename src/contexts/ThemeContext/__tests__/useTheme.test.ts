import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { THEMES } from '@utils/constants';

import { useTheme } from '../useTheme';
import { ThemeProvider } from '../ThemeProvider';

// Mock localStorage
const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation((query) => ({
        matches: query.includes('dark') ? false : true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock document.documentElement
Object.defineProperty(document, 'documentElement', {
    value: {
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ThemeProvider, null, children);

describe('useTheme', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockLocalStorage.getItem.mockReturnValue(null);
    });

    it('should return data and actions with correct structure', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.data).toHaveProperty('theme');
        expect(result.current.data).toHaveProperty('isDark');
        expect(result.current.data).toHaveProperty('isLight');
        expect(result.current.actions).toHaveProperty('toggleTheme');
        expect(result.current.actions).toHaveProperty('setTheme');
    });

    it('should initialize with light theme by default', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.data.theme).toBe(THEMES.LIGHT);
        expect(result.current.data.isLight).toBe(true);
        expect(result.current.data.isDark).toBe(false);
    });

    it('should initialize with saved theme from localStorage', () => {
        mockLocalStorage.getItem.mockReturnValue(THEMES.DARK);

        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.data.theme).toBe(THEMES.DARK);
        expect(result.current.data.isDark).toBe(true);
        expect(result.current.data.isLight).toBe(false);
    });

    it('should toggle theme correctly', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        // Initial state is light
        expect(result.current.data.theme).toBe(THEMES.LIGHT);

        act(() => {
            result.current.actions.toggleTheme();
        });

        expect(result.current.data.theme).toBe(THEMES.DARK);
        expect(result.current.data.isDark).toBe(true);

        act(() => {
            result.current.actions.toggleTheme();
        });

        expect(result.current.data.theme).toBe(THEMES.LIGHT);
        expect(result.current.data.isLight).toBe(true);
    });

    it('should set specific theme correctly', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.actions.setTheme(THEMES.DARK);
        });

        expect(result.current.data.theme).toBe(THEMES.DARK);

        act(() => {
            result.current.actions.setTheme(THEMES.LIGHT);
        });

        expect(result.current.data.theme).toBe(THEMES.LIGHT);
    });

    it('should maintain stable action types', () => {
        const { result, rerender } = renderHook(() => useTheme(), { wrapper });

        const initialToggleThemeType =
            typeof result.current.actions.toggleTheme;
        const initialSetThemeType = typeof result.current.actions.setTheme;

        rerender();

        // Check that functions are still functions (stable types)
        expect(typeof result.current.actions.toggleTheme).toBe(
            initialToggleThemeType
        );
        expect(typeof result.current.actions.setTheme).toBe(
            initialSetThemeType
        );
        expect(typeof result.current.actions.toggleTheme).toBe('function');
        expect(typeof result.current.actions.setTheme).toBe('function');
    });

    it('should throw error when used outside ThemeProvider', () => {
        expect(() => {
            renderHook(() => useTheme());
        }).toThrow('useTheme must be used within a ThemeProvider');
    });

    it('should save theme to localStorage when changed', () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.actions.setTheme(THEMES.DARK);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'theme',
            THEMES.DARK
        );
    });
});
