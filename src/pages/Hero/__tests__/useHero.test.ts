import { renderHook, act } from '@testing-library/react';
import { useNavigation } from '@contexts/NavigationContext';
import { useHero } from '../useHero';

// Mock react-i18next
const mockT = jest.fn();
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: mockT,
    }),
}));

// Mock NavigationContext
const mockNavigateToSection = jest.fn();
jest.mock('@contexts/NavigationContext', () => ({
    useNavigation: jest.fn(() => ({
        navigateToSection: mockNavigateToSection,
    })),
}));

const mockedUseNavigation = jest.mocked(useNavigation);

// Mock constants
jest.mock('@utils/constants', () => ({
    SECTIONS: {
        CONTACT: 'contact',
        EXPERIENCE: 'experience',
        HERO: 'hero',
        ABOUT: 'about',
    },
}));

describe('useHero', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        
        // Setup default navigation context mock
        mockedUseNavigation.mockReturnValue({
            navigateToSection: mockNavigateToSection,
            currentSection: 'hero',
            setCurrentSection: jest.fn(),
            isScrolling: false,
            setIsScrolling: jest.fn(),
            setNavigateToSection: jest.fn(),
        });
        
        // Setup default translation mock responses
        mockT.mockImplementation((key: string) => {
            const translations: Record<string, string> = {
                'hero.name': 'Francisco Garcia',
                'hero.title': 'Frontend Developer',
                'hero.description': 'I create modern web applications',
                'hero.getInTouch': 'Get In Touch',
                'hero.viewExperience': 'View Experience',
            };
            return translations[key] || key;
        });
    });

    it('should return data with translated hero content', () => {
        const { result } = renderHook(() => useHero());

        expect(result.current.data).toEqual({
            name: 'Francisco Garcia',
            title: 'Frontend Developer',
            description: 'I create modern web applications',
            getInTouchText: 'Get In Touch',
            viewExperienceText: 'View Experience',
        });
    });

    it('should call translation function with correct keys', () => {
        renderHook(() => useHero());

        expect(mockT).toHaveBeenCalledWith('hero.name');
        expect(mockT).toHaveBeenCalledWith('hero.title');
        expect(mockT).toHaveBeenCalledWith('hero.description');
        expect(mockT).toHaveBeenCalledWith('hero.getInTouch');
        expect(mockT).toHaveBeenCalledWith('hero.viewExperience');
    });

    it('should return actions with navigation functions', () => {
        const { result } = renderHook(() => useHero());

        expect(result.current.actions).toHaveProperty('navigateToContact');
        expect(result.current.actions).toHaveProperty('navigateToExperience');
        expect(typeof result.current.actions.navigateToContact).toBe('function');
        expect(typeof result.current.actions.navigateToExperience).toBe('function');
    });

    it('should navigate to contact section when navigateToContact is called', () => {
        const { result } = renderHook(() => useHero());

        act(() => {
            result.current.actions.navigateToContact();
        });

        expect(mockNavigateToSection).toHaveBeenCalledWith('contact');
    });

    it('should navigate to experience section when navigateToExperience is called', () => {
        const { result } = renderHook(() => useHero());

        act(() => {
            result.current.actions.navigateToExperience();
        });

        expect(mockNavigateToSection).toHaveBeenCalledWith('experience');
    });

    it('should handle missing navigateToSection gracefully', () => {
        // Mock missing navigateToSection
        mockedUseNavigation.mockReturnValue({
            navigateToSection: undefined,
            currentSection: 'hero',
            setCurrentSection: jest.fn(),
            isScrolling: false,
            setIsScrolling: jest.fn(),
            setNavigateToSection: jest.fn(),
        });

        const { result } = renderHook(() => useHero());

        // Should not throw when navigateToSection is null
        expect(() => {
            act(() => {
                result.current.actions.navigateToContact();
            });
        }).not.toThrow();

        expect(() => {
            act(() => {
                result.current.actions.navigateToExperience();
            });
        }).not.toThrow();
    });

    it('should return consistent data structure following {data, actions} pattern', () => {
        const { result } = renderHook(() => useHero());

        expect(result.current).toHaveProperty('data');
        expect(result.current).toHaveProperty('actions');
        expect(typeof result.current.data).toBe('object');
        expect(typeof result.current.actions).toBe('object');

        // Verify data contains expected properties
        expect(result.current.data).toHaveProperty('name');
        expect(result.current.data).toHaveProperty('title');
        expect(result.current.data).toHaveProperty('description');
        expect(result.current.data).toHaveProperty('getInTouchText');
        expect(result.current.data).toHaveProperty('viewExperienceText');

        // Verify actions contains expected properties
        expect(result.current.actions).toHaveProperty('navigateToContact');
        expect(result.current.actions).toHaveProperty('navigateToExperience');
    });

    it('should update data when translation function returns different values', () => {
        const { result, rerender } = renderHook(() => useHero());

        const initialData = result.current.data;

        // Change mock translation responses
        mockT.mockImplementation((key: string) => {
            const translations: Record<string, string> = {
                'hero.name': 'Updated Name',
                'hero.title': 'Updated Title',
                'hero.description': 'Updated Description',
                'hero.getInTouch': 'Updated Contact',
                'hero.viewExperience': 'Updated Experience',
            };
            return translations[key] || key;
        });

        rerender();

        expect(result.current.data).not.toEqual(initialData);
        expect(result.current.data.name).toBe('Updated Name');
        expect(result.current.data.title).toBe('Updated Title');
        expect(result.current.data.description).toBe('Updated Description');
        expect(result.current.data.getInTouchText).toBe('Updated Contact');
        expect(result.current.data.viewExperienceText).toBe('Updated Experience');
    });

    it('should maintain stable action function references', () => {
        const { result, rerender } = renderHook(() => useHero());

        const firstRenderActions = result.current.actions;

        rerender();

        const secondRenderActions = result.current.actions;

        // Actions should be referentially stable to prevent unnecessary re-renders
        expect(firstRenderActions.navigateToContact).toBe(secondRenderActions.navigateToContact);
        expect(firstRenderActions.navigateToExperience).toBe(secondRenderActions.navigateToExperience);
    });
});
