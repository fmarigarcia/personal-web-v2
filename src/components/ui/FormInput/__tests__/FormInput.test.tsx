import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { FormInput } from '../FormInput';

describe('FormInput', () => {
    it('renders input element with default styling', () => {
        render(<FormInput data-testid="test-input" />);

        const input = screen.getByTestId('test-input');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass(
            'w-full',
            'px-4',
            'py-3',
            'border',
            'border-stone-300',
            'rounded-lg',
            'focus:ring-2',
            'focus:ring-stone-400',
            'focus:border-stone-400',
            'transition-colors',
            'bg-stone-50/50'
        );
    });

    it('applies custom className alongside default classes', () => {
        render(<FormInput className="custom-class" data-testid="test-input" />);

        const input = screen.getByTestId('test-input');
        expect(input).toHaveClass('custom-class', 'w-full', 'px-4', 'py-3');
    });

    it('supports all HTML input attributes', () => {
        render(
            <FormInput
                type="email"
                id="email-input"
                name="email"
                placeholder="Enter email"
                required
                disabled
                value="test@example.com"
                data-testid="email-input"
            />
        );

        const input = screen.getByTestId('email-input');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toHaveAttribute('id', 'email-input');
        expect(input).toHaveAttribute('name', 'email');
        expect(input).toHaveAttribute('placeholder', 'Enter email');
        expect(input).toHaveAttribute('value', 'test@example.com');
        expect(input).toBeRequired();
        expect(input).toBeDisabled();
    });

    it('handles onChange events', () => {
        const handleChange = jest.fn();
        render(<FormInput onChange={handleChange} data-testid="test-input" />);

        const input = screen.getByTestId('test-input');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles focus and blur events', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(
            <FormInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-testid="test-input"
            />
        );

        const input = screen.getByTestId('test-input');

        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('supports different input types', () => {
        const types = ['text', 'email', 'password', 'tel', 'url'] as const;

        types.forEach((type) => {
            render(<FormInput type={type} data-testid={`input-${type}`} />);

            const input = screen.getByTestId(`input-${type}`);
            expect(input).toHaveAttribute('type', type);
        });
    });

    it('supports controlled component pattern', () => {
        const TestComponent = () => {
            const [value, setValue] = useState('initial');
            return (
                <FormInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    data-testid="controlled-input"
                />
            );
        };

        render(<TestComponent />);

        const input = screen.getByTestId(
            'controlled-input'
        ) as HTMLInputElement;
        expect(input.value).toBe('initial');

        fireEvent.change(input, { target: { value: 'updated' } });
        expect(input.value).toBe('updated');
    });
});
