import React from 'react';
import clsx from 'clsx';

interface DotButtonProps {
    isActive: boolean;
    label: string;
    onClick: () => void;
}

export const DotButton: React.FC<DotButtonProps> = ({
    isActive,
    label,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            aria-label={`Go to ${label} section`}
            className={clsx(
                'group relative block w-3 h-3 rounded-full border-2',
                'transition-all duration-300 ease-in-out',
                'hover:scale-125 focus:outline-none focus:ring-2',
                'focus:ring-stone-400 focus:ring-offset-2',
                {
                    'bg-stone-950 border-stone-950 scale-110': isActive,
                    'bg-transparent border-stone-400 hover:border-stone-950':
                        !isActive,
                }
            )}
            type="button"
        >
            {/* Tooltip */}
            <span
                className={clsx(
                    'absolute right-full mr-3 px-2 py-1',
                    'bg-stone-800 text-white text-xs rounded',
                    'opacity-0 pointer-events-none',
                    'transition-opacity duration-200',
                    'whitespace-nowrap top-1/2 -translate-y-1/2',
                    'group-hover:opacity-100'
                )}
            >
                {label}
            </span>
        </button>
    );
};
