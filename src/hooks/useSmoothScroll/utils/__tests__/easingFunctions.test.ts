/**
 * Tests for useSmoothScroll easing functions
 */
import { easeInOutCubic, easingFunctions } from '../easingFunctions';

describe('easingFunctions', () => {
    describe('easeInOutCubic', () => {
        it('should return 0 at the start (t = 0)', () => {
            expect(easeInOutCubic(0)).toBe(0);
        });

        it('should return 1 at the end (t = 1)', () => {
            expect(easeInOutCubic(1)).toBe(1);
        });

        it('should return 0.5 at the midpoint (t = 0.5)', () => {
            expect(easeInOutCubic(0.5)).toBe(0.5);
        });

        it('should handle values in the first half (t < 0.5)', () => {
            const result = easeInOutCubic(0.25);
            expect(result).toBeGreaterThan(0);
            expect(result).toBeLessThan(0.25); // Should be slower than linear
            expect(result).toBeCloseTo(0.0625, 4);
        });

        it('should handle values in the second half (t > 0.5)', () => {
            const result = easeInOutCubic(0.75);
            expect(result).toBeGreaterThan(0.75); // Should be faster than linear
            expect(result).toBeLessThan(1);
            expect(result).toBeCloseTo(0.9375, 4);
        });

        it('should create a smooth curve (monotonic increasing)', () => {
            const points = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            const results = points.map(easeInOutCubic);

            // Should be monotonically increasing
            for (let i = 1; i < results.length; i++) {
                expect(results[i]).toBeGreaterThan(results[i - 1]);
            }
        });
    });

    describe('easingFunctions collection', () => {
        it('should include all expected easing functions', () => {
            expect(easingFunctions).toHaveProperty('linear');
            expect(easingFunctions).toHaveProperty('easeInCubic');
            expect(easingFunctions).toHaveProperty('easeOutCubic');
            expect(easingFunctions).toHaveProperty('easeInOutCubic');
        });

        it('should have linear function return input unchanged', () => {
            expect(easingFunctions.linear(0)).toBe(0);
            expect(easingFunctions.linear(0.5)).toBe(0.5);
            expect(easingFunctions.linear(1)).toBe(1);
        });

        it('should have easeInCubic start slow', () => {
            const result = easingFunctions.easeInCubic(0.5);
            expect(result).toBeLessThan(0.5); // Slower than linear
            expect(result).toBe(0.125); // 0.5^3
        });

        it('should have easeOutCubic end slow', () => {
            const result = easingFunctions.easeOutCubic(0.5);
            expect(result).toBeGreaterThan(0.5); // Faster than linear initially
            expect(result).toBeCloseTo(0.875, 3); // 1 - (1-0.5)^3
        });

        it('should have all functions return 0 at start and 1 at end', () => {
            Object.values(easingFunctions).forEach((fn) => {
                expect(fn(0)).toBe(0);
                expect(fn(1)).toBe(1);
            });
        });
    });
});
