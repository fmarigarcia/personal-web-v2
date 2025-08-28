import { render, screen, fireEvent } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
    it('should render logo with default text', () => {
        render(<Logo />);

        const logo = screen.getByRole('button', { name: /go to home/i });
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveTextContent('FM');
    });

    it('should handle click when onClick prop is provided', () => {
        const mockOnClick = jest.fn();
        render(<Logo onClick={mockOnClick} />);

        const logo = screen.getByRole('button');
        fireEvent.click(logo);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not crash when clicked without onClick prop', () => {
        render(<Logo />);

        const logo = screen.getByRole('button');
        expect(() => fireEvent.click(logo)).not.toThrow();
    });

    it('should apply custom className', () => {
        const customClass = 'custom-logo';
        render(<Logo className={customClass} />);

        const logoContainer = screen.getByRole('button').parentElement;
        expect(logoContainer).toHaveClass(customClass);
    });

    it('should have proper accessibility attributes', () => {
        render(<Logo />);

        const logo = screen.getByRole('button');
        expect(logo).toHaveAttribute('type', 'button');
        expect(logo).toHaveAttribute('aria-label', 'Go to home');
    });

    it('should have hover styles', () => {
        render(<Logo />);

        const logo = screen.getByRole('button');
        expect(logo).toHaveClass('hover:text-stone-950', 'transition-colors');
    });

    it('should match snapshot', () => {
        const { container } = render(<Logo />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
