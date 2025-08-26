import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../Chip';

interface ExperienceDetailsTechnologiesProps {
    experienceId: string;
    technologies: string[];
}

export const ExperienceDetailsTechnologies: React.FC<
    ExperienceDetailsTechnologiesProps
> = ({ experienceId, technologies }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                {t('experience.technologiesSkills')}
            </h4>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                    <Chip key={`${experienceId}-${tech}`} variant="primary">
                        {tech}
                    </Chip>
                ))}
            </div>
        </div>
    );
};
