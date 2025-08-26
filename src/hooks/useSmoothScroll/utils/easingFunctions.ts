/**
 * Easing function for smooth scroll animation
 * Provides a smooth cubic ease-in-out transition
 *
 * @param t - Progress of animation (0 to 1)
 * @returns Eased progress value (0 to 1)
 */
export const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Additional easing functions that could be used in the future
 */
export const easingFunctions = {
    linear: (t: number): number => t,
    easeInCubic: (t: number): number => t * t * t,
    easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
    easeInOutCubic,
} as const;
