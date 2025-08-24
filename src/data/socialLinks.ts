import { FaGithub, FaLinkedin } from 'react-icons/fa';

export interface SocialLink {
    id: string;
    nameKey: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const socialLinks: SocialLink[] = [
    {
        id: 'github',
        nameKey: 'social.github',
        href: 'https://github.com/fmarigarcia',
        icon: FaGithub,
    },
    {
        id: 'linkedin',
        nameKey: 'social.linkedin',
        href: 'https://linkedin.com/in/francisco-mari-garcia',
        icon: FaLinkedin,
    },
];
