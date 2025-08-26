import { NAVIGATION_ITEMS } from '@utils/constants';

/**
 * Navigation utilities for section-based navigation
 */

/**
 * Gets the index of a section by its ID
 *
 * @param sectionId - Section identifier
 * @returns Index of section or -1 if not found
 */
export const getSectionIndex = (sectionId: string): number => {
    return NAVIGATION_ITEMS.findIndex((item) => item.id === sectionId);
};

/**
 * Gets a navigation item by index
 *
 * @param index - Section index
 * @returns Navigation item or null if index is invalid
 */
export const getSectionByIndex = (
    index: number
): { id: string; href: string } | null => {
    if (index < 0 || index >= NAVIGATION_ITEMS.length) {
        return null;
    }
    return NAVIGATION_ITEMS[index];
};

/**
 * Validates if a navigation index is within bounds
 *
 * @param index - Index to validate
 * @returns Whether index is valid
 */
export const isValidSectionIndex = (index: number): boolean => {
    return index >= 0 && index < NAVIGATION_ITEMS.length;
};

/**
 * Gets the next section index for navigation
 *
 * @param currentIndex - Current section index
 * @returns Next section index or -1 if at end
 */
export const getNextSectionIndex = (currentIndex: number): number => {
    const nextIndex = currentIndex + 1;
    return isValidSectionIndex(nextIndex) ? nextIndex : -1;
};

/**
 * Gets the previous section index for navigation
 *
 * @param currentIndex - Current section index
 * @returns Previous section index or -1 if at beginning
 */
export const getPreviousSectionIndex = (currentIndex: number): number => {
    const prevIndex = currentIndex - 1;
    return isValidSectionIndex(prevIndex) ? prevIndex : -1;
};

/**
 * Gets the first section index
 *
 * @returns First section index (0) or -1 if no sections
 */
export const getFirstSectionIndex = (): number => {
    return NAVIGATION_ITEMS.length > 0 ? 0 : -1;
};

/**
 * Gets the last section index
 *
 * @returns Last section index or -1 if no sections
 */
export const getLastSectionIndex = (): number => {
    return NAVIGATION_ITEMS.length > 0 ? NAVIGATION_ITEMS.length - 1 : -1;
};
