/**
 * Tests for usePlatform hook
 */
import { renderHook, act } from '@testing-library/react';
import * as deviceDetection from '@utils/deviceDetection';
import { usePlatform } from '../usePlatform';

// Mock device detection utilities
jest.mock('@utils/deviceDetection', () => ({
    isMobileDevice: jest.fn(() => false),
    onViewportChange: jest.fn(() => {
        // Simulate adding event listener
        return () => {
            // Cleanup function
        };
    }),
}));

describe('usePlatform', () => {
    const mockIsMobileDevice = deviceDetection.isMobileDevice as jest.Mock;
    const mockOnViewportChange = deviceDetection.onViewportChange as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockIsMobileDevice.mockReturnValue(false); // Default to desktop
    });

    describe('initial state', () => {
        it('should return desktop state when device is desktop', () => {
            mockIsMobileDevice.mockReturnValue(false);

            const { result } = renderHook(() => usePlatform());

            expect(result.current.data.isMobile).toBe(false);
            expect(result.current.data.isDesktop).toBe(true);
            expect(result.current.actions).toEqual({});
        });

        it('should return mobile state when device is mobile', () => {
            mockIsMobileDevice.mockReturnValue(true);

            const { result } = renderHook(() => usePlatform());

            expect(result.current.data.isMobile).toBe(true);
            expect(result.current.data.isDesktop).toBe(false);
            expect(result.current.actions).toEqual({});
        });
    });

    describe('viewport change handling', () => {
        it('should set up viewport change listener on mount', () => {
            renderHook(() => usePlatform());

            expect(mockOnViewportChange).toHaveBeenCalledTimes(1);
            expect(mockOnViewportChange).toHaveBeenCalledWith(
                expect.any(Function)
            );
        });

        it('should update mobile state when viewport changes', () => {
            let viewportChangeCallback: () => void = () => {};

            // Capture the callback passed to onViewportChange
            mockOnViewportChange.mockImplementation((callback: () => void) => {
                viewportChangeCallback = callback;
                return () => {}; // cleanup function
            });

            // Start with desktop
            mockIsMobileDevice.mockReturnValue(false);
            const { result } = renderHook(() => usePlatform());

            expect(result.current.data.isMobile).toBe(false);
            expect(result.current.data.isDesktop).toBe(true);

            // Simulate viewport change to mobile
            mockIsMobileDevice.mockReturnValue(true);
            act(() => {
                viewportChangeCallback();
            });

            expect(result.current.data.isMobile).toBe(true);
            expect(result.current.data.isDesktop).toBe(false);
        });

        it('should update desktop state when viewport changes', () => {
            let viewportChangeCallback: () => void = () => {};

            // Capture the callback passed to onViewportChange
            mockOnViewportChange.mockImplementation((callback: () => void) => {
                viewportChangeCallback = callback;
                return () => {}; // cleanup function
            });

            // Start with mobile
            mockIsMobileDevice.mockReturnValue(true);
            const { result } = renderHook(() => usePlatform());

            expect(result.current.data.isMobile).toBe(true);
            expect(result.current.data.isDesktop).toBe(false);

            // Simulate viewport change to desktop
            mockIsMobileDevice.mockReturnValue(false);
            act(() => {
                viewportChangeCallback();
            });

            expect(result.current.data.isMobile).toBe(false);
            expect(result.current.data.isDesktop).toBe(true);
        });
    });

    describe('cleanup', () => {
        it('should cleanup viewport change listener on unmount', () => {
            const mockCleanup = jest.fn();
            mockOnViewportChange.mockReturnValue(mockCleanup);

            const { unmount } = renderHook(() => usePlatform());

            // Unmount the hook
            unmount();

            expect(mockCleanup).toHaveBeenCalledTimes(1);
        });
    });

    describe('data structure consistency', () => {
        it('should maintain consistent {data, actions} structure', () => {
            const { result } = renderHook(() => usePlatform());

            expect(result.current).toHaveProperty('data');
            expect(result.current).toHaveProperty('actions');
            expect(typeof result.current.data).toBe('object');
            expect(typeof result.current.actions).toBe('object');
        });

        it('should have boolean properties for platform detection', () => {
            const { result } = renderHook(() => usePlatform());

            expect(typeof result.current.data.isMobile).toBe('boolean');
            expect(typeof result.current.data.isDesktop).toBe('boolean');

            // Should be mutually exclusive
            expect(result.current.data.isMobile).toBe(
                !result.current.data.isDesktop
            );
        });
    });

    describe('edge cases', () => {
        it('should handle device detection returning inconsistent values', () => {
            // Test rapid changes
            mockIsMobileDevice
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false);

            let viewportChangeCallback: () => void = () => {};
            mockOnViewportChange.mockImplementation((callback: () => void) => {
                viewportChangeCallback = callback;
                return () => {};
            });

            const { result } = renderHook(() => usePlatform());

            // Initial state (first call)
            expect(result.current.data.isMobile).toBe(false);

            // First viewport change (second call)
            act(() => {
                viewportChangeCallback();
            });
            expect(result.current.data.isMobile).toBe(true);

            // Second viewport change (third call)
            act(() => {
                viewportChangeCallback();
            });
            expect(result.current.data.isMobile).toBe(false);
        });

        it('should handle onViewportChange throwing errors gracefully', () => {
            mockOnViewportChange.mockImplementation(() => {
                throw new Error('Failed to add listener');
            });

            // Should not crash
            expect(() => renderHook(() => usePlatform())).not.toThrow();
        });
    });
});
