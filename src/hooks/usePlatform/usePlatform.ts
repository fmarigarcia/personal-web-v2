import { useState, useEffect } from 'react';
import { isMobileDevice, onViewportChange } from '@utils/deviceDetection';
import type { UsePlatformReturn } from '../../types/hooks';

/**
 * Custom hook for platform and device detection
 *
 * Provides reactive information about the current device/platform:
 * - Mobile vs desktop detection
 * - Viewport size tracking
 * - Touch capability detection
 *
 * @returns Platform detection data and utilities
 */
export const usePlatform = (): UsePlatformReturn => {
    // Track mobile state with initial detection
    const [isMobile, setIsMobile] = useState(() => isMobileDevice());

    // Update mobile state on viewport changes
    useEffect(() => {
        try {
            const cleanup = onViewportChange(() => {
                setIsMobile(isMobileDevice());
            });
            
            return cleanup;
        } catch {
            // If viewport change listener fails, just continue with initial state
            return () => {}; // Return empty cleanup function
        }
    }, []);    const data = {
        isMobile,
        isDesktop: !isMobile,
    };

    const actions = {
        // No actions needed for now, but keeping the pattern consistent
    };

    return { data, actions };
};
