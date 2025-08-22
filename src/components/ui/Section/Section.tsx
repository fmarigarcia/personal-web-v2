import React from 'react';
import clsx from 'clsx';
import './Section.css';

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
    // Background class mapping
    const backgroundClasses = {
        white: 'bg-white',
        'gray-50': 'bg-gray-50',
        gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
    };

    return (
        <section
            id={id}
            className={clsx(
                'relative px-6',
                {
                    'min-h-screen section-navbar-offset': fullHeight,
                    'pb-20': !fullHeight, // py-20 equivalent (5rem) when not full height
                },
                backgroundClasses[backgroundColor],
                className
            )}
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
