import { render, screen } from '@testing-library/react';
import { TimelineLegend } from '../TimelineLegend';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

describe('TimelineLegend', () => {
    it('should render both legend texts', () => {
        render(<TimelineLegend />);

        expect(screen.getByText('experience.hoverPreview')).toBeInTheDocument();
        expect(screen.getByText('experience.tapSelect')).toBeInTheDocument();
    });

    it('should have correct responsive classes', () => {
        render(<TimelineLegend />);

        const hoverText = screen.getByText('experience.hoverPreview');
        const tapText = screen.getByText('experience.tapSelect');

        expect(hoverText).toHaveClass('hidden', 'sm:block');
        expect(tapText).toHaveClass('sm:hidden');
    });

    it('should have correct wrapper structure and classes', () => {
        const { container } = render(<TimelineLegend />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(
            'text-center',
            'text-sm',
            'text-gray-500',
            'mt-8'
        );
    });

    it('should translate legend keys', () => {
        render(<TimelineLegend />);

        // Verifies that t() is called with the correct keys
        expect(screen.getByText('experience.hoverPreview')).toBeInTheDocument();
        expect(screen.getByText('experience.tapSelect')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<TimelineLegend />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
