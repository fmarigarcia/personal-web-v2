import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExperienceDetailsHeaderProps {
    company: string;
    position: string;
    duration: string;
}

export const ExperienceDetailsHeader: React.FC<ExperienceDetailsHeaderProps> = ({
    company,
    position,
    duration,
}) => {
    const { t } = useTranslation();

    return (
        <div className="mb-6 border-b border-gray-100 pb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {company}
            </h3>
            <p className="text-blue-600 font-semibold text-lg lg:text-xl mb-2">
                {t(position)}
            </p>
            <p className="text-gray-500 font-medium">
                {t(duration)}
            </p>
        </div>
    );
};
