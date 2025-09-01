import { useEffect, useRef, useCallback } from 'react';
import { useNavigation } from '@contexts/NavigationContext';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import { usePlatform } from '@hooks/usePlatform';
import {
    NAVIGATION_ITEMS,
    NAVIGATION_THROTTLE_DELAY,
    NAVIGATION_ROOT_MARGIN,
    NAVIGATION_SCROLL_DURATION,
    INTERSECTION_THRESHOLDS,
} from '@utils/constants';
import type {
    UseSectionNavigationOptions,
    UseSectionNavigationReturn,
} from '../../types/hooks';

/**
 * Section navigation hook with platform-specific behavior:
 * - Desktop: Prevents normal scrolling, only allows section-to-section navigation
 * - Mobile: Allows regular scrolling with intersection observer for active section tracking
 */
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
        data: { isMobile },
    } = usePlatform();

    const {
        rootMargin = NAVIGATION_ROOT_MARGIN,
        throttleDelay = NAVIGATION_THROTTLE_DELAY,
    } = options;

    const observerRef = useRef<IntersectionObserver | null>(null);
    const isNavigating = useRef(false);
    const lastNavigationTime = useRef(0);

    // Get current section index
    const getCurrentSectionIndex = useCallback((): number => {
        return NAVIGATION_ITEMS.findIndex((item) => item.id === currentSection);
    }, [currentSection]);

    // Navigate to specific section by index
    const navigateToSectionByIndex = useCallback(
        (targetIndex: number) => {
            if (
                targetIndex < 0 ||
                targetIndex >= NAVIGATION_ITEMS.length ||
                isNavigating.current
            ) {
                return;
            }

            // Throttle navigation
            const now = Date.now();
            if (now - lastNavigationTime.current < throttleDelay) {
                return;
            }

            const targetSection = NAVIGATION_ITEMS[targetIndex];
            lastNavigationTime.current = now;
            isNavigating.current = true;
            setIsScrolling(true);

            // Update current section immediately for better UX
            setCurrentSection(targetSection.id);

            scrollToElement(targetSection.id, {
                duration: NAVIGATION_SCROLL_DURATION,
                onComplete: () => {
                    setIsScrolling(false);
                    setTimeout(() => {
                        isNavigating.current = false;
                    }, 100);
                },
            });
        },
        [scrollToElement, setIsScrolling, setCurrentSection, throttleDelay]
    );

    // Desktop-only: Handle wheel events for section navigation
    const handleWheel = useCallback(
        (event: WheelEvent) => {
            if (isMobile || isNavigating.current) {
                return;
            }

            // Prevent ALL scrolling on desktop
            event.preventDefault();

            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;

            // Determine direction based on wheel delta
            if (event.deltaY > 0) {
                // Scroll down - go to next section
                navigateToSectionByIndex(currentIndex + 1);
            } else if (event.deltaY < 0) {
                // Scroll up - go to previous section
                navigateToSectionByIndex(currentIndex - 1);
            }
        },
        [isMobile, getCurrentSectionIndex, navigateToSectionByIndex]
    );

    // Desktop-only: Handle keyboard navigation
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (
                isMobile ||
                isNavigating.current ||
                document.activeElement?.tagName.toLowerCase() === 'input' ||
                document.activeElement?.tagName.toLowerCase() === 'textarea'
            ) {
                return;
            }

            const currentIndex = getCurrentSectionIndex();
            if (currentIndex === -1) return;

            let targetIndex = -1;

            switch (event.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ': // Spacebar
                    targetIndex = currentIndex + 1;
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    targetIndex = currentIndex - 1;
                    break;
                case 'Home':
                    targetIndex = 0;
                    break;
                case 'End':
                    targetIndex = NAVIGATION_ITEMS.length - 1;
                    break;
                default:
                    return; // Don't prevent default for other keys
            }

            if (targetIndex !== -1) {
                event.preventDefault();
                navigateToSectionByIndex(targetIndex);
            }
        },
        [isMobile, getCurrentSectionIndex, navigateToSectionByIndex]
    );

    // Desktop-only: Prevent touch scrolling
    const handleTouchMove = useCallback(
        (event: TouchEvent) => {
            if (!isMobile) {
                // Prevent touch scrolling on desktop (for touch screens)
                event.preventDefault();
            }
        },
        [isMobile]
    );

    // Handle intersection observer for active section detection
    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (isNavigating.current) {
                return;
            }

            const visibleEntries = entries.filter(
                (entry) => entry.isIntersecting
            );
            if (visibleEntries.length === 0) {
                return;
            }

            // Find the most visible section
            const mostVisible = visibleEntries.reduce((prev, current) =>
                prev.intersectionRatio > current.intersectionRatio
                    ? prev
                    : current
            );

            const activeId = mostVisible.target.id;
            if (activeId !== currentSection) {
                setCurrentSection(activeId);
            }
        },
        [currentSection, setCurrentSection]
    );

    // Manual navigation function
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

    // Initialize intersection observer and event listeners
    useEffect(() => {
        // Set initial section if none is set
        if (!currentSection && NAVIGATION_ITEMS.length > 0) {
            setCurrentSection(NAVIGATION_ITEMS[0].id);
        }

        // Create intersection observer
        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: INTERSECTION_THRESHOLDS,
            rootMargin,
        });

        // Observe all sections
        NAVIGATION_ITEMS.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        // Add event listeners based on platform
        if (!isMobile) {
            // Desktop: Prevent scrolling, enable section navigation
            window.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('touchmove', handleTouchMove, {
                passive: false,
            });
        }
        // Mobile: No event listeners - allow natural scrolling

        return () => {
            // Cleanup
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            if (!isMobile) {
                window.removeEventListener('wheel', handleWheel);
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [
        currentSection,
        setCurrentSection,
        handleIntersection,
        handleWheel,
        handleKeyDown,
        handleTouchMove,
        rootMargin,
        isMobile,
    ]);

    // Register navigation function with context
    useEffect(() => {
        if (setNavigateToSection) {
            setNavigateToSection(navigateToSection);
        }
    }, [setNavigateToSection, navigateToSection]);

    return {
        data: {} as Record<string, never>,
        actions: {
            navigateToSection,
        },
    };
};
