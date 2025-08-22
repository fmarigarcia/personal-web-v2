import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];

    constructor() {}

    observe() {
        return null;
    }

    disconnect() {
        return null;
    }

    unobserve() {
        return null;
    }

    takeRecords() {
        return [];
    }
};

// Mock scrollIntoView
Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: jest.fn(),
    writable: true,
});

// Mock getBoundingClientRect
Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
    value: jest.fn(() => ({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    })),
    writable: true,
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true,
});

// Mock window.pageYOffset
Object.defineProperty(window, 'pageYOffset', {
    value: 0,
    writable: true,
});

// Mock requestAnimationFrame and cancelAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
    value: jest.fn((callback: FrameRequestCallback) => {
        return setTimeout(callback, 16); // ~60fps
    }),
    writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
    value: jest.fn(clearTimeout),
    writable: true,
});
