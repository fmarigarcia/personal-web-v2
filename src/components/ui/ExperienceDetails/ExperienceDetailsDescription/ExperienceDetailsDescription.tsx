import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExperienceDetailsDescriptionProps {
    experienceId: string;
    descriptionKeys: string[];
}

export const ExperienceDetailsDescription: React.FC<
    ExperienceDetailsDescriptionProps
> = ({ experienceId, descriptionKeys }) => {
    const { t } = useTranslation();

    return (
        <ul className="space-y-4 mb-8">
            {descriptionKeys.map((descKey, i) => (
                <li key={`${experienceId}-${i}`} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                        {t(descKey)}
                    </span>
                </li>
            ))}
        </ul>
    );
};
