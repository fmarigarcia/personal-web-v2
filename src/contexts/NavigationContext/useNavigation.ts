import { useContext } from 'react';
import { NavigationContext } from './NavigationContext';
import type { NavigationContextType } from './NavigationContext';

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
