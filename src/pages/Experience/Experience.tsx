import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import { experiences } from '@data/experiences';
import { Section } from '@components/ui/Section';

export const Experience: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Section id={SECTIONS.EXPERIENCE} backgroundColor="gray-50" fullHeight>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('experience.title')}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto" />
                </div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Timeline connector */}
                            {index !== experiences.length - 1 && (
                                <div className="hidden lg:block absolute left-1/2 top-full w-px h-12 bg-gradient-to-b from-blue-600 to-transparent transform -translate-x-1/2" />
                            )}

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Company & Duration */}
                                <div className="lg:text-right">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {exp.company}
                                    </h3>
                                    <p className="text-blue-600 font-semibold mb-2">
                                        {t(exp.position)}
                                    </p>
                                    <p className="text-gray-500 font-medium">
                                        {t(exp.duration)}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="lg:col-span-2">
                                    <ul className="space-y-3 mb-6">
                                        {exp.descriptionKeys.map(
                                            (descKey, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start"
                                                >
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700 leading-relaxed">
                                                        {t(descKey)}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Experience;
