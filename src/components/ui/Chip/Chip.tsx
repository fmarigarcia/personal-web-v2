import React from 'react';
import { clsx } from 'clsx';
import { chipClasses } from '@utils/classNames';

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
    const classes = clsx(
        chipClasses.base,
        chipClasses.variants[variant],
        chipClasses.sizes[size],
        onClick && chipClasses.interactive,
        className
    );

    const Component = onClick ? 'button' : 'span';

    return (
        <Component className={classes} onClick={onClick}>
            {children}
        </Component>
    );
};
