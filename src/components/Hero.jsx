import AnimatedShaderHero from "./ui/animated-shader-hero";
import { motion } from 'framer-motion';
import Countdown from "./ui/Countdown";

export default function Hero() {
  const handlePrimaryClick = () => {
    const el = document.getElementById('register') || document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSecondaryClick = () => {
    const el = document.getElementById('schedule') || document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden" id="hero">
      <AnimatedShaderHero
        headline={{
          line1: "HKBK COLLEGE OF ENGINEERING",
          line2: "AI IGNITE HACKATHON"
        }}
        subtitle="2 DAYS OF PURE NEURAL FIRE — Supercharge your ideas with AI-powered innovation built for the next generation of developers."
      >
        <Countdown
          targetDate="2026-04-15T15:30:00+05:30"
          title="THEME REVEAL IN"
        />
      </AnimatedShaderHero>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="font-label text-xs tracking-widest uppercase text-white/60">Initializing System</span>
        <span className="material-symbols-outlined animate-bounce text-white/60">keyboard_double_arrow_down</span>
      </motion.div>
    </section>
  );
}
