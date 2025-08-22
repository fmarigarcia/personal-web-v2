import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { SECTIONS } from '@utils/constants';

// Types
interface NavigationContextType {
    currentSection: string;
    setCurrentSection: (section: string) => void;
    isScrolling: boolean;
    setIsScrolling: (scrolling: boolean) => void;
}

// Create context
const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

// Provider component
interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
    children,
}) => {
    const [currentSection, setCurrentSection] = useState<string>(SECTIONS.HERO);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const value: NavigationContextType = {
        currentSection,
        setCurrentSection,
        isScrolling,
        setIsScrolling,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

// Hook to use the context
export const useNavigation = (): NavigationContextType => {
    const context = useContext(NavigationContext);

    if (context === undefined) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        );
    }

    return context;
};
