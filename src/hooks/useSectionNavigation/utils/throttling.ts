/**
 * Throttling utilities for performance optimization
 */

/**
 * Checks if action should be throttled based on last execution time
 *
 * @param lastExecutionTime - Timestamp of last execution
 * @param throttleDelay - Minimum delay between executions in milliseconds
 * @returns Whether action should be throttled
 */
export const shouldThrottle = (
    lastExecutionTime: number,
    throttleDelay: number
): boolean => {
    const now = Date.now();
    return now - lastExecutionTime < throttleDelay;
};

/**
 * Gets current timestamp for throttling purposes
 *
 * @returns Current timestamp in milliseconds
 */
export const getThrottleTimestamp = (): number => {
    return Date.now();
};

/**
 * Creates a throttle checker function with encapsulated state
 *
 * @param delay - Throttle delay in milliseconds
 * @returns Throttle checker function
 */
export const createThrottleChecker = (delay: number) => {
    let lastExecutionTime = 0;

    return (): boolean => {
        const now = Date.now();
        const shouldBlock = now - lastExecutionTime < delay;

        if (!shouldBlock) {
            lastExecutionTime = now;
        }

        return shouldBlock;
    };
};
