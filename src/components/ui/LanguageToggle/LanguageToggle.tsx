import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { SUPPORTED_LANGUAGES } from '@utils/constants';
import type { Language } from '../../../types/ui';

interface LanguageToggleProps {
    className?: string;
    languages?: Language[];
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
    className = '',
    languages = SUPPORTED_LANGUAGES,
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
                            'bg-stone-950 text-white':
                                i18n.language === language.code,
                            'text-stone-700 hover:text-stone-950':
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
