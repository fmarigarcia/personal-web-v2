/**
 * Tests for touchGestures utility functions
 */
import {
    analyzeTouchGesture,
    shouldNavigateFromGesture,
    mapGestureToNavigation,
} from '../touchGestures';

describe('touchGestures utilities', () => {
    describe('analyzeTouchGesture', () => {
        it('should detect upward swipe correctly', () => {
            const result = analyzeTouchGesture(400, 300); // Start 400, end 300 = upward swipe

            expect(result.startY).toBe(400);
            expect(result.endY).toBe(300);
            expect(result.deltaY).toBe(100); // 400 - 300 = 100
            expect(result.direction).toBe('up');
            expect(result.isValidSwipe).toBe(true);
        });

        it('should detect downward swipe correctly', () => {
            const result = analyzeTouchGesture(300, 400); // Start 300, end 400 = downward swipe

            expect(result.startY).toBe(300);
            expect(result.endY).toBe(400);
            expect(result.deltaY).toBe(-100); // 300 - 400 = -100
            expect(result.direction).toBe('down');
            expect(result.isValidSwipe).toBe(true);
        });

        it('should reject swipe below minimum distance', () => {
            const result = analyzeTouchGesture(400, 375); // Only 25px distance

            expect(result.deltaY).toBe(25);
            expect(result.direction).toBe('none');
            expect(result.isValidSwipe).toBe(false);
        });
    });

    describe('mapGestureToNavigation', () => {
        it('should map up gesture to next navigation', () => {
            expect(mapGestureToNavigation('up')).toBe('next');
        });

        it('should map down gesture to prev navigation', () => {
            expect(mapGestureToNavigation('down')).toBe('prev');
        });
    });

    describe('shouldNavigateFromGesture', () => {
        it('should allow navigation for valid upward swipe', () => {
            const gesture = analyzeTouchGesture(400, 300);
            expect(shouldNavigateFromGesture(gesture)).toBe(true);
        });
    });
});
