import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import WebGLWave from './WebGLWave';
import VaporizeText from './VaporizeText';

export default function Hero() {
  /*
   * Parallax via useMotionValue + manual scroll listener.
   * We drive a MotionValue manually instead of useScroll so there
   * is zero chance of conflict with GSAP's ScrollTrigger.
   */
  const rawScrollY = useMotionValue(0);

  // Derive per-layer parallax values from the raw scroll position.
  // Negative values = move UP (slower than the page scroll = parallax depth).
  const blobY1 = useTransform(rawScrollY, [0, 900], [0, -70]);  // top-left glow blob
  const blobY2 = useTransform(rawScrollY, [0, 900], [0, -45]);  // bottom-right glow blob
  const shapeY1 = useTransform(rawScrollY, [0, 900], [0, -35]);  // triangle
  const shapeY2 = useTransform(rawScrollY, [0, 900], [0, -22]);  // dashed circle

  useEffect(() => {
    // Update the MotionValue on every scroll tick (passive → no jank)
    const onScroll = () => rawScrollY.set(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawScrollY]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 geometric-bg" style={{ isolation: 'isolate' }}>

      {/* ── WEBGL WAVE BACKGROUND ── fills exactly the Hero section */}
      <WebGLWave />

      {/* ── PARALLAX BACKGROUND LAYERS ─────────────────────────────────── */}
      {/* These move at a SLOWER rate than scrolling, creating depth */}

      <motion.div
        style={{ y: blobY1, willChange: 'transform' }}
        className="absolute top-20 left-[-5%] w-64 h-64 bg-primary opacity-10 blur-[120px]"
      />
      <motion.div
        style={{ y: blobY2, willChange: 'transform' }}
        className="absolute bottom-20 right-[-5%] w-80 h-80 bg-secondary opacity-10 blur-[120px]"
      />
      <motion.div
        style={{ y: shapeY1, willChange: 'transform' }}
        className="absolute top-1/4 right-10 w-0 h-0 border-l-[50px] border-l-transparent border-b-[86px] border-b-tertiary opacity-20 rotate-12"
      />
      <motion.div
        style={{ y: shapeY2, willChange: 'transform' }}
        className="absolute bottom-1/4 left-10 w-24 h-24 border-4 border-dashed border-primary opacity-20 rounded-full"
      />

      {/* ── HERO CONTENT — staggered entry on mount ────────────────────── */}
      <div className="z-10 text-center max-w-6xl">

        {/* Badge — VaporizeText animation matching the footer style */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mx-auto" style={{ maxWidth: '95vw' }}>
            {/* Desktop View: Single line */}
            <div className="hidden md:block" style={{ width: '900px', height: '80px' }}>
              <VaporizeText
                texts={["HKBK COLLEGE OF ENGINEERING"]}
                font={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "42px", fontWeight: 800 }}
                color="rgb(255, 124, 245)"
                spread={5}
                density={8}
                animation={{ vaporizeDuration: 4.5, fadeInDuration: 1.5, waitDuration: 2.5 }}
                direction="left-to-right"
                alignment="center"
                tag="p"
              />
            </div>

            {/* Mobile View: Two lines */}
            <div className="md:hidden flex flex-col items-center gap-2">
              <div style={{ width: '300px', height: '60px' }}>
                <VaporizeText
                  texts={["HKBK"]}
                  font={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "42px", fontWeight: 800 }}
                  color="rgb(255, 124, 245)"
                  spread={4}
                  density={6}
                  animation={{ vaporizeDuration: 4.5, fadeInDuration: 1.5, waitDuration: 2.5 }}
                  direction="left-to-right"
                  alignment="center"
                  tag="p"
                />
              </div>
              <div style={{ width: '100%', height: '48px' }}>
                <VaporizeText
                  texts={["COLLEGE OF ENGINEERING"]}
                  font={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "24px", fontWeight: 700 }}
                  color="rgb(255, 124, 245)"
                  spread={4}
                  density={6}
                  animation={{ vaporizeDuration: 4.5, fadeInDuration: 1.5, waitDuration: 2.5 }}
                  direction="left-to-right"
                  alignment="center"
                  tag="p"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main heading — dramatic slide-up, most visible animation on page */}
        <motion.h1
          className="font-headline text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6"
          style={{
            color: '#ffffff',
            WebkitTextStroke: '1px rgba(0, 0, 0, 0.6)',
          }}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          AI IGNITE<br />HACKATHON<br />
          <span className="text-secondary">2026</span>
        </motion.h1>

        {/* Tagline row — last to appear */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-headline text-2xl md:text-4xl font-bold tracking-tighter text-tertiary italic">
            BUILD. LEARN. INNOVATE.
          </p>
          <div className="h-[2px] w-24 bg-outline-variant hidden md:block" />
          <p className="font-label text-xl tracking-widest text-on-surface-variant">
            2 DAYS PURE NEURAL FIRE
          </p>
        </motion.div>

      </div>

      {/* Scroll hint — fades in gently after all content has appeared */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <span className="font-label text-xs tracking-widest uppercase">Initializing System</span>
        <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
      </motion.div>
    </section>
  );
}
