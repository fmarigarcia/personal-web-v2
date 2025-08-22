import React from 'react';
import { SCROLL_OFFSET } from '@utils/constants';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    fullHeight?: boolean;
    backgroundColor?: 'white' | 'gray-50' | 'gradient';
}

export const Section: React.FC<SectionProps> = ({
    id,
    className = '',
    children,
    fullHeight = false,
    backgroundColor = 'white',
}) => {
    // Calculate padding-top based on scroll offset (navbar height)
    const paddingTop = `${SCROLL_OFFSET}px`;

    // Base classes for the section
    const baseClasses = 'relative px-6';

    // Height classes based on fullHeight prop
    const heightClasses = fullHeight ? 'min-h-screen' : '';

    // Background classes
    const backgroundClasses = {
        white: 'bg-white',
        'gray-50': 'bg-gray-50',
        gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
    };

    // Combine all classes
    const sectionClasses = [
        baseClasses,
        heightClasses,
        backgroundClasses[backgroundColor],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <section
            id={id}
            className={sectionClasses}
            style={{
                paddingTop: fullHeight ? paddingTop : '0',
                paddingBottom: fullHeight ? '0' : '5rem', // py-20 equivalent
            }}
        >
            {fullHeight ? (
                <div className="min-h-screen flex flex-col justify-center py-20">
                    {children}
                </div>
            ) : (
                <div className="py-20">{children}</div>
            )}
        </section>
    );
};

export default Section;
