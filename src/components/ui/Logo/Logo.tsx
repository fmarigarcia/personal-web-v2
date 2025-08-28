import React from 'react';
import clsx from 'clsx';

interface LogoProps {
    onClick?: () => void;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
    return (
        <div className={clsx('flex items-center', className)}>
            <button
                onClick={onClick}
                className="text-xl font-bold text-stone-800 hover:text-stone-950 transition-colors"
                type="button"
                aria-label="Go to home"
            >
                FM
            </button>
        </div>
    );
};

export default Logo;
