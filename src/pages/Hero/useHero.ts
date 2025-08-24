import { useTranslation } from 'react-i18next';
import { useNavigation } from '@contexts/NavigationContext';
import { SECTIONS } from '@utils/constants';

export const useHero = () => {
    const { t } = useTranslation();
    const { navigateToSection } = useNavigation();

    const handleNavigation = (sectionId: string) => {
        if (navigateToSection) {
            navigateToSection(sectionId);
        }
    };

    const data = {
        name: t('hero.name'),
        title: t('hero.title'),
        description: t('hero.description'),
        getInTouchText: t('hero.getInTouch'),
        viewExperienceText: t('hero.viewExperience'),
    };

    const actions = {
        navigateToContact: () => handleNavigation(SECTIONS.CONTACT),
        navigateToExperience: () => handleNavigation(SECTIONS.EXPERIENCE),
    };

    return {
        data,
        actions,
    };
};
