/**
 * Device detection utilities for responsive behavior
 */

// Breakpoint constants matching TailwindCSS defaults
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

/**
 * Checks if the current viewport is mobile size
 *
 * @param breakpoint - The breakpoint to use for mobile detection (default: MD = 768px)
 * @returns Whether the viewport is considered mobile
 */
export const isMobileViewport = (
    breakpoint: number = BREAKPOINTS.MD
): boolean => {
    if (typeof window === 'undefined') {
        return false; // SSR fallback
    }

    return window.innerWidth < breakpoint;
};

/**
 * Checks if the device is a touch-enabled device
 *
 * @returns Whether the device supports touch
 */
export const isTouchDevice = (): boolean => {
    if (typeof window === 'undefined') {
        return false; // SSR fallback
    }

    // Primary check: navigator.maxTouchPoints
    if (navigator.maxTouchPoints > 0) {
        return true;
    }

    // Secondary check: touch events exist and have been assigned a value
    if ('ontouchstart' in window && window.ontouchstart !== undefined) {
        return true;
    }

    // Check for other touch indicators
    if ('TouchEvent' in window && typeof TouchEvent === 'function') {
        try {
            new TouchEvent('touchstart');
            return true;
        } catch {
            return false;
        }
    }

    return false;
};

/**
 * Comprehensive mobile detection combining viewport size and touch capability
 *
 * @param breakpoint - The breakpoint to use for viewport detection (default: MD = 768px)
 * @returns Whether the device should be treated as mobile
 */
export const isMobileDevice = (
    breakpoint: number = BREAKPOINTS.MD
): boolean => {
    return isMobileViewport(breakpoint) || isTouchDevice();
};

/**
 * Gets the current viewport size
 *
 * @returns Object with width and height of the viewport
 */
export const getViewportSize = () => {
    if (typeof window === 'undefined') {
        return { width: 0, height: 0 }; // SSR fallback
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

/**
 * Hook to track viewport changes (to be used with useEffect)
 *
 * @param callback - Function to call when viewport changes
 * @returns Cleanup function for the event listener
 */
export const onViewportChange = (callback: () => void): (() => void) => {
    if (typeof window === 'undefined') {
        return () => {}; // SSR fallback
    }

    window.addEventListener('resize', callback);

    return () => {
        window.removeEventListener('resize', callback);
    };
};
