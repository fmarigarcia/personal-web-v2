import clsx from 'clsx';

/**
 * Common button class combinations using clsx for better maintainability
 */

// Base button classes shared across all buttons
const buttonBase = [
    'inline-flex',
    'items-center',
    'px-8',
    'py-4',
    'font-medium',
    'rounded-lg',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
];

// Button variants
export const buttonVariants = {
    primary: clsx(
        buttonBase,
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-500'
    ),
    secondary: clsx(
        buttonBase,
        'border',
        'border-gray-300',
        'text-gray-700',
        'hover:border-gray-400',
        'hover:text-gray-900',
        'focus:ring-gray-500'
    ),
    disabled: clsx(
        buttonBase,
        'bg-gray-400',
        'text-gray-200',
        'cursor-not-allowed'
    ),
};

// Input field classes
export const inputClasses = clsx(
    'w-full',
    'px-4',
    'py-3',
    'border',
    'border-gray-300',
    'rounded-lg',
    'focus:ring-2',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'transition-colors'
);

// Card classes
export const cardClasses = clsx(
    'bg-white',
    'rounded-lg',
    'shadow-sm',
    'hover:shadow-md',
    'transition-shadow'
);

// Typography classes
export const headingClasses = {
    h1: 'text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight',
    h2: 'text-4xl md:text-5xl font-bold text-gray-900 mb-4',
    h3: 'text-2xl md:text-3xl font-medium',
    subtitle: 'text-xl text-gray-600',
    body: 'text-xl text-gray-700 leading-relaxed',
};
