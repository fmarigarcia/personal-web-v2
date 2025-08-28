import { useTranslation } from 'react-i18next';
import { SECTIONS } from '@utils/constants';
import { Section, Timeline, ExperienceDetails } from '@components/ui';
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
            <div className="max-w-full lg:max-w-6xl lg:min-w-5xl mx-auto h-full flex flex-col justify-center lg:py-20">
                <div className="flex-1 flex flex-col min-w-full">
                    {/* Horizontal Timeline */}
                    <Timeline
                        experiences={experiences}
                        selectedExp={selectedExp}
                        onSelectExp={setSelectedExp}
                        onHoverExp={setHoveredExp}
                    />

                    {/* Experience Details */}
                    <ExperienceDetails experience={displayedExp} />
                </div>
            </div>
        </Section>
    );
};

export default Experience;
