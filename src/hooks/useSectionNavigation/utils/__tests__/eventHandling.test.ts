/**
 * Tests for useSectionNavigation event handling utilities
 */
import {
    mapKeyToNavigation,
    isNavigationKey,
    analyzeWheelEvent,
    shouldNavigateFromWheel,
} from '../eventHandling';

describe('eventHandling utilities', () => {
    describe('mapKeyToNavigation', () => {
        it('should map down navigation keys correctly', () => {
            expect(mapKeyToNavigation('ArrowDown')).toBe('next');
            expect(mapKeyToNavigation('PageDown')).toBe('next');
            expect(mapKeyToNavigation(' ')).toBe('next'); // Space key
        });

        it('should map up navigation keys correctly', () => {
            expect(mapKeyToNavigation('ArrowUp')).toBe('prev');
            expect(mapKeyToNavigation('PageUp')).toBe('prev');
        });

        it('should map special navigation keys correctly', () => {
            expect(mapKeyToNavigation('Home')).toBe('first');
            expect(mapKeyToNavigation('End')).toBe('last');
        });

        it('should return "none" for non-navigation keys', () => {
            expect(mapKeyToNavigation('Enter')).toBe('none');
            expect(mapKeyToNavigation('Escape')).toBe('none');
            expect(mapKeyToNavigation('Tab')).toBe('none');
            expect(mapKeyToNavigation('a')).toBe('none');
            expect(mapKeyToNavigation('1')).toBe('none');
            expect(mapKeyToNavigation('')).toBe('none');
        });
    });

    describe('isNavigationKey', () => {
        it('should return true for arrow keys', () => {
            expect(isNavigationKey('ArrowDown')).toBe(true);
            expect(isNavigationKey('ArrowUp')).toBe(true);
        });

        it('should return true for page keys', () => {
            expect(isNavigationKey('PageDown')).toBe(true);
            expect(isNavigationKey('PageUp')).toBe(true);
        });

        it('should return true for special navigation keys', () => {
            expect(isNavigationKey('Home')).toBe(true);
            expect(isNavigationKey('End')).toBe(true);
            expect(isNavigationKey(' ')).toBe(true); // Space key
        });

        it('should return false for non-navigation keys', () => {
            expect(isNavigationKey('Enter')).toBe(false);
            expect(isNavigationKey('Escape')).toBe(false);
            expect(isNavigationKey('Tab')).toBe(false);
            expect(isNavigationKey('a')).toBe(false);
            expect(isNavigationKey('1')).toBe(false);
            expect(isNavigationKey('Shift')).toBe(false);
            expect(isNavigationKey('')).toBe(false);
            expect(isNavigationKey('ArrowLeft')).toBe(false);
            expect(isNavigationKey('ArrowRight')).toBe(false);
        });
    });

    describe('analyzeWheelEvent', () => {
        it('should return "next" for positive deltaY (scrolling down)', () => {
            expect(analyzeWheelEvent(1)).toBe('next');
            expect(analyzeWheelEvent(50)).toBe('next');
            expect(analyzeWheelEvent(100.5)).toBe('next');
        });

        it('should return "prev" for negative deltaY (scrolling up)', () => {
            expect(analyzeWheelEvent(-1)).toBe('prev');
            expect(analyzeWheelEvent(-50)).toBe('prev');
            expect(analyzeWheelEvent(-100.5)).toBe('prev');
        });

        it('should return "none" for zero deltaY', () => {
            expect(analyzeWheelEvent(0)).toBe('none');
        });

        it('should handle very small values correctly', () => {
            expect(analyzeWheelEvent(0.1)).toBe('next');
            expect(analyzeWheelEvent(-0.1)).toBe('prev');
        });

        it('should handle large values correctly', () => {
            expect(analyzeWheelEvent(1000)).toBe('next');
            expect(analyzeWheelEvent(-1000)).toBe('prev');
        });
    });

    describe('shouldNavigateFromWheel', () => {
        it('should return true for non-zero positive values', () => {
            expect(shouldNavigateFromWheel(1)).toBe(true);
            expect(shouldNavigateFromWheel(50)).toBe(true);
            expect(shouldNavigateFromWheel(0.1)).toBe(true);
        });

        it('should return true for non-zero negative values', () => {
            expect(shouldNavigateFromWheel(-1)).toBe(true);
            expect(shouldNavigateFromWheel(-50)).toBe(true);
            expect(shouldNavigateFromWheel(-0.1)).toBe(true);
        });

        it('should return false for zero', () => {
            expect(shouldNavigateFromWheel(0)).toBe(false);
        });

        it('should handle edge cases', () => {
            expect(shouldNavigateFromWheel(Number.POSITIVE_INFINITY)).toBe(
                true
            );
            expect(shouldNavigateFromWheel(Number.NEGATIVE_INFINITY)).toBe(
                true
            );
        });
    });
});
