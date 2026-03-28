import { motion } from 'framer-motion';
import { FadeInView } from './animations';

export default function CTA({ onRegisterClick }) {
  return (
    <section className="py-24 px-6 bg-surface-container">
      {/* Section fades + slides up when it enters the viewport */}
      <FadeInView>
        <div className="max-w-4xl mx-auto bg-surface-container-highest border-t-8 border-secondary p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 border-[20px] border-primary opacity-10 rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
                SECURE YOUR SLOT
              </h2>
              <p className="font-body text-on-surface-variant text-lg mb-8">
                Registration is mandatory. Join the most intense AI hackathon of the year at HKBK College of Engineering.
              </p>
              {/* Button — scale up on hover, press down on tap */}
              <motion.button
                onClick={onRegisterClick}
                className="w-full md:w-auto bg-secondary text-on-secondary-fixed font-headline font-black text-xl px-12 py-5 uppercase tracking-tighter hover:bg-primary transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                REGISTER NOW
              </motion.button>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3">
              <div className="w-24 h-24 border-4 border-secondary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">AI IGNITE 2026</p>
            </div>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}
