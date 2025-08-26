/**
 * Tests for useSectionNavigation throttling utilities
 */
import {
    shouldThrottle,
    getThrottleTimestamp,
    createThrottleChecker,
} from '../throttling';

describe('throttling utilities', () => {
    describe('shouldThrottle', () => {
        beforeEach(() => {
            // Mock Date.now for consistent testing
            jest.spyOn(Date, 'now').mockReturnValue(5000);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return true when not enough time has passed', () => {
            const lastExecutionTime = 4500; // 500ms ago
            const throttleDelay = 1000; // 1 second throttle

            const result = shouldThrottle(lastExecutionTime, throttleDelay);

            expect(result).toBe(true); // Should be throttled
        });

        it('should return false when enough time has passed', () => {
            const lastExecutionTime = 3000; // 2000ms ago
            const throttleDelay = 1000; // 1 second throttle

            const result = shouldThrottle(lastExecutionTime, throttleDelay);

            expect(result).toBe(false); // Should not be throttled
        });

        it('should return false when exact throttle time has passed', () => {
            const lastExecutionTime = 4000; // Exactly 1000ms ago
            const throttleDelay = 1000; // 1 second throttle

            const result = shouldThrottle(lastExecutionTime, throttleDelay);

            expect(result).toBe(false); // Should not be throttled
        });

        it('should handle zero throttle delay', () => {
            const lastExecutionTime = 4999; // 1ms ago
            const throttleDelay = 0; // No throttling

            const result = shouldThrottle(lastExecutionTime, throttleDelay);

            expect(result).toBe(false); // Should never throttle with 0 delay
        });

        it('should handle first execution (lastExecutionTime = 0)', () => {
            const lastExecutionTime = 0; // Never executed
            const throttleDelay = 1000;

            const result = shouldThrottle(lastExecutionTime, throttleDelay);

            expect(result).toBe(false); // Should not throttle first execution
        });
    });

    describe('getThrottleTimestamp', () => {
        beforeEach(() => {
            jest.spyOn(Date, 'now').mockReturnValue(12345);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return current timestamp', () => {
            const result = getThrottleTimestamp();

            expect(result).toBe(12345);
            expect(Date.now).toHaveBeenCalledTimes(1);
        });

        it('should return updated timestamp on multiple calls', () => {
            const firstCall = getThrottleTimestamp();

            // Change the mock return value
            (Date.now as jest.Mock).mockReturnValue(54321);

            const secondCall = getThrottleTimestamp();

            expect(firstCall).toBe(12345);
            expect(secondCall).toBe(54321);
            expect(Date.now).toHaveBeenCalledTimes(2);
        });
    });

    describe('createThrottleChecker', () => {
        beforeEach(() => {
            jest.spyOn(Date, 'now');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should allow first execution', () => {
            (Date.now as jest.Mock).mockReturnValue(1000);

            const checker = createThrottleChecker(500);
            const shouldBlock = checker();

            expect(shouldBlock).toBe(false); // Should not block first execution
        });

        it('should block rapid subsequent executions', () => {
            (Date.now as jest.Mock).mockReturnValue(1000);

            const checker = createThrottleChecker(500);

            // First call
            const firstCall = checker();
            expect(firstCall).toBe(false); // Should not block

            // Second call immediately after (same timestamp)
            const secondCall = checker();
            expect(secondCall).toBe(true); // Should block
        });

        it('should allow execution after delay has passed', () => {
            const checker = createThrottleChecker(500);

            // First call
            (Date.now as jest.Mock).mockReturnValue(1000);
            const firstCall = checker();
            expect(firstCall).toBe(false); // Should not block

            // Second call after delay has passed
            (Date.now as jest.Mock).mockReturnValue(1600); // 600ms later
            const secondCall = checker();
            expect(secondCall).toBe(false); // Should not block
        });

        it('should block if delay has not fully passed', () => {
            const checker = createThrottleChecker(500);

            // First call
            (Date.now as jest.Mock).mockReturnValue(1000);
            const firstCall = checker();
            expect(firstCall).toBe(false); // Should not block

            // Second call before delay has passed
            (Date.now as jest.Mock).mockReturnValue(1400); // 400ms later (< 500ms)
            const secondCall = checker();
            expect(secondCall).toBe(true); // Should block
        });

        it('should update internal timestamp only when not blocking', () => {
            const checker = createThrottleChecker(500);

            // First call - should update timestamp
            (Date.now as jest.Mock).mockReturnValue(1000);
            checker();

            // Second call - should be blocked and not update timestamp
            (Date.now as jest.Mock).mockReturnValue(1200);
            const blocked = checker();
            expect(blocked).toBe(true);

            // Third call - should still be using original timestamp for comparison
            (Date.now as jest.Mock).mockReturnValue(1600); // 600ms from first call
            const allowed = checker();
            expect(allowed).toBe(false); // Should be allowed now
        });

        it('should handle different delay values correctly', () => {
            const fastChecker = createThrottleChecker(100);
            const slowChecker = createThrottleChecker(1000);

            (Date.now as jest.Mock).mockReturnValue(2000);

            // Both should allow first call
            expect(fastChecker()).toBe(false);
            expect(slowChecker()).toBe(false);

            // After 200ms
            (Date.now as jest.Mock).mockReturnValue(2200);
            expect(fastChecker()).toBe(false); // 200ms > 100ms delay
            expect(slowChecker()).toBe(true); // 200ms < 1000ms delay
        });
    });
});
