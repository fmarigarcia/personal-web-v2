/**
 * Tests for useIntersectionObserver entry processing utilities
 */
import {
    getIntersectingEntries,
    getMostVisibleEntry,
    getEntryId,
    getVisibleArea,
    meetsVisibilityThreshold,
} from '../entryProcessing';

describe('entryProcessing utilities', () => {
    // Helper function to create mock intersection entries
    const createMockEntry = (
        isIntersecting: boolean,
        intersectionRatio: number,
        id: string = 'test',
        intersectionRect = { height: 100, width: 100 }
    ): IntersectionObserverEntry => {
        const target = document.createElement('div');
        target.id = id;

        return {
            target,
            isIntersecting,
            intersectionRatio,
            intersectionRect: {
                ...intersectionRect,
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                bottom: intersectionRect.height,
                right: intersectionRect.width,
                toJSON: () => ({}),
            },
            boundingClientRect: {} as DOMRectReadOnly,
            rootBounds: null,
            time: Date.now(),
        };
    };

    describe('getIntersectingEntries', () => {
        it('should return only intersecting entries', () => {
            const entries = [
                createMockEntry(true, 0.8, 'section1'),
                createMockEntry(false, 0, 'section2'),
                createMockEntry(true, 0.5, 'section3'),
                createMockEntry(false, 0.1, 'section4'),
            ];

            const result = getIntersectingEntries(entries);

            expect(result).toHaveLength(2);
            expect(result[0].target.id).toBe('section1');
            expect(result[1].target.id).toBe('section3');
        });

        it('should return empty array when no entries are intersecting', () => {
            const entries = [
                createMockEntry(false, 0, 'section1'),
                createMockEntry(false, 0.1, 'section2'),
            ];

            const result = getIntersectingEntries(entries);

            expect(result).toHaveLength(0);
        });

        it('should handle empty input array', () => {
            const result = getIntersectingEntries([]);

            expect(result).toHaveLength(0);
        });
    });

    describe('getMostVisibleEntry', () => {
        it('should return entry with highest intersection ratio', () => {
            const entries = [
                createMockEntry(true, 0.3, 'section1'),
                createMockEntry(true, 0.8, 'section2'),
                createMockEntry(true, 0.5, 'section3'),
            ];

            const result = getMostVisibleEntry(entries);

            expect(result?.target.id).toBe('section2');
            expect(result?.intersectionRatio).toBe(0.8);
        });

        it('should handle entries with similar intersection ratios by area', () => {
            const entries = [
                createMockEntry(true, 0.5, 'section1', {
                    height: 100,
                    width: 100,
                }), // Area: 10000
                createMockEntry(true, 0.51, 'section2', {
                    height: 200,
                    width: 200,
                }), // Area: 40000, ratio close but higher
            ];

            const result = getMostVisibleEntry(entries);

            expect(result?.target.id).toBe('section2'); // Higher ratio wins even if close
        });

        it('should use visible area as tiebreaker for very similar ratios', () => {
            const entries = [
                createMockEntry(true, 0.5, 'section1', {
                    height: 100,
                    width: 100,
                }), // Area: 10000
                createMockEntry(true, 0.505, 'section2', {
                    height: 200,
                    width: 200,
                }), // Area: 40000, diff < 0.1
            ];

            const result = getMostVisibleEntry(entries);

            expect(result?.target.id).toBe('section2'); // Larger area should win for very close ratios
        });

        it('should return null for empty array', () => {
            const result = getMostVisibleEntry([]);

            expect(result).toBeNull();
        });

        it('should handle single entry', () => {
            const entries = [createMockEntry(true, 0.5, 'section1')];

            const result = getMostVisibleEntry(entries);

            expect(result?.target.id).toBe('section1');
        });
    });

    describe('getEntryId', () => {
        it('should return element ID when present', () => {
            const entry = createMockEntry(true, 0.5, 'my-section');

            const result = getEntryId(entry);

            expect(result).toBe('my-section');
        });

        it('should return null when element has no ID', () => {
            const entry = createMockEntry(true, 0.5, '');

            const result = getEntryId(entry);

            expect(result).toBeNull();
        });
    });

    describe('getVisibleArea', () => {
        it('should calculate visible area correctly', () => {
            const entry = createMockEntry(true, 0.5, 'section1', {
                height: 200,
                width: 300,
            });

            const result = getVisibleArea(entry);

            expect(result).toBe(60000); // 200 * 300
        });

        it('should handle zero area', () => {
            const entry = createMockEntry(false, 0, 'section1', {
                height: 0,
                width: 100,
            });

            const result = getVisibleArea(entry);

            expect(result).toBe(0);
        });

        it('should handle partial visibility', () => {
            const entry = createMockEntry(true, 0.25, 'section1', {
                height: 50,
                width: 100,
            });

            const result = getVisibleArea(entry);

            expect(result).toBe(5000); // 50 * 100
        });
    });

    describe('meetsVisibilityThreshold', () => {
        it('should return true when ratio meets default threshold', () => {
            const entry = createMockEntry(true, 0.15, 'section1');

            const result = meetsVisibilityThreshold(entry);

            expect(result).toBe(true); // 0.15 >= 0.1 (default)
        });

        it('should return false when ratio is below default threshold', () => {
            const entry = createMockEntry(true, 0.05, 'section1');

            const result = meetsVisibilityThreshold(entry);

            expect(result).toBe(false); // 0.05 < 0.1 (default)
        });

        it('should use custom threshold when provided', () => {
            const entry = createMockEntry(true, 0.15, 'section1');

            const result = meetsVisibilityThreshold(entry, 0.2);

            expect(result).toBe(false); // 0.15 < 0.2 (custom)
        });

        it('should handle exact threshold match', () => {
            const entry = createMockEntry(true, 0.25, 'section1');

            const result = meetsVisibilityThreshold(entry, 0.25);

            expect(result).toBe(true); // 0.25 >= 0.25
        });

        it('should handle zero threshold', () => {
            const entry = createMockEntry(true, 0, 'section1');

            const result = meetsVisibilityThreshold(entry, 0);

            expect(result).toBe(true); // 0 >= 0
        });
    });
});
