import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationProvider } from '@contexts/NavigationContext';
import { ThemeProvider } from '@contexts/ThemeContext';
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
                'nav.mainNavigation': 'Main navigation',
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
        data: {},
        actions: {
            scrollToElement: jest.fn(),
        },
    }),
}));

// Mock platform hook
jest.mock('@hooks/usePlatform', () => ({
    usePlatform: () => ({
        data: {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        },
    }),
}));

// Mock localStorage
const mockLocalStorage = {
    getItem: jest.fn().mockReturnValue(null),
    setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('Header', () => {
    const renderHeader = () => {
        return render(
            <ThemeProvider>
                <NavigationProvider>
                    <Header />
                </NavigationProvider>
            </ThemeProvider>
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

        // Check navigation buttons specifically (not theme toggle)
        const navButtons = screen.getAllByRole('button').filter((button) => {
            const text = button.textContent;
            return ['Home', 'About', 'Experience', 'Contact'].includes(
                text || ''
            );
        });

        navButtons.forEach((button) => {
            expect(button).toHaveAttribute('type', 'button');
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
        expect(homeLink.closest('button')).toHaveClass('text-stone-950');
    });
});
