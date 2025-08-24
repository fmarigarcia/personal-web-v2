import { render, renderHook, act } from '@testing-library/react';
import { SECTIONS } from '@utils/constants';
import { NavigationProvider } from '../NavigationProvider';
import { useNavigation } from '../useNavigation';

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('NavigationContext', () => {
    const TestComponent = () => {
        const {
            currentSection,
            setCurrentSection,
            isScrolling,
            setIsScrolling,
        } = useNavigation();

        return (
            <div>
                <div data-testid="current-section">{currentSection}</div>
                <div data-testid="is-scrolling">{isScrolling.toString()}</div>
                <button
                    data-testid="set-section"
                    onClick={() => setCurrentSection(SECTIONS.ABOUT)}
                >
                    Set About
                </button>
                <button
                    data-testid="set-scrolling"
                    onClick={() => setIsScrolling(true)}
                >
                    Set Scrolling
                </button>
            </div>
        );
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
    );

    describe('NavigationProvider', () => {
        it('should provide initial navigation state', () => {
            const { result } = renderHook(() => useNavigation(), { wrapper });

            expect(result.current.currentSection).toBe(SECTIONS.HERO);
            expect(result.current.isScrolling).toBe(false);
            expect(typeof result.current.setCurrentSection).toBe('function');
            expect(typeof result.current.setIsScrolling).toBe('function');
        });

        it('should update current section', () => {
            const { result } = renderHook(() => useNavigation(), { wrapper });

            act(() => {
                result.current.setCurrentSection(SECTIONS.EXPERIENCE);
            });

            expect(result.current.currentSection).toBe(SECTIONS.EXPERIENCE);
        });

        it('should update scrolling state', () => {
            const { result } = renderHook(() => useNavigation(), { wrapper });

            act(() => {
                result.current.setIsScrolling(true);
            });

            expect(result.current.isScrolling).toBe(true);
        });

        it('should handle all section types', () => {
            const { result } = renderHook(() => useNavigation(), { wrapper });

            // Test all sections
            Object.values(SECTIONS).forEach((section) => {
                act(() => {
                    result.current.setCurrentSection(section);
                });
                expect(result.current.currentSection).toBe(section);
            });
        });
    });

    describe('useNavigation hook', () => {
        it('should throw error when used outside provider', () => {
            // Suppress React error boundary messages for this test
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            expect(() => {
                renderHook(() => useNavigation());
            }).toThrow(
                'useNavigation must be used within a NavigationProvider'
            );

            consoleSpy.mockRestore();
        });

        it('should work with component integration', () => {
            const { getByTestId } = render(
                <NavigationProvider>
                    <TestComponent />
                </NavigationProvider>
            );

            expect(getByTestId('current-section')).toHaveTextContent(
                SECTIONS.HERO
            );
            expect(getByTestId('is-scrolling')).toHaveTextContent('false');

            act(() => {
                getByTestId('set-section').click();
            });

            expect(getByTestId('current-section')).toHaveTextContent(
                SECTIONS.ABOUT
            );

            act(() => {
                getByTestId('set-scrolling').click();
            });

            expect(getByTestId('is-scrolling')).toHaveTextContent('true');
        });
    });
});
