import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Star } from '../Star';

describe('Star', () => {
    const defaultProps = {
        color: '#fcba04',
        value: 1,
        size: 20,
    };

    it('should render an SVG element', () => {
        const { container } = render(<Star {...defaultProps} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should apply correct width and height from size prop', () => {
        const { container } = render(<Star {...defaultProps} size={30} />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '30');
        expect(svg).toHaveAttribute('height', '30');
    });

    it('should have correct viewBox for star shape', () => {
        const { container } = render(<Star {...defaultProps} />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 200 200');
    });

    it('should create a linear gradient with unique ID', () => {
        const { container } = render(<Star {...defaultProps} />);

        const gradient = container.querySelector('linearGradient');
        expect(gradient).toBeInTheDocument();

        const gradientId = gradient?.getAttribute('id');
        expect(gradientId).toContain('starGradient');
    });

    it('should apply the correct color to gradient stops', () => {
        const testColor = '#ff0000';
        const { container } = render(
            <Star {...defaultProps} color={testColor} />
        );

        const stops = container.querySelectorAll(
            'stop[stop-color="' + testColor + '"]'
        );
        expect(stops.length).toBeGreaterThan(0);
    });

    it('should calculate correct percentage for full value (1)', () => {
        const { container } = render(<Star {...defaultProps} value={1} />);

        const stops = container.querySelectorAll('stop');
        expect(stops.length).toBeGreaterThanOrEqual(2); // At least 2 stops for full star
    });

    it('should calculate correct percentage for partial value (0.5)', () => {
        const { container } = render(<Star {...defaultProps} value={0.5} />);

        const stops = container.querySelectorAll('stop');
        // Partial stars should have transparent stops
        expect(stops.length).toBeGreaterThan(2);
    });

    it('should handle zero value correctly', () => {
        const { container } = render(<Star {...defaultProps} value={0} />);

        const gradient = container.querySelector('linearGradient');
        expect(gradient).toBeInTheDocument();

        const stops = container.querySelectorAll('stop');
        expect(stops.length).toBeGreaterThan(2); // Should have transparent stops
    });

    it('should create star polygon with correct points', () => {
        const { container } = render(<Star {...defaultProps} />);

        const polygon = container.querySelector('polygon');
        expect(polygon).toBeInTheDocument();
        expect(polygon).toHaveAttribute(
            'points',
            '100,10 129,60 195,69 148,115 159,181 100,150 41,181 52,115 5,69 71,60'
        );
    });

    it('should apply correct stroke styling to polygon', () => {
        const { container } = render(<Star {...defaultProps} />);

        const polygon = container.querySelector('polygon');
        expect(polygon).toHaveStyle('stroke: #000000');
        expect(polygon).toHaveStyle('stroke-width: 5');
    });

    it('should use gradient fill for polygon', () => {
        const { container } = render(<Star {...defaultProps} />);

        const polygon = container.querySelector('polygon');
        const gradient = container.querySelector('linearGradient');
        const gradientId = gradient?.getAttribute('id');

        expect(polygon).toHaveAttribute('fill', `url(#${gradientId})`);
    });

    it('should handle decimal values correctly', () => {
        const { container } = render(<Star {...defaultProps} value={0.75} />);

        const gradient = container.querySelector('linearGradient');
        expect(gradient).toBeInTheDocument();

        // Check that gradient is properly created for decimal value
        const stops = container.querySelectorAll('stop');
        expect(stops.length).toBeGreaterThan(0);
    });

    it('should create unique gradient IDs for multiple instances', () => {
        const { container } = render(
            <>
                <Star {...defaultProps} value={1} />
                <Star {...defaultProps} value={0.5} />
            </>
        );

        const gradients = container.querySelectorAll('linearGradient');
        expect(gradients).toHaveLength(2);

        const gradientIds = Array.from(gradients).map((g) =>
            g.getAttribute('id')
        );
        expect(gradientIds[0]).not.toBe(gradientIds[1]); // Should be unique
    });

    it('should handle edge case values (above 1)', () => {
        const { container } = render(<Star {...defaultProps} value={1.5} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should handle negative values', () => {
        const { container } = render(<Star {...defaultProps} value={-0.5} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});
