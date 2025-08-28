import { render, screen, fireEvent } from '@testing-library/react';
import { Timeline } from '../Timeline';
import type { ExperienceItem } from '../../../../types/data';

// Mock usePlatform hook
jest.mock('../../../../hooks/usePlatform', () => ({
    usePlatform: jest.fn(() => ({
        data: {
            isDesktop: true,
            isMobile: false,
            isTablet: false,
        },
    })),
}));

// Mock the sub-components
jest.mock('../TimelineLine', () => ({
    TimelineLine: () => <div data-testid="timeline-line">Timeline Line</div>,
}));

interface MockTimelineItemsProps {
    experiences: ExperienceItem[];
    selectedExp: ExperienceItem;
    onSelectExp: (exp: ExperienceItem) => void;
    onHoverExp: (expId: string | null) => void;
}

jest.mock('../TimelineItems', () => ({
    TimelineItems: ({
        experiences,
        onSelectExp,
        onHoverExp,
    }: MockTimelineItemsProps) => (
        <div data-testid="timeline-items">
            {experiences.map((exp: ExperienceItem) => (
                <button
                    key={exp.id}
                    data-testid={`timeline-item-${exp.id}`}
                    onClick={() => onSelectExp(exp)}
                    onMouseEnter={() => onHoverExp(exp.id)}
                    onMouseLeave={() => onHoverExp(null)}
                >
                    {exp.company}
                </button>
            ))}
        </div>
    ),
}));

jest.mock('../TimelineLegend', () => ({
    TimelineLegend: () => (
        <div data-testid="timeline-legend">Timeline Legend</div>
    ),
}));

const mockExperiences = [
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

describe('Timeline', () => {
    const defaultProps = {
        experiences: mockExperiences,
        selectedExp: mockExperiences[0],
        onSelectExp: jest.fn(),
        onHoverExp: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all Timeline components', () => {
        render(<Timeline {...defaultProps} />);

        expect(screen.getByTestId('timeline-line')).toBeInTheDocument();
        expect(screen.getByTestId('timeline-items')).toBeInTheDocument();
        expect(screen.getByTestId('timeline-legend')).toBeInTheDocument();
    });

    it('should render timeline items for all experiences', () => {
        render(<Timeline {...defaultProps} />);

        expect(screen.getByTestId('timeline-item-exp1')).toBeInTheDocument();
        expect(screen.getByTestId('timeline-item-exp2')).toBeInTheDocument();
        expect(screen.getByText('Company A')).toBeInTheDocument();
        expect(screen.getByText('Company B')).toBeInTheDocument();
    });

    it('should pass correct props to TimelineItems', () => {
        const onSelectExp = jest.fn();
        const onHoverExp = jest.fn();

        render(
            <Timeline
                {...defaultProps}
                onSelectExp={onSelectExp}
                onHoverExp={onHoverExp}
            />
        );

        const item = screen.getByTestId('timeline-item-exp1');
        fireEvent.click(item);
        expect(onSelectExp).toHaveBeenCalledWith(mockExperiences[0]);

        fireEvent.mouseEnter(item);
        expect(onHoverExp).toHaveBeenCalledWith('exp1');

        fireEvent.mouseLeave(item);
        expect(onHoverExp).toHaveBeenCalledWith(null);
    });

    it('should have correct structure and classes', () => {
        const { container } = render(<Timeline {...defaultProps} />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toHaveClass('mb-12');

        const innerContainer = mainContainer.firstChild as HTMLElement;
        expect(innerContainer).toHaveClass(
            'relative',
            'lg:px-16',
            'max-w-full',
            'overflow-x-scroll'
        );
    });

    it('should handle empty experiences array', () => {
        render(
            <Timeline
                {...defaultProps}
                experiences={[]}
                selectedExp={mockExperiences[0]}
            />
        );

        expect(screen.getByTestId('timeline-line')).toBeInTheDocument();
        expect(screen.getByTestId('timeline-items')).toBeInTheDocument();
        expect(screen.getByTestId('timeline-legend')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<Timeline {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
