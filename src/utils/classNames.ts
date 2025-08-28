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
        'bg-stone-950',
        'text-white',
        'hover:bg-stone-900',
        'focus:ring-stone-400',
        // Dark mode: terminal vibe with green accents
        'dark:bg-green-400',
        'dark:text-zinc-950',
        'dark:hover:bg-green-300',
        'dark:focus:ring-green-200'
    ),
    secondary: clsx(
        buttonBase,
        'border',
        'border-stone-400',
        'text-stone-700',
        'hover:border-stone-500',
        'hover:text-stone-800',
        'hover:bg-stone-50',
        'focus:ring-stone-400',
        // Dark mode: terminal vibe
        'dark:border-green-400',
        'dark:text-green-200',
        'dark:hover:border-green-300',
        'dark:hover:text-white',
        'dark:hover:bg-zinc-900',
        'dark:focus:ring-green-200'
    ),
    disabled: clsx(
        buttonBase,
        'bg-stone-300',
        'text-stone-500',
        'cursor-not-allowed',
        // Dark mode
        'dark:bg-zinc-800',
        'dark:text-zinc-500'
    ),
};

// Input field classes
export const inputClasses = clsx(
    'w-full',
    'px-4',
    'py-3',
    'border',
    'border-stone-300',
    'rounded-lg',
    'focus:ring-2',
    'focus:ring-stone-400',
    'focus:border-stone-400',
    'transition-colors',
    'bg-stone-50/50',
    // Dark mode: terminal vibe
    'dark:bg-zinc-900',
    'dark:border-zinc-700',
    'dark:text-green-200',
    'dark:placeholder-zinc-500',
    'dark:focus:ring-green-400',
    'dark:focus:border-green-400'
);

// Card classes
export const cardClasses = clsx(
    'bg-stone-50',
    'rounded-lg',
    'shadow-sm',
    'hover:shadow-md',
    'transition-shadow',
    'border',
    'border-stone-200',
    // Dark mode: terminal vibe
    'dark:bg-zinc-900',
    'dark:border-zinc-700',
    'dark:hover:shadow-lg',
    'dark:hover:shadow-green-400/5'
);

// Typography classes
export const headingClasses = {
    h1: 'text-5xl md:text-7xl font-bold text-stone-800 mb-4 leading-tight dark:text-white',
    h2: 'text-4xl md:text-5xl font-bold text-stone-800 mb-4 dark:text-green-400',
    h3: 'text-2xl md:text-3xl font-medium text-stone-700 dark:text-green-200',
    subtitle: 'text-xl text-stone-600 dark:text-zinc-400',
    body: 'text-xl text-stone-700 leading-relaxed dark:text-zinc-300',
};

// Chip component classes
export const chipClasses = {
    base: 'font-medium rounded-full transition-all duration-200',
    variants: {
        primary:
            'bg-stone-100 text-stone-800 hover:bg-stone-200 dark:bg-zinc-800 dark:text-green-200 dark:hover:bg-zinc-700',
        secondary:
            'bg-stone-50 text-stone-800 hover:bg-stone-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800',
        success:
            'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-400/20 dark:text-green-200 dark:hover:bg-green-400/30',
        warning:
            'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-200 dark:hover:bg-yellow-400/30',
    },
    sizes: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-2 text-base',
    },
    interactive: 'cursor-pointer',
};

// Section background classes
export const sectionBackgrounds = {
    white: 'bg-stone-50 dark:bg-zinc-950',
    'gray-50': 'bg-stone-50 dark:bg-zinc-950',
    gradient:
        'bg-gradient-to-br from-stone-50 to-stone-100 dark:from-zinc-950 dark:to-zinc-900',
};
