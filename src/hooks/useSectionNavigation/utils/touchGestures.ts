import { MIN_SWIPE_DISTANCE } from '@utils/constants';
import type { TouchGestureData } from '../../../types/hooks';

/**
 * Touch gesture utilities for mobile navigation
 */

/**
 * Calculates touch gesture data from touch events
 *
 * @param startY - Touch start Y coordinate
 * @param endY - Touch end Y coordinate
 * @param minDistance - Minimum distance for valid swipe
 * @returns Touch gesture analysis
 */
export const analyzeTouchGesture = (
    startY: number,
    endY: number,
    minDistance: number = MIN_SWIPE_DISTANCE
): TouchGestureData => {
    const deltaY = startY - endY;
    const absDistance = Math.abs(deltaY);
    const isValidSwipe = absDistance >= minDistance;

    let direction: 'up' | 'down' | 'none' = 'none';
    if (isValidSwipe) {
        direction = deltaY > 0 ? 'up' : 'down';
    }

    return {
        startY,
        endY,
        deltaY,
        direction,
        isValidSwipe,
    };
};

/**
 * Determines if a touch gesture should trigger navigation
 *
 * @param gestureData - Touch gesture analysis data
 * @returns Whether gesture should trigger navigation
 */
export const shouldNavigateFromGesture = (
    gestureData: TouchGestureData
): boolean => {
    return gestureData.isValidSwipe && gestureData.direction !== 'none';
};

/**
 * Maps touch gesture direction to navigation direction
 *
 * @param gestureDirection - Touch gesture direction
 * @returns Navigation direction ('next', 'prev', or 'none')
 */
export const mapGestureToNavigation = (
    gestureDirection: 'up' | 'down' | 'none'
): 'next' | 'prev' | 'none' => {
    switch (gestureDirection) {
        case 'up':
            return 'next'; // Swipe up goes to next section
        case 'down':
            return 'prev'; // Swipe down goes to previous section
        default:
            return 'none';
    }
};
