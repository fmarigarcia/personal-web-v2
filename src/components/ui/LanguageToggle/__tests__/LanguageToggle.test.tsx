import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '../LanguageToggle';

// Mock i18next
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            language: 'en',
            changeLanguage: mockChangeLanguage,
        },
    }),
}));

describe('LanguageToggle', () => {
    beforeEach(() => {
        mockChangeLanguage.mockClear();
    });

    it('should render language toggle buttons with flags', () => {
        render(<LanguageToggle />);

        expect(
            screen.getByRole('button', { name: /switch to english/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /switch to spanish/i })
        ).toBeInTheDocument();

        // Check that flags are displayed
        expect(screen.getByText('🇺🇸')).toBeInTheDocument();
        expect(screen.getByText('🇪🇸')).toBeInTheDocument();
    });

    it('should render custom languages when provided', () => {
        const customLanguages = [
            { code: 'fr', flag: '🇫🇷', label: 'French' },
            { code: 'de', flag: '🇩🇪', label: 'German' },
        ];

        render(<LanguageToggle languages={customLanguages} />);

        expect(
            screen.getByRole('button', { name: /switch to french/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /switch to german/i })
        ).toBeInTheDocument();
        expect(screen.getByText('🇫🇷')).toBeInTheDocument();
        expect(screen.getByText('🇩🇪')).toBeInTheDocument();
    });

    it('should highlight active language', () => {
        render(<LanguageToggle />);

        const enButton = screen.getByRole('button', {
            name: /switch to english/i,
        });
        const esButton = screen.getByRole('button', {
            name: /switch to spanish/i,
        });

        // English should be active by default
        expect(enButton).toHaveClass('bg-blue-600', 'text-white');
        expect(esButton).toHaveClass('text-gray-700');
    });

    it('should handle language change to Spanish', () => {
        render(<LanguageToggle />);

        const esButton = screen.getByRole('button', {
            name: /switch to spanish/i,
        });
        fireEvent.click(esButton);

        expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('should handle language change to English', () => {
        render(<LanguageToggle />);

        const enButton = screen.getByRole('button', {
            name: /switch to english/i,
        });
        fireEvent.click(enButton);

        expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    it('should handle custom language changes', () => {
        const customLanguages = [
            { code: 'fr', flag: '🇫🇷', label: 'French' },
            { code: 'de', flag: '🇩🇪', label: 'German' },
        ];

        render(<LanguageToggle languages={customLanguages} />);

        const frButton = screen.getByRole('button', {
            name: /switch to french/i,
        });
        fireEvent.click(frButton);

        expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
    });

    it('should apply custom className', () => {
        const customClass = 'custom-language-toggle';
        const { container } = render(
            <LanguageToggle className={customClass} />
        );

        const toggleContainer = container.querySelector('div');
        expect(toggleContainer).toHaveClass(customClass);
    });

    it('should have proper accessibility attributes', () => {
        render(<LanguageToggle />);

        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toHaveAttribute('type', 'button');
            expect(button).toHaveAttribute('aria-label');
        });
    });

    it('should have hover styles for inactive buttons', () => {
        render(<LanguageToggle />);

        const esButton = screen.getByRole('button', {
            name: /switch to spanish/i,
        });
        expect(esButton).toHaveClass(
            'hover:text-blue-600',
            'transition-colors'
        );
    });

    it('should handle single language array', () => {
        const singleLanguage = [{ code: 'en', flag: '🇺🇸', label: 'English' }];

        render(<LanguageToggle languages={singleLanguage} />);

        expect(
            screen.getByRole('button', { name: /switch to english/i })
        ).toBeInTheDocument();
        expect(screen.getByText('🇺🇸')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('should match snapshot with default languages', () => {
        const { container } = render(<LanguageToggle />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with custom languages', () => {
        const customLanguages = [
            { code: 'fr', flag: '🇫🇷', label: 'French' },
            { code: 'de', flag: '🇩🇪', label: 'German' },
        ];

        const { container } = render(
            <LanguageToggle languages={customLanguages} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
