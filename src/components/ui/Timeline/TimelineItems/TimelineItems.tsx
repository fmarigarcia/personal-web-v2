import React from 'react';
import type { ExperienceItem } from '@data/experiences';
import { TimelinePosition } from '../TimelinePosition';
import { TimelineDot } from '../TimelineDot';
import { TimelineDuration } from '../TimelineDuration';

interface TimelineItemsProps {
    experiences: ExperienceItem[];
    selectedExp: ExperienceItem;
    onSelectExp: (exp: ExperienceItem) => void;
    onHoverExp: (expId: string | null) => void;
}

export const TimelineItems: React.FC<TimelineItemsProps> = ({
    experiences,
    selectedExp,
    onSelectExp,
    onHoverExp,
}) => {
    return (
        <div className="flex justify-between items-start relative z-10">
            {experiences.map((exp) => {
                const isSelected = selectedExp.id === exp.id;

                return (
                    <button
                        key={exp.id}
                        className="flex flex-col items-center group cursor-pointer min-w-0 max-w-40"
                        onClick={() => onSelectExp(exp)}
                        onMouseEnter={() => onHoverExp(exp.id)}
                        onMouseLeave={() => onHoverExp(null)}
                    >
                        <TimelinePosition
                            company={exp.company}
                            position={exp.position}
                            isSelected={isSelected}
                        />
                        <TimelineDot isSelected={isSelected} />
                        <TimelineDuration
                            duration={exp.duration}
                            isSelected={isSelected}
                        />
                    </button>
                );
            })}
        </div>
    );
};
