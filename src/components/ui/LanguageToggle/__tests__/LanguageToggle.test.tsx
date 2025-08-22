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

    it('should render language toggle buttons', () => {
        render(<LanguageToggle />);

        expect(
            screen.getByRole('button', { name: /switch to english/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /switch to spanish/i })
        ).toBeInTheDocument();
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

    it('should match snapshot', () => {
        const { container } = render(<LanguageToggle />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
