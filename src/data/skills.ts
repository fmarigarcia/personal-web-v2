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

export const skillGroups: SkillGroup[] = [
    {
        id: 'frontend',
        titleKey: 'about.skills.frontend',
        skills: [
            {
                id: 'html',
                name: 'HTML',
                score: 5,
            },
            {
                id: 'react',
                name: 'React',
                score: 5,
            },
            {
                id: 'typescript',
                name: 'Typescript',
                score: 4.5,
            },
            {
                id: 'css',
                name: 'CSS',
                score: 4.5,
            },
            {
                id: 'tailwindcss',
                name: 'TailwindCSS',
                score: 4,
            },
            {
                id: 'materialui',
                name: 'MaterialUI',
                score: 4,
            },
            {
                id: 'bootstrap',
                name: 'Bootstrap',
                score: 3.5,
            },
        ],
    },
    {
        id: 'backend',
        titleKey: 'about.skills.backend',
        skills: [
            {
                id: 'nodejs',
                name: 'NodeJS',
                score: 4.5,
            },
            {
                id: 'elixir',
                name: 'Elixir',
                score: 4,
            },
            {
                id: 'php',
                name: 'PHP',
                score: 3.5,
            },
            {
                id: 'symfony',
                name: 'Symfony',
                score: 3,
            },
        ],
    },
    {
        id: 'databases',
        titleKey: 'about.skills.databases',
        skills: [
            {
                id: 'mysql',
                name: 'MySQL',
                score: 4,
            },
            {
                id: 'postgresql',
                name: 'PostgreSQL',
                score: 4,
            },
            {
                id: 'sqlserver',
                name: 'SQL Server',
                score: 3,
            },
        ],
    },
    {
        id: 'other',
        titleKey: 'about.skills.other',
        skills: [
            {
                id: 'git',
                name: 'Git',
                score: 4.5,
            },
            {
                id: 'jest',
                name: 'Jest',
                score: 4,
            },
            {
                id: 'agile',
                name: 'Agile',
                score: 4,
            },
            {
                id: 'scrum',
                name: 'Scrum',
                score: 4,
            },
            {
                id: 'docker',
                name: 'Docker',
                score: 3.75,
            },
            {
                id: 'cypress',
                name: 'Cypress',
                score: 3.5,
            },
            {
                id: 'aws',
                name: 'AWS',
                score: 2.5,
            },
        ],
    },
];
