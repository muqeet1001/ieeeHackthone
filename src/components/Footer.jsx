import { motion } from 'framer-motion';
import { FadeIn } from './animations';
import VaporizeText from './VaporizeText';

function FooterLink({ href, className, children }) {
  return (
    <motion.a
      href={href}
      className={`relative ${className}`}
      initial="rest"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-tertiary origin-left"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-8 w-full bg-[#0a0a0a] pt-16 pb-8 border-t border-dashed border-[#262626] font-headline tracking-widest uppercase overflow-hidden">

      {/* ── VAPORIZE TEXT BANNER ───────────────────────── */}
      <div style={{ width: '100%', height: '120px' }} className="mb-8">
        <VaporizeText
          texts={["HKBK COLLEGE", "OF ENGINEERING", "AI IGNITE 2026"]}
          font={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "60px", fontWeight: 800 }}
          color="rgb(255, 124, 245)"
          spread={6}
          density={6}
          animation={{ vaporizeDuration: 2.5, fadeInDuration: 1, waitDuration: 1 }}
          direction="left-to-right"
          alignment="center"
          tag="h2"
        />
      </div>

      {/* ── DIVIDER ─────────────────────────────────────── */}
      <div className="w-full h-px bg-outline-variant/30 mb-8" />

      {/* ── BOTTOM ROW ──────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm gap-4">
        <FadeIn>
          <p className="text-gray-500 font-normal text-xs">© 2026 AI IGNITE. ALL RIGHTS RESERVED.</p>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap justify-center md:justify-end items-center gap-6">
          <FooterLink href="#" className="text-gray-500 hover:text-tertiary transition-colors text-xs">
            PRIVACY
          </FooterLink>
          <FooterLink href="#" className="text-gray-500 hover:text-tertiary transition-colors text-xs">
            TERMS
          </FooterLink>
          <div className="flex gap-4 text-[10px] text-on-surface-variant opacity-50">
            <span>DAY 1: [MARCH 14, 2026]</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full self-center" />
            <span>DAY 2: [MARCH 15, 2026]</span>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
