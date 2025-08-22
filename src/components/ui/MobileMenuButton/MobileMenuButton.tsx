import React from 'react';

interface MobileMenuButtonProps {
    onClick?: () => void;
    isOpen?: boolean;
    className?: string;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
    onClick,
    isOpen = false,
    className = '',
}) => {
    return (
        <button
            onClick={onClick}
            className={`md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors ${className}`}
            type="button"
            aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isOpen}
        >
            <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>
    );
};

export default MobileMenuButton;
