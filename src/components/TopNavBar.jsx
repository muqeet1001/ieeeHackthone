import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Nav links (excluding ABOUT which has its own active style)
const NAV_LINKS = [
  { label: 'THEME',    href: '#theme' },
  { label: 'SCHEDULE', href: '#schedule' },
  { label: 'PRIZES',   href: '#prizes' },
  { label: 'VENUE',    href: '#venue' },
];

export default function TopNavBar({ onRegisterClick, registrationDisabled }) {
  // Track whether the user has scrolled down so we can apply the blur background
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Slide down from above on first paint */
    <motion.header
      className={`fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4 font-headline font-bold tracking-tighter uppercase border-none transition-[background,box-shadow] duration-300 ${
        scrolled
          ? 'bg-[#0e0e0e]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          : 'bg-[#0e0e0e]'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo */}
      <div className="text-2xl font-black tracking-tighter text-primary uppercase">
        AI IGNITE 2026
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8">
        {/* ABOUT — active / highlighted link */}
        <a
          href="#"
          className="text-primary border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-200"
        >
          ABOUT
        </a>

        {/* Other links with animated underline that slides in from left */}
        {NAV_LINKS.map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            className="relative text-white opacity-80 hover:text-secondary hover:opacity-100 transition-colors duration-200"
            initial="rest"
            whileHover="hover"
          >
            {label}
            {/* Underline bar — scaleX: 0 → 1 on hover */}
            <motion.span
              className="absolute left-0 -bottom-0.5 h-[2px] bg-secondary w-full origin-left"
              variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.a>
        ))}
      </nav>

      {/* CTA — scale on hover, press on tap */}
      <motion.button
        type="button"
        onClick={() => !registrationDisabled && onRegisterClick()}
        disabled={registrationDisabled}
        className={`px-6 py-2 font-bold tracking-tighter transition-colors duration-200 ${
          registrationDisabled
            ? 'bg-on-surface-variant/30 text-on-surface-variant cursor-not-allowed'
            : 'bg-primary text-on-primary-fixed hover:bg-secondary'
        }`}
        whileHover={registrationDisabled ? {} : { scale: 1.05 }}
        whileTap={registrationDisabled ? {} : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {registrationDisabled ? 'REGISTRATION FULL' : 'REGISTER NOW'}
      </motion.button>
    </motion.header>
  );
}
