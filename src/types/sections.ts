export interface PersonalInfo {
    name: string;
    title: string;
    description: string;
    email: string;
    location: string;
}

export interface Skill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'frontend' | 'backend' | 'tools' | 'languages';
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string[];
    technologies: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    demoUrl?: string;
    codeUrl?: string;
    imageUrl?: string;
}
