import React from 'react';
import type { ExperienceItem } from '@data/experiences';
import { TimelineLine } from './TimelineLine';
import { TimelineItems } from './TimelineItems';
import { TimelineLegend } from './TimelineLegend';

interface TimelineProps {
    experiences: ExperienceItem[];
    selectedExp: ExperienceItem;
    onSelectExp: (exp: ExperienceItem) => void;
    onHoverExp: (expId: string | null) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
    experiences,
    selectedExp,
    onSelectExp,
    onHoverExp,
}) => {
    return (
        <div className="mb-12">
            <div className="relative px-8 lg:px-16">
                <TimelineLine />
                <TimelineItems
                    experiences={experiences}
                    selectedExp={selectedExp}
                    onSelectExp={onSelectExp}
                    onHoverExp={onHoverExp}
                />
            </div>
            <TimelineLegend />
        </div>
    );
};
