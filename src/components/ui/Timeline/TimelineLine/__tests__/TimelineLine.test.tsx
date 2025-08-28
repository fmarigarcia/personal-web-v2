import { render } from '@testing-library/react';
import { TimelineLine } from '../TimelineLine';

describe('TimelineLine', () => {
    it('should render with correct classes', () => {
        const { container } = render(<TimelineLine />);

        const line = container.firstChild as HTMLElement;
        expect(line).toHaveClass(
            'absolute',
            'top-16',
            'left-16',
            'right-16',
            'h-0.5',
            'bg-stone-300'
        );
    });

    it('should be a div element', () => {
        const { container } = render(<TimelineLine />);

        const line = container.firstChild as HTMLElement;
        expect(line.tagName).toBe('DIV');
    });

    it('should match snapshot', () => {
        const { container } = render(<TimelineLine />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
