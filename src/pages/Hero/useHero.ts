import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useNavigation } from '@contexts/NavigationContext';
import { SECTIONS } from '@utils/constants';

export const useHero = () => {
    const { t } = useTranslation();
    const { navigateToSection } = useNavigation();

    const handleNavigation = useCallback(
        (sectionId: string) => {
            if (navigateToSection) {
                navigateToSection(sectionId);
            }
        },
        [navigateToSection]
    );

    const data = {
        name: t('hero.name'),
        title: t('hero.title'),
        description: t('hero.description'),
        getInTouchText: t('hero.getInTouch'),
        viewExperienceText: t('hero.viewExperience'),
    };

    const actions = {
        navigateToContact: useCallback(
            () => handleNavigation(SECTIONS.CONTACT),
            [handleNavigation]
        ),
        navigateToExperience: useCallback(
            () => handleNavigation(SECTIONS.EXPERIENCE),
            [handleNavigation]
        ),
    };

    return {
        data,
        actions,
    };
};
