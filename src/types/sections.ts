// Legacy section-related interfaces
// Note: These may be unused and should be reviewed for removal

export interface PersonalInfo {
    name: string;
    title: string;
    description: string;
    email: string;
    location: string;
}

// Legacy Skill interface - consider removing if not used
// Use types/data.ts Skill interface for new implementations
export interface LegacySkill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'frontend' | 'backend' | 'tools' | 'languages';
}

// Legacy Experience interface - consider removing if not used
// Use types/data.ts ExperienceItem interface for new implementations
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
