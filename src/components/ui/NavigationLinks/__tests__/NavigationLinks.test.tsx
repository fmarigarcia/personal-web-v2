import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationProvider } from '@contexts/NavigationContext';
import { NavigationLinks } from '../NavigationLinks';

// Mock i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.experience': 'Experience',
                'nav.contact': 'Contact',
            };
            return translations[key] || key;
        },
    }),
}));

describe('NavigationLinks', () => {
    const mockOnNavClick = jest.fn();

    beforeEach(() => {
        mockOnNavClick.mockClear();
    });

    const renderNavigationLinks = (props = {}) => {
        return render(
            <NavigationProvider>
                <NavigationLinks onNavClick={mockOnNavClick} {...props} />
            </NavigationProvider>
        );
    };

    it('should render all navigation items', () => {
        renderNavigationLinks();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should handle navigation clicks', () => {
        renderNavigationLinks();

        const aboutButton = screen.getByText('About');
        fireEvent.click(aboutButton);

        expect(mockOnNavClick).toHaveBeenCalledWith('about');
    });

    it('should highlight current section', () => {
        renderNavigationLinks();

        // Hero should be highlighted by default
        const homeButton = screen.getByText('Home');
        expect(homeButton).toHaveClass('text-stone-950');

        // Other buttons should not be highlighted
        const aboutButton = screen.getByText('About');
        expect(aboutButton).toHaveClass('text-stone-700');
    });

    it('should have proper accessibility attributes', () => {
        renderNavigationLinks();

        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toHaveAttribute('type', 'button');
            expect(button).toHaveAttribute('aria-label');
        });
    });

    it('should apply custom className', () => {
        const customClass = 'custom-nav';
        const { container } = renderNavigationLinks({ className: customClass });

        const navContainer = container.querySelector('div');
        expect(navContainer).toHaveClass(customClass);
    });

    it('should be hidden on mobile by default', () => {
        const { container } = renderNavigationLinks();

        const navContainer = container.querySelector('div');
        expect(navContainer).toHaveClass('hidden', 'md:flex');
    });

    it('should have hover styles', () => {
        renderNavigationLinks();

        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toHaveClass(
                'hover:text-stone-950',
                'transition-colors'
            );
        });
    });

    it('should match snapshot', () => {
        const { container } = renderNavigationLinks();
        expect(container.firstChild).toMatchSnapshot();
    });
});
