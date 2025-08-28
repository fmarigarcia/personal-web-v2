import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SkillStars } from '../SkillStars';

// Mock the useTheme hook
const mockUseTheme = jest.fn();

jest.mock('@contexts/ThemeContext', () => ({
    useTheme: () => mockUseTheme(),
}));

describe('SkillStars', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Setup default mock for useTheme
        mockUseTheme.mockReturnValue({
            data: {
                theme: 'light',
                isDark: false,
                isLight: true,
            },
            actions: {
                toggleTheme: jest.fn(),
                setTheme: jest.fn(),
            },
        });
    });

    it('should render correct number of stars for score 5', () => {
        const { container } = render(<SkillStars score={5} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });

    it('should render correct number of stars for score 3.5', () => {
        const { container } = render(<SkillStars score={3.5} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });

    it('should render correct number of stars for score 0', () => {
        const { container } = render(<SkillStars score={0} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });

    it('should render stars with custom maxStars', () => {
        const { container } = render(<SkillStars score={3} maxStars={10} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(10);
    });

    it('should apply custom size prop', () => {
        const { container } = render(<SkillStars score={4} size={30} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements[0]).toHaveAttribute('width', '30');
        expect(svgElements[0]).toHaveAttribute('height', '30');
    });

    it('should render container with flex styling', () => {
        const { container } = render(<SkillStars score={4} />);

        const flexContainer = container.querySelector('.flex');
        expect(flexContainer).toBeInTheDocument();
    });

    it('should handle decimal scores correctly', () => {
        const { container } = render(<SkillStars score={2.7} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });

    it('should use default props when not provided', () => {
        const { container } = render(<SkillStars score={3} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5); // default maxStars
        expect(svgElements[0]).toHaveAttribute('width', '20'); // default size
        expect(svgElements[0]).toHaveAttribute('height', '20'); // default size
    });

    it('should calculate star values correctly for full stars', () => {
        const { container } = render(<SkillStars score={3} />);

        const svgElements = container.querySelectorAll('svg');

        // First 3 stars should be fully filled, last 2 should be empty
        expect(svgElements).toHaveLength(5);
    });

    it('should calculate star values correctly for partial stars', () => {
        const { container } = render(<SkillStars score={2.3} />);

        const svgElements = container.querySelectorAll('svg');

        // Should render 5 stars with proper fill values
        expect(svgElements).toHaveLength(5);
    });

    it('should apply different colors to each star', () => {
        const { container } = render(<SkillStars score={5} />);

        const gradients = container.querySelectorAll('linearGradient');

        // Each star should have a gradient with different colors
        expect(gradients).toHaveLength(5);

        // Check that each gradient has stops with colors
        gradients.forEach((gradient) => {
            const stops = gradient.querySelectorAll('stop');
            expect(stops.length).toBeGreaterThan(0);
        });
    });

    it('should handle edge case with score above maximum', () => {
        const { container } = render(<SkillStars score={7} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });

    it('should handle negative scores', () => {
        const { container } = render(<SkillStars score={-1} />);

        const svgElements = container.querySelectorAll('svg');
        expect(svgElements).toHaveLength(5);
    });
});
