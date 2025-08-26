import { easeInOutCubic } from './easingFunctions';
import type { ScrollOptions, AnimationFrame } from '../../../types/hooks';

/**
 * Calculates the current position during scroll animation
 *
 * @param frame - Animation frame data
 * @param currentTime - Current timestamp
 * @returns New scroll position
 */
export const calculateScrollPosition = (
    frame: AnimationFrame,
    currentTime: number
): number => {
    const { timestamp, startPosition, targetPosition, duration } = frame;
    const elapsed = currentTime - timestamp;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    return startPosition + (targetPosition - startPosition) * easedProgress;
};

/**
 * Determines if animation should continue
 *
 * @param frame - Animation frame data
 * @param currentTime - Current timestamp
 * @returns Whether animation is complete
 */
export const isAnimationComplete = (
    frame: AnimationFrame,
    currentTime: number
): boolean => {
    const elapsed = currentTime - frame.timestamp;
    return elapsed >= frame.duration;
};

/**
 * Creates animation frame data for scroll animation
 *
 * @param element - Target element to scroll to
 * @param options - Scroll animation options
 * @returns Animation frame configuration
 */
export const createAnimationFrame = (
    element: HTMLElement,
    options: ScrollOptions = {}
): AnimationFrame => {
    const { duration = 800, onComplete } = options;
    const startPosition = window.pageYOffset;
    const targetPosition = element.offsetTop;

    return {
        timestamp: performance.now(),
        element,
        startPosition,
        targetPosition,
        duration,
        onComplete,
    };
};
