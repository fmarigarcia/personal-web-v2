import { render } from '@testing-library/react';
import { TimelineDot } from '../TimelineDot';

describe('TimelineDot', () => {
    it('should apply selected styles when isSelected is true', () => {
        const { container } = render(<TimelineDot isSelected={true} />);

        const dot = container.firstChild as HTMLElement;
        expect(dot).toHaveClass(
            'bg-stone-950',
            'border-stone-950',
            'scale-125',
            'shadow-lg'
        );
    });

    it('should apply unselected styles when isSelected is false', () => {
        const { container } = render(<TimelineDot isSelected={false} />);

        const dot = container.firstChild as HTMLElement;
        expect(dot).toHaveClass(
            'bg-stone-50',
            'border-stone-400',
            'group-hover:bg-stone-100',
            'group-hover:scale-110'
        );
    });

    it('should have correct base classes', () => {
        const { container } = render(<TimelineDot isSelected={false} />);

        const dot = container.firstChild as HTMLElement;
        expect(dot).toHaveClass(
            'w-4',
            'h-4',
            'rounded-full',
            'border-3',
            'transition-all',
            'duration-300',
            'mb-4'
        );
    });

    it('should match snapshot when selected', () => {
        const { container } = render(<TimelineDot isSelected={true} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when not selected', () => {
        const { container } = render(<TimelineDot isSelected={false} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
