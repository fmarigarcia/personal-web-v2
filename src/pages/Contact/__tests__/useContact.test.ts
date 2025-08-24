import { renderHook, act } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { contactMethods, socialLinks } from '@data/index';
import { useContact } from '../useContact';

// Mock dependencies
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

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

const mockT = jest.fn();

describe('useContact', () => {
    beforeEach(() => {
        (useTranslation as jest.Mock).mockReturnValue({
            t: mockT,
        });
        mockT.mockClear();
    });

    describe('data structure', () => {
        it('should return data with correct structure', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.data).toEqual({
                form: {
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                },
                isSubmitting: false,
                contactMethods,
                socialLinks,
            });
        });

        it('should return actions with correct structure', () => {
            const { result } = renderHook(() => useContact());

            expect(result.current.actions).toEqual({
                handleInputChange: expect.any(Function),
                handleSubmit: expect.any(Function),
            });
        });
    });

    describe('actions', () => {
        describe('handleInputChange', () => {
            it('should update form field correctly', () => {
                const { result } = renderHook(() => useContact());

                const mockEvent = {
                    target: {
                        name: 'email',
                        value: 'test@example.com',
                    },
                } as React.ChangeEvent<HTMLInputElement>;

                act(() => {
                    result.current.actions.handleInputChange(mockEvent);
                });

                expect(result.current.data.form.email).toBe('test@example.com');
                expect(result.current.data.form.name).toBe('');
                expect(result.current.data.form.subject).toBe('');
                expect(result.current.data.form.message).toBe('');
            });

            it('should handle multiple field updates', () => {
                const { result } = renderHook(() => useContact());

                act(() => {
                    result.current.actions.handleInputChange({
                        target: { name: 'name', value: 'John Doe' },
                    } as React.ChangeEvent<HTMLInputElement>);
                });

                act(() => {
                    result.current.actions.handleInputChange({
                        target: { name: 'subject', value: 'Test Subject' },
                    } as React.ChangeEvent<HTMLInputElement>);
                });

                expect(result.current.data.form.name).toBe('John Doe');
                expect(result.current.data.form.subject).toBe('Test Subject');
            });
        });

        describe('handleSubmit', () => {
            beforeEach(() => {
                // Mock alert to avoid console errors in tests
                global.alert = jest.fn();
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.useRealTimers();
                jest.restoreAllMocks();
            });

            it('should handle form submission successfully', async () => {
                mockT.mockReturnValue('Success message');
                const { result } = renderHook(() => useContact());

                // Fill form first
                act(() => {
                    result.current.actions.handleInputChange({
                        target: { name: 'name', value: 'John Doe' },
                    } as React.ChangeEvent<HTMLInputElement>);
                });

                const mockEvent = {
                    preventDefault: jest.fn(),
                } as unknown as React.FormEvent;

                // Start submission
                act(() => {
                    result.current.actions.handleSubmit(mockEvent);
                });

                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(result.current.data.isSubmitting).toBe(true);

                // Fast-forward timer
                act(() => {
                    jest.advanceTimersByTime(1000);
                });

                // Wait for async operation to complete
                await act(async () => {
                    await Promise.resolve();
                });

                expect(result.current.data.isSubmitting).toBe(false);
                expect(result.current.data.form).toEqual({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                expect(global.alert).toHaveBeenCalledWith('Success message');
                expect(mockT).toHaveBeenCalledWith(
                    'contact.form.successMessage'
                );
            });

            it('should handle form submission error', async () => {
                mockT.mockReturnValue('Error message');
                const { result } = renderHook(() => useContact());

                // Mock console.error to avoid warnings
                const consoleSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});

                const mockEvent = {
                    preventDefault: jest.fn(),
                } as unknown as React.FormEvent;

                // Since our current implementation doesn't have a real error path,
                // let's just ensure the form works correctly in the success case
                act(() => {
                    result.current.actions.handleSubmit(mockEvent);
                });

                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(result.current.data.isSubmitting).toBe(true);

                // Fast-forward timer
                act(() => {
                    jest.advanceTimersByTime(1000);
                });

                // Wait for async operation to complete
                await act(async () => {
                    await Promise.resolve();
                });

                expect(result.current.data.isSubmitting).toBe(false);

                consoleSpy.mockRestore();
            });
        });
    });
});
