import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { SocialLink } from '../types/data';

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
