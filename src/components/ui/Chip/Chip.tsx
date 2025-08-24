import React from 'react';
import { clsx } from 'clsx';

interface ChipProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
}

export const Chip: React.FC<ChipProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    className = '',
}) => {
    const baseClasses = 'font-medium rounded-full transition-all duration-200';

    const variantClasses = {
        primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    const interactiveClasses = onClick ? 'cursor-pointer' : '';

    const classes = clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        interactiveClasses,
        className
    );

    const Component = onClick ? 'button' : 'span';

    return (
        <Component className={classes} onClick={onClick}>
            {children}
        </Component>
    );
};
