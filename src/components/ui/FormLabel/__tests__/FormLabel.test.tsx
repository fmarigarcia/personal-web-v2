import { render, screen } from '@testing-library/react';
import { FormLabel } from '../FormLabel';

describe('FormLabel', () => {
    it('renders label with text content', () => {
        render(<FormLabel htmlFor="test-input">Test Label</FormLabel>);

        const label = screen.getByText('Test Label');
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('for', 'test-input');
    });

    it('applies default CSS classes', () => {
        render(<FormLabel htmlFor="test">Label Text</FormLabel>);

        const label = screen.getByText('Label Text');
        expect(label).toHaveClass(
            'block',
            'text-sm',
            'font-medium',
            'text-gray-700',
            'mb-2'
        );
    });

    it('renders required asterisk when required prop is true', () => {
        render(
            <FormLabel htmlFor="test" required>
                Required Label
            </FormLabel>
        );

        const label = screen.getByText('Required Label');
        expect(label).toBeInTheDocument();

        const asterisk = screen.getByText('*');
        expect(asterisk).toBeInTheDocument();
        expect(asterisk).toHaveClass('text-red-500', 'ml-1');
    });

    it('does not render asterisk when required prop is false', () => {
        render(
            <FormLabel htmlFor="test" required={false}>
                Optional Label
            </FormLabel>
        );

        const label = screen.getByText('Optional Label');
        expect(label).toBeInTheDocument();

        const asterisk = screen.queryByText('*');
        expect(asterisk).not.toBeInTheDocument();
    });

    it('does not render asterisk when required prop is not provided', () => {
        render(<FormLabel htmlFor="test">Label</FormLabel>);

        const asterisk = screen.queryByText('*');
        expect(asterisk).not.toBeInTheDocument();
    });

    it('applies custom className alongside default classes', () => {
        render(
            <FormLabel htmlFor="test" className="custom-class">
                Label
            </FormLabel>
        );

        const label = screen.getByText('Label');
        expect(label).toHaveClass(
            'custom-class',
            'block',
            'text-sm',
            'font-medium',
            'text-gray-700',
            'mb-2'
        );
    });

    it('spreads additional HTML attributes', () => {
        render(
            <FormLabel
                htmlFor="test"
                data-testid="custom-label"
                title="Label title"
            >
                Label
            </FormLabel>
        );

        const label = screen.getByTestId('custom-label');
        expect(label).toHaveAttribute('title', 'Label title');
        expect(label).toHaveAttribute('for', 'test');
    });

    it('renders complex children correctly', () => {
        render(
            <div>
                <FormLabel htmlFor="test">
                    <span>Complex</span> Label <strong>Content</strong>
                </FormLabel>
                <input id="test" />
            </div>
        );

        const label = screen.getByLabelText('Complex Label Content');
        expect(label).toBeInTheDocument();

        const labelElement = screen.getByText((_, element) => {
            return (
                element?.tagName === 'LABEL' &&
                element?.textContent === 'Complex Label Content'
            );
        });
        expect(labelElement).toContainHTML(
            '<span>Complex</span> Label <strong>Content</strong>'
        );
    });
});
