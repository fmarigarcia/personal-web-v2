import React from 'react';
import { useTranslation } from 'react-i18next';

export const TimelineLegend: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center text-sm text-gray-500 mt-8">
            <p className="hidden sm:block">{t('experience.hoverPreview')}</p>
            <p className="sm:hidden">{t('experience.tapSelect')}</p>
        </div>
    );
};
