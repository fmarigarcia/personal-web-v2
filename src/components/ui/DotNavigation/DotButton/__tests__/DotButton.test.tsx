import { render, screen, fireEvent } from '@testing-library/react';
import { DotButton } from '../DotButton';

describe('DotButton', () => {
    const defaultProps = {
        isActive: false,
        label: 'Home',
        onClick: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render button with correct aria-label', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Go to Home section');
    });

    it('should render tooltip with label text', () => {
        render(<DotButton {...defaultProps} />);

        const tooltip = screen.getByText('Home');
        expect(tooltip).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('should apply active styles when isActive is true', () => {
        render(<DotButton {...defaultProps} isActive={true} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'bg-stone-950',
            'border-stone-950',
            'scale-110'
        );
    });

    it('should apply inactive styles when isActive is false', () => {
        render(<DotButton {...defaultProps} isActive={false} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-transparent', 'border-stone-400');
        expect(button).not.toHaveClass(
            'bg-stone-950',
            'border-stone-950',
            'scale-110'
        );
    });

    it('should have proper button type', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });

    it('should have proper accessibility classes', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-stone-400',
            'focus:ring-offset-2'
        );
    });

    it('should have transition and hover classes', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'transition-all',
            'duration-300',
            'ease-in-out',
            'hover:scale-125'
        );
    });

    it('should have group class for tooltip hover effect', () => {
        render(<DotButton {...defaultProps} />);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('group');
    });

    it('should render tooltip with proper positioning classes', () => {
        render(<DotButton {...defaultProps} />);

        const tooltip = screen.getByText('Home');
        expect(tooltip).toHaveClass(
            'absolute',
            'right-full',
            'mr-3',
            'top-1/2',
            '-translate-y-1/2',
            'opacity-0',
            'group-hover:opacity-100'
        );
    });

    it('should match snapshot when inactive', () => {
        const { container } = render(<DotButton {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when active', () => {
        const { container } = render(
            <DotButton {...defaultProps} isActive={true} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
