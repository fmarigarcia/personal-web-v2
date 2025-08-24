interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
}) => {
    return (
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto" />
            {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
