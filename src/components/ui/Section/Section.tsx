import React from 'react';
import clsx from 'clsx';
import { sectionBackgrounds } from '@utils/classNames';
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
    return (
        <section
            id={id}
            className={clsx(
                'relative px-6 min-h-screen section-navbar-offset max-w-screen overflow-hidden',
                sectionBackgrounds[backgroundColor],
                className
            )}
        >
            <div className="flex flex-col justify-center lg:py-20 py-10">
                {title && <SectionHeader title={title} subtitle={subtitle} />}
                {children}
            </div>
        </section>
    );
};

export default Section;
