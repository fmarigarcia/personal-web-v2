/**
 * Tests for useSectionNavigation navigation utilities
 */
import {
    getSectionIndex,
    getSectionByIndex,
    isValidSectionIndex,
    getNextSectionIndex,
    getPreviousSectionIndex,
    getFirstSectionIndex,
    getLastSectionIndex,
} from '../navigationUtils';

// Mock the navigation items constant
jest.mock('@utils/constants', () => ({
    NAVIGATION_ITEMS: [
        { id: 'hero', href: '#hero' },
        { id: 'about', href: '#about' },
        { id: 'experience', href: '#experience' },
        { id: 'contact', href: '#contact' },
    ],
}));

describe('navigationUtils', () => {
    describe('getSectionIndex', () => {
        it('should return correct index for existing section', () => {
            expect(getSectionIndex('hero')).toBe(0);
            expect(getSectionIndex('about')).toBe(1);
            expect(getSectionIndex('experience')).toBe(2);
            expect(getSectionIndex('contact')).toBe(3);
        });

        it('should return -1 for non-existing section', () => {
            expect(getSectionIndex('nonexistent')).toBe(-1);
            expect(getSectionIndex('')).toBe(-1);
        });
    });

    describe('getSectionByIndex', () => {
        it('should return correct section for valid index', () => {
            expect(getSectionByIndex(0)).toEqual({ id: 'hero', href: '#hero' });
            expect(getSectionByIndex(1)).toEqual({
                id: 'about',
                href: '#about',
            });
            expect(getSectionByIndex(2)).toEqual({
                id: 'experience',
                href: '#experience',
            });
            expect(getSectionByIndex(3)).toEqual({
                id: 'contact',
                href: '#contact',
            });
        });

        it('should return null for invalid index', () => {
            expect(getSectionByIndex(-1)).toBeNull();
            expect(getSectionByIndex(4)).toBeNull();
            expect(getSectionByIndex(999)).toBeNull();
        });
    });

    describe('isValidSectionIndex', () => {
        it('should return true for valid indices', () => {
            expect(isValidSectionIndex(0)).toBe(true);
            expect(isValidSectionIndex(1)).toBe(true);
            expect(isValidSectionIndex(2)).toBe(true);
            expect(isValidSectionIndex(3)).toBe(true);
        });

        it('should return false for invalid indices', () => {
            expect(isValidSectionIndex(-1)).toBe(false);
            expect(isValidSectionIndex(4)).toBe(false);
            expect(isValidSectionIndex(-999)).toBe(false);
            expect(isValidSectionIndex(999)).toBe(false);
        });
    });

    describe('getNextSectionIndex', () => {
        it('should return next index for valid current index', () => {
            expect(getNextSectionIndex(0)).toBe(1);
            expect(getNextSectionIndex(1)).toBe(2);
            expect(getNextSectionIndex(2)).toBe(3);
        });

        it('should return -1 when at last section', () => {
            expect(getNextSectionIndex(3)).toBe(-1);
        });

        it('should handle edge cases for invalid current index', () => {
            // -1 + 1 = 0, which is valid, so it returns 0
            expect(getNextSectionIndex(-1)).toBe(0);
            // 999 + 1 = 1000, which is invalid, so it returns -1
            expect(getNextSectionIndex(999)).toBe(-1);
            // Very large numbers should return -1
            expect(getNextSectionIndex(Number.MAX_SAFE_INTEGER - 1)).toBe(-1);
        });
    });

    describe('getPreviousSectionIndex', () => {
        it('should return previous index for valid current index', () => {
            expect(getPreviousSectionIndex(1)).toBe(0);
            expect(getPreviousSectionIndex(2)).toBe(1);
            expect(getPreviousSectionIndex(3)).toBe(2);
        });

        it('should return -1 when at first section', () => {
            expect(getPreviousSectionIndex(0)).toBe(-1);
        });

        it('should handle edge cases for invalid current index', () => {
            // -1 - 1 = -2, which is invalid, so it returns -1
            expect(getPreviousSectionIndex(-1)).toBe(-1);
            // 999 - 1 = 998, which is still invalid, so it returns -1
            expect(getPreviousSectionIndex(999)).toBe(-1);
        });
    });

    describe('getFirstSectionIndex', () => {
        it('should return 0 when sections exist', () => {
            expect(getFirstSectionIndex()).toBe(0);
        });
    });

    describe('getLastSectionIndex', () => {
        it('should return last index when sections exist', () => {
            expect(getLastSectionIndex()).toBe(3);
        });
    });
});
