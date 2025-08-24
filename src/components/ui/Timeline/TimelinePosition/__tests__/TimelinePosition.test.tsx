import { render, screen } from '@testing-library/react';
import { TimelinePosition } from '../TimelinePosition';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

describe('TimelinePosition', () => {
    const defaultProps = {
        company: 'Test Company / Division',
        position: 'test.position.key',
        isSelected: false,
    };

    it('should render company name and position', () => {
        render(<TimelinePosition {...defaultProps} />);

        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.getByText('test.position.key')).toBeInTheDocument();
    });

    it('should split company name correctly', () => {
        render(<TimelinePosition {...defaultProps} />);

        // Should display first part before " / "
        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.queryByText('Division')).not.toBeInTheDocument();
    });

    it('should handle company name without separator', () => {
        render(
            <TimelinePosition {...defaultProps} company="Simple Company Name" />
        );

        expect(screen.getByText('Simple Company Name')).toBeInTheDocument();
    });

    it('should apply selected styles when isSelected is true', () => {
        render(<TimelinePosition {...defaultProps} isSelected={true} />);

        const companyElement = screen.getByText('Test Company');
        const positionElement = screen.getByText('test.position.key');

        expect(companyElement).toHaveClass('text-blue-600');
        expect(positionElement).toHaveClass('text-blue-500');
    });

    it('should apply unselected styles when isSelected is false', () => {
        render(<TimelinePosition {...defaultProps} isSelected={false} />);

        const companyElement = screen.getByText('Test Company');
        const positionElement = screen.getByText('test.position.key');

        expect(companyElement).toHaveClass(
            'text-gray-700',
            'group-hover:text-blue-500'
        );
        expect(positionElement).toHaveClass(
            'text-gray-500',
            'group-hover:text-blue-400'
        );
    });

    it('should have correct title attribute', () => {
        render(<TimelinePosition {...defaultProps} />);

        const companyElement = screen.getByText('Test Company');
        expect(companyElement).toHaveAttribute(
            'title',
            'Test Company / Division'
        );
    });

    it('should have correct structure and classes', () => {
        const { container } = render(<TimelinePosition {...defaultProps} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass('text-center', 'mb-8', 'max-w-32');
    });

    it('should match snapshot when selected', () => {
        const { container } = render(
            <TimelinePosition {...defaultProps} isSelected={true} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot when not selected', () => {
        const { container } = render(
            <TimelinePosition {...defaultProps} isSelected={false} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
