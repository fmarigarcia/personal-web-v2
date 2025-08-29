import React from 'react';
import clsx from 'clsx';
import { Logo } from '@icons/Logo';
import { useTheme } from '@contexts/ThemeContext';
import { LOGO_COLORS } from '@utils/constants';

interface LogoProps {
    onClick?: () => void;
    className?: string;
}

export const SiteLogo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
    const {
        data: { theme },
    } = useTheme();
    return (
        <div className={clsx('flex items-center', className)}>
            <button
                onClick={onClick}
                className="text-xl font-bold text-stone-800 dark:text-green-400 hover:text-stone-950 dark:hover:text-green-300 transition-colors"
                type="button"
                aria-label="Go to home"
            >
                <Logo fill={LOGO_COLORS[theme]} />
            </button>
        </div>
    );
};

export default SiteLogo;
