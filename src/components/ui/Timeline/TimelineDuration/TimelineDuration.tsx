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
                        'text-stone-950 dark:text-green-400': isSelected,
                        'text-stone-600 dark:text-zinc-400 group-hover:text-stone-950 dark:group-hover:text-green-400':
                            !isSelected,
                    }
                )}
            >
                {t(duration)}
            </p>
        </div>
    );
};
