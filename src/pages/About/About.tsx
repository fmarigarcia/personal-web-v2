import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import { Section, SkillStars } from '@components/ui';
import { skillGroups } from '@data/index';

export const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Section
            id={SECTIONS.ABOUT}
            backgroundColor="white"
            title={t('about.title')}
        >
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <div className="order-2 lg:order-1">
                        <div className="rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
                            <img
                                src="/profile_pic.jpg"
                                alt={t('about.profileImageAlt')}
                                className="w-full h-auto object-cover aspect-square"
                            />
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
                            {skillGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        {t(group.titleKey)}
                                    </h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        {group.skills.map((skill) => (
                                            <div
                                                key={skill.id}
                                                className="flex items-center justify-between"
                                            >
                                                <span>
                                                    {skill.name ||
                                                        t(skill.nameKey || '')}
                                                </span>
                                                {skill.score && (
                                                    <SkillStars
                                                        score={skill.score}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
