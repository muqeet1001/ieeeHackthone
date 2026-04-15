import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import PartnerLogos from './components/PartnerLogos';
import Features from './components/Features';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import CTA from './components/CTA';
import Sponsors from './components/Sponsors';
import Leadership from './components/Leadership';
import Coordinators from './components/Coordinators';
import Venue from './components/Venue';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';
import RegistrationModal from './components/RegistrationModal';
import Theme from './components/Theme';
import { useRegistrationSlots } from './hooks/useRegistrationSlots';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const slots = useRegistrationSlots(45000);

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
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isFull={slots.isFull}
        slotsLoading={slots.loading}
        refreshSlots={slots.refresh}
      />
      
      <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary-fixed min-h-screen relative">
        <ScrollAnimations />
        <TopNavBar
          onRegisterClick={() => setIsModalOpen(true)}
          registrationDisabled={slots.isFull}
        />
        <main className="pt-20">
          <Hero />
          <Theme />
          <PartnerLogos />
          <Features />
          <Schedule />
          <Prizes />
          <Sponsors />
          <CTA onRegisterClick={() => setIsModalOpen(true)} registrationDisabled={slots.isFull} />
          <Leadership />
          <Coordinators />
          <Venue />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
