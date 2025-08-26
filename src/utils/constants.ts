// App constants for navigation and sections
export const SECTIONS = {
    HERO: 'hero',
    ABOUT: 'about',
    EXPERIENCE: 'experience',
    CONTACT: 'contact',
} as const;

export const NAVIGATION_ITEMS = [
    { id: SECTIONS.HERO, labelKey: 'nav.home', href: '#hero' },
    { id: SECTIONS.ABOUT, labelKey: 'nav.about', href: '#about' },
    {
        id: SECTIONS.EXPERIENCE,
        labelKey: 'nav.experience',
        href: '#experience',
    },
    { id: SECTIONS.CONTACT, labelKey: 'nav.contact', href: '#contact' },
];

// Layout constants
export const NAVBAR_HEIGHT = 80; // Used for scroll offset and section padding

// Scroll & Navigation constants
export const SCROLL_OFFSET = 0; // Offset for fixed header
export const SCROLL_DURATION = 800; // Smooth scroll duration in ms
export const NAVIGATION_SCROLL_DURATION = 700; // Section navigation scroll duration
export const NAVIGATION_THROTTLE_DELAY = 300; // Delay between section changes in ms
export const NAVIGATION_ROOT_MARGIN = `-${NAVBAR_HEIGHT}px 0px -20% 0px`; // Account for header
export const MIN_SWIPE_DISTANCE = 50; // Minimum distance for a swipe gesture
export const NAVIGATION_CLEANUP_DELAY = 50; // Delay before resetting navigation state

// Intersection Observer constants
export const INTERSECTION_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.9, 1.0];
export const DEFAULT_INTERSECTION_THRESHOLD = 0.5;

// UI & Component constants
export const STAR_COLORS = [
    '#a50104',
    '#d15e04',
    '#fcba04',
    '#b2ae2a',
    '#6da34d',
];
export const DEFAULT_STAR_SIZE = 20;
export const DEFAULT_MAX_STARS = 5;

// Language configurations
export const SUPPORTED_LANGUAGES = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Spanish' },
] as const;

// Timing & Animation constants
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
} as const;

export const FORM_SUBMISSION_DELAY = 1000; // Simulated form submission delay
export const TEST_ANIMATION_FRAME_DELAY = 16; // ~60fps for tests
