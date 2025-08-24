import { useTranslation } from 'react-i18next';
import type { SocialLink } from '@data/index';

interface SocialLinkButtonProps {
    social: SocialLink;
}

export const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({
    social,
}) => {
    const { t } = useTranslation();
    const IconComponent = social.icon;

    return (
        <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-lg shadow-sm hover:shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all"
            aria-label={t(social.nameKey)}
        >
            <IconComponent className="w-6 h-6" />
        </a>
    );
};
