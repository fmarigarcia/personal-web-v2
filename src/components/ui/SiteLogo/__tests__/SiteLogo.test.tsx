import { render, screen, fireEvent } from '@testing-library/react';
import { SiteLogo } from '../SiteLogo';

// Mock the Logo component from icons
jest.mock('@icons/Logo', () => ({
    Logo: ({ fill }: { fill?: string }) => (
        <svg data-testid="logo-svg" width="32" height="32">
            <path fill={fill} />
        </svg>
    ),
}));

// Mock the theme context
jest.mock('@contexts/ThemeContext', () => ({
    useTheme: () => ({
        data: { theme: 'light' },
    }),
}));

// Mock the constants
jest.mock('@utils/constants', () => ({
    LOGO_COLORS: {
        light: '#000',
        dark: '#fff',
    },
}));

describe('SiteLogo', () => {
    it('should render logo with SVG', () => {
        render(<SiteLogo />);

        const button = screen.getByRole('button', { name: /go to home/i });
        const svg = screen.getByTestId('logo-svg');

        expect(button).toBeInTheDocument();
        expect(svg).toBeInTheDocument();
    });

    it('should handle click when onClick prop is provided', () => {
        const mockOnClick = jest.fn();
        render(<SiteLogo onClick={mockOnClick} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not crash when clicked without onClick prop', () => {
        render(<SiteLogo />);

        const button = screen.getByRole('button');
        expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should apply custom className', () => {
        const customClass = 'custom-logo';
        render(<SiteLogo className={customClass} />);

        const logoContainer = screen.getByRole('button').parentElement;
        expect(logoContainer).toHaveClass(customClass);
    });

    it('should have proper accessibility attributes', () => {
        render(<SiteLogo />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
        expect(button).toHaveAttribute('aria-label', 'Go to home');
    });

    it('should have hover styles', () => {
        render(<SiteLogo />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('hover:text-stone-950', 'transition-colors');
    });

    it('should match snapshot', () => {
        const { container } = render(<SiteLogo />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
