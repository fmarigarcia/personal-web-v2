import { render, screen, fireEvent } from '@testing-library/react';
import { DotNavigation } from '../DotNavigation';
import { NavigationProvider } from '@contexts/NavigationContext';

// Mock i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.experience': 'Experience',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',
            };
            return translations[key] || key;
        },
    }),
}));

// Mock hooks
const mockScrollToElement = jest.fn();
jest.mock('@hooks/useSmoothScroll', () => ({
    useSmoothScroll: () => ({
        scrollToElement: mockScrollToElement,
    }),
}));

describe('DotNavigation', () => {
    beforeEach(() => {
        mockScrollToElement.mockClear();
    });

    const renderDotNavigation = (props = {}) => {
        return render(
            <NavigationProvider>
                <DotNavigation {...props} />
            </NavigationProvider>
        );
    };

    it('should render navigation dots for all sections', () => {
        renderDotNavigation();

        // Should have 5 dots (one for each section)
        const dots = screen.getAllByRole('button');
        expect(dots).toHaveLength(5);

        // Check aria-labels contain section names
        expect(
            screen.getByRole('button', { name: /go to home section/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /go to about section/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /go to experience section/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /go to projects section/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /go to contact section/i })
        ).toBeInTheDocument();
    });

    it('should handle dot click navigation', () => {
        renderDotNavigation();

        const aboutDot = screen.getByRole('button', {
            name: /go to about section/i,
        });
        fireEvent.click(aboutDot);

        expect(mockScrollToElement).toHaveBeenCalledWith('about');
    });

    it('should highlight the current section', () => {
        renderDotNavigation();

        // Default current section should be 'hero'
        const homeDot = screen.getByRole('button', {
            name: /go to home section/i,
        });
        expect(homeDot).toHaveClass('bg-blue-600', 'border-blue-600');

        // Other dots should not be active
        const aboutDot = screen.getByRole('button', {
            name: /go to about section/i,
        });
        expect(aboutDot).toHaveClass('bg-transparent', 'border-gray-400');
    });

    it('should have proper accessibility attributes', () => {
        renderDotNavigation();

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label', 'Section navigation');

        const dots = screen.getAllByRole('button');
        dots.forEach((dot) => {
            expect(dot).toHaveAttribute('aria-label');
            expect(dot).toHaveAttribute('type', 'button');
        });
    });

    it('should apply custom className', () => {
        const customClass = 'custom-dot-nav';
        renderDotNavigation({ className: customClass });

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass(customClass);
    });

    it('should be positioned fixed on the right side', () => {
        renderDotNavigation();

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass(
            'fixed',
            'right-6',
            'top-1/2',
            '-translate-y-1/2',
            'z-40'
        );
    });

    it('should match snapshot', () => {
        const { container } = renderDotNavigation();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should have hover and focus states', () => {
        renderDotNavigation();

        const dots = screen.getAllByRole('button');

        dots.forEach((dot) => {
            expect(dot).toHaveClass('hover:scale-125');
            expect(dot).toHaveClass(
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-blue-500'
            );
        });
    });
});
