/**
 * Hook-related type definitions
 * Contains interfaces used by custom hooks and their return types
 */
import type { ExperienceItem } from './data';

// Smooth scroll hook interfaces
export interface ScrollOptions {
    duration?: number;
    offset?: number;
    onStart?: () => void;
    onComplete?: () => void;
}

export interface UseSmoothScrollReturn {
    data: Record<string, never>;
    actions: {
        scrollToElement: (elementId: string, options?: ScrollOptions) => void;
    };
}

// Intersection observer hook interfaces
export interface UseIntersectionObserverOptions
    extends IntersectionObserverInit {
    threshold?: number | number[];
    rootMargin?: string;
    root?: Element | null;
}

export interface UseIntersectionObserverReturn {
    data: {
        activeId: string | null;
    };
    actions: Record<string, never>;
}

// Section navigation hook interfaces
export interface UseSectionNavigationOptions {
    rootMargin?: string;
    throttleDelay?: number; // Delay between section changes in ms
}

export interface UseSectionNavigationReturn {
    data: Record<string, never>;
    actions: {
        navigateToSection: (sectionId: string) => void;
    };
}

// Experience hook interface
export interface UseExperienceReturn {
    data: {
        experiences: ExperienceItem[];
        selectedExp: ExperienceItem;
        hoveredExp: string | null;
        displayedExp: ExperienceItem;
    };
    actions: {
        setSelectedExp: (exp: ExperienceItem) => void;
        setHoveredExp: (expId: string | null) => void;
    };
}
