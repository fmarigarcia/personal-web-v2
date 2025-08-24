import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import { Section, Timeline } from '@components/ui';
import { useExperience } from './useExperience';

export const Experience: React.FC = () => {
    const { t } = useTranslation();
    const { data, actions } = useExperience();
    const { experiences, selectedExp, displayedExp } = data;
    const { setSelectedExp, setHoveredExp } = actions;

    return (
        <Section
            id={SECTIONS.EXPERIENCE}
            backgroundColor="gray-50"
            title={t('experience.title')}
        >
            <div className="max-w-6xl min-w-5xl mx-auto h-full flex flex-col justify-center py-20">
                <div className="flex-1 flex flex-col min-w-full">
                    {/* Horizontal Timeline */}
                    <Timeline
                        experiences={experiences}
                        selectedExp={selectedExp}
                        onSelectExp={setSelectedExp}
                        onHoverExp={setHoveredExp}
                    />

                    {/* Experience Details */}
                    <div className="flex-1 max-w-4xl mx-auto w-full">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg h-full flex flex-col transition-all duration-300">
                            {/* Header */}
                            <div className="mb-6 border-b border-gray-100 pb-6">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                    {displayedExp.company}
                                </h3>
                                <p className="text-blue-600 font-semibold text-lg lg:text-xl mb-2">
                                    {t(displayedExp.position)}
                                </p>
                                <p className="text-gray-500 font-medium">
                                    {t(displayedExp.duration)}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="flex-1">
                                <ul className="space-y-4 mb-8">
                                    {displayedExp.descriptionKeys.map(
                                        (descKey, i) => (
                                            <li
                                                key={`${displayedExp.id}-${i}`}
                                                className="flex items-start"
                                            >
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0" />
                                                <span className="text-gray-700 leading-relaxed">
                                                    {t(descKey)}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* Technologies */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                        {t('experience.technologiesSkills')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {displayedExp.technologies.map(
                                            (tech) => (
                                                <span
                                                    key={`${displayedExp.id}-${tech}`}
                                                    className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full transition-all duration-200 hover:bg-blue-200"
                                                >
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Experience;
