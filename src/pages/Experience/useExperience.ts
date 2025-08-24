import { useState, useCallback } from 'react';
import { experiences } from '@data/experiences';

interface UseExperienceReturn {
    data: {
        experiences: typeof experiences;
        selectedExp: (typeof experiences)[0];
        hoveredExp: string | null;
        displayedExp: (typeof experiences)[0];
    };
    actions: {
        setSelectedExp: (exp: (typeof experiences)[0]) => void;
        setHoveredExp: (expId: string | null) => void;
    };
}

export const useExperience = (): UseExperienceReturn => {
    // Show the most recent experience (last in array) by default
    const [selectedExp, setSelectedExpState] = useState(
        experiences[experiences.length - 1]
    );
    const [hoveredExp, setHoveredExpState] = useState<string | null>(null);

    // Use hovered experience if available, otherwise use selected
    const displayedExp = hoveredExp
        ? experiences.find((exp) => exp.id === hoveredExp) || selectedExp
        : selectedExp;

    const data = {
        experiences,
        selectedExp,
        hoveredExp,
        displayedExp,
    };

    const actions = {
        setSelectedExp: useCallback((exp: (typeof experiences)[0]) => {
            setSelectedExpState(exp);
        }, []),
        setHoveredExp: useCallback((expId: string | null) => {
            setHoveredExpState(expId);
        }, []),
    };

    return { data, actions };
};
