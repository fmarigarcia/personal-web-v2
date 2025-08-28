import { NavigationProvider } from '@contexts/NavigationContext';
import { useSectionNavigation } from '@hooks/useSectionNavigation';
import { NAVBAR_HEIGHT } from '@utils/constants';
import { Header } from '@components/layout/Header';
import { DotNavigation } from '@components/ui/DotNavigation';
import { Hero } from '@pages/Hero';
import { About } from '@pages/About';
import { Experience } from '@pages/Experience';
import { Contact } from '@pages/Contact';
import './App.css';
import { usePlatform } from '@hooks/usePlatform';

function AppContent() {
    // Initialize section navigation with scroll interception
    useSectionNavigation({
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -30% 0px`, // Account for header and better detection
        throttleDelay: 300, // Wait 300ms between navigation events
    });

    const {
        data: { isDesktop },
    } = usePlatform();

    return (
        <div className="min-h-screen bg-white">
            <Header />
            {isDesktop && <DotNavigation />}

            <main>
                <Hero />
                <About />
                <Experience />
                <Contact />
            </main>
        </div>
    );
}

function App() {
    return (
        <NavigationProvider>
            <AppContent />
        </NavigationProvider>
    );
}

export default App;
