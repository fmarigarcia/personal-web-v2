import React from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

interface TimelinePositionProps {
    company: string;
    position: string;
    isSelected: boolean;
}

export const TimelinePosition: React.FC<TimelinePositionProps> = ({
    company,
    position,
    isSelected,
}) => {
    const { t } = useTranslation();

    return (
        <div className="text-center mb-8 w-32">
            <p
                className={clsx(
                    'text-sm font-bold transition-colors duration-300 leading-tight mb-1',
                    {
                        'text-stone-950': isSelected,
                        'text-stone-700 group-hover:text-stone-950':
                            !isSelected,
                    }
                )}
                title={company}
            >
                {company.split(' / ')[0]}
            </p>
            <p
                className={clsx(
                    'text-xs transition-colors duration-300 leading-tight',
                    {
                        'text-stone-900': isSelected,
                        'text-stone-500 group-hover:text-stone-700':
                            !isSelected,
                    }
                )}
            >
                {t(position)}
            </p>
        </div>
    );
};
