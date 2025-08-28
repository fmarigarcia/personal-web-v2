import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
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
        <div
            className={clsx('hidden md:flex items-center space-x-8', className)}
        >
            {NAVIGATION_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onNavClick(item.id)}
                    className={clsx(
                        'text-sm font-medium transition-colors hover:text-stone-950 dark:hover:text-green-400',
                        {
                            'text-stone-950 dark:text-green-400':
                                currentSection === item.id,
                            'text-stone-700 dark:text-green-200':
                                currentSection !== item.id,
                        }
                    )}
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
