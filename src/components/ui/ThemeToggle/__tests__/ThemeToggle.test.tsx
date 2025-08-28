import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

// Mock the hooks
const mockToggleTheme = jest.fn();
const mockSetTheme = jest.fn();
const mockUsePlatform = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('@contexts/ThemeContext', () => ({
    useTheme: () => mockUseTheme(),
}));

jest.mock('@hooks/usePlatform', () => ({
    usePlatform: () => mockUsePlatform(),
}));

describe('ThemeToggle', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Setup default mocks
        mockUseTheme.mockReturnValue({
            data: {
                theme: 'light',
                isDark: false,
                isLight: true,
            },
            actions: {
                toggleTheme: mockToggleTheme,
                setTheme: mockSetTheme,
            },
        });

        // Reset to desktop by default
        mockUsePlatform.mockReturnValue({
            data: {
                isDesktop: true,
                isMobile: false,
                isTablet: false,
            },
        });
    });

    it('should render theme toggle button on desktop', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
        expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('should not render on mobile', () => {
        mockUsePlatform.mockReturnValue({
            data: {
                isDesktop: false,
                isMobile: true,
                isTablet: false,
            },
        });

        const { container } = render(<ThemeToggle />);
        expect(container.firstChild).toBeNull();
    });

    it('should call toggleTheme when clicked', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should display moon icon in light mode', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        const svg = button.querySelector('svg');

        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('text-gray-700');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    });

    it('should display sun icon in dark mode', () => {
        mockUseTheme.mockReturnValue({
            data: {
                theme: 'dark',
                isDark: true,
                isLight: false,
            },
            actions: {
                toggleTheme: mockToggleTheme,
                setTheme: mockSetTheme,
            },
        });

        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        const svg = button.querySelector('svg');

        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('text-yellow-500');
        expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });

    it('should have correct button styling', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'flex',
            'items-center',
            'justify-center',
            'w-10',
            'h-10',
            'rounded-lg',
            'bg-gray-100',
            'hover:bg-gray-200',
            'dark:bg-gray-700',
            'dark:hover:bg-gray-600',
            'transition-colors',
            'duration-200'
        );
    });

    it('should match snapshot in light mode', () => {
        const { container } = render(<ThemeToggle />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
