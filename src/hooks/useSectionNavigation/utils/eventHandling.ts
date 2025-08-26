import type {
    KeyboardNavigationKey,
    NavigationDirection,
} from '../../../types/hooks';

/**
 * Event handling utilities for keyboard and wheel navigation
 *//**
 * Maps keyboard keys to navigation directions
 *
 * @param key - Keyboard event key
 * @returns Navigation direction
 */
export const mapKeyToNavigation = (key: string): NavigationDirection => {
    switch (key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Space key
            return 'next';
        case 'ArrowUp':
        case 'PageUp':
            return 'prev';
        case 'Home':
            return 'first';
        case 'End':
            return 'last';
        default:
            return 'none';
    }
};

/**
 * Determines if a keyboard key should trigger navigation
 *
 * @param key - Keyboard event key
 * @returns Whether key should trigger navigation
 */
export const isNavigationKey = (key: string): key is KeyboardNavigationKey => {
    const navigationKeys: KeyboardNavigationKey[] = [
        'ArrowDown',
        'ArrowUp',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        ' ',
    ];
    return navigationKeys.includes(key as KeyboardNavigationKey);
};

/**
 * Analyzes wheel event for navigation direction
 *
 * @param deltaY - Wheel event deltaY value
 * @returns Navigation direction based on wheel movement
 */
export const analyzeWheelEvent = (deltaY: number): NavigationDirection => {
    if (deltaY > 0) {
        return 'next'; // Scrolling down
    } else if (deltaY < 0) {
        return 'prev'; // Scrolling up
    }
    return 'none';
};

/**
 * Determines if wheel event should trigger navigation
 *
 * @param deltaY - Wheel event deltaY value
 * @returns Whether wheel event should trigger navigation
 */
export const shouldNavigateFromWheel = (deltaY: number): boolean => {
    return Math.abs(deltaY) > 0;
};
