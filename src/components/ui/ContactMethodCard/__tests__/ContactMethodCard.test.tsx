import { render, screen } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import type { ContactMethod } from '@data/index';
import { ContactMethodCard } from '../ContactMethodCard';

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

const mockContactMethod: ContactMethod = {
    id: 'email',
    icon: MockIcon,
    titleKey: 'contact.methods.email',
    value: 'test@example.com',
    href: 'mailto:test@example.com',
};

describe('ContactMethodCard', () => {
    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: mockT,
        });
        mockT.mockClear();
    });

    it('should render contact method information correctly', () => {
        mockT.mockImplementation((key: string) => {
            if (key === 'contact.methods.email') return 'Email';
            return key;
        });

        render(<ContactMethodCard method={mockContactMethod} />);

        // Check if the link is rendered with correct href
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'mailto:test@example.com');

        // Check if the title is translated and rendered
        expect(screen.getByText('Email')).toBeInTheDocument();

        // Check if the value is rendered
        expect(screen.getByText('test@example.com')).toBeInTheDocument();

        // Check if the icon is rendered with correct className
        expect(screen.getByTestId('mock-icon')).toHaveClass('w-6 h-6');

        // Verify translation was called with correct key
        expect(mockT).toHaveBeenCalledWith('contact.methods.email');
    });

    it('should have correct CSS classes for styling', () => {
        mockT.mockReturnValue('Email');

        render(<ContactMethodCard method={mockContactMethod} />);

        const link = screen.getByRole('link');
        expect(link).toHaveClass(
            'flex',
            'items-center',
            'p-4',
            'bg-stone-50',
            'rounded-lg',
            'shadow-sm',
            'hover:shadow-md',
            'transition-shadow'
        );

        const iconContainer = link.firstChild as HTMLElement;
        expect(iconContainer).toHaveClass(
            'flex-shrink-0',
            'w-12',
            'h-12',
            'bg-stone-100',
            'rounded-lg',
            'flex',
            'items-center',
            'justify-center',
            'text-stone-950',
            'mr-4'
        );
    });

    it('should render with different contact method data', () => {
        const phoneMethod: ContactMethod = {
            id: 'phone',
            icon: MockIcon,
            titleKey: 'contact.methods.phone',
            value: '+1-555-123-4567',
            href: 'tel:+15551234567',
        };

        mockT.mockImplementation((key: string) => {
            if (key === 'contact.methods.phone') return 'Phone';
            return key;
        });

        render(<ContactMethodCard method={phoneMethod} />);

        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            'tel:+15551234567'
        );
        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('+1-555-123-4567')).toBeInTheDocument();
    });
});
