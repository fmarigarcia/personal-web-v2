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
                    'bg-stone-950 border-stone-950 scale-125 shadow-lg dark:bg-green-400 dark:border-green-400 dark:shadow-green-400/50':
                        isSelected,
                    'bg-stone-50 border-stone-400 group-hover:bg-stone-100 group-hover:scale-110 dark:bg-zinc-900 dark:border-zinc-600 dark:group-hover:bg-zinc-800 dark:group-hover:border-green-400':
                        !isSelected,
                }
            )}
        />
    );
};
