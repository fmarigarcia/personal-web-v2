import { NavigationProvider } from '@contexts/NavigationContext';
import { Header } from '@components/layout/Header';
import { DotNavigation } from '@components/ui/DotNavigation';
import { Hero } from '@pages/Hero';
import { About } from '@pages/About';
import { Experience } from '@pages/Experience';
import { Contact } from '@pages/Contact';
import './App.css';

function App() {
    return (
        <NavigationProvider>
            <div className="min-h-screen bg-white">
                <Header />
                <DotNavigation />

                <main>
                    <Hero />
                    <About />
                    <Experience />
                    <Contact />
                </main>
            </div>
        </NavigationProvider>
    );
}

export default App;
