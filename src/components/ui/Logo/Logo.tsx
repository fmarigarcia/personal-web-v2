import React from 'react';

interface LogoProps {
    onClick?: () => void;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <button
                onClick={onClick}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                type="button"
                aria-label="Go to home"
            >
                FM
            </button>
        </div>
    );
};

export default Logo;
