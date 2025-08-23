import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationProvider } from '@contexts/NavigationContext';
import { Header } from '../Header';

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
        i18n: {
            changeLanguage: jest.fn(),
            language: 'en',
        },
    }),
}));

// Mock hooks
jest.mock('@hooks/useSmoothScroll', () => ({
    useSmoothScroll: () => ({
        scrollToElement: jest.fn(),
    }),
}));

describe('Header', () => {
    const renderHeader = () => {
        return render(
            <NavigationProvider>
                <Header />
            </NavigationProvider>
        );
    };

    it('should render navigation items', () => {
        renderHeader();

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Experience')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('should render language toggle buttons', () => {
        renderHeader();

        expect(
            screen.getByRole('button', { name: /switch to english/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /switch to spanish/i })
        ).toBeInTheDocument();
    });

    it('should handle navigation click', () => {
        renderHeader();

        const aboutLink = screen.getByText('About');
        fireEvent.click(aboutLink);

        // The click should not cause any errors
        expect(aboutLink).toBeInTheDocument();
    });

    it('should handle language change', () => {
        renderHeader();

        const spanishButton = screen.getByRole('button', {
            name: /switch to spanish/i,
        });
        fireEvent.click(spanishButton);

        // The click should not cause any errors
        expect(spanishButton).toBeInTheDocument();
    });

    it('should have proper accessibility attributes', () => {
        renderHeader();

        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
        expect(nav).toHaveAttribute('aria-label');

        const navLinks = screen.getAllByRole('button');
        navLinks.forEach((link) => {
            expect(link).toHaveAttribute('type', 'button');
        });
    });

    it('should match snapshot', () => {
        const { container } = renderHeader();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should be responsive', () => {
        renderHeader();

        const header = screen.getByRole('banner');
        expect(header).toHaveClass('fixed', 'top-0', 'w-full');
    });

    it('should highlight current section', () => {
        renderHeader();

        // The home/hero section should be active by default
        const homeLink = screen.getByText('Home');
        expect(homeLink.closest('button')).toHaveClass('text-blue-600');
    });
});
