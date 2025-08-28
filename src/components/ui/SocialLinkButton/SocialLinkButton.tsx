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
            className="w-12 h-12 bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-lg shadow-sm hover:shadow-md flex items-center justify-center text-stone-600 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-green-400 transition-all"
            aria-label={t(social.nameKey)}
        >
            <IconComponent className="w-6 h-6" />
        </a>
    );
};
