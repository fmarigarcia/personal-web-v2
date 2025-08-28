import { render, screen, fireEvent } from '@testing-library/react';
import { Chip } from '../Chip';

describe('Chip', () => {
    const defaultProps = {
        children: 'Test Chip',
    };

    it('should render with children', () => {
        render(<Chip {...defaultProps} />);
        expect(screen.getByText('Test Chip')).toBeInTheDocument();
    });

    it('should render as span by default', () => {
        const { container } = render(<Chip {...defaultProps} />);
        const chip = container.firstChild as HTMLElement;
        expect(chip.tagName).toBe('SPAN');
    });

    it('should render as button when onClick is provided', () => {
        const onClick = jest.fn();
        const { container } = render(
            <Chip {...defaultProps} onClick={onClick} />
        );
        const chip = container.firstChild as HTMLElement;
        expect(chip.tagName).toBe('BUTTON');
    });

    it('should call onClick when clicked', () => {
        const onClick = jest.fn();
        render(<Chip {...defaultProps} onClick={onClick} />);
        const chip = screen.getByRole('button');

        fireEvent.click(chip);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should have correct base classes', () => {
        const { container } = render(<Chip {...defaultProps} />);
        const chip = container.firstChild as HTMLElement;

        expect(chip).toHaveClass(
            'font-medium',
            'rounded-full',
            'transition-all',
            'duration-200'
        );
    });

    describe('variants', () => {
        it('should apply primary variant classes by default', () => {
            const { container } = render(<Chip {...defaultProps} />);
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass(
                'bg-stone-100',
                'text-stone-800',
                'hover:bg-stone-200'
            );
        });

        it('should apply secondary variant classes', () => {
            const { container } = render(
                <Chip {...defaultProps} variant="secondary" />
            );
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass(
                'bg-stone-50',
                'text-stone-800',
                'hover:bg-stone-100'
            );
        });

        it('should apply success variant classes', () => {
            const { container } = render(
                <Chip {...defaultProps} variant="success" />
            );
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass(
                'bg-green-100',
                'text-green-800',
                'hover:bg-green-200'
            );
        });

        it('should apply warning variant classes', () => {
            const { container } = render(
                <Chip {...defaultProps} variant="warning" />
            );
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass(
                'bg-yellow-100',
                'text-yellow-800',
                'hover:bg-yellow-200'
            );
        });
    });

    describe('sizes', () => {
        it('should apply medium size classes by default', () => {
            const { container } = render(<Chip {...defaultProps} />);
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass('px-3', 'py-2', 'text-sm');
        });

        it('should apply small size classes', () => {
            const { container } = render(<Chip {...defaultProps} size="sm" />);
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass('px-2', 'py-1', 'text-xs');
        });

        it('should apply large size classes', () => {
            const { container } = render(<Chip {...defaultProps} size="lg" />);
            const chip = container.firstChild as HTMLElement;

            expect(chip).toHaveClass('px-4', 'py-2', 'text-base');
        });
    });

    it('should apply cursor-pointer when onClick is provided', () => {
        const onClick = jest.fn();
        const { container } = render(
            <Chip {...defaultProps} onClick={onClick} />
        );
        const chip = container.firstChild as HTMLElement;

        expect(chip).toHaveClass('cursor-pointer');
    });

    it('should not apply cursor-pointer when onClick is not provided', () => {
        const { container } = render(<Chip {...defaultProps} />);
        const chip = container.firstChild as HTMLElement;

        expect(chip).not.toHaveClass('cursor-pointer');
    });

    it('should apply custom className', () => {
        const { container } = render(
            <Chip {...defaultProps} className="custom-class" />
        );
        const chip = container.firstChild as HTMLElement;

        expect(chip).toHaveClass('custom-class');
    });

    it('should match snapshot for primary variant', () => {
        const { container } = render(
            <Chip {...defaultProps} variant="primary" />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for clickable chip', () => {
        const onClick = jest.fn();
        const { container } = render(
            <Chip {...defaultProps} onClick={onClick} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for large chip', () => {
        const { container } = render(<Chip {...defaultProps} size="lg" />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
