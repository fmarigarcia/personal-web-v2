import { createContext } from 'react';

// Types
export interface NavigationContextType {
    currentSection: string;
    setCurrentSection: (section: string) => void;
    isScrolling: boolean;
    setIsScrolling: (scrolling: boolean) => void;
    navigateToSection?: (sectionId: string) => void;
    setNavigateToSection?: (fn: (sectionId: string) => void) => void;
}

// Create context
export const NavigationContext = createContext<
    NavigationContextType | undefined
>(undefined);
