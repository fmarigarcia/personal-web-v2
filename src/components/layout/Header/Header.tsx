import { useSmoothScroll } from '@hooks/useSmoothScroll';
import { Logo } from '@components/ui/Logo';
import { NavigationLinks } from '@components/ui/NavigationLinks';
import { LanguageToggle } from '@components/ui/LanguageToggle';
import { MobileMenuButton } from '@components/ui/MobileMenuButton';

export const Header: React.FC = () => {
    const { scrollToElement } = useSmoothScroll();

    const handleNavClick = (sectionId: string) => {
        scrollToElement(sectionId);
    };

    return (
        <header
            className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
            role="banner"
        >
            <div className="container mx-auto px-6 py-4">
                <nav
                    className="flex items-center justify-between"
                    role="navigation"
                    aria-label="Main navigation"
                >
                    <Logo onClick={() => handleNavClick('hero')} />

                    <NavigationLinks onNavClick={handleNavClick} />

                    <div className="flex items-center space-x-4">
                        <LanguageToggle />
                        <MobileMenuButton />
                    </div>
                </nav>
            </div>
        </header>
    );
};
