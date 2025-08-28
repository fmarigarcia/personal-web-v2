import { render, screen } from '@testing-library/react';
import { TimelineDuration } from '../TimelineDuration';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

describe('TimelineDuration', () => {
    const defaultProps = {
        duration: 'test.duration.key',
        isSelected: false,
    };

    it('should render duration text', () => {
        render(<TimelineDuration {...defaultProps} />);

        expect(screen.getByText('test.duration.key')).toBeInTheDocument();
    });

    it('should apply selected styles when isSelected is true', () => {
        render(<TimelineDuration {...defaultProps} isSelected={true} />);

        const durationElement = screen.getByText('test.duration.key');
        expect(durationElement).toHaveClass('text-stone-950');
    });

    it('should apply unselected styles when isSelected is false', () => {
        render(<TimelineDuration {...defaultProps} isSelected={false} />);

        const durationElement = screen.getByText('test.duration.key');
        expect(durationElement).toHaveClass(
            'text-stone-600',
            'group-hover:text-stone-950'
        );
    });

    it('should have correct base classes', () => {
        render(<TimelineDuration {...defaultProps} />);

        const durationElement = screen.getByText('test.duration.key');
        expect(durationElement).toHaveClass(
            'text-xs',
            'font-medium',
            'transition-colors',
            'duration-300'
        );
    });

    it('should have correct wrapper structure', () => {
        const { container } = render(<TimelineDuration {...defaultProps} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass('text-center');
    });

    it('should translate duration key', () => {
        render(
            <TimelineDuration
                {...defaultProps}
                duration="experience.exp1.duration"
            />
        );

        expect(
            screen.getByText('experience.exp1.duration')
        ).toBeInTheDocument();
    });

    it('should match snapshot when selected', () => {
        const { container } = render(
            <TimelineDuration {...defaultProps} isSelected={true} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when not selected', () => {
        const { container } = render(
            <TimelineDuration {...defaultProps} isSelected={false} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
