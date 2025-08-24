import { render, screen } from '@testing-library/react';
import { ExperienceDetailsDescription } from '../ExperienceDetailsDescription';

// Mock react-i18next
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: jest.fn((key: string) => key),
    }),
}));

describe('ExperienceDetailsDescription', () => {
    const defaultProps = {
        experienceId: 'exp-1',
        descriptionKeys: [
            'experience.exp1.desc1',
            'experience.exp1.desc2',
            'experience.exp1.desc3',
        ],
    };

    it('should render all description items', () => {
        render(<ExperienceDetailsDescription {...defaultProps} />);

        expect(screen.getByText('experience.exp1.desc1')).toBeInTheDocument();
        expect(screen.getByText('experience.exp1.desc2')).toBeInTheDocument();
        expect(screen.getByText('experience.exp1.desc3')).toBeInTheDocument();
    });

    it('should render as an unordered list', () => {
        render(<ExperienceDetailsDescription {...defaultProps} />);

        const list = screen.getByRole('list');
        expect(list.tagName).toBe('UL');
        expect(list).toHaveClass('space-y-4', 'mb-8');
    });

    it('should render correct number of list items', () => {
        render(<ExperienceDetailsDescription {...defaultProps} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

    it('should have correct list item structure', () => {
        render(<ExperienceDetailsDescription {...defaultProps} />);

        const listItems = screen.getAllByRole('listitem');
        listItems.forEach(item => {
            expect(item).toHaveClass('flex', 'items-start');
        });
    });

    it('should render bullet points for each item', () => {
        const { container } = render(<ExperienceDetailsDescription {...defaultProps} />);

        const bullets = container.querySelectorAll('.w-2.h-2.bg-blue-600.rounded-full');
        expect(bullets).toHaveLength(3);
    });

    it('should style description text correctly', () => {
        const { container } = render(<ExperienceDetailsDescription {...defaultProps} />);

        const textSpans = container.querySelectorAll('span.text-gray-700.leading-relaxed');
        expect(textSpans).toHaveLength(3);
    });

    it('should render correct number of list items', () => {
        const { container } = render(<ExperienceDetailsDescription {...defaultProps} />);

        const listItems = container.querySelectorAll('li');
        expect(listItems).toHaveLength(3);
        expect(listItems[0]).toHaveTextContent('experience.exp1.desc1');
        expect(listItems[1]).toHaveTextContent('experience.exp1.desc2');
        expect(listItems[2]).toHaveTextContent('experience.exp1.desc3');
    });

    it('should handle empty description keys', () => {
        render(<ExperienceDetailsDescription {...defaultProps} descriptionKeys={[]} />);

        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
        
        const listItems = screen.queryAllByRole('listitem');
        expect(listItems).toHaveLength(0);
    });

    it('should handle single description key', () => {
        render(
            <ExperienceDetailsDescription
                {...defaultProps}
                descriptionKeys={['single.description']}
            />
        );

        expect(screen.getByText('single.description')).toBeInTheDocument();
        
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(1);
    });

    it('should translate all description keys', () => {
        render(<ExperienceDetailsDescription {...defaultProps} />);

        // Verifies that t() is called for each description key
        expect(screen.getByText('experience.exp1.desc1')).toBeInTheDocument();
        expect(screen.getByText('experience.exp1.desc2')).toBeInTheDocument();
        expect(screen.getByText('experience.exp1.desc3')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<ExperienceDetailsDescription {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot with empty descriptions', () => {
        const { container } = render(
            <ExperienceDetailsDescription
                {...defaultProps}
                descriptionKeys={[]}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
