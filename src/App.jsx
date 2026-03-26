import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import Features from './components/Features';
import Schedule from './components/Schedule';
import Prizes from './components/Prizes';
import CTA from './components/CTA';
import Venue from './components/Venue';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';

function App() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary-fixed min-h-screen">
      <ScrollAnimations />
      <TopNavBar />
      <main className="pt-20">
        <Hero />
        <Features />
        <Schedule />
        <Prizes />
        <CTA />
        <Venue />
      </main>
      <Footer />
    </div>
  );
}

export default App;
