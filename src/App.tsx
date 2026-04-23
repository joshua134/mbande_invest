import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Projects from './components/Projects';
import QuoteForm from './components/QuoteForm';
import Services from './components/Services';
import VisionMission from './components/VisionMission';
import Contact from './components/Contact';

function App() {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetId = anchor.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL without causing scroll jump
          history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Services />
      <Projects />
      <VisionMission />
      <QuoteForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;