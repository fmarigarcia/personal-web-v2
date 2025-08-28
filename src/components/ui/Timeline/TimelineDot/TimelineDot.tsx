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
                    'bg-stone-950 border-stone-950 scale-125 shadow-lg':
                        isSelected,
                    'bg-stone-50 border-stone-400 group-hover:bg-stone-100 group-hover:scale-110':
                        !isSelected,
                }
            )}
        />
    );
};
