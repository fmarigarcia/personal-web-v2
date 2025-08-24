import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { FormTextarea } from '../FormTextarea';

describe('FormTextarea', () => {
    it('renders textarea element with default styling', () => {
        render(<FormTextarea data-testid="test-textarea" />);

        const textarea = screen.getByTestId('test-textarea');
        expect(textarea).toBeInTheDocument();
        expect(textarea.tagName).toBe('TEXTAREA');
        expect(textarea).toHaveClass(
            'w-full',
            'px-4',
            'py-3',
            'border',
            'border-gray-300',
            'rounded-lg',
            'focus:ring-2',
            'focus:ring-blue-500',
            'focus:border-blue-500',
            'transition-colors'
        );
    });

    it('applies custom className alongside default classes', () => {
        render(
            <FormTextarea
                className="custom-class"
                data-testid="test-textarea"
            />
        );

        const textarea = screen.getByTestId('test-textarea');
        expect(textarea).toHaveClass('custom-class', 'w-full', 'px-4', 'py-3');
    });

    it('supports all HTML textarea attributes', () => {
        render(
            <FormTextarea
                id="message-textarea"
                name="message"
                placeholder="Enter message"
                required
                disabled
                rows={5}
                cols={50}
                defaultValue="test message"
                data-testid="message-textarea"
            />
        );

        const textarea = screen.getByTestId('message-textarea');
        expect(textarea).toHaveAttribute('id', 'message-textarea');
        expect(textarea).toHaveAttribute('name', 'message');
        expect(textarea).toHaveAttribute('placeholder', 'Enter message');
        expect(textarea).toHaveAttribute('rows', '5');
        expect(textarea).toHaveAttribute('cols', '50');
        expect(textarea).toHaveValue('test message');
        expect(textarea).toBeRequired();
        expect(textarea).toBeDisabled();
    });

    it('handles onChange events', () => {
        const handleChange = jest.fn();
        render(
            <FormTextarea onChange={handleChange} data-testid="test-textarea" />
        );

        const textarea = screen.getByTestId('test-textarea');
        fireEvent.change(textarea, { target: { value: 'new content' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles focus and blur events', () => {
        const handleFocus = jest.fn();
        const handleBlur = jest.fn();
        render(
            <FormTextarea
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-testid="test-textarea"
            />
        );

        const textarea = screen.getByTestId('test-textarea');

        fireEvent.focus(textarea);
        expect(handleFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(textarea);
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('supports controlled component pattern', () => {
        const TestComponent = () => {
            const [value, setValue] = useState('initial content');
            return (
                <FormTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    data-testid="controlled-textarea"
                />
            );
        };

        render(<TestComponent />);

        const textarea = screen.getByTestId(
            'controlled-textarea'
        ) as HTMLTextAreaElement;
        expect(textarea.value).toBe('initial content');

        fireEvent.change(textarea, { target: { value: 'updated content' } });
        expect(textarea.value).toBe('updated content');
    });

    it('supports multiline text content', () => {
        const multilineContent = 'Line 1\nLine 2\nLine 3';
        render(
            <FormTextarea
                defaultValue={multilineContent}
                data-testid="multiline-textarea"
            />
        );

        const textarea = screen.getByTestId(
            'multiline-textarea'
        ) as HTMLTextAreaElement;
        expect(textarea.value).toBe(multilineContent);
    });

    it('supports placeholder text', () => {
        render(
            <FormTextarea
                placeholder="Enter your message here..."
                data-testid="placeholder-textarea"
            />
        );

        const textarea = screen.getByTestId('placeholder-textarea');
        expect(textarea).toHaveAttribute(
            'placeholder',
            'Enter your message here...'
        );
    });

    it('supports maxLength attribute', () => {
        render(
            <FormTextarea maxLength={100} data-testid="maxlength-textarea" />
        );

        const textarea = screen.getByTestId('maxlength-textarea');
        expect(textarea).toHaveAttribute('maxLength', '100');
    });
});
