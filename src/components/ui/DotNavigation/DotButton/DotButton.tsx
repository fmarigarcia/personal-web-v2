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
                'focus:ring-blue-500 focus:ring-offset-2',
                {
                    'bg-blue-600 border-blue-600 scale-110': isActive,
                    'bg-transparent border-gray-400 hover:border-blue-500':
                        !isActive,
                }
            )}
            type="button"
        >
            {/* Tooltip */}
            <span
                className={clsx(
                    'absolute right-full mr-3 px-2 py-1',
                    'bg-gray-900 text-white text-xs rounded',
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
