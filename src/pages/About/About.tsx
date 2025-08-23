import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import { Section } from '@components/ui/Section';

export const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Section id={SECTIONS.ABOUT} backgroundColor="white" fullHeight>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('about.title')}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto" />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image Placeholder */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl aspect-square max-w-lg mx-auto flex items-center justify-center">
                            <div className="text-blue-600 text-6xl font-bold">
                                FM
                            </div>
                        </div>
                    </div>

                    {/* About Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div className="prose prose-lg text-gray-700">
                            <p className="text-xl leading-relaxed">
                                {t('about.description')}
                            </p>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {t('about.skills.frontend')}
                                </h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>React.js ⭐⭐⭐⭐⭐</div>
                                    <div>TypeScript ⭐⭐⭐⭐⭐</div>
                                    <div>Tailwind CSS ⭐⭐⭐⭐</div>
                                    <div>UX/UI Design ⭐⭐⭐⭐</div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {t('about.skills.backend')}
                                </h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>Elixir ⭐⭐⭐⭐</div>
                                    <div>Node.js ⭐⭐⭐⭐⭐</div>
                                    <div>GraphQL ⭐⭐⭐</div>
                                    <div>Symfony ⭐⭐⭐</div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {t('about.skills.toolsPractices')}
                                </h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>{t('about.skills.cleanCode')} ⭐⭐⭐⭐⭐</div>
                                    <div>{t('about.skills.aiTooling')} ⭐⭐⭐⭐</div>
                                    <div>{t('about.skills.tddCicd')}</div>
                                    <div>Figma ⭐⭐⭐⭐</div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {t('about.skills.languages')}
                                </h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <div>{t('about.skills.spanish')}</div>
                                    <div>{t('about.skills.catalan')}</div>
                                    <div>{t('about.skills.english')}</div>
                                    <div>{t('about.skills.teamwork')} ⭐⭐⭐⭐⭐</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
