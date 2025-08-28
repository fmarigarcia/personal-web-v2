/**
 * Tests for device detection utilities
 */
import {
    isMobileViewport,
    isMobileDevice,
    getViewportSize,
    onViewportChange,
    BREAKPOINTS,
} from '../deviceDetection';

Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 768,
});

describe('deviceDetection utilities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset window dimensions
        Object.defineProperty(window, 'innerWidth', {
            value: 1024,
            writable: true,
        });
        Object.defineProperty(window, 'innerHeight', {
            value: 768,
            writable: true,
        });
    });

    describe('BREAKPOINTS', () => {
        it('should have correct breakpoint values', () => {
            expect(BREAKPOINTS.SM).toBe(640);
            expect(BREAKPOINTS.MD).toBe(768);
            expect(BREAKPOINTS.LG).toBe(1024);
            expect(BREAKPOINTS.XL).toBe(1280);
            expect(BREAKPOINTS['2XL']).toBe(1536);
        });
    });

    describe('isMobileViewport', () => {
        it('should return false for desktop viewport', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 1024,
                writable: true,
            });

            expect(isMobileViewport()).toBe(false); // 1024 >= 768 (MD)
        });

        it('should return true for mobile viewport', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 600,
                writable: true,
            });

            expect(isMobileViewport()).toBe(true); // 600 < 768 (MD)
        });

        it('should handle custom breakpoints', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 700,
                writable: true,
            });

            expect(isMobileViewport(BREAKPOINTS.SM)).toBe(false); // 700 >= 640
            expect(isMobileViewport(BREAKPOINTS.MD)).toBe(true); // 700 < 768
            expect(isMobileViewport(BREAKPOINTS.LG)).toBe(true); // 700 < 1024
        });

        it('should handle edge cases at breakpoint boundaries', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 768,
                writable: true,
            });
            expect(isMobileViewport(768)).toBe(false); // 768 >= 768

            Object.defineProperty(window, 'innerWidth', {
                value: 767,
                writable: true,
            });
            expect(isMobileViewport(768)).toBe(true); // 767 < 768
        });

        it('should return false in SSR environment', () => {
            const originalWindow = global.window;
            delete (global as unknown as { window?: Window }).window;

            expect(isMobileViewport()).toBe(false);

            global.window = originalWindow;
        });
    });

    describe('isMobileDevice', () => {
        it('should return false for desktop viewport', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 1024,
                writable: true,
            });

            expect(isMobileDevice()).toBe(false);
        });

        it('should return true for mobile viewport', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 600,
                writable: true,
            });

            expect(isMobileDevice()).toBe(true); // Mobile viewport
        });

        it('should handle custom breakpoints', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 700,
                writable: true,
            });

            expect(isMobileDevice(BREAKPOINTS.SM)).toBe(false); // 700 >= 640
            expect(isMobileDevice(BREAKPOINTS.MD)).toBe(true); // 700 < 768
        });
    });

    describe('getViewportSize', () => {
        it('should return current viewport dimensions', () => {
            Object.defineProperty(window, 'innerWidth', {
                value: 1200,
                writable: true,
            });
            Object.defineProperty(window, 'innerHeight', {
                value: 800,
                writable: true,
            });

            const result = getViewportSize();

            expect(result).toEqual({ width: 1200, height: 800 });
        });

        it('should return zero dimensions in SSR environment', () => {
            const originalWindow = global.window;
            delete (global as unknown as { window?: Window }).window;

            const result = getViewportSize();

            expect(result).toEqual({ width: 0, height: 0 });

            global.window = originalWindow;
        });
    });

    describe('onViewportChange', () => {
        it('should add resize event listener', () => {
            const callback = jest.fn();
            const mockAddEventListener = jest.spyOn(window, 'addEventListener');

            onViewportChange(callback);

            expect(mockAddEventListener).toHaveBeenCalledWith(
                'resize',
                callback
            );
        });

        it('should return cleanup function that removes event listener', () => {
            const callback = jest.fn();
            const mockRemoveEventListener = jest.spyOn(
                window,
                'removeEventListener'
            );

            const cleanup = onViewportChange(callback);
            cleanup();

            expect(mockRemoveEventListener).toHaveBeenCalledWith(
                'resize',
                callback
            );
        });

        it('should handle SSR environment gracefully', () => {
            const originalWindow = global.window;
            delete (global as unknown as { window?: Window }).window;

            const callback = jest.fn();
            const cleanup = onViewportChange(callback);

            expect(typeof cleanup).toBe('function');
            expect(() => cleanup()).not.toThrow();

            global.window = originalWindow;
        });
    });
});
