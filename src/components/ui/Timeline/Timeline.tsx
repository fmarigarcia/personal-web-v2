import React from 'react';
import { usePlatform } from '@hooks/usePlatform';
import { TimelineLine } from './TimelineLine';
import { TimelineItems } from './TimelineItems';
import { TimelineLegend } from './TimelineLegend';
import type { ExperienceItem } from '../../../types/data';

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
    const {
        data: { isDesktop },
    } = usePlatform();
    return (
        <div className="mb-12">
            <div className="relative lg:px-16 max-w-full overflow-scroll">
                {isDesktop && <TimelineLine />}
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
