/**
 * Tests for useSmoothScroll scroll animation utilities
 */
import {
    calculateScrollPosition,
    isAnimationComplete,
    createAnimationFrame,
} from '../scrollAnimation';
import type { AnimationFrame } from '../../../../types/hooks';

describe('scrollAnimation utilities', () => {
    describe('calculateScrollPosition', () => {
        it('should return start position at the beginning', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            const position = calculateScrollPosition(frame, 1000); // Same timestamp
            expect(position).toBe(100); // Start position
        });

        it('should return target position at the end', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            const position = calculateScrollPosition(frame, 2000); // Full duration elapsed
            expect(position).toBe(500); // Target position
        });

        it('should return intermediate position at midpoint', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            const position = calculateScrollPosition(frame, 1500); // Halfway
            expect(position).toBe(300); // Midpoint (100 + 400/2)
        });

        it('should handle negative distances correctly', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 500,
                targetPosition: 100, // Scrolling up
                duration: 1000,
            };

            const position = calculateScrollPosition(frame, 1500); // Halfway
            expect(position).toBe(300); // 500 - 400/2
        });

        it('should not exceed target position for times beyond duration', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            const position = calculateScrollPosition(frame, 3000); // Way beyond duration
            expect(position).toBe(500); // Should clamp to target
        });
    });

    describe('isAnimationComplete', () => {
        it('should return false at the beginning', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            expect(isAnimationComplete(frame, 1000)).toBe(false);
        });

        it('should return false during animation', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            expect(isAnimationComplete(frame, 1500)).toBe(false);
        });

        it('should return true when duration is reached', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            expect(isAnimationComplete(frame, 2000)).toBe(true);
        });

        it('should return true when duration is exceeded', () => {
            const frame: AnimationFrame = {
                timestamp: 1000,
                element: document.createElement('div'),
                startPosition: 100,
                targetPosition: 500,
                duration: 1000,
            };

            expect(isAnimationComplete(frame, 2500)).toBe(true);
        });
    });

    describe('createAnimationFrame', () => {
        let mockElement: HTMLElement;
        let originalNow: () => number;

        beforeEach(() => {
            // Create mock element
            mockElement = document.createElement('div');
            Object.defineProperty(mockElement, 'offsetTop', {
                value: 1000,
                configurable: true,
            });

            // Mock performance.now()
            originalNow = performance.now;
            performance.now = jest.fn(() => 5000);

            // Mock window.pageYOffset
            Object.defineProperty(window, 'pageYOffset', {
                value: 200,
                configurable: true,
            });
        });

        afterEach(() => {
            performance.now = originalNow;
        });

        it('should create animation frame with correct default values', () => {
            const frame = createAnimationFrame(mockElement);

            expect(frame.timestamp).toBe(5000);
            expect(frame.element).toBe(mockElement);
            expect(frame.startPosition).toBe(200);
            expect(frame.targetPosition).toBe(1000);
            expect(frame.duration).toBe(800); // Default duration
            expect(frame.onComplete).toBeUndefined();
        });

        it('should use custom duration when provided', () => {
            const frame = createAnimationFrame(mockElement, { duration: 1500 });

            expect(frame.duration).toBe(1500);
        });

        it('should include onComplete callback when provided', () => {
            const mockCallback = jest.fn();
            const frame = createAnimationFrame(mockElement, {
                onComplete: mockCallback,
            });

            expect(frame.onComplete).toBe(mockCallback);
        });

        it('should handle all custom options', () => {
            const mockCallback = jest.fn();
            const frame = createAnimationFrame(mockElement, {
                duration: 2000,
                onComplete: mockCallback,
            });

            expect(frame.duration).toBe(2000);
            expect(frame.onComplete).toBe(mockCallback);
            expect(frame.startPosition).toBe(200);
            expect(frame.targetPosition).toBe(1000);
        });
    });
});
