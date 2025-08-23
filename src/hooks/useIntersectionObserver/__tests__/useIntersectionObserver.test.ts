import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';

describe('useIntersectionObserver', () => {
    let mockIntersectionObserver: jest.MockedClass<typeof IntersectionObserver>;
    let mockObserve: jest.Mock;
    let mockUnobserve: jest.Mock;
    let mockDisconnect: jest.Mock;
    let intersectionCallback: IntersectionObserverCallback;

    beforeEach(() => {
        mockObserve = jest.fn();
        mockUnobserve = jest.fn();
        mockDisconnect = jest.fn();

        mockIntersectionObserver = jest.fn().mockImplementation((callback) => {
            intersectionCallback = callback;
            return {
                observe: mockObserve,
                unobserve: mockUnobserve,
                disconnect: mockDisconnect,
                root: null,
                rootMargin: '',
                thresholds: [],
                takeRecords: jest.fn(() => []),
            };
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).IntersectionObserver = mockIntersectionObserver;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with empty activeId', () => {
        const { result } = renderHook(() =>
            useIntersectionObserver([], { threshold: 0.5 })
        );

        expect(result.current.activeId).toBeNull();
    });

    it('should create IntersectionObserver with correct options', () => {
        const options = { threshold: 0.6, rootMargin: '10px' };

        renderHook(() =>
            useIntersectionObserver(['section1', 'section2'], options)
        );

        expect(mockIntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            expect.objectContaining({
                threshold: 0.6,
                rootMargin: '10px',
                root: null,
            })
        );
    });

    it('should observe elements when ids are provided', () => {
        // Mock document.getElementById
        const mockElement1 = { id: 'section1' } as HTMLElement;
        const mockElement2 = { id: 'section2' } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'section1') return mockElement1;
            if (id === 'section2') return mockElement2;
            return null;
        });

        renderHook(() =>
            useIntersectionObserver(['section1', 'section2'], {
                threshold: 0.5,
            })
        );

        expect(mockObserve).toHaveBeenCalledWith(mockElement1);
        expect(mockObserve).toHaveBeenCalledWith(mockElement2);
    });

    it('should update activeId when intersection changes', () => {
        const mockElement = { id: 'section1' } as HTMLElement;
        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const { result } = renderHook(() =>
            useIntersectionObserver(['section1'], { threshold: 0.5 })
        );

        // Simulate intersection
        const mockEntry: IntersectionObserverEntry = {
            target: mockElement,
            isIntersecting: true,
            intersectionRatio: 0.8,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            time: Date.now(),
        };

        act(() => {
            intersectionCallback(
                [mockEntry],
                mockIntersectionObserver.mock.instances[0]
            );
        });

        expect(result.current.activeId).toBe('section1');
    });

    it('should handle multiple intersections and pick the most visible one', () => {
        const mockElement1 = { id: 'section1' } as HTMLElement;
        const mockElement2 = { id: 'section2' } as HTMLElement;

        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'section1') return mockElement1;
            if (id === 'section2') return mockElement2;
            return null;
        });

        const { result } = renderHook(() =>
            useIntersectionObserver(['section1', 'section2'], {
                threshold: 0.5,
            })
        );

        const mockEntries: IntersectionObserverEntry[] = [
            {
                target: mockElement1,
                isIntersecting: true,
                intersectionRatio: 0.3,
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: {} as DOMRectReadOnly,
                time: Date.now(),
            },
            {
                target: mockElement2,
                isIntersecting: true,
                intersectionRatio: 0.7, // More visible
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: {} as DOMRectReadOnly,
                time: Date.now(),
            },
        ];

        act(() => {
            intersectionCallback(
                mockEntries,
                mockIntersectionObserver.mock.instances[0]
            );
        });

        expect(result.current.activeId).toBe('section2');
    });

    it('should set activeId to null when no elements are intersecting', () => {
        const mockElement = { id: 'section1' } as HTMLElement;
        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const { result } = renderHook(() =>
            useIntersectionObserver(['section1'], { threshold: 0.5 })
        );

        const mockEntry: IntersectionObserverEntry = {
            target: mockElement,
            isIntersecting: false,
            intersectionRatio: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            time: Date.now(),
        };

        act(() => {
            intersectionCallback(
                [mockEntry],
                mockIntersectionObserver.mock.instances[0]
            );
        });

        expect(result.current.activeId).toBeNull();
    });

    it('should disconnect observer on unmount', () => {
        const { unmount } = renderHook(() =>
            useIntersectionObserver(['section1'], { threshold: 0.5 })
        );

        unmount();

        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should handle elements that do not exist in DOM', () => {
        jest.spyOn(document, 'getElementById').mockReturnValue(null);
        jest.spyOn(console, 'warn').mockImplementation();

        renderHook(() =>
            useIntersectionObserver(['nonexistent'], { threshold: 0.5 })
        );

        expect(mockObserve).not.toHaveBeenCalled();
    });
});
