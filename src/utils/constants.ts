// App constants for navigation and sections
export const SECTIONS = {
    HERO: 'hero',
    ABOUT: 'about',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects',
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
    { id: SECTIONS.PROJECTS, labelKey: 'nav.projects', href: '#projects' },
    { id: SECTIONS.CONTACT, labelKey: 'nav.contact', href: '#contact' },
];

export const SCROLL_OFFSET = 80; // Offset for fixed header
export const SCROLL_DURATION = 800; // Smooth scroll duration in ms

// Animation constants
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
} as const;
