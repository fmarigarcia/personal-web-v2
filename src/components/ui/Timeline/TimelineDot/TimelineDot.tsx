import React from 'react';
import { clsx } from 'clsx';

interface TimelineDotProps {
    isSelected: boolean;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({ isSelected }) => {
    return (
        <div
            className={clsx(
                'w-4 h-4 rounded-full border-3 transition-all duration-300 mb-4',
                {
                    'bg-blue-600 border-blue-600 scale-125 shadow-lg':
                        isSelected,
                    'bg-white border-blue-600 group-hover:bg-blue-100 group-hover:scale-110':
                        !isSelected,
                }
            )}
        />
    );
};
