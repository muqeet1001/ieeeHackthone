import { motion } from 'framer-motion';

// Floating particle orbs around the text
const orbs = [
  { size: 180, x: '-20%', y: '10%',  color: 'rgba(255,124,245,0.15)', delay: 0 },
  { size: 120, x: '75%',  y: '-15%', color: 'rgba(0,253,0,0.10)',     delay: 0.8 },
  { size: 90,  x: '85%',  y: '60%',  color: 'rgba(193,255,254,0.12)', delay: 1.4 },
  { size: 60,  x: '10%',  y: '70%',  color: 'rgba(255,124,245,0.10)', delay: 1.8 },
];

export default function Venue() {
  return (
    <section
      className="h-96 w-full relative overflow-hidden flex items-center justify-center"
      id="venue"
    >
      {/* Blurred background image — purely decorative */}
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.15] blur-sm"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOsBO3N797AtKu5373yB0HreIgZ3bGzqUUj_9BQbhwVqWrcdoID_EPhUdF-INqI5EKrfS1wyCXN3BCamSTmgXknlqiW3omfmc8R8AI55sylga9dLQO0v_sZogNpc9ybGx0Dhx3jwjpbJhTwDzbzgcJ6efD46SVmAU3pZCAeBnNlPlj03ZeF5nDd3r_MGwhgAkmMq6QlFCzxXNkVLKgo5kVwx-wuix3PUJRPzrpBgBKhzY5QHuaeZKPmdgX78YtQueDqfBBN3lDM-o"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

      {/* Animated floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(24px)',
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Animated scan-line ring */}
      <motion.div
        className="absolute rounded-full border border-primary/20 pointer-events-none"
        style={{ width: 420, height: 420 }}
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full border border-secondary/15 pointer-events-none"
        style={{ width: 300, height: 300 }}
        animate={{ scale: [1.05, 0.92, 1.05], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Content — no card background */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated location icon */}
        <motion.span
          className="material-symbols-outlined text-secondary text-5xl mb-4 block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          location_on
        </motion.span>

        <h3 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 neon-glow-primary">
          HKBK COLLEGE OF ENGINEERING
        </h3>

        <p className="text-on-surface-variant font-body text-sm md:text-base max-w-md mx-auto mb-6">
          Survey No. 22/1, Opp. Manyata Tech Park, Nagawara,<br />
          Bangalore, Karnataka 560045
        </p>

        {/* Animated CTA */}
        <motion.a
          href="https://maps.google.com/?q=HKBK+College+of+Engineering+Bangalore"
          target="_blank"
          rel="noreferrer"
          className="relative inline-block text-tertiary font-label font-bold tracking-widest text-sm border border-tertiary/30 px-6 py-2 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,124,245,0.25)' }}
          whileTap={{ scale: 0.95 }}
        >
          OPEN IN MAPS
        </motion.a>
      </motion.div>
    </section>
  );
}
