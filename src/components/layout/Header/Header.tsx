import { useTranslation } from 'react-i18next';
import { useNavigation } from '@contexts/NavigationContext';
import { Logo } from '@components/ui/Logo';
import { NavigationLinks } from '@components/ui/NavigationLinks';
import { LanguageToggle } from '@components/ui/LanguageToggle';
import { ThemeToggle } from '@components/ui';

export const Header: React.FC = () => {
    const { t } = useTranslation();
    const { navigateToSection } = useNavigation();

    const handleNavClick = (sectionId: string) => {
        if (navigateToSection) {
            navigateToSection(sectionId);
        }
    };

    return (
        <header
            className="fixed top-0 w-full z-50 bg-stone-50/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors duration-300"
            role="banner"
        >
            <div className="container mx-auto px-6 py-4">
                <nav
                    className="flex items-center justify-between"
                    role="navigation"
                    aria-label={t('nav.mainNavigation')}
                >
                    <Logo onClick={() => handleNavClick('hero')} />

                    <NavigationLinks onNavClick={handleNavClick} />

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
};
