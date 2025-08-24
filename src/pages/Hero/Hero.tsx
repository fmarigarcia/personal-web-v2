import { SECTIONS } from '@utils/constants';
import { headingClasses } from '@utils/classNames';
import { Section, Button, ScrollIndicator } from '@components/ui';
import { useHero } from './useHero';

export const Hero: React.FC = () => {
    const { data, actions } = useHero();

    return (
        <Section
            id={SECTIONS.HERO}
            fullHeight
            backgroundColor="gradient"
            className="flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className={headingClasses.h1}>{data.name}</h1>
                    <h2 className={`${headingClasses.h3} text-blue-600 mb-6`}>
                        {data.title}
                    </h2>
                    <p className={`${headingClasses.body} max-w-2xl mx-auto`}>
                        {data.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        variant="primary"
                        onClick={actions.navigateToContact}
                    >
                        {data.getInTouchText}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={actions.navigateToExperience}
                    >
                        {data.viewExperienceText}
                    </Button>
                </div>

                <ScrollIndicator />
            </div>
        </Section>
    );
};

export default Hero;
