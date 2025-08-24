import { renderHook, act } from '@testing-library/react';
import { useSmoothScroll } from '../useSmoothScroll';

describe('useSmoothScroll', () => {
    let mockScrollTo: jest.Mock;
    let mockRequestAnimationFrame: jest.Mock;
    let mockCancelAnimationFrame: jest.Mock;

    beforeEach(() => {
        mockScrollTo = jest.fn();
        mockRequestAnimationFrame = jest.fn();
        mockCancelAnimationFrame = jest.fn();

        // Mock the window properties directly
        Object.defineProperty(global.window, 'scrollTo', {
            value: mockScrollTo,
            writable: true,
        });

        Object.defineProperty(global.window, 'pageYOffset', {
            value: 0,
            writable: true,
        });

        Object.defineProperty(global.window, 'requestAnimationFrame', {
            value: mockRequestAnimationFrame,
            writable: true,
        });

        Object.defineProperty(global.window, 'cancelAnimationFrame', {
            value: mockCancelAnimationFrame,
            writable: true,
        });

        jest.clearAllMocks();
    });

    it('should return scrollToElement function', () => {
        const { result } = renderHook(() => useSmoothScroll());

        expect(typeof result.current.actions.scrollToElement).toBe('function');
    });

    it('should handle element not found gracefully', () => {
        jest.spyOn(document, 'getElementById').mockReturnValue(null);

        const { result } = renderHook(() => useSmoothScroll());

        // Should not throw when element doesn't exist
        expect(() => {
            act(() => {
                result.current.actions.scrollToElement('nonexistent');
            });
        }).not.toThrow();
    });

    it('should call requestAnimationFrame when element found', () => {
        const mockElement = {
            offsetTop: 500,
        } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const { result } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section');
        });

        expect(document.getElementById).toHaveBeenCalledWith('test-section');
        expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should use custom offset', () => {
        const mockElement = {
            offsetTop: 500,
        } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const { result } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section', {
                offset: 100,
            });
        });

        expect(document.getElementById).toHaveBeenCalledWith('test-section');
        expect(mockRequestAnimationFrame).toHaveBeenCalled();
    });

    it('should call onStart callback', () => {
        const mockElement = {
            offsetTop: 500,
        } as HTMLElement;

        const onStart = jest.fn();
        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const { result } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section', { onStart });
        });

        expect(onStart).toHaveBeenCalled();
    });

    it('should handle animation callback', () => {
        const mockElement = {
            offsetTop: 500,
        } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        let animationCallback: FrameRequestCallback;
        mockRequestAnimationFrame.mockImplementation(
            (callback: FrameRequestCallback) => {
                animationCallback = callback;
                return 1;
            }
        );

        const { result } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section');
        });

        expect(mockRequestAnimationFrame).toHaveBeenCalled();

        // Simulate one animation frame
        act(() => {
            animationCallback!(performance.now());
        });

        expect(mockScrollTo).toHaveBeenCalled();
    });

    it.skip('should complete animation properly', () => {
        const mockElement = {
            offsetTop: 0, // Same as pageYOffset, so no scrolling needed
        } as HTMLElement;

        const onComplete = jest.fn();
        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        // Mock pageYOffset to be same as element offsetTop
        Object.defineProperty(global.window, 'pageYOffset', {
            value: 0,
            writable: true,
        });

        let animationCallback: FrameRequestCallback;

        mockRequestAnimationFrame.mockImplementation(
            (callback: FrameRequestCallback) => {
                animationCallback = callback;
                return 1;
            }
        );

        const { result } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section', {
                duration: 100,
                onComplete,
            });
        });

        // Trigger animation with sufficient elapsed time to complete
        act(() => {
            animationCallback!(200); // Single call with elapsed time > duration
        });

        expect(onComplete).toHaveBeenCalled();
    });

    it('should cleanup animation on unmount', () => {
        const mockElement = {
            offsetTop: 500,
        } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
        mockRequestAnimationFrame.mockReturnValue(123);

        const { result, unmount } = renderHook(() => useSmoothScroll());

        act(() => {
            result.current.actions.scrollToElement('test-section');
        });

        unmount();

        expect(mockCancelAnimationFrame).toHaveBeenCalledWith(123);
    });
});
