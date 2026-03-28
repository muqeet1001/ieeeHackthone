/**
 * animations.jsx
 * ─────────────────────────────────────────────────────────
 * Reusable Framer Motion animation components.
 *
 * Exports:
 *  • FadeInView  — fade + slide-up when element enters viewport
 *  • FadeIn      — simple opacity fade on viewport enter
 *  • MotionButton — button with hover scale-up + tap press
 *  • MotionLink  — anchor with animated underline on hover
 * ─────────────────────────────────────────────────────────
 */

import { motion } from 'framer-motion';

// Premium easing curve — matches Apple / Stripe feel
const EASE = [0.22, 1, 0.36, 1];

// ─── FadeInView ───────────────────────────────────────────────────────────────
// Fades in and slides up when the element scrolls into view.
// viewport.once = true means the animation only plays once (better perf).
//
// Usage: <FadeInView delay={0.2}>your content</FadeInView>
export function FadeInView({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,           // how many px to slide up from
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // once: true  — only animate once (better performance)
      // amount: 0.2 — trigger when 20% of element is visible (fires earlier)
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
// Opacity-only fade, no vertical shift.
// Great for footer items, labels, subtle reveals.
export function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─── MotionButton ─────────────────────────────────────────────────────────────
// A <button> with a slight scale-up on hover and scale-down on tap.
// The spring transition gives it a snappy, premium feel.
//
// Usage: <MotionButton className="bg-primary ...">REGISTER</MotionButton>
export function MotionButton({ children, className = '', onClick, style, ...props }) {
  return (
    <motion.button
      className={className}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// ─── MotionLink ───────────────────────────────────────────────────────────────
// An <a> tag with a smooth underline that slides in from left on hover.
// Pass underlineColor to match your design token.
//
// Usage: <MotionLink href="#" underlineColor="var(--color-tertiary)">LINK</MotionLink>
export function MotionLink({
  children,
  className = '',
  href = '#',
  underlineColor = 'currentColor',
}) {
  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      initial="rest"
      whileHover="hover"
    >
      {children}
      {/* Underline bar — scales in from left on hover */}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-[1px] w-full origin-left"
        style={{ backgroundColor: underlineColor }}
        variants={{
          rest:  { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.a>
  );
}
