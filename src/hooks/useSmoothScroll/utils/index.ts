export { easeInOutCubic, easingFunctions } from './easingFunctions';
export {
    calculateScrollPosition,
    isAnimationComplete,
    createAnimationFrame,
} from './scrollAnimation';

// Re-export types from centralized types
export type {
    EasingFunction,
    EasingType,
    AnimationFrame,
} from '../../../types/hooks';
