import { render, screen } from '@testing-library/react';
import { ExperienceDetailsHeader } from '../ExperienceDetailsHeader';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

describe('ExperienceDetailsHeader', () => {
    const defaultProps = {
        company: 'Test Company',
        position: 'test.position.key',
        duration: 'test.duration.key',
    };

    it('should render company name, position and duration', () => {
        render(<ExperienceDetailsHeader {...defaultProps} />);

        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.getByText('test.position.key')).toBeInTheDocument();
        expect(screen.getByText('test.duration.key')).toBeInTheDocument();
    });

    it('should have correct heading structure', () => {
        render(<ExperienceDetailsHeader {...defaultProps} />);

        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveTextContent('Test Company');
        expect(heading).toHaveClass(
            'text-2xl',
            'lg:text-3xl',
            'font-bold',
            'text-gray-900',
            'mb-2'
        );
    });

    it('should style position correctly', () => {
        render(<ExperienceDetailsHeader {...defaultProps} />);

        const position = screen.getByText('test.position.key');
        expect(position).toHaveClass(
            'text-blue-600',
            'font-semibold',
            'text-lg',
            'lg:text-xl',
            'mb-2'
        );
    });

    it('should style duration correctly', () => {
        render(<ExperienceDetailsHeader {...defaultProps} />);

        const duration = screen.getByText('test.duration.key');
        expect(duration).toHaveClass('text-gray-500', 'font-medium');
    });

    it('should have correct wrapper structure', () => {
        const { container } = render(
            <ExperienceDetailsHeader {...defaultProps} />
        );

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(
            'mb-6',
            'border-b',
            'border-gray-100',
            'pb-6'
        );
    });

    it('should translate position and duration keys', () => {
        render(
            <ExperienceDetailsHeader
                {...defaultProps}
                position="experience.exp1.position"
                duration="experience.exp1.duration"
            />
        );

        expect(
            screen.getByText('experience.exp1.position')
        ).toBeInTheDocument();
        expect(
            screen.getByText('experience.exp1.duration')
        ).toBeInTheDocument();
    });

    it('should handle long company names', () => {
        render(
            <ExperienceDetailsHeader
                {...defaultProps}
                company="Very Long Company Name That Should Still Display Correctly"
            />
        );

        expect(
            screen.getByText(
                'Very Long Company Name That Should Still Display Correctly'
            )
        ).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <ExperienceDetailsHeader {...defaultProps} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
