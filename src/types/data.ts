// Data-related interfaces for application entities

export interface SocialLink {
    id: string;
    nameKey: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface ContactMethod {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    titleKey: string;
    value: string;
    href: string;
}

export interface Skill {
    id: string;
    name?: string; // Direct display name
    nameKey?: string; // i18n translation key
    score?: number; // 0-5 rating for star display
}

export interface SkillGroup {
    id: string;
    titleKey: string; // i18n translation key for group title
    skills: Skill[];
}

export interface ExperienceItem {
    id: string;
    company: string;
    position: string;
    duration: string;
    descriptionKeys: string[];
    technologies: string[];
}
