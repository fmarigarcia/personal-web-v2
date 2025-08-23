import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { clsx } from 'clsx';
import { SECTIONS } from '@utils/constants';
import { experiences } from '@data/experiences';
import { Section } from '@components/ui/Section';

export const Experience: React.FC = () => {
    const { t } = useTranslation();

    // Show the most recent experience (first in array) by default
    const [selectedExp, setSelectedExp] = useState(experiences[0]);
    const [hoveredExp, setHoveredExp] = useState<string | null>(null);

    // Use hovered experience if available, otherwise use selected
    const displayedExp = hoveredExp
        ? experiences.find((exp) => exp.id === hoveredExp) || selectedExp
        : selectedExp;

    return (
        <Section id={SECTIONS.EXPERIENCE} backgroundColor="gray-50" fullHeight>
            <div className="max-w-6xl min-w-5xl mx-auto h-full flex flex-col justify-center py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('experience.title')}
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto" />
                </div>

                <div className="flex-1 flex flex-col min-w-full">
                    {/* Horizontal Timeline */}
                    <div className="mb-12">
                        <div className="relative px-8 lg:px-16">
                            {/* Timeline line */}
                            <div className="absolute top-16 left-16 right-16 h-0.5 bg-gray-300" />

                            {/* Timeline items */}
                            <div className="flex justify-between items-start relative z-10">
                                {experiences.map((exp) => (
                                    <button
                                        key={exp.id}
                                        className="flex flex-col items-center group cursor-pointer min-w-0 max-w-40"
                                        onClick={() => setSelectedExp(exp)}
                                        onMouseEnter={() =>
                                            setHoveredExp(exp.id)
                                        }
                                        onMouseLeave={() => setHoveredExp(null)}
                                    >
                                        {/* Company name and position */}
                                        <div className="text-center mb-8 max-w-32">
                                            <p
                                                className={clsx(
                                                    'text-sm font-bold transition-colors duration-300 leading-tight mb-1',
                                                    {
                                                        'text-blue-600':
                                                            selectedExp.id ===
                                                            exp.id,
                                                        'text-gray-700 group-hover:text-blue-500':
                                                            selectedExp.id !==
                                                            exp.id,
                                                    }
                                                )}
                                                title={exp.company}
                                            >
                                                {exp.company.split(' / ')[0]}
                                            </p>
                                            <p
                                                className={clsx(
                                                    'text-xs transition-colors duration-300 leading-tight',
                                                    {
                                                        'text-blue-500':
                                                            selectedExp.id ===
                                                            exp.id,
                                                        'text-gray-500 group-hover:text-blue-400':
                                                            selectedExp.id !==
                                                            exp.id,
                                                    }
                                                )}
                                            >
                                                {t(exp.position)}
                                            </p>
                                        </div>

                                        {/* Timeline dot */}
                                        <div
                                            className={clsx(
                                                'w-4 h-4 rounded-full border-3 transition-all duration-300 mb-4',
                                                {
                                                    'bg-blue-600 border-blue-600 scale-125 shadow-lg':
                                                        selectedExp.id ===
                                                        exp.id,
                                                    'bg-white border-blue-600 group-hover:bg-blue-100 group-hover:scale-110':
                                                        selectedExp.id !==
                                                        exp.id,
                                                }
                                            )}
                                        />

                                        {/* Duration */}
                                        <div className="text-center">
                                            <p
                                                className={clsx(
                                                    'text-xs font-medium transition-colors duration-300',
                                                    {
                                                        'text-blue-600':
                                                            selectedExp.id ===
                                                            exp.id,
                                                        'text-gray-600 group-hover:text-blue-500':
                                                            selectedExp.id !==
                                                            exp.id,
                                                    }
                                                )}
                                            >
                                                {t(exp.duration)}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="text-center text-sm text-gray-500 mt-8">
                            <p className="hidden sm:block">
                                {t('experience.hoverPreview')}
                            </p>
                            <p className="sm:hidden">{t('experience.tapSelect')}</p>
                        </div>
                    </div>

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
