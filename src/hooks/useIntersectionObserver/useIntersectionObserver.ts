import { useState, useEffect, useRef } from 'react';
import { DEFAULT_INTERSECTION_THRESHOLD } from '@utils/constants';
import {
    getIntersectingEntries,
    getMostVisibleEntry,
    getEntryId,
} from './utils';
import type {
    UseIntersectionObserverOptions,
    UseIntersectionObserverReturn,
} from '../../types/hooks';

export const useIntersectionObserver = (
    ids: string[],
    options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!ids.length) {
            return;
        }

        // Create intersection observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const intersectingEntries = getIntersectingEntries(entries);

                if (intersectingEntries.length === 0) {
                    setActiveId(null);
                    return;
                }

                const mostVisibleEntry =
                    getMostVisibleEntry(intersectingEntries);
                if (mostVisibleEntry) {
                    const targetId = getEntryId(mostVisibleEntry);
                    setActiveId(targetId);
                }
            },
            {
                threshold: options.threshold || DEFAULT_INTERSECTION_THRESHOLD,
                rootMargin: options.rootMargin || '0px',
                root: options.root || null,
            }
        );

        // Observe all elements
        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
            // Note: Silently skip elements that don't exist yet
        });

        // Cleanup function
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [ids, options.threshold, options.rootMargin, options.root]);

    const data = {
        activeId,
    };

    const actions = {} as Record<string, never>;

    return { data, actions };
};
