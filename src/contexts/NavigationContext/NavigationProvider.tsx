import React, { useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { SECTIONS } from '@utils/constants';
import { NavigationContext } from './NavigationContext';
import type { NavigationContextType } from './NavigationContext';

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
    children,
}) => {
    const [currentSection, setCurrentSection] = useState<string>(SECTIONS.HERO);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    // Use a ref to store the navigation function to avoid infinite loops
    const navigateRef = useRef<((sectionId: string) => void) | undefined>(
        undefined
    );

    // Stable navigation function that calls the current ref value
    const navigateToSection = useCallback((sectionId: string) => {
        if (navigateRef.current) {
            navigateRef.current(sectionId);
        }
    }, []);

    // Stable setter function that updates the ref
    const setNavigateToSection = useCallback(
        (fn: (sectionId: string) => void) => {
            navigateRef.current = fn;
        },
        []
    );

    const value: NavigationContextType = {
        currentSection,
        setCurrentSection,
        isScrolling,
        setIsScrolling,
        navigateToSection,
        setNavigateToSection,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};
