/**
 * Utility functions for processing IntersectionObserver entries
 */

/**
 * Filters entries to only those that are currently intersecting
 *
 * @param entries - Array of intersection observer entries
 * @returns Array of intersecting entries
 */
export const getIntersectingEntries = (
    entries: IntersectionObserverEntry[]
): IntersectionObserverEntry[] => {
    return entries.filter((entry) => entry.isIntersecting);
};

/**
 * Finds the entry with the highest intersection ratio
 *
 * @param entries - Array of intersection observer entries
 * @returns Entry with highest intersection ratio, or null if none found
 */
export const getMostVisibleEntry = (
    entries: IntersectionObserverEntry[]
): IntersectionObserverEntry | null => {
    if (entries.length === 0) return null;

    return entries.reduce((prev, current) => {
        const prevRatio = prev.intersectionRatio;
        const currentRatio = current.intersectionRatio;
        const prevArea =
            prev.intersectionRect.height * prev.intersectionRect.width;
        const currentArea =
            current.intersectionRect.height * current.intersectionRect.width;

        // Prioritize by intersection ratio, then by visible area
        if (Math.abs(prevRatio - currentRatio) < 0.1) {
            return prevArea > currentArea ? prev : current;
        }
        return prevRatio > currentRatio ? prev : current;
    });
};

/**
 * Extracts the ID from an intersection observer entry target
 *
 * @param entry - Intersection observer entry
 * @returns Element ID or null if not found
 */
export const getEntryId = (entry: IntersectionObserverEntry): string | null => {
    const target = entry.target as HTMLElement;
    return target.id || null;
};

/**
 * Calculates the visible area of an intersection observer entry
 *
 * @param entry - Intersection observer entry
 * @returns Visible area in pixels
 */
export const getVisibleArea = (entry: IntersectionObserverEntry): number => {
    const { height, width } = entry.intersectionRect;
    return height * width;
};

/**
 * Determines if an entry meets a minimum visibility threshold
 *
 * @param entry - Intersection observer entry
 * @param minRatio - Minimum intersection ratio (0 to 1)
 * @returns Whether entry meets the threshold
 */
export const meetsVisibilityThreshold = (
    entry: IntersectionObserverEntry,
    minRatio: number = 0.1
): boolean => {
    return entry.intersectionRatio >= minRatio;
};
