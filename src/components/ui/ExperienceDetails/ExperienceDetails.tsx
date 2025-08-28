import React from 'react';
import { ExperienceDetailsHeader } from './ExperienceDetailsHeader';
import { ExperienceDetailsDescription } from './ExperienceDetailsDescription';
import { ExperienceDetailsTechnologies } from './ExperienceDetailsTechnologies';
import type { ExperienceItem } from '../../../types/data';

interface ExperienceDetailsProps {
    experience: ExperienceItem;
}

export const ExperienceDetails: React.FC<ExperienceDetailsProps> = ({
    experience,
}) => {
    return (
        <div className="lg:flex-1 lg:max-w-4xl max-w-none mx-auto w-full">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg h-full flex flex-col transition-all duration-300">
                <ExperienceDetailsHeader
                    company={experience.company}
                    position={experience.position}
                    duration={experience.duration}
                />
                <div className="flex-1">
                    <ExperienceDetailsDescription
                        experienceId={experience.id}
                        descriptionKeys={experience.descriptionKeys}
                    />
                    <ExperienceDetailsTechnologies
                        experienceId={experience.id}
                        technologies={experience.technologies}
                    />
                </div>
            </div>
        </div>
    );
};
