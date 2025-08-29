import { render, screen } from '@testing-library/react';
import { CVDownloadButton } from '../CVDownloadButton';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => {
            if (key === 'experience.downloadCV') return 'Download CV';
            return key;
        }),
    }),
}));

// Mock the Button component
jest.mock('@components/ui', () => ({
    Button: ({
        children,
        onClick,
        className,
        ...props
    }: Record<string, unknown>) => (
        <button
            onClick={onClick as () => void}
            className={className as string}
            {...props}
        >
            {children as React.ReactNode}
        </button>
    ),
}));

// Mock the icon
jest.mock('react-icons/hi2', () => ({
    HiArrowDownTray: () => <span data-testid="download-icon">↓</span>,
}));

describe('CVDownloadButton', () => {
    it('should render correctly', () => {
        render(<CVDownloadButton />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Download CV')).toBeInTheDocument();
        expect(screen.getByTestId('download-icon')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        render(<CVDownloadButton className="test-class" />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('test-class');
    });

    it('should have correct aria-label', () => {
        render(<CVDownloadButton />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Download CV');
    });

    it('should match snapshot', () => {
        const { container } = render(<CVDownloadButton />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
