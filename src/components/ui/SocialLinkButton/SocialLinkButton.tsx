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
            className="w-12 h-12 bg-stone-50 border border-stone-200 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center text-stone-600 hover:text-stone-950 transition-all"
            aria-label={t(social.nameKey)}
        >
            <IconComponent className="w-6 h-6" />
        </a>
    );
};
