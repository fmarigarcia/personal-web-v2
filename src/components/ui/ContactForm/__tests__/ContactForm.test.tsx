import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '../ContactForm';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe('ContactForm', () => {
    const mockForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    const mockProps = {
        form: mockForm,
        isSubmitting: false,
        onInputChange: jest.fn(),
        onSubmit: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form with all required fields', () => {
        render(<ContactForm {...mockProps} />);

        expect(screen.getByText('contact.form.title')).toBeInTheDocument();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.name/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.email/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.subject/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.message/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /contact.sendMessage/i })
        ).toBeInTheDocument();
    });

    it('displays form values correctly', () => {
        const filledForm = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Test message content',
        };

        render(<ContactForm {...mockProps} form={filledForm} />);

        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue('john@example.com')
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Subject')).toBeInTheDocument();
        expect(
            screen.getByDisplayValue('Test message content')
        ).toBeInTheDocument();
    });

    it('calls onInputChange when input values change', () => {
        render(<ContactForm {...mockProps} />);

        const nameInput = screen.getByRole('textbox', {
            name: /contact\.form\.name/i,
        });
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });

        expect(mockProps.onInputChange).toHaveBeenCalledTimes(1);
    });

    it('calls onSubmit when form is submitted', () => {
        render(<ContactForm {...mockProps} />);

        const form = screen.getByRole('form', { name: 'contact.form.title' });
        fireEvent.submit(form);

        expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('shows submitting state correctly', () => {
        render(<ContactForm {...mockProps} isSubmitting={true} />);

        const submitButton = screen.getByRole('button');
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('contact.sending');
        expect(screen.queryByTestId('send-icon')).not.toBeInTheDocument();
    });

    it('shows normal state with send icon when not submitting', () => {
        render(<ContactForm {...mockProps} />);

        const submitButton = screen.getByRole('button');
        expect(submitButton).not.toBeDisabled();
        expect(submitButton).toHaveTextContent('contact.sendMessage');

        // Check for send icon
        const sendIcon = screen.getByTestId('send-icon');
        expect(sendIcon).toBeInTheDocument();
    });

    it('has proper form structure and styling', () => {
        render(<ContactForm {...mockProps} />);

        const formContainer =
            screen.getByText('contact.form.title').parentElement;
        expect(formContainer).toHaveClass(
            'bg-white',
            'rounded-2xl',
            'shadow-sm',
            'p-8'
        );

        const form = screen.getByRole('form', { name: 'contact.form.title' });
        expect(form).toHaveClass('space-y-6');
    });

    it('has required attributes on all form inputs', () => {
        render(<ContactForm {...mockProps} />);

        expect(
            screen.getByRole('textbox', { name: /contact\.form\.name/i })
        ).toBeRequired();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.email/i })
        ).toBeRequired();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.subject/i })
        ).toBeRequired();
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.message/i })
        ).toBeRequired();
    });

    it('has proper input types', () => {
        render(<ContactForm {...mockProps} />);

        expect(
            screen.getByRole('textbox', { name: /contact\.form\.name/i })
        ).toHaveAttribute('type', 'text');
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.email/i })
        ).toHaveAttribute('type', 'email');
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.subject/i })
        ).toHaveAttribute('type', 'text');
        expect(
            screen.getByRole('textbox', { name: /contact\.form\.message/i })
                .tagName
        ).toBe('TEXTAREA');
    });

    it('has proper grid layout for name and email fields', () => {
        render(<ContactForm {...mockProps} />);

        const nameInput = screen.getByRole('textbox', {
            name: /contact\.form\.name/i,
        });
        const emailInput = screen.getByRole('textbox', {
            name: /contact\.form\.email/i,
        });

        const gridContainer = nameInput.closest('.grid');
        expect(gridContainer).toHaveClass('sm:grid-cols-2', 'gap-4');

        const emailGridContainer = emailInput.closest('.grid');
        expect(emailGridContainer).toBe(gridContainer);
    });
});
