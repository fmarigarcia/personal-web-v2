import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenuButton } from '../MobileMenuButton';

describe('MobileMenuButton', () => {
    it('should render mobile menu button', () => {
        render(<MobileMenuButton />);

        const button = screen.getByRole('button', {
            name: /open mobile menu/i,
        });
        expect(button).toBeInTheDocument();
    });

    it('should handle click when onClick prop is provided', () => {
        const mockOnClick = jest.fn();
        render(<MobileMenuButton onClick={mockOnClick} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should show hamburger icon when menu is closed', () => {
        render(<MobileMenuButton isOpen={false} />);

        const button = screen.getByRole('button');
        const svg = button.querySelector('svg');
        const path = svg?.querySelector('path');

        expect(path).toHaveAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });

    it('should show close icon when menu is open', () => {
        render(<MobileMenuButton isOpen={true} />);

        const button = screen.getByRole('button');
        const svg = button.querySelector('svg');
        const path = svg?.querySelector('path');

        expect(path).toHaveAttribute('d', 'M6 18L18 6M6 6l12 12');
    });

    it('should update aria-label based on isOpen state', () => {
        const { rerender } = render(<MobileMenuButton isOpen={false} />);

        let button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Open mobile menu');

        rerender(<MobileMenuButton isOpen={true} />);

        button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Close mobile menu');
    });

    it('should update aria-expanded based on isOpen state', () => {
        const { rerender } = render(<MobileMenuButton isOpen={false} />);

        let button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'false');

        rerender(<MobileMenuButton isOpen={true} />);

        button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should apply custom className', () => {
        const customClass = 'custom-mobile-button';
        render(<MobileMenuButton className={customClass} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(customClass);
    });

    it('should be hidden on desktop by default', () => {
        render(<MobileMenuButton />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('md:hidden');
    });

    it('should have proper accessibility attributes', () => {
        render(<MobileMenuButton />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-label');
        expect(button).toHaveAttribute('aria-expanded');
    });

    it('should have hover styles', () => {
        render(<MobileMenuButton />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('hover:text-blue-600', 'transition-colors');
    });

    it('should not crash when clicked without onClick prop', () => {
        render(<MobileMenuButton />);

        const button = screen.getByRole('button');
        expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should match snapshot when closed', () => {
        const { container } = render(<MobileMenuButton isOpen={false} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when open', () => {
        const { container } = render(<MobileMenuButton isOpen={true} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
