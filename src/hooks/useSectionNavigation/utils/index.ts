export {
    getSectionIndex,
    getSectionByIndex,
    isValidSectionIndex,
    getNextSectionIndex,
    getPreviousSectionIndex,
    getFirstSectionIndex,
    getLastSectionIndex,
} from './navigationUtils';

export {
    analyzeTouchGesture,
    shouldNavigateFromGesture,
    mapGestureToNavigation,
} from './touchGestures';

export {
    mapKeyToNavigation,
    isNavigationKey,
    analyzeWheelEvent,
    shouldNavigateFromWheel,
} from './eventHandling';

export {
    shouldThrottle,
    getThrottleTimestamp,
    createThrottleChecker,
} from './throttling';

// Re-export types from centralized types
export type {
    TouchGestureData,
    KeyboardNavigationKey,
    NavigationDirection,
} from '../../../types/hooks';
