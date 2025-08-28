import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
    it('renders with primary variant by default', () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Click me');
        expect(button).toHaveClass(
            'bg-stone-950',
            'text-white',
            'hover:bg-stone-900'
        );
    });

    it('renders with secondary variant when specified', () => {
        render(<Button variant="secondary">Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'border',
            'border-stone-400',
            'text-stone-700',
            'hover:border-stone-500'
        );
    });

    it('renders with disabled variant when specified', () => {
        render(<Button variant="disabled">Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'bg-stone-300',
            'text-stone-500',
            'cursor-not-allowed'
        );
    });

    it('applies disabled state when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('handles click events when not disabled', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle click events when disabled', () => {
        const handleClick = jest.fn();
        render(
            <Button disabled onClick={handleClick}>
                Click me
            </Button>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className alongside variant classes', () => {
        render(<Button className="custom-class">Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass(
            'custom-class',
            'bg-stone-950',
            'text-white'
        );
    });

    it('renders as submit type when specified', () => {
        render(<Button type="submit">Submit</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders as button type by default', () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });

    it('spreads additional HTML attributes', () => {
        render(
            <Button
                data-testid="custom-button"
                aria-label="Custom button"
                title="Button title"
            >
                Click me
            </Button>
        );

        const button = screen.getByTestId('custom-button');
        expect(button).toHaveAttribute('aria-label', 'Custom button');
        expect(button).toHaveAttribute('title', 'Button title');
    });

    it('renders children correctly', () => {
        render(
            <Button>
                <span>Icon</span>
                Text content
            </Button>
        );

        const button = screen.getByRole('button');
        expect(button).toContainHTML('<span>Icon</span>');
        expect(button).toHaveTextContent('Text content');
    });
});
