import { useState, useCallback, useMemo } from 'react';
import { experiences } from '@data/experiences';
import { usePlatform } from '@hooks/usePlatform';
import type { UseExperienceReturn } from '../../types/hooks';
import type { ExperienceItem } from '../../types/data';

export const useExperience = (): UseExperienceReturn => {
    const {
        data: { isDesktop },
    } = usePlatform();

    // Show the most recent experience (last in array) by default
    const [selectedExp, setSelectedExpState] = useState(
        experiences[experiences.length - 1]
    );
    const [hoveredExp, setHoveredExpState] = useState<string | null>(null);

    // Use hovered experience if available, otherwise use selected
    const displayedExp = hoveredExp
        ? experiences.find((exp) => exp.id === hoveredExp) || selectedExp
        : selectedExp;

    const shownExperiences = useMemo(() => {
        if (isDesktop) {
            return experiences;
        }

        return [...experiences].reverse();
    }, [isDesktop]);

    const data = {
        experiences: shownExperiences,
        selectedExp,
        hoveredExp,
        displayedExp,
    };

    const actions = {
        setSelectedExp: useCallback((exp: ExperienceItem) => {
            setSelectedExpState(exp);
        }, []),
        setHoveredExp: useCallback((expId: string | null) => {
            setHoveredExpState(expId);
        }, []),
    };

    return { data, actions };
};
