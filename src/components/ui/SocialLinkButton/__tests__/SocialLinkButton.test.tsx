import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import type { SocialLink } from '@data/index';
import { SocialLinkButton } from '../SocialLinkButton';

// Mock dependencies
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

const mockT = jest.fn();
const MockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div data-testid="mock-icon" className={className}>
        Icon
    </div>
);

const mockSocialLink: SocialLink = {
    id: 'github',
    nameKey: 'social.github',
    href: 'https://github.com/test',
    icon: MockIcon,
};

describe('SocialLinkButton', () => {
    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: mockT,
        });
        mockT.mockClear();
    });

    it('should render social link button correctly', () => {
        mockT.mockImplementation((key: string) => {
            if (key === 'social.github') return 'GitHub';
            return key;
        });

        render(<SocialLinkButton social={mockSocialLink} />);

        // Check if the link is rendered with correct href
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://github.com/test');

        // Check if external link attributes are set
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');

        // Check if aria-label is set with translated text
        expect(link).toHaveAttribute('aria-label', 'GitHub');

        // Check if the icon is rendered with correct className
        expect(screen.getByTestId('mock-icon')).toHaveClass('w-6 h-6');

        // Verify translation was called with correct key
        expect(mockT).toHaveBeenCalledWith('social.github');
    });

    it('should have correct CSS classes for styling', () => {
        mockT.mockReturnValue('GitHub');

        render(<SocialLinkButton social={mockSocialLink} />);

        const link = screen.getByRole('link');
        expect(link).toHaveClass(
            'w-12',
            'h-12',
            'bg-stone-50',
            'border',
            'border-stone-200',
            'rounded-lg',
            'shadow-sm',
            'hover:shadow-md',
            'flex',
            'items-center',
            'justify-center',
            'text-stone-600',
            'hover:text-stone-950',
            'transition-all'
        );
    });

    it('should render with different social link data', () => {
        const linkedinLink: SocialLink = {
            id: 'linkedin',
            nameKey: 'social.linkedin',
            href: 'https://linkedin.com/in/test',
            icon: MockIcon,
        };

        mockT.mockImplementation((key: string) => {
            if (key === 'social.linkedin') return 'LinkedIn';
            return key;
        });

        render(<SocialLinkButton social={linkedinLink} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://linkedin.com/in/test');
        expect(link).toHaveAttribute('aria-label', 'LinkedIn');
        expect(mockT).toHaveBeenCalledWith('social.linkedin');
    });
});
