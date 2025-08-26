import { useEffect, useRef, useCallback } from 'react';
import { useNavigation } from '@contexts/NavigationContext';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import {
    NAVIGATION_ITEMS,
    NAVIGATION_THROTTLE_DELAY,
    NAVIGATION_ROOT_MARGIN,
    MIN_SWIPE_DISTANCE,
    NAVIGATION_SCROLL_DURATION,
    INTERSECTION_THRESHOLDS,
    NAVIGATION_CLEANUP_DELAY,
} from '@utils/constants';
import type {
    UseSectionNavigationOptions,
    UseSectionNavigationReturn,
} from '../../types/hooks';

export const useSectionNavigation = (
    options: UseSectionNavigationOptions = {}
): UseSectionNavigationReturn => {
    const {
        currentSection,
        setCurrentSection,
        setIsScrolling,
        setNavigateToSection,
    } = useNavigation();
    const { actions: smoothScrollActions } = useSmoothScroll();
    const { scrollToElement } = smoothScrollActions;

    const {
        rootMargin = NAVIGATION_ROOT_MARGIN, // Account for header
        throttleDelay = NAVIGATION_THROTTLE_DELAY, // Prevent rapid section changes
    } = options;

    const observerRef = useRef<IntersectionObserver | null>(null);
    const isNavigating = useRef(false);
    const lastNavigationTime = useRef(0);

    // Get current section index
    const getCurrentSectionIndex = useCallback(() => {
        return NAVIGATION_ITEMS.findIndex((item) => item.id === currentSection);
    }, [currentSection]);

    // Navigate to specific section by index
    const navigateToSectionByIndex = useCallback(
        (targetIndex: number) => {
            if (targetIndex < 0 || targetIndex >= NAVIGATION_ITEMS.length) {
                return;
            }

            const targetSection = NAVIGATION_ITEMS[targetIndex];
            if (!targetSection || isNavigating.current) {
                return;
            }

            // Throttle navigation
            const now = Date.now();
            if (now - lastNavigationTime.current < throttleDelay) {
                return;
            }

            lastNavigationTime.current = now;
            isNavigating.current = true;
            setIsScrolling(true);

            // Immediately update current section for better UX
            setCurrentSection(targetSection.id);

            scrollToElement(targetSection.id, {
                duration: NAVIGATION_SCROLL_DURATION,
                onComplete: () => {
                    setIsScrolling(false);
                    setTimeout(() => {
                        isNavigating.current = false;
                    }, NAVIGATION_CLEANUP_DELAY); // Reduced from 100ms for better responsiveness
                },
            });
        },
        [scrollToElement, setIsScrolling, setCurrentSection, throttleDelay]
    );

    // Handle wheel events (mouse wheel and trackpad)
    const handleWheel = useCallback(
        (event: WheelEvent) => {
            // Prevent default scrolling
            event.preventDefault();

            if (isNavigating.current) {
                return;
            }

            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;

            // Determine scroll direction
            const deltaY = event.deltaY;

            if (deltaY > 0) {
                // Scrolling down - go to next section
                navigateToSectionByIndex(currentIndex + 1);
            } else if (deltaY < 0) {
                // Scrolling up - go to previous section
                navigateToSectionByIndex(currentIndex - 1);
            }
        },
        [getCurrentSectionIndex, navigateToSectionByIndex]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (isNavigating.current) {
                return;
            }

            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;

            switch (event.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Space key
                    event.preventDefault();
                    navigateToSectionByIndex(currentIndex + 1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    event.preventDefault();
                    navigateToSectionByIndex(currentIndex - 1);
                    break;
                case 'Home':
                    event.preventDefault();
                    navigateToSectionByIndex(0);
                    break;
                case 'End':
                    event.preventDefault();
                    navigateToSectionByIndex(NAVIGATION_ITEMS.length - 1);
                    break;
            }
        },
        [getCurrentSectionIndex, navigateToSectionByIndex]
    );

    // Handle touch events for mobile swipe
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        touchStartY.current = event.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(
        (event: TouchEvent) => {
            if (isNavigating.current) {
                return;
            }

            touchEndY.current = event.changedTouches[0].clientY;
            const deltaY = touchStartY.current - touchEndY.current;
            const minSwipeDistance = MIN_SWIPE_DISTANCE; // Minimum distance for a swipe

            if (Math.abs(deltaY) < minSwipeDistance) {
                return;
            }

            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;

            if (deltaY > 0) {
                // Swiped up - go to next section
                navigateToSectionByIndex(currentIndex + 1);
            } else {
                // Swiped down - go to previous section
                navigateToSectionByIndex(currentIndex - 1);
            }
        },
        [getCurrentSectionIndex, navigateToSectionByIndex]
    );

    // Handle active section detection
    const handleActiveSection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            // Only update current section if we're not actively navigating
            if (isNavigating.current) {
                return;
            }

            const intersectingEntries = entries.filter(
                (entry) => entry.isIntersecting
            );

            if (intersectingEntries.length === 0) {
                return;
            }

            // Find the section with the highest intersection ratio
            const mostVisibleEntry = intersectingEntries.reduce(
                (prev, current) => {
                    const prevRatio = prev.intersectionRatio;
                    const currentRatio = current.intersectionRatio;
                    const prevArea =
                        prev.intersectionRect.height *
                        prev.intersectionRect.width;
                    const currentArea =
                        current.intersectionRect.height *
                        current.intersectionRect.width;

                    // Prioritize by intersection ratio, then by visible area
                    if (Math.abs(prevRatio - currentRatio) < 0.1) {
                        return prevArea > currentArea ? prev : current;
                    }
                    return prevRatio > currentRatio ? prev : current;
                }
            );

            const activeId = mostVisibleEntry.target.id;

            // Only update if the section actually changed
            if (activeId !== currentSection) {
                setCurrentSection(activeId);
            }
        },
        [setCurrentSection, currentSection]
    );

    // Store the navigation function in a ref so it can be updated without causing re-renders
    const navigateRef = useRef<((sectionId: string) => void) | null>(null);

    // Method to manually navigate to a section
    const navigateToSection = useCallback(
        (sectionId: string) => {
            const targetIndex = NAVIGATION_ITEMS.findIndex(
                (item) => item.id === sectionId
            );
            if (targetIndex !== -1) {
                navigateToSectionByIndex(targetIndex);
            }
        },
        [navigateToSectionByIndex]
    );

    // Update the ref whenever the function changes
    navigateRef.current = navigateToSection;

    // Initialize intersection observer and event listeners
    useEffect(() => {
        const sectionIds = NAVIGATION_ITEMS.map((item) => item.id);

        // Set initial section if none is set
        if (!currentSection && sectionIds.length > 0) {
            setCurrentSection(sectionIds[0]);
        }

        // Create intersection observer for active section detection
        observerRef.current = new IntersectionObserver(handleActiveSection, {
            threshold: INTERSECTION_THRESHOLDS,
            rootMargin,
        });

        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        // Add event listeners
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, {
            passive: true,
        });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [
        handleActiveSection,
        handleWheel,
        handleKeyDown,
        handleTouchStart,
        handleTouchEnd,
        rootMargin,
        currentSection,
        setCurrentSection,
    ]);

    // Register navigation function with context (separate effect to avoid infinite loop)
    useEffect(() => {
        const stableNavigateFunction = (sectionId: string) => {
            if (navigateRef.current) {
                navigateRef.current(sectionId);
            }
        };

        if (setNavigateToSection) {
            setNavigateToSection(stableNavigateFunction);
        }
    }, [setNavigateToSection]);

    return {
        data: {} as Record<string, never>,
        actions: {
            navigateToSection,
        },
    };
};
