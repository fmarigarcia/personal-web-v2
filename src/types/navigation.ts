export interface NavigationItem {
    id: string;
    labelKey: string; // i18n key
    href: string;
}

export interface Section {
    id: string;
    titleKey: string; // i18n key
    component: React.ComponentType;
    order: number;
}

export interface NavigationState {
    currentSection: string;
    isScrolling: boolean;
    sections: Section[];
}

export type ScrollDirection = 'up' | 'down';

export interface ScrollPosition {
    x: number;
    y: number;
}
