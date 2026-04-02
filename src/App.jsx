import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import CTA from './components/CTA';
import Venue from './components/Venue';
import Leadership from './components/Leadership';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    /*
     * MotionConfig wraps the entire app.
     *
     * reducedMotion="never" — forces ALL Framer Motion animations to run
     * regardless of the OS "Show animations" / "prefers-reduced-motion"
     * accessibility setting. Without this, Windows users who have
     * animation effects disabled would see ZERO motion on the page.
     */
    <MotionConfig reducedMotion="never">
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary-fixed min-h-screen relative">
        <ScrollAnimations />
        <TopNavBar onRegisterClick={() => setIsModalOpen(true)} />
        <main className="pt-20">
          <Hero />
          <Features />
          <Schedule />
          <Prizes />
          <CTA onRegisterClick={() => setIsModalOpen(true)} />
          <Venue />
          <Leadership />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
