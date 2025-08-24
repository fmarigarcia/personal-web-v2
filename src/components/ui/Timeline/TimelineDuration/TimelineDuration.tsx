import React from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

interface TimelineDurationProps {
    duration: string;
    isSelected: boolean;
}

export const TimelineDuration: React.FC<TimelineDurationProps> = ({
    duration,
    isSelected,
}) => {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <p
                className={clsx(
                    'text-xs font-medium transition-colors duration-300',
                    {
                        'text-blue-600': isSelected,
                        'text-gray-600 group-hover:text-blue-500': !isSelected,
                    }
                )}
            >
                {t(duration)}
            </p>
        </div>
    );
};
