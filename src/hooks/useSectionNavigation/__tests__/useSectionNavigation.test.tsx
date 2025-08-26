import { renderHook, act } from '@testing-library/react';
import * as NavigationContext from '@contexts/NavigationContext';
import * as deviceDetection from '@utils/deviceDetection';
import { NAVIGATION_SCROLL_DURATION } from '@utils/constants';
import { useSectionNavigation } from '../useSectionNavigation';

// Mock constants since we can't import them in test
const MOCK_NAVIGATION_ITEMS = [
    { id: 'hero' },
    { id: 'about' },
    { id: 'experience' },
    { id: 'projects' },
    { id: 'contact' },
];

// Mock device detection to simulate desktop behavior by default
jest.mock('@utils/deviceDetection', () => ({
    isMobileDevice: jest.fn(() => false), // Default to desktop
}));

// Mock the dependencies - move all mocks to top level
jest.mock('@contexts/NavigationContext');
jest.mock('@utils/constants', () => ({
    NAVIGATION_ITEMS: [
        { id: 'hero' },
        { id: 'about' },
        { id: 'experience' },
        { id: 'projects' },
        { id: 'contact' },
    ],
}));

// Mock useSmoothScroll hook
const mockScrollToElement = jest.fn();
jest.mock('@hooks/useSmoothScroll', () => ({
    useSmoothScroll: () => ({
        data: {},
        actions: {
            scrollToElement: mockScrollToElement,
        },
    }),
}));

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();
const mockUnobserve = jest.fn();

class MockIntersectionObserver {
    private callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }

    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = mockUnobserve;

    // Helper method to trigger intersection
    triggerIntersection(entries: IntersectionObserverEntry[]) {
        this.callback(entries, this as unknown as IntersectionObserver);
    }
}

(global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    MockIntersectionObserver;

// Mock DOM methods
Object.defineProperty(window, 'pageYOffset', {
    value: 0,
    writable: true,
});

Object.defineProperty(window, 'innerHeight', {
    value: 800,
    writable: true,
});

// Mock addEventListener and removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
Object.defineProperty(window, 'addEventListener', {
    value: mockAddEventListener,
});
Object.defineProperty(window, 'removeEventListener', {
    value: mockRemoveEventListener,
});

// Mock getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
    value: mockGetElementById,
});

// Mock observer instances
const mockObserverInstances: MockIntersectionObserver[] = [];

