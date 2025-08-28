import { createContext } from 'react';
//@ts-expect-error random error
import type { ThemeContextType } from '@types/theme';

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);
