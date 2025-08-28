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
        expect(section).toHaveClass('bg-stone-50');
    });

    it('should apply gray-50 background', () => {
        render(<Section {...defaultProps} backgroundColor="gray-50" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('bg-stone-50');
    });

    it('should apply gradient background', () => {
        render(<Section {...defaultProps} backgroundColor="gradient" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('bg-gradient-to-br');
        expect(section).toHaveClass('from-stone-50');
        expect(section).toHaveClass('to-stone-100');
    });

    it('should apply custom className', () => {
        render(<Section {...defaultProps} className="custom-class" />);

        const section = document.getElementById('test-section');
        expect(section).toHaveClass('custom-class');
    });

    it('should have correct padding styles for regular sections', () => {
        render(<Section {...defaultProps} />);

        const section = document.getElementById('test-section');
        expect(section).not.toHaveAttribute('style'); // No style attribute for regular sections
    });

    it('should match snapshot', () => {
        const { container } = render(<Section {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with gradient', () => {
        const { container } = render(
            <Section
                {...defaultProps}
                backgroundColor="gradient"
                className="custom-hero"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
