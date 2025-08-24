import { render, screen } from '@testing-library/react';
import { ExperienceDetailsTechnologies } from '../ExperienceDetailsTechnologies';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

// Mock the Chip component
interface MockChipProps {
    children: React.ReactNode;
    variant: string;
}

jest.mock('../../../Chip', () => ({
    Chip: ({ children, variant }: MockChipProps) => (
        <span data-testid="chip" data-variant={variant}>
            {children}
        </span>
    ),
}));

describe('ExperienceDetailsTechnologies', () => {
    const defaultProps = {
        experienceId: 'exp-1',
        technologies: ['React', 'TypeScript', 'Node.js'],
    };

    it('should render section heading', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        expect(screen.getByText('experience.technologiesSkills')).toBeInTheDocument();
    });

    it('should have correct heading structure and classes', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        const heading = screen.getByRole('heading', { level: 4 });
        expect(heading).toHaveTextContent('experience.technologiesSkills');
        expect(heading).toHaveClass(
            'text-sm',
            'font-semibold',
            'text-gray-900',
            'mb-4',
            'uppercase',
            'tracking-wide'
        );
    });

    it('should render all technology chips', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();

        const chips = screen.getAllByTestId('chip');
        expect(chips).toHaveLength(3);
    });

    it('should pass correct variant to Chip components', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        const chips = screen.getAllByTestId('chip');
        chips.forEach(chip => {
            expect(chip).toHaveAttribute('data-variant', 'primary');
        });
    });

    it('should have correct container structure', () => {
        const { container } = render(<ExperienceDetailsTechnologies {...defaultProps} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.tagName).toBe('DIV');

        const chipsContainer = container.querySelector('.flex.flex-wrap.gap-2');
        expect(chipsContainer).toBeInTheDocument();
    });

    it('should generate correct keys for chips', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        // Keys are generated as `${experienceId}-${tech}` but we can't directly test them
        // We can verify that all technologies are rendered uniquely
        const chips = screen.getAllByTestId('chip');
        const techTexts = chips.map(chip => chip.textContent);
        expect(techTexts).toEqual(['React', 'TypeScript', 'Node.js']);
    });

    it('should handle empty technologies array', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} technologies={[]} />);

        expect(screen.getByText('experience.technologiesSkills')).toBeInTheDocument();
        
        const chips = screen.queryAllByTestId('chip');
        expect(chips).toHaveLength(0);
    });

    it('should handle single technology', () => {
        render(
            <ExperienceDetailsTechnologies
                {...defaultProps}
                technologies={['JavaScript']}
            />
        );

        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        
        const chips = screen.getAllByTestId('chip');
        expect(chips).toHaveLength(1);
    });

    it('should handle technologies with special characters', () => {
        render(
            <ExperienceDetailsTechnologies
                {...defaultProps}
                technologies={['React.js', 'Node.js', 'C++']}
            />
        );

        expect(screen.getByText('React.js')).toBeInTheDocument();
        expect(screen.getByText('Node.js')).toBeInTheDocument();
        expect(screen.getByText('C++')).toBeInTheDocument();
    });

    it('should translate the section heading', () => {
        render(<ExperienceDetailsTechnologies {...defaultProps} />);

        // Verifies that t() is called with the correct key
        expect(screen.getByText('experience.technologiesSkills')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<ExperienceDetailsTechnologies {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with empty technologies', () => {
        const { container } = render(
            <ExperienceDetailsTechnologies
                {...defaultProps}
                technologies={[]}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with many technologies', () => {
        const manyTechnologies = [
            'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
            'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions'
        ];
        
        const { container } = render(
            <ExperienceDetailsTechnologies
                {...defaultProps}
                technologies={manyTechnologies}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
