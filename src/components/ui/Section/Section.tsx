import React from 'react';
import clsx from 'clsx';
import { SectionHeader } from './SectionHeader';
import './Section.css';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    backgroundColor?: 'white' | 'gray-50' | 'gradient';
    title?: string;
    subtitle?: string;
}

export const Section: React.FC<SectionProps> = ({
    id,
    className = '',
    children,
    backgroundColor = 'white',
    title,
    subtitle,
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
                'relative px-6 min-h-screen section-navbar-offset',
                backgroundClasses[backgroundColor],
                className
            )}
        >
            <div className="flex flex-col justify-center py-20">
                {title && <SectionHeader title={title} subtitle={subtitle} />}
                {children}
            </div>
        </section>
    );
};

export default Section;
