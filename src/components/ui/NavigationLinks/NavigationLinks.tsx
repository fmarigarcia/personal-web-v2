import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@contexts/NavigationContext';
import { NAVIGATION_ITEMS } from '@utils/constants';

interface NavigationLinksProps {
    onNavClick: (sectionId: string) => void;
    className?: string;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
    onNavClick,
    className = '',
}) => {
    const { t } = useTranslation();
    const { currentSection } = useNavigation();

    return (
        <div className={`hidden md:flex items-center space-x-8 ${className}`}>
            {NAVIGATION_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavClick(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                        currentSection === item.id
                            ? 'text-blue-600'
                            : 'text-gray-700'
                    }`}
                    type="button"
                    aria-label={`Go to ${t(item.labelKey)} section`}
                >
                    {t(item.labelKey)}
                </button>
            ))}
        </div>
    );
};

export default NavigationLinks;
