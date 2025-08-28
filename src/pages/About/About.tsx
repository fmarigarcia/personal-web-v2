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
                {/* Responsive Layout using flexbox and breakpoints */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center space-y-8 lg:space-y-0">
                    {/* Profile Image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-center">
                        <div className="rounded-2xl overflow-hidden w-64 h-64 lg:w-full lg:h-auto lg:max-w-lg lg:aspect-square shadow-lg lg:mx-auto">
                            <img
                                src="/profile_pic.jpg"
                                alt={t('about.profileImageAlt')}
                                className="w-full h-full lg:h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* About Content */}
                    <div className="order-2 lg:order-1 space-y-6">
                        {/* Description - Centered on mobile, left-aligned on desktop */}
                        <div className="text-center lg:text-left">
                            <div className="prose prose-lg text-gray-700 mx-auto lg:mx-0">
                                <p className="text-xl leading-relaxed">
                                    {t('about.description')}
                                </p>
                            </div>
                        </div>

                        {/* Skills Grid - Single column on mobile, 2x2 on desktop */}
                        <div className="flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 mt-8">
                            {skillGroups.map((group) => (
                                <div
                                    key={group.id}
                                    className="p-4 bg-gray-50 rounded-lg"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-2 text-center lg:text-left">
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
