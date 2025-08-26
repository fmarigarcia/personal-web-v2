import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { Language } from '../../../types/ui';

interface LanguageToggleProps {
    className?: string;
    languages?: Language[];
}

const defaultLanguages: Language[] = [
    { code: 'en', flag: '🇺🇸', label: 'English' },
    { code: 'es', flag: '🇪🇸', label: 'Spanish' },
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    className = '',
    languages = defaultLanguages,
}) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <div className={clsx('flex items-center space-x-2', className)}>
            {languages.map((language) => (
                <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={clsx(
                        'text-sm font-medium px-2 py-1 rounded transition-colors',
                        {
                            'bg-blue-600 text-white':
                                i18n.language === language.code,
                            'text-gray-700 hover:text-blue-600':
                                i18n.language !== language.code,
                        }
                    )}
                    type="button"
                    aria-label={`Switch to ${language.label}`}
                >
                    {language.flag}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;
