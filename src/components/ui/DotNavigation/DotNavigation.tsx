import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useNavigation } from '@contexts/NavigationContext';
import { NAVIGATION_ITEMS } from '@utils/constants';
import { DotButton } from './DotButton';

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
                        <DotButton
                            isActive={currentSection === item.id}
                            label={t(item.labelKey)}
                            onClick={() => handleDotClick(item.id)}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default DotNavigation;
