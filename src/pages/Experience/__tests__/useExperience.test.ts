import { renderHook, act } from '@testing-library/react';
import { useExperience } from '../useExperience';

// Mock the experiences data
jest.mock('@data/experiences', () => ({
    experiences: [
        {
            id: 'exp1',
            company: 'Company A',
            position: 'position1',
            duration: 'duration1',
            descriptionKeys: ['desc1'],
            technologies: ['Tech1'],
        },
        {
            id: 'exp2',
            company: 'Company B',
            position: 'position2',
            duration: 'duration2',
            descriptionKeys: ['desc2'],
            technologies: ['Tech2'],
        },
        {
            id: 'exp3',
            company: 'Company C',
            position: 'position3',
            duration: 'duration3',
            descriptionKeys: ['desc3'],
            technologies: ['Tech3'],
        },
    ],
}));

describe('useExperience', () => {
    it('should return data with correct structure', () => {
        const { result } = renderHook(() => useExperience());

        expect(result.current.data).toHaveProperty('experiences');
        expect(result.current.data).toHaveProperty('selectedExp');
        expect(result.current.data).toHaveProperty('hoveredExp');
        expect(result.current.data).toHaveProperty('displayedExp');
    });

    it('should return actions with correct structure', () => {
        const { result } = renderHook(() => useExperience());

        expect(result.current.actions).toHaveProperty('setSelectedExp');
        expect(result.current.actions).toHaveProperty('setHoveredExp');
        expect(typeof result.current.actions.setSelectedExp).toBe('function');
        expect(typeof result.current.actions.setHoveredExp).toBe('function');
    });

    it('should initialize with most recent experience selected', () => {
        const { result } = renderHook(() => useExperience());

        // Most recent is last in array (exp3)
        expect(result.current.data.selectedExp.id).toBe('exp3');
        expect(result.current.data.displayedExp.id).toBe('exp3');
    });

    it('should initialize with null hovered experience', () => {
        const { result } = renderHook(() => useExperience());

        expect(result.current.data.hoveredExp).toBeNull();
    });

    it('should update selected experience when setSelectedExp is called', () => {
        const { result } = renderHook(() => useExperience());

        const newExp = result.current.data.experiences[0]; // exp1

        act(() => {
            result.current.actions.setSelectedExp(newExp);
        });

        expect(result.current.data.selectedExp.id).toBe('exp1');
        expect(result.current.data.displayedExp.id).toBe('exp1');
    });

    it('should update hovered experience when setHoveredExp is called', () => {
        const { result } = renderHook(() => useExperience());

        act(() => {
            result.current.actions.setHoveredExp('exp2');
        });

        expect(result.current.data.hoveredExp).toBe('exp2');
    });

    it('should display hovered experience when hoveredExp is set', () => {
        const { result } = renderHook(() => useExperience());

        // Initially displays selected (exp3)
        expect(result.current.data.displayedExp.id).toBe('exp3');

        act(() => {
            result.current.actions.setHoveredExp('exp1');
        });

        // Should now display hovered experience
        expect(result.current.data.displayedExp.id).toBe('exp1');
        expect(result.current.data.selectedExp.id).toBe('exp3'); // Selected shouldn't change
    });

    it('should fallback to selected experience when hovered is null', () => {
        const { result } = renderHook(() => useExperience());

        // Set hovered first
        act(() => {
            result.current.actions.setHoveredExp('exp2');
        });

        expect(result.current.data.displayedExp.id).toBe('exp2');

        // Clear hovered
        act(() => {
            result.current.actions.setHoveredExp(null);
        });

        // Should fallback to selected
        expect(result.current.data.displayedExp.id).toBe('exp3');
    });

    it('should handle invalid hovered experience id gracefully', () => {
        const { result } = renderHook(() => useExperience());

        act(() => {
            result.current.actions.setHoveredExp('invalid-id');
        });

        // Should fallback to selected experience when hovered id doesn't exist
        expect(result.current.data.displayedExp.id).toBe('exp3');
    });

    it('should maintain stable action references', () => {
        const { result, rerender } = renderHook(() => useExperience());

        const initialSetSelectedExp = result.current.actions.setSelectedExp;
        const initialSetHoveredExp = result.current.actions.setHoveredExp;

        rerender();

        // Actions should remain stable (same reference)
        expect(result.current.actions.setSelectedExp).toBe(
            initialSetSelectedExp
        );
        expect(result.current.actions.setHoveredExp).toBe(initialSetHoveredExp);
    });

    it('should update displayedExp when both selected and hovered are set', () => {
        const { result } = renderHook(() => useExperience());

        // Change selected first
        act(() => {
            result.current.actions.setSelectedExp(
                result.current.data.experiences[0]
            ); // exp1
        });

        expect(result.current.data.displayedExp.id).toBe('exp1');

        // Then set hovered - should take precedence
        act(() => {
            result.current.actions.setHoveredExp('exp2');
        });

        expect(result.current.data.displayedExp.id).toBe('exp2');
        expect(result.current.data.selectedExp.id).toBe('exp1'); // Selected unchanged
    });

    it('should handle rapid hover changes correctly', () => {
        const { result } = renderHook(() => useExperience());

        act(() => {
            result.current.actions.setHoveredExp('exp1');
        });
        expect(result.current.data.displayedExp.id).toBe('exp1');

        act(() => {
            result.current.actions.setHoveredExp('exp2');
        });
        expect(result.current.data.displayedExp.id).toBe('exp2');

        act(() => {
            result.current.actions.setHoveredExp(null);
        });
        expect(result.current.data.displayedExp.id).toBe('exp3'); // Back to selected
    });
});
