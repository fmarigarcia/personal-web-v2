import { useTranslation } from 'react-i18next';
import { useSmoothScroll } from '@hooks/useSmoothScroll';
import { SECTIONS } from '@utils/constants';
import { Section } from '@components/ui/Section';

export const Hero: React.FC = () => {
    const { t } = useTranslation();
    const { scrollToElement } = useSmoothScroll();

    return (
        <Section
            id={SECTIONS.HERO}
            fullHeight
            backgroundColor="gradient"
            className="flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 leading-tight">
                        {t('hero.name')}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-blue-600 mb-6">
                        {t('hero.title')}
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        {t('hero.description')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => scrollToElement(SECTIONS.CONTACT)}
                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Get In Touch
                    </button>
                    <button
                        onClick={() => scrollToElement(SECTIONS.EXPERIENCE)}
                        className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        View Experience
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
