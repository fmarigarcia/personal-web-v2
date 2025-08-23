import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useNavigation } from '@contexts/NavigationContext';
import { NAVIGATION_ITEMS } from '@utils/constants';

interface DotNavigationProps {
    className?: string;
}

export const DotNavigation: React.FC<DotNavigationProps> = ({
    className = '',
}) => {
    const { t } = useTranslation();
    const { currentSection, navigateToSection } = useNavigation();

    const handleDotClick = (sectionId: string) => {
        if (navigateToSection) {
            navigateToSection(sectionId);
        }
    };

    return (
        <nav
            className={clsx(
                'fixed right-6 top-1/2 -translate-y-1/2 z-40',
                className
            )}
            aria-label="Section navigation"
            role="navigation"
        >
            <ul className="space-y-3">
                {NAVIGATION_ITEMS.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => handleDotClick(item.id)}
                            aria-label={`Go to ${t(item.labelKey)} section`}
                            className={clsx(
                                'relative block w-3 h-3 rounded-full border-2',
                                'transition-all duration-300 ease-in-out',
                                'hover:scale-125 focus:outline-none focus:ring-2',
                                'focus:ring-blue-500 focus:ring-offset-2',
                                {
                                    'bg-blue-600 border-blue-600 scale-110':
                                        currentSection === item.id,
                                    'bg-transparent border-gray-400 hover:border-blue-500':
                                        currentSection !== item.id,
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
                                {t(item.labelKey)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DotNavigation;
