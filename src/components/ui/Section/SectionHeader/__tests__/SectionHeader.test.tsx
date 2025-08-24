import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { SectionHeader } from '../SectionHeader';

describe('SectionHeader', () => {
    it('should render with title only', () => {
        const title = 'Test Section Title';
        render(<SectionHeader title={title} />);

        const headingElement = screen.getByRole('heading', { level: 2 });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent(title);
    });

    it('should render with title and subtitle', () => {
        const title = 'Test Section Title';
        const subtitle = 'This is a test subtitle for the section';

        render(<SectionHeader title={title} subtitle={subtitle} />);

        const headingElement = screen.getByRole('heading', { level: 2 });
        const subtitleElement = screen.getByText(subtitle);

        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent(title);
        expect(subtitleElement).toBeInTheDocument();
    });

    it('should not render subtitle paragraph when subtitle is not provided', () => {
        const title = 'Test Section Title';
        const { container } = render(<SectionHeader title={title} />);

        const paragraphElement = container.querySelector('p');
        expect(paragraphElement).not.toBeInTheDocument();
    });

    it('should apply correct classes to title', () => {
        const title = 'Test Section Title';
        render(<SectionHeader title={title} />);

        const headingElement = screen.getByRole('heading', { level: 2 });
        expect(headingElement).toHaveClass(
            'text-4xl',
            'md:text-5xl',
            'font-bold',
            'text-gray-900',
            'mb-4'
        );
    });

    it('should apply correct classes to subtitle when provided', () => {
        const title = 'Test Section Title';
        const subtitle = 'This is a test subtitle';

        render(<SectionHeader title={title} subtitle={subtitle} />);

        const subtitleElement = screen.getByText(subtitle);
        expect(subtitleElement).toHaveClass(
            'text-xl',
            'text-gray-600',
            'max-w-3xl',
            'mx-auto',
            'mt-6'
        );
    });

    it('should render the blue divider line', () => {
        const title = 'Test Section Title';
        render(<SectionHeader title={title} />);

        const container = screen.getByRole('heading').parentElement;
        const divider = container?.querySelector(
            '.w-24.h-1.bg-blue-600.mx-auto'
        );
        expect(divider).toBeInTheDocument();
    });

    it('should have center-aligned layout', () => {
        const title = 'Test Section Title';
        render(<SectionHeader title={title} />);

        const container = screen.getByRole('heading').parentElement;
        expect(container).toHaveClass('text-center', 'mb-16');
    });

    it('should handle long titles properly', () => {
        const longTitle =
            'This is a Very Long Section Title That Should Still Render Correctly';
        render(<SectionHeader title={longTitle} />);

        const headingElement = screen.getByRole('heading', { level: 2 });
        expect(headingElement).toHaveTextContent(longTitle);
    });

    it('should handle long subtitles properly', () => {
        const title = 'Test Title';
        const longSubtitle =
            'This is a very long subtitle that should be properly constrained with max-width classes and centered appropriately within the section header component';

        render(<SectionHeader title={title} subtitle={longSubtitle} />);

        const subtitleElement = screen.getByText(longSubtitle);
        expect(subtitleElement).toBeInTheDocument();
        expect(subtitleElement).toHaveClass('max-w-3xl', 'mx-auto');
    });

    it('should not render subtitle paragraph when empty string is provided', () => {
        const title = 'Test Title';
        const { container } = render(
            <SectionHeader title={title} subtitle="" />
        );

        // Empty string should not render the paragraph element due to conditional rendering
        const paragraphElement = container.querySelector('p');
        expect(paragraphElement).not.toBeInTheDocument();
    });
});
