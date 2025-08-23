import { useTranslation } from 'react-i18next';
import { useNavigation } from '@contexts/NavigationContext';
import { SECTIONS } from '@utils/constants';
import { Section } from '@components/ui/Section';
import { buttonVariants, headingClasses } from '@utils/classNames';

export const Hero: React.FC = () => {
    const { t } = useTranslation();
    const { navigateToSection } = useNavigation();

    const handleNavigation = (sectionId: string) => {
        if (navigateToSection) {
            navigateToSection(sectionId);
        }
    };

    return (
        <Section
            id={SECTIONS.HERO}
            fullHeight
            backgroundColor="gradient"
            className="flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className={headingClasses.h1}>{t('hero.name')}</h1>
                    <h2 className={`${headingClasses.h3} text-blue-600 mb-6`}>
                        {t('hero.title')}
                    </h2>
                    <p className={`${headingClasses.body} max-w-2xl mx-auto`}>
                        {t('hero.description')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => handleNavigation(SECTIONS.CONTACT)}
                        className={buttonVariants.primary}
                    >
                        {t('hero.getInTouch')}
                    </button>
                    <button
                        onClick={() => handleNavigation(SECTIONS.EXPERIENCE)}
                        className={buttonVariants.secondary}
                    >
                        {t('hero.viewExperience')}
                    </button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
