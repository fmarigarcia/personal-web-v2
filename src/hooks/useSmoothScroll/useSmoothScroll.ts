import { useRef, useCallback, useEffect } from 'react';
import { SCROLL_DURATION, SCROLL_OFFSET } from '@utils/constants';

interface ScrollOptions {
    duration?: number;
    offset?: number;
    onStart?: () => void;
    onComplete?: () => void;
}

interface UseSmoothScrollReturn {
    data: Record<string, never>;
    actions: {
        scrollToElement: (elementId: string, options?: ScrollOptions) => void;
    };
}

// Easing function for smooth animation
const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const useSmoothScroll = (): UseSmoothScrollReturn => {
    const animationRef = useRef<number | null>(null);

    const scrollToElement = useCallback(
        (elementId: string, options: ScrollOptions = {}) => {
            const element = document.getElementById(elementId);

            if (!element) {
                // Silently return if element doesn't exist
                return;
            }

            const {
                duration = SCROLL_DURATION,
                offset = SCROLL_OFFSET,
                onStart,
                onComplete,
            } = options;

            // Call onStart callback
            onStart?.();

            // Cancel any existing animation
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            const startY = window.pageYOffset;
            const targetY = element.offsetTop - offset;
            const distance = targetY - startY;
            let startTime: number | null = null;

            const animateScroll = (timestamp: number) => {
                if (!startTime) {
                    startTime = timestamp;
                }

                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                const currentY = startY + distance * easedProgress;
                window.scrollTo(0, currentY);

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animateScroll);
                } else {
                    animationRef.current = null;
                    onComplete?.();
                }
            };

            animationRef.current = requestAnimationFrame(animateScroll);
        },
        []
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, []);

    return {
        data: {} as Record<string, never>,
        actions: {
            scrollToElement,
        },
    };
};
