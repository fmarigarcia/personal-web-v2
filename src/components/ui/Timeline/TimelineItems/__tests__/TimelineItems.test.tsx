import { render, screen, fireEvent } from '@testing-library/react';
import type { ExperienceItem } from '../../../../../types/data';
import { TimelineItems } from '../TimelineItems';

// Mock usePlatform hook
jest.mock('../../../../../hooks/usePlatform', () => ({
    usePlatform: jest.fn(() => ({
        data: {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        },
    })),
}));

// Mock the sub-components
jest.mock('../../TimelinePosition', () => ({
    TimelinePosition: ({
        company,
        position,
        isSelected,
    }: {
        company: string;
        position: string;
        isSelected: boolean;
    }) => (
        <div data-testid="timeline-position">
            {company} - {position} - {isSelected.toString()}
        </div>
    ),
}));

jest.mock('../../TimelineDot', () => ({
    TimelineDot: ({ isSelected }: { isSelected: boolean }) => (
        <div data-testid="timeline-dot">{isSelected.toString()}</div>
    ),
}));

jest.mock('../../TimelineDuration', () => ({
    TimelineDuration: ({
        duration,
        isSelected,
    }: {
        duration: string;
        isSelected: boolean;
    }) => (
        <div data-testid="timeline-duration">
            {duration} - {isSelected.toString()}
        </div>
    ),
}));

const mockExperiences: ExperienceItem[] = [
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
];

describe('TimelineItems', () => {
    const defaultProps = {
        experiences: mockExperiences,
        selectedExp: mockExperiences[0],
        onSelectExp: jest.fn(),
        onHoverExp: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render timeline items for all experiences', () => {
        render(<TimelineItems {...defaultProps} />);

        expect(screen.getAllByTestId('timeline-position')).toHaveLength(2);
        expect(screen.getAllByTestId('timeline-dot')).toHaveLength(2);
        expect(screen.getAllByTestId('timeline-duration')).toHaveLength(2);
    });

    it('should pass correct props to sub-components for selected item', () => {
        render(<TimelineItems {...defaultProps} />);

        // First item should be selected (isSelected = true)
        expect(
            screen.getByText('Company A - position1 - true')
        ).toBeInTheDocument();
        expect(screen.getByText('duration1 - true')).toBeInTheDocument();

        // Second item should not be selected (isSelected = false)
        expect(
            screen.getByText('Company B - position2 - false')
        ).toBeInTheDocument();
        expect(screen.getByText('duration2 - false')).toBeInTheDocument();
    });

    it('should call onSelectExp when item is clicked', () => {
        const onSelectExp = jest.fn();
        render(<TimelineItems {...defaultProps} onSelectExp={onSelectExp} />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]); // Click second item

        expect(onSelectExp).toHaveBeenCalledWith(mockExperiences[1]);
    });

    it('should call onHoverExp when item is hovered', () => {
        const onHoverExp = jest.fn();
        render(<TimelineItems {...defaultProps} onHoverExp={onHoverExp} />);

        const buttons = screen.getAllByRole('button');

        fireEvent.mouseEnter(buttons[0]);
        expect(onHoverExp).toHaveBeenCalledWith('exp1');

        fireEvent.mouseLeave(buttons[0]);
        expect(onHoverExp).toHaveBeenCalledWith(null);
    });

    it('should have correct button structure and classes', () => {
        const { container } = render(<TimelineItems {...defaultProps} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(
            'flex',
            'justify-between',
            'items-start',
            'relative',
            'z-10'
        );

        const buttons = screen.getAllByRole('button');
        buttons.forEach((button) => {
            expect(button).toHaveClass(
                'flex',
                'flex-col',
                'items-center',
                'group',
                'cursor-pointer',
                'w-40'
            );
        });
    });

    it('should handle empty experiences array', () => {
        render(<TimelineItems {...defaultProps} experiences={[]} />);

        expect(
            screen.queryByTestId('timeline-position')
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('timeline-dot')).not.toBeInTheDocument();
        expect(
            screen.queryByTestId('timeline-duration')
        ).not.toBeInTheDocument();
    });

    it('should handle different selected experience', () => {
        render(
            <TimelineItems {...defaultProps} selectedExp={mockExperiences[1]} />
        );

        // First item should not be selected
        expect(
            screen.getByText('Company A - position1 - false')
        ).toBeInTheDocument();

        // Second item should be selected
        expect(
            screen.getByText('Company B - position2 - true')
        ).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<TimelineItems {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
