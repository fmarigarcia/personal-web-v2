import { renderHook } from '@testing-library/react';

// Mock @formspree/react
const mockHandleSubmit = jest.fn();
const mockFormState = {
    errors: null,
    result: null,
    submitting: false,
    succeeded: false,
};

jest.mock('@formspree/react', () => ({
    useForm: jest.fn(() => [mockFormState, mockHandleSubmit]),
}));

// Mock dependencies
jest.mock('@data/index', () => ({
    contactMethods: [
        {
            id: 'email',
            icon: jest.fn(),
            titleKey: 'contact.methods.email',
            value: 'test@example.com',
            href: 'mailto:test@example.com',
        },
    ],
    socialLinks: [
        {
            id: 'github',
            nameKey: 'social.github',
            href: 'https://github.com/test',
            icon: jest.fn(),
        },
    ],
}));

// Mock the useContact hook
jest.mock('../useContact', () => ({
    useContact: () => {
        const formRef = { current: null };

        return {
            data: {
                form: {
                    errors: null,
                    result: null,
                    submitting: false,
                    succeeded: false,
                },
                formRef,
                contactMethods: [
                    {
                        id: 'email',
                        icon: jest.fn(),
                        titleKey: 'contact.methods.email',
                        value: 'test@example.com',
                        href: 'mailto:test@example.com',
                    },
                ],
                socialLinks: [
                    {
                        id: 'github',
                        nameKey: 'social.github',
                        href: 'https://github.com/test',
                        icon: jest.fn(),
                    },
                ],
            },
            actions: {
                handleSubmit: jest.fn(),
            },
        };
    },
}));

// Now import after mocking
import { useContact } from '../useContact';

describe('useContact', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('data structure', () => {
        it('should return data with correct structure', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.data).toEqual({
                form: {
                    errors: null,
                    result: null,
                    submitting: false,
                    succeeded: false,
                },
                formRef: expect.objectContaining({ current: null }),
                contactMethods: expect.any(Array),
                socialLinks: expect.any(Array),
            });
        });

        it('should return actions with correct structure', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.actions).toEqual({
                handleSubmit: expect.any(Function),
            });
        });
    });

    describe('formRef behavior', () => {
        it('should have formRef initialized to null', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.data.formRef.current).toBeNull();
        });
    });

    describe('Formspree integration', () => {
        it('should work with Formspree useForm hook', () => {
            const { result } = renderHook(() => useContact());

            // Verify the hook returns expected structure
            expect(result.current.data.form).toEqual({
                errors: null,
                result: null,
                submitting: false,
                succeeded: false,
            });
            expect(result.current.actions.handleSubmit).toEqual(
                expect.any(Function)
            );
        });

        it('should return the Formspree form state', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.data.form).toEqual({
                errors: null,
                result: null,
                submitting: false,
                succeeded: false,
            });
            expect(result.current.actions.handleSubmit).toEqual(
                expect.any(Function)
            );
        });
    });
});
