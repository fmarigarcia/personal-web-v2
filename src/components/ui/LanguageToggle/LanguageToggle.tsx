import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
    className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    className = '',
}) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: 'en' | 'es') => {
        i18n.changeLanguage(lang);
    };

    const getButtonClasses = (lang: 'en' | 'es') => {
        const baseClasses =
            'text-sm font-medium px-2 py-1 rounded transition-colors';
        const activeClasses = 'bg-blue-600 text-white';
        const inactiveClasses = 'text-gray-700 hover:text-blue-600';

        return `${baseClasses} ${
            i18n.language === lang ? activeClasses : inactiveClasses
        }`;
    };

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <button
                onClick={() => handleLanguageChange('en')}
                className={getButtonClasses('en')}
                type="button"
                aria-label="Switch to English"
            >
                EN
            </button>
            <button
                onClick={() => handleLanguageChange('es')}
                className={getButtonClasses('es')}
                type="button"
                aria-label="Switch to Spanish"
            >
                ES
            </button>
        </div>
    );
};

export default LanguageToggle;
