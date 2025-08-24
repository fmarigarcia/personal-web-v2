import { render, screen } from '@testing-library/react';
import type { ExperienceItem } from '@data/experiences';
import { ExperienceDetails } from '../ExperienceDetails';

// Mock component interfaces
interface MockHeaderProps {
    company: string;
    position: string;
    duration: string;
}

interface MockDescriptionProps {
    experienceId: string;
    descriptionKeys: string[];
}

interface MockTechnologiesProps {
    experienceId: string;
    technologies: string[];
}

// Mock the sub-components
jest.mock('../ExperienceDetailsHeader', () => ({
    ExperienceDetailsHeader: ({ company, position, duration }: MockHeaderProps) => (
        <div data-testid="experience-details-header">
            {company} - {position} - {duration}
        </div>
    ),
}));

jest.mock('../ExperienceDetailsDescription', () => ({
    ExperienceDetailsDescription: ({ experienceId, descriptionKeys }: MockDescriptionProps) => (
        <div data-testid="experience-details-description">
            {experienceId}: {descriptionKeys.join(', ')}
        </div>
    ),
}));

jest.mock('../ExperienceDetailsTechnologies', () => ({
    ExperienceDetailsTechnologies: ({ experienceId, technologies }: MockTechnologiesProps) => (
        <div data-testid="experience-details-technologies">
            {experienceId}: {technologies.join(', ')}
        </div>
    ),
}));

const mockExperience: ExperienceItem = {
    id: 'exp-1',
    company: 'Test Company',
    position: 'test.position',
    duration: 'test.duration',
    descriptionKeys: ['desc1', 'desc2', 'desc3'],
    technologies: ['React', 'TypeScript', 'Node.js'],
};

describe('ExperienceDetails', () => {
    it('should render all sub-components', () => {
        render(<ExperienceDetails experience={mockExperience} />);

        expect(screen.getByTestId('experience-details-header')).toBeInTheDocument();
        expect(screen.getByTestId('experience-details-description')).toBeInTheDocument();
        expect(screen.getByTestId('experience-details-technologies')).toBeInTheDocument();
    });

    it('should pass correct props to ExperienceDetailsHeader', () => {
        render(<ExperienceDetails experience={mockExperience} />);

        const header = screen.getByTestId('experience-details-header');
        expect(header).toHaveTextContent('Test Company - test.position - test.duration');
    });

    it('should pass correct props to ExperienceDetailsDescription', () => {
        render(<ExperienceDetails experience={mockExperience} />);

        const description = screen.getByTestId('experience-details-description');
        expect(description).toHaveTextContent('exp-1: desc1, desc2, desc3');
    });

    it('should pass correct props to ExperienceDetailsTechnologies', () => {
        render(<ExperienceDetails experience={mockExperience} />);

        const technologies = screen.getByTestId('experience-details-technologies');
        expect(technologies).toHaveTextContent('exp-1: React, TypeScript, Node.js');
    });

    it('should have correct outer container structure', () => {
        const { container } = render(<ExperienceDetails experience={mockExperience} />);

        const outerWrapper = container.firstChild as HTMLElement;
        expect(outerWrapper).toHaveClass('flex-1', 'max-w-4xl', 'mx-auto', 'w-full');
    });

    it('should have correct inner container structure', () => {
        const { container } = render(<ExperienceDetails experience={mockExperience} />);

        const innerWrapper = container.querySelector('.bg-white');
        expect(innerWrapper).toHaveClass(
            'bg-white',
            'rounded-2xl',
            'p-6',
            'lg:p-8',
            'shadow-lg',
            'h-full',
            'flex',
            'flex-col',
            'transition-all',
            'duration-300'
        );
    });

    it('should have flex-1 wrapper for description and technologies', () => {
        const { container } = render(<ExperienceDetails experience={mockExperience} />);

        const flexWrapper = container.querySelector('.flex-1');
        expect(flexWrapper).toBeInTheDocument();
        expect(flexWrapper).toContainElement(screen.getByTestId('experience-details-description'));
        expect(flexWrapper).toContainElement(screen.getByTestId('experience-details-technologies'));
    });

    it('should handle different experience data', () => {
        const differentExperience: ExperienceItem = {
            id: 'exp-2',
            company: 'Another Company',
            position: 'different.position',
            duration: 'different.duration',
            descriptionKeys: ['different.desc'],
            technologies: ['Vue.js'],
        };

        render(<ExperienceDetails experience={differentExperience} />);

        expect(screen.getByText('Another Company - different.position - different.duration')).toBeInTheDocument();
        expect(screen.getByText('exp-2: different.desc')).toBeInTheDocument();
        expect(screen.getByText('exp-2: Vue.js')).toBeInTheDocument();
    });

    it('should handle experience with empty arrays', () => {
        const emptyExperience: ExperienceItem = {
            id: 'exp-empty',
            company: 'Empty Company',
            position: 'empty.position',
            duration: 'empty.duration',
            descriptionKeys: [],
            technologies: [],
        };

        render(<ExperienceDetails experience={emptyExperience} />);

        expect(screen.getByText('Empty Company - empty.position - empty.duration')).toBeInTheDocument();
        expect(screen.getAllByText('exp-empty:')).toHaveLength(2); // Both description and technologies show this
    });

    it('should match snapshot', () => {
        const { container } = render(<ExperienceDetails experience={mockExperience} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