describe('useSectionNavigation', () => {
    const mockSetCurrentSection = jest.fn();
    const mockSetIsScrolling = jest.fn();
    const mockSetNavigateToSection = jest.fn();

    const mockNavigationContext = {
        currentSection: 'hero',
        setCurrentSection: mockSetCurrentSection,
        isScrolling: false,
        setIsScrolling: mockSetIsScrolling,
        setNavigateToSection: mockSetNavigateToSection,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockObserverInstances.length = 0;

        (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
            mockNavigationContext
        );

        // Mock IntersectionObserver constructor to track instances
        (
            global as unknown as { IntersectionObserver: unknown }
        ).IntersectionObserver = jest
            .fn()
            .mockImplementation((callback: IntersectionObserverCallback) => {
                const instance = new MockIntersectionObserver(callback);
                mockObserverInstances.push(instance);
                return instance;
            });

        // Mock elements for all navigation items - return different elements for each ID
        mockGetElementById.mockImplementation((id: string) => {
            const foundItem = MOCK_NAVIGATION_ITEMS.find(
                (item) => item.id === id
            );
            if (foundItem) {
                return { id, dataset: {} }; // Return a mock element
            }
            return null;
        });

        // Reset Date.now mock
        jest.spyOn(Date, 'now').mockReturnValue(1000);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should initialize intersection observer and event listeners', () => {
        renderHook(() => useSectionNavigation());

        // Should observe all navigation sections
        expect(mockObserve).toHaveBeenCalledTimes(MOCK_NAVIGATION_ITEMS.length);

        // Should add event listeners for scroll interception
        expect(mockAddEventListener).toHaveBeenCalledWith(
            'wheel',
            expect.any(Function),
            { passive: false }
        );
        expect(mockAddEventListener).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
        expect(mockAddEventListener).toHaveBeenCalledWith(
            'touchstart',
            expect.any(Function),
            { passive: false }
        );
        expect(mockAddEventListener).toHaveBeenCalledWith(
            'touchend',
            expect.any(Function),
            { passive: false }
        );
    });

    it('should clean up on unmount', () => {
        const { unmount } = renderHook(() => useSectionNavigation());

        unmount();

        expect(mockDisconnect).toHaveBeenCalled();
        expect(mockRemoveEventListener).toHaveBeenCalledWith(
            'wheel',
            expect.any(Function)
        );
        expect(mockRemoveEventListener).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
        expect(mockRemoveEventListener).toHaveBeenCalledWith(
            'touchstart',
            expect.any(Function)
        );
        expect(mockRemoveEventListener).toHaveBeenCalledWith(
            'touchend',
            expect.any(Function)
        );
    });

    it('should update current section when intersection occurs', () => {
        const mockIntersectionEntry: Partial<IntersectionObserverEntry> = {
            target: { id: 'about' } as Element,
            isIntersecting: true,
            intersectionRatio: 0.8,
            intersectionRect: {
                height: 600,
                width: 1000,
            } as DOMRectReadOnly,
        };

        renderHook(() => useSectionNavigation());

        // Access the observer instance and trigger intersection
        const observer = mockObserverInstances[0];
        if (observer) {
            act(() => {
                observer.triggerIntersection([
                    mockIntersectionEntry as IntersectionObserverEntry,
                ]);
            });
        }

        expect(mockSetCurrentSection).toHaveBeenCalledWith('about');
    });

    it('should register navigation function with context', () => {
        renderHook(() => useSectionNavigation());

        expect(mockSetNavigateToSection).toHaveBeenCalledWith(
            expect.any(Function)
        );
    });

    it('should navigate to section and handle scrolling state', () => {
        const { result } = renderHook(() => useSectionNavigation());

        act(() => {
            result.current.actions.navigateToSection('about');
        });

        expect(mockScrollToElement).toHaveBeenCalledWith('about', {
            duration: NAVIGATION_SCROLL_DURATION,
            onComplete: expect.any(Function),
        });
    });

    it('should throttle rapid navigation attempts', () => {
        jest.spyOn(Date, 'now')
            .mockReturnValueOnce(1000)
            .mockReturnValueOnce(1200); // Within throttle delay

        const { result } = renderHook(() =>
            useSectionNavigation({ throttleDelay: 800 })
        );

        act(() => {
            result.current.actions.navigateToSection('about');
            result.current.actions.navigateToSection('experience');
        });

        // Should only call scroll once due to throttling
        expect(mockScrollToElement).toHaveBeenCalledTimes(1);
        expect(mockScrollToElement).toHaveBeenCalledWith(
            'about',
            expect.any(Object)
        );
    });

    it('should handle navigation to invalid section', () => {
        const { result } = renderHook(() => useSectionNavigation());

        act(() => {
            result.current.actions.navigateToSection('invalid-section');
        });

        expect(mockScrollToElement).not.toHaveBeenCalled();
    });

    it('should prevent navigation when already navigating', () => {
        const { result } = renderHook(() => useSectionNavigation());

        // Start first navigation
        act(() => {
            result.current.actions.navigateToSection('about');
        });

        // Try to navigate again immediately
        act(() => {
            result.current.actions.navigateToSection('experience');
        });

        // Should only have been called once
        expect(mockScrollToElement).toHaveBeenCalledTimes(1);
    });

    describe('wheel event handling', () => {
        it('should navigate to next section on wheel down', () => {
            const currentMockContext = {
                ...mockNavigationContext,
                currentSection: 'hero',
            };
            (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
                currentMockContext
            );

            renderHook(() => useSectionNavigation());

            // Get the wheel event handler
            const wheelHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'wheel'
            )?.[1];

            if (wheelHandler) {
                const wheelEvent = new WheelEvent('wheel', { deltaY: 100 });
                jest.spyOn(wheelEvent, 'preventDefault');

                act(() => {
                    wheelHandler(wheelEvent);
                });

                expect(wheelEvent.preventDefault).toHaveBeenCalled();
                expect(mockScrollToElement).toHaveBeenCalledWith(
                    'about',
                    expect.any(Object)
                );
            }
        });

        it('should navigate to previous section on wheel up', () => {
            const currentMockContext = {
                ...mockNavigationContext,
                currentSection: 'about',
            };
            (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
                currentMockContext
            );

            renderHook(() => useSectionNavigation());

            const wheelHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'wheel'
            )?.[1];

            if (wheelHandler) {
                const wheelEvent = new WheelEvent('wheel', { deltaY: -100 });
                jest.spyOn(wheelEvent, 'preventDefault');

                act(() => {
                    wheelHandler(wheelEvent);
                });

                expect(wheelEvent.preventDefault).toHaveBeenCalled();
                expect(mockScrollToElement).toHaveBeenCalledWith(
                    'hero',
                    expect.any(Object)
                );
            }
        });
    });

    describe('keyboard event handling', () => {
        it('should navigate to next section on ArrowDown', () => {
            const currentMockContext = {
                ...mockNavigationContext,
                currentSection: 'hero',
            };
            (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
                currentMockContext
            );

            renderHook(() => useSectionNavigation());

            const keyHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'keydown'
            )?.[1];

            if (keyHandler) {
                const keyEvent = new KeyboardEvent('keydown', {
                    key: 'ArrowDown',
                });
                jest.spyOn(keyEvent, 'preventDefault');

                act(() => {
                    keyHandler(keyEvent);
                });

                expect(keyEvent.preventDefault).toHaveBeenCalled();
                expect(mockScrollToElement).toHaveBeenCalledWith(
                    'about',
                    expect.any(Object)
                );
            }
        });

        it('should navigate to first section on Home key', () => {
            const currentMockContext = {
                ...mockNavigationContext,
                currentSection: 'about',
            };
            (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
                currentMockContext
            );

            renderHook(() => useSectionNavigation());

            const keyHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'keydown'
            )?.[1];

            if (keyHandler) {
                const keyEvent = new KeyboardEvent('keydown', { key: 'Home' });
                jest.spyOn(keyEvent, 'preventDefault');

                act(() => {
                    keyHandler(keyEvent);
                });

                expect(keyEvent.preventDefault).toHaveBeenCalled();
                expect(mockScrollToElement).toHaveBeenCalledWith(
                    'hero',
                    expect.any(Object)
                );
            }
        });
    });

    describe('touch event handling', () => {
        it('should navigate to next section on upward swipe', () => {
            const currentMockContext = {
                ...mockNavigationContext,
                currentSection: 'hero',
            };
            (NavigationContext.useNavigation as jest.Mock).mockReturnValue(
                currentMockContext
            );

            renderHook(() => useSectionNavigation());

            const touchStartHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'touchstart'
            )?.[1];

            const touchEndHandler = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'touchend'
            )?.[1];

            if (touchStartHandler && touchEndHandler) {
                // Simulate touch start
                const touchStartEvent = {
                    touches: [{ clientY: 400 }],
                } as unknown as TouchEvent;

                act(() => {
                    touchStartHandler(touchStartEvent);
                });

                // Simulate touch end (upward swipe)
                const touchEndEvent = {
                    changedTouches: [{ clientY: 300 }], // 100px upward swipe
                } as unknown as TouchEvent;

                act(() => {
                    touchEndHandler(touchEndEvent);
                });

                expect(mockScrollToElement).toHaveBeenCalledWith(
                    'about',
                    expect.any(Object)
                );
            }
        });
    });

    describe('mobile behavior', () => {
        beforeEach(() => {
            // Mock as mobile device
            jest.spyOn(deviceDetection, 'isMobileDevice').mockReturnValue(true);
        });

        afterEach(() => {
            // Reset to desktop behavior
            jest.spyOn(deviceDetection, 'isMobileDevice').mockReturnValue(
                false
            );
        });

        it('should use passive event listeners on mobile', () => {
            renderHook(() => useSectionNavigation());

            // Should add passive event listeners for mobile
            expect(mockAddEventListener).toHaveBeenCalledWith(
                'wheel',
                expect.any(Function),
                { passive: true }
            );
            expect(mockAddEventListener).toHaveBeenCalledWith(
                'touchstart',
                expect.any(Function),
                { passive: true }
            );
            expect(mockAddEventListener).toHaveBeenCalledWith(
                'touchend',
                expect.any(Function),
                { passive: true }
            );
        });

        it('should not prevent default behavior on wheel events on mobile', () => {
            renderHook(() => useSectionNavigation());

            // Get the wheel event handler
            const wheelHandlerCall = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'wheel'
            );
            const wheelHandler = wheelHandlerCall?.[1] as (
                event: WheelEvent
            ) => void;

            // Simulate wheel event
            const wheelEvent = {
                deltaY: 100,
                preventDefault: jest.fn(),
            } as unknown as WheelEvent;

            act(() => {
                wheelHandler(wheelEvent);
            });

            // Should NOT prevent default on mobile (allow normal scrolling)
            expect(wheelEvent.preventDefault).not.toHaveBeenCalled();
            expect(mockScrollToElement).not.toHaveBeenCalled();
        });

        it('should not handle keyboard navigation on mobile', () => {
            renderHook(() => useSectionNavigation());

            // Get the keydown event handler
            const keyHandlerCall = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'keydown'
            );
            const keyHandler = keyHandlerCall?.[1] as (
                event: KeyboardEvent
            ) => void;

            // Simulate ArrowDown key press
            const keyEvent = {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
            } as unknown as KeyboardEvent;

            act(() => {
                keyHandler(keyEvent);
            });

            // Should NOT prevent default or navigate on mobile
            expect(keyEvent.preventDefault).not.toHaveBeenCalled();
            expect(mockScrollToElement).not.toHaveBeenCalled();
        });

        it('should not handle touch gestures on mobile for navigation', () => {
            renderHook(() => useSectionNavigation());

            // Get the touch event handlers
            const touchStartHandlerCall = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'touchstart'
            );
            const touchEndHandlerCall = mockAddEventListener.mock.calls.find(
                (call) => call[0] === 'touchend'
            );

            const touchStartHandler = touchStartHandlerCall?.[1] as (
                event: TouchEvent
            ) => void;
            const touchEndHandler = touchEndHandlerCall?.[1] as (
                event: TouchEvent
            ) => void;

            // Simulate touch events that would normally trigger navigation
            const touchStartEvent = {
                touches: [{ clientY: 400 }],
            } as unknown as TouchEvent;

            const touchEndEvent = {
                changedTouches: [{ clientY: 300 }], // 100px upward swipe
            } as unknown as TouchEvent;

            act(() => {
                touchStartHandler(touchStartEvent);
                touchEndHandler(touchEndEvent);
            });

            // Should NOT navigate on mobile (allow normal touch scrolling)
            expect(mockScrollToElement).not.toHaveBeenCalled();
        });
    });
});
