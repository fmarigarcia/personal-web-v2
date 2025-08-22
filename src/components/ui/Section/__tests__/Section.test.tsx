import { render, screen } from '@testing-library/react';
import { Section } from '../Section';

describe('Section', () => {
    const defaultProps = {
        id: 'test-section',
        children: <div>Test content</div>,
    };

    it('should render with basic props', () => {
        render(<Section {...defaultProps} />);

        const section = document.getElementById('test-section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('id', 'test-section');
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should apply white background by default', () => {
        render(<Section {...defaultProps} />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('bg-white');
        expect(section).not.toHaveClass('min-h-screen');
    });

    it('should apply full height when fullHeight is true', () => {
        render(<Section {...defaultProps} fullHeight />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('min-h-screen');
    });

    it('should apply gray-50 background', () => {
        render(<Section {...defaultProps} backgroundColor="gray-50" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('bg-gray-50');
    });

    it('should apply gradient background', () => {
        render(<Section {...defaultProps} backgroundColor="gradient" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('bg-gradient-to-br');
        expect(section).toHaveClass('from-gray-50');
        expect(section).toHaveClass('to-gray-100');
    });

    it('should apply custom className', () => {
        render(<Section {...defaultProps} className="custom-class" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('custom-class');
    });

    it('should have correct padding styles for fullHeight sections', () => {
        render(<Section {...defaultProps} fullHeight />);

        const section = document.getElementById('test-section');
        expect(section).toHaveStyle({ paddingTop: '80px' });
    });

    it('should have correct padding styles for regular sections', () => {
        render(<Section {...defaultProps} />);

        const section = document.getElementById('test-section');
        expect(section).toHaveStyle({ paddingTop: '0' });
        expect(section).toHaveStyle({ paddingBottom: '5rem' });
    });

    it('should match snapshot', () => {
        const { container } = render(<Section {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with full height and gradient', () => {
        const { container } = render(
            <Section
                {...defaultProps}
                fullHeight
                backgroundColor="gradient"
                className="custom-hero"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
